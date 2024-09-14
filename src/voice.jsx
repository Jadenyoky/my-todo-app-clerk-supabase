import React, { useState } from "react";

const App = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const correctAyah = "بسم الله الرحمن الرحيم";

  const startListening = () => {
    setIsListening(true);
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "ar-SA"; // التأكد من أن اللغة العربية قيد التفعيل
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const resultText = event.results[0][0].transcript;
      setTranscript(resultText);
      if (resultText.trim() === correctAyah) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    };

    recognition.onerror = (event) => {
      console.error("حدث خطأ في التعرف على الصوت:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>تطبيق تلاوة القرآن</h1>
      <p>اقرأ الآية التالية:</p>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        بسم الله الرحمن الرحيم
      </p>

      <button
        onClick={startListening}
        style={{ margin: "10px", padding: "10px" }}
      >
        {isListening ? "جارٍ التلاوة..." : "ابدأ التلاوة"}
      </button>

      <p>النص المدخل: {transcript}</p>

      {isCorrect === true && (
        <p style={{ color: "green" }}>✅ القراءة صحيحة!</p>
      )}
      {isCorrect === false && (
        <p style={{ color: "red" }}>❌ هناك خطأ في القراءة.</p>
      )}
    </div>
  );
};

export default App;
