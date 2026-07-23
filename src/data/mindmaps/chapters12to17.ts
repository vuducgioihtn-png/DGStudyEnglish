import { BookMindmapChapter } from "../bookMindmaps";

export const loveChapter: BookMindmapChapter = {
  id: 12,
  title: "Love",
  vietnameseTitle: "Mối quan hệ & Tình cảm",
  sections: [
    {
      id: "romance",
      name: "Romance & Relationships (Mối quan hệ đôi lứa)",
      description: "Học từ vựng cầu hôn, chúc tụng đám cưới, mâu thuẫn tranh cãi rạn nứt hay hành trình thai kỳ chào đón em bé.",
      categories: [
        { id: "affection", name: "Thăng hoa / Đám cưới (Dating & Marriage)", color: "from-pink-400 to-pink-600 border-pink-300 text-pink-100" },
        { id: "discord", name: "Cãi vã / Ly hôn (Arguments & Divorce)", color: "from-slate-500 to-slate-700 border-slate-400 text-slate-100" },
        { id: "natal", name: "Thai Kỳ / Trẻ Em (Pregnancy & Natal)", color: "from-cyan-405 to-cyan-605 border-cyan-350 text-cyan-950" }
      ],
      nodes: [
        {
          word: "Betrothal wedding",
          pos: "Noun",
          phonetic: "/bɪˈtrəʊðl ˈwedɪŋ/",
          definition: "Lễ ăn hỏi / nghi thức đính hôn chính quy",
          example: "The happy couple exchanged emerald rings during their formal betrothal wedding ceremony.",
          exampleTranslation: "Cặp trai gái hạnh phúc lồng ngón tay trao nhẫn ngọc bảo lục trong buổi lễ dạm ngõ ăn hỏi trọng đại của gia đình.",
          category: "affection"
        },
        {
          word: "Irreconcilable discord",
          pos: "Noun",
          phonetic: "/ˌɪrekənˈsaɪləbl ˈdɪskɔːd/",
          definition: "Sự bất hòa không thể điều đình",
          example: "Months of silent treatment led to irreconcilable discord inside their relationship.",
          exampleTranslation: "Nhiều tháng chiến tranh lạnh im lặng bất hòa dai dẳng tột cùng đẩy cuộc hôn nhân tới điểm không thỏa hiệp nổi.",
          category: "discord"
        },
        {
          word: "Maternity leaves",
          pos: "Noun",
          phonetic: "/məˈtɜːnəti liːvz/",
          definition: "Thời gian nghỉ thai sản (nghỉ sinh em bé)",
          example: "Companies provide paid maternity leaves to ensure maternal and newborn child recovery.",
          exampleTranslation: "Các doanh nghiệp có chế độ trả lương nguyên dải suốt quá trình nghỉ thai sản giúp người mẹ chăm bẵm em bé sơ sinh khỏe mạnh.",
          category: "natal"
        },
        {
          word: "Affectionate",
          pos: "Adjective",
          phonetic: "/əˈfek.ʃən.ət/",
          definition: "Trìu mến dịu ngọt nâng niu",
          example: "The mother gave her sleepy baby an affectionate hug.",
          exampleTranslation: "Người mẹ ôm con nhỏ đang thiu thiu ngủ vào lòng một cách ôm áp vỗ về nâng niu trìu mến vô bờ bến.",
          category: "affection"
        },
        {
          word: "Reconciliation",
          pos: "Noun",
          phonetic: "/ˌrek.ənˌsɪl.iˈeɪ.ʃən/",
          definition: "Sự hòa giải / lập bàn hòa giải",
          example: "After weeks of arguments, the couple finally achieved sweet reconciliation.",
          exampleTranslation: "Sau những tuần dài hậm hực cãi cọ tủi hờn, cuối cùng họ cũng đi đến hồi hòa hợp hàn gắn dịu ngọt.",
          category: "affection"
        },
        {
          word: "Prenatal care",
          pos: "Noun",
          phonetic: "/ˌpriːˈneɪ.təl keə(r)/",
          definition: "Săn sóc tiền sản / chăm khám thai kỳ",
          example: "Comprehensive prenatal care reduces health risks for both mother and fetus.",
          exampleTranslation: "Công tác khám chữa bệnh chăm sóc điều độ tiền thai sản chặn đứng nguy cơ biến chứng rủi ro cho cả mẹ lẫn đứa bé.",
          category: "natal"
        },
        {
          word: "Antagonize",
          pos: "Verb",
          phonetic: "/ænˈtæɡ.ə.naɪz/",
          definition: "Hạ bệ ghét bỏ tạo thù địch",
          example: "Avoid using offensive words which can antagonize your partner.",
          exampleTranslation: "Hãy khéo léo tiết chế trách mắng lời nói xúc phạm có thể châm ngòi hận thù thù địch chia rẽ cả đôi bên.",
          category: "discord"
        }
      ]
    }
  ]
};

