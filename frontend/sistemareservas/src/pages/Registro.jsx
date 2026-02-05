import React, {useState, useEffect} from "react";
import { useNavigate,Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiMail, FiLock, FiCreditCard, FiArrowLeft } from "react-icons/fi";

const Registro = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { registroUsuario, isAuthenticated, errors: authErrors } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      if (isAuthenticated) navigate("/sala");
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
      await registroUsuario(values);
    });

    const password = watch("password", "");

    return (
      <div className="min-h-screen w-full bg-white text-black font-display font-bold">
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
          {/* FORM */}
          <div className="flex items-center justify-center p-8 lg:p-16">
            <div className="w-full max-w-md">
             
              <Link to="/" className="mb-6 inline-flex items-center gap-2 text-black hover:opacity-70">
                <FiArrowLeft className="text-2xl" />
                <span className="text-sm font-bold">Volver</span>
              </Link>

              {/* TITULO */}
              <div className="mb-8">
                <h1 className="text-4xl font-black">Crear cuenta</h1>
                <p className="mt-2 text-base font-bold">
                  Regístrate para reservar tu cancha.
                </p>
              </div>

              {/* MOSTRAR ERRORES DEL BACKEND */}
              {authErrors.map((error, i) => (
                <div key={i} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              ))}

              {/* FORM */}
              <form onSubmit={onSubmit} className="flex flex-col gap-6">

                {/* USERNAME */}
                <div>
                  <label htmlFor="username" className="block pb-2 text-base font-bold">
                    Usuario
                  </label>
                  <div className="flex h-14 items-center rounded-lg border border-black bg-white">
                    <input
                      type="text"
                      {...register("username", { required: "El usuario es requerido" })}
                      className="h-full w-full bg-transparent px-4 outline-none placeholder:text-gray-600 font-bold"
                    />
                    <FiUser className="mr-4 text-xl text-black" />
                  </div>
                  {errors.username && (
                    <p className='text-red-900 text-sm mt-1'>{errors.username.message}</p>
                  )}
                </div>

                {/* NOMBRE */}
                <div>
                  <label htmlFor="nombre" className="block pb-2 text-base font-bold">
                    Nombre
                  </label>
                  <div className="flex h-14 items-center rounded-lg border border-black bg-white">
                    <input
                      type="text"
                      {...register("nombre", { required: "El nombre es requerido" })}
                      className="h-full w-full bg-transparent px-4 outline-none placeholder:text-gray-600 font-bold"
                    />
                    <FiUser className="mr-4 text-xl text-black" />
                  </div>
                  {errors.nombre && (
                    <p className='text-red-900 text-sm mt-1'>{errors.nombre.message}</p>
                  )}
                </div>

                {/* APELLIDO */}
                <div>
                  <label htmlFor="apellido" className="block pb-2 text-base font-bold">
                    Apellido
                  </label>
                  <div className="flex h-14 items-center rounded-lg border border-black bg-white">
                    <input
                      type="text"
                      {...register("apellido", { required: "El apellido es requerido" })}
                      className="h-full w-full bg-transparent px-4 outline-none placeholder:text-gray-600 font-bold"
                    />
                    <FiUser className="mr-4 text-xl text-black" />
                  </div>
                  {errors.apellido && (
                    <p className='text-red-900 text-sm mt-1'>{errors.apellido.message}</p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <label htmlFor="email" className="block pb-2 text-base font-bold">
                    Correo electrónico
                  </label>
                  <div className="flex h-14 items-center rounded-lg border border-black bg-white">
                    <input
                      type="email"
                      {...register("email", { 
                        required: "El correo es requerido",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                          message: "Debe ser un correo de Gmail válido"
                        }
                      })}
                      className="h-full w-full bg-transparent px-4 outline-none placeholder:text-gray-600 font-bold"
                    />
                    <FiMail className="mr-4 text-xl text-black" />
                  </div>
                  {errors.email && (
                    <p className='text-red-900 text-sm mt-1'>{errors.email.message}</p>
                  )}
                </div>

                {/* CEDULA */}
                <div>
                  <label htmlFor="cedula" className="block pb-2 text-base font-bold">
                    Cédula
                  </label>
                  <div className="flex h-14 items-center rounded-lg border border-black bg-white">
                    <input
                      type="text"
                      {...register("cedula", { 
                        required: "La cédula es requerida",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "La cédula debe tener exactamente 10 dígitos"
                        }
                      })}
                      className="h-full w-full bg-transparent px-4 outline-none placeholder:text-gray-600 font-bold"
                    />
                    <FiCreditCard className="mr-4 text-xl text-black" />
                  </div>
                  {errors.cedula && (
                    <p className='text-red-900 text-sm mt-1'>{errors.cedula.message}</p>
                  )}
                </div>

                {/* PASSWORD */}
                <div>
                  <label htmlFor="password" className="block pb-2 text-base font-bold">
                    Contraseña
                  </label>
                  <div className="flex h-14 items-center rounded-lg border border-black bg-white">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", { 
                        required: "La contraseña es requerida",
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                          message: "La contraseña debe tener 8-20 caracteres, una mayúscula, un número y un carácter especial (@$!%*?&)"
                        }
                      })}
                      className="h-full w-full bg-transparent px-4 outline-none placeholder:text-gray-600 font-bold"
                    />
                    <FiLock
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="mr-4 text-xl text-black cursor-pointer"
                    />
                  </div>
                  {errors.password && (
                    <p className='text-red-900 text-sm mt-1'>{errors.password.message}</p>
                  )}
                  
                  {/* INDICADOR DE REQUISITOS DE CONTRASEÑA */}
                  <div className="mt-2 text-xs space-y-1">
                    <p className="font-semibold text-gray-700">La contraseña debe contener:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                      <li className={password.length >= 8 && password.length <= 20 ? "text-green-600" : ""}>
                        Entre 8 y 20 caracteres
                      </li>
                      <li className={/[A-Z]/.test(password) ? "text-green-600" : ""}>
                        Al menos una letra mayúscula
                      </li>
                      <li className={/\d/.test(password) ? "text-green-600" : ""}>
                        Al menos un número
                      </li>
                      <li className={/[@$!%*?&]/.test(password) ? "text-green-600" : ""}>
                        Al menos un carácter especial (@$!%*?&)
                      </li>
                    </ul>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="h-14 w-full rounded-lg border border-black font-black hover:bg-gray-100"
                >
                  Registrarse
                </button>

                {/* LOGIN */}
                <p className="text-center text-sm font-bold">
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="/login" className="underline font-black">
                    Inicia sesión
                  </Link>
                </p>

              </form>
            </div>
          </div>

          {/* IMAGE */}
          <div className="hidden md:flex sticky top-0 h-screen">
            <div
              className="w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD5P1tHTHLumNE0kTKrnAG7t2-fNODV_W2lzBcO3ER-EnWkq7aMwxbH6hQpHE6Bick0rjTQklYNWAknqwyAocleSU8OzoptGfhZYbumC0bVBGvb8514UDegTsSUk6Z_6iCea06-KfvDyBzlBJuHWNSp_wWi7rZXa7tKKhoX7NTmkJ64XGXC0mT0eBSFUcQja5A0dXwdrodKuW8Me3kXJHKCYpGKkBMpb_6oDW0Y0V-f3wDUEBNYM0BcYmv38xgvjNq1UI8TgCGStQ")',
              }}
            />
          </div>

        </div>
      </div>
    );
}

export default Registro;