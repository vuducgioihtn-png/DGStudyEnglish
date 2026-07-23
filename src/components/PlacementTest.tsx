import React, { useState, useEffect } from 'react';
import { TestQuestion, PersonalizedRoadmap } from '../types';
import { Award, Brain, ChevronRight, Play, CheckCircle, HelpCircle, ArrowRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlacementTestProps {
  onRoadmapGenerated: (roadmap: PersonalizedRoadmap, score: number) => void;
  studentName: string;
}

export default function PlacementTest({ onRoadmapGenerated, studentName }: PlacementTestProps) {
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(-1); // -1 is introductory screen
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(true);
  const [submittingTest, setSubmittingTest] = useState<boolean>(false);
  const [goal, setGoal] = useState<string>('Giao tiếp công việc (Business)');
  const [errorStatus, setErrorStatus] = useState<string>('');

  useEffect(() => {
    fetch('/api/test/questions')
      .then((res) => res.json())
      .then((data) => {
        if (data.questions) {
          setQuestions(data.questions);
        }
        setLoadingQuestions(false);
      })
      .catch((err) => {
        console.error('Error fetching questions:', err);
        setErrorStatus('Không thể tải các câu hỏi thi. Vui lòng tải lại trang.');
        setLoadingQuestions(false);
      });
  }, []);

  const handleStart = () => {
    setCurrentIdx(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));
  };

  const handleAnswerSelect = (optionIdx: number) => {
    const updated = [...selectedAnswers];
    updated[currentIdx] = optionIdx;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Calculate & Submit
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmittingTest(true);
    const answersPayload = questions.map((q, index) => ({
      questionId: q.id,
      answerIndex: selectedAnswers[index],
    }));

    try {
      const response = await fetch('/api/test/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answersPayload, goal, name: studentName }),
      });

      if (!response.ok) throw new Error('Failed to evaluate assessment');
      const roadmap: PersonalizedRoadmap = await response.json();
      
      // Calculate raw local score
      let correctCount = 0;
      questions.forEach((q, index) => {
        if (selectedAnswers[index] === q.correctAnswer) {
          correctCount++;
        }
      });

      onRoadmapGenerated(roadmap, correctCount);
    } catch (err) {
      console.error(err);
      setErrorStatus('Có lỗi xảy ra khi phân tích lộ trình bằng AI. Đang thử lại...');
    } finally {
      setSubmittingTest(false);
    }
  };

  if (loadingQuestions) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" id="loading-spinner"></div>
        <p className="text-slate-600 font-medium">Đang thiết lập đề thi đánh giá trình độ...</p>
      </div>
    );
  }

  // Welcome Gate screen (currentIdx === -1)
  if (currentIdx === -1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white border border-sky-100 p-8 rounded-3xl shadow-2xl shadow-indigo-100/40 relative overflow-hidden mt-8"
        id="placement-welcome-card"
      >
        {/* Top right corner decorative curve from Vibrant Palette */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -mr-8 -mt-8 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-indigo-600 text-white p-3.5 rounded-2xl shadow-lg shadow-indigo-100 shrink-0">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-black text-indigo-600 tracking-wider uppercase font-sans block">Kiểm tra đầu vào thông minh</span>
              <h2 className="text-2xl font-black font-display text-indigo-900 leading-tight">Bắt đầu đánh giá trình độ bằng AI</h2>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed mb-6 font-medium text-sm sm:text-base">
            Xin chào <strong className="text-indigo-900">{studentName || 'Học viên mới'}</strong>! Để tối ưu hóa lộ trình học tiếng Anh dành riêng cho bạn, chúng ta sẽ bắt đầu bài test 8 câu nhanh đa năng (Ngữ pháp, Từ vựng, Đọc hiểu). 
            Thầy Giới sẽ lập tức biên soạn một lộ trình học tập cá nhân hóa 4 bài học chuẩn chỉnh và phù hợp nhất.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-black text-slate-800 mb-3">Mơ ước & Mục tiêu học tập của bạn:</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                'Giao tiếp công sở & Business',
                'Luyện thi IELTS / Chứng chỉ',
                'Du lịch & Đời sống thường ngày'
              ].map((g) => (
                <button
                  key={g}
                  type="button"
                  id={`goal-btn-${g.replace(/\s+/g, '-')}`}
                  onClick={() => setGoal(g)}
                  className={`p-4 rounded-2xl border-2 text-xs font-bold transition-all text-left flex items-center justify-between ${
                    goal === g
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 shadow-sm'
                      : 'border-slate-200/80 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <span>{g}</span>
                  {goal === g && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-sky-50 border border-sky-100 p-4 rounded-2xl mb-8 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-500 leading-relaxed font-medium">
              <p className="font-extrabold text-indigo-950 mb-1">Mẹo nhỏ khi làm bài:</p>
              Hãy làm thật trung thực và tránh tra cứu từ điển. Nếu không biết câu nào, hãy chọn phương án bạn cảm thấy hợp lý nhất hoặc chỉ dùng linh cảm để AI tìm ra chính xác khoảng trống kiến thức của bạn.
            </div>
          </div>

          {errorStatus && (
            <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-xs text-rose-600 mb-4" id="test-error-alert">
              {errorStatus}
            </div>
          )}

          <button
            onClick={handleStart}
            id="btn-start-test"
            className="w-full bg-indigo-600 hover:bg-slate-900 text-white font-display font-black py-4 px-6 rounded-2xl shadow-lg shadow-indigo-150 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-sm"
          >
            <Play className="w-4 h-4 fill-current" />
            Bắt đầu Kiểm tra Ngay
          </button>
        </div>
      </motion.div>
    );
  }

  // Active Assessment Question screen
  const currentQuestion = questions[currentIdx];
  const userSelectedAns = selectedAnswers[currentIdx];
  const progressPercent = Math.round(((currentIdx + 1) / questions.length) * 100);

  return (
    <div className="max-w-2xl mx-auto mt-6" id="active-test-container">
      {submittingTest ? (
        <div className="bg-white border border-sky-100 p-12 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
              <Brain className="w-8 h-8 animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-black font-display text-indigo-900 mb-2">Đang phân tích bài làm thông minh</h3>
          <p className="text-slate-500 text-xs sm:text-sm max-w-sm font-medium">
            Trợ lý Thầy Giới đang rà soát điểm lỗi, đánh giá văn phong phản xạ và biên dịch lộ trình học tập tối ưu dành riêng cho bạn...
          </p>
        </div>
      ) : (
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white border border-sky-100 p-6 sm:p-8 rounded-3xl shadow-xl"
        >
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-xs font-black text-slate-500 mb-3">
              <span className="bg-indigo-50 border border-indigo-100/60 text-indigo-700 px-3 py-1 rounded-full uppercase tracking-wider font-sans">
                {currentQuestion.category} Case
              </span>
              <span className="font-sans text-indigo-600">CÂU HỎI {currentIdx + 1} / {questions.length}</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Question Text */}
          <div className="mb-8 p-5 bg-sky-50/50 border border-sky-100 rounded-2xl">
            <p className="text-indigo-950 font-extrabold text-base sm:text-lg whitespace-pre-line leading-relaxed">
              {currentQuestion.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((opt, oIdx) => {
              const isSelected = userSelectedAns === oIdx;
              return (
                <button
                  key={oIdx}
                  type="button"
                  id={`option-${currentIdx}-${oIdx}`}
                  onClick={() => handleAnswerSelect(oIdx)}
                  className={`w-full p-4 text-left rounded-2xl border-2 text-sm font-bold transition-all duration-200 flex items-start gap-4 cursor-pointer ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 shadow-sm'
                      : 'border-slate-150 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shrink-0 text-xs font-black ${
                    isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 text-slate-400'
                  }`}>
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="mt-0.5 leading-tight">{opt}</span>
                </button>
              );
            })}
          </div>

          {errorStatus && (
            <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-xs text-rose-600 mb-4">
              {errorStatus}
            </div>
          )}

          {/* Action Navigation */}
          <div className="flex gap-3 justify-between">
            <button
              onClick={handlePrev}
              type="button"
              disabled={currentIdx === 0}
              className={`px-5 py-3 rounded-2xl border-2 font-bold text-sm transition-all ${
                currentIdx === 0
                  ? 'border-slate-100 text-slate-300 pointer-events-none'
                  : 'border-indigo-50/70 text-indigo-700 hover:bg-indigo-50/40 cursor-pointer'
              }`}
            >
              Quay lại
            </button>

            <button
              onClick={handleNext}
              type="button"
              id="btn-next-question"
              disabled={userSelectedAns === -1}
              className={`px-6 py-3 rounded-2xl font-display font-black text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                userSelectedAns === -1
                  ? 'bg-slate-100 text-slate-400 pointer-events-none'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-150'
              }`}
            >
              {currentIdx === questions.length - 1 ? (
                <>
                  Hoàn thành & Xem Lộ trình <CheckCircle className="w-4 h-4" />
                </>
              ) : (
                <>
                  Tiếp theo <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
