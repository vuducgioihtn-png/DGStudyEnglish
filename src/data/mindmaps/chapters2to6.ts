import { BookMindmapChapter } from "../bookMindmaps";

export const drinkingChapter: BookMindmapChapter = {
  id: 2,
  title: "Drinking",
  vietnameseTitle: "Thức uống & Thói quen",
  sections: [
    {
      id: "beverages",
      name: "Beverages (Thức uống)",
      description: "Các nhóm đồ uống phong phú: Cà phê, trà, rượu mạnh, nước không cồn, nước khoáng tự nhiên.",
      categories: [
        { id: "coffee", name: "Cà phê & Trà (Coffee & Tea)", color: "from-amber-700 to-amber-900 border-amber-600 text-amber-100" },
        { id: "alcohol", name: "Đồ Cồn (Alcohol)", color: "from-rose-500 to-rose-700 border-rose-400 text-rose-100" },
        { id: "soft", name: "Nước Giải Khát (Soft Drinks)", color: "from-emerald-400 to-emerald-600 border-emerald-300 text-emerald-100" }
      ],
      nodes: [
        {
          word: "Espresso",
          pos: "Noun",
          phonetic: "/eˈspresəʊ/",
          definition: "Cà phê Espresso",
          example: "A shot of intense espresso kickstarts productivity early in mornings.",
          exampleTranslation: "Một shot cà phê đậm đặc espresso kích hoạt bùng nổ hiệu quả từ đầu sáng tinh sương.",
          category: "coffee"
        },
        {
          word: "Cocktail",
          pos: "Noun",
          phonetic: "/ˈkɒkteɪl/",
          definition: "Rượu cốc-tai",
          example: "A cold lemon martini cocktail is wonderfully refreshing under sea breezes.",
          exampleTranslation: "Ly rượu cốc-tai dứa chanh mát lạnh sảng khoái tuyệt hảo dưới làn gió mát ngoài khơi.",
          category: "alcohol"
        },
        {
          word: "Chamomile tea",
          pos: "Noun",
          phonetic: "/ˈkæm.ə.maɪl tiː/",
          definition: "Trà hoa cúc",
          example: "Drinking hot chamomile tea before sleeping helps resolve stress blockages.",
          exampleTranslation: "Một ngụm trà hoa cúc nóng trước giấc ngủ xoa dịu đi những nút thắt mệt mỏi căng thẳng đầu óc.",
          category: "coffee"
        },
        {
          word: "Matcha",
          pos: "Noun",
          phonetic: "/ˈmætʃ.ə/",
          definition: "Bột trà xanh Nhật Bản",
          example: "Matcha contains rich antioxidants that promote brain utility and focus.",
          exampleTranslation: "Trà xanh matcha chứa dồi dào chất chống oxy hóa giúp thúc đẩy hoạt động trí não và tăng sự tập trung.",
          category: "coffee"
        },
        {
          word: "Earl Grey",
          pos: "Noun",
          phonetic: "/ˌɜːl ˈɡreɪ/",
          definition: "Trà Bá tước",
          example: "Earl Grey tea is unique for its distinct combination of black tea and fragrant orange oil.",
          exampleTranslation: "Trà Bá tước vô cùng độc đáo nhờ sự kết hợp đặc trưng giữa trà đen và hương cam đỏ tinh tế.",
          category: "coffee"
        },
        {
          word: "Oolong tea",
          pos: "Noun",
          phonetic: "/ˈuː.lɒŋ tiː/",
          definition: "Trà Ô Long",
          example: "Oolong tea has a smooth taste and helps boost physical metabolism.",
          exampleTranslation: "Trà Ô Long có vị thanh nhẹ ngọt hậu và giúp thúc đẩy quá trình trao đổi chất cơ thể.",
          category: "coffee"
        },
        {
          word: "Champagne",
          pos: "Noun",
          phonetic: "/ʃæmˈpeɪn/",
          definition: "Rượu sâm-panh sủi bọt",
          example: "They popped a bottle of vintage champagne to celebrate the project success.",
          exampleTranslation: "Họ khui một chai sâm-panh lâu năm lấp lánh bong bóng để ăn mừng dự án thành công tốt đẹp.",
          category: "alcohol"
        },
        {
          word: "Whiskey",
          pos: "Noun",
          phonetic: "/ˈwɪski/",
          definition: "Rượu uy-sky mạnh",
          example: "The premium glass was filled with aged golden Irish whiskey.",
          exampleTranslation: "Chiếc ly thủy tinh sang trọng chứa đầy rượu uy-sky Ireland vàng óng được ủ lâu năm.",
          category: "alcohol"
        },
        {
          word: "Red Wine",
          pos: "Noun",
          phonetic: "/red waɪn/",
          definition: "Rượu vang đỏ thơm",
          example: "Pouring some rich red wine brings out meat flavors during steak dinners.",
          exampleTranslation: "Rót một chút rượu vang đỏ thơm ngon giúp dậy vị thịt hơn trong bữa tối bít tết.",
          category: "alcohol"
        },
        {
          word: "Vodka",
          pos: "Noun",
          phonetic: "/ˈvɒdkə/",
          definition: "Rượu vót-ka",
          example: "Traditional vodka is filtered multiple times through activated birch charcoal.",
          exampleTranslation: "Rượu vót-ka truyền thống được lọc nhiều lần qua lớp than hoạt tính gỗ bạch dương sạch sẽ.",
          category: "alcohol"
        },
        {
          word: "Soda",
          pos: "Noun",
          phonetic: "/ˈsəʊdə/",
          definition: "Nước ngọt có ga",
          example: "Drinking cold soda with quick fast food is a popular weekend habit.",
          exampleTranslation: "Uống nước ngọt có ga mát lạnh cùng thức ăn nhanh là thói quen cuối tuần phổ biến.",
          category: "soft"
        },
        {
          word: "Lemonade",
          pos: "Noun",
          phonetic: "/ˌleməˈneɪd/",
          definition: "Nước chanh giải khát",
          example: "We made fresh ice-cold lemonade to quench our thirst after hiking.",
          exampleTranslation: "Chúng tôi pha nước chanh đá mát lành để giải tỏa cơn khát sau chuyến đi bộ dã ngoại.",
          category: "soft"
        },
        {
          word: "Smoothie",
          pos: "Noun",
          phonetic: "/ˈsmuːði/",
          definition: "Sinh tố trái cây",
          example: "A high-fiber green smoothie represents a perfect healthy breakfast juice.",
          exampleTranslation: "Một ly sinh tố xanh nhiều chất xơ đại diện cho một thức uống bữa sáng cực tốt cho sức khỏe.",
          category: "soft"
        },
        {
          word: "Tonic",
          pos: "Noun",
          phonetic: "/ˈtɒnɪk/",
          definition: "Nước tonic sủi bọt",
          example: "Tonic water is slightly bitter and pairs perfectly with lemon slices and ice.",
          exampleTranslation: "Nước tonic có gas vị hơi đắng nhẹ và ăn khớp tuyệt vời với những lát chanh mỏng và đá viên.",
          category: "soft"
        },
        {
          word: "Mineral water",
          pos: "Noun",
          phonetic: "/ˈmɪn.ər.əl ˌwɔː.tər/",
          definition: "Nước khoáng thiên nhiên",
          example: "Natural mineral water replenishes essential electrolytes during intensive workouts.",
          exampleTranslation: "Nước khoáng thiên nhiên dồi dào khoáng chất bổ sung các chất điện giải tối cần thiết trong lúc tập luyện tích cực.",
          category: "soft"
        }
      ]
    }
  ]
};

