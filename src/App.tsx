import React, { useState, useEffect } from 'react';
import { CEFRLevel, PersonalizedRoadmap, PersonalizedRoadmapLesson } from './types';
import PlacementTest from './components/PlacementTest';
import LessonPlayer from './components/LessonPlayer';
import TeacherDashboard from './components/TeacherDashboard';
import StudentHomeworkDashboard from './components/StudentHomeworkDashboard';
import IeltsVocabularyPlatform from './components/IeltsVocabularyPlatform';
import GrammarHub from './components/GrammarHub';
import StudentCareMarketing from './components/StudentCareMarketing';
import { 
  Compass, Award, Brain, Sparkles, BookOpen, Volume2, 
  MessageSquare, Users, GraduationCap, RefreshCw, Trophy,
  Flame, CheckCircle2, Lock, ChevronRight, Check,
  LogOut, User, X, Edit3, Save, ArrowLeft, Clock,
  ClipboardList, UploadCloud, FileText, Calendar, AlertCircle, CheckSquare, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  
  // Custom authentication status for dynamic approval flow
  const [studentUsername, setStudentUsername] = useState<string>(() => {
    return localStorage.getItem('el_student_username') || '';
  });
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('el_student_name') || '';
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem('el_student_username');
  });
  const [isPendingApproval, setIsPendingApproval] = useState<boolean>(() => {
    return localStorage.getItem('el_is_pending') === 'true';
  });

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authError, setAuthError] = useState<string>('');
  const [authSuccess, setAuthSuccess] = useState<string>('');
  
  const [inputUsername, setInputUsername] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputFullName, setInputFullName] = useState<string>('');
  const [inputGrade, setInputGrade] = useState<string>('');
  const [inputPhoneNumber, setInputPhoneNumber] = useState<string>('');
  const [inputLearningGoal, setInputLearningGoal] = useState<string>('');
  const [inputTargetLevel, setInputTargetLevel] = useState<string>('A1');

  const [isNameSubmitted, setIsNameSubmitted] = useState<boolean>(() => {
    const hasUser = !!localStorage.getItem('el_student_username');
    const isPending = localStorage.getItem('el_is_pending') === 'true';
    return hasUser && !isPending;
  });

  // Level test & roadmap state
  const [score, setScore] = useState<number>(() => {
    return Number(localStorage.getItem('el_score') || '-1');
  });
  const [roadmap, setRoadmap] = useState<PersonalizedRoadmap | null>(() => {
    const saved = localStorage.getItem('el_roadmap');
    return saved ? JSON.parse(saved) : null;
  });

  // Custom Grade Select state (Vietnam K-12 Roadmap)
  const [onboardingMode, setOnboardingMode] = useState<'menu' | 'placement' | 'grade_selection'>('menu');
  const [loadingGradeRoadmap, setLoadingGradeRoadmap] = useState<boolean>(false);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);

  const handleGradeSelect = async (grade: number) => {
    setLoadingGradeRoadmap(true);
    setSelectedGrade(grade);
    try {
      const response = await fetch('/api/roadmap/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade, name: studentName }),
      });
      if (!response.ok) throw new Error('Không thể tải lộ trình lớp học');
      const data: PersonalizedRoadmap = await response.json();
      handleRoadmapGenerated(data, -2); // -2 code indicates student followed a school grade level grammar roadmap
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra khi tạo lộ trình học tập theo Lớp. Vui lòng thử lại.');
    } finally {
      setLoadingGradeRoadmap(false);
      setSelectedGrade(null);
    }
  };

  // Track completed lessons locally to show custom milestones progress
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('el_completed_lessons');
    return saved ? JSON.parse(saved) : [];
  });

  // Active studying lesson
  const [activeLesson, setActiveLesson] = useState<PersonalizedRoadmapLesson | null>(null);

  // User Streak state
  const [streak, setStreak] = useState<number>(() => {
    return Number(localStorage.getItem('el_streak') || '1');
  });
  const [lastCheckInDate, setLastCheckInDate] = useState<string>(() => {
    return localStorage.getItem('el_last_checkin_date') || '';
  });

  // Profile modal and inline edit state
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(studentName);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  // Student homework state & fetch controllers
  const [activeStudentSubTab, setActiveStudentSubTab] = useState<'lo-trinh' | 'bai-tap' | 'lop-hoc' | 'tu-vung' | 'ngu-phap' | 'cham-soc'>('lo-trinh');
  const [studentAssignments, setStudentAssignments] = useState<any[]>([]);
  const [studentSubmissions, setStudentSubmissions] = useState<any[]>([]);
  const [loadingStudentHw, setLoadingStudentHw] = useState<boolean>(false);

  // Student classrooms state
  const [studentClassrooms, setStudentClassrooms] = useState<any[]>([]);
  const [loadingStudentClassrooms, setLoadingStudentClassrooms] = useState<boolean>(false);
  const [isJoinClassModalOpen, setIsJoinClassModalOpen] = useState<boolean>(false);
  const [joinClassCode, setJoinClassCode] = useState<string>('');
  const [joiningClass, setJoiningClass] = useState<boolean>(false);
  const [selectedClassroomDetails, setSelectedClassroomDetails] = useState<any | null>(null);

  const activeClassroom = selectedClassroomDetails
    ? (studentClassrooms.find(c => c.id === selectedClassroomDetails.id) || selectedClassroomDetails)
    : null;

  const fetchStudentClassrooms = async () => {
    if (!studentUsername) return;
    setLoadingStudentClassrooms(true);
    try {
      const res = await fetch('/api/teacher/classes');
      if (res.ok) {
        const data = await res.json();
        const classes = data.classes || [];
        setStudentClassrooms(classes);
        if (selectedClassroomDetails) {
          const updated = classes.find((c: any) => c.id === selectedClassroomDetails.id);
          if (updated) {
            setSelectedClassroomDetails(updated);
          }
        }
      }
    } catch (err) {
      console.error("Lỗi đồng bộ lớp học học sinh:", err);
    } finally {
      setLoadingStudentClassrooms(false);
    }
  };

  const [newCommentTexts, setNewCommentTexts] = useState<{[annId: string]: string}>({});

  const handleStudentAddComment = async (classId: string, annId: string) => {
    const text = newCommentTexts[annId];
    if (!text || !text.trim()) return;
    try {
      const res = await fetch(`/api/teacher/classes/${classId}/announcements/${annId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: studentName,
          content: text.trim()
        })
      });
      if (res.ok) {
        setNewCommentTexts(prev => ({ ...prev, [annId]: '' }));
        fetchStudentClassrooms();
      } else {
        alert("Không thể đăng bình luận lúc này.");
      }
    } catch (err) {
      console.error("Lỗi đăng bình luận:", err);
    }
  };

  const handleJoinClass = async (codeToJoin?: string) => {
    const code = codeToJoin || joinClassCode;
    if (!code || !code.trim()) {
      alert("Vui lòng nhập mã lớp học để tham gia.");
      return;
    }
    setJoiningClass(true);
    try {
      const res = await fetch('/api/student/join-class', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: studentUsername, 
          code: code.trim() 
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert(data.message || "Bạn đã tham gia lớp học thành công!");
        setJoinClassCode('');
        setIsJoinClassModalOpen(false);
        fetchStudentClassrooms();
        fetchStudentHomework(); // refresh homework
      } else {
        alert(data.message || "Không thể tham gia lớp học. Vui lòng kiểm tra lại mã.");
      }
    } catch (err) {
      alert("Không thể kết nối máy chủ để tham gia lớp học.");
    } finally {
      setJoiningClass(false);
    }
  };

  const fetchStudentHomework = async () => {
    if (!studentUsername) return;
    setLoadingStudentHw(true);
    try {
      const [resAs, resSub] = await Promise.all([
        fetch(`/api/homework/assignments?student=${encodeURIComponent(studentUsername)}`),
        fetch(`/api/homework/submissions?student=${encodeURIComponent(studentUsername)}`)
      ]);
      if (resAs.ok) {
        const dataAs = await resAs.json();
        setStudentAssignments(dataAs.assignments || []);
      }
      if (resSub.ok) {
        const dataSub = await resSub.json();
        setStudentSubmissions(dataSub.submissions || []);
      }
    } catch (err) {
      console.error("Lỗi đồng bộ bài tập học sinh:", err);
    } finally {
      setLoadingStudentHw(false);
    }
  };

  useEffect(() => {
    if (isNameSubmitted && studentUsername && role === 'student') {
      fetchStudentHomework();
      fetchStudentClassrooms();
    }
  }, [studentUsername, isNameSubmitted, role, activeStudentSubTab]);

  // Custom confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const requestConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmDialog(null);
      }
    });
  };

  // Sync tempName with studentName when modal opens
  useEffect(() => {
    if (showProfileModal) {
      setTempName(studentName);
      setIsEditingName(false);
    }
  }, [showProfileModal, studentName]);

  const handleUpdateName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      setStudentName(tempName.trim());
      setIsEditingName(false);
    }
  };

  const handleLogout = () => {
    requestConfirm(
      "Xác nhận đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất tài khoản và xóa mọi dữ liệu tiến trình học không?",
      () => {
        setStudentName('');
        setIsNameSubmitted(false);
        setIsLoggedIn(false);
        setIsPendingApproval(false);
        setStudentUsername('');
        setScore(-1);
        setRoadmap(null);
        setCompletedLessons([]);
        setActiveLesson(null);
        setStreak(1);
        setLastCheckInDate('');
        localStorage.removeItem('el_student_username');
        localStorage.removeItem('el_student_name');
        localStorage.removeItem('el_is_pending');
        localStorage.removeItem('el_score');
        localStorage.removeItem('el_roadmap');
        localStorage.removeItem('el_completed_lessons');
        localStorage.removeItem('el_streak');
        localStorage.removeItem('el_last_checkin_date');
        setShowProfileModal(false);
        setOnboardingMode('menu');
      }
    );
  };

  const handleQuickLogin = async (user: string, pass: string) => {
    setInputUsername(user);
    setInputPassword(pass);
    setAuthMode('login');
    setAuthError('');
    setAuthSuccess('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user,
          password: pass
        })
      });
      
      let data: any = {};
      try {
        data = await res.json();
      } catch (e) {
        console.warn("Lỗi đọc dữ liệu phản hồi từ máy chủ:", e);
      }

      if (res.ok && data.success) {
        setStudentUsername(data.username);
        setStudentName(data.fullName);
        setScore(data.score);
        setRoadmap(data.roadmap);
        setCompletedLessons(data.completedLessons || []);
        setStreak(data.streak || 1);
        setLastCheckInDate(data.lastCheckInDate || '');
        setIsPendingApproval(false);
        setIsLoggedIn(true);
        setIsNameSubmitted(true);

        localStorage.setItem('el_student_username', data.username);
        localStorage.setItem('el_student_name', data.fullName);
        localStorage.setItem('el_score', (data.score ?? -1).toString());
        localStorage.setItem('el_roadmap', data.roadmap ? JSON.stringify(data.roadmap) : '');
        localStorage.setItem('el_completed_lessons', JSON.stringify(data.completedLessons || []));
        localStorage.setItem('el_streak', (data.streak || 1).toString());
        localStorage.setItem('el_last_checkin_date', data.lastCheckInDate || '');
        localStorage.setItem('el_is_pending', 'false');

        if (data.role === 'admin') {
          setRole('teacher');
        } else {
          setRole('student');
        }
      } else if (res.ok && data.pending) {
        setStudentName(data.fullName);
        setStudentUsername(data.username);
        setIsPendingApproval(true);
        setIsLoggedIn(true);
        setIsNameSubmitted(false);

        localStorage.setItem('el_student_username', data.username);
        localStorage.setItem('el_student_name', data.fullName);
        localStorage.setItem('el_is_pending', 'true');
        setAuthSuccess('Tài khoản đã đăng ký nhưng đang chờ duyệt.');
      } else {
        setAuthError(data.message || 'Tên đăng nhập hoặc mật khẩu không đúng.');
      }
    } catch (err) {
      // Offline / network fallback for admin account
      const cleanUser = user.trim().toLowerCase();
      if (cleanUser === 'admin' && pass === '123') {
        setStudentUsername('admin');
        setStudentName('Quản Trị Viên');
        setRole('teacher');
        setIsLoggedIn(true);
        setIsNameSubmitted(true);
        localStorage.setItem('el_student_username', 'admin');
        localStorage.setItem('el_student_name', 'Quản Trị Viên');
        localStorage.setItem('el_is_pending', 'false');
        return;
      }
      setAuthError('Không thể kết nối dịch vụ xác thực. Vui lòng kiểm tra lại kết nối.');
    }
  };

  const syncProgressWithServer = async (user: string, updates: any) => {
    if (!user) return;
    try {
      await fetch('/api/student/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, ...updates })
      });
    } catch (err) {
      console.warn("Lỗi đồng bộ tiến trình:", err);
    }
  };

  // Persistence triggers
  useEffect(() => {
    if (studentName) {
      localStorage.setItem('el_student_name', studentName);
    } else {
      localStorage.removeItem('el_student_name');
    }
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('el_score', score.toString());
    if (isNameSubmitted && studentUsername) {
      syncProgressWithServer(studentUsername, { score });
    }
  }, [score, isNameSubmitted, studentUsername]);

  useEffect(() => {
    if (roadmap) {
      localStorage.setItem('el_roadmap', JSON.stringify(roadmap));
      if (isNameSubmitted && studentUsername) {
        syncProgressWithServer(studentUsername, { roadmap });
      }
    } else {
      localStorage.removeItem('el_roadmap');
    }
  }, [roadmap, isNameSubmitted, studentUsername]);

  useEffect(() => {
    localStorage.setItem('el_completed_lessons', JSON.stringify(completedLessons));
    if (isNameSubmitted && studentUsername) {
      syncProgressWithServer(studentUsername, { completedLessons });
    }
  }, [completedLessons, isNameSubmitted, studentUsername]);

  useEffect(() => {
    localStorage.setItem('el_streak', streak.toString());
    localStorage.setItem('el_last_checkin_date', lastCheckInDate);
    if (isNameSubmitted && studentUsername) {
      syncProgressWithServer(studentUsername, { streak, lastCheckInDate });
    }
  }, [streak, lastCheckInDate, isNameSubmitted, studentUsername]);

  // Auth Submit Handlers
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (authMode === 'register') {
      if (!inputUsername || !inputPassword || !inputFullName) {
        setAuthError('Vui lòng điền đầy đủ mọi trường thông tin.');
        return;
      }
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: inputUsername,
            password: inputPassword,
            fullName: inputFullName,
            grade: inputGrade,
            phoneNumber: inputPhoneNumber,
            learningGoal: inputLearningGoal,
            targetLevel: inputTargetLevel
          })
        });
        const data = await res.json();
        if (res.ok) {
          setAuthSuccess(data.message);
          setAuthMode('login'); // Switch to login after register
          // Clear registration inputs
          setInputPassword('');
        } else {
          setAuthError(data.message || 'Lỗi đăng ký tài khoản.');
        }
      } catch (err) {
        setAuthError('Không thể kết nối dịch vụ máy chủ.');
      }
    } else {
      // Login mode
      if (!inputUsername || !inputPassword) {
        setAuthError('Vui lòng nhập đầy đủ tên tài khoản và mật khẩu.');
        return;
      }
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: inputUsername,
            password: inputPassword
          })
        });

        let data: any = {};
        try {
          data = await res.json();
        } catch (e) {
          console.warn("Lỗi parse JSON phản hồi đăng nhập:", e);
        }

        if (res.ok && data.success) {
          // Success logged in (approved)
          setStudentUsername(data.username);
          setStudentName(data.fullName);
          setScore(data.score);
          setRoadmap(data.roadmap);
          setCompletedLessons(data.completedLessons || []);
          setStreak(data.streak || 1);
          setLastCheckInDate(data.lastCheckInDate || '');
          setIsPendingApproval(false);
          setIsLoggedIn(true);
          setIsNameSubmitted(true);

          localStorage.setItem('el_student_username', data.username);
          localStorage.setItem('el_student_name', data.fullName);
          localStorage.setItem('el_score', (data.score ?? -1).toString());
          localStorage.setItem('el_roadmap', data.roadmap ? JSON.stringify(data.roadmap) : '');
          localStorage.setItem('el_completed_lessons', JSON.stringify(data.completedLessons || []));
          localStorage.setItem('el_streak', (data.streak || 1).toString());
          localStorage.setItem('el_last_checkin_date', data.lastCheckInDate || '');
          localStorage.setItem('el_is_pending', 'false');

          if (data.role === 'admin') {
            setRole('teacher');
          } else {
            setRole('student');
          }
        } else if (res.ok && data.pending) {
          // Pending approval state
          setStudentName(data.fullName);
          setStudentUsername(data.username);
          setIsPendingApproval(true);
          setIsLoggedIn(true);
          setIsNameSubmitted(false);

          localStorage.setItem('el_student_username', data.username);
          localStorage.setItem('el_student_name', data.fullName);
          localStorage.setItem('el_is_pending', 'true');
          setAuthSuccess('Tài khoản đã đăng ký nhưng đang chờ duyệt.');
        } else {
          setAuthError(data.message || 'Tên đăng nhập hoặc mật khẩu không chính xác.');
        }
      } catch (err) {
        // Fallback for default accounts if backend is temporarily unreachable
        const cleanUser = inputUsername.trim().toLowerCase();
        if (cleanUser === 'admin' && inputPassword === '123') {
          setStudentUsername('admin');
          setStudentName('Quản Trị Viên');
          setRole('teacher');
          setIsLoggedIn(true);
          setIsNameSubmitted(true);
          localStorage.setItem('el_student_username', 'admin');
          localStorage.setItem('el_student_name', 'Quản Trị Viên');
          localStorage.setItem('el_is_pending', 'false');
          return;
        }
        setAuthError('Không thể kết nối dịch vụ xác thực. Vui lòng kiểm tra lại kết nối.');
      }
    }
  };

  const handleRefreshApprovalStatus = async () => {
    if (!studentUsername) return;
    try {
      const userListRes = await fetch('/api/admin/students');
      if (userListRes.ok) {
        const listData = await userListRes.json();
        const currentDbUser = listData.students.find((u: any) => u.username === studentUsername);
        if (currentDbUser) {
          if (currentDbUser.approvalStatus === 'approved') {
            setIsPendingApproval(false);
            setIsLoggedIn(true);
            setIsNameSubmitted(true);
            localStorage.setItem('el_is_pending', 'false');
            alert('🎉 Tuyệt vời! Tài khoản của bạn đã được phê duyệt thành công. Bắt đầu khóa học ngay thôi!');
          } else if (currentDbUser.approvalStatus === 'rejected') {
            alert('❌ Tài khoản của bạn đã bị từ chối phê duyệt bởi quản trị viên.');
          } else {
            alert('⏳ Tài khoản vẫn đang chờ duyệt. Vui lòng liên hệ Admin/Giáo viên để duyệt tài khoản.');
          }
        } else {
          alert('Không tìm thấy tài khoản học viên này.');
        }
      }
    } catch (err) {
      alert('Không thể cập nhật trạng thái mới nhất từ máy chủ.');
    }
  };

  const handleRoadmapGenerated = (newRoadmap: PersonalizedRoadmap, finalScore: number) => {
    setRoadmap(newRoadmap);
    setScore(finalScore);
  };

  const handleLessonLaunch = (lesson: PersonalizedRoadmapLesson) => {
    setActiveLesson(lesson);
  };

  const handleLessonCompleted = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const updatedCompleted = [...completedLessons, lessonId];
      setCompletedLessons(updatedCompleted);
      
      // Unlock next lesson in roadmap if possible
      if (roadmap) {
        const currentIdx = roadmap.lessons.findIndex(l => l.id === lessonId);
        if (currentIdx !== -1 && currentIdx < roadmap.lessons.length - 1) {
          const updatedLessons = [...roadmap.lessons];
          updatedLessons[currentIdx + 1] = {
            ...updatedLessons[currentIdx + 1],
            status: 'unlocked'
          };
          setRoadmap({
            ...roadmap,
            lessons: updatedLessons
          });
        }
      }
    }
    // Close player
    setActiveLesson(null);
  };

  const handleRetakeTest = () => {
    requestConfirm(
      "Làm lại bài khảo sát dận lực",
      "Bạn có chắc chắn muốn làm lại bài đánh giá đầu vào không? Việc này sẽ ghi đè và làm mới lộ trình học tập hiện có.",
      () => {
        setRoadmap(null);
        setScore(-1);
        setCompletedLessons([]);
        setActiveLesson(null);
        setOnboardingMode('menu');
      }
    );
  };

  const handleIncrementStreak = () => {
    const todayStr = new Date().toLocaleDateString('sv-SE'); // Formats date as YYYY-MM-DD in local time
    if (lastCheckInDate === todayStr) {
      alert(`Bạn đã điểm danh hôm nay rồi! Chuỗi học tập hiện tại của bạn đang là ${streak} ngày. Hãy tiếp tục học tập và trở lại điểm danh vào ngày mai nhé! 🔥`);
      return;
    }
    const newStreak = streak + 1;
    setStreak(newStreak);
    setLastCheckInDate(todayStr);
    alert(`🔥 Điểm danh chuyên cần thành công! Bạn tăng thêm +1 ngày, chuỗi liên tục đạt ${newStreak} ngày.`);
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800 pb-24 transition-colors duration-300" id="app-viewport">
      
      {/* 1. Global Navigation Bar */}
      <header className="sticky top-0 bg-white/95 backdrop-blur border-b border-sky-100 z-40 px-4 sm:px-10 py-3 shadow-lg shadow-indigo-100/25" id="global-header">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-200">
              DG
            </div>
            <div>
              <h1 className="text-xl font-black font-display tracking-tight text-indigo-900 flex items-center gap-1.5">
                DG<span className="text-indigo-500 underline decoration-4 decoration-amber-400">Study</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-sans font-medium tracking-wide">AI-Powered English Learning & Teaching</p>
            </div>
          </div>

          {/* Right Action panel */}
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            
            {/* Streak Counter */}
            {isNameSubmitted && (
              <button 
                onClick={handleIncrementStreak}
                title="Điểm danh nhận ngọn lửa chuyên cần"
                className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-amber-100 transition duration-200 group shadow-sm shadow-amber-100/50"
                id="streak-attendance-badge"
              >
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 group-hover:scale-110 transition shrink-0" />
                <span className="text-xs font-black text-amber-800">{streak} Ngày</span>
              </button>
            )}

            {/* Role switch toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50" id="role-selector-toggle">
              <button
                onClick={() => setRole('student')}
                type="button"
                id="btn-role-student"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  role === 'student'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Học Viên (Student)
              </button>
              <button
                onClick={() => setRole('teacher')}
                type="button"
                id="btn-role-teacher"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  role === 'teacher'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Giáo Viên (Teacher)
              </button>
            </div>

            {/* User Avatar & Profile Representation */}
            {isNameSubmitted && (
              <div className="flex items-center gap-2 border-l border-sky-100 pl-4" id="header-user-profile-actions">
                <button 
                  onClick={() => setShowProfileModal(true)}
                  type="button"
                  id="btn-open-profile"
                  title="Xem hồ sơ học tập cá nhân"
                  className="flex items-center gap-3 p-1 rounded-2xl hover:bg-slate-50 transition cursor-pointer text-left"
                >
                  <div className="text-right hidden md:block">
                    <p className="text-xs font-black text-indigo-950 leading-none">{studentName}</p>
                    <p className="text-[10px] text-indigo-600 font-bold font-sans mt-0.5">
                      {roadmap ? `Trình độ: ${roadmap.level}` : 'Chưa thi đầu vào'}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 border border-indigo-200 shadow-md flex items-center justify-center text-white text-sm font-black tracking-wider shrink-0 transition">
                    {studentName ? studentName.trim().charAt(0).toUpperCase() : 'U'}
                  </div>
                </button>

                <button
                  onClick={handleLogout}
                  type="button"
                  id="btn-quick-logout"
                  title="Thoát tài khoản"
                  className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>
      </header>

      {/* 2. Main Content Wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6" id="main-content-layout">
        
        {/* Verification of Student Name on onboarding gate */}
        {!isNameSubmitted && role === 'student' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto mt-6" id="auth-workflow-grid">
            
            {/* Left Column: Role & Permissions Overview Inspector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/30 space-y-6"
              id="role-permissions-guide-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Award className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-indigo-950 font-display">Bộ Kiểm Tra Phân Quyền & Vai Trò</h3>
                  <p className="text-[11px] text-slate-400 font-medium font-sans">Chọn tài khoản mẫu dưới đây để rà soát ranh giới giao diện bảo mật tức thì</p>
                </div>
              </div>

              {/* Instant profiles switcher for testing role boundaries */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" id="quick-profiles-wrapper">
                
                {/* 1. admin */}
                <button
                  onClick={() => handleQuickLogin('admin', '123')}
                  type="button"
                  className="p-4 bg-indigo-50/50 hover:bg-slate-50 border border-indigo-100 hover:border-indigo-300 rounded-2xl text-left transition duration-200 cursor-pointer group hover:shadow-md text-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-black">GIÁO VIÊN</span>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                  </div>
                  <h4 className="font-black text-slate-800 text-xs mt-2 font-display">Tài khoản Admin</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Username: <strong>admin</strong></p>
                  <p className="text-[10px] text-slate-500">Password: <strong>123</strong></p>
                  <div className="mt-3 text-[10px] font-black text-indigo-600 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Đăng nhập nhanh <ChevronRight className="w-3 h-3" />
                  </div>
                </button>

                {/* 2. approved student */}
                <button
                  onClick={() => handleQuickLogin('minhthu', '123')}
                  type="button"
                  className="p-4 bg-emerald-50/50 hover:bg-slate-50 border border-emerald-100 hover:border-emerald-300 rounded-2xl text-left transition duration-200 cursor-pointer group hover:shadow-md text-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-black">HỌC VIÊN ĐÃ DUYỆT</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <h4 className="font-black text-slate-800 text-xs mt-2 font-display">Nguyễn Minh Thư</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Username: <strong>minhthu</strong></p>
                  <p className="text-[10px] text-slate-500">Password: <strong>123</strong></p>
                  <div className="mt-3 text-[10px] font-black text-emerald-600 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Đăng nhập nhanh <ChevronRight className="w-3 h-3" />
                  </div>
                </button>

                {/* 3. pending student */}
                <button
                  onClick={() => handleQuickLogin('hoanganh', '123')}
                  type="button"
                  className="p-4 bg-amber-50/50 hover:bg-slate-50 border border-amber-100 hover:border-amber-300 rounded-2xl text-left transition duration-200 cursor-pointer group hover:shadow-md text-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-black">HỌC VIÊN CHỜ DUYỆT</span>
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <h4 className="font-black text-slate-800 text-xs mt-2 font-display">Lê Hoàng Anh</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Username: <strong>hoanganh</strong></p>
                  <p className="text-[10px] text-slate-500">Password: <strong>123</strong></p>
                  <div className="mt-3 text-[10px] font-black text-amber-600 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Đăng nhập nhanh <ChevronRight className="w-3 h-3" />
                  </div>
                </button>

              </div>

              {/* Table of Roles boundaries and capabilities mapping */}
              <div className="border border-slate-100 rounded-2xl overflow-hidden font-sans" id="roles-capabilities-table-container">
                <div className="grid grid-cols-3 bg-slate-50 p-3 text-[10px] font-black text-indigo-950 uppercase tracking-wider border-b border-slate-100">
                  <div>VAI TRÒ / QUYỀN TRUY CẬP</div>
                  <div>GIAO DIỆN HOẠT ĐỘNG</div>
                  <div>ZÔN CHỨC NĂNG CHÍNH</div>
                </div>
                <div className="divide-y divide-slate-100 text-xs text-slate-600">
                  
                  {/* Row Admin */}
                  <div className="grid grid-cols-3 p-3 items-center hover:bg-indigo-50/10 transition">
                    <div className="flex items-center gap-1.5 col-span-1 text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-indigo-600" />
                      <span className="font-extrabold text-indigo-950">Giáo Viên / Admin</span>
                    </div>
                    <div className="font-semibold text-indigo-900 col-span-1">TeacherDashboard</div>
                    <div className="text-[11px] leading-relaxed col-span-1">
                      Phê duyệt hồ sơ học viên, soạn giáo trình cá nhân hóa, giao & chấm bài tập AI, quản lý danh sách lớp.
                    </div>
                  </div>

                  {/* Row Student Approved */}
                  <div className="grid grid-cols-3 p-3 items-center hover:bg-emerald-50/10 transition">
                    <div className="flex items-center gap-1.5 col-span-1 text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-extrabold text-slate-800">Học Viên Approved</span>
                    </div>
                    <div className="font-semibold text-emerald-800 col-span-1">Student & Study Hub</div>
                    <div className="text-[11px] leading-relaxed col-span-1">
                      Làm bài kiểm tra đầu vào, tự học phát âm chuẩn bản xứ, luyện đề trắc nghiệm, chat hỗ trợ ảo Thầy Giới AI.
                    </div>
                  </div>

                  {/* Row Student Pending */}
                  <div className="grid grid-cols-3 p-3 items-center hover:bg-amber-50/10 transition">
                    <div className="flex items-center gap-1.5 col-span-1 text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-amber-500 shadow shadow-amber-500 animate-pulse" />
                      <span className="font-extrabold text-slate-700">Học Viên Pending</span>
                    </div>
                    <div className="font-semibold text-amber-700 col-span-1">Màn hình Tường lửa</div>
                    <div className="text-[11px] leading-relaxed text-amber-800 font-medium col-span-1">
                      Bị chặn khỏi Roadmap & Hub chính; Chỉ xem lời nhắn đang phê duyệt, bấm "Cập nhật" để kiểm tra trạng thái duyệt từ Admin.
                    </div>
                  </div>

                </div>
              </div>

              {/* Helpful Tips footnote */}
              <div className="p-4 bg-sky-50/30 border border-sky-100 rounded-2xl flex items-start gap-2 text-xs text-slate-500 leading-relaxed font-sans font-medium">
                <span className="text-sky-500 text-sm">💡</span>
                <div>
                  Hệ thống sử dụng cơ chế bảo mật phân quyền: Xác thực tài khoản ở Front-end ➜ Phê duyệt trạng thái ➔ Duyệt dữ liệu đồng bộ đám mây Firestore, đảm bảo tiến trình học của bạn luôn an toàn.
                </div>
              </div>

            </motion.div>

            {/* Right Column: Original Auth Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-5 bg-white p-8 rounded-3xl border border-sky-100 shadow-2xl shadow-indigo-100/50 relative overflow-hidden"
              id="student-auth-or-pending-card"
            >
            {/* Decorative ambient background curves */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -mr-8 -mt-8 pointer-events-none" />
            
            {isLoggedIn && isPendingApproval ? (
              // PENDING APPROVAL SCREEN (Học viên Chờ duyệt)
              <div className="relative z-10 text-center space-y-6">
                <div className="bg-amber-100 border border-amber-200 text-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-md animate-bounce animate-duration-1000">
                  <Clock className="w-8 h-8" />
                </div>
                
                <div>
                  <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-[10px] uppercase font-black rounded-lg">
                    Chờ Admin Phê Duyệt
                  </span>
                  <h2 className="text-2xl font-black font-display text-indigo-900 mt-3">
                    Tài Khoản Chờ Duyệt
                  </h2>
                </div>

                <p className="text-slate-500 text-xs leading-relaxed px-2 font-semibold font-sans">
                  Chào học viên <strong className="text-indigo-900 font-extrabold">{studentName}</strong>! Tài khoản của bạn (<strong className="text-indigo-950 font-black">@{studentUsername}</strong>) đã được đăng ký thành công trên hệ thống.
                </p>

                <div className="p-4 bg-amber-50/50 border border-amber-100/60 rounded-2xl text-left text-xs text-amber-900 leading-relaxed font-semibold font-sans">
                  💡 <strong>Quy định khóa học:</strong> Để đảm bảo chất lượng lớp học, Admin / Giáo viên cần xác nhận danh tính học viên trước khi bạn bắt đầu làm bài kiểm tra năng lực và tham gia lộ trình học.
                </div>

                <div className="space-y-3 font-sans pt-2">
                  <button
                    onClick={handleRefreshApprovalStatus}
                    type="button"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition text-white font-black p-3.5 rounded-xl shadow-lg shadow-indigo-100 cursor-pointer text-xs flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin animate-duration-2000" /> Cập nhật trạng thái duyệt
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="w-full bg-white hover:bg-slate-50 border border-slate-200 transition text-slate-600 font-bold p-3 rounded-xl cursor-pointer text-xs"
                  >
                    Đăng xuất tài khoản
                  </button>
                </div>
              </div>
            ) : (
              // LOGIN & REGISTER GATEWAYS
              <div className="relative z-10 space-y-6">
                <div className="bg-indigo-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-200">
                  <Compass className="w-7 h-7" />
                </div>
                
                <div className="text-center">
                  <h2 className="text-2xl font-black font-display text-indigo-900">
                    Học tiếng Anh với <span className="underline decoration-4 decoration-amber-400">DGStudy</span>
                  </h2>
                  <p className="text-slate-400 text-[11px] font-sans font-medium mt-1">Hệ thống khảo sát & phân chia bài học tự động AI</p>
                </div>

                {/* Tab selector */}
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50 text-xs sm:text-sm">
                  <button
                    onClick={() => { setAuthMode('login'); setAuthError(''); setAuthSuccess(''); }}
                    className={`flex-1 p-2.5 rounded-lg font-black transition cursor-pointer text-center ${authMode === 'login' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Đăng Nhập (Login)
                  </button>
                  <button
                    onClick={() => { setAuthMode('register'); setAuthError(''); setAuthSuccess(''); }}
                    className={`flex-1 p-2.5 rounded-lg font-black transition cursor-pointer text-center ${authMode === 'register' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Đăng Ký (Sign Up)
                  </button>
                </div>

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {authMode === 'register' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-indigo-950 uppercase tracking-wider pl-1 font-sans">Họ và tên đầy đủ</label>
                        <input
                          type="text"
                          value={inputFullName}
                          onChange={(e) => setInputFullName(e.target.value)}
                          placeholder="Ví dụ: Lương Hoàng Anh"
                          className="w-full p-3.5 bg-slate-50 border border-slate-200/80 focus:border-indigo-600 rounded-xl text-xs focus:outline-none focus:bg-white transition font-bold text-slate-800 placeholder-slate-400 shadow-inner"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-indigo-950 uppercase tracking-wider pl-1 font-sans">Lớp đang học</label>
                          <input
                            type="text"
                            value={inputGrade}
                            onChange={(e) => setInputGrade(e.target.value)}
                            placeholder="Ví dụ: Lớp 6"
                            className="w-full p-3.5 bg-slate-50 border border-slate-200/80 focus:border-indigo-600 rounded-xl text-xs focus:outline-none focus:bg-white transition font-bold text-slate-800 placeholder-slate-400 shadow-inner"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-indigo-950 uppercase tracking-wider pl-1 font-sans">Số điện thoại liên hệ</label>
                          <input
                            type="tel"
                            value={inputPhoneNumber}
                            onChange={(e) => setInputPhoneNumber(e.target.value)}
                            placeholder="Ví dụ: 0912 345 678"
                            className="w-full p-3.5 bg-slate-50 border border-slate-200/80 focus:border-indigo-600 rounded-xl text-xs focus:outline-none focus:bg-white transition font-bold text-slate-800 placeholder-slate-400 shadow-inner"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-indigo-950 uppercase tracking-wider pl-1 font-sans">Mục tiêu học tập</label>
                        <input
                          type="text"
                          value={inputLearningGoal}
                          onChange={(e) => setInputLearningGoal(e.target.value)}
                          placeholder="Ví dụ: Phản xạ tự tin, nâng cao điểm thi kì II"
                          className="w-full p-3.5 bg-slate-50 border border-slate-200/80 focus:border-indigo-600 rounded-xl text-xs focus:outline-none focus:bg-white transition font-bold text-slate-800 placeholder-slate-400 shadow-inner"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-indigo-950 uppercase tracking-wider pl-1 font-sans">Trình độ CEFR mong muốn</label>
                        <select
                          value={inputTargetLevel}
                          onChange={(e) => setInputTargetLevel(e.target.value)}
                          className="w-full p-3.5 bg-slate-50 border border-slate-200/80 focus:border-indigo-600 rounded-xl text-xs focus:outline-none focus:bg-white transition font-bold text-indigo-950 placeholder-slate-400 shadow-inner"
                        >
                          <option value="A1">A1 (Cơ bản - Beginner)</option>
                          <option value="A2">A2 (Tiểu trung học - Elementary)</option>
                          <option value="B1">B1 (Trung cấp - Intermediate)</option>
                          <option value="B2">B2 (Trên trung cấp - Upper Intermediate)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-indigo-950 uppercase tracking-wider pl-1 font-sans">Tên đăng nhập (Username)</label>
                    <input
                      type="text"
                      value={inputUsername}
                      onChange={(e) => setInputUsername(e.target.value)}
                      placeholder="Nhập nick của bạn viết liền không dấu..."
                      className="w-full p-3.5 bg-slate-50 border border-slate-200/80 focus:border-indigo-600 rounded-xl text-xs focus:outline-none focus:bg-white transition font-bold text-slate-800 placeholder-slate-400 shadow-inner"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-indigo-950 uppercase tracking-wider pl-1 font-sans">Mật khẩu (Password)</label>
                    <input
                      type="password"
                      value={inputPassword}
                      onChange={(e) => setInputPassword(e.target.value)}
                      placeholder="Nhập mật khẩu..."
                      className="w-full p-3.5 bg-slate-50 border border-slate-200/80 focus:border-indigo-600 rounded-xl text-xs focus:outline-none focus:bg-white transition font-bold text-slate-800 placeholder-slate-400 shadow-inner"
                      required
                    />
                  </div>

                  {/* Feedback notices */}
                  {authError && (
                    <p className="text-rose-500 font-bold text-center text-xs p-2 bg-rose-50 border border-rose-100 rounded-xl font-sans leading-relaxed">
                      ⚠️ {authError}
                    </p>
                  )}
                  {authSuccess && (
                    <p className="text-emerald-700 font-bold text-center text-xs p-2 bg-emerald-50 border border-emerald-100 rounded-xl font-sans leading-relaxed">
                      ✓ {authSuccess}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.01] active:scale-[0.99] transition text-white font-display font-black p-3.5 rounded-xl shadow-lg shadow-indigo-100 cursor-pointer text-xs"
                  >
                    {authMode === 'login' ? 'ĐĂNG NHẬP KHÓA HỌC' : 'GỬI ĐƠN ĐĂNG KÝ HỌC'}
                  </button>

                  <p className="text-[10px] text-slate-400 text-center font-sans font-medium px-4 leading-relaxed pt-2">
                    {authMode === 'login' 
                      ? "Mách nhỏ: Đăng nhập 'admin' / '123' để vào giao diện Giáo viên rà duyệt phê duyệt các tài khoản học viên mới nhanh chóng!"
                      : "Lưu ý: Sau khi đăng ký tài khoản mới thành công, Admin hệ thống sẽ duyệt hồ sơ để bạn có quyền học."}
                  </p>
                </form>
              </div>
            )}
          </motion.div>
          </div>
        ) : (
          <>
            
            {/* STUDENT ROLE WORKPLACE */}
            {role === 'student' && (
              <div id="student-workspace-view">
                
                {/* Active Lesson Player mode override */}
                {activeLesson ? (
                  <LessonPlayer
                    lesson={activeLesson}
                    userLevel={roadmap?.level || 'A2'}
                    onLessonCompleted={handleLessonCompleted}
                    onBackToRoadmap={() => setActiveLesson(null)}
                  />
                ) : (
                  <>
                    {/* Welcome student user card */}
                    <div className="bg-gradient-to-r from-indigo-50/40 via-white to-white p-6 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6" id="welcome-student-banner">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black font-display text-indigo-900">Chào {studentName}! 👋</h2>
                        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                          {roadmap 
                            ? `Bạn đã xuất sắc hoàn thành ${completedLessons.length} trên tổng số ${roadmap.lessons.length} chặng của lộ trình cá nhân hóa.`
                            : "Vui lòng hoàn thành bài đánh giá ngắn dưới đây để nhận lộ trình bài tập do Thầy Giới biên soạn riêng."}
                        </p>
                      </div>

                      {roadmap && (
                        <button
                          onClick={handleRetakeTest}
                          type="button"
                          id="btn-retake-evaluation"
                          className="flex items-center gap-1.5 px-4 py-2 border-2 border-indigo-50 hover:bg-indigo-50/50 rounded-xl text-xs font-bold text-indigo-600 transition duration-200 cursor-pointer shadow-sm shrink-0"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> Khảo sát lại trình độ
                        </button>
                      )}
                    </div>

                    {/* Student Sub-navigation Tab bar */}
                    <div className="flex flex-wrap gap-4 p-1.5 bg-indigo-50 border border-indigo-100/30 rounded-2xl w-fit mb-6" id="student-sub-nav">
                      <button
                        onClick={() => setActiveStudentSubTab('lo-trinh')}
                        type="button"
                        id="btn-student-lo-trinh"
                        className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-1.5 uppercase ${
                          activeStudentSubTab === 'lo-trinh'
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 animate-none'
                            : 'text-indigo-900/80 hover:text-indigo-900 hover:bg-white/50'
                        }`}
                      >
                        <Compass className="w-4 h-4" /> Lộ Trình Học Cá Nhân
                      </button>

                      <button
                        onClick={() => {
                          setActiveStudentSubTab('bai-tap');
                          fetchStudentHomework();
                        }}
                        type="button"
                        id="btn-student-bai-tap"
                        className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-1.5 uppercase relative ${
                          activeStudentSubTab === 'bai-tap'
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                            : 'text-indigo-900/80 hover:text-indigo-900 hover:bg-white/50'
                        }`}
                      >
                        <ClipboardList className="w-4 h-4" /> Bài Tập Về Nhà
                        {studentAssignments.filter(as => !studentSubmissions.some(sub => sub.assignmentId === as.id)).length > 0 && (
                          <span className="ml-1 px-2.5 py-0.5 bg-rose-500 text-white text-[9px] font-extrabold rounded-full animate-pulse uppercase">
                            {studentAssignments.filter(as => !studentSubmissions.some(sub => sub.assignmentId === as.id)).length} bài mới
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setActiveStudentSubTab('lop-hoc');
                          fetchStudentClassrooms();
                        }}
                        type="button"
                        id="btn-student-lop-hoc"
                        className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-1.5 uppercase relative ${
                          activeStudentSubTab === 'lop-hoc'
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                            : 'text-indigo-900/80 hover:text-indigo-900 hover:bg-white/50'
                        }`}
                      >
                        <Users className="w-4 h-4" /> Lớp học của tôi
                      </button>

                      <button
                        onClick={() => {
                          setActiveStudentSubTab('tu-vung');
                        }}
                        type="button"
                        id="btn-student-tu-vung"
                        className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-1.5 uppercase relative ${
                          activeStudentSubTab === 'tu-vung'
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                            : 'text-indigo-900/80 hover:text-indigo-900 hover:bg-white/50'
                        }`}
                      >
                        <BookOpen className="w-4 h-4" /> Từ vựng
                      </button>

                      <button
                        onClick={() => {
                          setActiveStudentSubTab('ngu-phap');
                        }}
                        type="button"
                        id="btn-student-ngu-phap"
                        className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-1.5 uppercase relative ${
                          activeStudentSubTab === 'ngu-phap'
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                            : 'text-indigo-900/80 hover:text-indigo-900 hover:bg-white/50'
                        }`}
                      >
                        <GraduationCap className="w-4 h-4" /> Ngữ pháp K-12 & AI
                      </button>

                      <button
                        onClick={() => {
                          setActiveStudentSubTab('cham-soc');
                        }}
                        type="button"
                        id="btn-student-cham-soc"
                        className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-1.5 uppercase relative ${
                          activeStudentSubTab === 'cham-soc'
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                            : 'text-indigo-900/80 hover:text-indigo-900 hover:bg-white/50'
                        }`}
                      >
                        <MessageSquare className="w-4 h-4" /> Chăm Sóc & Ưu Đãi
                      </button>
                    </div>

                     {activeStudentSubTab === 'cham-soc' ? (
                       <StudentCareMarketing 
                         studentUsername={studentUsername || 'hoc-vien'} 
                         studentFullName={studentName || 'Học viên'} 
                       />
                     ) : activeStudentSubTab === 'ngu-phap' ? ( <GrammarHub studentUsername={studentName || studentUsername || 'hoc-vien'} /> ) : activeStudentSubTab === 'tu-vung' ? ( <IeltsVocabularyPlatform studentUsername={studentUsername || 'hoc-vien'} /> ) : activeStudentSubTab === 'bai-tap' ? (
                       <StudentHomeworkDashboard 
                         studentUsername={studentUsername}
                         studentFullName={studentName}
                         assignments={studentAssignments}
                         submissions={studentSubmissions}
                         onHwSubmitted={() => {
                           fetchStudentHomework();
                         }}
                       />
                     ) : activeStudentSubTab === 'lop-hoc' ? (
                       <div className="space-y-6" id="student-classrooms-view">
                         {selectedClassroomDetails ? (
                           <div className="space-y-6" id="selected-classroom-view">
                             <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${
                               selectedClassroomDetails.themeColor === 'emerald' ? 'from-emerald-500 via-emerald-600 to-teal-600' :
                               selectedClassroomDetails.themeColor === 'rose' ? 'from-rose-500 via-rose-600 to-pink-600' :
                               selectedClassroomDetails.themeColor === 'amber' ? 'from-amber-400 via-amber-500 to-orange-500' :
                               selectedClassroomDetails.themeColor === 'sky' ? 'from-sky-500 via-sky-600 to-blue-500' :
                               'from-indigo-500 via-indigo-600 to-violet-600'
                             } text-white relative overflow-hidden shadow-lg`} id="class-detail-banner">
                               <button 
                                 onClick={() => setSelectedClassroomDetails(null)}
                                 className="absolute top-4 right-4 bg-white/20 hover:bg-white/35 text-white font-sans text-xs px-3.5 py-1.5 rounded-xl transition duration-150 flex items-center gap-1 cursor-pointer border border-white/20"
                               >
                                 <ArrowLeft className="w-3.5 h-3.5" /> Quay lại danh sách lớp
                               </button>
                               
                               <div className="relative z-10 max-w-2xl">
                                 <span className="bg-white/20 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                                   {selectedClassroomDetails.grade || 'Lớp Học'}
                                 </span>
                                 <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight mt-2">{selectedClassroomDetails.name}</h2>
                                 {selectedClassroomDetails.subject && <p className="text-white/80 text-xs sm:text-sm font-semibold mt-1">Chủ đề: {selectedClassroomDetails.subject}</p>}
                                 <div className="flex flex-wrap gap-4 items-center text-xs text-white/90 font-medium mt-4 pt-4 border-t border-white/25">
                                   <span>Mã lớp: <strong className="font-mono bg-white/15 px-2 py-0.5 rounded text-white">{selectedClassroomDetails.code}</strong></span>
                                   {selectedClassroomDetails.room && <span>Phòng: <strong>{selectedClassroomDetails.room}</strong></span>}
                                   <span>Sĩ số: <strong>{selectedClassroomDetails.studentCount || (selectedClassroomDetails.enrolledStudents?.length || 0)} học viên</strong></span>
                                 </div>
                               </div>
                             </div>

                             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                               <div className="lg:col-span-8 space-y-4">
                                 <div className="flex justify-between items-center bg-white p-4 px-6 rounded-2xl border border-sky-50 shadow-sm">
                                   <h3 className="text-sm font-black text-indigo-950 uppercase tracking-wide">Bảng tin học tập từ Thầy/Cô</h3>
                                   <span className="text-[10px] text-slate-400 font-bold">Cập cập nhật thời gian thực</span>
                                 </div>

                                 {!selectedClassroomDetails.announcements || selectedClassroomDetails.announcements.length === 0 ? (
                                   <div className="bg-white p-10 rounded-2xl border border-sky-50 text-center text-slate-400 text-xs font-semibold">
                                     Thầy cô chưa đăng thông báo nào trên bảng tin của lớp học này.
                                   </div>
                                 ) : (
                                   selectedClassroomDetails.announcements.map((ann: any) => (
                                     <div key={ann.id} className="bg-white p-5 rounded-2xl border border-sky-50 shadow-md flex flex-col gap-4 relative" id={`announcement-card-${ann.id}`}>
                                       <div className="flex items-center gap-3">
                                         <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xs">
                                           👩‍🏫
                                         </div>
                                         <div>
                                           <p className="text-xs font-black text-slate-800">Giáo Viên Cố Vấn</p>
                                           <p className="text-[9px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                                             <Clock className="w-3 h-3" /> {new Date(ann.createdAt).toLocaleString('vi-VN')}
                                           </p>
                                         </div>
                                       </div>

                                       <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100/50">
                                         {ann.content}
                                       </p>

                                       <div className="pt-2 border-t border-slate-100">
                                         <p className="text-[10px] text-indigo-500 font-black uppercase tracking-wide mb-3">Thảo luận lớp học ({ann.comments?.length || 0})</p>
                                         
                                         {ann.comments && ann.comments.length > 0 && (
                                           <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-1">
                                             {ann.comments.map((comm: any) => (
                                               <div key={comm.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-1">
                                                 <div className="flex justify-between items-center">
                                                   <span className="text-[10px] font-black text-indigo-950">{comm.author}</span>
                                                   <span className="text-[9px] text-slate-400 font-mono">{new Date(comm.createdAt).toLocaleString('vi-VN')}</span>
                                                 </div>
                                                 <p className="text-xs text-slate-600 font-medium">{comm.content}</p>
                                               </div>
                                             ))}
                                           </div>
                                         )}

                                         <div className="flex gap-2">
                                           <input
                                             value={newCommentTexts[ann.id] || ''}
                                             onChange={(e) => setNewCommentTexts(prev => ({ ...prev, [ann.id]: e.target.value }))}
                                             placeholder="Gửi phản hồi hoặc câu hỏi cho lớp học..."
                                             className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-150 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-indigo-500"
                                             onKeyDown={(e) => {
                                               if (e.key === 'Enter') handleStudentAddComment(selectedClassroomDetails.id, ann.id);
                                              }}
                                           />
                                           <button
                                             onClick={() => handleStudentAddComment(selectedClassroomDetails.id, ann.id)}
                                             className="px-4 py-2 bg-indigo-600 hover:bg-slate-900 text-white font-black text-xs rounded-xl transition cursor-pointer"
                                           >
                                             Gửi
                                           </button>
                                         </div>
                                       </div>
                                     </div>
                                   ))
                                 )}
                               </div>

                               <div className="lg:col-span-4 space-y-4">
                                 <div className="bg-white p-5 rounded-2xl border border-sky-50 shadow-sm space-y-4">
                                   <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wide flex items-center gap-1.5 pb-2.5 border-b border-slate-100">
                                     <ClipboardList className="w-4.5 h-4.5 text-indigo-600" /> Bài tập về nhà gợi ý
                                   </h4>
                                   <div className="space-y-3">
                                     {studentAssignments.length === 0 ? (
                                       <p className="text-xs text-slate-400 text-center py-2">Chưa có bài tập nào cho trình độ này.</p>
                                     ) : (
                                       studentAssignments.slice(0, 3).map((as) => {
                                         const isDone = studentSubmissions.some(sub => sub.assignmentId === as.id);
                                         return (
                                           <div key={as.id} className="p-3 bg-slate-50/60 rounded-xl border border-slate-100 flex items-center justify-between gap-3">
                                             <div className="overflow-hidden">
                                               <p className="text-xs font-black text-slate-800 truncate">{as.title}</p>
                                               <p className="text-[10px] text-slate-400 mt-0.5">Hạn nộp: {new Date(as.dueDate).toLocaleDateString('vi-VN')}</p>
                                             </div>
                                             {isDone ? (
                                               <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-md uppercase tracking-wide shrink-0 font-sans">Đã nộp</span>
                                             ) : (
                                               <button
                                                 onClick={() => setActiveStudentSubTab('bai-tap')}
                                                 className="px-2.5 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 text-[9px] font-black rounded-md border border-amber-200 uppercase tracking-wide shrink-0 transition"
                                               >
                                                 Làm bài
                                               </button>
                                             )}
                                           </div>
                                         );
                                       })
                                     )}
                                   </div>
                                 </div>

                                 <div className="bg-white p-5 rounded-2xl border border-sky-50 shadow-sm space-y-4">
                                   <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wide flex items-center gap-1.5 pb-2.5 border-b border-slate-100">
                                     <Users className="w-4.5 h-4.5 text-indigo-600" /> Bạn cùng lớp ({selectedClassroomDetails.enrolledStudents?.length || 0})
                                   </h4>
                                   <div className="space-y-2.5 max-h-56 overflow-y-auto">
                                     {(!selectedClassroomDetails.enrolledStudents || selectedClassroomDetails.enrolledStudents.length === 0) ? (
                                       <p className="text-[11px] text-slate-400 text-center py-2">Chưa có học viên nào tham gia lớp này.</p>
                                     ) : (
                                       selectedClassroomDetails.enrolledStudents.map((member: any, idx: number) => (
                                         <div key={member.id || idx} className="flex items-center gap-2.5">
                                           <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-[10px] font-black text-indigo-750">
                                             {member.fullName.charAt(0).toUpperCase()}
                                           </div>
                                           <div>
                                             <p className="text-xs font-bold text-slate-800">{member.fullName} {member.username === studentUsername && '(Bạn)'}</p>
                                             <p className="text-[9px] text-slate-400 font-medium">Trạng thái: {member.status === 'joined' ? 'Thành viên' : 'Đã được mời'}</p>
                                           </div>
                                         </div>
                                       ))
                                     )}
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                         ) : (
                           <div className="space-y-6" id="classrooms-index-workspace">
                             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-sky-100/60 shadow-md">
                               <div>
                                 <h3 className="text-lg font-black font-display text-indigo-950 uppercase tracking-wide">Lớp học và Khóa học của bé</h3>
                                 <p className="text-slate-500 text-xs mt-0.5">Tham gia các khóa học do thầy cô tổ chức trên hệ thống bằng mã mời lớp học.</p>
                               </div>
                               <button
                                 onClick={() => setIsJoinClassModalOpen(true)}
                                 className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-slate-900 hover:to-slate-900 border border-indigo-500 text-white font-black text-xs tracking-wider uppercase rounded-2xl shadow-lg shadow-indigo-100 transition flex items-center gap-1.5 cursor-pointer ml-auto sm:ml-0"
                               >
                                 <Plus className="w-4.5 h-4.5" /> Tham gia bằng mã lớp học
                               </button>
                             </div>

                             <div className="space-y-4">
                               <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-indigo-100/50">
                                 <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Lớp học của bé đã tham gia
                               </h4>

                               {studentClassrooms.filter(cls => 
                                 cls.enrolledStudents?.some((s: any) => s.username?.toLowerCase() === studentUsername?.toLowerCase() && s.status === 'joined')
                               ).length === 0 ? (
                                 <div className="p-10 bg-white/50 rounded-2xl border border-sky-100/50 text-center text-slate-400 text-xs font-semibold leading-relaxed">
                                   Hiện tại bé chưa tham gia lớp học trực tuyến nào cả. <br/>
                                   <span className="text-indigo-600 block mt-2 text-[11px] font-black hover:underline cursor-pointer" onClick={() => setIsJoinClassModalOpen(true)}>Nhấp vào đây để sử dụng Mã mời tham gia ngay!</span>
                                 </div>
                               ) : (
                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="joined-classes-grid">
                                   {studentClassrooms.filter(cls => 
                                     cls.enrolledStudents?.some((s: any) => s.username?.toLowerCase() === studentUsername?.toLowerCase() && s.status === 'joined')
                                   ).map((cls) => (
                                     <div key={cls.id} className="bg-white rounded-2xl border border-sky-100/60 shadow-lg hover:shadow-xl transition duration-250 flex flex-col overflow-hidden relative group" id={`enrolled-classcard-${cls.id}`}>
                                       <div className={`p-4 bg-gradient-to-tr ${
                                         cls.themeColor === 'emerald' ? 'from-emerald-500 to-teal-600' :
                                         cls.themeColor === 'rose' ? 'from-rose-500 to-pink-600' :
                                         cls.themeColor === 'amber' ? 'from-amber-400 to-orange-500' :
                                         cls.themeColor === 'sky' ? 'from-sky-500 to-blue-500' :
                                         'from-indigo-500 to-violet-600'
                                       } text-white`}>
                                         <span className="px-2 py-0.5 bg-white/20 text-white rounded text-[9px] font-black uppercase tracking-wide">
                                           {cls.grade || 'Lớp Học'}
                                         </span>
                                         <h4 className="text-sm font-black mt-2 tracking-tight line-clamp-1">{cls.name}</h4>
                                         {cls.subject && <p className="text-white/80 text-[10px] mt-0.5 truncate">{cls.subject}</p>}
                                       </div>

                                       <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                                         <div className="space-y-1.5 text-[11px] text-slate-500 font-medium">
                                           {cls.room && <p className="flex justify-between"><span>🏛️ Phòng học:</span> <strong className="text-slate-800">{cls.room}</strong></p>}
                                           <p className="flex justify-between"><span>🔑 Mã lớp:</span> <strong className="font-mono text-indigo-600 font-extrabold uppercase bg-indigo-50 px-1 rounded">{cls.code}</strong></p>
                                           <p className="flex justify-between"><span>👥 Sĩ số hiện tại:</span> <strong className="text-slate-800">{cls.studentCount || (cls.enrolledStudents?.length || 0)} bạn học</strong></p>
                                         </div>

                                         <button
                                           onClick={() => setSelectedClassroomDetails(cls)}
                                           className="w-full py-2.5 bg-slate-50 hover:bg-indigo-600 hover:text-white border border-slate-200 text-slate-700 font-black text-xs uppercase tracking-wide rounded-xl transition cursor-pointer text-center flex items-center justify-center gap-1"
                                         >
                                           Vào lớp xem bảng tin <ChevronRight className="w-4 h-4 ml-0.5" />
                                         </button>
                                       </div>
                                     </div>
                                   ))}
                                 </div>
                               )}
                             </div>

                             <div className="space-y-4">
                               <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-indigo-100/50">
                                 <Sparkles className="w-4 h-4 text-indigo-500" /> Các khóa học mới từ Giáo Viên của bé
                               </h4>

                               {studentClassrooms.filter(cls => 
                                 !cls.enrolledStudents?.some((s: any) => s.username?.toLowerCase() === studentUsername?.toLowerCase() && s.status === 'joined')
                               ).length === 0 ? (
                                 <p className="text-xs text-slate-400 italic font-medium py-3 text-center">Tuyệt vời! Bé đã gia nhập toàn bộ lớp học hiện tại trên hệ thống.</p>
                               ) : (
                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="available-unjoined-classes-grid">
                                   {studentClassrooms.filter(cls => 
                                     !cls.enrolledStudents?.some((s: any) => s.username?.toLowerCase() === studentUsername?.toLowerCase() && s.status === 'joined')
                                   ).map((cls) => (
                                     <div key={cls.id} className="bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 flex flex-col justify-between p-5 relative overflow-hidden transition hover:bg-white hover:border-solid hover:border-indigo-150 hover:shadow-md" id={`available-class-${cls.id}`}>
                                       <div className="space-y-2">
                                         <div className="flex justify-between items-start gap-2">
                                           <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[9px] font-black uppercase tracking-wider">
                                             {cls.grade || 'Lớp Học'}
                                           </span>
                                           <span className="text-[9px] text-slate-400 font-mono font-bold tracking-wide">Mã: {cls.code}</span>
                                         </div>
                                         <h4 className="text-xs sm:text-sm font-black text-slate-800 leading-tight">{cls.name}</h4>
                                         {cls.subject && <p className="text-[11px] text-slate-500 font-semibold italic">{cls.subject}</p>}
                                       </div>

                                       <div className="mt-4 pt-4 border-t border-dashed border-slate-200 flex items-center justify-between gap-3 flex-wrap">
                                         <span className="text-[10px] text-slate-400 font-bold">{cls.studentCount || (cls.enrolledStudents?.length || 0)} bạn đã tham gia</span>
                                         <button
                                           onClick={() => handleJoinClass(cls.code)}
                                           className="px-4 py-1.5 bg-indigo-50 hover:bg-indigo-600 hover:text-white border border-indigo-150 text-indigo-700 font-black text-[10px] uppercase tracking-wider rounded-xl transition cursor-pointer"
                                         >
                                           Tham gia ngay
                                         </button>
                                       </div>
                                     </div>
                                   ))}
                                 </div>
                               )}
                             </div>
                           </div>
                         )}
                       </div>
                     ) : (
                      /* ROADMAP IS READY SCREEN OR START-TEST PORTAL */
                      roadmap ? (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="student-roadmap-workspace">
                        
                        {/* Analytical diagnostic profile panel (CEFR info) */}
                        <div className="lg:col-span-4 bg-white p-7 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/30 relative overflow-hidden flex flex-col justify-between" id="roadmap-placement-analysis">
                          {/* Corner decoration card accent */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -mr-8 -mt-8 pointer-events-none" />
                          
                          <div className="relative z-10">
                            <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 border border-indigo-100/50 px-3 py-1 rounded-full uppercase tracking-wider font-sans">
                              Kết Quả Đánh Giá Năng Lực
                            </span>
                            
                            {/* LEVEL BADGE */}
                            <div className="flex items-center gap-4 my-6">
                              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white flex flex-col items-center justify-center shadow-lg shadow-indigo-200 shrink-0">
                                <span className="text-[10px] uppercase font-black tracking-widest text-indigo-200 font-sans">CEFR</span>
                                <span className="text-3xl font-black font-display leading-none">{roadmap.level}</span>
                              </div>
                              <div>
                                <h4 className="font-extrabold text-indigo-900 font-display text-base leading-snug">{roadmap.title}</h4>
                                <p className="text-[11px] text-slate-400 font-semibold mt-1">{roadmap.description}</p>
                              </div>
                            </div>

                            <div className="p-4 bg-sky-50/40 border border-sky-100/65 rounded-2xl mb-6">
                              <p className="text-xs text-slate-600 font-medium font-sans leading-relaxed whitespace-pre-line">
                                {roadmap.summary}
                              </p>
                            </div>

                            {/* Strengths & opportunities lists */}
                            <div className="space-y-4">
                              <div>
                                <p className="text-xs font-black text-emerald-600 uppercase tracking-wider block mb-2">💪 Điểm mạnh nổi bật:</p>
                                <div className="space-y-2">
                                  {roadmap.strengths.map((str, idx) => (
                                    <div key={idx} className="flex gap-2 text-xs text-slate-600 font-medium items-start">
                                      <span className="text-emerald-500 font-bold shrink-0 bg-emerald-50 w-4 h-4 rounded-full flex items-center justify-center text-[10px]">✓</span>
                                      <span>{str}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <p className="text-xs font-black text-indigo-500 uppercase tracking-wider block mb-2">🎯 Cơ hội cải thiện:</p>
                                <div className="space-y-2">
                                  {roadmap.weaknesses.map((wk, idx) => (
                                    <div key={idx} className="flex gap-2 text-xs text-slate-600 font-medium items-start">
                                      <span className="text-indigo-500 font-bold shrink-0 bg-indigo-50 w-4 h-4 rounded-full flex items-center justify-center text-xs">•</span>
                                      <span>{wk}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Lessons timeline panel */}
                        <div className="lg:col-span-8" id="roadmap-lessons-schedule">
                          <h4 className="text-lg font-black font-display text-indigo-900 mb-4 flex items-center gap-2">
                            <Compass className="w-5 h-5 text-indigo-600" /> Bản đồ lộ trình học cá nhân hóa
                          </h4>

                          <div className="space-y-4">
                            {(() => {
                              const firstActiveLesson = roadmap.lessons.find(l => !completedLessons.includes(l.id));
                              
                              return roadmap.lessons.map((lesson, idx) => {
                                const isCompleted = completedLessons.includes(lesson.id);
                                const isUnlocked = lesson.status === 'unlocked' || isCompleted;
                                const isFirstActive = firstActiveLesson && firstActiveLesson.id === lesson.id;

                                if (isCompleted) {
                                  return (
                                    <div 
                                      key={lesson.id}
                                      id={`lesson-item-${lesson.id}`}
                                      className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-3xl transition duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm"
                                    >
                                      <div className="flex gap-4">
                                        <div className="shrink-0 mt-0.5">
                                          <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
                                            <Check className="w-6 h-6 stroke-[3]" />
                                          </div>
                                        </div>
                                        <div>
                                          <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-[10px] font-black text-emerald-700 bg-white border border-emerald-200/60 px-2 py-0.5 rounded-md uppercase tracking-wider font-sans">
                                              {lesson.category}
                                            </span>
                                            <span className="text-[11px] text-slate-400 font-medium">• Đã hoàn thành</span>
                                          </div>
                                          <h5 className="font-extrabold text-slate-800 font-display text-base mt-1.5">{lesson.title}</h5>
                                          <p className="text-xs text-slate-500 leading-relaxed max-w-lg mt-0.5">{lesson.description}</p>
                                        </div>
                                      </div>

                                      <div className="shrink-0 self-end sm:self-center flex items-center gap-3">
                                        <span className="text-[10px] font-black text-emerald-600 bg-white px-3 py-1 rounded-full border border-emerald-200 tracking-wide">
                                          HOÀN THÀNH
                                        </span>
                                        <button
                                          onClick={() => handleLessonLaunch(lesson)}
                                          type="button"
                                          id={`btn-review-lesson-${lesson.id}`}
                                          className="px-4 py-2 border-2 border-emerald-100 text-emerald-700 bg-white hover:bg-emerald-50 rounded-xl text-xs font-bold transition cursor-pointer shadow-sm"
                                        >
                                          Ôn tập
                                        </button>
                                      </div>
                                    </div>
                                  );
                                }

                                if (isFirstActive) {
                                  // Active spotlight item
                                  return (
                                    <div 
                                      key={lesson.id}
                                      id={`lesson-item-${lesson.id}`}
                                      className="bg-indigo-600 p-6 rounded-3xl shadow-xl shadow-indigo-250/70 text-white border-none transition duration-300 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                                    >
                                      {/* Ambient soft glow dot inside spotlight card */}
                                      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                                      <div className="flex gap-4 flex-1">
                                        <div className="shrink-0 mt-0.5">
                                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 font-black text-lg shadow-md">
                                            0{idx + 1}
                                          </div>
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-[10px] font-bold text-indigo-600 bg-white px-2 py-0.5 rounded-md uppercase tracking-wider font-sans">
                                              {lesson.category}
                                            </span>
                                            <span className="text-[11px] text-indigo-100/80 font-medium">• Đang học</span>
                                          </div>
                                          <h5 className="font-extrabold text-white font-display text-lg mt-1.5 leading-snug">{lesson.title}</h5>
                                          <p className="text-xs text-indigo-100/90 leading-relaxed max-w-lg mt-0.5">{lesson.description}</p>
                                          
                                          {/* Spotlight active progress bar */}
                                          <div className="w-full bg-indigo-450 bg-indigo-700/50 h-2 rounded-full mt-3 overflow-hidden max-w-xs">
                                            <div className="bg-amber-400 w-3/5 h-2 rounded-full" />
                                          </div>
                                          <p className="text-[10px] text-indigo-100 mt-1.5 font-bold font-sans">Đang học: Tiến độ chặng đạt 60%</p>
                                        </div>
                                      </div>

                                      <div className="shrink-0 self-end md:self-center z-10">
                                        <button
                                          onClick={() => handleLessonLaunch(lesson)}
                                          type="button"
                                          id={`btn-start-lesson-${lesson.id}`}
                                          className="bg-white text-indigo-600 px-6 py-2.5 rounded-xl text-xs font-black hover:bg-amber-400 hover:text-white shadow-md transition duration-250 cursor-pointer uppercase tracking-wider"
                                        >
                                          Học Tiếp
                                        </button>
                                      </div>
                                    </div>
                                  );
                                }

                                if (isUnlocked) {
                                  // Normal unlocked item
                                  return (
                                    <div 
                                      key={lesson.id}
                                      id={`lesson-item-${lesson.id}`}
                                      className="bg-white border border-sky-100 p-5 rounded-3xl transition duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/20 shadow-sm"
                                    >
                                      <div className="flex gap-4">
                                        <div className="shrink-0 mt-0.5">
                                          <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                            0{idx + 1}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider font-sans">
                                              {lesson.category}
                                            </span>
                                            <span className="text-[11px] text-slate-400 font-semibold">• Dự kiến: {lesson.duration}</span>
                                          </div>
                                          <h5 className="font-extrabold text-indigo-950 font-display text-base mt-1.5">{lesson.title}</h5>
                                          <p className="text-xs text-slate-500 leading-relaxed max-w-lg mt-0.5">{lesson.description}</p>
                                        </div>
                                      </div>

                                      <div className="shrink-0 self-end sm:self-center">
                                        <button
                                          onClick={() => handleLessonLaunch(lesson)}
                                          type="button"
                                          id={`btn-start-lesson-${lesson.id}`}
                                          className="px-4 py-2 border-2 border-indigo-50 hover:bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold transition cursor-pointer shadow-sm"
                                        >
                                          Bắt đầu học
                                        </button>
                                      </div>
                                    </div>
                                  );
                                }

                                // Locked item
                                return (
                                  <div 
                                    key={lesson.id}
                                    id={`lesson-item-${lesson.id}`}
                                    className="bg-slate-50/70 border border-slate-200/70 p-5 rounded-3xl opacity-60 pointer-events-none flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                                  >
                                    <div className="flex gap-4">
                                      <div className="shrink-0 mt-0.5">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center">
                                          <Lock className="w-4 h-4" />
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider font-sans">
                                            {lesson.category}
                                          </span>
                                          <span className="text-[11px] text-slate-450">• Yêu cầu: Hoàn thành chặng trước</span>
                                        </div>
                                        <h5 className="font-extrabold text-slate-500 font-display text-base mt-1.5">{lesson.title}</h5>
                                        <p className="text-xs text-slate-400 leading-relaxed max-w-lg mt-0.5">{lesson.description}</p>
                                      </div>
                                    </div>

                                    <div className="shrink-0 self-end sm:self-center">
                                      <span className="text-xs text-slate-450 font-bold flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                                        🔒 Đang khóa
                                      </span>
                                    </div>
                                  </div>
                                );
                              });
                            })()}
                          </div>
                        </div>

                      </div>
                    ) : (
                      /* Fallback level placement / onboarding workflow builder */
                      onboardingMode === 'menu' ? (
                        <motion.div 
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="max-w-4xl mx-auto space-y-8 py-4"
                          id="onboarding-mode-selection"
                        >
                          <div className="text-center space-y-3">
                            <span className="text-[11px] font-black uppercase text-indigo-700 bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full tracking-wider font-sans">
                              Cá nhân hóa lộ trình học
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black font-display text-indigo-950">
                              Chọn Lộ Trình Học Tiếng Anh Của Bạn
                            </h3>
                            <p className="text-slate-500 text-sm max-w-lg mx-auto">
                              DGStudy cung cấp hai hướng đi ưu việt phù hợp nhất với mong muốn và bối cảnh học tập của riêng bạn.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* OPTION 1: CEFR TEST */}
                            <button
                              onClick={() => setOnboardingMode('placement')}
                              className="bg-white hover:bg-slate-50/50 transition duration-300 p-8 rounded-3xl border border-sky-100 hover:border-indigo-300 shadow-xl shadow-indigo-100/20 text-left relative overflow-hidden group cursor-pointer flex flex-col justify-between h-72"
                              id="btn-select-placement-onboarding"
                            >
                              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -mr-8 -mt-8 pointer-events-none transition-transform group-hover:scale-105" />
                              <div className="relative z-10 space-y-4">
                                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                                  <Brain className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-black font-display text-indigo-950">
                                  Đánh Giá Trình Độ CEFR (A1 - C2)
                                </h4>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                  Trải nghiệm bài kiểm tra tổng quan 8 câu hỏi về Ngữ pháp, Từ vựng, Đọc hiểu. Trí Tuệ Nhân Tạo sẽ phân bổ lộ trình cá nhân hóa dựa trên thực lực hiện tại của bạn.
                                </p>
                              </div>
                              <div className="flex items-center gap-2 text-xs font-black text-indigo-600">
                                Làm bài đánh giá ngay <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                              </div>
                            </button>

                            {/* OPTION 2: K-12 ENGLISH GRAMMAR ROADMAP */}
                            <button
                              onClick={() => setOnboardingMode('grade_selection')}
                              className="bg-white hover:bg-slate-50/50 transition duration-300 p-8 rounded-3xl border border-sky-100 hover:border-indigo-300 shadow-xl shadow-indigo-100/20 text-left relative overflow-hidden group cursor-pointer flex flex-col justify-between h-72"
                              id="btn-select-grade-onboarding"
                            >
                              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-[100px] -mr-8 -mt-8 pointer-events-none transition-transform group-hover:scale-105" />
                              <div className="relative z-10 space-y-4">
                                <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
                                  <GraduationCap className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-black font-display text-indigo-950">
                                  Lộ Trình Ngữ Pháp Lớp 1 - 12
                                </h4>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                  Lộ trình thiết kế chuyên sâu bám sát sách giáo khoa tiếng Anh phổ thông Việt Nam. Tập trung củng cố kiến thức ngữ pháp nền tảng cho học sinh từ lớp 1 đến lớp 12.
                                </p>
                              </div>
                              <div className="flex items-center gap-2 text-xs font-black text-amber-600">
                                Chọn lớp học của bạn <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                              </div>
                            </button>
                          </div>
                        </motion.div>
                      ) : onboardingMode === 'placement' ? (
                        <div className="space-y-4 max-w-4xl mx-auto py-2" id="placement-test-panel">
                          <button
                            onClick={() => setOnboardingMode('menu')}
                            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer mb-4"
                            id="btn-back-to-menu-from-placement"
                          >
                            <ArrowLeft className="w-4 h-4" /> Quay lại lựa chọn lộ trình
                          </button>
                          <PlacementTest 
                            onRoadmapGenerated={handleRoadmapGenerated}
                            studentName={studentName}
                          />
                        </div>
                      ) : (
                        /* Grade level selection screen */
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="max-w-4xl mx-auto space-y-6 py-2"
                          id="grade-selection-panel"
                        >
                          <button
                            onClick={() => setOnboardingMode('menu')}
                            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition cursor-pointer mb-2"
                            id="btn-back-to-menu-from-grades"
                          >
                            <ArrowLeft className="w-4 h-4" /> Quay lại lựa chọn lộ trình
                          </button>

                          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/20 space-y-8">
                            <div className="text-center space-y-2">
                              <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full tracking-wider font-sans">
                                Chương trình học phổ thông
                              </span>
                              <h3 className="text-2xl font-black font-display text-indigo-950">
                                Chọn Lớp Học Ngữ Pháp Của Bạn
                              </h3>
                              <p className="text-slate-500 text-xs max-w-md mx-auto">
                                Chọn lớp học hiện tại để hệ thống thiết lập ngân hàng cấu trúc ngữ pháp tương ứng bám sát chương trình học.
                              </p>
                            </div>

                            {loadingGradeRoadmap ? (
                              <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                                <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-2" />
                                <p className="text-slate-700 font-bold text-sm">
                                  Đang biên soạn giáo án ngữ pháp Lớp {selectedGrade}...
                                </p>
                                <p className="text-[11px] text-slate-400 font-medium">Gemini đang lập trình lộ trình bài học thông minh riêng cho bạn.</p>
                              </div>
                            ) : (
                              <div className="space-y-8">
                                {/* Cấp Tiểu Học */}
                                <div className="space-y-3">
                                  <h4 className="text-xs font-black text-rose-500 uppercase tracking-widest flex items-center gap-2 border-b border-rose-50 pb-2">
                                    🎒 Khối Tiểu Học (Cấp 1 - Lớp 1 đến Lớp 5)
                                  </h4>
                                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                    {[1, 2, 3, 4, 5].map((g) => (
                                      <button
                                        key={g}
                                        onClick={() => handleGradeSelect(g)}
                                        className="py-4 rounded-2xl bg-rose-50/30 hover:bg-rose-50 border border-rose-100 text-rose-700 hover:text-rose-800 transition duration-200 text-center font-black font-display shadow-sm hover:scale-[1.03] cursor-pointer"
                                        id={`btn-select-grade-${g}`}
                                      >
                                        Lớp {g}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* Cấp Trung Học Cơ Sở */}
                                <div className="space-y-3">
                                  <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2 border-b border-emerald-50 pb-2">
                                    🏫 Khối THCS (Cấp 2 - Lớp 6 đến Lớp 9)
                                  </h4>
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[6, 7, 8, 9].map((g) => (
                                      <button
                                        key={g}
                                        onClick={() => handleGradeSelect(g)}
                                        className="py-4 rounded-2xl bg-emerald-50/30 hover:bg-emerald-50 border border-emerald-100 text-emerald-700 hover:text-emerald-800 transition duration-200 text-center font-black font-display shadow-sm hover:scale-[1.03] cursor-pointer"
                                        id={`btn-select-grade-${g}`}
                                      >
                                        Lớp {g}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* Cấp Trung Học Phổ Thông */}
                                <div className="space-y-3">
                                  <h4 className="text-xs font-black text-indigo-650 text-indigo-600 uppercase tracking-widest flex items-center gap-2 border-b border-indigo-50 pb-2">
                                    🎓 Khối THPT (Cấp 3 - Lớp 10 đến Lớp 12)
                                  </h4>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {[10, 11, 12].map((g) => (
                                      <button
                                        key={g}
                                        onClick={() => handleGradeSelect(g)}
                                        className="py-4 rounded-2xl bg-indigo-50/30 hover:bg-indigo-50 border border-indigo-100 text-indigo-700 hover:text-indigo-800 transition duration-200 text-center font-black font-display shadow-sm hover:scale-[1.03] cursor-pointer"
                                        id={`btn-select-grade-${g}`}
                                      >
                                        Lớp {g}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )
                    )
                   )}
                  </>
                )}

              </div>
            )}

            {/* TEACHER ROLE WORKPLACE */}
            {role === 'teacher' && (
              <TeacherDashboard />
            )}

            {/* Sticky Bottom Achievement Bar matching local states */}
            {isNameSubmitted && role === 'student' && !activeLesson && (
              <footer className="fixed bottom-0 left-0 right-0 h-16 bg-indigo-950 border-t border-indigo-800/40 flex items-center justify-between px-6 sm:px-10 gap-6 text-white z-40 shadow-2xl" id="bottom-achievement-footer">
                <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔥</span>
                    <span className="font-extrabold text-xs sm:text-sm">{streak} Ngày liên tục</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💎</span>
                    <span className="font-extrabold text-xs sm:text-sm">{completedLessons.length * 150 + 250} XP</span>
                  </div>
                  <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
                  <div className="text-white/70 text-[11px] sm:text-xs">
                    Mục tiêu hôm nay: <span className="text-amber-400 font-extrabold">Hoàn thành thêm bài học</span> để duy trì chuỗi học tập!
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <div className={`w-3 h-3 rounded-full ${completedLessons.length >= 1 ? 'bg-amber-400' : 'bg-white/20'}`}></div>
                  <div className={`w-3 h-3 rounded-full ${completedLessons.length >= 2 ? 'bg-amber-400' : 'bg-white/20'}`}></div>
                  <div className={`w-3 h-3 rounded-full ${completedLessons.length >= 4 ? 'bg-amber-400' : 'bg-white/20'}`}></div>
                </div>
              </footer>
            )}

          </>
        )}${/* Extra padding to prevent bottom footer overlapping main content */}
        {isNameSubmitted && role === 'student' && !activeLesson && (
          <div className="h-16" />
        )}

      </main>

      {/* 4. Elegant Profile Modal Wrapper using AnimatePresence */}
      <AnimatePresence>
        {showProfileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="profile-modal-portal">
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfileModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
              id="profile-modal-overlay"
            />

            {/* Modal Content container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-sky-100 shadow-2xl shadow-indigo-200/50 max-w-lg w-full overflow-hidden relative z-10 p-6 sm:p-8"
              id="profile-modal-card"
            >
              {/* Corner decorative element */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-indigo-50/50 to-indigo-100/10 rounded-bl-[100px] pointer-events-none" />

              {/* Header Title Close button */}
              <div className="flex justify-between items-center mb-6 relative">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-black font-display text-indigo-950 uppercase tracking-wide">
                    Hồ Sơ Cá Nhân
                  </h3>
                </div>
                <button
                  onClick={() => setShowProfileModal(false)}
                  type="button"
                  id="btn-close-profile-modal"
                  className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Top Profile Banner Block */}
              <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-100 relative">
                {/* Big Initials Avatar */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-5050 to-indigo-600 to-violet-600 bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 border-2 border-indigo-100 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-indigo-100 relative shrink-0">
                  {studentName ? studentName.trim().charAt(0).toUpperCase() : 'U'}
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 border-2 border-white w-4.5 h-4.5 rounded-full" title="Online" />
                </div>

                <div className="text-center sm:text-left flex-1 w-full">
                  {isEditingName ? (
                    <form onSubmit={handleUpdateName} className="flex gap-2 w-full mt-1">
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        placeholder="Nhập họ và tên..."
                        className="flex-1 px-3 py-1.5 bg-slate-50 border border-indigo-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-600"
                        required
                        autoFocus
                      />
                      <button
                        type="submit"
                        id="btn-save-temp-name"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl transition cursor-pointer"
                        title="Lưu thay đổi"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center justify-center sm:justify-start gap-2 group">
                      <h4 className="text-xl font-black text-indigo-950 font-display">
                        {studentName || 'Học viên DGStudy'}
                      </h4>
                      <button
                        onClick={() => setIsEditingName(true)}
                        type="button"
                        id="btn-edit-student-name"
                        title="Chỉnh sửa tên hiển thị"
                        className="p-1 hover:bg-indigo-50 text-indigo-500 rounded-lg transition opacity-60 hover:opacity-100 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <p className="text-xs text-slate-400 font-bold mt-1">
                    Hội viên tích cực từ: <span className="text-indigo-600 font-black">Hôm nay</span>
                  </p>
                  <p className="text-[10px] uppercase font-bold text-emerald-600 mt-1 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md w-fit mx-auto sm:mx-0">
                    {roadmap ? `Trình độ hiện tại: ${roadmap.level}` : 'Chưa đánh giá trình độ'}
                  </p>
                </div>
              </div>

              {/* Stats Highlights Grid */}
              <div className="grid grid-cols-2 gap-4 py-6">
                <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-2xl text-center" id="profile-stat-streak">
                  <span className="text-2xl block mb-1">🔥</span>
                  <p className="text-[10px] text-amber-800 font-extrabold uppercase tracking-wider">Chuỗi kỷ lục</p>
                  <p className="text-xl font-black text-amber-900 mt-1 font-mono">{streak} Ngày</p>
                </div>

                <div className="bg-sky-50/50 border border-sky-100 p-4 rounded-2xl text-center" id="profile-stat-xp">
                  <span className="text-2xl block mb-1">💎</span>
                  <p className="text-[10px] text-indigo-700 font-extrabold uppercase tracking-wider">Tác vụ tích lũy</p>
                  <p className="text-xl font-black text-indigo-950 mt-1 font-mono">{completedLessons.length * 150 + 250} XP</p>
                </div>

                <div className="bg-indigo-50/50 border border-indigo-100/60 p-4 rounded-2xl text-center" id="profile-stat-completed">
                  <span className="text-2xl block mb-1">📈</span>
                  <p className="text-[10px] text-indigo-800 font-extrabold uppercase tracking-wider">Đã hoàn thành</p>
                  <p className="text-xl font-black text-indigo-900 mt-1 font-mono">
                    {completedLessons.length} bài học
                  </p>
                </div>

                <div className="bg-violet-50/50 border border-violet-100 p-4 rounded-2xl text-center" id="profile-stat-roadmap">
                  <span className="text-2xl block mb-1">🎯</span>
                  <p className="text-[10px] text-violet-800 font-extrabold uppercase tracking-wider">Lộ trình học</p>
                  <p className="text-xl font-black text-violet-950 mt-1">
                    {roadmap ? `${roadmap.lessons.length} Chặng` : '0 Chặng'}
                  </p>
                </div>
              </div>

              {/* Achieved Badges Frame */}
              <div className="mb-6">
                <h5 className="text-xs font-black text-indigo-950 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" /> Huy chương đạt được:
                </h5>
                <div className="grid grid-cols-4 gap-2 text-center" id="profile-badges-container">
                  <div className="p-2 bg-indigo-50/40 border border-indigo-100 rounded-xl" title="Bạn đã gia nhập hệ thống DGStudy">
                    <span className="text-xl block">🌱</span>
                    <span className="text-[9px] font-bold text-slate-500 block leading-tight mt-1">Nhập môn</span>
                  </div>
                  <div className={`p-2 rounded-xl border ${streak > 1 ? 'bg-amber-50/40 border-amber-100 text-slate-800' : 'bg-slate-50/50 border-slate-100 text-slate-300 opacity-40'}`} title="Học viên chăm chỉ điểm danh > 1 ngày">
                    <span className="text-xl block">🚀</span>
                    <span className="text-[9px] font-bold block leading-tight mt-1">Chăm chỉ</span>
                  </div>
                  <div className={`p-2 rounded-xl border ${completedLessons.length > 0 ? 'bg-emerald-50/40 border-emerald-100 text-slate-800' : 'bg-slate-50/50 border-slate-100 text-slate-300 opacity-40'}`} title="Hoàn thành thành công bài học đầu tiên">
                    <span className="text-xl block">🌟</span>
                    <span className="text-[9px] font-bold block leading-tight mt-1">Khởi hành</span>
                  </div>
                  <div className={`p-2 rounded-xl border ${completedLessons.length >= 3 ? 'bg-purple-50/40 border-purple-100 text-slate-800' : 'bg-slate-50/50 border-slate-100 text-slate-300 opacity-40'}`} title="Hoàn thành hầu hết lộ trình (3+ bài học)">
                    <span className="text-xl block">🎓</span>
                    <span className="text-[9px] font-bold block leading-tight mt-1">Học giả</span>
                  </div>
                </div>
              </div>

              {/* Warning Destructive Action Trigger */}
              <div className="border-t border-slate-100 pt-5 flex items-center justify-between gap-4">
                <div className="text-[10px] text-slate-400 font-medium max-w-[240px] leading-relaxed">
                  Thiết lập lại tài khoản sẽ xóa toàn bộ lộ trình hiện có và lịch sử rèn luyện của hệ thống.
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  id="btn-destructive-logout"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 hover:scale-[1.02] active:scale-[0.98] transition font-bold font-sans rounded-xl text-xs cursor-pointer shadow-sm"
                >
                  <LogOut className="w-3.5 h-3.5" /> Thoát tài khoản
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Confirm Dialog Modal */}
      <AnimatePresence>
        {confirmDialog && confirmDialog.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="confirm-modal-portal">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmDialog(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
              id="confirm-modal-overlay"
            />

            {/* Content of Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-sky-100 shadow-2xl shadow-indigo-200/50 max-w-md w-full overflow-hidden relative z-10 p-6 sm:p-7 text-center space-y-5"
              id="confirm-modal-card"
            >
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-600">
                <RefreshCw className="w-6 h-6 animate-spin-once" />
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-black font-display text-indigo-950">
                  {confirmDialog.title}
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {confirmDialog.message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                   type="button"
                   onClick={() => setConfirmDialog(null)}
                   className="py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-slate-500 hover:text-slate-700 text-xs transition cursor-pointer"
                   id="btn-confirm-cancel"
                >
                  Hủy bỏ
                </button>
                <button
                   type="button"
                   onClick={() => {
                     confirmDialog.onConfirm();
                     setConfirmDialog(null);
                   }}
                   className="py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition cursor-pointer shadow-md shadow-indigo-200"
                   id="btn-confirm-accept"
                >
                  Đồng ý, tiếp tục
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Join Class By Code Modal Overlay */}
      <AnimatePresence>
        {isJoinClassModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 shadow-sm" id="student-join-class-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsJoinClassModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
              id="join-class-overlay"
            />

            {/* Container Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-sky-100 shadow-2xl shadow-indigo-100/40 max-w-md w-full relative z-10 p-6 sm:p-7 space-y-5"
            >
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔑</span>
                  <h4 className="text-base font-black font-display text-indigo-950 uppercase tracking-wide">
                    Tham gia lớp học mới
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setIsJoinClassModalOpen(false)}
                  className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-[11px] text-indigo-900 font-semibold leading-relaxed">
                  <p className="font-bold mb-1">Cách đăng nhập bằng mã lớp:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Sử dụng mã mời do giáo viên cung cấp trực tiếp (Ví dụ: <strong className="font-mono bg-indigo-100/80 px-1 rounded text-indigo-700">ENG-4A402</strong>)</li>
                    <li>Mã mời gồm chữ và số viết liền, không có khoảng trắng</li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-indigo-950 uppercase tracking-wider block">Nhập mã lớp học của bé</label>
                  <input
                    type="text"
                    value={joinClassCode}
                    onChange={(e) => setJoinClassCode(e.target.value)}
                    placeholder="Ví dụ: ENG-4A402"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-base font-bold text-slate-800 placeholder-slate-400 uppercase tracking-wider focus:outline-none focus:border-indigo-600"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleJoinClass();
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsJoinClassModalOpen(false)}
                  className="py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-slate-500 hover:text-slate-700 text-xs transition cursor-pointer"
                >
                  Đóng lại
                </button>
                <button
                  type="button"
                  disabled={joiningClass}
                  onClick={() => handleJoinClass()}
                  className="py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs transition cursor-pointer shadow-md shadow-indigo-200"
                >
                  {joiningClass ? 'Đang xác minh...' : 'Gia nhập lớp học'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
