import React from "react";

import { useHistory } from "react-router";

const Modal = ({ children }) => {
  const history = useHistory();

  function back(e, bool) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    history.goBack();
  }

  return (
    <div
      onClick={(e) => back(e, true)}
      style={{
        position: "fixed",
        zIndex: 101,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.15)",
      }}
    >
      <div
        onClick={(e) => back(e, true)}
        className="modal"
        style={{
          position: "absolute",
          top: 140,
          left: "10%",
          right: "10%",
          padding: 15,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
