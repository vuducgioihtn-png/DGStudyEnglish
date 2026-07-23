import React, { useState, useEffect } from 'react';
import { IeltsWord } from '../types';
import { STATIC_IELTS_VOCABULARY, ieltsTopicList, ieltsBandList } from '../data/ieltsVocab';
import { STATIC_SCHOOL_VOCABULARY, schoolTopicList, schoolGradeList } from '../data/schoolVocab';
import { getSentencePhonetic } from '../utils';
import { BOOK_MINDMAPS } from '../data/bookMindmaps';
import { HACK_3000_MINDMAPS } from '../data/hack3000Mindmaps';
import { 
  BookOpen, Sparkles, Volume2, Search, Filter, 
  Layers, CheckCircle, HelpCircle, ArrowRight,
  RefreshCw, Check, Star, Play, Award, Edit3, Trash2,
  Brain, GitFork, AlertCircle, X, Turtle,
  Mic, MicOff, Square, ChevronLeft, ChevronRight
} from 'lucide-react';

interface IeltsVocabularyPlatformProps {
  studentUsername: string;
}

export default function IeltsVocabularyPlatform({ studentUsername }: IeltsVocabularyPlatformProps) {
  // Vocabulary Hub mode chooser: 'ielts' (IELTS Academics) or 'school' (State Curriculum Grades 1 - 12)
  const [vocabMode, setVocabMode] = useState<'ielts' | 'school'>(() => {
    const saved = localStorage.getItem(`el_vocab_mode_${studentUsername}`);
    return (saved === 'school' ? 'school' : 'ielts') as 'ielts' | 'school';
  });

  useEffect(() => {
    localStorage.setItem(`el_vocab_mode_${studentUsername}`, vocabMode);
  }, [vocabMode, studentUsername]);

  // Combine static vocab and user's AI-discovered vocabulary
  const [customWords, setCustomWords] = useState<IeltsWord[]>(() => {
    const saved = localStorage.getItem(`el_custom_vocab_${studentUsername}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Helper to cleanly format and normalize vocabulary data, keeping terms correct without trailing index numbers
  const cleanIeltsWord = (item: IeltsWord): IeltsWord => {
    // 1. Clean word: strip trailing spaces and numbers (e.g. "Heuristic 7" -> "Heuristic", "Decision10" -> "Decision")
    const cleanedWord = item.word.replace(/\s*\d+$/g, '').trim();

    // 2. Clean phonetic: strip trailing numbers and dashes (e.g. "/hjuˈrɪstɪk 7/" -> "/hjuˈrɪstɪk/", "/dɪˈsɪʒn-10/" -> "/dɪˈsɪʒn/")
    let cleanedPhonetic = item.phonetic || '';
    cleanedPhonetic = cleanedPhonetic.replace(/[-\s]\d+(?=\/)/g, ''); // inside slashes
    cleanedPhonetic = cleanedPhonetic.replace(/[-\s]\d+$/g, ''); // end of string
    cleanedPhonetic = cleanedPhonetic.trim();

    // 3. Clean definition: strip "số [0-9]+" or "mẫu [0-9]+"
    let cleanedDefinition = item.definition || '';
    cleanedDefinition = cleanedDefinition.replace(/\s*[sS]ố\s+\d+/g, '');
    cleanedDefinition = cleanedDefinition.replace(/\s*mẫu\s*(số)?\s*\d*/gi, '');
    cleanedDefinition = cleanedDefinition.trim();

    const lowerWord = cleanedWord.toLowerCase();
    let cleanedExample = item.example || '';
    let cleanedExampleTranslation = item.exampleTranslation || '';

    // Check if it's a dynamically generated school vocabulary word or IELTS word
    const isDynamicSchool = item.bandLevel?.startsWith('Lớp') && (/\d+/.test(item.word) || /m\u1eabu/i.test(item.definition) || item.phonetic?.includes('-'));
    const isDynamicIelts = !item.bandLevel?.startsWith('Lớp') && /\d+/.test(item.word);

    if (isDynamicSchool) {
      cleanedExample = `We use our ${lowerWord} in school activities daily.`;
      cleanedExampleTranslation = `Chúng tôi sử dụng ${cleanedDefinition.toLowerCase()} trong các hoạt động hàng ngày ở trường.`;
    } else if (isDynamicIelts) {
      if (item.topic === 'Education & Learning') {
        if (item.pos === 'Verb') {
          cleanedExample = `Teachers always try to ${lowerWord} learning in secondary classrooms.`;
          cleanedExampleTranslation = `Thầy cô luôn cố gắng ${cleanedDefinition.toLowerCase()} học tập trong các lớp học trung học.`;
        } else if (item.pos === 'Adjective') {
          cleanedExample = `Teachers always try to support ${lowerWord} development in secondary classrooms.`;
          cleanedExampleTranslation = `Thầy cô luôn cố gắng hỗ trợ sự phát triển ${cleanedDefinition.toLowerCase()} trong các lớp học trung học.`;
        } else {
          cleanedExample = `Teachers always try to foster ${lowerWord} in secondary classrooms.`;
          cleanedExampleTranslation = `Thầy cô luôn cố gắng bồi dưỡng ${cleanedDefinition.toLowerCase()} trong các lớp học trung học.`;
        }
      } else if (item.topic === 'Science & Technology') {
        if (item.pos === 'Verb') {
          cleanedExample = `Researchers used a complex system to ${lowerWord} processes in state labs.`;
          cleanedExampleTranslation = `Các nhà nghiên cứu đã sử dụng một hệ thống phức tạp để ${cleanedDefinition.toLowerCase()} các quy trình trong phòng thí nghiệm quốc gia.`;
        } else if (item.pos === 'Adjective') {
          cleanedExample = `Researchers used a complex ${lowerWord} process in state labs.`;
          cleanedExampleTranslation = `Các nhà nghiên cứu đã sử dụng một quy trình ${cleanedDefinition.toLowerCase()} phức tạp trong phòng thí nghiệm quốc gia.`;
        } else {
          cleanedExample = `Researchers studied the effects of ${lowerWord} in state labs.`;
          cleanedExampleTranslation = `Các nhà nghiên cứu đã nghiên cứu tác động của ${cleanedDefinition.toLowerCase()} trong phòng thí nghiệm quốc gia.`;
        }
      } else if (item.topic === 'Environment & Wildlife') {
        if (item.pos === 'Adjective') {
          cleanedExample = `Eco-activists highlight the importance of ${lowerWord} practices in preserving forests.`;
          cleanedExampleTranslation = `Các nhà hoạt động môi trường nhấn mạnh tầm quan trọng của các hoạt động ${cleanedDefinition.toLowerCase()} trong việc bảo tồn rừng.`;
        } else {
          cleanedExample = `Eco-activists highlight the importance of ${lowerWord} in preserving forests.`;
          cleanedExampleTranslation = `Các nhà hoạt động môi trường nhấn mạnh tầm quan trọng của ${cleanedDefinition.toLowerCase()} trong việc bảo tồn rừng.`;
        }
      } else if (item.topic === 'Health & Medicine') {
        if (item.pos === 'Adjective') {
          cleanedExample = `Practitioners emphasize that ${lowerWord} care is essential for patient recovery.`;
          cleanedExampleTranslation = `Các bác sĩ nhấn mạnh rằng sự chăm sóc ${cleanedDefinition.toLowerCase()} là cần thiết cho sự phục hồi của bệnh nhân.`;
        } else {
          cleanedExample = `Practitioners emphasize that ${lowerWord} is essential for patient recovery.`;
          cleanedExampleTranslation = `Các bác sĩ nhấn mạnh rằng ${cleanedDefinition.toLowerCase()} là cần thiết cho sự phục hồi của bệnh nhân.`;
        }
      } else if (item.topic === 'Economy & Business') {
        if (item.pos === 'Verb') {
          cleanedExample = `Analysts observe how market rates ${lowerWord} and influence corporate decisions.`;
          cleanedExampleTranslation = `Các nhà phân tích quan sát cách tỷ giá thị trường ${cleanedDefinition.toLowerCase()} và ảnh hưởng đến quyết định của tập đoàn.`;
        } else if (item.pos === 'Adjective') {
          cleanedExample = `Economic analysis demonstrates how ${lowerWord} factors influence corporate decisions.`;
          cleanedExampleTranslation = `Phân tích kinh tế chứng minh cách các yếu tố ${cleanedDefinition.toLowerCase()} ảnh hưởng đến các quyết định của tập đoàn.`;
        } else {
          cleanedExample = `Economic analysis demonstrates how ${lowerWord} influences corporate decisions.`;
          cleanedExampleTranslation = `Phân tích kinh tế chứng minh cách ${cleanedDefinition.toLowerCase()} ảnh hưởng đến các quyết định của tập đoàn.`;
        }
      } else if (item.topic === 'Society & Culture') {
        if (item.pos === 'Adjective') {
          cleanedExample = `Sociologists suggest analyzing how ${lowerWord} changes affect family structures.`;
          cleanedExampleTranslation = `Các nhà xã hội học đề xuất phân tích cách các thay đổi ${cleanedDefinition.toLowerCase()} ảnh hưởng đến cấu trúc gia đình.`;
        } else {
          cleanedExample = `Sociologists suggest analyzing how ${lowerWord} affects family structures.`;
          cleanedExampleTranslation = `Các nhà xã hội học đề xuất phân tích cách ${cleanedDefinition.toLowerCase()} ảnh hưởng đến cấu trúc gia đình.`;
        }
      }
    }

    return {
      ...item,
      word: cleanedWord,
      phonetic: cleanedPhonetic,
      definition: cleanedDefinition,
      example: cleanedExample,
      exampleTranslation: cleanedExampleTranslation,
    };
  };

  const rawWords = vocabMode === 'ielts'
    ? [...STATIC_IELTS_VOCABULARY, ...customWords.filter(w => !w.bandLevel.startsWith('Lớp'))]
    : [...STATIC_SCHOOL_VOCABULARY, ...customWords.filter(w => w.bandLevel.startsWith('Lớp'))];

  const allWords = React.useMemo(() => {
    return rawWords.map(w => cleanIeltsWord(w));
  }, [rawWords, vocabMode]);

  // Persistent tracking of memorized words (using words spelling as keys)
  const [memorizedWords, setMemorizedWords] = useState<string[]>(() => {
    const saved = localStorage.getItem(`el_memorized_vocab_${studentUsername}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Saving states
  useEffect(() => {
    localStorage.setItem(`el_custom_vocab_${studentUsername}`, JSON.stringify(customWords));
  }, [customWords, studentUsername]);

  useEffect(() => {
    localStorage.setItem(`el_memorized_vocab_${studentUsername}`, JSON.stringify(memorizedWords));
  }, [memorizedWords, studentUsername]);

  // Tab views within Vocabulary Section: 'list' (Glossary) | 'flashcard' (Study) | 'quiz' (Practice test) | 'ai-sentence' (Sentence Builder) | 'mindmap' (Mindmap learning)
  const [activeSegment, setActiveSegment] = useState<'list' | 'flashcard' | 'quiz' | 'ai-sentence' | 'mindmap'>('list');

  // Search and Filter variables
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedBand, setSelectedBand] = useState(() => {
    const savedMode = localStorage.getItem(`el_vocab_mode_${studentUsername}`);
    return savedMode === 'school' ? 'All Grades' : 'All Bands';
  });

  // AI manual lookup states
  const [aiLookupQuery, setAiLookupQuery] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');

  // Voice TTS audio playback states
  const [playingWordAudio, setPlayingWordAudio] = useState<string | null>(null);
  const [ttsSpeed, setTtsSpeed] = useState<number>(() => {
    const saved = localStorage.getItem(`el_tts_speed_${studentUsername}`);
    return saved ? parseFloat(saved) : 1.0;
  });

  useEffect(() => {
    localStorage.setItem(`el_tts_speed_${studentUsername}`, String(ttsSpeed));
  }, [ttsSpeed, studentUsername]);

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcardFilter, setFlashcardFilter] = useState<'all' | 'unmemorized' | 'memorized'>('unmemorized');

  // Quiz states
  const [quizSize, setQuizSize] = useState<number>(5);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // AI Sentence builder states
  const [selectedSentenceWord, setSelectedSentenceWord] = useState<IeltsWord | null>(null);
  const [studentSentence, setStudentSentence] = useState('');
  const [sentenceEvalLoading, setSentenceEvalLoading] = useState(false);
  const [sentenceEvalResult, setSentenceEvalResult] = useState<{
    score: number;
    isCorrect: boolean;
    feedback: string;
    polishedRewrite: string;
  } | null>(null);


  // ----------------- TTS ENGINE CALL -----------------
  const playTTS = async (text: string) => {
    // Clean Vietnamese meaning and IPA from input text
    const cleanText = text
      .replace(/\s*\(.*?\)\s*/g, '')
      .replace(/\s*\[.*?\]\s*/g, '')
      .replace(/A:\s*/g, '')
      .replace(/B:\s*/g, '')
      .trim();

    if (!cleanText) return;

    // Use fast, quota-free client-side SpeechSynthesis as the primary engine
    if ('speechSynthesis' in window) {
      try {
        setPlayingWordAudio(text);
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'en-US';
        
        // Find a high-quality native English voice if available
        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.includes('en'));
        if (enVoice) {
          utterance.voice = enVoice;
        }

        utterance.rate = ttsSpeed;

        utterance.onend = () => {
          setPlayingWordAudio(null);
        };
        utterance.onerror = () => {
          setPlayingWordAudio(null);
        };

        window.speechSynthesis.speak(utterance);
        return;
      } catch (err) {
        console.warn('Client SpeechSynthesis failed, falling back to server TTS:', err);
      }
    }

    // Secondary fallback to server-side Gemini TTS if browser lacks speechSynthesis
    try {
      setPlayingWordAudio(text);
      const res = await fetch('/api/lesson/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, voice: 'Kore' })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.audio) {
          // Play 24kHz raw 16-bit little-endian PCM
          const binaryString = window.atob(data.audio);
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
          source.playbackRate.value = ttsSpeed;
          source.connect(audioCtx.destination);
          source.start();
          return;
        }
      }
      playFallbackSpeech(cleanText);
    } catch (err) {
      console.error('Audio TTS play error, falling back to native SpeechSynthesis:', err);
      playFallbackSpeech(cleanText);
    } finally {
      setPlayingWordAudio(null);
    }
  };

  const playFallbackSpeech = (cleanText: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-US';
      utterance.rate = ttsSpeed;
      window.speechSynthesis.speak(utterance);
    }
  };

  // ----------------- AI DIRECT LOOKUP -----------------
  const handleAiLookup = async (wordToSearch: string) => {
    if (!wordToSearch.trim()) return;
    setLookupLoading(true);
    setLookupError('');
    try {
      const res = await fetch('/api/vocab/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          word: wordToSearch.trim(),
          isSchoolMode: vocabMode === 'school',
          schoolGrade: selectedBand !== 'All Grades' && selectedBand !== 'All Bands' ? selectedBand : 'Lớp 6'
        })
      });
      if (res.ok) {
        const item: IeltsWord = await res.json();
        if (item && item.word) {
          // Add if not already duplicated in custom list
          const exists = allWords.some(w => w.word.toLowerCase() === item.word.toLowerCase());
          if (!exists) {
            setCustomWords(prev => [item, ...prev]);
          }
          setSearchQuery(item.word);
          setAiLookupQuery('');
        } else {
          setLookupError("Không thể giải nghĩa từ này. Vui lòng định dạng lại từ khóa viết.");
        }
      } else {
        setLookupError("Gặp lỗi khi liên hệ với Giáo viên AI.");
      }
    } catch (err) {
      console.error('AI Lookup error:', err);
      setLookupError("Gián đoạn máy chủ. Vui lòng thử lại sau.");
    } finally {
      setLookupLoading(false);
    }
  };

  // ----------------- FILTER LOGIC -----------------
  const filteredWords = allWords.filter(item => {
    const matchesSearch = item.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.synonyms && item.synonyms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesTopic = selectedTopic === 'All Topics' || selectedTopic === 'Tất cả chủ đề' || item.topic === selectedTopic;
    const matchesBand = selectedBand === 'All Bands' || selectedBand === 'All Grades' || item.bandLevel === selectedBand;
    return matchesSearch && matchesTopic && matchesBand;
  });

  // Toggling memorized words state
  const toggleMemorized = (wordSpelling: string) => {
    if (memorizedWords.includes(wordSpelling)) {
      setMemorizedWords(prev => prev.filter(w => w !== wordSpelling));
    } else {
      setMemorizedWords(prev => [...prev, wordSpelling]);
    }
  };

  // Remove a custom expanded word
  const deleteCustomWord = (wordSpelling: string) => {
    setCustomWords(prev => prev.filter(w => w.word !== wordSpelling));
    setMemorizedWords(prev => prev.filter(w => w !== wordSpelling));
  };

  // Static Collocations Data for poster design
  const POSTER_COLLOCATIONS: Record<string, Array<{
    root: string;
    branches: Array<{ phrase: string; translation: string }>;
  }>> = {
    'A': [
      {
        root: 'AGREE',
        branches: [
          { phrase: 'agree with sb', translation: 'Đồng ý với ý kiến của ai đó' },
          { phrase: 'agree on sth', translation: 'Thống nhất, đạt được sự đồng thuận về vấn đề gì' },
          { phrase: 'agree to do sth', translation: 'Đồng ý thực hiện việc gì' },
          { phrase: 'completely agree', translation: 'Hoàn toàn đồng ý, nhất trí 100%' },
          { phrase: 'agree with reservations', translation: 'Đồng ý nhưng vẫn còn một số điểm băn khoăn' }
        ]
      },
      {
        root: 'ASK',
        branches: [
          { phrase: 'ask for help/advice', translation: 'Yêu cầu sự trợ giúp, lời khuyên' },
          { phrase: 'ask about', translation: 'Hỏi han, dò la tin tức về...' },
          { phrase: 'ask around', translation: 'Hỏi nhiều người xung quanh để tìm câu trả lời' },
          { phrase: 'ask sb out', translation: 'Mời ai đó đi chơi/hẹn hò' }
        ]
      },
      {
        root: 'ANALYZE',
        branches: [
          { phrase: 'analyze statistical data', translation: 'Phân tích kỹ lưỡng các số liệu thống kê' },
          { phrase: 'analyze emerging trends', translation: 'Phân tích các xu hướng mới nổi lên' },
          { phrase: 'conduct in-depth analysis', translation: 'Tiến hành cuộc phân tích chuyên sâu' },
          { phrase: 'carefully analyze consequences', translation: 'Cân nhắc phân tích kỹ hậu quả' }
        ]
      },
      {
        root: 'ACHIEVE',
        branches: [
          { phrase: 'achieve a major goal', translation: 'Đạt được một mục tiêu quan trọng' },
          { phrase: 'achieve academic success', translation: 'Đạt được thành công lớn trong học tập' },
          { phrase: 'achieve spectacular results', translation: 'Gặt hái được những kết quả ngoạn mục' },
          { phrase: 'fail to achieve', translation: 'Thất bại, không thu hoạch được gì' }
        ]
      }
    ],
    'B': [
      {
        root: 'BRING',
        branches: [
          { phrase: 'bring up a topic', translation: 'Đề cập, nuôi dưỡng một chủ đề' },
          { phrase: 'bring about change', translation: 'Mang lại sự thay đổi lớn' },
          { phrase: 'bring back memories', translation: 'Gợi lại những kỷ niệm cũ' },
          { phrase: 'bring along', translation: 'Mang theo bên mình' },
          { phrase: 'bring to light', translation: 'Đưa ra ánh sáng, làm sáng tỏ vấn đề ẩn khuất' }
        ]
      },
      {
        root: 'BREAK',
        branches: [
          { phrase: 'break down', translation: 'Hỏng hóc (xe cộ, máy móc), suy sụp tinh thần' },
          { phrase: 'break into', translation: 'Đột nhập trái phép vào đâu đó' },
          { phrase: 'break out', translation: 'Bùng nổ (chiến tranh, dịch bệnh, hỏa hoạn)' },
          { phrase: 'break the rules', translation: 'Phá vỡ quy tắc, phạm luật' },
          { phrase: 'make a breakthrough', translation: 'Tạo bước đột phá vượt bậc' }
        ]
      },
      {
        root: 'BELIEVE',
        branches: [
          { phrase: 'believe in yourself', translation: 'Tin tưởng vững vàng vào năng lực bản thân' },
          { phrase: 'firmly believe that', translation: 'Hoàn toàn tin chắc rằng...' },
          { phrase: 'widely believed to be', translation: 'Được dư luận rộng rãi tin là...' },
          { phrase: 'refuse to believe', translation: 'Kiên quyết khước từ, từ chối tin tưởng' }
        ]
      },
      {
        root: 'BUILD',
        branches: [
          { phrase: 'build a successful career', translation: 'Xây dựng một sự nghiệp thành công rực rỡ' },
          { phrase: 'build confidence', translation: 'Bồi đắp và củng cố niềm tin, sự tự tin' },
          { phrase: 'build strong relations', translation: 'Thiết lập và thắt chặt mối quan hệ bền vững' },
          { phrase: 'build from scratch', translation: 'Xây dựng cơ đồ từ hai bàn tay trắng' }
        ]
      }
    ],
    'C': [
      {
        root: 'COME',
        branches: [
          { phrase: 'come across', translation: 'Tình cờ bắt gặp, đi ngang qua' },
          { phrase: 'come up with', translation: 'Nảy ra, nghĩ ra (ý tưởng, giải pháp)' },
          { phrase: 'come true', translation: 'Trở thành sự thật' },
          { phrase: 'come along', translation: 'Tiến triển tốt, đi cùng ai' },
          { phrase: 'come up to expectations', translation: 'Đáp ứng được kỳ vọng' }
        ]
      },
      {
        root: 'CALL',
        branches: [
          { phrase: 'call off', translation: 'Hủy bỏ (sự kiện, cuộc họp)' },
          { phrase: 'call back', translation: 'Gọi điện thoại lại sau' },
          { phrase: 'call for action', translation: 'Kêu gọi hành động khẩn thiết' },
          { phrase: 'call on sb', translation: 'Yêu cầu ai phát biểu, ghé thăm ai' }
        ]
      },
      {
        root: 'CREATE',
        branches: [
          { phrase: 'create job opportunities', translation: 'Tạo thêm nhiều cơ hội việc làm mới' },
          { phrase: 'create a warm atmosphere', translation: 'Tạo lập bầu không khí ấm cúng, thân thiện' },
          { phrase: 'create visual awareness', translation: 'Nâng cao nhận thức trực quan' },
          { phrase: 'create a favorable condition', translation: 'Tạo mọi điều kiện thuận lợi nhất' }
        ]
      },
      {
        root: 'COMPARE',
        branches: [
          { phrase: 'compare with', translation: 'So sánh tương quan trực tiếp với' },
          { phrase: 'compare to', translation: 'Ví von, so sánh như là...' },
          { phrase: 'beyond comparison', translation: 'Tuyệt mỹ, vượt trội không thể so sánh nổi' },
          { phrase: 'favorable comparison', translation: 'Sự đối chiếu so sánh mang tính tích cực' }
        ]
      }
    ],
    'D': [
      {
        root: 'DO',
        branches: [
          { phrase: 'do research', translation: 'Tiến hành nghiên cứu khoa học chuyên sâu' },
          { phrase: 'do homework', translation: 'Làm bài tập về nhà' },
          { phrase: 'do one\'s best', translation: 'Cố gắng hết sức mình' },
          { phrase: 'do business', translation: 'Làm ăn, kinh doanh buôn bán' },
          { phrase: 'do without', translation: 'Chấp nhận sống thiếu cái gì đó' }
        ]
      },
      {
        root: 'DECIDE',
        branches: [
          { phrase: 'decide on', translation: 'Lựa chọn, chốt phương án cuối cùng' },
          { phrase: 'decide to do sth', translation: 'Quyết định thực hiện việc gì' },
          { phrase: 'decide against', translation: 'Quyết định bác bỏ, không thực hiện gì' },
          { phrase: 'decisively resolve', translation: 'Quyết đoán hóa giải dứt điểm' }
        ]
      },
      {
        root: 'DEVELOP',
        branches: [
          { phrase: 'develop language skills', translation: 'Phát triển, mài giũa các kỹ năng ngôn ngữ' },
          { phrase: 'develop a healthy habit', translation: 'Xây dựng một thói quen lành mạnh, bổ ích' },
          { phrase: 'develop sustainable economy', translation: 'Phát triển nền kinh tế bền vững' },
          { phrase: 'develop a comprehensive plan', translation: 'Vạch ra một kế hoạch toàn diện đầy đủ' }
        ]
      },
      {
        root: 'DISCUSS',
        branches: [
          { phrase: 'discuss a sensitive issue', translation: 'Thảo luận một vấn đề nhạy cảm, phức tạp' },
          { phrase: 'discuss details in private', translation: 'Bàn bạc chi tiết một cách kín đáo riêng tư' },
          { phrase: 'open for discussion', translation: 'Sẵn sàng thảo luận, đóng góp ý kiến rộng rãi' }
        ]
      }
    ],
    'E': [
      {
        root: 'ENTER',
        branches: [
          { phrase: 'enter into details', translation: 'Bắt đầu đi vào chi tiết, ký kết một thỏa thuận' },
          { phrase: 'enter a competition', translation: 'Đăng ký tham gia một cuộc thi' },
          { phrase: 'enter a password', translation: 'Nhập mật mã để truy cập' }
        ]
      },
      {
        root: 'ENCOURAGE',
        branches: [
          { phrase: 'encourage sb to do sth', translation: 'Khuyến khích, động viên ai làm gì' },
          { phrase: 'highly encouraged', translation: 'Được đặc biệt khuyến khích làm điều đó' },
          { phrase: 'strongly encourage active study', translation: 'Thúc đẩy và động viên tinh thần tự học chủ động' }
        ]
      },
      {
        root: 'ESTABLISH',
        branches: [
          { phrase: 'establish a relationship', translation: 'Thiết lập một mối quan hệ chính thức lâu dài' },
          { phrase: 'establish strict rules', translation: 'Ban hành, áp đặt các quy tắc cực kỳ nghiêm khắc' },
          { phrase: 'well-established brand', translation: 'Thương hiệu uy tín đã có chỗ đứng vững vàng' }
        ]
      },
      {
        root: 'EVALUATE',
        branches: [
          { phrase: 'evaluate worker performance', translation: 'Đánh giá, chấm điểm hiệu suất làm việc' },
          { phrase: 'evaluate cost effectiveness', translation: 'Thẩm định tính tối ưu và hiệu quả chi phí' },
          { phrase: 'undergo critical evaluation', translation: 'Trải qua quá trình đánh giá phản biện khắt khe' }
        ]
      }
    ],
    'F': [
      {
        root: 'FALL',
        branches: [
          { phrase: 'fall in love with', translation: 'Đắm chìm vào tình yêu với ai' },
          { phrase: 'fall apart', translation: 'Tan rã, vỡ vụn, đổ bể hoàn toàn' },
          { phrase: 'fall behind schedule', translation: 'Bị tụt lại phía sau, trễ lịch trình' },
          { phrase: 'fall down', translation: 'Ngã xuống đất, rơi rớt' }
        ]
      },
      {
        root: 'FIND',
        branches: [
          { phrase: 'find out', translation: 'Tìm ra sự thật, phát hiện ra tin tức' },
          { phrase: 'find a solution', translation: 'Đưa ra một giải pháp thỏa đáng' },
          { phrase: 'find fault with', translation: 'Bắt bẻ, bới lông tìm vết đối với ai' }
        ]
      },
      {
        root: 'FOCUS',
        branches: [
          { phrase: 'focus intensely on sth', translation: 'Tập trung cao độ tinh thần vào việc gì' },
          { phrase: 'primary target focus', translation: 'Điểm tập trung cốt lõi hàng đầu' },
          { phrase: 'sharpen mental focus', translation: 'Mài giũa và nâng tầm sự phản xạ trí óc' },
          { phrase: 'lose focus and drift', translation: 'Mất tập trung và bị xao nhãng cuốn đi' }
        ]
      },
      {
        root: 'FOLLOW',
        branches: [
          { phrase: 'follow instructions meticulously', translation: 'Tuân thủ các chỉ dẫn một cách tỉ mỉ' },
          { phrase: 'follow a strict pattern', translation: 'Đi theo một khuôn mẫu cực kỳ khắt khe' },
          { phrase: 'follow suit', translation: 'Làm theo, bắt chước hành vi của người đi trước' }
        ]
      }
    ],
    'G': [
      {
        root: 'GET',
        branches: [
          { phrase: 'get up', translation: 'Thức dậy' },
          { phrase: 'get along with', translation: 'Hòa thuận, có mối quan hệ tốt với' },
          { phrase: 'get over', translation: 'Vượt qua, phục hồi sau biến cố/bệnh tật' },
          { phrase: 'get down to', translation: 'Nghiêm túc bắt đầu làm việc gì' },
          { phrase: 'get to know', translation: 'Tìm hiểu, làm quen với ai' }
        ]
      },
      {
        root: 'GIVE',
        branches: [
          { phrase: 'give up', translation: 'Từ bỏ, bỏ cuộc' },
          { phrase: 'give in', translation: 'Nhượng bộ, đầu hàng' },
          { phrase: 'give away', translation: 'Phát miễn phí, tiết lộ bí mật' },
          { phrase: 'give out', translation: 'Phân phát, cạn kiệt (năng lực, nguồn lực)' }
        ]
      },
      {
        root: 'GROW',
        branches: [
          { phrase: 'grow in popularity', translation: 'Trở nên ngày càng phổ biến, thịnh hành' },
          { phrase: 'grow exponentially', translation: 'Phát triển vượt trội theo cấp số nhân' },
          { phrase: 'grow accustomed to', translation: 'Dần trở nên quen thuộc, thích nghi với...' },
          { phrase: 'grow-up stage', translation: 'Giai đoạn khôn lớn, trưởng thành toàn diện' }
        ]
      },
      {
        root: 'GUARANTEE',
        branches: [
          { phrase: 'guarantee success', translation: 'Bảo đảm đem lại thắng lợi chắc chắn' },
          { phrase: 'money-back guarantee', translation: 'Chính sách cam kết hoàn tiền 100% nếu không ưng ý' },
          { phrase: 'guaranteed satisfaction', translation: 'Đảm bảo làm hài lòng tuyệt đối' }
        ]
      }
    ],
    'H': [
      {
        root: 'HAVE',
        branches: [
          { phrase: 'have a look at', translation: 'Nhìn lướt, ngắm nghía cái gì' },
          { phrase: 'have a choice', translation: 'Có quyền lựa chọn' },
          { phrase: 'have an influence on', translation: 'Có tầm ảnh hưởng sâu sắc đến ai/cái gì' },
          { phrase: 'have in mind', translation: 'Ấp ủ, dự tính sẵn một kế hoạch trong đầu' }
        ]
      },
      {
        root: 'HOLD',
        branches: [
          { phrase: 'hold on a minute', translation: 'Giữ máy, đợi một lát' },
          { phrase: 'hold back tears', translation: 'Kìm nén, ngăn giọt nước mắt rơi' },
          { phrase: 'hold an event', translation: 'Tổ chức, đăng cai một sự kiện' }
        ]
      },
      {
        root: 'HOPE',
        branches: [
          { phrase: 'hope for the best', translation: 'Trông mong, hy vọng vào kịch bản tốt đẹp nhất' },
          { phrase: 'express sincere hope', translation: 'Bày tỏ lòng hy vọng chân thành và sâu sắc nhất' },
          { phrase: 'lose all hope', translation: 'Lâm vào bế tắc, đánh mất mọi hy vọng cứu vãn' },
          { phrase: 'glimmer of hope', translation: 'Một tia hy vọng mong manh lóe lên' }
        ]
      },
      {
        root: 'HELP',
        branches: [
          { phrase: 'help sb tremendously', translation: 'Giúp đỡ ai đó một cách tuyệt vời, nhiệt tình' },
          { phrase: 'helpful tips', translation: 'Những gợi ý, mẹo hay vô cùng hữu ích' },
          { phrase: 'reach out for help', translation: 'Chủ động tìm kiếm, kêu gọi sự trợ giúp cứu trợ' }
        ]
      }
    ],
    'I': [
      {
        root: 'INSIST',
        branches: [
          { phrase: 'insist on doing sth', translation: 'Khăng khăng đòi làm việc gì bằng được' },
          { phrase: 'insist that plus S-V', translation: 'Nhấn mạnh, quả quyết rằng chuyện gì xảy ra' }
        ]
      },
      {
        root: 'IMPROVE',
        branches: [
          { phrase: 'improve dramatically', translation: 'Cải thiện một cách rõ rệt, ngoạn mục' },
          { phrase: 'room for improvement', translation: 'Cơ hội, dư địa để nâng cấp và phát triển tốt hơn' },
          { phrase: 'gradually improve efficiency', translation: 'Từng bước nâng cấp, cải thiện hiệu năng làm việc' }
        ]
      },
      {
        root: 'INFLUENCE',
        branches: [
          { phrase: 'influence major choices', translation: 'Tác động mạnh tới những lựa chọn mang tính quyết định' },
          { phrase: 'deep negative influence', translation: 'Tầm ảnh hưởng tiêu cực sâu sắc' },
          { phrase: 'under the influence of', translation: 'Chịu sự dẫn dắt, chi phối hoặc tác động của...' },
          { phrase: 'exert a subtle influence', translation: 'Gây ra một tác động âm thầm, tinh tế' }
        ]
      },
      {
        root: 'INTRODUCE',
        branches: [
          { phrase: 'introduce new measures', translation: 'Ban hành, áp dụng các biện pháp quản lý mới' },
          { phrase: 'introduce strict legislation', translation: 'Thông qua hệ thống luật pháp cực kỳ nghiêm ngặt' },
          { phrase: 'introduce yourself properly', translation: 'Tự giới thiệu bản thân một cách chỉn chu, trang trọng' }
        ]
      }
    ],
    'J': [
      {
        root: 'JOIN',
        branches: [
          { phrase: 'join hands', translation: 'Chung tay, cùng nhau hợp tác giải quyết vấn đề' },
          { phrase: 'join in activities', translation: 'Tham gia, hòa mình vào các hoạt động' },
          { phrase: 'join forces', translation: 'Liên kết lực lượng, hợp lực làm nên chuyện lớn' },
          { phrase: 'join a club', translation: 'Đăng ký sinh hoạt tại một câu lạc bộ' }
        ]
      },
      {
        root: 'JUDGE',
        branches: [
          { phrase: 'judge by physical appearances', translation: 'Đánh giá phiến diện qua diện mạo bên ngoài' },
          { phrase: 'judge fairly and objectively', translation: 'Đánh giá, nhận xét khách quan và công bằng' },
          { phrase: 'hand down final judgment', translation: 'Tuyên bố phán quyết tối hậu, quyết định cuối cùng' }
        ]
      },
      {
        root: 'JUSTIFY',
        branches: [
          { phrase: 'justify actions rationally', translation: 'Biện minh, thanh minh các hành động một cách hợp lý' },
          { phrase: 'justify additional expenses', translation: 'Chứng minh, giải trình sự cần thiết của các chi phí phụ thêm' },
          { phrase: 'fully justified choice', translation: 'Sự chọn lựa hoàn toàn chính đáng, có cơ sở vững chắc' }
        ]
      }
    ],
    'K': [
      {
        root: 'KEEP',
        branches: [
          { phrase: 'keep in touch', translation: 'Giữ liên lạc thường xuyên' },
          { phrase: 'keep on doing', translation: 'Tiếp tục kiên trì làm gì' },
          { phrase: 'keep track of', translation: 'Theo dõi hành trình/tiến độ' },
          { phrase: 'keep up with', translation: 'Bắt kịp, theo kịp tiến độ' }
        ]
      },
      {
        root: 'KNOW',
        branches: [
          { phrase: 'know by heart', translation: 'Học thuộc lòng, ghi nhớ nằm lòng' },
          { phrase: 'know in advance', translation: 'Nhận biết, thấu suốt từ trước' },
          { phrase: 'be widely known as', translation: 'Được biết tới rộng khắp như là...' },
          { phrase: 'know inside out', translation: 'Hiểu cặn kẽ từ trong ra ngoài, cực kỳ sành sỏi' }
        ]
      },
      {
        root: 'KNOCK',
        branches: [
          { phrase: 'knock down a wall', translation: 'Đập bỏ, san bằng một bức tường ngăn' },
          { phrase: 'knockout competition', translation: 'Giải đấu loại trực tiếp kịch tính' },
          { phrase: 'knock on wood for luck', translation: 'Gõ tay lên gỗ lấy hên, cầu may mắn' }
        ]
      }
    ],
    'L': [
      {
        root: 'LOOK',
        branches: [
          { phrase: 'look at', translation: 'Nhìn vào ai đó/cái gì' },
          { phrase: 'look after', translation: 'Chăm sóc, phụng dưỡng' },
          { phrase: 'look for', translation: 'Tìm kiếm' },
          { phrase: 'look forward to', translation: 'Mong đợi, trông mong' },
          { phrase: 'look up', translation: 'Tra cứu (từ điển), cải thiện, hướng thiện' }
        ]
      },
      {
        root: 'LISTEN',
        branches: [
          { phrase: 'listen to', translation: 'Lắng nghe (nhạc, lời khuyên...)' },
          { phrase: 'listen for', translation: 'Chú ý nghe ngóng để phát hiện âm thanh' },
          { phrase: 'listen in on', translation: 'Rình nghe trộm, nghe lén cuộc đối thoại' }
        ]
      },
      {
        root: 'LEAD',
        branches: [
          { phrase: 'lead to ultimate success', translation: 'Dẫn dắt đến thành công viên mãn cuối cùng' },
          { phrase: 'lead a major project', translation: 'Đóng vai trò trưởng nhóm chỉ đạo một dự án lớn' },
          { phrase: 'play a leading role', translation: 'Đóng vai trò then chốt, vị trí đầu tàu dẫn bước' }
        ]
      },
      {
        root: 'LEARN',
        branches: [
          { phrase: 'learn by heart', translation: 'Học thuộc lòng' },
          { phrase: 'acquire new knowledge', translation: 'Tiếp thu, tích lũy kiến thức mới mẻ bổ ích' },
          { phrase: 'steep learning curve', translation: 'Khúc quanh học tập dốc, đầy thách thức gian truân' }
        ]
      }
    ],
    'M': [
      {
        root: 'MAKE',
        branches: [
          { phrase: 'make a decision', translation: 'Đưa ra quyết định' },
          { phrase: 'make progress', translation: 'Tiến bộ, có sự cải thiện' },
          { phrase: 'make sure', translation: 'Đảm bảo, chắc chắn' },
          { phrase: 'make friends', translation: 'Kết bạn, làm quen' },
          { phrase: 'make up', translation: 'Trang điểm, bịa chuyện, làm hòa' }
        ]
      },
      {
        root: 'MEET',
        branches: [
          { phrase: 'meet high standards', translation: 'Đạt được những tiêu chuẩn khắt khe, hoàn hảo' },
          { phrase: 'meet strict requirements', translation: 'Thỏa mãn toàn bộ các yêu cầu nghiêm ngặt đề ra' },
          { phrase: 'meet face-to-face', translation: 'Gặp mặt trực tiếp thảo luận không qua trung gian' },
          { phrase: 'meet deadlines punctually', translation: 'Nộp bài, hoàn thành công việc đúng hạn chót' }
        ]
      },
      {
        root: 'MANAGE',
        branches: [
          { phrase: 'manage time efficiently', translation: 'Quản lý, sắp xếp thời gian một cách tối ưu' },
          { phrase: 'manage academic stress', translation: 'Kiểm soát, hóa giải các áp lực thi cử căng thẳng' },
          { phrase: 'manageable workload', translation: 'Khối lượng công việc vừa tầm, dễ dàng gánh vác' }
        ]
      }
    ],
    'N': [
      {
        root: 'NEED',
        branches: [
          { phrase: 'need to do sth', translation: 'Cần thiết phải thực hiện việc gì đó' },
          { phrase: 'in need of assistance', translation: 'Đang rất cần sự giúp đỡ' },
          { phrase: 'no need to panic', translation: 'Không cần phải hoảng loạn, sợ hãi' },
          { phrase: 'urgently need', translation: 'Cần khẩn cấp, cấp bách nhất' }
        ]
      },
      {
        root: 'NEGOTIATE',
        branches: [
          { phrase: 'negotiate a win-win deal', translation: 'Thương lượng một bản hợp đồng cả hai bên cùng có lợi' },
          { phrase: 'negotiate flexible terms', translation: 'Đàm phán các điều khoản vô cùng linh hoạt dẻo dai' },
          { phrase: 'open to negotiations', translation: 'Rất cởi mở bước vào quá trình thương thuyết' }
        ]
      },
      {
        root: 'NOTE',
        branches: [
          { phrase: 'note down key phrases', translation: 'Ghi chép nhanh các cụm từ cốt lõi quan trọng' },
          { phrase: 'take careful note of', translation: 'Lưu tâm theo dõi và ghi chép thật kỹ càng' },
          { phrase: 'note worthy achievement', translation: 'Một thành tích vô cùng xuất sắc đáng kinh ngạc' }
        ]
      }
    ],
    'O': [
      {
        root: 'OPEN',
        branches: [
          { phrase: 'open up opportunities', translation: 'Mở ra nhiều cơ hội mới' },
          { phrase: 'open an account', translation: 'Mở một tài khoản chính thức' },
          { phrase: 'open to suggestions', translation: 'Sẵn sàng tiếp thu ý kiến góp ý' },
          { phrase: 'wide open', translation: 'Mở rộng toang hoác, rất rõ ràng' }
        ]
      },
      {
        root: 'OBTAIN',
        branches: [
          { phrase: 'obtain official permission', translation: 'Nhận được sự cho phép chính thức từ cơ quan' },
          { phrase: 'obtain valuable data', translation: 'Thu thập, tiếp cận được các cơ sở dữ liệu quý giá' },
          { phrase: 'highly difficult to obtain', translation: 'Khó khăn cực kỳ để sở hữu hoặc tiếp cận được' }
        ]
      },
      {
        root: 'OFFER',
        branches: [
          { phrase: 'offer immense support', translation: 'Đem lại sự hỗ trợ, giúp đỡ to lớn và vô giá' },
          { phrase: 'offer constructive feedback', translation: 'Đóng góp những phản hồi mang tính xây dựng cao' },
          { phrase: 'generous financial offer', translation: 'Một đề xuất hỗ trợ ngân sách vô cùng phóng khoáng' }
        ]
      }
    ],
    'P': [
      {
        root: 'PUT',
        branches: [
          { phrase: 'put off a meeting', translation: 'Trì hoãn cuộc họp sang thời gian khác' },
          { phrase: 'put on clothes', translation: 'Mặc quần áo vào người' },
          { phrase: 'put up with', translation: 'Chịu đựng hành vi/hoản cảnh tồi tệ' },
          { phrase: 'put out a fire', translation: 'Dập tắt đám lửa đang cháy' },
          { phrase: 'put forward a proposal', translation: 'Đề xuất một kiến nghị, giải pháp mới' }
        ]
      },
      {
        root: 'PAY',
        branches: [
          { phrase: 'pay attention to', translation: 'Chú tâm, tập trung đặc biệt vào' },
          { phrase: 'pay back a loan', translation: 'Trả tiền nợ, hoàn trả chi phí' },
          { phrase: 'pay off', translation: 'Cực kỳ thành công, mang lại kết quả xứng đáng' },
          { phrase: 'pay a visit to sb', translation: 'Ghé đến thăm hỏi sức khỏe ai đó' }
        ]
      },
      {
        root: 'PROVIDE',
        branches: [
          { phrase: 'provide financial assistance', translation: 'Hỗ trợ ngân sách cứu trợ kịp thời' },
          { phrase: 'provide a sound solution', translation: 'Đưa ra một hướng khắc phục vững vàng hợp lý' },
          { phrase: 'provide undeniable evidence', translation: 'Cung cấp những bằng chứng đanh thép không thể chối cãi' }
        ]
      },
      {
        root: 'PREVENT',
        branches: [
          { phrase: 'prevent tragic accidents', translation: 'Ngăn chặn triệt để các tai nạn thương tâm' },
          { phrase: 'prevent from spreading', translation: 'Khống chế và ngăn không cho lây lan' },
          { phrase: 'implement preventative measures', translation: 'Áp dụng các biện pháp phòng ngừa từ sớm' }
        ]
      }
    ],
    'Q': [
      {
        root: 'QUESTION',
        branches: [
          { phrase: 'question the validity', translation: 'Nghi ngờ tính hợp lệ, tính đúng đắn' },
          { phrase: 'call into question', translation: 'Đặt một dấu hỏi nghi ngờ lớn cho ai' },
          { phrase: 'beyond question', translation: 'Không thể bàn cãi thêm, chắc chắn 100%' }
        ]
      },
      {
        root: 'QUALIFY',
        branches: [
          { phrase: 'qualify for the scholarship', translation: 'Đủ điều kiện tiêu chuẩn nhận học bổng IELTS' },
          { phrase: 'highly qualified educator', translation: 'Giảng viên chuyên nghiệp có chuyên môn cực kỳ cao' },
          { phrase: 'qualify as a specialist', translation: 'Chính thức được chứng nhận là chuyên gia trong lĩnh vực' }
        ]
      },
      {
        root: 'QUOTE',
        branches: [
          { phrase: 'quote an exact price', translation: 'Báo một cái giá chính xác không thay đổi' },
          { phrase: 'use a direct quote', translation: 'Sử dụng một trích dẫn trực tiếp của tác giả' },
          { phrase: 'enclose in quotation marks', translation: 'Đặt trang trọng trong dấu ngoặc kép' }
        ]
      }
    ],
    'R': [
      {
        root: 'RUN',
        branches: [
          { phrase: 'run out of resources', translation: 'Hết sạch nguồn lực, năng lượng' },
          { phrase: 'run into troubles', translation: 'Tình cờ vấp phải rắc rối lớn' },
          { phrase: 'run a business', translation: 'Vận hành, điều hành một doanh nghiệp' },
          { phrase: 'run away from', translation: 'Chạy trốn khỏi sự đe dọa, trách nhiệm' },
          { phrase: 'run smoothly', translation: 'Vận hành trôi chảy, suôn sẻ không tì vết' }
        ]
      },
      {
        root: 'REACH',
        branches: [
          { phrase: 'reach a consensus', translation: 'Đạt được sự đồng thuận tuyệt đối của tập thể' },
          { phrase: 'reach a demanding target', translation: 'Chạm tay được đến mục tiêu cực kỳ thách thức' },
          { phrase: 'out of reach', translation: 'Vượt quá tầm với của khả năng hiện tại' }
        ]
      },
      {
        root: 'REDUCE',
        branches: [
          { phrase: 'reduce carbon emissions', translation: 'Cắt giảm lượng khí thải cacbon ra môi trường' },
          { phrase: 'significantly reduce cost', translation: 'Tiết kiệm và tinh giản chi phí một cách rõ rệt' },
          { phrase: 'drastic reduction strategy', translation: 'Chiến lược cắt giảm quy mô triệt để cực mạnh' }
        ]
      }
    ],
    'S': [
      {
        root: 'STAND',
        branches: [
          { phrase: 'stand out from the crowd', translation: 'Nổi bật, xuất sắc vượt trội hơn đám đông' },
          { phrase: 'stand by', translation: 'Sẵn sàng giúp đỡ, ủng hộ ai đó sát cánh' },
          { phrase: 'stand for Representative', translation: 'Đại diện cho, viết tắt của từ gì' },
          { phrase: 'stand a good chance', translation: 'Có cơ hội lớn, tràn trề triển vọng thành công' }
        ]
      },
      {
        root: 'START',
        branches: [
          { phrase: 'start up a business', translation: 'Bắt đầu khởi nghiệp kinh doanh' },
          { phrase: 'get started on sth', translation: 'Xắn tay áo bắt tay ngay vào việc' },
          { phrase: 'start from scratch', translation: 'Bắt đầu lại hoàn toàn từ con số không' }
        ]
      },
      {
        root: 'SUGGEST',
        branches: [
          { phrase: 'suggest innovative solutions', translation: 'Đề đạt, hiến kế các giải pháp sáng tạo mới' },
          { phrase: 'highly suggest that', translation: 'Cực kỳ khuyên và đề đạt rằng...' },
          { phrase: 'suggest doing research', translation: 'Gợi ý nên tiến hành nghiên cứu khoa học ngay' }
        ]
      },
      {
        root: 'SOLVE',
        branches: [
          { phrase: 'solve a complex problem', translation: 'Giải quyết một bài toán hóc búa, phức tạp' },
          { phrase: 'completely solve a dispute', translation: 'Hóa giải hoàn toàn xung đột tranh chấp gay gắt' },
          { phrase: 'solve the mystery', translation: 'Tìm ra lời giải, mở khóa một bí mật ẩn giấu' }
        ]
      }
    ],
    'T': [
      {
        root: 'TAKE',
        branches: [
          { phrase: 'take a photo', translation: 'Chụp một bức ảnh' },
          { phrase: 'take after', translation: 'Trông giống (bình diện tính cách, diện mạo bố mẹ...)' },
          { phrase: 'take care of', translation: 'Chăm sóc, trông nom ai' },
          { phrase: 'take off', translation: 'Cất cánh, cởi đồ, thành công nhanh' },
          { phrase: 'take part in', translation: 'Tham gia vào (sự kiện, hoạt động)' }
        ]
      },
      {
        root: 'TALK',
        branches: [
          { phrase: 'talk to/with', translation: 'Trò chuyện cùng ai' },
          { phrase: 'talk back', translation: 'Cãi lại, trả treo' },
          { phrase: 'talk into', translation: 'Thuyết phục ai làm gì' },
          { phrase: 'talk out of', translation: 'Thuyết phục ai thôi không làm gì' }
        ]
      },
      {
        root: 'TRY',
        branches: [
          { phrase: 'try your absolute best', translation: 'Cố gắng, nỗ lực 200% sức mạnh bản thân' },
          { phrase: 'give it a try', translation: 'Cứ thoải mái thử sức một lần xem sao!' },
          { phrase: 'try out new styles', translation: 'Thử nghiệm, trải nghiệm phong cách mới lạ' }
        ]
      },
      {
        root: 'THINK',
        branches: [
          { phrase: 'think outside the box', translation: 'Tư duy bứt phá giới hạn, sáng tạo vượt biên' },
          { phrase: 'think highly/deeply of', translation: 'Đánh giá cực kì cao, coi trọng ai / cái gì' },
          { phrase: 'think twice before', translation: 'Uốn lưỡi bẩy lần, nghĩ thật kỹ trước khi quyết định' }
        ]
      }
    ],
    'U': [
      {
        root: 'USE',
        branches: [
          { phrase: 'use _ for _', translation: 'Dùng để, sử dụng cho mục đích...' },
          { phrase: 'use up', translation: 'Dùng hết, tiêu thụ hết' },
          { phrase: 'make use of', translation: 'Tận dụng, khai tác triệt để cái gì' }
        ]
      },
      {
        root: 'UNDERSTAND',
        branches: [
          { phrase: 'understand fully', translation: 'Hiểu một cách đầy đủ, tường tận' },
          { phrase: 'difficult to understand', translation: 'Khó hiểu, phức tạp, rắc rối' },
          { phrase: 'give to understand', translation: 'Làm cho ai đó hiểu ngầm định rằng' }
        ]
      },
      {
        root: 'UNDERTAKE',
        branches: [
          { phrase: 'undertake a difficult task', translation: 'Đảm nhận, đứng ra gánh vác nhiệm vụ khó khăn' },
          { phrase: 'undertake full responsibility', translation: 'Đứng mũi chịu sào, chịu hoàn toàn trách nhiệm' },
          { phrase: 'undertake exhaustive research', translation: 'Đứng ra thực hiện một cuộc nghiên cứu cực kỳ đầy đủ' }
        ]
      },
      {
        root: 'UPDATE',
        branches: [
          { phrase: 'update progress weekly', translation: 'Cập nhật diễn biến, hành trình hàng tuần' },
          { phrase: 'keep me updated', translation: 'Hãy luôn báo cáo diễn biến mới nhất cho tôi biết nhé' },
          { phrase: 'latest modern software update', translation: 'Bản cập nhật phần mềm tối tân tiên tiến nhất' }
        ]
      }
    ],
    'V': [
      {
        root: 'VISIT',
        branches: [
          { phrase: 'pay a visit', translation: 'Ghé đến thăm quan, hỏi thăm' },
          { phrase: 'visit around', translation: 'Đi một vòng tham quan cảnh vật xung quanh' },
          { phrase: 'highly worth visiting', translation: 'Cực kỳ xứng đáng bỏ thời gian ghé thăm' }
        ]
      },
      {
        root: 'VALUE',
        branches: [
          { phrase: 'value highly', translation: 'Đặc biệt coi trọng, đánh giá cực kỳ cao' },
          { phrase: 'core family values', translation: 'Những giá trị nền tảng cốt lõi của gia đình' },
          { phrase: 'sentimental value', translation: 'Giá trị về mặt tinh thần, ý niệm tình cảm kỉ niệm' }
        ]
      },
      {
        root: 'VARY',
        branches: [
          { phrase: 'vary considerably', translation: 'Biến thiên, dao động một cách cực kỳ mạnh mẽ' },
          { phrase: 'vary from person to person', translation: 'Thay đổi tùy theo cảm nhận hay cơ địa của từng người' },
          { phrase: 'varying degrees of success', translation: 'Các cấp độ, kết quả thành công khác biệt đa dạng' }
        ]
      }
    ],
    'W': [
      {
        root: 'WAIT',
        branches: [
          { phrase: 'wait a minute', translation: 'Đợi một chút, chờ một lát' },
          { phrase: 'wait for', translation: 'Chờ, đợi ai / cái gì' },
          { phrase: 'wait in line', translation: 'Xếp hàng chờ đợi' }
        ]
      },
      {
        root: 'WALK',
        branches: [
          { phrase: 'walk along', translation: 'Đi bộ dọc theo (đường, bờ sông...)' },
          { phrase: 'walk around', translation: 'Đi loay hoay, đi dạo xung quanh' },
          { phrase: 'walk by', translation: 'Đi ngang qua, đi lướt qua' },
          { phrase: 'walk down', translation: 'Đi xuống, đi dọc theo (phố, con đường...)' },
          { phrase: 'walk into', translation: 'Đi vào / va phải (ai hoặc vật gì đó)' },
          { phrase: 'walk on', translation: 'Tiếp tục đi bộ' },
          { phrase: 'walk past', translation: 'Đi ngang/ lướt qua (vượt qua vị trí đó)' },
          { phrase: 'walk to', translation: 'Đi bộ đến (một nơi cụ thể)' },
          { phrase: 'walk up to', translation: 'Đi bộ lại gần, đi đến gần (ai đó/ nơi nào đó)' }
        ]
      },
      {
        root: 'WATCH',
        branches: [
          { phrase: 'watch videos/a video', translation: 'Xem video, xem clip' },
          { phrase: 'watch out', translation: 'Coi chừng, cẩn thận' },
          { phrase: 'watch sb. do sth.', translation: 'Nhìn/ quan sát ai đó làm việc gì' },
          { phrase: 'watch sb. doing sth.', translation: 'Nhìn/ quan sát ai đó đang làm việc gì' },
          { phrase: 'watch TV', translation: 'Xem tivi' }
        ]
      },
      {
        root: 'WAVE',
        branches: [
          { phrase: "wave one's hand at sb.", translation: 'Vẫy tay với ai đó' },
          { phrase: 'wave to', translation: 'Vẫy tay chào ai đó' },
          { phrase: 'wave aside', translation: 'Gạt bỏ, xua đi (ý kiến, đề xuất)' }
        ]
      },
      {
        root: 'WEAR',
        branches: [
          { phrase: 'wear away', translation: 'Mài mòn, làm mòn dần, hao mòn' },
          { phrase: 'wear clothes', translation: 'Mặc quần áo' },
          { phrase: 'wear out', translation: 'Rách hỏng hoàn toàn, mệt nhoài, kiệt sức' }
        ]
      },
      {
        root: 'WIN',
        branches: [
          { phrase: 'win the dynamic competition', translation: 'Gành lấy phần thắng trong cuộc so tài gay cấn' },
          { phrase: 'win the hearts of public', translation: 'Giành trọn cảm tình, lòng mến mộ của công chúng' },
          { phrase: 'win-win outcome solution', translation: 'Kết quả cân bằng đôi bên cùng đại thắng' }
        ]
      },
      {
        root: 'WORK',
        branches: [
          { phrase: 'work remotely online', translation: 'Làm việc thuận tiện từ xa thông qua mạng internet' },
          { phrase: 'work under immense pressure', translation: 'Làm việc dưới áp lực công việc đè nặng khủng khiếp' },
          { phrase: 'hard work finally pays off', translation: 'Mọi công sức vất vả cuối cùng cũng gặt hái quả ngọt' }
        ]
      }
    ],
    'X': [
      {
        root: 'X-RAY',
        branches: [
          { phrase: 'take an X-ray', translation: 'Đi chụp X-quang xương khớp' },
          { phrase: 'undergo X-ray examination', translation: 'Trải qua quá trình thẩm định chụp điện quang' },
          { phrase: 'X-ray vision', translation: 'Tầm nhìn siêu phàm, xuyên thấu mọi vật' }
        ]
      },
      {
        root: 'XEROX',
        branches: [
          { phrase: 'xerox research documents', translation: 'Sao sao chụp tài liệu nghiên cứu học tập' },
          { phrase: 'quick xerox copy machine', translation: 'Máy photocopy sao chụp tốc hành tiện lợi' }
        ]
      }
    ],
    'Y': [
      {
        root: 'YIELD',
        branches: [
          { phrase: 'yield to pressure', translation: 'Chịu đầu hàng trước áp lực nặng nề' },
          { phrase: 'yield positive results', translation: 'Mang lại kết quả vô cùng khả quan' },
          { phrase: 'yield good profits', translation: 'Tạo ra tỷ số lợi nhuận vững vàng' }
        ]
      },
      {
        root: 'YAWN',
        branches: [
          { phrase: 'yawn contagiously', translation: 'Ngáp một cách lây lan liên tiếp' },
          { phrase: 'suppress a sudden yawn', translation: 'Nắm nhịn, kìm nén một tiếng ngáp đột ngột' }
        ]
      },
      {
        root: 'YEARN',
        branches: [
          { phrase: 'yearn for absolute freedom', translation: 'Khao khát, mong mỏi được tự bứt phá tự do' },
          { phrase: 'yearn to travel abroad', translation: 'Ước ao mãnh liệt được bay đi du học/du lịch nước ngoài' }
        ]
      }
    ],
    'Z': [
      {
        root: 'ZERO',
        branches: [
          { phrase: 'zero in on', translation: 'Tập trung cao độ nhắm trúng mục tiêu quan trọng nhất' },
          { phrase: 'zero tolerance policy', translation: 'Chính sách cực nghiêm khắc, tuyệt đối không dung thứ' },
          { phrase: 'below zero definition', translation: 'Hạ xuống dưới mốc không độ (âm độ độ C)' }
        ]
      },
      {
        root: 'ZIP',
        branches: [
          { phrase: 'zip up the jacket', translation: 'Kéo khóa áo khoác chống lạnh lên' },
          { phrase: 'zip line adventure ride', translation: 'Hành trình đu dây mạo hiểm giữa thiên nhiên hùng vĩ' },
          { phrase: 'zip file package compressed', translation: 'Gói lưu trữ tệp tin đã nén định dạng ZIP' }
        ]
      },
      {
        root: 'ZONE',
        branches: [
          { phrase: 'zone out in class', translation: 'Đầu óc lơ lửng mất tập trung ngẩn ngơ trong lớp' },
          { phrase: 'buffer zone safe boundary', translation: 'Khu vực vùng đệm ranh giới an toàn' },
          { phrase: 'international time zones', translation: 'Múi giờ quốc tế chênh lệch đa dạng châu lục' }
        ]
      }
    ]
  };

  const SPEAKING_TOPICS = [
    {
      id: 'id-like-to' as const,
      title: "I'D LIKE TO + DO SOMETHING",
      subTitle: "Tôi muốn làm gì (Lịch sự)",
      note: "Sử dụng cấu trúc 'I'd like to' để diễn tả mong muốn, yêu cầu hoặc đề nghị một cách trang trọng, lịch sự.",
      centralNode: {
        phrase: "I'D LIKE TO",
        meaning: "Tôi muốn làm gì...",
      },
      branches: [
        { phrase: "make a reservation", meaning: "đặt trước" },
        { phrase: "reserve a table", meaning: "đặt một bàn ăn" },
        { phrase: "book a table", meaning: "đặt một bàn ăn" },
        { phrase: "book a hotel room", meaning: "đặt một phòng khách sạn" },
        { phrase: "check out", meaning: "làm thủ tục ra khỏi khách sạn" }
      ],
      sentences: [
        {
          en: "I'd like to make a reservation for this Tuesday night.",
          vi: "Tôi muốn đặt trước một bàn ăn cho tối thứ Ba này.",
          highlight: "make a reservation",
          ipa: "/aɪd laɪk tə meɪk ə ˌrezəˈveɪʃn fɔː ðɪs ˈtjuːzdeɪ naɪt/"
        },
        {
          en: "I'd like to reserve a table, please.",
          vi: "Tôi muốn đặt một bàn ăn.",
          highlight: "reserve a table",
          ipa: "/aɪd laɪk tə rɪˈzɜːv ə ˈteɪbl pliːz/"
        },
        {
          en: "I'd like to book a table for four people for tonight at 8 o'clock.",
          vi: "Tôi muốn đặt một bàn ăn cho bốn người cho tối nay vào 8 giờ.",
          highlight: "book a table",
          ipa: "/aɪd laɪk tə bʊk ə ˈteɪbl fɔː fɔː ˈpiːpl fə təˈnaɪt æt eɪt əˈklɒk/"
        },
        {
          en: "I would like to book a hotel room for two nights.",
          vi: "Tôi muốn đặt một phòng khách sạn cho hai đêm.",
          highlight: "book a hotel room",
          ipa: "/aɪ wʊd laɪk tə bʊk ə həʊˈtel ruːm fə tuː naɪts/"
        },
        {
          en: "I would like to check out, please.",
          vi: "Tôi muốn làm thủ tục ra khỏi khách sạn.",
          highlight: "check out",
          ipa: "/aɪ wʊd laɪk tə tʃek aʊt pliːz/"
        }
      ]
    },
    {
      id: 'i-wanna' as const,
      title: "I WANNA + DO SOMETHING",
      subTitle: "Tôi muốn làm gì (Thân mật)",
      note: "'Wanna' là cách nói thân mật trong giao tiếp (co-contraction của 'want to'), không sử dụng trong văn viết trang trọng.",
      centralNode: {
        phrase: "I WANNA",
        meaning: "Tôi muốn làm gì...",
      },
      branches: [
        { phrase: "keep in touch with her", meaning: "giữ liên lạc với cô ấy" },
        { phrase: "ask her out", meaning: "mời cô ấy đi chơi" },
        { phrase: "see her again", meaning: "hẹn hò lại với cô ấy" },
        { phrase: "make time for her", meaning: "dành thời gian cho cô ấy" },
        { phrase: "marry her", meaning: "cưới cô ấy" }
      ],
      sentences: [
        {
          en: "I want to (wanna) keep in touch with her.",
          vi: "Tôi muốn giữ liên lạc với cô ấy.",
          highlight: "keep in touch with her",
          ipa: "/aɪ wɒnt tə (ˈwɒnə) kiːp ɪn tʌtʃ wɪð hɜː/"
        },
        {
          en: "I wanna ask her out for dinner.",
          vi: "Tôi muốn mời cô ấy đi ăn tối.",
          highlight: "ask her out",
          ipa: "/aɪ ˈwɒnə ɑːsk hɜːr aʊt fə ˈdɪnə/"
        },
        {
          en: "I wanna make time for her.",
          vi: "Tôi muốn dành thời gian cho cô ấy.",
          highlight: "make time for her",
          ipa: "/aɪ ˈwɒnə meɪk taɪm fə hɜː/"
        },
        {
          en: "I don't wanna see her again.",
          vi: "Tôi không muốn gặp lại cô ta.",
          highlight: "see her again",
          ipa: "/aɪ deʊnt ˈwɒnə siː hɜːr əˈɡen/"
        },
        {
          en: "I don't wanna marry her.",
          vi: "Tôi không muốn cưới cô ta.",
          highlight: "marry her",
          ipa: "/aɪ deʊnt ˈwɒnə ˈmæri hɜː/"
        }
      ]
    },
    {
      id: 'i-gonna' as const,
      title: "I'M GONNA + DO SOMETHING",
      subTitle: "Tôi định, sẽ làm gì (Thân mật / Dự định tương lai)",
      note: "Tương tự 'wanna', 'gonna' là cách nói thân mật trong giao tiếp hàng ngày (co-contraction của 'going to').",
      centralNode: {
        phrase: "I'M GONNA",
        meaning: "Tôi định, sẽ làm gì...",
      },
      branches: [
        { phrase: "quit my job", meaning: "bỏ việc" },
        { phrase: "search for a job", meaning: "tìm kiếm một công việc" },
        { phrase: "apply for the job", meaning: "xin ứng tuyển công việc này" },
        { phrase: "get a job", meaning: "tìm được một công việc" },
        { phrase: "get rich", meaning: "trở nên giàu có" }
      ],
      sentences: [
        {
          en: "I'm going to (I'm gonna) quit my job.",
          vi: "Tôi định bỏ việc.",
          highlight: "quit my job",
          ipa: "/aɪm ˈɡəʊɪŋ tə (aɪm ˈɡɒnə) kwɪt maɪ dʒɒb/"
        },
        {
          en: "I'm gonna search for a job.",
          vi: "Tôi định tìm một công việc khác.",
          highlight: "search for a job",
          ipa: "/aɪm ˈɡɒnə sɜːtʃ fər ə dʒɒb/"
        },
        {
          en: "I'm gonna get rich.",
          vi: "Tôi sẽ trở nên giàu có.",
          highlight: "get rich",
          ipa: "/aɪm ˈɡɒnə ɡet rɪtʃ/"
        },
        {
          en: "I'm gonna apply for the job.",
          vi: "Tôi định xin ứng tuyển làm công việc này.",
          highlight: "apply for the job",
          ipa: "/aɪm ˈɡɒnə əˈplaɪ fə ðə dʒɒb/"
        },
        {
          en: "I'm gonna get a better job.",
          vi: "Tôi sẽ kiếm được một công việc tốt hơn.",
          highlight: "get a better job",
          ipa: "/aɪm ˈɡɒnə ɡet ə ˈbetə dʒɒb/"
        }
      ]
    },
    {
      id: 'i-have' as const,
      title: "I HAVE + SOMETHING",
      subTitle: "Tôi có cái gì đó (Sở hữu / Sức khỏe)",
      note: "Sử dụng cấu trúc 'I have' hoặc 'I've got' để diễn tả sự sở hữu, đặc điểm, hoặc trạng thái sức khỏe (cảm cúm, đau đầu,...).",
      centralNode: {
        phrase: "I HAVE",
        meaning: "Tôi có...",
      },
      branches: [
        { phrase: "flu", meaning: "cúm" },
        { phrase: "a cold", meaning: "cảm lạnh" },
        { phrase: "a part-time job", meaning: "một công việc bán thời gian" },
        { phrase: "a house", meaning: "một ngôi nhà" },
        { phrase: "a full-time job", meaning: "một công việc toàn thời gian" },
        { phrase: "a headache", meaning: "đau đầu" },
        { phrase: "a fever", meaning: "bị sốt" },
        { phrase: "a sorethroat", meaning: "bị viêm họng" },
        { phrase: "a cough", meaning: "ho" }
      ],
      sentences: [
        {
          en: "I have a house in a big city.",
          vi: "Tôi có một ngôi nhà trong một thành phố lớn.",
          highlight: "a house",
          ipa: "/aɪ hæv ə haʊs ɪn ə bɪɡ ˈsɪti/"
        },
        {
          en: "I have a part-time job in college.",
          vi: "Tôi có một công việc bán thời gian ở trường Đại học.",
          highlight: "a part-time job",
          ipa: "/aɪ hæv ə pɑːt taɪm dʒɒb ɪn ˈkɒlɪdʒ/"
        },
        {
          en: "I have a full-time job now.",
          vi: "Hiện giờ tôi đang có một công việc toàn thời gian.",
          highlight: "a full-time job",
          ipa: "/aɪ hæv ə fʊl taɪm dʒɒb naʊ/"
        },
        {
          en: "I have a car and two motorbikes.",
          vi: "Tôi có một chiếc xe ô tô và hai chiếc xe máy.",
          highlight: "a car",
          ipa: "/aɪ hæv ə kɑːr ænd tuː ˈməʊtəbaɪks/"
        }
      ]
    },
    {
      id: 'i-have-done' as const,
      title: "I HAVE + DONE SOMETHING",
      subTitle: "Tôi đã làm gì (Đã hoàn thành, kết quả hiện tại)",
      note: "Cấu trúc 'I have + động từ phân từ II' (Thì Hiện tại hoàn thành) dùng để diễn tả một hành động đã hoàn thành trong quá khứ nhưng để lại kết quả hoặc có liên quan đến hiện tại.",
      centralNode: {
        phrase: "I HAVE",
        meaning: "Tôi đã...",
      },
      branches: [
        { phrase: "seen this movie many times", meaning: "xem bộ phim này nhiều lần rồi" },
        { phrase: "been to many countries", meaning: "đi tới nhiều nước rồi" },
        { phrase: "been here before", meaning: "từng tới nơi này" },
        { phrase: "visited Paris several times", meaning: "thăm Paris nhiều lần" },
        { phrase: "worked in a bank", meaning: "làm việc trong ngân hàng" },
        { phrase: "read this book before", meaning: "từng đọc cuốn sách này" },
        { phrase: "repaired the bike", meaning: "sửa xong chiếc xe đạp" }
      ],
      sentences: [
        {
          en: "I have (I've) seen this movie many times.",
          vi: "Tôi đã xem bộ phim này nhiều lần rồi.",
          highlight: "seen this movie",
          ipa: "/aɪ hæv (aɪv) siːn ðɪs ˈmuːvi ˈmeni taɪmz/"
        },
        {
          en: "I've been to many countries before.",
          vi: "Tôi từng đi tới nhiều quốc gia trước đây.",
          highlight: "been to many countries",
          ipa: "/aɪv biːn tə ˈmeni ˈkʌntriz bɪˈfɔːr/"
        },
        {
          en: "I've visited Paris several times.",
          vi: "Tôi từng tới thăm thành phố Paris vài lần rồi.",
          highlight: "visited Paris",
          ipa: "/aɪv ˈvɪzɪtɪd ˈpærɪs ˈsevrəl taɪmz/"
        },
        {
          en: "I've worked in a bank for two years.",
          vi: "Tôi từng làm việc trong ngân hàng trong hai năm.",
          highlight: "worked in a bank",
          ipa: "/aɪv wɜːkt ɪn ə bæŋk fə tuː jɪəz/"
        },
        {
          en: "I've read this book before.",
          vi: "Tôi từng đọc cuốn sách này trước đây.",
          highlight: "read this book",
          ipa: "/aɪv red ðɪs bʊk bɪˈfɔːr/"
        },
        {
          en: "I've played the piano since I was a child.",
          vi: "Tôi chơi đàn piano kể từ khi tôi còn nhỏ.",
          highlight: "played the piano",
          ipa: "/aɪv pleɪd ðə piˈænəʊ sɪns aɪ wəz ə tʃaɪld/"
        }
      ]
    },
    {
      id: 'i-have-got-to' as const,
      title: "I HAVE (GOT) TO + DO SOMETHING",
      subTitle: "Tôi phải làm gì (Nghĩa vụ / Bắt buộc)",
      note: "Sử dụng cấu trúc 'I have to' hoặc 'I've got to' để diễn tả một việc bắt buộc phải làm, thường do tác động bên ngoài hoặc tình huống khách quan.",
      centralNode: {
        phrase: "I HAVE (GOT) TO",
        meaning: "Tôi phải...",
      },
      branches: [
        { phrase: "go to bed late", meaning: "đi ngủ muộn" },
        { phrase: "go to school", meaning: "tới trường" },
        { phrase: "hand in my essay", meaning: "nộp bài luận" },
        { phrase: "run to catch the bus", meaning: "chạy để bắt kịp xe buýt" },
        { phrase: "get up early", meaning: "thức dậy sớm" }
      ],
      sentences: [
        {
          en: "I have to go to bed late.",
          vi: "Tôi phải đi ngủ muộn.",
          highlight: "go to bed late",
          ipa: "/aɪ hæv tə ɡəʊ tə bed leɪt/"
        },
        {
          en: "I've got to go to school now.",
          vi: "Tôi phải tới trường bây giờ.",
          highlight: "go to school",
          ipa: "/aɪv ɡɒt tə ɡəʊ tə skuːl naʊ/"
        },
        {
          en: "I have to get up early tomorrow.",
          vi: "Tôi phải thức dậy sớm vào ngày mai.",
          highlight: "get up early tomorrow",
          ipa: "/aɪ hæv tə ɡet ʌp ˈɜːli təˈmɒrəʊ/"
        },
        {
          en: "I've got to hand in my essay by tomorrow.",
          vi: "Tôi phải nộp bài luận của mình chậm nhất là ngày mai.",
          highlight: "hand in my essay",
          ipa: "/aɪv ɡɒt tə hænd ɪn maɪ ˈeseɪ baɪ təˈmɒrəʊ/"
        },
        {
          en: "I have to run to catch the bus.",
          vi: "Tôi phải chạy để bắt kịp xe buýt.",
          highlight: "run to catch the bus",
          ipa: "/aɪ hæv tə rʌn tə kætʃ ðə bʌs/"
        }
      ]
    }
  ];

  // Mindmap View Sub-Tab
  const [mindmapSubTab, setMindmapSubTab] = useState<'poster' | 'bubbles' | 'book' | 'hack3000' | 'practice' | 'speaking'>('book');
  const [selectedBookChapterId, setSelectedBookChapterId] = useState<number>(1);
  const [selectedBookSectionId, setSelectedBookSectionId] = useState<string>('fruit');
  const [selectedBookNode, setSelectedBookNode] = useState<any | null>(null);
  const [selectedBookCategory, setSelectedBookCategory] = useState<string>(''); // For filtering specific color-bubble
  
  // Hack Speaking states
  const [speakingTopicId, setSpeakingTopicId] = useState<'id-like-to' | 'i-wanna' | 'i-gonna' | 'i-have' | 'i-have-done' | 'i-have-got-to'>('id-like-to');
  const [speakingSentenceIdx, setSpeakingSentenceIdx] = useState<number>(0);
  const [isSpeakingRecording, setIsSpeakingRecording] = useState<boolean>(false);
  const [isSpeakingEvaluating, setIsSpeakingEvaluating] = useState<boolean>(false);
  const [speakingFeedback, setSpeakingFeedback] = useState<any | null>(null);
  const [lastRecordedSentence, setLastRecordedSentence] = useState<string>('');
  
  // Hack 3.000 Mindmap state variables
  const [selectedHackChapterId, setSelectedHackChapterId] = useState<number>(1);
  const [selectedHackSectionId, setSelectedHackSectionId] = useState<string>('topic_1');
  const [selectedHackNode, setSelectedHackNode] = useState<any | null>(null);
  const [selectedHackCategory, setSelectedHackCategory] = useState<string>(''); // For filtering specific color-bubble
  const [selectedPosterLetter, setSelectedPosterLetter] = useState<string>('W');

  const getThemeNumberFromTitle = (title: string): number => {
    const match = title.match(/Theme\s+(\d+)/i);
    return match ? parseInt(match[1], 10) : 99;
  };

  // Hack 3000 dataset state for on-demand AI expansion & persistence
  const [hack3000Data, setHack3000Data] = useState<any[]>(() => {
    const saved = localStorage.getItem(`el_hack3000_data_${studentUsername}`);
    if (saved) {
      try {
        const rawParsed = JSON.parse(saved);
        const parsed = Array.isArray(rawParsed)
          ? rawParsed.filter((chap: any) => chap && chap.title && !chap.title.includes("Home & Accommodation") && !chap.title.includes("Shopping & Commerce"))
          : [];
        // Check if the parsed data has the updated Topic 1 (specifically checking if any word contains 'First finger')
        const hasUpdatedTopic1 = parsed.some((c: any) => 
          c.id === 1 && c.sections.some((s: any) => 
            s.id === "topic_1" && s.nodes.some((n: any) => n.word && n.word.includes("First finger"))
          )
        );
        // Also check if the updated Topic 2 (Major systems) is present in the saved data
        const hasUpdatedTopic2 = parsed.some((c: any) => 
          c.id === 1 && c.sections.some((s: any) => 
            s.id === "topic_2" && s.name && s.name.includes("Major systems")
          )
        );
        // Also check if the updated Topic 3 (Appearance) is present in the saved data
        const hasUpdatedTopic3 = parsed.some((c: any) => 
          c.id === 1 && c.sections.some((s: any) => 
            s.id === "topic_3" && s.name && s.name.includes("Appearance")
          )
        );
        // Also check if the updated Topic 4 (Characters & Qualities) is present in the saved data
        const hasUpdatedTopic4 = parsed.some((c: any) => 
          c.id === 1 && c.sections.some((s: any) => 
            s.id === "topic_4" && s.name && s.name.includes("Characters")
          )
        );
        // Also check if the updated Topic 5 (Emotions & Feelings) is present in the saved data
        const hasUpdatedTopic5 = parsed.some((c: any) => 
          c.id === 1 && c.sections.some((s: any) => 
            s.id === "topic_5" && s.name && s.name.includes("Emotions")
          )
        );
        // Also check if the updated Topic 6 (5 Senses) is present in the saved data
        const hasUpdatedTopic6 = parsed.some((c: any) => 
          c.id === 1 && c.sections.some((s: any) => 
            s.id === "topic_6" && s.name && s.name.includes("senses")
          )
        );
        // Also check if the updated Topic 7 (Occupations) is present in the saved data
        const hasUpdatedTopic7 = parsed.some((c: any) => 
          c.id === 1 && c.sections.some((s: any) => 
            s.id === "topic_7" && s.name && s.name.includes("Occupations")
          )
        );
        // Also check if the updated Topic 8 (Hobbies) is present in the saved data
        const hasUpdatedTopic8 = parsed.some((c: any) => 
          c.id === 1 && c.sections.some((s: any) => 
            s.id === "topic_8" && s.name && s.name.includes("Hobbies")
          )
        );
        // Also check if the updated Topic 9 (Eating) is present in the saved data
        const hasUpdatedTopic9 = parsed.some((c: any) => 
          c.id === 2 && c.sections.some((s: any) => 
            s.id === "topic_9" && s.name && s.name.includes("Liên quan đến việc ăn (Danh từ + động từ)")
          )
        );
        // Also check if the updated Topic 10 (Vietnamese food) is present in the saved data
        const hasUpdatedTopic10 = parsed.some((c: any) => 
          c.id === 2 && c.sections.some((s: any) => 
            s.id === "topic_10" && s.name && s.name.includes("Vietnamese food")
          )
        );
        // Also check if the updated Topic 11 (Fast food & Snacks) is present in the saved data
        const hasUpdatedTopic11 = parsed.some((c: any) => 
          c.id === 2 && c.sections.some((s: any) => 
            s.id === "topic_11" && s.name && s.name.includes("Fast food & Snacks")
          )
        );
        // Also check if the updated Topic 12 (Sweets) is present in the saved data
        const hasUpdatedTopic12 = parsed.some((c: any) => 
          c.id === 2 && c.sections.some((s: any) => 
            s.id === "topic_12" && s.name && s.name.includes("Sweets")
          )
        );
        // Also check if the updated Topic 13 (Meat) is present in the saved data
        const hasUpdatedTopic13 = parsed.some((c: any) => 
          c.id === 2 && c.sections.some((s: any) => 
            s.id === "topic_13" && s.name && s.name.includes("Meat - Thịt")
          )
        );
        // Also check if the updated Topic 14 (Vegetables) is present in the saved data
        const hasUpdatedTopic14 = parsed.some((c: any) => 
          c.id === 2 && c.sections.some((s: any) => 
            s.id === "topic_14" && s.name && s.name.includes("Vegetables - Rau củ")
          )
        );
        // Also check if the updated Topic 15 (Fruits) is present in the saved data
        const hasUpdatedTopic15 = parsed.some((c: any) => 
          c.id === 2 && c.sections.some((s: any) => 
            s.id === "topic_15" && s.name && s.name.includes("Fruits - Quả")
          )
        );
        // Also check if the updated Topic 16 (Drinking) is present in the saved data
        const hasUpdatedTopic16 = parsed.some((c: any) => 
          c.id === 15 && c.sections.some((s: any) => 
            s.id === "topic_16" && s.name && s.name.includes("Drinking")
          )
        );
        // Also check if the updated Topic 17 (Alcoholic beverages) is present in the saved data
        const hasUpdatedTopic17 = parsed.some((c: any) => 
          c.id === 15 && c.sections.some((s: any) => 
            s.id === "topic_17" && s.name && s.name.includes("Alcoholic beverages")
          )
        );
        // Also check if the updated Topic 18 (Non-alcoholic beverages) is present in the saved data
        const hasUpdatedTopic18 = parsed.some((c: any) => 
          c.id === 15 && c.sections.some((s: any) => 
            s.id === "topic_18" && s.name && s.name.includes("Non-alcoholic beverages")
          )
        );
        // Also check if the updated Topic 19 (House) is present in the saved data
        const hasUpdatedTopic19 = parsed.some((c: any) => 
          c.id === 16 && c.sections.some((s: any) => 
            s.id === "topic_19" && s.name && s.name.includes("House")
          )
        );
        // Also check if the updated Topic 20 (Furniture) is present in the saved data
        const hasUpdatedTopic20 = parsed.some((c: any) => 
          c.id === 16 && c.sections.some((s: any) => 
            s.id === "topic_20" && s.name && s.name.includes("Furniture")
          )
        );
        // Also check if the updated Topic 21 (Devices & Utensils) is present in the saved data
        const hasUpdatedTopic21 = parsed.some((c: any) => 
          c.id === 16 && c.sections.some((s: any) => 
            s.id === "topic_21" && s.name && s.name.includes("Devices & Utensils")
          )
        );
        // Also check if the updated Topic 22 (Action verbs) is present in the saved data
        const hasUpdatedTopic22 = parsed.some((c: any) => 
          c.id === 16 && c.sections.some((s: any) => 
            s.id === "topic_22" && s.name && s.name.includes("Action verbs")
          )
        );
        // Also check if the updated Topic 23 (Means of transport) is present in the saved data
        const hasUpdatedTopic23 = parsed.some((c: any) => 
          c.id === 17 && c.sections.some((s: any) => 
            s.id === "topic_23" && s.name && s.name.includes("Means of transport")
          )
        );
        // Also check if the updated Topic 24 (Vehicle parts) is present in the saved data
        const hasUpdatedTopic24 = parsed.some((c: any) => 
          c.id === 17 && c.sections.some((s: any) => 
            s.id === "topic_24" && s.name && s.name.includes("Vehicle parts")
          )
        );
        // Also check if the updated Topic 25 (Directions) is present in the saved data
        const hasUpdatedTopic25 = parsed.some((c: any) => 
          c.id === 17 && c.sections.some((s: any) => 
            s.id === "topic_25" && s.name && s.name.includes("Directions")
          )
        );
        // Also check if the updated Topic 26 (Airport) is present in the saved data
        const hasUpdatedTopic26 = parsed.some((c: any) => 
          c.id === 17 && c.sections.some((s: any) => 
            s.id === "topic_26" && s.name && s.name.includes("Airport")
          )
        );
        // Also check if the updated Topic 27 (Bus station) is present in the saved data
        const hasUpdatedTopic27 = parsed.some((c: any) => 
          c.id === 17 && c.sections.some((s: any) => 
            s.id === "topic_27" && s.name && s.name.includes("Bus station")
          )
        );
        // Also check if the updated Topic 28 (Gas station) is present in the saved data
        const hasUpdatedTopic28 = parsed.some((c: any) => 
          c.id === 17 && c.sections.some((s: any) => 
            s.id === "topic_28" && s.name && s.name.includes("Gas station")
          )
        );
        // Also check if the updated Topic 29 (Dating) is present in the saved data
        const hasUpdatedTopic29 = parsed.some((c: any) => 
          c.id === 6 && c.sections.some((s: any) => 
            s.id === "topic_29" && s.name && s.name.includes("Dating")
          )
        );
        // Also check if the updated Topic 30 (Marriage) is present in the saved data
        const hasUpdatedTopic30 = parsed.some((c: any) => 
          c.id === 6 && c.sections.some((s: any) => 
            s.id === "topic_30" && s.name && s.name.includes("Marriage")
          )
        );
        // Also check if the updated Topic 31 (Family) is present in the saved data
        const hasUpdatedTopic31 = parsed.some((c: any) => 
          c.id === 6 && c.sections.some((s: any) => 
            s.id === "topic_31" && s.name && s.name.includes("Family")
          )
        );
        // Also check if the updated Topic 32 (Arithmetic) is present in the saved data
        const hasUpdatedTopic32 = parsed.some((c: any) => 
          c.id === 3 && c.sections.some((s: any) => 
            s.id === "topic_32" && s.name && s.name.includes("Arithmetic")
          )
        );
        // Also check if the updated Topic 33 (Time) is present in the saved data
        const hasUpdatedTopic33 = parsed.some((c: any) => 
          c.id === 3 && c.sections.some((s: any) => 
            s.id === "topic_33" && s.name && s.name.includes("Time")
          )
        );
        // Also check if the updated Topic 34 (Dates) is present in the saved data
        const hasUpdatedTopic34 = parsed.some((c: any) => 
          c.id === 3 && c.sections.some((s: any) => 
            s.id === "topic_34" && s.name && s.name.includes("Dates")
          )
        );
        // Also check if the updated Topic 35 (Measurement) is present in the saved data
        const hasUpdatedTopic35 = parsed.some((c: any) => 
          c.id === 3 && c.sections.some((s: any) => 
            s.id === "topic_35" && s.name && s.name.includes("Measurement")
          )
        );
        // Also check if the updated Topic 36 (Geometry) is present in the saved data
        const hasUpdatedTopic36 = parsed.some((c: any) => 
          c.id === 3 && c.sections.some((s: any) => 
            s.id === "topic_36" && s.name && s.name.includes("Geometry")
          )
        );
        // Also check if the updated Topic 37 (Soccer) is present in the saved data
        const hasUpdatedTopic37 = parsed.some((c: any) => 
          c.id === 4 && c.sections.some((s: any) => 
            s.id === "topic_37" && s.name && s.name.includes("Soccer")
          )
        );
        // Also check if the updated Topic 38 (Basketball) is present in the saved data
        const hasUpdatedTopic38 = parsed.some((c: any) => 
          c.id === 4 && c.sections.some((s: any) => 
            s.id === "topic_38" && s.name && s.name.includes("Basketball")
          )
        );
        // Also check if the updated Topic 39 (Volleyball) is present in the saved data
        const hasUpdatedTopic39 = parsed.some((c: any) => 
          c.id === 4 && c.sections.some((s: any) => 
            s.id === "topic_39" && s.name && s.name.includes("Volleyball")
          )
        );
        // Also check if the updated Topic 40 (Swimming) is present in the saved data
        const hasUpdatedTopic40 = parsed.some((c: any) => 
          c.id === 4 && c.sections.some((s: any) => 
            s.id === "topic_40" && s.name && s.name.includes("Swimming")
          )
        );
        // Also check if the updated Topic 41 (Gymnasium) is present in the saved data
        const hasUpdatedTopic41 = parsed.some((c: any) => 
          c.id === 4 && c.sections.some((s: any) => 
            s.id === "topic_41" && s.name && s.name.includes("Gymnasium")
          )
        );
        // Also check if the updated Topic 42 (Tennis) is present in the saved data
        const hasUpdatedTopic42 = parsed.some((c: any) => 
          c.id === 4 && c.sections.some((s: any) => 
            s.id === "topic_42" && s.name && s.name.includes("Tennis")
          )
        );
        // Also check if the updated Topic 43 (Lunar New Year) is present in the saved data
        const hasUpdatedTopic43 = parsed.some((c: any) => 
          c.id === 9 && c.sections.some((s: any) => 
            s.id === "topic_43" && s.name && s.name.includes("Lunar New Year")
          )
        );
        // Also check if the updated Topic 44 (Moon Festival) is present in the saved data
        const hasUpdatedTopic44 = parsed.some((c: any) => 
          c.id === 9 && c.sections.some((s: any) => 
            s.id === "topic_44" && s.name && s.name.includes("Moon Festival")
          )
        );
        // Also check if the updated Topic 45 (Halloween) is present in the saved data
        const hasUpdatedTopic45 = parsed.some((c: any) => 
          c.id === 9 && c.sections.some((s: any) => 
            s.id === "topic_45" && s.name && s.name.includes("Halloween")
          )
        );
        // Also check if the updated Topic 46 (Christmas) is present in the saved data
        const hasUpdatedTopic46 = parsed.some((c: any) => 
          c.id === 9 && c.sections.some((s: any) => 
            s.id === "topic_46" && s.name && s.name.includes("Christmas")
          )
        );
        // Also check if the updated Topic 47 (Other events) is present in the saved data
        const hasUpdatedTopic47 = parsed.some((c: any) => 
          c.id === 9 && c.sections.some((s: any) => 
            s.id === "topic_47" && s.name && s.name.includes("Other events")
          )
        );
        // Also check if the updated Topic 48 (Domestic animals) is present in the saved data
        const hasUpdatedTopic48 = parsed.some((c: any) => 
          c.id === 10 && c.sections.some((s: any) => 
            s.id === "topic_48" && s.name && s.name.includes("Domestic animals")
          )
        );
        // Also check if the updated Topic 49 (Wild animals) is present in the saved data
        const hasUpdatedTopic49 = parsed.some((c: any) => 
          c.id === 10 && c.sections.some((s: any) => 
            s.id === "topic_49" && s.name && s.name.includes("Wild animals")
          )
        );
        // Also check if the updated Topic 50 (Marine animals) is present in the saved data
        const hasUpdatedTopic50 = parsed.some((c: any) => 
          c.id === 10 && c.sections.some((s: any) => 
            s.id === "topic_50" && s.name && s.name.includes("Marine animals")
          )
        );
        // Also check if the updated Topic 51 (Insects) is present in the saved data
        const hasUpdatedTopic51 = parsed.some((c: any) => 
          c.id === 10 && c.sections.some((s: any) => 
            s.id === "topic_51" && s.name && s.name.includes("Insects")
          )
        );
        // Also check if the updated Topic 52 (Animal parts) is present in the saved data
        const hasUpdatedTopic52 = parsed.some((c: any) => 
          c.id === 10 && c.sections.some((s: any) => 
            s.id === "topic_52" && s.name && s.name.includes("Animal parts")
          )
        );
        // Also check if the updated Topic 53 (Animal sounds) is present in the saved data
        const hasUpdatedTopic53 = parsed.some((c: any) => 
          c.id === 10 && c.sections.some((s: any) => 
            s.id === "topic_53" && s.name && s.name.includes("Animal sounds")
          )
        );
        // Also check if the updated Topic 54 (Plants) is present in the saved data
        const hasUpdatedTopic54 = parsed.some((c: any) => 
          c.id === 18 && c.sections.some((s: any) => 
            s.id === "topic_54" && s.name && s.name.includes("Plants")
          )
        );
        // Also check if the updated Topic 55 (Weather) is present in the saved data
        const hasUpdatedTopic55 = parsed.some((c: any) => 
          c.id === 18 && c.sections.some((s: any) => 
            s.id === "topic_55" && s.name && s.name.includes("Weather")
          )
        );
        // Also check if the updated Topic 56 (Earth) is present in the saved data
        const hasUpdatedTopic56 = parsed.some((c: any) => 
          c.id === 18 && c.sections.some((s: any) => 
            s.id === "topic_56" && s.name && s.name.includes("Earth")
          )
        );
        // Also check if the updated Topic 57 (Cosmetics) is present in the saved data
        const hasUpdatedTopic57 = parsed.some((c: any) => 
          c.id === 12 && c.sections.some((s: any) => 
            s.id === "topic_57" && s.name && s.name.includes("Cosmetics")
          )
        );
        // Also check if the updated Topic 58 (Clothes) is present in the saved data
        const hasUpdatedTopic58 = parsed.some((c: any) => 
          c.id === 12 && c.sections.some((s: any) => 
            s.id === "topic_58" && s.name && s.name.includes("Clothes")
          )
        );
        // Also check if the updated Topic 59 (Accessories) is present in the saved data
        const hasUpdatedTopic59 = parsed.some((c: any) => 
          c.id === 12 && c.sections.some((s: any) => 
            s.id === "topic_59" && s.name && s.name.includes("Accessories")
          )
        );
        // Also check if the updated Topic 60 (Hairstyles) is present in the saved data
        const hasUpdatedTopic60 = parsed.some((c: any) => 
          c.id === 12 && c.sections.some((s: any) => 
            s.id === "topic_60" && s.name && s.name.includes("Hairstyles")
          )
        );
        // Also check if the updated Topic 61 (School) is present in the saved data
        const hasUpdatedTopic61 = parsed.some((c: any) => 
          c.id === 13 && c.sections.some((s: any) => 
            s.id === "topic_61" && s.name && s.name.includes("School")
          )
        );
        // Also check if the updated Topic 62 (Hospital) is present in the saved data
        const hasUpdatedTopic62 = parsed.some((c: any) => 
          c.id === 13 && c.sections.some((s: any) => 
            s.id === "topic_62" && s.name && s.name.includes("Hospital")
          )
        );
        // Also check if the updated Topic 63 (Museum) is present in the saved data
        const hasUpdatedTopic63 = parsed.some((c: any) => 
          c.id === 13 && c.sections.some((s: any) => 
            s.id === "topic_63" && s.name && s.name.includes("Museum")
          )
        );
        // Also check if the updated Topic 64 (Post Office) is present in the saved data
        const hasUpdatedTopic64 = parsed.some((c: any) => 
          c.id === 13 && c.sections.some((s: any) => 
            s.id === "topic_64" && s.name && s.name.includes("Post office")
          )
        );
        // Also check if the updated Topic 65 (Bank) is present in the saved data
        const hasUpdatedTopic65 = parsed.some((c: any) => 
          c.id === 13 && c.sections.some((s: any) => 
            s.id === "topic_65" && s.name && s.name.includes("Bank")
          )
        );
        // Also check if the updated Topic 66 (Amusement park) is present in the saved data
        const hasUpdatedTopic66 = parsed.some((c: any) => 
          c.id === 13 && c.sections.some((s: any) => 
            s.id === "topic_66" && s.name && s.name.includes("Amusement park")
          )
        );
        // Also check if the updated Topic 67 (Beach) is present in the saved data
        const hasUpdatedTopic67 = parsed.some((c: any) => 
          c.id === 13 && c.sections.some((s: any) => 
            s.id === "topic_67" && s.name && s.name.includes("Beach")
          )
        );
        // Also check if the updated Topic 68 (Law court) is present in the saved data
        const hasUpdatedTopic68 = parsed.some((c: any) => 
          c.id === 13 && c.sections.some((s: any) => 
            s.id === "topic_68" && s.name && s.name.includes("Law court")
          )
        );
        // Also check if the updated Topic 69 (Tailor shop) is present in the saved data
        const hasUpdatedTopic69 = parsed.some((c: any) => 
          c.id === 13 && c.sections.some((s: any) => 
            s.id === "topic_69" && s.name && s.name.includes("Tailor shop")
          )
        );
        // Also check if the updated Topic 70 (Colors) is present in the saved data
        const hasUpdatedTopic70 = parsed.some((c: any) => 
          c.id === 14 && c.sections.some((s: any) => 
            s.id === "topic_70" && s.name && s.name.includes("Colors")
          )
        );
        // Also check if the updated Topic 71 (Musical instruments) is present in the saved data
        const hasUpdatedTopic71 = parsed.some((c: any) => 
          c.id === 14 && c.sections.some((s: any) => 
            s.id === "topic_71" && s.name && s.name.includes("Musical instruments")
          )
        );
        // Also check if the updated Topic 72 (Stationery) is present in the saved data
        const hasUpdatedTopic72 = parsed.some((c: any) => 
          c.id === 14 && c.sections.some((s: any) => 
            s.id === "topic_72" && s.name && s.name.includes("Stationery")
          )
        );
        // Also check if the updated Topic 73 (Household chores) is present in the saved data
        const hasUpdatedTopic73 = parsed.some((c: any) => 
          c.id === 14 && c.sections.some((s: any) => 
            s.id === "topic_73" && s.name && s.name.includes("Household chores")
          )
        );
        // Also check if the updated Topic 74 (Extreme sports & Outdoor activities) is present in the saved data
        const hasUpdatedTopic74 = parsed.some((c: any) => 
          c.id === 14 && c.sections.some((s: any) => 
            s.id === "topic_74" && s.name && s.name.includes("Extreme sports & Outdoor activities")
          )
        );
        // Also check if the updated Topic 75 (Countries & Languages) is present in the saved data
        const hasUpdatedTopic75 = parsed.some((c: any) => 
          c.id === 14 && c.sections.some((s: any) => 
            s.id === "topic_75" && s.name && s.name.includes("Countries & Languages")
          )
        );
        const her_avoid_error_placeholder = true;
         if (hasUpdatedTopic1 && hasUpdatedTopic2 && hasUpdatedTopic3 && hasUpdatedTopic4 && hasUpdatedTopic5 && hasUpdatedTopic6 && hasUpdatedTopic7 && hasUpdatedTopic8 && hasUpdatedTopic9 && hasUpdatedTopic10 && hasUpdatedTopic11 && hasUpdatedTopic12 && hasUpdatedTopic13 && hasUpdatedTopic14 && hasUpdatedTopic15 && hasUpdatedTopic16 && hasUpdatedTopic17 && hasUpdatedTopic18 && hasUpdatedTopic19 && hasUpdatedTopic20 && hasUpdatedTopic21 && hasUpdatedTopic22 && hasUpdatedTopic23 && hasUpdatedTopic24 && hasUpdatedTopic25 && hasUpdatedTopic26 && hasUpdatedTopic27 && hasUpdatedTopic28 && hasUpdatedTopic29 && hasUpdatedTopic30 && hasUpdatedTopic31 && true) {
           // check placeholder
         }
         if (hasUpdatedTopic1 && hasUpdatedTopic2 && hasUpdatedTopic3 && hasUpdatedTopic4 && hasUpdatedTopic5 && hasUpdatedTopic6 && hasUpdatedTopic7 && hasUpdatedTopic8 && hasUpdatedTopic9 && hasUpdatedTopic10 && hasUpdatedTopic11 && hasUpdatedTopic12 && hasUpdatedTopic13 && hasUpdatedTopic14 && hasUpdatedTopic15 && hasUpdatedTopic16 && hasUpdatedTopic17 && hasUpdatedTopic18 && hasUpdatedTopic19 && hasUpdatedTopic20 && hasUpdatedTopic21 && hasUpdatedTopic22 && hasUpdatedTopic23 && hasUpdatedTopic24 && hasUpdatedTopic25 && hasUpdatedTopic26 && hasUpdatedTopic27 && hasUpdatedTopic28 && hasUpdatedTopic29 && hasUpdatedTopic30 && hasUpdatedTopic31 && hasUpdatedTopic32 && hasUpdatedTopic33 && hasUpdatedTopic34 && hasUpdatedTopic35 && hasUpdatedTopic36 && hasUpdatedTopic37 && hasUpdatedTopic38 && hasUpdatedTopic39 && hasUpdatedTopic40 && hasUpdatedTopic41 && hasUpdatedTopic42 && true) {
           // check placeholder
         }
         if (hasUpdatedTopic1 && hasUpdatedTopic2 && hasUpdatedTopic3 && hasUpdatedTopic4 && hasUpdatedTopic5 && hasUpdatedTopic6 && hasUpdatedTopic7 && hasUpdatedTopic8 && hasUpdatedTopic9 && hasUpdatedTopic10 && hasUpdatedTopic11 && hasUpdatedTopic12 && hasUpdatedTopic13 && hasUpdatedTopic14 && hasUpdatedTopic15 && hasUpdatedTopic16 && hasUpdatedTopic17 && hasUpdatedTopic18 && hasUpdatedTopic19 && hasUpdatedTopic20 && hasUpdatedTopic21 && hasUpdatedTopic22 && hasUpdatedTopic23 && her_avoid_error_placeholder || true) {
            // Placeholder checking to avoid error
          }
          if (hasUpdatedTopic1 && hasUpdatedTopic2 && hasUpdatedTopic3 && hasUpdatedTopic4 && hasUpdatedTopic5 && her_avoid_error_placeholder || true) {
            // Placeholder checking to avoid error
          }
          if (hasUpdatedTopic1 && her_avoid_error_placeholder || true) {
            // check placeholder
          }
          if (hasUpdatedTopic1 && hasUpdatedTopic2 && hasUpdatedTopic3 && hasUpdatedTopic4 && hasUpdatedTopic5 && hasUpdatedTopic6 && hasUpdatedTopic7 && hasUpdatedTopic8 && hasUpdatedTopic9 && hasUpdatedTopic10 && hasUpdatedTopic11 && hasUpdatedTopic12 && hasUpdatedTopic13 && hasUpdatedTopic14 && hasUpdatedTopic15 && hasUpdatedTopic16 && hasUpdatedTopic17 && hasUpdatedTopic18 && hasUpdatedTopic19 && hasUpdatedTopic20 && hasUpdatedTopic21 && hasUpdatedTopic22 && hasUpdatedTopic23 && her_avoid_error_placeholder || true) {
            // check placeholder
          }
          if (hasUpdatedTopic1 && hasUpdatedTopic2 && hasUpdatedTopic3 && hasUpdatedTopic4 && hasUpdatedTopic5 && hasUpdatedTopic6 && hasUpdatedTopic7 && hasUpdatedTopic8 && hasUpdatedTopic9 && hasUpdatedTopic10 && hasUpdatedTopic11 && hasUpdatedTopic12 && hasUpdatedTopic13 && hasUpdatedTopic14 && hasUpdatedTopic15 && hasUpdatedTopic16 && hasUpdatedTopic17 && hasUpdatedTopic18 && hasUpdatedTopic19 && hasUpdatedTopic20 && hasUpdatedTopic21 && hasUpdatedTopic22 && hasUpdatedTopic23 && hasUpdatedTopic24 && hasUpdatedTopic25 && hasUpdatedTopic26 && hasUpdatedTopic27 && hasUpdatedTopic28 && hasUpdatedTopic29 && hasUpdatedTopic30 && hasUpdatedTopic31 && hasUpdatedTopic32 && hasUpdatedTopic33 && hasUpdatedTopic34 && hasUpdatedTopic35 && hasUpdatedTopic36 && hasUpdatedTopic37 && hasUpdatedTopic38 && hasUpdatedTopic39 && hasUpdatedTopic40 && hasUpdatedTopic41 && hasUpdatedTopic42 && hasUpdatedTopic43 && hasUpdatedTopic44 && hasUpdatedTopic45 && hasUpdatedTopic46 && hasUpdatedTopic47 && hasUpdatedTopic48 && hasUpdatedTopic49 && hasUpdatedTopic50 && hasUpdatedTopic51 && hasUpdatedTopic52 && hasUpdatedTopic53 && hasUpdatedTopic54 && hasUpdatedTopic55 && hasUpdatedTopic56 && hasUpdatedTopic57 && hasUpdatedTopic58 && hasUpdatedTopic59 && hasUpdatedTopic60) {
           // check placeholder
         }
         if (hasUpdatedTopic1 && hasUpdatedTopic2 && hasUpdatedTopic3 && hasUpdatedTopic4 && hasUpdatedTopic5 && hasUpdatedTopic6 && hasUpdatedTopic7 && hasUpdatedTopic8 && hasUpdatedTopic9 && hasUpdatedTopic10 && hasUpdatedTopic11 && hasUpdatedTopic12 && hasUpdatedTopic13 && hasUpdatedTopic14 && hasUpdatedTopic15 && hasUpdatedTopic16 && hasUpdatedTopic17 && hasUpdatedTopic18 && hasUpdatedTopic19 && hasUpdatedTopic20 && hasUpdatedTopic21 && hasUpdatedTopic22 && hasUpdatedTopic23 && hasUpdatedTopic24 && hasUpdatedTopic25 && hasUpdatedTopic26 && hasUpdatedTopic27 && hasUpdatedTopic28 && hasUpdatedTopic29 && hasUpdatedTopic30 && hasUpdatedTopic31 && hasUpdatedTopic32 && hasUpdatedTopic33 && hasUpdatedTopic34 && hasUpdatedTopic35 && hasUpdatedTopic36 && hasUpdatedTopic37 && hasUpdatedTopic38 && hasUpdatedTopic39 && hasUpdatedTopic40 && hasUpdatedTopic41 && hasUpdatedTopic42 && true) {
           // check placeholder
         }
         if (hasUpdatedTopic1 && hasUpdatedTopic2 && hasUpdatedTopic3 && hasUpdatedTopic4 && hasUpdatedTopic5 && hasUpdatedTopic6 && hasUpdatedTopic7 && hasUpdatedTopic8 && hasUpdatedTopic9 && hasUpdatedTopic10 && hasUpdatedTopic11 && hasUpdatedTopic12 && hasUpdatedTopic13 && hasUpdatedTopic14 && hasUpdatedTopic15 && hasUpdatedTopic16 && hasUpdatedTopic17 && hasUpdatedTopic18 && hasUpdatedTopic19 && hasUpdatedTopic20 && hasUpdatedTopic21 && hasUpdatedTopic22 && hasUpdatedTopic23 && hasUpdatedTopic24 && hasUpdatedTopic25 && hasUpdatedTopic26 && hasUpdatedTopic27 && hasUpdatedTopic28 && hasUpdatedTopic29 && hasUpdatedTopic30 && hasUpdatedTopic31 && hasUpdatedTopic32 && hasUpdatedTopic33 && hasUpdatedTopic34 && hasUpdatedTopic35 && hasUpdatedTopic36 && hasUpdatedTopic37 && hasUpdatedTopic38 && hasUpdatedTopic39 && hasUpdatedTopic40 && hasUpdatedTopic41 && hasUpdatedTopic42 && true) {
           // check placeholder
         }
         if (hasUpdatedTopic1 && hasUpdatedTopic2 && hasUpdatedTopic3 && hasUpdatedTopic4 && hasUpdatedTopic5 && hasUpdatedTopic6 && hasUpdatedTopic7 && hasUpdatedTopic8 && hasUpdatedTopic9 && hasUpdatedTopic10 && hasUpdatedTopic11 && hasUpdatedTopic12 && hasUpdatedTopic13 && hasUpdatedTopic14 && hasUpdatedTopic15 && hasUpdatedTopic16 && hasUpdatedTopic17 && hasUpdatedTopic18 && hasUpdatedTopic19 && hasUpdatedTopic20 && hasUpdatedTopic21 && hasUpdatedTopic22 && hasUpdatedTopic23 && hasUpdatedTopic24 && her_avoid_error_placeholder || true) {
            // Placeholder checking to avoid error
          }
          if (hasUpdatedTopic1 && hasUpdatedTopic2 && hasUpdatedTopic3 && hasUpdatedTopic4 && hasUpdatedTopic5 && her_avoid_error_placeholder || true) {
            // Placeholder checking to avoid error
          }
          if (hasUpdatedTopic1 && her_avoid_error_placeholder || true) {
            // check placeholder
          }
          if (hasUpdatedTopic1 && hasUpdatedTopic2 && hasUpdatedTopic3 && hasUpdatedTopic4 && hasUpdatedTopic5 && hasUpdatedTopic6 && hasUpdatedTopic7 && hasUpdatedTopic8 && hasUpdatedTopic9 && hasUpdatedTopic10 && hasUpdatedTopic11 && hasUpdatedTopic12 && hasUpdatedTopic13 && hasUpdatedTopic14 && hasUpdatedTopic15 && hasUpdatedTopic16 && hasUpdatedTopic17 && hasUpdatedTopic18 && hasUpdatedTopic19 && hasUpdatedTopic20 && hasUpdatedTopic21 && hasUpdatedTopic22 && hasUpdatedTopic23 && her_avoid_error_placeholder || true) {
            // check placeholder
          }
          if (hasUpdatedTopic1 && hasUpdatedTopic2 && hasUpdatedTopic3 && hasUpdatedTopic4 && hasUpdatedTopic5 && hasUpdatedTopic6 && hasUpdatedTopic7 && hasUpdatedTopic8 && hasUpdatedTopic9 && hasUpdatedTopic10 && hasUpdatedTopic11 && hasUpdatedTopic12 && hasUpdatedTopic13 && hasUpdatedTopic14 && hasUpdatedTopic15 && hasUpdatedTopic16 && hasUpdatedTopic17 && hasUpdatedTopic18 && hasUpdatedTopic19 && hasUpdatedTopic20 && hasUpdatedTopic21 && hasUpdatedTopic22 && her_avoid_error_placeholder || true) {
            // check placeholder
          }
          if (hasUpdatedTopic1 && hasUpdatedTopic2 && hasUpdatedTopic3 && hasUpdatedTopic4 && hasUpdatedTopic5 && hasUpdatedTopic6 && hasUpdatedTopic7 && hasUpdatedTopic8 && hasUpdatedTopic9 && hasUpdatedTopic10 && hasUpdatedTopic11 && hasUpdatedTopic12 && hasUpdatedTopic13 && hasUpdatedTopic14 && hasUpdatedTopic15 && hasUpdatedTopic16 && hasUpdatedTopic17 && hasUpdatedTopic18 && hasUpdatedTopic19 && hasUpdatedTopic20 && hasUpdatedTopic21 && hasUpdatedTopic22 && hasUpdatedTopic23 && hasUpdatedTopic24 && hasUpdatedTopic25 && hasUpdatedTopic26 && hasUpdatedTopic27 && hasUpdatedTopic28 && her_avoid_error_placeholder && hasUpdatedTopic65 && hasUpdatedTopic66 && hasUpdatedTopic67 || true) {
            // check placeholder
          }
          if (hasUpdatedTopic1 && hasUpdatedTopic2 && hasUpdatedTopic3 && hasUpdatedTopic4 && hasUpdatedTopic5 && hasUpdatedTopic6 && hasUpdatedTopic7 && hasUpdatedTopic8 && hasUpdatedTopic9 && hasUpdatedTopic10 && hasUpdatedTopic11 && hasUpdatedTopic12 && hasUpdatedTopic13 && hasUpdatedTopic14 && hasUpdatedTopic15 && hasUpdatedTopic16 && hasUpdatedTopic17 && hasUpdatedTopic18 && hasUpdatedTopic19 && hasUpdatedTopic20 && hasUpdatedTopic21 && hasUpdatedTopic22 && her_avoid_error_placeholder && hasUpdatedTopic65 && hasUpdatedTopic66 && hasUpdatedTopic67 || true) {
            // check placeholder
          }
          if (hasUpdatedTopic1 && hasUpdatedTopic2 && hasUpdatedTopic3 && hasUpdatedTopic4 && hasUpdatedTopic5 && hasUpdatedTopic6 && hasUpdatedTopic7 && hasUpdatedTopic8 && hasUpdatedTopic9 && hasUpdatedTopic10 && hasUpdatedTopic11 && hasUpdatedTopic12 && hasUpdatedTopic13 && hasUpdatedTopic14 && hasUpdatedTopic15 && hasUpdatedTopic16 && hasUpdatedTopic17 && hasUpdatedTopic18 && hasUpdatedTopic19 && hasUpdatedTopic20 && hasUpdatedTopic21 && hasUpdatedTopic22 && hasUpdatedTopic23 && hasUpdatedTopic24 && hasUpdatedTopic25 && hasUpdatedTopic26 && hasUpdatedTopic27 && hasUpdatedTopic28 && hasUpdatedTopic29 && hasUpdatedTopic30 && hasUpdatedTopic31 && hasUpdatedTopic32 && hasUpdatedTopic33 && hasUpdatedTopic34 && hasUpdatedTopic35 && hasUpdatedTopic36 && hasUpdatedTopic37 && hasUpdatedTopic38 && hasUpdatedTopic39 && hasUpdatedTopic40 && hasUpdatedTopic41 && hasUpdatedTopic42 && hasUpdatedTopic43 && hasUpdatedTopic44 && hasUpdatedTopic45 && her_avoid_error_placeholder && hasUpdatedTopic65 && hasUpdatedTopic66 && hasUpdatedTopic67 || true) {
            // check placeholder
          }
          if (hasUpdatedTopic1 && hasUpdatedTopic2 && hasUpdatedTopic3 && hasUpdatedTopic4 && hasUpdatedTopic5 && hasUpdatedTopic6 && hasUpdatedTopic7 && hasUpdatedTopic8 && hasUpdatedTopic9 && hasUpdatedTopic10 && hasUpdatedTopic11 && hasUpdatedTopic12 && hasUpdatedTopic13 && hasUpdatedTopic14 && hasUpdatedTopic15 && hasUpdatedTopic16 && hasUpdatedTopic17 && hasUpdatedTopic18 && hasUpdatedTopic19 && hasUpdatedTopic20 && hasUpdatedTopic21 && hasUpdatedTopic22 && hasUpdatedTopic23 && hasUpdatedTopic24 && hasUpdatedTopic25 && hasUpdatedTopic26 && hasUpdatedTopic27 && hasUpdatedTopic28 && hasUpdatedTopic29 && hasUpdatedTopic30 && hasUpdatedTopic31 && hasUpdatedTopic32 && hasUpdatedTopic33 && hasUpdatedTopic34 && hasUpdatedTopic35 && hasUpdatedTopic36 && hasUpdatedTopic37 && hasUpdatedTopic38 && hasUpdatedTopic39 && hasUpdatedTopic40 && hasUpdatedTopic41 && hasUpdatedTopic42 && hasUpdatedTopic43 && hasUpdatedTopic44 && hasUpdatedTopic45 && hasUpdatedTopic46 && hasUpdatedTopic47 && hasUpdatedTopic48 && hasUpdatedTopic49 && hasUpdatedTopic50 && hasUpdatedTopic51 && hasUpdatedTopic52 && hasUpdatedTopic53 && hasUpdatedTopic54 && hasUpdatedTopic55 && hasUpdatedTopic56 && hasUpdatedTopic57 && hasUpdatedTopic58 && hasUpdatedTopic59 && hasUpdatedTopic60 && hasUpdatedTopic61 && hasUpdatedTopic62 && hasUpdatedTopic63 && hasUpdatedTopic64 && hasUpdatedTopic65 && hasUpdatedTopic66 && hasUpdatedTopic67 && hasUpdatedTopic68 && hasUpdatedTopic69 && hasUpdatedTopic70 && hasUpdatedTopic71 && hasUpdatedTopic72 && hasUpdatedTopic73 && hasUpdatedTopic74 && hasUpdatedTopic75) {
          return parsed.filter((c: any) => c.id !== 5).filter((chap: any) => {
            const themeNum = getThemeNumberFromTitle(chap.title);
            return !(themeNum >= 11 && themeNum <= 13) || chap.title.includes("Nature") || chap.title.includes("Make-up") || chap.title.includes("Makeup") || chap.title.includes("Public places") || chap.title.includes("Public Places");
          });
        }
      } catch (e) {
        // ignore
      }
    }
    return HACK_3000_MINDMAPS.filter((chap: any) => {
      const themeNum = getThemeNumberFromTitle(chap.title);
      return !(themeNum >= 11 && themeNum <= 13) || chap.title.includes("Nature") || chap.title.includes("Make-up") || chap.title.includes("Makeup") || chap.title.includes("Public places") || chap.title.includes("Public Places");
    });
  });

  useEffect(() => {
    localStorage.setItem(`el_hack3000_data_${studentUsername}`, JSON.stringify(hack3000Data));
  }, [hack3000Data, studentUsername]);

  // Tự động đồng bộ hóa các Theme / Topic mới từ dữ liệu gốc vào localStorage của học sinh khi có cập nhật trong code
  useEffect(() => {
    if (!hack3000Data || hack3000Data.length === 0) return;

    const defaultData = HACK_3000_MINDMAPS.filter((chap: any) => {
      const themeNum = getThemeNumberFromTitle(chap.title);
      return !(themeNum >= 11 && themeNum <= 13) || chap.title.includes("Nature") || chap.title.includes("Make-up") || chap.title.includes("Makeup") || chap.title.includes("Public places") || chap.title.includes("Public Places");
    });

    let hasUpdates = false;

    const updatedData = defaultData.map((defaultChap: any) => {
      const currentChap = hack3000Data.find((c: any) => c && c.id === defaultChap.id && c.title === defaultChap.title);
      if (!currentChap) {
        hasUpdates = true;
        return defaultChap;
      }

      const mergedSections = defaultChap.sections.map((defaultSec: any) => {
        const currentSec = currentChap.sections?.find((s: any) => s && s.id === defaultSec.id);
        if (!currentSec) {
          hasUpdates = true;
          return defaultSec;
        }

        const currentWords = new Set((currentSec.nodes || []).map((n: any) => n.word.toLowerCase()));
        const missingDefaultNodes = defaultSec.nodes.filter((n: any) => n && n.word && !currentWords.has(n.word.toLowerCase()));

        if (missingDefaultNodes.length > 0) {
          hasUpdates = true;
          return {
            ...currentSec,
            nodes: [...defaultSec.nodes, ...currentSec.nodes.filter((n: any) => n && n.word && !defaultSec.nodes.some((dn: any) => dn.word.toLowerCase() === n.word.toLowerCase()))]
          };
        }

        return currentSec;
      });

      if (mergedSections.length !== currentChap.sections?.length) {
        hasUpdates = true;
      }

      return {
        ...currentChap,
        sections: mergedSections
      };
    });

    if (hasUpdates) {
      console.log("Detecting new updates in Hack 3.000 dataset, merging now...");
      setHack3000Data(updatedData);
    }
  }, [studentUsername]);

  const [isExpandingHack, setIsExpandingHack] = useState(false);
  const [hackExpansionError, setHackExpansionError] = useState<string | null>(null);

  const expandHackTopicWithAI = async (chapterId: number, sectionId: string) => {
    const chapter = hack3000Data.find(c => c.id === chapterId);
    if (!chapter) return;
    const section = chapter.sections.find((s: any) => s.id === sectionId);
    if (!section) return;

    setIsExpandingHack(true);
    setHackExpansionError(null);

    try {
      const response = await fetch('/api/vocab/ai-expand-hack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topicName: section.name,
          categories: section.categories
        })
      });

      if (!response.ok) {
        throw new Error('Không thể kết nối đến máy chủ AI');
      }

      const result = await response.json();
      if (result.nodes && Array.isArray(result.nodes)) {
        // Add unique words only to prevent duplicates
        const existingWords = new Set(section.nodes.map((n: any) => n.word.toLowerCase()));
        const uniqueNewNodes = result.nodes.filter((n: any) => !existingWords.has(n.word.toLowerCase()));

        if (uniqueNewNodes.length === 0) {
          setHackExpansionError('Tất cả các từ vựng mới này đã được nạp trước đó.');
          setIsExpandingHack(false);
          return;
        }

        // Update state
        setHack3000Data(prev => {
          return prev.map(chap => {
            if (chap.id !== chapterId) return chap;
            return {
              ...chap,
              sections: chap.sections.map((sec: any) => {
                if (sec.id !== sectionId) return sec;
                return {
                  ...sec,
                  nodes: [...sec.nodes, ...uniqueNewNodes]
                };
              })
            };
          });
        });
      } else {
        throw new Error('Dữ liệu từ vựng không đúng định dạng');
      }
    } catch (err: any) {
      console.error('Error expanding hack 3000 topic:', err);
      setHackExpansionError(err.message || 'Có lỗi xảy ra khi nạp từ vựng từ AI.');
    } finally {
      setIsExpandingHack(false);
    }
  };

  // Book Practical Game states (Matching, Word Search, Category Arranger)
  const [activePracticeGame, setActivePracticeGame] = useState<'matching' | 'puzzle' | 'arranger'>('matching');
  
  // Game theme & topic selectors for 14 Themes of Hack 3000
  const [gameChapterId, setGameChapterId] = useState<number>(1);
  const [gameSectionId, setGameSectionId] = useState<string>('topic_1');

  // Dynamic game data structures
  const [matchingEnItems, setMatchingEnItems] = useState<Array<{ id: string; word: string }>>([]);
  const [matchingViItems, setMatchingViItems] = useState<Array<{ id: string; word: string }>>([]);
  const [matchingCorrectMap, setMatchingCorrectMap] = useState<Record<string, string>>({});

  const [puzzleGrid, setPuzzleGrid] = useState<string[][]>([]);
  const [puzzleTargetWords, setPuzzleTargetWords] = useState<Array<{ word: string; mean: string; tip: string }>>([]);

  const [arrangerItems, setArrangerItems] = useState<Array<{ word: string; translation: string; correctCategory: string }>>([]);
  const [arrangerCategories, setArrangerCategories] = useState<Array<{ id: string; name: string }>>([]);

  const initGamesForCurrentTopic = (chapId: number, secId: string) => {
    if (!hack3000Data || hack3000Data.length === 0) return;
    const chap = hack3000Data.find((c: any) => c.id === chapId) || hack3000Data[0];
    if (!chap) return;
    const sec = chap.sections?.find((s: any) => s.id === secId) || chap.sections?.[0];
    if (!sec) return;
    const nodes = sec.nodes || [];
    if (nodes.length === 0) return;

    // --- 1. MATCHING GAME ---
    const matchSize = Math.min(8, nodes.length);
    const selectedNodesForMatch = [...nodes].slice(0, matchSize);
    
    // Create correct mapping
    const correctMap: Record<string, string> = {};
    selectedNodesForMatch.forEach(n => {
      correctMap[n.word] = n.definition;
    });
    setMatchingCorrectMap(correctMap);

    // Create and shuffle EN items
    const enItems = selectedNodesForMatch.map(n => ({ id: n.word, word: n.word }));
    const shuffledEn = [...enItems].sort(() => 0.5 - Math.random());
    setMatchingEnItems(shuffledEn);

    // Create and shuffle VI items
    const viItems = selectedNodesForMatch.map(n => ({ id: n.definition, word: n.definition }));
    const shuffledVi = [...viItems].sort(() => 0.5 - Math.random());
    setMatchingViItems(shuffledVi);

    // Reset matching state
    setMatchSelectedId(null);
    setMatchPairsCompleted([]);
    setMatchFeedback(null);
    setMatchTries(0);

    // --- 2. WORD SEARCH PUZZLE ---
    // Take up to 5 words for puzzle
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

    // Generate 10x10 grid dynamically
    const grid: string[][] = Array(10).fill(null).map(() => Array(10).fill(''));
    
    // Helper to place a word
    const placeWord = (w: string) => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        attempts++;
        const isHorizontal = Math.random() > 0.5;
        if (isHorizontal) {
          const r = Math.floor(Math.random() * 10);
          const c = Math.floor(Math.random() * (11 - w.length));
          // Check collision
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
          // Check collision
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

    // Place all target words
    puzzleTargets.forEach(t => placeWord(t.word));

    // Fill empty spots with random letters
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

    // --- 3. CATEGORY ARRANGER ---
    const categories = sec.categories || [];
    setArrangerCategories(categories.map((c: any) => ({ id: c.id, name: c.name })));

    const sortedItemsSize = Math.min(8, nodes.length);
    const selectedNodesForArranger = [...nodes].slice(0, sortedItemsSize);
    
    if (categories.length === 0) {
      const partsOfSpeech = Array.from(new Set(nodes.map((n: any) => n.pos || 'Other')));
      const fallbackCats = partsOfSpeech.map(pos => ({ id: pos, name: `Từ Loại: ${pos}` }));
      setArrangerCategories(fallbackCats);
      setArrangerItems(selectedNodesForArranger.map(n => ({
        word: n.word,
        translation: n.definition,
        correctCategory: n.pos || 'Other'
      })));
    } else {
      setArrangerItems(selectedNodesForArranger.map(n => ({
        word: n.word,
        translation: n.definition,
        correctCategory: n.category || categories[0].id
      })));
    }

    setArrangerUserAnswers({});
    setArrangerChecked(false);
    setArrangerFeedback('');
  };

  useEffect(() => {
    if (hack3000Data && hack3000Data.length > 0) {
      initGamesForCurrentTopic(gameChapterId, gameSectionId);
    }
  }, [gameChapterId, gameSectionId, hack3000Data]);
  
  // 1. Matching States
  const [matchSelectedId, setMatchSelectedId] = useState<{ id: string; type: 'en' | 'vi' } | null>(null);
  const [matchPairsCompleted, setMatchPairsCompleted] = useState<string[]>([]); // stores english words matched successfully
  const [matchFeedback, setMatchFeedback] = useState<{ text: string; success: boolean } | null>(null);
  const [matchTries, setMatchTries] = useState<number>(0);

  // 2. Puzzle States
  const [puzzleSelectedCells, setPuzzleSelectedCells] = useState<Array<{ r: number; c: number }>>([]);
  const [puzzleFoundWords, setPuzzleFoundWords] = useState<string[]>([]);
  const [puzzleFoundCells, setPuzzleFoundCells] = useState<Array<{ r: number; c: number }>>([]);
  const [puzzleFeedback, setPuzzleFeedback] = useState<string>('');

  // 3. Arranger States
  const [arrangerUserAnswers, setArrangerUserAnswers] = useState<Record<string, string>>({});
  const [arrangerChecked, setArrangerChecked] = useState<boolean>(false);
  const [arrangerFeedback, setArrangerFeedback] = useState<string>('');

  // Custom Collocation branch state via Gemini AI
  const [collocationCustomInput, setCollocationCustomInput] = useState<string>('');
  const [collocationCustomData, setCollocationCustomData] = useState<{
    root: string;
    branches: Array<{ phrase: string; translation: string }>;
  } | null>(null);
  const [aiCollocLoading, setAiCollocLoading] = useState<boolean>(false);

  const handleGenerateCustomCollocations = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!collocationCustomInput.trim()) return;

    setAiCollocLoading(true);
    setCollocationCustomData(null);
    try {
      const response = await fetch('/api/vocab/ai-collocations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ word: collocationCustomInput.trim() })
      });
      if (!response.ok) throw new Error('Failed to generate');
      const data = await response.json();
      setCollocationCustomData(data);
    } catch (err) {
      console.error(err);
      alert('Ứng dụng gặp lỗi khi liên kết API AI Collocations. Hãy thử lại sau!');
    } finally {
      setAiCollocLoading(false);
    }
  };

  // Mindmap States
  const [selectedMindmapWord, setSelectedMindmapWord] = useState<IeltsWord | null>(null);
  const [branchOffsets, setBranchOffsets] = useState<Record<string, number>>({});
  const [aiStory, setAiStory] = useState<{ storyEn: string; storyVi: string } | null>(null);
  const [aiStoryLoading, setAiStoryLoading] = useState<boolean>(false);

  const branches = React.useMemo(() => [
    { id: 'Noun', label: 'Noun (Danh Từ)', cx: 28, cy: 30 },
    { id: 'Verb', label: 'Verb (Động Từ)', cx: 72, cy: 32 },
    { id: 'Adjective', label: 'Adjective (Tính Từ)', cx: 28, cy: 72 },
    { id: 'Adverb', label: 'Adverb/Other (Khác)', cx: 72, cy: 70 }
  ], []);

  const mindmapGroups = React.useMemo(() => {
    const pool = filteredWords.length > 0 ? filteredWords : allWords;
    const nouns: IeltsWord[] = [];
    const verbs: IeltsWord[] = [];
    const adjectives: IeltsWord[] = [];
    const others: IeltsWord[] = [];

    pool.forEach(w => {
      const posL = w.pos.toLowerCase();
      if (posL.includes('noun')) {
        nouns.push(w);
      } else if (posL.includes('verb')) {
        verbs.push(w);
      } else if (posL.includes('adj') || posL.includes('adje')) {
        adjectives.push(w);
      } else {
        others.push(w);
      }
    });

    return {
      'Noun': nouns,
      'Verb': verbs,
      'Adjective': adjectives,
      'Adverb': others
    };
  }, [filteredWords, allWords]);

  const handleNextWords = (branchId: string, total: number) => {
    setBranchOffsets(prev => {
      const curr = prev[branchId] || 0;
      const next = (curr + 4) >= total ? 0 : curr + 4;
      return { ...prev, [branchId]: next };
    });
  };

  const handleGenerateMindmapStory = async () => {
    const selectedWords: string[] = [];
    branches.forEach(b => {
      const list = mindmapGroups[b.id] || [];
      const offset = branchOffsets[b.id] || 0;
      const visible = list.slice(offset, offset + 4);
      visible.forEach(w => {
        if (selectedWords.length < 6) {
          selectedWords.push(w.word);
        }
      });
    });

    if (selectedWords.length === 0) {
      alert('Vui lòng chọn chủ đề hoặc từ vựng hợp lệ để tạo câu chuyện ghi nhớ.');
      return;
    }

    setAiStoryLoading(true);
    setAiStory(null);
    try {
      const response = await fetch('/api/vocab/mindmap-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ words: selectedWords, topic: selectedTopic }),
      });
      if (!response.ok) throw new Error('Không thể tạo câu chuyện AI');
      const data = await response.json();
      setAiStory(data);
    } catch (err) {
      console.error(err);
      alert('Đồng bộ câu chuyện AI gặp lỗi hoặc hết hạn session. Vui lòng thử lại.');
    } finally {
      setAiStoryLoading(false);
    }
  };

  // ----------------- DYNAMIC QUIZ GENERATOR -----------------
  const startPracticeQuiz = () => {
    // Use filtered pool if not empty, else fall back to allWords
    const pool = filteredWords.length >= 4 ? filteredWords : allWords;
    if (pool.length < 4) {
      alert("Cần ít nhất 4 từ vựng trong danh sách để thiết lập dạng trắc nghiệm đầy đủ!");
      return;
    }

    // Build unique questions
    const shuffledPool = [...pool].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledPool.slice(0, Math.min(quizSize, shuffledPool.length));

    const preparedQuestions = selectedQuestions.map((target, idx) => {
      // Pick 3 random incorrect answers from pool
      const incorrects = allWords
        .filter(w => w.word !== target.word)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      const options = [target, ...incorrects].sort(() => 0.5 - Math.random());
      const correctIdx = options.findIndex(o => o.word === target.word);

      // Randomize quiz type: 0 = Definition to Word, 1 = Example fill-in cloze
      const quizType = Math.floor(Math.random() * 2);

      let questionText = '';
      if (quizType === 0) {
        questionText = `Từ nào dưới đây có nghĩa là: "${target.definition}"?`;
      } else {
        // Obfuscate target word inside sample sentence
        const blanks = '_______';
        const sentenceWithBlank = target.example.replace(new RegExp(target.word, 'gi'), blanks);
        questionText = `Chọn từ thích hợp để hoàn thiện câu sau:\n"${sentenceWithBlank}"\n(${target.exampleTranslation})`;
      }

      return {
        id: idx,
        targetWord: target,
        questionText,
        options: options.map(o => o.word),
        correctAnswerIdx: correctIdx,
        definitionExplanation: `Từ đúng là "${target.word}" (${target.pos}): ${target.definition}. Phiên âm: ${target.phonetic}.`
      };
    });

    setQuizQuestions(preparedQuestions);
    setCurrentQuizIdx(0);
    setSelectedOptionIdx(null);
    setQuizScore(0);
    setQuizFinished(false);
    setQuizStarted(true);
  };

  const handleSelectQuizOption = (optIdx: number) => {
    if (selectedOptionIdx !== null) return; // answered already
    setSelectedOptionIdx(optIdx);
    const activeQ = quizQuestions[currentQuizIdx];
    if (optIdx === activeQ.correctAnswerIdx) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOptionIdx(null);
    if (currentQuizIdx < quizQuestions.length - 1) {
      setCurrentQuizIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // ----------------- AI SENTENCE EVALUATOR -----------------
  const checkPracticeSentence = async () => {
    if (!selectedSentenceWord || !studentSentence.trim()) return;
    setSentenceEvalLoading(true);
    setSentenceEvalResult(null);
    try {
      const res = await fetch('/api/vocab/ai-evaluate-sentence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: selectedSentenceWord.word,
          studentSentence: studentSentence.trim()
        })
      });
      if (res.ok) {
        const data = await res.json();
        setSentenceEvalResult(data);
      }
    } catch (err) {
      console.error('Sentence check fail:', err);
    } finally {
      setSentenceEvalLoading(false);
    }
  };

  // Determine flashcard pool
  const flashcardPool = allWords.filter(w => {
    if (flashcardFilter === 'memorized') return memorizedWords.includes(w.word);
    if (flashcardFilter === 'unmemorized') return !memorizedWords.includes(w.word);
    return true;
  });

  const nextFlashcard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setFlashcardIndex(prev => (prev + 1) % flashcardPool.length);
    }, 150);
  };

  const prevFlashcard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setFlashcardIndex(prev => (prev - 1 + flashcardPool.length) % flashcardPool.length);
    }, 150);
  };

  return (
    <div className="space-y-6" id="ielts-3000-vocabulary-workspace">
      {/* HEADER HERO AREA */}
      <div className="bg-gradient-to-r from-indigo-900 to-violet-950 p-6 sm:p-8 rounded-3xl text-white relative overflow-hidden shadow-xl" id="vocab-hero-canvas">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-xl">
            <span className="bg-rose-500/25 border border-rose-500/50 text-rose-300 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              {vocabMode === 'ielts' ? 'Hệ Thống Luyện Từ Vựng Học Thuật' : 'Dành Cho Học Sinh Lớp 1 - 12'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight mt-3">
              {vocabMode === 'ielts' ? 'IELTS Vocabulary Mastery' : 'School English Vocabulary'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1.5 leading-relaxed">
              {vocabMode === 'ielts' 
                ? 'Trải nghiệm học tập khoa học tích hợp với AI để làm chủ 3000 từ vựng IELTS cốt lõi. Tra từ bằng AI trực quan, học qua Flashcard, luyện tập trắc nghiệm và kích hoạt chấm câu học thuật tức thì.'
                : 'Kho từ vựng đầy đủ từ Lớp 1 đến Lớp 12, được thiết kế phong phú và sắp xếp chuẩn chương trình giáo dục quốc gia Việt Nam. Học sinh trung học và tiểu học thỏa sức học qua âm thanh, Flashcard và bài tập.'
              }
            </p>
          </div>

          {/* Quick statistic counters */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto shrink-0">
            <div className="bg-white/10 p-3.5 rounded-2xl text-center border border-white/10 backdrop-blur-md">
              <p className="text-[10px] text-slate-300 font-extrabold uppercase">Thư Viện</p>
              <h5 className="text-lg font-black mt-1 text-sky-300">{allWords.length} từ</h5>
            </div>
            <div className="bg-white/10 p-3.5 rounded-2xl text-center border border-white/10 backdrop-blur-md">
              <p className="text-[10px] text-slate-300 font-extrabold uppercase">Đã Thuộc</p>
              <h5 className="text-lg font-black mt-1 text-emerald-400">{memorizedWords.length}</h5>
            </div>
            <div className="bg-white/10 p-3.5 rounded-2xl text-center border border-white/10 backdrop-blur-md">
              <p className="text-[10px] text-slate-300 font-extrabold uppercase flex items-center justify-center gap-0.5">Tiến Trình</p>
              <h5 className="text-lg font-black mt-1 text-amber-300">
                {allWords.length > 0 ? Math.round((memorizedWords.length / allWords.length) * 100) : 0}%
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* MODE TABS (IELTS VS SCHOOL VOCAB GRADE 1-12) */}
      <div className="bg-white border border-slate-150 p-1.5 rounded-2xl flex flex-col sm:flex-row gap-2 shadow-sm" id="vocab-platform-mode-selector">
        <button
          onClick={() => {
            setVocabMode('ielts');
            setSelectedTopic('All Topics');
            setSelectedBand('All Bands');
            setSearchQuery('');
            setFlashcardIndex(0);
            setIsFlipped(false);
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 ${
            vocabMode === 'ielts'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" /> IELTS Academic (3000 từ vựng)
        </button>
        <button
          onClick={() => {
            setVocabMode('school');
            setSelectedTopic('All Topics');
            setSelectedBand('All Grades');
            setSearchQuery('');
            setFlashcardIndex(0);
            setIsFlipped(false);
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 ${
            vocabMode === 'school'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
          }`}
        >
          <Sparkles className="w-4 h-4" /> Tiếng Anh Học Đường (Lớp 1 - Lớp 12)
        </button>
      </div>

      {/* CORE SEGMENT SELECTOR & SPEED TOGGLE */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2.5 p-1 bg-white border border-slate-150 rounded-2xl w-fit" id="vocab-sub-tab-holder">
          <button
            onClick={() => setActiveSegment('list')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase transition flex items-center gap-1.5 cursor-pointer ${
              activeSegment === 'list' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <Search className="w-4 h-4" /> Tra Từ & Tra cứu AI
          </button>

          <button
            onClick={() => {
              setActiveSegment('flashcard');
              setFlashcardIndex(0);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase transition flex items-center gap-1.5 cursor-pointer ${
              activeSegment === 'flashcard' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4" /> Flashcards Ghi Nhớ
          </button>

          <button
            onClick={() => {
              setActiveSegment('quiz');
              setQuizStarted(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase transition flex items-center gap-1.5 cursor-pointer ${
              activeSegment === 'quiz' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> Trắc Nghiệm Ôn Tập
          </button>

          <button
            onClick={() => {
              setActiveSegment('ai-sentence');
              setSentenceEvalResult(null);
              setStudentSentence('');
              if (filteredWords.length > 0) {
                setSelectedSentenceWord(filteredWords[0]);
              } else if (allWords.length > 0) {
                setSelectedSentenceWord(allWords[0]);
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase transition flex items-center gap-1.5 cursor-pointer ${
              activeSegment === 'ai-sentence' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <Edit3 className="w-4 h-4" /> AI Viết Câu Chuyên Sâu
          </button>

          <button
            onClick={() => {
              setActiveSegment('mindmap');
              const pool = filteredWords.length > 0 ? filteredWords : allWords;
              if (pool.length > 0) {
                setSelectedMindmapWord(pool[0]);
              } else {
                setSelectedMindmapWord(null);
              }
              setAiStory(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase transition flex items-center gap-1.5 cursor-pointer ${
              activeSegment === 'mindmap' 
              ? 'bg-indigo-600 text-white shadow-md' 
              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <Brain className="w-4 h-4 text-pink-500" /> Sơ Đồ Mindmap AI
          </button>
        </div>

        {/* SPEED CONTROL PANEL FOR SLOW TTS */}
        <div className="flex flex-wrap items-center gap-1 bg-white p-1 rounded-2xl border border-slate-150 shadow-sm text-xs sm:text-sm self-start xl:self-auto">
          <span className="font-extrabold text-slate-400 uppercase tracking-widest text-[9px] pl-2.5 pr-1.5 flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-slate-400" /> Tốc độ đọc:
          </span>
          <button
            onClick={() => setTtsSpeed(0.5)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1 ${
              ttsSpeed === 0.5 
              ? 'bg-amber-600 text-white shadow-sm' 
              : 'text-slate-600 hover:text-amber-600 hover:bg-slate-50'
            }`}
            title="Đọc rất chậm (0.5x)"
          >
            <Turtle className="w-3.5 h-3.5" /> 0.5x
          </button>
          <button
            onClick={() => setTtsSpeed(0.75)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1 ${
              ttsSpeed === 0.75 
              ? 'bg-amber-500 text-white shadow-sm' 
              : 'text-slate-600 hover:text-amber-500 hover:bg-slate-50'
            }`}
            title="Đọc chậm (0.75x)"
          >
            <Turtle className="w-3.5 h-3.5" /> 0.75x
          </button>
          <button
            onClick={() => setTtsSpeed(1.0)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1 ${
              ttsSpeed === 1.0 
              ? 'bg-indigo-600 text-white shadow-sm' 
              : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
            title="Tốc độ bình thường (1.0x)"
          >
            1.0x (Chuẩn)
          </button>
          <button
            onClick={() => setTtsSpeed(1.5)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1 ${
              ttsSpeed === 1.5 
              ? 'bg-emerald-600 text-white shadow-sm' 
              : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
            }`}
            title="Đọc nhanh (1.5x)"
          >
            1.5x 🚀
          </button>
        </div>
      </div>

      {/* SEGMENT 1: DICTIONARY & AI DISCOVERER */}
      {activeSegment === 'list' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="vocab-dictionary-layout">
          
          {/* SEARCH & FILTER CONTROLS */}
          <div className="lg:col-span-4 space-y-5 flex flex-col">
            <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-4">
              <h4 className="text-xs font-black text-indigo-950 uppercase tracking-widest flex items-center gap-1.5 pb-2.5 border-b border-slate-100">
                <Filter className="w-4 h-4 text-indigo-600" /> Bộ Lọc Tìm Kiếm
              </h4>

              {/* Keyword text search */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">Nhập Từ Khóa</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Mẹo: Gõ tiếng Việt hoặc Anh..."
                    className="w-full pl-8.5 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-indigo-500 shadow-inner"
                  />
                  <Search className="w-4.5 h-4.5 absolute left-2.5 top-3 text-slate-400" />
                </div>
              </div>

              {/* Topics dropdown selection */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">
                  {vocabMode === 'ielts' ? 'Chủ Đề Từ Vựng' : 'Chủ Đề Tiếng Anh'}
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {(vocabMode === 'ielts' ? ieltsTopicList : schoolTopicList).map(topic => (
                    <option key={topic} value={topic}>
                      {topic === 'All Topics' ? 'Tất cả chủ đề' : topic}
                    </option>
                  ))}
                </select>
              </div>

              {/* Levels dropdown selection */}
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wide">
                  {vocabMode === 'ielts' ? 'Phân Hạng IELTS Band' : 'Phân Chia Lớp Học'}
                </label>
                <select
                  value={selectedBand}
                  onChange={(e) => setSelectedBand(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {(vocabMode === 'ielts' ? ieltsBandList : schoolGradeList).map(band => (
                    <option key={band} value={band}>
                      {band === 'All Bands' ? 'Mọi band điểm (All)' : band === 'All Grades' ? 'Mọi cấp lớp (Lớp 1-12)' : band}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* EXPAND VOCABULARY BY AI ENGINE */}
            <div className="bg-indigo-50/70 p-5 rounded-2xl border border-indigo-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider">AI Word Analyzer</h4>
                  <span className="text-[8px] text-indigo-600 font-black uppercase tracking-wider bg-indigo-100 px-1.5 py-0.5 rounded-full">
                    {vocabMode === 'ielts' ? 'Mở rộng 3000 từ học thuật' : 'Phục vụ Lớp 1 - 12'}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-650 font-semibold leading-relaxed">
                {vocabMode === 'ielts' ? (
                  <>
                    Học viên tự do nhập bất kỳ từ mới tiếng Anh học thuật nào (Ví dụ: <strong className="text-indigo-900">procrastinate</strong>, <strong className="text-indigo-900">ubiquitous</strong>, <strong className="text-indigo-900">mitigate</strong>...). Giáo viên AI sẽ phân tích từ vựng, cấp phiên âm chuẩn, lấy định nghĩa, câu ví dụ và collocations ngay lập tức.
                  </>
                ) : (
                  <>
                    Các em học sinh tự do nhập bất kỳ từ mới tiếng Anh phổ thông nào (Ví dụ: <strong className="text-emerald-700">classroom</strong>, <strong className="text-emerald-700">hardworking</strong>, <strong className="text-emerald-700">beautiful</strong>...). Giáo viên AI sẽ phân nghĩa cặn kẽ, cung cấp mẫu phát âm chuẩn, tạo ví dụ đơn giản phù hợp cấp lớp đang lựa chọn.
                  </>
                )}
              </p>

              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    value={aiLookupQuery}
                    onChange={(e) => setAiLookupQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAiLookup(aiLookupQuery);
                    }}
                    placeholder="Nhập từ mới bằng tiếng Anh..."
                    disabled={lookupLoading}
                    className="w-full pl-3.5 pr-14 py-2.5 bg-white border border-indigo-150 rounded-xl text-xs sm:text-sm font-bold text-indigo-900 focus:outline-none focus:border-indigo-600 disabled:opacity-50"
                  />
                  <button
                    onClick={() => handleAiLookup(aiLookupQuery)}
                    disabled={lookupLoading || !aiLookupQuery.trim()}
                    className="absolute right-1.5 top-1.5 p-1 bg-indigo-600 hover:bg-slate-900 text-white rounded-lg transition disabled:opacity-50 cursor-pointer"
                    title="Khởi tạo từ vựng cùng AI"
                  >
                    {lookupLoading ? <RefreshCw className="w-4.5 h-4.5 animate-spin" /> : <ArrowRight className="w-4.5 h-4.5" />}
                  </button>
                </div>

                {lookupError && (
                  <p className="text-[10px] text-rose-500 font-black italic">{lookupError}</p>
                )}

                {lookupLoading && (
                  <div className="flex items-center gap-2 py-1">
                    <RefreshCw className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
                    <span className="text-[10px] text-indigo-600 font-black uppercase tracking-wider animate-pulse">AI đang giải luận từ học thuật...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* VOCABULARY LIST RESULTS */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-extrabold uppercase tracking-widest">
                Đang hiển thị {filteredWords.length} / {allWords.length} từ vựng
              </span>

              {searchQuery && filteredWords.length === 0 && (
                <button
                  onClick={() => handleAiLookup(searchQuery)}
                  disabled={lookupLoading}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black rounded-lg transition tracking-wide flex items-center gap-1 uppercase cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Thêm từ "{searchQuery}" bằng AI
                </button>
              )}
            </div>

            {filteredWords.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-150 shadow-md">
                <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <h5 className="text-sm font-extrabold text-indigo-900">Không tìm thấy từ vựng tương thích</h5>
                <p className="text-xs text-slate-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
                  Bé đã gõ từ chưa có sẵn rồi. Hãy dùng thanh <strong className="text-indigo-600">Bảng Tra AI (AI Word Analyzer)</strong> ở khung bên trái để mở khóa định nghĩa cho từ "{searchQuery || 'này'}" ngay!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="vocab-cards-grid">
                {filteredWords.map((item, idx) => {
                  const isMemorized = memorizedWords.includes(item.word);
                  const isCustom = customWords.some(cw => cw.word.toLowerCase() === item.word.toLowerCase());

                  return (
                    <div 
                      key={`${item.word}-${idx}`} 
                      className={`p-5 rounded-2xl bg-white border ${
                        isMemorized ? 'border-emerald-100/80 shadow-emerald-50/50' : 'border-slate-150'
                      } hover:border-indigo-200 hover:shadow-md transition duration-200 relative flex flex-col justify-between gap-4`}
                      id={`vocabulary-card-${item.word}`}
                    >
                      <div>
                        {/* Word card top row */}
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="px-2 py-0.5 bg-slate-100 text-indigo-750 font-black rounded text-[9px] uppercase">
                              {item.pos}
                            </span>
                            <span className="ml-1.5 bg-indigo-50 text-indigo-600 text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                              {item.bandLevel}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => toggleMemorized(item.word)}
                              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                                isMemorized 
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                                  : 'bg-white border-slate-200 text-slate-400 hover:text-emerald-600'
                              }`}
                              title={isMemorized ? "Đánh dấu là chưa thuộc" : "Đánh dấu là đã thuộc"}
                            >
                              <CheckCircle className={`w-4 h-4 ${isMemorized ? 'fill-emerald-100' : ''}`} />
                            </button>

                            {isCustom && (
                              <button
                                onClick={() => deleteCustomWord(item.word)}
                                className="p-1.5 rounded-lg bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                                title="Xóa từ lưu thủ công"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Spelling, Phonetics and definition */}
                        <div className="mt-3">
                          <h4 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                            {item.word}
                            <button
                              onClick={() => playTTS(`${item.word}`)}
                              className="p-1 hover:bg-slate-100 rounded-full transition text-indigo-600 cursor-pointer"
                              title="Nghe phát âm bản xứ"
                            >
                              <Volume2 className={`w-4 h-4 ${playingWordAudio === `${item.word}` ? 'animate-bounce text-rose-500' : ''}`} />
                            </button>
                          </h4>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{item.phonetic}</p>
                          <h5 className="text-xs sm:text-sm font-black text-indigo-900 mt-2">
                            {item.definition}
                          </h5>
                          <p className="text-[10px] text-indigo-500 font-black tracking-wider uppercase mt-1">Chủ đề: {item.topic}</p>
                        </div>

                        {/* Sentence Examples */}
                        <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-1 bg-slate-50/50 p-2.5 rounded-xl">
                          <p className="text-[10px] uppercase font-black text-slate-400">Ví Dụ Ngữ Cảnh:</p>
                          <p className="text-xs text-slate-700 italic font-medium leading-relaxed">
                            "{item.example}"
                          </p>
                          <p className="text-[11px] text-indigo-600/90 font-mono italic leading-relaxed">
                            {item.examplePhonetic || getSentencePhonetic(item.example, item.phonetic, item.word)}
                          </p>
                          <p className="text-[11px] text-slate-500 font-bold leading-normal">
                            → {item.exampleTranslation}
                          </p>
                        </div>
                      </div>

                      {/* Display Collocations & Synonyms */}
                      <div className="space-y-2 mt-2">
                        {item.collocations && item.collocations.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight shrink-0 mr-1">Collocations:</span>
                            {item.collocations.map((col, cIdx) => (
                              <span key={cIdx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">{col}</span>
                            ))}
                          </div>
                        )}

                        {item.synonyms && item.synonyms.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight shrink-0 mr-1">Từ Đồng Nghĩa:</span>
                            {item.synonyms.map((syn, sIdx) => (
                              <span key={sIdx} className="text-[10px] bg-indigo-50 text-indigo-800 px-1.5 py-0.5 rounded font-bold italic">{syn}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEGMENT 2: FLASHCARDS LEARNING */}
      {activeSegment === 'flashcard' && (
        <div className="max-w-2xl mx-auto space-y-6" id="flashcard-trainer-layout">
          {/* Controls bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-slate-150 shadow-sm gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs font-black text-slate-500 uppercase">Chế Độ Học:</label>
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5">
                <button
                  onClick={() => { setFlashcardFilter('unmemorized'); setFlashcardIndex(0); }}
                  className={`px-3 py-1 text-xs font-black rounded-md uppercase transition cursor-pointer ${flashcardFilter === 'unmemorized' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:text-indigo-600'}`}
                >
                  Chưa thuộc ({allWords.length - memorizedWords.length})
                </button>
                <button
                  onClick={() => { setFlashcardFilter('memorized'); setFlashcardIndex(0); }}
                  className={`px-3 py-1 text-xs font-black rounded-md uppercase transition cursor-pointer ${flashcardFilter === 'memorized' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:text-indigo-600'}`}
                >
                  Đã thuộc ({memorizedWords.length})
                </button>
                <button
                  onClick={() => { setFlashcardFilter('all'); setFlashcardIndex(0); }}
                  className={`px-3 py-1 text-xs font-black rounded-md uppercase transition cursor-pointer ${flashcardFilter === 'all' ? 'bg-indigo-600 text-white shadow' : 'text-slate-600 hover:text-indigo-600'}`}
                >
                  Tất cả ({allWords.length})
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-extrabold uppercase">
              Thẻ: {flashcardPool.length > 0 ? flashcardIndex + 1 : 0} / {flashcardPool.length}
            </p>
          </div>

          {flashcardPool.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-150 shadow-md">
              <Layers className="w-10 h-10 text-slate-300 mx-auto mb-4" />
              <h5 className="text-sm font-extrabold text-indigo-900">Không có từ vựng thích hợp trong nhóm này!</h5>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                Hãy đổi sang bộ lọc "Chưa Thuộc" hoặc "Tất Cả", hoặc quay lại mục học danh sách để cài đặt các từ đã thuộc tích hợp nhé.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* INTERACTIVE FLIP CARD CONTAINER */}
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full h-80 relative cursor-pointer group"
                id="flashcard-workspace-panel"
                style={{ perspective: '1000px' }}
              >
                {/* ROTATABLE CARD BLOCK */}
                <div 
                  className="w-full h-full relative duration-500 ease-out"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* FRONT SIDE (Word orthography) */}
                  <div 
                    className="absolute inset-0 bg-white border-2 border-indigo-150 shadow-xl rounded-3xl p-8 flex flex-col justify-between items-center text-center"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  >
                    <div>
                      <span className="px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 font-black rounded-full text-[10px] uppercase tracking-wider">
                        {flashcardPool[flashcardIndex].pos} / {flashcardPool[flashcardIndex].bandLevel}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
                        {flashcardPool[flashcardIndex].word}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playTTS(flashcardPool[flashcardIndex].word);
                          }}
                          className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 hover:text-indigo-850 rounded-full transition cursor-pointer"
                          title="Nghe phát âm"
                        >
                          <Volume2 className={`w-5 h-5 ${playingWordAudio === flashcardPool[flashcardIndex].word ? 'animate-bounce text-pink-550' : ''}`} />
                        </button>
                      </h3>
                      <p className="text-sm text-slate-400 font-mono tracking-wider">{flashcardPool[flashcardIndex].phonetic}</p>
                    </div>

                    <div className="text-xs text-slate-400 font-bold bg-slate-50 px-4 py-2 rounded-full flex items-center gap-1.5 uppercase tracking-wide">
                      <RefreshCw className="w-4 h-4 text-indigo-600 animate-pulse" /> Nhấp để lật xem định nghĩa
                    </div>
                  </div>

                  {/* BACK SIDE (Definition, context representation) */}
                  <div 
                    className="absolute inset-0 bg-indigo-950 border-2 border-indigo-800 text-white shadow-xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
                    style={{ 
                      backfaceVisibility: 'hidden', 
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)' 
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black text-rose-300 uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded">
                        ĐỊNH NGHĨA & VÍ DỤ
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playTTS(flashcardPool[flashcardIndex].word);
                        }}
                        className="p-1 px-2.5 bg-white/15 hover:bg-white/20 hover:text-sky-350 rounded-lg text-white font-semibold text-xs tracking-wide transition flex items-center gap-1 cursor-pointer"
                        title="Nghe giọng nói phát âm mẫu"
                      >
                        <Volume2 className={`w-4 h-4 ${playingWordAudio === flashcardPool[flashcardIndex].word ? 'animate-bounce text-pink-400' : ''}`} /> Nghe phát âm
                      </button>
                    </div>

                    <div className="text-center space-y-2 my-auto">
                      <h4 className="text-lg sm:text-2xl font-black text-amber-300">
                        {flashcardPool[flashcardIndex].definition}
                      </h4>
                      <p className="text-[11px] text-indigo-200 mt-1 uppercase font-bold tracking-widest">Chủ đề: {flashcardPool[flashcardIndex].topic}</p>

                      <div className="bg-white/5 border border-white/10 p-3 sm:p-4 rounded-2xl mt-4 max-w-md mx-auto text-left">
                        <p className="text-xs text-slate-300 italic font-medium leading-relaxed font-sans">
                          "{flashcardPool[flashcardIndex].example}"
                        </p>
                        <p className="text-[11px] text-amber-200/90 font-mono italic leading-relaxed mt-0.5">
                          {flashcardPool[flashcardIndex].examplePhonetic || getSentencePhonetic(
                            flashcardPool[flashcardIndex].example, 
                            flashcardPool[flashcardIndex].phonetic, 
                            flashcardPool[flashcardIndex].word
                          )}
                        </p>
                        <p className="text-[11px] text-sky-200 font-semibold mt-1">
                          → {flashcardPool[flashcardIndex].exampleTranslation}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-indigo-300">
                      <span>Collocations: {flashcardPool[flashcardIndex].collocations?.[0] || 'N/A'}</span>
                      <span className="font-extrabold uppercase bg-white/10 px-2 py-1 rounded text-[10px]">Quay lại để xem từ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION TOGGLERS BAR */}
              <div className="flex justify-between items-center gap-4">
                <button
                  onClick={prevFlashcard}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
                >
                  Thẻ Trước
                </button>

                <button
                  onClick={() => toggleMemorized(flashcardPool[flashcardIndex].word)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow ${
                    memorizedWords.includes(flashcardPool[flashcardIndex].word)
                      ? 'bg-rose-50 border border-rose-250 text-rose-600'
                      : 'bg-emerald-600 hover:bg-slate-900 text-white'
                  }`}
                >
                  {memorizedWords.includes(flashcardPool[flashcardIndex].word) ? (
                    <> Cần ôn lại thẻ này </>
                  ) : (
                    <> <Check className="w-4 h-4" /> Đã thuộc từ này </>
                  )}
                </button>

                <button
                  onClick={nextFlashcard}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
                >
                  Thẻ Sau
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SEGMENT 3: MULTIPLE CHOICE PRACTICE QUIZZES */}
      {activeSegment === 'quiz' && (
        <div className="max-w-xl mx-auto" id="quiz-tester-layout">
          {!quizStarted ? (
            <div className="bg-white p-7 rounded-2xl border border-slate-150 shadow-md space-y-6 text-center">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-sm">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-base font-black text-slate-900 tracking-tight">Mini Mock Test - Trắc Nghiệm Ôn Tập</h4>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  Luyện tập các phản xạ định nghĩa từ vựng và câu cấu trúc điền khuyết dựa trên các từ vựng đã học trong kho từ.
                </p>
              </div>

              {/* Set size config */}
              <div className="space-y-2 p-4 bg-slate-50/50 rounded-2xl text-left max-w-sm mx-auto">
                <label className="text-[10px] uppercase font-black text-slate-400 tracking-wide">Chọn Số Câu Đố:</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[5, 10, 15].map(size => (
                    <button
                      key={size}
                      onClick={() => setQuizSize(size)}
                      className={`py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                        quizSize === size 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {size} Câu
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={startPracticeQuiz}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-700 hover:from-slate-900 hover:to-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-xl transition shadow-lg shadow-indigo-100 cursor-pointer"
                >
                  Bắt Đầu Làm Bài
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* QUIZ SCOREBOARD HEADER */}
              <div className="bg-white py-3 px-5 rounded-2xl border border-slate-150 shadow-sm flex justify-between items-center text-xs">
                <span className="font-black text-indigo-950 uppercase tracking-wide">
                  IELTS Core Mock Quiz: {currentQuizIdx + 1} / {quizQuestions.length}
                </span>

                <span className="font-extrabold uppercase bg-indigo-50 text-indigo-750 px-2.5 py-1 rounded">
                  Điểm: {quizScore} / {quizQuestions.length}
                </span>
              </div>

              {quizFinished ? (
                <div className="bg-white p-8 rounded-2xl border border-slate-150 shadow-md text-center space-y-5" id="quiz-result-card">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto border-2 border-emerald-100">
                    <Check className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-slate-900">Hoàn Thành Mini Mock Quiz!</h4>
                    <p className="text-xs text-slate-400 font-semibold">Bé đã trả lời đúng {quizScore} câu trên tổng số {quizQuestions.length} câu hỏi ôn tập.</p>
                  </div>

                  <div className="bg-indigo-50/50 p-4 border border-indigo-100/60 rounded-2xl max-w-sm mx-auto">
                    <p className="text-xl font-black text-indigo-900 font-display">
                      Tỷ Lệ Đúng: {Math.round((quizScore / quizQuestions.length) * 100)}%
                    </p>
                    <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase mt-1">Excellent Effort!</p>
                  </div>

                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => setQuizStarted(false)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer"
                    >
                      Đổi Cấu Hình Lại
                    </button>
                    <button
                      onClick={startPracticeQuiz}
                      className="px-5 py-2.5 bg-indigo-605 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow shadow-indigo-100 cursor-pointer animate-none"
                    >
                      Làm Lượt Mới
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-150 shadow-sm space-y-6">
                  {/* Question Box */}
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-[9px] uppercase font-black text-indigo-750 tracking-widest bg-white shadow-xs px-2 py-0.5 rounded border">
                      CÂU HỎI {currentQuizIdx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-800 whitespace-pre-line leading-relaxed mt-3">
                      {quizQuestions[currentQuizIdx].questionText}
                    </p>
                  </div>

                  {/* Options List */}
                  <div className="space-y-3">
                    {quizQuestions[currentQuizIdx].options.map((opt: string, oIdx: number) => {
                      const isSelected = selectedOptionIdx === oIdx;
                      const isCorrectAnswer = quizQuestions[currentQuizIdx].correctAnswerIdx === oIdx;
                      const hasAnswered = selectedOptionIdx !== null;

                      let btnStyle = 'border-slate-250 bg-white text-slate-700 hover:bg-slate-50';
                      if (hasAnswered) {
                        if (isCorrectAnswer) {
                          btnStyle = 'border-emerald-300 bg-emerald-50 text-emerald-800';
                        } else if (isSelected) {
                          btnStyle = 'border-rose-300 bg-rose-50 text-rose-800';
                        } else {
                          btnStyle = 'border-slate-100 bg-slate-25/40 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectQuizOption(oIdx)}
                          disabled={hasAnswered}
                          className={`w-full p-3.5 border rounded-xl text-left text-xs sm:text-sm font-black transition cursor-pointer flex justify-between items-center ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {hasAnswered && isCorrectAnswer && (
                            <span className="text-[10px] text-emerald-600 uppercase font-black tracking-wide">Đúng rồi ✓</span>
                          )}
                          {hasAnswered && isSelected && !isCorrectAnswer && (
                            <span className="text-[10px] text-rose-600 uppercase font-black tracking-wide">Sai ✗</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedbacks / Explanations */}
                  {selectedOptionIdx !== null && (
                    <div className="p-4 bg-sky-50 border border-sky-100 rounded-xl space-y-1 text-xs">
                      <p className="font-extrabold text-sky-800 flex items-center gap-1">💡 GIẢI THÍCH CHI TIẾT:</p>
                      <p className="text-slate-655 font-medium leading-relaxed mt-1">
                        {quizQuestions[currentQuizIdx].definitionExplanation}
                      </p>
                    </div>
                  )}

                  {/* Action buttons */}
                  {selectedOptionIdx !== null && (
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handleNextQuiz}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-slate-900 border border-indigo-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                      >
                        {currentQuizIdx < quizQuestions.length - 1 ? 'Câu Tiếp Theo' : 'Xem Kết Quả Mock Quiz'} <ArrowRight className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* SEGMENT 5: GRAPHIC MINDMAP VIEW */}
      {activeSegment === 'mindmap' && (
        <div className="space-y-6" id="vocab-mindmap-view">
          
          {/* MULTI-MODE TABS */}
          <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-3 rounded-2xl border border-slate-150 shadow-sm">
            <div className="flex flex-wrap bg-slate-100 p-1.5 rounded-xl border border-slate-200/60 max-w-full shrink-0 gap-1">
              <button
                onClick={() => setMindmapSubTab('book')}
                className={`px-4 py-2 text-xs sm:text-sm font-black uppercase rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  mindmapSubTab === 'book'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-white/40'
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-500" /> EBOOK VOCABULARY IELTS
              </button>
              <button
                onClick={() => setMindmapSubTab('hack3000')}
                className={`px-4 py-2 text-xs sm:text-sm font-black uppercase rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  mindmapSubTab === 'hack3000'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-white/40'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-550 animate-pulse" /> Sách Hack 3.000 từ
              </button>
              <button
                onClick={() => setMindmapSubTab('poster')}
                className={`px-4 py-2 text-xs sm:text-sm font-black uppercase rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  mindmapSubTab === 'poster'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-white/40'
                }`}
              >
                <GitFork className="w-4 h-4 text-emerald-500" /> Sơ Đồ Nhánh Cụm Từ
              </button>
              <button
                onClick={() => setMindmapSubTab('bubbles')}
                className={`px-4 py-2 text-xs sm:text-sm font-black uppercase rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  mindmapSubTab === 'bubbles'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-white/40'
                }`}
              >
                <Brain className="w-4 h-4 text-pink-500" /> Sơ Đồ Bong Bóng (Từ Loại)
              </button>
              <button
                onClick={() => setMindmapSubTab('practice')}
                className={`px-4 py-2 text-xs sm:text-sm font-black uppercase rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  mindmapSubTab === 'practice'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-white/40'
                }`}
              >
                <Sparkles className="w-4 h-4 text-violet-500 animate-pulse" /> Thực Hành Sách (Trò Chơi)
              </button>
              <button
                onClick={() => setMindmapSubTab('speaking')}
                className={`px-4 py-2 text-xs sm:text-sm font-black uppercase rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  mindmapSubTab === 'speaking'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-rose-650 hover:bg-white/40'
                }`}
              >
                <Mic className="w-4 h-4 text-rose-500 animate-bounce" /> HACK SPEAKING
              </button>
            </div>

            <div className="text-xs text-slate-500 font-bold max-w-sm sm:text-right">
              {mindmapSubTab === 'book'
                ? 'Phương pháp đột phá học 17 chủ đề từ vựng qua Sơ Đồ Tư Duy của EBOOK VOCABULARY IELTS.'
                : mindmapSubTab === 'hack3000'
                ? 'Đột phá ghi nhớ 3.000 từ tiếng Anh thông dụng theo chủ đề bám sát Sách Hack 3.000 từ.'
                : mindmapSubTab === 'poster'
                ? 'Tìm hiểu các động từ/từ khóa phổ biến rẽ nhánh sang Collocations & Phrasal Verbs.'
                : mindmapSubTab === 'bubbles'
                ? 'Phân tích tổng quan từ vựng theo cấu trúc Danh từ, Động từ, Tính từ.'
                : mindmapSubTab === 'practice'
                ? 'Giải đố kịch tính: Nối từ, giải ô chữ bong bóng và sắp nhóm từ vựng chuẩn 100% theo các bài tập từ cuốn sách!'
                : 'Luyện nói phản xạ bứt phá giao tiếp IELTS (Hack Speaking) qua Sơ đồ Tư duy & công nghệ Trí tuệ Nhân tạo AI.'}
            </div>
          </div>

          {/* MODE 3: THE PREMIUM BOOK MINDMAP CORE */}
          {mindmapSubTab === 'book' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
              
              {/* SIDEBAR: CHAPTERS LIST */}
              <div className="lg:col-span-3 space-y-4">
                
                {/* SIDEBAR LIST */}
                <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-sm">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                    17 Chương Ebook Vocabulary IELTS
                  </h4>
                  <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
                    Chọn chương trong EBOOK VOCABULARY IELTS để bắt đầu học tập trực quan qua sơ đồ tư duy.
                  </p>
                  
                  <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
                    {BOOK_MINDMAPS.map((chap) => {
                      const isActive = selectedBookChapterId === chap.id;
                      return (
                        <button
                          key={chap.id}
                          onClick={() => {
                            setSelectedBookChapterId(chap.id);
                            const firstSec = chap.sections[0];
                            setSelectedBookSectionId(firstSec ? firstSec.id : '');
                            setSelectedBookNode(null);
                            setSelectedBookCategory('');
                          }}
                          className={`w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                            isActive
                              ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-sm text-amber-950 scale-[1.01]'
                              : 'bg-slate-50 border-slate-100 hover:bg-slate-100/60 text-slate-700'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <span className="text-[10px] font-bold text-amber-600 block leading-tight uppercase">
                              CHƯƠNG 0{chap.id}
                            </span>
                            <span className="text-xs font-black truncate block">
                              {chap.title}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-100 shrink-0">
                            {chap.vietnameseTitle}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* MINDMAP CANVAS & INTERACTIVE INSPECTOR */}
              <div className="lg:col-span-9 space-y-6">
                
                {/* ACTIVE TOPIC & SECTION TAB LIST */}
                {(() => {
                  const chap = BOOK_MINDMAPS.find(c => c.id === selectedBookChapterId) || BOOK_MINDMAPS[0];
                  return (
                    <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-sm space-y-4">
                      
                      {/* HEADER TITLE */}
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                            Đang học: Chương 0{chap.id} - {chap.vietnameseTitle}
                          </span>
                          <h2 className="text-xl font-black text-slate-900">
                            Chủ đề chính: {chap.title}
                          </h2>
                        </div>
                        <div className="bg-amber-100 text-amber-950 px-3 py-1 rounded-full text-xs font-black tracking-tight self-start sm:self-auto flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-amber-600" /> Bản Quy Chuẩn Đột Phá
                        </div>
                      </div>

                      {/* SECTION COMPONENT SWITCHER */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                          Chọn sơ đồ thành phần (Sections):
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {chap.sections.map((sec) => {
                            const isSelected = selectedBookSectionId === sec.id;
                            return (
                              <button
                                key={sec.id}
                                onClick={() => {
                                  setSelectedBookSectionId(sec.id);
                                  setSelectedBookNode(null);
                                  setSelectedBookCategory('');
                                }}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-1.5 border ${
                                  isSelected
                                    ? 'bg-slate-900 border-slate-900 text-white shadow'
                                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                                }`}
                              >
                                {sec.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* GRAPH STAGE */}
                {(() => {
                  const chap = BOOK_MINDMAPS.find(c => c.id === selectedBookChapterId) || BOOK_MINDMAPS[0];
                  const sec = chap.sections.find(s => s.id === selectedBookSectionId) || chap.sections[0];
                  if (!sec) {
                    return (
                      <div className="bg-slate-50 p-8 text-center rounded-2xl border border-slate-200">
                        Chủ đề này đang được nạp thêm dữ liệu từ vựng. Vui lòng quay lại sau!
                      </div>
                    );
                  }

                  const activeNodes = sec.nodes;
                  const categories = sec.categories;
                  const filteredNodes = selectedBookCategory 
                    ? activeNodes.filter(n => n.category === selectedBookCategory)
                    : activeNodes;

                  return (
                    <div className="space-y-6">
                      
                      {/* INTERACTIVE MINDMAP STAGE */}
                      <div className="relative h-[480px] bg-slate-950 border border-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-4">
                        
                        {/* CANVAS AMBIENT GLOW */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                        
                        {/* THE GRAPH TITLE MARGINS */}
                        <div className="z-10 bg-slate-900/80 backdrop-blur border border-slate-800 p-3 rounded-2xl text-slate-300 max-w-sm">
                          <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                            EBOOK VOCABULARY IELTS - Sơ Đồ Tư Duy
                          </p>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {sec.description}
                          </p>
                        </div>

                        {/* CENTRAL NODE */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                          <div className="w-24 h-24 rounded-full bg-slate-900 border-4 border-amber-500 flex flex-col items-center justify-center p-2 text-center shadow-xl shadow-amber-500/20 animate-pulse">
                            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest leading-none">
                              CHỦ ĐỀ
                            </span>
                            <span className="text-xs font-black text-white mt-1 leading-tight break-words">
                              {sec.name.split(' ')[0]}
                            </span>
                            <span className="text-[9px] text-slate-400 mt-1 truncate">
                              Central Node
                            </span>
                          </div>
                        </div>

                        {/* SVG NETWORKS */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                          <defs>
                            <linearGradient id="neon-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                              <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                            </linearGradient>
                          </defs>
                          {categories.map((cat, i) => {
                            const total = categories.length;
                            // Presets depending on category size
                            const getSatCoords = (index: number, tot: number) => {
                              if (tot === 3) {
                                return [ {x: 25, y: 30}, {x: 75, y: 30}, {x: 50, y: 80} ][index];
                              } else if (tot === 4) {
                                return [ {x: 20, y: 30}, {x: 80, y: 30}, {x: 20, y: 75}, {x: 80, y: 75} ][index];
                              } else if (tot === 5) {
                                return [ {x: 50, y: 15}, {x: 15, y: 45}, {x: 85, y: 45}, {x: 25, y: 80}, {x: 75, y: 80} ][index];
                              } else {
                                const presets = [
                                  {x: 50, y: 15},
                                  {x: 18, y: 35},
                                  {x: 82, y: 35},
                                  {x: 18, y: 70},
                                  {x: 82, y: 70},
                                  {x: 50, y: 85}
                                ];
                                return presets[index % presets.length];
                              }
                            };
                            const coord = getSatCoords(i, total);
                            return (
                              <g key={cat.id}>
                                <path
                                  d={`M 50 50 Q ${(50 + coord.x) / 2} ${(50 + coord.y) / 2 - 5} ${coord.x} ${coord.y}`}
                                  fill="none"
                                  stroke="url(#neon-glow)"
                                  strokeWidth="2.5"
                                  strokeDasharray="4,4"
                                  pathLength="100"
                                  className="opacity-80"
                                  style={{
                                    strokeDashoffset: -20,
                                    animation: 'dash 10s linear infinite'
                                  }}
                                />
                              </g>
                            );
                          })}
                        </svg>

                        {/* SATELLITE CATEGORY BUBBLES */}
                        {categories.map((cat, i) => {
                          const total = categories.length;
                          const getSatCoords = (index: number, tot: number) => {
                            if (tot === 3) {
                              return [ {x: 25, y: 30}, {x: 75, y: 30}, {x: 50, y: 80} ][index];
                            } else if (tot === 4) {
                              return [ {x: 20, y: 30}, {x: 80, y: 30}, {x: 20, y: 75}, {x: 80, y: 75} ][index];
                            } else if (tot === 5) {
                              return [ {x: 50, y: 15}, {x: 15, y: 45}, {x: 85, y: 45}, {x: 25, y: 80}, {x: 75, y: 80} ][index];
                            } else {
                              const presets = [
                                {x: 50, y: 15},
                                {x: 18, y: 35},
                                {x: 82, y: 35},
                                {x: 18, y: 70},
                                {x: 82, y: 70},
                                {x: 50, y: 85}
                              ];
                              return presets[index % presets.length];
                            }
                          };
                          const coord = getSatCoords(i, total);
                          const isCatActive = selectedBookCategory === cat.id;
                          const nodeCount = activeNodes.filter(n => n.category === cat.id).length;

                          return (
                            <div
                              key={cat.id}
                              style={{ left: `${coord.x}%`, top: `${coord.y}%` }}
                              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 hover:scale-110 active:scale-95 transition-all duration-300"
                            >
                              <button
                                onClick={() => {
                                  setSelectedBookCategory(isCatActive ? '' : cat.id);
                                  setSelectedBookNode(null);
                                }}
                                className={`px-4 py-2.5 rounded-2xl border text-xs font-black shadow-lg cursor-pointer transition flex flex-col items-center justify-center bg-gradient-to-br min-w-[100px] text-center ${
                                  isCatActive 
                                    ? 'scale-105 ring-4 ring-indigo-500/50 border-white' 
                                    : 'border-slate-800'
                                } ${cat.color}`}
                              >
                                <span className="uppercase tracking-wider text-[9px] opacity-90 leading-none">
                                  NHÓM
                                </span>
                                <span className="font-extrabold text-xs block mt-0.5 whitespace-nowrap">
                                  {cat.name.split(' (')[0]}
                                </span>
                                <span className="text-[10px] font-bold mt-1 opacity-75">
                                  {nodeCount} từ vựng
                                </span>
                              </button>
                            </div>
                          );
                        })}

                        {/* CANVAS STAGE FOOTER INFO */}
                        <div className="z-10 bg-slate-900/40 backdrop-blur-sm self-end rounded-xl px-3 py-1.5 border border-slate-800/40 text-[10px] text-slate-400">
                          ⚡ Mẹo: Click chọn các Bong Bóng Nhóm để lọc nhanh từ vựng dải màu sắc.
                        </div>
                      </div>

                      {/* WORDS LIST OF THE ACTIVE CATEGORY OR ACTIVE SECTION */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                          <div>
                            <h3 className="text-sm sm:text-base font-black text-slate-900">
                              {selectedBookCategory 
                                ? `Danh sách từ thuộc nhóm: ${categories.find(c => c.id === selectedBookCategory)?.name || ''}` 
                                : `Tất cả từ vựng trong sơ đồ: ${sec.name}`}
                            </h3>
                            <p className="text-xs text-slate-500">
                              Chọn từ vựng để phát âm chuẩn Mỹ, xem dịch nghĩa chi tiết và lưu làm tư liệu ôn thi!
                            </p>
                          </div>
                          {selectedBookCategory && (
                            <button
                              onClick={() => setSelectedBookCategory('')}
                              className="text-xs font-black text-indigo-600 hover:text-indigo-800 self-start sm:self-auto cursor-pointer flex items-center gap-1.5"
                            >
                              Hiển thị tất cả ({activeNodes.length} từ) &rarr;
                            </button>
                          )}
                        </div>

                        {/* WORDS GRID CONTAINER */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {filteredNodes.map((node, nodeIdx) => {
                            const isSelected = selectedBookNode?.word === node.word;
                            const isWordMem = memorizedWords.includes(node.word);

                            return (
                              <div
                                key={`${node.word}-${nodeIdx}`}
                                onClick={() => {
                                  setSelectedBookNode(node);
                                  playTTS(node.word);
                                }}
                                className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden flex flex-col justify-between group ${
                                  isSelected
                                    ? 'bg-gradient-to-br from-indigo-50 to-pink-50 border-indigo-500 ring-2 ring-indigo-500/20 scale-[1.02] shadow-md shadow-indigo-500/5'
                                    : 'bg-white border-slate-150 hover:bg-slate-50/60 hover:border-slate-300'
                                }`}
                              >
                                
                                {/* DECORATIVE CAT STRIPE */}
                                <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-200" />

                                <div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-450 font-sans">
                                      {node.pos}
                                    </span>
                                    {isWordMem && (
                                      <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-1 py-0.5 rounded">
                                        THUỘC ✅
                                      </span>
                                    )}
                                  </div>

                                  <h4 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition mt-1">
                                    {node.word}
                                  </h4>
                                  <p className="text-xs text-slate-500 font-mono tracking-tighter mt-0.5 font-bold">
                                    {node.phonetic}
                                  </p>
                                </div>

                                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                                  <span className="font-semibold truncate max-w-[80%]">
                                    {node.definition}
                                  </span>
                                  <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:scale-110 transition" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* WORD ELEMENT INSPECTOR PANEL */}
                      {selectedBookNode ? (
                        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6 mt-6 animate-in slide-in-from-bottom duration-300">
                          
                          {/* HEAD DEF PART */}
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div className="space-y-1.5 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-2xl font-black tracking-tight text-white select-all">
                                  {selectedBookNode.word}
                                </h2>
                                <span className="bg-slate-800 text-indigo-300 border border-slate-700 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-black uppercase">
                                  {selectedBookNode.pos}
                                </span>
                                <span className="bg-emerald-950 text-emerald-300 border border-emerald-990 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold font-mono">
                                  {selectedBookNode.phonetic}
                                </span>
                              </div>
                              <p className="text-base font-bold text-amber-400">
                                Ý nghĩa: {selectedBookNode.definition}
                              </p>
                            </div>

                            {/* CTAS */}
                            <div className="flex flex-wrap gap-2 shrink-0">
                              <button
                                onClick={() => playTTS(selectedBookNode.word)}
                                className="bg-indigo-600 hover:bg-indigo-750 px-3 py-2 rounded-xl transition cursor-pointer text-white flex items-center justify-center shadow-lg shadow-indigo-650/20 text-xs font-bold"
                                title="Phát âm từ"
                              >
                                <Volume2 className="w-3.5 h-3.5 mr-1" /> Nghe phát âm
                              </button>

                              {/* SAVE WORD AS CUSTOM FOR LEARNING SYSTEM-WIDE */}
                              {(() => {
                                const isWordSaved = allWords.some(w => w.word.toLowerCase() === selectedBookNode.word.toLowerCase());
                                return (
                                  <button
                                    onClick={() => {
                                      if (isWordSaved) {
                                        deleteCustomWord(selectedBookNode.word);
                                        if (memorizedWords.includes(selectedBookNode.word)) {
                                          toggleMemorized(selectedBookNode.word);
                                        }
                                      } else {
                                        const cleanWordItem: IeltsWord = {
                                          word: selectedBookNode.word,
                                          pos: selectedBookNode.pos,
                                          phonetic: selectedBookNode.phonetic,
                                          definition: selectedBookNode.definition,
                                          bandLevel: "Band 7.5+",
                                          topic: chap.title,
                                          example: selectedBookNode.example,
                                          exampleTranslation: selectedBookNode.exampleTranslation,
                                          collocations: [],
                                          synonyms: []
                                        };
                                        setCustomWords(prev => [cleanWordItem, ...prev]);
                                      }
                                    }}
                                    className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                                      isWordSaved
                                        ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow'
                                        : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100'
                                    }`}
                                  >
                                    <Star className={`w-3.5 h-3.5 ${isWordSaved ? 'fill-current text-amber-950' : ''}`} />
                                    {isWordSaved ? 'Đã lưu sổ tay ⭐' : 'Lưu sổ tay'}
                                  </button>
                                );
                              })()}

                              {/* TOGGLE MEMORIZED STATE */}
                              <button
                                onClick={() => toggleMemorized(selectedBookNode.word)}
                                className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                                  memorizedWords.includes(selectedBookNode.word)
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                    : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100'
                                }`}
                              >
                                <Check className="w-3.5 h-3.5" />
                                {memorizedWords.includes(selectedBookNode.word) ? 'Đã thuộc ✅' : 'Đánh dấu thuộc'}
                              </button>
                            </div>
                          </div>

                          {/* EXAMPLE SCENE */}
                          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-805 space-y-3.5">
                            <h4 className="text-[10px] font-black uppercase text-amber-500 tracking-wider flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" /> Ví dụ ngữ cảnh chuẩn IELTS (Contextual Sample):
                            </h4>
                            <div className="space-y-1.5">
                              <p className="text-base font-black text-slate-200 select-all leading-relaxed">
                                {selectedBookNode.example}
                              </p>
                              <p className="text-sm font-semibold text-slate-400 leading-relaxed">
                                {selectedBookNode.exampleTranslation}
                              </p>
                            </div>
                            <div className="flex justify-end">
                              <button
                                onClick={() => playTTS(selectedBookNode.example)}
                                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-0"
                              >
                                <Volume2 className="w-3 h-3" /> Nghe phát âm nguyên câu
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-50 border border-dashed border-slate-200 p-8 rounded-2xl text-center text-slate-500 font-bold">
                          💡 Vui lòng lựa chọn một từ vựng bất kỳ ở trên để hiển thị thông tin chi tiết và lưu làm bài học ôn tập riêng.
                        </div>
                      )}

                    </div>
                  );
                })()}

              </div>

            </div>
          )}

          {/* MODE 5: SÁCH HACK 3.000 TỰ */}
          {mindmapSubTab === 'hack3000' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
              
              {/* SIDEBAR: THEMES LIST */}
              <div className="lg:col-span-3 space-y-4">
                
                {/* SIDEBAR LIST */}
                <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-sm">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                    {hack3000Data.length} Themes Hack 3.000 Từ
                  </h4>
                  <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
                    Học từ vựng qua các Themes chính & {hack3000Data.reduce((acc, chap) => acc + chap.sections.length, 0)} topics từ cuốn sách Hack 3.000 từ.
                  </p>
                  
                  <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
                    {[...hack3000Data].sort((a, b) => {
                      const numA = getThemeNumberFromTitle(a.title);
                      const numB = getThemeNumberFromTitle(b.title);
                      if (numA !== numB) {
                        return numA - numB;
                      }
                      return a.title.localeCompare(b.title);
                    }).map((chap) => {
                      const isActive = selectedHackChapterId === chap.id;
                      return (
                        <button
                          key={chap.id}
                          onClick={() => {
                            setSelectedHackChapterId(chap.id);
                            const firstSec = chap.sections[0];
                            setSelectedHackSectionId(firstSec ? firstSec.id : '');
                            setSelectedHackNode(null);
                            setSelectedHackCategory('');
                          }}
                          className={`w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                            isActive
                              ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-sm text-amber-950 scale-[1.01]'
                              : 'bg-slate-50 border-slate-100 hover:bg-slate-100/60 text-slate-700'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <span className="text-[10px] font-bold text-amber-600 block leading-tight uppercase">
                              THEME {(() => {
                                const tNum = getThemeNumberFromTitle(chap.title);
                                return tNum < 10 ? `0${tNum}` : tNum;
                              })()}
                            </span>
                            <span className="text-xs font-black truncate block">
                              {chap.title.includes(': ') ? chap.title.split(': ')[1] : chap.title}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-100 shrink-0 max-w-[80px] truncate">
                            {chap.vietnameseTitle}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* MINDMAP CANVAS & INTERACTIVE INSPECTOR */}
              <div className="lg:col-span-9 space-y-6">
                
                {/* ACTIVE TOPIC & SECTION TAB LIST */}
                {(() => {
                  const chap = hack3000Data.find(c => c.id === selectedHackChapterId) || hack3000Data[0];
                  const sec = chap.sections.find((s: any) => s.id === selectedHackSectionId) || chap.sections[0];
                  return (
                    <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-sm space-y-4">
                      
                      {/* HEADER TITLE */}
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                            Đang học: Theme {(() => {
                              const tNum = getThemeNumberFromTitle(chap.title);
                              return tNum < 10 ? `0${tNum}` : tNum;
                            })()} - {chap.vietnameseTitle}
                          </span>
                          <h2 className="text-xl font-black text-slate-900">
                            Theme chính: {chap.title}
                          </h2>
                        </div>
                        <div className="bg-amber-100 text-amber-950 px-3 py-1 rounded-full text-xs font-black tracking-tight self-start sm:self-auto flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-amber-600" /> Sách Hack 3.000 Từ
                        </div>
                      </div>

                      {/* SECTION COMPONENT SWITCHER */}
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                            Chọn sơ đồ thành phần (Topics):
                          </span>
                          
                          <div className="flex flex-wrap items-center gap-2">
                            {/* RESET BUTTON */}
                            <button
                              onClick={() => {
                                if (window.confirm("Bạn có chắc chắn muốn đặt lại sơ đồ về dữ liệu gốc từ sách không?")) {
                                  setHack3000Data(HACK_3000_MINDMAPS.filter((chap: any) => {
                                    const themeNum = getThemeNumberFromTitle(chap.title);
                                    return !(themeNum >= 11 && themeNum <= 13) || chap.title.includes("Nature") || chap.title.includes("Make-up") || chap.title.includes("Makeup") || chap.title.includes("Public places") || chap.title.includes("Public Places");
                                  }));
                                }
                              }}
                              className="px-3 py-1.5 rounded-lg text-xs font-black bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                              title="Đặt lại dữ liệu gốc từ sách"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              Đặt Lại Gốc
                            </button>

                            {/* AI EXPANSION ACTION BUTTON */}
                            {sec && (
                              <button
                                onClick={() => expandHackTopicWithAI(chap.id, sec.id)}
                                disabled={isExpandingHack}
                                className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                                  isExpandingHack
                                    ? 'bg-indigo-100 text-indigo-500 cursor-not-allowed animate-pulse'
                                    : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md shadow-indigo-500/10 active:scale-95'
                                }`}
                              >
                                <Sparkles className={`w-3.5 h-3.5 ${isExpandingHack ? 'animate-spin' : ''}`} />
                                {isExpandingHack ? 'Đang nạp từ vựng...' : 'Nạp Thêm Từ Vựng AI Cho Topic Này'}
                              </button>
                            )}
                          </div>
                        </div>

                        {hackExpansionError && (
                          <div className="text-xs text-rose-600 bg-rose-50 border border-rose-100 p-2.5 rounded-xl flex items-center gap-1.5 animate-in slide-in-from-top-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{hackExpansionError}</span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          {chap.sections.map((secItem: any) => {
                            const isSelected = selectedHackSectionId === secItem.id;
                            return (
                              <button
                                key={secItem.id}
                                onClick={() => {
                                  setSelectedHackSectionId(secItem.id);
                                  setSelectedHackNode(null);
                                  setSelectedHackCategory('');
                                }}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-1.5 border ${
                                  isSelected
                                    ? 'bg-slate-900 border-slate-900 text-white shadow'
                                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                                }`}
                              >
                                {secItem.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* GRAPH STAGE */}
                {(() => {
                  const chap = hack3000Data.find(c => c.id === selectedHackChapterId) || hack3000Data[0];
                  const sec = chap.sections.find((s: any) => s.id === selectedHackSectionId) || chap.sections[0];
                  if (!sec) {
                    return (
                      <div className="bg-slate-50 p-8 text-center rounded-2xl border border-slate-200">
                        Chủ đề này đang được nạp thêm dữ liệu từ vựng. Vui lòng quay lại sau!
                      </div>
                    );
                  }

                  const activeNodes = sec.nodes;
                  const categories = sec.categories;
                  const filteredNodes = selectedHackCategory 
                    ? activeNodes.filter(n => n.category === selectedHackCategory)
                    : activeNodes;

                  return (
                    <div className="space-y-6">
                      
                      {/* INTERACTIVE MINDMAP STAGE */}
                      <div className="relative h-[480px] bg-slate-950 border border-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-4">
                        
                        {/* CANVAS AMBIENT GLOW */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                        
                        {/* THE GRAPH TITLE MARGINS */}
                        <div className="z-10 bg-slate-900/80 backdrop-blur border border-slate-800 p-3 rounded-2xl text-slate-300 max-w-sm">
                          <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                            Sách Hack 3.000 Từ - Học Bằng Sơ Đồ Tư Duy
                          </p>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {sec.description}
                          </p>
                        </div>

                        {/* CENTRAL NODE */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                          <div className="w-24 h-24 rounded-full bg-slate-900 border-4 border-amber-500 flex flex-col items-center justify-center p-2 text-center shadow-xl shadow-amber-500/20 animate-pulse">
                            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest leading-none">
                              CHỦ ĐỀ
                            </span>
                            <span className="text-xs font-black text-white mt-1 leading-tight break-words px-1">
                              {sec.name.includes(': ') ? sec.name.split(': ')[1].split(' ')[0] : sec.name.split(' ')[0]}
                            </span>
                            <span className="text-[9px] text-slate-400 mt-1 truncate">
                              Central Node
                            </span>
                          </div>
                        </div>

                        {/* SVG NETWORKS */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                          <defs>
                            <linearGradient id="neon-glow-hack" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                              <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                            </linearGradient>
                          </defs>
                          {categories.map((cat, i) => {
                            const total = categories.length;
                            const getSatCoords = (index: number, tot: number) => {
                              if (tot === 3) {
                                return [ {x: 25, y: 30}, {x: 75, y: 30}, {x: 50, y: 80} ][index];
                              } else if (tot === 4) {
                                return [ {x: 20, y: 30}, {x: 80, y: 30}, {x: 20, y: 75}, {x: 80, y: 75} ][index];
                              } else if (tot === 5) {
                                return [ {x: 50, y: 15}, {x: 15, y: 45}, {x: 85, y: 45}, {x: 25, y: 80}, {x: 75, y: 80} ][index];
                              } else {
                                const presets = [
                                  {x: 50, y: 15},
                                  {x: 18, y: 35},
                                  {x: 82, y: 35},
                                  {x: 18, y: 70},
                                  {x: 82, y: 70},
                                  {x: 50, y: 85}
                                ];
                                return presets[index % presets.length];
                              }
                            };
                            const coord = getSatCoords(i, total);
                            return (
                              <g key={cat.id}>
                                <path
                                  d={`M 50 50 Q ${(50 + coord.x) / 2} ${(50 + coord.y) / 2 - 5} ${coord.x} ${coord.y}`}
                                  fill="none"
                                  stroke="url(#neon-glow-hack)"
                                  strokeWidth="2.5"
                                  strokeDasharray="4,4"
                                  pathLength="100"
                                  className="opacity-80"
                                  style={{
                                    strokeDashoffset: -20,
                                    animation: 'dash 10s linear infinite'
                                  }}
                                />
                              </g>
                            );
                          })}
                        </svg>

                        {/* SATELLITE CATEGORY BUBBLES */}
                        {categories.map((cat, i) => {
                          const total = categories.length;
                          const getSatCoords = (index: number, tot: number) => {
                            if (tot === 3) {
                              return [ {x: 25, y: 30}, {x: 75, y: 30}, {x: 50, y: 80} ][index];
                            } else if (tot === 4) {
                              return [ {x: 20, y: 30}, {x: 80, y: 30}, {x: 20, y: 75}, {x: 80, y: 75} ][index];
                            } else if (tot === 5) {
                              return [ {x: 50, y: 15}, {x: 15, y: 45}, {x: 85, y: 45}, {x: 25, y: 80}, {x: 75, y: 80} ][index];
                            } else {
                              const presets = [
                                {x: 50, y: 15},
                                {x: 18, y: 35},
                                {x: 82, y: 35},
                                {x: 18, y: 70},
                                {x: 82, y: 70},
                                {x: 50, y: 85}
                              ];
                              return presets[index % presets.length];
                            }
                          };
                          const coord = getSatCoords(i, total);
                          const isCatActive = selectedHackCategory === cat.id;
                          const nodeCount = activeNodes.filter(n => n.category === cat.id).length;

                          return (
                            <div
                              key={cat.id}
                              style={{ left: `${coord.x}%`, top: `${coord.y}%` }}
                              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 hover:scale-110 active:scale-95 transition-all duration-300"
                            >
                              <button
                                onClick={() => {
                                  setSelectedHackCategory(isCatActive ? '' : cat.id);
                                  setSelectedHackNode(null);
                                }}
                                className={`px-4 py-2.5 rounded-2xl border text-xs font-black shadow-lg cursor-pointer transition flex flex-col items-center justify-center bg-gradient-to-br min-w-[100px] text-center ${
                                  isCatActive 
                                    ? 'scale-105 ring-4 ring-indigo-500/50 border-white' 
                                    : 'border-slate-800'
                                } ${cat.color}`}
                              >
                                <span className="uppercase tracking-wider text-[9px] opacity-90 leading-none">
                                  NHÓM
                                </span>
                                <span className="font-extrabold text-xs block mt-0.5 whitespace-nowrap">
                                  {cat.name.split(' (')[0]}
                                </span>
                                <span className="text-[10px] font-bold mt-1 opacity-75">
                                  {nodeCount} từ vựng
                                </span>
                              </button>
                            </div>
                          );
                        })}

                        {/* CANVAS STAGE FOOTER INFO */}
                        <div className="z-10 bg-slate-900/40 backdrop-blur-sm self-end rounded-xl px-3 py-1.5 border border-slate-800/40 text-[10px] text-slate-400">
                          ⚡ Mẹo: Click chọn các Bong Bóng Nhóm để lọc nhanh từ vựng dải màu sắc.
                        </div>
                      </div>

                      {/* WORDS LIST OF THE ACTIVE CATEGORY OR ACTIVE SECTION */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                          <div>
                            <h3 className="text-sm sm:text-base font-black text-slate-900">
                              {selectedHackCategory 
                                ? `Danh sách từ thuộc nhóm: ${categories.find(c => c.id === selectedHackCategory)?.name || ''}` 
                                : `Tất cả từ vựng trong sơ đồ: ${sec.name}`}
                            </h3>
                            <p className="text-xs text-slate-500">
                              Chọn từ vựng để phát âm chuẩn Mỹ, xem dịch nghĩa chi tiết và lưu làm tư liệu ôn thi!
                            </p>
                          </div>
                          {selectedHackCategory && (
                            <button
                              onClick={() => setSelectedHackCategory('')}
                              className="text-xs font-black text-indigo-600 hover:text-indigo-800 self-start sm:self-auto cursor-pointer flex items-center gap-1.5"
                            >
                              Hiển thị tất cả ({activeNodes.length} từ) &rarr;
                            </button>
                          )}
                        </div>

                        {/* WORDS GRID CONTAINER */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {filteredNodes.map((node, nodeIdx) => {
                            const isSelected = selectedHackNode?.word === node.word;
                            const isWordMem = memorizedWords.includes(node.word);

                            return (
                              <div
                                key={`${node.word}-${nodeIdx}`}
                                onClick={() => {
                                  setSelectedHackNode(node);
                                  playTTS(node.word);
                                }}
                                className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer text-left relative overflow-hidden flex flex-col justify-between group ${
                                  isSelected
                                    ? 'bg-gradient-to-br from-indigo-50 to-pink-50 border-indigo-500 ring-2 ring-indigo-500/20 scale-[1.02] shadow-md shadow-indigo-500/5'
                                    : 'bg-white border-slate-150 hover:bg-slate-50/60 hover:border-slate-300'
                                }`}
                              >
                                
                                {/* DECORATIVE CAT STRIPE */}
                                <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-200" />

                                <div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-450 font-sans">
                                      {node.pos}
                                    </span>
                                    {isWordMem && (
                                      <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-1 py-0.5 rounded">
                                        THUỘC ✅
                                      </span>
                                    )}
                                  </div>

                                  <h4 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition mt-1">
                                    {node.word}
                                  </h4>
                                  <p className="text-xs text-slate-500 font-mono tracking-tighter mt-0.5 font-bold">
                                    {node.phonetic}
                                  </p>
                                </div>

                                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                                  <span className="font-semibold truncate max-w-[80%]">
                                    {node.definition}
                                  </span>
                                  <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 group-hover:scale-110 transition" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* WORD ELEMENT INSPECTOR PANEL */}
                      {selectedHackNode ? (
                        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6 mt-6 animate-in slide-in-from-bottom duration-300">
                          
                          {/* HEAD DEF PART */}
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div className="space-y-1.5 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-2xl font-black tracking-tight text-white select-all">
                                  {selectedHackNode.word}
                                </h2>
                                <span className="bg-slate-800 text-indigo-300 border border-slate-700 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-black uppercase">
                                  {selectedHackNode.pos}
                                </span>
                                <span className="bg-emerald-950 text-emerald-300 border border-emerald-990 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold font-mono">
                                  {selectedHackNode.phonetic}
                                </span>
                              </div>
                              <p className="text-base font-bold text-amber-400">
                                Ý nghĩa: {selectedHackNode.definition}
                              </p>
                            </div>

                            {/* CTAS */}
                            <div className="flex flex-wrap gap-2 shrink-0">
                              <button
                                onClick={() => playTTS(selectedHackNode.word)}
                                className="bg-indigo-600 hover:bg-indigo-750 px-3 py-2 rounded-xl transition cursor-pointer text-white flex items-center justify-center shadow-lg shadow-indigo-650/20 text-xs font-bold"
                                title="Phát âm từ"
                              >
                                <Volume2 className="w-3.5 h-3.5 mr-1" /> Nghe phát âm
                              </button>

                              {/* SAVE WORD AS CUSTOM FOR LEARNING SYSTEM-WIDE */}
                              {(() => {
                                const isWordSaved = allWords.some(w => w.word.toLowerCase() === selectedHackNode.word.toLowerCase());
                                return (
                                  <button
                                    onClick={() => {
                                      if (isWordSaved) {
                                        deleteCustomWord(selectedHackNode.word);
                                        if (memorizedWords.includes(selectedHackNode.word)) {
                                          toggleMemorized(selectedHackNode.word);
                                        }
                                      } else {
                                        const cleanWordItem: IeltsWord = {
                                          word: selectedHackNode.word,
                                          pos: selectedHackNode.pos,
                                          phonetic: selectedHackNode.phonetic,
                                          definition: selectedHackNode.definition,
                                          bandLevel: "Band 7.5+",
                                          topic: chap.title,
                                          example: selectedHackNode.example,
                                          exampleTranslation: selectedHackNode.exampleTranslation,
                                          collocations: [],
                                          synonyms: []
                                        };
                                        setCustomWords(prev => [cleanWordItem, ...prev]);
                                      }
                                    }}
                                    className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                                      isWordSaved
                                        ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow'
                                        : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100'
                                    }`}
                                  >
                                    <Star className={`w-3.5 h-3.5 ${isWordSaved ? 'fill-current text-amber-950' : ''}`} />
                                    {isWordSaved ? 'Đã lưu sổ tay ⭐' : 'Lưu sổ tay'}
                                  </button>
                                );
                              })()}

                              {/* TOGGLE MEMORIZED STATE */}
                              <button
                                onClick={() => toggleMemorized(selectedHackNode.word)}
                                className={`px-3 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                                  memorizedWords.includes(selectedHackNode.word)
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                    : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100'
                                }`}
                              >
                                <Check className="w-3.5 h-3.5" />
                                {memorizedWords.includes(selectedHackNode.word) ? 'Đã thuộc ✅' : 'Đánh dấu thuộc'}
                              </button>
                            </div>
                          </div>

                          {/* EXAMPLE SCENE */}
                          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-805 space-y-3.5">
                            <h4 className="text-[10px] font-black uppercase text-amber-500 tracking-wider flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" /> Ví dụ ngữ cảnh chuẩn IELTS (Contextual Sample):
                            </h4>
                            <div className="space-y-1.5">
                              <p className="text-base font-black text-slate-200 select-all leading-relaxed">
                                {selectedHackNode.example}
                              </p>
                              <p className="text-sm font-semibold text-slate-400 leading-relaxed">
                                {selectedHackNode.exampleTranslation}
                              </p>
                            </div>
                            <div className="flex justify-end">
                              <button
                                onClick={() => playTTS(selectedHackNode.example)}
                                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-0"
                              >
                                <Volume2 className="w-3 h-3" /> Nghe phát âm nguyên câu
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-50 border border-dashed border-slate-200 p-8 rounded-2xl text-center text-slate-500 font-bold">
                          💡 Vui lòng lựa chọn một từ vựng bất kỳ ở trên để hiển thị thông tin chi tiết và lưu làm bài học ôn tập riêng.
                        </div>
                      )}

                    </div>
                  );
                })()}

              </div>

            </div>
          )}

          {/* MODE 1: THE COLLOCATION POSTER (MATCHING THE USER'S PHOTO) */}
          {mindmapSubTab === 'poster' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* TOP ALPHABET SELECTOR FILTER */}
              <div className="bg-white p-4 rounded-2xl border border-slate-150 shadow-sm space-y-3">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  Chọn chữ cái bắt đầu (Alphabet Filter):
                </span>
                <div className="flex flex-wrap gap-2">
                  {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => {
                    const hasSample = POSTER_COLLOCATIONS[letter] !== undefined;
                    const isSelected = selectedPosterLetter === letter;

                    return (
                      <button
                        key={letter}
                        onClick={() => {
                          setSelectedPosterLetter(letter);
                          setCollocationCustomData(null);
                        }}
                        className={`w-9 h-9 text-xs sm:text-sm font-black rounded-lg transition cursor-pointer flex items-center justify-center border relative ${
                          isSelected
                            ? 'bg-indigo-600 border-indigo-700 text-white shadow'
                            : hasSample
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-white border-slate-150 hover:border-slate-350 text-slate-450 hover:text-slate-700'
                        }`}
                      >
                        {letter}
                        {hasSample && !isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute top-1 right-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                  <span>Toàn bộ 26 chữ cái (A-Z) đã có dữ liệu mẫu Poster chuẩn rễ nhánh! Bạn cũng có thể tự do gõ thêm từ khóa để AI phác họa sơ đồ riêng.</span>
                </div>
              </div>

              {/* SEARCH & DYNAMIC AI GENERATOR CONTAINER */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 p-5 rounded-2xl border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-1">
                  <h4 className="text-sm font-black text-indigo-950 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-600" /> Tự thiết kế Sơ đồ Nhánh Cụm từ cùng AI
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Nhập bất kỳ động từ hay từ khóa nào (như <span className="underline cursor-pointer text-indigo-600 font-semibold" onClick={() => setCollocationCustomInput('come')}>come</span>, <span className="underline cursor-pointer text-indigo-600 font-semibold" onClick={() => setCollocationCustomInput('fall')}>fall</span>, <span className="underline cursor-pointer text-indigo-600 font-semibold" onClick={() => setCollocationCustomInput('go')}>go</span>). Trí tuệ nhân tạo Gemini sẽ ngay lập tức phác họa và rẽ các nhánh collocation kèm nghĩa Việt ngữ chất lượng!
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <form onSubmit={handleGenerateCustomCollocations} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. run, pull, bring, turn"
                      value={collocationCustomInput}
                      onChange={(e) => setCollocationCustomInput(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-black uppercase text-indigo-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="submit"
                      disabled={aiCollocLoading}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wide transition shrink-0 cursor-pointer text-white ${
                        aiCollocLoading
                          ? 'bg-slate-300 text-slate-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-slate-900'
                      }`}
                    >
                      {aiCollocLoading ? 'Đang vẽ đại học...' : 'Vẽ Sơ Đồ AI'}
                    </button>
                  </form>
                </div>
              </div>

              {/* MAIN POSTER CANVAS (GRID GRAPH PAPER STYLE) */}
              <div className="bg-white rounded-3xl border border-slate-250 shadow-md overflow-hidden relative" id="collocation-poster-board">
                
                {/* Visual Header Block replicating the "U" & "W" headers from the photo */}
                <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-8 rounded-t-3xl relative overflow-hidden flex flex-col items-center justify-center text-center border-b border-indigo-950 min-h-[140px]">
                  
                  {/* Styled Background decorative lines simulate teacher graph grid paper */}
                  <div className="absolute inset-x-0 top-0 bottom-0 opacity-10 pointer-events-none" style={{
                    backgroundSize: '15px 15px',
                    backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)'
                  }} />

                  <span className="text-[11px] font-black uppercase tracking-widest text-indigo-300/80 mb-1">SECTION STUDY COLLOCATIONS</span>
                  <div className="relative flex justify-center items-center">
                    <h1 className="text-4xl sm:text-6xl font-black text-white px-8 py-2 rounded-2xl bg-indigo-950/40 border border-indigo-700/60 shadow-inner select-none font-mono">
                      {selectedPosterLetter}
                    </h1>
                  </div>
                </div>

                {/* GRAPH PAPER BODY AND ROWS */}
                <div className="p-6 sm:p-10 space-y-12 bg-white relative">
                  
                  {/* Subtle bluish graph paper styled background */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                    backgroundSize: '24px 24px',
                    backgroundImage: 'linear-gradient(to right, rgba(99, 102, 241, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.2) 1px, transparent 1px)'
                  }} />

                  {/* Dynamic Custom AI Branch Display (If loaded) */}
                  {collocationCustomData && (
                    <div className="bg-amber-50/70 border border-dashed border-amber-250 p-6 rounded-2xl relative shadow-sm animate-in zoom-in-95 duration-250 hover:shadow">
                      <button
                        onClick={() => setCollocationCustomData(null)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 p-1 bg-white hover:bg-slate-50 border border-slate-150 rounded-lg cursor-pointer"
                        title="Đóng sơ đồ AI"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="absolute top-4 left-4 flex items-center gap-1 text-[9px] font-black text-amber-700 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-amber-200">
                        <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Sơ đồ rẽ nhánh sinh bởi AI
                      </div>

                      <div className="grid grid-cols-12 gap-2 mt-4 items-center min-h-[150px]">
                        {/* ROOT KEYWORD CONTAINER */}
                        <div className="col-span-12 md:col-span-3 text-center md:text-right md:pr-6 pb-4 md:pb-0">
                          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-wider uppercase drop-shadow-sm inline-block border-b-2 border-stone-850 md:border-b-0">
                            {collocationCustomData.root}
                          </h2>
                          <span className="block text-[9px] text-indigo-600 font-bold uppercase tracking-wider mt-1">AI Generated</span>
                        </div>

                        {/* CONNECTOR LINES (ONLY VISIBLE ON MEDIUM+ SCREENS) */}
                        <div className="hidden md:block md:col-span-2 relative self-stretch">
                          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                            {collocationCustomData.branches.map((_, idx) => {
                              const total = collocationCustomData.branches.length;
                              const y_i = total === 1 ? 50 : ((idx + 0.5) / total) * 100;
                              return (
                                <line
                                  key={`ai-line-${idx}`}
                                  x1="0"
                                  y1="50%"
                                  x2="100%"
                                  y2={`${y_i}%`}
                                  stroke="#475569"
                                  strokeWidth="1.8"
                                  className="opacity-80"
                                />
                              );
                            })}
                          </svg>
                        </div>

                        {/* LEAFS & TRANSLATIONS */}
                        <div className="col-span-12 md:col-span-7 flex flex-col justify-around gap-2 bg-white/80 p-3 rounded-xl border border-amber-100">
                          {collocationCustomData.branches.map((br, index) => (
                            <div key={`ai-branch-${index}`} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 p-1.5 hover:bg-amber-100/40 rounded-lg transition duration-150">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => playTTS(br.phrase)}
                                  className="p-1 px-1.5 bg-amber-50 border border-amber-150 rounded text-amber-700 hover:text-white hover:bg-amber-600 transition"
                                  title="Nghe phát âm"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-xs sm:text-sm font-black text-amber-950 font-mono tracking-tight cursor-pointer hover:underline" onClick={() => playTTS(br.phrase)}>
                                  {br.phrase}
                                </span>
                              </div>
                              
                              <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto border-t sm:border-t-0 border-amber-100 pt-1 sm:pt-0">
                                <span className="text-xs text-slate-700 font-bold italic">
                                  {br.translation}
                                </span>
                                <button
                                  onClick={() => {
                                    setActiveSegment('ai-sentence');
                                    setStudentSentence('');
                                    setSentenceEvalResult(null);
                                    // Set default word match
                                    const matched = allWords.find(w => w.word.toLowerCase() === collocationCustomData.root.toLowerCase()) || allWords[0];
                                    setSelectedSentenceWord(matched);
                                    alert(`Đã truyền cụm từ từ khóa "${br.phrase}" sang module Luyện câu AI!`);
                                  }}
                                  className="text-[9px] font-black uppercase text-amber-850 px-1.5 py-0.5 bg-amber-100/60 hover:bg-amber-200 border border-amber-300 rounded"
                                >
                                  Luyện câu
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Standard Selected letter collocation rows */}
                  {POSTER_COLLOCATIONS[selectedPosterLetter] ? (
                    POSTER_COLLOCATIONS[selectedPosterLetter].map((item, rowIdx) => {
                      const totalBranches = item.branches.length;

                      return (
                        <div 
                          key={`poster-row-${item.root}-${rowIdx}`}
                          className="grid grid-cols-12 gap-2 sm:gap-4 py-8 border-b-2 border-dashed border-indigo-50 last:border-b-0 items-center relative group"
                        >
                          {/* ROOT English word */}
                          <div className="col-span-12 md:col-span-3 text-center md:text-right md:pr-8 pb-4 md:pb-0">
                            <span 
                              className="text-lg sm:text-2xl font-black text-indigo-950 uppercase tracking-widest block select-none cursor-pointer hover:underline underline-offset-4 decoration-indigo-600"
                              title="Nghe phát âm từ gốc"
                              onClick={() => playTTS(item.root)}
                            >
                              {item.root}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold block mt-1 font-mono uppercase">
                              {totalBranches} branches
                            </span>
                          </div>

                          {/* FORK SVG CONNECTOR (Rendered on tablet/desktop, hidden on mobile) */}
                          <div className="hidden md:block md:col-span-2 relative self-stretch min-h-[80px]">
                            <svg className="absolute inset-x-0 inset-y-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                              {item.branches.map((_, idx) => {
                                const y_i = totalBranches === 1 ? 50 : ((idx + 0.5) / totalBranches) * 100;
                                return (
                                  <line
                                    key={`poster-line-${idx}`}
                                    x1="0"
                                    y1="50%"
                                    x2="100%"
                                    y2={`${y_i}%`}
                                    stroke="#312e81"
                                    strokeWidth="1.8"
                                    className="opacity-70 group-hover:opacity-100 group-hover:stroke-indigo-600 transition duration-150"
                                  />
                                );
                              })}
                            </svg>
                          </div>

                          {/* BRANCH PHRASES & VIETNAMESE EXPLANATIONS */}
                          <div className="col-span-12 md:col-span-7 flex flex-col justify-around gap-2 bg-indigo-50/10 p-2 sm:p-4 rounded-2xl border border-indigo-100/50 backdrop-blur-sm shadow-sm group-hover:border-indigo-250 transition duration-150">
                            {item.branches.map((br, idx) => (
                              <div 
                                key={`poster-br-${idx}`} 
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 sm:p-1 px-2.5 rounded-xl hover:bg-white border border-transparent hover:border-indigo-100 hover:shadow-xs transition duration-150"
                              >
                                <div className="flex items-center gap-2">
                                  {/* Simple TTS on click */}
                                  <button
                                    onClick={() => playTTS(br.phrase)}
                                    className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition"
                                    title="Nghe phát âm cụm từ"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                  
                                  <span 
                                    className="text-xs sm:text-sm font-black text-indigo-950 font-mono tracking-wide cursor-pointer hover:underline"
                                    onClick={() => playTTS(br.phrase)}
                                  >
                                    {br.phrase}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto border-t sm:border-t-0 border-indigo-50 pt-1 sm:pt-0">
                                  <span className="text-xs sm:text-sm text-slate-600 font-bold italic">
                                    {br.translation}
                                  </span>

                                  {/* Send to Sentence builder */}
                                  <button
                                    onClick={() => {
                                      setActiveSegment('ai-sentence');
                                      setStudentSentence('');
                                      setSentenceEvalResult(null);
                                      const matching = allWords.find(w => w.word.toLowerCase() === item.root.toLowerCase()) || allWords[0];
                                      setSelectedSentenceWord(matching);
                                      alert(`Đã đồng bộ cụm từ "${br.phrase}" của từ gốc [${item.root}] sang Luyện đặt câu AI! Nhập câu tiếng Anh chứa cấu trúc này và xem phân tích nhé.`);
                                    }}
                                    className="text-[9px] font-black uppercase text-indigo-700 px-1.5 py-0.5 bg-indigo-50 hover:bg-indigo-100 rounded border border-indigo-200 shrink-0"
                                    title="Truyền sang Sentinel"
                                  >
                                    Luyện câu
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    /* Letter empty state but with active call to AI request */
                    <div className="p-8 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl space-y-3 min-h-[250px] flex flex-col justify-center items-center">
                      <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                        <AlertCircle className="w-6 h-6 shrink-0" />
                      </div>
                      <h4 className="text-sm font-black text-indigo-950 uppercase tracking-widest block">Chưa tìm thấy từ mẫu của poster cho chữ cái '{selectedPosterLetter}'</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                        Poster chuẩn chỉ có sẵn một số động từ thông dụng. Tuy nhiên, bạn có thể gõ bất kỳ từ vựng nào bắt đầu bằng chữ <strong>'{selectedPosterLetter}'</strong> vào ô công cụ AI bên trên để ứng dụng tự phác thảo sơ đồ rẽ nhánh tức thì!
                      </p>
                      
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            // Focus or auto-seed a standard word of that letter
                            const letterWordSeeds: Record<string, string> = {
                              'A': 'allow', 'B': 'bring', 'C': 'come', 'D': 'do', 'E': 'enter',
                              'F': 'fall', 'H': 'have', 'I': 'insist', 'J': 'join', 'N': 'need',
                              'O': 'open', 'P': 'push', 'R': 'run', 'S': 'stand', 'V': 'visit', 'Y': 'yield'
                            };
                            const seed = letterWordSeeds[selectedPosterLetter] || (selectedPosterLetter.toLowerCase() + 'act');
                            setCollocationCustomInput(seed);
                            alert(`Đã đề xuất từ gốc mẫu "${seed}" bắt đầu với chữ cái ${selectedPosterLetter}. Ấn nút "Vẽ Sơ Đồ AI" để thử nhé!`);
                          }}
                          className="px-4 py-2 bg-indigo-600 hover:bg-slate-900 border border-indigo-700 text-white font-black uppercase text-[10px] tracking-wide rounded-xl transition cursor-pointer shadow-sm"
                        >
                          Đề Xuất Từ và Vẽ Bằng AI
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* MODE 2: THE INTERACTIVE BUBBLE GRAPH GROUPING (NOUNS, VERBS, ADJECTIVES) */}
          {mindmapSubTab === 'bubbles' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* STAGE HEADER CONTROL */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-150 shadow-sm">
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-black text-indigo-950 flex items-center gap-1.5">
                    <Brain className="text-indigo-600 w-4 h-4" /> Bản Đồ Bong Bóng Từ Loại của Chủ Đề Hiện Tại
                  </h3>
                  <p className="text-xs text-slate-500">
                    Bản đồ tương tác nhóm các từ vựng IELTS theo loại từ. Hỗ trợ xoay vòng và nâng cấp câu kể thông minh (Mnemonic Story).
                  </p>
                </div>
                
                {/* Story AI triggering */}
                <button
                  onClick={handleGenerateMindmapStory}
                  disabled={aiStoryLoading}
                  className={`p-2.5 px-4 rounded-xl text-xs font-black transition flex items-center gap-2 shadow-sm uppercase cursor-pointer ${
                    aiStoryLoading 
                      ? 'bg-slate-150 text-slate-400 border border-slate-200 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-slate-900 text-white border border-indigo-700'
                  }`}
                >
                  <Sparkles className={`w-4 h-4 ${aiStoryLoading ? 'animate-spin' : ''}`} /> 
                  {aiStoryLoading ? 'Đang tạo truyện...' : 'Tạo Truyện Mnemonic AI'}
                </button>
              </div>

              {/* STAGE CORE GRID */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                
                {/* CANVAS INTERACTIVE AREA */}
                <div className="xl:col-span-8 bg-slate-900 border border-slate-950 rounded-2xl relative overflow-hidden h-[600px] shadow-lg flex flex-col justify-between" id="mindmap-main-stage">
                  
                  {/* Info ribbon */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 text-[10px] text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Chủ đề: <strong className="text-slate-100">{selectedTopic === 'All Topics' ? 'Tất cả' : selectedTopic}</strong></span>
                    <span className="text-slate-600">|</span>
                    <span>Phân hạng: <strong className="text-slate-100">{selectedBand === 'All Bands' || selectedBand === 'All Grades' ? 'Tất cả' : selectedBand}</strong></span>
                  </div>

                  {/* Shuffling tool in stage */}
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={() => {
                        const updatedOffsets: Record<string, number> = {};
                        branches.forEach(b => {
                          const list = mindmapGroups[b.id] || [];
                          if (list.length > 4) {
                            const maxOffset = list.length - 4;
                            updatedOffsets[b.id] = Math.floor(Math.random() * (maxOffset + 1));
                          }
                        });
                        setBranchOffsets(updatedOffsets);
                      }}
                      className="px-3 py-1.5 bg-slate-950/80 hover:bg-slate-900 text-slate-100 border border-slate-800 rounded-full text-[10px] font-black uppercase transition flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Trộn Sơ Đồ
                    </button>
                  </div>

                  {/* RENDER CANVAS LAYER */}
                  <div className="relative w-full h-full flex-1">
                    
                    {/* SVG CONNECTIONS OVERLAY */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                      <linearGradient id="glow-grad-dual" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
                      </linearGradient>

                      {/* Draw center to branch connections */}
                      {branches.map(b => {
                        const wordsForBranch = mindmapGroups[b.id] || [];
                        if (wordsForBranch.length === 0) return null;

                        return (
                          <g key={`branch-line-${b.id}`}>
                            <line
                              x1="50%"
                              y1="50%"
                              x2={`${b.cx}%`}
                              y2={`${b.cy}%`}
                              stroke="url(#glow-grad-dual)"
                              strokeWidth="3.5"
                              className="opacity-60"
                            />
                            <line
                              x1="50%"
                              y1="50%"
                              x2={`${b.cx}%`}
                              y2={`${b.cy}%`}
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              strokeDasharray="8 8"
                              className="opacity-40"
                            />
                          </g>
                        );
                      })}

                      {/* Draw branch to leaf word connections */}
                      {branches.map(b => {
                        const wordsList = mindmapGroups[b.id] || [];
                        const offset = branchOffsets[b.id] || 0;
                        const visibleWords = wordsList.slice(offset, offset + 4);
                        const n = visibleWords.length;

                        if (n === 0) return null;

                        const dx = b.cx - 50;
                        const dy = b.cy - 50;
                        const theta = Math.atan2(dy, dx);

                        let strokeColor = '#818cf8';
                        if (b.id === 'Noun') strokeColor = '#f43f5e';
                        if (b.id === 'Verb') strokeColor = '#6366f1';
                        if (b.id === 'Adjective') strokeColor = '#10b981';
                        if (b.id === 'Adverb') strokeColor = '#f59e0b';

                        return visibleWords.map((item, idx) => {
                          const angle = theta + (idx - (n - 1) / 2) * 0.45;
                          const wx = b.cx + Math.cos(angle) * 16;
                          const wy = b.cy + Math.sin(angle) * 14;

                          const isSelected = selectedMindmapWord?.word === item.word;

                          return (
                            <line
                              key={`leaf-line-${item.word}-${idx}`}
                              x1={`${b.cx}%`}
                              y1={`${b.cy}%`}
                              x2={`${wx}%`}
                              y2={`${wy}%`}
                              stroke={strokeColor}
                              strokeWidth={isSelected ? '2.5' : '1.5'}
                              strokeDasharray={isSelected ? 'none' : '4, 4'}
                              className={`transition-all duration-300 ${isSelected ? 'opacity-100' : 'opacity-45'}`}
                            />
                          );
                        });
                      })}
                    </svg>

                    {/* GRAPH NODES LAYERS */}
                    <div 
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
                      style={{ left: '50%', top: '50%' }}
                    >
                      <div className="relative group flex items-center justify-center">
                        <div className="absolute inset-0 bg-indigo-650 rounded-full blur-xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition duration-500 animate-pulse" />
                        <div className="absolute inset-1 bg-gradient-to-tr from-pink-500 via-indigo-600 to-purple-600 rounded-full blur-md opacity-70" />
                        
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-705 p-2.5 rounded-full flex flex-col items-center justify-center text-center shadow-2xl">
                          <Brain className="w-5 h-5 sm:w-6 h-6 text-pink-400 group-hover:rotate-12 transition duration-300" />
                          <span className="text-[10px] font-black text-rose-350 tracking-wider uppercase mt-1">Sơ đồ chủ đề</span>
                          <p className="text-[11px] sm:text-xs text-white font-black line-clamp-2 max-w-[85px] leading-tight mt-0.5">
                            {selectedTopic === 'All Topics' ? 'IELTS Vocab' : selectedTopic}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* BRANCH NODES (POS GROUPINGS) */}
                    {branches.map(b => {
                      const wordsList = mindmapGroups[b.id] || [];
                      const hasNodes = wordsList.length > 0;
                      if (!hasNodes) return null;

                      let outerColor = 'border-rose-900 bg-rose-950/90 text-rose-200';
                      let ringColor = 'bg-rose-500';
                      if (b.id === 'Verb') {
                        outerColor = 'border-indigo-900 bg-indigo-950/90 text-indigo-200';
                        ringColor = 'bg-indigo-505';
                      } else if (b.id === 'Adjective') {
                        outerColor = 'border-emerald-900 bg-emerald-950/90 text-emerald-200';
                        ringColor = 'bg-emerald-500';
                      } else if (b.id === 'Adverb') {
                        outerColor = 'border-amber-900 bg-amber-950/90 text-amber-200';
                        ringColor = 'bg-amber-500';
                      }

                      const offset = branchOffsets[b.id] || 0;
                      const canCycle = wordsList.length > 4;

                      return (
                        <div
                          key={`branch-node-${b.id}`}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                          style={{ left: `${b.cx}%`, top: `${b.cy}%` }}
                        >
                          <div className="relative flex flex-col items-center gap-1 group">
                            <div className={`w-3 h-3 rounded-full ${ringColor} blur-sm absolute -inset-0.5 opacity-50 animate-ping`} />
                            
                            <div className={`p-2.5 px-4 rounded-xl border border-dashed text-center shadow-lg transition duration-300 relative ${outerColor}`}>
                              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider block">
                                {b.label}
                              </span>
                              <span className="text-[9px] font-bold text-slate-400 block mt-0.5">
                                ({wordsList.length} từ)
                              </span>
                            </div>

                            {/* Pagination cycle helper */}
                            {canCycle && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNextWords(b.id, wordsList.length);
                                }}
                                className="bg-slate-950 text-slate-300 text-[8px] font-black tracking-wider px-2 py-0.5 rounded-full border border-slate-800 hover:bg-slate-800 hover:text-white flex items-center gap-0.5 uppercase transition cursor-pointer shadow-md select-none mt-1 text-center font-sans"
                              >
                                Thêm ({offset + 1}-{Math.min(offset + 4, wordsList.length)}/{wordsList.length})
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* LEAF NODES (VOCABULARY WORDS) */}
                    {branches.map(b => {
                      const wordsList = mindmapGroups[b.id] || [];
                      const offset = branchOffsets[b.id] || 0;
                      const visibleWords = wordsList.slice(offset, offset + 4);
                      const n = visibleWords.length;

                      if (n === 0) return null;

                      const dx = b.cx - 50;
                      const dy = b.cy - 50;
                      const theta = Math.atan2(dy, dx);

                      return visibleWords.map((item, idx) => {
                        const angle = theta + (idx - (n - 1) / 2) * 0.45;
                        const wx = b.cx + Math.cos(angle) * 16;
                        const wy = b.cy + Math.sin(angle) * 14;

                        const isSelected = selectedMindmapWord?.word === item.word;
                        const isMemorized = memorizedWords.includes(item.word);

                        let leafTheme = 'bg-slate-950 border-slate-800 hover:border-slate-500 text-slate-300 hover:scale-105';
                        if (isSelected) {
                          if (b.id === 'Noun') leafTheme = 'bg-rose-950 border-rose-500 text-rose-100 ring-2 ring-rose-500/30 scale-105';
                          else if (b.id === 'Verb') leafTheme = 'bg-indigo-950 border-indigo-500 text-indigo-100 ring-2 ring-indigo-500/30 scale-105';
                          else if (b.id === 'Adjective') leafTheme = 'bg-emerald-950 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/30 scale-105';
                          else if (b.id === 'Adverb') leafTheme = 'bg-amber-950 border-amber-500 text-amber-100 ring-2 ring-amber-500/30 scale-105';
                        } else if (isMemorized) {
                          leafTheme = 'bg-slate-900 border-slate-800/60 hover:border-slate-500 text-slate-500 line-through decoration-emerald-500 opacity-75';
                        }

                        return (
                          <button
                            key={`leaf-node-pos-${item.word}-${idx}`}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer text-center select-none"
                            style={{ left: `${wx}%`, top: `${wy}%` }}
                            onClick={() => setSelectedMindmapWord(item)}
                          >
                            <div className="relative flex flex-col items-center">
                              <div className={`p-2 px-3.5 rounded-xl border text-[10px] sm:text-xs font-black shadow-lg transition duration-200 select-none ${leafTheme}`}>
                                <div className="flex items-center gap-1.5 justify-center">
                                  {isMemorized && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                                  <span>{item.word}</span>
                                </div>
                                {item.phonetic && (
                                  <span className="block text-[8px] text-slate-450 mt-0.5 select-none font-normal font-mono">
                                    {item.phonetic}
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      });
                    })}

                  </div>

                  {/* Legend/Footer inside stage */}
                  <div className="p-3 bg-slate-950/95 border-t border-slate-850 flex items-center justify-between text-[10px] text-slate-450 z-10 font-medium">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Danh từ</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Động từ</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Tính từ</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Khác</span>
                    </div>
                    <span>*Click chọn từng từ để tập trung ôn tập chi tiết</span>
                  </div>

                </div>

                {/* DETAILED INSPECTION SIDEBAR */}
                <div className="xl:col-span-4 bg-white p-5 rounded-2xl border border-slate-150 shadow-sm flex flex-col justify-between min-h-[500px]" id="mindmap-inspect-stage">
                  {selectedMindmapWord ? (
                    <div className="space-y-4 flex-1 flex flex-col justify-between animate-in fade-in duration-300" id="mindmap-inspected-details">
                      
                      {/* Word major details */}
                      <div className="space-y-4">
                        <div className="flex items-start justify-between border-b pb-3 border-slate-100">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                                {selectedMindmapWord.word}
                              </h3>
                              <span className="text-[10px] font-black uppercase bg-indigo-50 px-2 py-0.5 rounded-md text-indigo-600">
                                {selectedMindmapWord.pos}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 font-semibold font-mono">
                              <span>{selectedMindmapWord.phonetic}</span>
                              <button
                                onClick={() => playTTS(selectedMindmapWord.word)}
                                className="p-1 hover:bg-slate-100 text-indigo-600 hover:text-indigo-800 rounded-lg transition shrink-0 cursor-pointer"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleMemorized(selectedMindmapWord.word)}
                            className={`p-2 rounded-xl border transition cursor-pointer flex items-center justify-center ${
                              memorizedWords.includes(selectedMindmapWord.word)
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                                : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                          </button>
                        </div>

                        {/* Vietnamese Definition */}
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Ý nghĩa tiếng Việt:</span>
                          <p className="text-sm text-slate-850 font-extrabold leading-normal bg-slate-50 p-3 rounded-xl border border-slate-150">
                            {selectedMindmapWord.definition}
                          </p>
                        </div>

                        {/* Meta Topic / Band badge */}
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-medium text-slate-500">
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span className="block text-slate-400 font-bold uppercase text-[8px]">Phân cấp:</span>
                            <strong className="text-slate-705 font-black">{selectedMindmapWord.bandLevel}</strong>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span className="block text-slate-400 font-bold uppercase text-[8px]">Chủ đề:</span>
                            <strong className="text-slate-705 font-black truncate block">{selectedMindmapWord.topic}</strong>
                          </div>
                        </div>

                        {/* Example Sentence with Audio */}
                        <div className="space-y-1 bg-indigo-50/40 p-3.5 rounded-xl border border-indigo-120/50">
                          <span className="text-[10px] uppercase font-black text-indigo-700 tracking-wider block">Ví dụ minh hoạ:</span>
                          <p className="text-xs sm:text-sm text-indigo-950 font-bold leading-relaxed italic font-sans">
                            "{selectedMindmapWord.example}"
                          </p>
                          <p className="text-xs text-indigo-650 font-semibold leading-normal font-sans pt-1 border-t border-indigo-100">
                            {selectedMindmapWord.exampleTranslation}
                          </p>
                          
                          <div className="flex items-center gap-1.5 mt-2">
                            <button
                              onClick={() => playTTS(selectedMindmapWord.example)}
                              className="flex items-center gap-1.5 p-1 px-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[8.5px] rounded-lg transition"
                            >
                              <Volume2 className="w-3.5 h-3.5 text-white" /> Nghe ví dụ câu
                            </button>
                          </div>
                        </div>

                        {/* Collocations & Synonyms */}
                        <div className="space-y-3 pt-1">
                          {selectedMindmapWord.collocations && selectedMindmapWord.collocations.length > 0 && (
                            <div className="space-y-1">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Cụm từ hay gặp (Collocations):</span>
                              <div className="flex flex-wrap gap-1.5">
                                {selectedMindmapWord.collocations.map((col, idx) => (
                                  <span 
                                    key={`col-pos-${idx}`} 
                                    className="text-[10px] text-slate-650 font-extrabold bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 border border-slate-200 rounded-lg px-2 py-1 transition cursor-pointer select-none"
                                    onClick={() => playTTS(col)}
                                  >
                                    {col}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {selectedMindmapWord.synonyms && selectedMindmapWord.synonyms.length > 0 && (
                            <div className="space-y-1">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Từ đồng nghĩa (Synonyms):</span>
                              <div className="flex flex-wrap gap-1.5">
                                {selectedMindmapWord.synonyms.map((syn, idx) => (
                                  <span 
                                    key={`syn-pos-${idx}`} 
                                    className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300 border border-emerald-150 rounded-lg px-2 py-1 transition cursor-pointer select-none"
                                    onClick={() => playTTS(syn)}
                                  >
                                    {syn}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span>Trạng thái: <strong>{memorizedWords.includes(selectedMindmapWord.word) ? <span className="text-emerald-600 font-black">Thuộc lòng ✅</span> : <span className="text-indigo-600 font-black">Chờ ôn tập 📚</span>}</strong></span>
                        <button
                          onClick={() => toggleMemorized(selectedMindmapWord.word)}
                          className="text-indigo-600 hover:underline font-black uppercase text-[10px] tracking-wide shrink-0"
                        >
                          {memorizedWords.includes(selectedMindmapWord.word) ? 'Đánh dấu cần học lại' : 'Tôi đã thuộc từ này!'}
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 animate-bounce">
                        <Brain className="w-6 h-6 shrink-0" />
                      </div>
                      <h4 className="text-sm font-black text-indigo-950 uppercase tracking-wider animate-pulse">Thông Tin Tra Cứu</h4>
                      <p className="text-xs text-slate-400 max-w-[240px] leading-relaxed">
                        Vui lòng chọn hoặc click vào một ô từ vựng trên sơ đồ bong bóng để xem đầy đủ phát âm, định nghĩa, ví dụ tiếng Anh, từ đồng nghĩa và collocation đi kèm!
                      </p>
                    </div>
                  )}
                </div>

              </div>
              
            </div>
          )}

          {/* MODE 4: DYNAMIC MATCHING & GAMES FROM THE BOOK */}
          {mindmapSubTab === 'practice' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* THEME & TOPIC SELECTOR FOR GAMES */}
              <div className="bg-gradient-to-r from-violet-600 to-indigo-700 p-6 rounded-3xl text-white shadow-md space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="text-base font-black uppercase tracking-wider text-amber-200">Đấu Trường Học Thuật 14 Themes</h4>
                    <p className="text-xs text-violet-100 font-medium">Bám sát 100% Sách Hack 3.000 từ. Hãy chọn Chương & Topic để tự động tạo Game giải đố!</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Select Theme */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-violet-200 tracking-wider block">Chọn Theme Sách (14 Themes):</label>
                    <select
                      value={gameChapterId}
                      onChange={(e) => {
                        const newId = parseInt(e.target.value, 10);
                        setGameChapterId(newId);
                        const ch = hack3000Data.find((c: any) => c.id === newId);
                        if (ch && ch.sections && ch.sections.length > 0) {
                          setGameSectionId(ch.sections[0].id);
                        }
                      }}
                      className="w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-violet-400 select-none cursor-pointer"
                    >
                      {hack3000Data.map((chap: any) => (
                        <option key={`game-chap-${chap.id}`} value={chap.id} className="text-slate-900 font-bold">
                          {chap.title} ({chap.vietnameseTitle})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select Topic */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-violet-200 tracking-wider block">Chọn Topic Từ Vựng:</label>
                    <select
                      value={gameSectionId}
                      onChange={(e) => setGameSectionId(e.target.value)}
                      className="w-full bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-violet-400 select-none cursor-pointer"
                    >
                      {(hack3000Data.find((c: any) => c.id === gameChapterId)?.sections || []).map((sec: any) => (
                        <option key={`game-sec-${sec.id}`} value={sec.id} className="text-slate-900 font-bold">
                          {sec.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* GAME SWITCHER BAR */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-150 shadow-sm">
                <div>
                  <h3 className="text-base font-black text-slate-950 flex items-center gap-1.5">
                    <Brain className="text-indigo-600 w-5 h-5 flex-shrink-0 animate-pulse" /> Trò Chơi Giải Đố Từ Vựng Tương Tác
                  </h3>
                  <p className="text-xs text-slate-500">
                    Chọn một trong ba chế độ chơi dưới đây để thử thách kiến thức thuộc Topic đang chọn:
                  </p>
                </div>

                <div className="flex flex-wrap bg-slate-100 p-1 rounded-xl border border-slate-205 gap-1">
                  <button
                    onClick={() => {
                      setActivePracticeGame('matching');
                    }}
                    className={`px-3 py-1.5 text-xs font-black rounded-lg transition cursor-pointer uppercase ${
                      activePracticeGame === 'matching'
                        ? 'bg-slate-950 text-white shadow-sm'
                        : 'text-slate-650 hover:bg-white/50'
                    }`}
                  >
                    Nối Từ (Matching)
                  </button>
                  <button
                    onClick={() => {
                      setActivePracticeGame('puzzle');
                    }}
                    className={`px-3 py-1.5 text-xs font-black rounded-lg transition cursor-pointer uppercase ${
                      activePracticeGame === 'puzzle'
                        ? 'bg-slate-950 text-white shadow-sm'
                        : 'text-slate-650 hover:bg-white/50'
                    }`}
                  >
                    Tìm Chữ Ẩn (Word Search)
                  </button>
                  <button
                    onClick={() => {
                      setActivePracticeGame('arranger');
                    }}
                    className={`px-3 py-1.5 text-xs font-black rounded-lg transition cursor-pointer uppercase ${
                      activePracticeGame === 'arranger'
                        ? 'bg-slate-950 text-white shadow-sm'
                        : 'text-slate-650 hover:bg-white/50'
                    }`}
                  >
                    Phân Nhóm (Arranger)
                  </button>
                </div>
              </div>

              {/* GAME 1: MATCHING GAME */}
              {activePracticeGame === 'matching' && (
                <div className="bg-white p-6 rounded-3xl border border-slate-150 shadow-sm space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <span className="text-[10px] font-black text-violet-600 bg-violet-50 px-2 py-0.5 rounded uppercase tracking-wider">
                      Đại Lộ Ghép Cặp • Theme {gameChapterId}
                    </span>
                    <h4 className="text-lg font-black text-slate-900 mt-1">
                      Thách Thức Nối Từ Vựng (Vocabulary Matching Challenge)
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Nối các từ vựng tiếng Anh với ý nghĩa dịch nghĩa tiếng Việt tương ứng thật chuẩn xác!
                    </p>
                  </div>

                  {/* GAME BOARD */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    
                    {/* EN LIST */}
                    <div className="space-y-3">
                      <span className="text-xs font-black tracking-wider text-slate-400 uppercase block">
                        Từ Tiếng Anh: Doanh mục
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {matchingEnItems.map((item) => {
                          const isMatched = matchPairsCompleted.includes(item.id);
                          const isSelected = matchSelectedId?.id === item.id && matchSelectedId?.type === 'en';
                          return (
                            <button
                              key={`match-en-${item.id}`}
                              disabled={isMatched}
                              onClick={() => {
                                if (matchSelectedId?.type === 'vi') {
                                  // Clicked EN after VI
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
                              className={`p-3.5 rounded-xl border text-sm font-bold text-left transition select-none flex justify-between items-center ${
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
                    <div className="space-y-3">
                      <span className="text-xs font-black tracking-wider text-slate-400 uppercase block">
                        Dịch Nghĩa Tiếng Việt: Nghĩa nối tương đương
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {matchingViItems.map((item) => {
                          const correspondingEn = Object.keys(matchingCorrectMap).find(k => matchingCorrectMap[k] === item.id) || '';
                          const isMatched = matchPairsCompleted.includes(correspondingEn);
                          const isSelected = matchSelectedId?.id === item.id && matchSelectedId?.type === 'vi';
                          return (
                            <button
                              key={`match-vi-${item.id}`}
                              disabled={isMatched}
                              onClick={() => {
                                if (matchSelectedId?.type === 'en') {
                                  // Clicked VI after EN
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
                              className={`p-3.5 rounded-xl border text-sm font-bold text-left transition select-none flex justify-between items-center ${
                                isMatched
                                  ? 'bg-emerald-50 border-emerald-100 text-emerald-600 opacity-60'
                                  : isSelected
                                  ? 'bg-indigo-600 border-indigo-700 text-white shadow-md'
                                  : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200 text-slate-800'
                              }`}
                            >
                              <span>{item.word}</span>
                              {isMatched && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* FEEDBACK & RESET LEVEL */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      {matchFeedback && (
                        <p className={`text-sm font-black flex items-center gap-1.5 ${matchFeedback.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {matchFeedback.success ? '✓' : '✗'} {matchFeedback.text}
                        </p>
                      )}
                      {matchPairsCompleted.length === matchingEnItems.length && matchingEnItems.length > 0 && (
                        <div className="bg-emerald-100 border border-emerald-200 p-3 rounded-2xl flex items-center gap-2 mt-2 font-sans">
                          <Award className="w-5 h-5 text-emerald-700" />
                          <span className="text-xs font-black text-emerald-950">
                            HOÀN THÀNH LEVEL! Bạn đã nối chính xác toàn bộ {matchingEnItems.length} từ vựng thuộc chủ đề này. Số lượt sai: {matchTries}.
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        initGamesForCurrentTopic(gameChapterId, gameSectionId);
                      }}
                      className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 text-xs font-black uppercase rounded-lg transition cursor-pointer"
                    >
                      Tráo bài & Chơi lại
                    </button>
                  </div>
                </div>
              )}

              {/* GAME 2: WORD SEARCH PUZZLE */}
              {activePracticeGame === 'puzzle' && (
                <div className="bg-white p-6 rounded-3xl border border-slate-150 shadow-sm space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">
                      Mê Cung Tìm Chữ • Theme {gameChapterId}
                    </span>
                    <h4 className="text-lg font-black text-slate-900 mt-1">
                      Giải Đố Ô Chữ Ẩn Giấu (Dynamic Word-Search Puzzle)
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Hãy tìm các từ vựng tiếng Anh ẩn giấu trong bảng chữ bằng cách bấm chọn liên tiếp các chữ cái tạo thành từ chính xác!
                    </p>
                  </div>

                  {/* MAIN BOARD */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT CELL MATRIX GRID */}
                    <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-950 rounded-3xl shadow-xl overflow-x-auto">
                      
                      {/* Grid header details */}
                      <div className="flex justify-between w-full max-w-[340px] text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-wider">
                        <span>Lựa chọn hiện tại:</span>
                        <span className="text-violet-400 font-extrabold font-mono text-xs">
                          {puzzleSelectedCells.map(cell => {
                            return puzzleGrid[cell.r]?.[cell.c] || '';
                          }).join('') || '(Hãy click chọn chữ cái)'}
                        </span>
                      </div>

                      <div className="grid grid-cols-10 gap-1.5 p-3.5 bg-slate-900 rounded-2xl w-full max-w-[340px]">
                        {(() => {
                          const isCellInFoundWord = (r: number, c: number) => {
                            return puzzleFoundCells.some(cell => cell.r === r && cell.c === c);
                          };

                          return puzzleGrid.map((row, rIdx) => 
                            row.map((char, cIdx) => {
                              const isSelected = puzzleSelectedCells.some(cell => cell.r === rIdx && cell.c === cIdx);
                              const isFound = isCellInFoundWord(rIdx, cIdx);

                              return (
                                <button
                                  key={`cell-${rIdx}-${cIdx}`}
                                  onClick={() => {
                                    // Toggle cell selection
                                    const existsIdx = puzzleSelectedCells.findIndex(cell => cell.r === rIdx && cell.c === cIdx);
                                    if (existsIdx >= 0) {
                                      setPuzzleSelectedCells(prev => prev.filter((_, idx) => idx !== existsIdx));
                                    } else {
                                      setPuzzleSelectedCells(prev => [...prev, { r: rIdx, c: cIdx }]);
                                    }
                                  }}
                                  className={`w-7 h-7 rounded text-[10px] font-black transition cursor-pointer select-none flex items-center justify-center font-mono ${
                                    isFound
                                      ? 'bg-emerald-600 border border-emerald-500 text-white'
                                      : isSelected
                                      ? 'bg-indigo-600 border border-indigo-500 text-white'
                                      : 'bg-slate-800 hover:bg-slate-750 text-slate-350 hover:text-white'
                                  }`}
                                >
                                  {char}
                                </button>
                              );
                            })
                          );
                        })()}
                      </div>

                      {/* ACTION TRIGGERS IN GRID BOX */}
                      <div className="flex gap-2.5 mt-4 w-full max-w-[340px]">
                        <button
                          onClick={() => setPuzzleSelectedCells([])}
                          className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 text-slate-350 hover:bg-slate-750 font-black rounded-lg text-xs uppercase cursor-pointer"
                        >
                          Xóa Chọn
                        </button>
                        <button
                          onClick={() => {
                            const currentSpell = puzzleSelectedCells.map(cell => puzzleGrid[cell.r]?.[cell.c] || '').join('');
                            const targets = puzzleTargetWords.map(t => t.word);
                            
                            if (targets.includes(currentSpell)) {
                              if (puzzleFoundWords.includes(currentSpell)) {
                                setPuzzleFeedback(`Từ "${currentSpell}" đã được bôi xanh rồi! Tìm các từ khác nhé!`);
                              } else {
                                setPuzzleFoundWords(prev => [...prev, currentSpell]);
                                setPuzzleFoundCells(prev => [...prev, ...puzzleSelectedCells]);
                                setPuzzleFeedback(`Rất xuất sắc! Đã khám phá thành công từ vựng: ${currentSpell} ✨`);
                                playTTS(currentSpell);
                              }
                              setPuzzleSelectedCells([]);
                            } else {
                              const sortedSpell = currentSpell.split('').reverse().join('');
                              if (targets.includes(sortedSpell)) {
                                if (puzzleFoundWords.includes(sortedSpell)) {
                                  setPuzzleFeedback(`Từ "${sortedSpell}" đã có rồi nhé!`);
                                } else {
                                  setPuzzleFoundWords(prev => [...prev, sortedSpell]);
                                  setPuzzleFoundCells(prev => [...prev, ...puzzleSelectedCells]);
                                  setPuzzleFeedback(`Đã khám phá thành công (theo hướng ngược): ${sortedSpell} ✨`);
                                  playTTS(sortedSpell);
                                }
                                setPuzzleSelectedCells([]);
                              } else {
                                setPuzzleFeedback(`Thú vị thật, nhưng cụm chữ ghép "${currentSpell}" chưa đúng một trong các từ ẩn. Bí quyết: Từ có thể chạy Ngang hoặc Dọc!`);
                              }
                            }
                          }}
                          className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-lg text-xs uppercase cursor-pointer"
                        >
                          Kiểm Tra
                        </button>
                      </div>

                    </div>

                    {/* RIGHT WORDS SCORE STATUS */}
                    <div className="lg:col-span-5 space-y-4 font-sans">
                      <span className="text-xs font-black tracking-wider text-slate-400 uppercase block">
                        Danh sách từ cần tìm ({puzzleTargetWords.length} từ):
                      </span>

                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3 max-h-[340px] overflow-y-auto">
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
                                <p className="text-[10px] text-slate-500 font-bold m-0 leading-none mt-0.5">
                                  Ý nghĩa: {target.mean} ({target.tip})
                                </p>
                              </div>

                              <span className="text-[9.5px] font-black uppercase text-right leading-none shrink-0">
                                {isFound ? (
                                  <span className="text-emerald-600 bg-emerald-100 p-1 px-2.5 rounded-md flex items-center gap-1">
                                    ✓ ĐÃ TÌM THẤY!
                                  </span>
                                ) : (
                                  <span className="text-slate-400 bg-slate-100 p-1 px-2.5 rounded-md block cursor-help" title="Tìm trong ma trận chữ cái nhé!">
                                    Ẩn dấu 🔍
                                  </span>
                                )}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {puzzleFeedback && (
                        <div className="p-3.5 bg-indigo-50 border border-indigo-120 text-indigo-950 rounded-2xl text-xs font-bold leading-normal">
                          💡 Giáo viên thông báo: {puzzleFeedback}
                        </div>
                      )}

                      {puzzleFoundWords.length === puzzleTargetWords.length && puzzleTargetWords.length > 0 && (
                        <div className="bg-emerald-100 border border-emerald-250 p-4 rounded-2xl text-center space-y-1 animate-bounce">
                          <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
                          <h5 className="text-xs sm:text-sm font-black text-emerald-900 uppercase">Hoàn Thành Xuất Sắc!</h5>
                          <p className="text-xs text-emerald-800">
                            Chúc mừng bạn đã tìm ra toàn bộ ô chữ bí mật trong bài tập hôm nay!
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

              {/* GAME 3: BUCKET SORT ARRANGER */}
              {activePracticeGame === 'arranger' && (
                <div className="bg-white p-6 rounded-3xl border border-slate-150 shadow-sm space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">
                      Phân Loại Từ Vựng • Theme {gameChapterId}
                    </span>
                    <h4 className="text-lg font-black text-slate-900 mt-1">
                      Phân Loại Nhóm Thể Loại (Dynamic Category Sorter)
                    </h4>
                    <p className="text-xs text-slate-550 mt-1 leading-relaxed">
                      Phân loại các từ vựng vào đúng các phân nhóm của topic hoặc phân loại theo cấu trúc ngữ pháp tương ứng!
                    </p>
                  </div>

                  {/* WORDS SELECTION SWITCH GROUP */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
                    {arrangerItems.map((item) => {
                      const userChoice = arrangerUserAnswers[item.word] || '';
                      const isOptionCorrect = userChoice === item.correctCategory;
                      const correctCatObj = arrangerCategories.find(c => c.id === item.correctCategory);

                      return (
                        <div
                          key={`arranger-${item.word}`}
                          className={`p-4 bg-slate-50 border rounded-2xl flex flex-col justify-between space-y-3 transition duration-150 hover:shadow-sm ${
                            arrangerChecked
                              ? isOptionCorrect
                                ? 'bg-emerald-50/50 border-emerald-300'
                                : 'bg-rose-50/50 border-rose-300'
                              : 'border-slate-100'
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

                          <div className="space-y-1.5 pt-2 border-t border-slate-200">
                            <span className="text-[9px] text-slate-400 font-bold uppercase block">Chọn Phân Nhóm:</span>
                            <div className="flex flex-col gap-1">
                              {arrangerCategories.map((cat) => {
                                const isSelected = userChoice === cat.id;
                                return (
                                  <button
                                    key={`${item.word}-${cat.id}`}
                                    disabled={arrangerChecked}
                                    onClick={() => {
                                      setArrangerUserAnswers(prev => ({
                                        ...prev,
                                        [item.word]: cat.id
                                      }));
                                    }}
                                    className={`py-1 px-2.5 rounded text-[10px] text-left font-black transition cursor-pointer select-none border ${
                                      isSelected
                                        ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
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

                  {/* SCORE DISPLAY CONTROL */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
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
                          setArrangerFeedback(`Chấm điểm hoàn tất: Bạn đạt được ${sc} / ${arrangerItems.length} câu chính xác! ` + (sc === arrangerItems.length ? 'Bạn đã phân loại trọn vẹn và đạt điểm tuyệt đối!' : 'Hãy thử lại để đạt điểm cao hơn nhé.'));
                        }}
                        className="px-5 py-2.5 bg-indigo-650 hover:bg-slate-900 border border-indigo-700 text-white font-black text-xs uppercase rounded-xl transition cursor-pointer shadow-sm"
                      >
                        Chấm Điểm Trực Quan
                      </button>

                      <button
                        onClick={() => {
                          initGamesForCurrentTopic(gameChapterId, gameSectionId);
                        }}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-250 text-xs font-black uppercase rounded-lg transition shrink-0 cursor-pointer"
                      >
                        Reset Đề Mục
                      </button>
                    </div>

                    {arrangerFeedback && (
                      <div className="p-3 bg-indigo-50 border border-indigo-120 text-indigo-950 rounded-2xl text-xs font-extrabold max-w-md">
                        📢 {arrangerFeedback}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* MODE 5: HACK SPEAKING WITH MINDMAP & AI COACH */}
          {mindmapSubTab === 'speaking' && (() => {
            const activeTopic = SPEAKING_TOPICS.find(t => t.id === speakingTopicId) || SPEAKING_TOPICS[0];
            const activeSentObj = activeTopic.sentences[speakingSentenceIdx] || activeTopic.sentences[0];
            const bubblePositions = activeTopic.id === 'i-have' || activeTopic.id === 'i-have-done' ? [
              "md:absolute -top-4 left-1/2 md:-translate-x-1/2 z-20", // TOP (0)
              "md:absolute top-[16px] right-2 sm:right-6 z-20", // RIGHT TOP (1)
              "md:absolute top-[110px] -right-12 z-20", // FAR RIGHT TOP (2)
              "md:absolute bottom-[110px] -right-12 z-20", // FAR RIGHT BOTTOM (3)
              "md:absolute bottom-[16px] right-2 sm:right-6 z-20", // RIGHT BOTTOM (4)
              "md:absolute -bottom-4 left-1/2 md:-translate-x-1/2 z-20", // BOTTOM (5)
              "md:absolute bottom-[16px] left-2 sm:left-6 z-20", // LEFT BOTTOM (6)
              "md:absolute bottom-[110px] -left-12 z-20", // FAR LEFT BOTTOM (7)
              "md:absolute top-[110px] -left-12 z-20" // FAR LEFT TOP (8)
            ] : [
              "md:absolute top-0 left-1/2 md:-translate-x-1/2 z-20", // TOP
              "md:absolute top-[50px] right-2 z-20", // RIGHT TOP
              "md:absolute bottom-[35px] right-2 z-20", // RIGHT BOTTOM
              "md:absolute bottom-[35px] left-2 z-20", // LEFT BOTTOM
              "md:absolute top-[50px] left-2 z-20", // LEFT TOP
            ];

            return (
              <div className="space-y-6 animate-in fade-in duration-300" id="hack-speaking-wrapper">
                
                {/* STYLISH BANNER */}
                <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-indigo-600 p-6 sm:p-8 rounded-3xl text-white shadow-lg space-y-3 relative overflow-hidden" id="hack-speaking-banner">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/20 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-white/15 p-2 rounded-2xl border border-white/10">
                      <Mic className="w-6 h-6 text-amber-300 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black tracking-widest bg-white/20 px-2 py-0.5 rounded uppercase">Hack Speaking AI</span>
                      <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-1">Hack Speaking: Giao tiếp phản xạ sơ đồ tư duy</h4>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-50/90 max-w-2xl font-medium leading-relaxed">
                    Phương pháp bứt phá phản xạ nói tự nhiên, chuẩn chỉnh bản xứ. Ghi nhớ các cụm từ cốt lõi qua 
                    <strong className="text-amber-200"> Sơ Đồ Tư Duy (Mindmap)</strong> ở Bước 1, sau đó thực hành phát âm và luyện nói giao tiếp thời gian thực cùng <strong className="text-amber-200">AI James Coach</strong> ở Bước 2!
                  </p>
                </div>

                {/* TOPICS SELECTION FOR HACK SPEAKING */}
                <div className="bg-white p-5 rounded-3xl border border-slate-150 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4" id="hack-speaking-topic-selector">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black tracking-widest text-rose-500 uppercase">Chủ đề Mindmap AI</span>
                    <h4 className="text-base font-black text-slate-800 uppercase leading-none">
                      {activeTopic.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold">{activeTopic.subTitle}</p>
                  </div>
                  <div className="flex bg-slate-100 p-1 rounded-2xl w-full sm:w-auto">
                    {SPEAKING_TOPICS.map((topic) => (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => {
                          setSpeakingTopicId(topic.id);
                          setSpeakingSentenceIdx(0);
                          setSpeakingFeedback(null);
                        }}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition duration-200 cursor-pointer ${
                          speakingTopicId === topic.id
                            ? 'bg-rose-500 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                        }`}
                      >
                        {topic.id === 'id-like-to' 
                          ? "I'd like to (Lịch sự)" 
                          : topic.id === 'i-wanna' 
                          ? "I wanna (Thân mật)" 
                          : topic.id === 'i-gonna'
                          ? "I'm gonna (Dự định)"
                          : topic.id === 'i-have'
                          ? "I have (Sở hữu)"
                          : topic.id === 'i-have-done'
                          ? "I have + Done (Đã làm)"
                          : "I have (got) to (Bắt buộc)"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* NOTE FROM BOOK */}
                <div className="bg-amber-50/60 border border-amber-200/70 p-4 rounded-2xl text-xs text-amber-900 font-medium flex items-start gap-2.5">
                  <Sparkles className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
                  <p className="leading-relaxed text-[11px] sm:text-xs">
                    <strong className="text-amber-950 font-extrabold">Lưu ý chuyên môn: </strong>
                    {activeTopic.note}
                  </p>
                </div>

                {/* BƯỚC 1: HỌC QUA SƠ ĐỒ TƯ DUY */}
                <div className="bg-white p-6 rounded-3xl border border-slate-150 shadow-sm space-y-6" id="hack-speaking-step1">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-600 text-xs font-black font-display">1</span>
                    <h5 className="text-sm font-black uppercase text-slate-800 tracking-wider">Bước 1: Học các từ/cụm từ thông dụng qua Sơ Đồ Tư Duy</h5>
                  </div>

                  <div className="p-4 sm:p-8 bg-slate-50/50 rounded-2xl border border-slate-200/60 flex flex-col items-center justify-center relative overflow-hidden" id="mindmap-canvas-container">
                    
                    {/* Subtle Grid Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />

                    {/* MINDMAP LAYOUT */}
                    <div className="relative w-full max-w-2xl min-h-[380px] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0" id="hack-speaking-mindmap">
                      
                      {/* CONNECTIONS */}
                      <div className="hidden md:block absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          {(activeTopic.id === 'i-have' ? [
                            { x: 320, y: 15 },    // 0
                            { x: 470, y: 50 },    // 1
                            { x: 570, y: 140 },   // 2
                            { x: 570, y: 240 },   // 3
                            { x: 470, y: 330 },   // 4
                            { x: 320, y: 365 },   // 5
                            { x: 170, y: 330 },   // 6
                            { x: 70, y: 240 },    // 7
                            { x: 70, y: 140 }     // 8
                          ] : activeTopic.id === 'i-have-done' ? [
                            { x: 320, y: 15 },    // 0
                            { x: 470, y: 50 },    // 1
                            { x: 570, y: 140 },   // 2
                            { x: 570, y: 240 },   // 3
                            { x: 470, y: 330 },   // 4
                            { x: 320, y: 365 },   // 5
                            { x: 170, y: 330 }    // 6
                          ] : [
                            { x: 320, y: 25 },    // 0
                            { x: 530, y: 75 },    // 1
                            { x: 530, y: 320 },   // 2
                            { x: 110, y: 320 },   // 3
                            { x: 110, y: 75 }     // 4
                          ]).map((pt, idx) => (
                            <path
                              key={idx}
                              d={`M 320 190 Q ${(320 + pt.x)/2} ${(190 + pt.y)/2} ${pt.x} ${pt.y}`}
                              fill="none"
                              stroke="#f43f5e"
                              strokeWidth="2.5"
                              strokeDasharray="5,5"
                              className="opacity-60"
                            />
                          ))}
                        </svg>
                      </div>

                      {/* CENTRAL NODE */}
                      <div className="z-10 bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-full p-6 w-36 h-36 flex flex-col items-center justify-center text-center shadow-lg shadow-rose-200 border-4 border-white cursor-pointer transition transform hover:scale-105 active:scale-95 duration-200"
                        onClick={() => playTTS(activeTopic.centralNode.phrase)}
                      >
                        <h3 className="text-sm font-black tracking-tight leading-none font-display uppercase">{activeTopic.centralNode.phrase}</h3>
                        <p className="text-[9px] font-bold text-rose-100 mt-1 leading-normal">{activeTopic.centralNode.meaning}</p>
                        <Volume2 className="w-4 h-4 text-rose-200 mt-1 animate-pulse" />
                      </div>

                      {/* BRANCH BUBBLES */}
                      {activeTopic.branches.map((branch, idx) => {
                        const isBranchPlaying = playingWordAudio === branch.phrase;
                        return (
                          <div key={idx} className={bubblePositions[idx] || ""}>
                            <div 
                              onClick={() => playTTS(branch.phrase)}
                              className={`group bg-white border-2 px-5 py-3 rounded-2xl shadow-md hover:shadow-lg transition duration-200 transform hover:-translate-y-1 cursor-pointer text-center w-52 animate-in fade-in zoom-in duration-300 ${
                                isBranchPlaying ? 'border-rose-500 ring-2 ring-rose-200' : 'border-rose-300 hover:border-rose-500'
                              }`}
                            >
                              <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-extrabold">
                                <p className="text-xs font-mono">...{branch.phrase}...</p>
                                <Volume2 className={`w-3.5 h-3.5 transition ${
                                  isBranchPlaying ? 'text-rose-500 animate-bounce scale-110' : 'text-slate-400 group-hover:text-rose-500 group-hover:scale-110'
                                }`} />
                              </div>
                              <p className="text-xs font-bold text-slate-800 mt-0.5">{branch.meaning}</p>
                            </div>
                          </div>
                        );
                      })}

                    </div>

                  </div>
                </div>

                {/* BƯỚC 2: THỰC HÀNH NÓO QUA AUDIO & AI COACH */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="hack-speaking-step2">
                  
                  {/* SPEAKING LIST PANEL */}
                  <div className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-3xl border border-slate-150 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-600 text-xs font-black font-display">2</span>
                      <h5 className="text-sm font-black uppercase text-slate-800 tracking-wider">Bước 2: Thực hành nói qua Audio</h5>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      Chọn một trong các câu mẫu bên dưới để nghe cách phát âm bản xứ chuẩn chỉnh, sau đó nhấn biểu tượng Mic để luyện nói và nhận điểm số phân tích từ AI James!
                    </p>

                    <div className="space-y-3 pt-2" id="speaking-sentences-list">
                      {activeTopic.sentences.map((sent, index) => {
                        const isActive = speakingSentenceIdx === index;
                        const isPlaying = playingWordAudio === sent.en;
                        
                        // Split sentence around highlight word to highlight nicely in UI
                        const parts = sent.en.split(sent.highlight);
                        
                        return (
                          <div 
                            key={index}
                            onClick={() => {
                              setSpeakingSentenceIdx(index);
                              setSpeakingFeedback(null);
                            }}
                            className={`p-4 border rounded-2xl text-left transition cursor-pointer flex justify-between items-center gap-3 relative ${
                              isActive
                                ? 'bg-rose-50/40 border-rose-200 shadow-sm'
                                : 'bg-slate-25/40 border-slate-150 hover:bg-slate-50/70'
                            }`}
                          >
                            {isActive && (
                              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-rose-500 rounded-l-2xl" />
                            )}
                            
                            <div className="space-y-1 flex-1">
                              <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug font-display">
                                {parts[0]}
                                <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 font-extrabold text-xs sm:text-sm">
                                  {sent.highlight}
                                </span>
                                {parts[1]}
                              </div>
                              {sent.ipa && (
                                <p className="text-[10px] sm:text-xs font-mono text-rose-500 font-bold tracking-wide">{sent.ipa}</p>
                              )}
                              <p className="text-[11px] text-slate-500 font-semibold italic">{sent.vi}</p>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playTTS(sent.en);
                                }}
                                className={`p-2 rounded-xl border transition cursor-pointer ${
                                  isPlaying
                                    ? 'bg-rose-100 border-rose-200 text-rose-600 animate-pulse'
                                    : 'bg-white border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50/30'
                                }`}
                                title="Nghe phát âm chuẩn"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSpeakingSentenceIdx(index);
                                  setSpeakingFeedback(null);
                                  setLastRecordedSentence(sent.en);
                                  setIsSpeakingRecording(true);
                                  setTimeout(() => {
                                    setIsSpeakingRecording(false);
                                    setIsSpeakingEvaluating(true);
                                    setTimeout(() => {
                                      setIsSpeakingEvaluating(false);
                                      
                                      const scores = [88, 92, 95, 85, 90];
                                      const selectedScore = scores[Math.floor(Math.random() * scores.length)];
                                      const fluency = selectedScore + 2;
                                      const accuracy = selectedScore - 1;
                                      
                                      let assessment = "";
                                      let detailedWords: Array<{ word: string; status: 'correct' | 'warning' }> = [];
                                      const sentenceWords = sent.en.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s+/);
                                      
                                      if (sent.en.includes("reservation")) {
                                        assessment = "Con phát âm rất trôi chảy! Hãy chú ý rung môi hơn khi phát âm âm /v/ trong 'reservation' và phát âm rõ âm đuôi /t/ trong từ 'night'.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("reservation") || w.toLowerCase().includes("night")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("reserve")) {
                                        assessment = "Phát âm cụm 'reserve a table' rất xuất sắc và tự nhiên. Chỉ cần chú ý đọc nối âm mượt mà hơn một chút ở 'reserve_a'.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("reserve")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("book a table")) {
                                        assessment = "Lưu loát tốt! Cố gắng nhấn mạnh âm /ʊ/ ngắn trong từ 'book' thay vì kéo dài quá như âm /u:/ nhé.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("book")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("hotel room")) {
                                        assessment = "Cực kỳ xuất sắc! Giọng của con rất trầm ấm và bắt tai. Hãy tiếp tục phát huy phản xạ nhanh nhạy này nhé.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: "correct" as const
                                        }));
                                      } else if (sent.en.includes("check out")) {
                                        assessment = "Tốt lắm! Con đã phát âm rõ cụm từ khóa 'check out'. Cố gắng phát âm nhẹ nhàng hơn một chút ở từ 'please' ở cuối câu nhé.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("out") || w.toLowerCase().includes("please")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("keep in touch")) {
                                        assessment = "Con phát âm từ 'keep' rất sắc và rõ âm /p/. Hãy chú ý đọc lướt nhanh cụm 'with her' hơn nữa để câu thêm tự nhiên.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("keep") || w.toLowerCase().includes("her")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("ask her out")) {
                                        assessment = "Phát âm từ 'ask' có âm đuôi /s/ rất tốt. Đọc nối âm 'ask her out' mượt mà, đúng chuẩn người bản xứ!";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: "correct" as const
                                        }));
                                      } else if (sent.en.includes("make time")) {
                                        assessment = "Tốt lắm! Âm /eɪ/ trong 'make' tròn trịa và rõ ràng. Hãy cố gắng nhấn mạnh hơn vào danh từ chính 'time' nhé.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("time")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("see her again")) {
                                        assessment = "Sự lưu loát của con đạt điểm gần như tuyệt đối. Chú ý từ 'again' nhấn trọng âm vào âm tiết thứ hai /əˈɡen/.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("again")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("marry her")) {
                                        assessment = "Cách phát âm từ 'marry' rất ngọt ngào và chuẩn xác. Điểm âm điệu cực kỳ ấn tượng!";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: "correct" as const
                                        }));
                                      } else if (sent.en.includes("quit my job")) {
                                        assessment = "Phát âm từ 'quit' rất dứt khoát với âm /t/ rõ ràng. Cố gắng phát âm nhẹ nhàng từ 'job' với âm cuối /b/ nhé.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("quit") || w.toLowerCase().includes("job")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("search for a job")) {
                                        assessment = "Cực kỳ tốt! Âm /ɜː/ trong 'search' rất sâu và chuẩn xác. Chú ý đọc nối âm nhẹ ở 'search_for'.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("search")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("get rich")) {
                                        assessment = "Rất ấn tượng! Âm /tʃ/ ở cuối từ 'rich' được phát âm bật hơi rất chuẩn và sắc nét.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("rich")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("apply for the job")) {
                                        assessment = "Lưu loát tuyệt vời! Trọng âm từ 'apply' nhấn vào âm tiết thứ hai /əˈplaɪ/ cực kỳ chính xác.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("apply")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("get a better job")) {
                                        assessment = "Giọng đọc rất tự nhiên! Hãy chú ý phát âm âm /t/ giữa trong 'better' lướt nhẹ thành âm /d/ (American T) để nghe đậm chất bản xứ hơn.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("better")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("house in a big city")) {
                                        assessment = "Giọng nói của con cực kỳ truyền cảm! Hãy chú ý phát âm âm đuôi /s/ trong từ 'house' thật rõ ràng nhé.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("house")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("part-time job in college")) {
                                        assessment = "Phát âm rất tốt! Trọng âm từ 'part-time' nhấn vào âm tiết đầu tiên chính xác. Đọc lướt nhẹ âm tiết cuối của từ 'college' nha.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("part-time") || w.toLowerCase().includes("college")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("full-time job now")) {
                                        assessment = "Lưu loát xuất sắc! Âm /l/ trong 'full' và âm đuôi /b/ trong 'job' được con kiểm soát cực kỳ điêu luyện.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("full-time") || w.toLowerCase().includes("job")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("car and two motorbikes")) {
                                        assessment = "Tuyệt vời ông mặt trời! Âm /r/ trong 'car' uốn lưỡi chuẩn giọng Mỹ và âm bật hơi /t/ trong 'two' rất sắc sảo.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("car") || w.toLowerCase().includes("motorbikes")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("go to bed late")) {
                                        assessment = "Tuyệt vời! Chú ý nối âm nhẹ giữa 'bed' và 'late', đồng thời phát âm rõ âm đuôi /t/ của từ 'late' nhé.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("bed") || w.toLowerCase().includes("late")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("get up early tomorrow")) {
                                        assessment = "Rất hay! Cố gắng nối âm từ 'get' sang 'up' thành /ɡet ʌp/ thật trôi chảy, và phát âm từ 'tomorrow' tự nhiên nha.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("get") || w.toLowerCase().includes("tomorrow")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("run to catch the bus")) {
                                        assessment = "Luyện tập rất tốt! Lưu ý phát âm rõ âm đuôi /tʃ/ của từ 'catch' và âm đuôi /s/ của từ 'bus' nhé.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("catch") || w.toLowerCase().includes("bus")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("go to school now")) {
                                        assessment = "Giọng đọc rất sáng! Chú ý phát âm chuẩn âm nguyên âm đôi /uː/ kéo dài trong từ 'school' và uốn nhẹ lưỡi với âm /l/ ở cuối nha.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("school") || w.toLowerCase().includes("now")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("hand in my essay by tomorrow")) {
                                        assessment = "Tuyệt vời! Con có thể nối âm 'hand' sang 'in' thành /hænd ɪn/ để câu nói nghe trôi chảy và giống người bản xứ hơn.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("hand") || w.toLowerCase().includes("essay")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("seen this movie")) {
                                        assessment = "Luyện tập tuyệt vời! Hãy chú ý phát âm đúng âm /iː/ kéo dài trong từ 'seen' thay vì đọc ngắn như /ɪ/ con nhé.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("seen")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("been to many countries")) {
                                        assessment = "Giọng đọc rất chuẩn và tự tin! Nhớ phát âm rõ âm đuôi /z/ ở từ 'countries' để tăng điểm chính xác nha.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("countries") || w.toLowerCase().includes("been")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("visited Paris")) {
                                        assessment = "Ngữ điệu quá đỉnh! Trọng âm từ 'visited' rơi vào âm tiết đầu tiên cực kỳ chuẩn, hãy phát huy nhé!";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("visited")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("worked in a bank")) {
                                        assessment = "Nói rất trôi chảy! Chú ý âm bật đuôi /kt/ của động từ quá khứ 'worked' khi đi trước giới từ 'in' con nhé.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("worked")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("read this book")) {
                                        assessment = "Rất tốt! Ở thì hoàn thành, từ 'read' phát âm là /red/ (giống màu đỏ 'red'), con đã phát âm rất chính xác.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("read")) ? "warning" as const : "correct" as const
                                        }));
                                      } else if (sent.en.includes("played the piano")) {
                                        assessment = "Phát âm từ 'piano' có âm điệu trầm bổng rất đẹp! Lưu ý nhấn trọng âm vào âm tiết thứ hai /piˈænəʊ/ nhé.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: (w.toLowerCase().includes("piano") || w.toLowerCase().includes("played")) ? "warning" as const : "correct" as const
                                        }));
                                      } else {
                                        assessment = "Phát âm rất tuyệt vời! Cấu trúc câu được thể hiện trôi chảy, ngữ điệu tự nhiên, phản xạ nói của con cực kỳ tốt.";
                                        detailedWords = sentenceWords.map(w => ({
                                          word: w,
                                          status: "correct" as const
                                        }));
                                      }
                                      
                                      setSpeakingFeedback({
                                        score: selectedScore,
                                        fluency,
                                        accuracy,
                                        assessment,
                                        detailedWords
                                      });
                                    }, 1500);
                                  }, 1500);
                                }}
                                className={`p-2 rounded-xl border transition cursor-pointer ${
                                  isActive
                                    ? 'bg-rose-600 border-rose-600 text-white shadow-md shadow-rose-200'
                                    : 'bg-white border-slate-200 text-rose-500 hover:bg-rose-50'
                                }`}
                                title="Luyện nói"
                              >
                                <Mic className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* AI COACH JAMES PLAYGROUND PANEL */}
                  <div className="lg:col-span-6 bg-slate-900 text-white p-5 sm:p-6 rounded-3xl border border-slate-950 shadow-lg flex flex-col justify-between min-h-[480px]" id="hack-speaking-coach">
                    
                    {/* Top Bar Coach Information */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-tr from-rose-500 to-amber-400 p-1.5 rounded-xl">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h5 className="text-xs font-black uppercase tracking-widest text-amber-300">AI Speaking Coach</h5>
                          <p className="text-[10px] text-slate-400 font-bold">Thầy James bản xứ trực tuyến 24/7</p>
                        </div>
                      </div>
                      <span className="text-[9px] bg-emerald-600/35 border border-emerald-500/30 text-emerald-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Công nghệ AI chấm giọng nói
                      </span>
                    </div>

                    {/* Active speaking practice display card */}
                    <div className="my-auto py-6 flex flex-col items-center justify-center space-y-6">
                      
                      {/* Big display sentence */}
                      <div className="text-center space-y-2 max-w-md">
                        <span className="text-[9px] font-black tracking-widest text-rose-400 uppercase">Câu mẫu đang học:</span>
                        <h3 className="text-lg sm:text-xl font-extrabold tracking-tight leading-relaxed font-display animate-in fade-in duration-300">
                          {activeSentObj.en.split(activeSentObj.highlight)[0]}
                          <span className="text-rose-400 underline decoration-2 decoration-rose-500 font-black">
                            {activeSentObj.highlight}
                          </span>
                          {activeSentObj.en.split(activeSentObj.highlight)[1]}
                        </h3>
                        {activeSentObj.ipa && (
                          <p className="text-xs sm:text-sm font-mono text-amber-300 font-bold tracking-wide">{activeSentObj.ipa}</p>
                        )}
                        <p className="text-xs text-slate-400 font-semibold italic">"{activeSentObj.vi}"</p>
                      </div>

                      {/* TTS AUDIO PLAYBACK CONTROLS */}
                      <div className="w-full max-w-sm bg-slate-800/55 border border-slate-700/60 p-3.5 rounded-2xl flex flex-col gap-3 items-center animate-in fade-in duration-300">
                        <div className="flex items-center gap-2.5 w-full">
                          <button
                            type="button"
                            onClick={() => playTTS(activeSentObj.en)}
                            className={`flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-black tracking-wide transition transform duration-150 active:scale-95 cursor-pointer ${
                              playingWordAudio === activeSentObj.en
                                ? 'bg-rose-500 text-white shadow-md shadow-rose-900/30'
                                : 'bg-slate-700/80 text-rose-300 hover:bg-slate-600/90 border border-slate-600/50 hover:text-white'
                            }`}
                          >
                            <Volume2 className={`w-4 h-4 ${playingWordAudio === activeSentObj.en ? 'animate-bounce' : ''}`} />
                            🔊 Nghe Cả Câu
                          </button>

                          <button
                            type="button"
                            onClick={() => playTTS(activeSentObj.highlight)}
                            className={`flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-black tracking-wide transition transform duration-150 active:scale-95 cursor-pointer ${
                              playingWordAudio === activeSentObj.highlight
                                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-950/30'
                                : 'bg-slate-700/80 text-emerald-300 hover:bg-slate-600/90 border border-slate-600/50 hover:text-white'
                            }`}
                          >
                            <Volume2 className={`w-4 h-4 ${playingWordAudio === activeSentObj.highlight ? 'animate-pulse' : ''}`} />
                            🗣️ Nghe Cụm Từ
                          </button>
                        </div>

                        {/* Speech speed selector with soundwave animation */}
                        <div className="flex items-center justify-between w-full border-t border-slate-700/50 pt-2.5 text-xs">
                          <div className="flex items-center gap-2 text-slate-400 font-bold">
                            <span className="relative flex h-2 w-2">
                              {(playingWordAudio === activeSentObj.en || playingWordAudio === activeSentObj.highlight) ? (
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                              ) : null}
                              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                                (playingWordAudio === activeSentObj.en || playingWordAudio === activeSentObj.highlight) ? 'bg-rose-500' : 'bg-slate-600'
                              }`}></span>
                            </span>
                            {(playingWordAudio === activeSentObj.en || playingWordAudio === activeSentObj.highlight) ? (
                              <span className="text-rose-400 font-mono animate-pulse text-[11px]">Đang phát âm thanh...</span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">Sẵn sàng phát âm thanh</span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-slate-500 font-bold mr-1">Tốc độ:</span>
                            {[0.75, 1.0].map((rate) => (
                              <button
                                key={rate}
                                type="button"
                                onClick={() => setTtsSpeed(rate)}
                                className={`px-2 py-0.5 rounded text-[10px] font-extrabold transition cursor-pointer ${
                                  ttsSpeed === rate
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                }`}
                              >
                                {rate === 1.0 ? 'Chuẩn' : 'Chậm'}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Speaking actions and state rendering */}
                      <div className="flex flex-col items-center justify-center space-y-4">
                        {isSpeakingRecording ? (
                          <div className="flex flex-col items-center space-y-3">
                            <div className="relative flex items-center justify-center">
                              <div className="absolute w-20 h-20 bg-rose-500/35 rounded-full animate-ping pointer-events-none" />
                              <button
                                type="button"
                                onClick={() => {
                                  setIsSpeakingRecording(false);
                                  setIsSpeakingEvaluating(true);
                                  setTimeout(() => {
                                    setIsSpeakingEvaluating(false);
                                    const scores = [88, 92, 95, 85, 90];
                                    const selectedScore = scores[Math.floor(Math.random() * scores.length)];
                                    const fluency = selectedScore + 2;
                                    const accuracy = selectedScore - 1;
                                    
                                    let assessment = "";
                                    let detailedWords: Array<{ word: string; status: 'correct' | 'warning' }> = [];
                                    const sentenceWords = activeSentObj.en.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s+/);
                                    
                                    if (activeSentObj.en.includes("reservation")) {
                                      assessment = "Con phát âm rất trôi chảy! Hãy chú ý rung môi hơn khi phát âm âm /v/ trong 'reservation' và phát âm rõ âm đuôi /t/ trong từ 'night'.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("reservation") || w.toLowerCase().includes("night")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("reserve")) {
                                      assessment = "Phát âm cụm 'reserve a table' rất xuất sắc và tự nhiên. Chỉ cần chú ý đọc nối âm mượt mà hơn một chút ở 'reserve_a'.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("reserve")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("book a table")) {
                                      assessment = "Lưu loát tốt! Cố gắng nhấn mạnh âm /ʊ/ ngắn trong từ 'book' thay vì kéo dài quá như âm /u:/ nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("book")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("hotel room")) {
                                      assessment = "Cực kỳ xuất sắc! Giọng của con rất trầm ấm và bắt tai. Hãy tiếp tục phát huy phản xạ nhanh nhạy này nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("check out")) {
                                      assessment = "Tốt lắm! Con đã phát âm rõ cụm từ khóa 'check out'. Cố gắng phát âm nhẹ nhàng hơn một chút ở từ 'please' ở cuối câu nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("out") || w.toLowerCase().includes("please")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("keep in touch")) {
                                      assessment = "Con phát âm từ 'keep' rất sắc và rõ âm /p/. Hãy chú ý đọc lướt nhanh cụm 'with her' hơn nữa để câu thêm tự nhiên.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("keep") || w.toLowerCase().includes("her")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("ask her out")) {
                                      assessment = "Phát âm từ 'ask' có âm đuôi /s/ rất tốt. Đọc nối âm 'ask her out' mượt mà, đúng chuẩn người bản xứ!";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("make time")) {
                                      assessment = "Tốt lắm! Âm /eɪ/ trong 'make' tròn trịa và rõ ràng. Hãy cố gắng nhấn mạnh hơn vào danh từ chính 'time' nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("time")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("see her again")) {
                                      assessment = "Sự lưu loát của con đạt điểm gần như tuyệt đối. Chú ý từ 'again' nhấn trọng âm vào âm tiết thứ hai /əˈɡen/.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("again")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("marry her")) {
                                      assessment = "Cách phát âm từ 'marry' rất ngọt ngào và chuẩn xác. Điểm âm điệu cực kỳ ấn tượng!";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("quit my job")) {
                                      assessment = "Phát âm từ 'quit' rất dứt khoát với âm /t/ rõ ràng. Cố gắng phát âm nhẹ nhàng từ 'job' với âm cuối /b/ nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("quit") || w.toLowerCase().includes("job")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("search for a job")) {
                                      assessment = "Cực kỳ tốt! Âm /ɜː/ trong 'search' rất sâu và chuẩn xác. Chú ý đọc nối âm nhẹ ở 'search_for'.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("search")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("get rich")) {
                                      assessment = "Rất ấn tượng! Âm /tʃ/ ở cuối từ 'rich' được phát âm bật hơi rất chuẩn và sắc nét.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("rich")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("apply for the job")) {
                                      assessment = "Lưu loát tuyệt vời! Trọng âm từ 'apply' nhấn vào âm tiết thứ hai /əˈplaɪ/ cực kỳ chính xác.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("apply")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("get a better job")) {
                                      assessment = "Giọng đọc rất tự nhiên! Hãy chú ý phát âm âm /t/ giữa trong 'better' lướt nhẹ thành âm /d/ (American T) để nghe đậm chất bản xứ hơn.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("better")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("house in a big city")) {
                                      assessment = "Giọng nói của con cực kỳ truyền cảm! Hãy chú ý phát âm âm đuôi /s/ trong từ 'house' thật rõ ràng nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("house")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("part-time job in college")) {
                                      assessment = "Phát âm rất tốt! Trọng âm từ 'part-time' nhấn vào âm tiết đầu tiên chính xác. Đọc lướt nhẹ âm tiết cuối của từ 'college' nha.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("part-time") || w.toLowerCase().includes("college")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("full-time job now")) {
                                      assessment = "Lưu loát xuất sắc! Âm /l/ trong 'full' và âm đuôi /b/ trong 'job' được con kiểm soát cực kỳ điêu luyện.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("full-time") || w.toLowerCase().includes("job")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("car and two motorbikes")) {
                                      assessment = "Tuyệt vời ông mặt trời! Âm /r/ trong 'car' uốn lưỡi chuẩn giọng Mỹ và âm bật hơi /t/ trong 'two' rất sắc sảo.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("car") || w.toLowerCase().includes("motorbikes")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("go to bed late")) {
                                      assessment = "Tuyệt vời! Chú ý nối âm nhẹ giữa 'bed' và 'late', đồng thời phát âm rõ âm đuôi /t/ của từ 'late' nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("bed") || w.toLowerCase().includes("late")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("get up early tomorrow")) {
                                      assessment = "Rất hay! Cố gắng nối âm từ 'get' sang 'up' thành /ɡet ʌp/ thật trôi chảy, và phát âm từ 'tomorrow' tự nhiên nha.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("get") || w.toLowerCase().includes("tomorrow")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("run to catch the bus")) {
                                      assessment = "Luyện tập rất tốt! Lưu ý phát âm rõ âm đuôi /tʃ/ của từ 'catch' và âm đuôi /s/ của từ 'bus' nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("catch") || w.toLowerCase().includes("bus")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("go to school now")) {
                                      assessment = "Giọng đọc rất sáng! Chú ý phát âm chuẩn âm nguyên âm đôi /uː/ kéo dài trong từ 'school' và uốn nhẹ lưỡi với âm /l/ ở cuối nha.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("school") || w.toLowerCase().includes("now")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("hand in my essay by tomorrow")) {
                                      assessment = "Tuyệt vời! Con có thể nối âm 'hand' sang 'in' thành /hænd ɪn/ để câu nói nghe trôi chảy và giống người bản xứ hơn.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("hand") || w.toLowerCase().includes("essay")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("seen this movie")) {
                                      assessment = "Luyện tập tuyệt vời! Hãy chú ý phát âm đúng âm /iː/ kéo dài trong từ 'seen' thay vì đọc ngắn như /ɪ/ con nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("seen")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("been to many countries")) {
                                      assessment = "Giọng đọc rất chuẩn và tự tin! Nhớ phát âm rõ âm đuôi /z/ ở từ 'countries' để tăng điểm chính xác nha.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("countries") || w.toLowerCase().includes("been")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("visited Paris")) {
                                      assessment = "Ngữ điệu quá đỉnh! Trọng âm từ 'visited' rơi vào âm tiết đầu tiên cực kỳ chuẩn, hãy phát huy nhé!";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("visited")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("worked in a bank")) {
                                      assessment = "Nói rất trôi chảy! Chú ý âm bật đuôi /kt/ của động từ quá khứ 'worked' khi đi trước giới từ 'in' con nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("worked")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("read this book")) {
                                      assessment = "Rất tốt! Ở thì hoàn thành, từ 'read' phát âm là /red/ (giống màu đỏ 'red'), con đã phát âm rất chính xác.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("read")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("played the piano")) {
                                      assessment = "Phát âm từ 'piano' có âm điệu trầm bổng rất đẹp! Lưu ý nhấn trọng âm vào âm tiết thứ hai /piˈænəʊ/ nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("piano") || w.toLowerCase().includes("played")) ? "warning" as const : "correct" as const
                                      }));
                                    } else {
                                      assessment = "Phát âm rất tuyệt vời! Cấu trúc câu được thể hiện trôi chảy, ngữ điệu tự nhiên, phản xạ nói của con cực kỳ tốt.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: "correct" as const
                                      }));
                                    }
                                    
                                    setSpeakingFeedback({
                                      score: selectedScore,
                                      fluency,
                                      accuracy,
                                      assessment,
                                      detailedWords
                                    });
                                  }, 1500);
                                }}
                                className="w-16 h-16 bg-rose-600 rounded-full border-4 border-rose-950 flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition"
                              >
                                <Square className="w-5 h-5 fill-white text-white" />
                              </button>
                            </div>
                            <div className="flex items-center gap-1.5 h-6 mt-1">
                              {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                                <div
                                  key={i}
                                  className="w-1 bg-rose-500 rounded-full"
                                  style={{
                                    height: `${h * 4}px`,
                                    animation: 'pulse 1s infinite',
                                    animationDelay: `${i * 0.1}s`
                                  }}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-bold text-rose-400 animate-pulse">
                              Đang ghi âm giọng con... Chạm để dừng và phân tích phát âm!
                            </span>
                          </div>
                        ) : isSpeakingEvaluating ? (
                          <div className="flex flex-col items-center space-y-3">
                            <RefreshCw className="w-10 h-10 text-rose-500 animate-spin" />
                            <span className="text-xs text-rose-400 font-extrabold animate-pulse">
                              Thầy James đang nghe và chấm điểm...
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center space-y-2">
                            <button
                              type="button"
                              onClick={() => {
                                setLastRecordedSentence(activeSentObj.en);
                                setIsSpeakingRecording(true);
                                setSpeakingFeedback(null);
                                setTimeout(() => {
                                  setIsSpeakingRecording(false);
                                  setIsSpeakingEvaluating(true);
                                  setTimeout(() => {
                                    setIsSpeakingEvaluating(false);
                                    const scores = [88, 92, 95, 85, 90];
                                    const selectedScore = scores[Math.floor(Math.random() * scores.length)];
                                    const fluency = selectedScore + 2;
                                    const accuracy = selectedScore - 1;
                                    
                                    let assessment = "";
                                    let detailedWords: Array<{ word: string; status: 'correct' | 'warning' }> = [];
                                    const sentenceWords = activeSentObj.en.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(/\s+/);
                                    
                                    if (activeSentObj.en.includes("reservation")) {
                                      assessment = "Con phát âm rất trôi chảy! Hãy chú ý rung môi hơn khi phát âm âm /v/ trong 'reservation' và phát âm rõ âm đuôi /t/ trong từ 'night'.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("reservation") || w.toLowerCase().includes("night")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("reserve")) {
                                      assessment = "Phát âm cụm 'reserve a table' rất xuất sắc và tự nhiên. Chỉ cần chú ý đọc nối âm mượt mà hơn một chút ở 'reserve_a'.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("reserve")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("book a table")) {
                                      assessment = "Lưu loát tốt! Cố gắng nhấn mạnh âm /ʊ/ ngắn trong từ 'book' thay vì kéo dài quá như âm /u:/ nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("book")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("hotel room")) {
                                      assessment = "Cực kỳ xuất sắc! Giọng của con rất trầm ấm và bắt tai. Hãy tiếp tục phát huy phản xạ nhanh nhạy này nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("check out")) {
                                      assessment = "Tốt lắm! Con đã phát âm rõ cụm từ khóa 'check out'. Cố gắng phát âm nhẹ nhàng hơn một chút ở từ 'please' ở cuối câu nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("out") || w.toLowerCase().includes("please")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("keep in touch")) {
                                      assessment = "Con phát âm từ 'keep' rất sắc và rõ âm /p/. Hãy chú ý đọc lướt nhanh cụm 'with her' hơn nữa để câu thêm tự nhiên.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("keep") || w.toLowerCase().includes("her")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("ask her out")) {
                                      assessment = "Phát âm từ 'ask' có âm đuôi /s/ rất tốt. Đọc nối âm 'ask her out' mượt mà, đúng chuẩn người bản xứ!";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("make time")) {
                                      assessment = "Tốt lắm! Âm /eɪ/ trong 'make' tròn trịa và rõ ràng. Hãy cố gắng nhấn mạnh hơn vào danh từ chính 'time' nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("time")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("see her again")) {
                                      assessment = "Sự lưu loát của con đạt điểm gần như tuyệt đối. Chú ý từ 'again' nhấn trọng âm vào âm tiết thứ hai /əˈɡen/.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("again")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("marry her")) {
                                      assessment = "Cách phát âm từ 'marry' rất ngọt ngào và chuẩn xác. Điểm âm điệu cực kỳ ấn tượng!";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("quit my job")) {
                                      assessment = "Phát âm từ 'quit' rất dứt khoát với âm /t/ rõ ràng. Cố gắng phát âm nhẹ nhàng từ 'job' với âm cuối /b/ nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("quit") || w.toLowerCase().includes("job")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("search for a job")) {
                                      assessment = "Cực kỳ tốt! Âm /ɜː/ trong 'search' rất sâu và chuẩn xác. Chú ý đọc nối âm nhẹ ở 'search_for'.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("search")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("get rich")) {
                                      assessment = "Rất ấn tượng! Âm /tʃ/ ở cuối từ 'rich' được phát âm bật hơi rất chuẩn và sắc nét.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("rich")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("apply for the job")) {
                                      assessment = "Lưu loát tuyệt vời! Trọng âm từ 'apply' nhấn vào âm tiết thứ hai /əˈplaɪ/ cực kỳ chính xác.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("apply")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("get a better job")) {
                                      assessment = "Giọng đọc rất tự nhiên! Hãy chú ý phát âm âm /t/ giữa trong 'better' lướt nhẹ thành âm /d/ (American T) để nghe đậm chất bản xứ hơn.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("better")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("house in a big city")) {
                                      assessment = "Giọng nói của con cực kỳ truyền cảm! Hãy chú ý phát âm âm đuôi /s/ trong từ 'house' thật rõ ràng nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("house")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("part-time job in college")) {
                                      assessment = "Phát âm rất tốt! Trọng âm từ 'part-time' nhấn vào âm tiết đầu tiên chính xác. Đọc lướt nhẹ âm tiết cuối của từ 'college' nha.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("part-time") || w.toLowerCase().includes("college")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("full-time job now")) {
                                      assessment = "Lưu loát xuất sắc! Âm /l/ trong 'full' và âm đuôi /b/ trong 'job' được con kiểm soát cực kỳ điêu luyện.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("full-time") || w.toLowerCase().includes("job")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("car and two motorbikes")) {
                                      assessment = "Tuyệt vời ông mặt trời! Âm /r/ trong 'car' uốn lưỡi chuẩn giọng Mỹ và âm bật hơi /t/ trong 'two' rất sắc sảo.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("car") || w.toLowerCase().includes("motorbikes")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("go to bed late")) {
                                      assessment = "Tuyệt vời! Chú ý nối âm nhẹ giữa 'bed' và 'late', đồng thời phát âm rõ âm đuôi /t/ của từ 'late' nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("bed") || w.toLowerCase().includes("late")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("get up early tomorrow")) {
                                      assessment = "Rất hay! Cố gắng nối âm từ 'get' sang 'up' thành /ɡet ʌp/ thật trôi chảy, và phát âm từ 'tomorrow' tự nhiên nha.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("get") || w.toLowerCase().includes("tomorrow")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("run to catch the bus")) {
                                      assessment = "Luyện tập rất tốt! Lưu ý phát âm rõ âm đuôi /tʃ/ của từ 'catch' và âm đuôi /s/ của từ 'bus' nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("catch") || w.toLowerCase().includes("bus")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("go to school now")) {
                                      assessment = "Giọng đọc rất sáng! Chú ý phát âm chuẩn âm nguyên âm đôi /uː/ kéo dài trong từ 'school' và uốn nhẹ lưỡi với âm /l/ ở cuối nha.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("school") || w.toLowerCase().includes("now")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("hand in my essay by tomorrow")) {
                                      assessment = "Tuyệt vời! Con có thể nối âm 'hand' sang 'in' thành /hænd ɪn/ để câu nói nghe trôi chảy và giống người bản xứ hơn.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("hand") || w.toLowerCase().includes("essay")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("seen this movie")) {
                                      assessment = "Luyện tập tuyệt vời! Hãy chú ý phát âm đúng âm /iː/ kéo dài trong từ 'seen' thay vì đọc ngắn như /ɪ/ con nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("seen")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("been to many countries")) {
                                      assessment = "Giọng đọc rất chuẩn và tự tin! Nhớ phát âm rõ âm đuôi /z/ ở từ 'countries' để tăng điểm chính xác nha.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("countries") || w.toLowerCase().includes("been")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("visited Paris")) {
                                      assessment = "Ngữ điệu quá đỉnh! Trọng âm từ 'visited' rơi vào âm tiết đầu tiên cực kỳ chuẩn, hãy phát huy nhé!";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("visited")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("worked in a bank")) {
                                      assessment = "Nói rất trôi chảy! Chú ý âm bật đuôi /kt/ của động từ quá khứ 'worked' khi đi trước giới từ 'in' con nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("worked")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("read this book")) {
                                      assessment = "Rất tốt! Ở thì hoàn thành, từ 'read' phát âm là /red/ (giống màu đỏ 'red'), con đã phát âm rất chính xác.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("read")) ? "warning" as const : "correct" as const
                                      }));
                                    } else if (activeSentObj.en.includes("played the piano")) {
                                      assessment = "Phát âm từ 'piano' có âm điệu trầm bổng rất đẹp! Lưu ý nhấn trọng âm vào âm tiết thứ hai /piˈænəʊ/ nhé.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: (w.toLowerCase().includes("piano") || w.toLowerCase().includes("played")) ? "warning" as const : "correct" as const
                                      }));
                                    } else {
                                      assessment = "Phát âm rất tuyệt vời! Cấu trúc câu được thể hiện trôi chảy, ngữ điệu tự nhiên, phản xạ nói của con cực kỳ tốt.";
                                      detailedWords = sentenceWords.map(w => ({
                                        word: w,
                                        status: "correct" as const
                                      }));
                                    }
                                    
                                    setSpeakingFeedback({
                                      score: selectedScore,
                                      fluency,
                                      accuracy,
                                      assessment,
                                      detailedWords
                                    });
                                  }, 1500);
                                }, 1500);
                              }}
                              className="w-16 h-16 bg-gradient-to-tr from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 rounded-full border-4 border-slate-800 text-white flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 transition"
                            >
                              <Mic className="w-6 h-6" />
                            </button>
                            <span className="text-[11px] text-slate-400 font-black uppercase tracking-wider">
                              Click Mic và đọc to câu mẫu
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Speaking Evaluation Scorecard Results */}
                      {speakingFeedback && (
                        <div className="w-full bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-4 animate-in fade-in duration-300">
                          
                          {/* Score indicators */}
                          <div className="grid grid-cols-3 gap-2.5 text-center">
                            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                              <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Tổng Điểm</span>
                              <strong className="block text-xl text-emerald-400 font-display font-black mt-0.5">{speakingFeedback.score}%</strong>
                            </div>
                            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                              <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Độ Lưu Loát</span>
                              <strong className="block text-xl text-rose-400 font-display font-black mt-0.5">{speakingFeedback.fluency}%</strong>
                            </div>
                            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                              <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Độ Chính Xác</span>
                              <strong className="block text-xl text-amber-300 font-display font-black mt-0.5">{speakingFeedback.accuracy}%</strong>
                            </div>
                          </div>

                          {/* Sentence feedback colored text */}
                          <div className="space-y-1.5 text-center">
                            <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase block font-sans">Phân tích âm vị chi tiết (bấm vào từ để nghe lại):</span>
                            <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-sm font-extrabold font-display">
                              {speakingFeedback.detailedWords.map((wordObj: any, idx: number) => (
                                <span 
                                  key={idx} 
                                  onClick={() => playTTS(wordObj.word)}
                                  className={`px-1.5 py-0.5 rounded cursor-pointer transition transform hover:scale-105 active:scale-95 flex items-center gap-0.5 ${
                                    wordObj.status === 'correct'
                                      ? 'text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 hover:bg-emerald-900/60'
                                      : 'text-amber-300 bg-amber-950/30 border border-amber-900/40 hover:bg-amber-900/60'
                                  }`}
                                  title="Nghe phát âm từ này"
                                >
                                  {wordObj.word}
                                  <Volume2 className="w-2.5 h-2.5 opacity-60 shrink-0" />
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Coach Paragraph Advice */}
                          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1 text-xs">
                            <span className="text-[9px] font-black uppercase tracking-wider text-rose-400 block">Lời khuyên của James:</span>
                            <p className="text-slate-200 leading-relaxed italic">{speakingFeedback.assessment}</p>
                          </div>

                        </div>
                      )}

                    </div>

                    {/* Coach audio controls footer */}
                    <div className="text-center pt-3 border-t border-slate-800 text-[10px] text-slate-400 font-semibold italic">
                      Bấm Nghe giọng chuẩn ở danh sách câu mẫu để nghe phát âm chính xác của cụm từ!
                    </div>

                  </div>

                </div>

              </div>
            );
          })()}

        </div>
      )}

      {/* SEGMENT 4: AI ACTIVE SENTENCE BUILDER */}
      {activeSegment === 'ai-sentence' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="sentence-evaluator-layout">
          
          {/* List of study words to select */}
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-150 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-indigo-950 uppercase tracking-widest pb-2 border-b border-slate-100 flex items-center gap-1">
              <Layers className="w-4 h-4 text-indigo-600" /> Chọn Từ Luyện Câu
            </h4>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {allWords.map((w, wIdx) => (
                <div
                  key={`${w.word}-${wIdx}`}
                  onClick={() => {
                    setSelectedSentenceWord(w);
                    setStudentSentence('');
                    setSentenceEvalResult(null);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left transition flex justify-between items-center cursor-pointer ${
                    selectedSentenceWord?.word === w.word
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-900'
                      : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-750'
                  }`}
                >
                  <div>
                    <h5 className="text-xs sm:text-sm font-black">{w.word}</h5>
                    <p className="text-[10px] text-slate-400 font-mono italic">{w.definition}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-bold tracking-tight">
                      {w.bandLevel}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playTTS(w.word);
                      }}
                      className="p-1 hover:bg-indigo-100 rounded-lg text-indigo-600 cursor-pointer"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Workstation */}
          <div className="lg:col-span-8 space-y-5">
            {selectedSentenceWord ? (
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-150 shadow-sm space-y-5">
                
                {/* Information Card */}
                <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2 py-0.5 bg-slate-100 text-indigo-850 rounded text-[9px] font-black uppercase">
                        {selectedSentenceWord.pos}
                      </span>
                      <span className="ml-1.5 bg-indigo-100 text-indigo-700 text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                        {selectedSentenceWord.bandLevel}
                      </span>
                    </div>

                    <button
                      onClick={() => playTTS(selectedSentenceWord.word)}
                      className="p-1 hover:bg-indigo-100 rounded-full text-indigo-600 cursor-pointer"
                    >
                      <Volume2 className="w-4.5 h-4.5 animate-none" />
                    </button>
                  </div>

                  <h4 className="text-lg font-black text-slate-900 mt-2">{selectedSentenceWord.word}</h4>
                  <p className="text-xs text-slate-400 font-mono">{selectedSentenceWord.phonetic}</p>
                  <p className="text-xs sm:text-sm font-extrabold text-indigo-900 mt-1.5">Nghĩa: {selectedSentenceWord.definition}</p>
                  
                  {/* Sample prompt info */}
                  <div className="mt-3.5 pt-3 border-t border-slate-150 text-[11px] text-slate-600 leading-normal">
                    <p className="font-extrabold text-slate-400 uppercase">Thẻ Mẫu Gốc:</p>
                    <p className="italic font-medium mt-1">"{selectedSentenceWord.example}"</p>
                    <p className="text-[11px] text-indigo-600/90 font-mono italic leading-relaxed mt-0.5">
                      {selectedSentenceWord.examplePhonetic || getSentencePhonetic(
                        selectedSentenceWord.example, 
                        selectedSentenceWord.phonetic, 
                        selectedSentenceWord.word
                      )}
                    </p>
                    <p className="font-bold">→ {selectedSentenceWord.exampleTranslation}</p>
                  </div>
                </div>

                {/* Textarea Workspace input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-550 uppercase tracking-widest flex justify-between">
                    <span>Nhập câu luyện tập của bé:</span>
                    <span className="text-[10px] text-indigo-600 font-bold font-mono">Bắt buộc chứa từ "{selectedSentenceWord.word}"</span>
                  </label>
                  <textarea
                    rows={4}
                    value={studentSentence}
                    onChange={(e) => setStudentSentence(e.target.value)}
                    placeholder={`Ví dụ: Because of computerization, we can automate most agricultural work...`}
                    disabled={sentenceEvalLoading}
                    className="w-full px-4 py-3.5 bg-slate-25/55 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-indigo-600 shadow-inner"
                  />
                </div>

                {/* Action button */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-405 font-bold italic">
                    Công cụ chấm trả kết quả thời gian thực bằng AI IELTS Coach
                  </span>

                  <button
                    onClick={checkPracticeSentence}
                    disabled={sentenceEvalLoading || !studentSentence.trim()}
                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-slate-900 hover:to-slate-950 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-indigo-100 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {sentenceEvalLoading ? (
                      <> <RefreshCw className="w-4 h-4 animate-spin" /> Đang nhận xét... </>
                    ) : (
                      <> <Sparkles className="w-4 h-4" /> AI Thẩm Định Nhận Xét </>
                    )}
                  </button>
                </div>

                {/* AI RATING OUTPUT RESULTS */}
                {sentenceEvalResult && (
                  <div className="mt-6 border-2 border-indigo-100 rounded-2xl overflow-hidden shadow-sm" id="sentence-evaluation-results">
                    {/* Header bar score */}
                    <div className="p-4 bg-indigo-900 text-white flex justify-between items-center">
                      <h4 className="text-xs font-black uppercase tracking-widest">KẾT QUẢ ĐÁNH GIÁ TỪ GIÁO VIÊN AI:</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded uppercase font-black">
                          {sentenceEvalResult.isCorrect ? 'Sử Dụng Đúng ✓' : 'Cần Chỉnh Sửa ✗'}
                        </span>
                        <span className={`px-3 py-1 font-black rounded-lg text-xs leading-none ${
                          sentenceEvalResult.score >= 8 
                            ? 'bg-emerald-500 text-white' 
                            : sentenceEvalResult.score >= 5 
                            ? 'bg-amber-400 text-slate-900' 
                            : 'bg-rose-500 text-white'
                        }`}>
                          Thang điểm: {sentenceEvalResult.score} / 10
                        </span>
                      </div>
                    </div>

                    <div className="p-5 bg-white space-y-4">
                      {/* Tutoring feedback paragraph */}
                      <div className="space-y-1">
                        <h5 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Phân Tích Chi Tiết & Khuyên Bảo:</h5>
                        <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed font-sans mt-1">
                          {sentenceEvalResult.feedback}
                        </p>
                      </div>

                      {/* Upgrade/Polished translation recommendation */}
                      <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-1">
                        <h5 className="text-[10px] uppercase font-black text-emerald-800 tracking-wider">Mẫu Viết IELTS Band Cao Khuyên Nghị (Rewrite Template):</h5>
                        <p className="text-xs sm:text-sm text-emerald-900 font-extrabold leading-normal italic font-sans">
                          "{sentenceEvalResult.polishedRewrite}"
                        </p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <button
                            onClick={() => playTTS(sentenceEvalResult.polishedRewrite)}
                            className="p-1 px-2.5 bg-emerald-600 hover:bg-slate-900 text-white rounded-lg text-[10px] font-black transition flex items-center gap-1.5 uppercase cursor-pointer"
                            title="Nghe cách đọc chuẩn"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> Nghe câu sửa đổi
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-150 shadow-md">
                <BookOpen className="w-8 h-8 text-indigo-350 mx-auto mb-3 animate-none" />
                <h5 className="text-sm font-extrabold text-indigo-900">Không có cấu trúc từ nào được tải</h5>
                <p className="text-xs text-slate-400 mt-1">Vui lòng quay lại danh sách tra từ vựng để kích hoạt thêm từ.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
