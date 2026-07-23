export interface IELTSWritingTopic {
  id: string;
  task: 'task1' | 'task2';
  type: string; // e.g. "Line Graph", "Pie Chart", "Opinion Essay", "Discussion Essay", "Advantage & Disadvantage"
  title: string;
  vietnameseTitle: string;
  prompt: string;
  description: string;
  analysisHtml?: string; // HTML-like string containing tips/outlines from the ZIM book
  sampleEssay: string;
  vocabulary: { phrase: string; meaning: string }[];
  suggestedStructure: string[];
}

export const ieltsWritingTopics: IELTSWritingTopic[] = [
  {
    id: "writing-task1-linegraph",
    task: "task1",
    type: "Line Graph (Biểu đồ đường)",
    title: "Fish and Meat Consumption in a European Country",
    vietnameseTitle: "Tiêu thụ cá và thịt tại một quốc gia Châu Âu (1979 - 2004)",
    prompt: "The graph below shows the consumption of fish and some different kinds of meat in a European country between 1979 and 2004.",
    description: "Phân tích xu hướng biến động tiêu thụ thịt gà, thịt bò, thịt cừu và cá trong vòng 25 năm.",
    vocabulary: [
      { phrase: "To peak / reach a peak", meaning: "Đạt đỉnh điểm" },
      { phrase: "To show a small degree of fluctuation", meaning: "Dao động nhẹ" },
      { phrase: "To remain stable / unchanged / constant", meaning: "Giữ mức ổn định, không thay đổi" },
      { phrase: "To decline slightly", meaning: "Giảm nhẹ" },
      { phrase: "To increase sharply / rocket / surge", meaning: "Tăng vọt mạnh mẽ" },
      { phrase: "To diminish up to the year of...", meaning: "Giảm dần cho đến năm..." }
    ],
    suggestedStructure: [
      "Introduction: Paraphrase the rubric (The line graph illustrates the amount of fish and three other kinds of meat namely lamb, beef and chicken...)",
      "Overview: Summarize the main trends (Fish showed a small degree of fluctuation; meanwhile, figures for lamb, beef, and chicken changed dramatically.)",
      "Detail Paragraph 1: Describe the fish consumption (started at ~50g, slightly declined, stable for 15 years)",
      "Detail Paragraph 2: Compare chicken, beef, and lamb (beef/lamb starting high but declining; chicken starting lower but soaring to peak in 2003)"
    ],
    sampleEssay: `The line graph above illustrates the amount of fish and three other kinds of meat namely lamb, beef and chicken that people of a European country consumed during the period of 1979 and 2004.

Overall, the consumption of fish showed small degree of fluctuation; meanwhile, the figure for Lamb, Beef and Chicken changed dramatically from the year of 1979 to 2004.

Starting with more than 50 grams for each individual per week in 1979, the amount of Fish slightly declined for the next five years until 1984, followed by fifteen years of stability. In 1999, this amount decreased a little and then nearly remained unchanged until 2004.

However, Lamb and Beef consumption with very high starting points of 150 grams and more than 200 grams per person per week respectively experienced many years of up and down and had the main tendency to diminish up to the year of 2004. Unlike these two kinds of food, the consumption of Chicken with a rather lower start than Lamb tended to soar and reached its peak of more than 250 grams for each person a week in 2003 and stopped in 2004 with a small decline.`,
    analysisHtml: `<div class="space-y-4 text-xs sm:text-sm">
      <div class="bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100">
        <h5 class="font-extrabold text-indigo-900 uppercase text-[11px] tracking-wider mb-1">💡 Lời khuyên quan trọng từ sách ZIM:</h5>
        <ul class="list-disc pl-4 space-y-1 text-indigo-950/80">
          <li><strong>Không dùng từ viết tắt</strong> (No contractions như can't, don't).</li>
          <li><strong>Tuyệt đối không dùng "I" hoặc "you"</strong> (No personal opinions).</li>
          <li><strong>Bắt buộc phải có đoạn Overview</strong> (Tóm tắt xu hướng chính, không đưa số liệu cụ thể vào đây).</li>
          <li>Sử dụng thì Quá khứ đơn (vì khoảng thời gian từ 1979 đến 2004 đã chấm dứt hoàn toàn).</li>
        </ul>
      </div>
    </div>`
  },
  {
    id: "writing-task1-piechart",
    task: "task1",
    type: "Pie Chart (Biểu đồ tròn)",
    title: "Energy Production of France in 1995 and 2005",
    vietnameseTitle: "Cơ cấu sản xuất năng lượng của Pháp (1995 & 2005)",
    prompt: "The charts below show the comparison of some kinds of energy production of France in 2 years (1995 and 2005).",
    description: "So sánh tỉ trọng của 5 nguồn năng lượng chính tại Pháp: Than (Coal), Khí gas (Gas), Dầu mỏ (Petrol), Hạt nhân (Nuclear) và Khác (Other).",
    vocabulary: [
      { phrase: "To occupy approximately...", meaning: "Chiếm khoảng..." },
      { phrase: "Make up the biggest proportion", meaning: "Chiếm tỉ lệ lớn nhất" },
      { phrase: "A slight rise to just under...", meaning: "Tăng nhẹ lên mức ngay dưới..." },
      { phrase: "To generate energy", meaning: "Sản xuất / tạo ra năng lượng" },
      { phrase: "To decrease in comparison with...", meaning: "Giảm so với..." }
    ],
    suggestedStructure: [
      "Introduction: Paraphrase the rubric (The pie charts compare five different types of energy sources, namely coal, gas, petrol, nuclear and other...)",
      "Overview: Gas and coal made up the same and also the biggest proportion in both years; petrol decreased, while nuclear and other sources increased.",
      "Detail Paragraph 1: Discuss gas and coal (both occupied ~29% in 1995, slightly rose to just under 31% in 2005).",
      "Detail Paragraph 2: Discuss petrol, nuclear and others (petrol declined from 29% to 19.5%; nuclear and others increased to 10% and 9% respectively)."
    ],
    sampleEssay: `The pie charts compare 5 different types of energy sources, namely coal, gas, petrol, nuclear and other, of France in 1995 and 2005. It is clear that gas and coal made up the same and also the biggest proportion of energy production in both examined years; and remarkably, the amount of energy produced from petro decreased in 2005 in comparison with the increase in the use of nuclear and other sources.

In 1995, both gas and coal occupied approximately 29% of the French total energy production. After 10 years, there was a slight rise in those figures to just under 31%.

Roughly 29% of the entire amount of energy in France came from petro in 1995. However, up to the year of 2005, that figure considerably declined be about 10%. Meanwhile, the use of nuclear and other materials to generate energy became more popular, from 6.4 % and nearly 5% in 1995 to around 10% and 9% in 2005 respectively.`,
    analysisHtml: `<div class="space-y-4 text-xs sm:text-sm">
      <div class="bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100">
        <h5 class="font-extrabold text-indigo-900 uppercase text-[11px] tracking-wider mb-1">💡 Phân tích từ Thầy Toàn ZIM:</h5>
        <ul class="list-disc pl-4 space-y-1 text-indigo-950/80">
          <li><strong>Cấu trúc so sánh:</strong> Sử dụng các liên từ "Meanwhile", "However", "In comparison with" để tạo tính gắn kết mạch lạc cao (Coherence & Cohesion).</li>
          <li><strong>Mẹo làm bài:</strong> Gom nhóm các phần có xu hướng tăng vào một nhóm (Hạt nhân, nguồn Khác) và nhóm có xu hướng giảm/giữ nguyên vào một nhóm để phân tích.</li>
        </ul>
      </div>
    </div>`
  },
  {
    id: "writing-task2-opinion-history",
    task: "task2",
    type: "Opinion Essay (Nêu quan điểm)",
    title: "Local History vs. World History",
    vietnameseTitle: "Tầm quan trọng của Lịch sử Địa phương và Lịch sử Thế giới",
    prompt: "It is more important for schoolchildren to learn about local history than world history. To what extent do you agree or disagree?",
    description: "Nêu ý kiến của bạn về tầm quan trọng của lịch sử địa phương so với lịch sử thế giới đối với học sinh.",
    vocabulary: [
      { phrase: "Thorough insights into", meaning: "Hiểu biết cặn kẽ về cái gì" },
      { phrase: "Develops patriotism", meaning: "Nuôi dưỡng lòng yêu nước" },
      { phrase: "Take pride in their origin", meaning: "Tự hào về nguồn cội" },
      { phrase: "Traditional values and identity", meaning: "Bản sắc và giá trị truyền thống" },
      { phrase: "Well-rounded perspective of life", meaning: "Cái nhìn toàn diện về cuộc sống" },
      { phrase: "Historical background", meaning: "Bối cảnh lịch sử" }
    ],
    suggestedStructure: [
      "Introduction: Paraphrase the topic and state your clear opinion (e.g. completely disagree / both are equally important).",
      "Body Paragraph 1 (Local History): Indispensable part, develops patriotism, teaches ancestor's sacrifices, encourages taking pride in origins and identity.",
      "Body Paragraph 2 (World History): Expands children's horizons, provides a well-rounded perspective (e.g. learning about World War or movements), assists future global careers.",
      "Conclusion: Restate your balanced position that both are distinctively equal in value."
    ],
    sampleEssay: `Many people have valued the role of local history to schoolchildren over that of world history. In my opinion, I disagree with those people as both of them are equally essential for young learners.

Studying the history of their hometown is for sure an indispensable part of school’s curriculum during students’ early education. I believe having thorough insights into what happened in the past at one’s locality develops his patriotism. For example, children of primary and secondary schools in my village are taught about how their ancestors defended their land against outside intruders and reclaimed sovereignty. Therefore, those young children would take pride in their origin and treasure the life they know as it is today. Additionally, I think it is not only students’ privilege but also their responsibility to know about their own history to understand their hometown’s traditional values and identity.

From another angle, learning about world history shares equal importance just as local one. Acquiring knowledge about the world’s past events equips students with a more well-rounded perspective of life. Lessons about the World War or Feminism protest against women’s abuse and discrimination would help those learners enhance their understanding about various aspects of the world. Furthermore, I think that being taught about the other countries’ historical backgrounds would benefit young learners in their future career. Students who accumulate knowledge of this particular field at an early age would possess a golden selling point to work for foreign enterprises, especially those who highly value company culture like Japan.

In conclusion, I believe the significance of domestic and international history cannot be brought into comparison to see which one is more necessary because they have distinctively equal meanings to children.`,
    analysisHtml: `<div class="space-y-4 text-xs sm:text-sm">
      <div class="bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100">
        <h5 class="font-extrabold text-indigo-900 uppercase text-[11px] tracking-wider mb-1">📝 Mẹo rèn luyện kỹ năng viết (Sharpening Writing Skills):</h5>
        <p class="text-indigo-950/80 leading-relaxed mb-2">Để viết một bài viết tốt, bé cần áp dụng quy tắc <strong>P.E.E (Point - Explanation - Example)</strong>:</p>
        <ul class="list-disc pl-4 space-y-1 text-indigo-950/80">
          <li><strong>Point:</strong> Đưa ra luận điểm rõ ràng ở câu đầu tiên của đoạn.</li>
          <li><strong>Explanation:</strong> Phát triển, đào sâu giải thích lý do tại sao luận điểm đó lại đúng.</li>
          <li><strong>Example:</strong> Đưa ra ví dụ thực tế, cụ thể để tăng tính thuyết phục của lập luận.</li>
        </ul>
      </div>
    </div>`
  },
  {
    id: "writing-task2-discussion-tv",
    task: "task2",
    type: "Discussion Essay (Bàn luận hai chiều)",
    title: "Abundance of TV Channels: Good or Bad?",
    vietnameseTitle: "Sự bùng nổ các kênh truyền hình: Lợi hay Hại?",
    prompt: "These days there are a lot of TV channels available to view. Some people think it is good to have a range of options but others argue that it affects the quality of programs. Discuss both sides and give your opinion.",
    description: "Bàn luận hai khía cạnh: Lợi ích của việc có nhiều sự lựa chọn kênh truyền hình, và tác hại đối với chất lượng nội dung chương trình. Đưa ra quan điểm cá nhân.",
    vocabulary: [
      { phrase: "Deteriorating quality in terms of...", meaning: "Chất lượng ngày càng suy giảm về mặt..." },
      { phrase: "Satisfy viewers of different preferences", meaning: "Thỏa mãn người xem với các sở thích khác nhau" },
      { phrase: "To have a more integral approach", meaning: "Có cách tiếp cận toàn diện hơn" },
      { phrase: "To be bombarded with information", meaning: "Bị dồn dập, quá tải bởi thông tin" },
      { phrase: "Engender bewilderment amongst viewers", meaning: "Gây ra sự hoang mang, bối rối cho người xem" }
    ],
    suggestedStructure: [
      "Introduction: Paraphrase the trend and state your own view (e.g. more channels lead to lower quality display/content).",
      "Body 1 (Advantages): Focus on variety of choices, serving specialized interests (sports, science, education), and enabling an integrated approach to global news.",
      "Body 2 (Disadvantages): Focus on media bombardment, low-quality productions made purely for profit, fraudulent content, and the difficulty in distinguishing trustworthy channels.",
      "Conclusion: Summarize that despite benefits, the deterioration of television content is a critical shortcoming."
    ],
    sampleEssay: `The nonstop progress of the modern TV industry has provided people with permanent access to numerous choices of channels, depending on viewers’ interests. This broad availability instigates many public debates over how the number of TV programs and their quality interrelate. From my perspective, it is true that more and more channels have been launched recently with deteriorating quality in terms of both display and content.

On the one hand, the reasons why people enjoy more choices on TV are varied. Firstly, people believe the upsurge in the number of programs can satisfy viewers of different preferences. Compared to the limitation of TV content in the past, contemporary technology has unfolded the possibility to bring every aspect of life such as sports, science and education to people. Secondly, people now can have a more integral approach upon not only their society but also other countries around the world through TV telecasts. In fact, both domestic and foreign issues are updated daily on various sources, which equips viewers with more intimate perception on global matters.

On the other hand, I believe as the number of TV channels grows, their quality suffers in comparison. In fact, people are being bombarded with all kinds of sources of information. Unfortunately, many publishers are trying to increase their viewership which generates greater profit by deliberately producing programs with low-quality interface or even fraudulent content. This, coupled with the acceleration in numbers, can engender bewilderment amongst viewers since they will have a difficult time differentiating which channels they can trust from the deceiving ones.

In conclusion, although it is undeniable that the wider range of selections has some certain benefits to people, I think the followed shortcomings associated with their quality are the worrying topic that people should pay heed to.`,
    analysisHtml: `<div class="space-y-4 text-xs sm:text-sm">
      <div class="bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100">
        <h5 class="font-extrabold text-indigo-900 uppercase text-[11px] tracking-wider mb-1">⭐ Phân biệt cực kỳ quan trọng giữa Opinion và Discussion:</h5>
        <ul class="list-disc pl-4 space-y-1.5 text-indigo-950/80">
          <li><strong>Balanced Opinion Essay:</strong> Viết về những gì <strong>bạn nghĩ</strong> ("I agree", "I think" được dùng tự do).</li>
          <li><strong>Discussion Essay:</strong> Bàn luận về những gì <strong>người khác nghĩ</strong> ("Some people argue that", "Advocates point out..."). Chỉ nêu ý kiến cá nhân ("My view", "In my opinion") tại 3 vị trí: Mở bài, Câu chủ đề đoạn 2, và Kết bài.</li>
        </ul>
      </div>
    </div>`
  },
  {
    id: "writing-task2-gapyear",
    task: "task2",
    type: "Advantage/Disadvantage (Lợi ích & Tác hại)",
    title: "Taking a Gap Year Before University",
    vietnameseTitle: "Nghỉ học một năm (Gap Year) trước khi vào Đại học",
    prompt: "It is becoming increasingly popular to have a year off between finishing school and going to university. What are the advantages and disadvantages of this?",
    description: "Bàn luận về những mặt lợi (tích lũy trải nghiệm, định hướng nghề nghiệp) và mặt hại (mất thói quen học tập, chậm trễ tốt nghiệp) của một năm Gap Year.",
    vocabulary: [
      { phrase: "To gain enormous popularity amongst...", meaning: "Rất phổ biến và được ưa chuộng bởi..." },
      { phrase: "To utilize this period of time", meaning: "Tận dụng khoảng thời gian này" },
      { phrase: "Inadequate provision of career orientation", meaning: "Sự thiếu hụt trong định hướng nghề nghiệp" },
      { phrase: "Settle stable incomes", meaning: "Có nguồn thu nhập ổn định sớm" },
      { phrase: "Lose studying habits as well as discipline", meaning: "Mất đi thói quen học tập cũng như kỷ luật" },
      { phrase: "Demotivate them from following tertiary education", meaning: "Làm họ nản lòng với việc học đại học" }
    ],
    suggestedStructure: [
      "Introduction: State that taking a gap year has gained popularity, and specify that the essay will analyze both its benefits and drawbacks.",
      "Body Paragraph 1 (Advantages): Opportunity to travel to acquire knowledge on languages/cultures; take temporary jobs to figure out future career paths.",
      "Body Paragraph 2 (Disadvantages): Graduation delay means getting a permanent job later; danger of losing academic discipline and studying habits, which can demotivate students.",
      "Conclusion: Conclude that while it offers travel and work experiences, a gap year can jeopardize early careers and study discipline."
    ],
    sampleEssay: `Taking a gap year before attending college has recently gained enormous popularity amongst high school graduates. My essay below will analyze both the benefits and the drawbacks of the phenomenon.

Having a year off after high school graduation is advantageous in some certain aspects. First, students can utilize this period of time to travel to acquire knowledge of various fields such as foreign languages and cultures. This would be more difficult during their years at university owing to their intense studying schedules. Second, many high school graduates benefit from taking a temporary job before starting their college life. Due to the inadequate provision of career orientation in high school, sparing another 12 months looking for a job or signing up for a vocational course is considered a remedy for students to figure out their future path.

From an opposite angle, the disadvantages of a gap year before college are varied. Initially, compared to the students having a year off, those who go straight to university after high school are more likely to have a permanent job early. They finish their academic studies one year in advance, hence better opportunities to get a job with stable incomes. More importantly, high school seniors might lose their studying habits as well as discipline. In other words, one year spent on travelling or working can demotivate them from following tertiary education.

In conclusion, despite some benefits in terms of traveling and working, taking a year off before college life might both jeopardize students’ occupational opportunities and result in studying discouragement.`,
    analysisHtml: `<div class="space-y-4 text-xs sm:text-sm">
      <div class="bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100">
        <h5 class="font-extrabold text-indigo-900 uppercase text-[11px] tracking-wider mb-1">⚠️ Lưu ý làm bài:</h5>
        <p class="text-indigo-950/80 leading-relaxed font-medium">Đối với dạng bài Lợi ích & Tác hại <strong>KHÔNG HỎI QUAN ĐIỂM (Without Personal Opinion)</strong>, bé tuyệt đối không đưa các cụm từ thể hiện quan điểm cá nhân vào bài làm nhé! Chỉ tập trung cân đối 2 vế khách quan.</p>
      </div>
    </div>`
  }
];
