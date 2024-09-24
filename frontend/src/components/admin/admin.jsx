import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import items from "../Tableau/data.jsx";
import { FaMoneyBill, FaPercent, FaUsers, FaUser } from "react-icons/fa";
import {
  useRegisterMutation,
  useUpdateTotalIncomeMutation,
  useTransferPointsMutation,
} from "../../slices/usersapiSlice";

import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import Header from "../Header/Header";
import "./admin.scss";
import "../Tableau/tableau.scss";
const Admin = () => {
  // State for form fields
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [cin, setCin] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [createdBy, setCreator] = useState("");
  const [points, setPoints] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Redux state
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [updateTotalIncome] = useUpdateTotalIncomeMutation();
  const [transferPoints, { isLoading: isTransferring }] =
    useTransferPointsMutation();

  // State for popups visibility
  const [isFormPopupVisible, setFormPopupVisible] = useState(false);
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [isUpdatePopupVisible, setUpdatePopupVisible] = useState(false);
  const [isBalancePopupVisible, setBalancePopupVisible] = useState(false);
  const [isupshopPopupVisible, setupshopPopupVisible] = useState(false);
  const [pointsToSends, setPointsToSend] = useState("");
  const [partnerId, setPartnerId] = useState("");
  const [passwords, setPasswords] = useState("");

  // Toggle functions for popups
  const toggleFormPopup = () => {
    // Reset the form to empty when opening the registration form
    if (!isFormPopupVisible) {
      setNom("");
      setPrenom("");
      setPseudo("");
      setCin("");
      setEmail("");
      setTel("");
      setPoints("");
      setCreator("");
      setPassword("");
      setConfirmPassword("");
    }
    setFormPopupVisible(!isFormPopupVisible);
  };

  const toggleNotification = () =>
    setNotificationVisible(!isNotificationVisible);
  const toggleupshopPopup = () => setupshopPopupVisible(!isupshopPopupVisible);
  const toggleUpdatePopup = () => {
    // Pre-fill the form only when opening the update form
    if (!isUpdatePopupVisible && userInfo) {
      setNom(userInfo.nom || "");
      setPrenom(userInfo.prenom || "");
      setPseudo(userInfo.pseudo || "");
      setEmail(userInfo.email || "");
      setTel(userInfo.tel || "");
      setPassword(""); // Leave password blank
      setConfirmPassword(""); // Leave confirm password blank
    }
    setUpdatePopupVisible(!isUpdatePopupVisible);
  };

  const toggleBalancePopup = () =>
    setBalancePopupVisible(!isBalancePopupVisible);

  // Submission handlers
  const submitUpdateHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
    } else {
      const data = {
        _id: userInfo._id,
        nom,
        prenom,
        pseudo,
        email,
        tel,
        password,
      };

      try {
        const response = await fetch(
          "https://bmb-9bgg.onrender.com/api/users/profile",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
            credentials: "include", // Ensure credentials (cookies) are included
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        dispatch(
          setCredentials({
            ...userInfo,
            ...result,
          })
        );

        toggleUpdatePopup();
        toast.success("تم التحديث");
      } catch (error) {
        toast.error("حدث خطأ أثناء التحديث");
      }
    }
  };

  const submitRegistrationHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
    } else {
      try {
        const res = await register({
          nom,
          prenom,
          pseudo,
          cin,
          email,
          tel,
          createdBy: userInfo.pseudo,
          points,
          password,
        }).unwrap();
        toast.success("تم تسجيل الحساب بنجاح");
        toggleFormPopup();

        // Keep the user on the same page after registration, but do not auto-login
        // Show a message prompting the user to log in
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    console.log("UserInfo updated:", userInfo);

    // Calculate total income
    const income = items.reduce((acc, element) => {
      const partnersCount =
        element.name.trim() === "الجيل الأول"
          ? userInfo?.createdByUserCount || 0
          : element.name.trim() === "الجيل الثاني"
          ? userInfo?.secondGenUserCount || 0
          : element.name.trim() === "الجيل الثالث"
          ? userInfo?.thirdGenUserCount || 0
          : element.name.trim() === "الجيل الرابع"
          ? userInfo?.fourthGenUserCount || 0
          : element.name.trim() === "الجيل الخامس"
          ? userInfo?.fifthGenUserCount || 0
          : element.name.trim() === "الجيل السادس"
          ? userInfo?.sixthGenUserCount || 0
          : 0;

      return acc + partnersCount * parseFloat(element.wallet);
    }, 0);

    setTotalIncome(income);
  }, [userInfo]);
  useEffect(() => {
    if (userInfo && totalIncome) {
      updateTotalIncome(totalIncome)
        .unwrap()
        .then((response) => {
          console.log("Total income updated successfully:", response);
        })
        .catch((error) => {
          console.error("Error updating total income:", error);
        });
    }
  }, [userInfo, totalIncome, updateTotalIncome]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      senderPseudo: userInfo.pseudo,
      recipientId: partnerId, // Recipient's user ID
      pointsToTransfer: Number(pointsToSends), // Points to transfer
      pointsToSending: Number(pointsToSends),
      password: passwords, // Sender's password for validation
    };

    try {
      // Correct URL should be used
      await fetch("https://bmb-9bgg.onrender.com/api/users/transfer-points", {
        // Ensure this matches your backend route
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          toast.success("تم ارسال الرصيد");
        });
    } catch (error) {
      toast.error("!الرجاء التثبت من البيانات");
    }
  };

  return (
    <div className="container">
      <h1 className="animated-title">B.M.B ترحب بك</h1>
      <h1>أنت في عائلة متكاملة معا نسعى إلى التطور والتقدم</h1>

      {/* Button Grid */}
      <div className="button-grid">
        <button className="open-notification-btn" onClick={toggleNotification}>
          عرض الإشعارات
        </button>
        <button className="open-popup-btn" onClick={toggleFormPopup}>
          فتح استمارة التسجيل
        </button>
        <button className="open-update-popup-btn" onClick={toggleUpdatePopup}>
          فتح استمارة التحديث
        </button>
        <button className="balance-btn" onClick={toggleBalancePopup}>
          الرصيد
        </button>
      </div>
      <Header />
      <div className="button-grid-L">
        <button className="upshop-btn" onClick={toggleupshopPopup}>
          تحديث المتجر
        </button>
      </div>
      {/* Balance Popup */}
      {isBalancePopupVisible && (
        <div className="balance-popup">
          <div className="balance-popup-content">
            <h3>التحقق من الرصيد</h3>
            <p>{totalIncome + userInfo.pointstosend}</p>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                placeholder="الرصيد المرسل"
                value={pointsToSends}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0) {
                    setPointsToSend(value);
                  }
                }}
                min="0" // Prevents typing negative numbers
                onWheel={(e) => e.target.blur()} // Disables scrolling through negative numbers
                required
              />

              <input
                type="text"
                placeholder="معرف الشريك"
                value={partnerId}
                onChange={(e) => setPartnerId(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="كلمة السر "
                value={passwords}
                onChange={(e) => setPasswords(e.target.value)}
                required
              />
              <button type="submit">إرسال</button>
            </form>
            <button onClick={toggleBalancePopup}>غلق</button>
          </div>
        </div>
      )}

      {/* Notification Popup */}
      {isNotificationVisible && (
        <div className="notification-popup">
          <div className="notification-content">
            <p>الإشعارات</p>
            <button
              className="close-notification-btn"
              onClick={toggleNotification}
            >
              غلق
            </button>
          </div>
        </div>
      )}

      {/* upshop Popup */}
      {isupshopPopupVisible && (
        <div className="notification-popup">
          <div className="notification-content">
            <input type="text" placeholder="الرصيد" />
            <button type="submit">تحديث</button>
            <button
              className="close-notification-btn"
              onClick={toggleupshopPopup}
            >
              غلق
            </button>
          </div>
        </div>
      )}
      {/* Registration Popup */}
      {isFormPopupVisible && (
        <div className="popup-form">
          <div className="popup-content">
            <h3>استمارة التسجيل</h3>
            <form onSubmit={submitRegistrationHandler}>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="الإسم"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
              <input
                type="text"
                id="prenom"
                name="prenom"
                placeholder="اللقب"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
              <input
                type="text"
                id="pseudo"
                name="pseudo"
                placeholder="إسم الحساب"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
              <input
                type="text"
                id="cin"
                name="cin"
                placeholder="رقم الهوية"
                value={cin}
                onChange={(e) => setCin(e.target.value)}
              />
              <input
                type="text"
                id="email"
                name="email"
                placeholder="الإميل"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                id="tel"
                name="tel"
                placeholder="الهاتف"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
              <input
                type="text"
                id="points"
                name="points"
                placeholder="150"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                disabled
              />
              <input
                type="text"
                id="creator"
                name="creator"
                placeholder="إسم الحساب"
                value={createdBy}
                onChange={(e) => setCreator(e.target.value)}
                hidden
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="كلمة السر"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="تأكيد كلمة السر"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit">تسجيل</button>
            </form>
            <button className="close-popup-btn" onClick={toggleFormPopup}>
              غلق
            </button>
          </div>
        </div>
      )}

      {/* Update Popup */}
      {isUpdatePopupVisible && (
        <div className="update-popup">
          <div className="update-popup-content">
            <h3>استمارة التحديث</h3>
            <form onSubmit={submitUpdateHandler}>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="الإسم"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
              <input
                type="text"
                id="prenom"
                name="prenom"
                placeholder="اللقب"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
              <input
                type="text"
                id="pseudo"
                name="pseudo"
                placeholder="إسم الحساب"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
              <input
                type="text"
                id="email"
                name="email"
                placeholder="الإميل"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                id="tel"
                name="tel"
                placeholder="الهاتف"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="كلمة السر"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="تأكيد كلمة السر"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit">تحديث</button>
            </form>
            <button
              className="close-update-popup-btn"
              onClick={toggleUpdatePopup}
            >
              غلق
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th className="col1">
                <FaUser size={20} color="white" /> &nbsp; الأجيال
              </th>
              <th className="col2">
                <FaUsers size={20} color="white" /> &nbsp; الشركاء
              </th>
              <th className="col3">
                <FaPercent size={20} color="white" /> &nbsp;النسبة
              </th>
              <th className="col4">
                <FaMoneyBill size={20} color="white" /> &nbsp;الأرباح
              </th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((element) => {
                // Define the partners count based on the generation
                const partnersCount =
                  element.name.trim() === "الجيل الأول"
                    ? userInfo?.createdByUserCount
                    : element.name.trim() === "الجيل الثاني"
                    ? userInfo?.secondGenUserCount
                    : element.name.trim() === "الجيل الثالث"
                    ? userInfo?.thirdGenUserCount
                    : element.name.trim() === "الجيل الرابع"
                    ? userInfo?.fourthGenUserCount
                    : element.name.trim() === "الجيل الخامس"
                    ? userInfo?.fifthGenUserCount
                    : element.name.trim() === "الجيل السادس"
                    ? userInfo?.sixthGenUserCount
                    : 0;

                // Filter out rows with partnersCount equal to 0
                return partnersCount > 0;
              })
              .map((element) => (
                <tr key={element.id}>
                  <td className="col1">{element.name.trim()}</td>
                  <td className="col2">
                    {element.name.trim() === "الجيل الأول"
                      ? userInfo?.createdByUserCount
                      : element.name.trim() === "الجيل الثاني"
                      ? userInfo?.secondGenUserCount
                      : element.name.trim() === "الجيل الثالث"
                      ? userInfo?.thirdGenUserCount
                      : element.name.trim() === "الجيل الرابع"
                      ? userInfo?.fourthGenUserCount
                      : element.name.trim() === "الجيل الخامس"
                      ? userInfo?.fifthGenUserCount
                      : element.name.trim() === "الجيل السادس"
                      ? userInfo?.sixthGenUserCount
                      : ""}
                  </td>
                  <td className="col3">{element.percent}</td>
                  <td className="col4">{element.wallet}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* New Buttons */}
      <div className="new-buttons-container">
        <button className="secondary-rank-profits-btn">
          أرباح الرتب الثانوية:
        </button>
        <button className="ranc-btn">RANC:PARTNER </button>
      </div>

      {/* Info Buttons */}
      <div className="button-grid-info">
        {userInfo ? (
          <>
            <button className="info-btn info-btn-registration">
              <span className="info-btn-content">
                تاريخ التسجيل: {userInfo.createdAt}
              </span>
            </button>
            <h1>
              تاريخ اخر دخول:{" "}
              {userInfo.previousLastLogin || "لا يوجد تسجيل دخول سابق"}
            </h1>
            <button className="info-btn info-btn-income">
              <span className="info-btn-content">
                الدخل الكلي:{totalIncome}
              </span>
            </button>
          </>
        ) : (
          <>
            <button className="info-btn info-btn-registration">
              <span className="info-btn-content">تاريخ التسجيل:</span>
            </button>
            <h1>
              تاريخ اخر دخول:{" "}
              {userInfo.previousLastLogin || "لا يوجد تسجيل دخول سابق"}
            </h1>
            <button className="info-btn info-btn-income">
              <span className="info-btn-content">الدخل الكلي:</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
