import React, { useContext } from "react";
import { AuthContext } from "../../auth-context";

const Welcome = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>Welcome, {user.firstName}!</h2>
    </div>
  );
};

export default Welcome;
