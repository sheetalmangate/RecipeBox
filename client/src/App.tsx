import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";
import auth from "./utils/auth";
import "./main.css";
import Header from "./components/Header/Header.tsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(auth.loggedIn());

  const handleSetLoggedIn = (value: boolean) => {
    setLoggedIn(value);
  };

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn} />
      <Navbar loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn} />
      <main>
        <Outlet context={{ loggedIn, setLoggedIn: handleSetLoggedIn }} />
      </main>
    </>
  );
}

export default App;
