import { BookMindmapChapter } from "../bookMindmaps";

export const moodsChapter: BookMindmapChapter = {
  id: 7,
  title: "Moods",
  vietnameseTitle: "Tâm trạng & Cảm xúc",
  sections: [
    {
      id: "mentalstate",
      name: "Psychology & Emotion (Học Tâm Lý Căng Thẳng)",
      description: "Bản đồ hóa cảm giác phấn chấn vui sướng, ngạc nhiên sửng sốt u sầu buồn bã lo sợ uất ức.",
      categories: [
        { id: "ecstatic", name: "Hưng Phấn / Vui Vẻ (Happy & Surprise)", color: "from-yellow-400 to-yellow-600 border-yellow-300 text-yellow-950" },
        { id: "distressed", name: "Lo Sợ / Giận Dữ (Fear & Anger)", color: "from-red-500 to-red-700 border-red-400 text-red-100" },
        { id: "melancholic", name: "U Sầu / Buồn Bã (Disgust & Sad)", color: "from-slate-400 to-slate-650 border-slate-300 text-slate-100" }
      ],
      nodes: [
        {
          word: "Euphoria",
          pos: "Noun",
          phonetic: "/juːˈfɔːriə/",
          definition: "Trạng thái phái phới tột cùng",
          example: "The athlete experienced sheer euphoria upon clinching the first place Olympic medal.",
          exampleTranslation: "Nhà thể thao trải lòng phơi phới nhẹ hẫng khi rinh chiếc huy chương vàng danh xưng thế vận hội.",
          category: "ecstatic"
        },
        {
          word: "Frustration",
          pos: "Noun",
          phonetic: "/frʌˈstreɪʃn/",
          definition: "Sự bực dọc uất ức bất lực",
          example: "Repeated spelling errors lead to general study frustration in children.",
          exampleTranslation: "Lỗi phát âm rập khuôn dẫn tới sự bực dọc bất lực học hành chung ở trẻ em.",
          category: "distressed"
        },
        {
          word: "Melancholy",
          pos: "Noun",
          phonetic: "/ˈmelənkɒli/",
          definition: "Nỗi sầu muộn u hoài hoài cổ",
          example: "Rainy autumn weather matches perfectly the sweet melancholy of old song chords.",
          exampleTranslation: "Cơn mưa chiều thu ăn khớp trọn vẹn nỗi u hoài sầu muộn của ca khúc vàng năm cũ.",
          category: "melancholic"
        },
        {
          word: "Exhilaration",
          pos: "Noun",
          phonetic: "/sgˌzɪləˈreɪʃn/",
          definition: "Sự hào hứng phấn phấn chấn",
          example: "The extreme sports roller coaster ride provided a sense of sheer exhilaration to everyone.",
          exampleTranslation: "Chuyến tàu lượn siêu tốc thể thao mạo hiểm đã mang lại một cảm giác phấn chấn tột cùng cho mọi người.",
          category: "ecstatic"
        },
        {
          word: "Overjoyed",
          pos: "Adjective",
          phonetic: "/ˌəʊvəˈdʒɔɪd/",
          definition: "Hân hoan vô cùng / vui khôn xiết",
          example: "They were overjoyed upon hearing the test score which secured their fully-funded scholarship.",
          exampleTranslation: "Họ đã mừng rỡ hân hoan khôn cùng khi biết được điểm thi đảm bảo chắc chắn cho họ một suất học bổng toàn phần.",
          category: "ecstatic"
        },
        {
          word: "Anxiety",
          pos: "Noun",
          phonetic: "/æŋˈzaɪəti/",
          definition: "Sự lo âu thắt thỏm bồn chồn",
          example: "Practicing mindfulness daily helps students reduce test anxiety and focus better.",
          exampleTranslation: "Thực hành chánh niệm mỗi ngày giúp người học giảm bớt lo âu thi cử và tập trung tinh thần tốt hơn.",
          category: "distressed"
        },
        {
          word: "Hostility",
          pos: "Noun",
          phonetic: "/hɒˈstɪləti/",
          definition: "Sự giận dữ thù hằn bất hợp tác",
          example: "The two rival companies resolved their legal conflicts to avoid further hostility.",
          exampleTranslation: "Hai công ty đối thủ đã cam kết giải quyết dứt điểm tranh chấp pháp lý nhằm tránh quan hệ bất hòa thù hằn sâu thêm.",
          category: "distressed"
        },
        {
          word: "Gloominess",
          pos: "Noun",
          phonetic: "/ˈɡluːminəs/",
          definition: "Sự u ám ảm đạm buồn rầu",
          example: "The winter sky hung with deep dark clouds, adding to the general gloominess.",
          exampleTranslation: "Bầu trời mùa đông ảm đạm bao phủ bởi những đám mây tối xịt, tô đậm thêm sự u ám buồn tẻ chung.",
          category: "melancholic"
        },
        {
          word: "Dejection",
          pos: "Noun",
          phonetic: "/dɪˈdʒekʃn/",
          definition: "Sự chán nán buồn tủi nản chí",
          example: "After missing the critical goal-kick, the player walked back in silent dejection.",
          exampleTranslation: "Sau khi sút hỏng quả penalty cân não, cầu thủ lững thững quay về trong sự nản chí cúi đầu im lặng.",
          category: "melancholic"
        }
      ]
    }
  ]
};