export const homeChapter: BookMindmapChapter = {
  id: 3,
  title: "Home",
  vietnameseTitle: "Không gian Nhà ở",
  sections: [
    {
      id: "livingspace",
      name: "Living Space (Không gian sống)",
      description: "Từ vựng về phòng khách, phòng ngủ, phòng bếp, phòng tắm và trang thiết bị tiện nghi nội thất.",
      categories: [
        { id: "kitchen", name: "Phòng bếp (Kitchen)", color: "from-orange-500 to-orange-700 border-orange-400 text-orange-100" },
        { id: "bedroom", name: "Phòng ngủ (Bedroom)", color: "from-indigo-400 to-indigo-600 border-indigo-300 text-indigo-100" },
        { id: "living", name: "Phòng khách (Living Room)", color: "from-emerald-500 to-emerald-700 border-emerald-400 text-emerald-100" }
      ],
      nodes: [
        {
          word: "Kitchenware",
          pos: "Noun",
          phonetic: "/ˈkɪtʃɪnweə(r)/",
          definition: "Dụng cụ nhà bếp",
          example: "High quality stainless steel kitchenware saves cooking preparation speeds.",
          exampleTranslation: "Bộ dụng cụ nhà bếp bằng thép không gỉ chất lượng cao đẩy nhanh tốc độ sơ chế món ăn.",
          category: "kitchen"
        },
        {
          word: "Blender",
          pos: "Noun",
          phonetic: "/ˈblendə(r)/",
          definition: "Máy xay sinh tố",
          example: "Our new countertop blender crushes hard ice cubes effortlessly.",
          exampleTranslation: "Chiếc máy xay sinh tố bàn bếp mới của chúng tôi xay vụn đá lạnh cực kỳ dễ dàng.",
          category: "kitchen"
        },
        {
          word: "Oven",
          pos: "Noun",
          phonetic: "/ˈʌvn/",
          definition: "Lò nướng",
          example: "She baked a tray of sweet vanilla chocolate chip cookies in the oven.",
          exampleTranslation: "Cô ấy nướng một khay bánh quy sô-cô-la chip hương va-ni ngọt ngào trong lò nướng.",
          category: "kitchen"
        },
        {
          word: "Toaster",
          pos: "Noun",
          phonetic: "/ˈtəʊstə(r)/",
          definition: "Máy nướng bánh mì",
          example: "The electric toaster heats bread slices until they are perfectly crispy and golden.",
          exampleTranslation: "Chiếc máy nướng bánh mì bằng điện làm ấm các lát bánh đến khi chúng giòn rụm và vàng ươm hoàn hảo.",
          category: "kitchen"
        },
        {
          word: "Refrigerator",
          pos: "Noun",
          phonetic: "/rɪˈfrɪdʒəreɪtə(r)/",
          definition: "Tủ lạnh lưu trữ",
          example: "Keep fresh raw food in the refrigerator to prevent bacteria growth.",
          exampleTranslation: "Giữ thực phẩm tươi sống trong tủ lạnh để ngăn chặn sự sinh sôi của vi khuẩn.",
          category: "kitchen"
        },
        {
          word: "Wardrobe",
          pos: "Noun",
          phonetic: "/ˈwɔːdrəʊb/",
          definition: "Tủ quần áo",
          example: "He keeps his suits hung neatly in the wooden wardrobe.",
          exampleTranslation: "Anh ấy treo tất cả các bộ vét ngay ngắn bên trong tủ quần áo bằng tủ gỗ.",
          category: "bedroom"
        },
        {
          word: "Mattress",
          pos: "Noun",
          phonetic: "/ˈmætrəs/",
          definition: "Nệm giường nằm",
          example: "A high-quality memory foam mattress guarantees a good night's sleep.",
          exampleTranslation: "Một chiếc nệm chất lượng cao bằng cao su non bảo đảm cho một giấc ngủ ngon sâu.",
          category: "bedroom"
        },
        {
          word: "Pillowcase",
          pos: "Noun",
          phonetic: "/ˈpɪləʊkeɪs/",
          definition: "Vỏ gối cotton",
          example: "Changing your cotton pillowcase weekly keeps your facial skin clean and soft.",
          exampleTranslation: "Thay vỏ gối cotton hàng tuần giúp giữ cho da mặt của bạn luôn sạch sẽ và mịn màng.",
          category: "bedroom"
        },
        {
          word: "Nightstand",
          pos: "Noun",
          phonetic: "/ˈnaɪt.stænd/",
          definition: "Tủ đầu giường nhỏ",
          example: "She placed her alarm clock and reading book on the wooden nightstand.",
          exampleTranslation: "Cô ấy đặt đồng hồ báo thức và cuốn sách đang đọc trên chiếc tủ đầu giường bằng gỗ.",
          category: "bedroom"
        },
        {
          word: "Chandelier",
          pos: "Noun",
          phonetic: "/ˌʃæn.dəˈlɪər/",
          definition: "Đèn chùm xa hoa",
          example: "A gigantic crystal chandelier glows magnificently over the reception living hall.",
          exampleTranslation: "Đèn chùm pha lê khổng lồ chiếu sáng nguy nga bao phủ sảnh phòng khách trung tâm.",
          category: "living"
        },
        {
          word: "Armchair",
          pos: "Noun",
          phonetic: "/ˈɑːmtʃeə(r)/",
          definition: "Ghế bành êm",
          example: "The elderly man sat comfortably on his leather armchair reading newspapers.",
          exampleTranslation: "Cụ ông ngồi thoải mái trên chiếc ghế bành bằng da quen thuộc để đọc báo.",
          category: "living"
        },
        {
          word: "Bookshelf",
          pos: "Noun",
          phonetic: "/ˈbʊkʃelf/",
          definition: "Giá sách phòng khách",
          example: "A massive pine bookshelf covers the entire wall of the cozy living room.",
          exampleTranslation: "Một chiếc giá sách bằng gỗ thông đồ sộ bao phủ cả bức tường phòng khách ấm cúng.",
          category: "living"
        },
        {
          word: "Coffee table",
          pos: "Noun",
          phonetic: "/ˈtɒf.i ˌteɪ.bəl/",
          definition: "Bàn trà nhỏ phòng khách",
          example: "A marble coffee table is positioned directly in front of the leather sofa.",
          exampleTranslation: "Một bàn trà bằng đá cẩm thạch được bố trí ngay phía trước chiếc ghế sofa da.",
          category: "living"
        }
      ]
    }
  ]
};

