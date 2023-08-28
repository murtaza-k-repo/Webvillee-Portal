import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Protected from "./components/Protected";
import Home from "./components/Home";
import Department from "./components/Department";
import Roles from "./components/Roles";
import Users from "./components/Users";
import Root from "./components";

function App() {
  return (
    <Router basename="portal">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <Protected>
              <Root />
            </Protected>
          }
        >
          <Route path="/" element={<Home />}></Route>
          <Route path="/department" element={<Department />}></Route>
          <Route path="/roles" element={<Roles />}></Route>
          <Route path="/users" element={<Users />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