export const transportChapter: BookMindmapChapter = {
  id: 8,
  title: "Transportation",
  vietnameseTitle: "Giao thông & Di chuyển",
  sections: [
    {
      id: "mobility",
      name: "Mobility & Transit (Cơ sở hạ tầng đi lại)",
      description: "Phương tiện giao thông, bến đỗ, nhà ga, quy hoạch an toàn đi đường và hàng không cảng biển.",
      categories: [
        { id: "automotive", name: "Đường bộ / Xe cộ (Automobile & Road)", color: "from-emerald-500 to-emerald-700 border-emerald-400 text-emerald-100" },
        { id: "aviation", name: "Hàng không & Hải cảng (Aviation & Port)", color: "from-sky-550 to-sky-750 border-sky-400 text-sky-950" },
        { id: "publictransit", name: "Giao Thông Công Cộng (Public Transit)", color: "from-indigo-505 to-indigo-705 border-indigo-400 text-indigo-100" }
      ],
      nodes: [
        {
          word: "Infrastructure",
          pos: "Noun",
          phonetic: "/ˈɪnfrəstrʌktʃə(r)/",
          definition: "Cơ sở hạ tầng huyết mạch",
          example: "High speed railway systems represent essential transportation infrastructure upgrades.",
          exampleTranslation: "Tuyến tàu điện hỏa siêu tốc bảo hộ nâng cấp cơ sở hạ tầng giao thông huyết mạch của tương lai.",
          category: "publictransit"
        },
        {
          word: "Congestion",
          pos: "Noun",
          phonetic: "/kənˈdʒestʃən/",
          definition: "Sự kẹt xe kịch liệt / tắc nghẽn",
          example: "Heavy traffic congestion reduces worker transit speeds during peak morning rush hours.",
          exampleTranslation: "Tình trạng tắc nghẽn giao thông điên đầu bòn rút hết tốc độ tới sở của công chúng tầm giờ vàng.",
          category: "automotive"
        },
        {
          word: "Aviation industry",
          pos: "Noun",
          phonetic: "/ˌeɪ.viˈeɪ.ʃən ˈɪndəstri/",
          definition: "Ngành công nghiệp hàng không",
          example: "The global aviation industry complies rigorously with strict international security codes.",
          exampleTranslation: "Ngành công nghiệp hàng không thế giới kiểm định an toàn nghiêm ngặt chuẩn hệ thống quốc tế.",
          category: "aviation"
        },
        {
          word: "Commuter",
          pos: "Noun",
          phonetic: "/kəˈmjuːtə(r)/",
          definition: "Người đi vé tháng / xe bus đi làm",
          example: "Thousands of busy commuters board the modern metropolitan subway system every morning.",
          exampleTranslation: "Hàng ngàn hành khách bận rộn lên hệ thống tàu điện ngầm đô thị khang trang mỗi buổi sáng đi làm.",
          category: "publictransit"
        },
        {
          word: "Transit",
          pos: "Noun",
          phonetic: "/ˈtrænzɪt/",
          definition: "Quá trình trung chuyển / vận tải công cộng",
          example: "The expansion of rapid transit lines reduces carbon emissions in the city center.",
          exampleTranslation: "Mở rộng các tuyến vận tải nhanh giúp giảm thiểu lượng khí thải carbon ở lõi trung tâm thành phố.",
          category: "publictransit"
        },
        {
          word: "Expressway",
          pos: "Noun",
          phonetic: "/ɪkˈspresweɪ/",
          definition: "Đường cao tốc nhiều làn xe",
          example: "The newly built multi-lane expressway allows drivers to travel quickly across provinces.",
          exampleTranslation: "Đường cao tốc nhiều làn mới hoàn thành cho phép lái xe di chuyển cực nhanh xuyên suốt địa bàn các tỉnh.",
          category: "automotive"
        },
        {
          word: "Pedestrian",
          pos: "Noun",
          phonetic: "/pəˈdestriən/",
          definition: "Người đi bộ dạo phố",
          example: "Pedestrian zones in metropolitan hubs are surrounded by greenery and clear road signs.",
          exampleTranslation: "Các khu phố đi bộ tại lõi trung tâm đô thị được vây quanh bởi cây xanh và biển chỉ dẫn sáng sủa.",
          category: "automotive"
        },
        {
          word: "Flight attendant",
          pos: "Noun",
          phonetic: "/ˈflaɪt əˌten.dənt/",
          definition: "Tiếp viên hàng không lịch sự",
          example: "Attentive flight attendants demonstrate emergency protocols before airplane takeoff.",
          exampleTranslation: "Các bạn tiếp viên chu đáo tiến hành hướng dẫn hiển thị quy trình an toàn khẩn cấp trước khi khởi hành.",
          category: "aviation"
        },
        {
          word: "Terminal",
          pos: "Noun",
          phonetic: "/ˈtɜːmɪnl/",
          definition: "Nhà ga cảng hàng không",
          example: "The international departure terminal is equipped with automated identity checkout scanners.",
          exampleTranslation: "Nhà ga khởi hành quốc tế được lắp đặt sẵn hệ thống máy quét thông quan nhận diện tự động.",
          category: "aviation"
        }
      ]
    }
  ]
};

