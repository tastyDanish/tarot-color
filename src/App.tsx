import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/layout";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import Collection from "./pages/collection";

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
      </Route>
    </Routes>
  );
}

export default App;