export const aboutPeopleChapter: BookMindmapChapter = {
  id: 13,
  title: "About People",
  vietnameseTitle: "Nhân chủng & Gia đình",
  sections: [
    {
      id: "humanlife",
      name: "Identity & Census (Nhân chủng học)",
      description: "Thấu cảm cung bậc ngũ quan người, chặng đường đời, cây cấu trúc gia tiên lẫn hệ bản sắc quốc tịch.",
      categories: [
        { id: "sensory", name: "Giác Quan & Hành Vi (Senses & Movement)", color: "from-emerald-450 to-emerald-650 border-emerald-350 text-emerald-105" },
        { id: "anthropology", name: "Đời Người & Gia Đình (Life Stage & Kinship)", color: "from-purple-500 to-purple-700 border-purple-400 text-purple-100" },
        { id: "national", name: "Quốc Tịch / Quốc Gia (Nationality & Geography)", color: "from-blue-550 to-blue-750 border-blue-400 text-blue-105" }
      ],
      nodes: [
        {
          word: "Sensory perception",
          pos: "Noun",
          phonetic: "/ˈsensəri pəˈsepʃn/",
          definition: "Nhận thức qua giác quan",
          example: "Taste buds on our tongue play a critical role inside our daily sensory perception.",
          exampleTranslation: "Các nụ vị giác li ti bọc trên lưỡi thực thi phận sự then chốt cấu thành khối nhận thức vị giác hàng ngày.",
          category: "sensory"
        },
        {
          word: "Genealogy heirloom",
          pos: "Noun",
          phonetic: "/ˌdʒiːniˈælədʒi ˈeəluːm/",
          definition: "Hồ sơ phả hệ gia tộc",
          example: "The grandfather passed down the detailed family genealogy heirloom to his grandchildren.",
          exampleTranslation: "Cụ nội cẩn trọng giao phó lại tệp gia phả bảo vật thờ phụng từ các đời bô lão cho thế hệ con cháu nương tựa giữ gìn.",
          category: "anthropology"
        },
        {
          word: "Multiculturalism",
          pos: "Noun",
          phonetic: "/ˌmʌltiˈkʌltʃərə lɪzəm/",
          definition: "Sự đa dạng bản sắc văn hóa",
          example: "The metropolitan hub is characterized by harmonious multiculturalism.",
          exampleTranslation: "Đô thị tấp nập đại diện cho sự phối hợp hội nhập hài hòa đẹp đẽ đa nguồn cội dòng văn hóa khác lạ.",
          category: "national"
        },
        {
          word: "Visual auditory",
          pos: "Adjective",
          phonetic: "/ˈvɪʒ.u.əl ˈɔː.dɪ.tər.i/",
          definition: "Thuộc thính thị / nghe nhìn",
          example: "A balanced educational design targets both visual and auditory sensory nerves.",
          exampleTranslation: "Giáo trình giảng dạy chuẩn luôn đánh trực diện kích thích cả mút dây thần kinh thị giác nghe và nhìn.",
          category: "sensory"
        },
        {
          word: "Adolescence milestone",
          pos: "Noun",
          phonetic: "/ˌæd.əˈles.əns ˈmaɪl.stəʊn/",
          definition: "Mốc trưởng thành tuổi vị thành niên",
          example: "Moving from childhood to adolescence represents an exciting life transition.",
          exampleTranslation: "Hành trình bứt phá rũ bỏ tuổi thơ đi sang ngưỡng cửa dậy thì đại diện cho cú ngoặt chuyển dịch vô vùng rạo rực.",
          category: "anthropology"
        },
        {
          word: "Sovereignty boundary",
          pos: "Noun",
          phonetic: "/ˈsɒv.rən.ti ˈbaʊn.dər.i/",
          definition: "Ranh giới chủ quyền quốc gia",
          example: "Diplomatic measures defend national sovereignty boundaries.",
          exampleTranslation: "Hàng loạt biện pháp củng cố đối ngoại được vận dụng để củng cố vững chãi dải ranh giới chủ quyền nước nhà.",
          category: "national"
        }
      ]
    }
  ]
};