export const bodyPartsChapter: BookMindmapChapter = {
  id: 9,
  title: "Body Parts",
  vietnameseTitle: "Giải phẫu Cơ thể con người",
  sections: [
    {
      id: "anatomy",
      name: "Human Anatomy (Bộ phận cơ thể học)",
      description: "Thấu triệt hệ thống các cơ quan nội tạng phức tạp, hệ xương khớp bền vững và diện mạo tứ chi.",
      categories: [
        { id: "external", name: "Diện Thiết Ngoại (Head & Limbs)", color: "from-teal-400 to-teal-600 border-teal-300 text-teal-100" },
        { id: "organs", name: "Nội Tạng Bản Ngã (Organs & Brain)", color: "from-rose-500 to-rose-700 border-rose-450 text-rose-100" },
        { id: "skeletal", name: "Hệ Khung xương (Trunk & Skeletal)", color: "from-slate-400 to-slate-600 border-slate-350 text-slate-100" }
      ],
      nodes: [
        {
          word: "Forehead",
          pos: "Noun",
          phonetic: "/ˈfɔːhed/",
          definition: "Trán con người",
          example: "She wiped the sweat from her forehead after the intense workout.",
          exampleTranslation: "Cô ấy lau mồ hôi trên trán sau buổi tập luyện cường độ cao.",
          category: "external"
        },
        {
          word: "Chin",
          pos: "Noun",
          phonetic: "/tʃɪn/",
          definition: "Cằm khuôn mặt",
          example: "He rested his chin on his hand, deep in thought.",
          exampleTranslation: "Cậu ấy tựa cằm lên tay, suy nghĩ đăm chiêu.",
          category: "external"
        },
        {
          word: "Armpit",
          pos: "Noun",
          phonetic: "/ˈɑːmpɪt/",
          definition: "Nách dưới cánh tay",
          example: "Sweat glands in the armpit are responsible for body temperature regulation.",
          exampleTranslation: "Các tuyến mồ hôi ở vùng nách chịu trách nhiệm điều hòa nhiệt độ tối ưu cho cơ thể.",
          category: "external"
        },
        {
          word: "Calf",
          pos: "Noun",
          phonetic: "/kɑːf/",
          definition: "Bắp chân sau",
          example: "I pulled a muscle in my calf while running inside the park yesterday.",
          exampleTranslation: "Tôi bị căng sưng cơ bắp chân khi tập chạy thể dục trong công viên hôm qua.",
          category: "external"
        },
        {
          word: "Thumb",
          pos: "Noun",
          phonetic: "/θʌm/",
          definition: "Ngón tay cái",
          example: "He gave us a thumbs-up sign to show everything was completely okay.",
          exampleTranslation: "Anh ấy đưa ngón tay cái ra hiệu biểu thị mọi sự việc đều hoàn hảo lý tưởng.",
          category: "external"
        },
        {
          word: "Navel",
          pos: "Noun",
          phonetic: "/ˈneɪvl/",
          definition: "Rốn bụng trung tâm",
          example: "A newborn is connected to its mother by the umbilical cord at the navel site.",
          exampleTranslation: "Trẻ sơ sinh nhận dưỡng chất kết nối với người mẹ qua dây rốn tại vị trí lõm rốn.",
          category: "external"
        },
        {
          word: "Wrist",
          pos: "Noun",
          phonetic: "/rɪst/",
          definition: "Cổ tay nối bàn tay",
          example: "She wore a expensive gold luxury watch on her left wrist.",
          exampleTranslation: "Cô ấy đeo một chiếc đồng hồ xa xỉ nạm vàng tuyệt đẹp trên mút cổ tay trái.",
          category: "external"
        },
        {
          word: "Toenail",
          pos: "Noun",
          phonetic: "/ˈtəʊneɪl/",
          definition: "Móng chân bảo vệ ngón",
          example: "She painted her toenails bright pink for the summer tropical beach trip.",
          exampleTranslation: "Cô ấy tô điểm móng chân màu hồng sáng cho chuyến đi biển nhiệt đới mùa hè hân hoan.",
          category: "external"
        },
        {
          word: "Shoulder",
          pos: "Noun",
          phonetic: "/ˈʃəʊldə(r)/",
          definition: "Vai đỡ khớp cánh tay",
          example: "He carried the heavy canvas backpack on his robust right shoulder.",
          exampleTranslation: "Anh ấy vác chiếc ba lô vải bạt nặng trịch tựa trên khớp vai phải khỏe khoắn.",
          category: "skeletal"
        },
        {
          word: "Thigh",
          pos: "Noun",
          phonetic: "/θaɪ/",
          definition: "Cơ đùi dầy khỏe",
          example: "Squats represent standard physical exercises for strengthening your thighs.",
          exampleTranslation: "Động tác ngồi xổm gánh tạ đại diện cho bài tập thể chất chuẩn chỉ giúp nở to cơ đùi.",
          category: "external"
        },
        {
          word: "Ankle",
          pos: "Noun",
          phonetic: "/ˈæŋkl/",
          definition: "Cổ chân mắt cá",
          example: "He unfortunate tripped on an office cable and sprained his ankle.",
          exampleTranslation: "Anh ấy không may vấp chân trúng đường dây điện văn phòng và bị bong gân mắt cá chân.",
          category: "external"
        },
        {
          word: "Extremities",
          pos: "Noun",
          phonetic: "/ɪkˈstremətiz/",
          definition: "Đầu cực cơ thể (tay chân)",
          example: "Keeping hands and feet warm prevents cold shock inside body extremities.",
          exampleTranslation: "Giữ ấm lòng bàn tay kẽ chân phòng ngừa sốc nhiệt bất ngờ ở các điểm đầu cực cơ thể.",
          category: "external"
        },
        {
          word: "Spine",
          pos: "Noun",
          phonetic: "/spaɪn/",
          definition: "Xương cột sống dải nâng đỡ",
          example: "Bad sitting posture at office chairs can lead to chronic lumbar spine pain.",
          exampleTranslation: "Tư thế ngồi dựa xấu tại bàn ghế công sở kéo dài dẫn tới chứng đau mạn tính cột sống thắt lưng.",
          category: "skeletal"
        },
        {
          word: "Ribcage",
          pos: "Noun",
          phonetic: "/ˈrɪb.keɪdʒ/",
          definition: "Khung xương sườn / lồng ngực",
          example: "The skeletal ribcage acts as a sturdy bone shield guarding soft lungs and heart.",
          exampleTranslation: "Cấu trúc khung xương sườn đóng vai trò như chiếc khiên xương vững vàng bao bọc tim và phổi mỏng manh.",
          category: "skeletal"
        },
        {
          word: "Pelvis",
          pos: "Noun",
          phonetic: "/ˈpelvɪs/",
          definition: "Xương chậu giữ thăng bằng",
          example: "The human pelvis bone supports the weight of the torso structure.",
          exampleTranslation: "Hệ xương chậu của con người chịu áp lực nâng đỡ toàn bộ khối lượng thân trên.",
          category: "skeletal"
        },
        {
          word: "Cerebellum",
          pos: "Noun",
          phonetic: "/ˌser.əˈbel.əm/",
          definition: "Tiểu não kiểm soát thăng bằng",
          example: "Balance exercises stimulate the cerebellum of the human brain.",
          exampleTranslation: "Các bài tập giữ cân bằng kích hoạt và mài sắc hoạt động của cơ quan tiểu não bên trong não bộ.",
          category: "organs"
        },
        {
          word: "Ventricle",
          pos: "Noun",
          phonetic: "/ˈven.trɪ.kəl/",
          definition: "Tâm thất tim co bóp",
          example: "The powerful left ventricle of the heart pumps oxygenated blood.",
          exampleTranslation: "Tâm thất bên trái khỏe mạnh của trái tim hoạt động bền bỉ co bóp đẩy máu giàu oxy nuôi cơ thể.",
          category: "organs"
        },
        {
          word: "Kidneys",
          pos: "Noun",
          phonetic: "/ˈkɪdniz/",
          definition: "Cặp quả thận thanh lọc máu",
          example: "Drinking pure mineral water daily is highly beneficial for kidneys to clear toxins.",
          exampleTranslation: "Uống nước khoáng sạch đầy đủ hàng ngày đem lại lợi ích tốt hỗ trợ thận lọc sạch chất cặn bã.",
          category: "organs"
        }
      ]
    }
  ]
};

