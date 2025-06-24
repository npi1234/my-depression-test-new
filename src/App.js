import React, { useState } from 'react';

// Questions and their options with scores for the depression test
const questionsData = [
    {
        id: 1,
        text: "지난 2주 동안, 다음 문제들로 인해 얼마나 자주 괴로웠습니까? (할 일을 거의 또는 전혀 하지 못할 정도로)",
        options: [
            { text: "거의 없음", score: 0 },
            { text: "며칠 동안", score: 1 },
            { text: "일주일에 절반 이상", score: 2 },
            { text: "거의 매일", score: 3 },
        ],
    },
    {
        id: 2,
        text: "작은 일에도 흥미를 잃거나 즐거움을 느끼지 못했다.",
        options: [
            { text: "거의 없음", score: 0 },
            { text: "며칠 동안", score: 1 },
            { text: "일주일에 절반 이상", score: 2 },
            { text: "거의 매일", score: 3 },
        ],
    },
    {
        id: 3,
        text: "기분이 저조하거나, 우울하거나, 희망이 없다고 느꼈다.",
        options: [
            { text: "거의 없음", score: 0 },
            { text: "며칠 동안", score: 1 },
            { text: "일주일에 절반 이상", score: 2 },
            { text: "거의 매일", score: 3 },
        ],
    },
    {
        id: 4,
        text: "잠들기 어렵거나 잠을 계속 유지하기 어렵거나 너무 많이 잤다.",
        options: [
            { text: "거의 없음", score: 0 },
            { text: "며칠 동안", score: 1 },
            { text: "일주일에 절반 이상", score: 2 },
            { text: "거의 매일", score: 3 },
        ],
    },
    {
        id: 5,
        text: "피곤함을 느끼거나 기력이 거의 없었다.",
        options: [
            { text: "거의 없음", score: 0 },
            { text: "며칠 동안", score: 1 },
            { text: "일주일에 절반 이상", score: 2 },
            { text: "거의 매일", score: 3 },
        ],
    },
    {
        id: 6,
        text: "식욕이 없거나 과식했다.",
        options: [
            { text: "거의 없음", score: 0 },
            { text: "며칠 동안", score: 1 },
            { text: "일주일에 절반 이상", score: 2 },
            { text: "거의 매일", score: 3 },
        ],
    },
    {
        id: 7,
        text: "자신에 대해 실망하거나, 자신이 실패자라고 생각하거나, 자신이나 가족을 실망시켰다고 느꼈다.",
        options: [
            { text: "거의 없음", score: 0 },
            { text: "며칠 동안", score: 1 },
            { text: "일주일에 절반 이상", score: 2 },
            { text: "거의 매일", score: 3 },
        ],
    },
    {
        id: 8,
        text: "무슨 일에든 집중하기 어려웠다 (예: 신문 읽기, TV 보기).",
        options: [
            { text: "거의 없음", score: 0 },
            { text: "며칠 동안", score: 1 },
            { text: "일주일에 절반 이상", score: 2 },
            { text: "거의 매일", score: 3 },
        ],
    },
    {
        id: 9,
        text: "너무 느리게 움직이거나 말하여 다른 사람들이 알아차릴 정도이거나, 너무 안절부절못하여 평소보다 훨씬 더 많이 움직였다.",
        options: [
            { text: "거의 없음", score: 0 },
            { text: "며칠 동안", score: 1 },
            { text: "일주일에 절반 이상", score: 2 },
            { text: "거의 매일", score: 3 },
        ],
    },
    {
        id: 10,
        text: "자신이 죽는 것이 더 낫다고 생각하거나, 어떤 식으로든 자신을 해칠 것이라고 생각했다.",
        options: [
            { text: "거의 없음", score: 0 },
            { text: "며칠 동안", score: 1 },
            { text: "일주일에 절반 이상", score: 2 },
            { text: "거의 매일", score: 3 },
        ],
    },
];

// Component for the initial disclaimer
const Disclaimer = ({ onAccept }) => (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full text-center border border-indigo-200">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">시작하기 전에</h2>
        <p className="mb-4 text-gray-700">
            이 우울증 테스트는 PHQ-9설문지를 기반으로 간략화된 버전입니다.
            **이 테스트는 의학적 진단이 아니며, 전문적인 진단을 대체할 수 없습니다.**
        </p>
        <p className="mb-4 text-gray-700">
            결과에 따라 우울감을 느끼시거나 정신 건강에 대한 우려가 있으시다면,
            **반드시 정신건강의학과 전문의나 상담 전문가와 상담하시기 바랍니다.**
        </p>
        <p className="mb-6 text-gray-700">
            테스트를 시작하시려면 아래 버튼을 눌러주세요.
        </p>
        <button
            onClick={onAccept}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
            동의하고 테스트 시작
        </button>
    </div>
);

