import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/layout";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import Collection from "./pages/collection";
import ForgotPassword from "./pages/forgot-password";
import Single from "./pages/single";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}>
        <Route
          index
          element={<Home />}
        />
        <Route
          path="sign-in"
          element={<SignIn />}
        />
        <Route
          path="collection"
          element={<Collection />}
        />
        <Route
          path="forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="daily-single"
          element={<Single />}
        />
      </Route>
    </Routes>
  );
}

export default App;