export const makeupChapter: BookMindmapChapter = {
  id: 14,
  title: "Make-up",
  vietnameseTitle: "Diện lý & Trang phục",
  sections: [
    {
      id: "aesthetic",
      name: "Aesthetics (Diện lý thời trang)",
      description: "Thế giới muôn màu của y phục lụa là cá tính, trang sức đính kèm lung linh quý tộc cho đến chăm khám spa thẩm mỹ.",
      categories: [
        { id: "wardrobe", name: "Trang phục / Giày (Clothing & Shoes)", color: "from-teal-400 to-teal-600 border-teal-300 text-teal-100" },
        { id: "acc", name: "Phụ Kiện đi kèm (Accessories)", color: "from-amber-500 to-amber-700 border-amber-400 text-amber-100" },
        { id: "grooming", name: "Làm Đẹp / Mỹ Phẩm (Cosmetics & Salon)", color: "from-pink-500 to-pink-700 border-pink-400 text-pink-101" }
      ],
      nodes: [
        {
          word: "Bespoke costume",
          pos: "Noun",
          phonetic: "/bɪˈspəʊk ˈkɒstjuːm/",
          definition: "Sản phẩm may đo thiết kế thủ công tinh xảo",
          example: "The movie actor wore a bespoke costume to the golden red-carpet awards.",
          exampleTranslation: "Chàng tài tử điện ảnh diện bộ com-lê thiết kế thủ công tinh xảo độc nhất sải bước lên bục thảm đỏ cúp vàng danh giá.",
          category: "wardrobe"
        },
        {
          word: "Priceless gemstone",
          pos: "Noun",
          phonetic: "/ˈpraɪsləs ˈdʒemstəʊn/",
          definition: "Đá quý vô giá nạm trang sức",
          example: "The crown is embedded with priceless gemstones of blue color.",
          exampleTranslation: "Chiếc vương miện quyền thế lấp lánh được nạm nguyên khối những viên đá lục bảo vô giá ngút ngàn.",
          category: "acc"
        },
        {
          word: "Dermatology treatment",
          pos: "Noun",
          phonetic: "/ˌdɜːməˈtɒlədʒi ˈtriːtmənt/",
          definition: "Hỗ trợ trị liệu chăm sóc da liễu",
          example: "He booked a dermatology treatment at the high-end skincare clinic to cure acne.",
          exampleTranslation: "Anh ấy lên lịch hẹn thăm khám điều trị da liễu tại thẩm mỹ viện danh tiếng để giải quyết triệt để vết thâm mụn.",
          category: "grooming"
        },
        {
          word: "Exquisite apparel",
          pos: "Noun",
          phonetic: "/ɪkˈskwɪz.ɪt əˈpær.əl/",
          definition: "Y phục quý phái / hàng cao cấp",
          example: "Fine silk and exquisite apparel are displayed in the high-end boutique window.",
          exampleTranslation: "Chất liệu tơ tằm quý và những bộ y phục quý phái thiết kế cầu kỳ được bài trí ở ô kính tiệm thời trang cao cấp.",
          category: "wardrobe"
        },
        {
          word: "Brooch",
          pos: "Noun",
          phonetic: "/brəʊtʃ/",
          definition: "Ghim cài áo nạm vàng đá quý",
          example: "A silver leaf brooch pinned on her chest lapel added instant elegance to her blazer.",
          exampleTranslation: "Chiếc ghim cài áo hình lá bạc đính trên cổ áo hoa giúp bừng lên nét quý phái của bộ com-lê lập tức.",
          category: "acc"
        },
        {
          word: "Moisturizer",
          pos: "Noun",
          phonetic: "/ˈmɔɪs.tʃər.aɪ.zər/",
          definition: "Kem cấp ẩm / dưỡng ẩm da",
          example: "Applying a rich moisturizer overnight restores dry skin lipids during cold winter months.",
          exampleTranslation: "Thoa một lớp kem dưỡng ẩm dày ban đêm giúp khóa ẩm phục hồi cho da khô ráp suốt mùa đông.",
          category: "grooming"
        }
      ]
    }
  ]
};

