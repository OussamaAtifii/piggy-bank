import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userRegistrationSchema } from "../schemas/userSchema"
import { useNavigate } from "react-router-dom"
import { FacebookIcon, GithubIcon, GoogleIcon } from "../icons/Icons"
import RegisterSocialIcons from "../components/RegisterSocialIcons"
import UserIcon from "../icons/User"
import LockIcon from "../icons/Lock"
import EmailIcon from "../icons/Email"
import FormInput from "../components/FormInput"
import Spinner from "../icons/Spinner"

export function Register() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userRegistrationSchema),
  })

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      // Si la respuesta no es válida, lanza un error
      if (!res.ok) {
        const { error } = await res.json()
        throw new Error(error[0] || "An error occurred while registering")
      }

      console.log(data)

      // Redirige al usuario a la página de inicio
      return navigate("/")
    } catch (error) {
      setError("root", {
        type: "manual",
        message: error.message || "Registration failed",
      })
    }
  }

  return (
    <form
      className="flex flex-col md:grid grid-cols-2 gap-10 items-center md:h-screen md:p-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Formulario */}
      <div className="flex flex-col justify-self-center w-full md:w-1/2">
        <h1 className="text-2xl font-bold text-center">CREATE AN ACCOUNT!</h1>
        <div className="flex flex-col gap-4 pt-4">
          {/* Email input */}
          <FormInput
            name="email"
            type="email"
            placeholder="Enter your email"
            icon={EmailIcon}
            register={register}
            errors={errors}
            aria-invalid={errors.email ? "true" : "false"}
          />

          {/* Username input */}
          <FormInput
            name="username"
            type="text"
            placeholder="Enter your username"
            icon={UserIcon}
            register={register}
            errors={errors}
            aria-invalid={errors.username ? "true" : "false"}
          />

          {/* Password input */}
          <FormInput
            name="password"
            type="password"
            placeholder="Enter your password"
            icon={LockIcon}
            register={register}
            errors={errors}
            aria-invalid={errors.password ? "true" : "false"}
          />

          {/* Confirm password input */}
          <FormInput
            name="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            icon={LockIcon}
            register={register}
            errors={errors}
            aria-invalid={errors.confirmPassword ? "true" : "false"}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-500 flex justify-center gap-2 text-white font-semibold hover:bg-primary-600 p-4 rounded-2xl drop-shadow-lg transition duration-300"
          >
            {isSubmitting ? (
              <div role="status" className="flex items-center gap-2">
                <Spinner />
                <span>Loading...</span>
              </div>
            ) : (
              "Register"
            )}
          </button>

          <div className="min-h-8">
            {errors.root && (
              <p className="text-red-500 ml-2 text-sm text-center">
                {errors.root.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <hr className="w-full bg-gray-500 h-[2px]" />
            <p className="text-gray-500 text-nowrap">or register with</p>
            <hr className="w-full bg-gray-500 h-[2px]" />
          </div>

          {/* Socialite Login */}
          <div className="flex gap-4 justify-center">
            <RegisterSocialIcons icon={GoogleIcon} href={"/"} />
            <RegisterSocialIcons icon={GithubIcon} href={"/"} />
            <RegisterSocialIcons icon={FacebookIcon} href={"/"} />
          </div>
        </div>
      </div>

      {/* Imagen */}
      <div className="hidden bg-primary-500 rounded-3xl md:flex items-center justify-center h-full">
        <img src="../assets/piggybank-logo.png" alt="Piggybank logo" />
      </div>
    </form>
  )
}
