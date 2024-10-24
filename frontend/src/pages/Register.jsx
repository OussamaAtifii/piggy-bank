import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userRegistrationSchema } from '../schemas/userSchema';
import { useNavigate } from 'react-router-dom';
import { FacebookIcon, GithubIcon, GoogleIcon } from '../icons/Icons';
import RegisterSocialIcons from '../components/SocialAuthItem';
import UserIcon from '../icons/User';
import LockIcon from '../icons/Lock';
import EmailIcon from '../icons/Email';
import FormInput from '../components/FormInput';
import Spinner from '../icons/Spinner';

export function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userRegistrationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Si la respuesta no es válida, lanza un error
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error[0] || 'An error occurred while registering');
      }

      console.log(data);

      // Redirige al usuario a la página de inicio
      return navigate('/');
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error.message || 'Registration failed',
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
            <h1 className="text-4xl font-bold pb-8">CREATE AN ACCOUNT</h1>

            <div className="flex flex-col gap-1">
              {/* Email input */}
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

              {/* Username input */}
              <FormInput
                name="username"
                type="text"
                placeholder="Enter your username"
                icon={UserIcon}
                register={register}
                errors={errors}
                aria-invalid={errors.username ? 'true' : 'false'}
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

              {/* Confirm password input */}
              <FormInput
                name="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                icon={LockIcon}
                register={register}
                errors={errors}
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
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
                  'Register'
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
