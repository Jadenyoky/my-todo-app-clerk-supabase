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

  const startListening = () => {
    setIsCorrect(true);
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "ar-SA";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const resultText = event.results[0][0].transcript.trim();
      const words = resultText.split(" ");

      let i = currentWordIndex;
      let correct = true;

      for (let word of words) {
        if (word === correctWords[i]) {
          setCurrentWordIndex(i + 1);
          i++;
        } else {
          correct = false;
          setIsCorrect(false);
          break;
        }
      }

      setTranscript(resultText);
    };

    recognition.onerror = (event) => {
      console.error("حدث خطأ في التعرف على الصوت:", event.error);
    };

    recognition.onend = () => {
      if (isCorrect) {
        startListening(); // استمر في الاستماع إذا لم يكن هناك خطأ
      }
    };

    recognition.start();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>تسميع سورة الفاتحة</h1>

      <button
        onClick={startListening}
        style={{ margin: "10px", padding: "10px" }}
      >
        ابدأ التلاوة
      </button>

      <p>النص المدخل: {transcript}</p>
      <p>
        {isCorrect ? (
          <span style={{ color: "green" }}>✅ القراءة صحيحة حتى الآن!</span>
        ) : (
          <span style={{ color: "red" }}>❌ هناك خطأ، أعد المحاولة!</span>
        )}
      </p>

      <p>
        النص الصحيح حتى الآن:{" "}
        {correctWords.slice(0, currentWordIndex).join(" ")}
      </p>
    </div>
  );
};

export default App;