export const leisureChapter: BookMindmapChapter = {
  id: 4,
  title: "Leisure Time",
  vietnameseTitle: "Giải trí & Thư giãn",
  sections: [
    {
      id: "entertainment",
      name: "Entertainment (Phương Thức Giải Trí)",
      description: "Học từ vựng rạp chiếu phim, bãi biển, hành trình dã ngoại dốc rừng hay tham quan cổ vật bảo tàng.",
      categories: [
        { id: "outdoor", name: "Dã ngoại / Đi bộ (Outdoor / Hiking)", color: "from-emerald-550 to-emerald-750 border-emerald-400 text-emerald-100" },
        { id: "cinema", name: "Phim ảnh / Rạp phim (Movies & Cine)", color: "from-purple-500 to-purple-700 border-purple-400 text-purple-100" },
        { id: "culture", name: "Văn hóa / Bảo tàng (Museum & Library)", color: "from-amber-500 to-amber-700 border-amber-400 text-amber-100" }
      ],
      nodes: [
        {
          word: "Blockbuster",
          pos: "Noun",
          phonetic: "/ˈblɒkbʌstə(r)/",
          definition: "Phim bom tấn doanh thu",
          example: "The latest science fiction blockbuster broke all domestic box office records.",
          exampleTranslation: "Tác phẩm bom tấn khoa học viễn tưởng mới nhất đã phá bay kỷ lục phòng vé nước nhà.",
          category: "cinema"
        },
        {
          word: "Backpacking",
          pos: "Noun",
          phonetic: "/ˈbækpækɪŋ/",
          definition: "Hành trình du lịch bụi ba-lô",
          example: "Backpacking teaches students resilience and global cultural awareness.",
          exampleTranslation: "Du lịch bụi dạy cho học sinh tính tự lập kiên cường và hiểu sâu hơn về văn hóa toàn cầu bản địa.",
          category: "outdoor"
        },
        {
          word: "Exhibition",
          pos: "Noun",
          phonetic: "/ˌeksɪˈbɪʃn/",
          definition: "Buổi triển lãm văn hóa nghệ thuật",
          example: "The ancient Egypt exhibition at the national library attracted millions of curious tourists.",
          exampleTranslation: "Triển lãm Ai Cập cổ đại mở tại thư viện quốc gia lôi cuốn hàng triệu du khách hiếu kỳ thăm viếng.",
          category: "culture"
        },
        {
          word: "Cinephile",
          pos: "Noun",
          phonetic: "/ˈsɪnɪfaɪl/",
          definition: "Người cuồng nhiệt điện ảnh / mọt phim",
          example: "As a true cinephile, he watches at least four international movies a week.",
          exampleTranslation: "Là một người cuồng phim đích thực, anh ấy xem ít nhất bốn bộ phim quốc tế một tuần.",
          category: "cinema"
        },
        {
          word: "Soundtrack",
          pos: "Noun",
          phonetic: "/ˈtraɪ.k.ə.saʊndtræk/",
          definition: "Nhạc nền trong phim",
          example: "The romantic movie's instrumental soundtrack topped the global music charts.",
          exampleTranslation: "Nhạc nền không lời của bộ phim lãng mạn đã dẫn đầu bảng xếp hạng âm nhạc toàn cầu.",
          category: "cinema"
        },
        {
          word: "Campsite",
          pos: "Noun",
          phonetic: "/ˈkæmpsaɪt/",
          definition: "Khu đất cắm trại dã ngoại",
          example: "We pitched our warm tents near the flowing river at the natural campsite.",
          exampleTranslation: "Chúng tôi dựng những chiếc lều ấm áp gần dòng sông đang chảy tại khu cắm trại thiên nhiên.",
          category: "outdoor"
        },
        {
          word: "Hiking trail",
          pos: "Noun",
          phonetic: "/ˈhaɪkɪŋ treɪl/",
          definition: "Đường mòn đi bộ leo núi",
          example: "The steep hiking trail leads directly to the mountain scenic summit.",
          exampleTranslation: "Con đường đi bộ dã ngoại dốc đứng dẫn thẳng lên đỉnh núi có phong cảnh thơ mộng.",
          category: "outdoor"
        },
        {
          word: "Artifact",
          pos: "Noun",
          phonetic: "/ˈɑːtɪfækt/",
          definition: "Cổ vật khảo cổ",
          example: "The historic museum houses priceless golden artifacts from ancient empires.",
          exampleTranslation: "Bảo tàng lịch sử lưu giữ những cổ vật bằng vàng vô giá từ các nền văn minh triều đại cổ xưa.",
          category: "culture"
        },
        {
          word: "Curator",
          pos: "Noun",
          phonetic: "/jʊəˈreɪtə(r)/",
          definition: "Giám tuyển kỹ nghệ bảo tàng",
          example: "The museum curator spent years organizing the historical pottery exhibition.",
          exampleTranslation: "Giám tuyển bảo tàng dành nhiều năm để tổ chức kỳ triển lãm gốm sứ lịch sử công phu.",
          category: "culture"
        }
      ]
    }
  ]
};

