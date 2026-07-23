export interface EbookWord {
  num: number;
  word: string;
  translation: string;
  exampleEn: string;
  exampleVi: string;
  extraVocab?: { phrase: string; translation: string }[];
}

export interface EbookQuestion {
  id: number;
  type: 'translate_phrase' | 'replace_phrase' | 'translate_sentence';
  vietnamese: string;
  context?: string; // full sentence context
  correctAnswer: string;
  alternatives?: string[]; // other acceptable correct answers
  hint?: string;
}

export interface EbookTopic {
  id: string;
  title: string;
  titleVi: string;
  pageRange: string;
  description: string;
  words: EbookWord[];
  questions: {
    part1: EbookQuestion[]; // Dịch cụm từ
    part2: EbookQuestion[]; // Thay thế cụm từ
    part3: EbookQuestion[]; // Dịch câu
  };
}

export const ebookTopics: EbookTopic[] = [
  {
    id: "environment",
    title: "ENVIRONMENT",
    titleVi: "Môi trường",
    pageRange: "Trang 4 - 11",
    description: "Chủ đề môi trường, các hiện tượng thời tiết cực đoan, biến đổi khí hậu và bảo vệ môi trường sinh thái.",
    words: [
      {
        num: 1,
        word: "put somebody/something in great danger",
        translation: "khiến ai đó/thứ gì đó gặp nguy hiểm lớn",
        exampleEn: "The frequent occurrence of extreme weather events, such as prolonged droughts or severe heatwaves, puts those living in these areas in great danger.",
        exampleVi: "Sự xuất hiện thường xuyên của các hiện tượng thời tiết cực đoan, như các đợt hạn hán kéo dài hoặc các đợt sóng nhiệt gay gắt, khiến những người sống ở những khu vực này gặp nguy hiểm lớn.",
        extraVocab: [
          { phrase: "the frequent occurrence of …", translation: "sự xuất hiện thường xuyên của …" },
          { phrase: "extreme weather events", translation: "các hiện tượng thời tiết cực đoan" },
          { phrase: "prolonged droughts", translation: "các đợt hạn hán kéo dài" },
          { phrase: "severe heatwaves", translation: "các đợt sóng nhiệt gay gắt" }
        ]
      },
      {
        num: 2,
        word: "pose a serious threat to somebody/something",
        translation: "gây ra một mối đe dọa nghiêm trọng đối với …",
        exampleEn: "Global warming is a pressing environmental problem that is posing a serious threat to the entire world.",
        exampleVi: "Nóng lên toàn cầu là một vấn đề môi trường cấp bách đang gây ra mối đe dọa nghiêm trọng đối với toàn thế giới.",
        extraVocab: [
          { phrase: "pressing environmental problem", translation: "một vấn đề môi trường cấp bách" },
          { phrase: "urgent environmental issue", translation: "một vấn đề môi trường khẩn cấp" }
        ]
      },
      {
        num: 3,
        word: "be on the verge of extinction",
        translation: "đang trên bờ vực tuyệt chủng",
        exampleEn: "Large areas of forests are being cut down annually, and thousands of wild animals are on the verge of extinction due to habitat loss.",
        exampleVi: "Các khu vực rừng rộng lớn đang bị đốn hạ hàng năm, và hàng ngàn động vật hoang dã đang trên bờ vực tuyệt chủng do mất đi môi trường sống.",
        extraVocab: [
          { phrase: "to be cut down", translation: "bị đốn hạ, chặt hạ" },
          { phrase: "annually", translation: "hàng năm" },
          { phrase: "habitat loss", translation: "sự mất đi môi trường sống" }
        ]
      },
      {
        num: 4,
        word: "hazardous gas emissions",
        translation: "khí thải độc hại",
        exampleEn: "Millions of tonnes of hazardous gas emissions are being released into the atmosphere, worsening global warming.",
        exampleVi: "Hàng triệu tấn khí thải độc hại đang được thải vào khí quyển, làm cho nóng lên toàn cầu trầm trọng hơn.",
        extraVocab: [
          { phrase: "to be released into the atmosphere", translation: "được/bị thải vào bầu khí quyển" },
          { phrase: "worsen something", translation: "làm cho cái gì trở nên tồi tệ hơn, xấu hơn" }
        ]
      },
      {
        num: 5,
        word: "climate change",
        translation: "biến đổi khí hậu",
        exampleEn: "Some of the effects of climate change include rising sea levels, more intense heatwaves and more frequent wildfires.",
        exampleVi: "Một số tác động của biến đổi khí hậu bao gồm mực nước biển dâng cao, các đợt sóng nhiệt dữ dội hơn và các đợt cháy rừng thường xuyên hơn.",
        extraVocab: [
          { phrase: "rising sea levels", translation: "mực nước biển dâng cao" },
          { phrase: "intense heatwaves", translation: "các đợt sóng nhiệt dữ dội" },
          { phrase: "frequent wildfires", translation: "các đợt cháy rừng thường xuyên" }
        ]
      },
      {
        num: 6,
        word: "natural resources",
        translation: "tài nguyên thiên nhiên",
        exampleEn: "Life would become much more difficult if natural resources, such as fossil fuels, became scarce.",
        exampleVi: "Cuộc sống sẽ trở nên khó khăn hơn nhiều nếu tài nguyên thiên nhiên, như nhiên liệu hóa thạch, trở nên khan hiếm.",
        extraVocab: [
          { phrase: "fossil fuels", translation: "nhiên liệu hóa thạch" },
          { phrase: "scarce", translation: "khan hiếm" }
        ]
      },
      {
        num: 7,
        word: "environmental degradation",
        translation: "suy thoái môi trường",
        exampleEn: "Environmental degradation might put an end to life on Earth if nothing is done to tackle this issue.",
        exampleVi: "Suy thoái môi trường có thể chấm dứt sự sống trên Trái đất nếu không có gì được thực hiện để giải quyết vấn đề này.",
        extraVocab: [
          { phrase: "put an end to something", translation: "chấm dứt cái gì, làm cho cái gì không xảy ra" },
          { phrase: "tackle something", translation: "giải quyết vấn đề gì" }
        ]
      },
      {
        num: 8,
        word: "fossil fuel power plants",
        translation: "các nhà máy năng lượng hóa thạch",
        exampleEn: "The amount of greenhouse gas emissions released from fossil fuel power plants has dramatically increased in recent decades, contributing to air pollution and global warming.",
        exampleVi: "Lượng khí thải nhà kính thải ra từ các nhà máy năng lượng hóa thạch đã tăng đáng kể trong những thập kỷ gần đây, góp phần gây ô nhiễm không khí và nóng lên toàn cầu.",
        extraVocab: [
          { phrase: "to be released from ...", translation: "được/bị thải ra từ ..." },
          { phrase: "contribute to something", translation: "góp phần vào việc gì, gây ra vấn đề gì" }
        ]
      }
    ],
    questions: {
      part1: [
        {
          id: 101,
          type: "translate_phrase",
          vietnamese: "việc khai thác gỗ và phá rừng bất hợp pháp",
          context: "One of the primary causes of ______ is poor forest management.",
          correctAnswer: "illegal logging and forest clearance",
          alternatives: ["illegal logging & forest clearance", "illegal logging and deforestation"],
          hint: "Xem mục số 11 trong bài học"
        },
        {
          id: 102,
          type: "translate_phrase",
          vietnamese: "những thay đổi nhanh chóng của thời tiết",
          context: "Food production in many parts of the world is being seriously affected by ______.",
          correctAnswer: "rapid changes in weather patterns",
          hint: "Xem mục số 13 trong bài học"
        },
        {
          id: 103,
          type: "translate_phrase",
          vietnamese: "các chương trình bảo vệ môi trường",
          context: "As individuals, we can help by taking part in ______ and buying more energy-saving home appliances.",
          correctAnswer: "environmental protection programmes",
          alternatives: ["environmental protection programs"],
          hint: "Xem mục số 14 trong bài học"
        },
        {
          id: 104,
          type: "translate_phrase",
          vietnamese: "các nguồn năng lượng thân thiện với môi trường",
          context: "The first solution would be to use ______, such as solar, wind or water power, instead of fossil fuels.",
          correctAnswer: "environmentally friendly energy sources",
          hint: "Xem mục số 15 trong bài học"
        },
        {
          id: 105,
          type: "translate_phrase",
          vietnamese: "khiến những người sống gần đó gặp nguy hiểm lớn",
          context: "This contaminated river ______.",
          correctAnswer: "puts those living near there in great danger",
          alternatives: [
            "puts those living nearby in great danger",
            "puts people living nearby in great danger",
            "puts those living in these areas in great danger"
          ],
          hint: "Sử dụng cấu trúc 'put somebody/something in great danger'"
        }
      ],
      part2: [
        {
          id: 201,
          type: "replace_phrase",
          vietnamese: "IN DANGER OF EXTINCTION",
          context: "Many animals are IN DANGER OF EXTINCTION due to habitat destruction.",
          correctAnswer: "on the verge of extinction",
          hint: "Thay bằng cụm từ tương đương bắt đầu bằng 'on the...'"
        },
        {
          id: 202,
          type: "replace_phrase",
          vietnamese: "HARMFUL GREENHOUSE GASES",
          context: "These factories emit tonnes of HARMFUL GREENHOUSE GASES each month.",
          correctAnswer: "hazardous gas emissions",
          hint: "Sử dụng từ đồng nghĩa 'hazardous...'"
        },
        {
          id: 203,
          type: "replace_phrase",
          vietnamese: "THE BURNING OF COAL, OIL AND NATURAL GAS",
          context: "Toxic emissions from THE BURNING OF COAL, OIL AND NATURAL GAS severely affect the ozone layer, leading to a process known as the greenhouse effect.",
          correctAnswer: "the combustion of fossil fuels",
          hint: "Xem mục số 12 trong bài học"
        },
        {
          id: 204,
          type: "replace_phrase",
          vietnamese: "TRY OUR BEST TO",
          context: "We should TRY OUR BEST TO protect our planet from pollution.",
          correctAnswer: "make every possible effort to",
          hint: "Xem mục số 20 trong bài học"
        },
        {
          id: 205,
          type: "replace_phrase",
          vietnamese: "PUT AN END TO LIFE ON EARTH",
          context: "These environmental problems could become so serious that one day they might PUT AN END TO LIFE ON EARTH.",
          correctAnswer: "wipe out life on Earth",
          hint: "Xem mục số 16 trong bài học"
        }
      ],
      part3: [
        {
          id: 301,
          type: "translate_sentence",
          vietnamese: "Biến đổi khí hậu là một trong những vấn đề cấp bách nhất mà thế giới đang phải đối mặt ngày nay. (confront)",
          correctAnswer: "Climate change is one of the most pressing environmental problems that the world is confronting today.",
          alternatives: [
            "Climate change is one of the most urgent environmental issues that the world is confronting today.",
            "Climate change is one of the most pressing environmental issues that the world is confronting today."
          ],
          hint: "Bắt đầu với 'Climate change is one of the...'"
        },
        {
          id: 302,
          type: "translate_sentence",
          vietnamese: "Người ta dự đoán là tài nguyên thiên nhiên, như than, dầu và khí tự nhiên, sẽ cạn kiệt trong 100 năm tới. (predict, run out)",
          correctAnswer: "It is predicted that natural resources, such as coal, oil and natural gas, will run out in the next 100 years.",
          alternatives: [
            "It is predicted that natural resources, like coal, oil and natural gas, will run out in the next 100 years."
          ],
          hint: "Dùng thể bị động 'It is predicted that...'"
        },
        {
          id: 303,
          type: "translate_sentence",
          vietnamese: "Điều này đã dẫn đến các sự kiện thời tiết cực đoan, như bão dữ dội và động chất thường xuyên, đe dọa những người sống ở những khu vực này. (hiện tại hoàn thành)",
          correctAnswer: "This has led to extreme weather events, such as severe storms and frequent earthquakes, posing a serious threat to people living in these areas.",
          alternatives: [
            "This has led to extreme weather events, such as severe storms and frequent earthquakes, threatening those living in these areas."
          ],
          hint: "Sử dụng 'This has led to...'"
        },
        {
          id: 304,
          type: "translate_sentence",
          vietnamese: "Có nhiều nguyên nhân gây suy thoái môi trường, và một trong số đó là nạn phá rừng.",
          correctAnswer: "There are many causes of environmental degradation, and one of them is deforestation.",
          alternatives: [
            "There are various causes of environmental degradation, and one of them is deforestation."
          ],
          hint: "Dùng 'There are many causes of...'"
        }
      ]
    }
  },
  {
    id: "energy",
    title: "ENERGY",
    titleVi: "Năng lượng",
    pageRange: "Trang 12 - 18",
    description: "Chủ đề năng lượng hóa thạch, năng lượng tái tạo, bảo tồn năng lượng và các rủi ro từ hạt nhân.",
    words: [
      {
        num: 1,
        word: "fossil fuels",
        translation: "nhiên liệu hóa thạch",
        exampleEn: "These countries rely heavily on fossil fuels to meet their growing energy needs.",
        exampleVi: "Các quốc gia này phụ thuộc nặng nề vào nhiên liệu hóa thạch để đáp ứng nhu cầu năng lượng ngày càng tăng của họ.",
        extraVocab: [
          { phrase: "rely heavily on something", translation: "phụ thuộc nặng nề vào thứ gì" },
          { phrase: "meet their growing energy needs", translation: "đáp ứng nhu cầu năng lượng ngày càng tăng" }
        ]
      },
      {
        num: 2,
        word: "renewable energy",
        translation: "năng lượng tái tạo",
        exampleEn: "The supply of renewable energy is greatly affected by weather patterns.",
        exampleVi: "Việc cung cấp năng lượng tái tạo bị ảnh hưởng lớn bởi thời tiết.",
        extraVocab: [
          { phrase: "the supply of something", translation: "nguồn cung cấp cái gì" },
          { phrase: "to be greatly affected by ...", translation: "bị ảnh hưởng lớn bởi ..." }
        ]
      },
      {
        num: 3,
        word: "radioactive waste",
        translation: "chất thải phóng xạ",
        exampleEn: "The government needs to make sure that nuclear power plants discharge their radioactive waste safely and carefully, without causing any damage to the environment.",
        exampleVi: "Chính phủ cần đảm bảo rằng các nhà máy điện hạt nhân xả chất thải phóng xạ một cách an toàn và cẩn thận, mà không gây ra bất kỳ thiệt hại nào cho môi trường.",
        extraVocab: [
          { phrase: "discharge something", translation: "xả, thải thứ gì" },
          { phrase: "cause damage to something", translation: "gây thiệt hại cho ..." }
        ]
      }
    ],
    questions: {
      part1: [
        {
          id: 401,
          type: "translate_phrase",
          vietnamese: "mức độ phóng xạ cao",
          context: "Exposure to ______ can cause fatal health issues, including cardiovascular diseases and cancer.",
          correctAnswer: "high levels of radiation",
          hint: "Xem mục số 4 trong bài học"
        },
        {
          id: 402,
          type: "translate_phrase",
          vietnamese: "Các nguồn năng lượng không tái tạo được",
          context: "______, such as coal, oil and natural gas, are predicted to run out in the next 100 years.",
          correctAnswer: "Non-renewable energy sources",
          alternatives: ["non-renewable energy sources", "Non renewable energy sources"],
          hint: "Xem mục số 6 trong bài học"
        }
      ],
      part2: [
        {
          id: 501,
          type: "replace_phrase",
          vietnamese: "SOLAR, WIND AND WATER POWER",
          context: "One of the most effective measures to mitigate climate change would be to encourage the use of SOLAR, WIND AND WATER POWER, instead of fossil fuels.",
          correctAnswer: "renewable energy",
          hint: "Thay bằng cụm từ đại diện chung: năng lượng tái tạo"
        }
      ],
      part3: [
        {
          id: 601,
          type: "translate_sentence",
          vietnamese: "Việc đốt nhiên liệu hóa thạch giải phóng một lượng khí thải nhà kính khổng lồ vào bầu khí quyển, góp phần vào sự nóng lên toàn cầu. (release, contribute)",
          correctAnswer: "The combustion of fossil fuels releases a huge amount of greenhouse gas emissions into the atmosphere, contributing to global warming.",
          alternatives: [
            "Burning fossil fuels releases a huge amount of greenhouse gas emissions into the atmosphere, contributing to global warming."
          ],
          hint: "Dùng từ 'The combustion of fossil fuels' và 'releases...'"
        }
      ]
    }
  },
  {
    id: "education",
    title: "EDUCATION",
    titleVi: "Giáo dục",
    pageRange: "Trang 19 - 26",
    description: "Phương pháp giảng dạy, trường học một giới hoặc chung giới, vai trò của giáo dục đại học.",
    words: [
      {
        num: 1,
        word: "academic results",
        translation: "kết quả học tập",
        exampleEn: "It is believed by some people that those studying in single-sex schools often achieve better academic results than their counterparts at co-ed schools.",
        exampleVi: "Một số người tin rằng những người học ở các trường một giới thường đạt được kết quả học tập tốt hơn so với bạn bè của họ tại các trường chung cho hai giới.",
        extraVocab: [
          { phrase: "single-sex schools", translation: "trường một giới" },
          { phrase: "co-ed schools", translation: "trường chung giới" }
        ]
      },
      {
        num: 2,
        word: "to be genuinely passionate about",
        translation: "thực sự đam mê về cái gì",
        exampleEn: "Many students do not know what career path they are genuinely passionate about, so studying a wide range of subjects will help them find out what they really love.",
        exampleVi: "Nhiều sinh viên không biết con đường sự nghiệp mà chúng thực sự đam mê, vì vậy học đa dạng các môn học sẽ giúp chúng tìm ra chúng thực sự thích gì."
      }
    ],
    questions: {
      part1: [
        {
          id: 701,
          type: "translate_phrase",
          vietnamese: "kết quả học tập của chúng",
          context: "These distractions might prevent students from focusing on their studies, negatively affecting ______.",
          correctAnswer: "their academic results",
          hint: "Xem mục số 1 của Education"
        }
      ],
      part2: [
        {
          id: 801,
          type: "replace_phrase",
          vietnamese: "SPEND A YEAR WORKING OR TRAVELLING",
          context: "There are a range of benefits for students who decide to SPEND A YEAR WORKING OR TRAVELLING before entering university.",
          correctAnswer: "take a gap year",
          hint: "Thay bằng cụm từ thông dụng 4 từ bắt đầu bằng 'take a...'"
        }
      ],
      part3: [
        {
          id: 901,
          type: "translate_sentence",
          vietnamese: "Một số người tin rằng sinh viên đại học nên được trang bị các kỹ năng quản lý tài chính để giúp họ đưa ra quyết định khôn ngoan hơn khi nói đến chi tiêu và tiết kiệm.",
          correctAnswer: "Some people believe that university students should be equipped with financial management skills to help them make wiser decisions when it comes to spending and saving.",
          hint: "Dùng cấu trúc 'be equipped with...' và 'when it comes to...'"
        }
      ]
    }
  },
  {
    id: "work",
    title: "WORK",
    titleVi: "Công việc & Việc làm",
    pageRange: "Trang 27 - 33",
    description: "Sự hài lòng trong công việc, thị trường lao động cạnh tranh, thăng tiến sự nghiệp và khởi nghiệp.",
    words: [
      {
        num: 1,
        word: "job satisfaction",
        translation: "sự hài lòng trong công việc",
        exampleEn: "Workers’ job satisfaction plays an important role in the development of any company.",
        exampleVi: "Sự hài lòng trong công việc của người lao động đóng một vai trò quan trọng trong sự phát triển của bất kỳ công ty nào."
      }
    ],
    questions: {
      part1: [
        {
          id: 1001,
          type: "translate_phrase",
          vietnamese: "leo lên nấc thang sự nghiệp",
          context: "In the past, women often stayed at home; however, these days, an increasing number of women have the opportunity to ______.",
          correctAnswer: "climb the career ladder",
          hint: "Sử dụng cấu trúc 'climb the...'"
        }
      ],
      part2: [
        {
          id: 1101,
          type: "replace_phrase",
          vietnamese: "PREFER",
          context: "Recruiters tend to PREFER candidates with volunteering experience RATHER THAN those who do not engage in any voluntary work.",
          correctAnswer: "favour",
          hint: "Sử dụng động từ 'favour A over B' (hoặc 'favour')"
        }
      ],
      part3: [
        {
          id: 1201,
          type: "translate_sentence",
          vietnamese: "Có một số yếu tố góp phần vào sự hài lòng trong công việc, như một môi trường làm việc thân thiện, đồng nghiệp hay giúp đỡ và sự bảo đảm trong công việc.",
          correctAnswer: "There are several factors contributing to job satisfaction, such as a friendly working environment, helpful colleagues and job security.",
          hint: "Chú ý dịch 'sự bảo đảm trong công việc' là 'job security'"
        }
      ]
    }
  },
  {
    id: "health",
    title: "HEALTH",
    titleVi: "Sức khỏe",
    pageRange: "Trang 34 - 41",
    description: "Sức khỏe tinh thần, bệnh tim mạch, thói quen ăn uống lành mạnh và chăm sóc y tế cộng đồng.",
    words: [
      {
        num: 1,
        word: "excessive consumption of ...",
        translation: "tiêu thụ quá nhiều thứ gì",
        exampleEn: "One of the leading causes of liver cancer that takes millions of lives annually is excessive consumption of alcohol.",
        exampleVi: "Một trong những nguyên nhân hàng đầu gây ung thư gan cái mà cướp đi hàng triệu mạng sống hàng năm là tiêu thụ quá nhiều rượu."
      }
    ],
    questions: {
      part1: [
        {
          id: 1301,
          type: "translate_phrase",
          vietnamese: "hoạt động thể chất không đủ",
          context: "Poor health is caused by various factors, including unhealthy diets, ______ or genetic disorders.",
          correctAnswer: "insufficient physical activity",
          hint: "Xem mục số 7 trong chủ đề Health"
        }
      ],
      part2: [
        {
          id: 1401,
          type: "replace_phrase",
          vietnamese: "COMSUMING TOO MUCH",
          context: "COMSUMING TOO MUCH unhealthy foods and sugary drinks can lead to various health issues.",
          correctAnswer: "Excessive consumption of",
          hint: "Thay bằng danh từ: 'Excessive consumption of'"
        }
      ],
      part3: [
        {
          id: 1501,
          type: "translate_sentence",
          vietnamese: "Béo phì ở trẻ em đã trở thành một trong những thách thức sức khỏe cộng đồng nghiêm trọng nhất mà thế giới phải đối mặt trong những năm gần đây.",
          correctAnswer: "Childhood obesity has become one of the most serious public health challenges that the world has faced in recent years.",
          hint: "Dùng từ 'Childhood obesity' và 'public health challenges'"
        }
      ]
    }
  },
  {
    id: "technology",
    title: "TECHNOLOGY",
    titleVi: "Công nghệ",
    pageRange: "Trang 50 - 56",
    description: "Trí tuệ nhân tạo, thiết bị di động, bảo mật và sự cô lập xã hội do công nghệ.",
    words: [
      {
        num: 1,
        word: "artificial intelligence",
        translation: "trí tuệ nhân tạo",
        exampleEn: "I agree with those who think that developments in the field of artificial intelligence will have beneficial effects on our lives in the not-so-distant future.",
        exampleVi: "Tôi đồng ý với những người nghĩ rằng sự phát triển trong lĩnh vực trí tuệ nhân tạo sẽ có những tác động có lợi lên cuộc sống của chúng ta trong tương lai không xa."
      }
    ],
    questions: {
      part1: [
        {
          id: 1601,
          type: "translate_phrase",
          vietnamese: "trí tuệ nhân tạo",
          context: "The main reason why some people think ______ might become a threat is that intelligent machines may become so smart.",
          correctAnswer: "artificial intelligence",
          hint: "Viết thường, 2 từ tiếng Anh"
        }
      ],
      part2: [
        {
          id: 1701,
          type: "replace_phrase",
          vietnamese: "STAY IN TOUCH WITH",
          context: "Modern communication tools have made it much easier for people to STAY IN TOUCH WITH their friends or loved ones.",
          correctAnswer: "keep in contact with",
          hint: "Thay bằng cụm từ tương đương bắt đầu bằng 'keep in...'"
        }
      ],
      part3: [
        {
          id: 1801,
          type: "translate_sentence",
          vietnamese: "Nếu được sử dụng một cách khôn ngoan, các công cụ truyền thông hiện đại có thể giúp củng cố các mối quan hệ xã hội của chúng ta.",
          correctAnswer: "If used wisely, modern communication tools can help strengthen our social relationships.",
          hint: "Sử dụng 'If used wisely...' và 'strengthen our social relationships'"
        }
      ]
    }
  }
];