export const happyHolidaysChapter: BookMindmapChapter = {
  id: 10,
  title: "Happy Holidays",
  vietnameseTitle: "Lễ hội & Ngày kỷ niệm",
  sections: [
    {
      id: "festival",
      name: "Festivals & Commemoration (Các dịp tụ họp hân hoan)",
      description: "Thấu suốt từ vựng Tết Nguyên Đán, Giáng sinh lung linh, Lễ hội ma Halloween hay các mốc kỷ niệm gia đình.",
      categories: [
        { id: "oriental", name: "Tết Âm / Trung Thu (Traditional Lunar)", color: "from-red-500 to-red-700 border-red-400 text-red-100" },
        { id: "occidental", name: "Giáng Sinh / Halloween (Western Celebrations)", color: "from-purple-550 to-purple-750 border-purple-400 text-purple-100" },
        { id: "secular", name: "Ngày Trái Đất / Của Mẹ (Earth & Family Day)", color: "from-emerald-450 to-emerald-650 border-emerald-300 text-emerald-100" }
      ],
      nodes: [
        {
          word: "Ancestral worship",
          pos: "Noun",
          phonetic: "/ænˈsestrəl ˈwɜːʃɪp/",
          definition: "Tục thờ cúng Tổ tiên nghĩa cử",
          example: "Families clean ancestor altars to practice traditional ancestral worship during Lunar New Year.",
          exampleTranslation: "Gia đình chu đáo lau dọn bàn thờ bài vị để thực thi lễ thờ cúng kính nhớ Tổ tiên dịp Tết Nguyên Đán cổ truyền.",
          category: "oriental"
        },
        {
          word: "Festive atmosphere",
          pos: "Noun",
          phonetic: "/ˈfestɪv ˈætməsfɪə(r)/",
          definition: "Bầu không khí lễ hội ngập tràn",
          example: "Street vendors hanging bright yellow star lanterns spread a wonderful festive atmosphere.",
          exampleTranslation: "Các gánh hàng rong treo lồng đèn sao vàng rực phả một bầu không khí lễ hội vui sảng khoái.",
          category: "oriental"
        },
        {
          word: "Commemorate",
          pos: "Verb",
          phonetic: "/kəˈmeməreɪt/",
          definition: "Tôn vinh / kỷ niệm long trọng",
          example: "Mother's Day serves to commemorate the profound selflessness of motherhood.",
          exampleTranslation: "Ngày của Mẹ là ngày để tôn vinh long trọng tình yêu bao la vô điều kiện của Đấng sinh thành.",
          category: "secular"
        },
        {
          word: "reunion",
          pos: "Noun",
          phonetic: "/ˌriːˈjuːniən/",
          definition: "Sự sum họp / đoàn viên gia đình",
          example: "Lunar New Year is a time of warm family reunion and happiness.",
          exampleTranslation: "Tết Nguyên Đán là thời khắc thiêng liêng tuyệt vời cho việc mọi gia đình đoàn viên sum họp đầm ấm.",
          category: "oriental"
        },
        {
          word: "Carols",
          pos: "Noun",
          phonetic: "/ˈkærəlz/",
          definition: "Nhạc Giáng sinh / Thánh ca hỷ hoan",
          example: "The beautiful choir sang joyful Christmas carols in front of the cathedral.",
          exampleTranslation: "Nhóm ca đoàn ngân giọng đồng thanh cất lên những bản thánh ca Giáng sinh thánh thót trước tòa nhà thánh đường.",
          category: "occidental"
        },
        {
          word: "Costume",
          pos: "Noun",
          phonetic: "/ˈkɒstjuːm/",
          definition: "Trang phục hóa trang lễ hội",
          example: "Children dress in spooky costumes searching for sweet candies during Halloween.",
          exampleTranslation: "Trẻ nhỏ xúng xính trong các bộ đồ hóa trang ma mị thích thú đi gõ cửa xin kẹo ngọt đêm lễ Halloween.",
          category: "occidental"
        },
        {
          word: "conservation",
          pos: "Noun",
          phonetic: "/ˌkɒnsəˈveɪʃn/",
          definition: "Sự bảo tồn sinh thái thiên nhiên",
          example: "Earth Day inspires million people to promote organic energy conservation projects.",
          exampleTranslation: "Ngày Trái Đất thúc đẩy hàng triệu trái tim đồng thuận chung tay xây dựng sáng kiến bảo tồn sinh thái xanh tự nhiên.",
          category: "secular"
        }
      ]
    }
  ]
};

