import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
  const { email, username, password, nombre, apellido, cedula , rol } = req.body;

  try {
    // Validar campos vacíos
    if (!email || !username || !password || !nombre || !apellido || !cedula) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios"
      });
    }

    // Validar cédula (exactamente 10 dígitos)
    const cedulaRegex = /^[0-9]{10}$/;
    if (!cedulaRegex.test(cedula)) {
      return res.status(400).json({
        success: false,
        message: "La cédula debe tener exactamente 10 dígitos numéricos"
      });
    }

    // Validar formato de Gmail
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "El correo debe ser un Gmail válido"
      });
    }

    // ✅ VALIDAR CONTRASEÑA (8 a 20 caracteres, 1 mayúscula, 1 número, 1 símbolo)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "La contraseña debe tener entre 8 y 20 caracteres, incluir una mayúscula, un número y un carácter especial (@$!%*?&)"
      });
    }

    // Verificar unicidad: email, username y cedula
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ success: false, message: "El correo ya está registrado" });
    }

    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({ success: false, message: "El nombre de usuario ya está en uso" });
    }

    const cedulaExist = await User.findOne({ cedula });
    if (cedulaExist) {
      return res.status(400).json({ success: false, message: "La cédula ya está registrada" });
    }

    // Encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      nombre,
      apellido,
      cedula,
      rol: rol || 'usuario'
    });
    
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id, rol: userSaved.rol });
    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "✅ Registro exitoso. ¡Bienvenido!",
      user: {
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt,
        nombre: userSaved.nombre,
        apellido: userSaved.apellido,
        cedula: userSaved.cedula,
        rol: userSaved.rol
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
      error: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({
      id: userFound._id,
      rol: userFound.rol,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({
      success: true,
      message: "Inicio de sesión exitoso",
      user: {
        id: userFound._id,
        username: userFound.username,
        rol: userFound.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const logout = (req, res) => {
    try {
        res.cookie('token', "", {
            expires: new Date(0),
        });

        return res.status(200).json({
            success: true,
            message: "👋 Sesión cerrada exitosamente."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "😓 Error al cerrar sesión.",
            error: error.message
        });
    }
};

export const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id).select("-password"); 

        if (!userFound) {
            return res.status(404).json({
                success: false,
                message: "❌ Usuario no encontrado."
            });
        }

        return res.status(200).json({
            success: true,
            message: "✅ Perfil obtenido correctamente.",
            user: {
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                nombre: userFound.nombre,
                apellido: userFound.apellido,
                cedula: userFound.cedula,
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt,
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "😓 Error al obtener el perfil.",
            error: error.message
        });
    }
};

export const getUsers = async (req, res) => {
  try { 
      const users = await User.find();

      return res.status(200).json({
          success: true,
          message: "✅ Usuarios obtenidos correctamente.",
          data: users,
          total: users.length
      });
      
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: "😓 Error al obtener los usuarios.",
          error: error.message
      });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, nombre, apellido, cedula, password, rol } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "❌ Usuario no encontrado.",
      });
    }

    // Validaciones opcionales
    if (email && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "El correo debe ser un Gmail válido",
      });
    }

    if (cedula && !/^[0-9]{10}$/.test(cedula)) {
      return res.status(400).json({
        success: false,
        message: "La cédula debe tener exactamente 10 dígitos numéricos",
      });
    }

    // ✅ VALIDAR CONTRASEÑA SOLO SI SE PROPORCIONA
    if (password && !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "La contraseña debe tener entre 8 y 20 caracteres, incluir una mayúscula, un número y un carácter especial (@$!%*?&)",
      });
    }

    // Verificar unicidad
    if (email && email !== user.email) {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(400).json({
          success: false,
          message: "El correo ya está registrado por otro usuario",
        });
      }
    }

    if (username && username !== user.username) {
      const usernameExist = await User.findOne({ username });
      if (usernameExist) {
        return res.status(400).json({
          success: false,
          message: "El nombre de usuario ya está en uso",
        });
      }
    }

    if (cedula && cedula !== user.cedula) {
      const cedulaExist = await User.findOne({ cedula });
      if (cedulaExist) {
        return res.status(400).json({
          success: false,
          message: "La cédula ya está registrada por otro usuario",
        });
      }
    }

    // Encriptar contraseña si se envía nueva
    let updatedPassword = user.password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    // Actualizar datos
    user.username = username || user.username;
    user.email = email || user.email;
    user.nombre = nombre || user.nombre;
    user.apellido = apellido || user.apellido;
    user.cedula = cedula || user.cedula;
    user.password = updatedPassword;
    user.rol = rol || user.rol;

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "✅ Usuario actualizado correctamente.",
      data: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        nombre: updatedUser.nombre,
        apellido: updatedUser.apellido,
        cedula: updatedUser.cedula,
        rol: updatedUser.rol,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return res.status(500).json({
      success: false,
      message: "❌ Error al actualizar el usuario.",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "❌ Usuario no encontrado.",
      });
    }

    await user.deleteOne();

    return res.status(200).json({
      success: true,
      message: "✅ Usuario eliminado correctamente.",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return res.status(500).json({
      success: false,
      message: "❌ Error al eliminar el usuario.",
      error: error.message,
    });
  }
};