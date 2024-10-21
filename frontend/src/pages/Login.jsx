import { FacebookIcon, GithubIcon, GoogleIcon } from "../icons/Icons"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import FormInput from "../components/FormInput"
import EmailIcon from "../icons/Email"
import LockIcon from "../icons/Lock"
import Spinner from "../icons/Spinner"
import RegisterSocialIcons from "../components/RegisterSocialIcons"
import { useNavigate } from "react-router-dom"
import { userLoginSchema } from "../schemas/userSchema"

export function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userLoginSchema),
  })

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      // Si la respuesta no es válida, lanza un error
      if (!res.ok) {
        console.log("Im here")

        const { message } = await res.json()

        throw new Error(message || "An error occurred while logging in")
      }

      console.log(data)

      // Redirige al usuario a la página de inicio
      return navigate("/")
    } catch (error) {
      setError("root", {
        type: "manual",
        message: error.message || "Login failed",
      })
    }
  }

  return (
    <form
      className="flex md:grid grid-cols-2 gap-10 items-center md:h-screen md:p-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col justify-self-center w-full md:w-1/2">
        <h1 className="text-4xl font-bold text-center">WELCOME BACK!</h1>
        <p className="text-gray-500 text-center pt-4">
          Please enter your credentials to access your account.
        </p>
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
              "Login"
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
            <p className="text-gray-500 text-nowrap">or login with</p>
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
      <div className="hidden bg-primary rounded-3xl md:flex items-center justify-center h-full">
        <img src="/src/assets/piggybank-logo.png" alt="Piggybank logo" />
      </div>
    </form>
  )
}
