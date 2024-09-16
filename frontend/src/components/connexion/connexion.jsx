import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../slices/usersapiSlice";
import { setCredentials } from "../../slices/authSlice";
import "./connexion.scss";
import logoUrl from "../images/logoth.jpeg";
const Connexion = () => {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/admin");
    }
  }, [navigate, userInfo]);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ pseudo, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/admin");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container">
      <h1 className="animated-heading">B.M.B ترحب بك</h1>
      <img src={logoUrl} alt="Logo" className="logo" />
      <h2>تسجيل دخول</h2>
      <div className="row">
        <form onSubmit={onSubmit}>
          <input
            type="pseudo"
            id="pseudo"
            name="pseudo"
            value={pseudo}
            className="connexion"
            placeholder="إسم الحساب"
            onChange={(e) => setPseudo(e.target.value)}
          ></input>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            className="connexion"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة السر"
          ></input>
          <button type="submit" className="btn">
            دخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default Connexion;
