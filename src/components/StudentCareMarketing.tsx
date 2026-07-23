import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, Gift, Share2, Megaphone, PhoneCall, Sparkles, 
  Clock, Check, Copy, Send, CheckCircle, HelpCircle, ArrowRight,
  User, Award, Zap, Bell, Shield, Coins, Smartphone, FileCheck, CheckSquare, RefreshCw
} from 'lucide-react';

interface SupportTicket {
  id: string;
  topic: string;
  content: string;
  createdAt: string;
  status: 'pending' | 'replied';
  reply?: string;
  aiReply?: string;
}

interface StudentCareMarketingProps {
  studentUsername: string;
  studentFullName: string;
}

export default function StudentCareMarketing({ studentUsername, studentFullName }: StudentCareMarketingProps) {
  // Global & tab states
  const [activeSegment, setActiveSegment] = useState<'child' | 'student' | 'adult'>('student');
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newTopic, setNewTopic] = useState('Bài Tập');
  const [submittingQuestion, setSubmittingQuestion] = useState(false);
  const [messageToast, setMessageToast] = useState<string | null>(null);

  // Marketing referral & consultation state
  const [referralsCount, setReferralsCount] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [consultingStatus, setConsultingStatus] = useState<'none' | 'pending' | 'contacted'>('none');
  const [consultingNote, setConsultingNote] = useState('');
  const [submittingConsult, setSubmittingConsult] = useState(false);
  const [consultPhone, setConsultPhone] = useState('');
  const [consultGoal, setConsultGoal] = useState('');

  // Gamification coins system
  const [userCoins, setUserCoins] = useState(() => {
    return Number(localStorage.getItem(`coins_${studentUsername}`) || '150');
  });

  // Certificate state
  const [certName, setCertName] = useState(studentFullName);
  const [certBand, setCertBand] = useState('7.5');
  const [showCertificate, setShowCertificate] = useState(false);

  // Installment dynamic calculator
  const [selectedCoursePrice, setSelectedCoursePrice] = useState(12000000); // 12M VND default
  const [installmentTerm, setInstallmentTerm] = useState(6); // 6 months

  // Homework helper state
  const [homeworkInput, setHomeworkInput] = useState('');
  const [aiHelperReply, setAiHelperReply] = useState('');
  const [isAiHelping, setIsAiHelping] = useState(false);

  // Adults: Date pausing picker
  const [freezeStartDate, setFreezeStartDate] = useState('');
  const [freezeEndDate, setFreezeEndDate] = useState('');
  const [isFreezeSubmitted, setIsFreezeSubmitted] = useState(false);

  const [isSyncing, setIsSyncing] = useState(false);

  // Fetch current user marketing & care status (with silent mode for polling)
  useEffect(() => {
    fetchProfileData(false);
  }, [studentUsername]);

  // Poll for replies & updates every 8 seconds silently
  useEffect(() => {
    const timer = setInterval(() => {
      fetchProfileData(true);
    }, 8000);
    return () => clearInterval(timer);
  }, [studentUsername]);

  const fetchProfileData = async (silent = false) => {
    if (!silent) setIsSyncing(true);
    try {
      const response = await fetch(`/api/student/care-data?username=${studentUsername}`);
      if (response.ok) {
        const data = await response.json();
        setTickets(data.supportTickets || []);
        setReferralsCount(data.referralsCount || 0);
        setReferralCode(data.referralCode || `GIOI_IELTS_${studentUsername.toUpperCase()}`);
        setConsultingStatus(data.consultingStatus || 'none');
        setConsultingNote(data.consultingNote || '');
        if (data.phoneNumber) {
          setConsultPhone(data.phoneNumber);
        }
      } else {
        setReferralCode(`GIOI_IELTS_${studentUsername.toUpperCase()}`);
      }
    } catch (err) {
      console.error("Error fetching student care data:", err);
      setReferralCode(`GIOI_IELTS_${studentUsername.toUpperCase()}`);
    } finally {
      if (!silent) setIsSyncing(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    showToast("Đã sao chép mã coupon giảm giá 10% thành công!");
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/?ref=${referralCode}`;
    navigator.clipboard.writeText(shareUrl);
    showToast("Đã sao chép liên kết đại sứ chính chủ + học bổng!");
  };

  const showToast = (msg: string) => {
    setMessageToast(msg);
    setTimeout(() => setMessageToast(null), 3000);
  };

  // Submit course consultation
  const handleRegisterConsultation = async (courseName: string, customGoal?: string) => {
    if (!consultPhone.trim()) {
      alert("Vui lòng nhập số điện thoại để Thầy Giới và chuyên viên liên hệ giải đáp lập tức!");
      return;
    }
    setSubmittingConsult(true);
    try {
      const res = await fetch('/api/student/consult-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: studentUsername,
          phone: consultPhone,
          learningGoal: customGoal || consultGoal || `Tư vấn khóa học cao cấp ${courseName}`,
          courseName: courseName
        })
      });
      if (res.ok) {
        setConsultingStatus('pending');
        showToast("Đăng ký thành công! Đội ngũ Giáo vụ & Thầy Giới sẽ liên kết Zalo hỗ trợ bạn.");
        fetchProfileData();
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingConsult(false);
    }
  };

  // Submit help ticket
  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    setSubmittingQuestion(true);
    try {
      const res = await fetch('/api/student/support-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: studentUsername,
          topic: newTopic,
          content: newQuestion
        })
      });

      if (res.ok) {
        setNewQuestion('');
        showToast("Yêu cầu gửi thành công! Trợ lý AI đang phân tích bài học...");
        fetchProfileData();
        // Award some coin bonus for posting questions
        const bonus = userCoins + 10;
        setUserCoins(bonus);
        localStorage.setItem(`coins_${studentUsername}`, bonus.toString());
      } else {
        alert("Gửi hỗ trợ thất bại, vui lòng thử lại.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingQuestion(false);
    }
  };

  // Buy item with coins
  const handleBuyItem = (itemName: string, coinCost: number) => {
    if (userCoins < coinCost) {
      alert(`Bạn cần thêm ${coinCost - userCoins} Coin để đổi món quà này. Hãy điểm danh mỗi ngày và làm bài tập để tích lũy thêm Coin nhé!`);
      return;
    }
    const remaining = userCoins - coinCost;
    setUserCoins(remaining);
    localStorage.setItem(`coins_${studentUsername}`, remaining.toString());
    showToast(`Đổi quà "${itemName}" thành công! Hệ thống đã ghi nhận yêu cầu gửi quà.`);
  };

  // AI Homework Helper Simulator
  const handleAskAiHelper = async () => {
    if (!homeworkInput.trim()) return;
    setIsAiHelping(true);
    setAiHelperReply("Đang đọc và phân tích cấu trúc cú pháp của câu hỏi...");
    try {
      const response = await fetch('/api/student/support-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: studentUsername,
          topic: 'Bài Tập',
          content: `CẦN PHÂN TÍCH NHANH: ${homeworkInput}`
        })
      });
      if (response.ok) {
        const data = await response.json();
        setAiHelperReply(data.ticket?.aiReply || "Không thể phân giải lời đáp.");
        fetchProfileData();
      } else {
        setAiHelperReply("Trợ lý bận, vui lòng thử lại.");
      }
    } catch (err) {
      setAiHelperReply("Lỗi hệ thống.");
    } finally {
      setIsAiHelping(false);
    }
  };

  const installmentMonthly = Math.round(selectedCoursePrice / installmentTerm);

  return (
    <div className="space-y-8 font-sans text-left" id="student-care-marketing-dashboard">
      
      {/* Toast Alert */}
      {messageToast && (
        <div className="fixed bottom-5 right-5 bg-indigo-900 border border-indigo-700 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-bold z-50 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>{messageToast}</span>
        </div>
      )}

      {/* Hero Banner for Student Care */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 overflow-hidden shadow-xl border border-indigo-950/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-2xl -z-10"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Đồng hành 24/7 từ Thầy Giới
            </div>
            <h2 className="text-xl sm:text-3xl font-black font-display tracking-tight leading-tight">
              Trung Tâm Chăm Sóc Độc Quyền & Ưu Đãi Đại Sứ
            </h2>
            <p className="text-indigo-200/80 text-xs sm:text-sm leading-relaxed font-semibold">
              Chào <strong className="text-white">{studentFullName}</strong>. Nơi bạn được giải quyết thắc mắc bài học tức thì bằng Trợ lý AI, nhận phản hồi trực tiếp từ Thầy Giới, quản lý coin đổi quà hấp dẫn và kết nối giáo vụ hỗ trợ sự cố Zoom/LMS 24/7.
            </p>
          </div>
          
          {/* Real-time Coins Widget */}
          <div className="bg-amber-400/10 border border-amber-400/30 p-4 rounded-2xl flex items-center gap-3 shrink-0 backdrop-blur">
            <div className="p-3 bg-amber-400 rounded-xl text-indigo-950">
              <Coins className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="block text-[10px] font-bold text-amber-300 uppercase tracking-wider">Xu tích lũy (Coins)</span>
              <span className="text-xl font-black text-amber-400 font-mono">{userCoins} xu</span>
            </div>
          </div>
        </div>
      </div>

      {/* SEGMENT INDIVIDUALIZED EXPERIENCE */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-black text-indigo-950 uppercase tracking-wider flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" /> 🧩 Phân Hoá Trải Nghiệm Lớp Học Theo Đối Tượng
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-1">Chọn nhóm tuổi của bạn hoặc con em bạn để kích hoạt tiện ích & quy trình hỗ trợ đi kèm</p>
          </div>

          {/* Segment selection buttons */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/40 gap-1 self-start sm:self-center">
            <button
              onClick={() => setActiveSegment('child')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activeSegment === 'child' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-indigo-900'
              }`}
            >
              Trẻ em (Dưới 12)
            </button>
            <button
              onClick={() => setActiveSegment('student')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activeSegment === 'student' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-indigo-900'
              }`}
            >
              Học sinh/Sinh viên (13-22)
            </button>
            <button
              onClick={() => setActiveSegment('adult')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activeSegment === 'adult' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-indigo-900'
              }`}
            >
              Người đi làm (&gt; 22)
            </button>
          </div>
        </div>

        {/* Selected Segment Details Display */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50/50 p-4 sm:p-5 rounded-2xl border border-slate-200/30">
          <div className="md:col-span-4 space-y-4 border-r border-slate-250/50 pr-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-black tracking-widest text-indigo-600">Đối tượng chăm sóc chính</span>
              <h4 className="text-base font-bold text-indigo-950">
                {activeSegment === 'child' && "Phụ huynh của bé (Dưới 12 tuổi)"}
                {activeSegment === 'student' && "Học sinh & Phụ huynh đồng quyết định"}
                {activeSegment === 'adult' && "Học viên tự chủ và bận rộn"}
              </h4>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Đặc đặc điểm chăm sóc</span>
              <ul className="space-y-2 text-xs font-semibold text-slate-600">
                {activeSegment === 'child' && (
                  <>
                    <li className="flex gap-2 items-start text-indigo-950 bg-indigo-50/50 p-2 rounded-lg">
                      <span className="text-indigo-600 font-bold">🎬 Video báo cáo:</span> Gửi video cắt cụ thể từ buổi học của con cho phụ huynh hàng tuần.
                    </li>
                    <li className="flex gap-2 items-start text-emerald-950 bg-emerald-50/40 p-2 rounded-lg">
                      <span className="text-emerald-600 font-bold">📞 Gọi điện hỗ trợ:</span> Chuyên viên chăm sóc gọi điện trao đổi trực quan về lộ trình học 1 tuần/lần.
                    </li>
                    <li className="flex gap-2 items-start text-amber-950 bg-amber-50/40 p-2 rounded-lg">
                      <span className="text-amber-600 font-bold">🏆 Cúp thi đua:</span> Trò chơi hóa (Gamification) phong phú, tạo động lực cho các con ham học.
                    </li>
                  </>
                )}
                {activeSegment === 'student' && (
                  <>
                    <li className="flex gap-2 items-start text-indigo-950 bg-indigo-50/50 p-2 rounded-lg">
                      <span className="text-indigo-600 font-bold">📋 Giáo trình thực tế:</span> Bám sát cấu trúc đề thi IELTS thực chiến & đề thi THPT Quốc Gia mới nhất.
                    </li>
                    <li className="flex gap-2 items-start text-emerald-950 bg-emerald-50/40 p-2 rounded-lg">
                      <span className="text-emerald-600 font-bold">⏰ SMS / Zalo cụ thể:</span> Tự động nhắn tin nhắc lịch học siêu tiện ích trước 30 phút.
                    </li>
                    <li className="flex gap-2 items-start text-amber-950 bg-amber-50/40 p-2 rounded-lg">
                      <span className="text-amber-600 font-bold">💬 Chatbot giải bài 24/7:</span> Trợ lý AI đặc hiệu, hướng dẫn lời giải bài tập ngữ pháp 24 giờ.
                    </li>
                  </>
                )}
                {activeSegment === 'adult' && (
                  <>
                    <li className="flex gap-2 items-start text-indigo-950 bg-indigo-50/50 p-2 rounded-lg">
                      <span className="text-indigo-600 font-bold">🔒 Bảo lưu khóa học:</span> Hỗ trợ bảo lưu, dời lịch linh động khi đi công tác dài ngày.
                    </li>
                    <li className="flex gap-2 items-start text-emerald-950 bg-emerald-50/40 p-2 rounded-lg">
                      <span className="text-emerald-600 font-bold">🔇 Tránh làm phiền:</span> Ưu tiên nhắn tin lịch sự qua Zalo, tuyệt đối không làm phiền bằng cuộc gọi ngoài giờ hành chính.
                    </li>
                    <li className="flex gap-2 items-start text-amber-950 bg-amber-50/40 p-2 rounded-lg">
                      <span className="text-amber-600 font-bold">✉️ Tính ứng dụng cao:</span> Tập trung bài học Viết Email hành chính, hội thoại giao tiếp công sở thực tế.
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Interactive Feature for each audience */}
          <div className="md:col-span-8 space-y-4">
            <span className="text-[10px] uppercase font-black tracking-widest text-indigo-600 block">Trải nghiệm tương tác công nghệ</span>
            
            {activeSegment === 'child' && (
              <div className="space-y-4 bg-white p-4 rounded-xl border border-indigo-100">
                <div className="flex justify-between items-center bg-indigo-950/5 p-3 rounded-lg border border-indigo-100/55">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🧸</span>
                    <div>
                      <p className="text-xs font-black text-indigo-950">Góc Phụ Huynh Theo Dõi Con Em</p>
                      <p className="text-[10px] text-slate-500 font-semibold">Tải báo cáo video tương tác buổi học & trao đổi</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert("Đang chuẩn bị file clip lớp học gần nhất (15 phút) của bé... Liên kết Zalo đã thiết lập!")}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-black rounded-lg cursor-pointer transition duration-150"
                  >
                    Tải Video Buổi Học
                  </button>
                </div>

                {/* Trophy track */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-3 border border-slate-150 rounded-xl text-center bg-yellow-50/10">
                    <span className="text-2xl block">🥇</span>
                    <strong className="text-[10px] text-indigo-950 block mt-1">Cúp Chăm Chỉ</strong>
                    <span className="text-[9px] text-emerald-600 font-bold">Hộc đều 7 ngày</span>
                  </div>
                  <div className="p-3 border border-slate-150 rounded-xl text-center">
                    <span className="text-2xl block">🥈</span>
                    <strong className="text-[10px] text-indigo-950 block mt-1">Cúp Luyện Âm</strong>
                    <span className="text-[9px] text-slate-400 font-bold">Chưa mở khoá</span>
                  </div>
                  <div className="p-3 border border-slate-150 rounded-xl text-center">
                    <span className="text-2xl block">🥉</span>
                    <strong className="text-[10px] text-indigo-950 block mt-1">Cúp Từ Vựng</strong>
                    <span className="text-[9px] text-slate-400 font-bold">Chưa mở khoá</span>
                  </div>
                  <div className="p-3 border border-slate-150 rounded-xl text-center">
                    <span className="text-2xl block">👑</span>
                    <strong className="text-[10px] text-indigo-950 block mt-1">Quán Quân Việt</strong>
                    <span className="text-[9px] text-slate-400 font-bold">Học hết 6 chặng</span>
                  </div>
                </div>
              </div>
            )}

            {activeSegment === 'student' && (
              <div className="space-y-4 bg-white p-4 rounded-xl border border-indigo-100">
                <div className="space-y-1">
                  <span className="text-xs font-black text-indigo-950 uppercase tracking-widest flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-indigo-500 fill-indigo-100" /> Trợ Lý AI Giải Bài 24/7 (AI Homework Assistant)
                  </span>
                  <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">Dành cho học sinh bận rộn cần giải bài tập gấp hoặc thắc mắc ngữ pháp, cấu trúc mẫu câu.</p>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Dán câu hỏi tiếng Anh của bạn tại đây..."
                    value={homeworkInput}
                    onChange={(e) => setHomeworkInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleAskAiHelper}
                    disabled={isAiHelping}
                    className="px-4 py-2 bg-indigo-600 hover:bg-slate-900 text-white font-black text-xs rounded-xl cursor-pointer flex items-center gap-1 duration-150"
                  >
                    {isAiHelping ? "Đang xử lý..." : "Hỏi AI"}
                  </button>
                </div>

                {aiHelperReply && (
                  <div className="p-3 bg-indigo-50/40 rounded-xl border border-indigo-100/50 text-[11px] font-semibold text-indigo-950 leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
                    {aiHelperReply}
                  </div>
                )}
              </div>
            )}

            {activeSegment === 'adult' && (
              <div className="space-y-4 bg-white p-4 rounded-xl border border-indigo-100 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="text-xs font-black text-indigo-950">Góc Xin Phép & Đăng Ký Tạm Dừng/Bảo Lưu</h5>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Yêu cầu bảo lưu không mất phí, chuyên viên sẽ tự điều phối kế hoạch học tiếp.</p>
                  </div>
                  <span className="px-2 py-0.5 bg-indigo-100/30 text-indigo-700 text-[9px] font-black uppercase rounded tracking-wider">
                    Miễn phí
                  </span>
                </div>

                {isFreezeSubmitted ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-150 text-emerald-800 text-xs font-bold rounded-xl">
                    Đã lưu yêu cầu của bạn! Giáo vụ đã tạm dừng tiến trình học của bạn từ {freezeStartDate} đến {freezeEndDate} để bạn an tâm đi công tác.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Ngày bắt đầu nghỉ</label>
                      <input 
                        type="date"
                        value={freezeStartDate}
                        onChange={(e) => setFreezeStartDate(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Ngày mở lại học</label>
                      <input 
                        type="date"
                        value={freezeEndDate}
                        onChange={(e) => setFreezeEndDate(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="sm:col-span-2 flex justify-end">
                      <button
                        onClick={() => {
                          if (!freezeStartDate || !freezeEndDate) {
                            alert("Vui lòng chọn thời gian nghỉ cụ thể!");
                            return;
                          }
                          setIsFreezeSubmitted(true);
                        }}
                        className="px-4 py-2 bg-indigo-600 hover:bg-slate-900 text-white font-black text-xs rounded-xl cursor-pointer duration-150"
                      >
                        Xác Nhận Đăng Ký Bảo Lưu
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* CORE STUDENT SUPPORT & CRM AUTOMATION LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Support Question & Ticket Resolution */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Support Ticket Submission */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/25">
            <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-indigo-600" /> Đặt Câu Hỏi Thắc Mắc & Nhận Trợ Giúp Từ Thầy Giới
            </h3>
            
            <form onSubmit={handleSubmitQuestion} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Phân loại câu hỏi</label>
                  <select 
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full px-3.5 py-2 px-3.5 bg-slate-50 border border-slate-150 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Bài Tập">Thắc mắc Bài Tập Về Nhà</option>
                    <option value="Lộ Trình">Tư vấn Lộ trình học VIP</option>
                    <option value="Ngữ Pháp">Thảo luận Ngữ pháp & Từ vựng</option>
                    <option value="Tài Liệu">Đăng ký Ebooks & Tài liệu IELTS</option>
                    <option value="Khác">Phản ánh dịch vụ lớp học</option>
                  </select>
                </div>
                
                <div className="flex items-end text-slate-500 text-[10px] font-semibold pb-2">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
                    Hệ thống sẽ chạy Trợ lý AI và gửi trực tiếp cho Thầy Giới!
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Nội dung thắc mắc chi tiết</label>
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Hãy đặt câu hỏi rõ ràng (ví dụ: 'Thầy ơi, cấu trúc Avoid + V-ing hay to-V thế ạ? Em đang băn khoăn về bài viết mới chấm'...)"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-150 rounded-2xl text-xs sm:text-sm font-semibold focus:outline-none focus:border-indigo-500 placeholder:text-slate-400/80 leading-relaxed"
                ></textarea>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={submittingQuestion}
                  className="px-6 py-3 bg-indigo-600 hover:bg-slate-900 duration-150 text-white text-xs sm:text-sm font-black rounded-xl cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-100"
                >
                  {submittingQuestion ? (
                    <>Đang Gửi Đi...</>
                  ) : (
                    <>
                      Gửi Yêu Cầu Hỗ Trợ <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Ticket Listing with AI Instant replies & real responses */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-sky-100 shadow-xl shadow-indigo-100/25 space-y-4">
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
              <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" /> Lịch sử yêu cầu hỗ trợ ({tickets.length})
              </h3>
              <button
                type="button"
                onClick={() => fetchProfileData(false)}
                disabled={isSyncing}
                title="Yêu cầu hệ thống đồng bộ và kiểm tra phản hồi tức thì"
                className="text-[9px] text-indigo-600 hover:text-indigo-800 font-bold uppercase tracking-wider font-mono flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg duration-150 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-2.5 h-2.5 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ tức thì'}
              </button>
            </div>

            {tickets.length === 0 ? (
              <div className="text-center py-10 text-slate-400 space-y-2">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" strokeWidth={1.5} />
                <p className="text-xs font-semibold">Hiện chưa gửi phản hồi nào.</p>
                <p className="text-[10px] text-slate-400 font-medium">Đặt câu hỏi đầu tiên bên trên để kiểm tra tốc độ phản hồi của AI nhé!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                {tickets.slice().reverse().map((t) => (
                  <div key={t.id} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-[9px] font-black uppercase rounded-md tracking-wider">
                        {t.topic}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono font-bold">
                        {new Date(t.createdAt).toLocaleString('vi-VN')}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-700 bg-white/70 p-3 rounded-xl border border-slate-100">
                      <strong>Câu hỏi: </strong> {t.content}
                    </div>

                    {/* AI Advisor Response */}
                    {t.aiReply && (
                      <div className="text-xs font-semibold text-indigo-900 bg-slate-100 p-3 rounded-xl border border-slate-200 flex gap-2 leading-relaxed">
                        <span className="text-sm shrink-0">🤖</span>
                        <div>
                          <strong className="text-indigo-950 block text-[10px] uppercase font-black tracking-wider mb-1">
                            Trợ lý ảo giáo lý tự động
                          </strong>
                          <span className="whitespace-pre-wrap">{t.aiReply}</span>
                        </div>
                      </div>
                    )}

                    {/* Real Teacher Response */}
                    {t.status === 'replied' && t.reply ? (
                      <div className="p-3 bg-emerald-50 border border-emerald-150 text-emerald-800 text-xs rounded-xl flex gap-2.5 leading-relaxed">
                        <span className="text-sm shrink-0">🧑‍🏫</span>
                        <div>
                          <strong className="text-emerald-950 block text-[10px] uppercase font-black tracking-wider mb-1">
                            Giải đáp chính thức từ Thầy Giới
                          </strong>
                          <p className="whitespace-pre-wrap font-bold">{t.reply}</p>
                          <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-wider rounded">
                            Thầy Giới đã xác nhận & Đóng câu hỏi
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[10px] text-amber-600 font-black italic pt-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                        Đã chuyển tiếp thắc mắc lên hòm thư trực tiếp của Thầy Giới duyệt bài...
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CRM AUTOMATED INFRASTRUCTURE MONITOR */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-sky-100 shadow-xl space-y-4">
            <h4 className="text-xs font-black text-indigo-950 uppercase tracking-widest flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-600" /> ⚙️ Giám Sát CRM Vận Hành Lớp Học Tự Động
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                  LMS Hoạt Động
                </span>
                <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">Học viên đăng nhập xem lại video bài giảng lưu trữ và tự tra cứu bài.</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                <span className="text-indigo-600 font-bold text-xs flex items-center gap-1">
                  💬 Zalo SMS Active
                </span>
                <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">Gửi thông báo lịch học trước 30m; tự động chúc mừng sinh nhật hàng năm.</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                <span className="text-amber-600 font-bold text-xs flex items-center gap-1">
                  🧑‍✈️ Giáo Vụ Online
                </span>
                <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">Đội Giáo Vụ kết nối Bản xứ - Học viên. Xử lý lỗi Zoom hỏng, mất kết nối mạng tức thì.</p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Referral system, Special Deals & Digital Certificate generator */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Ambassador Program & Referral Code Card */}
          <div className="bg-gradient-to-br from-indigo-50 via-white to-white p-5 sm:p-6 rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-100/10 space-y-4">
            <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
              <Gift className="w-5 h-5 text-indigo-600" /> Chương Trình Đại Sứ Nhận Thưởng 500k
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Hãy giới thiệu người thân, bạn bè đăng ký học thử miễn phí. Khi bạn bè hoàn thành thủ tục đăng ký, bạn nhận ngay <strong>500.000đ tiền mặt</strong> (hoặc giảm trừ trực tiếp học phí), đồng thời bạn bè được <strong>giảm ngay 10% học phí</strong> trọn gói!
            </p>

            {/* Action Box to copy Coupon */}
            <div className="bg-indigo-950/5 p-4 rounded-2xl border border-indigo-100 space-y-3">
              <div>
                <span className="block text-[9px] font-black uppercase text-indigo-900/60 mb-0.5">Mã coupon giới thiệu của bạn</span>
                <div className="flex gap-2">
                  <div className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 font-mono text-xs sm:text-sm text-indigo-950 font-black flex items-center justify-between">
                    <span>{referralCode}</span>
                    <button 
                      onClick={handleCopyCode} 
                      className="text-indigo-600 hover:text-indigo-800 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <span className="block text-[9px] font-black uppercase text-indigo-900/60 mb-0.5">Link giới thiệu nhanh (Nhận ưu đãi 20% học bổng gia đình)</span>
                <button 
                  onClick={handleCopyLink}
                  className="w-full py-2 bg-indigo-600 hover:bg-slate-900 duration-150 text-white rounded-xl text-xs font-black shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" /> Sao chép link tặng học phí 10%
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs font-bold text-slate-600 pt-1">
              <span>Đại sứ thành viên: <strong className="text-indigo-600">{studentFullName}</strong></span>
              <span>Đã giới thiệu: <strong className="text-emerald-600 text-sm">{referralsCount} bạn</strong></span>
            </div>
          </div>

          {/* Special Marketing Funnel (Promo and Easy installment) */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-sky-100 shadow-xl space-y-5">
            <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-indigo-600" /> 🎁 Gói Trả Góp 0% Lãi Suất & Ưu Đãi Phễu Tuyển Sinh
            </h3>

            {/* Special Incentives */}
            <div className="space-y-3">
              <div className="p-3 bg-amber-50/40 border border-amber-200 rounded-2xl space-y-1">
                <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" /> Học Bổng Gia Đình (Family Promo)
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">Giảm thêm <strong>trực tiếp 20% học phí</strong> khi có thành viên thứ hai trong gia đình học (ví dụ: mẹ & con cùng đăng ký).</p>
              </div>

              <div className="p-3 bg-purple-50/40 border border-purple-205 rounded-2xl space-y-1">
                <p className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                  🛡️ Tài Khoản Đồng Hành (Shared Account)
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">Gói đăng ký Premium cho phép bố mẹ và con em có thể học chung trên nhiều thiết bị không giới hạn.</p>
              </div>

              {/* Installment calculator */}
              <div className="p-4 bg-slate-50 border border-slate-205 rounded-2xl space-y-3">
                <p className="text-xs font-black text-indigo-950 uppercase tracking-wide">Công cụ mô phỏng trả góp 0% điện tử</p>
                <p className="text-[10px] text-slate-500 font-medium">Hỗ trợ thanh toán nhanh bằng ví Momo, ShopeePay hoặc Thẻ tín dụng.</p>
                
                <div className="space-y-2">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-0.5">Chọn giá trị khoá học</label>
                    <select
                      value={selectedCoursePrice}
                      onChange={(e) => setSelectedCoursePrice(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                    >
                      <option value={6000000}>Khóa Chữa Đề IELTS Cấp Tốc (6.000.000đ)</option>
                      <option value={12000000}>Lộ trình IELTS Cam Kết Đầu Ra A1-C1 (12.000.000đ)</option>
                      <option value={18000000}>Khóa 1 Kèm 1 Giáo Viên Bản Xứ Đặc Trưng (18.000.000đ)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-0.5">Kỳ hạn trả góp</label>
                      <select
                        value={installmentTerm}
                        onChange={(e) => setInstallmentTerm(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                      >
                        <option value={3}>3 tháng</option>
                        <option value={6}>6 tháng</option>
                        <option value={12}>12 tháng</option>
                      </select>
                    </div>

                    <div className="flex flex-col justify-end bg-indigo-50 p-2 rounded-lg border border-indigo-100 text-center">
                      <span className="text-[8px] uppercase font-bold text-slate-500 block">Thanh toán mỗi tháng</span>
                      <strong className="text-indigo-950 font-mono text-xs sm:text-sm font-black">{installmentMonthly.toLocaleString()}đ</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => alert(`Đã kích hoạt Cổng Thanh Toán Trả Góp 0% cho Kỳ hạn ${installmentTerm} tháng. Vui lòng chuẩn bị ví điện tử để tiến hành chốt đơn học!`)}
                    className="w-full py-2 bg-indigo-600 hover:bg-slate-900 duration-150 text-white rounded-xl text-xs font-black"
                  >
                    Mở Cổng Trả Góp Chốt Đơn Trực Tuyến
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE DIGITAL CERTIFICATE GENERATOR */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-sky-100 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" /> 🏆 Nhận Chứng Nhận Điện Tử IELTS Bản Đẹp
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Sau khi học viên hoàn thành xuất sắc các chặng bài tập, bạn có thể tự thiết kế và xuất chứng nhận điện tử bản đẹp có <strong>mã QR định danh bảo mật</strong> để dán lên trang tuyển dụng cá nhân!
            </p>

            {showCertificate ? (
              <div className="border border-indigo-200 rounded-2xl overflow-hidden shadow-md">
                {/* Visual beautiful certificate layout */}
                <div className="bg-slate-950 text-amber-100 p-6 text-center space-y-4 relative border-8 border-indigo-900">
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-300"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-300"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-300"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-300"></div>
                  
                  <div className="space-y-1">
                    <p className="text-[12px] font-black uppercase tracking-widest text-amber-400">DG STUDY ACADEMY</p>
                    <h4 className="text-base font-serif italic text-white">CERTIFICATE OF COMPLETION</h4>
                  </div>

                  <p className="text-[9px] text-slate-300 font-semibold italic">This digital credential is proudly presented to</p>
                  
                  <h5 className="text-lg font-black text-white hover:scale-105 duration-150 transition cursor-default tracking-wide">
                    {certName.toUpperCase()}
                  </h5>

                  <p className="text-[9px] text-slate-350 leading-relaxed max-w-sm mx-auto font-medium">
                    for having successfully completed the Intensive IELTS Prep Pathway programs curated by Senior Academic Master Thầy Giới and evaluated with a score equivalent to:
                  </p>

                  <div className="inline-block px-3 py-1 bg-amber-400 text-indigo-950 text-xs font-black tracking-wider rounded-md uppercase">
                    IELTS BAND {certBand}
                  </div>

                  <div className="flex justify-between items-end pt-2 text-[8px] text-slate-400">
                    <div className="text-left space-y-0.5">
                      <p className="font-bold text-slate-300">Date: {new Date().toLocaleDateString('vi-VN')}</p>
                      <p className="font-bold text-indigo-300">ID: DG-{studentUsername.toUpperCase()}-7721</p>
                    </div>
                    {/* Mock QR security code */}
                    <div className="bg-white p-1 rounded-sm shrink-0 shadow-lg">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=45&45&data=https://dgstudy.com/cert/DG-${studentUsername}`} 
                        alt="Security QR Code" 
                        referrerPolicy="no-referrer"
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-100 flex gap-2 justify-end">
                  <button
                    onClick={() => setShowCertificate(false)}
                    className="px-3.5 py-1.5 bg-slate-250 hover:bg-slate-305 text-slate-800 font-black text-[10px] rounded-lg cursor-pointer duration-150"
                  >
                    Thiết kế lại
                  </button>
                  <button
                    onClick={() => {
                      alert("Tải file ảnh PDF của chứng nhận hoàn thành lớp học đỉnh cao thành công! Đã kết nối định danh.");
                    }}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] rounded-lg cursor-pointer duration-150"
                  >
                    Tải Ảnh Bản Đẹp
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 space-y-3">
                <div className="space-y-2">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Tên hiển thị trên chứng nhận</label>
                    <input
                      type="text"
                      value={certName}
                      onChange={(e) => setCertName(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Điểm IELTS mong muốn khẳng định</label>
                    <select
                      value={certBand}
                      onChange={(e) => setCertBand(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                    >
                      <option value="6.5">BAND 6.5 (Tiêu chuẩn học thuật)</option>
                      <option value="7.0">BAND 7.0 (Nâng cao)</option>
                      <option value="7.5">BAND 7.5 (Chuyên nghiệp)</option>
                      <option value="8.0">BAND 8.0 (Cực hạn)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setShowCertificate(true)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-750 text-white rounded-xl text-xs font-black cursor-pointer duration-150"
                >
                  Xuất Bản Chứng Nhận Ngay 🎓
                </button>
              </div>
            )}
          </div>

          {/* COINS PHYSICAL GIFT SHOP */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-sky-100 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-indigo-950 uppercase tracking-widest flex items-center gap-1.5">
              <Coins className="w-5 h-5 text-indigo-600" /> Cửa Hàng Đổi Thưởng Coins Lớp Học
            </h3>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Dùng số Coin chuyên cần tích trữ được từ điểm danh hàng ngày và nộp bài đúng hạn để đổi những món quà tuyệt vời từ Thầy Giới:
            </p>

            <div className="space-y-2.5">
              <div className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100/50 transition">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📕</span>
                  <div>
                    <h5 className="text-[11px] font-black text-slate-800">Ebook 1000 Collocations độc quyền</h5>
                    <p className="text-[9px] text-slate-400 font-bold">Thành thạo ngay dồi dào từ Speaking</p>
                  </div>
                </div>
                <button
                  onClick={() => handleBuyItem("Ebook 1000 Collocations độc quyền", 50)}
                  className="px-2.5 py-1 bg-amber-400 hover:bg-amber-500 duration-150 text-indigo-950 text-[10px] font-black rounded-lg cursor-pointer"
                >
                  50 Xu
                </button>
              </div>

              <div className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100/50 transition">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🧸</span>
                  <div>
                    <h5 className="text-[11px] font-black text-slate-800">Gấu Bông linh vật DG Study cỡ lớn</h5>
                    <p className="text-[9px] text-slate-400 font-bold">Quà tặng vật ký cực dễ thương cho bé</p>
                  </div>
                </div>
                <button
                  onClick={() => handleBuyItem("Gấu Bông linh vật DG Study", 120)}
                  className="px-2.5 py-1 bg-amber-400 hover:bg-amber-500 duration-150 text-indigo-950 text-[10px] font-black rounded-lg cursor-pointer"
                >
                  120 Xu
                </button>
              </div>

              <div className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100/50 transition">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎫</span>
                  <div>
                    <h5 className="text-[11px] font-black text-slate-800">Voucher giảm học phí 1.000.000đ khóa sau</h5>
                    <p className="text-[9px] text-slate-400 font-bold">Thỏa mãn học tập nâng cao tương lai</p>
                  </div>
                </div>
                <button
                  onClick={() => handleBuyItem("Voucher giảm 1.000.000đ khóa mới", 200)}
                  className="px-2.5 py-1 bg-amber-400 hover:bg-amber-500 duration-150 text-indigo-950 text-[10px] font-black rounded-lg cursor-pointer"
                >
                  200 Xu
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
