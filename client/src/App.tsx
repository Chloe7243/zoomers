import "./App.css";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";

import store from "./store/index";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import RootLayout from "./layouts/RootLayout";
import RouteError from "./components/RouteError";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="*" element={<RouteError />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
