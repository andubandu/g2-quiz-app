import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import quizData from './data/quizData.json';

const darkICON = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740856278/bg-dark_ogqm8s.svg';
const lightICON = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740856278/bg-light_rfwg6f.svg';
const lightICON_mobile = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740903938/pattern-background-mobile-light_dr2nzs.svg';
const darkICON_mobile = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740903928/pattern-background-mobile-dark_pxpjye.svg';
const darkICON_tablet = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740903949/pattern-background-tablet-dark_yshmyc.svg';
const lightICON_tablet = 'https://res.cloudinary.com/dyuabsnoo/image/upload/v1740903958/pattern-background-tablet-light_dlgvg6.svg';
const checkmarkIcon = 'https://res.cloudinary.com/dmyrg759k/image/upload/v1741968034/d50a2eb3-01d4-4476-bb52-a5f338d923d6.png'
const xIcon = 'https://res.cloudinary.com/dmyrg759k/image/upload/v1741968083/dbbb7fac-1bb6-4e56-bde4-1d33b961464d.png'
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
        if (width < 768) {
          setBgImage(darkICON_mobile);
        } else if (width < 1024) {
          setBgImage(darkICON_tablet);
        } else {
          setBgImage(darkICON);
        }
      } else {
        document.body.classList.remove('dark-mode');
        if (width < 768) {
          setBgImage(lightICON_mobile);
        } else if (width < 1024) {
          setBgImage(lightICON_tablet);
        } else {
          setBgImage(lightICON);
        }
      }
    };
  
    updateBgImage();
    window.addEventListener('resize', updateBgImage);
  
    document.body.style.backgroundImage = `url(${bgImage})`;
  
    return () => {
      window.removeEventListener('resize', updateBgImage);
    };
  }, [darkMode, bgImage]);  
  

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
      className={`min-h-screen transition-colors duration-300 ease-in-out bg-gradient-to-br ${
        darkMode ? 'from-gray-900 to-gray-800' : 'from-gray-50 to-gray-100'
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
  
        {!selectedQuiz ? (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <div className="md:w-1/2 px-4 md:px-0">
              <h1
                className={`text-4xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-slate-800'
                } transition-colors duration-300`}
              >
                Welcome to the
              </h1>
              <h1
                className={`text-5xl font-bold mb-6 ${
                  darkMode ? 'text-white' : 'text-slate-800'
                } transition-colors duration-300`}
              >
                Frontend Quiz!
              </h1>
              <p
                className={`text-xl italic ${
                  darkMode ? 'text-gray-300' : 'text-slate-600'
                } transition-colors duration-300`}
              >
                Pick a subject to get started.
              </p>
            </div>
            <div className="md:w-1/2">
              {quizData.quizzes.map((quiz) => {
                let bgColor = '';
                switch (quiz.title) {
                  case 'HTML':
                    bgColor = 'bg-orange-200';
                    break;
                  case 'CSS':
                    bgColor = 'bg-green-200';
                    break;
                  case 'JavaScript':
                    bgColor = 'bg-blue-200';
                    break;
                  case 'Accessibility':
                    bgColor = 'bg-purple-200';
                    break;
                  default:
                    bgColor = 'bg-gray-200';
                }
  
                return (
                  <button
                    key={quiz.title}
                    className={`flex items-center w-full p-4 mb-4 rounded-lg shadow-md ${
                      darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                    } transition-colors duration-300`}
                    onClick={() => startQuiz(quiz)}
                  >
                    <div className={`rounded-md p-2 mr-4 ${bgColor}`}>
                      <img
                        src={quiz.icon}
                        alt={`${quiz.title} Icon`}
                        className="h-6 w-6"
                      />
                    </div>
                    <span>{quiz.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : showResult ? (
          <div className="flex items-center justify-center">
            <div className="mr-4">
              <h1
                className={`font-semibold text-5xl md:text-6xl ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Quiz Completed
              </h1>
              <h1 className='text-5xl md:text-6xl font-bold italic'> 
                <strong>
                You scored...
                </strong>
              </h1>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
            <div
              className={`rounded-2xl shadow-lg p-8 w-96 ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="rounded-md p-2 mr-4">
                  <img
                    src={selectedQuiz.icon}
                    alt={`${selectedQuiz.title} Icon`}
                    className="h-6 w-6"
                  />
                </div>
                <h2 className="text-xl font-semibold">
                  {selectedQuiz.title}
                </h2>
              </div>
              <div className="text-center mb-6">
                <h1 className="text-8xl font-bold">{score}</h1>
                <p className="text-sm">
                  out of {selectedQuiz.questions.length}
                </p>
              </div>
              <button
                onClick={() => setSelectedQuiz(null)}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
              >
                Play Again
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
         <div className="md:w-1/2 px-4 md:px-0">
  <p className={`text-gray-500 text-sm italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
    Question {currentQuestion + 1} of {selectedQuiz.questions.length}
  </p>

  <h1 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-slate-800'} transition-colors duration-300`}>
    {selectedQuiz.questions[currentQuestion].question}
  </h1>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
  <div className="mt-4 bg-purple-200 h-2 rounded-full overflow-hidden">
    <div
      className="bg-purple-600 h-full transition-all duration-500"
      style={{
        width: `${
          ((currentQuestion + 1) / selectedQuiz.questions.length) * 100
        }%`,
      }}
    ></div>
  </div>
  <br />
</div>

            <div className="md:w-1/2">
              {selectedQuiz.questions[currentQuestion].options.map(
                (option, index) => {
                  let bgColor = '';
                  switch (selectedQuiz.title) {
                    case 'HTML':
                      bgColor = 'bg-orange-200';
                      break;
                    case 'CSS':
                      bgColor = 'bg-green-200';
                      break;
                    case 'JavaScript':
                      bgColor = 'bg-blue-200';
                      break;
                    case 'Accessibility':
                      bgColor = 'bg-purple-200';
                      break;
                    default:
                      bgColor = 'bg-gray-200';
                  }
                  let buttonClass = `flex items-center w-full p-4 mb-4 rounded-lg shadow-md ${
                    darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                  } transition-colors duration-300`;
                  let icon = null;
  
                  if (selectedAnswer) {
                    if (
                      option === selectedQuiz.questions[currentQuestion].answer
                    ) {
                      bgColor = 'bg-green-200';
                      buttonClass = `flex items-center w-full p-4 mb-4 rounded-lg shadow-md border-2 border-green-500 bg-green-100 text-gray-800 transition-colors duration-300`;
                      icon = (
                        <img
                          src={checkmarkIcon}
                          alt="Correct"
                          className="ml-2 h-5 w-5"
                        />
                      );
                    } else if (
                      option === selectedAnswer &&
                      option !== selectedQuiz.questions[currentQuestion].answer
                    ) {
                      bgColor = 'bg-red-200';
                      buttonClass = `flex items-center w-full p-4 mb-4 rounded-lg shadow-md border-2 border-red-500 bg-red-100 text-gray-800 transition-colors duration-300`;
                      icon = (
                        <img
                          src={xIcon}
                          alt="Incorrect"
                          className="ml-2 h-5 w-5"
                        />
                      );
                    }
                  }
  
                  return (
                    <button
                      key={option}
                      className={buttonClass}
                      onClick={() => handleAnswer(option)}
                      disabled={!!selectedAnswer}
                    >
                      <div
                        className={`rounded-md p-2 mr-4 ${bgColor} ${
                          option ===
                            selectedQuiz.questions[currentQuestion].answer &&
                          selectedAnswer
                            ? 'bg-green-500 text-white'
                            : ''
                        }`}
                      >
                        <span className="font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                      </div>
                      <span>{option}</span>
                      {icon}
                    </button>
                  );
                }
              )}
              {selectedAnswer && (
                <button
                  onClick={nextQuestion}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 mt-4"
                >
                  Answer
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
);
}

export default App;