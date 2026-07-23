import React, { useState, useEffect } from 'react';
import { TeachingCurriculum, StudentProgress, CEFRLevel, HomeworkAssignment, HomeworkSubmission, Classroom } from '../types';
import { parseVocabulary } from '../utils';
import { 
  GraduationCap, Wand2, Users, FileText, Check, Copy, ArrowRight, BookOpen, 
  Sparkles, ShieldCheck, FileCheck, HelpCircle, Trophy, UserCheck, UserX, Trash2, Clock,
  ClipboardList, Send, Calendar, CheckSquare, Plus, AlertCircle, RefreshCw,
  ArrowLeft, Edit3, Info, MoreVertical, Maximize2, UserPlus, Mail,
  Menu, Settings, Home, Folder, ChevronDown, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';


// Static template of students to mock class analytics
const initialStudents: StudentProgress[] = [
  {
    name: "Nguyễn Minh Thư",
    currentLevel: "B1",
    streakDays: 14,
    completedLessonsCount: 6,
    joinDate: "05/06/2026",
    strengths: ["Hiểu ngữ cảnh nhanh", "Có vốn từ vựng xã hội cơ bản"],
    weaknesses: ["Nhút nhát khi luyện nói", "Phát âm âm đuôi s/es chưa chuẩn"]
  },
  {
    name: "Trần Đức Anh",
    currentLevel: "A2",
    streakDays: 3,
    completedLessonsCount: 2,
    joinDate: "12/06/2026",
    strengths: ["Nhớ từ vựng đồ dùng tốt", "Nghe các cuộc thoại ngắn ổn"],
    weaknesses: ["Dễ sai ngữ pháp thì tương lai", "Vốn từ vựng công việc hẹp"]
  },
  {
    name: "Phạm Thảo Vy",
    currentLevel: "C1",
    streakDays: 28,
    completedLessonsCount: 16,
    joinDate: "01/05/2026",
    strengths: ["Phát âm tự nhiên gần chuẩn Mỹ", "Viết đúng ngữ phong học thuật"],
    weaknesses: ["Còn lúng túng khi dùng một số phrasal verbs cổ"]
  }
];

export default function TeacherDashboard() {
  const [activeSubTab, setActiveSubTab] = useState<'soan-bai' | 'hoc-vien' | 'cham-bai' | 'lop-hoc' | 'crm'>('lop-hoc'); // Start with lop-hoc to let them see it immediately!
  
  // Classrooms State
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loadingClasses, setLoadingClasses] = useState<boolean>(false);
  const [isCreateClassOpen, setIsCreateClassOpen] = useState<boolean>(false);
  const [createClassError, setCreateClassError] = useState<string>('');
  
  // Create Class Form State
  const [classNameInp, setClassNameInp] = useState<string>('');
  const [classSection, setClassSection] = useState<string>('');
  const [classGrade, setClassGrade] = useState<string>('');
  const [classSubject, setClassSubject] = useState<string>('');
  const [classRoomInput, setClassRoomInput] = useState<string>('');
  const [isSubmittingClass, setIsSubmittingClass] = useState<boolean>(false);

  // Selected Google Classroom state
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
  const [innerTab, setInnerTab] = useState<'bang-tin' | 'bai-tap' | 'moi-nguoi' | 'diem'>('bang-tin');
  const [announcementInpOpen, setAnnouncementInpOpen] = useState<boolean>(false);
  const [announcementText, setAnnouncementText] = useState<string>('');
  const [commentDrafts, setCommentDrafts] = useState<{[annId: string]: string}>({});
  const [isCustomizingTheme, setIsCustomizingTheme] = useState<boolean>(false);
  const [isClassCodeExpanded, setIsClassCodeExpanded] = useState<boolean>(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [inviteEmail, setInviteEmail] = useState<string>('');
  const [inviteFullName, setInviteFullName] = useState<string>('');
  const [invitingStudent, setInvitingStudent] = useState<boolean>(false);

  // Google Classroom Sidebar & "+ Tạo" Dropdown State
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isGiangDayExpanded, setIsGiangDayExpanded] = useState<boolean>(true);
  const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState<boolean>(false);
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('all');
  const [classroomTopics, setClassroomTopics] = useState<string[]>(['Ngữ pháp', 'Từ vựng & Phát âm', 'Kỹ năng Viết (Essay)', 'Tài liệu học tập']);
  
  // Custom Classwork Content Creator States
  const [classworkFormType, setClassworkFormType] = useState<'assignment' | 'quiz' | 'question' | 'material' | 'topic' | null>(null);
  const [cwTitle, setCwTitle] = useState<string>('');
  const [cwDescription, setCwDescription] = useState<string>('');
  const [cwDueDate, setCwDueDate] = useState<string>(() => {
    const d = new Date(Date.now() + 86400000 * 7);
    return d.toISOString().split('T')[0];
  });
  const [cwTopic, setCwTopic] = useState<string>('Ngữ pháp');
  const [cwLevel, setCwLevel] = useState<CEFRLevel>('B1');
  const [cwLink, setCwLink] = useState<string>('');
  const [cwNewTopic, setCwNewTopic] = useState<string>('');
  const [savingClasswork, setSavingClasswork] = useState<boolean>(false);

  // Homework & submissions state

  const [assignments, setAssignments] = useState<HomeworkAssignment[]>([]);
  const [submissions, setSubmissions] = useState<HomeworkSubmission[]>([]);
  const [loadingHw, setLoadingHw] = useState<boolean>(false);

  // New assignment form state
  const [newHwTitle, setNewHwTitle] = useState<string>('Luyện viết thư và hội thoại kể chuyện');
  const [newHwTopic, setNewHwTopic] = useState<string>('My Last Summer Vacation');
  const [newHwLevel, setNewHwLevel] = useState<CEFRLevel>('B1');
  const [newHwAssignedTo, setNewHwAssignedTo] = useState<string>('all');
  const [newHwDueDate, setNewHwDueDate] = useState<string>(() => {
    const d = new Date(Date.now() + 86400000 * 5);
    return d.toISOString().split('T')[0];
  });
  
  // Scaffolding manual/automatic homework questions
  const [newHwQuestions, setNewHwQuestions] = useState<any[]>([
    {
      id: 1,
      type: 'quiz',
      question: 'Identify the correct past tense form: "We _______ a beautiful campsite near the river yesterday."',
      options: ['find', 'found', 'founded', 'finding'],
      correctAnswer: '1',
      hint: 'Động từ bất quy tắc của "find".'
    },
    {
      id: 2,
      type: 'sentence_construction',
      question: 'Sắp xếp câu: [ holiday / last / went / family / with / beach / I / year / my / to / the ]',
      correctAnswer: 'I went to the beach with my family last year holiday',
      hint: 'Cấu trúc bắt đầu với chủ ngữ "I went to..."'
    },
    {
      id: 3,
      type: 'essay',
      question: 'Write a short description (3-4 sentences in English) of your last summer vacation.',
      hint: 'Hãy chú ý sử dụng thì quá khứ đơn (Past Simple).'
    }
  ]);

  const [assigningHw, setAssigningHw] = useState<boolean>(false);
  const [generatingHwAI, setGeneratingHwAI] = useState<boolean>(false);

  // Active submission workspace for grading tasks
  const [selectedSub, setSelectedSub] = useState<HomeworkSubmission | null>(null);
  const [gradingScore, setGradingScore] = useState<number>(85);
  const [gradingFeedback, setGradingFeedback] = useState<string>('');
  const [evaluatingHwAI, setEvaluatingHwAI] = useState<boolean>(false);

  const fetchHomeworkData = async () => {
    try {
      const [resAs, resSub] = await Promise.all([
        fetch('/api/homework/assignments'),
        fetch('/api/homework/submissions')
      ]);
      if (resAs.ok) {
        const dataAs = await resAs.json();
        setAssignments(dataAs.assignments);
      }
      if (resSub.ok) {
        const dataSub = await resSub.json();
        setSubmissions(dataSub.submissions);
      }
    } catch (err) {
      console.error("Lỗi đồng bộ thông tin bài làm tự động:", err);
    }
  };

  useEffect(() => {
    fetchHomeworkData();
  }, [activeSubTab]);

  // Dynamic Students Roster State
  const [students, setStudents] = useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = useState<boolean>(false);

  const fetchStudents = async (silentMode = false) => {
    if (!silentMode) setLoadingStudents(true);
    try {
      const res = await fetch('/api/admin/students');
      if (res.ok) {
        const data = await res.json();
        setStudents(data.students);
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (!silentMode) setLoadingStudents(false);
    }
  };

  const fetchClasses = async () => {
    setLoadingClasses(true);
    try {
      const res = await fetch('/api/teacher/classes');
      if (res.ok) {
        const data = await res.json();
        setClassrooms(data.classes);
      }
    } catch (err) {
      console.error("Lỗi lấy danh sách lớp học:", err);
    } finally {
      setLoadingClasses(false);
    }
  };

  const handleCreateClassSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classNameInp.trim()) {
      setCreateClassError('Tên lớp học là bắt buộc.');
      return;
    }

    setIsSubmittingClass(true);
    setCreateClassError('');
    try {
      const res = await fetch('/api/teacher/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: classNameInp,
          section: classSection,
          grade: classGrade,
          subject: classSubject,
          room: classRoomInput
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Reset form
        setClassNameInp('');
        setClassSection('');
        setClassGrade('');
        setClassSubject('');
        setClassRoomInput('');
        setIsCreateClassOpen(false);
        fetchClasses();
      } else {
        setCreateClassError(data.message || 'Có lỗi xảy ra khi tạo lớp học.');
      }
    } catch (err) {
      console.error("Lỗi gửi yêu cầu tạo lớp học:", err);
      setCreateClassError('Không thể kết nối đến máy chủ.');
    } finally {
      setIsSubmittingClass(false);
    }
  };

  const handleDeleteClass = async (classId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa lớp học này không?')) return;
    try {
      const res = await fetch(`/api/teacher/classes/${classId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchClasses();
      } else {
        const data = await res.json();
        alert(data.message || 'Không thể xóa lớp học.');
      }
    } catch (err) {
      console.error("Lỗi khi xóa lớp học:", err);
    }
  };

  const refreshSelectedClassroom = async (classId: string) => {
    try {
      const res = await fetch('/api/teacher/classes');
      if (res.ok) {
        const data = await res.json();
        const classesList: Classroom[] = data.classes;
        setClassrooms(classesList);
        const updated = classesList.find(c => c.id === classId);
        if (updated) {
          setSelectedClassroom(updated);
        }
      }
    } catch (err) {
      console.error("Lỗi tải thông tin chi tiết lớp học:", err);
    }
  };

  const handlePostAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassroom || !announcementText.trim()) return;
    try {
      const res = await fetch(`/api/teacher/classes/${selectedClassroom.id}/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: announcementText })
      });
      if (res.ok) {
        setAnnouncementText('');
        setAnnouncementInpOpen(false);
        await refreshSelectedClassroom(selectedClassroom.id);
      }
    } catch (err) {
      console.error("Lỗi đăng thông báo mới:", err);
    }
  };

  const handlePostCommentSubmit = async (announcementId: string) => {
    const draft = commentDrafts[announcementId];
    if (!selectedClassroom || !draft || !draft.trim()) return;
    try {
      const res = await fetch(`/api/teacher/classes/${selectedClassroom.id}/announcements/${announcementId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: 'Giáo viên', content: draft })
      });
      if (res.ok) {
        setCommentDrafts(prev => ({ ...prev, [announcementId]: '' }));
        await refreshSelectedClassroom(selectedClassroom.id);
      }
    } catch (err) {
      console.error("Lỗi đăng bình luận mới:", err);
    }
  };

  const handleUpdateThemeColors = async (color: string, pattern: number) => {
    if (!selectedClassroom) return;
    try {
      const res = await fetch(`/api/teacher/classes/${selectedClassroom.id}/theme`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themeColor: color, themePattern: pattern })
      });
      if (res.ok) {
        await refreshSelectedClassroom(selectedClassroom.id);
        setIsCustomizingTheme(false);
      }
    } catch (err) {
      console.error("Lỗi cập nhật thiết lập chủ đề:", err);
    }
  };

  const handleInviteStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassroom) return;
    if (!inviteEmail.trim()) {
      alert('Vui lòng nhập địa chỉ email của học viên.');
      return;
    }

    setInvitingStudent(true);
    try {
      const res = await fetch(`/api/teacher/classes/${selectedClassroom.id}/invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inviteEmail.trim(),
          fullName: inviteFullName.trim()
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert(data.message || 'Đã mời học viên vào lớp thành công!');
        setInviteEmail('');
        setInviteFullName('');
        setIsInviteModalOpen(false);
        await refreshSelectedClassroom(selectedClassroom.id);
        fetchStudents(); 
      } else {
        alert(data.message || 'Có lỗi xảy ra khi mời học viên.');
      }
    } catch (err) {
      console.error("Lỗi mời học viên:", err);
      alert('Không thể kết nối máy chủ để mời học viên.');
    } finally {
      setInvitingStudent(false);
    }
  };

  const handleCreateClassworkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassroom) return;
    
    if (classworkFormType === 'topic') {
      if (!cwNewTopic.trim()) {
        alert('Vui lòng nhập tên chủ đề!');
        return;
      }
      if (classroomTopics.includes(cwNewTopic.trim())) {
        alert('Chủ đề này đã tồn tại!');
        return;
      }
      setClassroomTopics([...classroomTopics, cwNewTopic.trim()]);
      setCwTopic(cwNewTopic.trim());
      setCwNewTopic('');
      setClassworkFormType(null);
      alert(`Đã tạo chủ đề "${cwNewTopic.trim()}" mới thành công!`);
      return;
    }

    if (!cwTitle.trim()) {
      alert('Vui lòng nhập tiêu đề!');
      return;
    }

    setSavingClasswork(true);
    try {
      let generatedQuestions: any[] = [];
      if (classworkFormType === 'quiz') {
        generatedQuestions = [
          {
            id: 1,
            type: 'quiz',
            question: cwDescription || 'Chọn đáp án chính xác cho câu hỏi sau.',
            options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
            correctAnswer: '1',
            hint: 'Tham khảo kỹ kiến thức bài đã học.'
          }
        ];
      } else if (classworkFormType === 'question') {
        generatedQuestions = [
          {
            id: 1,
            type: 'sentence_construction',
            question: cwDescription || 'Đưa ra luận điểm hoặc trả lời câu hỏi trực tiếp:',
            correctAnswer: '',
            hint: 'Sinh viên hãy bình luận thảo luận.'
          }
        ];
      } else if (classworkFormType === 'material') {
        generatedQuestions = [
          {
            id: 1,
            type: 'essay',
            question: `Tải xuống tài liệu học tập theo chỉ dẫn. ${cwDescription || ''}`,
            hint: cwLink ? `Liên kết tài liệu: ${cwLink}` : 'Xem hướng dẫn và tải tệp đính kèm.'
          }
        ];
      } else { // default assignment
        generatedQuestions = [
          {
            id: 1,
            type: 'essay',
            question: cwDescription || 'Hoàn thành bài viết luận theo chủ đề được giao.',
            hint: 'Nhớ nộp bài đúng thời hạn.'
          }
        ];
      }

      const response = await fetch('/api/homework/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: classworkFormType === 'material' 
            ? `📖 [Tài liệu] ${cwTitle}` 
            : classworkFormType === 'question' 
            ? `❓ [Câu hỏi] ${cwTitle}` 
            : classworkFormType === 'quiz'
            ? `📝 [Bài kiểm tra] ${cwTitle}`
            : `📋 [Bài tập] ${cwTitle}`,
          topic: cwTopic,
          level: cwLevel,
          assignedTo: 'all',
          dueDate: cwDueDate,
          questions: generatedQuestions
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        alert(data.message || 'Đã tạo bài mới thành công!');
        setCwTitle('');
        setCwDescription('');
        setCwLink('');
        setCwDueDate(() => {
          const d = new Date(Date.now() + 86400000 * 7);
          return d.toISOString().split('T')[0];
        });
        setClassworkFormType(null);
        await fetchHomeworkData();
      } else {
        alert(data.message || 'Có lỗi xảy ra khi lưu bài tập.');
      }
    } catch (err) {
      console.error(err);
      alert('Không kết nối được máy chủ để tạo bài tập.');
    } finally {
      setSavingClasswork(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, [activeSubTab]);

  // Poll for background student updates, support requests and feedback every 8 seconds silently
  useEffect(() => {
    const timer = setInterval(() => {
      fetchStudents(true);
    }, 8000);
    return () => clearInterval(timer);
  }, []);


  const handleApproveAction = async (username: string, action: 'approve' | 'reject' | 'delete') => {
    try {
      const res = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, action })
      });
      if (res.ok) {
        fetchStudents();
        alert(action === 'approve' 
          ? 'Đã phê duyệt tài sản học viên vào học thành công!' 
          : action === 'reject' 
            ? 'Đã từ chối đơn đăng ký học viên.' 
            : 'Đã xóa tài khoản học viên.');
      } else {
        const data = await res.json();
        alert(data.message || 'Có lỗi xảy ra.');
      }
    } catch (err) {
      console.error(err);
      alert('Kết nối máy chủ thất bại.');
    }
  };

  // Assign Homework Actions
  const handleAssignHomework = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHwTitle.trim() || !newHwTopic.trim()) {
      alert('Vui lòng điền đủ Tiêu đề và Chủ đề bài tập.');
      return;
    }

    setAssigningHw(true);
    try {
      const res = await fetch('/api/homework/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newHwTitle,
          topic: newHwTopic,
          level: newHwLevel,
          assignedTo: newHwAssignedTo,
          dueDate: newHwDueDate,
          questions: newHwQuestions
        })
      });
      if (res.ok) {
        alert('Giao bài tập về nhà mới thành công!');
        fetchHomeworkData();
        // Reset state or swap
      } else {
        alert('Giao bài tập thất bại.');
      }
    } catch (err) {
      console.error(err);
      alert('Kết nối máy chủ lỗi.');
    } finally {
      setAssigningHw(false);
    }
  };

  const handleGenerateHomeworkAI = async () => {
    if (!newHwTopic.trim()) {
      alert('Vui lòng điền Chủ đề để AI có cơ sở biên soạn đề!');
      return;
    }

    setGeneratingHwAI(true);
    try {
      const res = await fetch('/api/teacher/generate-homework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: newHwTopic,
          level: newHwLevel
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.questions) {
          setNewHwTitle(data.title || `Bài tập: ${newHwTopic}`);
          setNewHwQuestions(data.questions);
          alert('AI đã biên soạn bộ câu hỏi phong phú thành công! Hãy kiểm tra nội dung và nhấn "Giao bài tập" ở bên dưới.');
        }
      } else {
        alert('Tạo bài tập bằng AI không thành công.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi tạo bài tập bằng AI.');
    } finally {
      setGeneratingHwAI(false);
    }
  };

  const handleAiEvaluateSubmission = async (submissionId: string) => {
    setEvaluatingHwAI(true);
    try {
      const res = await fetch('/api/homework/ai_evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissionId })
      });
      if (res.ok) {
        const data = await res.json();
        setGradingScore(data.score);
        setGradingFeedback(data.feedback);
        alert('Cố vấn AI đồng hành đã chấm nháp và đưa ra nhận xét chi tiết thành công!');
      } else {
        alert('AI Co-Teacher không phản hồi.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi gọi trợ lý AI chấm bài.');
    } finally {
      setEvaluatingHwAI(false);
    }
  };

  const handleSubmitGrading = async () => {
    if (!selectedSub) return;
    try {
      const res = await fetch('/api/homework/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: selectedSub.id,
          score: gradingScore,
          feedback: gradingFeedback
        })
      });
      if (res.ok) {
        alert('Đã lưu điểm và bình luận nhận xét của giáo viên thành công!');
        setSelectedSub(null);
        fetchHomeworkData();
      } else {
        alert('Lưu kết quả chấm điểm thất bại.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối lưu đánh giá.');
    }
  };

  // Lesson Generator Form State
  const [topic, setTopic] = useState<string>('Tiếng Anh phỏng vấn xin việc (Job Interview)');
  const [level, setLevel] = useState<CEFRLevel>('B1');
  const [duration, setDuration] = useState<string>('45 phút');
  
  const [generating, setGenerating] = useState<boolean>(false);
  const [curriculum, setCurriculum] = useState<TeachingCurriculum | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useState<string>('');

  // Selected Student advice popup
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [aiAdviceText, setAiAdviceText] = useState<string>('');
  const [loadingAdvice, setLoadingAdvice] = useState<boolean>(false);

  const handleGenerateCurriculum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setGenerating(true);
    setCurriculum(null);
    setErrorStatus('');

    try {
      const res = await fetch('/api/teacher/generate-curriculum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, level, duration })
      });

      if (!res.ok) throw new Error('Error triggering curriculum generation');
      const data: TeachingCurriculum = await res.json();
      setCurriculum(data);
    } catch (err) {
      console.error(err);
      setErrorStatus('Kết nối tới Gemini AI thất bại. Làm ơn tạo lại giáo án.');
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyCurriculum = () => {
    if (!curriculum) return;
    const text = JSON.stringify(curriculum, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGetStudentAdvice = async (student: any) => {
    setSelectedStudent(student);
    setLoadingAdvice(true);
    setAiAdviceText('');

    const stdName = student.fullName || student.name || 'Học viên';
    const stdLevel = student.roadmap?.level || student.currentLevel || 'Chưa đánh giá';
    const stdStrengths = student.roadmap?.strengths || student.strengths || ["Đang theo dõi năng lượng"];
    const stdWeaknesses = student.roadmap?.weaknesses || student.weaknesses || ["Cần khảo sát lộ trình ban đầu"];

    try {
      const res = await fetch('/api/lesson/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              sender: 'user',
              text: `Hãy viết 1 đoạn nhận xét và lời khuyên học tập ngắn gọn (3-4 câu) bằng tiếng Việt dành cho học viên ${stdName}, hiện đang đứng ở level ${stdLevel}, có điểm mạnh là: ${stdStrengths.join(', ')} và điểm yếu là: ${stdWeaknesses.join(', ')}. Hãy chỉ ra bài học lý tưởng mà tôi nên giao cho học viên này tiếp theo.`
            }
          ],
          userLevel: stdLevel === 'Chưa đánh giá' ? 'A2' : stdLevel,
          lessonContext: "Tư vấn Giáo Viên học viên cá nhân hóa"
        })
      });

      if (!res.ok) throw new Error('Teacher assistance failed');
      const data = await res.json();
      setAiAdviceText(data.text);
    } catch (err) {
      console.error(err);
      const days = student.streak || student.streakDays || 1;
      setAiAdviceText(`Nhận xét từ hệ thống: Học viên ${stdName} có sự kiên trì tốt với streak ${days} ngày. Đề xuất giao bài học luyện âm và luyện nói phản xạ ngắn 15 phút mỗi ngày để tăng tính tự tin.`);
    } finally {
      setLoadingAdvice(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-6" id="teacher-dashboard-view">
      {/* Upper Mode Select Panel */}
      <div className="flex flex-wrap gap-4 p-1.5 bg-indigo-50 border border-indigo-100/30 rounded-2xl w-fit mb-6" id="teacher-sub-nav">
        <button
          onClick={() => setActiveSubTab('lop-hoc')}
          type="button"
          id="btn-teacher-lop-hoc"
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer relative ${
            activeSubTab === 'lop-hoc'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
              : 'text-indigo-900/80 hover:text-indigo-900 hover:bg-white/50'
          }`}
        >
          <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> Quản Lý Lớp Học ({classrooms.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('soan-bai')}
          type="button"
          id="btn-teacher-soan-bai"
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
            activeSubTab === 'soan-bai'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
              : 'text-indigo-900/80 hover:text-indigo-900 hover:bg-white/50'
          }`}
        >
          <span className="flex items-center gap-1.5"><Wand2 className="w-4 h-4" /> Soạn Giáo Án Bằng AI</span>
        </button>

        <button
          onClick={() => setActiveSubTab('cham-bai')}
          type="button"
          id="btn-teacher-cham-bai"
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer relative ${
            activeSubTab === 'cham-bai'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
              : 'text-indigo-900/80 hover:text-indigo-900 hover:bg-white/50'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <ClipboardList className="w-4 h-4" /> Giao & Chấm Bài Tập
            {submissions.filter(s => s.status === 'pending').length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-rose-500 text-white text-[10px] font-extrabold rounded-full animate-pulse">
                {submissions.filter(s => s.status === 'pending').length} bài mới
              </span>
            )}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('hoc-vien')}
          type="button"
          id="btn-teacher-hoc-vien"
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
            activeSubTab === 'hoc-vien'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
              : 'text-indigo-900/80 hover:text-indigo-900 hover:bg-white/50'
          }`}
        >
          <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Đăng Ký Học Viên ({students.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('crm');
            fetchStudents();
          }}
          type="button"
          id="btn-teacher-crm"
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer ${
            activeSubTab === 'crm'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
              : 'text-indigo-900/80 hover:text-indigo-900 hover:bg-white/50'
          }`}
        >
          <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> CRM & Chăm Sóc Khách Hàng</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* LỚP HỌC (CLASSES) MONITOR TAB */}
        {activeSubTab === 'lop-hoc' && (
          <motion.div
            key="lop-hoc-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {selectedClassroom ? (
              /* TRANG CHI TIẾT LỚP HỌC (GOOGLE CLASSROOM CLONE WITH SIDEBAR) */
              <div className="flex gap-6 items-start font-sans animate-fade-in text-left">
                
                {/* Brand-consistent Left Google Classroom Navigation Bar */}
                {isSidebarOpen && (
                  <aside className="w-64 hidden lg:block shrink-0 bg-white border border-slate-200 rounded-[28px] p-5 space-y-6 text-left shadow-sm sticky top-6">
                    <div className="space-y-6">
                      
                      {/* Top list: Home & Calendar */}
                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => setSelectedClassroom(null)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-zinc-700 hover:bg-slate-100 font-bold text-xs sm:text-sm transition cursor-pointer text-left"
                        >
                          <Home className="w-4 h-4 text-slate-500" />
                          <span>Màn hình chính</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => alert('Đang kết nối và đồng bộ hóa lịch học với hệ thống Google Classroom!')}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-zinc-700 hover:bg-slate-100 font-bold text-xs sm:text-sm transition cursor-pointer text-left"
                        >
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span>Lịch</span>
                        </button>
                      </div>

                      <div className="border-t border-slate-100 my-2" />

                      {/* Teaching Group with Expandable Icon */}
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() => setIsGiangDayExpanded(!isGiangDayExpanded)}
                          className="w-full flex items-center justify-between px-4 py-1.5 text-zinc-400 hover:text-zinc-600 uppercase tracking-wider text-[11px] font-black font-sans transition"
                        >
                          <span className="flex items-center gap-2 font-black">
                            <GraduationCap className="w-4 h-4 text-indigo-600" />
                            Giảng dạy
                          </span>
                          {isGiangDayExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5 transition" />
                          ) : (
                            <ChevronUp className="w-3.5 h-3.5 transition" />
                          )}
                        </button>

                        {isGiangDayExpanded && (
                          <div className="space-y-1 pl-1">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveSubTab('cham-bai');
                                setSelectedClassroom(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-zinc-700 hover:bg-slate-100 font-bold text-[13px] transition rounded-full text-left"
                            >
                              <ClipboardList className="w-4 h-4 text-emerald-600 animate-pulse" />
                              <span>Cần đánh giá</span>
                              {submissions.filter(s => s.status === 'pending').length > 0 && (
                                <span className="ml-auto bg-rose-500 text-white font-extrabold text-[10px] px-1.5 py-0.2 rounded-full leading-none">
                                  {submissions.filter(s => s.status === 'pending').length}
                                </span>
                              )}
                            </button>

                            {/* List Classrooms */}
                            {classrooms.map((cls) => {
                              const isCurrent = cls.id === selectedClassroom.id;
                              return (
                                <button
                                  key={cls.id}
                                  type="button"
                                  onClick={() => setSelectedClassroom(cls)}
                                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-full transition text-[13px] text-left ${
                                    isCurrent
                                      ? 'bg-blue-50 text-blue-600 font-extrabold shadow-sm'
                                      : 'text-zinc-700 hover:bg-slate-50 font-semibold'
                                  }`}
                                >
                                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black uppercase shrink-0 transition-all ${
                                    isCurrent 
                                      ? 'bg-blue-600 text-white shadow-inner' 
                                      : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                                  }`}>
                                    {(cls.name || 'C').substring(0, 1)}
                                  </div>
                                  <div className="truncate flex-1">
                                    <div className="font-bold leading-tight truncate">{cls.name}</div>
                                    <div className="text-[9px] text-zinc-400 truncate mt-0.5">{cls.subject || 'SEO/Tiếng Anh'}</div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <div className="border-t border-slate-100 my-2" />

                      {/* Archived and Settings */}
                      <div className="space-y-1">
                        <button
                          type="button"
                          onClick={() => alert('Danh sách các lớp học đã lưu trữ hiện đang trống.')}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-zinc-700 hover:bg-slate-100 font-bold text-xs sm:text-sm transition cursor-pointer text-left"
                        >
                          <Folder className="w-4 h-4 text-slate-500" />
                          <span>Lớp học đã lưu trữ</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => setIsCustomizingTheme(true)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-zinc-700 hover:bg-slate-100 font-bold text-xs sm:text-sm transition cursor-pointer text-left"
                        >
                          <Settings className="w-4 h-4 text-slate-500" />
                          <span>Cài đặt</span>
                        </button>
                      </div>

                    </div>
                  </aside>
                )}

                {/* Right Area content wrapping */}
                <div className="flex-1 min-w-0 space-y-6">

                  {/* Header Navigation Tab List exactly like in the picture */}
                  <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 py-1 rounded-2xl shadow-sm flex-wrap gap-4 select-none">
                    <div className="flex items-center gap-3">
                      {/* Collapsible Sidebar control button */}
                      <button
                        type="button"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1.5 hover:bg-slate-100 rounded-full text-slate-600 transition"
                        title="Menu chính"
                      >
                        <Menu className="w-5 h-5 text-slate-700" />
                      </button>
                      
                      {/* Custom drawing of the Google classroom board icon or Logo */}
                      <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setSelectedClassroom(null)}>
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 border-2 border-amber-500 flex items-center justify-center shadow-sm relative overflow-hidden">
                          <div className="absolute top-1 left-2 right-2 h-0.5 bg-yellow-400" />
                          <span className="text-white text-[12px] font-black">L</span>
                        </div>
                        <span className="text-lg font-black text-slate-800 tracking-tight font-display hidden sm:inline">Lớp học</span>
                      </div>

                      <span className="text-slate-300 font-light mx-1">&#x203A;</span>

                      {/* Classroom breadcrumbs: name & subject */}
                      <div className="text-left leading-tight">
                        <span className="text-sm font-extrabold text-slate-900 block font-display">
                          {selectedClassroom.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-black tracking-widest block uppercase">
                          {selectedClassroom.subject || "SEO"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 sm:gap-6 md:gap-8 font-sans">
                      {(['bang-tin', 'bai-tap', 'moi-nguoi', 'diem'] as const).map((tab) => {
                        const labels = {
                          'bang-tin': 'Bảng tin',
                          'bai-tap': 'Bài tập trên lớp',
                          'moi-nguoi': 'Mọi người',
                          'diem': 'Điểm'
                        };
                        return (
                          <button
                            key={tab}
                            type="button"
                            onClick={() => setInnerTab(tab)}
                            className={`px-3 py-3 text-xs sm:text-sm font-sans transition font-bold cursor-pointer relative ${
                              innerTab === tab
                                ? 'text-blue-600'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            {labels[tab]}
                            {innerTab === tab && (
                              <motion.div
                                layoutId="activeSubClassTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="text-xs bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-1.5 text-indigo-700 font-bold font-mono">
                      {selectedClassroom.code}
                    </div>
                  </div>

                {/* Banner Banner with classroom specifics */}
                <div className={`rounded-3xl p-6 sm:p-10 relative overflow-hidden text-white shadow-xl ${
                  selectedClassroom.themeColor === 'emerald'
                    ? 'bg-gradient-to-r from-teal-600 via-emerald-600 to-green-700'
                    : selectedClassroom.themeColor === 'rose'
                    ? 'bg-gradient-to-r from-rose-500 via-pink-600 to-yellow-600'
                    : selectedClassroom.themeColor === 'amber'
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-600'
                    : selectedClassroom.themeColor === 'sky'
                    ? 'bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-700'
                    : 'bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800' /* default indigo */
                }`}>
                  <div className="absolute top-0 right-0 p-4 opacity-15 pointer-events-none">
                    <GraduationCap className="w-56 h-56 rotate-12 transform" />
                  </div>

                  <div className="flex justify-between items-start h-full min-h-[110px] relative z-10">
                    <div className="space-y-2 mt-auto text-left">
                      <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight drop-shadow">
                        {selectedClassroom.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-indigo-100 font-extrabold tracking-wide uppercase font-sans mt-1">
                        {selectedClassroom.subject || "Tiếng Anh Tổng Quát"} {selectedClassroom.section ? `• ${selectedClassroom.section}` : ''}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsCustomizingTheme(!isCustomizingTheme)}
                        type="button"
                        className="px-4 py-2 bg-white/20 hover:bg-white text-white hover:text-indigo-900 rounded-full text-xs font-black transition backdrop-blur-md shadow cursor-pointer flex items-center gap-1.5 border border-white/20"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Tùy chỉnh
                      </button>
                      <button
                        onClick={() => {
                          alert(`Lớp học: ${selectedClassroom.name}\nChủ đề: ${selectedClassroom.subject || 'Tổng quan'}\nCấp lớp: ${selectedClassroom.grade || 'Tiếng Anh'}\nPhòng học: ${selectedClassroom.room || 'Phòng Online'}\nMã lớp: ${selectedClassroom.code}\nSĩ số: ${selectedClassroom.studentCount || 0} học viên\nNgày khởi tạo: ${new Date(selectedClassroom.createdAt).toLocaleDateString()}`);
                        }}
                        type="button"
                        className="p-2 bg-white/10 hover:bg-white/25 rounded-full text-white transition backdrop-blur-sm cursor-pointer"
                        title="Thông tin lớp"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Theme colors picker */}
                {isCustomizingTheme && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-4 rounded-3xl border border-sky-100 shadow-xl flex flex-wrap gap-4 items-center justify-between font-sans text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-slate-705 text-slate-700">Chọn bảng màu nền:</span>
                      <div className="flex gap-2">
                        {(['indigo', 'sky', 'emerald', 'rose', 'amber'] as const).map((color) => {
                          const bg = color === 'indigo' ? 'bg-indigo-600' :
                                      color === 'sky' ? 'bg-sky-500' :
                                      color === 'emerald' ? 'bg-emerald-600' :
                                      color === 'rose' ? 'bg-rose-500' : 'bg-amber-500';
                          return (
                            <button
                              key={color}
                              type="button"
                              onClick={() => handleUpdateThemeColors(color, 1)}
                              className={`w-6 h-6 rounded-full ${bg} transform hover:scale-110 cursor-pointer transition ${
                                selectedClassroom.themeColor === color ? 'ring-2 ring-slate-800 ring-offset-2' : ''
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                    <button
                      onClick={() => setIsCustomizingTheme(false)}
                      type="button"
                      className="text-indigo-600 hover:text-slate-900 font-extrabold cursor-pointer"
                    >
                      Hoàn tất
                    </button>
                  </motion.div>
                )}

                {/* TAB BẢNG TIN (STREAM VIEW) */}
                {innerTab === 'bang-tin' && (
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                    
                    {/* Left Grid: Mã lớp & thời hạn */}
                    <div className="lg:col-span-1 space-y-6">
                      
                      {/* Class code card */}
                      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3 relative font-sans text-left">
                        <div className="flex justify-between items-center text-slate-800">
                          <span className="text-xs font-black text-slate-500 uppercase tracking-wide">Mã lớp</span>
                          <button type="button" className="text-slate-400 hover:text-slate-600 cursor-pointer">
                            <MoreVertical className="w-4.5 h-4.5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-2xl font-black text-indigo-705 text-indigo-700 font-mono tracking-wide">
                            {selectedClassroom.code}
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => setIsClassCodeExpanded(true)}
                              type="button"
                              className="p-1.5 bg-slate-50 hover:bg-slate-100/80 rounded-lg text-slate-400 transition cursor-pointer"
                              title="Hiển thị rộng"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(selectedClassroom.code);
                                alert('Đã sao chép mã mời lớp học: ' + selectedClassroom.code);
                              }}
                              type="button"
                              className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-550 text-slate-500 transition cursor-pointer"
                              title="Sao chép"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Sắp đến hạn */}
                      <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3 relative font-sans text-left">
                        <h4 className="text-xs font-black text-slate-505 text-slate-500 uppercase tracking-wide">Sắp đến hạn</h4>
                        <p className="text-xs text-slate-400 leading-normal font-medium">
                          Không có bài tập nào sắp đến hạn
                        </p>
                        <div className="pt-2 text-right">
                          <button
                            onClick={() => setInnerTab('bai-tap')}
                            type="button"
                            className="text-xs font-extrabold text-indigo-600 hover:text-indigo-800 transition cursor-pointer hover:underline"
                          >
                            Xem tất cả
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Right Grid: Announcements Composer & Feeds */}
                    <div className="lg:col-span-3 space-y-6">
                      
                      {/* Form to insert general announcement */}
                      {announcementInpOpen ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-white border-2 border-indigo-200 p-5 rounded-3xl shadow-md font-sans space-y-4 text-left"
                        >
                          <div className="bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100/60 text-xs font-bold text-indigo-950 flex justify-between items-center">
                            <span>Sắp đăng một bảng tin cho: {selectedClassroom.name}</span>
                            <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">Giáo viên</span>
                          </div>
                          
                          <form onSubmit={handlePostAnnouncementSubmit} className="space-y-3">
                            <textarea
                              value={announcementText}
                              onChange={(e) => setAnnouncementText(e.target.value)}
                              placeholder="Thông báo nội dung bài học, lưu ý hoặc dặn dò cho học viên..."
                              rows={4}
                              required
                              className="w-full p-4 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-indigo-600 rounded-2xl text-xs sm:text-sm text-slate-800 transition focus:outline-none"
                            />
                            
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setAnnouncementInpOpen(false);
                                  setAnnouncementText('');
                                }}
                                type="button"
                                className="px-4 py-2 hover:bg-slate-100 text-slate-500 rounded-xl text-xs font-bold transition cursor-pointer"
                              >
                                Hủy
                              </button>
                              <button
                                type="submit"
                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white font-bold text-xs rounded-xl shadow cursor-pointer transition"
                              >
                                Đăng tin
                              </button>
                            </div>
                          </form>
                        </motion.div>
                      ) : (
                        <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-sm flex items-center justify-between gap-4 font-sans text-left">
                          <button
                            onClick={() => setAnnouncementInpOpen(true)}
                            type="button"
                            className="flex-1 flex items-center gap-3 px-4 py-3 bg-indigo-50/50 hover:bg-indigo-100/50 border border-indigo-100/65 text-slate-500 hover:text-slate-800 rounded-2xl transition cursor-pointer text-xs font-extrabold"
                          >
                            <Edit3 className="w-4 h-4 text-indigo-600" /> Thông báo mới cho lớp học...
                          </button>
                          
                          <button
                            onClick={() => {
                              setAnnouncementText('Nhắc nhở: Cuối tuần này chúng ta có một bài kiểm tra ngắn về từ vựng. Mọi người ôn tập kỹ nhé!');
                              setAnnouncementInpOpen(true);
                            }}
                            type="button"
                            className="px-4 py-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-2xl text-slate-605 text-slate-600 transition flex items-center gap-1.5 text-xs font-black cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-slate-500" /> Đăng lại
                          </button>
                        </div>
                      )}

                      {/* Display streams / announcements feed */}
                      <div className="space-y-6">
                        {(!selectedClassroom.announcements || selectedClassroom.announcements.length === 0) ? (
                          <div className="bg-white border border-slate-200 text-center p-8 sm:p-12 rounded-3xl space-y-4 shadow-sm font-sans flex flex-col items-center">
                            <div className="p-4 bg-teal-50 rounded-full text-teal-605 text-indigo-600 max-w-fit animate-bounce">
                              <BookOpen className="w-10 h-10" />
                            </div>
                            <h4 className="text-base font-black text-indigo-950">Đây là nơi bạn giao tiếp với lớp học của mình</h4>
                            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed font-semibold">
                              Sử dụng bảng tin để thông báo, đăng bài tập và trả lời câu hỏi của học viên
                            </p>
                            <button
                              onClick={() => setAnnouncementInpOpen(true)}
                              type="button"
                              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black transition cursor-pointer"
                            >
                              Viết thông báo ngay
                            </button>
                          </div>
                      ) : (
                        selectedClassroom.announcements.map((ann, idx) => (
                          <div key={ann.id || idx} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 font-sans text-left">
                            
                            {/* Author details */}
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                                GV
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs sm:text-sm font-black text-slate-900 block leading-tight">Giáo viên (Bạn)</span>
                                <span className="text-[10px] text-slate-400 font-bold block mt-1">
                                  {new Date(ann.createdAt).toLocaleDateString('vi-VN')} {new Date(ann.createdAt).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                                </span>
                              </div>
                            </div>

                            {/* Content body */}
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold font-sans whitespace-pre-line pb-2">
                              {ann.content}
                            </p>

                            {/* Feed Comments Region */}
                            <div className="border-t border-slate-50 pt-4 space-y-4">
                              
                              {ann.comments && ann.comments.length > 0 && (
                                <div className="space-y-3.5 pl-4 border-l-2 border-indigo-100 font-sans">
                                  {ann.comments.map((cm, cidx) => (
                                    <div key={cm.id || cidx} className="text-xs space-y-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-extrabold text-slate-800">{cm.author}</span>
                                        <span className="text-[9px] text-slate-400">
                                          {new Date(cm.createdAt).toLocaleDateString('vi-VN')} {new Date(cm.createdAt).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                                        </span>
                                      </div>
                                      <p className="text-slate-600 tracking-wide font-medium">{cm.content}</p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Comment Draft Input section exactly styled */}
                              <div className="flex items-center gap-2.5 pt-1">
                                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-black shrink-0">
                                  GV
                                </div>
                                <div className="flex-1 relative flex items-center">
                                  <input
                                    type="text"
                                    value={commentDrafts[ann.id] || ''}
                                    onChange={(e) => {
                                      const txt = e.target.value;
                                      setCommentDrafts(p => ({ ...p, [ann.id]: txt }));
                                    }}
                                    placeholder="Thêm nhận xét trong lớp học..."
                                    className="w-full pl-3.5 pr-10 py-2 bg-slate-100/70 border border-slate-200 rounded-full focus:bg-white focus:border-indigo-600 text-xs text-slate-800 focus:outline-none transition"
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        handlePostCommentSubmit(ann.id);
                                      }
                                    }}
                                  />
                                  <button
                                    onClick={() => handlePostCommentSubmit(ann.id)}
                                    type="button"
                                    className="absolute right-2 p-1.5 text-indigo-500 hover:text-indigo-705 text-indigo-600 rounded-full cursor-pointer transition"
                                  >
                                    <Send className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                            </div>

                          </div>
                        ))
                      )}
                      </div>

                    </div>
                  </div>
                )}

                {/* TAB BÀI TẬP TRÊN LỚP (CLASSWORK VIEW) */}
                {innerTab === 'bai-tap' && (
                  <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-[28px] shadow-sm text-left font-sans space-y-6 animate-fade-in">
                    
                    {/* Top action controls: "+ Tạo" on the left, Google Tools on the right */}
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100 flex-wrap gap-4">
                      {/* "+ Tạo" Dropdown menu */}
                      <div className="relative inline-block">
                        <button
                          onClick={() => setIsCreateDropdownOpen(!isCreateDropdownOpen)}
                          type="button"
                          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs sm:text-sm font-bold transition shadow-md shadow-blue-100 cursor-pointer select-none active:scale-95"
                        >
                          <Plus className="w-5 h-5 font-bold" strokeWidth={2.8} />
                          <span>Tạo</span>
                        </button>
                        
                        {isCreateDropdownOpen && (
                          <>
                            <div className="fixed inset-0 z-30" onClick={() => setIsCreateDropdownOpen(false)} />
                            <div className="absolute left-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl w-56 py-1.5 z-40 text-left font-sans text-sm animate-fade-in">
                              <button
                                onClick={() => {
                                  setClassworkFormType('assignment');
                                  setIsCreateDropdownOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer text-left"
                              >
                                <span className="text-blue-600 font-semibold">📋</span>
                                <span>Bài tập</span>
                              </button>
                              
                              <button
                                onClick={() => {
                                  setClassworkFormType('quiz');
                                  setIsCreateDropdownOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer text-left"
                              >
                                <span className="text-emerald-600 font-semibold">📝</span>
                                <span>Bài kiểm tra</span>
                              </button>
                              
                              <button
                                onClick={() => {
                                  setClassworkFormType('question');
                                  setIsCreateDropdownOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer text-left"
                              >
                                <span className="text-amber-500 font-semibold">❓</span>
                                <span>Câu hỏi</span>
                              </button>
                              
                              <button
                                onClick={() => {
                                  setClassworkFormType('material');
                                  setIsCreateDropdownOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer text-left"
                              >
                                <span className="text-indigo-600 font-semibold">📖</span>
                                <span>Tài liệu</span>
                              </button>
                              
                              <div className="border-t border-slate-100 my-1.5" />
                              
                              <button
                                onClick={() => {
                                  alert('Sẽ tải lại cơ sở dữ liệu các bài đăng cũ để sử dụng lại!');
                                  setIsCreateDropdownOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer text-left"
                              >
                                <span className="text-zinc-500 font-semibold">🔄</span>
                                <span>Sử dụng lại bài đăng</span>
                              </button>
                              
                              <button
                                onClick={() => {
                                  setClassworkFormType('topic');
                                  setIsCreateDropdownOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer text-left"
                              >
                                <span className="text-indigo-500 font-semibold">🏷️</span>
                                <span>Chủ đề</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Right auxiliary Google tools */}
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => alert('Đang chuyển hướng tới Google Lịch của lớp học...')}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-full text-xs font-bold transition cursor-pointer"
                        >
                          <Calendar className="w-4 h-4 text-rose-500" />
                          <span>Lịch Google</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => alert('Thư mục học liệu Drive trống. Hãy thêm tài liệu trước.')}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-full text-xs font-bold transition cursor-pointer"
                        >
                          <Folder className="w-4 h-4 text-emerald-600" />
                          <span>Thư mục Drive của lớp</span>
                        </button>
                      </div>
                    </div>

                    {/* Left rail & Assignments grid layout */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
                      
                      {/* Left Rail: Topic list navigations */}
                      <div className="col-span-1 space-y-1 hidden md:block border-r border-slate-100 pr-4">
                        <button
                          onClick={() => setSelectedTopicFilter('all')}
                          type="button"
                          className={`w-full text-left px-4 py-2.5 rounded-r-full text-xs sm:text-sm font-bold transition-all text-left block cursor-pointer truncate ${
                            selectedTopicFilter === 'all'
                              ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-black'
                              : 'text-slate-600 hover:bg-slate-50 text-slate-500'
                          }`}
                        >
                          Tất cả chủ đề
                        </button>

                        {classroomTopics.map((topic) => (
                          <button
                            key={topic}
                            onClick={() => setSelectedTopicFilter(topic)}
                            type="button"
                            className={`w-full text-left px-4 py-2.5 rounded-r-full text-xs sm:text-sm font-bold transition-all text-left block cursor-pointer truncate ${
                              selectedTopicFilter === topic
                                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-black'
                                : 'text-slate-600 hover:bg-slate-50 text-slate-500'
                            }`}
                            title={topic}
                          >
                            {topic}
                          </button>
                        ))}
                      </div>

                      {/* Right Area: Main Classwork tasks listings */}
                      <div className="col-span-1 md:col-span-3 space-y-8 text-left">
                        {(() => {
                          const topicsToRender = selectedTopicFilter === 'all' 
                            ? classroomTopics 
                            : [selectedTopicFilter];

                          let hasAnyVisible = false;

                          return (
                            <>
                              {topicsToRender.map((topic) => {
                                const matchedAssignments = assignments.filter((a) => {
                                  const asgTopic = a.topic || 'Ngữ pháp';
                                  return asgTopic.toLowerCase().trim() === topic.toLowerCase().trim();
                                });

                                if (selectedTopicFilter === 'all' && matchedAssignments.length === 0) {
                                  return null;
                                }

                                hasAnyVisible = true;

                                return (
                                  <div key={topic} className="space-y-3">
                                    {/* Topic Segment Header */}
                                    <div className="border-b border-blue-600/30 pb-2 flex items-center justify-between">
                                      <h3 className="text-base sm:text-lg font-black text-blue-900 tracking-tight font-display">{topic}</h3>
                                      <button 
                                        type="button"
                                        onClick={() => {
                                          setCwTopic(topic);
                                          setClassworkFormType('assignment');
                                        }}
                                        className="text-[11px] text-blue-600 hover:text-blue-800 font-extrabold"
                                      >
                                        + Thêm vào chủ đề
                                      </button>
                                    </div>

                                    {/* Topic Nested List */}
                                    <div className="space-y-3">
                                      {matchedAssignments.length === 0 ? (
                                        <p className="text-zinc-400 text-xs py-3 pl-3 italic">Chưa có bài viết hay bài luyện tập nào trong chủ đề này.</p>
                                      ) : (
                                        matchedAssignments.map((asg) => {
                                          const subs = submissions.filter(s => s.assignmentId === asg.id);
                                          return (
                                            <div
                                              key={asg.id}
                                              className="group bg-white border border-slate-150 hover:border-blue-105 hover:bg-slate-50/30 rounded-2xl p-4 transition-all shadow-sm"
                                            >
                                              <div 
                                                className="flex flex-wrap items-center justify-between gap-4 cursor-pointer"
                                                onClick={() => alert(`Chi tiết bài tập "${asg.title}": Hãy click mục "Giao & Chấm Bài Tập" để xem thống kê học viên chi tiết.`)}
                                              >
                                                <div className="flex items-start gap-3">
                                                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-100 transition-colors shrink-0">
                                                    <FileText className="w-5 h-5" />
                                                  </div>
                                                  <div className="text-left">
                                                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-snug">{asg.title}</h4>
                                                    <p className="text-[10px] text-zinc-400 font-semibold mt-1">Đã đăng {new Date().toLocaleDateString('vi-VN')}</p>
                                                  </div>
                                                </div>

                                                <div className="flex items-center gap-6">
                                                  <span className="text-xs text-zinc-400 font-bold hidden sm:inline">
                                                    Hạn nộp: {new Date(asg.deadline).toLocaleDateString('vi-VN')}
                                                  </span>
                                                  
                                                  <div className="flex items-center gap-4 text-xs font-mono font-bold">
                                                    <div className="px-3 border-r border-slate-100 text-center">
                                                      <span className="text-sm sm:text-base text-emerald-600 block leading-none">{subs.length}</span>
                                                      <span className="text-[8px] text-zinc-400 uppercase tracking-widest font-sans font-bold block mt-1">Đã nộp</span>
                                                    </div>
                                                    <div className="px-1 text-center">
                                                      <span className="text-sm sm:text-base text-slate-600 block leading-none">{students.length}</span>
                                                      <span className="text-[8px] text-zinc-400 uppercase tracking-widest font-sans font-bold block mt-1">Đã giao</span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })
                                      )}
                                    </div>
                                  </div>
                                );
                              })}

                              {!hasAnyVisible && (
                                <div className="p-16 border-2 border-dashed border-slate-250 rounded-[28px] text-center text-slate-400 text-xs font-bold leading-relaxed space-y-3">
                                  <ClipboardList className="w-10 h-10 text-slate-300 mx-auto animate-bounce" />
                                  <p className="text-sm text-slate-700 font-extrabold">Không tìm thấy bài viết nào!</p>
                                  <p className="text-[11px] text-slate-400 font-medium">Bấm nút "+ Tạo" ở góc trái để giao bài học mới lên lớp học.</p>
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB MỌI NGƯỜI (PEOPLE VIEW) */}
                {innerTab === 'moi-nguoi' && (
                  <div className="space-y-6 text-left font-sans animate-fade-in">
                    
                    {/* Teachers profile block */}
                    <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
                      <div className="flex justify-between items-center pb-3 border-b-2 border-indigo-600 mb-4">
                        <span className="text-lg font-black text-slate-805 tracking-tight font-display">Giáo viên</span>
                        <button 
                          onClick={() => {
                            setInviteEmail('');
                            setInviteFullName('');
                            setIsInviteModalOpen(true);
                          }}
                          className="p-1.5 hover:bg-slate-50 border border-slate-100 rounded-full text-slate-600 transition shadow-sm"
                          title="Mời giáo viên"
                        >
                          <UserPlus className="w-4 h-4 text-slate-700" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3 py-1">
                        {/* Custom VDG logo placeholder matching the brand-style in the screenshot */}
                        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                          <div className="flex items-center justify-center bg-zinc-950 w-full h-full rounded-md text-[9px] font-bold text-white tracking-wider leading-none select-none">
                            <span className="text-red-500 font-extrabold">V</span>
                            <span className="text-emerald-500 font-extrabold">D</span>
                            <span className="text-yellow-500 font-extrabold">G</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-black text-slate-900 block">VDG Vlogs</span>
                          <span className="text-[10px] text-slate-400 font-medium">Chủ nhiệm lớp học</span>
                        </div>
                      </div>
                    </div>

                    {/* Students roster block */}
                    <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
                      <div className="flex justify-between items-center pb-3 border-b-2 border-emerald-500 mb-4">
                        <span className="text-lg font-black text-slate-805 tracking-tight font-display">Sinh viên</span>
                        <div className="flex items-center gap-2">
                          {selectedClassroom?.enrolledStudents && selectedClassroom.enrolledStudents.length > 0 && (
                            <span className="text-xs text-slate-400 font-bold bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full">
                              {selectedClassroom.enrolledStudents.length} thành viên
                            </span>
                          )}
                          <button 
                            onClick={() => {
                              setInviteEmail('');
                              setInviteFullName('');
                              setIsInviteModalOpen(true);
                            }}
                            className="p-1.5 hover:bg-slate-50 border border-slate-100 rounded-full text-slate-600 transition shadow-sm"
                            title="Mời học viên"
                          >
                            <UserPlus className="w-4 h-4 text-slate-700" />
                          </button>
                        </div>
                      </div>

                      {(!selectedClassroom?.enrolledStudents || selectedClassroom.enrolledStudents.length === 0) ? (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                          {/* Sleepy kitten/mouse on books vector illustration drawn with pure SVG matching user request */}
                          <div className="w-48 h-40 select-none mb-4 flex items-center justify-center">
                            <svg className="w-40 h-40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                              {/* Bottom stack paper sheet */}
                              <path d="M40 145 C 50 140, 140 140, 160 145 C 160 145, 120 152, 40 145" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5"/>
                              
                              {/* Main Books Stack */}
                              <rect x="50" y="115" width="105" height="15" rx="3" fill="#FFFFFF" stroke="#475569" strokeWidth="2"/>
                              <rect x="48" y="121" width="109" height="14" rx="2" fill="#E2E8F0" stroke="#475569" strokeWidth="2"/>
                              
                              {/* Curved book bindings */}
                              <path d="M48 115 C 48 115, 60 120, 153 115" stroke="#475569" strokeWidth="2" fill="none" />
                              <line x1="52" x2="151" y1="126" y2="126" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3"/>
                              
                              {/* Left ribbon leaf */}
                              <path d="M45 80 C 40 85, 45 95, 42 108" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" fill="none" />
                              <circle cx="45" cy="80" r="3" fill="#F87171" />
                              <circle cx="42" cy="90" r="3" fill="#F87171" />
                              
                              {/* Classic Sleepy Kitten / Mouse */}
                              {/* Tail */}
                              <path d="M52 118 C38 112, 36 96, 44 94" stroke="#475569" strokeWidth="3" strokeLinecap="round" fill="none" />
                              
                              {/* Body bubble */}
                              <path d="M52 115 C55 85, 110 70, 128 92 C132 95, 136 102, 136 115 Z" fill="#FFFFFF" stroke="#475569" strokeWidth="2.5" />
                              
                              {/* Ears */}
                              <path d="M110 88 L114 74 L121 86" fill="#FFE4E6" stroke="#475569" strokeWidth="2" strokeLinejoin="round"/>
                              <path d="M123 88 L128 75 L132 86" fill="#FFE4E6" stroke="#475569" strokeWidth="2" strokeLinejoin="round"/>
                              
                              {/* Sleep curve facial details */}
                              <path d="M117 96 C116 97.5, 114 97.5, 113 96" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none"/>
                              <path d="M125 96 C124 97.5, 122 97.5, 121 96" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none"/>
                              
                              {/* Nose and small pink cheeks */}
                              <circle cx="119" cy="98.5" r="1.5" fill="#FDA4AF"/>
                              <path d="M119 99 L119 101 C117.5 101, 117.5 102.5, 119 102.5 C120.5 102.5, 120.5 101, 119 101" stroke="#475569" strokeWidth="1.2" fill="none" />
                              
                              {/* Paw resting */}
                              <path d="M125 115 C124 110, 135 110, 134 115" fill="#FFFFFF" stroke="#475569" strokeWidth="2"/>
                              
                              {/* Cute Tiny zZZ sleep speech bubble */}
                              <path d="M140 76 C143 65, 158 65, 155 76 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5"/>
                              <line x1="145" y1="71" x2="149" y2="71" stroke="#94A3B8" strokeWidth="1.5" />
                              <line x1="147" y1="71" x2="145" y2="75" stroke="#94A3B8" strokeWidth="1.5" />
                              <line x1="145" y1="75" x2="149" y2="75" stroke="#94A3B8" strokeWidth="1.5" />
                              
                              <line x1="152" y1="67" x2="155" y2="67" stroke="#94A3B8" strokeWidth="1" />
                              <line x1="154" y1="67" x2="152" y2="70" stroke="#94A3B8" strokeWidth="1" />
                              <line x1="152" y1="70" x2="155" y2="70" stroke="#94A3B8" strokeWidth="1" />

                              {/* Cute pencil leaning on book */}
                              <g transform="translate(105, 138) rotate(-10)">
                                <rect x="0" y="0" width="30" height="6" rx="1" fill="#FBBF24" stroke="#475569" strokeWidth="1.5"/>
                                <polygon points="30,0 36,3 30,6" fill="#FDBA74" stroke="#475569" strokeWidth="1.5"/>
                                <polygon points="33,2 36,3 33,4" fill="#000000"/>
                                <rect x="0" y="0" width="6" height="6" fill="#F472B6" stroke="#475569" strokeWidth="1.5"/>
                              </g>
                            </svg>
                          </div>
                          
                          <p className="text-zinc-600 font-semibold text-xs mb-3 font-sans">
                            Thêm học viên vào lớp này
                          </p>
                          
                          <button 
                            onClick={() => {
                              setInviteEmail('');
                              setInviteFullName('');
                              setIsInviteModalOpen(true);
                            }}
                            className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-bold transition font-sans"
                          >
                            <span className="text-sm">+</span> Mời học viên
                          </button>
                        </div>
                      ) : (
                        <div className="divide-y divide-slate-100">
                          {selectedClassroom.enrolledStudents.map((st, i) => (
                            <div key={i} className="flex items-center justify-between py-3 hover:bg-slate-50 px-2 rounded-xl transition">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                                  {(st.fullName || st.email).substring(0, 1).toUpperCase()}
                                </div>
                                <div>
                                  <span className="text-xs sm:text-sm font-black text-slate-900 block">
                                    {st.fullName}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-medium">
                                    {st.email}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                {st.status === 'invited' && (
                                  <span className="text-[9px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-bold">
                                    Đã mời
                                  </span>
                                )}
                                <span className="text-[10px] text-slate-400 font-mono">
                                  @{st.username || 'inviter'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}

                {/* TAB ĐIỂM SỐ (GRADES VIEW) */}
                {innerTab === 'diem' && (
                  <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm text-left font-sans space-y-6">
                    <div>
                      <h4 className="text-sm font-black text-indigo-950 font-display">Sổ điểm đánh giá lớp học</h4>
                      <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Tiến trình chấm điểm bài tập tự động bằng AI kết hợp kiểm duyệt từ giáo viên.</p>
                    </div>

                    {students.length === 0 ? (
                      <p className="text-center py-6 text-xs text-slate-400 font-bold">Chưa có người dùng hoạt động để lập điểm.</p>
                    ) : (
                      <div className="overflow-x-auto rounded-2xl border border-slate-150">
                        <table className="w-full text-left text-xs border-collapse font-sans">
                          <thead>
                            <tr className="bg-slate-50/70 text-indigo-950 font-black border-b border-slate-200">
                              <th className="p-3">Thông tin học viên</th>
                              {assignments.map((asg, idx) => (
                                <th key={idx} className="p-3 whitespace-nowrap text-center max-w-[140px] truncate" title={asg.title}>
                                  {asg.title}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {students.map((st, i) => (
                              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/55 transition">
                                <td className="p-3 font-extrabold text-slate-800">
                                  {st.fullName || st.name}
                                  <span className="text-[10px] text-slate-400 font-mono block font-semibold mt-0.5">@{st.username}</span>
                                </td>
                                {assignments.map((asg, aIdx) => {
                                  const sub = submissions.find(s => s.studentUsername === st.username && s.assignmentId === asg.id);
                                  return (
                                    <td key={aIdx} className="p-3 text-center">
                                      {sub ? (
                                        sub.status === 'graded' ? (
                                          <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-150 text-emerald-700 font-bold rounded-lg text-xs" title={sub.feedback}>
                                            {sub.score || 'Đạt'}
                                          </span>
                                        ) : (
                                          <span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-[10px] font-extrabold">
                                            Chờ duyệt
                                          </span>
                                        )
                                      ) : (
                                        <span className="text-[10px] text-slate-300 font-bold">Chưa nộp</span>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                </div>
              </div>
            ) : (
              /* TRANG DANH SÁCH LỚP HỌC (INDEX ROOMS) */
              <div className="space-y-6">
                {/* Header section with Create Button */}
                <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/30 flex-wrap gap-4">
                  <div>
                    <h3 className="text-xl font-black text-indigo-950 font-display flex items-center gap-2">
                      <GraduationCap className="w-6 h-6 text-indigo-600" /> Quản Lý Lớp Học Của Bạn
                    </h3>
                    <p className="text-xs text-slate-500 font-sans mt-1">Giáo viên có toàn quyền khởi tạo, chỉnh sửa mã lớp và sắp xếp phòng học tiếng Anh.</p>
                  </div>
                  <button
                    onClick={() => setIsCreateClassOpen(true)}
                    type="button"
                    className="px-5 py-3 bg-indigo-600 hover:bg-slate-900 text-white rounded-2xl text-xs sm:text-sm font-black transition cursor-pointer shadow-lg shadow-indigo-100 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5 pointer-events-none" /> Tạo lớp học mới
                  </button>
                </div>

                {/* List of classes */}
                {loadingClasses ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
                    <p className="text-xs text-slate-500 font-bold">Đang tải danh sách lớp học của bạn...</p>
                  </div>
                ) : classrooms.length === 0 ? (
                  <div className="p-12 bg-white rounded-3xl border border-dashed border-sky-200/60 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
                    <span className="text-4xl block">🏫</span>
                    <h4 className="text-base font-black text-indigo-950 font-display">Chưa có lớp học nào</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto font-sans leading-relaxed font-semibold">Hãy khởi tạo lớp học đầu tiên để quản lý học viên, giao bài tập, soạn giáo án và theo dõi quá trình tiến bộ của các bạn.</p>
                    <button
                      onClick={() => setIsCreateClassOpen(true)}
                      type="button"
                      className="px-4 py-2.5 bg-indigo-600 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Tạo Ngay
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classrooms.map((cls, idx) => (
                      <div 
                        key={cls.id || idx}
                        onClick={() => {
                          setSelectedClassroom(cls);
                          setInnerTab('bang-tin');
                        }}
                        className="bg-white rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/20 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100/30 transition flex flex-col group relative cursor-pointer"
                      >
                        {/* Decorative card header */}
                        <div className={`h-28 p-5 text-white flex flex-col justify-between relative ${
                          cls.themeColor === 'emerald' ? 'bg-gradient-to-br from-teal-600 to-emerald-700' :
                          cls.themeColor === 'rose' ? 'bg-gradient-to-br from-rose-500 to-pink-600' :
                          cls.themeColor === 'amber' ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
                          cls.themeColor === 'sky' ? 'bg-gradient-to-br from-sky-400 to-indigo-600' :
                          'bg-gradient-to-br from-indigo-700 to-violet-800' /* default indigo */
                        }`}>
                          <div className="absolute top-0 right-0 p-3 opacity-15 pointer-events-none">
                            <GraduationCap className="w-24 h-24" />
                          </div>
                          <div className="flex justify-between items-start gap-4 z-10">
                            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-black uppercase tracking-wider backdrop-blur-sm">
                              {cls.grade || 'Tiếng Anh'}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClass(cls.id);
                              }}
                              type="button"
                              className="p-1.5 bg-white/10 hover:bg-rose-500 hover:text-white rounded-lg transition duration-200 text-white/80 cursor-pointer"
                              title="Xóa lớp học"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="z-10 mt-2">
                            <h4 className="font-extrabold text-base line-clamp-1 font-display leading-tight" title={cls.name}>{cls.name}</h4>
                            {cls.section && <p className="text-[10px] text-indigo-200 font-bold font-sans mt-0.5">{cls.section}</p>}
                          </div>
                        </div>

                        {/* Class Details body */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-xs font-sans text-slate-600 font-semibold">
                            <div>
                              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Môn học / Chủ đề</p>
                              <p className="font-extrabold text-slate-800 mt-1 truncate">{cls.subject || 'Tổng quan'}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Phòng học</p>
                              <p className="font-extrabold text-slate-800 mt-1 truncate">{cls.room || 'Phòng Online'}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <div>
                              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Mã lớp học</p>
                              <div className="flex items-center gap-2 mt-1">
                                <code className="text-[11px] font-black font-mono text-indigo-705 text-indigo-700 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100">
                                  {cls.code}
                                </code>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(cls.code);
                                    alert('Đã sao chép mã mời lớp học: ' + cls.code);
                                  }}
                                  type="button"
                                  className="text-slate-400 hover:text-indigo-600 p-1 rounded hover:bg-slate-50 transition cursor-pointer"
                                  title="Sao chép mã"
                                >
                                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                                </button>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide font-sans">Sĩ số</p>
                              <p className="text-xs font-black text-slate-800 mt-1 flex items-center justify-end gap-1 font-sans">
                                <Users className="w-3.5 h-3.5 text-indigo-500" /> {cls.studentCount || 0} học viên
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* GENERATOR TAB */}
        {activeSubTab === 'soan-bai' && (
          <motion.div
            key="soan-bai-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left Form Column */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/30 self-start" id="curriculum-editor-form">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-md shadow-indigo-100">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-indigo-900 font-display text-base">Bộ Tạo Giáo Án AI</h4>
              </div>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed font-semibold">
                Thiết kế một giáo trình giảng dạy chuyên nghiệp, bài bản cùng chuỗi hoạt động đứng lớp tức thì theo chuẩn CEFR chỉ với 1 cú click chuột.
              </p>

              <form onSubmit={handleGenerateCurriculum} className="space-y-4">
                <div>
                  <label className="block text-[10px] sm:text-xs font-black text-indigo-950 uppercase tracking-wider mb-2">Chủ đề mong muốn (Topic)</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Ví dụ: Giao tiếp tại quán cafe, Viết báo cáo doanh thu..."
                    className="w-full p-3.5 bg-sky-50/50 border border-sky-100 focus:border-indigo-600 rounded-xl text-xs sm:text-sm focus:outline-none transition font-bold text-slate-800 placeholder-slate-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-black text-indigo-950 uppercase tracking-wider mb-2">Level đích</label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value as CEFRLevel)}
                      className="w-full p-3 bg-sky-50/50 border border-sky-100 focus:border-indigo-600 rounded-xl text-xs sm:text-sm focus:outline-none transition cursor-pointer font-bold text-slate-800"
                    >
                      {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(lvl => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-black text-indigo-950 uppercase tracking-wider mb-2">Thời lượng</label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full p-3 bg-sky-50/50 border border-sky-100 focus:border-indigo-600 rounded-xl text-xs sm:text-sm focus:outline-none transition cursor-pointer font-bold text-slate-800"
                    >
                      {['30 phút', '45 phút', '60 phút', '90 phút'].map(dur => (
                        <option key={dur} value={dur}>{dur}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {errorStatus && (
                  <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-xs text-rose-600">
                    {errorStatus}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={generating}
                  id="btn-teacher-generate"
                  className="w-full bg-indigo-600 group hover:bg-slate-900 text-white font-display text-xs sm:text-sm font-black p-4 rounded-xl shadow-lg shadow-indigo-150 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  {generating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="animate-pulse">Đang thiết kế giáo án...</span>
                    </>
                  ) : (
                    <>
                      Soạn Nghiệp Vụ Bằng AI <Wand2 className="w-4 h-4 scale-95 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Output Column */}
            <div className="lg:col-span-8" id="curriculum-preview-workspace">
              {generating ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                    <Wand2 className="w-6 h-6 text-indigo-600 absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-950 font-display mb-2">Gemini AI Đang Soạn Giáo Án</h4>
                  <div className="space-y-1 max-w-xs text-slate-500 text-xs">
                    <p className="animate-pulse">✓ Đang phác thảo mục tiêu bài giảng phù hợp level {level}...</p>
                    <p className="animate-pulse delay-500">✓ Đang đối chiếu từ vựng & ngữ pháp nâng cao...</p>
                    <p className="animate-pulse delay-1000">✓ Đang lên kịch bản lớp học tương tác...</p>
                  </div>
                </div>
              ) : curriculum ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm"
                  id="teaching-curriculum-doc-preview"
                >
                  <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-5 mb-6">
                    <div>
                      <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-100/50 text-indigo-700 text-xs font-bold uppercase rounded-md">
                        GIÁO ÁN CHUẨN CEFR ({level})
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-950 mt-2">{curriculum.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">Chủ đề: {curriculum.topic} • Dự kiến: {duration}</p>
                    </div>

                    <button
                      onClick={handleCopyCurriculum}
                      type="button"
                      id="btn-copy-curriculum-plain"
                      className="flex items-center gap-1.5 p-2 rounded-xl text-xs font-medium border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer shadow-sm shrink-0"
                    >
                      {copied ? (
                        <><Check className="w-4 h-4 text-emerald-500" /> Copied!</>
                      ) : (
                        <><Copy className="w-4 h-4" /> Copy JSON</>
                      )}
                    </button>
                  </div>

                  <div className="space-y-6 text-sm text-slate-700">
                    {/* Objectives */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5 text-base font-display">
                        <FileCheck className="w-5 h-5 text-indigo-500" /> Mục tiêu bài giảng (Objectives)
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
                        {curriculum.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                      </ul>
                    </div>

                    {/* Vocabulary */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-1.5 text-base font-display">
                        <BookOpen className="w-5 h-5 text-indigo-500" /> Từ vựng khóa (Target Vocabulary)
                      </h4>
                      <div className="overflow-x-auto border border-slate-100 rounded-xl">
                        <table className="w-full text-left text-xs sm:text-sm border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                              <th className="p-3 font-semibold text-slate-700">Từ vựng / Cụm từ</th>
                              <th className="p-3 font-semibold text-slate-700">Ý nghĩa</th>
                              <th className="p-3 font-semibold text-slate-700">Ví dụ minh họa</th>
                            </tr>
                          </thead>
                          <tbody>
                            {curriculum.vocabulary.map((vocab, i) => {
                              const solvedPhonetic = vocab.phonetic || parseVocabulary(vocab.phrase).phonetic;
                              return (
                                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/40">
                                  <td className="p-3">
                                    <div className="flex flex-wrap items-baseline gap-1.5">
                                      <span className="font-bold text-indigo-700 font-mono text-[13px]">{vocab.phrase}</span>
                                      {solvedPhonetic && (
                                        <span className="text-[11px] font-mono font-bold text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded">
                                          {solvedPhonetic}
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="p-3 text-slate-600">{vocab.meaning}</td>
                                  <td className="p-3 text-slate-500 italic">"{vocab.example}"</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Grammar Points */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5 text-base font-display">
                        <FileText className="w-5 h-5 text-indigo-500" /> Điểm Ngữ Pháp Core (Grammar Guide)
                      </h4>
                      <div className="space-y-4">
                        {curriculum.grammarPoints.map((gp, i) => (
                          <div key={i} className="p-4 bg-indigo-50/20 border border-indigo-100/50 rounded-2xl">
                            <code className="text-xs sm:text-sm font-mono text-indigo-900 block font-bold mb-1.5">{gp.structure}</code>
                            <p className="text-xs text-slate-600 mb-1">{gp.explanation}</p>
                            <p className="text-xs text-slate-400 italic font-medium">Lấy mẫu: "{gp.example}"</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Classroom Activities */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-1.5 text-base font-display">
                        <Users className="w-5 h-5 text-indigo-500" /> Chuỗi Hoạt Động Lớp Học (Interactive Activities)
                      </h4>
                      <div className="space-y-3">
                        {curriculum.classroomActivities.map((act, i) => (
                          <div key={i} className="p-4 border border-slate-100 hover:border-slate-200 rounded-2xl flex flex-col sm:flex-row gap-2 sm:gap-4 items-start transition" id={`curriculum-act-${i}`}>
                            <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs shrink-0 whitespace-nowrap min-w-20 text-center">
                              {act.duration}
                            </span>
                            <div>
                              <h5 className="font-bold text-slate-950 text-sm mb-1">{act.name}</h5>
                              <p className="text-xs text-slate-500 leading-relaxed">{act.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Homework Quiz */}
                    {curriculum.homeworkQuiz && curriculum.homeworkQuiz.length > 0 && (
                      <div>
                        <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-1.5 text-base font-display">
                          <HelpCircle className="w-5 h-5 text-indigo-500" /> Đề Trắc Nghiệm Về Nhà (Homework Quiz)
                        </h4>
                        <div className="space-y-4">
                          {curriculum.homeworkQuiz.map((quiz, i) => (
                            <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100" id={`homework-quiz-box-${i}`}>
                              <p className="font-semibold text-slate-900 text-[13px] sm:text-sm mb-3">Câu {i + 1}: {quiz.question}</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                                {quiz.options.map((opt, oIdx) => (
                                  <div 
                                    key={oIdx} 
                                    className={`p-3 rounded-xl text-xs font-semibold ${
                                      Number(quiz.answer) === oIdx 
                                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                                        : 'bg-white border border-slate-150 text-slate-600'
                                    }`}
                                  >
                                    {String.fromCharCode(65 + oIdx)}. {opt} {Number(quiz.answer) === oIdx && '✓'}
                                  </div>
                                ))}
                              </div>
                              <p className="text-xs text-slate-500">
                                <strong className="text-indigo-600">Lời giải chi tiết:</strong> {quiz.explanation}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </motion.div>
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-slate-200/80 shadow-sm text-center">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wand2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-950 font-display mb-1">Chưa có bài soạn bài giảng</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Hãy đặt chủ đề, mục tiêu, và thời lượng mong muốn ở bảng cấu hình bên trái để AI tự động thiết lập syllabus giáo án chuyên sâu tức khắc.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* HOMEWORK & GRADING TAB */}
        {activeSubTab === 'cham-bai' && (
          <motion.div
            key="cham-bai-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Create & List Assignments Panel */}
            <div className="col-span-1 lg:col-span-7 space-y-6">
              
              {/* Form: Assign Homework */}
              <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/30">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-indigo-50/60">
                  <div>
                    <h4 className="font-extrabold text-indigo-900 font-display flex items-center gap-2 text-sm sm:text-base">
                      <Plus className="w-5 h-5 text-indigo-600" /> Thiết kế & Giao Bài Tập Mới
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">Bạn có thể tự tay điền đề kiểm tra hoặc bấm Trợ lý AI để tự động soạn ra một bộ câu hỏi chuẩn hóa cấp độ.</p>
                  </div>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg border border-indigo-150 font-black">AI-Enhanced</span>
                </div>

                <form onSubmit={handleAssignHomework} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Chủ đề bài tập (Topic)</label>
                      <input 
                        type="text"
                        value={newHwTopic}
                        onChange={(e) => setNewHwTopic(e.target.value)}
                        placeholder="Ví dụ: My Last Summer Vacation, Dining at a Restaurant"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Tiêu đề bài kiểm tra</label>
                      <input 
                        type="text"
                        value={newHwTitle}
                        onChange={(e) => setNewHwTitle(e.target.value)}
                        placeholder="Nhập tiêu đề học phần..."
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Trình độ chuẩn (CEFR)</label>
                      <select 
                        value={newHwLevel}
                        onChange={(e) => setNewHwLevel(e.target.value as CEFRLevel)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      >
                        <option value="A1">A1 - Khởi động</option>
                        <option value="A2">A2 - Cơ bản</option>
                        <option value="B1">B1 - Trung cấp</option>
                        <option value="B2">B2 - Trung lập khá</option>
                        <option value="C1">C1 - Cao cấp</option>
                        <option value="C2">C2 - Thành thạo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Học sinh được giao</label>
                      <select 
                        value={newHwAssignedTo}
                        onChange={(e) => setNewHwAssignedTo(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      >
                        <option value="all">Tất cả lớp học (all)</option>
                        {students.filter(s => s.approvalStatus === 'approved').map(s => (
                          <option key={s.username} value={s.username}>{s.fullName || s.name} ({s.username})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">Hạn nộp (Due Date)</label>
                      <input 
                        type="date"
                        value={newHwDueDate}
                        onChange={(e) => setNewHwDueDate(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      />
                    </div>
                  </div>

                  {/* AI Quick Compile Helper */}
                  <div className="bg-gradient-to-r from-indigo-50 to-sky-50 p-4 rounded-2xl border border-indigo-100 flex items-center justify-between gap-4">
                    <div className="flex gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-extrabold text-indigo-950 font-sans">Soạn đề trọn gói bằng AI Co-Teacher</p>
                        <p className="text-[10px] text-indigo-900/60 font-semibold font-sans">Gemini sẽ tự soạn 1 câu trắc nghiệm, 1 câu sắp xếp từ và 1 câu luận mẫu chuẩn chỉnh!</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleGenerateHomeworkAI}
                      disabled={generatingHwAI}
                      className="px-4 py-2 bg-indigo-600 hover:bg-slate-900 text-white text-xs font-black rounded-xl transition cursor-pointer shrink-0 disabled:opacity-50 flex items-center gap-1.5 shadow-md shadow-indigo-100"
                    >
                      {generatingHwAI ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Đang soạn...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-3.5 h-3.5" />
                          Tạo Đề Mẫu AI
                        </>
                      )}
                    </button>
                  </div>

                  {/* Review Current Questions fields */}
                  <div className="space-y-3">
                    <p className="text-xs font-extrabold text-indigo-900 font-sans flex items-center gap-1 pt-1">
                      <CheckSquare className="w-4 h-4 text-emerald-500" /> Cấu trúc bộ câu hỏi bài tập hiện tại (3 câu)
                    </p>

                    {newHwQuestions.map((q, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-150 relative">
                        <span className="absolute top-3.5 right-3 px-2 py-0.5 bg-slate-200 text-slate-700 text-[9px] font-black rounded-md uppercase">
                          {q.type}
                        </span>
                        <p className="text-xs font-extrabold text-slate-800 font-sans">Câu {q.id}: {q.question}</p>
                        
                        {q.options && q.options.length > 0 && (
                          <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-500 font-sans">
                            {q.options.map((opt: string, oi: number) => (
                              <div key={oi} className={`p-1.5 rounded-lg border ${Number(q.correctAnswer) === oi ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-white border-slate-200'}`}>
                                {String.fromCharCode(65 + oi)}. {opt}
                              </div>
                            ))}
                          </div>
                        )}

                        {q.correctAnswer && q.type !== 'quiz' && (
                          <p className="mt-1 text-[11px] font-bold text-emerald-700 font-sans">Đáp án chính xác: <span className="font-mono">{q.correctAnswer}</span></p>
                        )}
                        <p className="mt-1 text-[10px] text-slate-400 italic font-medium font-sans">Mách nhỏ dành cho bé: {q.hint || 'Không có gợi ý'}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={assigningHw}
                    className="w-full py-3 bg-indigo-600 hover:bg-emerald-600 text-white rounded-2xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-indigo-150"
                  >
                    {assigningHw ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Đang tạo bài tập giao...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Giao Bài Tập Lên Hệ Thống
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* List of Existing Homework */}
              <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/30 font-sans">
                <h4 className="font-extrabold text-indigo-900 font-display flex items-center gap-2 text-sm sm:text-base mb-4">
                  <BookOpen className="w-4 h-4 text-indigo-600" /> Danh Sách Bài Tập Đã Giao ({assignments.length})
                </h4>

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {assignments.length === 0 ? (
                    <div className="py-6 text-center text-slate-400 text-xs font-semibold">Hiện chưa giao bài ngoại khóa nào.</div>
                  ) : (
                    assignments.map((as, idx) => (
                      <div key={idx} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-100 duration-150 transition">
                        <div className="flex justify-between items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-indigo-100 border border-indigo-200 text-indigo-700 text-[10px] font-black rounded-full uppercase">
                            CEFR {as.level}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> Hạn nộp: {as.dueDate}
                          </span>
                        </div>
                        <p className="font-black text-indigo-950 text-sm mb-1 font-display">{as.title}</p>
                        <p className="text-xs text-slate-500 font-semibold mb-2">Chủ đề: <span className="text-indigo-600 font-bold">{as.topic}</span></p>
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold border-t border-slate-100 pt-2">
                          <span>Đối tượng: <strong className="text-slate-600 uppercase">{as.assignedTo === 'all' ? 'Cả lớp' : as.assignedTo}</strong></span>
                          <span>Số câu hỏi: {as.questions?.length || 3} câu</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* Submissions & Grading Workspace */}
            <div className="col-span-1 lg:col-span-5 space-y-6">
              
              {/* List Submissions */}
              <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/30 font-sans">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-indigo-50/60">
                  <h4 className="font-extrabold text-indigo-900 font-display flex items-center gap-2 text-sm sm:text-base">
                    <ClipboardList className="w-5 h-5 text-indigo-600" /> Bài làm học viên gửi về ({submissions.length})
                  </h4>
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] font-black rounded-lg">Realtime Inbox</span>
                </div>

                <div className="space-y-3 max-h-[310px] overflow-y-auto pr-1">
                  {submissions.length === 0 ? (
                    <div className="py-6 text-center text-slate-400 text-xs font-semibold">Chưa có học viên nào nộp bài.</div>
                  ) : (
                    submissions.map((sub, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => {
                          setSelectedSub(sub);
                          setGradingScore(sub.score || 85);
                          setGradingFeedback(sub.feedback || sub.aiReviewDraft || '');
                        }}
                        className={`p-4 rounded-2xl border transition duration-150 cursor-pointer ${
                          selectedSub?.id === sub.id 
                            ? 'bg-indigo-50 border-indigo-300 shadow-md shadow-indigo-50' 
                            : 'bg-white border-slate-150 hover:bg-slate-50/80'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-extrabold text-indigo-950 text-xs sm:text-sm">{sub.studentFullName}</p>
                          {sub.status === 'pending' ? (
                            <span className="px-2 py-0.5 bg-amber-100 border border-amber-200 text-amber-800 text-[9px] font-black rounded-md flex items-center gap-1.5 animate-pulse">
                              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Chờ Chấm
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-emerald-100 border border-emerald-200 text-emerald-800 text-[9px] font-black rounded-md">
                              Đã Chấm: {sub.score}đ
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-bold text-slate-700 truncate">{sub.assignmentTitle}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-2">Nộp vào: {sub.submittedAt}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Grading Work Center if Selected */}
              <AnimatePresence mode="wait">
                {selectedSub ? (
                  <motion.div
                    key="grading-workspace"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-6 rounded-3xl border border-emerald-100/85 shadow-2xl shadow-indigo-100/40 font-sans"
                  >
                    <div className="flex justify-between items-start mb-4 pb-3 border-b border-indigo-50/60">
                      <div>
                        <p className="text-[9px] text-indigo-500 uppercase tracking-widest font-black">Workspace Chấm Điểm</p>
                        <h4 className="font-extrabold text-indigo-900 font-display text-sm mt-0.5">Chấm bài: {selectedSub.studentFullName}</h4>
                      </div>
                      <button 
                        onClick={() => setSelectedSub(null)}
                        className="text-slate-400 hover:text-indigo-950 transition font-black text-xs px-2 py-1 bg-slate-50 hover:bg-slate-100 rounded-lg"
                      >
                        Đóng
                      </button>
                    </div>

                    {selectedSub.submittedFileUrl && (
                      <div className="mb-4 p-3.5 bg-indigo-50 border border-indigo-150 rounded-2xl flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center text-lg shrink-0">📁</div>
                          <div className="overflow-hidden">
                            <p className="text-[9px] text-indigo-500 font-extrabold uppercase tracking-wider">Tài liệu đính kèm kèm theo</p>
                            <p className="text-xs font-black text-slate-800 truncate">{selectedSub.submittedFileName || 'bai_lam_hoc_vien.pdf'}</p>
                          </div>
                        </div>
                        <a 
                          href={selectedSub.submittedFileUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="px-3.5 py-2 bg-indigo-600 hover:bg-slate-900 text-white text-xs font-black rounded-xl cursor-pointer shrink-0 transition shadow-sm"
                        >
                          Mở / Tải tệp
                        </a>
                      </div>
                    )}

                    {/* Answers review list */}
                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1 mb-4 border-b border-indigo-50/60 pb-4">
                      {(() => {
                        const targetAs = assignments.find(as => as.id === selectedSub.assignmentId);
                        if (!targetAs) return <p className="text-xs text-rose-500">Không tìm thấy bản câu hỏi mẫu.</p>;
                        
                        return targetAs.questions.map((q) => {
                          const ansObj = selectedSub.answers.find(a => a.questionId === q.id);
                          const isQuiz = q.type === 'quiz';
                          const isSC = q.type === 'sentence_construction';
                          const isCorrect = isQuiz 
                            ? ansObj?.studentAnswer === q.correctAnswer
                            : isSC
                              ? ansObj?.studentAnswer?.trim()?.toLowerCase() === q.correctAnswer?.trim()?.toLowerCase()
                              : null;

                          return (
                            <div key={q.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-105">
                              <p className="text-xs font-black text-indigo-950 mb-1">Câu {q.id} ({q.type === 'quiz' ? 'Trắc nghiệm' : q.type === 'sentence_construction' ? 'Sắp xếp' : 'Viết luận'}):</p>
                              <p className="text-xs text-slate-600 mb-2">{q.question}</p>
                              
                              <div className="p-2.5 bg-white border border-slate-150 rounded-xl">
                                <p className="text-[10px] text-slate-400 font-bold">Bài làm của bé:</p>
                                <p className="text-xs font-black text-slate-800 mt-0.5">
                                  {isQuiz && q.options 
                                    ? `${String.fromCharCode(65 + Number(ansObj?.studentAnswer || 0))}. ${q.options[Number(ansObj?.studentAnswer)] || 'Chưa trả lời'}` 
                                    : ansObj?.studentAnswer || 'Trống'}
                                </p>
                              </div>

                              <div className="mt-2 flex items-center justify-between text-[11px] font-bold">
                                {isQuiz || isSC ? (
                                  <span className={`px-2 py-0.5 rounded-lg border ${isCorrect ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                                    {isCorrect ? 'Chính Xác ✓' : 'Chưa Chính Xác ✗'}
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 border border-indigo-200 rounded-lg">Chờ giáo viên nhận xét luận</span>
                                )}

                                <p className="text-[10px] text-indigo-500 italic font-medium">Đ/Á mẫu: {isQuiz && q.options ? q.options[Number(q.correctAnswer)] : q.correctAnswer || 'Mở rộng'}</p>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>

                    {/* AI evaluation copilot */}
                    <div className="bg-gradient-to-r from-emerald-50/50 to-indigo-50/50 p-4 rounded-2xl border border-emerald-100/60 mb-5 text-center">
                      <div className="flex gap-2 text-left mb-2.5">
                        <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5 animate-bounce" />
                        <div>
                          <p className="text-xs font-extrabold text-indigo-950 font-sans">AI Co-Teacher Trực Bài Chấm Điểm</p>
                          <p className="text-[10px] text-indigo-900/60 font-medium font-sans">AI sẽ tự động rà soát từ vựng, ngữ pháp, các lỗi hành văn & đưa ra điểm số khuyến nghị chính xác tối ưu!</p>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => handleAiEvaluateSubmission(selectedSub.id)}
                        disabled={evaluatingHwAI}
                        className="w-full py-2 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white text-xs font-extrabold rounded-xl transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-100"
                      >
                        {evaluatingHwAI ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            AI Đang Chấm Bài & Nhận Xét...
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-3.5 h-3.5" />
                            Chấm Điểm Nháp Bằng AI Co-Teacher 🤖
                          </>
                        )}
                      </button>
                    </div>

                    {/* Handing Grading Score & Feedback */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                          <span>Điểm số bài viết (Score):</span>
                          <span className="text-sm text-indigo-600 font-extrabold">{gradingScore} / 100 điểm</span>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="100"
                          value={gradingScore}
                          onChange={(e) => setGradingScore(Number(e.target.value))}
                          className="w-full accent-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nhận xét chi tiết của Giáo Viên</label>
                        <textarea
                          rows={4}
                          value={gradingFeedback}
                          onChange={(e) => setGradingFeedback(e.target.value)}
                          placeholder="Viết nhận xét hoặc sửa sai ngữ pháp tiếng Anh cốt lõi cho bé tại đây..."
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleSubmitGrading}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-emerald-600 text-white rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-100"
                      >
                        <Check className="w-4 h-4" />
                        Gửi Nhận Xét & Điểm Số Bé ✓
                      </button>
                    </div>

                  </motion.div>
                ) : (
                  <div className="bg-white p-8 rounded-3xl border border-dashed border-slate-200 text-center text-slate-400 text-xs font-semibold leading-relaxed font-sans shadow-md">
                    💡 Hãy click chọn một bài kiểm tra đã nộp từ học viên ở bảng bên trên để tiến hành sửa bài, chấm điểm, sửa từng câu trực quan với đối tác trí tuệ nhân tạo!
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* STUDENTS MONITOR TAB */}
        {activeSubTab === 'hoc-vien' && (
          <motion.div
            key="hoc-vien-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Table roster */}
            <div className="col-span-1 lg:col-span-8 space-y-6">
              
              {/* SECTION 1: PENDING STUDENTS (Yêu cầu đăng ký chờ duyệt) */}
              <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/30" id="student-pending-card">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-extrabold text-indigo-900 font-display flex items-center gap-2 text-sm sm:text-base">
                    <Clock className="w-5 h-5 text-amber-500 animate-pulse animate-duration-1000" /> Đơn Đăng Ký Chờ Phê Duyệt ({students.filter(st => st.approvalStatus === 'pending').length})
                  </h4>
                  <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded-lg border border-amber-200 font-black">Cần Xác Nhận</span>
                </div>

                {students.filter(st => st.approvalStatus === 'pending').length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs font-semibold bg-slate-50/50 rounded-2xl border border-dashed border-slate-200/60 font-sans">
                    🎉 Hoàn thành! Không có học sinh mới chờ phê duyệt lúc này.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="bg-amber-50/40 border-b border-amber-100/60 text-indigo-950 font-black">
                          <th className="p-3">Học viên & Lớp học</th>
                          <th className="p-3">Liên hệ & Tài khoản</th>
                          <th className="p-3">Mục tiêu học tập</th>
                          <th className="p-3">Ngày đăng ký</th>
                          <th className="p-3 text-right">Hành động của Admin</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {students.filter(st => st.approvalStatus === 'pending').map((st, i) => (
                          <tr key={i} className="hover:bg-amber-50/20 transition duration-150">
                            <td className="p-3">
                              <p className="font-extrabold text-indigo-900 text-sm">{st.fullName || st.name}</p>
                              <div className="flex flex-wrap gap-1.5 mt-1 items-center">
                                {st.grade && (
                                  <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold border border-slate-200/55">
                                    {st.grade}
                                  </span>
                                )}
                                {st.targetLevel && (
                                  <span className="text-[10px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded font-black border border-indigo-100">
                                    Mục tiêu: {st.targetLevel}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-3">
                              <p className="font-mono text-[11px] text-slate-500 font-extrabold">@{st.username}</p>
                              {st.phoneNumber ? (
                                <a href={`tel:${st.phoneNumber}`} className="text-[11px] text-indigo-600 hover:underline font-bold font-sans block mt-0.5">
                                  📞 {st.phoneNumber}
                                </a>
                              ) : (
                                <span className="text-[11px] text-slate-400 italic">Chưa cung cấp SĐT</span>
                              )}
                            </td>
                            <td className="p-3 max-w-[200px] sm:max-w-[250px]">
                              {st.learningGoal ? (
                                <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-2">
                                  "{st.learningGoal}"
                                </p>
                              ) : (
                                <span className="text-xs text-slate-400 italic">Chưa nhập mục tiêu</span>
                              )}
                            </td>
                            <td className="p-3 text-xs text-slate-400 whitespace-nowrap">
                              {st.registeredAt ? new Date(st.registeredAt).toLocaleDateString('vi-VN') : 'Mới đây'}
                            </td>
                            <td className="p-3 text-right">
                              <div className="flex justify-end gap-1.5 flex-wrap">
                                <button
                                  onClick={() => handleApproveAction(st.username, 'approve')}
                                  type="button"
                                  className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-md shadow-emerald-100"
                                >
                                  <UserCheck className="w-3.5 h-3.5" /> Duyệt Học
                                </button>
                                <button
                                  onClick={() => handleApproveAction(st.username, 'reject')}
                                  type="button"
                                  className="px-2.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                                >
                                  <UserX className="w-3.5 h-3.5" /> Từ Chối
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* SECTION 2: APPROVED STUDENTS (Lớp học viên chính thức) */}
              <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/30" id="student-roster-card">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-extrabold text-indigo-900 font-display flex items-center gap-2 text-sm sm:text-base">
                    <Users className="w-5 h-5 text-indigo-600" /> Roster Học viên Đang Học ({students.filter(st => st.approvalStatus === 'approved').length})
                  </h4>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg border border-emerald-200 font-black">Danh sách lớp</span>
                </div>

                {students.filter(st => st.approvalStatus === 'approved').length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs font-semibold bg-slate-50/50 rounded-2xl border border-dashed border-slate-200/60 font-sans">
                    Chưa có học viên nào được phê duyệt tham gia lớp học.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="bg-sky-50/50 border-b border-sky-100 text-indigo-950 font-black">
                          <th className="p-3">Họ và tên học viên</th>
                          <th className="p-3 text-center">Trình độ CEFR</th>
                          <th className="p-3 text-center">Chuỗi học (Streak)</th>
                          <th className="p-3 text-right">Lựa chọn</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-sans">
                        {students.filter(st => st.approvalStatus === 'approved').map((st, i) => {
                          const levelDisplay = st.roadmap?.level || st.currentLevel || 'Chưa thi';
                          const streakDisplay = st.streak !== undefined ? st.streak : (st.streakDays !== undefined ? st.streakDays : 1);
                          return (
                            <tr key={i} className="hover:bg-sky-50/30 transition duration-150">
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <p className="font-extrabold text-indigo-900 text-sm">{st.fullName || st.name}</p>
                                  {st.grade && (
                                    <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold border border-slate-200/60">
                                      {st.grade}
                                    </span>
                                  )}
                                </div>
                                <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] text-slate-400 font-semibold font-sans">
                                  <span>Username: {st.username || 'Mẫu'}</span>
                                  {st.phoneNumber && (
                                    <>
                                      <span>•</span>
                                      <a href={`tel:${st.phoneNumber}`} className="text-indigo-600 hover:underline">
                                        📞 {st.phoneNumber}
                                      </a>
                                    </>
                                  )}
                                  {st.learningGoal && (
                                    <>
                                      <span>•</span>
                                      <span className="text-slate-500 italic max-w-xs truncate" title={st.learningGoal}>
                                        Mục tiêu: "{st.learningGoal}"
                                      </span>
                                    </>
                                  )}
                                </div>
                              </td>
                              <td className="p-3 text-center">
                                <span className="px-2.5 py-1 bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-black rounded-full uppercase">
                                  {levelDisplay}
                                </span>
                              </td>
                              <td className="p-3 text-center text-amber-500 font-black font-mono">
                                🔥 {streakDisplay} ngày
                              </td>
                              <td className="p-3 text-right flex justify-end items-center gap-1.5 flex-wrap">
                                <button
                                  onClick={() => handleGetStudentAdvice(st)}
                                  type="button"
                                  id={`btn-student-advice-${i}`}
                                  className="px-3 py-1.5 bg-indigo-600 hover:bg-slate-900 text-white rounded-xl text-xs font-black transition cursor-pointer shadow-md shadow-indigo-100"
                                >
                                  Tư vấn AI
                                </button>
                                <button
                                  onClick={() => handleApproveAction(st.username, 'reject')}
                                  type="button"
                                  title="Đình chỉ tạm thời học viên"
                                  className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                >
                                  <UserX className="w-4 h-4" />
                                </button>
                                {st.username !== 'admin' && (
                                  <button
                                    onClick={() => handleApproveAction(st.username, 'delete')}
                                    type="button"
                                    title="Xóa vĩnh viễn"
                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>

            {/* AI Advice Sidebar response box */}
            <div className="col-span-1 lg:col-span-4 bg-white p-6 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/30" id="student-advice-sidebar">
              <h4 className="font-extrabold text-indigo-900 font-display mb-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" /> Đề xuất cố vấn sư phạm
              </h4>
              <p className="text-[11px] text-slate-400 mb-4 font-medium font-sans">Chọn một học viên ở danh sách bên trái để lấy báo cáo năng lực và tư vấn bài giảng từ Gemini.</p>

              {selectedStudent ? (
                <div className="space-y-4" id="advisor-results-panel">
                  <div className="p-4 bg-sky-50/50 border border-sky-100 rounded-2xl">
                    <p className="text-[10px] text-indigo-500 uppercase tracking-widest font-black">Học viên đang chọn</p>
                    <p className="font-black text-indigo-900 font-display text-base mt-1">{selectedStudent.fullName || selectedStudent.name}</p>
                    
                    <div className="mt-3 space-y-1.5 text-xs text-slate-600 font-semibold font-sans">
                      <p><strong className="text-indigo-950 font-bold">Điểm mạnh:</strong> {(selectedStudent.roadmap?.strengths || selectedStudent.strengths || ["Đang theo dõi học tập"]).join(', ')}</p>
                      <p><strong className="text-indigo-950 font-bold">Điểm yếu:</strong> {(selectedStudent.roadmap?.weaknesses || selectedStudent.weaknesses || ["Cần khảo sát lộ trình"]).join(', ')}</p>
                    </div>
                  </div>

                  {loadingAdvice ? (
                    <div className="p-6 flex flex-col items-center justify-center text-center">
                      <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2 py-0.5 animate-duration-500"></div>
                      <p className="text-xs text-slate-500 animate-pulse font-bold">Đang hỏi cố vấn sư phạm AI...</p>
                    </div>
                  ) : aiAdviceText ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 bg-indigo-50/50 border border-indigo-100/40 rounded-2xl text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold font-sans"
                    >
                      <strong className="text-indigo-900 block mb-2 flex items-center gap-1 font-bold">📚 Khuyến nghị lộ trình học:</strong>
                      <div className="whitespace-pre-line">{aiAdviceText}</div>
                    </motion.div>
                  ) : null}
                </div>
              ) : (
                <div className="p-8 border-2 border-dashed border-sky-100/70 rounded-2xl text-center text-slate-400 text-xs font-semibold leading-relaxed">
                  Chưa có thông tin phân tích. Vui lòng bấm nút "Tư vấn AI" bên cạnh tên bất kỳ học viên nào để nhận báo cáo thông minh.
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* CRM MONITOR TAB */}
        {activeSubTab === 'crm' && (
          <motion.div
            key="crm-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full"
          >
            <TeacherCrmPanel students={students} onRefresh={fetchStudents} />
          </motion.div>
        )}

      </AnimatePresence>

      {/* CREATE CLASS MODAL POPUP */}
      {isCreateClassOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 shadow-2xl" id="create-class-modal">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsCreateClassOpen(false)}
          />
          {/* Modal Box */}
          <div className="bg-[#f0f4f9] sm:bg-[#f8fafd] rounded-[28px] border border-slate-200 shadow-2xl max-w-sm w-full overflow-hidden relative z-10 p-6 sm:p-7 space-y-5" style={{boxShadow: '0 12px 30px rgba(0,0,0,0.15)'}}>
            
            <div>
              <h3 className="text-xl font-normal font-sans text-slate-800 tracking-tight">Tạo lớp học</h3>
            </div>

            {createClassError && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {createClassError}
              </div>
            )}

            <form onSubmit={handleCreateClassSubmit} className="space-y-4 font-sans text-left">
              {/* Tên lớp học* Input */}
              <div className="relative">
                <input
                  type="text"
                  value={classNameInp}
                  onChange={(e) => setClassNameInp(e.target.value)}
                  placeholder="Tên lớp học*"
                  required
                  className="w-full pt-5 pb-1.5 px-3.5 bg-slate-100 hover:bg-slate-200/60 border-b-2 border-slate-400 font-sans focus:border-indigo-600 text-sm focus:outline-none transition rounded-t-md text-slate-900"
                />
                <label className="absolute left-3.5 top-0.5 text-[9px] text-slate-400 font-bold uppercase font-sans">* Bắt buộc</label>
              </div>

              {/* Phần Input */}
              <div className="relative">
                <input
                  type="text"
                  value={classSection}
                  onChange={(e) => setClassSection(e.target.value)}
                  placeholder="Phần"
                  className="w-full pt-5 pb-1.5 px-3.5 bg-slate-100 hover:bg-slate-200/60 border-b-2 border-slate-400 font-sans focus:border-indigo-600 text-sm focus:outline-none transition rounded-t-md text-slate-900"
                />
                <label className="absolute left-3.5 top-0.5 text-[9px] text-slate-400 font-bold uppercase font-sans">Phần (Kỳ I / Cả năm)</label>
              </div>

              {/* Cấp lớp Input */}
              <div className="relative">
                <input
                  type="text"
                  value={classGrade}
                  onChange={(e) => setClassGrade(e.target.value)}
                  placeholder="Cấp lớp"
                  className="w-full pt-5 pb-1.5 px-3.5 bg-slate-100 hover:bg-slate-200/60 border-b-2 border-slate-400 font-sans focus:border-indigo-600 text-sm focus:outline-none transition rounded-t-md text-slate-900"
                />
                <label className="absolute left-3.5 top-0.5 text-[9px] text-slate-400 font-bold uppercase font-sans">Cấp lớp (Lớp 4 / Lớp 5)</label>
              </div>

              {/* Chủ đề Input */}
              <div className="relative">
                <input
                  type="text"
                  value={classSubject}
                  onChange={(e) => setClassSubject(e.target.value)}
                  placeholder="Chủ đề"
                  className="w-full pt-5 pb-1.5 px-3.5 bg-slate-100 hover:bg-slate-200/60 border-b-2 border-slate-400 font-sans focus:border-indigo-600 text-sm focus:outline-none transition rounded-t-md text-slate-900"
                />
                <label className="absolute left-3.5 top-0.5 text-[9px] text-slate-400 font-bold uppercase font-sans">Chủ đề (Phát âm / Giao tiếp)</label>
              </div>

              {/* Phòng Input */}
              <div className="relative">
                <input
                  type="text"
                  value={classRoomInput}
                  onChange={(e) => setClassRoomInput(e.target.value)}
                  placeholder="Phòng"
                  className="w-full pt-5 pb-1.5 px-3.5 bg-slate-100 hover:bg-slate-200/60 border-b-2 border-slate-400 font-sans focus:border-indigo-600 text-sm focus:outline-none transition rounded-t-md text-slate-900"
                />
                <label className="absolute left-3.5 top-0.5 text-[9px] text-slate-400 font-bold uppercase font-sans">Phòng học (Phòng 402 / Online)</label>
              </div>

              {/* Action controls */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={() => setIsCreateClassOpen(false)}
                  type="button"
                  className="px-4 py-2 hover:bg-slate-200 rounded-full text-indigo-600 hover:text-indigo-700 font-bold text-xs sm:text-sm transition cursor-pointer"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingClass}
                  className={`px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-md shadow-indigo-100 ${
                    isSubmittingClass ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmittingClass ? 'Đang tạo...' : 'Tạo'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* INVITE STUDENT MODAL POPUP */}
      {isInviteModalOpen && selectedClassroom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 shadow-2xl" id="invite-student-modal">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsInviteModalOpen(false)}
          />
          {/* Modal Box */}
          <div className="bg-[#f0f4f9] sm:bg-[#f8fafd] rounded-[28px] border border-slate-200 shadow-2xl max-w-sm w-full overflow-hidden relative z-10 p-6 sm:p-7 space-y-5" style={{boxShadow: '0 12px 30px rgba(0,0,0,0.15)'}}>
            
            <div className="flex justify-between items-center pb-2 border-b border-rose-100/50">
              <h3 className="text-lg font-black font-sans text-slate-800 tracking-tight">Mời học viên</h3>
              <button 
                onClick={() => setIsInviteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-sans font-bold"
              >
                ✕
              </button>
            </div>

            {/* Invite Link Section */}
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Đường liên kết mời</span>
              <div className="flex items-center gap-1.5 p-2 bg-white border border-slate-150 rounded-xl">
                <span className="text-[10px] text-slate-500 truncate select-all flex-1 font-mono">
                  {`${window.location.origin}/join?code=${selectedClassroom.code}`}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/join?code=${selectedClassroom.code}`);
                    alert('Đã sao chép liên kết mời học viên vào khay nhớ tạm!');
                  }}
                  className="p-1.5 hover:bg-slate-100 text-indigo-600 rounded-lg transition"
                  title="Sao chép liên kết"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleInviteStudentSubmit} className="space-y-4 font-sans text-left">
              {/* Email Address Input */}
              <div className="relative">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  required
                  className="w-full pt-5 pb-1.5 px-3.5 bg-slate-100 hover:bg-slate-200/60 border-b-2 border-slate-400 font-sans focus:border-indigo-600 text-sm focus:outline-none transition rounded-t-md text-slate-900 font-semibold"
                />
                <label className="absolute left-3.5 top-0.5 text-[9px] text-slate-400 font-bold uppercase font-sans">Địa chỉ email học viên*</label>
              </div>

              {/* Full Name Input */}
              <div className="relative">
                <input
                  type="text"
                  value={inviteFullName}
                  onChange={(e) => setInviteFullName(e.target.value)}
                  placeholder="Tên học viên (Tùy chọn)"
                  className="w-full pt-5 pb-1.5 px-3.5 bg-slate-100 hover:bg-slate-200/60 border-b-2 border-slate-400 font-sans focus:border-indigo-600 text-sm focus:outline-none transition rounded-t-md text-slate-900 font-semibold"
                />
                <label className="absolute left-3.5 top-0.5 text-[9px] text-slate-400 font-bold uppercase font-sans">Họ và tên học viên</label>
              </div>

              {/* Action controls */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={() => setIsInviteModalOpen(false)}
                  type="button"
                  className="px-4 py-2 hover:bg-slate-200 rounded-full text-indigo-600 hover:text-indigo-700 font-bold text-xs sm:text-sm transition cursor-pointer"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  disabled={invitingStudent}
                  className={`px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-md shadow-indigo-100 ${
                    invitingStudent ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {invitingStudent ? 'Đang gửi...' : 'Mời'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* POPUP MODAL FOR "+ TẠO" CLASSWORK FORMS */}
      {classworkFormType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 shadow-2xl" id="custom-classwork-form-modal">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
            onClick={() => setClassworkFormType(null)}
          />
          {/* Modal Box */}
          <div className="bg-white rounded-[28px] border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden relative z-10 p-6 sm:p-7 space-y-5 animate-fade-in" style={{boxShadow: '0 12px 30px rgba(0,0,0,0.15)'}}>
            
            <div className="flex justify-between items-center pb-2 border-b border-indigo-150">
              <h3 className="text-lg font-black font-sans text-indigo-950 tracking-tight">
                {classworkFormType === 'assignment' && '📋 Tạo Bài tập mới'}
                {classworkFormType === 'quiz' && '📝 Tạo Bài kiểm tra trắc nghiệm'}
                {classworkFormType === 'question' && '❓ Đặt Câu hỏi thảo luận nhanh'}
                {classworkFormType === 'material' && '📖 Đăng Tài liệu học tập'}
                {classworkFormType === 'topic' && '🏷️ Thêm Chủ đề mới'}
              </h3>
              <button 
                onClick={() => setClassworkFormType(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-sans font-black p-1.5 hover:bg-slate-100 rounded-full transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClassworkSubmit} className="space-y-4 font-sans text-left">
              {classworkFormType === 'topic' ? (
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={cwNewTopic}
                      onChange={(e) => setCwNewTopic(e.target.value)}
                      placeholder="Tên chủ đề (ví dụ: Kỹ năng Nghe IELTS)"
                      required
                      className="w-full pt-5 pb-1.5 px-3.5 bg-slate-100 hover:bg-slate-200/60 border-b-2 border-slate-400 font-sans focus:border-blue-600 text-sm focus:outline-none transition rounded-t-lg text-slate-900 font-semibold"
                    />
                    <label className="absolute left-3.5 top-0.5 text-[9px] text-zinc-400 font-black uppercase font-sans">Tên chủ đề mới *</label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Title */}
                  <div className="relative">
                    <input
                      type="text"
                      value={cwTitle}
                      onChange={(e) => setCwTitle(e.target.value)}
                      placeholder="Nhập tiêu đề hoặc câu hỏi chủ đạo"
                      required
                      className="w-full pt-5 pb-1.5 px-3.5 bg-slate-100 hover:bg-slate-200/60 border-b-2 border-slate-400 font-sans focus:border-blue-600 text-sm focus:outline-none transition rounded-t-lg text-slate-900 font-semibold"
                    />
                    <label className="absolute left-3.5 top-0.5 text-[9px] text-zinc-400 font-black uppercase font-sans">Tiêu đề *</label>
                  </div>

                  {/* Description / Instructions */}
                  <div className="relative">
                    <textarea
                      value={cwDescription}
                      onChange={(e) => setCwDescription(e.target.value)}
                      placeholder="Mô tả cụ thể hoặc các câu hỏi cần giao cho học viên..."
                      rows={4}
                      className="w-full pt-5 pb-1.5 px-3.5 bg-slate-100 hover:bg-slate-200/60 border-b-2 border-slate-400 font-sans focus:border-blue-600 text-sm focus:outline-none transition rounded-t-lg text-slate-900 font-semibold resize-none"
                    />
                    <label className="absolute left-3.5 top-0.5 text-[9px] text-zinc-400 font-black uppercase font-sans">Hướng dẫn / Đề bài (Tùy chọn)</label>
                  </div>

                  {/* External links for Document */}
                  {classworkFormType === 'material' && (
                    <div className="relative">
                      <input
                        type="url"
                        value={cwLink}
                        onChange={(e) => setCwLink(e.target.value)}
                        placeholder="https://drive.google.com/file/..."
                        className="w-full pt-5 pb-1.5 px-3.5 bg-slate-100 hover:bg-slate-200/60 border-b-2 border-slate-400 font-sans focus:border-blue-600 text-sm focus:outline-none transition rounded-t-lg text-slate-900 font-semibold text-xs"
                      />
                      <label className="absolute left-3.5 top-0.5 text-[9px] text-zinc-400 font-black uppercase font-sans">Liên kết tài liệu đính kèm (Drive, Website)</label>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {/* Topic Choice dropdown */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 font-black uppercase tracking-wider">Chủ đề bài giảng</label>
                      <select
                        value={cwTopic}
                        onChange={(e) => setCwTopic(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-600 text-slate-800"
                      >
                        {classroomTopics.map((topic) => (
                          <option key={topic} value={topic}>{topic}</option>
                        ))}
                      </select>
                    </div>

                    {/* Level alignment */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 font-black uppercase tracking-wider">Cấp độ (CEFR)</label>
                      <select
                        value={cwLevel}
                        onChange={(e) => setCwLevel(e.target.value as CEFRLevel)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-600 text-slate-800"
                      >
                        {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lvl) => (
                          <option key={lvl} value={lvl}>{lvl}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Due Date picker */}
                  <div className="relative">
                    <input
                      type="date"
                      value={cwDueDate}
                      onChange={(e) => setCwDueDate(e.target.value)}
                      required
                      className="w-full pt-5 pb-1.5 px-3.5 bg-slate-100 hover:bg-slate-200/60 border-b-2 border-slate-400 font-sans focus:border-blue-600 text-sm focus:outline-none transition rounded-t-lg text-slate-900 font-semibold"
                    />
                    <label className="absolute left-3.5 top-0.5 text-[9px] text-zinc-400 font-black uppercase font-sans">Hạn chót nộp bài *</label>
                  </div>
                </div>
              )}

              {/* Form Action Buttons */}
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setClassworkFormType(null)}
                  className="px-4 py-2 hover:bg-slate-100 rounded-full text-slate-600 hover:text-slate-800 font-bold text-xs sm:text-sm transition cursor-pointer"
                >
                  Huỷ bỏ
                </button>
                <button
                  type="submit"
                  disabled={savingClasswork}
                  className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-md shadow-blue-100 disabled:opacity-50"
                >
                  {savingClasswork ? 'Đang tạo...' : (classworkFormType === 'topic' ? 'Tạo chủ đề' : 'Giao bài')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function TeacherCrmPanel({ students = [], onRefresh }: { students: any[], onRefresh: (silent?: boolean) => Promise<void> }) {
  const [crmNotes, setCrmNotes] = useState<{[username: string]: string}>({});
  const [crmReplies, setCrmReplies] = useState<{[ticketId: string]: string}>({});
  const [submittingReply, setSubmittingReply] = useState<{[ticketId: string]: boolean}>({});
  const [updatingConsult, setUpdatingConsult] = useState<{[username: string]: boolean}>({});
  const [crmStatusFilters, setCrmStatusFilters] = useState<'all' | 'pending' | 'contacted'>('all');
  const [localSyncing, setLocalSyncing] = useState(false);

  const handleSyncClick = async () => {
    setLocalSyncing(true);
    await onRefresh(false);
    setTimeout(() => setLocalSyncing(false), 600);
  };
  const [crmTicketFilters, setCrmTicketFilters] = useState<'all' | 'pending' | 'replied'>('pending');

  // Extract all consultation leads
  const leads = students.filter(s => s.phoneNumber || (s.consultingStatus && s.consultingStatus !== 'none'));

  // Extract all support tickets
  const tickets: { studentUsername: string, studentName: string, ticket: any }[] = [];
  students.forEach(s => {
    if (s.supportTickets && Array.isArray(s.supportTickets)) {
      s.supportTickets.forEach((t: any) => {
        tickets.push({
          studentUsername: s.username,
          studentName: s.fullName || s.username,
          ticket: t
        });
      });
    }
  });

  const handleSaveConsultation = async (username: string, status: string) => {
    const note = crmNotes[username] !== undefined ? crmNotes[username] : '';
    setUpdatingConsult(prev => ({ ...prev, [username]: true }));
    try {
      const res = await fetch('/api/teacher/update-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, status, note })
      });
      if (res.ok) {
        alert("Cập nhật trạng thái và ghi chú tư vấn thành công!");
        onRefresh();
      } else {
        alert("Có lỗi xảy ra khi lưu trạng thái.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingConsult(prev => ({ ...prev, [username]: false }));
    }
  };

  const handleReplyTicket = async (username: string, ticketId: string) => {
    const replyText = crmReplies[ticketId];
    if (!replyText || !replyText.trim()) {
      alert("Vui lòng ghi nội dung phản hồi trước khi gửi!");
      return;
    }
    setSubmittingReply(prev => ({ ...prev, [ticketId]: true }));
    try {
      const res = await fetch('/api/teacher/reply-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, ticketId, replyText })
      });
      if (res.ok) {
        alert("Gửi lời giải thắc mắc thành công!");
        setCrmReplies(prev => ({ ...prev, [ticketId]: '' }));
        onRefresh();
      } else {
        alert("Gửi phản hồi thất bại.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingReply(prev => ({ ...prev, [ticketId]: false }));
    }
  };

  const activeConsultingLeads = leads.filter(l => l.consultingStatus === 'pending');
  const activePendingTickets = tickets.filter(t => t.ticket.status === 'pending');

  const filteredLeads = leads.filter(l => {
    if (crmStatusFilters === 'all') return true;
    return l.consultingStatus === crmStatusFilters;
  });

  const filteredTickets = tickets.filter(t => {
    if (crmTicketFilters === 'all') return true;
    return t.ticket.status === crmTicketFilters;
  });

  return (
    <div className="space-y-6 font-sans text-left mt-6 bg-slate-50/50 p-6 rounded-3xl border border-sky-100">
      <div className="border-b border-sky-150/75 pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h3 className="text-lg font-black text-indigo-950 uppercase tracking-tight">🧑‍🏫 Cổng CRM & Chăm sóc học viên (Thầy Giới)</h3>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Một hệ thống quản lý tập trung hỗ trợ, tư vấn và đại sứ thành viên chất lượng cao.</p>
        </div>
        <div>
          <button
            type="button"
            onClick={handleSyncClick}
            disabled={localSyncing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 disabled:opacity-70 text-indigo-700 text-[10px] font-black uppercase rounded-xl border border-indigo-150/60 transition cursor-pointer"
          >
            <span className={`inline-block ${localSyncing ? 'animate-spin' : ''}`}>🔄</span>
            {localSyncing ? 'Đang đồng bộ...' : 'Đồng bộ tức thì'}
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-sky-100 shadow-lg p-5 rounded-3xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Tổng Đại Sứ IELTS</span>
            <span className="text-xl font-black text-indigo-900 mt-1 block">
              {students.filter(s => s.referralsCount && s.referralsCount > 0).length} thành viên
            </span>
            <span className="text-[10px] text-indigo-600 font-bold block">Tổng lượt: {students.reduce((acc, s) => acc + (s.referralsCount || 0), 0)} bạn học thử</span>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl font-bold">
            🎁
          </div>
        </div>

        <div className="bg-white border border-sky-100 shadow-lg p-5 rounded-3xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-sans">Yêu Cầu Tư Vấn Mới</span>
            <span className={`text-xl font-black mt-1 block ${activeConsultingLeads.length > 0 ? 'text-amber-600 animate-pulse' : 'text-slate-750'}`}>
              {activeConsultingLeads.length} yêu cầu
            </span>
            <span className="text-[10px] text-slate-500 font-bold block">Đăng ký qua form tư vấn lộ trình VIP</span>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-xl font-bold">
            📞
          </div>
        </div>

        <div className="bg-white border border-rose-100 shadow-lg p-5 rounded-3xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Thắc Mắc Lớp Học</span>
            <span className={`text-xl font-black mt-1 block ${activePendingTickets.length > 0 ? 'text-rose-600 animate-pulse' : 'text-slate-755'}`}>
              {activePendingTickets.length} câu hỏi mở
            </span>
            <span className="text-[10px] text-slate-500 font-bold block">Gồm thắc mắc bài tập & Zoom</span>
          </div>
          <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center text-xl font-bold">
            💬
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Leads for Course consulting */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-sky-100 shadow-xl p-5 sm:p-6 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-extrabold text-indigo-950 text-xs sm:text-sm flex items-center gap-1.5 uppercase tracking-wider">
                  📞 Hotline Leads & Tư Vấn Lộ Trình VIP ({leads.length})
                </h4>
                <p className="text-[11px] text-slate-500 font-semibold">Thông tin con em hoặc học viên cần liên hệ</p>
              </div>

              {/* CRM filter */}
              <select
                value={crmStatusFilters}
                onChange={(e: any) => setCrmStatusFilters(e.target.value)}
                className="p-1 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase text-indigo-900 focus:outline-none"
              >
                <option value="all">Tất cả Leads</option>
                <option value="pending">Chưa Chăm Sóc (Pending)</option>
                <option value="contacted">Đã Liên Hệ (Completed)</option>
              </select>
            </div>

            {filteredLeads.length === 0 ? (
              <div className="text-center py-10 text-slate-400">
                <span className="text-3xl block">📭</span>
                <p className="text-xs font-bold mt-2">Không có yêu cầu phù hợp bộ lọc.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
                {filteredLeads.map(l => {
                  if (crmNotes[l.username] === undefined) {
                    crmNotes[l.username] = l.consultingNote || '';
                  }
                  return (
                    <div key={l.username} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3 relative text-xs">
                      <div className="flex justify-between items-start">
                        <div>
                          <strong className="text-xs font-black text-indigo-950 block">{l.fullName || l.username}</strong>
                          <span className="text-[10px] text-slate-500 font-mono font-bold block">SĐT: {l.phoneNumber || 'Không dùng'}</span>
                        </div>
                        <span className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-wider rounded ${
                          l.consultingStatus === 'pending' ? 'bg-amber-100 text-amber-800' : 
                          l.consultingStatus === 'contacted' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-105 text-slate-805'
                        }`}>
                          {l.consultingStatus === 'pending' ? 'Chưa tư vấn' : 
                           l.consultingStatus === 'contacted' ? 'Đã gút khóa' : 'none'}
                        </span>
                      </div>

                      {/* Ghi chú hiện hành */}
                      <div className="text-[11px] font-semibold text-slate-700 bg-white p-2.5 rounded-xl border border-slate-150/60 leading-relaxed whitespace-pre-wrap">
                        {l.consultingNote || 'Chưa ghi chú quá trình trao đổi'}
                      </div>

                      {/* Cập nhật notes và status */}
                      <div className="space-y-2 pt-1 border-t border-slate-150/50">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[8px] font-black uppercase text-slate-400 mb-0.5">Trạng thái mới</label>
                            <select
                              defaultValue={l.consultingStatus || 'none'}
                              id={`status-select-${l.username}`}
                              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold focus:outline-none focus:border-indigo-500"
                            >
                              <option value="none">Huỷ theo dõi (None)</option>
                              <option value="pending">Phải Chăm Sóc (Pending)</option>
                              <option value="contacted">Đã Chăm Sóc Đầy Đủ (Contacted)</option>
                            </select>
                          </div>

                          <div className="flex items-end justify-end">
                            <button
                              onClick={() => {
                                const selectEl = document.getElementById(`status-select-${l.username}`) as HTMLSelectElement;
                                handleSaveConsultation(l.username, selectEl ? selectEl.value : 'none');
                              }}
                              disabled={updatingConsult[l.username]}
                              className="w-full py-2 bg-indigo-600 hover:bg-slate-900 text-white font-black text-[10px] rounded-lg cursor-pointer duration-150 shadow-sm"
                            >
                              {updatingConsult[l.username] ? 'Đang lưu...' : 'Lưu cập nhật'}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[8px] font-black uppercase text-slate-400 mb-0.5">Bổ sung nội dung trao đổi/chăm sóc mới</label>
                          <textarea
                            value={crmNotes[l.username]}
                            onChange={(e) => setCrmNotes({ ...crmNotes, [l.username]: e.target.value })}
                            placeholder="Ghi thêm thông tin (ví dụ: 'Đã hẹn gọi điện lại tối thứ 6'...)"
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs leading-normal"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Support Tickets and replies board */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-sky-100 shadow-xl p-5 sm:p-6 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-extrabold text-indigo-950 text-xs sm:text-sm flex items-center gap-1.5 uppercase tracking-wider">
                  💬 Hỗ Trợ Giải Đáp Kiến Thức ({tickets.length})
                </h4>
                <p className="text-[11px] text-slate-500 font-semibold">Tài khoản hỏi bài tập & thắc mắc Zoom tự động</p>
              </div>

              <select
                value={crmTicketFilters}
                onChange={(e: any) => setCrmTicketFilters(e.target.value)}
                className="p-1 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black uppercase text-indigo-900 focus:outline-none"
              >
                <option value="all">Tất cả câu hỏi</option>
                <option value="pending">Chờ Trả Lời (Pending)</option>
                <option value="replied">Đã Hoàn Thành (Replied)</option>
              </select>
            </div>

            {filteredTickets.length === 0 ? (
              <div className="text-center py-10 text-slate-400">
                <span className="text-3xl block">🎉</span>
                <p className="text-xs font-bold mt-2">Không còn câu hỏi hỗ trợ nào cần phản hồi.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
                {filteredTickets.map(item => {
                  const t = item.ticket;
                  if (crmReplies[t.id] === undefined) {
                    crmReplies[t.id] = t.reply || '';
                  }
                  return (
                    <div key={t.id} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3 relative text-xs text-left">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[8px] font-black uppercase rounded tracking-wider mr-1.5">{t.topic}</span>
                          <strong className="text-xs font-black text-indigo-950">{item.studentName} ({item.studentUsername})</strong>
                        </div>
                        <span className={`text-[8px] font-black uppercase tracking-wider rounded px-2 py-0.5 ${
                          t.status === 'pending' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {t.status === 'pending' ? 'Cần giải bài' : 'Đã phản hồi'}
                        </span>
                      </div>

                      <div className="text-xs font-semibold text-slate-700 bg-white p-3 rounded-xl border border-slate-150">
                        <strong>Nội dung:</strong> {t.content}
                      </div>

                      {/* AI auto reply suggestion draft to make grading/care super fast! */}
                      {t.aiReply && (
                        <div className="text-[10px] text-slate-500 bg-slate-100/50 p-2.5 rounded-xl border border-slate-150 flex gap-1.5 leading-normal">
                          <span className="text-xs">🤖</span>
                          <div>
                            <strong className="block text-[8px] uppercase font-black text-slate-500 mb-0.5">Dự thảo từ Trợ lý ảo (AI)</strong>
                            <p className="italic">{t.aiReply}</p>
                          </div>
                        </div>
                      )}

                      {/* Phản hồi hiện tại */}
                      {t.status === 'replied' && t.reply && (
                        <div className="p-2.5 bg-emerald-50 border border-emerald-150 rounded-xl text-emerald-800 text-xs leading-normal">
                          <strong className="block text-[8px] uppercase font-black text-emerald-950 mb-1">Lời giải của bạn trước đó</strong>
                          <p className="font-bold">{t.reply}</p>
                        </div>
                      )}

                      {/* Reply Form */}
                      <div className="space-y-2 pt-2 border-t border-slate-150/50">
                        <div>
                          <label className="block text-[8px] font-black uppercase text-slate-400 mb-0.5">Nhập lời giải đáp từ Thầy Giới</label>
                          <textarea
                            value={crmReplies[t.id]}
                            onChange={(e) => setCrmReplies({ ...crmReplies, [t.id]: e.target.value })}
                            placeholder="Ghi giải thích chi tiết, hoặc bổ trợ mẹo dịch thuật ngữ pháp..."
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs leading-normal"
                            rows={3}
                          />
                        </div>

                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => handleReplyTicket(item.studentUsername, t.id)}
                            disabled={submittingReply[t.id]}
                            className="px-4 py-2 bg-indigo-600 hover:bg-slate-900 text-white font-black text-[10px] rounded-lg cursor-pointer duration-150 shadow-md shadow-indigo-100"
                          >
                            {submittingReply[t.id] ? 'Đang gửi...' : 'Gửi phản hồi chính thức'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
