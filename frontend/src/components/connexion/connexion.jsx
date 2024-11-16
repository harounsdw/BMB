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
    <div className="container cnx">
      <h1>BIG MONEY BUSINESS</h1>
      <h3>عالم البزنس مودل بين يديك</h3>
      <h2>أهلاً بك</h2>
      <br></br>
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
        <div className="slider">
          <img src={logoUrl} alt="Logo" className="logo" />
        </div>
      </div>
      <div className="footer">
        <button>شروط الخدمة</button>
        <button>قصتنا</button>
        <button>رؤيتنا</button>
      </div>
    </div>
  );
};

export default Connexion;