export const animalKingdomChapter: BookMindmapChapter = {
  id: 15,
  title: "Animal Kingdom",
  vietnameseTitle: "Thế giới Động vật",
  sections: [
    {
      id: "zoology",
      name: "Zoology (Cơ sinh thú học)",
      description: "Phân loại giống loài dải từ thú cưng đáng yêu hiền hậu, chim bay cao muôn màu dải biển xanh cho đến quái thú hoang dã rừng xanh.",
      categories: [
        { id: "domestic", name: "Thú Cưng (Pets & Cute Animals)", color: "from-amber-400 to-amber-600 border-amber-305 text-amber-950" },
        { id: "marine", name: "Sâu Thẳm Biển / Chim (Ocean & Birds)", color: "from-sky-505 to-sky-705 border-sky-400 text-sky-955" },
        { id: "terrestrial", name: "Thú Hoang dã (Land Animals & Bugs)", color: "from-emerald-550 to-emerald-750 border-emerald-400 text-emerald-100" }
      ],
      nodes: [
        {
          word: "Feline agility",
          pos: "Noun",
          phonetic: "/ˈfiːlaɪn əˈdʒɪləti/",
          definition: "Sự uyển chuyển nhanh nhẹn họ nhà mèo",
          example: "Cats utilize extreme feline agility to balance smoothly on narrow wooden fences.",
          exampleTranslation: "Loài mèo phát huy triệt để độ linh động thăng bằng uyển chuyển của bộ móng vuốt để đi trên bờ rào hẹp gỗ trơn trượt.",
          category: "domestic"
        },
        {
          word: "Nocturnal predator",
          pos: "Noun",
          phonetic: "/nɒkˈtɜːnl ˈpredətə(r)/",
          definition: "Thú săn mồi hoạt động về đêm",
          example: "The owl is a classic nocturnal predator with incredible hunting vision.",
          exampleTranslation: "Cú mèo là loài săn mồi ăn đêm tiêu biểu có thị lực nhạy bén bắt mồi tăm tối.",
          category: "terrestrial"
        },
        {
          word: "Bioluminescent",
          pos: "Adjective",
          phonetic: "/ˌbaɪəʊˌluːmɪˈnesnt/",
          definition: "Có khả năng tự phát quang sinh học",
          example: "Jellyfish under deep sea depths present beautiful bioluminescent lighting patterns.",
          exampleTranslation: "Vô số loài sứa biển khơi muôn dặm thẳm phát lộ những quầng sáng phát quang mát dịu xanh ngọc diệu kỳ.",
          category: "marine"
        },
        {
          word: "Domestication",
          pos: "Noun",
          phonetic: "/dəˌmes.tɪˈkeɪ.ʃən/",
          definition: "Quá trình thuần hóa vật nuôi",
          example: "The domestication of wolves over thousands of years yielded our loyal modern dog breeds.",
          exampleTranslation: "Quá trình thuần hóa dã thú chó sói hàng ngàn năm ròng rã mài dũa xuất sinh ra loài chó nuôi trung thành hôm nay.",
          category: "domestic"
        },
        {
          word: "Plankton",
          pos: "Noun",
          phonetic: "/ˈplæŋk.tən/",
          definition: "Sinh vật phù du trôi nổi tự do",
          example: "Whales swallow thousands of tons of tiny ocean plankton to sustain their gigantic body weight.",
          exampleTranslation: "Cá voi khổng lồ nuốt hàng ngàn tấn phù du li ti trong nước biển để đắp lại hệ năng lượng vận động nặng nề.",
          category: "marine"
        },
        {
          word: "Camouflage skin",
          pos: "Noun",
          phonetic: "/ˈkæm.ə.flɑːʒ skɪn/",
          definition: "Bộ da ngụy trang tiệp màu tự nhiên",
          example: "Chameleons modify their pigment cells to form a perfect camouflage skin.",
          exampleTranslation: "Loài tắc kè nhanh chóng thay đổi hoạt tủy tế bào da tạo thành bộ ngụy trang hòa lẫn với cành cây mộc mạc.",
          category: "terrestrial"
        }
      ]
    }
  ]
};

