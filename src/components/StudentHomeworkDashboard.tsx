import React, { useState, useEffect } from 'react';
import { HomeworkAssignment, HomeworkSubmission, CEFRLevel } from '../types';
import { 
  ClipboardList, BookOpen, Calendar, Clock, CheckSquare, 
  UploadCloud, FileText, Send, AlertCircle, Check, 
  Trophy, RefreshCw, X, Sparkles, CheckCircle2,
  BookMarked, ChevronRight, RotateCcw, Award, CheckSquare as CheckIcon, CheckCircle,
  PenTool, HelpCircle, Brain, Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ebookTopics, EbookTopic, EbookWord, EbookQuestion } from '../data/ebookVocabData';
import { ieltsWritingTopics, IELTSWritingTopic } from '../data/writingData';
import { HACK_3000_MINDMAPS } from '../data/hack3000Mindmaps';

interface StudentHomeworkDashboardProps {
  studentUsername: string;
  studentFullName: string;
  assignments: HomeworkAssignment[];
  submissions: HomeworkSubmission[];
  onHwSubmitted: () => void;
}

export default function StudentHomeworkDashboard({
  studentUsername,
  studentFullName,
  assignments,
  submissions,
  onHwSubmitted
}: StudentHomeworkDashboardProps) {
  
  const [selectedAs, setSelectedAs] = useState<HomeworkAssignment | null>(null);
  const [answersState, setAnswersState] = useState<{ [qId: number]: string }>({});
  
  // Ebook sub tabs & quiz states
  const [hwMode, setHwMode] = useState<'class' | 'ebook' | 'writing' | 'game'>('class');
  const [selectedTopic, setSelectedTopic] = useState<EbookTopic | null>(null);
  const [ebookSubTab, setEbookSubTab] = useState<'vocab' | 'practice'>('vocab');
  const [ebookAnswers, setEbookAnswers] = useState<{ [qId: number]: string }>({});
  const [ebookGraded, setEbookGraded] = useState<boolean>(false);
  const [ebookResults, setEbookResults] = useState<{ [qId: number]: boolean }>({});
  const [ebookScore, setEbookScore] = useState<number>(0);
  const [topicScores, setTopicScores] = useState<{ [topicId: string]: number }>({});

  // IELTS Writing States
  const [selectedWritingTopic, setSelectedWritingTopic] = useState<IELTSWritingTopic | null>(null);
  const [writingSubTab, setWritingSubTab] = useState<'practice' | 'resources' | 'sample'>('practice');
  const [writingEssay, setWritingEssay] = useState<string>('');
  const [isGradingWriting, setIsGradingWriting] = useState<boolean>(false);
  const [writingEvaluation, setWritingEvaluation] = useState<any | null>(null);
  const [writingScores, setWritingScores] = useState<{ [topicId: string]: number }>({});

  // Hack 3000 Game States
  const [gameChapterId, setGameChapterId] = useState<number>(1);
  const [gameSectionId, setGameSectionId] = useState<string>("topic_1");
  const [activePracticeGame, setActivePracticeGame] = useState<'matching' | 'puzzle' | 'arranger'>('matching');

  // Matching game states
  const [matchingEnItems, setMatchingEnItems] = useState<Array<{ id: string; word: string }>>([]);
  const [matchingViItems, setMatchingViItems] = useState<Array<{ id: string; word: string }>>([]);
  const [matchPairsCompleted, setMatchPairsCompleted] = useState<string[]>([]);
  const [matchSelectedId, setMatchSelectedId] = useState<{ id: string; type: 'en' | 'vi' } | null>(null);
  const [matchFeedback, setMatchFeedback] = useState<{ text: string; success: boolean } | null>(null);
  const [matchTries, setMatchTries] = useState<number>(0);
  const [matchingCorrectMap, setMatchingCorrectMap] = useState<Record<string, string>>({});

  // Word Search states
  const [puzzleGrid, setPuzzleGrid] = useState<string[][]>([]);
  const [puzzleTargetWords, setPuzzleTargetWords] = useState<Array<{ word: string; mean: string; tip: string }>>([]);
  const [puzzleSelectedCells, setPuzzleSelectedCells] = useState<Array<{ r: number; c: number }>>([]);
  const [puzzleFoundWords, setPuzzleFoundWords] = useState<string[]>([]);
  const [puzzleFoundCells, setPuzzleFoundCells] = useState<Array<{ r: number; c: number }>>([]);
  const [puzzleFeedback, setPuzzleFeedback] = useState<string>('');

  // Arranger states
  const [arrangerItems, setArrangerItems] = useState<Array<{ word: string; translation: string; correctCategory: string }>>([]);
  const [arrangerCategories, setArrangerCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [arrangerUserAnswers, setArrangerUserAnswers] = useState<Record<string, string>>({});
  const [arrangerChecked, setArrangerChecked] = useState<boolean>(false);
  const [arrangerFeedback, setArrangerFeedback] = useState<string>('');

  const getThemeNumberFromTitle = (title: string): number => {
    const match = title.match(/Theme\s+(\d+)/i);
    return match ? parseInt(match[1], 10) : 99;
  };

  const hack3000Data = HACK_3000_MINDMAPS.filter((chap: any) => {
    const themeNum = getThemeNumberFromTitle(chap.title);
    return !(themeNum >= 11 && themeNum <= 13) || chap.title.includes("Nature") || chap.title.includes("Make-up") || chap.title.includes("Makeup") || chap.title.includes("Public places") || chap.title.includes("Public Places");
  });

  const playTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const initGamesForCurrentTopic = (chapId: number, secId: string) => {
    const chap = hack3000Data.find((c: any) => c.id === chapId) || hack3000Data[0];
    if (!chap) return;
    const sec = chap.sections?.find((s: any) => s.id === secId) || chap.sections?.[0];
    if (!sec) return;
    const nodes = sec.nodes || [];
    if (nodes.length === 0) return;

    // 1. MATCHING GAME
    const matchSize = Math.min(8, nodes.length);
    const selectedNodesForMatch = [...nodes].slice(0, matchSize);
    
    const correctMap: Record<string, string> = {};
    selectedNodesForMatch.forEach(n => {
      correctMap[n.word] = n.definition;
    });
    setMatchingCorrectMap(correctMap);

    const enItems = selectedNodesForMatch.map(n => ({ id: n.word, word: n.word }));
    setMatchingEnItems([...enItems].sort(() => 0.5 - Math.random()));

    const viItems = selectedNodesForMatch.map(n => ({ id: n.definition, word: n.definition }));
    setMatchingViItems([...viItems].sort(() => 0.5 - Math.random()));

    setMatchSelectedId(null);
    setMatchPairsCompleted([]);
    setMatchFeedback(null);
    setMatchTries(0);

    // 2. WORD SEARCH PUZZLE
    const puzzleSize = Math.min(5, nodes.length);
    const selectedNodesForPuzzle = [...nodes].slice(0, puzzleSize);
    const puzzleTargets = selectedNodesForPuzzle.map(n => {
      const cleanWord = n.word.toUpperCase().replace(/[^A-Z]/g, '');
      return {
        word: cleanWord,
        mean: n.definition,
        tip: n.pos
      };
    }).filter(t => t.word.length >= 2 && t.word.length <= 10);

    const grid: string[][] = Array(10).fill(null).map(() => Array(10).fill(''));
    
    const placeWord = (w: string) => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        attempts++;
        const isHorizontal = Math.random() > 0.5;
        if (isHorizontal) {
          const r = Math.floor(Math.random() * 10);
          const c = Math.floor(Math.random() * (11 - w.length));
          let conflict = false;
          for (let i = 0; i < w.length; i++) {
            if (grid[r][c + i] !== '' && grid[r][c + i] !== w[i]) {
              conflict = true;
              break;
            }
          }
          if (!conflict) {
            for (let i = 0; i < w.length; i++) {
              grid[r][c + i] = w[i];
            }
            placed = true;
          }
        } else {
          const r = Math.floor(Math.random() * (11 - w.length));
          const c = Math.floor(Math.random() * 10);
          let conflict = false;
          for (let i = 0; i < w.length; i++) {
            if (grid[r + i][c] !== '' && grid[r + i][c] !== w[i]) {
              conflict = true;
              break;
            }
          }
          if (!conflict) {
            for (let i = 0; i < w.length; i++) {
              grid[r + i][c] = w[i];
            }
            placed = true;
          }
        }
      }
    };

    puzzleTargets.forEach(t => placeWord(t.word));

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        if (grid[r][c] === '') {
          grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }

    setPuzzleGrid(grid);
    setPuzzleTargetWords(puzzleTargets);
    setPuzzleSelectedCells([]);
    setPuzzleFoundWords([]);
    setPuzzleFoundCells([]);
    setPuzzleFeedback('');

    // 3. ARRANGER GAME
    const arrangeNodes = [...nodes].slice(0, 8);
    const uniqueCategories = sec.categories || [
      { id: 'cat1', name: 'Nhóm 1' },
      { id: 'cat2', name: 'Nhóm 2' }
    ];
    setArrangerCategories(uniqueCategories);

    const items = arrangeNodes.map(n => {
      let correctCat = n.category || '';
      if (!uniqueCategories.some(c => c.id === correctCat)) {
        correctCat = uniqueCategories[Math.floor(Math.random() * uniqueCategories.length)].id;
      }
      return {
        word: n.word,
        translation: n.definition,
        correctCategory: correctCat
      };
    });
    setArrangerItems(items);
    setArrangerUserAnswers({});
    setArrangerChecked(false);
    setArrangerFeedback('');
  };

  useEffect(() => {
    if (hwMode === 'game') {
      initGamesForCurrentTopic(gameChapterId, gameSectionId);
    }
  }, [gameChapterId, gameSectionId, hwMode]);

  useEffect(() => {
    // Load Ebook topic scores
    const scores: { [key: string]: number } = {};
    ebookTopics.forEach(t => {
      const saved = localStorage.getItem(`ebook_score_${t.id}`);
      if (saved) {
        scores[t.id] = parseInt(saved, 10);
      }
    });
    setTopicScores(scores);

    // Load Writing topic scores
    const wScores: { [key: string]: number } = {};
    ieltsWritingTopics.forEach(wt => {
      const saved = localStorage.getItem(`writing_score_${wt.id}`);
      if (saved) {
        wScores[wt.id] = parseFloat(saved);
      }
    });
    setWritingScores(wScores);
  }, []);

  const handleSelectTopic = (topic: EbookTopic) => {
    setSelectedTopic(topic);
    setEbookSubTab('vocab');
    setEbookGraded(false);
    setEbookResults({});
    setEbookScore(0);
    
    // Load pre-existing answers if any from draft
    const savedDraft = localStorage.getItem(`ebook_draft_${topic.id}`);
    if (savedDraft) {
      try {
        setEbookAnswers(JSON.parse(savedDraft));
      } catch (e) {
        setEbookAnswers({});
      }
    } else {
      setEbookAnswers({});
    }
  };

  const handleCheckEbookAnswers = () => {
    if (!selectedTopic) return;
    
    // Aggregate questions
    const allQuestions = [
      ...selectedTopic.questions.part1,
      ...selectedTopic.questions.part2,
      ...selectedTopic.questions.part3
    ];

    if (allQuestions.length === 0) return;

    let correctCount = 0;
    const results: { [key: number]: boolean } = {};

    allQuestions.forEach(q => {
      const studentAns = (ebookAnswers[q.id] || '').trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      const primaryCorrect = q.correctAnswer.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      
      let isCorrect = studentAns === primaryCorrect;
      
      if (!isCorrect && q.alternatives) {
        isCorrect = q.alternatives.some(alt => {
          const altNormalized = alt.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
          return studentAns === altNormalized;
        });
      }

      results[q.id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    const scorePct = Math.round((correctCount / allQuestions.length) * 100);
    setEbookResults(results);
    setEbookScore(scorePct);
    setEbookGraded(true);

    // Save best score
    const currentBest = topicScores[selectedTopic.id] || 0;
    if (scorePct > currentBest) {
      localStorage.setItem(`ebook_score_${selectedTopic.id}`, scorePct.toString());
      setTopicScores(prev => ({ ...prev, [selectedTopic.id]: scorePct }));
    }

    // Save answer drafts
    localStorage.setItem(`ebook_draft_${selectedTopic.id}`, JSON.stringify(ebookAnswers));
  };

  const handleResetEbookAnswers = () => {
    if (!selectedTopic) return;
    if (confirm("Bé có muốn làm lại từ đầu bài tập của chủ đề này không? Toàn bộ đáp án đã viết sẽ được xóa.")) {
      setEbookAnswers({});
      setEbookGraded(false);
      setEbookResults({});
      setEbookScore(0);
      localStorage.removeItem(`ebook_draft_${selectedTopic.id}`);
    }
  };

  // IELTS Writing Handlers
  const handleSelectWritingTopic = (topic: IELTSWritingTopic) => {
    setSelectedWritingTopic(topic);
    setWritingSubTab('practice');
    
    const savedEssay = localStorage.getItem(`writing_draft_${topic.id}`);
    setWritingEssay(savedEssay || '');
    
    const savedEval = localStorage.getItem(`writing_eval_${topic.id}`);
    if (savedEval) {
      try {
        setWritingEvaluation(JSON.parse(savedEval));
      } catch (e) {
        setWritingEvaluation(null);
      }
    } else {
      setWritingEvaluation(null);
    }
  };

  const handleEvaluateEssay = async () => {
    if (!selectedWritingTopic) return;
    if (!writingEssay.trim() || writingEssay.trim().split(/\s+/).filter(Boolean).length < 10) {
      alert("Bài viết quá ngắn! Bé vui lòng viết tối thiểu 10 từ tiếng Anh để hệ thống Co-Teacher AI có thể chấm điểm nhé.");
      return;
    }

    setIsGradingWriting(true);
    setWritingEvaluation(null);

    try {
      const response = await fetch('/api/homework/evaluate_essay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId: selectedWritingTopic.id,
          prompt: selectedWritingTopic.prompt,
          task: selectedWritingTopic.task,
          essay: writingEssay
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.evaluation) {
          setWritingEvaluation(result.evaluation);
          
          const score = result.evaluation.overallScore;
          localStorage.setItem(`writing_score_${selectedWritingTopic.id}`, score.toString());
          localStorage.setItem(`writing_eval_${selectedWritingTopic.id}`, JSON.stringify(result.evaluation));
          localStorage.setItem(`writing_draft_${selectedWritingTopic.id}`, writingEssay);
          
          setWritingScores(prev => ({ ...prev, [selectedWritingTopic.id]: score }));
          alert(`🎉 Co-Teacher AI đã chấm điểm thành công! Điểm của bé đạt được là ${score}/9.0. Hãy xem nhận xét chi tiết từng phần nhé!`);
        } else {
          alert("Gặp lỗi trong quá trình chấm điểm tự động. Bé vui lòng thử lại nhé!");
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Không thể kết nối với Co-Teacher AI. Vui lòng thử lại sau.");
      }
    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi hệ thống khi gửi bài viết cho AI chấm điểm.");
    } finally {
      setIsGradingWriting(false);
    }
  };

  const handleResetWritingEssay = () => {
    if (!selectedWritingTopic) return;
    if (confirm("Bé có muốn xóa bài và làm lại từ đầu bài tập luyện viết này không? Toàn bộ đáp án đã viết sẽ được xóa.")) {
      setWritingEssay('');
      setWritingEvaluation(null);
      localStorage.removeItem(`writing_draft_${selectedWritingTopic.id}`);
      localStorage.removeItem(`writing_eval_${selectedWritingTopic.id}`);
      localStorage.removeItem(`writing_score_${selectedWritingTopic.id}`);
      setWritingScores(prev => {
        const next = { ...prev };
        delete next[selectedWritingTopic.id];
        return next;
      });
    }
  };

  const getWordChipsForAnswer = (correctAnswer: string) => {
    const cleaned = correctAnswer.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const words = cleaned.split(/\s+/).filter(w => w.trim().length > 0);
    return words.map(w => w.trim()).sort(() => 0.5 - Math.random());
  };

  // File Upload State
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadedFileBase64, setUploadedFileBase64] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Helper: Find submission for selected or current assignment
  const getSubForAssignment = (asId: string) => {
    return submissions.find(
      (sub) => sub.assignmentId === asId && sub.studentUsername.trim().toLowerCase() === studentUsername.trim().toLowerCase()
    );
  };

  const handleSelectAssignment = (as: HomeworkAssignment) => {
    setSelectedAs(as);
    const existingSub = getSubForAssignment(as.id);
    
    if (existingSub) {
      // Re-populate submitted answers
      const prepopulated: { [key: number]: string } = {};
      existingSub.answers.forEach(a => {
        prepopulated[a.questionId] = a.studentAnswer;
      });
      setAnswersState(prepopulated);
      setUploadedFileBase64(existingSub.submittedFileUrl || null);
      setUploadedFileName(existingSub.submittedFileName || '');
    } else {
      // Reset drafting workspace
      setAnswersState({});
      setUploadedFileBase64(null);
      setUploadedFileName('');
    }
  };

  // Drag & Drop File Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleLocalFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    if (!file) return;
    
    // Check file size limit (let's say 8MB for base64 storage efficiency)
    if (file.size > 8 * 1024 * 1024) {
      alert("Tệp của bé có dung lượng quá lớn (Vui lòng chọn tệp nhỏ hơn 8MB).");
      return;
    }

    setUploadedFileName(file.name);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFileBase64(reader.result as string);
    };
    reader.onerror = () => {
      alert("Đọc tệp tin thất bại, mến chúc bé thử lại bằng tệp khác nhé!");
    };
    reader.readAsDataURL(file);
  };

  const removeUploadedFile = () => {
    setUploadedFileBase64(null);
    setUploadedFileName('');
  };

  // Submit Homework action
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAs) return;

    // Verify all questions have some input before forcing submission
    const missing = selectedAs.questions.some(q => !answersState[q.id] || !answersState[q.id].trim());
    if (missing && !uploadedFileBase64) {
      if (!confirm("Bé ơi, bé chưa điền đầy đủ đáp án cho các câu hỏi. Bé có muốn tiếp tục đính kèm tệp tin tài liệu bài làm để nộp cho cô chấm không?")) {
        return;
      }
    }

    // Map answer array
    const structuredAnswers = selectedAs.questions.map(q => ({
      questionId: q.id,
      studentAnswer: answersState[q.id] || ""
    }));

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/homework/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          assignmentId: selectedAs.id,
          assignmentTitle: selectedAs.title,
          studentUsername,
          studentFullName,
          answers: structuredAnswers,
          submittedFileUrl: uploadedFileBase64 || undefined,
          submittedFileName: uploadedFileName || undefined
        })
      });

      if (response.ok) {
        alert("Bé đã nộp bài tập ngoại khóa thành công! Hệ thống đã ghi nhận tệp đính kèm và gửi trực tiếp tới máy tính của Thầy/Cô.");
        onHwSubmitted();
        
        // Refresh detail view
        const subResult = await response.json();
        if (subResult.submission) {
          handleSelectAssignment(selectedAs);
        }
      } else {
        alert("Nộp bài chưa thành công, vui lòng kiểm tra lại kết nối mạng!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối tới cơ sở dữ liệu làm bài.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 w-full" id="student-homework-parent-container">
      {/* Top Toggle Navigation for Homework Mode */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full sm:w-fit" id="homework-tab-selector">
        <button
          type="button"
          onClick={() => {
            setHwMode('class');
            setSelectedAs(null);
          }}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 uppercase ${
            hwMode === 'class'
              ? 'bg-white text-indigo-900 shadow-md shadow-indigo-150/40'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <ClipboardList className="w-4 h-4 text-indigo-600" />
          Bài tập từ Thầy Cô
        </button>
        <button
          type="button"
          onClick={() => {
            setHwMode('ebook');
            // Select first topic by default if nothing selected yet
            if (!selectedTopic && ebookTopics.length > 0) {
              handleSelectTopic(ebookTopics[0]);
            }
          }}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 uppercase relative ${
            hwMode === 'ebook'
              ? 'bg-white text-indigo-900 shadow-md shadow-indigo-150/40'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookMarked className="w-4 h-4 text-emerald-600" />
          Ebook Vocabulary
          <span className="absolute -top-1.5 -right-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-90 border border-white">
            HOT
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            setHwMode('writing');
            if (!selectedWritingTopic && ieltsWritingTopics.length > 0) {
              handleSelectWritingTopic(ieltsWritingTopics[0]);
            }
          }}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 uppercase relative ${
            hwMode === 'writing'
              ? 'bg-white text-indigo-900 shadow-md shadow-indigo-150/40'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <PenTool className="w-4 h-4 text-indigo-600" />
          IELTS Writing
          <span className="absolute -top-1.5 -right-1 bg-gradient-to-r from-indigo-500 to-sky-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-90 border border-white">
            AI
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            setHwMode('game');
          }}
          className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 uppercase relative ${
            hwMode === 'game'
              ? 'bg-white text-indigo-900 shadow-md shadow-indigo-150/40'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Brain className="w-4 h-4 text-violet-600" />
          Giải Đố Hack 3000
          <span className="absolute -top-1.5 -right-1 bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-90 border border-white">
            PLAY
          </span>
        </button>
      </div>

      {hwMode === 'class' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="student-homework-grid-container">
          
          {/* Left Column: Homework list */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/30 font-sans">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-indigo-50/60">
                <h4 className="font-extrabold text-indigo-900 font-display flex items-center gap-2 text-sm sm:text-base">
                  <ClipboardList className="w-5 h-5 text-indigo-600" /> Nhiệm vụ rèn luyện bổ sung
                </h4>
                <span className="text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-100 px-2.5 py-1 rounded-lg font-black">{assignments.length} bài tập</span>
              </div>

              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                {assignments.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs font-semibold">Bé chưa có bài tập giao bổ trợ nào từ giáo viên. Hãy bền bỉ theo đuổi lộ trình tự động nhé!</div>
                ) : (
                  assignments.map((as) => {
                    const sub = getSubForAssignment(as.id);
                    const isSelected = selectedAs?.id === as.id;
                    
                    return (
                      <div
                        key={as.id}
                        onClick={() => handleSelectAssignment(as)}
                        className={`p-4 rounded-2xl border transition duration-150 cursor-pointer ${
                          isSelected 
                            ? 'bg-indigo-50 border-indigo-300 shadow-md shadow-indigo-100/50' 
                            : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1.5 flex-wrap gap-1.5">
                          <span className="px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-black rounded-md uppercase">
                            {as.level}
                          </span>
                          {sub ? (
                            sub.status === 'graded' ? (
                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200 text-[9px] font-black rounded-md flex items-center gap-1">
                                <Trophy className="w-3 h-3 text-amber-500 fill-amber-500" /> Đã chấm: {sub.score}đ
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-200 text-[9px] font-black rounded-md flex items-center gap-1">
                                <Clock className="w-3 h-3 text-amber-500" /> Chờ chấm
                              </span>
                            )
                          ) : (
                            <span className="px-2 py-0.5 bg-rose-100 text-rose-800 border border-rose-200 text-[9px] font-black rounded-md flex items-center gap-1">
                              <AlertCircle className="w-3 h-3 text-rose-500" /> Chưa làm
                            </span>
                          )}
                        </div>

                        <h5 className="font-extrabold text-indigo-950 font-display text-xs sm:text-sm my-1">{as.title}</h5>
                        <p className="text-[11px] text-slate-400 font-semibold truncate mb-1.5">Chủ đề: <span className="text-slate-600">{as.topic}</span></p>
                        
                        <div className="text-[10px] text-slate-400 font-bold border-t border-slate-100 pt-1.5 flex justify-between">
                          <span>Hạn chót: {as.dueDate}</span>
                          {sub && (sub.submittedFileName || sub.submittedFileUrl) && (
                            <span className="text-indigo-600 font-extrabold text-[9px] flex items-center gap-1">📎 Có đính kèm file</span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive homework doing panel */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence mode="wait">
              {selectedAs ? (
                <motion.div
                  key={selectedAs.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-white p-6 rounded-3xl border border-sky-150 shadow-2xl shadow-indigo-100/50 font-sans"
                  id="student-homework-details-card"
                >
                  {/* Header Title with due date badge */}
                  <div className="flex justify-between items-start gap-4 mb-4 pb-4 border-b border-indigo-50/60 flex-wrap sm:flex-nowrap">
                    <div>
                      <span className="text-[9px] font-black bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md border border-indigo-100 uppercase tracking-widest font-sans inline-block mb-1">
                        CƠ HỘI LUYỆN TẬP TIẾNG ANH {selectedAs.level}
                      </span>
                      <h3 className="font-extrabold text-indigo-900 font-display text-base leading-snug">{selectedAs.title}</h3>
                      <p className="text-xs text-slate-400 font-semibold mt-0.5">Để khắc sâu chủ đề: <span className="text-indigo-600 font-bold">{selectedAs.topic}</span></p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-slate-400 font-semibold bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-emerald-500" /> Hạn bài: {selectedAs.dueDate}
                      </span>
                    </div>
                  </div>

                  {/* Status display or teacher grade view */}
                  {(() => {
                    const sub = getSubForAssignment(selectedAs.id);
                    if (sub) {
                      return (
                        <div className={`p-4 rounded-2xl mb-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${sub.status === 'graded' ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-150' : 'bg-amber-50/50 border border-amber-150'}`}>
                          <div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className={`w-5 h-5 ${sub.status === 'graded' ? 'text-emerald-600' : 'text-amber-500 animate-pulse'}`} />
                              <p className="font-extrabold text-slate-800 text-xs sm:text-sm font-display">
                                {sub.status === 'graded' ? 'Chúc mừng bạn nhỏ đã được Thầy/Cô chấm điểm xong!' : 'Bài làm của bạn đang trong hàng chờ Chấm Điểm.'}
                              </p>
                            </div>
                            <p className="text-[11px] text-slate-400 font-bold font-sans mt-1">Đã gửi hệ thống lúc: <strong className="text-slate-600 font-bold">{sub.submittedAt}</strong></p>
                          </div>

                          {sub.status === 'graded' ? (
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="text-[10px] text-indigo-500 font-black uppercase tracking-wide">Kết Quả Đạt Được</p>
                                <p className="text-lg font-black font-display text-emerald-700">{sub.score} / 100 điểm</p>
                              </div>
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-white text-xl shadow-lg shadow-amber-200">
                                👑
                              </div>
                            </div>
                          ) : (
                            <span className="text-xs bg-amber-150 text-amber-800 font-black px-3 py-1.5 rounded-xl border border-amber-200">
                              ⏱ Chờ Chấm Điểm
                            </span>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })()}

                  {/* Detail homework workspace Form */}
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    
                    {/* Questions */}
                    <div className="space-y-4">
                      <p className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                        <CheckSquare className="w-4 h-4 text-indigo-600" /> Vui lòng rà soát và trả lời các phần sau:
                      </p>

                      {selectedAs.questions.map((q, qidx) => {
                        const sub = getSubForAssignment(selectedAs.id);
                        const readOnly = !!sub;
                        const val = answersState[q.id] || '';

                        // Layout question box
                        return (
                          <div key={q.id} className="p-4 bg-slate-50/60 rounded-2xl border border-slate-100 flex flex-col gap-3">
                            <div className="flex justify-between items-start gap-3">
                              <p className="text-xs sm:text-sm font-black text-slate-800">
                                Câu {qidx + 1}: {q.question}
                              </p>
                              <span className="px-2 py-0.5 bg-slate-205 bg-slate-205 text-slate-500 text-[9px] font-black rounded-md uppercase tracking-wide shrink-0 font-mono">
                                {q.type}
                              </span>
                            </div>

                            {/* Rendering by Question Type */}
                            {q.type === 'quiz' && q.options && q.options.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                                {q.options.map((opt, oIdx) => {
                                  const isSelected = String(oIdx) === val;
                                  return (
                                    <button
                                      key={oIdx}
                                      type="button"
                                      disabled={readOnly}
                                      onClick={() => setAnswersState(prev => ({ ...prev, [q.id]: String(oIdx) }))}
                                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition duration-150 ${
                                        isSelected
                                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-150'
                                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                      }`}
                                    >
                                      {String.fromCharCode(65 + oIdx)}. {opt}
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {q.type === 'sentence_construction' && (
                              <div className="space-y-2 mt-1">
                                {/* Word chips helper for children to click */}
                                {!readOnly && (
                                  <div className="flex flex-wrap gap-1.5 p-2 bg-white/70 border border-slate-200/55 rounded-xl">
                                    <span className="text-[10px] font-bold text-slate-400 shrink-0 w-full mb-1">💡 Bé có thể nhấp chọn mảnh ghép từ sau để gắn vào câu:</span>
                                    {(() => {
                                      // Regex extract all words between brackets or split standard string tokens
                                      const bracketMatch = q.question.match(/\[(.*?)\]/);
                                      const rawWordsString = bracketMatch ? bracketMatch[1] : '';
                                      const listWords = rawWordsString 
                                        ? rawWordsString.split('/').map(w => w.trim()) 
                                        : q.question.split(' ').slice(0, 10);
                                      
                                      return listWords.map((word, wi) => (
                                        <button
                                          key={wi}
                                          type="button"
                                          onClick={() => {
                                            const curAns = answersState[q.id] || '';
                                            const spacing = curAns ? ' ' : '';
                                            setAnswersState(prev => ({ ...prev, [q.id]: curAns + spacing + word }));
                                          }}
                                          className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-extrabold rounded-lg border border-indigo-155 transition cursor-pointer"
                                        >
                                          +{word}
                                        </button>
                                      ));
                                    })()}
                                    <button 
                                      type="button"
                                      onClick={() => setAnswersState(prev => ({ ...prev, [q.id]: '' }))}
                                      className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-150 text-[10px] font-extrabold rounded-lg cursor-pointer ml-auto"
                                    >
                                      Xóa nháp
                                    </button>
                                  </div>
                                )}

                                <input 
                                  type="text"
                                  disabled={readOnly}
                                  value={val}
                                  onChange={(e) => setAnswersState(prev => ({ ...prev, [q.id]: e.target.value }))}
                                  placeholder="Nhập câu bé xây dựng hoàn thiện vào đây..."
                                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-extrabold text-slate-800 focus:outline-none focus:border-indigo-500"
                                />
                              </div>
                            )}

                            {q.type === 'essay' && (
                              <div className="mt-1">
                                <textarea
                                  rows={3}
                                  disabled={readOnly}
                                  value={val}
                                  onChange={(e) => setAnswersState(prev => ({ ...prev, [q.id]: e.target.value }))}
                                  placeholder="Nhập câu chuyện hành văn ngắn của bé (3-4 câu hoàn toàn bằng Tiếng Anh)..."
                                  className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-indigo-500"
                                />
                              </div>
                            )}

                            {q.hint && (
                              <p className="text-[10px] text-indigo-500 italic font-medium font-sans">
                                Gợi ý cho bé: {q.hint}
                              </p>
                            )}
                            
                            {/* Display correction details if graded */}
                            {sub && sub.status === 'graded' && q.correctAnswer && (
                              <div className="mt-2 text-[11px] font-semibold flex items-center justify-between text-slate-500 border-t border-dashed border-slate-200 pt-2 flex-wrap">
                                <span>Bài nộp của bé học viên: <strong className="text-slate-700 font-extrabold">{q.type === 'quiz' ? String.fromCharCode(65 + Number(val)) : val}</strong></span>
                                <span className="text-emerald-700 font-bold">Đáp án chuẩn: <strong className="font-mono">{q.type === 'quiz' ? String.fromCharCode(65 + Number(q.correctAnswer)) : q.correctAnswer}</strong></span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* THE EXQUISITE FILE UPLOAD ENGINE REQUESTED BY USER */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-1">
                        <p className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                          <UploadCloud className="w-4.5 h-4.5 text-indigo-600" /> Tải lên Tệp Bài Làm Đính Kèm (Không bắt buộc)
                        </p>
                        <span className="text-[9px] text-slate-400 font-medium">Bé có thể chụp hình vở viết, ghi âm bé đọc, hoặc gửi tệp PDF</span>
                      </div>

                      {/* Drag and Drop Container layout */}
                      {(() => {
                        const sub = getSubForAssignment(selectedAs.id);
                        const readOnly = !!sub;

                        if (readOnly) {
                          // Read-only uploaded file
                          if (uploadedFileName || uploadedFileBase64) {
                            return (
                              <div className="p-4 bg-indigo-50/50 border border-indigo-150 rounded-2xl flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 overflow-hidden">
                                  <FileText className="w-8 h-8 text-indigo-600 shrink-0" />
                                  <div className="overflow-hidden">
                                    <p className="text-[10px] text-indigo-500 font-bold uppercase">Tệp bé nộp kèm theo bài làm</p>
                                    <p className="text-xs font-black text-slate-800 truncate">{uploadedFileName || 'tai_lieu_dinh_kem.pdf'}</p>
                                  </div>
                                </div>
                                {uploadedFileBase64 && (
                                  <a 
                                    href={uploadedFileBase64} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-slate-900 text-white text-[10px] font-black rounded-lg transition"
                                  >
                                    Xem / Mở tệp
                                  </a>
                                )}
                              </div>
                            );
                          } else {
                            return (
                              <div className="p-3 bg-slate-50 border border-dashed border-slate-150 rounded-2xl text-center text-slate-400 text-xs font-medium">
                                📁 Không có tài liệu đính kèm kèm theo bài nộp này.
                              </div>
                            );
                          }
                        }

                        // Interactive File Drag and Drop Box
                        return (
                          <div className="space-y-3">
                            {uploadedFileBase64 ? (
                              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 overflow-hidden">
                                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-xl shrink-0">📎</div>
                                  <div className="overflow-hidden">
                                    <p className="text-xs font-extrabold text-slate-800 truncate">{uploadedFileName}</p>
                                    <p className="text-[9px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                                      <Check className="w-3.5 h-3.5 text-emerald-500" /> Tải lên thành công! Đã chuyển đổi chuẩn hóa.
                                    </p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={removeUploadedFile}
                                  className="p-1 px-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-150 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer"
                                >
                                  Gỡ bỏ file ✗
                                </button>
                              </div>
                            ) : (
                              <div 
                                onDragEnter={handleDrag}
                                onDragOver={handleDrag}
                                onDragLeave={handleDrag}
                                onDrop={handleDrop}
                                className={`p-6 border-2 border-dashed rounded-3xl text-center flex flex-col items-center justify-center transition duration-150 ${
                                  dragActive 
                                    ? 'border-indigo-600 bg-indigo-50/45' 
                                    : 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20'
                                }`}
                              >
                                <input 
                                  type="file" 
                                  id="homework-file-upload-input" 
                                  onChange={handleLocalFileSelect}
                                  className="hidden" 
                                />
                                
                                <UploadCloud className="w-10 h-10 text-slate-400 mb-2" />
                                <p className="text-xs font-extrabold text-slate-700">Kéo & Thả file làm bài của bé vào đây</p>
                                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Nhận hỗ trợ toàn bộ ảnh chụp (.png, .jpeg, .pdf) hoặc file ghi âm bài tập</p>
                                
                                <label 
                                  htmlFor="homework-file-upload-input" 
                                  className="mt-3.5 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-black rounded-xl border border-indigo-150 transition cursor-pointer shadow-sm"
                                >
                                  Chọn file từ máy tính
                                </label>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Display any core teacher notes and scores if graded */}
                    {(() => {
                      const sub = getSubForAssignment(selectedAs.id);
                      if (sub && sub.status === 'graded' && sub.feedback) {
                        return (
                          <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 font-sans mt-3">
                            <p className="text-xs font-black text-indigo-950 flex items-center gap-1.5 pb-1 border-b border-indigo-100/40 mb-2">
                              🎯 Lời khuyên & Nhận xét chi tiết từ Thầy/Cô:
                            </p>
                            <p className="text-xs text-indigo-950 font-semibold leading-relaxed whitespace-pre-line">
                              {sub.feedback}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    })()}

                    {/* Submit button controls */}
                    {!getSubForAssignment(selectedAs.id) && (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-900 hover:scale-[1.015] active:scale-[0.98] text-white rounded-2xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-indigo-150 mt-4 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            Đang đồng bộ nộp bài tập...
                          </>
                        ) : (
                          <>
                            <Send className="w-4.5 h-4.5" />
                            GỬI BÀI TẬP & TỆP ĐÍNH KÈM CHO THẦY CÔ
                          </>
                        )}
                      </button>
                    )}
                  </form>

                </motion.div>
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center text-slate-400 text-xs font-bold leading-relaxed font-sans shadow-md">
                  💡 Hãy nhấp chọn một đề bài từ danh sách rèn luyện bổ trợ ở cột bên trái để trả lời câu hỏi, đính kèm tệp tin tài liệu luyện viết, ghi âm và gửi nộp cho Thầy/Cô sửa điểm chi tiết nhé!
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      )}

      {hwMode === 'ebook' && (
        /* INTERACTIVE EBOOK VOCABULARY LEARNING & PRACTICE PORTAL */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="student-ebook-grid-container">
          
          {/* Left Column: Topics scroll list */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/30 font-sans">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-indigo-50/60">
                <h4 className="font-extrabold text-slate-900 font-display flex items-center gap-2 text-sm sm:text-base">
                  <BookMarked className="w-5 h-5 text-emerald-600" /> Chủ Đề IELTS Vocabulary
                </h4>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-lg font-black">
                  {ebookTopics.length} CHỦ ĐỀ
                </span>
              </div>

              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                {ebookTopics.map((topic) => {
                  const score = topicScores[topic.id];
                  const isSelected = selectedTopic?.id === topic.id;
                  return (
                    <div
                      key={topic.id}
                      onClick={() => handleSelectTopic(topic)}
                      className={`p-4 rounded-2xl border transition duration-150 cursor-pointer text-left ${
                        isSelected
                          ? 'bg-emerald-50/50 border-emerald-300 shadow-md shadow-emerald-100/50'
                          : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1 flex-wrap gap-1">
                        <span className="px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-black rounded-md uppercase tracking-wider font-mono">
                          {topic.pageRange}
                        </span>
                        {score !== undefined ? (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-200 text-[9px] font-black rounded-md flex items-center gap-0.5">
                            <Trophy className="w-2.5 h-2.5 text-amber-500 fill-amber-500" /> Cao nhất: {score}%
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 border border-slate-200 text-[9px] font-black rounded-md flex items-center gap-0.5">
                            Chưa làm
                          </span>
                        )}
                      </div>

                      <h5 className="font-extrabold text-indigo-950 font-display text-xs sm:text-sm my-1">
                        {topic.title}
                      </h5>
                      <p className="text-[11px] text-slate-400 font-semibold mb-1">
                        Nghĩa: <span className="text-emerald-700 font-bold">{topic.titleVi}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium leading-relaxed line-clamp-2">
                        {topic.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Study / Exercise panel */}
          <div className="lg:col-span-8 space-y-4">
            {selectedTopic ? (
              <div className="bg-white p-6 rounded-3xl border border-sky-150 shadow-2xl shadow-indigo-100/50 font-sans">
                {/* Topic Header details */}
                <div className="flex justify-between items-start gap-4 mb-4 pb-4 border-b border-indigo-50/60 flex-wrap sm:flex-nowrap text-left">
                  <div>
                    <span className="text-[9px] font-black bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-100 uppercase tracking-widest inline-block mb-1">
                      HỌC LIỆU IELTS VOCABULARY CHÍNH QUY (NGUYỄN HUYỀN)
                    </span>
                    <h3 className="font-extrabold text-indigo-950 font-display text-base sm:text-lg leading-snug">
                      Topic {selectedTopic.title} – {selectedTopic.titleVi}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">
                      Phạm vi tài liệu: <span className="text-emerald-600 font-bold">{selectedTopic.pageRange}</span>
                    </p>
                  </div>
                </div>

                {/* Switcher tabs for Study vs practice */}
                <div className="flex border-b border-slate-100 mb-6 bg-slate-50 p-1 rounded-xl w-fit">
                  <button
                    type="button"
                    onClick={() => setEbookSubTab('vocab')}
                    className={`px-4 py-2 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition ${
                      ebookSubTab === 'vocab'
                        ? 'bg-white text-indigo-900 shadow-sm border border-slate-200/40'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    📖 1. Học Từ Vựng
                  </button>
                  <button
                    type="button"
                    onClick={() => setEbookSubTab('practice')}
                    className={`px-4 py-2 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition ${
                      ebookSubTab === 'practice'
                        ? 'bg-white text-indigo-900 shadow-sm border border-slate-200/40'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <CheckSquare className="w-4 h-4 text-indigo-600" />
                    ✍️ 2. Làm Bài Tập
                  </button>
                </div>

                {ebookSubTab === 'vocab' ? (
                  /* VOCABULARY LIST CARD */
                  <div className="space-y-6 text-left">
                    <p className="text-xs text-indigo-950/80 bg-indigo-50 p-3 rounded-xl border border-indigo-100 font-semibold leading-relaxed">
                      💡 <strong>Hướng dẫn:</strong> Bé học kỹ các mẫu câu từ vựng cốt lõi, đọc to phần phiên âm ví dụ, sau đó chuyển sang tab <strong>Làm Bài Tập</strong> để ôn luyện nhé!
                    </p>
                    
                    <div className="space-y-4">
                      {selectedTopic.words.map((w) => (
                        <div key={w.num} className="p-4 bg-slate-50/60 hover:bg-slate-50 border border-slate-100 rounded-2xl space-y-3 transition duration-150">
                          <div className="flex justify-between items-center">
                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-lg border border-emerald-100">
                              MỤC #{w.num}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Cụm từ then chốt</span>
                          </div>

                          <div className="space-y-1">
                            <h4 className="text-sm sm:text-base font-black text-indigo-950 select-all hover:text-emerald-700 transition">
                              {w.word}
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-500 font-bold">
                              Nghĩa: <span className="text-slate-800 font-black">{w.translation}</span>
                            </p>
                          </div>

                          <div className="p-3 bg-white rounded-xl border border-slate-150/65 space-y-1">
                            <p className="text-xs font-semibold text-slate-800 leading-relaxed italic">
                              "{w.exampleEn}"
                            </p>
                            <p className="text-[11px] font-bold text-slate-400">
                              ➔ {w.exampleVi}
                            </p>
                          </div>

                          {w.extraVocab && w.extraVocab.length > 0 && (
                            <div className="pt-2 border-t border-slate-100 space-y-1.5">
                              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wide">Từ vựng mở rộng / Cụm từ bổ sung:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {w.extraVocab.map((ev, evi) => (
                                  <div key={evi} className="bg-indigo-50/40 border border-indigo-100 text-slate-700 px-2 py-0.5 rounded-lg text-[10px] font-semibold">
                                    <span className="font-extrabold text-indigo-700">{ev.phrase}</span>: {ev.translation}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* PRACTICE PANEL */
                  <div className="space-y-8 text-left">
                    {/* Graded Overview Alert */}
                    {ebookGraded && (
                      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-150 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <Trophy className="w-6 h-6 text-amber-500 fill-amber-500" />
                            <p className="font-black text-slate-800 text-sm sm:text-base font-display">
                              Kết quả làm bài: {ebookScore} / 100 điểm!
                            </p>
                          </div>
                          <p className="text-xs text-slate-400 font-semibold mt-1">
                            {ebookScore === 100 
                              ? "Tuyệt vời! Bé đã nhớ và viết chính xác toàn bộ từ vựng rồi đấy." 
                              : "Bé làm rất tốt! Hãy xem lại các đáp án dịch mẫu màu xanh để rút kinh nghiệm nhé."}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleResetEbookAnswers}
                          className="px-4 py-2 bg-indigo-600 hover:bg-slate-900 text-white rounded-xl text-xs font-black transition flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Làm lại bài
                        </button>
                      </div>
                    )}

                    {/* Exercise 1 */}
                    {selectedTopic.questions.part1.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-extrabold text-indigo-950 text-sm sm:text-base flex items-center gap-1.5 border-b border-indigo-50 pb-2">
                          <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">I</span>
                          Bài 1: Dịch các cụm từ trong ngoặc sang tiếng Anh
                        </h4>
                        
                        <div className="space-y-4">
                          {selectedTopic.questions.part1.map((q, idx) => {
                            const isCorrect = ebookResults[q.id];
                            const wordsSug = getWordChipsForAnswer(q.correctAnswer);
                            return (
                              <div key={q.id} className="p-4 bg-slate-50/60 rounded-2xl border border-slate-100 space-y-3">
                                <div className="text-xs font-bold text-slate-500 leading-relaxed">
                                  Câu {idx + 1}: Viết cụm từ tiếng Anh nghĩa là: <strong className="text-indigo-600 font-black">"{q.vietnamese}"</strong>
                                </div>
                                
                                {q.context && (
                                  <div className="text-xs text-slate-600 font-bold bg-white p-3 rounded-xl border border-slate-150 leading-relaxed font-sans">
                                    {q.context.split('______')[0]}
                                    <span className="px-2 py-0.5 bg-indigo-50 border-b-2 border-indigo-400 text-indigo-700 font-black text-xs mx-1">
                                      {ebookAnswers[q.id] || "______"}
                                    </span>
                                    {q.context.split('______')[1]}
                                  </div>
                                )}

                                <div className="flex gap-2 items-center">
                                  <input
                                    type="text"
                                    disabled={ebookGraded}
                                    placeholder="Nhập cụm từ tiếng Anh..."
                                    value={ebookAnswers[q.id] || ''}
                                    onChange={(e) => setEbookAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                    className={`flex-1 px-3.5 py-2.5 bg-white border rounded-xl text-xs sm:text-sm font-black text-slate-800 focus:outline-none transition ${
                                      ebookGraded
                                        ? isCorrect
                                          ? 'border-emerald-500 bg-emerald-50/30'
                                          : 'border-rose-400 bg-rose-50/30'
                                        : 'border-slate-200 focus:border-indigo-500'
                                    }`}
                                  />
                                  {ebookGraded && (
                                    isCorrect ? (
                                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                    ) : (
                                      <X className="w-5 h-5 text-rose-500 shrink-0" />
                                    )
                                  )}
                                </div>

                                {/* Dynamic spelling help chips */}
                                {!ebookGraded && (
                                  <div className="flex flex-wrap gap-1 p-2 bg-white/70 border border-slate-100 rounded-xl">
                                    <span className="text-[9px] font-bold text-slate-400 w-full mb-0.5">Bé nhấp chọn các mảnh ghép sau để lắp từ:</span>
                                    {wordsSug.map((word, wi) => (
                                      <button
                                        key={wi}
                                        type="button"
                                        onClick={() => {
                                          const curAns = ebookAnswers[q.id] || '';
                                          const spacing = curAns && !curAns.endsWith(' ') ? ' ' : '';
                                          setEbookAnswers(prev => ({ ...prev, [q.id]: curAns + spacing + word }));
                                        }}
                                        className="px-2.5 py-1 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-500 text-[10px] font-bold rounded-lg transition cursor-pointer border border-slate-150/70"
                                      >
                                        +{word}
                                      </button>
                                    ))}
                                    <button 
                                      type="button"
                                      onClick={() => setEbookAnswers(prev => ({ ...prev, [q.id]: '' }))}
                                      className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 text-[9px] font-bold rounded-lg cursor-pointer ml-auto"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                )}

                                {ebookGraded && !isCorrect && (
                                  <div className="text-[11px] font-semibold text-emerald-700 mt-1 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100 leading-relaxed font-sans">
                                    👉 Đáp án chính xác: <strong className="font-mono text-emerald-800 text-xs select-all">{q.correctAnswer}</strong>
                                    {q.alternatives && q.alternatives.length > 0 && ` (Hoặc chấp nhận: ${q.alternatives.join(', ')})`}
                                  </div>
                                )}

                                {q.hint && !ebookGraded && (
                                  <p className="text-[10px] text-indigo-500 italic">💡 Gợi ý cho bé: {q.hint}</p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Exercise 2 */}
                    {selectedTopic.questions.part2.length > 0 && (
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <h4 className="font-extrabold text-indigo-950 text-sm sm:text-base flex items-center gap-1.5 border-b border-indigo-50 pb-2">
                          <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">II</span>
                          Bài 2: Thay thế cụm từ IN ĐẬM viết hoa bằng cụm từ tương đương từ bài học
                        </h4>
                        
                        <div className="space-y-4">
                          {selectedTopic.questions.part2.map((q, idx) => {
                            const isCorrect = ebookResults[q.id];
                            const wordsSug = getWordChipsForAnswer(q.correctAnswer);
                            return (
                              <div key={q.id} className="p-4 bg-slate-50/60 rounded-2xl border border-slate-100 space-y-3">
                                <div className="text-xs font-bold text-slate-500 leading-relaxed">
                                  Câu {idx + 1}: Tìm cụm từ thay thế đồng nghĩa cho: <strong className="text-rose-600 font-extrabold">"{q.vietnamese}"</strong>
                                </div>

                                {q.context && (
                                  <div className="text-xs text-slate-600 font-bold bg-white p-3 rounded-xl border border-slate-150 leading-relaxed font-sans">
                                    {q.context}
                                  </div>
                                )}

                                <div className="flex gap-2 items-center">
                                  <input
                                    type="text"
                                    disabled={ebookGraded}
                                    placeholder="Điền cụm từ thay thế..."
                                    value={ebookAnswers[q.id] || ''}
                                    onChange={(e) => setEbookAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                    className={`flex-1 px-3.5 py-2.5 bg-white border rounded-xl text-xs sm:text-sm font-black text-slate-800 focus:outline-none transition ${
                                      ebookGraded
                                        ? isCorrect
                                          ? 'border-emerald-500 bg-emerald-50/30'
                                          : 'border-rose-400 bg-rose-50/30'
                                        : 'border-slate-200 focus:border-indigo-500'
                                    }`}
                                  />
                                  {ebookGraded && (
                                    isCorrect ? (
                                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                    ) : (
                                      <X className="w-5 h-5 text-rose-500 shrink-0" />
                                    )
                                  )}
                                </div>

                                {/* spelling help chips */}
                                {!ebookGraded && (
                                  <div className="flex flex-wrap gap-1 p-2 bg-white/70 border border-slate-100 rounded-xl">
                                    <span className="text-[9px] font-bold text-slate-400 w-full mb-0.5">Bé nhấp chọn các mảnh ghép sau để lắp từ:</span>
                                    {wordsSug.map((word, wi) => (
                                      <button
                                        key={wi}
                                        type="button"
                                        onClick={() => {
                                          const curAns = ebookAnswers[q.id] || '';
                                          const spacing = curAns && !curAns.endsWith(' ') ? ' ' : '';
                                          setEbookAnswers(prev => ({ ...prev, [q.id]: curAns + spacing + word }));
                                        }}
                                        className="px-2.5 py-1 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-500 text-[10px] font-bold rounded-lg transition cursor-pointer border border-slate-150/70"
                                      >
                                        +{word}
                                      </button>
                                    ))}
                                    <button 
                                      type="button"
                                      onClick={() => setEbookAnswers(prev => ({ ...prev, [q.id]: '' }))}
                                      className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 text-[9px] font-bold rounded-lg cursor-pointer ml-auto"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                )}

                                {ebookGraded && !isCorrect && (
                                  <div className="text-[11px] font-semibold text-emerald-700 mt-1 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100 font-mono">
                                    👉 Đáp án chính xác: <strong className="text-emerald-800 select-all">{q.correctAnswer}</strong>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Exercise 3 */}
                    {selectedTopic.questions.part3.length > 0 && (
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <h4 className="font-extrabold text-indigo-950 text-sm sm:text-base flex items-center gap-1.5 border-b border-indigo-50 pb-2">
                          <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">III</span>
                          Bài 3: Dịch toàn bộ câu sau sang Tiếng Anh
                        </h4>
                        
                        <div className="space-y-4">
                          {selectedTopic.questions.part3.map((q, idx) => {
                            const isCorrect = ebookResults[q.id];
                            const wordsSug = getWordChipsForAnswer(q.correctAnswer);
                            return (
                              <div key={q.id} className="p-4 bg-slate-50/60 rounded-2xl border border-slate-100 space-y-3">
                                <div className="text-xs font-black text-indigo-950">
                                  Câu {idx + 1}: Hãy dịch chính xác câu này sang Tiếng Anh:
                                </div>
                                
                                <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm font-black text-slate-800 leading-relaxed font-sans shadow-sm">
                                  💬 "{q.vietnamese}"
                                </div>

                                <div className="space-y-2">
                                  <textarea
                                    rows={2}
                                    disabled={ebookGraded}
                                    placeholder="Điền câu dịch của bé hoàn chỉnh..."
                                    value={ebookAnswers[q.id] || ''}
                                    onChange={(e) => setEbookAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                    className={`w-full p-3 bg-white border rounded-xl text-xs sm:text-sm font-black text-slate-800 focus:outline-none transition ${
                                      ebookGraded
                                        ? isCorrect
                                          ? 'border-emerald-500 bg-emerald-50/30'
                                          : 'border-rose-400 bg-rose-50/30'
                                        : 'border-slate-200 focus:border-indigo-500'
                                    }`}
                                  />
                                  <div className="flex justify-between items-center flex-wrap gap-2 text-[10px]">
                                    {q.hint && <span className="text-indigo-500 font-extrabold italic">💡 {q.hint}</span>}
                                    {ebookGraded && (
                                      isCorrect ? (
                                        <span className="text-emerald-700 font-extrabold flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                                          ✓ Bé đã trả lời đúng!
                                        </span>
                                      ) : (
                                        <span className="text-rose-600 font-extrabold flex items-center gap-1 bg-rose-50 px-2 py-1 rounded-md border border-rose-100">
                                          ✗ Chưa trùng khớp
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>

                                {/* clickable assistance spelling chips */}
                                {!ebookGraded && (
                                  <div className="flex flex-wrap gap-1 p-2.5 bg-white/70 border border-slate-150/70 rounded-xl">
                                    <span className="text-[9px] font-bold text-slate-400 w-full mb-0.5">Nhấp chọn mảnh từ vựng để lắp ráp câu dịch:</span>
                                    {wordsSug.map((word, wi) => (
                                      <button
                                        key={wi}
                                        type="button"
                                        onClick={() => {
                                          const curAns = ebookAnswers[q.id] || '';
                                          const spacing = curAns && !curAns.endsWith(' ') ? ' ' : '';
                                          setEbookAnswers(prev => ({ ...prev, [q.id]: curAns + spacing + word }));
                                        }}
                                        className="px-2.5 py-1 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-500 text-[10px] font-bold rounded-lg transition cursor-pointer border border-slate-150/70"
                                      >
                                        +{word}
                                      </button>
                                    ))}
                                    <button 
                                      type="button"
                                      onClick={() => setEbookAnswers(prev => ({ ...prev, [q.id]: '' }))}
                                      className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 text-[9px] font-bold rounded-lg cursor-pointer ml-auto"
                                    >
                                      Làm sạch nháp
                                    </button>
                                  </div>
                                )}

                                {ebookGraded && !isCorrect && (
                                  <div className="text-[11px] font-semibold text-emerald-700 mt-1 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 leading-relaxed font-sans">
                                    <p className="font-extrabold mb-1">🌟 Gợi ý dịch mẫu của cô Nguyễn Huyền:</p>
                                    <p className="font-mono text-xs select-all text-emerald-900">{q.correctAnswer}</p>
                                    {q.alternatives && q.alternatives.length > 0 && (
                                      <div className="mt-2 pt-2 border-t border-emerald-100/50">
                                        <p className="font-black text-[9px] text-slate-400 uppercase">Cách viết tương đương khác:</p>
                                        <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                                          {q.alternatives.map((alt, alti) => (
                                            <li key={alti} className="font-mono text-xs">{alt}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Submit results button */}
                    {!ebookGraded ? (
                      <button
                        type="button"
                        onClick={handleCheckEbookAnswers}
                        className="w-full py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:scale-[1.015] active:scale-[0.98] text-white rounded-3xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 mt-4"
                      >
                        <CheckSquare className="w-5 h-5 text-white" />
                        KIỂM TRA ĐÁP ÁN (CHECK ANSWERS)
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResetEbookAnswers}
                        className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-3xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center justify-center gap-2 mt-4"
                      >
                        <RotateCcw className="w-5 h-5 text-slate-600" />
                        LÀM LẠI CHỦ ĐỀ NÀY (PRACTICE AGAIN)
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center text-slate-400 text-xs font-bold leading-relaxed font-sans shadow-md">
                💡 Bé hãy nhấp chọn một chủ đề vựng từ danh sách Ebook Vocabulary ở cột bên trái để học từ mới, sau đó làm các câu hỏi trắc nghiệm và dịch câu để ôn luyện nhé!
              </div>
            )}
          </div>

        </div>
      )}

      {hwMode === 'writing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="student-writing-grid-container">
          
          {/* Left Column: Topics scroll list */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/30 font-sans">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-indigo-50/60">
                <h4 className="font-extrabold text-indigo-900 font-display flex items-center gap-2 text-sm sm:text-base">
                  <PenTool className="w-5 h-5 text-indigo-600" /> Đề Bài IELTS Writing
                </h4>
                <span className="text-[10px] bg-indigo-50 text-indigo-750 border border-indigo-100 px-2.5 py-1 rounded-lg font-black uppercase">
                  ZIM Academic
                </span>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                {/* Group by Task 1 and Task 2 */}
                {['task1', 'task2'].map((taskType) => {
                  const taskTopics = ieltsWritingTopics.filter(t => t.task === taskType);
                  return (
                    <div key={taskType} className="space-y-2">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 text-left">
                        {taskType === 'task1' ? '✍️ Writing Task 1 (Report)' : '✍️ Writing Task 2 (Essay)'}
                      </div>
                      {taskTopics.map((topic) => {
                        const score = writingScores[topic.id];
                        const isSelected = selectedWritingTopic?.id === topic.id;
                        return (
                          <div
                            key={topic.id}
                            onClick={() => handleSelectWritingTopic(topic)}
                            className={`p-4 rounded-2xl border transition duration-150 cursor-pointer text-left ${
                              isSelected
                                ? 'bg-indigo-50/50 border-indigo-300 shadow-md shadow-indigo-150/30'
                                : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50/80'
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1 flex-wrap gap-1">
                              <span className="px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-black rounded-md uppercase tracking-wider font-mono">
                                {topic.type}
                              </span>
                              {score !== undefined ? (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-200 text-[9px] font-black rounded-md flex items-center gap-0.5">
                                  <Trophy className="w-2.5 h-2.5 text-amber-500 fill-amber-500" /> Band {score}
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 border border-slate-200 text-[9px] font-black rounded-md flex items-center gap-0.5">
                                  Chưa viết
                                </span>
                              )}
                            </div>

                            <h5 className="font-extrabold text-indigo-950 font-display text-xs sm:text-sm my-1 leading-snug">
                              {topic.title}
                            </h5>
                            <p className="text-[11px] text-slate-500 font-bold mb-1 leading-normal">
                              Chủ đề: <span className="text-indigo-850 font-black">{topic.vietnameseTitle}</span>
                            </p>
                            <p className="text-[10px] text-slate-400 font-medium leading-relaxed line-clamp-2">
                              {topic.prompt}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Writing workspace & results panel */}
          <div className="lg:col-span-8 space-y-4">
            {selectedWritingTopic ? (
              <div className="bg-white p-6 rounded-3xl border border-sky-150 shadow-2xl shadow-indigo-100/30 font-sans">
                {/* Header details */}
                <div className="flex justify-between items-start gap-4 mb-4 pb-4 border-b border-indigo-50/60 flex-wrap sm:flex-nowrap text-left">
                  <div>
                    <span className="text-[9px] font-black bg-indigo-50 text-indigo-750 px-2.5 py-1 rounded-md border border-indigo-100 uppercase tracking-widest inline-block mb-1">
                      LUYỆN VIẾT IELTS TỰ ĐỘNG – PHÂN TÍCH THEO TIÊU CHÍ CHUẨN CAMBRIDGE
                    </span>
                    <h3 className="font-extrabold text-indigo-950 font-display text-base sm:text-lg leading-snug">
                      {selectedWritingTopic.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">
                      Dạng bài: <span className="text-indigo-600 font-black">{selectedWritingTopic.type}</span>
                    </p>
                  </div>
                </div>

                {/* Question Prompt Callout */}
                <div className="p-4 bg-indigo-50/30 rounded-2xl border border-indigo-100/60 text-left mb-6">
                  <p className="text-[10px] text-indigo-600 font-black uppercase tracking-wider mb-1">📋 IELTS WRITING PROMPT (ĐỀ BÀI CHÍNH THỨC):</p>
                  <p className="text-xs sm:text-sm font-extrabold text-slate-800 leading-relaxed font-sans select-all">
                    {selectedWritingTopic.prompt}
                  </p>
                </div>

                {/* Sub Tab Switcher */}
                <div className="flex border-b border-slate-100 mb-6 bg-slate-50 p-1 rounded-xl w-fit">
                  <button
                    type="button"
                    onClick={() => setWritingSubTab('practice')}
                    className={`px-4 py-2 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition ${
                      writingSubTab === 'practice'
                        ? 'bg-white text-indigo-900 shadow-sm border border-slate-200/40'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <PenTool className="w-3.5 h-3.5 text-indigo-600" />
                    Không Gian Luyện Viết
                  </button>
                  <button
                    type="button"
                    onClick={() => setWritingSubTab('resources')}
                    className={`px-4 py-2 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition ${
                      writingSubTab === 'resources'
                        ? 'bg-white text-indigo-900 shadow-sm border border-slate-200/40'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    Từ Vựng & Cấu Trúc Gợi Ý
                  </button>
                  <button
                    type="button"
                    onClick={() => setWritingSubTab('sample')}
                    className={`px-4 py-2 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition ${
                      writingSubTab === 'sample'
                        ? 'bg-white text-indigo-900 shadow-sm border border-slate-200/40'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    Bài Mẫu Band 8.0+
                  </button>
                </div>

                {/* Practice Workspace */}
                {writingSubTab === 'practice' && (
                  <div className="space-y-6 text-left">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs flex-wrap gap-2">
                        <span className="font-extrabold text-slate-700">✍️ Nhập bài viết Tiếng Anh của bé ở đây:</span>
                        {(() => {
                          const words = writingEssay.trim().split(/\s+/).filter(Boolean).length;
                          const minReq = selectedWritingTopic.task === 'task1' ? 150 : 250;
                          const hasEnough = words >= minReq;
                          return (
                            <span className={`px-2.5 py-1 rounded-full font-black text-[10px] ${
                              hasEnough 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              📝 Số từ: {words} từ (Khuyên dùng: &ge; {minReq} từ)
                            </span>
                          );
                        })()}
                      </div>

                      <textarea
                        rows={12}
                        value={writingEssay}
                        disabled={isGradingWriting}
                        onChange={(e) => setWritingEssay(e.target.value)}
                        placeholder="Type or paste your IELTS essay here... Once you click grade, Co-Teacher AI will review your essay line-by-line and give you a detailed evaluation against IELTS public descriptors."
                        className="w-full p-4 text-xs sm:text-sm font-medium border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans leading-relaxed text-slate-800 bg-slate-50/30 placeholder-slate-400"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 flex-wrap">
                      <button
                        type="button"
                        onClick={handleEvaluateEssay}
                        disabled={isGradingWriting}
                        className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-2xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-indigo-150 disabled:opacity-50"
                      >
                        {isGradingWriting ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            Co-Teacher AI đang kiểm tra ngữ pháp & đánh giá Band Score...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4.5 h-4.5" />
                            GỬI BÀI VIẾT CHO CO-TEACHER AI CHẤM ĐIỂM
                          </>
                        )}
                      </button>

                      {writingEssay && (
                        <button
                          type="button"
                          onClick={handleResetWritingEssay}
                          disabled={isGradingWriting}
                          className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-2xl text-xs font-black transition cursor-pointer"
                        >
                          Làm lại từ đầu
                        </button>
                      )}
                    </div>

                    {/* Grading Report */}
                    {writingEvaluation && (
                      <div className="mt-8 space-y-6 border-t border-slate-150 pt-6">
                        <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl border border-indigo-800 shadow-xl shadow-indigo-200/40 text-left">
                          <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> BÁO CÁO KẾT QUẢ TỪ CO-TEACHER AI
                          </p>
                          <h4 className="font-extrabold text-lg sm:text-xl font-display mb-4">IELTS Assessment Feedback</h4>
                          
                          {/* Beautiful Score Cards */}
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                            <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-center flex flex-col justify-center">
                              <p className="text-[9px] font-black text-indigo-200 uppercase tracking-wider">OVERALL BAND</p>
                              <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">{writingEvaluation.overallScore}</p>
                            </div>
                            <div className="bg-white/5 p-2 rounded-2xl border border-white/5 text-center flex flex-col justify-center">
                              <p className="text-[8px] font-extrabold text-slate-300 uppercase tracking-wider">Task Achievement</p>
                              <p className="text-lg sm:text-xl font-black text-indigo-200 mt-0.5">{writingEvaluation.taScore}</p>
                            </div>
                            <div className="bg-white/5 p-2 rounded-2xl border border-white/5 text-center flex flex-col justify-center">
                              <p className="text-[8px] font-extrabold text-slate-300 uppercase tracking-wider">Coherence & Cohesion</p>
                              <p className="text-lg sm:text-xl font-black text-indigo-200 mt-0.5">{writingEvaluation.ccScore}</p>
                            </div>
                            <div className="bg-white/5 p-2 rounded-2xl border border-white/5 text-center flex flex-col justify-center">
                              <p className="text-[8px] font-extrabold text-slate-300 uppercase tracking-wider">Lexical Resource</p>
                              <p className="text-lg sm:text-xl font-black text-indigo-200 mt-0.5">{writingEvaluation.lrScore}</p>
                            </div>
                            <div className="bg-white/5 p-2 rounded-2xl border border-white/5 text-center flex flex-col justify-center col-span-2 sm:col-span-1">
                              <p className="text-[8px] font-extrabold text-slate-300 uppercase tracking-wider">Grammar Range</p>
                              <p className="text-lg sm:text-xl font-black text-indigo-200 mt-0.5">{writingEvaluation.graScore}</p>
                            </div>
                          </div>
                        </div>

                        {/* Detailed evaluation against each of the 4 criteria */}
                        <div className="space-y-4">
                          <h4 className="font-extrabold text-indigo-950 text-sm sm:text-base border-b border-indigo-50 pb-2">🎯 Đánh giá chi tiết theo tiêu chí Cambridge:</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-left">
                              <p className="font-black text-indigo-950 text-xs flex items-center gap-1.5 mb-1.5">
                                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                                Task Achievement / Response (Điểm đáp ứng yêu cầu):
                              </p>
                              <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">{writingEvaluation.taFeedback}</p>
                            </div>

                            <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-left">
                              <p className="font-black text-indigo-950 text-xs flex items-center gap-1.5 mb-1.5">
                                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                                Coherence and Cohesion (Tính mạch lạc & Liên kết):
                              </p>
                              <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">{writingEvaluation.ccFeedback}</p>
                            </div>

                            <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-left">
                              <p className="font-black text-indigo-950 text-xs flex items-center gap-1.5 mb-1.5">
                                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                                Lexical Resource (Vốn từ vựng):
                              </p>
                              <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">{writingEvaluation.lrFeedback}</p>
                            </div>

                            <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-left">
                              <p className="font-black text-indigo-950 text-xs flex items-center gap-1.5 mb-1.5">
                                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                                Grammatical Range and Accuracy (Sử dụng ngữ pháp):
                              </p>
                              <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">{writingEvaluation.graFeedback}</p>
                            </div>
                          </div>
                        </div>

                        {/* Strengths & Weaknesses */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100 text-left">
                            <p className="font-black text-emerald-900 text-xs mb-2 flex items-center gap-1.5">🌟 Điểm mạnh nổi bật:</p>
                            <ul className="space-y-1">
                              {writingEvaluation.strengths?.map((str: string, index: number) => (
                                <li key={index} className="text-[11px] text-emerald-850 font-bold flex items-start gap-1">
                                  <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                                  <span>{str}</span>
                                </li>
                              )) || <li className="text-[11px] text-slate-400">Không có thông tin</li>}
                            </ul>
                          </div>

                          <div className="p-4 bg-amber-50/45 rounded-2xl border border-amber-100/80 text-left">
                            <p className="font-black text-amber-900 text-xs mb-2 flex items-center gap-1.5">⚠️ Điểm cần khắc phục:</p>
                            <ul className="space-y-1">
                              {writingEvaluation.weaknesses?.map((weak: string, index: number) => (
                                <li key={index} className="text-[11px] text-amber-850 font-bold flex items-start gap-1">
                                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                                  <span>{weak}</span>
                                </li>
                              )) || <li className="text-[11px] text-slate-400">Không có thông tin</li>}
                            </ul>
                          </div>
                        </div>

                        {/* Corrections */}
                        {writingEvaluation.corrections && writingEvaluation.corrections.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="font-extrabold text-indigo-950 text-sm sm:text-base border-b border-indigo-50 pb-2">✏️ Phân tích lỗi từ vựng & ngữ pháp chi tiết:</h4>
                            <div className="space-y-3">
                              {writingEvaluation.corrections.map((corr: any, index: number) => (
                                <div key={index} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row gap-3 text-left">
                                  <div className="flex-1">
                                    <p className="text-[10px] text-rose-500 font-extrabold uppercase">Cụm từ gốc của bé:</p>
                                    <p className="text-xs sm:text-sm font-black text-slate-850 line-through select-all bg-rose-50/40 p-1.5 rounded-lg mt-0.5 inline-block">
                                      {corr.original}
                                    </p>
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-[10px] text-emerald-700 font-extrabold uppercase">Đề nghị sửa chuẩn hóa:</p>
                                    <p className="text-xs sm:text-sm font-black text-emerald-900 bg-emerald-50/50 p-1.5 rounded-lg mt-0.5 inline-block select-all font-sans">
                                      {corr.corrected}
                                    </p>
                                  </div>
                                  <div className="flex-[2] flex items-center bg-white p-2.5 rounded-xl border border-slate-200">
                                    <p className="text-xs text-indigo-950 font-semibold leading-relaxed">
                                      💡 <strong className="text-indigo-900">Giải thích:</strong> {corr.explanation}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Sentence Upgrades */}
                        {writingEvaluation.upgradedSentences && writingEvaluation.upgradedSentences.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="font-extrabold text-indigo-950 text-sm sm:text-base border-b border-indigo-50 pb-2">🚀 Nâng cấp diễn đạt đạt điểm tuyệt đối (Sentences Upgrade):</h4>
                            <div className="space-y-3">
                              {writingEvaluation.upgradedSentences.map((upg: any, index: number) => (
                                <div key={index} className="p-4 bg-indigo-50/20 rounded-2xl border border-indigo-100/60 text-left space-y-2">
                                  <div>
                                    <p className="text-[10px] text-slate-400 font-extrabold uppercase">Câu ban đầu của bé:</p>
                                    <p className="text-xs sm:text-sm font-extrabold text-slate-600 italic">"{upg.original}"</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-indigo-600 font-black uppercase flex items-center gap-1 mt-1">
                                      <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" /> Phiên bản nâng cấp Band 8.5/9.0:
                                    </p>
                                    <p className="text-xs sm:text-sm font-black text-indigo-900 bg-white p-2.5 rounded-xl border border-indigo-100 mt-1 select-all">
                                      "{upg.upgraded}"
                                    </p>
                                  </div>
                                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed pt-1.5 border-t border-indigo-100/30">
                                    💡 <strong>Nguyên lý nâng cấp:</strong> {upg.rationale}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Polished Complete Essay */}
                        {writingEvaluation.refinedEssay && (
                          <div className="space-y-3 pt-4 border-t border-slate-150">
                            <h4 className="font-extrabold text-indigo-950 text-sm sm:text-base flex items-center gap-1.5 border-b border-indigo-50 pb-2">
                              ✨ Bài luận hoàn thiện sau sửa đổi bởi Co-Teacher AI:
                            </h4>
                            <div className="p-4.5 bg-gradient-to-br from-emerald-50/10 to-teal-50/10 rounded-3xl border border-emerald-100/80 shadow-inner text-left">
                              <p className="text-xs sm:text-sm text-slate-850 font-semibold leading-relaxed whitespace-pre-line select-all">
                                {writingEvaluation.refinedEssay}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Vocabulary & Structure suggestions */}
                {writingSubTab === 'resources' && (
                  <div className="space-y-6 text-left">
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-indigo-950 text-sm sm:text-base flex items-center gap-1.5 border-b border-indigo-50 pb-2">
                        🌟 Từ vựng cốt lõi khuyên dùng:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedWritingTopic.vocabulary.map((vocab, index) => (
                          <div key={index} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center gap-3">
                            <div className="text-left">
                              <p className="text-xs sm:text-sm font-black text-indigo-900 select-all font-mono">+{vocab.phrase}</p>
                              <p className="text-[11px] text-slate-500 font-bold">Nghĩa: {vocab.meaning}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const curAns = writingEssay;
                                const spacing = curAns && !curAns.endsWith(' ') ? ' ' : '';
                                setWritingEssay(curAns + spacing + vocab.phrase);
                                setWritingSubTab('practice');
                              }}
                              className="px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-400 hover:border-indigo-200 text-[10px] font-black rounded-lg transition border border-slate-200 cursor-pointer shrink-0"
                            >
                              + Chèn
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <h4 className="font-extrabold text-indigo-950 text-sm sm:text-base flex items-center gap-1.5 border-b border-indigo-50 pb-2">
                        📐 Dàn ý cấu trúc bài viết mẫu (Suggested Outline):
                      </h4>
                      <div className="space-y-2.5">
                        {selectedWritingTopic.suggestedStructure.map((step, sIdx) => (
                          <div key={sIdx} className="p-3 bg-indigo-50/30 rounded-xl border border-indigo-100/50 flex gap-3 text-left">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <p className="text-xs text-indigo-950 font-semibold leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedWritingTopic.analysisHtml && (
                      <div 
                        className="pt-4 border-t border-slate-100 font-sans text-left"
                        dangerouslySetInnerHTML={{ __html: selectedWritingTopic.analysisHtml }} 
                      />
                    )}
                  </div>
                )}

                {/* Sample Essay */}
                {writingSubTab === 'sample' && (
                  <div className="space-y-4 text-left font-sans">
                    <p className="text-xs text-emerald-950 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100/80 font-bold leading-relaxed">
                      💡 <strong>Bài viết mẫu đạt chuẩn IELTS Band 8.0+:</strong> Đây là học liệu chuẩn từ ZIM để bé tự tin đối chiếu phong cách lập luận và từ vựng chuyên sâu.
                    </p>
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-3xl shadow-inner leading-relaxed text-left">
                      <p className="text-xs sm:text-sm text-slate-800 font-extrabold whitespace-pre-line font-sans select-all">
                        {selectedWritingTopic.sampleEssay}
                      </p>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center text-slate-400 text-xs font-bold leading-relaxed font-sans shadow-md">
                💡 Bé hãy nhấp chọn một chủ đề IELTS Writing từ danh sách bên trái để luyện viết bài luận nhé!
              </div>
            )}
          </div>
        </div>
      )}

      {hwMode === 'game' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300" id="hack-game-container">
          {/* LEFT SIDEBAR: SELECT THEME & TOPIC */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-150/10 font-sans">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide border-b border-indigo-50 pb-3 mb-3 flex items-center gap-1.5">
                <Brain className="w-5 h-5 text-violet-600 animate-bounce" />
                14 Themes Hack 3.000 từ
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Hãy lựa chọn 1 trong 14 Themes học phần chuẩn của Sách Hack 3.000 từ dưới đây để bắt đầu thử thách giải đố AI kịch tính!
              </p>

              {/* Theme Dropdown */}
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1 block">Chọn Theme Học:</label>
                  <select
                    value={gameChapterId}
                    onChange={(e) => {
                      const chapId = parseInt(e.target.value, 10);
                      setGameChapterId(chapId);
                      const chap = hack3000Data.find(c => c.id === chapId);
                      const firstSec = chap?.sections?.[0];
                      if (firstSec) {
                        setGameSectionId(firstSec.id);
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500 transition"
                  >
                    {hack3000Data.map((chap) => (
                      <option key={`game-tab-chap-${chap.id}`} value={chap.id}>
                        Theme {getThemeNumberFromTitle(chap.title) < 10 ? `0${getThemeNumberFromTitle(chap.title)}` : getThemeNumberFromTitle(chap.title)}: {chap.title.includes(': ') ? chap.title.split(': ')[1] : chap.title} ({chap.vietnameseTitle})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Topic selector (buttons list) */}
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5 block">Chọn Chủ Đề Chi Tiết (Topic):</label>
                  <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
                    {(hack3000Data.find(c => c.id === gameChapterId) || hack3000Data[0])?.sections?.map((sec: any) => {
                      const isSecActive = gameSectionId === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => {
                            setGameSectionId(sec.id);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs font-bold flex items-center justify-between cursor-pointer ${
                            isSecActive
                              ? 'bg-indigo-650 border-indigo-700 text-white shadow-sm'
                              : 'bg-slate-50 hover:bg-slate-150/70 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="truncate pr-2">📁 {sec.name}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            isSecActive ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-200 text-slate-500'
                          }`}>
                            {sec.nodes?.length || 0} từ
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PLAYGROUND: THE ACTIVE GAME PANEL */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-150/10 space-y-6">
              {/* Game type selector */}
              <div className="flex flex-wrap bg-slate-100 p-1 rounded-2xl gap-1">
                <button
                  onClick={() => setActivePracticeGame('matching')}
                  className={`flex-1 px-4 py-3 rounded-xl text-xs sm:text-sm font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activePracticeGame === 'matching'
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-white/40'
                  }`}
                >
                  🧩 Trò chơi Nối Từ
                </button>
                <button
                  onClick={() => setActivePracticeGame('puzzle')}
                  className={`flex-1 px-4 py-3 rounded-xl text-xs sm:text-sm font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activePracticeGame === 'puzzle'
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-white/40'
                  }`}
                >
                  🔍 Mê cung tìm chữ
                </button>
                <button
                  onClick={() => setActivePracticeGame('arranger')}
                  className={`flex-1 px-4 py-3 rounded-xl text-xs sm:text-sm font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activePracticeGame === 'arranger'
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-white/40'
                  }`}
                >
                  📁 Phân Loại Từ
                </button>
              </div>

              {/* GAME 1: MATCHING GAME */}
              {activePracticeGame === 'matching' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h4 className="text-base sm:text-lg font-black text-slate-900">
                      Ghép Đôi Từ Vựng Tiếng Anh - Tiếng Việt
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Hãy bấm chọn một từ Tiếng Anh ở cột trái, rồi bấm chọn phần Dịch Nghĩa Tiếng Việt tương ứng ở cột phải để hoàn thành cặp ghép đúng!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                    {/* EN LIST */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Tiếng Anh:</span>
                      <div className="grid grid-cols-1 gap-2">
                        {matchingEnItems.map((item) => {
                          const isMatched = matchPairsCompleted.includes(item.id);
                          const isSelected = matchSelectedId?.id === item.id && matchSelectedId?.type === 'en';
                          return (
                            <button
                              key={`game-match-en-${item.id}`}
                              disabled={isMatched}
                              onClick={() => {
                                if (matchSelectedId?.type === 'vi') {
                                  const viId = matchSelectedId.id;
                                  if (matchingCorrectMap[item.id] === viId) {
                                    setMatchPairsCompleted(prev => [...prev, item.id]);
                                    setMatchFeedback({ text: `Xuất sắc! Nối đúng: ${item.word} ⇆ ${viId}`, success: true });
                                    setMatchSelectedId(null);
                                    playTTS(item.word);
                                  } else {
                                    setMatchFeedback({ text: `Sai rồi! "${item.word}" không đi với "${viId}". Thử lại nhé!`, success: false });
                                    setMatchSelectedId(null);
                                    setMatchTries(t => t + 1);
                                  }
                                } else {
                                  setMatchSelectedId({ id: item.id, type: 'en' });
                                }
                              }}
                              className={`p-3.5 rounded-xl border text-sm font-bold text-left transition select-none flex justify-between items-center cursor-pointer ${
                                isMatched
                                  ? 'bg-emerald-50 border-emerald-100 text-emerald-600 opacity-60'
                                  : isSelected
                                  ? 'bg-indigo-600 border-indigo-700 text-white shadow-md'
                                  : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200 text-slate-800'
                              }`}
                            >
                              <span>{item.word}</span>
                              {isMatched ? (
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <Volume2
                                  className={`w-4 h-4 cursor-pointer inline ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playTTS(item.word);
                                  }}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* VI LIST */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Ý nghĩa Việt ngữ:</span>
                      <div className="grid grid-cols-1 gap-2">
                        {matchingViItems.map((item) => {
                          const correspondingEn = Object.keys(matchingCorrectMap).find(k => matchingCorrectMap[k] === item.id) || '';
                          const isMatched = matchPairsCompleted.includes(correspondingEn);
                          const isSelected = matchSelectedId?.id === item.id && matchSelectedId?.type === 'vi';
                          return (
                            <button
                              key={`game-match-vi-${item.id}`}
                              disabled={isMatched}
                              onClick={() => {
                                if (matchSelectedId?.type === 'en') {
                                  const enId = matchSelectedId.id;
                                  if (matchingCorrectMap[enId] === item.id) {
                                    setMatchPairsCompleted(prev => [...prev, enId]);
                                    setMatchFeedback({ text: `Xuất sắc! Nối đúng: ${enId} ⇆ ${item.word}`, success: true });
                                    setMatchSelectedId(null);
                                    playTTS(enId);
                                  } else {
                                    setMatchFeedback({ text: `Sai rồi! "${enId}" không đi với "${item.word}". Thử lại nhé!`, success: false });
                                    setMatchSelectedId(null);
                                    setMatchTries(t => t + 1);
                                  }
                                } else {
                                  setMatchSelectedId({ id: item.id, type: 'vi' });
                                }
                              }}
                              className={`p-3.5 rounded-xl border text-sm font-bold text-left transition select-none flex justify-between items-center cursor-pointer ${
                                isMatched
                                  ? 'bg-emerald-50 border-emerald-100 text-emerald-600 opacity-60'
                                  : isSelected
                                  ? 'bg-indigo-600 border-indigo-700 text-white shadow-md'
                                  : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200 text-slate-800'
                              }`}
                            >
                              <span className="truncate pr-1">{item.word}</span>
                              {isMatched && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* FEEDBACK & ACTIONS */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
                    <div>
                      {matchFeedback && (
                        <p className={`text-xs sm:text-sm font-black flex items-center gap-1.5 ${matchFeedback.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {matchFeedback.success ? '✓' : '✗'} {matchFeedback.text}
                        </p>
                      )}
                      {matchPairsCompleted.length === matchingEnItems.length && matchingEnItems.length > 0 && (
                        <div className="bg-emerald-100 border border-emerald-200 p-3 rounded-2xl flex items-center gap-2 mt-2 font-sans">
                          <Award className="w-5 h-5 text-emerald-700 animate-bounce" />
                          <span className="text-xs font-black text-emerald-950">
                            HOÀN THÀNH LEVEL! Chúc mừng bé đạt điểm tuyệt đối. Số lượt ghép sai: {matchTries}.
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => initGamesForCurrentTopic(gameChapterId, gameSectionId)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase rounded-lg transition cursor-pointer"
                    >
                      Tráo bài & chơi lại
                    </button>
                  </div>
                </div>
              )}

              {/* GAME 2: WORD SEARCH PUZZLE */}
              {activePracticeGame === 'puzzle' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h4 className="text-base sm:text-lg font-black text-slate-900">
                      Mê Cung Ô Chữ Bí Mật (Word Search)
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Các từ vựng tiếng Anh được giấu kín theo hàng ngang hoặc cột dọc. Bấm chọn liên tiếp các chữ cái tương ứng để ghép thành từ rồi nhấn "Kiểm Tra" nhé!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* MATRIX GRID BOARD */}
                    <div className="lg:col-span-7 flex flex-col items-center p-4 bg-slate-950 rounded-3xl shadow-xl overflow-x-auto">
                      <div className="flex justify-between w-full max-w-[340px] text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-wider">
                        <span>Chữ ghép hiện tại:</span>
                        <span className="text-violet-400 font-extrabold font-mono text-xs">
                          {puzzleSelectedCells.map(cell => {
                            return puzzleGrid[cell.r]?.[cell.c] || '';
                          }).join('') || '(Bấm các ô chữ bên dưới)'}
                        </span>
                      </div>

                      <div className="grid grid-cols-10 gap-1.5 p-3.5 bg-slate-900 rounded-2xl w-full max-w-[340px]">
                        {puzzleGrid.map((row, rIdx) => 
                          row.map((char, cIdx) => {
                            const isSelected = puzzleSelectedCells.some(cell => cell.r === rIdx && cell.c === cIdx);
                            const isFound = puzzleFoundCells.some(cell => cell.r === rIdx && cell.c === cIdx);

                            return (
                              <button
                                key={`game-cell-${rIdx}-${cIdx}`}
                                onClick={() => {
                                  const existsIdx = puzzleSelectedCells.findIndex(cell => cell.r === rIdx && cell.c === cIdx);
                                  if (existsIdx >= 0) {
                                    setPuzzleSelectedCells(prev => prev.filter((_, idx) => idx !== existsIdx));
                                  } else {
                                    setPuzzleSelectedCells(prev => [...prev, { r: rIdx, c: cIdx }]);
                                  }
                                }}
                                className={`w-7 h-7 rounded text-[11px] font-black transition cursor-pointer select-none flex items-center justify-center font-mono ${
                                  isFound
                                    ? 'bg-emerald-600 border border-emerald-500 text-white'
                                    : isSelected
                                    ? 'bg-indigo-600 border border-indigo-500 text-white'
                                    : 'bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white'
                                }`}
                              >
                                {char}
                              </button>
                            );
                          })
                        )}
                      </div>

                      <div className="flex gap-2.5 mt-4 w-full max-w-[340px]">
                        <button
                          onClick={() => setPuzzleSelectedCells([])}
                          className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 font-black rounded-lg text-xs uppercase cursor-pointer"
                        >
                          Xóa Chọn
                        </button>
                        <button
                          onClick={() => {
                            const currentSpell = puzzleSelectedCells.map(cell => puzzleGrid[cell.r]?.[cell.c] || '').join('');
                            const targets = puzzleTargetWords.map(t => t.word);
                            
                            if (targets.includes(currentSpell)) {
                              if (puzzleFoundWords.includes(currentSpell)) {
                                setPuzzleFeedback(`Từ "${currentSpell}" đã được bôi xanh rồi!`);
                              } else {
                                setPuzzleFoundWords(prev => [...prev, currentSpell]);
                                setPuzzleFoundCells(prev => [...prev, ...puzzleSelectedCells]);
                                setPuzzleFeedback(`Rất xuất sắc! Đã khám phá thành công: ${currentSpell} ✨`);
                                playTTS(currentSpell);
                              }
                              setPuzzleSelectedCells([]);
                            } else {
                              const sortedSpell = currentSpell.split('').reverse().join('');
                              if (targets.includes(sortedSpell)) {
                                if (puzzleFoundWords.includes(sortedSpell)) {
                                  setPuzzleFeedback(`Từ "${sortedSpell}" đã được tìm thấy trước đó rồi!`);
                                } else {
                                  setPuzzleFoundWords(prev => [...prev, sortedSpell]);
                                  setPuzzleFoundCells(prev => [...prev, ...puzzleSelectedCells]);
                                  setPuzzleFeedback(`Đã khám phá thành công (theo hướng ngược): ${sortedSpell} ✨`);
                                  playTTS(sortedSpell);
                                }
                                setPuzzleSelectedCells([]);
                              } else {
                                setPuzzleFeedback(`Cụm ô chữ ghép "${currentSpell}" chưa đúng. Từ giấu kín có thể chạy Xuôi hoặc Ngược!`);
                              }
                            }
                          }}
                          className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-lg text-xs uppercase cursor-pointer"
                        >
                          Kiểm Tra
                        </button>
                      </div>
                    </div>

                    {/* TARGETS LIST */}
                    <div className="lg:col-span-5 space-y-4 font-sans text-left">
                      <span className="text-xs font-black tracking-wider text-slate-400 uppercase block">
                        Danh sách từ cần tìm ({puzzleTargetWords.length} từ):
                      </span>

                      <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 space-y-2.5 max-h-[300px] overflow-y-auto">
                        {puzzleTargetWords.map((target) => {
                          const isFound = puzzleFoundWords.includes(target.word);
                          return (
                            <div
                              key={target.word}
                              className={`p-3 rounded-xl border flex items-center justify-between transition-all select-none ${
                                isFound
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                  : 'bg-white border-slate-100 text-slate-700'
                              }`}
                            >
                              <div>
                                <h5 className="text-xs sm:text-sm font-black font-mono tracking-wide">
                                  {target.word}
                                </h5>
                                <p className="text-[10px] text-slate-500 font-bold m-0 mt-0.5 leading-tight">
                                  {target.mean} ({target.tip})
                                </p>
                              </div>

                              <span className="text-[9.5px] font-black uppercase shrink-0">
                                {isFound ? (
                                  <span className="text-emerald-600 bg-emerald-100 p-1 px-2 rounded-md">
                                    ✓ Đã Tìm!
                                  </span>
                                ) : (
                                  <span className="text-slate-400 bg-slate-100 p-1 px-2 rounded-md">
                                    Ẩn dấu 🔍
                                  </span>
                                )}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {puzzleFeedback && (
                        <div className="p-3 bg-indigo-50 border border-indigo-100 text-indigo-950 rounded-2xl text-xs font-bold leading-normal">
                          💡 Giáo viên: {puzzleFeedback}
                        </div>
                      )}

                      {puzzleFoundWords.length === puzzleTargetWords.length && puzzleTargetWords.length > 0 && (
                        <div className="bg-emerald-100 border border-emerald-250 p-4 rounded-2xl text-center space-y-1 animate-bounce">
                          <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
                          <h5 className="text-xs sm:text-sm font-black text-emerald-900 uppercase">Trò Chơi Hoàn Tất!</h5>
                          <p className="text-xs text-emerald-800">
                            Thật xuất sắc! Bé đã tinh mắt tìm kiếm trọn vẹn toàn bộ ô chữ vựng!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* GAME 3: BUCKET SORT ARRANGER */}
              {activePracticeGame === 'arranger' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h4 className="text-base sm:text-lg font-black text-slate-900">
                      Phân Nhóm & Phân Loại Từ Vựng
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Hãy chọn đúng phân loại nhóm (nhóm danh từ, động từ, tính từ hoặc chủ đề ngữ nghĩa) tương ứng với mỗi từ vựng bên dưới.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans text-left">
                    {arrangerItems.map((item) => {
                      const userChoice = arrangerUserAnswers[item.word] || '';
                      const isOptionCorrect = userChoice === item.correctCategory;
                      const correctCatObj = arrangerCategories.find(c => c.id === item.correctCategory);

                      return (
                        <div
                          key={`game-arranger-${item.word}`}
                          className={`p-4 bg-slate-50 border rounded-2xl flex flex-col justify-between space-y-3 transition duration-150 ${
                            arrangerChecked
                              ? isOptionCorrect
                                ? 'bg-emerald-50/60 border-emerald-300'
                                : 'bg-rose-50/60 border-rose-300'
                              : 'border-slate-100 hover:shadow-sm'
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-center">
                              <h5 className="text-xs sm:text-sm font-black text-slate-900">
                                {item.word}
                              </h5>
                              <Volume2 className="w-3.5 h-3.5 text-slate-400 cursor-pointer" onClick={() => playTTS(item.word)} />
                            </div>
                            <p className="text-[10px] text-slate-500 font-semibold italic">{item.translation}</p>
                          </div>

                          <div className="space-y-1 pt-2 border-t border-slate-200">
                            <span className="text-[9px] text-slate-400 font-bold uppercase block">Chọn Phân Nhóm:</span>
                            <div className="flex flex-col gap-1">
                              {arrangerCategories.map((cat) => {
                                const isSelected = userChoice === cat.id;
                                return (
                                  <button
                                    key={`arranger-cat-${item.word}-${cat.id}`}
                                    disabled={arrangerChecked}
                                    onClick={() => {
                                      setArrangerUserAnswers(prev => ({
                                        ...prev,
                                        [item.word]: cat.id
                                      }));
                                    }}
                                    className={`py-1 px-2.5 rounded text-[10px] text-left font-black transition cursor-pointer select-none border ${
                                      isSelected
                                        ? 'bg-slate-900 border-slate-900 text-white'
                                        : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
                                    }`}
                                  >
                                    📁 {cat.name}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {arrangerChecked && (
                            <div className="text-[9.5px] font-black mt-1">
                              {isOptionCorrect ? (
                                <span className="text-emerald-600 block">✓ Chính xác!</span>
                              ) : (
                                <span className="text-rose-600 block">✗ Sai! Đúng là: {correctCatObj?.name || item.correctCategory}</span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* BOTTOM SCORE ARRANGER */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          const keys = Object.keys(arrangerUserAnswers);
                          if (keys.length < arrangerItems.length) {
                            setArrangerFeedback(`Vui lòng hoàn thành phân nhóm cho cả ${arrangerItems.length} từ vựng!`);
                            return;
                          }
                          let sc = 0;
                          arrangerItems.forEach(item => {
                            if (arrangerUserAnswers[item.word] === item.correctCategory) {
                              sc++;
                            }
                          });
                          setArrangerChecked(true);
                          setArrangerFeedback(`Đã chấm điểm: Bé đúng ${sc} / ${arrangerItems.length} từ! ` + (sc === arrangerItems.length ? 'Xuất sắc điểm tối đa!' : 'Thử chơi lại để tiến bộ thêm nhé.'));
                        }}
                        className="px-5 py-2.5 bg-indigo-650 hover:bg-slate-900 text-white border border-indigo-700 font-black text-xs uppercase rounded-xl transition cursor-pointer shadow-sm"
                      >
                        Chấm Điểm
                      </button>

                      <button
                        onClick={() => initGamesForCurrentTopic(gameChapterId, gameSectionId)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-750 border border-slate-200 text-xs font-black uppercase rounded-lg transition cursor-pointer"
                      >
                        Chơi Lại
                      </button>
                    </div>

                    {arrangerFeedback && (
                      <div className="p-3 bg-indigo-50 border border-indigo-100 text-indigo-950 rounded-2xl text-xs font-extrabold">
                        📢 {arrangerFeedback}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
