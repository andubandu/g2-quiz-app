import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import quizData from './data/quizData.json';

const darkICON = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740856278/bg-dark_ogqm8s.svg';
const lightICON = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740856278/bg-light_rfwg6f.svg';
const lightICON_mobile = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740903938/pattern-background-mobile-light_dr2nzs.svg';
const darkICON_mobile = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740903928/pattern-background-mobile-dark_pxpjye.svg';
const darkICON_tablet = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740903949/pattern-background-tablet-dark_yshmyc.svg';
const lightICON_tablet = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740903958/pattern-background-tablet-light_dlgvg6.svg';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [bgImage, setBgImage] = useState(lightICON);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const updateBgImage = () => {
      const width = window.innerWidth;
      if (darkMode) {
        document.body.classList.add('dark-mode');
        setBgImage(width < 768 ? darkICON_mobile : width < 1024 ? darkICON_tablet : darkICON);
      } else {
        document.body.classList.remove('dark-mode');
        setBgImage(width < 768 ? lightICON_mobile : width < 1024 ? lightICON_tablet : lightICON);
      }
    };
    updateBgImage();
    window.addEventListener('resize', updateBgImage);
    return () => window.removeEventListener('resize', updateBgImage);
  }, [darkMode]);

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === selectedQuiz.questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < selectedQuiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300 ease-in-out bg-cover bg-center bg-no-repeat"
      style={{ backgroundColor: darkMode ? '#1e293b' : '#f8fafc', backgroundImage: `url(${bgImage})` }}
    >
      <div className="container mx-auto px-4 py-8">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Homepage title here */}
        {!selectedQuiz ? (
          <div className="text-center">
            <h1 className={`text-4xl font-semibold mb-0 ${darkMode ? 'text-white' : 'text-slate-800'} transition-colors duration-300`}>
  Welcome to the
</h1>
<h1 className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'} transition-colors duration-300`}>
  Frontend Quiz!
</h1>



            <div className="grid md:grid-cols-2 gap-6">
              {quizData.quizzes.map((quiz) => (
                <button
                  key={quiz.title}
                  className={`flex items-center w-full p-4 rounded-lg shadow-md transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
                  onClick={() => startQuiz(quiz)}
                >
                  <div className="rounded-md p-2 mr-4 bg-gray-200">
                    <img src={quiz.icon} alt={`${quiz.title} Icon`} className="h-6 w-6" />
                  </div>
                  <span>{quiz.title}</span>
                </button>
              ))}
            </div>
          </div>
        ) : showResult ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-xl">Your score: {score} / {selectedQuiz.questions.length}</p>
            <button onClick={() => setSelectedQuiz(null)} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg">Back to Quizzes</button>
          </div>
        ) : (
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedQuiz.title} Quiz</h2>
            <p className="text-lg mb-4">{selectedQuiz.questions[currentQuestion].question}</p>
            <div className="grid gap-4">
              {selectedQuiz.questions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-3 border rounded-lg transition ${selectedAnswer ? (option === selectedQuiz.questions[currentQuestion].answer ? 'bg-green-500 text-white' : option === selectedAnswer ? 'bg-red-500 text-white' : 'opacity-50') : 'hover:bg-blue-500 hover:text-white'}`}
                  disabled={!!selectedAnswer}
                >
                  {option}
                </button>
              ))}
            </div>
            {selectedAnswer && (
              <button onClick={nextQuestion} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg">Next →</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