export const natureChapter: BookMindmapChapter = {
  id: 16,
  title: "Nature",
  vietnameseTitle: "Vũ trụ & Hệ sinh thái",
  sections: [
    {
      id: "ecosystem",
      name: "Ecosystems & Universe (Vũ trụ & Hệ sinh thái thực tế)",
      description: "Nối bước rèn từ địa thế địa cầu, đất đai tài nguyên quý giá, kiểu khí hậu sấm giông lẫn vòm trời thiên hà vũ trụ.",
      categories: [
        { id: "geological", name: "Đất Đai / Địa hình / Tài Nguyên (Earth & Gas & Minerals)", color: "from-amber-600 to-amber-800 border-amber-500 text-amber-101" },
        { id: "climatology", name: "Thời Tiết & Khí Hậu (Weather & Climatology)", color: "from-sky-450 to-sky-650 border-sky-350 text-sky-101" },
        { id: "astronomical", name: "Vũ Trụ tinh vân (Universe & Asteroids)", color: "from-indigo-650 to-indigo-900 border-indigo-500 text-indigo-101" }
      ],
      nodes: [
        {
          word: "Geothermal activity",
          pos: "Noun",
          phonetic: "/-dʒiːəʊˈθɜːml ækˈtɪvəti/",
          definition: "Hoạt động địa nhiệt sâu lòng đất",
          example: "Volcanic terrains generate clean geothermal activity serving as resource parameters.",
          exampleTranslation: "Vùng đất núi lửa phun trào sản sinh ra dòng địa nhiệt vô hại cực sạch thiết lập nguồn điện thay thế.",
          category: "geological"
        },
        {
          word: "Torrential downpour",
          pos: "Noun",
          phonetic: "/təˈrenʃl ˈdaʊnpɔː(r)/",
          definition: "Cơn mưa xối xả ngập lụt",
          example: "A sudden torrential downpour flooded low-lying streets within twenty minutes of thunder.",
          exampleTranslation: "Trận mưa rào sấm giông đổ xối xả bất thình lình nhấn chìm hàng loạt tuyến phố trũng thấp chỉ sau 20 cái chớp.",
          category: "climatology"
        },
        {
          word: "Gravitational pull",
          pos: "Noun",
          phonetic: "/ˌɡrævɪˈteɪʃənl pʊl/",
          definition: "Lực hấp dẫn vũ trụ siêu phàm",
          example: "Black holes utilize a massive gravitational pull which swallows nearby light rays.",
          exampleTranslation: "Hố đen vũ trụ phóng ra lực hút hấp dẫn khổng lồ có thể bẻ gãy và nuốt trọn tắp mọi tia sáng lướt qua nó.",
          category: "astronomical"
        },
        {
          word: "Erosion",
          pos: "Noun",
          phonetic: "/ɪˈrəʊ.ʒən/",
          definition: "Sự xói mòn / sạt lở địa chất",
          example: "Planting tall trees along sea shores prevents wind erosion from eating sandy beaches.",
          exampleTranslation: "Xây hàng rào cây bản địa dọc mép cát ngăn chặn rủi ro gió bão xói mòn cào rách đất đai ven bờ.",
          category: "geological"
        },
        {
          word: "Meteorological station",
          pos: "Noun",
          phonetic: "/ˌmiː.ti.ə.rəˈlɒdʒ.ɪ.kəl ˈsteɪ.ʃən/",
          definition: "Trạm quan trắc khí tượng thủy văn",
          example: "The meteorological station warns fishermen of upcoming sea storm pressures.",
          exampleTranslation: "Trạm dự báo đo đạc khí tượng tức thời cấp báo tín hiệu nguy hại cho thuyền bè tránh bão an toàn.",
          category: "climatology"
        },
        {
          word: "Nebula",
          pos: "Noun",
          phonetic: "/ˈneb.jə.lə/",
          definition: "Mây tinh vân rực rỡ vũ trụ",
          example: "The Hubble space camera captured the red glowing colors of an ancient nebula.",
          exampleTranslation: "Ống kính viễn vọng không gian chụp về bức ảnh dải mây tinh vân đỏ quạnh rực rỡ cách xa Trái Đất vạn năm.",
          category: "astronomical"
        }
      ]
    }
  ]
};

