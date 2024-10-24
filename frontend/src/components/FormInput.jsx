import { useState } from 'react';
import ClosedEye from '../icons/ClosedEye';
import Eye from '../icons/Eye';

const FormInput = ({
  type,
  placeholder,
  icon: Icon,
  register,
  errors,
  name,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          {Icon && <Icon className="size-7" />}
        </div>
        {type === 'password' && (
          <button
            type="button"
            tabIndex="-1"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute inset-y-0 end-0 flex items-center m-3.5 z-10"
          >
            {isPasswordVisible ? (
              <Eye className="size-5" />
            ) : (
              <ClosedEye className="size-5" />
            )}
          </button>
        )}
        <input
          {...register(name)}
          type={isPasswordVisible && type === 'password' ? 'text' : type}
          className="p-4 rounded-2xl w-full ps-12 border-2 bg-white"
          placeholder={placeholder}
        />
      </div>
      {/* Reservar espacio para el error, para que no desplace el layout */}
      <div className="min-h-[1.25rem]">
        {/* Espacio para los errores */}
        {errors[name] && (
          <p className="text-red-500 ml-2 text-sm">{errors[name].message}</p>
        )}
      </div>
    </div>
  );
};

export default FormInput;
