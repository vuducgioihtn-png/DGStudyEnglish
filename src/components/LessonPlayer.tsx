import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PersonalizedRoadmapLesson, ChatMessage, CEFRLevel } from '../types';
import { parseVocabulary } from '../utils';
import { 
  Volume2, Compass, Check, ArrowRight, Play, Sparkles, Send, 
  MessageSquare, BookOpen, ChevronRight, ChevronLeft, GraduationCap, Award, HelpCircle,
  Mic, MicOff, Square, Loader2, RefreshCw, Printer, Layers, Eye, EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Vocabulary data pools for dynamic lookup
import { STATIC_IELTS_VOCABULARY, MANUAL_PREMIUM_VOCAB } from '../data/ieltsVocab';
import { VOCAB_ENVIRONMENT } from '../data/vocab_environment';
import { VOCAB_SOCIETY } from '../data/vocab_society';
import { VOCAB_ECONOMY } from '../data/vocab_economy';
import { VOCAB_SCIENCE } from '../data/vocab_science';
import { VOCAB_HEALTH } from '../data/vocab_health';
import { VOCAB_EDUCATION } from '../data/vocab_education';

// Combining all vocab into a single master pool for flashcards lookup
const ALL_VOCABULARY_POOL = [
  ...STATIC_IELTS_VOCABULARY,
  ...MANUAL_PREMIUM_VOCAB,
  ...VOCAB_ENVIRONMENT,
  ...VOCAB_SOCIETY,
  ...VOCAB_ECONOMY,
  ...VOCAB_SCIENCE,
  ...VOCAB_HEALTH,
  ...VOCAB_EDUCATION,
];

// Custom lookup function
function findVocabDetails(wordStr: string) {
  const cleanWord = wordStr.trim().toLowerCase();
  
  // Try to find exact word match first
  let found = ALL_VOCABULARY_POOL.find(item => item.word.toLowerCase() === cleanWord);
  
  // If not found, try a substring match (e.g. if the word list has "acquire (v)" but pool has "acquire")
  if (!found) {
    found = ALL_VOCABULARY_POOL.find(item => {
      const itemWord = item.word.toLowerCase();
      return cleanWord.includes(itemWord) || itemWord.includes(cleanWord);
    });
  }

  if (found) {
    return {
      example: found.example,
      exampleTranslation: found.exampleTranslation,
      pos: found.pos || 'Word',
      synonyms: found.synonyms || [],
      collocations: found.collocations || []
    };
  }
  
  // Clean fallback if not found anywhere in our static dataset of thousands of words
  return {
    example: `It is highly recommended to practice applying "${wordStr}" in writing or speaking tasks.`,
    exampleTranslation: `Rất khuyên dùng việc thực hành áp dụng từ "${wordStr}" vào các bài tập viết hoặc nói.`,
    pos: 'Vocabulary',
    synonyms: [],
    collocations: []
  };
}

interface CustomQuestion {
  type: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  hint?: string;
  icon?: string;
}

const generateDiverseExercises = (currentLesson: PersonalizedRoadmapLesson): CustomQuestion[] => {
  const list: CustomQuestion[] = [];
  
  // Extract clean vocabs
  const parsedVocabs = currentLesson.vocabulary.map(v => {
    const parsed = parseVocabulary(v);
    return { english: parsed.word, vietnamese: parsed.meaning || parsed.word };
  });

  if (parsedVocabs.length > 0) {
    // Question 1: Vocabulary Match
    const targetVocab = parsedVocabs[0];
    const opts1 = [
      targetVocab.vietnamese,
      parsedVocabs[1]?.vietnamese || "Quyển sách học tập",
      parsedVocabs[2]?.vietnamese || "Quả bóng bay thú vị",
      parsedVocabs[3]?.vietnamese || "Trò chơi đóng vai dã ngoại"
    ];
    // Shuffle options
    const shuffled1 = [...opts1];
    const correctVal = targetVocab.vietnamese;
    shuffled1.sort(() => Math.random() - 0.5);
    const correctIdx1 = shuffled1.indexOf(correctVal);

    list.push({
      type: 'vocab_match',
      questionText: `Từ tiếng Anh "${targetVocab.english}" có nghĩa là gì trong tiếng Việt?`,
      options: shuffled1,
      correctAnswerIndex: correctIdx1,
      explanation: `Chính xác! "${targetVocab.english}" có nghĩa là "${targetVocab.vietnamese}" trong bài học hôm nay.`,
      hint: "Hãy xem lại danh sách Học lý thuyết & Từ vựng nhé",
      icon: "📚"
    });

    // Question 2: Word spelling completion
    const spellVocabBox = parsedVocabs[Math.min(1, parsedVocabs.length - 1)];
    const engWord = spellVocabBox.english.toLowerCase();
    
    if (engWord.length >= 3) {
      // Hide some characters
      let masked = "";
      const missingChars: string[] = [];
      const isVowel = (c: string) => ['a', 'e', 'i', 'o', 'u', 'y'].includes(c);
      
      for (let j = 0; j < engWord.length; j++) {
        const char = engWord[j];
        if (isVowel(char) && missingChars.length < 2) {
          masked += " _ ";
          missingChars.push(char);
        } else {
          masked += " " + char.toUpperCase() + " ";
        }
      }

      const missingStr = missingChars.join(', ').toUpperCase();
      const optionA = missingStr;
      const optionB = ['A', 'U'].filter(x => !missingChars.includes(x.toLowerCase())).concat(['I']).slice(0, missingChars.length).join(', ').toUpperCase();
      const optionC = ['E', 'O'].filter(x => !missingChars.includes(x.toLowerCase())).concat(['Y']).slice(0, missingChars.length).join(', ').toUpperCase();
      const optionD = ['U', 'E'].filter(x => !missingChars.includes(x.toLowerCase())).concat(['A']).slice(0, missingChars.length).join(', ').toUpperCase();

      const opts2 = Array.from(new Set([optionA, optionB, optionC, optionD]));
      const shuffled2 = [...opts2];
      shuffled2.sort(() => Math.random() - 0.5);
      const correctIdx2 = shuffled2.indexOf(optionA);

      list.push({
        type: 'word_unscramble',
        questionText: `Bé hãy chọn chữ cái còn thiếu cho từ chỉ "${spellVocabBox.vietnamese}": [ ${masked.trim()} ]`,
        options: shuffled2,
        correctAnswerIndex: correctIdx2,
        explanation: `Tuyệt vời! Từ hoàn chỉnh đầy đủ là "${spellVocabBox.english.toUpperCase()}"`,
        hint: "Bé thử đoán xem các nguyên âm nào biến mất nhé!",
        icon: "✏️"
      });
    }
  }

  // Question 3: Grammar Fill in Blank
  let grammarSentence = currentLesson.keyGrammar || "";
  if (grammarSentence) {
    let cleanSentence = grammarSentence.split('->')[0].split('(')[0].trim();
    if (cleanSentence.includes('/') || cleanSentence.includes('[')) {
      cleanSentence = cleanSentence
        .replace('a/an', 'a')
        .replace('[Vật gần]', 'desk')
        .replace('[Vật xa]', 'chair')
        .replace('[food]', 'popcorn')
        .replace('[Food/Drink]', 'juice')
        .replace('[action]', 'flying a kite')
        .replace('[Object]', 'rainbow')
        .replace('[Animal/Object]', 'fox');
    }
    
    const words = cleanSentence.split(' ');
    let targetIndexToHide = -1;
    const commonBe = ["is", "are", "am", "can", "let's", "flying", "pass", "on", "in", "to", "at", "where", "what", "is she"];
    for (let j = 0; j < words.length; j++) {
      if (commonBe.includes(words[j].toLowerCase())) {
        targetIndexToHide = j;
        break;
      }
    }
    
    if (targetIndexToHide === -1 && words.length > 2) {
      targetIndexToHide = 1;
    }

    if (targetIndexToHide !== -1) {
      const correctWord = words[targetIndexToHide];
      const clonedWords = [...words];
      clonedWords[targetIndexToHide] = "_______";
      const maskedSentence = clonedWords.join(' ');
      
      const optionA = correctWord;
      const optionB = correctWord.toLowerCase() === 'is' ? 'are' : 'with';
      const optionC = correctWord.toLowerCase() === 'flying' ? 'fly' : 'at';
      const optionD = correctWord.toLowerCase() === 'can' ? 'do' : 'is';

      const opts3 = Array.from(new Set([optionA, optionB, optionC, optionD]));
      const shuffled3 = [...opts3];
      shuffled3.sort(() => Math.random() - 0.5);
      const correctIdx3 = shuffled3.indexOf(correctWord);

      list.push({
        type: 'fill_blank',
        questionText: `Chọn từ thích hợp điền vào chỗ trống để nói chuẩn câu sau: "${maskedSentence}"`,
        options: shuffled3,
        correctAnswerIndex: correctIdx3,
        explanation: `Cực đỉnh! Câu ngữ pháp hoàn hảo là: "${cleanSentence}"`,
        hint: "Bé hãy dựa vào mẫu câu đã học ở phần Lý Thuyết nhé",
        icon: "💡"
      });
    }
  }

  // Question 4: Phonics Sound Match
  let targetPhonicsSound = "P";
  const titleLower = currentLesson.title.toLowerCase();
  if (titleLower.includes("unit 1")) targetPhonicsSound = "Pp (âm p)";
  else if (titleLower.includes("unit 2")) targetPhonicsSound = "Kk (âm k)";
  else if (titleLower.includes("unit 3")) targetPhonicsSound = "Ss (âm s)";
  else if (titleLower.includes("unit 4")) targetPhonicsSound = "Rr (âm r)";
  else if (titleLower.includes("unit 5")) targetPhonicsSound = "Qq (âm q)";
  else if (titleLower.includes("unit 6")) targetPhonicsSound = "Xx (âm x)";
  else if (titleLower.includes("unit 7")) targetPhonicsSound = "Jj (âm j)";
  else if (titleLower.includes("unit 8")) targetPhonicsSound = "Vv (âm v)";
  else if (titleLower.includes("unit 9")) targetPhonicsSound = "Yy (âm y)";
  else if (titleLower.includes("unit 10")) targetPhonicsSound = "Zz (âm z)";
  else if (titleLower.includes("unit 11")) targetPhonicsSound = "Ii (âm i)";
  else if (titleLower.includes("unit 12")) targetPhonicsSound = "Aa (âm a)";
  else if (titleLower.includes("unit 13")) targetPhonicsSound = "Nn (âm n)";
  else if (titleLower.includes("unit 14")) targetPhonicsSound = "er (âm er)";
  else if (titleLower.includes("unit 15")) targetPhonicsSound = "sh (âm sh)";
  else if (titleLower.includes("unit 16")) targetPhonicsSound = "Tt (âm t)";
  
  let correctPhonicsWord = parsedVocabs[0]?.english || "pasta";
  let wrongPhonicsWord1 = "kite";
  let wrongPhonicsWord2 = "zebra";
  let wrongPhonicsWord3 = "juice";

  if (targetPhonicsSound.startsWith("Pp")) {
    correctPhonicsWord = "popcorn"; wrongPhonicsWord1 = "kitten"; wrongPhonicsWord2 = "jelly"; wrongPhonicsWord3 = "village";
  } else if (targetPhonicsSound.startsWith("Kk")) {
    correctPhonicsWord = "kitten"; wrongPhonicsWord1 = "pasta"; wrongPhonicsWord2 = "van"; wrongPhonicsWord3 = "yogurt";
  } else if (targetPhonicsSound.startsWith("Ss")) {
    correctPhonicsWord = "sail"; wrongPhonicsWord1 = "box"; wrongPhonicsWord2 = "grapes"; wrongPhonicsWord3 = "clothing";
  } else if (targetPhonicsSound.startsWith("Rr")) {
    correctPhonicsWord = "rainbow"; wrongPhonicsWord1 = "teapot"; wrongPhonicsWord2 = "square"; wrongPhonicsWord3 = "jam";
  } else if (targetPhonicsSound.startsWith("Qq")) {
    correctPhonicsWord = "quiz"; wrongPhonicsWord1 = "car"; wrongPhonicsWord2 = "bike"; wrongPhonicsWord3 = "clothes";
  } else if (targetPhonicsSound.startsWith("Xx")) {
    correctPhonicsWord = "fox"; wrongPhonicsWord1 = "pizza"; wrongPhonicsWord2 = "sand"; wrongPhonicsWord3 = "village";
  } else if (targetPhonicsSound.startsWith("Jj")) {
    correctPhonicsWord = "jelly"; wrongPhonicsWord1 = "van"; wrongPhonicsWord2 = "ox"; wrongPhonicsWord3 = "brother";
  } else if (targetPhonicsSound.startsWith("Vv")) {
    correctPhonicsWord = "volleyball"; wrongPhonicsWord1 = "popcorn"; wrongPhonicsWord2 = "tent"; wrongPhonicsWord3 = "sister";
  } else if (targetPhonicsSound.startsWith("Yy")) {
    correctPhonicsWord = "yogurt"; wrongPhonicsWord1 = "kitten"; wrongPhonicsWord2 = "blanket"; wrongPhonicsWord3 = "cake";
  } else if (targetPhonicsSound.startsWith("Zz")) {
    correctPhonicsWord = "zebra"; wrongPhonicsWord1 = "pizza"; wrongPhonicsWord2 = "road"; wrongPhonicsWord3 = "eleven";
  }

  const opts4 = [correctPhonicsWord, wrongPhonicsWord1, wrongPhonicsWord2, wrongPhonicsWord3];
  const shuffled4 = [...opts4];
  shuffled4.sort(() => Math.random() - 0.5);
  const correctIdx4 = shuffled4.indexOf(correctPhonicsWord);

  list.push({
    type: 'listening_phonics',
    questionText: `Xem xét Phonics (Ngữ âm) chính của bài. Từ nào dưới đây chứa âm rèn luyện phát âm "${targetPhonicsSound}"?`,
    options: shuffled4,
    correctAnswerIndex: correctIdx4,
    explanation: `Siêu chuẩn xác! Từ "${correctPhonicsWord}" chính là từ vựng dùng để rèn luyện ngữ âm "${targetPhonicsSound}".`,
    hint: "Hãy nhìn chữ cái đầu hoặc đuôi từ xem âm nào khớp nhé!",
    icon: "🎵"
  });

  return list;
};

interface LessonPlayerProps {
  lesson: PersonalizedRoadmapLesson;
  userLevel: CEFRLevel;
  onLessonCompleted: (lessonId: string) => void;
  onBackToRoadmap: () => void;
}

export default function LessonPlayer({ lesson, userLevel, onLessonCompleted, onBackToRoadmap }: LessonPlayerProps) {
  const [activeTab, setActiveTab] = useState<'study' | 'quiz' | 'chat'>('study');
  
  // Flashcard Mode State
  const [vocabViewMode, setVocabViewMode] = useState<'list' | 'flashcard'>('list');
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  
  const handleExportPDF = () => {
    window.print();
  };
  
  // TTS State
  const [loadingAudioId, setLoadingAudioId] = useState<string | null>(null);

  // Practice Quiz State
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [assembledSentence, setAssembledSentence] = useState<string[]>([]);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState<boolean>(false);

  // Diverse Exercises Suite State
  const [diverseQuestions, setDiverseQuestions] = useState<CustomQuestion[]>([]);
  const [currentDiverseIndex, setCurrentDiverseIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [diverseChecked, setDiverseChecked] = useState<boolean>(false);
  const [diverseScore, setDiverseScore] = useState<number>(0);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isAssistantTyping, setIsAssistantTyping] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // AI Voice Recording Pronunciation states
  const [practicingWord, setPracticingWord] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [recError, setRecError] = useState<string | null>(null);
  const [pronunciationFeedback, setPronunciationFeedback] = useState<{
    score: number;
    accuracy: number;
    fluency: number;
    transcription: string;
    feedback: string;
    goodPoints: string;
    improvements: string;
  } | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Set first word of current lesson as default for pronunciation practice
  useEffect(() => {
    if (lesson.vocabulary && lesson.vocabulary.length > 0) {
      setPracticingWord(lesson.vocabulary[0]);
    } else {
      setPracticingWord('');
    }
    setPronunciationFeedback(null);
    setRecError(null);
  }, [lesson]);

  const startRecording = async (targetWordStr: string) => {
    const parsedTarget = parseVocabulary(targetWordStr);
    const cleanWord = parsedTarget.word;
    
    setPracticingWord(targetWordStr);
    setPronunciationFeedback(null);
    setRecError(null);
    setIsRecording(true);
    audioChunksRef.current = [];

    // Cancel active text-to-speech to prevent echo feedback
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Select mimeType fallback safely
      let options = {};
      if (MediaRecorder.isTypeSupported('audio/webm')) {
        options = { mimeType: 'audio/webm' };
      } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
        options = { mimeType: 'audio/ogg' };
      }

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        await handleSendAudioToAI(audioBlob, mediaRecorder.mimeType, cleanWord);
      };

      mediaRecorder.start();
    } catch (err: any) {
      console.error('Error starting mic capture:', err);
      let errorMsg = 'Không thể truy cập Microphone. Vui lòng cho phép quyền ghi âm và kiểm tra lại thiết bị của bạn!';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMsg = 'Quyền sử dụng Microphone bị từ chối. Vui lòng cho phép quyền ghi âm trên trình duyệt!';
      }
      setRecError(errorMsg);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Release microphone safely and instantly
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  };

  const handleSendAudioToAI = async (blob: Blob, mimeType: string, cleanWord: string) => {
    setIsEvaluating(true);
    setRecError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const base64Audio = base64data.split(',')[1]; // Strip "data:audio/webm;base64," metadata header

        try {
          const res = await fetch('/api/lesson/pronunciation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              audio: base64Audio,
              mimeType: mimeType,
              targetText: cleanWord
            })
          });

          if (!res.ok) throw new Error('AI Pronunciation Analysis failed');
          const data = await res.json();
          setPronunciationFeedback(data);
        } catch (apiErr: any) {
          console.error('AI pronunciation error:', apiErr);
          setRecError('Gặp sự cố khi kết nối tới AI James. Vui lòng ghi âm lại hoặc thử lại trong giây lát!');
        } finally {
          setIsEvaluating(false);
        }
      };
    } catch (err: any) {
      console.error('FileReader base64 error:', err);
      setRecError('Mã hóa dữ liệu ghi âm thất bại.');
      setIsEvaluating(false);
    }
  };

  // Initialize Quiz & Warm up Chat
  useEffect(() => {
    // Scaffold scrambler sentence based on key grammar or sample dialogues
    const targetSentence = lesson.keyGrammar || "If I had studied harder, I would have passed.";
    const cleaned = targetSentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    const words = cleaned.split(' ').filter(w => w.length > 0);
    // Sort randomly
    setScrambledWords([...words].sort(() => Math.random() - 0.5));
    setAssembledSentence([]);
    setQuizAnswered(false);

    // Bootstrap chat messages
    const tutorGreeting = `Hi! I'm Mr. James, your English tutor today. Welcome to our lesson: "${lesson.title}". Today, we are learning about these special vocabulary words: ${lesson.vocabulary.join(', ')}. Let's try practicing them together! Can you try using one of these words in a sentence for me? Don't worry if you make mistakes—I am here to support you! 🌸`;
    setChatMessages([
      {
        id: 'welcome-msg',
        sender: 'assistant',
        text: tutorGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    // Generate diverse questions
    const generated = generateDiverseExercises(lesson);
    setDiverseQuestions(generated);
    setCurrentDiverseIndex(0);
    setSelectedOptionIndex(null);
    setDiverseChecked(false);
    setDiverseScore(0);
  }, [lesson]);

  // Scroll to chat bottom
  useEffect(() => {
    if (activeTab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab, isAssistantTyping]);

  // Decodes and plays raw little-endian 16-bit PCM audio from the Gemini TTS API at 24kHz
  const playPCMBase64 = (base64String: string) => {
    try {
      const binaryString = window.atob(base64String);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const buffer = bytes.buffer;
      const view = new DataView(buffer);
      const numSamples = buffer.byteLength / 2;
      
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const audioBuffer = audioCtx.createBuffer(1, numSamples, 24000);
      const channelData = audioBuffer.getChannelData(0);
      
      for (let i = 0; i < numSamples; i++) {
        const sample = view.getInt16(i * 2, true); // little-endian
        channelData[i] = sample / 32768; // normalize
      }
      
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.start();
    } catch (err) {
      console.error('Lỗi khi phát âm thanh PCM:', err);
    }
  };

  const handleSpeakWord = async (wordText: string) => {
    setLoadingAudioId(wordText);
    const textToSpeak = parseVocabulary(wordText).word; // extract clean English word/phrase without IPA or meaning

    // High performance client-side SpeechSynthesis as primary
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'en-US';
        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.includes('en'));
        if (enVoice) {
          utterance.voice = enVoice;
        }
        window.speechSynthesis.speak(utterance);
        setLoadingAudioId(null);
        return;
      } catch (err) {
        console.warn('SpeechSynthesis failed, falling back to server TTS:', err);
      }
    }

    try {
      const res = await fetch('/api/lesson/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak, voice: 'Zephyr' })
      });

      if (!res.ok) throw new Error('Audio generation failed');
      const data = await res.json();
      if (data.audio) {
        playPCMBase64(data.audio);
      }
    } catch (err) {
      console.error(err);
      // Fallback local SpeechSynthesis if server doesn't respond/unauthorized API key
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } finally {
      setLoadingAudioId(null);
    }
  };

  // Word Ordering Quiz Logic
  const handleWordClick = (word: string, isScrambledList: boolean) => {
    if (quizAnswered) return;

    if (isScrambledList) {
      setAssembledSentence([...assembledSentence, word]);
      setScrambledWords(scrambledWords.filter(w => w !== word));
    } else {
      setScrambledWords([...scrambledWords, word]);
      setAssembledSentence(assembledSentence.filter(w => w !== word));
    }
  };

  const handleCheckQuiz = () => {
    const finalStr = assembledSentence.join(' ').toLowerCase();
    const targetStr = (lesson.keyGrammar || "If I had studied harder, I would have passed.").replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();
    
    setIsQuizCorrect(finalStr === targetStr);
    setQuizAnswered(true);
  };

  // AI Chat Assistant Send
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isAssistantTyping) return;

    const userMessage: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsAssistantTyping(true);

    try {
      const res = await fetch('/api/lesson/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage],
          lessonContext: {
            title: lesson.title,
            vocabulary: lesson.vocabulary,
            grammar: lesson.keyGrammar
          },
          userLevel
        })
      });

      if (!res.ok) throw new Error('Chatbot failure');
      const data = await res.json();
      
      setChatMessages(prev => [...prev, {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, {
        id: `assistant-error-${Date.now()}`,
        sender: 'assistant',
        text: "Sorry, I am having trouble connecting right now. Let's try speaking again in a few moments!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsAssistantTyping(false);
    }
  };

  // Extract grammatical/pronunciation improvements from chatbot responses
  const renderMessageContent = (text: string) => {
    // Look for correction flags like "💡 [Sửa lỗi nhẹ nhàng]" or similar markdown bullet points
    const correctionMarker = "💡 [Sửa lỗi nhẹ nhàng]";
    if (text.includes(correctionMarker)) {
      const parts = text.split(correctionMarker);
      return (
        <div>
          <div className="bg-amber-50 text-amber-900 border border-amber-200 p-3.5 rounded-xl text-xs sm:text-sm mb-3 flex items-start gap-2 leading-relaxed">
            <span className="text-lg">💡</span>
            <div>
              <p className="font-semibold text-amber-800">Gợi ý sửa lỗi ngữ pháp từ Thầy James:</p>
              <p className="whitespace-pre-line mt-0.5">{parts[1].split('\n\n')[0].trim()}</p>
            </div>
          </div>
          <p className="whitespace-pre-line leading-relaxed">{parts[0].trim() + '\n' + (parts[1].split('\n\n').slice(1).join('\n\n') || '')}</p>
        </div>
      );
    }
    return <p className="whitespace-pre-line leading-relaxed">{text}</p>;
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 px-2 sm:px-0" id="lesson-player-viewport">
      {/* Top Banner Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm mb-6">
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={onBackToRoadmap}
            className="p-2 hover:bg-slate-100 rounded-xl transition text-slate-500 cursor-pointer"
            id="back-to-roadmap-btn"
          >
            <Compass className="w-5 h-5 rotate-180" />
          </button>
          <div>
            <div className="span text-xs font-semibold text-indigo-600 uppercase tracking-widest block font-display">
              {lesson.category} Lesson
            </div>
            <h3 className="text-xl font-bold font-display text-slate-950">{lesson.title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleExportPDF}
            id="btn-export-lesson-pdf"
            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 hover:text-indigo-800 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer border border-indigo-100 shadow-sm shadow-indigo-50/20"
            title="Tải bài học ngoại tuyến để ôn tập (PDF)"
          >
            Xuất PDF <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={() => onLessonCompleted(lesson.id)}
            id="btn-complete-lesson"
            className="bg-emerald-600 hover:bg-slate-900 glow-btn text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-50 shrink-0"
          >
            Đánh dấu Đã Học <Check className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column Tabs Selector */}
        <div className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none shrink-0" id="lesson-player-tabs-rail">
          {[
            { id: 'study', label: 'Lý thuyết & Từ vựng', icon: BookOpen },
            { id: 'quiz', label: 'Tương tác Phản xạ', icon: Award },
            { id: 'chat', label: 'Giao tiếp Trực tuyến', icon: MessageSquare }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-medium transition flex items-center gap-2 shrink-0 cursor-pointer ${
                  isSelected 
                    ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-100' 
                    : 'bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-600'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Right Column Container */}
        <div className="lg:col-span-9" id="lesson-player-content-body">
          <AnimatePresence mode="wait">
            
            {/* STUDY TAB */}
            {activeTab === 'study' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md"
                id="lesson-study-panel"
              >
                <h4 className="text-lg font-bold font-display text-slate-950 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-500" /> Lý thuyết trọng tâm
                </h4>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {lesson.description}
                </p>

                {/* Vocabulary Header with Mode Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-slate-150 pb-3" id="vocab-section-header">
                  <h5 className="text-sm font-bold text-slate-900 bg-slate-50 p-2.5 rounded-lg border-l-4 border-indigo-500 m-0">
                    Vốn Từ bứt phá (Vocabulary Focus)
                  </h5>
                  <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-center" id="vocab-view-toggle">
                    <button
                      type="button"
                      onClick={() => setVocabViewMode('list')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                        vocabViewMode === 'list'
                          ? 'bg-white text-indigo-700 shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" /> Dạng danh sách
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setVocabViewMode('flashcard');
                        setCardIndex(0);
                        setIsCardFlipped(false);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                        vocabViewMode === 'flashcard'
                          ? 'bg-white text-indigo-700 shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" /> Thẻ Ghi Nhớ (Flashcard)
                    </button>
                  </div>
                </div>

                {vocabViewMode === 'list' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6" id="vocab-list-wrapper">
                    {lesson.vocabulary.map((vocab, index) => {
                      const isPlaying = loadingAudioId === vocab;
                      const parsed = parseVocabulary(vocab);
                      const isPracticed = practicingWord === vocab;
                      return (
                        <div 
                          key={index}
                          className={`p-4 border rounded-2xl flex items-center justify-between transition group ${
                            isPracticed 
                              ? 'bg-indigo-50/40 border-indigo-200 shadow-sm shadow-indigo-50/20' 
                              : 'bg-slate-50/50 hover:bg-slate-50 border-slate-100'
                          }`}
                          id={`vocab-item-${index}`}
                        >
                          <div>
                            <div className="flex flex-wrap items-baseline gap-2">
                              <p className="font-bold text-slate-950 text-base font-display">{parsed.word}</p>
                              {parsed.phonetic && (
                                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100/40">
                                  {parsed.phonetic}
                                </span>
                              )}
                            </div>
                            {parsed.meaning && (
                              <p className="text-xs text-slate-500 font-sans mt-1">({parsed.meaning})</p>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleSpeakWord(vocab)}
                              disabled={isPlaying}
                              id={`btn-pronounce-vocab-${index}`}
                              className={`p-2 rounded-xl transition cursor-pointer ${
                                isPlaying 
                                  ? 'bg-indigo-100 text-indigo-500 animate-pulse' 
                                  : 'bg-white hover:bg-indigo-600 hover:text-white border border-slate-100 text-slate-500 shadow-sm group-hover:scale-105'
                              }`}
                              title="Nghe phát âm từ AI"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                            
                            <button
                              onClick={() => {
                                setPracticingWord(vocab);
                                setPronunciationFeedback(null);
                                setRecError(null);
                                // Smooth scroll to the practice playground
                                document.getElementById('ai-pronunciation-playground')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              id={`btn-mic-vocab-${index}`}
                              className={`p-2 rounded-xl transition cursor-pointer ${
                                isPracticed
                                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                                  : 'bg-white hover:bg-indigo-50 border border-slate-100 text-indigo-600 shadow-sm group-hover:scale-105'
                              }`}
                              title="Luyện nói từ vựng này"
                            >
                              <Mic className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* FLASHCARD study view */
                  <div className="mb-8" id="vocab-flashcards-wrapper">
                    {lesson.vocabulary.length > 0 ? (
                      (() => {
                        const vocab = lesson.vocabulary[cardIndex];
                        const parsed = parseVocabulary(vocab);
                        const details = findVocabDetails(parsed.word);
                        const isPlaying = loadingAudioId === vocab;
                        const isPracticed = practicingWord === vocab;
                        
                        return (
                          <div className="max-w-md mx-auto">
                            {/* Card 3D Frame */}
                            <div className="flashcard-container w-full h-80 mb-4" onClick={() => setIsCardFlipped(!isCardFlipped)}>
                              <div className={`flashcard-inner h-full w-full cursor-pointer transition-transform duration-500 ${isCardFlipped ? 'flipped' : ''}`}>
                                
                                {/* FRONT FACE */}
                                <div className="flashcard-front bg-gradient-to-br from-white to-slate-50/40 border-2 border-slate-200 p-6 flex flex-col justify-between items-center text-center">
                                  <div className="w-full flex justify-between items-center">
                                    <span className="text-[10px] font-black tracking-widest text-indigo-600 uppercase bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100/50">
                                      {details.pos || 'Từ vựng'}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400">
                                      Mặt Trước (English)
                                    </span>
                                  </div>
                                  
                                  <div className="my-auto space-y-3">
                                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display select-all">
                                      {parsed.word}
                                    </h3>
                                    {parsed.phonetic && (
                                      <p className="text-sm font-mono font-bold text-indigo-600 bg-indigo-50/50 px-2.5 py-1 rounded-lg border border-indigo-100 w-max mx-auto">
                                        {parsed.phonetic}
                                      </p>
                                    )}
                                  </div>

                                  <div className="w-full flex items-center justify-between mt-auto pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation(); // prevent flipping card
                                        handleSpeakWord(vocab);
                                      }}
                                      disabled={isPlaying}
                                      className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition ${
                                        isPlaying
                                          ? 'bg-indigo-100 text-indigo-600 animate-pulse'
                                          : 'hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 font-bold border border-slate-100'
                                      }`}
                                      title="Nghe phát âm"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" /> Nghe phát âm
                                    </button>
                                    <span className="flex items-center gap-1 text-slate-400 font-bold">
                                      Chạm để lật <RefreshCw className="w-3.5 h-3.5 text-indigo-500" />
                                    </span>
                                  </div>
                                </div>

                                {/* BACK FACE */}
                                <div className="flashcard-back bg-gradient-to-br from-indigo-900 to-violet-950 border-2 border-indigo-950 p-6 flex flex-col justify-between items-center text-left text-white">
                                  <div className="w-full flex justify-between items-center">
                                    <span className="text-[10px] font-black tracking-widest text-indigo-300 uppercase bg-indigo-950/60 px-2 py-1 rounded-md border border-indigo-800/40">
                                      Định Nghĩa & Ví Dụ
                                    </span>
                                    <span className="text-[10px] font-bold text-indigo-300">
                                      Mặt Sau (Tiếng Việt)
                                    </span>
                                  </div>

                                  <div className="my-auto w-full space-y-4">
                                    <div className="text-center">
                                      <p className="text-xl font-extrabold text-indigo-100 font-display">
                                        {parsed.meaning}
                                      </p>
                                    </div>
                                    
                                    {details.example && (
                                      <div className="p-3 bg-indigo-950/40 border border-indigo-800/20 rounded-xl space-y-1 text-xs text-left">
                                        <p className="text-white leading-normal italic font-medium select-all">
                                          "{details.example}"
                                        </p>
                                        {details.exampleTranslation && (
                                          <p className="text-indigo-300 font-medium text-[11px]">
                                            → {details.exampleTranslation}
                                          </p>
                                        )}
                                      </div>
                                    )}

                                    {details.synonyms && details.synonyms.length > 0 && (
                                      <div className="text-[11px] text-indigo-200 flex flex-wrap gap-1.5 items-center justify-center">
                                        <span className="font-bold opacity-85">Đồng nghĩa:</span>
                                        {details.synonyms.slice(0, 3).map((syn, idx) => (
                                          <span key={idx} className="bg-indigo-950/50 px-1.5 py-0.5 rounded border border-indigo-800/30 font-medium">
                                            {syn}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>

                                  <div className="w-full flex items-center justify-between mt-auto pt-2 border-t border-indigo-900 text-[11px] text-indigo-300 font-medium">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setPracticingWord(vocab);
                                        setPronunciationFeedback(null);
                                        setRecError(null);
                                        document.getElementById('ai-pronunciation-playground')?.scrollIntoView({ behavior: 'smooth' });
                                      }}
                                      className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition ${
                                        isPracticed
                                          ? 'bg-emerald-600 text-white font-bold'
                                          : 'bg-indigo-800 hover:bg-indigo-700 text-white font-bold'
                                      }`}
                                    >
                                      <Mic className="w-3 h-3" /> {isPracticed ? 'Đang luyện tập' : 'Luyện phát âm'}
                                    </button>
                                    <span className="flex items-center gap-1 opacity-75 font-bold">
                                      Chạm để lật <RefreshCw className="w-3.5 h-3.5 text-indigo-300" />
                                    </span>
                                  </div>

                                </div>

                              </div>
                            </div>

                            {/* Flashcards Navigation Controls */}
                            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-150">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsCardFlipped(false);
                                  setTimeout(() => {
                                    setCardIndex(prev => (prev === 0 ? lesson.vocabulary.length - 1 : prev - 1));
                                  }, 150);
                                }}
                                className="p-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl transition cursor-pointer flex items-center justify-center"
                                title="Từ trước"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>

                              <div className="text-center">
                                <span className="text-xs font-black text-slate-800 font-display block">
                                  Thẻ {cardIndex + 1} / {lesson.vocabulary.length}
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                                  {parsed.word}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setIsCardFlipped(false);
                                  setTimeout(() => {
                                    setCardIndex(prev => (prev === lesson.vocabulary.length - 1 ? 0 : prev + 1));
                                  }, 150);
                                }}
                                className="p-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl transition cursor-pointer flex items-center justify-center"
                                title="Từ tiếp theo"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Progress bar */}
                            <div className="mt-3">
                              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mb-1">
                                <span>Tiến độ học</span>
                                <span>{Math.round(((cardIndex + 1) / lesson.vocabulary.length) * 100)}%</span>
                              </div>
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className="bg-indigo-600 h-full transition-all duration-300" 
                                  style={{ width: `${((cardIndex + 1) / lesson.vocabulary.length) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })()
                    ) : (
                      <p className="text-center text-slate-400 text-sm italic">Không có từ vựng để ôn tập.</p>
                    )}
                  </div>
                )}

                {/* AI Pronunciation Playground Section */}
                <div 
                  id="ai-pronunciation-playground" 
                  className="mt-2 mb-8 p-5 sm:p-6 bg-gradient-to-br from-indigo-50/60 via-indigo-50/30 to-emerald-50/30 border border-indigo-100/80 rounded-3xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
                      <h5 className="text-base font-bold text-slate-900 font-display">
                        Luyện Phát Âm Trực Tuyến Với AI Coach James
                      </h5>
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold bg-indigo-100/60 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
                      Chấm điểm AI tức thì
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                    Chọn từ vựng bất kỳ ở trên bằng cách nhấn biểu tượng chiếc Mic <Mic className="w-3.5 h-3.5 inline text-indigo-600" /> rồi nhấn giữ nút Microphone bên dưới để đọc to rõ ràng. Thầy James sẽ chấm điểm chi tiết độ lưu loát, độ chuẩn xác và hướng dẫn sửa phát âm chi tiết cho con!
                  </p>

                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Từ vựng đang luyện tập:</span>
                        <h6 className="text-lg font-extrabold text-slate-900 font-display mt-0.5">
                          {parseVocabulary(practicingWord || '').word || "Vui lòng chọn từ"}
                        </h6>
                      </div>
                      {practicingWord && (
                        <button
                          onClick={() => handleSpeakWord(practicingWord)}
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 transition px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer border border-indigo-100/30"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Nghe giọng chuẩn
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col items-center justify-center py-6">
                      {isRecording ? (
                        <div className="flex flex-col items-center gap-3">
                          {/* Audio Pulse Waveform */}
                          <div className="flex items-center gap-1.5 h-8 mb-2">
                            {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                              <motion.div
                                key={i}
                                className="w-1 bg-rose-500 rounded-full"
                                animate={{ height: [12, h * 6, 12] }}
                                transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.07 }}
                              />
                            ))}
                          </div>
                          
                          <button
                            onClick={stopRecording}
                            className="w-16 h-16 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-rose-200 hover:scale-105 transition active:scale-95 border-4 border-rose-100"
                            title="Dừng ghi âm"
                          >
                            <Square className="w-5 h-5 fill-white" />
                          </button>
                          <span className="text-xs font-bold text-rose-600 animate-pulse mt-2">
                            Đang ghi âm... Nhấn nút đỏ để phân tích phát âm
                          </span>
                        </div>
                      ) : isEvaluating ? (
                        <div className="flex flex-col items-center gap-3 py-4">
                          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                          <span className="text-xs font-bold text-indigo-600 mt-2">
                            AI James đang nghe và chấm điểm phát âm cho con...
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <button
                            onClick={() => startRecording(practicingWord)}
                            disabled={!practicingWord}
                            className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition duration-200 active:scale-95 ${
                              practicingWord 
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100 hover:scale-105 border-4 border-indigo-100' 
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                            }`}
                            title="Bắt đầu ghi âm"
                          >
                            <Mic className="w-6 h-6" />
                          </button>
                          <span className="text-xs font-semibold text-slate-500 mt-2">
                            {practicingWord ? "Chạm vào Mic để bắt đầu ghi âm và nói" : "Vui lòng chọn từ vựng phía trên để luyện tập"}
                          </span>
                        </div>
                      )}

                      {recError && (
                        <div className="mt-4 px-4 py-2 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-600 text-center max-w-md">
                          ⚠️ {recError}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pronunciation evaluation feedback screen */}
                  <AnimatePresence>
                    {pronunciationFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
                      >
                        {/* Metrics Panel */}
                        <div className="grid grid-cols-3 gap-3 mb-5 text-center">
                          <div className="p-3 bg-indigo-50/40 rounded-xl border border-indigo-100/30">
                            <span className="text-[10px] font-bold text-indigo-500 block uppercase tracking-wider">Tổng Điểm</span>
                            <span className={`text-2xl font-extrabold block font-display mt-1 ${
                              pronunciationFeedback.score >= 85 ? 'text-emerald-600' : pronunciationFeedback.score >= 70 ? 'text-indigo-600' : 'text-amber-600'
                            }`}>
                              {pronunciationFeedback.score}
                            </span>
                          </div>
                          <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100/30">
                            <span className="text-[10px] font-bold text-emerald-500 block uppercase tracking-wider">Độ Chuẩn Xác</span>
                            <span className="text-2xl font-extrabold text-emerald-600 block font-display mt-1">
                              {pronunciationFeedback.accuracy}%
                            </span>
                          </div>
                          <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-100/30">
                            <span className="text-[10px] font-bold text-amber-500 block uppercase tracking-wider">Lưu Loát</span>
                            <span className="text-2xl font-extrabold text-amber-600 block font-display mt-1">
                              {pronunciationFeedback.fluency}%
                            </span>
                          </div>
                        </div>

                        {/* Transcription Bubble */}
                        <div className="mb-4 text-xs sm:text-sm bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-2">
                          <span className="font-bold text-slate-500 shrink-0">Bạn đã nói:</span>
                          <span className="text-slate-800 font-mono font-medium italic">"{pronunciationFeedback.transcription}"</span>
                        </div>

                        {/* Teacher's Voice bubble */}
                        <div className="bg-gradient-to-r from-indigo-50/30 to-indigo-50/10 p-4 rounded-xl border border-indigo-100/40 mb-4 text-xs sm:text-sm">
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-extrabold flex items-center justify-center text-[10px]">
                              👨‍🏫
                            </div>
                            <span className="font-bold text-indigo-900 font-display">Nhận xét từ Coach James:</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed italic mt-1">
                            {pronunciationFeedback.feedback}
                          </p>
                        </div>

                        {/* Pedagogical Detailed Analysis (Good and Improvements) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                          {/* Good Points */}
                          <div className="p-3.5 bg-emerald-50/30 border border-emerald-100/30 rounded-xl">
                            <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1.5">
                              <span className="text-sm">🌟</span> Điểm tốt:
                            </div>
                            <p className="text-slate-600 leading-relaxed font-medium">
                              {pronunciationFeedback.goodPoints}
                            </p>
                          </div>

                          {/* Improvements */}
                          <div className="p-3.5 bg-amber-50/30 border border-amber-100/30 rounded-xl">
                            <div className="flex items-center gap-1.5 text-amber-800 font-bold mb-1.5">
                              <span className="text-sm">💡</span> Cần cải thiện:
                            </div>
                            <p className="text-slate-600 leading-relaxed font-medium">
                              {pronunciationFeedback.improvements}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Grammar Box */}
                <h5 className="text-sm font-bold text-slate-900 mb-3 bg-slate-50 p-2.5 rounded-lg border-l-4 border-indigo-500">
                  Cấu Trúc Cần Nhớ (Grammar Formula)
                </h5>
                <div className="p-4 bg-indigo-50/30 border border-indigo-100/50 rounded-2xl mb-6">
                  <code className="text-sm font-mono text-indigo-900 block font-bold mb-2">
                    {lesson.keyGrammar}
                  </code>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Luyện tập cấu trúc ngữ pháp này bằng cách sử dụng các từ vựng phía trên để thực hành viết câu trong thẻ "Tương tác Phản xạ".
                  </p>
                </div>

                {/* Dialog Sandbox previews */}
                {lesson.dialogueModel && lesson.dialogueModel.length > 0 && (
                  <div className="mt-6">
                    <h5 className="text-sm font-bold text-slate-900 mb-3">Tình huống Giao tiếp mẫu:</h5>
                    <div className="space-y-3">
                      {lesson.dialogueModel.map((line, idx) => (
                        <div key={idx} className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 text-xs sm:text-sm">
                          <strong className="text-indigo-600 block sm:inline mr-2">{line.split(':')[0]}:</strong>
                          <span className="text-slate-700">{line.split(':').slice(1).join(':')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* QUIZ TAB */}
            {activeTab === 'quiz' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
                id="lesson-quiz-panel"
              >
                {/* Section 1: Scrambler Game */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Award className="w-5 h-5 text-indigo-500" />
                    <h4 className="text-lg font-bold font-display text-slate-950">Trò chơi 1: Sắp xếp câu hoàn chỉnh</h4>
                  </div>
                  <p className="text-xs text-slate-500 mb-6 font-medium">
                    Chạm hoặc click vào các mảnh ghép từ để khôi phục mẫu câu ngữ pháp chuẩn của bài học này:
                  </p>

                  {/* Assembled Area */}
                  <div className="min-h-16 p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl mb-6 flex flex-wrap gap-2 items-center" id="assembled-sentence-area">
                    {assembledSentence.length === 0 && (
                      <span className="text-xs text-slate-400 font-sans italic">Kéo thả các mảnh ghép ở đây...</span>
                    )}
                    {assembledSentence.map((word, wordIdx) => (
                      <button
                        key={wordIdx}
                        type="button"
                        id={`assembled-word-${wordIdx}`}
                        onClick={() => handleWordClick(word, false)}
                        className="px-3.5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-rose-500 transition cursor-pointer shadow-sm shadow-indigo-100"
                      >
                        {word}
                      </button>
                    ))}
                  </div>

                  {/* Scrambled Box */}
                  <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl mb-8">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Mảnh ghép tự do:</p>
                    <div className="flex flex-wrap gap-2">
                      {scrambledWords.map((word, wordIdx) => (
                        <button
                          key={wordIdx}
                          type="button"
                          id={`scrambled-word-${wordIdx}`}
                          onClick={() => handleWordClick(word, true)}
                          className="px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200/85 rounded-xl text-sm font-medium transition cursor-pointer shadow-sm"
                        >
                          {word}
                        </button>
                      ))}
                    </div>
                  </div>

                  {quizAnswered && (
                    <div 
                      className={`p-4 rounded-2xl border mb-6 text-sm flex gap-3 items-start ${
                        isQuizCorrect 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                          : 'bg-rose-50 border-rose-200 text-rose-950'
                      }`}
                      id="quiz-result-alert"
                    >
                      <span className="text-xl">{isQuizCorrect ? '🎉' : '❌'}</span>
                      <div>
                        <p className="font-bold">{isQuizCorrect ? 'Bé quá giỏi! Thật tuyệt vời!' : 'Hơi lúng túng rồi bé yêu!'}</p>
                        <p className="text-xs mt-1 text-slate-600">Đáp án đúng của câu này là: <strong className="text-slate-900 font-mono">{lesson.keyGrammar}</strong></p>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => {
                        const target = lesson.keyGrammar || "If I had studied harder, I would have passed.";
                        const cleaned = target.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
                        const words = cleaned.split(' ').filter(w => w.length > 0);
                        setScrambledWords([...words].sort(() => Math.random() - 0.5));
                        setAssembledSentence([]);
                        setQuizAnswered(false);
                      }}
                      type="button"
                      className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                    >
                      Xếp lại
                    </button>

                    {!quizAnswered && (
                      <button
                        onClick={handleCheckQuiz}
                        type="button"
                        disabled={assembledSentence.length === 0}
                        className="px-5 py-2 bg-indigo-600 disabled:opacity-50 disabled:pointer-events-none hover:bg-slate-900 text-white rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer shadow-md shadow-indigo-100"
                        id="btn-check-quiz-ans"
                      >
                        Kiểm tra
                      </button>
                    )}
                  </div>
                </div>

                {/* Section 2: Diverse Questions Suite */}
                {diverseQuestions.length > 0 && (
                  <div className="bg-gradient-to-br from-indigo-50/20 via-white to-white p-6 rounded-3xl border border-indigo-100 shadow-lg relative overflow-hidden" id="diverse-quizzes-suite-panel">
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-indigo-600/10 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-bold">
                      <span>Điểm số:</span>
                      <span className="text-slate-900 font-extrabold">{diverseScore} ⭐</span>
                    </div>

                    <div className="flex items-center gap-2.5 mb-2">
                      <GraduationCap className="w-5 h-5 text-indigo-600" />
                      <h4 className="text-lg font-bold font-display text-indigo-950">Trò chơi 2: Bài tập đa dạng cho Lớp 2</h4>
                    </div>
                    <p className="text-xs text-slate-500 mb-6 font-medium">
                      Rèn luyện tư duy từ vựng, chính tả chữ cái, cấu trúc câu và nhận biết ngữ âm đặc hiệu:
                    </p>

                    {/* Progress Indicator */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        <span>Câu hỏi {currentDiverseIndex + 1} / {diverseQuestions.length}</span>
                        <span>Hoàn thành {Math.round(((currentDiverseIndex) / diverseQuestions.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                          style={{ width: `${((currentDiverseIndex + 1) / diverseQuestions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Question Card */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentDiverseIndex}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100/50 mb-6"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{diverseQuestions[currentDiverseIndex].icon || '✏️'}</span>
                          <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            {diverseQuestions[currentDiverseIndex].type.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <h5 className="text-slate-900 font-extrabold text-sm sm:text-base leading-relaxed mb-5">
                          {diverseQuestions[currentDiverseIndex].questionText}
                        </h5>

                        {/* Options list */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {diverseQuestions[currentDiverseIndex].options.map((opt, optIdx) => {
                            const isSelected = selectedOptionIndex === optIdx;
                            const isCorrectAnswer = optIdx === diverseQuestions[currentDiverseIndex].correctAnswerIndex;
                            let buttonStyle = "bg-white hover:bg-indigo-50 border-slate-200/80 text-slate-800";
                            
                            if (diverseChecked) {
                              if (isCorrectAnswer) {
                                buttonStyle = "bg-emerald-500 border-emerald-500 text-white font-bold";
                              } else if (isSelected) {
                                buttonStyle = "bg-rose-500 border-rose-500 text-white font-medium";
                              } else {
                                buttonStyle = "bg-white opacity-40 border-slate-200 text-slate-400";
                              }
                            } else if (isSelected) {
                              buttonStyle = "bg-indigo-600 border-indigo-600 text-white font-bold ring-4 ring-indigo-100";
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                disabled={diverseChecked}
                                onClick={() => setSelectedOptionIndex(optIdx)}
                                className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition cursor-pointer min-h-[50px] shadow-sm flex items-center justify-between ${buttonStyle}`}
                              >
                                <span>{opt}</span>
                                {diverseChecked && isCorrectAnswer && (
                                  <span className="text-white text-base">✔️</span>
                                )}
                                {diverseChecked && isSelected && !isCorrectAnswer && (
                                  <span className="text-white text-base">❌</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Submit and explanation result block */}
                    {diverseChecked && (
                      <div 
                        className={`p-4 rounded-2xl border mb-6 text-xs sm:text-sm flex gap-3 items-start animate-fade-in ${
                          selectedOptionIndex === diverseQuestions[currentDiverseIndex].correctAnswerIndex 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                            : 'bg-rose-50 border-rose-200 text-rose-950'
                        }`}
                      >
                        <span className="text-xl">
                          {selectedOptionIndex === diverseQuestions[currentDiverseIndex].correctAnswerIndex ? '🌟' : '💪'}
                        </span>
                        <div>
                          <p className="font-extrabold text-sm">
                            {selectedOptionIndex === diverseQuestions[currentDiverseIndex].correctAnswerIndex 
                              ? 'Ngoạn mục! Bé đoán trúng phóc!' 
                              : 'Chưa chính xác rồi bé ơi! Cùng học lại nhé:'}
                          </p>
                          <p className="font-medium mt-1 opacity-90 leading-relaxed">
                            {diverseQuestions[currentDiverseIndex].explanation}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Controls Footer */}
                    <div className="flex justify-between items-center mt-4 border-t border-slate-100 pt-4">
                      {/* Hint Button */}
                      <button
                        type="button"
                        onClick={() => {
                          alert(`Mách nhỏ: ${diverseQuestions[currentDiverseIndex].hint || 'Bé nhớ lại bài học nhé'}`);
                        }}
                        className="text-indigo-600 hover:text-slate-900 font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <HelpCircle className="w-4 h-4" /> Xem Gợi ý
                      </button>

                      <div className="flex gap-2">
                        {/* Grade 2 Next button steps */}
                        {!diverseChecked ? (
                          <button
                            type="button"
                            disabled={selectedOptionIndex === null}
                            onClick={() => {
                              const isCorrect = selectedOptionIndex === diverseQuestions[currentDiverseIndex].correctAnswerIndex;
                              if (isCorrect) {
                                setDiverseScore(prev => prev + 1);
                              }
                              setDiverseChecked(true);
                            }}
                            className="bg-indigo-600 hover:bg-slate-900 disabled:opacity-50 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition shadow-md shadow-indigo-100 cursor-pointer"
                          >
                            Nộp Đáp án
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              if (currentDiverseIndex < diverseQuestions.length - 1) {
                                setCurrentDiverseIndex(prev => prev + 1);
                                setSelectedOptionIndex(null);
                                setDiverseChecked(false);
                              } else {
                                // Final score show!
                                alert(`🎉 Chúc mừng bé yêu! Đã xuất sắc vượt qua chuỗi 4 bài tập với điểm số: ${diverseScore}/${diverseQuestions.length} ⭐!`);
                                // Reset to first question for endless replay
                                setCurrentDiverseIndex(0);
                                setSelectedOptionIndex(null);
                                setDiverseChecked(false);
                                setDiverseScore(0);
                              }
                            }}
                            className="bg-indigo-950 hover:bg-slate-900 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition flex items-center gap-1 cursor-pointer"
                          >
                            {currentDiverseIndex < diverseQuestions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành 🏆'}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                )}
              </motion.div>
            )}

            {/* CHAT TAB */}
            {activeTab === 'chat' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden flex flex-col h-[480px]"
                id="lesson-chat-panel"
              >
                {/* Tutor Card Header */}
                <div className="bg-indigo-600 p-4 shrink-0 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-indigo-400 border border-indigo-200/50 flex items-center justify-center font-bold text-white text-lg">
                        👨‍🏫
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-indigo-600 rounded-full"></span>
                    </div>
                    <div>
                      <p className="font-bold text-sm sm:text-base font-display mb-0.5">Mr. James</p>
                      <span className="text-[10px] text-indigo-200 font-sans tracking-wide">Trợ lý Giáo viên AI Giao Tiếp</span>
                    </div>
                  </div>
                  <span className="text-xs bg-indigo-500 text-white px-2.5 py-1 rounded-full uppercase font-semibold">
                    LEVEL: {userLevel}
                  </span>
                </div>

                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50" id="chat-messages-container">
                  {chatMessages.map((msg) => {
                    const isAi = msg.sender === 'assistant';
                    return (
                      <div 
                        key={msg.id}
                        className={`flex gap-3 max-w-[85%] ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                        id={`chat-bubble-${msg.id}`}
                      >
                        {isAi && (
                          <div className="w-8 h-8 rounded-full bg-indigo-100 shrink-0 flex items-center justify-center font-bold text-sm">
                            👨
                          </div>
                        )}
                        <div className={`p-4 rounded-2xl text-xs sm:text-sm shadow-sm leading-relaxed ${
                          isAi 
                            ? 'bg-white border border-slate-100 text-slate-800 rounded-tl-none' 
                            : 'bg-indigo-600 text-white rounded-tr-none'
                        }`}>
                          {isAi ? renderMessageContent(msg.text) : <p className="whitespace-pre-line">{msg.text}</p>}
                          <span className={`block text-[10px] mt-1.5 text-right ${isAi ? 'text-slate-400' : 'text-indigo-200'}`}>
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {isAssistantTyping && (
                    <div className="flex gap-3 max-w-[80%] mr-auto" id="typing-indicator-wrapper">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 shrink-0 flex items-center justify-center font-bold text-sm">
                        👨
                      </div>
                      <div className="p-4 bg-white border border-slate-100 rounded-2xl rounded-tl-none text-slate-500 text-xs flex items-center gap-2.5">
                        <span className="font-sans italic">Thầy James đang suy nghĩ...</span>
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-100"></span>
                          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce delay-200"></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Message Input bar */}
                <form 
                  onSubmit={handleSendMessage} 
                  className="bg-white p-3 shrink-0 border-t border-slate-200/80 flex items-center gap-2"
                  id="chat-input-form"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Nhập phần trả lời tiếng Anh của bạn tại đây... (Mr. James sẽ tự động sửa lỗi)"
                    className="flex-1 p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-indigo-600 transition"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isAssistantTyping}
                    id="btn-chat-send"
                    className="p-3 bg-indigo-600 hover:bg-slate-900 disabled:opacity-55 disabled:pointer-events-none text-white rounded-xl transition cursor-pointer shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* PDF Export printable portal layout */}
      {createPortal(
        <div id="print-section" className="p-8 max-w-4xl mx-auto bg-white text-slate-900 leading-relaxed text-sm">
          {/* Header Banner */}
          <div className="border-b-4 border-indigo-600 pb-4 mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-indigo-900 uppercase font-display">
                Hacker IELTS Adventure
              </h1>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                Học phần Offline Study Guide
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full border border-indigo-200">
                CEFR Level: {userLevel}
              </span>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase font-mono">
                Thời lượng: {lesson.duration}
              </p>
            </div>
          </div>

          {/* Lesson Details */}
          <div className="mb-6">
            <span className="text-[10px] font-black tracking-widest text-indigo-600 uppercase font-mono">
              Chủ đề: {lesson.category} Lesson
            </span>
            <h2 className="text-xl font-extrabold text-slate-950 mt-0.5 mb-2 font-display">
              {lesson.title}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line italic">
              {lesson.description}
            </p>
          </div>

          {/* Learning Objectives */}
          {lesson.objectives && lesson.objectives.length > 0 && (
            <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl print-avoid-break">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2 font-display">
                🎯 Mục tiêu bài học (Objectives)
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 font-medium">
                {lesson.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Vocabulary Section */}
          <div className="mb-6 print-avoid-break">
            <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-3 border-b-2 border-indigo-100 pb-1.5 font-display">
              📖 Vốn Từ bứt phá (Vocabulary Focus)
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {lesson.vocabulary.map((vocab, index) => {
                const parsed = parseVocabulary(vocab);
                return (
                  <div 
                    key={index}
                    className="p-3 border border-slate-200 rounded-xl bg-white flex justify-between items-start"
                  >
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-slate-900 text-sm font-display">{parsed.word}</span>
                        {parsed.phonetic && (
                          <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                            {parsed.phonetic}
                          </span>
                        )}
                      </div>
                      {parsed.meaning && (
                        <p className="text-xs text-slate-600 font-semibold mt-1">({parsed.meaning})</p>
                      )}
                    </div>
                    {/* Blank space for notes */}
                    <div className="w-1/3 border-b border-dashed border-slate-300 h-8 self-end text-[10px] text-slate-300 italic text-right font-medium pr-1 select-none">
                      Ghi chú của học sinh...
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grammar Formula */}
          <div className="mb-6 print-avoid-break">
            <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-3 border-b-2 border-indigo-100 pb-1.5 font-display">
              ⚡ Cấu trúc ngữ pháp trọng tâm (Grammar Focus)
            </h3>
            <div className="p-4 bg-indigo-50/50 border border-indigo-150 rounded-2xl">
              <code className="text-xs font-mono font-black text-indigo-950 block mb-2">
                {lesson.keyGrammar}
              </code>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Luyện tập ghép cấu trúc này cùng các từ vựng mới để đặt câu phản xạ hàng ngày nhé!
              </p>
            </div>
          </div>

          {/* Dialogue Model Situations */}
          {lesson.dialogueModel && lesson.dialogueModel.length > 0 && (
            <div className="mb-6 print-avoid-break">
              <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-3 border-b-2 border-indigo-100 pb-1.5 font-display">
                🗣️ Tình huống Giao tiếp mẫu (Dialogue Model)
              </h3>
              <div className="space-y-3">
                {lesson.dialogueModel.map((line, idx) => {
                  const speaker = line.split(':')[0];
                  const textContent = line.split(':').slice(1).join(':');
                  return (
                    <div key={idx} className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 text-xs">
                      <strong className="text-indigo-600 font-bold block mb-0.5">{speaker}:</strong>
                      <span className="text-slate-700 leading-normal italic">"{textContent.trim()}"</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer Branding */}
          <div className="mt-12 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 font-semibold font-mono space-y-1">
            <p>Chúc em ôn tập thật tốt và bứt phá điểm số IELTS cùng Hacker IELTS Adventure!</p>
            <p>© 2026 DGStudy Educational System. All rights reserved.</p>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
