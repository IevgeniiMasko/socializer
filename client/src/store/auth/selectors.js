import jwt_decode from "jwt-decode";

export const authUserLoggedInSelector = (store) => store.auth.loggedIn;
export const authUserAccessTokenSelector = (store) => store.auth.accessToken;
export const authUserIdSelector = (store) => store.auth.authUser._id;
export const authUserSelector = (store) => store.auth.authUser;
