import React, { useState } from "react";

const App = () => {
  const correctWords = [
    "بسم",
    "الله",
    "الرحمن",
    "الرحيم",
    "الحمد",
    "لله",
    "رب",
    "العالمين",
    "الرحمن",
    "الرحيم",
    "مالك",
    "يوم",
    "الدين",
    "إياك",
    "نعبد",
    "وإياك",
    "نستعين",
    "اهدنا",
    "الصراط",
    "المستقيم",
    "صراط",
    "الذين",
    "أنعمت",
    "عليهم",
    "غير",
    "المغضوب",
    "عليهم",
    "ولا",
    "الضالين",
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const [confirmedWords, setConfirmedWords] = useState([]); // الكلمات المؤكدة
  const [isListening, setIsListening] = useState(false); // لحالة التسجيل
  const [errorMessage, setErrorMessage] = useState(""); // رسالة الخطأ

  const startListening = () => {
    setIsListening(true); // تغيير حالة التسجيل
    setIsCorrect(true);
    setErrorMessage(""); // إعادة تعيين رسالة الخطأ

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "ar-SA";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const resultText = event.results[0][0].transcript.trim();
      const words = resultText.split(" ");

      let i = currentWordIndex; // استكمال التلاوة من آخر كلمة صحيحة
      let correct = true;

      for (let word of words) {
        if (word === correctWords[i]) {
          setConfirmedWords((prevConfirmedWords) => [
            ...prevConfirmedWords,
            word,
          ]);
          setCurrentWordIndex(i + 1); // الانتقال إلى الكلمة التالية
          i++;
        } else {
          correct = false;
          setIsCorrect(false);
          setIsListening(false); // إيقاف التسجيل عند الخطأ
          setErrorMessage(`خطأ في الكلمة: "${word}". حاول مرة أخرى.`); // رسالة الخطأ
          break;
        }
      }

      setTranscript(resultText);
    };

    recognition.onerror = (event) => {
      console.error("حدث خطأ في التعرف على الصوت:", event.error);
      setIsListening(false); // إيقاف التسجيل عند الخطأ
    };

    recognition.onend = () => {
      if (isCorrect && currentWordIndex < correctWords.length) {
        startListening(); // استمر في الاستماع إذا لم يكن هناك خطأ
      } else {
        setIsListening(false); // إيقاف الاستماع بعد الانتهاء أو حدوث خطأ
      }
    };

    recognition.start();
  };

  const handleRetry = () => {
    setIsCorrect(true);
    setErrorMessage(""); // إعادة تعيين رسالة الخطأ
    startListening(); // استئناف التسجيل من حيث توقفت
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>تسميع سورة الفاتحة</h1>

      <button
        onClick={isListening ? null : startListening} // لا يتم النقر أثناء التسجيل
        style={{
          margin: "10px",
          padding: "10px",
          backgroundColor: isListening ? "red" : "green",
          color: "white",
        }}
      >
        {isListening ? "التسجيل جارٍ..." : "ابدأ التلاوة"}
      </button>

      <p>النص المدخل: {transcript}</p>

      <p>
        {isCorrect ? (
          <span style={{ color: "green" }}>✅ القراءة صحيحة حتى الآن!</span>
        ) : (
          <span style={{ color: "red" }}>{errorMessage}</span>
        )}
      </p>

      <p>
        النص الصحيح حتى الآن: {confirmedWords.join(" ")}{" "}
        {/* الكلمات التي تم تأكيد صحتها */}
      </p>

      {!isCorrect && (
        <button
          onClick={handleRetry}
          style={{ marginTop: "10px", padding: "10px" }}
        >
          أعد المحاولة من الكلمة "{correctWords[currentWordIndex]}"
        </button>
      )}
    </div>
  );
};

export default App;
