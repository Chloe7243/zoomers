import "./App.css";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";

import store from "./store/store";
import Explore from "./pages/Explore";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import RouteError from "./pages/RouteError";
import RootLayout from "./layouts/RootLayout";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";

function App() {
  return (
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="*" element={<RouteError />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="explore" element={<Explore />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="post/:id" element={<Profile />} />
          </Route>
        </Routes>
      </Provider>
  );
}

export default App;
