export interface GrammarTopic {
  id: string;
  videoIndex?: number; // e.g. 2 for Video 2
  title: string;
  titleVi: string;
  gradeRange: string; // "Tiểu học (Lớp 1-5)" | "THCS (Lớp 6-9)" | "THPT (Lớp 10-12)"
  level: string; // "A1" | "A2" | "B1" | "B2" | "Advanced"
  category: "Tenses" | "Speech Parts" | "Sentence structures" | "Advanced";
  formula: string;
  vietnameseExplanation: string;
  usageRules: { rule: string; explanation: string; example: string }[];
  examples: { english: string; vietnamese: string; note?: string }[];
  memoryHack: string;
}

export interface IrregularVerb {
  infinitive: string;
  infinitivePhonetic?: string;
  pastSimple: string;
  pastSimplePhonetic?: string;
  pastParticiple: string;
  pastParticiplePhonetic?: string;
  meaning: string;
}

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  // --- THE ORIGINAL GRAMMAR LESSONS BY MR. JAMES ---
  {
    id: "present-simple",
    title: "Present Simple Tense",
    titleVi: "Thì Hiện Tại Đơn (Học để diễn tả thói quen & sự thật)",
    gradeRange: "Tiểu học (Lớp 1-5)",
    level: "A1",
    category: "Tenses",
    formula: "S + V(s/es)  |  S + am/is/are + Noun/Adj",
    vietnameseExplanation: "Thì hiện tại đơn được dùng để nói về những sự việc xảy ra lặp đi lặp lại hàng ngày thành thói quen, hoặc biểu thị một sự thật hiển nhiên (như mặt trời mọc hướng Đông!). Đối với học sinh, đây là xương sống của mọi giao tiếp tiếng Anh cơ bản.",
    usageRules: [
      {
        rule: "Thói quen hàng ngày",
        explanation: "Dùng để kể các việc bé hay làm hàng ngày hoặc hàng tuần.",
        example: "I brush my teeth every morning. (Bé chải răng mỗi buổi sáng.)"
      },
      {
        rule: "Sự thật hiển nhiên",
        explanation: "Những điều luôn luôn đúng trong cuộc sống.",
        example: "The sun rises in the East. (Mặt trời luôn mọc ở hướng Đông.)"
      },
      {
        rule: "Chia động từ với chủ ngữ số ít (He, She, It, Danh từ số ít)",
        explanation: "Ta phải thêm đuôi 's' hoặc 'es' vào sau động từ.",
        example: "She plays soccer after school. (Cô ấy chơi đá bóng sau giờ học.)"
      }
    ],
    examples: [
      { english: "We go to school on weekdays.", vietnamese: "Chúng tớ đi học vào các ngày trong tuần.", note: "Chủ ngữ 'We' là số nhiều nên giữ nguyên động từ 'go'." },
      { english: "My dog sleeps under the desk.", vietnamese: "Chú chó của tớ ngủ ở dưới gầm bàn.", note: "Chủ ngữ số ít 'My dog' nên động từ 'sleep' phải thêm 's' thành 'sleeps'." },
      { english: "Water freezes at 0 degrees Celsius.", vietnamese: "Nước đóng băng ở nhiệt độ 0 độ C.", note: "Đây là sự thật khoa học hiển nhiên!" }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Nhớ từ khóa 'HẰNG NGÀY' và 'SỰ THẬT'. Khi chủ ngữ là ngôi thứ ba số ít (như He/She/It hoặc tên một người đơn lẻ như Lan, John), hãy biến động từ thành 'siêu nhân' bằng cách tặng thêm mũ 'S' hoặc 'ES' nhé!"
  },
  {
    id: "present-continuous",
    title: "Present Continuous Tense",
    titleVi: "Thì Hiện Tại Tiếp Diễn (Học để nói về việc ĐANG xảy ra)",
    gradeRange: "Tiểu học (Lớp 1-5)",
    level: "A1",
    category: "Tenses",
    formula: "S + am/is/are + V-ing",
    vietnameseExplanation: "Hãy tưởng tượng bé đang nhìn ra cửa sổ và thấy trời đang mưa, hoặc bạn Lan đang viết bài. Thì này dùng để chụp lại một khoảnh khắc việc gì đó ĐANG diễn ra ngay thời điểm nói.",
    usageRules: [
      {
        rule: "Hành động đang diễn ra",
        explanation: "Xảy ra ngay tại lúc bé đang nói chuyện.",
        example: "I am learning English right now. (Tớ đang học tiếng Anh ngay bây giờ.)"
      },
      {
        rule: "Dấu hiệu nhận biết",
        explanation: "Trong câu thường có các từ khóa như: 'now', 'right now', 'at the moment', hoặc lệnh gọi chú ý như 'Listen!', 'Look!'",
        example: "Look! The cat is climbing the tree! (Nhìn kìa! Có chú mèo đang trèo cây!)"
      }
    ],
    examples: [
      { english: "Amelia is drawing a colorful picture.", vietnamese: "Amelia đang vẽ một bức tranh rực rỡ sắc màu.", note: "Amelia là số ít đi với 'is' và động từ 'drawing'." },
      { english: "They are playing hide-and-seek in the yard.", vietnamese: "Họ đang chơi trò trốn tìm ở ngoài sân.", note: "Số nhiều 'They' đi với 'are + playing'." },
      { english: "Please be quiet, my baby sister is sleeping.", vietnamese: "Xin hãy giữ yên lặng, em gái tớ đang ngủ.", note: "Có từ ngữ gây chú ý 'Please be quiet'." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Nhớ cặp song sinh không thể tách rời: 'TO BE' (am/is/are) và đuôi 'ING'. Bỏ quên một trong hai là sai ngữ pháp bé nhé! Cứ nhắc đến chữ 'ĐANG' là phải có 'ING'."
  },
  {
    id: "comparison-equal-superlative",
    title: "Comparatives & Superlatives",
    titleVi: "Cấu Trúc So Sánh Hơn & So Sánh Nhất",
    gradeRange: "Tiểu học (Lớp 1-5)",
    level: "A2",
    category: "Sentence structures",
    formula: "So sánh hơn: Short Adj-er + than  |  more + Long Adj + than\nSo sánh nhất: the + Short Adj-est  |  the most + Long Adj",
    vietnameseExplanation: "Khi bé muốn so sánh xem chú chó của mình có to hơn chú mèo không, hay ai là người cao nhất trong cả lớp. Cấu trúc so sánh giúp bé đặt các vật lên bàn cân đo đếm rất sinh động.",
    usageRules: [
      {
        rule: "So sánh Hơn tính từ ngắn (1 âm tiết)",
        explanation: "Thêm đuôi '-er' vào sau tính từ, rồi đi kèm chữ 'than'.",
        example: "A giraffe is taller than a horse. (Hươu cao cổ thì cao hơn ngựa.)"
      },
      {
        rule: "So sánh Hơn tính từ dài (2-3 âm tiết trở lên)",
        explanation: "Thêm chữ 'more' đằng trước tính từ và 'than' đằng sau.",
        example: "Gold is more expensive than silver. (Vàng thì đắt đỏ hơn bạc.)"
      },
      {
        rule: "So sánh Nhất",
        explanation: "Tôn vinh vật vô địch số một! Thêm 'the' phía trước. Tính từ ngắn thêm đuôi '-est', tính từ dài thêm 'the most' phía trước.",
        example: "Mount Everest is the highest mountain in the world. (Đỉnh Everest là ngọn núi cao nhất thế giới.)"
      }
    ],
    examples: [
      { english: "The cheetah is faster than the lion.", vietnamese: "Báo săn thì chạy nhanh hơn sư tử.", note: "Tính từ ngắn 'fast' trở thành 'faster than'." },
      { english: "This comic book is more interesting than that textbook.", vietnamese: "Cuốn truyện tranh này thú vị hơn cuốn sách giáo khoa kia.", note: "Tính từ dài 'interesting' dùng 'more ... than'." },
      { english: "Liam is the smartest student in our classroom.", vietnamese: "Liam là học sinh thông minh nhất trong lớp chúng tớ.", note: "So sánh nhất với tính từ ngắn 'smart' -> 'the smartest'." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Đối với so sánh hơn, luôn cần có 'THAN' (nghĩa là 'hơn'). Với so sánh nhất, bé luôn phải đặt chiếc vương miện hoàng gia 'THE' trước tính từ để thể hiện sự độc tôn duy nhất nhé!"
  },
  {
    id: "past-simple",
    title: "Past Simple Tense",
    titleVi: "Thì Quá Khứ Đơn (Học để kể chuyện đã qua)",
    gradeRange: "THCS (Lớp 6-9)",
    level: "A2",
    category: "Tenses",
    formula: "S + V2/V-ed  |  S + was/were + N/Adj",
    vietnameseExplanation: "Dùng để diễn tả một hành động đã xảy ra và ĐÃ KẾT THÚC hoàn toàn trong quá khứ, không còn liên quan gì đến hiện tại nữa. Rất thích hợp khi bé viết nhật ký hoặc kể lại chuyến đi chơi hè năm ngoái.",
    usageRules: [
      {
        rule: "Động từ có quy tắc (Regular Verbs)",
        explanation: "Chỉ việc thêm đuôi '-ed' vào sau động từ nguyên mẫu.",
        example: "I watched a great movie yesterday. (Hôm qua tớ đã xem một bộ phim rất hay.)"
      },
      {
        rule: "Động từ bất quy tắc (Irregular Verbs)",
        explanation: "Bé phải học thuộc cột thứ 2 trong bảng động từ bất quy tắc (V2). Không có quy luật thêm 'ed'.",
        example: "She went to Paris last year. (Năm ngoái cô ấy đã đi du lịch tới Paris.)"
      },
      {
        rule: "Dấu hiệu thời gian",
        explanation: "Các mốc quá khứ rõ ràng như: yesterday (hôm qua), ago (trước đây), last week/year.",
        example: "We built this table three years ago. (Chúng tôi đã đóng chiếc bàn này 3 năm trước.)"
      }
    ],
    examples: [
      { english: "I bought a new book yesterday.", vietnamese: "Hôm qua tớ đã mua một cuốn sách mới.", note: "Động từ bất quy tắc 'buy' biến thành 'bought'." },
      { english: "They lived in Vietnam from 2018 to 2022.", vietnamese: "Họ đã sống ở Việt Nam từ năm 2018 đến năm 2022.", note: "Hành động sống đã hoàn toàn chấm dứt." },
      { english: "Did you finished your homework last night?", vietnamese: "Bạn đã làm xong bài tập về nhà tối qua chưa?", note: "Trong câu hỏi, ta dùng trợ động từ 'Did' và đưa động từ chính về nguyên mẫu." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Hãy nhớ câu chuyện quá khứ luôn gắn liền with 'CÁNH CỬA ED' hoặc 'CỘT 2 BẤT TRỊ'. Khi đã mượn trợ động từ 'did' hoặc 'didn't' trong câu phủ định và câu hỏi, động từ chính lập tức trở về dạng 'mộc mạc nguyên mẫu' không chia gì thêm!"
  },
  {
    id: "present-perfect",
    title: "Present Perfect Tense",
    titleVi: "Thì Hiện Tại Hoàn Thành (Hành động kéo dài từ quá khứ kéo tới nay)",
    gradeRange: "THCS (Lớp 6-9)",
    level: "B1",
    category: "Tenses",
    formula: "S + have/has + V3/V-ed",
    vietnameseExplanation: "Một thì cực kỳ quan trọng và hay xuất hiện trong các đề thi quốc tế. Thì này làm chiếc cầu nối giữa quá khứ và hiện tại. Diễn tả hành động bắt đầu ở quá khứ, kéo dài đến hiện tại và có thể tiếp tục tiến vào tương lai.",
    usageRules: [
      {
        rule: "Kinh nghiệm trải nghiệm",
        explanation: "Diễn tả những việc bé đã từng làm hoặc chưa bao giờ làm tính tới thời điểm hiện tại.",
        example: "I have visited Tokyo twice. (Tớ đã từng ghé thăm Tokyo hai lần rồi.)"
      },
      {
        rule: "Hành động vừa mới xảy ra",
        explanation: "Dùng từ 'just' hoặc 'already' để nói hành động vừa mới kết thúc tức thì.",
        example: "She has just finished her dinner. (Mẹ vừa mới ăn xong bữa tối.)"
      },
      {
        rule: "Sử dụng với Since và For",
        explanation: "'Since' + mốc thời gian bắt đầu. 'For' + khoảng thời gian kéo dài.",
        example: "We have lived here since 2015. (Chúng tớ đã sống ở đây từ năm 2015.)"
      }
    ],
    examples: [
      { english: "I have lost my key! I cannot get in now.", vietnamese: "Tớ làm mất chìa khóa rồi! Giờ tớ không vào nhà được.", note: "Làm mất ở quá khứ dĩ nhiên nhưng hậu quả kéo dài tới bây giờ." },
      { english: "He has read that classic novel three times.", vietnamese: "Anh ấy đã đọc cuốn tiểu thuyết kinh điển đó được ba lần rồi.", note: "Diễn tả trải nghiệm tích lũy." },
      { english: "They have been friends for over ten years.", vietnamese: "Họ đã làm bạn với nhau được hơn mười năm rồi.", note: "Vẫn đang là bạn ở hiện tại!" }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Nhớ cặp mốc: SINCE + MỐC (Ví dụ: since Monday, since 2x10) và FOR + KHOẢNG (Ví dụ: for 3 days, for 5 years). Khi làm bài, cứ thấy xuất hiện 'Up to now', 'Since', 'For', 'Yet', 'Just', 'Ever', 'Never' là lập tức nhớ tới công thức Have / Has + V3 nhé!"
  },
  {
    id: "conditional-sentences-all",
    title: "Conditional Sentences (Type 1 & 2)",
    titleVi: "Câu Điều Kiện Loại 1 & Loại 2 (Giả định 'Nếu ... Thì')",
    gradeRange: "THCS (Lớp 6-9)",
    level: "B1",
    category: "Sentence structures",
    formula: "Loại 1: If + S + V(s/es), S + will + V-inf\nLoại 2: If + S + V2/V-ed, S + would + V-inf",
    vietnameseExplanation: "Câu điều kiện dùng để đặt ra các tình huống giả định 'Nếu điều này xảy ra thì điều khác sẽ xảy ra'. Loại 1 là giả định có thật ở tương lai, Loại 2 là giả định không có thật/ước muốn viển vông ở hiện tại (ví dụ: Nếu tớ có cánh ước gì tớ bay được!).",
    usageRules: [
      {
        rule: "Điều kiện Loại 1 (Có thể xảy ra)",
        explanation: "Dùng cho tình huống thực tế, hoàn toàn có khả năng xảy ra nếu thỏa mãn điều kiện.",
        example: "If it rains, we will stay at home. (Nếu trời mưa, chúng ta sẽ ở nhà.)"
      },
      {
        rule: "Điều kiện Loại 2 (Không thể xảy ra ở hiện tại)",
        explanation: "Dùng để tưởng tượng, ước ao một điều trái ngược hoàn toàn với hiện thực hiện tại.",
        example: "If I were a millionaire, I would travel around the world. (Nếu tôi là triệu phú, tôi sẽ đi du lịch khắp thế giới.)"
      },
      {
        rule: "Lưu ý động từ tobe ở loại 2",
        explanation: "Mọi chủ ngữ đều đi với 'WERE' (kể cả I, He, She, It) trong văn viết chuẩn ngữ pháp.",
        example: "If she were here, she would fix this. (Nếu cô ấy ở đây, cô ấy sẽ sửa nó rồi.)"
      }
    ],
    examples: [
      { english: "If you study hard, you will pass the IELTS test.", vietnamese: "Nếu bạn học tập chăm chỉ, bạn sẽ đỗ bài kiểm tra IELTS.", note: "Khả năng rất cao ở tương lai nếu bạn học." },
      { english: "If I had a spaceship, I would fly to Mars.", vietnamese: "Nếu tớ có một tàu vũ trụ, tớ sẽ bay lên sao Hỏa.", note: "Giả định viển vông ở hiện tại." },
      { english: "If we don't hurry, we will miss the school bus.", vietnamese: "Nếu chúng ta không nhanh lên, chúng ta sẽ lỡ chuyến xe buýt trường học.", note: "Loại 1 phủ định." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Tưởng tượng Câu điều kiện như bậc thang lùi thì. Loại 1: Hiện tại đơn đi với WILL. Loại 2: Lùi một bước về Quá khứ đơn đi với WOULD. Nhớ dùng WERE cho tất cả chủ ngữ ở mệnh đề IF loại 2 nhé!"
  },
  {
    id: "passive-voice",
    title: "Passive Voice",
    titleVi: "Thể Bị Động (Học để nhấn mạnh đối tượng bị tác động)",
    gradeRange: "THPT (Lớp 10-12)",
    level: "B2",
    category: "Sentence structures",
    formula: "S + be + Past Participle (V3/V-ed) + (by Object)",
    vietnameseExplanation: "Trong câu chủ động, ai đó làm gì (Lan ăn bánh). Nhưng trong câu bị động, chiếc bánh được ăn bởi Lan. Câu bị động dùng khi ta muốn nhấn mạnh vật/người chịu tác động, hoặc khi ta không quan tâm ai là người làm ra hành động đó.",
    usageRules: [
      {
        rule: "Cách chuyển đổi",
        explanation: "1. Đưa tân ngữ của câu chủ động lên làm chủ ngữ mới. 2. Thêm động từ 'To Be' chia theo đúng thì của câu gốc. 3. Đưa động từ chính về dạng V3/V-ed. 4. Thêm 'by + tác nhân'.",
        example: "The cake is eaten by the girl. (Chiếc bánh được ăn bởi cô bé.)"
      },
      {
        rule: "Khi nào dùng",
        explanation: "Khi tác nhân không quan trọng hoặc không biết rõ.",
        example: "The robber was arrested last night. (Tên cướp đã bị bắt giữ tối qua - dĩ nhiên bởi cảnh sát!)"
      }
    ],
    examples: [
      { english: "Amazing technological maps are processed by AI models.", vietnamese: "Những tấm bản đồ công nghệ kinh thánh được xử lý bởi các mô hình trí tuệ nhân tạo.", note: "Hiện tại đơn bị động: is/are + V3." },
      { english: "These classrooms were built in 1995.", vietnamese: "Những lớp học này được xây dựng vào năm 1995.", note: "Quá khứ đơn bị động: was/were + V3." },
      { english: "The English exercises have been solved by students.", vietnamese: "Các bài tập tiếng Anh đã được giải quyết bởi các học sinh.", note: "Hiện tại hoàn thành bị động: has/have + been + V3." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Trò chơi ghép nối bị động: Luôn luôn phải hội tụ đúng hai yếu tố: 'TO BE' (chia đúng thì gốc) và 'ĐỘNG TỪ ĐUÔI V3'. Thiếu một trong hai thì không thể gọi là câu bị động được!"
  },
  {
    id: "relative-clauses",
    title: "Relative Clauses",
    titleVi: "Mệnh Đề Quan Hệ (Dùng Who, Which, That nối câu ghép)",
    gradeRange: "THPT (Lớp 10-12)",
    level: "B2",
    category: "Sentence structures",
    formula: "...Noun + [who / whom / which / that / whose] + Clause",
    vietnameseExplanation: "Thay vì dùng hai câu ngắn ngủn, tẻ nhạt: 'Tớ thích cô gái. Cô gái đang đứng kia.' Bé có thể gộp thành câu dài ấn tượng hơn nhờ mệnh đề quan hệ: 'Tớ thích cô gái người mà đang đứng đằng kia.' Các đại từ quan hệ đóng vai trò như chất keo kết dính thông tin tinh tế.",
    usageRules: [
      {
        rule: "WHO dùng cho Người",
        explanation: "Thay thế cho danh từ chỉ người đóng vai trò chủ ngữ.",
        example: "The teacher who taught us is retired. (Thầy giáo người mà dạy học chúng tôi đã nghỉ hưu.)"
      },
      {
        rule: "WHICH dùng cho Vật",
        explanation: "Thay thế cho đồ vật, con vật hoặc sự việc.",
        example: "The dog which has fluffy tail is running. (Chú chó cái con có đuôi xù đang chạy.)"
      },
      {
        rule: "THAT dùng linh hoạt",
        explanation: "Thay thế cho cả Who & Which trong mệnh đề xác định (không có dấu phẩy).",
        example: "The book that you gave me is amazing. (Cuốn sách bạn tặng tớ thật tuyệt vời.)"
      },
      {
        rule: "WHOSE chỉ sở hữu",
        explanation: "Đứng giữa hai danh từ để chỉ sự sở hữu của người đứng trước.",
        example: "The boy whose bicycle was lost was sad. (Cậu bé có chiếc xe đạp bị mất rất buồn.)"
      }
    ],
    examples: [
      { english: "Here is the active IELTS student whom I interviewed.", vietnamese: "Đây là em học viên IELTS năng động người mà tớ đã phỏng vấn.", note: "Whom thay thế danh từ chỉ người làm tân ngữ." },
      { english: "The software which creates roadmap has been upgraded.", vietnamese: "Phần mềm cái tạo lộ trình học tập vừa mới được nâng cấp.", note: "Which thay thế danh từ vật 'software'." },
      { english: "The house whose roof is green belongs to my grandfather.", vietnamese: "Căn ngôi nhà có mái màu xanh lá cây thuộc về ông ngoại tớ.", note: "Whose biểu thị sở hữu mái nhà thuộc ngôi nhà." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: WHO: Người chủ động phát biểu. WHOM: Người bị động đón nhận. WHICH: Thú cưng hay đồ vật yêu thích. WHOSE: Chỉ ra chủ nhân của tài sản đi ngay đằng sau!"
  },

  // --- NEW CURRICULUM TO ADD AS REQUESTED BY USER IMAGE ---
  {
    id: "speech-parts",
    videoIndex: 2,
    title: "Nouns, Verbs, Adjectives, Adverbs",
    titleVi: "VIDEO 2. DANH TỪ – ĐỘNG TỪ – TÍNH TỪ – TRẠNG TỪ (Bốn Cột Trụ Từ Loại)",
    gradeRange: "Tiểu học & THCS",
    level: "A1",
    category: "Speech Parts",
    formula: "Danh từ (N) - Động từ (V) - Tính từ (Adj) - Trạng từ (Adv)",
    vietnameseExplanation: "Bốn loại từ cơ bản này giống như các bộ phận của một chiếc xe máy. Nếu thiếu một bộ phận, câu tiếng Anh không thể vận hành bình thường. Danh từ chỉ sự vật/con người, động từ chỉ hành động, tính từ làm đẹp cho danh từ, trạng từ làm mạnh thêm cho động từ và tính từ.",
    usageRules: [
      {
        rule: "Vị trí của Tính từ (Adjective)",
        explanation: "Luôn đứng TRƯỚC danh từ để bổ nghĩa, hoặc đứng SAU động từ liên kết (như look, feel, be, smell, taste).",
        example: "She has a beautiful voice. (Cô ấy có chất giọng rất mượt mà.)"
      },
      {
        rule: "Vị trí của Trạng từ (Adverb)",
        explanation: "Thường đứng sau động từ thường, hoặc đứng trước một tính từ khác để bổ trợ.",
        example: "He drives extremely carefully. (Anh ấy lái xe cực kỳ cẩn thận.)"
      },
      {
        rule: "Vị trí của Danh từ (Noun)",
        explanation: "Làm chủ ngữ đầu câu hoặc làm tân ngữ đứng sau động từ thường.",
        example: "Regular exercise improves health. (Luyện tập thể dục thường xuyên cải thiện sức khỏe.)"
      }
    ],
    examples: [
      { english: "The creative designer works very efficiently.", vietnamese: "Nhà thiết kế sáng tạo làm việc cực kỳ hiệu quả.", note: "creative (Adj) bổ nghĩa Noun 'designer'; efficiently (Adv) bổ nghĩa cho Verb 'works'." },
      { english: "These yellow lemons smell incredibly fresh.", vietnamese: "Những quả chanh màu vàng này tỏa hương cực bừng tươi mát.", note: "fresh (Adj) đứng sau động từ chỉ giác quan 'smell'." },
      { english: "Education is the key to grand success.", vietnamese: "Giáo dục chính là chìa khóa mở hướng tới thành công rực rỡ.", note: "Education và success đều là các danh từ giữ vị trí nòng cốt chủ ngữ & tân ngữ." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Nhớ thần chú: 'TÍNH đứng trước DANH, TRẠNG nhanh theo sau ĐỘNG'. Muốn biến hầu hết tính từ thành trạng từ, chỉ cần thêm đuôi 'LY' (ví dụ: careful -> carefully, swift -> swiftly) là xong bé nhé!"
  },
  {
    id: "prepositions",
    videoIndex: 3,
    title: "Prepositions of Time, Place & Direct Direction",
    titleVi: "VIDEO 3. GIỚI TỪ (In, On, At, Under, Behind, Between...)",
    gradeRange: "Tiểu học & THCS",
    level: "A2",
    category: "Speech Parts",
    formula: "S + V + Preposition + Noun/Noun Phrase",
    vietnameseExplanation: "Giới từ giống như những chất keo kết dính đặc thù giúp định hình vật thể đang ở không gian nào (trong nhà, ngoài phố, trên tầng) hay diễn ra vào mốc thời gian đặc định nào trong năm.",
    usageRules: [
      {
        rule: "Cặp ba thời gian thần thánh: AT - ON - IN",
        explanation: "AT dùng cho giờ giấc chính xác. ON dùng cho ngày và thứ. IN dùng cho tháng, năm, mùa hoặc khoảng thời gian dài.",
        example: "At 7 AM on Monday in January."
      },
      {
        rule: "Giới từ chỉ địa điểm bản đồ",
        explanation: "AT dùng cho địa điểm cụ thể/địa chỉ. ON dùng cho mặt phẳng hoặc tên đường. IN dùng cho lòng quốc gia, thành phố, đại dương.",
        example: "at 120 Street, on the table, in Vietnam."
      },
      {
        rule: "Giới từ chuyển động",
        explanation: "Into (vào trong), Out of (ra ngoài), Through (xuyên qua), Across (băng ngang qua).",
        example: "The adventurous cat jumped into the box. (Chú mèo mạo hiểm đã nhảy vào trong chiếc hộp.)"
      }
    ],
    examples: [
      { english: "We will celebrate the final party at 8 PM on Friday.", vietnamese: "Chúng ta sẽ tổ chức bữa tiệc cuối kỳ vào lúc 8h tối ngày Thứ Sáu.", note: "at + giờ cụ thể, on + ngày thứ trong tuần." },
      { english: "The key of success lies in hard work and passion.", vietnamese: "Chìa khóa dẫn tới thành công nằm ở sự chăm chỉ và đam mê.", note: "lies in là cụm giới từ cố định (collocation) có nghĩa là nằm ở..." },
      { english: "They walked together through the peaceful forest.", vietnamese: "Họ đã cùng nhau đi bộ xuyên qua cánh rừng yên bình.", note: "through bổ ý hành động di chuyển trực diện xuyên thấu không gian." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Vẽ một hình tam giác ngược để nhớ AT - ON - IN thời gian & nơi chốn: IN to đùng nằm ở đáy (đại dương, quốc gia, năm, thế kỷ), ON nằm ở giữa (con đường, bề mặt bàn, ngày thứ), AT nhỏ xíu nhọn ở đỉnh (giờ cụ thể, số nhà, ngã tư)!"
  },
  {
    id: "four-basic-tenses",
    videoIndex: 4,
    title: "Four Crucial Basic Tenses",
    titleVi: "VIDEO 4. BỐN THÌ CƠ BẢN (Hiện Tại Đơn, Hiện Tại Tiếp Diễn, Quá Khứ Đơn, Tương Lai Đơn)",
    gradeRange: "K-12 Foundation",
    level: "A1",
    category: "Tenses",
    formula: "S + V(s/es) | S + am/is/are + V-ing | S + V2/ed | S + will + V-inf",
    vietnameseExplanation: "Tất cả mọi câu nói đều phải diễn ra ở dòng chảy thời gian trôi. Bốn thì cơ bản này thống trị 80% mọi giao tiếp tiếng Anh cơ bản. Nó điều chỉnh hình hài của động từ để chỉ rõ hành động là thói quen hàng ngày, đang diễn ra lập tức, đã khép lại hôm qua hay định đoạt tương lai.",
    usageRules: [
      {
        rule: "Thì Hiện tại đơn (Present Simple)",
        explanation: "Diễn tả thói quen lặp đi lặp lại hoặc sự thật tự nhiên rành rành.",
        example: "I usually brush my teeth at night. (Tớ thường đánh răng ban đêm.)"
      },
      {
        rule: "Thì Hiện tại tiếp diễn (Present Continuous)",
        explanation: "Chụp lại khoảnh khắc việc gì đó đang diễn ra rực rỡ ngay thời điểm trò chuyện.",
        example: "They are playing high-intensity football now. (Họ đang đá bóng sôi nổi bây giờ.)"
      },
      {
        rule: "Thì Quá khứ đơn (Past Simple)",
        explanation: "Diễn tả hành động đã mọc lên, hoàn thành và chấm dứt hẳn ở quá khứ.",
        example: "We visited the museum last Sunday. (Chúng tớ đã đi thăm bảo tàng Chủ Nhật vừa rồi.)"
      },
      {
        rule: "Thì Tương lai đơn (Future Simple)",
        explanation: "Diễn đạt một quyết định nhất thời nảy ra khi nói hoặc một phỏng đoán tương lai.",
        example: "I think it will rain tonight. (Tớ nghĩ trời sẽ đổ mưa tối nay thôi.)"
      }
    ],
    examples: [
      { english: "Water freezes at zero degrees Celsius.", vietnamese: "Nước đóng băng ở không độ C (Sự thật khoa học - Hiện tại đơn).", note: "Freezes chia số ít theo chủ ngữ không đếm được 'water'." },
      { english: "She bought a gorgeous skirt two hours ago.", vietnamese: "Cô ấy đã tậu một chiếc váy lộng lẫy cách đây 2 tiếng.", note: "bought là dạng quá khứ V2 bất quy tắc của động từ buy." },
      { english: "Quiet, please! The class is taking an IELTS mock test.", vietnamese: "Yên lặng nào! Cả lớp đang làm bài kiểm tra thử IELTS.", note: "Hành động đang diễn ra tại thời điểm ra lệnh 'Quiet!'" }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Gắn từ khóa độc quyền cho từng thì: Hiện tại đơn = 'DAILY', Hiện tại tiếp diễn = 'NOW', Quá khứ đơn = 'YESTERDAY', Tương lai đơn = 'TOMORROW'. Chia động từ phải nhìn quanh để định vị từ chỉ mốc thời gian này nhé!"
  },
  {
    id: "active-passive",
    videoIndex: 5,
    title: "Active and Passive voice",
    titleVi: "VIDEO 5. CHỦ ĐỘNG – BỊ ĐỘNG (Cách đổi và chuyển hóa câu dạng Be + V3)",
    gradeRange: "THCS & THPT",
    level: "B1",
    category: "Sentence structures",
    formula: "Active: S + V + O  ===>  Passive: S(mới) + Be + Past Participle (V3/ed) + (by O)",
    vietnameseExplanation: "Câu chủ động là khi ai đó tự làm một việc. Câu bị động là khi một vật được ai đó tác động vào. Câu bị động cực kỳ thông dụng trong văn viết học thuật Academic IELTS hay các báo cáo tin tức quốc tế.",
    usageRules: [
      {
        rule: "Cách đổi To Be",
        explanation: "To Be phải được chia đúng theo THÌ và SỐ lượng của chủ ngữ mới (số ít hay nhiều).",
        example: "The cat ate the cake -> The cake WAS eaten by the cat."
      },
      {
        rule: "Lược bỏ 'by Object'",
        explanation: "Nếu chủ thể gây hành động mơ hồ không quan trọng (she, they, people, someone), ta lược bỏ hoàn toàn 'by'.",
        example: "Someone stole my camera -> My camera WAS stolen."
      },
      {
        rule: "Cấu trúc với 2 tân ngữ",
        explanation: "Có những động từ có 2 tân ngữ (give, lend, buy), ta có thể lấy tân ngữ người ra làm chủ ngữ mới để câu trôi chảy hơn.",
        example: "They gave me a promotion -> I was given a promotion."
      }
    ],
    examples: [
      { english: "Thousands of books are read by students annually.", vietnamese: "Hàng ngàn đầu sách được học sinh đọc nghiền ngẫm hàng năm.", note: "Bị động thì hiện tại đơn: are + V3 'read' (phát âm là red)." },
      { english: "The school will be built next year near my neighborhood.", vietnamese: "Ngôi trường học sẽ được xây dựng vào năm sau gần khu tớ ở.", note: "Bị động tương lai đơn: will be + V3 'built'." },
      { english: "My motorcycle has been repaired thoroughly.", vietnamese: "Chiếc xe máy của tớ đã được sửa sang kỹ càng hoàn tất.", note: "Bị động hiện tại hoàn thành: has been + V3 'repaired'." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Trong câu bị động, động từ chính luôn ở dạng THƯƠNG BINH 'V3/ED' và phải đeo thêm nạng 'Be-động-từ' ở phía trước. Thừa Be thiếu V3/ED là mất thăng bằng ngã ngay ngữ pháp nhé!"
  },
  {
    id: "comparisons",
    videoIndex: 6,
    title: "Equality, Comparative & Superlative Structures",
    titleVi: "VIDEO 6. SO SÁNH (So Sánh Bằng, So Sánh Hơn & So Sánh Nhất)",
    gradeRange: "K-12 Foundation",
    level: "A2",
    category: "Sentence structures",
    formula: "Equal: as + adj + as | Comparative: adj-er + than / more adj + than | Superlative: the adj-est / the most adj",
    vietnameseExplanation: "Đặt hai hay nhiều vật lên bàn cân để phân định cao thấp. Người Việt học tiếng Anh thường nhầm lẫn giữa tính từ ngắn (1 âm tiết) và tính từ dài (2-3 âm tiết trở lên) dẫn đến chia đuôi bừa bãi. Chuyên đề này chuẩn hóa chuẩn chỉ toàn bộ so sánh.",
    usageRules: [
      {
        rule: "So sánh Bằng (Equality)",
        explanation: "Sử dụng cấu trúc 'as + Tính từ/Trạng từ gốc + as' bất kể từ ngắn hay dài.",
        example: "He is as tall as his father."
      },
      {
        rule: "Quy luật Tính từ ngắn & Tính từ dài",
        explanation: "Tính từ ngắn: thêm -ER (hơn) hoặc -EST (nhất). Tính từ dài: thêm MORE (hơn) hoặc THE MOST (nhất).",
        example: "faster than VS more beautiful than."
      },
      {
        rule: "Các trường hợp bất quy tắc tối quan trọng",
        explanation: "Good -> Better -> The Best | Bad -> Worse -> The Worst | Far -> Further/Farther -> The Furthest/Farthest.",
        example: "Your results are better than mine."
      }
    ],
    examples: [
      { english: "IELTS reading is more difficult than listening to me.", vietnamese: "Kỹ năng đọc IELTS thì khó khăn hơn kỹ năng nghe đối với tớ.", note: "dùng 'more ... than' cho tính từ dài 'difficult'." },
      { english: "The Amazon is the second longest river in the world.", vietnamese: "Dòng Amazon là con sông rộng lớn dài thứ hai trên toàn thế giới.", note: "So sánh nhất với tính từ ngắn 'long' chuyển sang 'the longest'." },
      { english: "Living in the countryside is as comfortable as in the city.", vietnamese: "Sinh sống ở vùng nông thôn thì thư thái dễ chịu y như ở đô thị vậy.", note: "So sánh bằng cấu trúc as comfortable as." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Hãy nhớ: 'So sánh HƠN phải đi chung với THAN, so sánh NHẤT phải trao vương miện THE'. Đừng bao giờ viết nhầm 'the more tallest' hay 'more faster' vì như vậy là thừa cân nặng ngôn từ đó!"
  },
  {
    id: "conditionals-type-1-2-3",
    videoIndex: 7,
    title: "Conditional Sentences (Type 1, 2 & 3)",
    titleVi: "VIDEO 7. CÂU ĐIỀU KIỆN (Giả Định Thực Tế, Tưởng Tượng & Nuối Tiếc Quá Khứ)",
    gradeRange: "THCS & THPT",
    level: "B1",
    category: "Sentence structures",
    formula: "Type 1: If + HTĐ + will + V | Type 2: If + QKĐ (were) + would + V | Type 3: If + QKHT + would have + V3",
    vietnameseExplanation: "Câu điều kiện dùng để xâu chuỗi quan hệ nguyên nhân - kết quả dưới các trạng thái giả định khác nhau: khả thi ở tương lai, hư ảo tưởng tượng ở hiện tại, hoặc đảo lộn lịch sử để bày tỏ sự nuối tiếc khôn nguôi quá khứ.",
    usageRules: [
      {
        rule: "Điều kiện Loại 1 (Có thể xảy ra)",
        explanation: "Xảy ra ở hiện tại hoặc tương lai gần nếu điều kiện được đáp ứng.",
        example: "If I study tonight, I will pass the exam."
      },
      {
        rule: "Điều kiện Loại 2 (Trái ngược hiện thực hiện tại)",
        explanation: "Tưởng tượng hư cấu về hiện tại. Sử dụng động từ chia quá khứ đơn, đặc biệt viết 'WERE' cho mọi chủ ngữ.",
        example: "If I were a bird, I would fly across continents."
      },
      {
        rule: "Điều kiện Loại 3 (Tiếc nuối quá khứ đã qua)",
        explanation: "Giả định trái thực tế lịch sử. Mệnh đề IF dùng Quá khứ hoàn thành (had + V3), mệnh đề chính dùng would/could have + V3.",
        example: "If we had left earlier, we would have caught the bus."
      }
    ],
    examples: [
      { english: "If we protect the forest, wildlife will grow safely.", vietnamese: "Nếu chúng ta bảo vệ rừng, động vật hoang dã sẽ sinh trưởng an toàn (Loại 1).", note: "vế If chia HTĐ 'protect', vế chính 'will grow'." },
      { english: "If she had the map, she wouldn't get lost in this maze.", vietnamese: "Nếu cô ấy có bản đồ, cô ấy đã không đi lạc trong mê cung này (Loại 2).", note: "Thực tế cô ấy không có bản đồ." },
      { english: "If John had driven carefully, the accident wouldn't have occurred.", vietnamese: "Nếu John lái xe cẩn thận, vụ tai nạn đã không xảy ra trong quá khứ.", note: "Tiếc nuối sự kiện giao thông đã kết thúc (Loại 3)." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Nhớ quy luật lùi thì: Loại 1 ở Hiện tại (will) -> Loại 2 lùi một bước về Quá khứ (would) -> Loại 3 lùi kịch trần về Quá khứ hoàn thành (would have + V3)!"
  },
  {
    id: "articles-a-an-the",
    videoIndex: 8,
    title: "Articles (A, An, The & Zero Article)",
    titleVi: "VIDEO 8. MẠO TỪ (Sử Dụng A, An, The & Các Trường Hợp Không Dùng Mạo Từ)",
    gradeRange: "Tiểu học & THCS",
    level: "A2",
    category: "Speech Parts",
    formula: "A/An + Noun (Chưa xác định) | The + Noun (Đã biết rõ) | Ø (Không mạo từ) + Noun (Nói chung)",
    vietnameseExplanation: "Học sinh Việt Nam cực kỳ hay quên mạo từ do tiếng Việt không có khái niệm mạo từ bao bọc danh từ. Mạo từ giống như chiếc mũ bảo hiểm cho danh từ đếm được số ít, và là dấu hiệu cho biết người nghe đã biết rõ vật được nhắc đến hay chưa.",
    usageRules: [
      {
        rule: "Sử dụng A và AN",
        explanation: "Đứng trước danh từ đếm được số ít nhắc tới lần đầu. AN đứng trước danh từ phát âm bằng nguyên âm (u-e-o-a-i).",
        example: "A banana VS An apple / An hour (âm h câm)."
      },
      {
        rule: "Sử dụng THE",
        explanation: "Vật thể duy nhất tồn tại (The sun, the world), hoặc danh từ đã được nhắc tới lần thứ 2 trở đi trong câu chuyện.",
        example: "We bought a dog. The dog is named Kiki."
      },
      {
        rule: "Trường hợp KHÔNG dùng mạo từ (Zero Article)",
        explanation: "Danh từ số nhiều hoặc không đếm được nói chung (ví dụ: nước uống, sở thích, đất nước, môn thể thao).",
        example: "I like listening to classical music."
      }
    ],
    examples: [
      { english: "He wants to become an honest lawyer in the future.", vietnamese: "Anh ấy ước ao trở thành một luật sư trung thực lương thiện mai sau.", note: "Dùng 'an' vì 'honest' có âm h câm, bắt đầu bằng nguyên âm o." },
      { english: "The pollution in this city has reached a dangerous level.", vietnamese: "Tình trạng ô nhiễm trong thành phố này đã chạm ngưỡng nguy hại.", note: "The pollution xác định do có cụm 'in this city' đi kèm định hình." },
      { english: "Cats are independent animals that sleep often.", vietnamese: "Loài mèo là loài động vật độc lập thích ngủ nướng thường xuyên.", note: "Cats số nhiều nói chung nên không dùng mạo từ đứng trước." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Đừng nhìn chữ cái viết để chia AN, hãy NGHE phát âm! Từ nào phát âm nghe như 'oải oải' (u-e-o-a-i) thì lập tức thêm AN (ví dụ: an umbrella, an MP3 player, an honest man)!"
  },
  {
    id: "cause-solution-purpose",
    videoIndex: 9,
    title: "Cause, Solution and Purpose Structures",
    titleVi: "VIDEO 9. CẤU TRÚC NGUYÊN NHÂN – GIẢI PHÁP – MỤC ĐÍCH",
    gradeRange: "THCS & THPT",
    level: "B1",
    category: "Sentence structures",
    formula: "Purpose: to / in order to / so as to + V-inf  |  so that + S + can/could + Verb",
    vietnameseExplanation: "Tất cả các bài luận IELTS Writing Task 2 đều đòi hỏi bạn lý giải nguyên nhân, đề ra giải pháp mấu chốt và mô tả mục đích hành động rõ ràng. Ôn luyện nhuần nhuyễn cấu trúc liên từ này nâng chất lượng viết lên tầm cao mới.",
    usageRules: [
      {
        rule: "Chỉ mục đích cho Động từ hành động",
        explanation: "Sử dụng 'to + V' hoặc 'in order to / so as to + V' để nói rõ làm gì để đạt được điều gì.",
        example: "She saves money in order to study abroad."
      },
      {
        rule: "Chỉ mục đích bằng Mệnh đề",
        explanation: "Sử dụng 'so that' hoặc 'in order that' đi kèm một mệnh đề đầy đủ có can/could/will/would.",
        example: "I turned off the phone so that they wouldn't disturb me."
      },
      {
        rule: "Diễn tả giải pháp hành động",
        explanation: "Tận dụng các động từ hành động học thuật như: resolve, tackle, solve, address, offer a solution to.",
        example: "tackle environmental degradation."
      }
    ],
    examples: [
      { english: "The museum conducts research to preserve precious ancient relics.", vietnamese: "Bảo tàng tiến hành nghiên cứu sâu rộng nhằm bảo tồn cổ vật cổ đại quý giá.", note: "Dùng cụm 'to preserve' chỉ rõ mục đích hoạt động." },
      { english: "He studies vocabulary daily so that he can achieve IELTS 7.5.", vietnamese: "Cậu ấy rèn từ vựng mỗi ngày để cán đích thành tích IELTS 7.5 mong ước.", note: "Cấu trúc 'so that' bổ ý mục đích." },
      { english: "Scientists are finding new remedies to solve viral disease outbreaks.", vietnamese: "Các nhà khoa học đang lùng tìm phương thuốc mới giải quyết dịch bùng phát.", note: "Khai thác cụm động từ giải quyết 'to solve'." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Nếu đằng sau là một hành động nguyên mẫu trơ trọi -> dùng 'In order to'. Nếu đằng sau là một câu có đầy đủ Chủ - Vị -> dùng 'So that' để nối câu mục đích chuẩn xác nhé!"
  },
  {
    id: "so-that-too-to-enough",
    videoIndex: 10,
    title: "So...that, Too...to & Enough...to",
    titleVi: "VIDEO 10. SO...THAT / TOO...TO / ENOUGH...TO (Chỉ Mức Độ Quá Đến Nỗi & Đủ Để Làm Gì)",
    gradeRange: "THCS & THPT",
    level: "B1",
    category: "Sentence structures",
    formula: "too + adj + to_V | so + adj + that + clause | adj + enough + to_V",
    vietnameseExplanation: "Một bộ ba cấu trúc câu chuyên biệt dùng để so sánh lượng và mức độ đạt được của tính chất. Làm sao để nói 'Trà nóng quá con không uống được' hay 'Anh ấy đủ lớn để tự đi một mình'? Cấu trúc này giải tỏa hoàn toàn câu hỏi đó.",
    usageRules: [
      {
        rule: "TOO...TO (Quá mức cho một hành động)",
        explanation: "Tính chất quá vượt ngưỡng chịu đựng khiến hành động đằng sau KHÔNG THỂ xảy ra (mang nghĩa phủ định sẵn).",
        example: "I am too tired to study. (Tớ quá mệt mỏi để có thể học bài.)"
      },
      {
        rule: "SO...THAT (Quá... đến mức mà)",
        explanation: "SO đứng trước tính từ, THAT đứng trước mệnh đề kết quả xảy ra.",
        example: "The test was so difficult that many students failed."
      },
      {
        rule: "ENOUGH...TO (Đủ để làm gì)",
        explanation: "Lưu ý vị trí: tính từ hoặc trạng từ luôn đứng TRƯỚC chữ enough, còn danh từ đứng SAU enough.",
        example: "warm enough to swim VS enough money to buy."
      }
    ],
    examples: [
      { english: "The coffee was too hot for me to sip immediately.", vietnamese: "Tách cà phê quá nóng khiến tớ không thể nhâm nhi uống ngay lập tức.", note: "Cấu trúc too + hot + for O + to-V." },
      { english: "The landscape was so beautiful that we took hundreds of memories.", vietnamese: "Phong cảnh thiên nhiên đẹp đẽ đến nỗi chúng tớ đã chụp hàng trăm tấm ảnh kỷ niệm.", note: "so + beautiful + that + mệnh đề kết quả." },
      { english: "Are you experienced enough to handle this corporate project?", vietnamese: "Bạn có đủ dày dạn kinh nghiệm để gánh vác dự án doanh nghiệp này không?", note: "experienced là tính từ đứng trước enough." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Nhớ lấy thứ tự: 'TOO đứng trước TÍNH, TÍNH đứng trước ENOUGH'. Đọc nhẩm lắp vần trong đầu: 'too hot' nhưng lại là 'hot enough'!"
  },
  {
    id: "because-although-clauses",
    videoIndex: 11,
    title: "Conjunctions of Cause and Concession",
    titleVi: "VIDEO 11. BECAUSE/BECAUSE OF – ALTHOUGH/ DESPITE/IN SPITE OF",
    gradeRange: "THCS & THPT",
    level: "B2",
    category: "Sentence structures",
    formula: "In spite of/Despite/Because of + Noun/V-ing  ||  Although/Because + Clausal Clause",
    vietnameseExplanation: "Biết diễn tả lý do (Tại vì) và sự nhượng bộ phản diện (Mặc dù) là linh hồn của sự lập luận logic. Bạn cần nhuần nhuyễn cách biến đổi qua lại giữa mệnh đề có động từ sang danh từ/đuôi V-ing ngắn gọn để phong phú hóa văn phong.",
    usageRules: [
      {
        rule: "ALTHOUGH và BECAUSE đi kèm Mệnh Đề",
        explanation: "Phải có đầy đủ chủ ngữ + động từ chia thì sau hai từ này.",
        example: "Although he had a headache, he still completed the project."
      },
      {
        rule: "DESPITE, IN SPITE OF và BECAUSE OF đi kèm Cụm Danh Từ hoặc V-ing",
        explanation: "Tuyệt đối không được dùng động từ chia thì bình thường ở đây. Chỉ dùng Noun Phrase hoặc Gerund.",
        example: "Despite having a headache, he still worked."
      },
      {
        rule: "Mẹo chuyển đổi dùng 'the fact that'",
        explanation: "Nếu muốn giữ nguyên mệnh đề sau Despite mà không cần biến đổi, hãy kẹp thêm 'the fact that' vào giữa.",
        example: "Despite the fact that he was tired, he smiled."
      }
    ],
    examples: [
      { english: "In spite of the heavy rainfall, they finished the golf tour.", vietnamese: "Bất chấp cơn mưa rơi nặng hạt, họ vẫn hoàn thành xuất sắc giải đấu golf.", note: "In spite of + cụm danh từ 'the heavy rainfall'." },
      { english: "Although they trained hard, they didn't win the championship.", vietnamese: "Mặc dù họ đã dày công tập luyện cường độ cao, họ đã không chạm tới chức vô địch.", note: "use 'although' + full clause." },
      { english: "The flight was delayed because of the severe thick fog.", vietnamese: "Chuyến bay đã bị trễ giờ xuất phát do dải sương mù phủ dày đặc.", note: "because of + cụm danh từ." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Nhọ quy tắc đếm từ: Cụm ngắn (Because, Although) = đi với câu dài lê thê (Clause). Cấu trúc dài lê thê (Because of, Despite, In spite of) = chỉ đi kèm cụm từ ngắn ngủn (Noun/V-ing)!"
  },
  {
    id: "relative-clauses-detailed",
    videoIndex: 12,
    title: "Defining & Non-Defining Relative Clauses",
    titleVi: "VIDEO 12. MỆNH ĐỀ QUAN HỆ (Mở Rộng & Bổ Nghĩa Danh Từ Bằng Who, Which, That, Whose...)",
    gradeRange: "THPT & IELTS Prep",
    level: "B2",
    category: "Sentence structures",
    formula: "Subject + Relative Pronoun (Who/Which/Whose/Where...) + Clause",
    vietnameseExplanation: "Mệnh đề quan hệ là phương pháp tuyệt vời nhất giúp gộp hai câu đơn nhàm chán thành một câu phức giàu lượng thông tin. Có hai loại: Mệnh đề Xác định (cần thiết, không có dấu phẩy) và Mệnh đề Không xác định (thông tin phụ trợ, bắt buộc có dấu phẩy ngăn cách).",
    usageRules: [
      {
        rule: "Đại từ quan hệ làm Chủ ngữ & Tân ngữ",
        explanation: "WHO chỉ người làm chủ ngữ. WHOM chỉ người làm tân ngữ. WHICH chỉ vật sự kiện. THAT dùng linh hoạt thay thế cả hai trong câu không dấu phẩy.",
        example: "The boy who called you was my cousin."
      },
      {
        rule: "Mở rộng sở hữu bằng WHOSE",
        explanation: "Đứng giữa hai danh từ để chỉ sự thuộc về tài sản của danh từ đứng trước.",
        example: "The woman whose handbag was stolen is crying."
      },
      {
        rule: "Mệnh đề Không xác định (Non-defining)",
        explanation: "Dùng để bổ sung thông tin phụ cho một danh từ đã rõ ràng (như tên riêng, danh từ có My/This...). Phải được bọc dấu phẩy gập. CẤM dùng 'THAT' ở đây.",
        example: "Paris, which is the capital of France, is lovely (not: Paris, that is...)."
      }
    ],
    examples: [
      { english: "The candidate whom we hired last week performs beautifully.", vietnamese: "Ứng cử viên người mà chúng tôi tuyển dụng tuần trước thể hiện năng lực cực kỳ xuất sắc.", note: "whom thay thế tân ngữ người." },
      { english: "This complex software, which was designed by John, runs on AI.", vietnamese: "Phần mềm phức tạp này, cái được thiết kế bởi John, vận hành tự động trên nền tảng AI.", note: "Mệnh đề không xác định kèm dấu phẩy." },
      { english: "I visited the primary school where my grandmother taught for 30 years.", vietnamese: "Tớ đã ghé thăm trường tiểu học cũ nơi mà bà ngoại tớ đã dạy suốt 30 năm dài.", note: "where là trạng từ quan hệ chỉ địa điểm tối ưu." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Nhớ luật cấm kỵ: 'THAT cực kỳ ghét dấu phẩy và giới từ'. Hễ thấy dấu phẩy xuất hiện hay có giới từ đứng trước (như with, in, on...) thì tuyệt đối nói KHÔNG với đại từ THAT bé nhé!"
  },
  {
    id: "general-quiz-mix",
    videoIndex: 13,
    title: "Comprehensive Mixed Practice Exam",
    titleVi: "VIDEO 13. BÀI TẬP TỔNG HỢP (Tổng Ôn Luyện Toàn Diện Các Chuyên Đề Chốt)",
    gradeRange: "THPT & IELTS Prep",
    level: "Advanced",
    category: "Advanced",
    formula: "Sự tổng hợp linh hoạt của tất cả 12 bài học trước đó",
    vietnameseExplanation: "Bài học tổng kiểm tra kiến thức cuối khóa. Giúp học sinh tôi luyện bản lĩnh phòng thi rành mạch, rèn năng lực chống bẫy cấu trúc ngữ pháp chéo, hoàn thiện tư duy để chuẩn bị bứt phá các mốc mục tiêu điểm số cam kết.",
    usageRules: [
      {
        rule: "Chống bẫy Thì và Sự hòa hợp Chủ-Vị",
        explanation: "Luôn kiểm tra chủ ngữ là số ít hay số nhiều, kết hợp định vị mốc thời gian để tránh chia sai thì cơ bản.",
        example: "Each of the students HAS (not have) finished their tasks."
      },
      {
        rule: "Học cách đảo ngữ của Conditional Sentences",
        explanation: "Bỏ IF, đưa trợ động từ lên đầu câu để câu văn trở nên vô cùng trang trọng học thuật.",
        example: "Had I known the truth, I wouldn't have come. (Nếu tớ biết sự thật, tớ đã không đến.)"
      },
      {
        rule: "Kết hợp từ loại nhuần nhuyễn",
        explanation: "Nhớ chuyển đổi linh hoạt các tiền tố, hậu tố phục vụ bài thi viết biến dạng từ (Word Form).",
        example: "produce (V) -> productive (Adj) -> productively (Adv) -> productivity (N)."
      }
    ],
    examples: [
      { english: "Were we to increase the funding, the research would finish faster.", vietnamese: "Nếu chúng ta tăng ngân sách hỗ trợ, cuộc nghiên cứu sẽ hoàn tất nhanh chóng hơn nhiều.", note: "Đảo ngữ loại 2: Were + S + to + V-inf, trang trọng hơn If we increased." },
      { english: "Despite being thoroughly exhausted, she successfully completed the test.", vietnamese: "Mặc dầu mệt lừ bải hoải cả người, cô ấy vẫn hoàn thành bài thi khép lịch mỹ mãn.", note: "Dùng Despite + Gerund 'being' kết hợp liên từ nhượng bộ." },
      { english: "Had it not been for the guide, we would have got lost in the wild.", vietnamese: "Nếu không nhờ có hướng dẫn viên, chúng tớ chắc đã đi bụi lạc hút trong hoang dã.", note: "Đảo ngữ loại 3 thể phủ định cực kỳ ăn điểm ngữ pháp cao." }
    ],
    memoryHack: "💡 Mẹo ghi nhớ: Làm bài tập tổng hợp cần đi qua ba bước chẩn đoán: 1. Câu này chủ động hay bị động? 2. Mốc thời gian là gì? 3. Chủ ngữ là ít hay nhiều? Trả lời chuẩn ba câu hỏi này, bạn sẽ tự tin phá đảo mọi đề thi!"
  }
];

export const IRREGULAR_VERBS: IrregularVerb[] = [
  { infinitive: "be", infinitivePhonetic: "/biː/", pastSimple: "was/were", pastSimplePhonetic: "/wɒz/, /wɜːr/", pastParticiple: "been", pastParticiplePhonetic: "/biːn/", meaning: "thì, là, ở" },
  { infinitive: "become", infinitivePhonetic: "/bɪˈkʌm/", pastSimple: "became", pastSimplePhonetic: "/bɪˈkeɪm/", pastParticiple: "become", pastParticiplePhonetic: "/bɪˈkʌm/", meaning: "trở nên, trở thành" },
  { infinitive: "begin", infinitivePhonetic: "/bɪˈɡɪn/", pastSimple: "began", pastSimplePhonetic: "/bɪˈɡæn/", pastParticiple: "begun", pastParticiplePhonetic: "/bɪˈɡʌn/", meaning: "bắt đầu" },
  { infinitive: "bite", infinitivePhonetic: "/baɪt/", pastSimple: "bit", pastSimplePhonetic: "/bɪt/", pastParticiple: "bitten", pastParticiplePhonetic: "/ˈbɪt.ən/", meaning: "cắn" },
  { infinitive: "blow", infinitivePhonetic: "/bləʊ/", pastSimple: "blew", pastSimplePhonetic: "/bluː/", pastParticiple: "blown", pastParticiplePhonetic: "/bləʊn/", meaning: "thổi" },
  { infinitive: "break", infinitivePhonetic: "/breɪk/", pastSimple: "broke", pastSimplePhonetic: "/brəʊk/", pastParticiple: "broken", pastParticiplePhonetic: "/ˈbrəʊ.kən/", meaning: "làm vỡ, bẻ gãy" },
  { infinitive: "bring", infinitivePhonetic: "/brɪŋ/", pastSimple: "brought", pastSimplePhonetic: "/brɔːt/", pastParticiple: "brought", pastParticiplePhonetic: "/brɔːt/", meaning: "mang đến" },
  { infinitive: "build", infinitivePhonetic: "/bɪld/", pastSimple: "built", pastSimplePhonetic: "/bɪlt/", pastParticiple: "built", pastParticiplePhonetic: "/bɪlt/", meaning: "xây dựng" },
  { infinitive: "burn", infinitivePhonetic: "/bɜːn/", pastSimple: "burnt/burned", pastSimplePhonetic: "/bɜːnt/, /bɜːnd/", pastParticiple: "burnt/burned", pastParticiplePhonetic: "/bɜːnt/, /bɜːnd/", meaning: "đốt cháy, thui" },
  { infinitive: "buy", infinitivePhonetic: "/baɪ/", pastSimple: "bought", pastSimplePhonetic: "/bɔːt/", pastParticiple: "bought", pastParticiplePhonetic: "/bɔːt/", meaning: "mua" },
  { infinitive: "catch", infinitivePhonetic: "/kætʃ/", pastSimple: "caught", pastSimplePhonetic: "/kɔːt/", pastParticiple: "caught", pastParticiplePhonetic: "/kɔːt/", meaning: "bắt, chụp được" },
  { infinitive: "choose", infinitivePhonetic: "/tʃuːz/", pastSimple: "chose", pastSimplePhonetic: "/tʃəʊz/", pastParticiple: "chosen", pastParticiplePhonetic: "/ˈtʃəʊ.zən/", meaning: "chọn lựa" },
  { infinitive: "come", infinitivePhonetic: "/kʌm/", pastSimple: "came", pastSimplePhonetic: "/keɪm/", pastParticiple: "come", pastParticiplePhonetic: "/kʌm/", meaning: "đi đến, lại gần" },
  { infinitive: "cost", infinitivePhonetic: "/kɒst/", pastSimple: "cost", pastSimplePhonetic: "/kɒst/", pastParticiple: "cost", pastParticiplePhonetic: "/kɒst/", meaning: "trị giá, tốn phí" },
  { infinitive: "cut", infinitivePhonetic: "/kʌt/", pastSimple: "cut", pastSimplePhonetic: "/kʌt/", pastParticiple: "cut", pastParticiplePhonetic: "/kʌt/", meaning: "cắt, chặt" },
  { infinitive: "dig", infinitivePhonetic: "/dɪɡ/", pastSimple: "dug", pastSimplePhonetic: "/dʌɡ/", pastParticiple: "dug", pastParticiplePhonetic: "/dʌɡ/", meaning: "đào bới" },
  { infinitive: "do", infinitivePhonetic: "/duː/", pastSimple: "did", pastSimplePhonetic: "/dɪd/", pastParticiple: "done", pastParticiplePhonetic: "/dʌn/", meaning: "làm, hành động" },
  { infinitive: "draw", infinitivePhonetic: "/drɔː/", pastSimple: "drew", pastSimplePhonetic: "/druː/", pastParticiple: "drawn", pastParticiplePhonetic: "/drɔːn/", meaning: "vẽ, kéo" },
  { infinitive: "dream", infinitivePhonetic: "/driːm/", pastSimple: "dreamt/dreamed", pastSimplePhonetic: "/dremt/, /driːmd/", pastParticiple: "dreamt/dreamed", pastParticiplePhonetic: "/dremt/, /driːmd/", meaning: "mơ thấy" },
  { infinitive: "drink", infinitivePhonetic: "/drɪŋk/", pastSimple: "drank", pastSimplePhonetic: "/dræŋk/", pastParticiple: "drunk", pastParticiplePhonetic: "/drʌŋk/", meaning: "uống" },
  { infinitive: "drive", infinitivePhonetic: "/draɪv/", pastSimple: "drove", pastSimplePhonetic: "/drəʊv/", pastParticiple: "driven", pastParticiplePhonetic: "/ˈdrɪv.ən/", meaning: "lái xe" },
  { infinitive: "eat", infinitivePhonetic: "/iːt/", pastSimple: "ate", pastSimplePhonetic: "/eɪt/", pastParticiple: "eaten", pastParticiplePhonetic: "/ˈiː.tən/", meaning: "ăn" },
  { infinitive: "fall", infinitivePhonetic: "/fɔːl/", pastSimple: "fell", pastSimplePhonetic: "/fel/", pastParticiple: "fallen", pastParticiplePhonetic: "/ˈfɔː.lən/", meaning: "rơi, ngã" },
  { infinitive: "feed", infinitivePhonetic: "/fiːd/", pastSimple: "fed", pastSimplePhonetic: "/fed/", pastParticiple: "fed", pastParticiplePhonetic: "/fed/", meaning: "cho ăn, nuôi nấng" },
  { infinitive: "feel", infinitivePhonetic: "/fiːl/", pastSimple: "felt", pastSimplePhonetic: "/felt/", pastParticiple: "felt", pastParticiplePhonetic: "/felt/", meaning: "cảm thấy" },
  { infinitive: "fight", infinitivePhonetic: "/faɪt/", pastSimple: "fought", pastSimplePhonetic: "/fɔːt/", pastParticiple: "fought", pastParticiplePhonetic: "/fɔːt/", meaning: "chiến đấu, đánh nhau" },
  { infinitive: "find", infinitivePhonetic: "/faɪnd/", pastSimple: "found", pastSimplePhonetic: "/faʊnd/", pastParticiple: "found", pastParticiplePhonetic: "/faʊnd/", meaning: "tìm thấy" },
  { infinitive: "fly", infinitivePhonetic: "/flaɪ/", pastSimple: "flew", pastSimplePhonetic: "/fluː/", pastParticiple: "flown", pastParticiplePhonetic: "/fləʊn/", meaning: "bay" },
  { infinitive: "forget", infinitivePhonetic: "/fəˈɡet/", pastSimple: "forgot", pastSimplePhonetic: "/fəˈɡɒt/", pastParticiple: "forgotten", pastParticiplePhonetic: "/fəˈɡɒt.ən/", meaning: "quên" },
  { infinitive: "forgive", infinitivePhonetic: "/fəˈɡɪv/", pastSimple: "forgave", pastSimplePhonetic: "/fəˈeɪv/", pastParticiple: "forgiven", pastParticiplePhonetic: "/fəˈgɪv.ən/", meaning: "tha thứ" },
  { infinitive: "freeze", infinitivePhonetic: "/friːz/", pastSimple: "froze", pastSimplePhonetic: "/frəʊz/", pastParticiple: "frozen", pastParticiplePhonetic: "/ˈfrəʊ.zən/", meaning: "đông đá, đóng băng" },
  { infinitive: "get", infinitivePhonetic: "/ɡet/", pastSimple: "got", pastSimplePhonetic: "/ɡɒt/", pastParticiple: "got/gotten", pastParticiplePhonetic: "/ɡɒt/, /ˈɡɒt.ən/", meaning: "đạt được, có được" },
  { infinitive: "give", infinitivePhonetic: "/ɡɪv/", pastSimple: "gave", pastSimplePhonetic: "/ɡeɪv/", pastParticiple: "given", pastParticiplePhonetic: "/ˈɡɪv.ən/", meaning: "cho, tặng" },
  { infinitive: "go", infinitivePhonetic: "/ɡəʊ/", pastSimple: "went", pastSimplePhonetic: "/went/", pastParticiple: "gone", pastParticiplePhonetic: "/ɡɒn/", meaning: "đi" },
  { infinitive: "grow", infinitivePhonetic: "/ɡrəʊ/", pastSimple: "grew", pastSimplePhonetic: "/ɡruː/", pastParticiple: "grown", pastParticiplePhonetic: "/ɡrəʊn/", meaning: "mọc, trồng, lớn lên" },
  { infinitive: "hang", infinitivePhonetic: "/hæŋ/", pastSimple: "hung", pastSimplePhonetic: "/hʌŋ/", pastParticiple: "hung", pastParticiplePhonetic: "/hʌŋ/", meaning: "treo lên, móc lên" },
  { infinitive: "have", infinitivePhonetic: "/hæv/", pastSimple: "had", pastSimplePhonetic: "/hæd/", pastParticiple: "had", pastParticiplePhonetic: "/hæd/", meaning: "có" },
  { infinitive: "hear", infinitivePhonetic: "/hɪər/", pastSimple: "heard", pastSimplePhonetic: "/hɜːd/", pastParticiple: "heard", pastParticiplePhonetic: "/hɜːd/", meaning: "nghe" },
  { infinitive: "hide", infinitivePhonetic: "/haɪd/", pastSimple: "hid", pastSimplePhonetic: "/hɪd/", pastParticiple: "hidden", pastParticiplePhonetic: "/ˈhɪd.ən/", meaning: "trốn, ẩn nấp" },
  { infinitive: "hit", infinitivePhonetic: "/hɪt/", pastSimple: "hit", pastSimplePhonetic: "/hɪt/", pastParticiple: "hit", pastParticiplePhonetic: "/hɪt/", meaning: "đụng, đánh" },
  { infinitive: "hold", infinitivePhonetic: "/həʊld/", pastSimple: "held", pastSimplePhonetic: "/held/", pastParticiple: "held", pastParticiplePhonetic: "/held/", meaning: "cầm, giữ, tổ chức" },
  { infinitive: "hurt", infinitivePhonetic: "/hɜːt/", pastSimple: "hurt", pastSimplePhonetic: "/hɜːt/", pastParticiple: "hurt", pastParticiplePhonetic: "/hɜːt/", meaning: "làm đau, tự đau" },
  { infinitive: "keep", infinitivePhonetic: "/kiːp/", pastSimple: "kept", pastSimplePhonetic: "/kept/", pastParticiple: "kept", pastParticiplePhonetic: "/kept/", meaning: "giữ vững, tiếp tục" },
  { infinitive: "know", infinitivePhonetic: "/nəʊ/", pastSimple: "knew", pastSimplePhonetic: "/njuː/", pastParticiple: "known", pastParticiplePhonetic: "/nəʊn/", meaning: "biết" },
  { infinitive: "lead", infinitivePhonetic: "/liːd/", pastSimple: "led", pastSimplePhonetic: "/led/", pastParticiple: "led", pastParticiplePhonetic: "/led/", meaning: "dẫn dắt, lãnh đạo" },
  { infinitive: "learn", infinitivePhonetic: "/lɜːn/", pastSimple: "learnt/learned", pastSimplePhonetic: "/lɜːnt/, /lɜːnd/", pastParticiple: "learnt/learned", pastParticiplePhonetic: "/lɜːnt/, /lɜːnd/", meaning: "học, tìm hiểu" },
  { infinitive: "leave", infinitivePhonetic: "/liːv/", pastSimple: "left", pastSimplePhonetic: "/left/", pastParticiple: "left", pastParticiplePhonetic: "/left/", meaning: "rời đi, bỏ lại" },
  { infinitive: "lend", infinitivePhonetic: "/lend/", pastSimple: "lent", pastSimplePhonetic: "/lent/", pastParticiple: "lent", pastParticiplePhonetic: "/lent/", meaning: "cho mượn" },
  { infinitive: "let", infinitivePhonetic: "/let/", pastSimple: "let", pastSimplePhonetic: "/let/", pastParticiple: "let", pastParticiplePhonetic: "/let/", meaning: "cho phép" },
  { infinitive: "lie", infinitivePhonetic: "/laɪ/", pastSimple: "lay", pastSimplePhonetic: "/leɪ/", pastParticiple: "lain", pastParticiplePhonetic: "/leɪn/", meaning: "nằm nghỉ, nằm dài" },
  { infinitive: "lose", infinitivePhonetic: "/luːz/", pastSimple: "lost", pastSimplePhonetic: "/lɒst/", pastParticiple: "lost", pastParticiplePhonetic: "/lɒst/", meaning: "đánh mất, thất bại" },
  { infinitive: "make", infinitivePhonetic: "/meɪk/", pastSimple: "made", pastSimplePhonetic: "/meɪd/", pastParticiple: "made", pastParticiplePhonetic: "/meɪd/", meaning: "chế tạo, tạo nên" },
  { infinitive: "mean", infinitivePhonetic: "/miːn/", pastSimple: "meant", pastSimplePhonetic: "/ment/", pastParticiple: "meant", pastParticiplePhonetic: "/ment/", meaning: "có nghĩa là" },
  { infinitive: "meet", infinitivePhonetic: "/miːt/", pastSimple: "met", pastSimplePhonetic: "/met/", pastParticiple: "met", pastParticiplePhonetic: "/met/", meaning: "gặp gỡ, hẹn gặp" },
  { infinitive: "pay", infinitivePhonetic: "/peɪ/", pastSimple: "paid", pastSimplePhonetic: "/peɪd/", pastParticiple: "paid", pastParticiplePhonetic: "/peɪd/", meaning: "chi trả, thanh toán" },
  { infinitive: "put", infinitivePhonetic: "/pʊt/", pastSimple: "put", pastSimplePhonetic: "/pʊt/", pastParticiple: "put", pastParticiplePhonetic: "/pʊt/", meaning: "đặt, để" },
  { infinitive: "read", infinitivePhonetic: "/riːd/", pastSimple: "read", pastSimplePhonetic: "/red/", pastParticiple: "read", pastParticiplePhonetic: "/red/", meaning: "đọc" },
  { infinitive: "ride", infinitivePhonetic: "/raɪd/", pastSimple: "rode", pastSimplePhonetic: "/rəʊd/", pastParticiple: "ridden", pastParticiplePhonetic: "/ˈrɪd.ən/", meaning: "cưỡi (ngựa), lái (xe đạp)" },
  { infinitive: "ring", infinitivePhonetic: "/rɪŋ/", pastSimple: "rang", pastSimplePhonetic: "/ræŋ/", pastParticiple: "rung", pastParticiplePhonetic: "/rʌŋ/", meaning: "rung chuông, đổ chuông" },
  { infinitive: "rise", infinitivePhonetic: "/raɪz/", pastSimple: "rose", pastSimplePhonetic: "/rəʊz/", pastParticiple: "risen", pastParticiplePhonetic: "/ˈrɪz.ən/", meaning: "mọc lên, gia tăng" },
  { infinitive: "run", infinitivePhonetic: "/rʌn/", pastSimple: "ran", pastSimplePhonetic: "/ræn/", pastParticiple: "run", pastParticiplePhonetic: "/rʌn/", meaning: "chạy" },
  { infinitive: "say", infinitivePhonetic: "/seɪ/", pastSimple: "said", pastSimplePhonetic: "/sed/", pastParticiple: "said", pastParticiplePhonetic: "/sed/", meaning: "nói" },
  { infinitive: "see", infinitivePhonetic: "/siː/", pastSimple: "saw", pastSimplePhonetic: "/sɔː/", pastParticiple: "seen", pastParticiplePhonetic: "/siːn/", meaning: "nhìn thấy, quan sát" },
  { infinitive: "sell", infinitivePhonetic: "/sel/", pastSimple: "sold", pastSimplePhonetic: "/səʊld/", pastParticiple: "sold", pastParticiplePhonetic: "/səʊld/", meaning: "bán" },
  { infinitive: "send", infinitivePhonetic: "/send/", pastSimple: "sent", pastSimplePhonetic: "/sent/", pastParticiple: "sent", pastParticiplePhonetic: "/sent/", meaning: "gửi đi" },
  { infinitive: "shake", infinitivePhonetic: "/ʃeɪk/", pastSimple: "shook", pastSimplePhonetic: "/ʃʊk/", pastParticiple: "shaken", pastParticiplePhonetic: "/ˈʃeɪ.kən/", meaning: "rung, lắc" },
  { infinitive: "shine", infinitivePhonetic: "/ʃaɪn/", pastSimple: "shone", pastSimplePhonetic: "/ʃɒn/", pastParticiple: "shone", pastParticiplePhonetic: "/ʃɒn/", meaning: "chiếu sáng" },
  { infinitive: "shoot", infinitivePhonetic: "/ʃuːt/", pastSimple: "shot", pastSimplePhonetic: "/ʃɒt/", pastParticiple: "shot", pastParticiplePhonetic: "/ʃɒt/", meaning: "bắn" },
  { infinitive: "show", infinitivePhonetic: "/ʃəʊ/", pastSimple: "showed", pastSimplePhonetic: "/ʃəʊd/", pastParticiple: "shown/showed", pastParticiplePhonetic: "/ʃəʊn/, /ʃəʊd/", meaning: "cho xem, chỉ ra" },
  { infinitive: "shut", infinitivePhonetic: "/ʃʊt/", pastSimple: "shut", pastSimplePhonetic: "/ʃʊt/", pastParticiple: "shut", pastParticiplePhonetic: "/ʃʊt/", meaning: "đóng lại" },
  { infinitive: "sing", infinitivePhonetic: "/sɪŋ/", pastSimple: "sang", pastSimplePhonetic: "/sæŋ/", pastParticiple: "sung", pastParticiplePhonetic: "/sʌŋ/", meaning: "hát" },
  { infinitive: "sink", infinitivePhonetic: "/sɪŋk/", pastSimple: "sank", pastSimplePhonetic: "/sæŋk/", pastParticiple: "sunk", pastParticiplePhonetic: "/sʌŋk/", meaning: "chìm, đắm" },
  { infinitive: "sit", infinitivePhonetic: "/sɪt/", pastSimple: "sat", pastSimplePhonetic: "/sæt/", pastParticiple: "sat", pastParticiplePhonetic: "/sæt/", meaning: "ngồi" },
  { infinitive: "sleep", infinitivePhonetic: "/sliːp/", pastSimple: "slept", pastSimplePhonetic: "/slept/", pastParticiple: "slept", pastParticiplePhonetic: "/slept/", meaning: "ngủ" },
  { infinitive: "slide", infinitivePhonetic: "/slaɪd/", pastSimple: "slid", pastSimplePhonetic: "/slɪd/", pastParticiple: "slid", pastParticiplePhonetic: "/slɪd/", meaning: "trượt, lướt" },
  { infinitive: "speak", infinitivePhonetic: "/spiːk/", pastSimple: "spoke", pastSimplePhonetic: "/spəʊk/", pastParticiple: "spoken", pastParticiplePhonetic: "/ˈspəʊ.kən/", meaning: "nói chuyện" },
  { infinitive: "spend", infinitivePhonetic: "/spend/", pastSimple: "spent", pastSimplePhonetic: "/spent/", pastParticiple: "spent", pastParticiplePhonetic: "/spent/", meaning: "tiêu sài, dành (thời gian)" },
  { infinitive: "stand", infinitivePhonetic: "/stænd/", pastSimple: "stood", pastSimplePhonetic: "/stʊd/", pastParticiple: "stood", pastParticiplePhonetic: "/stʊd/", meaning: "đứng" },
  { infinitive: "steal", infinitivePhonetic: "/stiːl/", pastSimple: "stole", pastSimplePhonetic: "/stəʊl/", pastParticiple: "stolen", pastParticiplePhonetic: "/ˈstəʊ.lən/", meaning: "ăn cắp, lấy trộm" },
  { infinitive: "sweep", infinitivePhonetic: "/swiːp/", pastSimple: "swept", pastSimplePhonetic: "/swept/", pastParticiple: "swept", pastParticiplePhonetic: "/swept/", meaning: "quét dọn" },
  { infinitive: "swim", infinitivePhonetic: "/swɪm/", pastSimple: "swam", pastSimplePhonetic: "/swæm/", pastParticiple: "swum", pastParticiplePhonetic: "/swʌm/", meaning: "bơi lội" },
  { infinitive: "take", infinitivePhonetic: "/teɪk/", pastSimple: "took", pastSimplePhonetic: "/tʊk/", pastParticiple: "taken", pastParticiplePhonetic: "/ˈteɪ.kən/", meaning: "cầm, lấy, đưa" },
  { infinitive: "teach", infinitivePhonetic: "/tiːtʃ/", pastSimple: "taught", pastSimplePhonetic: "/tɔːt/", pastParticiple: "taught", pastParticiplePhonetic: "/tɔːt/", meaning: "dạy học, chỉ bảo" },
  { infinitive: "tear", infinitivePhonetic: "/teər/", pastSimple: "tore", pastSimplePhonetic: "/tɔːr/", pastParticiple: "torn", pastParticiplePhonetic: "/tɔːn/", meaning: "xé rách" },
  { infinitive: "tell", infinitivePhonetic: "/tel/", pastSimple: "told", pastSimplePhonetic: "/təʊld/", pastParticiple: "told", pastParticiplePhonetic: "/təʊld/", meaning: "kể, bảo" },
  { infinitive: "think", infinitivePhonetic: "/θɪŋk/", pastSimple: "thought", pastSimplePhonetic: "/θɔːt/", pastParticiple: "thought", pastParticiplePhonetic: "/θɔːt/", meaning: "suy nghĩ" },
  { infinitive: "throw", infinitivePhonetic: "/θrəʊ/", pastSimple: "threw", pastSimplePhonetic: "/θruː/", pastParticiple: "thrown", pastParticiplePhonetic: "/θrəʊn/", meaning: "ném, quăng" },
  { infinitive: "understand", infinitivePhonetic: "/ˌʌn.dəˈstænd/", pastSimple: "understood", pastSimplePhonetic: "/ˌʌn.dəˈstʊd/", pastParticiple: "understood", pastParticiplePhonetic: "/ˌʌn.dəˈstʊd/", meaning: "hiểu, thông cảm" },
  { infinitive: "wake", infinitivePhonetic: "/weɪk/", pastSimple: "woke", pastSimplePhonetic: "/wəʊk/", pastParticiple: "woken", pastParticiplePhonetic: "/ˈwəʊ.kən/", meaning: "thức giấc, đánh thức" },
  { infinitive: "wear", infinitivePhonetic: "/weər/", pastSimple: "wore", pastSimplePhonetic: "/wɔːr/", pastParticiple: "worn", pastParticiplePhonetic: "/wɔːn/", meaning: "mặc, mang, đeo" },
  { infinitive: "win", infinitivePhonetic: "/wɪn/", pastSimple: "won", pastSimplePhonetic: "/wʌn/", pastParticiple: "won", pastParticiplePhonetic: "/wʌn/", meaning: "chiến thắng, đoạt giải" },
  { infinitive: "write", infinitivePhonetic: "/raɪt/", pastSimple: "wrote", pastSimplePhonetic: "/wroʊt/", pastParticiple: "written", pastParticiplePhonetic: "/ˈrɪt.ən/", meaning: "viết" }
];
