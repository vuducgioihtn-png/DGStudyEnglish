import { BookMindmapChapter } from "../bookMindmaps";

export const eatingChapter: BookMindmapChapter = {
  id: 1,
  title: "Eating",
  vietnameseTitle: "Ăn uống & Thực phẩm",
  sections: [
    {
      id: "fruit",
      name: "Fruit (Trái cây)",
      description: "Phương pháp học từ vựng trái cây phân chia theo dải màu sắc trực quan sinh động của Sách Sơ Đồ Tư Duy.",
      categories: [
        { id: "red", name: "Đỏ (Red)", color: "from-red-400 to-red-600 border-red-300 text-red-100" },
        { id: "orange", name: "Cam (Orange)", color: "from-orange-400 to-orange-500 border-orange-300 text-orange-100" },
        { id: "yellow", name: "Vàng (Yellow)", color: "from-amber-400 to-amber-500 border-amber-300 text-amber-955" },
        { id: "green", name: "Xanh lá (Green)", color: "from-emerald-400 to-emerald-500 border-emerald-300 text-emerald-100" },
        { id: "purple", name: "Tím (Purple)", color: "from-indigo-400 to-indigo-600 border-indigo-300 text-indigo-100" },
        { id: "others", name: "Khác (Others)", color: "from-slate-400 to-slate-500 border-slate-300 text-slate-100" }
      ],
      nodes: [
        // RED
        {
          word: "Apple",
          pos: "Noun",
          phonetic: "/ˈæpl/",
          definition: "Táo, quả táo",
          example: "She took a bite of the crispy red apple.",
          exampleTranslation: "Cô ấy cắn một miếng táo đỏ giòn rụm.",
          category: "red"
        },
        {
          word: "Wax apple",
          pos: "Noun",
          phonetic: "/wæks ˈæpl/",
          definition: "Quả roi / quả mận",
          example: "Wax apples are juicy and refreshing in the summer heat.",
          exampleTranslation: "Quả roi mọng nước và thanh mát trong cái nóng mùa hè.",
          category: "red"
        },
        {
          word: "Strawberry",
          pos: "Noun",
          phonetic: "/ˈstrɔːbəri/",
          definition: "Quả dâu tây",
          example: "Fresh strawberries are perfect for fruit smoothies.",
          exampleTranslation: "Dâu tây tươi rất thích hợp để làm sinh tố trái cây.",
          category: "red"
        },
        {
          word: "Tomato",
          pos: "Noun",
          phonetic: "/təˈmɑːtəʊ/",
          definition: "Quả cà chua",
          example: "Tomatoes are technically fruit but used as vegetables in cooking.",
          exampleTranslation: "Cà chua về thực chất là trái cây nhưng được nấu nướng như rau củ.",
          category: "red"
        },
        {
          word: "Raspberry",
          pos: "Noun",
          phonetic: "/ˈrɑːzbəri/",
          definition: "Quả mâm xôi / phúc bồn tử",
          example: "Raspberries are rich in antioxidants and vitamins.",
          exampleTranslation: "Quả mâm xôi dồi dào chất chống oxy hóa và vitamin.",
          category: "red"
        },
        {
          word: "Cranberry",
          pos: "Noun",
          phonetic: "/ˈkrænbəri/",
          definition: "Quả nam việt quất",
          example: "Cranberry juice is widely used to prevent infections.",
          exampleTranslation: "Nước ép nam việt quất được dùng phổ biến để ngăn ngừa nhiễm trùng.",
          category: "red"
        },
        {
          word: "Peach",
          pos: "Noun",
          phonetic: "/piːtʃ/",
          definition: "Quả đào",
          example: "The peach tree is full of ripe, sweet peaches.",
          exampleTranslation: "Cây đào trĩu quả đào chín ngọt lịm.",
          category: "red"
        },
        {
          word: "Watermelon",
          pos: "Noun",
          phonetic: "/ˈwɔːtəmelən/",
          definition: "Dưa hấu",
          example: "Nothing beats a cold watermelon slice on a sunny afternoon.",
          exampleTranslation: "Không gì tuyệt hơn một lát dưa hấu mát lạnh vào một buổi chiều đầy nắng ấm.",
          category: "red"
        },
        {
          word: "Pomegranate",
          pos: "Noun",
          phonetic: "/ˈpɒmɪɡrænɪt/",
          definition: "Quả lựu đỏ",
          example: "Pomegranate seeds look like tiny shining rubies.",
          exampleTranslation: "Hạt lựu trông giống như những viên hồng ngọc lấp lánh thu nhỏ.",
          category: "red"
        },

        // ORANGE
        {
          word: "Orange",
          pos: "Noun",
          phonetic: "/ˈɒrɪndʒ/",
          definition: "Quả cam",
          example: "Orange juice is a very popular morning beverage.",
          exampleTranslation: "Nước cam ép là một đồ uống buổi sáng cực kỳ thịnh hành.",
          category: "orange"
        },
        {
          word: "Papaya",
          pos: "Noun",
          phonetic: "/pəˈpaɪə/",
          definition: "Quả đu đủ",
          example: "Papaya has sweet orange flesh with small black seeds.",
          exampleTranslation: "Đu đủ có phần thịt màu cam ngọt ngào cùng những hạt đen nhỏ.",
          category: "orange"
        },
        {
          word: "Persimmon",
          pos: "Noun",
          phonetic: "/pɜːˈsɪmən/",
          definition: "Quả hồng ngọt giòn",
          example: "Persimmons become sweet and jelly-like when fully ripe.",
          exampleTranslation: "Những quả hồng trở nên ngọt lịm và dẻo như thạch khi chín hoàn toàn.",
          category: "orange"
        },
        {
          word: "Tangerine",
          pos: "Noun",
          phonetic: "/ˌtændʒəˈriːn/",
          definition: "Quả quýt ngọt",
          example: "Tangerines are easy to peel and very sweet.",
          exampleTranslation: "Quả quýt rất dễ bóc vỏ và cực kỳ ngọt ngào.",
          category: "orange"
        },
        {
          word: "Loquat",
          pos: "Noun",
          phonetic: "/ˈləʊkwɒt/",
          definition: "Quả tì bà / nhót tây",
          example: "Loquats have a unique tangy and sweet tropical flavor.",
          exampleTranslation: "Quả tì bà sở hữu hương vị nhiệt đới chua ngọt đặc trưng.",
          category: "orange"
        },
        {
          word: "Grapefruit",
          pos: "Noun",
          phonetic: "/ˈɡreɪpfluːt/",
          definition: "Quả bưởi chùm",
          example: "Grapefruit is known for its slightly bitter yet nutritional juice.",
          exampleTranslation: "Bưởi chùm nổi tiếng với nguồn nước ép hơi đắng nhưng cực giàu dinh dưỡng.",
          category: "orange"
        },

        // YELLOW
        {
          word: "Lemon",
          pos: "Noun",
          phonetic: "/ˈlemən/",
          definition: "Quả chanh vàng",
          example: "Adding lemon water helps clear skin and improve digestion.",
          exampleTranslation: "Bổ sung nước chanh giúp làm đẹp da và cải thiện hệ tiêu hóa.",
          category: "yellow"
        },
        {
          word: "Banana",
          pos: "Noun",
          phonetic: "/bəˈnɑːnə/",
          definition: "Quả chuối",
          example: "Bananas represent active natural energy boosters.",
          exampleTranslation: "Chuối đại diện cho chất kích hoạt năng lượng tự nhiên năng động.",
          category: "yellow"
        },
        {
          word: "Pineapple",
          pos: "Noun",
          phonetic: "/ˈpaɪnæpl/",
          definition: "Quả dứa / khóm",
          example: "Pineapple is famous for its juicy combination of sweet and sour.",
          exampleTranslation: "Quả dứa rất nổi tiếng nhờ sự kết hợp mọng nước giữa vị chua và vị ngọt.",
          category: "yellow"
        },
        {
          word: "Mango",
          pos: "Noun",
          phonetic: "/ˈmæŋɡə/",
          definition: "Quả xoài ngọt",
          example: "Sweet mango segments melt effortlessly on the tongue.",
          exampleTranslation: "Những miếng xoài ngọt lịm tan chảy một cách dễ dàng trên đầu lưỡi.",
          category: "yellow"
        },
        {
          word: "Durian",
          pos: "Noun",
          phonetic: "/ˈdʒʊəriən/",
          definition: "Quả sầu riêng",
          example: "Durian is crowned the king of tropical fruits.",
          exampleTranslation: "Sầu riêng được phong vương là vua của các loại trái cây nhiệt đới.",
          category: "yellow"
        },
        {
          word: "Pomelo",
          pos: "Noun",
          phonetic: "/ˈpɒmələʊ/",
          definition: "Quả bưởi ta",
          example: "Pomelo has thick skin and sweet firm segments.",
          exampleTranslation: "Quả bưởi ta có lớp vỏ dày cùng những múi bưởi chắc ngọt.",
          category: "yellow"
        },
        {
          word: "Pear",
          pos: "Noun",
          phonetic: "/peə(r)/",
          definition: "Quả lê",
          example: "Sweet pears are beloved for their refreshing water content.",
          exampleTranslation: "Quả lê ngọt được yêu thích vì hàm lượng nước thanh mát và sảng khoái.",
          category: "yellow"
        },
        {
          word: "Starfruit",
          pos: "Noun",
          phonetic: "/ˈstɑː.fruːt/",
          definition: "Quả khế chua ngọt",
          example: "Its star-like look makes starfruit a beautiful dish decoration.",
          exampleTranslation: "Vẻ ngoài giống ngôi sao làm cho quả khế là món trang trí dĩa ăn tuyệt đẹp.",
          category: "yellow"
        },

        // GREEN
        {
          word: "Lime",
          pos: "Noun",
          phonetic: "/laɪm/",
          definition: "Quả chanh xanh ta",
          example: "Lime sets standard flavor profiles in Vietnamese dipping sauces.",
          exampleTranslation: "Chanh xanh tạo nên hương vị tiêu chuẩn trong nước chấm của Việt Nam.",
          category: "green"
        },
        {
          word: "Kiwi",
          pos: "Noun",
          phonetic: "/ˈkiːwiː/",
          definition: "Quả kiwi xanh",
          example: "Kiwi presents exquisite emerald green flesh with tiny seeds.",
          exampleTranslation: "Kiwi mang đến phần thịt quả xanh ngọc lục bảo tinh tế xen lẫn hạt nhỏ.",
          category: "green"
        },
        {
          word: "Melon",
          pos: "Noun",
          phonetic: "/ˈmelən/",
          definition: "Quả dưa / dưa bở",
          example: "A sweet slice of melon cools down hot summer afternoons.",
          exampleTranslation: "Một lát dưa gang ngọt lịm xua tan cái nóng nực của trời chiều hè.",
          category: "green"
        },
        {
          word: "Cantaloupe",
          pos: "Noun",
          phonetic: "/ˈkæntəluːp/",
          definition: "Quả dưa lưới xanh",
          example: "The cantaloupe has sweet orange inner flesh.",
          exampleTranslation: "Quả dưa lưới sở hữu phần cùi ruột màu cam ngọt thanh.",
          category: "green"
        },
        {
          word: "Avocado",
          pos: "Noun",
          phonetic: "/ˌævəˈkɑːdəʊ/",
          definition: "Quả bơ sáp",
          example: "Avocados are highly dense in delicious healthy fats.",
          exampleTranslation: "Bơ cực kỳ dồi dào chất béo lành mạnh béo ngậy tuyệt hảo.",
          category: "green"
        },
        {
          word: "Green apple",
          pos: "Noun",
          phonetic: "/ɡriːn ˈæpl/",
          definition: "Quả táo xanh giòn",
          example: "Green apple is tangy and crunchy compared to sweet varieties.",
          exampleTranslation: "Táo xanh thì chua chua và giòn hơn so với các loài ngọt.",
          category: "green"
        },
        {
          word: "Coconut",
          pos: "Noun",
          phonetic: "/ˈkəʊkənʌt/",
          definition: "Quả dừa tươi",
          example: "Coconut trees symbolize standard tropical coastal paths.",
          exampleTranslation: "Những hàng dừa biểu tượng cho các cung đường biển nhiệt đới tiêu chuẩn.",
          category: "green"
        },
        {
          word: "Guava",
          pos: "Noun",
          phonetic: "/ˈɡwɑːvə/",
          definition: "Quả ổi giòn",
          example: "Guava holds a generous concentration of high vitamins.",
          exampleTranslation: "Quả ổi chứa một lượng vitamin dồi dào và đậm đặc.",
          category: "green"
        },

        // PURPLE
        {
          word: "Grapes",
          pos: "Noun",
          phonetic: "/ɡreɪps/",
          definition: "Quả nho tím",
          example: "Vineyards grow fresh grapes to ferment premium wine.",
          exampleTranslation: "Các vườn nho trồng nho tươi để lên men rượu vang cao cấp.",
          category: "purple"
        },
        {
          word: "Blueberry",
          pos: "Noun",
          phonetic: "/ˈbluːbəri/",
          definition: "Quả việt quất xanh tím",
          example: "Blueberries are widely eaten for boosting visual awareness.",
          exampleTranslation: "Việt quất được ăn rộng rãi để nâng cao sức đề kháng thị lực.",
          category: "purple"
        },
        {
          word: "Mulberry",
          pos: "Noun",
          phonetic: "/ˈmʌlbəri/",
          definition: "Quả dâu tằm",
          example: "Deep colored mulberries stain hands with beautiful purple juices.",
          exampleTranslation: "Những trái dâu tằm đậm màu nhuộm tay bằng thứ nước ép tím tuyệt hảo.",
          category: "purple"
        },
        {
          word: "Plum",
          pos: "Noun",
          phonetic: "/plʌm/",
          definition: "Quả mận tím",
          example: "The juicy sweet plums are ready for harvesting.",
          exampleTranslation: "Những quả mận tím ngọt mọng nước đã sẵn sàng để thu hoạch.",
          category: "purple"
        },

        // OTHERS
        {
          word: "Passion fruit",
          pos: "Noun",
          phonetic: "/ˈpæʃn fruːt/",
          definition: "Chanh dây / chanh leo",
          example: "Passion fruit juice is rich in vitamins and extremely aromatic.",
          exampleTranslation: "Nước ép chanh dây rất giàu vitamin và thơm ngát khó phai.",
          category: "others"
        },
        {
          word: "Lychee",
          pos: "Noun",
          phonetic: "/ˈlaɪ.tʃiː/",
          definition: "Quả vải thiều",
          example: "Sweet lychees are harvested in enormous quantities during early summer.",
          exampleTranslation: "Quả vải ngọt lịm được thu hoạch với sản lượng khổng lồ vào đầu hè.",
          category: "others"
        },
        {
          word: "Mangosteen",
          pos: "Noun",
          phonetic: "/ˈmæŋɡəstiːn/",
          definition: "Quả măng cụt",
          example: "Mangosteen is crowned the queen of tropical fruits.",
          exampleTranslation: "Măng cụt được xưng danh là nữ hoàng của trái cây nhiệt đới.",
          category: "others"
        }
      ]
    },
    {
      id: "vegetables",
      name: "Vegetables (Rau củ)",
      description: "Từ vựng về các nhóm rau củ chia theo đặc tính sinh trưởng: Lá, Hoa, Thân, Rễ, Quả & Hạt, Nấm.",
      categories: [
        { id: "leave", name: "Rau Ăn Lá (Leaves)", color: "from-green-400 to-green-600 border-green-300 text-green-100" },
        { id: "root", name: "Củ & Rễ (Bulb & Root)", color: "from-amber-500 to-amber-700 border-amber-300 text-amber-100" },
        { id: "seed", name: "Quả & Hạt (Fruit & Seed)", color: "from-emerald-400 to-emerald-600 border-emerald-300 text-emerald-100" },
        { id: "flower", name: "Ăn Hoa (Flower)", color: "from-lime-400 to-lime-600 border-lime-300 text-lime-100" },
        { id: "stem", name: "Ăn Thân (Stem)", color: "from-teal-400 to-teal-500 border-teal-300 text-teal-100" },
        { id: "fungi", name: "Nấm (Fungi)", color: "from-zinc-400 to-zinc-650 border-zinc-300 text-zinc-100" }
      ],
      nodes: [
        // LEAVE
        {
          word: "Bok choy",
          pos: "Noun",
          phonetic: "/ˌbɒk ˈtʃɔɪ/",
          definition: "Cải thìa / cải chip",
          example: "Bok choy is delicious when quickly stir-fried with fragrant garlic.",
          exampleTranslation: "Cải thìa rất thơm ngon khi đảo xào nhanh cùng tỏi thơm.",
          category: "leave"
        },
        {
          word: "Cabbage",
          pos: "Noun",
          phonetic: "/ˈkæbɪdʒ/",
          definition: "Bắp cải đỏ / xanh",
          example: "Cabbage has dense crunchy leaves stacked in tight balls.",
          exampleTranslation: "Bắp cải có các lá giòn bện dày thành những khối tròn chặt.",
          category: "leave"
        },
        {
          word: "Lettuce",
          pos: "Noun",
          phonetic: "/ˈletɪs/",
          definition: "Rau xà lách tươi",
          example: "Crispy lettuce leaves form the foundation of mixed green salads.",
          exampleTranslation: "Lá xà lách giòn rụm tạo lập nền tảng cho món salad rau xanh.",
          category: "leave"
        },
        {
          word: "Spinach",
          pos: "Noun",
          phonetic: "/ˈspɪnɪdʒ/",
          definition: "Cải bó xôi / rau chân vịt",
          example: "Spinach is highly rich in iron and perfect in healthy smoothies.",
          exampleTranslation: "Cải bó xôi cực giàu chất sắt và rất hoàn hảo khi sấy sinh tố.",
          category: "leave"
        },
        {
          word: "Romaine",
          pos: "Noun",
          phonetic: "/rəʊˈmeɪn/",
          definition: "Rau xà lách romaine dài",
          example: "Romaine lettuce has sturdy leaves and is used in Caesar salads.",
          exampleTranslation: "Xà lách Romaine có lá cứng cáp và được dùng phổ biến trong món salad Caesar.",
          category: "leave"
        },
        {
          word: "Chives",
          pos: "Noun",
          phonetic: "/tʃaɪvz/",
          definition: "Hẹ lá / hành tăm",
          example: "She garnished the baked potato with chopped fresh chives.",
          exampleTranslation: "Cô ấy trang trí khoai tây nướng với hẹ tươi cắt nhỏ.",
          category: "leave"
        },
        {
          word: "Basil",
          pos: "Noun",
          phonetic: "/ˈbæzl/",
          definition: "Rau húng quế thơm",
          example: "Sweet basil adds a wonderful fragrance to Italian pasta.",
          exampleTranslation: "Húng quế ngọt bổ sung mùi thơm tuyệt vời cho mì Ý.",
          category: "leave"
        },

        // ROOT
        {
          word: "Yam",
          pos: "Noun",
          phonetic: "/jæm/",
          definition: "Khoai ngọt / khoai mỡ / củ mài",
          example: "Yams are sweeter and starchier than normal white potatoes.",
          exampleTranslation: "Khoai ngọt thường ngọt và nhiều tinh bột hơn khoai tây trắng bình thường.",
          category: "root"
        },
        {
          word: "Garlic",
          pos: "Noun",
          phonetic: "/ˈɡɑːlɪk/",
          definition: "Củ tỏi gia vị",
          example: "Roasting garlic makes it sweet, soft, and easy to spread.",
          exampleTranslation: "Nướng tỏi làm nó ngọt ngào, mềm xốp và dễ dắt lên bánh mì.",
          category: "root"
        },
        {
          word: "Ginger",
          pos: "Noun",
          phonetic: "/ˈdʒɪndʒə(r)/",
          definition: "Củ gừng cay",
          example: "Ginger tea warms up sore throats on chilly winter days.",
          exampleTranslation: "Trà gừng sưởi ấm vùng cổ họng bị đau rát những ngày đông giá lạnh.",
          category: "root"
        },
        {
          word: "Radish",
          pos: "Noun",
          phonetic: "/ˈrædɪʃ/",
          definition: "Củ cải trắng / đỏ",
          example: "Slices of white radish add crunch and tang to pickling bowls.",
          exampleTranslation: "Những lát củ cải trắng bổ sung độ giòn ngọt thanh cho hộp đồ chua.",
          category: "root"
        },
        {
          word: "Carrot",
          pos: "Noun",
          phonetic: "/ˈkærət/",
          definition: "Củ cà rốt",
          example: "Carrots are rich in beta-carotene which benefits eyesight.",
          exampleTranslation: "Cà rốt rất giàu beta-carotene, một chất mang lại lợi ích cho thị giác.",
          category: "root"
        },
        {
          word: "Leek",
          pos: "Noun",
          phonetic: "/liːk/",
          definition: "Tỏi tây / boa-rô",
          example: "Leeks are great in potato soup to add a mild, sweet onion flavor.",
          exampleTranslation: "Tỏi tây rất ngon khi hầm súp khoai tây để tăng vị hành dịu ngọt.",
          category: "root"
        },
        {
          word: "Onion",
          pos: "Noun",
          phonetic: "/ˈʌnjən/",
          definition: "Hành tây",
          example: "Chopping raw onions is notorious for making cooks cry.",
          exampleTranslation: "Cắt nhỏ hành tây sống vốn nổi tiếng là khiến các đầu bếp rơi lệ.",
          category: "root"
        },
        {
          word: "Shallot",
          pos: "Noun",
          phonetic: "/ʃəˈlɒt/",
          definition: "Hành tím / hành phi",
          example: "Fried shallots are a golden, fragrant garnish on Vietnamese sticky rice.",
          exampleTranslation: "Hành phi là đồ trang trí vàng ươm, thơm lừng trên đĩa xôi Việt Nam.",
          category: "root"
        },

        // SEED
        {
          word: "Bean",
          pos: "Noun",
          phonetic: "/biːn/",
          definition: "Hạt đậu/quả đậu",
          example: "Green beans are full of healthy dietary fiber.",
          exampleTranslation: "Đậu xanh rất dồi dào chất xơ ăn kiêng tốt cho sức khỏe.",
          category: "seed"
        },
        {
          word: "Pea",
          pos: "Noun",
          phonetic: "/piː/",
          definition: "Đậu Hà Lan củ",
          example: "Sweet peas of green color are mixed with fried rice pieces.",
          exampleTranslation: "Những hạt đậu Hà Lan xanh mướt được trộn lẫn vào cơm chiên.",
          category: "seed"
        },
        {
          word: "Sweet corn",
          pos: "Noun",
          phonetic: "/swiːt kɔːn/",
          definition: "Ngô ngọt / bắp ngọt",
          example: "We grilled sweet corn directly over charcoal for a picnic.",
          exampleTranslation: "Chúng tôi nướng bắp ngọt trực tiếp trên bếp than khi đi dã ngoại.",
          category: "seed"
        },
        {
          word: "Snow pea",
          pos: "Noun",
          phonetic: "/snəʊ piː/",
          definition: "Đậu tuyết / đậu hà lan non",
          example: "Snow peas are eaten whole, skin and all, for their crispness.",
          exampleTranslation: "Đậu tuyết được ăn nguyên cả vỏ vì độ giòn thanh ngọt của chúng.",
          category: "seed"
        },
        {
          word: "Pumpkin",
          pos: "Noun",
          phonetic: "/ˈpʌmpkɪn/",
          definition: "Quả bí ngô / bí đỏ",
          example: "Creamy pumpkin soup is a signature dish during late autumn months.",
          exampleTranslation: "Súp bí đỏ sánh mịn là một món ăn biểu tượng suốt tháng cuối thu.",
          category: "seed"
        },
        {
          word: "Eggplant",
          pos: "Noun",
          phonetic: "/ˈeɡplɑːnt/",
          definition: "Quả cà tím",
          example: "Eggplants absorb wonderful aromatic garlic notes when roasted.",
          exampleTranslation: "Cà tím hấp thụ hết mọi mùi hương tỏi tuyệt phẩm khi được nướng.",
          category: "seed"
        },
        {
          word: "Cucumber",
          pos: "Noun",
          phonetic: "/ˈkjuːkʌmbə(r)/",
          definition: "Dưa leo / dưa chuột",
          example: "Fresh cucumber has high water content and acts as a skin coolant.",
          exampleTranslation: "Dưa chuột tươi có lượng nước dồi dào và đóng vai trò làm mát làn da.",
          category: "seed"
        },
        {
          word: "Pepper",
          pos: "Noun",
          phonetic: "/ˈpepə(r)/",
          definition: "Quả ớt / ớt chuông",
          example: "Bell peppers are colorful and add sweet crunch to stir-fries.",
          exampleTranslation: "Ớt chuông đầy màu sắc giúp tăng độ giòn ngọt cho các món xào.",
          category: "seed"
        },

        // FLOWER
        {
          word: "Cauliflower",
          pos: "Noun",
          phonetic: "/ˈkɒliflaʊə(r)/",
          definition: "Súp lơ trắng / bông cải",
          example: "Roasted cauliflower develops a rich nutty taste when charred.",
          exampleTranslation: "Súp lơ trắng nướng tỏa ra một mùi bùi ngậy khi xém cạnh.",
          category: "flower"
        },
        {
          word: "Broccoli",
          pos: "Noun",
          phonetic: "/ˈbrɒkəli/",
          definition: "Bông cải xanh / súp lơ xanh",
          example: "Steamed broccoli is a favorite green addition to fitness meals.",
          exampleTranslation: "Bông cải xanh luộc là thành phần xanh ưa thích trong các bữa ăn thể thao.",
          category: "flower"
        },
        {
          word: "Courgette",
          pos: "Noun",
          phonetic: "/kʊəˈʒet/",
          definition: "Quả bí ngòi",
          example: "Courgettes can be sliced thin and grilled or baked into sweet breads.",
          exampleTranslation: "Bí ngòi có thể thái mỏng đem nướng hoặc nướng cùng bánh mì ngọt.",
          category: "flower"
        },
        {
          word: "Broccoflower",
          pos: "Noun",
          phonetic: "/ˈbrɒk.ə.flaʊ.ər/",
          definition: "Bông cải xanh súp lơ",
          example: "Broccoflower tastes slightly sweeter than regular cauliflower.",
          exampleTranslation: "Bông cải lai súp lơ có vị ngọt thanh dịu hơn súp lơ truyền thống.",
          category: "flower"
        },

        // STEM
        {
          word: "Celery",
          pos: "Noun",
          phonetic: "/ˈseləri/",
          definition: "Nhánh cần tây",
          example: "Raw celery stalks are low-calorie and provide a crisp bite.",
          exampleTranslation: "Nhánh cần tây tươi chứa ít calo và đem lại một miếng cắn giòn khảng.",
          category: "stem"
        },
        {
          word: "Asparagus",
          pos: "Noun",
          phonetic: "/əˈspærəɡəs/",
          definition: "Cọc măng tây",
          example: "Pan-seared asparagus pairs wonderfully with grilled steak ribbons.",
          exampleTranslation: "Măng tây áp chảo kết đôi cực tuyệt với những dải bít tết nướng.",
          category: "stem"
        },

        // FUNGI
        {
          word: "Truffle",
          pos: "Noun",
          phonetic: "/ˈtrʌfl/",
          definition: "Nấm cục đen hoàng gia",
          example: "Shaved truffles elevate fine-dining dishes to extraordinary aromatic levels.",
          exampleTranslation: "Những lát nấm cục bào nâng tầm các món ăn cao cấp lên những bậc thơm ngon diệu kỳ.",
          category: "fungi"
        },
        {
          word: "Mushroom",
          pos: "Noun",
          phonetic: "/ˈmʌʃrʊm/",
          definition: "Cây nấm ăn thông dụng",
          example: "Sautéed mushrooms unleash supreme earthiness and umami flavor.",
          exampleTranslation: "Nấm xào tỏa hương vị mộc mạc và vị ngọt umami tối thượng.",
          category: "fungi"
        },
        {
          word: "King oyster mushroom",
          pos: "Noun",
          phonetic: "/kɪŋ ˈɔɪstə ˈmʌʃrʊm/",
          definition: "Nấm bào ngư Nhật / Nấm đùi gà",
          example: "King oyster mushrooms have a meaty texture when sliced and grilled.",
          exampleTranslation: "Nấm bào ngư Nhật khi thái dày và nướng sẽ có thớ dẻo thơm dầy như thịt.",
          category: "fungi"
        }
      ]
    },
    {
      id: "meat",
      name: "Meat (Các loại thịt)",
      description: "Hệ thống từ vựng về các nhóm thịt đỏ, thịt trắng, thịt cừu, gia cầm và đồ chế biến sẵn bám sát Page 23.",
      categories: [
        { id: "pork", name: "Thịt Lợn (Pork)", color: "from-pink-400 to-pink-600 border-pink-300 text-pink-100" },
        { id: "beef", name: "Thịt Bò (Beef)", color: "from-red-650 to-red-800 border-red-400 text-red-101" },
        { id: "lamb", name: "Thịt Cừu (Lamb)", color: "from-amber-600 to-amber-700 border-amber-400 text-amber-100" },
        { id: "poultry", name: "Gia Cầm (Poultry)", color: "from-amber-400 to-amber-550 border-amber-300 text-amber-950" },
        { id: "processed", name: "Chế Biến Sẵn (Processed)", color: "from-orange-400 to-orange-600 border-orange-300 text-orange-100" }
      ],
      nodes: [
        // PORK
        {
          word: "Hip",
          pos: "Noun",
          phonetic: "/hɪp/",
          definition: "Thịt hông heo / nạc mông",
          example: "Pork from the hip section is lean and highly nutritious.",
          exampleTranslation: "Nạc mông heo rất nạc và nhiều chất dinh dưỡng.",
          category: "pork"
        },
        {
          word: "Loin",
          pos: "Noun",
          phonetic: "/lɔɪn/",
          definition: "Thịt thăn lưng lợn",
          example: "The pork loin roast was tender and juicy.",
          exampleTranslation: "Món thăn lưng lợn nướng rất mềm mại và mọng nước.",
          category: "pork"
        },
        {
          word: "Shoulder",
          pos: "Noun",
          phonetic: "/ˈʃəʊldə(r)/",
          definition: "Thịt nạc vai lợn",
          example: "Pork shoulder is the ultimate selection for slow-cooked pulled pork.",
          exampleTranslation: "Nạc vai lợn là sự lựa chọn tối ưu cho món thịt xé hầm nhừ.",
          category: "pork"
        },
        {
          word: "Rib",
          pos: "Noun",
          phonetic: "/rɪb/",
          definition: "Sườn heo / dẻ sườn lợn",
          example: "Honey glazed pork ribs are popular at summer barbecues.",
          exampleTranslation: "Sườn heo nướng mật ong cực kỳ hấp dẫn tại các bữa tiệc nướng mùa hè.",
          category: "pork"
        },
        {
          word: "Neck",
          pos: "Noun",
          phonetic: "/nek/",
          definition: "Thịt gáy lợn",
          example: "Pork neck has nice marbling making it incredibly tender.",
          exampleTranslation: "Thịt gáy lợn có vân mỡ xen kẽ đẹp mắt làm nó rất mềm thơm.",
          category: "pork"
        },
        {
          word: "Jaw",
          pos: "Noun",
          phonetic: "/dʒɔː/",
          definition: "Thịt nọng heo",
          example: "Pork jaw is deep-fried to create a crispy Asian delicacy.",
          exampleTranslation: "Thịt nọng heo chiên giòn rụm tạo nên món ngon truyền thống Á Đông.",
          category: "pork"
        },
        {
          word: "Knee",
          pos: "Noun",
          phonetic: "/niː/",
          definition: "Giò heo / khoanh giò chân",
          example: "Pork knee is slow-braised with sweet herbs in hot pots.",
          exampleTranslation: "Khoanh giò chân heo được hầm nhừ cùng thảo mộc ngọt trong nồi lẩu.",
          category: "pork"
        },
        {
          word: "Cannon bone",
          pos: "Noun",
          phonetic: "/ˈkæn.ən bəʊn/",
          definition: "Xương ống lợn (lọc nước súp)",
          example: "Chef boiled pork cannon bones for twelve hours to extract sweet broth.",
          exampleTranslation: "Đầu bếp luộc xương ống heo trong suốt 12 giờ để lấy nước dùng ngọt thơm.",
          category: "pork"
        },

        // BEEF
        {
          word: "Chuck",
          pos: "Noun",
          phonetic: "/tʃʌk/",
          definition: "Nạc vai bò / vai cổ bò",
          example: "Chuck roast is ideal for slow braising since it disintegrates beautifully.",
          exampleTranslation: "Nạc vai bò rất lý tưởng để hầm nhừ vì các thớ thịt sẽ tơi mềm hoàn hảo.",
          category: "beef"
        },
        {
          word: "Brisket",
          pos: "Noun",
          phonetic: "/ˈbrɪskɪt/",
          definition: "Thịt ngực / gầu nạm bò",
          example: "Beef brisket is smoked for hours until it is meltingly tender.",
          exampleTranslation: "Gầu bò được đem hun khói hàng giờ ròng rã cho đến khi mềm rã tơi.",
          category: "beef"
        },
        {
          word: "Shank",
          pos: "Noun",
          phonetic: "/ʃæŋk/",
          definition: "Bắp bò giòn",
          example: "Braised beef shanks are aromatic and full of collagen jelly.",
          exampleTranslation: "Bắp bò hầm chín thơm phức và chứa nhiều gân dai dẻo.",
          category: "beef"
        },
        {
          word: "Plate",
          pos: "Noun",
          phonetic: "/pleɪt/",
          definition: "Thịt ba chỉ bò / ba rọi bò",
          example: "Thin beef plate slices are rolled with mushrooms in hot pots.",
          exampleTranslation: "Ba chỉ bò thái mỏng cuộn nấm là món nhúng quốc dân trong các bữa lẩu.",
          category: "beef"
        },
        {
          word: "Short loin",
          pos: "Noun",
          phonetic: "/ʃɔːt lɔɪn/",
          definition: "Thăn sườn bò ngắn",
          example: "Porterhouse steaks are cut directly from the premium beef short loin.",
          exampleTranslation: "Món bít tết sườn ngoại được lấy trực tiếp từ phần thăn bò ngon mọng.",
          category: "beef"
        },
        {
          word: "Sirloin",
          pos: "Noun",
          phonetic: "/ˈsɜːlɔɪn/",
          definition: "Thịt thăn ngoại bò hảo hạng",
          example: "The premium sirloin is grilled medium-rare to preserve juices.",
          exampleTranslation: "Tảng thăn ngoại hảo hạng được nướng tái vừa để bảo lưu nước thịt ngọt.",
          category: "beef"
        },

        // LAMB
        {
          word: "Fore shank",
          pos: "Noun",
          phonetic: "/fɔː ʃæŋk/",
          definition: "Bắp chân trước cừu",
          example: "Lamb fore shanks are roasted with rosemary and red wine.",
          exampleTranslation: "Bắp đùi trước thịt cừu được quay thơm với lá hương thảo và rượu vang đỏ.",
          category: "lamb"
        },
        {
          word: "Feet",
          pos: "Noun",
          phonetic: "/fiːt/",
          definition: "Móng giò cừu",
          example: "Lamb feet are clean and boiled for premium hot broths.",
          exampleTranslation: "Chân cừu được làm sạch và hầm nhừ lấy nước dùng hảo hạng.",
          category: "lamb"
        },
        {
          word: "Breast",
          pos: "Noun",
          phonetic: "/brest/",
          definition: "Ức thịt cừu dầy sụn",
          example: "Rolled lamb breast is roasted slowly with a garlic herb paste.",
          exampleTranslation: "Ức cừu cuộn được nướng chậm cùng hỗn hợp tỏi thảo mộc.",
          category: "lamb"
        },
        {
          word: "Hind shank",
          pos: "Noun",
          phonetic: "/haɪnd ʃæŋk/",
          definition: "Bắp chân sau cừu",
          example: "Our restaurant serves baked lamb hind shank with garlic mashed potatoes.",
          exampleTranslation: "Nhà hàng phục vụ món bắp cừu sau nướng ăn kèm khoai tây nghiền tỏi.",
          category: "lamb"
        },
        {
          word: "Leg",
          pos: "Noun",
          phonetic: "/leg/",
          definition: "Đùi cừu mọc dầy thịt",
          example: "Easter dinners usually feature a herb crusted roasted leg of lamb.",
          exampleTranslation: "Bữa tối Phục sinh thường có đùi cừu nướng phủ lớp thảo mộc giòn thơm.",
          category: "lamb"
        },

        // POULTRY
        {
          word: "Chicken",
          pos: "Noun",
          phonetic: "/ˈtʃɪkɪn/",
          definition: "Thịt gà bổ dưỡng",
          example: "Stir-fried chicken breast with peanuts is a classic lunchbox option.",
          exampleTranslation: "Ức gà xào đậu phộng là một lựa chọn cơm trưa văn phòng quen thuộc.",
          category: "poultry"
        },
        {
          word: "Duck",
          pos: "Noun",
          phonetic: "/dʌk/",
          definition: "Thịt vịt béo",
          example: "Beijing roasted duck is iconic due to its paper-thin crispy skin.",
          exampleTranslation: "Vịt quay Bắc Kinh nổi danh nhờ lớp da mỏng giòn như giấy mộc.",
          category: "poultry"
        },
        {
          word: "Goose",
          pos: "Noun",
          phonetic: "/ɡuːs/",
          definition: "Thịt ngỗng béo",
          example: "Roast goose is a highly traditional winter holiday treat.",
          exampleTranslation: "Thịt ngỗng quay là một món ngon ngày đông cực kỳ truyền thống.",
          category: "poultry"
        },
        {
          word: "Turkey",
          pos: "Noun",
          phonetic: "/ˈtɜːki/",
          definition: "Thịt gà tây quay",
          example: "Roast turkey is the central feast during Thanksgiving dinners.",
          exampleTranslation: "Gà tây quay là bữa tiệc cốt lõi giữa những buổi tối Tạ ơn.",
          category: "poultry"
        },
        {
          word: "Egg",
          pos: "Noun",
          phonetic: "/eɡ/",
          definition: "Trứng luộc / dải rán",
          example: "You should poach the eggs gently in vinegar-spiked water.",
          exampleTranslation: "Bạn nên chần trứng thật nhẹ nhàng trong nước pha chút giấm.",
          category: "poultry"
        },
        {
          word: "Quail",
          pos: "Noun",
          phonetic: "/qweɪl/",
          definition: "Thịt chim cút ngọt",
          example: "Quails are usually roasted whole or served in spicy hot stews.",
          exampleTranslation: "Chim cút thường được nướng nguyên con hoặc hầm trong sốt cay nóng.",
          category: "poultry"
        },

        // PROCESSED
        {
          word: "Sausage",
          pos: "Noun",
          phonetic: "/ˈsɒsɪdʒ/",
          definition: "Xúc xích dồi dúc",
          example: "The sausages were grilled over charcoal until crispy and brown.",
          exampleTranslation: "Những thanh xúc xích được nướng trên than hồng cho tới khi vàng giòn.",
          category: "processed"
        },
        {
          word: "Chicken nugget",
          pos: "Noun",
          phonetic: "/ˈtʃɪk.ɪn ˈnʌɡ.ɪt/",
          definition: "Gà miếng chiên xù bùi béo",
          example: "Kids love eating crispy golden chicken nuggets with sweet tomato dip.",
          exampleTranslation: "Trẻ con thích mê ăn miếng gà rán giòn rụm với xốt tương cà ngọt.",
          category: "processed"
        },
        {
          word: "Ham",
          pos: "Noun",
          phonetic: "/hæm/",
          definition: "Thịt nguội giăm bông",
          example: "Smoked ham slices are perfect tucked in cheese sandwiches.",
          exampleTranslation: "Những lát thịt nguội xông khói kẹp trong bánh phô mai cực ngon miệng.",
          category: "processed"
        },
        {
          word: "Hot dog",
          pos: "Noun",
          phonetic: "/ˈhɒt.dɒɡ/",
          definition: "Bánh mì kẹp xúc xích nóng",
          example: "Baseball stadium stalls are famous for their hot dogs.",
          exampleTranslation: "Các quầy hàng ở sân bóng chày luôn nổi tiếng với bánh mì kẹp xúc xích nực.",
          category: "processed"
        },
        {
          word: "Blood sausage",
          pos: "Noun",
          phonetic: "/blʌd ˈsɒsɪdʒ/",
          definition: "Khúc dồi huyết / dồi sụn",
          example: "Blood sausage is an ancient rustic recipe popular across the world.",
          exampleTranslation: "Dồi tiết là một công thức ẩm thực thôn quê cổ xưa phổ biến toàn thế giới.",
          category: "processed"
        },
        {
          word: "Liver pate",
          pos: "Noun",
          phonetic: "/ˈlɪv.ər pæˈteɪ/",
          definition: "Ba-tê gan béo mịn dải bánh mì",
          example: "Spread some rich liver pate onto a warm crusty French baguette.",
          exampleTranslation: "Quệt một lớp ba-tê gan béo ngậy lên ổ bánh mì baguette Pháp giòn rụm ấm áp.",
          category: "processed"
        },
        {
          word: "Pepperoni",
          pos: "Noun",
          phonetic: "/ˌpep.əˈrəʊ.ni/",
          definition: "Xúc xích bò lợn cay Ý (rải Pizza)",
          example: "Double pepperoni is our family's absolute favorite pizza topping.",
          exampleTranslation: "Xúc xích pepperoni nhân đôi là topping pizza thích nhất của gia đình tôi câu mực.",
          category: "processed"
        }
      ]
    },
    {
      id: "seafood",
      name: "Seafood (Hải sản)",
      description: "Bản đồ sinh học vương quốc biển cả: Cá biển, cá sông, giáp xác, thân mềm, nhuyễn thể có vỏ đạt 100% sơ đồ Page 25.",
      categories: [
        { id: "freshwater", name: "Cá Nước Ngọt (Freshwater)", color: "from-sky-400 to-sky-600 border-sky-305 text-sky-95" },
        { id: "saltwater", name: "Cá Nước Mặn (Saltwater)", color: "from-blue-500 to-blue-700 border-blue-400 text-blue-100" },
        { id: "crustaceans", name: "Giáp Xác (Crustaceans)", color: "from-red-400 to-red-650 border-red-300 text-red-101" },
        { id: "molluscs", name: "Thân Mềm (Molluscs)", color: "from-purple-400 to-purple-600 border-purple-300 text-purple-101" },
        { id: "shellfish", name: "Có Vỏ (Shellfish)", color: "from-teal-400 to-teal-650 border-teal-300 text-teal-100" },
        { id: "others", name: "Nhóm Khác (Others)", color: "from-slate-400 to-slate-550 border-slate-350 text-slate-101" }
      ],
      nodes: [
        // FRESHWATER
        {
          word: "Catfish",
          pos: "Noun",
          phonetic: "/ˈkæt.fɪʃ/",
          definition: "Cá trê nước ngọt",
          example: "Catfish is heavily farmed in freshwater ponds across South-East Asia.",
          exampleTranslation: "Cá trê được nuôi thả quy mô lớn trong những ao nước ngọt ở Đông Nam Á.",
          category: "freshwater"
        },
        {
          word: "Whitefish",
          pos: "Noun",
          phonetic: "/ˈwaɪt.fɪʃ/",
          definition: "Cá ngần / cá hồi trắng ngọt",
          example: "Boiled whitefish is delicate, soft with extremely sweet natural broth.",
          exampleTranslation: "Cá hồi trắng nhỏ luộc chín dẻo thơm, nước dùng thì thanh ngọt ngào tự nhiên.",
          category: "freshwater"
        },
        {
          word: "Bass",
          pos: "Noun",
          phonetic: "/bæs/",
          definition: "Cá vược nước ngọt",
          example: "Anglers caught a giant largemouth bass in the freshwater lake.",
          exampleTranslation: "Các tay câu đã giật được một con cá vược miệng rộng khổng lồ ở hồ nước ngọt.",
          category: "freshwater"
        },
        {
          word: "Crappie",
          pos: "Noun",
          phonetic: "/ˈkræp.i/",
          definition: "Cá vược Crappie đặc trưng",
          example: "Crappie fish are highly prized by fishermen for their delicious fillets.",
          exampleTranslation: "Cá sộp crappie được các ngư dân đánh giá cao vì thịt phi lê ngọt dai sần sật.",
          category: "freshwater"
        },
        {
          word: "Ayu",
          pos: "Noun",
          phonetic: "/ˈɑː.juː/",
          definition: "Cá ngọt Nhật Bản (Ayu)",
          example: "Ayu is grilled on salt sticks over hot coals in Japanese villages.",
          exampleTranslation: "Cá ngọt Ayu được xiên que nướng muối trên lò than ở các ngôi làng Nhật Bản.",
          category: "freshwater"
        },
        {
          word: "Eel",
          pos: "Noun",
          phonetic: "/iːl/",
          definition: "Con lươn thịt bùi ngọt",
          example: "Braised claypot eel is a comforting protein source for dinner.",
          exampleTranslation: "Lươn om niêu đất là nguồn đạm ngọt ngào xoa dịu dĩa cơm tối.",
          category: "freshwater"
        },
        {
          word: "Sturgeon",
          pos: "Noun",
          phonetic: "/ˈstɜːdʒən/",
          definition: "Cá tầm nước ngọt dai sụn",
          example: "Sturgeon fish are valuable for their precious caviar row.",
          exampleTranslation: "Cá tầm được trân quý bởi lứa trứng muối đen cực giá trị.",
          category: "freshwater"
        },
        {
          word: "Common carp",
          pos: "Noun",
          phonetic: "/ˈkɒm.ən kɑːrp/",
          definition: "Cá chép ta ngọt thịt",
          example: "Cooking hot sweet sour soup with common carp is highly nutritious.",
          exampleTranslation: "Nấu nồi canh chua cá chép ngọt thơm mang dưỡng chất vàng dồi dào.",
          category: "freshwater"
        },

        // SALTWATER
        {
          word: "Cod",
          pos: "Noun",
          phonetic: "/kɒd/",
          definition: "Cá tuyết dải trắng",
          example: "Battered cod is the premium ingredient for chips shops in England.",
          exampleTranslation: "Cá tuyết nhúng bột chiên là nguyên liệu hảo hạng cho các quán khoai chiên ở Anh.",
          category: "saltwater"
        },
        {
          word: "Anchovy",
          pos: "Noun",
          phonetic: "/ˈæntʃəvi/",
          definition: "Cá cơm biển lóc xương",
          example: "Anchovies are fermented with salt to brew golden fish fillets sauce.",
          exampleTranslation: "Cá cơm biển muối cùng muối hạt lên men thành giọt nước mắm vàng óng.",
          category: "saltwater"
        },
        {
          word: "Salmon",
          pos: "Noun",
          phonetic: "/ˈsæmən/",
          definition: "Cá hồi khổng lồ đại dương",
          example: "Salmon is highly rich in omega-3 fatty acids and heart-healthy.",
          exampleTranslation: "Cá hồi rất dồi dào axit béo omega-3 và cực tốt cho tim mạch.",
          category: "saltwater"
        },
        {
          word: "Halibut",
          pos: "Noun",
          phonetic: "/ˈhælɪbət/",
          definition: "Cá bơn lưỡi ngựa khổng lồ",
          example: "Chef steamed fresh halibut with ginger and green onions in Cantonese style.",
          exampleTranslation: "Đầu bếp hấp cá bơn lưỡi ngựa tươi cùng gừng hành lá chuẩn vị Quảng Đông.",
          category: "saltwater"
        },
        {
          word: "Sardine",
          pos: "Noun",
          phonetic: "/ˌsɑːˈdiːn/",
          definition: "Cá mòi đóng hộp mặn",
          example: "Grandpa loves breakfast with sardines in tomato paste and warm baguettes.",
          exampleTranslation: "Ông nội thích ăn sáng với cá mòi sốt cà chua kẹp bánh mì giòn nóng.",
          category: "saltwater"
        },
        {
          word: "Swordfish",
          pos: "Noun",
          phonetic: "/ˈsɔːdfɪʃ/",
          definition: "Cá kiếm biển rạng dông",
          example: "Grilled swordfish steaks have a firm texture similar to pork.",
          exampleTranslation: "Cá kiếm nướng steak có thớ thịt chắc mổ sánh ngang thịt heo nạc.",
          category: "saltwater"
        },
        {
          word: "Tuna",
          pos: "Noun",
          phonetic: "/ˈtjuːnə/",
          definition: "Cá ngừ đại dương",
          example: "Tuna chunks are popular inside healthy salads and sandwiches.",
          exampleTranslation: "Khúc thịt cá ngừ rất được ưa chuộng bỏ trong đĩa salad và bơ kẹp bánh mì.",
          category: "saltwater"
        },

        // CRUSTACEANS
        {
          word: "Lobster",
          pos: "Noun",
          phonetic: "/ˈlɒbstə(r)/",
          definition: "Tôm hùm đại dương ngọt ngào",
          example: "Lobster is historically regarded as a premium luxury dining ingredient.",
          exampleTranslation: "Tôm hùm từ lâu đời được ngầm định là một nguyên liệu ẩm thực sang trọng xa xỉ.",
          category: "crustaceans"
        },
        {
          word: "Crab",
          pos: "Noun",
          phonetic: "/kræb/",
          definition: "Con cua ghẹ biển cả",
          example: "Steam fresh crab with lemongrass to fully enjoy juice sweetness.",
          exampleTranslation: "Hấp cua biển còn tươi cùng sả cây để cảm trọn độ ngọt của thớ thịt củi.",
          category: "crustaceans"
        },
        {
          word: "Shrimp",
          pos: "Noun",
          phonetic: "/ʃrɪmp/",
          definition: "Hạt tôm nhỏ giòn ngon",
          example: "Stir-fried shrimp with peppers matches spicy notes beautifully.",
          exampleTranslation: "Tôm bóc nõn đảo thơm cùng ớt ngọt tạo bản tình ca đậm vị dòn dã.",
          category: "crustaceans"
        },
        {
          word: "Prawn",
          pos: "Noun",
          phonetic: "/prɔːn/",
          definition: "Con tôm sú / tôm càng to",
          example: "Grilled tiger prawns with garlic butter smell heavenly.",
          exampleTranslation: "Tôm sú biển khổng lồ xiên que nướng bơ tỏi rực lên thơm điếc mũi.",
          category: "porn"
        },
        {
          word: "Krill",
          pos: "Noun",
          phonetic: "/krɪl/",
          definition: "Tép mồi nhuyễn thể đại dương",
          example: "Southern sea whales eat tons of small krill every single day.",
          exampleTranslation: "Những chú cá voi Nam cực ăn hàng tấn tép biển nhỏ tí hon mỗi ngày dóng.",
          category: "crustaceans"
        },
        {
          word: "Soft-shell crab",
          pos: "Noun",
          phonetic: "/sɒft-ʃel kræb/",
          definition: "Cua lột nướng tẩm bột",
          example: "Deep-fried soft-shell crab in chili salt is a signature dish.",
          exampleTranslation: "Cua lột chiên muối ớt là món nhậu đỉnh cao mang phong vị phố biển.",
          category: "crustaceans"
        },

        // MOLLUSCS
        {
          word: "Cuttlefish",
          pos: "Noun",
          phonetic: "/ˈkʌtlfɪʃ/",
          definition: "Con mực nang dày ruột",
          example: "Cuttlefish slices are grilled with satay sauce over flaming coals.",
          exampleTranslation: "Tảng thịt mực nang khía hoa được nướng sốt sa tế rực lửa dỏ.",
          category: "molluscs"
        },
        {
          word: "Squid",
          pos: "Noun",
          phonetic: "/skwɪd/",
          definition: "Con mực ống / mực trứng",
          example: "Fried squid rings are cooked quickly to prevent muscle toughness.",
          exampleTranslation: "Những khoanh mực rán được chiên nấu tốc hành để không làm thịt dai cứng.",
          category: "molluscs"
        },
        {
          word: "Octopus",
          pos: "Noun",
          phonetic: "/ˈɒktəpəs/",
          definition: "Bạch tuộc tám chân dai sần",
          example: "Grilled octopus is seasoned generously in various warm spices.",
          exampleTranslation: "Bạch tuộc nướng được tẩm ướp đậm đà với nhiều tầng gia vị gia truyền.",
          category: "molluscs"
        },
        {
          word: "Sea cucumber",
          pos: "Noun",
          phonetic: "/siː ˈkjuː.kʌm.bər/",
          definition: "Con hải sâm (đại sâm biển)",
          example: "Sea cucumber soup is highly prized for longevity in Asian cultures.",
          exampleTranslation: "Súp Hải Sâm được săn lùng súp tẩm bổ trường thọ trong ẩm thực Á Đông.",
          category: "molluscs"
        },
        {
          word: "Jellyfish",
          pos: "Noun",
          phonetic: "/ˈdʒel.i.fɪʃ/",
          definition: "Con sứa làm nộm giòn sần",
          example: "Vietnamese spicy jellyfish salad contains sliced vegetables and lime herbs.",
          exampleTranslation: "Nộm sứa đặc trưng chứa các sợi rau củ dập giòn rưới nước chanh tươi thảo mộc.",
          category: "molluscs"
        },

        // SHELLFISH
        {
          word: "Mussel",
          pos: "Noun",
          phonetic: "/ˈmʌsl/",
          definition: "Trai xanh / vẹm xanh đại dương",
          example: "Steamed green mussels in luxury garlic white wine sauce taste exquisite.",
          exampleTranslation: "Con vẹm xanh hấp rượu vang trắng tỏi rây là cực phẩm ẩm thực Tây Phương.",
          category: "shellfish"
        },
        {
          word: "Oyster",
          pos: "Noun",
          phonetic: "/ˈɔɪstə(r)/",
          definition: "Con hàu mọc bám đá",
          example: "Oysters are served raw on crushed ice with lemon quarters.",
          exampleTranslation: "Hàu được dùng sống ngay trên tuyết đá bào rây vài giọt chanh tươi mọng.",
          category: "shellfish"
        },
        {
          word: "Clam",
          pos: "Noun",
          phonetic: "/klæm/",
          definition: "Con nghêu / ngao biển",
          example: "Noodle soup with sweet clams warms up frosty winter mornings.",
          exampleTranslation: "Bát bún nghêu nóng hổi ngọt lịm sưởi ấm lòng những ban sáng dông gió.",
          category: "shellfish"
        },
        {
          word: "Scallop",
          pos: "Noun",
          phonetic: "/ˈskɒləp/",
          definition: "Sò điệp trắng tròn",
          example: "Seared scallops have a sweet caramel exterior and sweet soft flesh.",
          exampleTranslation: "Cồi sò điệp áp chảo bén xém vàng bóng ngọt ngào dẻo mịn tan đầu lưỡi.",
          category: "shellfish"
        },

        // OTHERS
        {
          word: "Seaweed",
          pos: "Noun",
          phonetic: "/ˈsiː.wiːd/",
          definition: "Rong biển ăn canh díp",
          example: "Japanese dried seaweed sheets wrap delicious sushi rolls.",
          exampleTranslation: "Lá rong biển khô của Nhật Bản cuộn nên những khoanh sushi diệu kỳ vị ngon.",
          category: "others"
        },
        {
          word: "Sea urchin",
          pos: "Noun",
          phonetic: "/siː ˈɜː.tʃɪn/",
          definition: "Nhím biển / cầu gai đắt giá",
          example: "Sea urchin row has a rich, custard-like texture and taste of the sea.",
          exampleTranslation: "Gạch cầu gai béo ngậy như thạch trứng, ngập hương vị mặn mòi ngọt biển cả.",
          category: "others"
        },
        {
          word: "Caviar",
          pos: "Noun",
          phonetic: "/ˈkæv.i.ɑːr/",
          definition: "Trứng cá muối đen hoàng gia",
          example: "Caviar should be eaten in tiny spoons made of pearl shell.",
          exampleTranslation: "Trứng cá muối hảo hạng nên thưởng bằng chiếc thìa vỏ trai ngọc nhỏ bé.",
          category: "others"
        }
      ]
    },
    {
      id: "dessert",
      name: "Dessert (Món tráng miệng)",
      description: "Bữa tiệc sắc màu mĩ vị ngọt ngào: Các loại bánh nướng, kem thạch lạnh dồn tụ dầy đủ Page 27.",
      categories: [
        { id: "cake", name: "Bánh Ngọt (Cake)", color: "from-orange-350 to-orange-550 border-orange-250 text-orange-950" },
        { id: "cookie", name: "Bánh Quy (Cookie)", color: "from-amber-650 to-amber-800 border-amber-400 text-amber-100" },
        { id: "pie_tart", name: "Bánh Tạc & Pie (Pie & Tart)", color: "from-amber-400 to-amber-600 border-amber-305 text-amber-955" },
        { id: "frozen", name: "Quầy Kem Lạnh (Frozen)", color: "from-cyan-450 to-cyan-600 border-cyan-350 text-cyan-950" },
        { id: "custard", name: "Kem Trứng Pudding (Custard)", color: "from-yellow-405 to-yellow-605 border-yellow-350 text-yellow-955" },
        { id: "doughnut", name: "Bánh Vòng Rán (Doughnut)", color: "from-rose-400 to-rose-600 border-rose-300 text-rose-101" }
      ],
      nodes: [
        // CAKE
        {
          word: "Cheesecake",
          pos: "Noun",
          phonetic: "/ˈtʃiːzkeɪk/",
          definition: "Bánh pho mát / phô mai",
          example: "This creamy blueberry cheesecake melts satisfyingly in your mouth.",
          exampleTranslation: "Ổ bánh phô mai việt quất ngậy ngậy mềm dẻo tan dồi dào trong vòm miệng.",
          category: "cake"
        },
        {
          word: "Cupcake",
          pos: "Noun",
          phonetic: "/ˈkʌp.keɪk/",
          definition: "Bánh cốc nướng phồng xốp",
          example: "Decorated cupcakes with sweet pink icing are popular at kid birthdays.",
          exampleTranslation: "Bánh kem cốc nướng rải lớp bơ hồng dất thu hút tại các tiệc trẻ nít.",
          category: "cake"
        },
        {
          word: "Angel cake",
          pos: "Noun",
          phonetic: "/ˈeɪn.dʒəl keɪk/",
          definition: "Bánh bông lan thiên thần bông xốp",
          example: "Angel cake is super light because it uses whipped egg whites instead of butter.",
          exampleTranslation: "Bánh bông lan thiên thần nhẹ tênh do dùng lòng trắng đánh bông thay vì bơ béo.",
          category: "cake"
        },
        {
          word: "Brownie",
          pos: "Noun",
          phonetic: "/ˈbraʊni/",
          definition: "Bánh sô-cô-la hạnh nhân ẩm dẻo",
          example: "Warm fudge brownies go wonderfully with cold vanilla ice cream scoops.",
          exampleTranslation: "Bánh brownie sô-cô-la nóng hổi đi cùng một viên kem vani tuyền mát lạnh cực kỳ ăn ý.",
          category: "cake"
        },
        {
          word: "Butter cake",
          pos: "Noun",
          phonetic: "/ˈbʌt.ər keɪk/",
          definition: "Bánh bông lan bơ cốt đặc",
          example: "Mom bakes a gold butter cake that fills the whole cottage with baking aroma.",
          exampleTranslation: "Mẹ nướng ổ bánh bơ rực vàng làm gian nhà gỗ sực mùi bơ chín quyến rũ.",
          category: "cake"
        },
        {
          word: "Carrot cake",
          pos: "Noun",
          phonetic: "/ˈkær.ət keɪk/",
          definition: "Bánh cà rốt kem phô mai",
          example: "The cinnamon spiced carrot cake is coated with a lavish white cheese glaze.",
          exampleTranslation: "Bánh ngọt cà rốt dậy mùi quế được phết lớp phô mai trắng mịn sang chảnh.",
          category: "cake"
        },

        // COOKIE
        {
          word: "Soft cookie",
          pos: "Noun",
          phonetic: "/sɒft ˈkʊk.i/",
          definition: "Bánh quy mềm xốp sô-cô-la",
          example: "Warm soft cookies with soft molten chocolate centers are pure joy.",
          exampleTranslation: "Những chiếc bánh quy bơ mềm có hạt sô-cô-la chảy dẻo sệt là niềm hạnh phúc tối thượng.",
          category: "cookie"
        },
        {
          word: "Biscuit",
          pos: "Noun",
          phonetic: "/ˈbɪskɪt/",
          definition: "Bánh quy khô giòn bơ sữa",
          example: "Dipping dry biscuits into hot British tea makes them dissolve deliciously.",
          exampleTranslation: "Nhúng bánh quy giòn vào tách trà Anh nóng làm bánh tan chảy ngọt lịm khoan khoái.",
          category: "cookie"
        },
        {
          word: "Black and white cookie",
          pos: "Noun",
          phonetic: "/blæk ænd waɪt ˈkʊk.i/",
          definition: "Bánh quy phủ kem hai màu đen trắng",
          example: "Black and white cookies offer a double glazed flavor of chocolate and vanilla.",
          exampleTranslation: "Khúc bánh quy đen trắng đem tới đồng thời vị phủ kem vani và sô-cô-la.",
          category: "cookie"
        },
        {
          word: "Butter cookie",
          pos: "Noun",
          phonetic: "/ˈbʌt.ər ˈkʊk.i/",
          definition: "Bánh quy Đan Mạch bơ giòn",
          example: "The famous blue tin butter cookies are shared during Lunar New Year holidays.",
          exampleTranslation: "Hộp thiếc xanh mướt bánh quy bơ nổi tiếng được chia nhau đầm ấm dịp Tết Nguyên Đán.",
          category: "cookie"
        },
        {
          word: "Macaroon",
          pos: "Noun",
          phonetic: "/ˌmæk.əˈruːn/",
          definition: "Bánh Macaron kiêu kỳ Pháp",
          example: "Macaroons are prized for their bright shades and delicate almond crust.",
          exampleTranslation: "Những chiếc macaron Pháp được đánh giá cao nhờ gam màu sáng và lớp vỏ bánh mỏng mịn.",
          category: "cookie"
        },
        {
          word: "Oreo",
          pos: "Noun",
          phonetic: "/ˈɔː.ri.əʊ/",
          definition: "Bánh kẹp Oreo sô-cô-la kem trắng",
          example: "Twist, lick and dunk is the legendary way to enjoy cookie Oreo.",
          exampleTranslation: "Xoay bánh, liếm kem rồi nhúng sữa là cách thức huyền thoại thưởng thức Oreo.",
          category: "cookie"
        },

        // PIE_TART
        {
          word: "Scone",
          pos: "Noun",
          phonetic: "/skɒn/",
          definition: "Bánh nướng xốp mọng Anh Quốc",
          example: "Warm scones are split in half and spread with heavy clotted cream and strawberry jam.",
          exampleTranslation: "Bánh scone nóng được tách đôi rưới kem tươi béo đặc và mứt dâu đỏ.",
          category: "pie_tart"
        },
        {
          word: "Apple pie",
          pos: "Noun",
          phonetic: "/ˈæp.l ˌpaɪ/",
          definition: "Bánh táo nướng có lưới bơ thơm",
          example: "Nothing represents traditional American home cooking like a golden apple pie.",
          exampleTranslation: "Không gì diễn tả bữa cơm quê nhà truyền thống Mỹ ấm cúng như chiếc bánh pie táo nướng.",
          category: "pie_tart"
        },
        {
          word: "Butter tart",
          pos: "Noun",
          phonetic: "/ˈbʌt.ər tɑːrt/",
          definition: "Bánh tạc bơ đường",
          example: "Butter tarts carry a gooey golden center baked inside a crisp flaky pastry shell.",
          exampleTranslation: "Bánh tạc bơ ngọt giữ lớp nhân bơ sánh vàng cực dẻo mềm mịn trong vỏ bánh ngàn lớp giòn.",
          category: "pie_tart"
        },
        {
          word: "Caramel tart",
          pos: "Noun",
          phonetic: "/ˈkær.ə.məl tɑːrt/",
          definition: "Bánh tạc nhân xốt caramen đậm",
          example: "Chocolate glazed caramel tarts are sprinkled with coarse sea salt flakes.",
          exampleTranslation: "Bánh tạc caramen phủ sô-cô-la dóng dỏng được rắc vài hạt muối biển đậm đà.",
          category: "pie_tart"
        },
        {
          word: "Egg tart",
          pos: "Noun",
          phonetic: "/eɡ tɑːrt/",
          definition: "Bánh tart trứng Macau / Bánh trứng giòn",
          example: "A tray of hot fresh egg tarts with caramelized blistered tops sells out instantly.",
          exampleTranslation: "Khay trứng nướng tart giòn rụm có lớp bề mặt cháy caramen bán hết sạch trong nháy mắt.",
          category: "pie_tart"
        },

        // FROZEN
        {
          word: "Ice cream",
          pos: "Noun",
          phonetic: "/aɪs kriːm/",
          definition: "Kem sữa tuyết ngọt lạnh",
          example: "Summer walks are complete when buying an ice cream scoop on waffle cones.",
          exampleTranslation: "Đi dạo hè thật trọn vẹn khi mua một viên kem mát rượi đặt trên ốc quế giòn.",
          category: "frozen"
        },
        {
          word: "Frozen yogurt",
          pos: "Noun",
          phonetic: "/ˈfrəʊ.zən ˈjɒɡ.ət/",
          definition: "Sữa chua đông lạnh dẻo dẹt",
          example: "You can load frozen yogurt with fresh strawberries, kiwis and honey drizzle.",
          exampleTranslation: "Bạn có thể chất đầy dĩa sữa chua đông lạnh với dâu tây, kiwi tươi và mật ong thơm.",
          category: "frozen"
        },
        {
          word: "Gelato",
          pos: "Noun",
          phonetic: "/dʒəˈlɑː.təʊ/",
          definition: "Kem dẻo Ý đặc mịn",
          example: "Italian gelato has denser substance and less cream overrun.",
          exampleTranslation: "Kem dẻo gelato của nước Ý có kết cấu mịn đậm đặc và ít dăm đá hơn hẳn kem thông thường.",
          category: "frozen"
        },
        {
          word: "Snow cone",
          pos: "Noun",
          phonetic: "/snəʊ kəʊn/",
          definition: "Siro tuyết đá bào rưới mật ngọt",
          example: "A vibrant rainbow snow cone is the cheapest way to cool off under tropical block heats.",
          exampleTranslation: "Kem tuyết rưới siro cầu vồng rực rỡ là cách giải khát rẻ nhất dưới cái nóng thiêu nhiệt đới.",
          category: "frozen"
        },
        {
          word: "Ice cream sandwich",
          pos: "Noun",
          phonetic: "/aɪs kriːm ˈsænwɪdʒ/",
          definition: "Bánh kẹp kem lạnh ngọt ngào",
          example: "Sandwiching cool creamy mint ice cream between chocolate wafers creates an ultimate snack.",
          exampleTranslation: "Kẹp kem bạc hà mát lạnh giữa tảng bánh xốp sô-cô-la tạo nên món ăn vặt đỉnh của chóp.",
          category: "frozen"
        },
        {
          word: "Popsicle",
          pos: "Noun",
          phonetic: "/ˈpɒp.sɪ.kl̩/",
          definition: "Kem que trái cây trong xưởng đá",
          example: "Children run to buy lemon popsicles as soon as hear bells ring outside.",
          exampleTranslation: "Lũ nhỏ náo nức chạy vụt đi mua kem que chanh mát rượi mỗi khi nghe khua chuông dạo.",
          category: "frozen"
        },

        // CUSTARD
        {
          word: "Crème brûlée",
          pos: "Noun",
          phonetic: "/ˌkrem bruːˈleɪ/",
          definition: "Kem trứng cháy caramen mượt",
          example: "Crack the caramelized sugar shell using a small spoon to access the cold custard.",
          exampleTranslation: "Gõ nhẹ vỡ lớp đường cháy caramen bằng thìa nhỏ để khám phá phần kem sữa béo ngậy.",
          category: "custard"
        },
        {
          word: "Banana pudding",
          pos: "Noun",
          phonetic: "/bəˈnæn.ə ˈpʊd.ɪŋ/",
          definition: "Bánh pudding sữa trứng kem chuối",
          example: "Banana pudding layers sweet vanilla wafers, custard creme and fresh sliced fruit.",
          exampleTranslation: "Món banana pudding có các lớp bánh xốp quế, kem trứng chuối mịn và hoa quả tươi thái mỏng.",
          category: "custard"
        },
        {
          word: "French toast",
          pos: "Noun",
          phonetic: "/frentʃ təʊst/",
          definition: "Bánh mì nhúng bơ trứng nướng ngọt",
          example: "French toast dripped in sweet Canadian maple syrup is breakfast luxury.",
          exampleTranslation: "Bánh mì French toast rưới mật phong ngọt lịm Canada là món ăn sáng thượng hạng.",
          category: "custard"
        },
        {
          word: "Soufflé",
          pos: "Noun",
          phonetic: "/ˈsuː.fleɪ/",
          definition: "Bánh trứng phồng Pháp bay bổng",
          example: "The delicate hot chocolate soufflé rises beautifully over oven cups.",
          exampleTranslation: "Món bánh soufflé sô-cô-la nóng điệu đà nở phồng một cách kiêu sa khỏi cốc lò nướng.",
          category: "custard"
        },

        // DOUGHNUT
        {
          word: "Funnel cake",
          pos: "Noun",
          phonetic: "/ˈfʌn.əl keɪk/",
          definition: "Bánh bột lọc chiên bột phễu giòn",
          example: "Funnel cakes are a carnival classic, served crisp and doused in sugar snow.",
          exampleTranslation: "Bánh chiên bột phễu là đặc sản hội chợ, ăn giòn rụm và rắc trắng xóa đường bột tinh.",
          category: "doughnut"
        },
        {
          word: "Glazed doughnut",
          pos: "Noun",
          phonetic: "/ɡleɪzd ˈdəʊ.nʌt/",
          definition: "Bánh vòng rán phủ lớp đường kính dẹt",
          example: "A fresh warm glazed doughnut pairs amazingly with a hot black coffee brew.",
          exampleTranslation: "Chiếc bánh doughnut rán vòng phủ đường ấm áp kết đôi cực đỉnh với ly đen nóng sủi.",
          category: "doughnut"
        }
      ]
    },
    {
      id: "grains_cheese",
      name: "Grains & Cheese (Ngũ cốc / Phô mai)",
      description: "Phương pháp học từ vựng tinh bột, sợi lúa mì và nhóm phô mai dải màu sắc dẫm đĩnh Page 27.",
      categories: [
        { id: "pasta_noodles", name: "Mì & Sợi Lúa (Pastas & Noodles)", color: "from-yellow-400 to-yellow-600 border-yellow-300 text-yellow-950" },
        { id: "grains", name: "Ngũ Cốc Các Bộ (Grains)", color: "from-amber-500 to-amber-700 border-amber-300 text-amber-100" },
        { id: "cheese", name: "Nhóm Phô Mai (Cheese)", color: "from-orange-400 to-orange-550 border-orange-300 text-orange-95" }
      ],
      nodes: [
        // PASTA NOODLES
        {
          word: "Spaghetti",
          pos: "Noun",
          phonetic: "/spəˈɡeti/",
          definition: "Mì Ý dạng sợi tròn dài dẻo",
          example: "Mom boils spaghetti for eight minutes to achieve a perfect al-dente chewiness.",
          exampleTranslation: "Mẹ luộc mì Ý spaghetti trong 8 phút để đạt độ dẻo chín vừa dai ngon đúng chuẩn.",
          category: "pasta_noodles"
        },
        {
          word: "Pasta",
          pos: "Noun",
          phonetic: "/ˈpæstə/",
          definition: "Mì ống / Nui tinh bột nói chung",
          example: "She ordered a plate of ocean seafood creamy pasta for her birthday.",
          exampleTranslation: "Cô ấy đã gọi một dĩa nui mì Ý hải sản sốt kem béo ngậy cho bữa sinh nhật.",
          category: "pasta_noodles"
        },
        {
          word: "Macaroni",
          pos: "Noun",
          phonetic: "/ˌmæk.əˈrəʊ.ni/",
          definition: "Nui cong ngắn xúp phô mai",
          example: "Creamy macaroni and cheese is the ultimate comfort dish in America.",
          exampleTranslation: "Nui ống cong sốt phô mai béo ngậy là món ăn xoa dịu tâm hồn quốc dân tại Mỹ.",
          category: "pasta_noodles"
        },
        {
          word: "Noodles",
          pos: "Noun",
          phonetic: "/ˈnuː.dl̩z/",
          definition: "Mì sợi dai / phở sấy / hủ tiếu",
          example: "A bowl of hot instant beef noodles satisfies late-night cravings instantly.",
          exampleTranslation: "Một tô mì bò ăn liền nóng hổi cứu rỗi tâm hồn đói đêm tức thì.",
          category: "pasta_noodles"
        },

        // GRAINS
        {
          word: "Rice",
          pos: "Noun",
          phonetic: "/raɪs/",
          definition: "Hạt lúa gạo / tinh bột cơm ta",
          example: "White grain jasmine rice smells of fresh fields and pairs with overall meat dishes.",
          exampleTranslation: "Hạt cơm thơm lài hữu cơ mang mùi đồng ruộng tươi và cực hợp mọi món mặn.",
          category: "grains"
        },
        {
          word: "Wheat",
          pos: "Noun",
          phonetic: "/wiːt/",
          definition: "Hạt lúa mì hạt cứng",
          example: "Global bakery trade uses premium wheat flour to bake airy rustic sourdough breads.",
          exampleTranslation: "Ngành làm bánh toàn cầu dùng bột lúa mì hảo hạng để làm ổ bánh mì chua giòn rỗng khí.",
          category: "grains"
        },
        {
          word: "Barley",
          pos: "Noun",
          phonetic: "/ˈbɑː.li/",
          definition: "Lúa mạch nấu súp bia",
          example: "Barley grains are brewed in copper kettles to ferment robust traditional beers.",
          exampleTranslation: "Hạt lúa mạch được ủ hầm trong vạc đồng lớn để lên men bia đen truyền thống.",
          category: "grains"
        },
        {
          word: "Oatmeal",
          pos: "Noun",
          phonetic: "/ˈəʊt.miːl/",
          definition: "Bột yến mạch dầy dinh xơ",
          example: "Dieting breakfast often showcases cooked oatmeal with fresh banana slices.",
          exampleTranslation: "Bữa sáng ăn kiêng thường gồm ngũ cốc yến mạch nấu chín cùng những lát chuối tươi.",
          category: "grains"
        },

        // CHEESE
        {
          word: "Cheddar",
          pos: "Noun",
          phonetic: "/ˈtʃed.ə(r)/",
          definition: "Phô mai Cheddar có đỏ vàng đậm đặc",
          example: "An aged slice of sharp English cheddar adds immense depth to burgers.",
          exampleTranslation: "Một lát phô mai cheddar cũ đậm vị Anh Quốc đem lại độ ngậy dầy mê hồn cho bánh bơ-gơ.",
          category: "cheese"
        },
        {
          word: "Mozzarella",
          pos: "Noun",
          phonetic: "/ˌmɒt.səˈrel.ə/",
          definition: "Phô mai dẻo kéo dải dai Mozzarella",
          example: "A fresh block of mozzarella is sliced onto Italian pizzas for massive elastic pulls.",
          exampleTranslation: "Khối phô mai Mozzarella dẻo được rải lên bánh pizza để tạo những đường kéo sợi dài tít.",
          category: "cheese"
        },
        {
          word: "Parmesan",
          pos: "Noun",
          phonetic: "/ˌpɑː.mɪˈzæn/",
          definition: "Phô mai Parmesan dạng hạt cứng",
          example: "Grate fresh hard dry parmesan over steaming pasta to maximize umami.",
          exampleTranslation: "Bào vụn phô mai Parmesan khô lên đĩa nui nóng hổi để kích hoạt vị ngọt mặn umami tối đa.",
          category: "cheese"
        }
      ]
    },
    {
      id: "junk_snacks",
      name: "Junk Food / Snacks (Đồ ăn vặt)",
      description: "Phương pháp phân loại từ vựng đồ ăn nhanh nghèo dưỡng chất và đồ ăn vặt đóng gói mặn ngọt theo Page 29.",
      categories: [
        { id: "fastfood", name: "Thức Ăn Nhanh (Fast Food)", color: "from-rose-500 to-rose-700 border-rose-455 text-rose-101" },
        { id: "snacks", name: "Đồ Ăn Vặt (Snacks / Chips)", color: "from-amber-400 to-amber-600 border-amber-300 text-amber-955" }
      ],
      nodes: [
        // FASTFOOD
        {
          word: "Burger",
          pos: "Noun",
          phonetic: "/ˈbɜː.ɡər/",
          definition: "Bánh mì kẹp bơ-gơ tròn truyền thống",
          example: "Beef patties are grilled to charry perfection before getting assembled inside a sesame burger bun.",
          exampleTranslation: "Chả bò được nướng xém cạnh tuyệt hảo trước khi kẹp vào ổ bánh burger vừng tròn.",
          category: "fastfood"
        },
        {
          word: "Cheeseburger",
          pos: "Noun",
          phonetic: "/ˈtʃiːzˌbɜː.ɡər/",
          definition: "Bánh bơ-gơ kẹp lát phô mai ngậy béo",
          example: "We ordered double cheese burgers with a size of hot crinkle fry containers.",
          exampleTranslation: "Chúng tôi đặt hai ổ bơ-gơ kẹp phô mai hai tầng cùng một hộp khoai chiên răng cưa cực lớn.",
          category: "fastfood"
        },
        {
          word: "Pizza",
          pos: "Noun",
          phonetic: "/ˈpiːt.sə/",
          definition: "Bánh Pizza nướng giòn tròn dẹt lò Ý",
          example: "Hot fresh woodfired pizzas are loaded with pepperoni, sweet basils and mozzarella cheese.",
          exampleTranslation: "Chiếc bánh Pizza lò nướng củi rực nóng ngập tràn pepperoni, húng tây và phô mai dẻo dai.",
          category: "fastfood"
        },
        {
          word: "Hot dog",
          pos: "Noun",
          phonetic: "/ˈhɒt.dɒɡ/",
          definition: "Xúc xích kẹp bánh mì rưới sốt cay nhạt",
          example: "Grabbing a hot dog with dynamic sauerkraut was the best street food experience.",
          exampleTranslation: "Mua vội cây bánh mì xúc xích hot dog chua kèm cải cải cay là trải nghiệm hè đường phố tuyệt nhất.",
          category: "fastfood"
        },

        // SNACKS
        {
          word: "French fries",
          pos: "Noun",
          phonetic: "/frentʃ fraɪz/",
          definition: "Khoai tây chiên dạng cọc thanh que dài",
          example: "Golden hot French fries are sprinkled with sea salt and dunked into sweet tomato ketchup.",
          exampleTranslation: "Khoai tây chiên cọng vàng ruộm được rắc nhẹ tí muối hạt và nhúng ngập xốt tương cà chua.",
          category: "snacks"
        },
        {
          word: "Potato chips",
          pos: "Noun",
          phonetic: "/pəˈteɪ.təʊ tʃɪps/",
          definition: "Khoai tây chiên lát mỏng đóng gói bim bim",
          example: "Watching cinema with bags of salty potato chips makes the movie much more enjoyable.",
          exampleTranslation: "Xem phim với những gói khoai tây lát mỏng mặn giòn tan làm bộ phim vui hơn gấp nghìn lần.",
          category: "snacks"
        },
        {
          word: "Popcorn",
          pos: "Noun",
          phonetic: "/ˈpɒp.kɔːn/",
          definition: "Bắp rang bơ vàng rụm ngọt thơm phưng",
          example: "The sweet scent of sugar caramel popcorn guides crowds to the cinema doors instantly.",
          exampleTranslation: "Hương thơm ngọt lịm của bắp rang bơ mật caramel lôi cuốn dòng người đổ vào sảnh rạp lập tức.",
          category: "snacks"
        },
        {
          word: "Nachos",
          pos: "Noun",
          phonetic: "/ˈnɑː.tʃəʊz/",
          definition: "Bánh dẹt ngô nướng rưới xốt phô mai sệt",
          example: "Nachos plates with chili beef, rich guacamole and sour cream are shared among tables.",
          exampleTranslation: "Đĩa ngô Nachos rưới thịt bò băm, sốt quả bơ béo ngậy và kem sữa chua được chia nhau rộn rã.",
          category: "snacks"
        }
      ]
    },
    {
      id: "spices_dressing",
      name: "Spices & Dressing (Gia vị & Nước xốt)",
      description: "Phương pháp rẽ nhánh từ vựng vị giác cơ bản, thảo mộc nấu tẩm vị và nước xốt rưới mỏng bám sát Page 31.",
      categories: [
        { id: "spices", name: "Gia vị & Thảo mộc (Spices & Herbs)", color: "from-emerald-500 to-emerald-700 border-emerald-450 text-emerald-100" },
        { id: "dressing", name: "Nước xốt & Mayonnaise (Dressing)", color: "from-teal-400 to-teal-600 border-teal-300 text-teal-100" }
      ],
      nodes: [
        // SPICES
        {
          word: "Sweet",
          pos: "Adjective",
          phonetic: "/swiːt/",
          definition: "Vị ngọt dịu dạt bơ đường mật",
          example: "The cake developed a light sweet honey glaze that tastes absolutely divine.",
          exampleTranslation: "Ổ bánh có một lớp màng mật ong ngọt thanh mướt mát ăn cực kỳ ngon thần sầu.",
          category: "spices"
        },
        {
          word: "Herb",
          pos: "Noun",
          phonetic: "/hɜːb/",
          definition: "Thảo mộc tươi / rau thơm rắc súp",
          example: "Fresh green herbs like cilantro and mint are key to Vietnamese flavor balances.",
          exampleTranslation: "Rau thơm xanh mướt như ngò gai và húng lủi là chìa khóa thăng bằng vị giác trong món ăn Việt.",
          category: "spices"
        },
        {
          word: "Salt",
          pos: "Noun",
          phonetic: "/sɔːlt/",
          definition: "Muối ăn tinh mặn trắng biển",
          example: "Adding a robust pinch of salt makes all individual sweet profiles stand out instantly.",
          exampleTranslation: "Bỏ thêm một nhúm muối tinh chất lượng kích vị ngọt lịm vốn ẩn giấu bật lên rực rỡ.",
          category: "spices"
        },
        {
          word: "Black pepper",
          pos: "Noun",
          phonetic: "/blæk ˈpep.ər/",
          definition: "Tiêu hạt đen xay giã nhỏ cay nức",
          example: "Freshly crushed black pepper elevates beef steaks with deep woody heat aroma.",
          exampleTranslation: "Hạt tiêu đen mới xay rải đều nâng tầm thịt bò bít tết bằng mùi cay nồng nàn thảo mộc gỗ.",
          category: "spices"
        },
        {
          word: "Chili powder",
          pos: "Noun",
          phonetic: "/ˈtʃɪl.i ˈpaʊ.dər/",
          definition: "Ớt bột cay đỏ rực rỡ rắc đều",
          example: "We dust chili powder over grilled chicken skewers to create vibrant visual and taste.",
          exampleTranslation: "Chúng tôi rắc nhẹ ớt bột lên các xiên gà nướng để tạo màu sắc rực rỡ và vị cay nồng say.",
          category: "spices"
        },

        // DRESSING
        {
          word: "Mayonnaise",
          pos: "Noun",
          phonetic: "/ˌmeɪ.əˈneɪz/",
          definition: "Xốt kem trắng béo xốt trứng gà Mayonnaise",
          example: "Whisking fresh yolks with lemon juice and droplets of olive oils creates rich mayonnaise cream.",
          exampleTranslation: "Đánh đều lòng đỏ trứng cùng nước chanh và dầu olive rỏ giọt tạo nên kem sốt Mayonnaise ngậy mịn sệt.",
          category: "dressing"
        },
        {
          word: "Mustard",
          pos: "Noun",
          phonetic: "/ˈmʌstəd/",
          definition: "Mù tạt hăng cay nồng mũi vàng óng",
          example: "A dash of sharp yellow mustard balances fatty sausage links perfectly.",
          exampleTranslation: "Một vệt mù tạt vàng hăng cay độc đáo cân bằng béo ngậy của cây xúc xích quay cực đỉnh.",
          category: "dressing"
        },
        {
          word: "Soy sauce",
          pos: "Noun",
          phonetic: "/ˈsɔɪ ˌsɔːs/",
          definition: "Nước tương ngọt mặn / xì dầu đậu nành",
          example: "Vietnamese noodles are often tossed with robust droplets of dark soy sauce and garlic vinegar.",
          exampleTranslation: "Hủ tiếu khô Việt Nam thường được đảo đều với nước tương đậm đặc hảo hạng và dấm tỏi tăm.",
          category: "dressing"
        },
        {
          word: "Fish sauce",
          pos: "Noun",
          phonetic: "/fɪʃ sɔːs/",
          definition: "Nước mắm nhĩ quốc hồn quốc túy",
          example: "High nitrogen fish sauce is the foundational soul of Vietnamese dipping dressings.",
          exampleTranslation: "Nước mắm cốt độ đạm cao là linh hồn nền tảng trong mọi chén nước chấm gia đình Việt.",
          category: "dressing"
        }
      ]
    }
  ]
};
