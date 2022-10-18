import { addCurrentUser } from "./actions";

export const getCurrentUser =
  (currentUserId, axiosPrivate, setIsLoading) => async (dispatch) => {
    const res = await axiosPrivate.get(`/account/user/${currentUserId}`);
    setIsLoading(false);
    dispatch(addCurrentUser({ user: res.data }));
  };