export const aboutNumbersChapter: BookMindmapChapter = {
  id: 11,
  title: "About Numbers",
  vietnameseTitle: "Khoa học Toán & Số liệu",
  sections: [
    {
      id: "mathematic",
      name: "Mathematics & Statistics (Khoa học thuật toán)",
      description: "Phân biệt dải đo lường số, dải đại số, hình học phẳng phẳng phẳng phẳng Flat không gian flats hay niên hiệu biên niên sử lịch thời đại.",
      categories: [
        { id: "arithmetic", name: "Phép toán / Phép tính (Arithmetic & Measurement)", color: "from-teal-500 to-teal-700 border-teal-400 text-teal-100" },
        { id: "analytical", name: "Hình học / Đại số (Algebra & Geometry)", color: "from-indigo-600 to-indigo-850 border-indigo-400 text-indigo-100" },
        { id: "temporality", name: "Niên hạn / Thời Gian (Time & Temporality)", color: "from-sky-450 to-sky-650 border-sky-305 text-sky-950" }
      ],
      nodes: [
        {
          word: "Quantitative data",
          pos: "Noun",
          phonetic: "/ˈkwɒntɪtətɪv ˈdeɪtə/",
          definition: "Dữ liệu định lượng / số liệu đếm được",
          example: "IELTS students present quantitative data inside chart analysis essays.",
          exampleTranslation: "Các học viên IELTS trình bày các dữ liệu dạng con số định lượng trong phần văn viết biểu đồ.",
          category: "arithmetic"
        },
        {
          word: "Theorem",
          pos: "Noun",
          phonetic: "/ˈθɪərəm/",
          definition: "Định lý toán hình học chứng minh",
          example: "The Pythagorean theorem serves as a foundational equation inside modern geometry.",
          exampleTranslation: "Định lý Pytago đóng vai trò một phương thức nền tảng toán hình học cốt lõi phục vụ đo đạc xây dựng ngày nay.",
          category: "analytical"
        },
        {
          word: "Chronological order",
          pos: "Noun",
          phonetic: "/ˌkrɒnəˈlɒdʒɪkl ˈɔːdə(r)/",
          definition: "Trật tự thời gian / chuỗi biên niên",
          example: "Historical milestones should be cataloged in strict chronological order.",
          exampleTranslation: "Các dấu mốc sự kiện lịch sử hệ trọng cần được biên chép và sắp đặt tuần tự theo trật tự lịch sử gắt gao.",
          category: "temporality"
        },
        {
          word: "Division",
          pos: "Noun",
          phonetic: "/dɪˈvɪʒn/",
          definition: "Phép chia toán học",
          example: "Students master basic division calculations before progressing to complex algebra logic.",
          exampleTranslation: "Học sinh tiểu học thành thục phép toán chia cơ bản trước khi chuyển qua rèn luyện tư duy đại số phức hợp.",
          category: "arithmetic"
        },
        {
          word: "Equation",
          pos: "Noun",
          phonetic: "/ɪˈkweɪʒn/",
          definition: "Phương trình toán có ẩn số",
          example: "The computer program solves multi-variable mathematical equations inside micro-seconds.",
          exampleTranslation: "Hệ chương trình vi tính tự động tính toán ra kết quả các phương trình toán đa ẩn số chỉ trong chớp mắt.",
          category: "analytical"
        },
        {
          word: "Decade",
          pos: "Noun",
          phonetic: "/ˈdekeɪd/",
          definition: "Thập kỷ (quãng dặm dài 10 năm)",
          example: "Computers have undergone tremendous structural and memory evolutions over the last decade.",
          exampleTranslation: "Các dòng thiết bị vi tính trải qua bước nhảy vọt cách tân kỳ vĩ về cấu trúc và dung lượng cả một thập kỷ qua.",
          category: "temporality"
        }
      ]
    }
  ]
};
