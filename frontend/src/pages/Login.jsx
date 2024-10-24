import { FacebookIcon, GithubIcon, GoogleIcon } from '../icons/Icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import EmailIcon from '../icons/Email';
import LockIcon from '../icons/Lock';
import Spinner from '../icons/Spinner';
import RegisterSocialIcons from '../components/SocialAuthItem';
import { useNavigate } from 'react-router-dom';
import { userLoginSchema } from '../schemas/userSchema';

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Si la respuesta no es válida, lanza un error
      if (!res.ok) {
        console.log('Im here');

        const { message } = await res.json();

        throw new Error(message || 'An error occurred while logging in');
      }

      console.log(data);

      // Redirige al usuario a la página de inicio
      return navigate('/');
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error.message || 'Login failed',
      });
    }
  };

  return (
    <div className="h-screen w-screen flex font-inter font-medium">
      <div className="w-1/3 h-full">
        <img
          src="/src/assets/piggybanks.jpg"
          alt="Piggybanks"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="w-2/3 h-full">
        <div className=" h-full w-[40%] mx-auto flex flex-col justify-center gap-8">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-4xl font-bold">WELCOME BACK!</h1>
            <p className="text-gray-500 pb-8">
              Please enter your credentials to access your account.
            </p>

            <div className="flex flex-col gap-1">
              {/* Email input */}
              <FormInput
                name="email"
                type="email"
                placeholder="Enter your email"
                icon={EmailIcon}
                register={register}
                errors={errors}
                aria-invalid={errors.email ? 'true' : 'false'}
              />

              {/* Password input */}
              <FormInput
                name="password"
                type="password"
                placeholder="Enter your password"
                icon={LockIcon}
                register={register}
                errors={errors}
                aria-invalid={errors.password ? 'true' : 'false'}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-500 flex justify-center gap-2 text-white font-semibold hover:bg-primary-600 py-4 rounded-2xl drop-shadow-lg transition duration-300"
              >
                {isSubmitting ? (
                  <div role="status" className="flex items-center gap-2">
                    <Spinner />
                    <span>Loading...</span>
                  </div>
                ) : (
                  'Log in'
                )}
              </button>
              {errors.root && (
                <p className="text-red-500 ml-2 text-sm text-center">
                  {errors.root.message}
                </p>
              )}
            </div>
          </form>

          <div className="flex items-center gap-4">
            <hr className="flex-1 bg-gray-500 h-[2px]" />
            <p className="text-gray-500 whitespace-nowrap text-sm">
              OR LOG IN WITH
            </p>
            <hr className="flex-1 bg-gray-500 h-[2px]" />
          </div>

          {/* Socialite Login */}
          <div className="grid grid-cols-2 gap-4">
            <RegisterSocialIcons icon={GoogleIcon} href={'/'} name="Google" />
            <RegisterSocialIcons icon={GithubIcon} href={'/'} name="GitHub" />
            <RegisterSocialIcons
              icon={FacebookIcon}
              href={'/'}
              name="Facebook"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
