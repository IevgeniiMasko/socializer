import axios from "../../api/axios";
import { logoutUser } from "./actions";

export const logoutUserThunk = () => async (dispatch) => {
  try {
    await axios.post("/auth/logout");
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(logoutUser());
    window.scrollTo(0, 0);
  }
};
