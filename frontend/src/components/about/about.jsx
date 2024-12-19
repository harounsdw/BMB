import React from "react";
import "./About.scss";
import abt from "../images/slide3.jpeg";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>عالم B.M.B</h1>
      </div>
      <div className="about-content">
        <img src={abt} alt="About Illustration" className="about-image" />
        <h2>قصتنا</h2>
        <p>
          تأسست هذه الشركة لمساعدة الأجيال على خلق أفكار جديدة وتغيير الرؤية
          العامة لمنظور الاستثمار. اختارت صناعة التسويق عن طريق شبكة العلاقات
          الاجتماعية مع تدريب في شتى مجالات التواصل والاتصال لتعزيز العلاقات بين
          الشركاء داخل الفريق. وتوطيد علاقات صحية بين كل من يعمل أو يسمع عن هذه
          الصناعة. وتسعى إلى تطوير القدرات التفكيرية والمهارات لتعبيد طريق
          النجاح وتم افتتاح هذه الشركة لتتوج نجاحات كل الشركاء. ولرقي بهذا العمل
          الذي هو الحل الأقوى والأنجح لأصحاب الطموح على اختلاف مستوياتهم
          الحياتية.
        </p>
      </div>
    </div>
  );
};

export default About;
