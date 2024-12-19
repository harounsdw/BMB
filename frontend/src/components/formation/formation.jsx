import React, { useState, useEffect } from "react";
import "./formation.scss";
import slide1 from "../images/slide1.jpeg";
import slide2 from "../images/slide2.jpeg";
import slide3 from "../images/slide3.jpeg";
import slide4 from "../images/slide4.jpeg";

const Formation = () => {
  const redirectToPage = (url) => {
    window.location.href = url;
  };

  const links = [
    {
      title: "البرمجة",
      items: [
        {
          name: "اساسيات البرمجة",
          url: "https://docs.google.com/document/d/1Z8mw0m4v0xg6ezAHnjJQ-lxP-a8TWeAk/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true",
        },
        {
          name: "HTML لغة",
          url: "https://docs.google.com/document/d/11JJ4Ymdsi3WMdqQ-cuiOi5YVozOQ7ToBYknJH8ZoL7E/edit?usp=drivesdk",
        },
        {
          name: "Css لغة",
          url: "https://docs.google.com/document/d/18fDZ7XiMaRZRn6t3ulvsefMg27xLg5Wg/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true",
        },
        {
          name: "JAVASCRIPT لغة",
          url: "https://docs.google.com/document/d/1LaJPbkEUhpc4C0T-IwtfEYWd4zDPpKmv/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true",
        },
        {
          name: "PYTHON لغة",
          url: "https://docs.google.com/document/d/14qRE1zXaqNufk64NnPI_Z2aiYMcsAIW-gffDPNWbFYg/edit?usp=drivesdk",
        },
        {
          name: "REACT تعلم",
          url: "https://docs.google.com/document/d/1tGvP3KYe4G-XjrweAgF_jErUaJx_6sDY/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true",
        },
        {
          name: "C++ لغة",
          url: "https://docs.google.com/document/d/1kkjnlkGqlriQVvnsLjOXOWuTd1IstBoR/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true",
        },
        {
          name: "ALGORITHME تعلم",
          url: "https://docs.google.com/document/d/1ZNSdqG9o2xuwUZGI6XI6LK06FYJiP0n3/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true",
        },
        {
          name: "لغة PHP",
          url: "https://drive.google.com/file/d/1Zdw16mSEez7IXVVIzdu1fWJZw9I4pC_m/view?usp=drivesdk",
        },
        {
          name: "قواعد البيانات",
          url: "https://docs.google.com/document/d/1SnIpKYg6oFB6ceyZlC-1ChW70r5s3f9b/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true",
        },
        {
          name: "قواعد البيانات mogodb-in",
          url: "https://drive.google.com/file/d/1aIOwpcBC4zxiHIvOPOrxBZMhi74vTWo1/view?usp=drivesdk",
        },
        {
          name: "قواعد البيانات mogodb-ar",
          url: "https://drive.google.com/file/d/1a7vYWI6dArX150oBTBh0WbdtUq5PBDcV/view?usp=drivesdk",
        },
      ],
    },
    {
      title: "الذكاء الاصطناعي",
      items: [
        {
          name: "عالم الذكاء الاصطناعي",
          url: "https://docs.google.com/document/d/1qC1YrK6IpfVXMa-Euld0P9_zPR-pbF6In5_2aLB19wk/edit?usp=drivesdk",
        },
      ],
    },

    {
      title: "مونشن جرافيك",
      items: [
        {
          name: "دورة التصميم",
          url: "https://t.me/+JSyiLmvr6mlkZjk0",
        },
      ],
    },
    {
      title: "اللغة الانجليزية",
      items: [
        {
          name: "الكتاب المعلم",
          url: "https://mega.nz/folder/UitQiSCJ#8Tc3K_auREcs0mRTxflkRg",
        },
        {
          name: "A1 مستوى ",
          url: "https://docs.google.com/document/d/13gzuRtVRcB5PiQteDot94SCYXoT31B9Z/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true",
        },
        {
          name: "A2 مستوى",
          url: "https://docs.google.com/document/d/1dKUReIhq0pf1PC1gBaBtY49jAU8GcKI84xtyg8Msn1c/edit?usp=drivesdk",
        },
        {
          name: "تعلم الحوار",
          url: "https://docs.google.com/document/d/1vOE3X9wS9uMGL0BSshNNRm8edjLN5UZ-/edit?usp=drivesdk&ouid=100718508405275022523&rtpof=true&sd=true",
        },
        {
          name: "تعلم الكلمات",
          url: "https://docs.google.com/document/d/1zll84PUCAzrrxYd2bYkgbXw4Cq5OljdytnMkfKyosRw/edit?usp=drivesdk",
        },
        {
          name: "grammar",
          url: "https://drive.google.com/file/d/1Y0Wooo6SEu_72RyRsAy85DnqNGQfhTll/view?usp=drivesdk",
        },
        {
          name: " grammar+ مستوى متقدم ",
          url: "https://drive.google.com/file/d/1TUM74iomrLK9PMD5dFiDcO-3fPt7rC_C/view?usp=drivesdk",
        },
        {
          name: "B1+ مستوى متقدم",
          url: "https://drive.google.com/file/d/1ShFVS0_gGIvmIYBaHng-9HYmaOQiMdCL/view?usp=drivesdk",
        },
      ],
    },
    {
      title: "البرمجة اللغوية العصبية",
      items: [
        {
          name: "اكتشف قدراتك",
          url: "https://docs.google.com/document/d/1QOTWsEYRqFeLUJPiO4iWD6CNuU8tOqvoR-hBjOwUilQ/edit?usp=drivesdk",
        },
        {
          name: "دليك",
          url: "https://drive.google.com/file/d/1UnQ3eD0HAXTA0kQ0ydcs_WsK4hEe4cDH/view?usp=drivesdk",
        },
      ],
    },
    {
      title: "دليل للتسويق",
      items: [
        {
          name: "التسويق بالعمولة",
          url: "https://docs.google.com/document/d/1gJJ3noOPbKyrW-dA4zAYL11YGhP99n64EI3gMFzdW4Q/edit?usp=drivesdk",
        },
        {
          name: "التسويق بالمحتوى",
          url: "https://drive.google.com/file/d/1b8mVuYLeu44uHqUTFwCd6eoyCv_sj_SB/view?usp=drivesdk",
        },
      ],
    },
    {
      title: "كماليات الاستثمار",
      items: [
        {
          name: "تعلم كيف تتعلم",
          url: "https://docs.google.com/document/d/1gJJ3noOPbKyrW-dA4zAYL11YGhP99n64EI3gMFzdW4Q/edit?usp=drivesdk",
        },
        {
          name: "منطقة الراحة",
          url: "https://drive.google.com/file/d/1b8mVuYLeu44uHqUTFwCd6eoyCv_sj_SB/view?usp=drivesdk",
        },
        {
          name: "طور من نفسك",
          url: "https://drive.google.com/file/d/1XXl3nBD_86v3dBnJU7XLBLqgGH-IDQuo/view?usp=drivesdk",
        },
      ],
    },
    {
      title: "اللغة الفرنسية",
      items: [
        {
          name: "fr1 ",
          url: "https://drive.google.com/file/d/1XZ5XQZfT1dwNik51KEUjz4Zjjd1ycDOF/view?usp=drivesdk",
        },
        {
          name: "fr2 ",
          url: "https://drive.google.com/file/d/1Xd24fvalk2v_r1M5Jhfnng0jsp6nRlbE/view?usp=drivesdk",
        },
        {
          name: " fr3",
          url: "https://drive.google.com/file/d/1XOrlUu-SwPCjdnQ-MsM_Ov4Nxwk9Zbfi/view?usp=drivesdk",
        },
        {
          name: " fr4",
          url: "https://drive.google.com/file/d/1Xn0UYoqNZTwnDrL1vR8eSuj4Rn5s3Fhm/view?usp=drivesdk",
        },
        {
          name: " fr5",
          url: "https://drive.google.com/file/d/1XlXrER8b13zy_PB4B6LFjaBG9r1kc0DS/view?usp=drivesdk",
        },
      ],
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [slide1, slide2, slide3, slide4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length]);

  const goToNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="page-component">
      <div className="header">BIG MONEY BUSINESS</div>
      <div className="welcome-message">عالم البزنس مودل بين يديك</div>

      <div className="slideshow-container">
        <button className="prev" onClick={goToPreviousSlide}>
          &#10094;
        </button>
        <img
          src={slides[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="slide"
        />
        <button className="next" onClick={goToNextSlide}>
          &#10095;
        </button>
      </div>
      <div className="sections">
        {links.map((section, index) => (
          <div className="section" key={index}>
            <div className="section-title">{section.title}</div>
            <ul className="links">
              {section.items.map((item, idx) => (
                <li key={idx}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="ai-friend">
        <a
          href="https://wa.me/18772241042"
          target="_blank"
          rel="noopener noreferrer"
        >
          يمكنك استفسار اي شيء مع صديقنا Ai
        </a>
      </div>

      {/* Introductory Paragraph */}
      <div className="intro-section">
        <h3>تعرف على اهمية عالم البزنس مودل</h3>
        <p className="intro-paragraph">
          اكتشف معنا كل ما تحتاجه لتعلم البرمجة بشكل شامل وممتع! من أساسيات
          البرمجة إلى تعلم لغات البرمجة المتنوعة وقواعد البيانات، نقدم لك كل ذلك
          خطوة بخطوة. بالإضافة إلى ذلك، ستتعلم كيفية تسريع تجربتك البرمجية من
          خلال إتقان اللغة الإنجليزية التي توسع آفاق معرفتك وتفتح لك أبوابًا
          جديدة للتواصل مع ثقافات مختلفة و ايضا تعلم اللغة الفرنسية كل هذا
          بطريقة تفاعلية و مثرية . كما نقدم لك دليلًا مبتكرًا لتعلم الذكاء
          الاصطناعي من الصفر، مع استعراض أهم التقنيات البرمجية التي سيحتاجها كل
          مبتدئ. دوراتنا ليست مجرد نصوص مكتوبة، بل تشمل فيديوهات تعليمية تفاعلية
          لضمان تجربة تعلم مثرية. وأيضًا، نقدم لك دليلًا متكاملًا لتعلم التسويق
          بالمحتوى، بالإضافة إلى استراتيجيات التسويق بالعمولة التي تضمن لك
          نجاحًا في عالم الأعمال. ولا ننسى البرمجة اللغوية العصبية وأهميتها في
          تعزيز مهاراتك الشخصية والمهنية. انطلق الآن، واستمتع برحلة تعلم مليئة
          بالفرص!
        </p>
      </div>

      {/* Feedback Form */}
      <form className="feedback-form">
        <label htmlFor="comments">شاركنا رأيك :</label>
        <br />
        <textarea
          id="comments"
          name="comments"
          rows="4"
          cols="50"
          placeholder="اكتب تعليقك هنا..."
        ></textarea>
        <br />
        <button type="submit">إرسال</button>
      </form>

      {/* Important Warning Section */}
      <div className="important-warning">
        <h2>تنبيه هام</h2>
        <h4>يمنع تسجيل دورات الاستثمار أو عرضها أو تدريسها لأي سبب كان.</h4>
        <h4>هذه الدورة مخصصة فقط للشركاء وهي من حقك أنت وليست للعموم.</h4>
        <h4>كل من يشارك دورات الاستثمار مع غير الشركاء يتم إغلاق حسابه.</h4>
        <h4>
          كل من يقوم ببيع أو تدريس هذه الدورات يتم تتبعه عدلياً من الشركة.
        </h4>
      </div>
    </div>
  );
};

export default Formation;
