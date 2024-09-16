import React, { useEffect, useState } from "react";
import items from "./data.jsx";
import { FaMoneyBill, FaPercent, FaUsers, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

import "./tableau.scss";

function TableauP() {
  const { userInfo } = useSelector((state) => state.auth);
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

  return (
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
          {items.map((element) => (
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

      {/* Display total income in the button */}
      <button className="info-btn info-btn-income">
        <span className="info-btn-content">الدخل الكلي: {totalIncome}</span>
      </button>
    </div>
  );
}

export default TableauP;
