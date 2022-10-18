import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosPrivate } from "../api/axios";

//hooks
import useRefreshToken from "./useRefreshToken";

//store
import { authUserAccessTokenSelector } from "../store/auth/selectors";
import { logoutUserThunk } from "../store/auth/thunk";

const useAxiosPrivate = () => {
  const accessToken = useSelector(authUserAccessTokenSelector);
  const refresh = useRefreshToken();
  const dispatch = useDispatch();

  useEffect(() => {
    const axiosPrivateRequest = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config?.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      }
    );

    const axiosPrivateResponse = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.response?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        } else {
          dispatch(logoutUserThunk());
        }
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(axiosPrivateRequest);
      axiosPrivate.interceptors.response.eject(axiosPrivateResponse);
    };
  }, [accessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
