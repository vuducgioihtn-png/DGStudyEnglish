import { IeltsWord } from '../types';
import { VOCAB_EDUCATION } from './vocab_education';
import { VOCAB_SCIENCE } from './vocab_science';
import { VOCAB_ENVIRONMENT } from './vocab_environment';
import { VOCAB_HEALTH } from './vocab_health';
import { VOCAB_ECONOMY } from './vocab_economy';
import { VOCAB_SOCIETY } from './vocab_society';

export const ieltsTopicList = [
  'All Topics',
  'Education & Learning',
  'Science & Technology',
  'Environment & Wildlife',
  'Health & Medicine',
  'Economy & Business',
  'Society & Culture'
];

export const ieltsBandList = [
  'All Bands',
  'Band 5.0 - 6.0',
  'Band 6.5 - 7.0',
  'Band 7.5+'
];

// Let's add the premium original manually-written 24 words to maintain full quality
export const MANUAL_PREMIUM_VOCAB: IeltsWord[] = [
  {
    word: 'Curriculum',
    pos: 'Noun',
    phonetic: '/kəˈrɪkjələm/',
    definition: 'Chương trình giảng dạy, chương trình học',
    bandLevel: 'Band 5.0 - 6.0',
    topic: 'Education & Learning',
    example: 'The school curriculum covers a wide range of subjects, including coding and life skills.',
    exampleTranslation: 'Chương trình giảng dạy của nhà trường bao gồm nhiều môn học, bao gồm cả lập trình và kỹ năng sống.',
    collocations: ['school curriculum', 'core curriculum', 'design a curriculum'],
    synonyms: ['syllabus', 'program of study', 'coursework']
  },
  {
    word: 'Pedagogy',
    pos: 'Noun',
    phonetic: '/ˈpedəɡɒdʒi/',
    definition: 'Khoa học giáo dục, phương pháp sư phạm',
    bandLevel: 'Band 7.5+',
    topic: 'Education & Learning',
    example: 'Modern pedagogy emphasizes student-centered learning and interactive classrooms.',
    exampleTranslation: 'Phương pháp sư phạm hiện đại nhấn mạng việc học tập lấy học sinh làm trung tâm và lớp học tương tác.',
    collocations: ['modern pedagogy', 'pedagogical approach', 'innovative pedagogy'],
    synonyms: ['teaching methods', 'instructional science', 'education studies']
  },
  {
    word: 'Cognitive',
    pos: 'Adjective',
    phonetic: '/ˈkɒɡnətɪv/',
    definition: 'Liên quan đến nhận thức, tư duy',
    bandLevel: 'Band 6.5 - 7.0',
    topic: 'Education & Learning',
    example: 'Puzzles and quizzes help develop a child’s cognitive abilities.',
    exampleTranslation: 'Các trò chơi xếp hình và câu đố giúp phát triển khả năng nhận thức của trẻ.',
    collocations: ['cognitive skills', 'cognitive development', 'cognitive therapy'],
    synonyms: ['mental', 'intellectual', 'cerebral']
  },
  {
    word: 'Rote learning',
    pos: 'Noun',
    phonetic: '/rəʊt ˈlɜːnɪŋ/',
    definition: 'Học vẹt, học thuộc lòng một cách máy móc',
    bandLevel: 'Band 6.5 - 7.0',
    topic: 'Education & Learning',
    example: 'Rote learning is discouraged in favor of critical thinking and creative inquiry.',
    exampleTranslation: 'Học vẹt không được khuyến khích để dành chỗ cho tư duy phản biện và tìm tòi sáng tạo.',
    collocations: ['rely on rote learning', 'rote learning method', 'traditional rote learning'],
    synonyms: ['memorization', 'learning by heart', 'mechanical learning']
  },
  {
    word: 'Innovation',
    pos: 'Noun',
    phonetic: '/ˌɪnəˈveɪʃn/',
    definition: 'Sự đổi mới, sáng kiến, cách tân',
    bandLevel: 'Band 5.0 - 6.0',
    topic: 'Science & Technology',
    example: 'Technological innovation drives efficiency in the agriculture sector.',
    exampleTranslation: 'Sự đổi mới công nghệ thúc đẩy tính hiệu quả trong ngành nông nghiệp.',
    collocations: ['technological innovation', 'foster innovation', 'product innovation'],
    synonyms: ['novelty', 'breakthrough', 'revolution']
  },
  {
    word: 'Automate',
    pos: 'Verb',
    phonetic: '/ˈɔːtəmeɪt/',
    definition: 'Tự động hóa, đưa máy móc vào hoạt động',
    bandLevel: 'Band 6.5 - 7.0',
    topic: 'Science & Technology',
    example: 'The factory decided to automate assembly lines to minimize human errors.',
    exampleTranslation: 'Nhà máy quyết định tự động hóa dây chuyền lắp ráp để giảm thiểu sai sót của con người.',
    collocations: ['fully automate', 'automate processes', 'automate systems'],
    synonyms: ['mechanize', 'computerize', 'run automatically']
  },
  {
    word: 'Ubiquitous',
    pos: 'Adjective',
    phonetic: '/juːˈbɪkwɪtəs/',
    definition: 'Phổ biến, ở đâu cũng có, có mặt khắp nơi',
    bandLevel: 'Band 7.5+',
    topic: 'Science & Technology',
    example: 'Smartphones have become ubiquitous in modern society.',
    exampleTranslation: 'Điện thoại thông minh đã trở nên cực kỳ phổ biến trong xã hội hiện đại.',
    collocations: ['ubiquitous presence', 'ubiquitous technology', 'become ubiquitous'],
    synonyms: ['omnipresent', 'pervasive', 'widespread']
  },
  {
    word: 'Data-driven',
    pos: 'Adjective',
    phonetic: '/ˈdeɪtə ˈdrɪvn/',
    definition: 'Dựa trên dữ liệu, thu thập thực tế chứng thực',
    bandLevel: 'Band 6.5 - 7.0',
    topic: 'Science & Technology',
    example: 'Data-driven decisions help companies optimize marketing costs.',
    exampleTranslation: 'Các quyết định dựa trên dữ liệu giúp doanh nghiệp tối ưu hóa chi phí quảng cáo truyền thông.',
    collocations: ['data-driven decision', 'data-driven analysis', 'data-driven marketing'],
    synonyms: ['empirical', 'analytical', 'fact-based']
  },
  {
    word: 'Biodiversity',
    pos: 'Noun',
    phonetic: '/ˌbaɪəʊdaɪˈvɜːsəti/',
    definition: 'Đa dạng sinh học',
    bandLevel: 'Band 5.0 - 6.0',
    topic: 'Environment & Wildlife',
    example: 'Conserving biodiversity is crucial for maintaining global ecological balance.',
    exampleTranslation: 'Bảo tồn đa dạng sinh học là cực kỳ quan trọng để duy trì sự cân bằng sinh thái toàn cầu.',
    collocations: ['preserve biodiversity', 'loss of biodiversity', 'rich biodiversity'],
    synonyms: ['ecological diversity', 'variety of life', 'biological wealth']
  },
  {
    word: 'Ecosystem',
    pos: 'Noun',
    phonetic: '/ˈiːkəʊsɪstəm/',
    definition: 'Hệ sinh thái',
    bandLevel: 'Band 5.0 - 6.0',
    topic: 'Environment & Wildlife',
    example: 'Each species plays a unique role in sustaining the local forest ecosystem.',
    exampleTranslation: 'Mỗi loài đóng một vai trò độc đáo trong việc duy trì thăng bằng hệ sinh thái rừng địa phương.',
    collocations: ['fragile ecosystem', 'coastal ecosystem', 'balance of ecosystem'],
    synonyms: ['ecological community', 'nature network', 'biological environment']
  },
  {
    word: 'Sustainable',
    pos: 'Adjective',
    phonetic: '/səˈsteɪnəbl/',
    definition: 'Phát triển bền vững',
    bandLevel: 'Band 6.5 - 7.0',
    topic: 'Environment & Wildlife',
    example: 'Sustainable agriculture prevents long-term soil erosion and chemical runoff.',
    exampleTranslation: 'Nông nghiệp bền vững giúp ngăn ngừa sự xói mòn đất và rửa trôi hóa chất trong dài hạn.',
    collocations: ['sustainable development', 'sustainable materials', 'sustainable forestry'],
    synonyms: ['renewable', 'viable', 'eco-friendly', 'green']
  },
  {
    word: 'Depletion',
    pos: 'Noun',
    phonetic: '/dɪˈpliːʃn/',
    definition: 'Sự cạn kiệt nguồn tài nguyên',
    bandLevel: 'Band 7.5+',
    topic: 'Environment & Wildlife',
    example: 'The rapid depletion of clean freshwater reservoirs is raising worldwide concern.',
    exampleTranslation: 'Sự cạn kiệt nhanh chóng của các hồ chứa nước ngọt sạch đang làm dấy lên sự lo ngại trên toàn thế giới.',
    collocations: ['resource depletion', 'depletion of ozone layer', 'rapid depletion'],
    synonyms: ['exhaustion', 'reduction', 'draining', 'diminution']
  },
  {
    word: 'Immunity',
    pos: 'Noun',
    phonetic: '/ɪˈmjuːnəti/',
    definition: 'Khả năng miễn dịch, sức đề kháng chống dịch',
    bandLevel: 'Band 5.0 - 6.0',
    topic: 'Health & Medicine',
    example: 'A balanced diet rich in vitamins boosts natural immunity against common colds.',
    exampleTranslation: 'Một chế độ ăn uống cân bằng giàu vitamin giúp tăng cường khả năng miễn dịch tự nhiên chống lại bệnh cảm lạnh thông thường.',
    collocations: ['herd immunity', 'boost immunity', 'natural immunity'],
    synonyms: ['resistance', 'protection', 'defense']
  },
  {
    word: 'Sedentary',
    pos: 'Adjective',
    phonetic: '/ˈsedntri/',
    definition: 'Thụ động, ít vận động, dành nhiều thời gian ngồi',
    bandLevel: 'Band 6.5 - 7.0',
    topic: 'Health & Medicine',
    example: 'A sedentary lifestyle increases the risk of chronic conditions such as obesity.',
    exampleTranslation: 'Lối sống thụ động tăng nguy cơ mắc các tình trạng mãn tính như béo phì.',
    collocations: ['sedentary lifestyle', 'sedentary job', 'remain sedentary'],
    synonyms: ['inactive', 'sitting', 'desk-bound', 'motionless']
  },
  {
    word: 'Well-being',
    pos: 'Noun',
    phonetic: '/ˈwel biːɪŋ/',
    definition: 'Trạng thái hạnh phúc, sức khỏe và sự thịnh vượng toàn diện',
    bandLevel: 'Band 5.0 - 6.0',
    topic: 'Health & Medicine',
    example: 'Physical outdoor activity significantly improves a student’s emotional well-being.',
    exampleTranslation: 'Hoạt động thể chất ngoài trời cải thiện đáng kể sức khỏe cảm xúc của học sinh.',
    collocations: ['emotional well-being', 'promote well-being', 'general well-being'],
    synonyms: ['healthiness', 'welfare', 'happiness', 'comfort']
  },
  {
    word: 'Therapeutic',
    pos: 'Adjective',
    phonetic: '/ˌθerəˈpjuːtɪk/',
    definition: 'Có tính trị liệu, mang lại lợi ích phục hồi sức khỏe',
    bandLevel: 'Band 7.5+',
    topic: 'Health & Medicine',
    example: 'Listening to classical orchestra notes has a proven therapeutic effect on stressed learners.',
    exampleTranslation: 'Nghe các nốt nhạc hòa tấu cổ điển có tác dụng trị liệu đã được kiểm chứng đối với người học bị căng thẳng.',
    collocations: ['therapeutic effect', 'therapeutic massage', 'strictly therapeutic'],
    synonyms: ['healing', 'restorative', 'curative', 'beneficial']
  },
  {
    word: 'Fiscal',
    pos: 'Adjective',
    phonetic: '/ˈfɪskl/',
    definition: 'Thuộc về tài chính công, ngân sách quốc gia',
    bandLevel: 'Band 7.5+',
    topic: 'Economy & Business',
    example: 'The government formulated new fiscal policies to curb rising inflation rates.',
    exampleTranslation: 'Chính phủ đã ban hành các chính sách tài khóa mới để kiềm chế tỷ lệ lạm phát đang tăng.',
    collocations: ['fiscal policy', 'fiscal year', 'fiscal deficit'],
    synonyms: ['financial', 'monetary', 'budgetary']
  },
  {
    word: 'Revenue',
    pos: 'Noun',
    phonetic: '/ˈrevənjuː/',
    definition: 'Doanh thu, thu nhập kiếm được (của DN hoặc quốc gia)',
    bandLevel: 'Band 5.0 - 6.0',
    topic: 'Economy & Business',
    example: 'The tech giant generated massive advertising revenue in the second quarter.',
    exampleTranslation: 'Tập đoàn công nghệ khổng lồ tạo ra doanh thu quảng cáo khổng lồ trong quý hai.',
    collocations: ['generate revenue', 'annual revenue', 'tax revenue'],
    synonyms: ['income', 'earnings', 'turnover', 'yields']
  },
  {
    word: 'Assimilation',
    pos: 'Noun',
    phonetic: '/əˌsɪmɪˈleɪʃn/',
    definition: 'Sự đồng hóa, hòa nhập văn hóa tuyệt đối',
    bandLevel: 'Band 7.5+',
    topic: 'Society & Culture',
    example: 'Cultural assimilation can be difficult for older immigrants who wish to preserve their native heritage.',
    exampleTranslation: 'Sự đồng hóa văn hóa có thể gặp khó khăn đối với những người nhập cư lớn tuổi muốn gìn giữ di sản gốc rễ của mình.',
    collocations: ['cultural assimilation', 'forced assimilation', 'assimilation process'],
    synonyms: ['integration', 'acculturation', 'blending in']
  },
  {
    word: 'Indigenous',
    pos: 'Adjective',
    phonetic: '/ɪnˈdɪdʒənəs/',
    definition: 'Bản địa, thuộc về gốc rễ của một vùng đất',
    bandLevel: 'Band 6.5 - 7.0',
    topic: 'Society & Culture',
    example: 'The museum holds a beautiful collection of indigenous arts and crafts.',
    exampleTranslation: 'Bảo tàng lưu giữ một bộ sưu tập tuyệt vời về nghệ thuật và hàng thủ công mỹ nghệ bản địa.',
    collocations: ['indigenous people', 'indigenous language', 'indigenous culture'],
    synonyms: ['native', 'aboriginal', 'local']
  },
  {
    word: 'Multicultural',
    pos: 'Adjective',
    phonetic: '/ˌmʌltiˈkʌltʃərəl/',
    definition: 'Đa văn hóa',
    bandLevel: 'Band 5.0 - 6.0',
    topic: 'Society & Culture',
    example: 'Living in a multicultural city helps students cultivate tolerance and understand diverse lifestyles.',
    exampleTranslation: 'Sống trong một thành phố đa văn hóa giúp học sinh nuôi dưỡng lòng bao dung và thấu hiểu các lối sống đa dạng.',
    collocations: ['multicultural society', 'multicultural education', 'multicultural perspective'],
    synonyms: ['diverse', 'pluralistic', 'cosmopolitan']
  },
  {
    word: 'Demise',
    pos: 'Noun',
    phonetic: '/dɪˈmaɪz/',
    definition: 'Sự sụp đổ, biến mất, kết thúc hoạt động/giai đoạn',
    bandLevel: 'Band 7.5+',
    topic: 'Society & Culture',
    example: 'The rapid rise of social media marked the demise of traditional print newspapers.',
    exampleTranslation: 'Sự phát triển nhanh chóng của các phương tiện truyền thông mạng xã hội đã đánh dấu sự thoái trào của báo chí in truyền thống.',
    collocations: ['lead to the demise', 'imminent demise', 'demise of an empire'],
    synonyms: ['end', 'downfall', 'collapse', 'extinction']
  }
];

// Deduplicate and combine all sections dynamically
export const STATIC_IELTS_VOCABULARY: IeltsWord[] = [
  ...MANUAL_PREMIUM_VOCAB,
  ...VOCAB_EDUCATION.filter(x => !MANUAL_PREMIUM_VOCAB.some(m => m.word.toLowerCase() === x.word.toLowerCase())),
  ...VOCAB_SCIENCE.filter(x => !MANUAL_PREMIUM_VOCAB.some(m => m.word.toLowerCase() === x.word.toLowerCase())),
  ...VOCAB_ENVIRONMENT.filter(x => !MANUAL_PREMIUM_VOCAB.some(m => m.word.toLowerCase() === x.word.toLowerCase())),
  ...VOCAB_HEALTH.filter(x => !MANUAL_PREMIUM_VOCAB.some(m => m.word.toLowerCase() === x.word.toLowerCase())),
  ...VOCAB_ECONOMY.filter(x => !MANUAL_PREMIUM_VOCAB.some(m => m.word.toLowerCase() === x.word.toLowerCase())),
  ...VOCAB_SOCIETY.filter(x => !MANUAL_PREMIUM_VOCAB.some(m => m.word.toLowerCase() === x.word.toLowerCase()))
];
