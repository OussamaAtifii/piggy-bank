import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useAxios = () => {
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
  });

  useEffect(() => {
    const handleResponseError = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(handleResponseError);
    };
  }, [navigate, axiosInstance]);

  return axiosInstance;
};

export default useAxios;