// Component for a single question display and interaction
const Question = ({ question, onSelectOption, selectedAnswer }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full border border-indigo-200">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 text-center">
                {question.text}
            </h3>
            <div className="space-y-4">
                {question.options.map((option, index) => (
                    <label
                        key={index}
                        className={`block p-4 border rounded-lg cursor-pointer transition duration-200 ease-in-out
                            ${selectedAnswer === option.score
                                ? 'bg-indigo-100 border-indigo-500 shadow-md'
                                : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                            }`}
                    >
                        <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option.score}
                            checked={selectedAnswer === option.score}
                            onChange={() => onSelectOption(option.score)}
                            className="mr-3 transform scale-125 accent-indigo-600"
                        />
                        <span className="text-gray-700 text-lg">{option.text}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

// Component for displaying the test results and guidance
const Result = ({ score, onRestart }) => {
    let interpretation = "";
    let guidance = "";
    let textColor = "";

    // Determine interpretation and guidance based on score ranges
    if (score >= 0 && score <= 4) {
        interpretation = "최소 우울증 (Minimal Depression)";
        guidance = "현재 우울 증상은 거의 없는 것으로 보입니다. 현재 상태를 잘 유지하시고, 스트레스 관리에 주의를 기울여주세요.";
        textColor = "text-green-600";
    } else if (score >= 5 && score <= 9) {
        interpretation = "경미한 우울증 (Mild Depression)";
        guidance = "경미한 우울 증상이 있을 수 있습니다. 스트레스 관리와 규칙적인 생활 습관 개선에 신경 써주시고, 증상이 지속된다면 전문가와 상담을 고려해 보세요.";
        textColor = "text-yellow-600";
    } else if (score >= 10 && score <= 14) {
        interpretation = "중간 정도의 우울증 (Moderate Depression)";
        guidance = "중간 정도의 우울 증상이 의심됩니다. 가볍게 넘기지 마시고, 정신건강의학과 전문의나 상담 전문가와 상담하여 정확한 평가와 적절한 도움을 받는 것이 중요합니다.";
        textColor = "text-orange-600";
    } else if (score >= 15 && score <= 19) {
        interpretation = "중간에서 심한 우울증 (Moderately Severe Depression)";
        guidance = "중간에서 심한 정도의 우울 증상이 의심됩니다. 전문가의 도움이 시급할 수 있습니다. 즉시 정신건강의학과 전문의나 상담 전문가를 찾아 상담을 받아보시기를 강력히 권고합니다.";
        textColor = "text-red-600";
    } else if (score >= 20 && score <= 27) {
        interpretation = "심한 우울증 (Severe Depression)";
        guidance = "심한 우울 증상이 의심됩니다. 이는 전문가의 즉각적인 개입이 필요한 상태일 수 있습니다. 생명의 위험이 있다고 생각되면 즉시 응급 서비스나 정신건강의학과에 방문하세요. 가능한 한 빨리 정신건강의학과 전문의나 상담 전문가의 도움을 받으세요.";
        textColor = "text-purple-700";
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full text-center border border-indigo-200">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">테스트 결과</h2>
            <p className="text-xl mb-4 text-gray-800">
                당신의 총점은 <span className="font-bold text-indigo-600 text-3xl">{score}</span>점입니다.
            </p>
            <div className="mb-6">
                <p className={`text-2xl font-bold mb-4 ${textColor}`}>
                    해석: {interpretation}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-lg text-gray-700 leading-relaxed text-left">
                        {guidance}
                    </p>
                </div>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-3 text-indigo-700">국내 유일 우울증 커뮤니티-마인드포트</h3>
                <a 
                    href="https://cafe.naver.com/gamenet1111" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md mb-4"
                >
                    우울증 털어내러 가기
                </a>
            </div>
            <button
                onClick={onRestart}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
                다시 테스트하기
            </button>
        </div>
    );
};

// Main App component
const App = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(new Array(questionsData.length).fill(null));
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [showDisclaimer, setShowDisclaimer] = useState(true);

    const handleSelectOption = (selectedScore) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = selectedScore;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (answers[currentQuestionIndex] === null) {
            console.log("Please select an answer before proceeding.");
            return;
        }

        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateScore();
            setShowResult(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const calculateScore = () => {
        const totalScore = answers.reduce((sum, currentScore) => sum + (currentScore !== null ? currentScore : 0), 0);
        setScore(totalScore);
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setAnswers(new Array(questionsData.length).fill(null));
        setShowResult(false);
        setScore(0);
        setShowDisclaimer(true);
    };

    const handleAcceptDisclaimer = () => {
        setShowDisclaimer(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4 font-inter">
            {showDisclaimer ? (
                <Disclaimer onAccept={handleAcceptDisclaimer} />
            ) : showResult ? (
                <Result score={score} onRestart={handleRestart} />
            ) : (
                <div className="flex flex-col items-center space-y-6 max-w-2xl w-full">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-6 text-center drop-shadow-sm">
                        온라인 우울증 자가 진단
                    </h1>
                    <Question
                        question={questionsData[currentQuestionIndex]}
                        onSelectOption={handleSelectOption}
                        selectedAnswer={answers[currentQuestionIndex]}
                    />
                    <div className="flex justify-between w-full max-w-2xl mt-6 px-4">
                        <button
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                            className={`px-6 py-3 rounded-lg font-bold transition duration-300 ease-in-out transform ${
                                currentQuestionIndex === 0
                                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-md hover:scale-105'
                            }`}
                        >
                            이전
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={answers[currentQuestionIndex] === null}
                            className={`px-6 py-3 rounded-lg font-bold transition duration-300 ease-in-out transform ${
                                answers[currentQuestionIndex] === null
                                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:scale-105'
                                }`}
                            >
                                {currentQuestionIndex === questionsData.length - 1 ? '결과 보기' : '다음'}
                            </button>
                        </div>
                </div>
            )}
        </div>
    );
};

export default App;