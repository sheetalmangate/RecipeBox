import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";
import auth from "./utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(auth.loggedIn());

  const handleSetLoggedIn = (value: boolean) => {
    setLoggedIn(value);
  };

  return (
    <div className="container">
      <Navbar loggedIn={loggedIn} setLoggedIn={handleSetLoggedIn} />
      <main>
        <Outlet context={{ loggedIn, setLoggedIn: handleSetLoggedIn }} />
      </main>
    </div>
  );
}

export default App;