export const whatElseChapter: BookMindmapChapter = {
  id: 17,
  title: "What else?",
  vietnameseTitle: "Mảnh ghép Tri thức mở rộng",
  sections: [
    {
      id: "miscellaneous",
      name: "General Knowledge (Mảnh ghép tri thức mở rộng)",
      description: "Học từ vựng tâm lý tính cách con người, văn hóa dân gian đồng thoại âm nhạc dạt dào hay định hướng bản đồ la bàn.",
      categories: [
        { id: "personality", name: "Tính Cách tâm lý (Personality Traits)", color: "from-rose-400 to-rose-600 border-rose-300 text-rose-100" },
        { id: "cultural", name: "Nghệ Thuật / Âm Nhạc / Cổ Tích (Music & Fairy Tales)", color: "from-violet-500 to-violet-700 border-violet-400 text-violet-101" },
        { id: "orientation", name: "Phương Hướng bản đồ (Directions & Orientation)", color: "from-teal-500 to-teal-700 border-teal-400 text-teal-101" }
      ],
      nodes: [
        {
          word: "Compassionate nature",
          pos: "Noun",
          phonetic: "/kəmˈpæʃənət ˈneɪtʃə(r)/",
          definition: "Tấm lòng trắc ẩn đùm bọc vị tha",
          example: "The nurse is beloved for her compassionate nature during hospital healthcare shifts.",
          exampleTranslation: "Cô y tá nhận được muôn vàn kính yêu nhờ vào tấm lòng trắc ẩn tận tụy đùm bọc người bệnh bần hàn.",
          category: "personality"
        },
        {
          word: "Folklore harmony",
          pos: "Noun",
          phonetic: "/ˈfəʊklɔː(r) ˈhɑːməni/",
          definition: "Nhạc điệu đồng thoại dân gian cổ tích",
          example: "Lullabies sung in remote regions reflect the sweet heritage folklore harmony of old times.",
          exampleTranslation: "Bản đồng ca ngân xướng vùng thôn xa phản phất hết mảng giai điệu hồn hậu êm đềm của cốt truyện dân gian xưa cũ.",
          category: "cultural"
        },
        {
          word: "Cartographer coordinates",
          pos: "Noun",
          phonetic: "/kɑːˈtɒɡrəfə(r) kəʊˈɔːdɪnəts/",
          definition: "Điểm tọa độ vẽ bản đồ la bàn",
          example: "The marine captain uses precise cartographer coordinates to avoid hidden rock structures.",
          exampleTranslation: "Vị thuyền trưởng tài ba bám sát những điểm chấm tọa độ vẽ bản đồ la bàn địa thế phòng tránh rạn đá ngầm.",
          category: "orientation"
        },
        {
          word: "Introverted tendency",
          pos: "Noun",
          phonetic: "/ˈɪn.trə.vɜː.tɪd ˈten.dən.si/",
          definition: "Xu hướng tính cách hướng nội",
          example: "Workers with introverted tendency excel at tasks requiring peaceful focus and written planning.",
          exampleTranslation: "Các cộng sự có nét tính cách hướng nội làm việc cực kỳ ưu tú trong mảng phân tích dữ liệu và thiết lập dự thảo văn viết.",
          category: "personality"
        },
        {
          word: "Orchestra symphony",
          pos: "Noun",
          phonetic: "/ˈɔː.kɪ.strə ˈsɪm.fə.ni/",
          definition: "Bản giao hưởng dàn nhạc thính phòng",
          example: "The live orchestra symphony at the opera house earned a standing ovation from the crowd.",
          exampleTranslation: "Bản giao hưởng rực lửa hòa xướng bởi dàn nhạc thính phòng lớn nhận về loạt pháo tay tán thưởng đứng dậy của khán phòng.",
          category: "cultural"
        },
        {
          word: "Orientation compass",
          pos: "Noun",
          phonetic: "/ˌɔː.ri.ənˈteɪ.ʃən ˈkʌm.pəs/",
          definition: "Thiết bị la bàn định hướng",
          example: "The jungle hikers relied on their orientation compass after their digital phone signals died.",
          exampleTranslation: "Những nhà thám hiểm rậm xanh đặt niềm tin cứu rỗi vào ổ la bàn kim định hướng cầm tay khi sóng thoại di động biến mất.",
          category: "orientation"
        }
      ]
    }
  ]
};
