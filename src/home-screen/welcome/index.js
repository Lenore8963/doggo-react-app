import React, { useContext } from "react";
import { AuthContext } from "../../auth-context";
import "./welcome.css"; // Import the CSS file for styling

const Welcome = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }

  return (
    <div className="greeting-container">
      <h2 className="greeting-text">Hello, {user.firstName}!</h2>
    </div>
  );
};

export default Welcome;
