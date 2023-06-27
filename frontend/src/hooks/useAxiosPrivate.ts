import { useEffect } from "react";
import { axiosPrivate } from "../apis/axios";
import { nanoid } from "nanoid";

export const useAxiosPrivate = () => {
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["x-user-email"]) {
          config.headers["x-user-email"] = import.meta.env.GUEST_USER;
        }
        if (!config.headers["x-correlation-id"]) {
          config.headers["x-correlation-id"] = nanoid();
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error) {
          console.log(error);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, []);
  return axiosPrivate;
};

export default useAxiosPrivate;
