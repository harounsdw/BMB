import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/usersapiSlice";
import { logout } from "../../slices/authSlice";
import "./Header.scss";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      {userInfo ? (
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="user-info d-flex align-items-center">
            <h2>
              أهلاً بك: {userInfo.nom} &nbsp; {userInfo.prenom}
            </h2>
            <div className="vr mx-3"></div>
          </div>
          <div className="d-flex align-items-center">
            <div className="vr mx-3"></div>

            <h7 className="me-3">ID: {userInfo._id}</h7>
            <div className="vr mx-3"></div>
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={logoutHandler}
            >
              خروج &nbsp;
              <FaArrowLeft size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="container-fluid"></div>
      )}
    </nav>
  );
};

export default Header;
