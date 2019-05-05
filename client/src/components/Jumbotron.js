import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center" }}
      className="jumbotron"
    >
      <div className="bgImage">
        {children}
      </div>
    </div>
  );
}

export default Jumbotron;
