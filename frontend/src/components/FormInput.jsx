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
            onClick={() => {
              setIsPasswordVisible(!isPasswordVisible);
              console.log(isPasswordVisible);
            }}
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
          className="p-4 bg-gray-100 rounded-2xl w-full ps-12"
          placeholder={placeholder}
        />
      </div>
      {errors[name] && (
        <p className="text-red-500 ml-2 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};

export default FormInput;
