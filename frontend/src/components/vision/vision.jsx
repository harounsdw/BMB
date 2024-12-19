import React from "react";
import "./Vision.scss";
import vis from "../images/slide5.jpeg";

const Vision = () => {
  return (
    <div className="vision-page">
      <div className="vision-header">
        <h1>عالم B.M.B</h1>
      </div>
      <div className="vision-content">
        <img src={vis} alt="Vision Illustration" className="vision-image" />
        <h2>رؤيتنا</h2>
        <p>
          نحن نطمح للوصول للمستوى العالمي للوعي المالي عن طريق صناعة القادة في
          مجالنا الحيوي. نحن نطمح لجيل ذو عقلية استثمارية و ذو رؤيا مختلفة عن
          المعتاد.
        </p>
      </div>
    </div>
  );
};

export default Vision;
