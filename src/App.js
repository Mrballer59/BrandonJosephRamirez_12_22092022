import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./pages/Home/Home";
import Signin from "./pages/SignIn/SignIn";
import Error from "./pages/Error/Error404";
import User from "./pages/User/User";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";
import "./styles/index.css";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
