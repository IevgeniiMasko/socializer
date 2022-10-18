import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

//Pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Newsfeed from "./pages/Newsfeed/Newsfeed";

//Components
import Header from "./components/Header/Header";
import SideComponents from "./components/SideComponents/SideComponents";
import AccountHead from "./pages/Account/AccountHead/AccountHead";
import AccountPosts from "./pages/Account/AccountPosts/AccountPosts";
import AccountAbout from "./pages/Account/AccountAbout/AccountAbout";
import AccountFriends from "./pages/Account/AccountFriends/AccountFriends";
import AccountPhotos from "./pages/Account/AccountPhotos/AccountPhotos";

//Protected route
import ProtectedRoute from "./components/ProtectedRoute";
import PersistLogin from "./components/PersistLogin";
import People from "./pages/People/People";

const Application = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<ProtectedRoute isProtected={false} element={<Login />} />}
      />
      <Route
        path="/register"
        element={<ProtectedRoute isProtected={false} element={<Register />} />}
      />

      <Route element={<PersistLogin />}>
        <Route
          path="/*"
          element={<ProtectedRoute isProtected={true} element={<Header />} />}
        >
          <Route path="*" element={<SideComponents />}>
            <Route path="account/:currentUserId" element={<AccountHead />}>
              <Route index element={<AccountPosts />}></Route>
              <Route path="about" element={<AccountAbout />}></Route>
              <Route path="friends" element={<AccountFriends />}></Route>
              <Route path="photos" element={<AccountPhotos />}></Route>
            </Route>
            <Route path="newsfeed" element={<Newsfeed />}></Route>
            <Route path="people" element={<People />}></Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Application;