export const blueMondayChapter: BookMindmapChapter = {
  id: 5,
  title: "Blue Monday",
  vietnameseTitle: "Học tập & Sự nghiệp",
  sections: [
    {
      id: "dailyoffice",
      name: "School & Bureaucracy (Trường lớp & Công sở)",
      description: "Vực dậy năng suất từ cơ sở phòng học, văn phòng đại diện cho đến các tòa án hay nhà băng.",
      categories: [
        { id: "academia", name: "Giảng Đường (School & Academia)", color: "from-blue-500 to-blue-700 border-blue-400 text-blue-100" },
        { id: "corporate", name: "Văn Phòng / Công Sở (Office & Corporate)", color: "from-indigo-500 to-indigo-700 border-indigo-400 text-indigo-100" },
        { id: "institutional", name: "Cơ Quan Nhà Nước (Institutional & Public)", color: "from-slate-500 to-slate-700 border-slate-400 text-slate-100" }
      ],
      nodes: [
        {
          word: "Curriculum",
          pos: "Noun",
          phonetic: "/kəˈrɪkjələm/",
          definition: "Chương trình học tập của trường",
          example: "Designing a comprehensive modern school curriculum requires months of study.",
          exampleTranslation: "Việc thiết lập chương trình giảng dạy của trường học tối tân thấu đáo chất lượng mất nhiều tháng trời nghiên cứu.",
          category: "academia"
        },
        {
          word: "Bureaucracy",
          pos: "Noun",
          phonetic: "/bjʊəˈrɒkrəsi/",
          definition: "Bộ máy hành chính quan liêu",
          example: "Corporate workers often complain about the excessive red tape of bureaucracy.",
          exampleTranslation: "Nhân viên văn phòng thường than thở về guồng máy thủ tục rườm rà quan liêu quá đà.",
          category: "corporate"
        },
        {
          word: "Punctuality",
          pos: "Noun",
          phonetic: "/ˌpʌŋktʃuˈæləti/",
          definition: "Tính đúng giờ kỷ luật",
          example: "The firm values strict punctuality in all corporate operations.",
          exampleTranslation: "Hãng kiểm soát gắt gao tính đúng giờ tác phong chuyên nghiệp đối với mọi đầu mối vận hành.",
          category: "corporate"
        },
        {
          word: "Syllabus",
          pos: "Noun",
          phonetic: "/ˈsɪləbəs/",
          definition: "Đề cương học phần môn học",
          example: "The professor handed out the detailed syllabus during the first lecture.",
          exampleTranslation: "Giáo sư đã phát đề cương chi tiết của học phần trong buổi giảng thuyết đầu tiên.",
          category: "academia"
        },
        {
          word: "Pedagogy",
          pos: "Noun",
          phonetic: "/ˈpedəɡɒdʒi/",
          definition: "Khoa sư phạm giáo dục học",
          example: "Effective pedagogy combines visual mindmaps with interactive exercises.",
          exampleTranslation: "Phương pháp sư phạm hiệu quả kết hợp sơ đồ tư duy trực quan với các bài tập tương tác.",
          category: "academia"
        },
        {
          word: "Synergy",
          pos: "Noun",
          phonetic: "/ˈsɪnədʒi/",
          definition: "Sự hiệp lực cộng tác tuyệt vời",
          example: "Corporate synergy improves productivity across project execution phases.",
          exampleTranslation: "Sự hiệp lực của tập đoàn cải thiện năng suất lao động xuyên suốt các giai đoạn triển khai dự án.",
          category: "corporate"
        },
        {
          word: "Embassy",
          pos: "Noun",
          phonetic: "/ˈembəsi/",
          definition: "Đại sứ quán ngoại giao",
          example: "Travelers must apply for their seasonal visas at the national embassy.",
          exampleTranslation: "Du khách phải nộp đơn xin cấp thị thực theo mùa tại cơ quan đại sứ quán quốc gia.",
          category: "institutional"
        },
        {
          word: "Judiciary",
          pos: "Noun",
          phonetic: "/dʒuˈdɪʃiəri/",
          definition: "Hệ thống cơ quan tư pháp",
          example: "The supreme court acts as the crown of the country's independent judiciary system.",
          exampleTranslation: "Tòa án tối cao đóng vai trò là đỉnh cao của hệ thống cơ cấu tư pháp độc lập cả nước.",
          category: "institutional"
        },
        {
          word: "Treasury",
          pos: "Noun",
          phonetic: "/ˈtreʒəri/",
          definition: "Kho bạc nhà nước tài chính",
          example: "The government department keeps gold reserves inside the federal treasury.",
          exampleTranslation: "Bộ phận ban ngành chính phủ lưu trữ quỹ vàng dự trữ quốc gia bên trong kho bạc liên bang.",
          category: "institutional"
        }
      ]
    }
  ]
};

