import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import jsPDF from "jspdf";
import tmp from "../images/tmp.jpeg";
import "../../fonts/Amiri-Italic-italic.js";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/usersapiSlice";
import { logout } from "../../slices/authSlice";
import items from "../Tableau/data.jsx";
import { FaMoneyBill, FaPercent, FaUsers, FaUser } from "react-icons/fa";
import {
  useRegisterMutation,
  useUpdateUserMutation,
  useUpdateTotalIncomeMutation,
  useTransferPointsMutation,
} from "../../slices/usersapiSlice";

import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import Header from "../Header/Header";
import "./admin.scss";
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
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  // Redux state
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserMutation();
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
  const [isContractPopupOpen, setContractPopupOpen] = useState(false);
  const toggleContractPopup = () => setContractPopupOpen(!isContractPopupOpen);
  const [pointsToSends, setPointsToSend] = useState("");
  const [partnerId, setPartnerId] = useState("");
  const [passwords, setPasswords] = useState("");

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.addFont("Amiri-Italic-italic.ttf", "Amiri", "normal"); // Ensure the font name matches your converted file
    doc.setFont("Amiri"); // Use the custom font
    doc.setFontSize(14);

    // Add image at the top (centered or aligned as needed)
    const imgWidth = 50; // Adjust the width of the image
    const imgHeight = 20; // Adjust the height of the image
    const pageWidth = doc.internal.pageSize.width; // Get page width for centering
    const xPos = (pageWidth - imgWidth) / 2; // Center the image horizontally
    doc.addImage(tmp, "JPEG", xPos, 10, imgWidth, imgHeight);

    doc.text("BIG MONEY BUSINESS", 10, 10);
    doc.text("العقد الإلكتروني", 10, 20);

    doc.setFontSize(12);
    doc.text(`التاريخ: ${userInfo.createdAt}`, 10, 30);
    doc.text(`الاسم الكامل للعميل: ${userInfo.nom} ${userInfo.prenom}`, 10, 40);
    doc.text(`رقم الهاتف المحمول: ${userInfo.tel}`, 10, 50);
    doc.text(`معلومات الحساب: ${userInfo._id}`, 10, 60);
    doc.text(` رقم ألهوية: ${userInfo.cin}`, 10, 70);

    doc.text(`اسم الحساب: ${userInfo.pseudo}`, 10, 80);
    doc.text(`المبلغ المدفوع: 43$+الرسوم`, 10, 90);
    doc.text("المنتج: حساب متجر إلكتروني", 10, 100);

    doc.setFontSize(11);
    doc.text(
      "لقد قمت بتأكيد عملية الشراء المذكورة أعلاه. وتؤكد اشتراكك في خطة التسويق الخاصة بنا،",
      10,
      110
    );
    doc.text(
      "والتي تمنحك عمولات وفقًا للجدول الخاص بك. الجميع استثمارات فريقك وسيكون الدفع وفقًا لشريحتك",
      10,
      120
    );
    doc.text(
      "كما أوضحنا في شروط الخدمة الخاصة بنا ولهذا نوفر لك حسابا لإدارة عملك ومعرفة عدد فريقك وفقًا للخطة التي انضممت إليها.",
      10,
      130
    );

    doc.setFontSize(12);
    doc.text("يرجى الملاحظة:", 10, 140);
    doc.setFontSize(11);
    doc.text(
      "1. نحن لا نعدك بأي دخل ولكن نعدك بإطلاق دفعتك دائما كما شرحنا في الخطة التي اشتركت فيها.",
      10,
      150
    );
    doc.text(
      "2. سيتم القاء جميع المحاضرات المذكورة في دورات التدريب عبر تطبيق زوم أو تكون حضورياً.",
      10,
      160
    );
    doc.text(
      "3. المبلغ المذكور أعلاه لا يدخل ضمن الرسوم الجمركية ويتم تعديله وفقاً لأحكام كل بلد.",
      10,
      170
    );
    doc.text(
      "4. إذا لم تجد روابط الدورات أو لم تتمكن من الحضور الدورات التدريب أو دورات الاستثمار اتصل بالشركة مباشرة.",
      10,
      180
    );

    doc.setFontSize(12);
    doc.text(
      "نحن سعداء باختيارك لـ BIG MONEY BUSINESS وفريقنا جاهز دائماً لخدمتك.",
      10,
      190
    );
    doc.setFontSize(12);
    doc.text("توقيع العميل:", 10, 200);
    doc.setFontSize(12);
    doc.text(
      "(هذه الوثيقة تم انشاؤها تلقائيا ولاتطلب توقيعاً من BMB)",
      10,
      230
    );
    // Save the PDF
    doc.save("contract_preview.pdf");
  };
  const markNotificationsAsRead = async () => {
    try {
      const response = await fetch(
        "https://bmb-76h1.onrender.com/api/users/mark-notifications-read",
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (response.ok) {
        setUnreadCount(0);
        // Optionally fetch notifications again to update the state
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  // Call this function when opening the notifications popup
  useEffect(() => {
    if (isNotificationVisible) {
      markNotificationsAsRead();
    }
  }, [isNotificationVisible]);

  // Toggle functions for popups
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "https://bmb-76h1.onrender.com/api/users/notifications",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();
        setNotifications(data.notifications);

        // Count unread notifications
        const unread = data.notifications.filter(
          (notif) => !notif.isRead
        ).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);
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
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          nom,
          prenom,
          pseudo,
          email,
          tel,
          password,
        }).unwrap({ credentials: "include" });

        // Dispatch updated credentials
        dispatch(
          setCredentials({
            ...userInfo,
            ...res,
          })
        );
        toggleUpdatePopup();
        toast.success("تم التحديث");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
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

    // If the user is not an admin, set partnerId to admin's ID
    const recipientId =
      userInfo.role === "admin" ? partnerId : "67544116d2f85f101f7eef43"; // Admin's ID

    const data = {
      senderPseudo: userInfo.pseudo, // Sender's pseudo
      recipientId, // Recipient's user ID (admin's ID for non-admins)
      pointsToTransfer: Number(pointsToSends), // Points to transfer
      pointsToSending: Number(pointsToSends), // Points to deduct from sender
      password: passwords, // Sender's password for validation
    };

    try {
      const response = await fetch(
        "https://bmb-76h1.onrender.com/api/users/transfer-points",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials for cookies
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      // If transfer is successful, close the popup and show success toast
      toggleBalancePopup();
      toast.success("تم ارسال الرصيد");
    } catch (error) {
      // Show error message if the transfer fails
      toast.error("!الرجاء التثبت من البيانات");
    }
  };

  const adminId = "67544116d2f85f101f7eef43";
  return (
    <div className="container">
      <h1 className="animated-title">B.M.B ترحب بك</h1>
      <h1>أنت في عائلة متكاملة معا نسعى إلى التطور والتقدم</h1>

      {/* Button Grid */}
      <div className="button-grid">
        <button className="open-notification-btn" onClick={toggleNotification}>
          عرض الإشعارات {unreadCount > 0 && `(${unreadCount})`}
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
        <button
          className="btn-responsive upshop-btn"
          onClick={toggleupshopPopup}
        >
          تحديث المتجر
        </button>
        <button
          className="btn-responsive contract-btn"
          onClick={toggleContractPopup}
        >
          العقد الإلكتروني
        </button>
      </div>

      {/* Balance Popup */}
      {isBalancePopupVisible && (
        <div className="balance-popup">
          <div className="balance-popup-content">
            <h3>التحقق من الرصيد</h3>
            <p>{userInfo.pointstosend} دينار تونسي</p>
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
                min="0"
                onWheel={(e) => e.target.blur()}
                required
              />

              {/* Conditionally render partner ID input for admin, else use hidden input */}
              {userInfo.role === "admin" ? (
                <input
                  type="text"
                  placeholder="معرف الشريك"
                  value={partnerId}
                  onChange={(e) => setPartnerId(e.target.value)}
                  required
                />
              ) : (
                <input
                  type="hidden"
                  value={adminId} // Automatically set adminId for regular users
                  onChange={() => setPartnerId(adminId)}
                />
              )}

              <input
                type="password"
                placeholder="كلمة السر"
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
            <h3>الإشعارات</h3>
            {notifications.length === 0 ? (
              <p>لا توجد إشعارات جديدة</p>
            ) : (
              <ul>
                {notifications.map((notif, index) => (
                  <li key={index}>
                    {notif.message} -{" "}
                    {new Date(notif.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
            <button
              className="close-notification-btn"
              onClick={toggleNotification}
            >
              غلق
            </button>
          </div>
        </div>
      )}

      {/* Contract Popup */}
      {isContractPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>BIG MONEY BUSINESS</h2>
            <h4>العقد الإلكتروني</h4>
            <ul className="contract-details">
              <li>
                <strong>التاريخ:</strong> {userInfo.createdAt}
              </li>
              <li>
                <strong>الاسم الكامل للعميل:</strong> {userInfo.nom}{" "}
                {userInfo.prenom}
              </li>
              <li>
                <strong>رقم ألهوية:</strong> {userInfo.cin}
              </li>
              <li>
                <strong>معلومات الحساب:</strong> {userInfo._id}
              </li>
              <li>
                <strong>اسم الحساب:</strong> {userInfo.pseudo}
              </li>
              <li>
                <strong>المبلغ المدفوع:</strong> 43$+الرسوم
              </li>
              <li>
                <strong>المنتج:</strong> حساب متجر إلكتروني
              </li>
            </ul>
            <p className="contract-text">
              BIG MONEY BUSINESS <br />
              لقد قمت بتأكيد عملية الشراء المذكورة أعلاه. وتؤكد اشتراكك في خطة
              التسويق الخاصة بنا، والتي تمنحك عمولات وفقًا للجدول الخاص بك.
              الجميع استثمارات فريقك وسيكون الدفع وفقًا لشريحتك كما أوضحنا في
              شروط الخدمة الخاصة بنا ولهذا نوفر لك حسابا لإدارة عملك ومعرفة عدد
              فريقك وفقًا للخطة التي انضممت إليها.
            </p>
            <p className="contract-text">
              <strong>يرجى الملاحظة:</strong>
              <ol>
                <li>
                  نحن لا نعدك بأي دخل ولكن نعدك بإطلاق دفعتك دائما كما شرحنا في
                  الخطة التي اشتركت فيها.
                </li>
                <li>
                  سيتم القاء جميع المحاضرات المذكورة في دورات التدريب عبر تطبيق
                  زوم أو تكون حضورياً في بعض الأحيان.
                </li>
                <li>
                  المبلغ المذكور أعلاه لا يدخل ضمن الرسوم الجمركية ويتم تعديله
                  وفقاً لأحكام كل بلد.
                </li>
                <li>
                  إذا لم تجد روابط الدورات أو لم تتمكن من الحضور الدورات التدريب
                  أو دورات الاستثمار اتصل بالشركة مباشرة.
                </li>
              </ol>
            </p>
            <p className="contract-text">
              نحن سعداء باختيارك لـ BIG MONEY BUSINESS وفريقنا جاهز دائما لخدمتك
              بالطريقة التي تجعل عملك أسهل ومريحًا.
            </p>
            <p className="contract-text">توقيع العميل: </p>
            <p className="contract-text">
              (هذه الوثيقة تم انشاؤها تلقائيا ولاتطلب توقيعاً من BMB)
            </p>
            <img src={tmp} alt="Logo" className="logo-s" />
            <button className="download-btn" onClick={downloadPDF}>
              تحميل PDF
            </button>
            <button className="close-btn" onClick={toggleContractPopup}>
              إغلاق
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

      {/* New Buttons */}
      <div className="new-buttons-container">
        <button className="secondary-rank-profits-btn">العروض :</button>
        <button className="secondary-p-profits-btn">
          <Link
            to="/Formation"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            دورة الإستثمار
          </Link>
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
              تاريخ اخر دخول:
              {userInfo.previousLastLogin || "لا يوجد تسجيل دخول سابق"}
            </h1>
            <br></br>

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
      <button
        className="btn btn-outline-success"
        type="submit"
        onClick={logoutHandler}
      >
        خروج &nbsp;
        <FaArrowLeft size={20} />
      </button>
    </div>
  );
};

export default Admin;
