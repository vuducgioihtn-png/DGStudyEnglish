import React, { useState, useEffect } from 'react';
import { GrammarTopic, GRAMMAR_TOPICS, IRREGULAR_VERBS } from '../data/grammarData';
import { getSentencePhonetic } from '../utils';
import { 
  BookOpen, Sparkles, Brain, Award, HelpCircle, Send, 
  RefreshCw, Play, Check, CheckCircle2, ArrowRight, 
  Search, FileText, ChevronRight, GraduationCap, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GrammarHubProps {
  studentUsername: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function GrammarHub({ studentUsername }: GrammarHubProps) {
  // Navigation tabs: 'handbook' | 'ai-parser' | 'ai-drills' | 'irregular-verbs'
  const [activeTab, setActiveTab] = useState<'handbook' | 'ai-parser' | 'ai-drills' | 'irregular-verbs'>('handbook');
  
  // Selected grammar lesson in handbook
  const [selectedTopicId, setSelectedTopicId] = useState<string>(GRAMMAR_TOPICS[0].id);
  const selectedTopic = GRAMMAR_TOPICS.find(t => t.id === selectedTopicId) || GRAMMAR_TOPICS[0];

  // Filters for handbook
  const [gradeFilter, setGradeFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // ----------------- AI PARSER STATES -----------------
  const [parseInput, setParseInput] = useState<string>('If she had studied harder, she would have passed the English test.');
  const [parseLoading, setParseLoading] = useState<boolean>(false);
  const [parseResult, setParseResult] = useState<any | null>(null);
  const [parseError, setParseError] = useState<string>('');

  // ----------------- AI DRILLS STATES -----------------
  const [drillTopicId, setDrillTopicId] = useState<string>(GRAMMAR_TOPICS[0].id);
  const [drillsLoading, setDrillsLoading] = useState<boolean>(false);
  const [drillsQuestions, setDrillsQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = useState<boolean>(false);
  const [drillsScore, setDrillsScore] = useState<number>(0);
  const [drillFinished, setDrillFinished] = useState<boolean>(false);
  const [drillsError, setDrillsError] = useState<string>('');

  // ----------------- SENTENCE BUILDER GAME -----------------
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [builtSentence, setBuiltSentence] = useState<string[]>([]);
  const [builderChecked, setBuilderChecked] = useState<boolean>(false);
  const [isBuilderCorrect, setIsBuilderCorrect] = useState<boolean>(false);

  // ----------------- IRREGULAR VERBS STATES -----------------
  const [verbSearch, setVerbSearch] = useState<string>('');
  const [randomVerbIdx, setRandomVerbIdx] = useState<number>(0);
  const [v2Input, setV2Input] = useState<string>('');
  const [v3Input, setV3Input] = useState<string>('');
  const [verbQuizChecked, setVerbQuizChecked] = useState<boolean>(false);
  const [isVerbQuizCorrect, setIsVerbQuizCorrect] = useState<boolean>(false);
  const [verbQuizFeedback, setVerbQuizFeedback] = useState<string>('');
  const [verbQuizScore, setVerbQuizScore] = useState<number>(0);

  // Handle setting a new random verb for practice
  const handleNextVerbQuiz = () => {
    const randomIndex = Math.floor(Math.random() * IRREGULAR_VERBS.length);
    setRandomVerbIdx(randomIndex);
    setV2Input('');
    setV3Input('');
    setVerbQuizChecked(false);
    setIsVerbQuizCorrect(false);
    setVerbQuizFeedback('');
  };

  // Initialize random verb once on mount or when tab becomes active
  useEffect(() => {
    if (activeTab === 'irregular-verbs') {
      handleNextVerbQuiz();
    }
  }, [activeTab]);

  const handleCheckVerbQuiz = () => {
    const target = IRREGULAR_VERBS[randomVerbIdx];
    const userV2 = v2Input.trim().toLowerCase();
    const userV3 = v3Input.trim().toLowerCase();
    
    // Some verbs have slash / options, so check if any option matches
    const correctV2Options = target.pastSimple.toLowerCase().split('/').map(s => s.trim());
    const correctV3Options = target.pastParticiple.toLowerCase().split('/').map(s => s.trim());

    const isV2Correct = correctV2Options.includes(userV2);
    const isV3Correct = correctV3Options.includes(userV3);

    const correct = isV2Correct && isV3Correct;
    setIsVerbQuizCorrect(correct);
    setVerbQuizChecked(true);

    if (correct) {
      setVerbQuizScore(prev => prev + 1);
      setVerbQuizFeedback(`🌟 Chính xác xuất sắc! Động từ "${target.infinitive}" -> "${userV2}" -> "${userV3}".`);
    } else {
      setVerbQuizFeedback(`❌ Chưa đúng rồi! Đáp án chuẩn: V2 là "${target.pastSimple}", V3 là "${target.pastParticiple}".`);
    }
  };

  // Filter topics
  const filteredTopics = GRAMMAR_TOPICS.filter(t => {
    const matchesGrade = gradeFilter === 'All' || t.gradeRange.includes(gradeFilter);
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.titleVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.vietnameseExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesCategory && matchesSearch;
  });

  // Prepare interactive sentence build triggers whenever selected topic changes
  useEffect(() => {
    // Take the first example and scramble it for sentence builder game
    if (selectedTopic && selectedTopic.examples.length > 0) {
      const bestExample = selectedTopic.examples[0].english;
      const cleaned = bestExample.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
      const words = cleaned.split(' ').filter(w => w.trim().length > 0);
      setScrambledWords([...words].sort(() => Math.random() - 0.5));
      setBuiltSentence([]);
      setBuilderChecked(false);
      setIsBuilderCorrect(false);
    }
  }, [selectedTopicId]);

  // Click handler for sentence builder
  const handleWordClick = (word: string, isFromScrambled: boolean) => {
    if (builderChecked) return;
    if (isFromScrambled) {
      setBuiltSentence(prev => [...prev, word]);
      // Remove only first occurrence
      const index = scrambledWords.indexOf(word);
      if (index > -1) {
        const copy = [...scrambledWords];
        copy.splice(index, 1);
        setScrambledWords(copy);
      }
    } else {
      setScrambledWords(prev => [word, ...prev]);
      const index = builtSentence.indexOf(word);
      if (index > -1) {
        const copy = [...builtSentence];
        copy.splice(index, 1);
        setBuiltSentence(copy);
      }
    }
  };

  const handleCheckBuilder = () => {
    const assembled = builtSentence.join(' ').toLowerCase();
    const target = selectedTopic.examples[0].english.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
    setIsBuilderCorrect(assembled === target);
    setBuilderChecked(true);
  };

  // ----------------- AI PARSE SERVICE CALL -----------------
  const handleParseSentence = async () => {
    if (!parseInput.trim()) return;
    setParseLoading(true);
    setParseError('');
    setParseResult(null);

    try {
      const res = await fetch('/api/grammar/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: parseInput.trim() })
      });

      if (!res.ok) throw new Error('Yêu cầu phân tích từ AI thất bại.');
      const data = await res.json();
      setParseResult(data);
    } catch (err: any) {
      console.error(err);
      setParseError(err.message || 'Gặp lỗi trong quá trình kết nối với AI.');
    } finally {
      setParseLoading(false);
    }
  };

  // ----------------- AI DRILL EXERCISE GENERATOR -----------------
  const handleGenerateDrills = async (topicId: string) => {
    setDrillTopicId(topicId);
    setDrillsLoading(true);
    setDrillsError('');
    setDrillsQuestions([]);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsQuestionSubmitted(false);
    setDrillsScore(0);
    setDrillFinished(false);

    const targetTopic = GRAMMAR_TOPICS.find(t => t.id === topicId) || GRAMMAR_TOPICS[0];

    try {
      const res = await fetch('/api/grammar/quiz-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topicTitle: targetTopic.title,
          topicFormula: targetTopic.formula,
          level: targetTopic.level,
          gradeRange: targetTopic.gradeRange
        })
      });

      if (!res.ok) throw new Error('Không thể tạo bài tập rèn luyện.');
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setDrillsQuestions(data.questions);
      } else {
        throw new Error('Định dạng dữ liệu câu hỏi không hợp lệ.');
      }
    } catch (err: any) {
      console.error(err);
      setDrillsError('Không tải được bài tập trực tuyến từ máy chủ. Đang sử dụng dữ liệu rèn luyện dự phòng cho riêng chủ đề này...');
      // Set pristine backup mock exercises
      const backupMock = [
        {
          question: `Điền vào chỗ trống: "She _______ (read) books every night before sleeping."`,
          options: ["read", "reads", "is reading", "has read"],
          correctAnswer: 1,
          explanation: "Với chủ ngữ là 'She' (ngôi thứ ba số ít), ở thì hiện tại đơn ta thêm 's' vào sau động từ 'read' thành 'reads'."
        },
        {
          question: `Đâu là câu viết đúng cấu trúc thì hiện tại đơn?`,
          options: [
            "We goes to school together.",
            "He do not like eating carrots.",
            "My father works in a big office.",
            "They are play football now."
          ],
          correctAnswer: 2,
          explanation: "'My father works...' là câu hoàn toàn chính xác. Chủ ngữ 'My father' số ít nên động từ 'work' thêm 's'."
        },
        {
          question: `Chọn từ khóa chỉ tần suất thường dùng với thì hiện tại đơn:`,
          options: ["At the moment", "Yesterday", "Usually", "Next week"],
          correctAnswer: 2,
          explanation: "'Usually' (thường thường) chỉ tần suất lặp lại hành động ở hiện tại đơn."
        }
      ];
      setDrillsQuestions(backupMock);
    } finally {
      setDrillsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6" id="english-grammar-hub-viewport">
      {/* Dynamic Header */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl" id="grammar-banner">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full -ml-16 -mb-16 blur-xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="bg-white/20 text-white text-[10px] sm:text-xs font-black uppercase px-3.5 py-1.5 rounded-full tracking-wider border border-white/10 font-sans">
            ✨ Cổng Học Tập Cao Cấp (K-12 & CEFR)
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight leading-none">
            Ngữ Pháp Tiếng Anh Trực Quan & AI
          </h1>
          <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
            Tìm hiểu các cấu trúc ngữ pháp từ cốt lõi, sử dụng Thầy Giáo AI để phân tích câu tức thì, bẻ khóa các bài tập IELTS và rèn luyện trôi chảy từng câu từ lớp 1 đến lớp 12.
          </p>
        </div>
      </div>

      {/* Primary Sub-Tabs Controller */}
      <div className="flex flex-wrap gap-2.5 p-1 px-1.5 bg-slate-100/80 border border-slate-200/50 rounded-2xl max-w-3xl shadow-inner" id="grammar-tab-pills">
        <button
          onClick={() => setActiveTab('handbook')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition uppercase cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'handbook' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-slate-600 hover:text-indigo-600 hover:bg-white/70'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Handbook tự học
        </button>
        <button
          onClick={() => setActiveTab('ai-parser')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition uppercase cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'ai-parser' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-slate-600 hover:text-indigo-600 hover:bg-white/70'
          }`}
        >
          <Brain className="w-4 h-4 text-indigo-500 active-tab:text-white" /> Phân Tích Câu AI
        </button>
        <button
          onClick={() => {
            setActiveTab('ai-drills');
            handleGenerateDrills(selectedTopic.id);
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition uppercase cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'ai-drills' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-slate-600 hover:text-indigo-600 hover:bg-white/70'
          }`}
        >
          <Award className="w-4.5 h-4.5" /> Thử thách luyện tập
        </button>
        <button
          onClick={() => setActiveTab('irregular-verbs')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition uppercase cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'irregular-verbs' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-slate-600 hover:text-indigo-600 hover:bg-white/70'
          }`}
        >
          <FileText className="w-4 h-4" /> Động từ bất quy tắc
        </button>
      </div>

      {/* Main Container Panels view */}
      <div id="grammar-core-container">
        <AnimatePresence mode="wait">
          
          {/* HANDBOOK TAB */}
          {activeTab === 'handbook' && (
            <motion.div
              key="handbook-viewport"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left Column: Topics Sidebar Selector */}
              <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-md space-y-4" id="handbook-topics-list-rail">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Search className="text-slate-400 w-4.5 h-4.5" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm ngữ pháp, tenses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                {/* Filters Row */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Khối Lớp</label>
                    <select
                      value={gradeFilter}
                      onChange={(e) => setGradeFilter(e.target.value)}
                      className="w-full text-[11px] font-black bg-slate-50 border border-slate-200/80 p-2 rounded-xl text-slate-700 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="All">Tất cả Khối Lớp</option>
                      <option value="Tiểu học">Lớp 1-5 (A1/A2)</option>
                      <option value="THCS">Lớp 6-9 (A2/B1)</option>
                      <option value="THPT">Lớp 10-12 (B2)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Phân nhóm</label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full text-[11px] font-black bg-slate-50 border border-slate-200/80 p-2 rounded-xl text-slate-700 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="All">Tất cả Nhóm</option>
                      <option value="Tenses">Thì động từ</option>
                      <option value="Sentence structures">Cấu trúc câu</option>
                      <option value="Speech Parts">Từ loại & Giới từ</option>
                      <option value="Advanced">Tổng hợp & Nâng cao</option>
                    </select>
                  </div>
                </div>

                {/* Topics scrollbox */}
                <div className="space-y-2 mt-4 max-h-[480px] overflow-y-auto pr-1 scrollbar-none" id="grammar-lessons-scroller">
                  {filteredTopics.length === 0 ? (
                    <div className="text-center text-slate-400 font-semibold py-12 text-xs">
                      Không tìm thấy bài học ngữ pháp nào phù hợp bộ lọc.
                    </div>
                  ) : (
                    filteredTopics.map((topic) => {
                      const isSelected = topic.id === selectedTopicId;
                      return (
                        <button
                          key={topic.id}
                          onClick={() => setSelectedTopicId(topic.id)}
                          className={`w-full p-3.5 rounded-2xl text-left border transition cursor-pointer flex justify-between items-center group ${
                            isSelected 
                              ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950 shadow-sm' 
                              : 'bg-white hover:bg-slate-50 border-slate-100/90 text-slate-700'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[8px] bg-slate-100 font-black text-indigo-700 uppercase px-1.5 py-0.5 rounded tracking-wider">
                                {topic.level}
                              </span>
                              <span className="text-[9px] font-bold text-slate-400">
                                {topic.gradeRange}
                              </span>
                            </div>
                            <h3 className="font-extrabold text-xs sm:text-sm line-clamp-1 group-hover:text-indigo-600">
                              {topic.title}
                            </h3>
                            <p className="text-[10px] text-slate-400 font-medium line-clamp-1 leading-snug">
                              {topic.titleVi}
                            </p>
                          </div>
                          <ChevronRight className={`w-4 h-4 shrink-0 transition ${
                            isSelected ? 'text-indigo-600 translate-x-1' : 'text-slate-300'
                          }`} />
                        </button>
                      )
                    })
                  )}
                </div>
              </div>

              {/* Right Column: Dynamic Lesson content details */}
              <div className="lg:col-span-8 space-y-6" id="handbook-detailed-content-panel">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
                  {/* Title metadata */}
                  <div className="border-b border-slate-150/40 pb-5 space-y-2">
                    <div className="flex gap-2 items-center flex-wrap">
                      <span className="text-[10px] bg-indigo-600/10 text-indigo-700 uppercase font-black px-2.5 py-1 rounded-md tracking-wider">
                        {selectedTopic.category}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 uppercase font-black px-2.5 py-1 rounded-md tracking-wider">
                        Trình độ: {selectedTopic.level}
                      </span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 uppercase font-black px-2.5 py-1 rounded-md tracking-wider">
                        Khuyên dùng: {selectedTopic.gradeRange}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900">
                      {selectedTopic.title}
                    </h2>
                    <p className="text-xs sm:text-sm font-black text-indigo-700 italic">
                      {selectedTopic.titleVi}
                    </p>
                  </div>

                  {/* Gentle plain explanation */}
                  <div className="space-y-1">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">💡 Giải thích trực quan dễ hiểu</p>
                    <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed bg-indigo-50/5 p-4 rounded-2xl border border-dashed border-slate-200/80 whitespace-pre-line">
                      {selectedTopic.vietnameseExplanation}
                    </p>
                  </div>

                  {/* Mathematical Formula Frame */}
                  <div className="space-y-2">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">📝 Bảng Công thức Vàng (Gold Formula)</p>
                    <div className="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs sm:text-sm border border-slate-800 shadow-lg relative overflow-hidden flex items-center justify-between">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                      <div className="space-y-1">
                        <span className="text-[9px] text-emerald-500/60 uppercase font-black tracking-widest">Formula Syntax:</span>
                        <p className="text-sm sm:text-base font-extrabold whitespace-pre-line tracking-tight leading-relaxed">{selectedTopic.formula}</p>
                      </div>
                      <span className="text-xl sm:text-2xl opacity-20 shrink-0 select-none">⚡</span>
                    </div>
                  </div>

                  {/* Bullet rules section */}
                  <div className="space-y-4">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">✨ Khi nào bé cần áp dụng cấu trúc này?</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedTopic.usageRules.map((rule, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 hover:bg-slate-100/55 rounded-2xl border border-slate-150/40 space-y-2 transition flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider block">Rule {idx + 1}: {rule.rule}</span>
                            <p className="text-[11px] sm:text-xs text-slate-500 font-semibold leading-relaxed mt-1">{rule.explanation}</p>
                          </div>
                          <div className="bg-white p-2.5 rounded-lg border border-slate-100 text-[11px] sm:text-xs font-mono font-bold text-slate-800 tracking-tight leading-normal mt-2">
                            {rule.example}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Real-life Examples Translation Grid */}
                  <div className="space-y-3">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">💎 Ví dụ tiếng Anh thực tế (Bản dịch có chú thích)</p>
                    <div className="space-y-3">
                      {selectedTopic.examples.map((ex, idx) => (
                        <div key={idx} className="p-4 bg-white hover:bg-slate-50 border border-slate-100 rounded-2xl flex gap-3.5 items-start transition" id={`example-block-${idx}`}>
                          <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center font-bold text-[10px] text-indigo-600 shrink-0">
                            0{idx + 1}
                          </div>
                          <div className="space-y-1 flex-1">
                            <p className="text-xs sm:text-sm font-extrabold text-slate-900 font-display">
                              {ex.english}
                            </p>
                            <p className="text-[11px] text-indigo-600/80 font-mono italic leading-relaxed">
                              {getSentencePhonetic(ex.english, '', '')}
                            </p>
                            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 leading-normal">
                              {ex.vietnamese}
                            </p>
                            {ex.note && (
                              <div className="text-[10px] bg-slate-50 p-2 rounded-lg border border-slate-100 text-slate-400 font-mono italic mt-1 font-bold">
                                📌 Chú thích: {ex.note}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Memory Hack Banner */}
                  <div className="bg-amber-50 border border-amber-200/90 p-4 sm:p-5 rounded-2xl flex gap-3 leading-relaxed items-start shadow-sm shadow-amber-50">
                    <span className="text-xl sm:text-2xl shrink-0">💡</span>
                    <div className="space-y-1">
                      <p className="text-xs font-black text-amber-900 uppercase tracking-wide">Mẹo Vàng ghi nhớ nhanh từ Thầy James</p>
                      <p className="text-xs text-amber-800 font-semibold leading-relaxed">
                        {selectedTopic.memoryHack}
                      </p>
                    </div>
                  </div>
                </div>

                {/* INTERACTIVE SENTENCE BUILDER GAME FOR ACTIVE TOPIC */}
                <div className="bg-gradient-to-br from-indigo-50/30 to-white/70 p-6 rounded-3xl border border-indigo-100 shadow-md space-y-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-600" />
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900 font-display">
                      Minigame: Bé ghép câu chuẩn cấu trúc
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 font-bold leading-normal">
                    Hãy bấm vào các chữ cái lộn xộn để tái tạo lại trật tự chuẩn của câu ví dụ số 1: "{selectedTopic.examples[0].english}"
                  </p>

                  {/* Built Sentence block */}
                  <div className="min-h-14 p-3 bg-white/70 border-2 border-dashed border-slate-200 rounded-2xl flex flex-wrap gap-2 items-center" id="sentence-builder-output">
                    {builtSentence.length === 0 && (
                      <span className="text-xs text-slate-400 italic">Chọn các khối chữ tự do bên dưới để lắp ghép câu...</span>
                    )}
                    {builtSentence.map((word, index) => (
                      <button
                        key={index}
                        onClick={() => handleWordClick(word, false)}
                        className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-rose-500 hover:text-white transition cursor-pointer shadow-sm"
                      >
                        {word}
                      </button>
                    ))}
                  </div>

                  {/* Scrambled Area */}
                  <div className="p-3 bg-slate-50/50 rounded-2xl space-y-2">
                    <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">Mảnh ghép từ sẵn có:</span>
                    <div className="flex flex-wrap gap-2">
                      {scrambledWords.map((word, index) => (
                        <button
                          key={index}
                          onClick={() => handleWordClick(word, true)}
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold hover:bg-slate-100 text-slate-700 transition cursor-pointer shadow-sm"
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Result block */}
                  {builderChecked && (
                    <div className={`p-4 rounded-xl border text-xs sm:text-sm flex gap-2 items-start ${
                      isBuilderCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
                    }`}>
                      <span className="text-lg">{isBuilderCorrect ? '🎉' : '❌'}</span>
                      <div>
                        <p className="font-extrabold">{isBuilderCorrect ? 'Tuyệt vời ông mặt trời! Bé ghép chuẩn từng từ!' : 'Bé đã ghép lộn xộn chút rồi!'}</p>
                        <p className="text-[11px] text-slate-500 mt-1">Câu trả lời hoàn toàn chính xác là: <code className="font-mono text-slate-800 font-bold">{selectedTopic.examples[0].english}</code></p>
                      </div>
                    </div>
                  )}

                  {/* Builder controls */}
                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      onClick={() => {
                        const target = selectedTopic.examples[0].english.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
                        const words = target.split(' ').filter(w => w.trim().length > 0);
                        setScrambledWords([...words].sort(() => Math.random() - 0.5));
                        setBuiltSentence([]);
                        setBuilderChecked(false);
                        setIsBuilderCorrect(false);
                      }}
                      className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-50 text-slate-500 transition cursor-pointer"
                    >
                      Ghép lại từ đầu
                    </button>
                    {!builderChecked && (
                      <button
                        onClick={handleCheckBuilder}
                        disabled={builtSentence.length === 0}
                        className="px-4 py-2 bg-indigo-600 disabled:opacity-50 text-white rounded-xl text-xs font-semibold hover:bg-slate-900 transition cursor-pointer"
                      >
                        Kiểm tra câu
                      </button>
                    )}
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* AI PARSER TAB */}
          {activeTab === 'ai-parser' && (
            <motion.div
              key="ai-parser-viewport"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-black font-display text-slate-900 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-indigo-500" /> Hệ thống Phân tích cú pháp Trí Tuệ Nhân Tạo (AI Sentence Explainer)
                </h3>
                <p className="text-xs text-slate-400 font-bold">
                  Bé hãy lấy một câu tiếng Anh bất kỳ (ở tiểu học hay đề luyện IELTS). Giáo viên AI của DGStudy sẽ chia tách chủ ngữ, phân loại thì, giải nghĩa cấu trúc chi tiết và dịch vi diệu cho bé hiểu tuột cùng câu nói!
                </p>
              </div>

              {/* Input Form Area */}
              <div className="space-y-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Viết câu tiếng Anh muốn rã ngữ pháp:</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={parseInput}
                    onChange={(e) => setParseInput(e.target.value)}
                    placeholder="E.g. Unless we reduce greenhouse gases, the climate will warm up rapidly..."
                    className="flex-1 px-4 py-3 bg-white border border-slate-200 focus:border-indigo-500 rounded-2xl text-xs sm:text-sm font-semibold focus:outline-none placeholder-slate-400 text-slate-800 shadow-sm"
                  />
                  <button
                    onClick={handleParseSentence}
                    disabled={parseLoading || !parseInput.trim()}
                    className="px-5 py-3 bg-indigo-600 hover:bg-slate-950 disabled:opacity-40 text-white rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shrink-0 shadow-md shadow-indigo-100"
                  >
                    {parseLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Đang rọc câu...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" /> Phân Tích Cú Pháp Câu
                      </>
                    )}
                  </button>
                </div>
                
                {/* Preseeded helper sentence examples and touch suggestions */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase mr-1">Gợi ý mẫu câu:</span>
                  {[
                    "I am playing volleyball with Liam now.",
                    "The book which you lent me is extremely fascinating.",
                    "If I were you, I would take that opportunity."
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setParseInput(preset)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-150 border border-slate-150 rounded-lg text-[10px] font-bold text-slate-500 transition cursor-pointer"
                    >
                      Câu {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Box */}
              {parseError && (
                <div className="p-4 bg-rose-50 border border-rose-150 rounded-2xl text-rose-950 text-xs sm:text-sm font-semibold">
                  ⚠️ {parseError}
                </div>
              )}

              {/* Parser Result Output Layout */}
              {parseResult && (
                <div className="space-y-6 pt-2 animate-fade-in" id="ai-parser-result-box">
                  <div className="flex items-center gap-2 border-b border-indigo-100 pb-3">
                    <span className="text-xl">📊</span>
                    <h4 className="text-sm sm:text-base font-extrabold text-indigo-950 font-display">Bảng bóc tách kết quả phân tích AI:</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* General Translation card */}
                    <div className="p-5 bg-indigo-50/30 border border-indigo-100/50 rounded-2xl space-y-2">
                      <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wider block">Bản dịch mượt mà (Accurate Translation)</span>
                      <p className="text-slate-800 font-extrabold text-sm leading-relaxed whitespace-pre-line font-display bg-white p-3 rounded-xl border border-indigo-50/50">
                        "{parseResult.translation}"
                      </p>
                    </div>

                    {/* Identified tense block */}
                    <div className="p-5 bg-indigo-50/30 border border-indigo-100/50 rounded-2xl space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wider block">Thế thì chủ yếu (Core Tense/Structure)</span>
                        <p className="text-slate-800 font-bold text-sm leading-relaxed mt-1">
                          📌 {parseResult.tenseUsed}
                        </p>
                      </div>
                      <div className="text-[10px] text-slate-400 font-black uppercase mt-2">Đánh Giá: Tuyệt đối chuẩn chỉnh</div>
                    </div>
                  </div>

                  {/* Syntax Breakdowns POS tag lists */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Trích lọc Từ Loại chính trong câu (Parts Of Speech tags):</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {parseResult.vocabularyBreakdown && parseResult.vocabularyBreakdown.map((item: any, idx: number) => (
                        <div key={idx} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between" id={`pos-tag-${item.word}`}>
                          <div>
                            <span className="font-extrabold text-xs sm:text-sm text-slate-900 font-mono block">{item.word}</span>
                            <span className="text-[10px] font-semibold text-slate-400">Dịch nghĩa: {item.meaning}</span>
                          </div>
                          <span className="text-[9px] bg-indigo-100 text-indigo-800 font-black uppercase px-2 py-0.5 rounded-md tracking-wider">
                            {item.partOfSpeech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Elaborate Detailed Rules explanation block */}
                  <div className="p-5 bg-slate-950 text-slate-200 rounded-2xl space-y-3 font-semibold relative overflow-hidden shadow-lg border border-slate-800">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />
                    <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest block">💡 Diễn giải cấu trúc & Quy tắc ngữ pháp chi tiết:</span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-mono" id="ai-parser-detailed-notes">
                      {parseResult.grammarExplanation}
                    </p>
                    {parseResult.polishedRewrite && (
                      <div className="pt-3 border-t border-slate-800 space-y-1">
                        <span className="text-[10px] text-emerald-400 font-black uppercase block tracking-wider">🌟 Cách nói bóng bẩy nâng band điểm hơn (AI Polished Recommendation):</span>
                        <p className="text-xs text-white bg-slate-900 p-2.5 rounded border border-slate-800 font-bold">
                          {parseResult.polishedRewrite}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* AI DRILLS/EXERCISES TAB */}
          {activeTab === 'ai-drills' && (
            <motion.div
              key="ai-drills-viewport"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-1">
                  <h3 className="text-lg font-black font-display text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-5.5 h-5.5 text-indigo-500" /> Thử Thách Luyện Tập Ngữ Pháp Cốt Lõi
                  </h3>
                  <p className="text-xs text-slate-400 font-bold">
                    Lên bài rèn luyện ngẫu phác do Trí tuệ AI thiết kế riêng dựa trên chủ đề bé tự chọn. Mỗi bài thi kéo dài đúng 3 câu trắc nghiệm đặc trưng.
                  </p>
                </div>
                
                {/* Topic selector for drill */}
                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block shrink-0">Chủ đề:</label>
                  <select
                    value={drillTopicId}
                    onChange={(e) => handleGenerateDrills(e.target.value)}
                    className="flex-1 sm:w-64 text-xs font-black bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-slate-800 focus:outline-none"
                  >
                    {GRAMMAR_TOPICS.map(t => (
                      <option key={t.id} value={t.id}>{t.title} ({t.gradeRange})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Loader */}
              {drillsLoading && (
                <div className="text-center py-16 space-y-4">
                  <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto animate-duration-700" />
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider animate-pulse">👨‍🏫 Thầy James AI đang soạn đề thi trắc nghiệm riêng cho bé...</p>
                </div>
              )}

              {/* Custom Error alert if backend generates backup mockup */}
              {drillsError && !drillsLoading && drillsQuestions.length > 0 && (
                <div className="p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-[11px] font-bold">
                  ⚠️ Lưu ý: {drillsError}
                </div>
              )}

              {/* Main Quiz interface */}
              {!drillsLoading && drillsQuestions.length > 0 && !drillFinished && (
                <div className="space-y-6" id="ai-drills-active-game">
                  
                  {/* Scoreboard and progression info bar */}
                  <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Câu Hỏi {currentQuestionIdx + 1} / {drillsQuestions.length}
                    </div>
                    <div className="flex items-center gap-1.5 font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs">
                      🏆 Điểm số: <strong className="text-slate-900">{drillsScore} / {drillsQuestions.length}</strong>
                    </div>
                  </div>

                  {/* Question Box */}
                  <div className="p-5 bg-indigo-50/20 border border-indigo-100/50 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">✏️</span>
                      <span className="text-[10px] font-black text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full uppercase">
                        Grammar Drill
                      </span>
                    </div>
                    <h4 className="text-slate-900 font-extrabold text-sm sm:text-base leading-relaxed">
                      {drillsQuestions[currentQuestionIdx].question}
                    </h4>
                  </div>

                  {/* Answers list choice options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {drillsQuestions[currentQuestionIdx].options.map((opt, optIdx) => {
                      const isSelected = selectedOption === optIdx;
                      const isCorrect = optIdx === drillsQuestions[currentQuestionIdx].correctAnswer;
                      let optionStyle = "bg-white hover:bg-slate-50 border-slate-200 text-slate-800";

                      if (isQuestionSubmitted) {
                        if (isCorrect) {
                          optionStyle = "bg-emerald-500 border-emerald-500 text-white font-extrabold";
                        } else if (isSelected) {
                          optionStyle = "bg-rose-500 border-rose-500 text-white font-bold";
                        } else {
                          optionStyle = "bg-white opacity-40 border-slate-100 text-slate-400";
                        }
                      } else if (isSelected) {
                        optionStyle = "bg-indigo-600 border-indigo-600 text-white font-extrabold shadow-md shadow-indigo-100";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isQuestionSubmitted}
                          onClick={() => setSelectedOption(optIdx)}
                          className={`w-full p-4 text-left text-xs sm:text-sm rounded-xl border transition cursor-pointer min-h-[50px] flex items-center justify-between ${optionStyle}`}
                          id={`drill-option-btn-${optIdx}`}
                        >
                          <span>{opt}</span>
                          {isQuestionSubmitted && isCorrect && <span className="text-white font-black text-base">✓</span>}
                          {isQuestionSubmitted && isSelected && !isCorrect && <span className="text-white font-black text-base">✗</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation feedback block once submitted */}
                  {isQuestionSubmitted && (
                    <div className={`p-4 rounded-2xl border text-xs sm:text-sm flex gap-3 items-start animate-fade-in ${
                      selectedOption === drillsQuestions[currentQuestionIdx].correctAnswer
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                        : 'bg-rose-50 border-rose-200 text-rose-950'
                    }`}>
                      <span className="text-xl">
                        {selectedOption === drillsQuestions[currentQuestionIdx].correctAnswer ? '🌟' : '💪'}
                      </span>
                      <div>
                        <p className="font-extrabold text-xs sm:text-sm">
                          {selectedOption === drillsQuestions[currentQuestionIdx].correctAnswer
                            ? 'Bé xuất sắc lắm! Trả lời hoàn hảo.'
                            : 'Bé bị điểm lừa một chút rồi! Hãy xem cô lý giải nhé:'}
                        </p>
                        <p className="text-[11px] sm:text-xs font-semibold text-slate-500 leading-relaxed mt-1">
                          {drillsQuestions[currentQuestionIdx].explanation}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Drills navigation actions footer */}
                  <div className="flex justify-end pt-3 border-t border-slate-100">
                    {!isQuestionSubmitted ? (
                      <button
                        onClick={() => {
                          if (selectedOption === null) return;
                          if (selectedOption === drillsQuestions[currentQuestionIdx].correctAnswer) {
                            setDrillsScore(prev => prev + 1);
                          }
                          setIsQuestionSubmitted(true);
                        }}
                        disabled={selectedOption === null}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-slate-900 disabled:opacity-40 text-white font-black rounded-xl text-xs sm:text-sm uppercase tracking-wide transition cursor-pointer"
                        id="submit-drill-btn"
                      >
                        Nộp Câu Trả Lời
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (currentQuestionIdx < drillsQuestions.length - 1) {
                            setCurrentQuestionIdx(prev => prev + 1);
                            setSelectedOption(null);
                            setIsQuestionSubmitted(false);
                          } else {
                            setDrillFinished(true);
                          }
                        }}
                        className="px-5 py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-black rounded-xl text-xs sm:text-sm uppercase tracking-wide transition flex items-center gap-1 cursor-pointer"
                        id="next-drill-btn"
                      >
                        {currentQuestionIdx < drillsQuestions.length - 1 ? 'Câu tiếp theo' : 'Xem Điểm Thắng cuộc 🏆'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                </div>
              )}

              {/* Finished Screen for active drills */}
              {drillFinished && (
                <div className="text-center py-12 max-w-lg mx-auto space-y-6" id="drills-conclusion-portal">
                  <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 via-indigo-600 to-indigo-700 text-white flex items-center justify-center rounded-3xl mx-auto shadow-lg shadow-indigo-100 select-none text-4xl font-extrabold animate-bounce">
                    🎉
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xl sm:text-2xl font-black font-display text-slate-900">Thử thách kết thúc mỹ mãn!</h4>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Năng lực rèn luyện của học viên {studentUsername}</p>
                    
                    {/* Score showcase badge */}
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-3xl inline-block mt-2">
                      <span className="text-slate-500 text-xs font-bold block uppercase">Điểm số bảo toàn:</span>
                      <strong className="text-3xl text-indigo-700 font-display font-black leading-none">{drillsScore} / {drillsQuestions.length} ⭐</strong>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-650 font-semibold leading-relaxed px-4">
                    {drillsScore === drillsQuestions.length 
                      ? 'Thật thần kỳ! Bé đã hoàn thành tuyệt đối bài luyện tập. Khả năng mẫn cảm ngữ pháp của bé cực tốt.' 
                      : 'Nỗ lực tuyệt hảo! Đừng buồn nhé bé, hãy ôn tập lý thuyết thêm ở Handbook rồi nhấn Chơi Lại để chinh phục đỉnh cao điểm số!'}
                  </p>

                  <div className="flex gap-2.5 justify-center">
                    <button
                      onClick={() => handleGenerateDrills(drillTopicId)}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-slate-900 text-white font-black rounded-xl text-xs sm:text-sm uppercase tracking-wide transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-50"
                    >
                      <RefreshCw className="w-4 h-4" /> Chơi Lại Ngay
                    </button>
                    <button
                      onClick={() => setActiveTab('handbook')}
                      className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-500 font-black rounded-xl text-xs sm:text-sm uppercase tracking-wide transition cursor-pointer"
                    >
                      Về Handbook lý thuyết
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* IRREGULAR VERBS TAB */}
          {activeTab === 'irregular-verbs' && (
            <motion.div
              key="irregular-verbs-viewport"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left side: Verb reference lookup list */}
              <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-black font-display text-slate-900 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-500" /> Bảng Động Từ Bất Quy Tắc Thông Dụng
                    </h3>
                    <p className="text-xs text-slate-400 font-bold">
                      Tra cứu nhanh chóng dạng Quá khứ đơn (V2) và Quá khứ phân từ (V3) kèm nghĩa tiếng Việt tường tận.
                    </p>
                  </div>
                </div>

                {/* Instant search input */}
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-3 shadow-inner">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm động từ ví dụ: go, buy, viết, ngủ..."
                    value={verbSearch}
                    onChange={(e) => setVerbSearch(e.target.value)}
                    className="w-full bg-transparent border-none text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none placeholder-slate-400"
                  />
                </div>

                {/* Verb table */}
                <div className="overflow-x-auto border border-slate-150 rounded-2xl max-h-[480px] overflow-y-auto" id="irregular-verbs-table-wrapper">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-150 text-[11px] font-black text-slate-400 uppercase tracking-widest sticky top-0 z-10 shadow-sm">
                        <th className="p-3.5 pl-5 bg-slate-50">Nguyên thể (V1 - Infinitive)</th>
                        <th className="p-3.5 bg-slate-50">Quá khứ đơn (V2 - Past Simple)</th>
                        <th className="p-3.5 bg-slate-50">Quá khứ phân từ (V3 - Past Participle)</th>
                        <th className="p-3.5 pr-5 bg-slate-50">Ý nghĩa (Vietnamese)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/80 font-semibold text-xs sm:text-sm text-slate-700">
                      {IRREGULAR_VERBS.filter(v => 
                        v.infinitive.toLowerCase().includes(verbSearch.toLowerCase()) ||
                        v.pastSimple.toLowerCase().includes(verbSearch.toLowerCase()) ||
                        v.pastParticiple.toLowerCase().includes(verbSearch.toLowerCase()) ||
                        v.meaning.toLowerCase().includes(verbSearch.toLowerCase())
                      ).length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-slate-400 font-bold">
                            Không tìm thấy động từ nào phù hợp với từ khóa tìm kiếm.
                          </td>
                        </tr>
                      ) : (
                        IRREGULAR_VERBS.filter(v => 
                          v.infinitive.toLowerCase().includes(verbSearch.toLowerCase()) ||
                          v.pastSimple.toLowerCase().includes(verbSearch.toLowerCase()) ||
                          v.pastParticiple.toLowerCase().includes(verbSearch.toLowerCase()) ||
                          v.meaning.toLowerCase().includes(verbSearch.toLowerCase())
                        ).map((v, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-3.5 pl-5">
                              <div className="font-mono text-indigo-700 font-extrabold text-sm sm:text-base">{v.infinitive}</div>
                              {v.infinitivePhonetic && (
                                <div className="text-[11px] text-slate-400 font-medium font-mono tracking-wide mt-0.5">{v.infinitivePhonetic}</div>
                              )}
                            </td>
                            <td className="p-3.5">
                              <div className="font-mono text-amber-700 font-bold text-sm sm:text-base">{v.pastSimple}</div>
                              {v.pastSimplePhonetic && (
                                <div className="text-[11px] text-slate-400 font-medium font-mono tracking-wide mt-0.5">{v.pastSimplePhonetic}</div>
                              )}
                            </td>
                            <td className="p-3.5">
                              <div className="font-mono text-emerald-700 font-bold text-sm sm:text-base">{v.pastParticiple}</div>
                              {v.pastParticiplePhonetic && (
                                <div className="text-[11px] text-slate-400 font-medium font-mono tracking-wide mt-0.5">{v.pastParticiplePhonetic}</div>
                              )}
                            </td>
                            <td className="p-3.5 pr-5 font-sans text-slate-500 font-bold text-xs sm:text-sm">{v.meaning}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right side: Practice flashcard widget */}
              <div className="lg:col-span-4 bg-gradient-to-br from-indigo-50/20 to-white p-5 sm:p-6 rounded-3xl border border-indigo-100 shadow-md space-y-5">
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-extrabold font-display text-slate-900 flex items-center gap-1.5">
                    <Award className="w-5 h-5 text-indigo-600 animate-pulse" /> Thử tài phản xạ V2 & V3
                  </h3>
                  <p className="text-[11px] text-slate-400 font-bold leading-relaxed">
                    Kiểm tra phản xạ ghi nhớ tức thì các động từ bất quy tắc tiếng Anh cực kỳ vui vẻ!
                  </p>
                </div>

                {/* Score badge details */}
                <div className="bg-white p-3.5 rounded-2xl border border-indigo-50 flex justify-between items-center shadow-sm">
                  <span className="text-xs font-black text-slate-400 uppercase">🏆 Điểm số của bạn:</span>
                  <strong className="text-indigo-700 text-lg font-black font-display">{verbQuizScore}</strong>
                </div>

                {/* Main flashcard prompt */}
                <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 text-center space-y-4 relative overflow-hidden shadow-lg min-h-[160px] flex flex-col justify-center">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="space-y-1.5">
                    <span className="text-[9px] bg-slate-800 text-slate-400 font-black px-2.5 py-1 rounded-md tracking-wider uppercase">Động từ gốc (V1 - Infinitive)</span>
                    <h4 className="text-2xl font-black font-display tracking-tight text-indigo-300">
                      {IRREGULAR_VERBS[randomVerbIdx]?.infinitive}
                    </h4>
                    {IRREGULAR_VERBS[randomVerbIdx]?.infinitivePhonetic && (
                      <div className="text-xs text-indigo-200/80 font-mono tracking-wide">
                        {IRREGULAR_VERBS[randomVerbIdx]?.infinitivePhonetic}
                      </div>
                    )}
                    <p className="text-xs text-slate-300 font-semibold leading-relaxed pt-1">
                      Nghĩa tiếng Việt: <strong className="text-emerald-400 font-bold">"{IRREGULAR_VERBS[randomVerbIdx]?.meaning}"</strong>
                    </p>
                  </div>
                </div>

                {/* Input practice boxes */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Viết phân thì V2 (Past Simple):</label>
                    <input
                      type="text"
                      disabled={verbQuizChecked}
                      value={v2Input}
                      onChange={(e) => setV2Input(e.target.value)}
                      placeholder="Nhập dạng V2..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none placeholder-slate-400 text-slate-800 shadow-sm font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Viết phân thì V3 (Past Participle):</label>
                    <input
                      type="text"
                      disabled={verbQuizChecked}
                      value={v3Input}
                      onChange={(e) => setV3Input(e.target.value)}
                      placeholder="Nhập dạng V3..."
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none placeholder-slate-400 text-slate-800 shadow-sm font-mono"
                    />
                  </div>
                </div>

                {/* Verbal feedback result block */}
                {verbQuizChecked && (
                  <div className={`p-3.5 rounded-xl border text-xs leading-relaxed flex gap-2 items-start animate-fade-in ${
                    isVerbQuizCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
                  }`}>
                    <span className="text-lg">{isVerbQuizCorrect ? '🎉' : '❌'}</span>
                    <p className="font-semibold">{verbQuizFeedback}</p>
                  </div>
                )}

                {/* Submit / next controllers */}
                <div className="flex gap-2.5 pt-1">
                  {!verbQuizChecked ? (
                    <button
                      onClick={handleCheckVerbQuiz}
                      disabled={!v2Input || !v3Input}
                      className="flex-1 py-3 bg-indigo-600 font-black uppercase text-white rounded-xl text-xs hover:bg-slate-900 disabled:opacity-40 transition cursor-pointer shadow-sm text-center"
                    >
                      Báo cáo đáp án
                    </button>
                  ) : (
                    <button
                      onClick={handleNextVerbQuiz}
                      className="flex-1 py-3 bg-indigo-900 font-black uppercase text-white rounded-xl text-xs hover:bg-indigo-950 transition cursor-pointer shadow-sm text-center flex items-center justify-center gap-1"
                    >
                      Kiểm tra động từ tiếp <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