export const sportsChapter: BookMindmapChapter = {
  id: 6,
  title: "Sports",
  vietnameseTitle: "Thể thao & Rèn luyện",
  sections: [
    {
      id: "athletic",
      name: "Athletics (Cơ Trực Quan Thể Lực)",
      description: "Từ vựng về quần vợt, bóng rổ, gym, điền kinh và bơi lội rèn luyện phản xạ phát triển thể chất.",
      categories: [
        { id: "courtsport", name: "Bóng Sân Chơi (Tennis, Basketball, Baseball)", color: "from-amber-400 to-amber-600 border-amber-300 text-amber-950" },
        { id: "fitness", name: "Rèn Luyện Thể Lực (Gym & Fitness)", color: "from-rose-500 to-rose-750 border-rose-450 text-rose-100" },
        { id: "field", name: "Bóng Đá & Điền Kinh (Soccer, Football, Swim)", color: "from-emerald-500 to-emerald-700 border-emerald-400 text-emerald-100" }
      ],
      nodes: [
        {
          word: "Cardiovascular",
          pos: "Adjective",
          phonetic: "/ˌkɑːdiəʊˈvæskjələ(r)/",
          definition: "Thuộc tim mạch và tuần hoàn",
          example: "Swimming acts as a magnificent routine for intense cardiovascular endurance.",
          exampleTranslation: "Môn bơi lội đóng vai trò một bài tập xuất sắc củng cố khả năng tim mạch bền bỉ.",
          category: "field"
        },
        {
          word: "Champion",
          pos: "Noun",
          phonetic: "/ˈtʃæmpiən/",
          definition: "Nhà vô địch tranh giải",
          example: "The local tennis champion defended the golden trophy successfully inside the arena.",
          exampleTranslation: "Nhà vô địch quần vợt bản địa bảo vệ thành công chiếc cúp cờ vàng lấp lánh trong nhà thi đấu.",
          category: "courtsport"
        },
        {
          word: "Metabolism",
          pos: "Noun",
          phonetic: "/məˈtæbəlɪzəm/",
          definition: "Quá trình trao đổi chất thể chất",
          example: "Regular weights lift workouts boost physical dynamic metabolism rates.",
          exampleTranslation: "Lịch rèn nâng tạ đặn đặn đánh bật tỷ lệ trao đổi chất thể chất tuyệt cú mèo.",
          category: "fitness"
        },
        {
          word: "Goalkeeper",
          pos: "Noun",
          phonetic: "/ˈɡəʊlkiːpə(r)/",
          definition: "Thủ môn bảo vệ thành môn",
          example: "The secure goalkeeper leaped high and caught the spinning football.",
          exampleTranslation: "Chàng thủ môn chắc chắn đã bật nhảy cao và bắt gọn quả bóng bóng đang xoay tròn trên không trung.",
          category: "field"
        },
        {
          word: "Marathon",
          pos: "Noun",
          phonetic: "/ˈmærəθən/",
          definition: "Giải chạy đường trường dẻo dai",
          example: "Running a classic marathon requires months of structural stamina practice.",
          exampleTranslation: "Chạy một cuộc kiểm nghiệm marathon cổ điển đòi hỏi nhiều tháng luyện tập thể lực dẻo dai bài bản.",
          category: "field"
        },
        {
          word: "Referee",
          pos: "Noun",
          phonetic: "/ˌrefəˈriː/",
          definition: "Trọng tài phán xử trận đấu",
          example: "The tennis referee sat in the high chair regulating the tournament conflicts.",
          exampleTranslation: "Trọng tài quần vợt ngồi trên chiếc ghế cao điều hành diễn biến và phân giải tranh chấp của trận đấu.",
          category: "courtsport"
        },
        {
          word: "Tournament",
          pos: "Noun",
          phonetic: "/ˈtʊənəmənt/",
          definition: "Giải đấu chính quy",
          example: "Top global basketball players competed intensely in the summer league tournament.",
          exampleTranslation: "Những cầu thủ bóng rổ hàng đầu thế giới đã tranh tài khốc liệt trong giải đấu mùa hè liên đoàn.",
          category: "courtsport"
        },
        {
          word: "Hydration",
          pos: "Noun",
          phonetic: "/haɪˈdreɪʃn/",
          definition: "Sự giữ nước bổ sung điện giải",
          example: "Adequate hydration is critical for athletes training in harsh summer weather.",
          exampleTranslation: "Bù nước bổ sung đầy đủ là cực kỳ quan trọng đối với các vận động viên luyện tập trong điều kiện hè oi bức.",
          category: "fitness"
        },
        {
          word: "Dumbbell",
          pos: "Noun",
          phonetic: "/ˈdʌmbel/",
          definition: "Quả tạ tay sắt",
          example: "He lifted heavy steel dumbbells to build muscle mass in his arms.",
          exampleTranslation: "Anh ấy nâng những quả tạ tay bằng thép nặng để xây dựng cơ bắp săn chắc ở hai cánh tay.",
          category: "fitness"
        }
      ]
    }
  ]
};
