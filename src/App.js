import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { useState } from "react";
import Protected from "./components/Protected";
import Home from "./components/Home";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const signin = () => {
    setIsSignedIn(true);
  };
  const signout = () => {
    setIsSignedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login signin={signin} />}></Route>
        <Route
          path="/home"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Home signout={signout} />
            </Protected>
          }
        ></Route>
      </Routes>
      
    </Router>
  );
}

export default App;
