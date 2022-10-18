import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { updateToken } from "../store/auth/actions";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    try {
      const result = await axios.get("/refreshToken", {
        withCredentials: true,
      });
      dispatch(updateToken(result.data));
      return result.data.accessToken;
    } catch (error) {
      throw new Error(error);
    }
  };
  return refresh;
};

export default useRefreshToken;
