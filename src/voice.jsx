import React, { useState, useEffect } from "react";

const App = () => {
  // نص سورة الفاتحة مقسم إلى كلمات
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
  const [isListening, setIsListening] = useState(false); // حالة التسجيل
  const [hasMicrophone, setHasMicrophone] = useState(true); // حالة الميكروفون

  useEffect(() => {
    // التحقق مما إذا كان الجهاز لديه ميكروفون
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setHasMicrophone(true);
      })
      .catch((err) => {
        console.error("No microphone found:", err);
        setHasMicrophone(false);
      });
  }, []);

  const startListening = () => {
    setIsListening(true); // تغيير حالة التسجيل
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
          setIsListening(false); // إيقاف التسجيل عند الخطأ
          break;
        }
      }

      setTranscript(resultText);
    };

    recognition.onerror = (event) => {
      console.error("حدث خطأ في التعرف على الصوت:", event.error);
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

  const handleContinue = () => {
    if (!isListening && !isCorrect) {
      startListening(); // إعادة التسجيل بعد الخطأ
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>تسميع سورة الفاتحة</h1>

      {!hasMicrophone ? (
        <p style={{ color: "red" }}>❌ جهازك لا يحتوي على ميكروفون!</p>
      ) : (
        <>
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
              <span style={{ color: "red" }}>❌ هناك خطأ، أعد المحاولة!</span>
            )}
          </p>

          <p>
            النص الصحيح حتى الآن:{" "}
            {correctWords.slice(0, currentWordIndex).map((word, index) => (
              <span key={index} style={{ paddingRight: "5px" }}>
                {word}
              </span>
            ))}
          </p>

          {!isCorrect && (
            <button
              onClick={handleContinue}
              style={{ marginTop: "10px", padding: "10px" }}
            >
              أعد المحاولة من الكلمة "{correctWords[currentWordIndex]}"
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default App;
