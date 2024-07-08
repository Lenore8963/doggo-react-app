import React, { useContext } from "react";
import { AuthContext } from "../../auth-context";
import Icon from "../corgi-icon";
import "./welcome.css"; // Import the CSS file for styling

const Welcome = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex justify-center items-center ">
        <Icon />
      </div>
    );
  }

  return (
    <div className="greeting-container">
      <h2 className="greeting-text">Hello, {user.firstName}!</h2>
    </div>
  );
};

export default Welcome;
