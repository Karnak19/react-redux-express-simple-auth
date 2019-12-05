import React from "react";
import Register from "./Register";
import Login from "./Login";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row"
      }}
    >
      <Register />
      <Login />
    </div>
  );
}

export default Home;
