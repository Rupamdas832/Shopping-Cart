import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../Store";
import "./LoginModal.css";

export const LoginModal = () => {
  const { userDispatch } = useUser();
  return (
    <div className="modal">
      <div className="modalBox">
        <h3>
          To checkout you have to be{" "}
          <span style={{ color: "green" }}>Logged In</span>
        </h3>
        <p>Do you want to login?</p>
        <div className="isLoginBtns">
          <button
            className="btn outline"
            onClick={() =>
              userDispatch({ type: "LOGIN_MODAL", payload: false })
            }
          >
            Cancel
          </button>
          <Link
            to="/login"
            onClick={() =>
              userDispatch({ type: "LOGIN_MODAL", payload: false })
            }
          >
            <button className="btn">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
