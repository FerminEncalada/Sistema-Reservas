import React, {useState, useEffect} from "react";
import { useNavigate,Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiMail, FiLock, FiCreditCard,FiArrowLeft   } from "react-icons/fi";


const Registro = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { registroUsuario, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [ showPassword, setShowPassword ] = useState(false);

    useEffect(() => {
    if (isAuthenticated) navigate("/sala");
     }, [isAuthenticated]);

     const validatePassword = (value) => {
     const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
     return regex.test(value);
     };

    const onSubmit = handleSubmit(async (values) => {
  await registroUsuario(values);
});


    const password = watch("password", "");
  return (
    <div className="min-h-screen w-full bg-white text-black font-display font-bold">

      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">

        {/* ================= FORM ================= */}
        <div className="flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md">
           
           <Link to="/" className="mb-6 inline-flex items-center gap-2 text-black hover:opacity-70">
  <FiArrowLeft className="text-2xl" />
  <span className="text-sm font-bold">Volver</span>
</Link>


            {/* TITULO */}
            <div className="mb-8">
              <h1 className="text-4xl font-black">
                Crear cuenta
              </h1>
              <p className="mt-2 text-base font-bold">
                Regístrate para reservar tu cancha.
              </p>
            </div>

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
                    {...register("username", { required: true })}
                    className="h-full w-full bg-transparent px-4 outline-none placeholder:text-gray-600 font-bold"
                  />
                  {errors.username && (<p className='text-red-900'>Usuario es requerido</p>)}
                  <FiUser className="mr-4 text-xl text-black" />
                </div>
              </div>

              {/* NOMBRE */}
              <div>
                <label htmlFor="nombre"  className="block pb-2 text-base font-bold">
                  Nombre
                </label>
                <div className="flex h-14 items-center rounded-lg border border-black bg-white">
                  <input
                    type="text"
                    {...register("nombre", { required: true })}
                    className="h-full w-full bg-transparent px-4 outline-none placeholder:text-gray-600 font-bold"
                  />
                  {errors.nombre && (<p className='text-red-900'>Nombres es requerido</p>)}
                  <FiUser className="mr-4 text-xl text-black" />
                </div>
              </div>

              {/* APELLIDO */}
              <div>
                <label htmlFor="apellido" className="block pb-2 text-base font-bold">
                  Apellido
                </label>
                <div className="flex h-14 items-center rounded-lg border border-black bg-white">
                  <input
                    type="text"
                    {...register("apellido", { required: true })}
                    className="h-full w-full bg-transparent px-4 outline-none placeholder:text-gray-600 font-bold"
                  />
                  {errors.apellido && (<p className='text-red-900'>Apellido es requerido</p>)}
                  <FiUser className="mr-4 text-xl text-black" />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label htmlFor="email" className="block pb-2 text-base font-bold">
                  Correo electrónico
                </label>
                <div className="flex h-14 items-center rounded-lg border border-black bg-white">
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="h-full w-full bg-transparent px-4 outline-none placeholder:text-gray-600 font-bold"
                  />
                  {errors.email && (<p className='text-red-900'>Correo electrónico es requerido</p>)}
                  <FiMail className="mr-4 text-xl text-black" />
                </div>
              </div>

              {/* CEDULA */}
              <div>
                <label htmlFor="cedula" className="block pb-2 text-base font-bold">
                  Cédula
                </label>
                <div className="flex h-14 items-center rounded-lg border border-black bg-white">
                  <input
                    type="text"
                    {...register("cedula", { required: true })}
                    className="h-full w-full bg-transparent px-4 outline-none placeholder:text-gray-600 font-bold"
                  />
                    {errors.cedula && (<p className='text-red-900'>Cédula es requerido</p>)}
                     <FiCreditCard className="mr-4 text-xl text-black" />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label htmlFor="password" className="block pb-2 text-base font-bold">
                  Contraseña
                </label>
                <div className="flex h-14 items-center rounded-lg border border-black bg-white">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                    className="h-full w-full bg-transparent px-4 outline-none placeholder:text-gray-600 font-bold"
                  />
                    {errors.password && (<p className='text-red-900'>Contraseña es requerido</p>)}
                    {errors.password && errors.password.type === "validate" && (<p className='text-red-900'>La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un carácter especial.</p>)}
                  <FiLock
                   type="button"
                     onClick={() => setShowPassword(!showPassword)}
                   className="mr-4 text-xl text-black" />
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

        {/* ================= IMAGE ================= */}
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


