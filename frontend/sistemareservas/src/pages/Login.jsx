import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Agregamos el useState
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { FiMail, FiLock,FiArrowLeft } from "react-icons/fi";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { iniciodesesion, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [ showPassword, setShowPassword ] = useState(false);

    const onSubmit = handleSubmit((data) => {
        iniciodesesion(data);
    });

    useEffect(() => {
    if (isAuthenticated) navigate("/sala");
     }, [isAuthenticated]);

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
                Iniciar Sesión
              </h1>
              <p className="mt-2 text-base font-bold">
                Bienvenido de nuevo. Reserva tu cancha.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={onSubmit} className="flex flex-col gap-6">

              {/* EMAIL */}
              <div>
                <label  htmlFor="email" className="block pb-2 text-base font-bold">
                  Correo electrónico
                </label>
                <div className="flex h-14 items-center rounded-lg border border-black bg-white">
                  <input
                   type="email"
                    {...register("email", { required: true })}
                    className="h-full w-full bg-transparent px-4 outline-none placeholder:text-gray-600 font-bold"
                  />
                  <FiMail className="mr-4 text-xl text-black" />
                </div>
                {errors.email && (<p className='text-red-900'>Correo electrónico es requerido</p>)}
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
                  <FiLock 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-4 text-xl text-black" />
                </div>
                {errors.password && (<p className='text-red-900'>La contraseña es requerida</p>)}
              </div>

              {/* OLVIDE PASSWORD 
              <div className="flex justify-end">
                <Link
                  to="#"
                  className="text-sm font-bold underline"
                >
                  Olvidé mi contraseña
                </Link>
              </div>
*/}
              {/* BUTTON */}
              <button
                type="submit"
                className="h-14 w-full rounded-lg border border-black font-black hover:bg-gray-100"
              >
                Iniciar sesión
              </button>

              {/* REGISTER */}
              <p className="text-center text-sm font-bold">
                ¿No tienes una cuenta?{" "}
                <Link to="/registro" className="underline font-black">
                  Regístrate
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

export default Login;