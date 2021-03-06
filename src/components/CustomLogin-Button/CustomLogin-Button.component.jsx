import React from "react";

import "./CustomLogin-Button.styles.scss";

const CustomLogin = ({ choice, getClicked }) => {
  return (
    <div className="login-button" onClick={getClicked}>
      <div className="icons-top envelope">
        <i className="fa fa-envelope fa-2x"></i>
      </div>
      <div className="login-button-text">{choice} With Email</div>
    </div>
  );
};
CustomLogin.defaultProps = {
  choice: "Sign-up"
};

export default CustomLogin;
