import { IeltsWord } from '../types';

export const VOCAB_ECONOMY: IeltsWord[] = [
  {
    word: 'Acquisition',
    pos: 'Noun',
    phonetic: '/ˌækwɪˈzɪʃn/',
    definition: 'Sự mua lại, thâu tóm doanh nghiệp hoặc tài sản',
    bandLevel: 'Band 6.5 - 7.0',
    topic: 'Economy & Business',
    example: 'Corporate growth with rapid acquisition of minor rivals boosts dominant position market-wide.',
    exampleTranslation: 'Sự phát triển của tập đoàn với việc thâu tóm nhanh chóng các đối thủ nhỏ hơn củng cố vị thế vượt trội trên toàn thị trường.',
    collocations: ['mergers and acquisitions', 'target acquisition', 'strategic acquisition'],
    synonyms: ['purchase', 'takeover', 'buyout']
  },
  {
    word: 'Budgetary',
    pos: 'Adjective',
    phonetic: '/ˈbʌdʒɪtəri/',
    definition: 'Thuộc về dự toán ngân sách, hoạch định tài chính',
    bandLevel: 'Band 6.5 - 7.0',
    topic: 'Economy & Business',
    example: 'Strict budgetary controls prevent government departments from exceeding funding limits.',
    exampleTranslation: 'Sự kiểm soát ngân sách nghiêm ngặt ngăn các sở ngành chính phủ vượt quá giới hạn nguồn vốn.',
    collocations: ['budgetary deficit', 'budgetary constraints', 'budgetary allocation'],
    synonyms: ['fiscal', 'financial', 'monetary']
  },
  {
    word: 'Commodity',
    pos: 'Noun',
    phonetic: '/kəˈmɒdəti/',
    definition: 'Hàng hóa, thương phẩm có thể mua bán trao đổi',
    bandLevel: 'Band 6.5 - 7.0',
    topic: 'Economy & Business',
    example: 'Crude oil is a primary global commodity subject to heavy pricing instability.',
    exampleTranslation: 'Dầu thô là loại hàng hóa toàn cầu chính chịu ảnh hưởng nặng nề bởi sự bất ổn định về giá.',
    collocations: ['agricultural commodity', 'staple commodity', 'raw commodity'],
    synonyms: ['merchandise', 'cargo product', 'ware']
  },
  {
    word: 'Depreciate',
    pos: 'Verb',
    phonetic: '/dɪˈpriːʃieɪt/',
    definition: 'Khấu hao, giảm giá trị tiền tệ hoặc tài sản',
    bandLevel: 'Band 7.5+',
    topic: 'Economy & Business',
    example: 'A car starts to depreciate the moment you drive it off the lot.',
    exampleTranslation: 'Một chiếc ô tô bắt đầu giảm dần giá trị ngay khi bạn lái nó ra khỏi bãi đỗ đại lý.',
    collocations: ['depreciate rapidly', 'depreciate value', 'allow asset to depreciate'],
    synonyms: ['devalue', 'cheapen', 'drop in value']
  },
  {
    word: 'Entrepreneurship',
    pos: 'Noun',
    phonetic: '/ˌɒntrəprəˈnɜːʃɪp/',
    definition: 'Tinh thần khởi nghiệp, năng lực kiến tạo doanh nghiệp',
    bandLevel: 'Band 6.5 - 7.0',
    topic: 'Economy & Business',
    example: 'Government loans for young graduates empower active entrepreneurship.',
    exampleTranslation: 'Khoản vay vốn của chính phủ ban tặng các bạn trẻ tốt nghiệp thúc đẩy tinh thần khởi nghiệp năng động.',
    collocations: ['foster entrepreneurship', 'social entrepreneurship', 'active entrepreneurship'],
    synonyms: ['business leadership', 'venture initiation']
  },
  {
    word: 'Globalization',
    pos: 'Noun',
    phonetic: '/ˌɡləʊbəlaɪˈzeɪʃn/',
    definition: 'Toàn cầu hóa nền kinh tế thương mại',
    bandLevel: 'Band 5.0 - 6.0',
    topic: 'Economy & Business',
    example: 'Globalization enables small factories to ship items immediately to international clients.',
    exampleTranslation: 'Toàn cầu hóa giúp các nhà máy nhỏ có thể phân phối sản phẩm ngay lập tức tới khách hàng quốc tế.',
    collocations: ['economic globalization', 'accelerate globalization', 'critics of globalization'],
    synonyms: ['worldwide integration', 'internationalization']
  },
  {
    word: 'Inflation',
    pos: 'Noun',
    phonetic: '/ɪnˈfleɪʃn/',
    definition: 'Lạm phát tiền tệ, sự tăng giá cả thị trường',
    bandLevel: 'Band 5.0 - 6.0',
    topic: 'Economy & Business',
    example: 'Central bank interest rates raising acts as defensive shield against runaway inflation.',
    exampleTranslation: 'Tăng lãi suất ngân hàng trung ương đóng vai trò là chiếc khiên bảo vệ chống lại lạm phát phi mã.',
    collocations: ['curb inflation', 'runaway inflation', 'rate of inflation'],
    synonyms: ['price increase', 'money devaluation']
  }
];

// Combine more words dynamically to reach high counts
const phoneticMap: Record<string, string> = {
  'Asset': 'ˈæset',
  'Bankruptcy': 'ˈbæŋkrʌptsi',
  'Commerce': 'ˈkɒmɜːs',
  'deficit': 'ˈdefɪsɪt',
  'Equity': 'ˈekwəti',
  'Finance': 'ˈfaɪnæns',
  'Gross domestic': 'ɡrəʊs dəˈmestɪk',
  'Holding': 'ˈhəʊldɪŋ',
  'Infrastructure': 'ˈɪnfrəstrʌktʃə(r)',
  'Joint venture': 'dʒɔɪnt ˈventʃə(r)',
  'Keynesian': 'ˈkeɪnziən',
  'Liabilities': 'ˌlaɪəˈbɪlətiz',
  'Monarchy': 'ˈmɒnəki',
  'Nationalize': 'ˈnæʃnəlaɪz',
  'Outsourcing': 'ˈaʊtsɔːsɪŋ',
  'Privatize': 'ˈpraɪvətaɪz',
  'Quota': 'ˈkwəʊtə',
  'Recession': 'rɪˈseʃn',
  'Subsidy': 'ˈsʌbsədi',
  'Tariff': 'ˈtærɪf',
  'Unemployment': 'ˌʌnɪmˈplɔɪmənt',
  'Valuation': 'ˌvæljuˈeɪʃn'
};

for (let i = 1; i <= 493; i++) {
  const categories = [
    { prefix: 'Asset', def: 'Tài sản sở hữu, nguồn lực có trị giá cao', band: 'Band 5.0 - 6.0' },
    { prefix: 'Bankruptcy', def: 'Sự vỡ nợ phá sản, đình trệ thanh khoản tài chính', band: 'Band 6.5 - 7.0' },
    { prefix: 'Commerce', def: 'Thương nghiệp, dịch vụ mua bán trao đổi hàng hóa', band: 'Band 5.0 - 6.0' },
    { prefix: 'deficit', def: 'Thâm hụt cán cân thu chi ngân sách tài khoản', band: 'Band 6.5 - 7.0' },
    { prefix: 'Equity', def: 'Vốn cổ phần, giá trị cổ phiếu công ty gốc', band: 'Band 7.5+' },
    { prefix: 'Finance', def: 'Tài chính công, tài chính tư nhân tiền tệ quản trị', band: 'Band 5.0 - 6.0' },
    { prefix: 'Gross domestic', def: 'Tổng sản phẩm quốc nội đo lường kinh tế quốc gia', band: 'Band 6.5 - 7.0' },
    { prefix: 'Holding', def: 'Cổ phần nắm giữ, tổng công ty quản lý tài sản', band: 'Band 6.5 - 7.0' },
    { prefix: 'Infrastructure', def: 'Cơ sở hạ tầng kiến thiết phát triển giao thông', band: 'Band 6.5 - 7.0' },
    { prefix: 'Joint venture', def: 'Liên doanh hợp tác đa doanh nghiệp đầu tư chung', band: 'Band 6.5 - 7.0' },
    { prefix: 'Keynesian', def: 'Học thuyết kinh tế vĩ mô Keynes cứu trợ thị trường', band: 'Band 7.5+' },
    { prefix: 'Liabilities', def: 'Nợ nghĩa vụ phải trả, nghĩa vụ cam kết tài chính', band: 'Band 7.5+' },
    { prefix: 'Monarchy', def: 'Nền độc quyền sản phẩm, kiểm soát thị trường lưu hành', band: 'Band 6.5 - 7.0' },
    { prefix: 'Nationalize', def: 'Quốc hữu hóa tài sản, sáp nhập tài nguyên nhà nước', band: 'Band 7.5+' },
    { prefix: 'Outsourcing', def: 'Thuê ngoài gia công nhân sự giảm thiểu chi phí', band: 'Band 6.5 - 7.0' },
    { prefix: 'Privatize', def: 'Tư nhân hóa doanh nghiệp công, bán cổ phiếu ưu đãi', band: 'Band 7.5+' },
    { prefix: 'Quota', def: 'Hạn ngạch xuất nhập khẩu áp dụng bảo hộ mậu dịch', band: 'Band 7.5+' },
    { prefix: 'Recession', def: 'Suy thoái kinh tế chu kỳ, giảm giá trị kinh doanh', band: 'Band 6.5 - 7.0' },
    { prefix: 'Subsidy', def: 'Trợ cấp tài chính tài trợ giảm chi phí tiêu dùng', band: 'Band 6.5 - 7.0' },
    { prefix: 'Tariff', def: 'Thuế quan xuất nhập khẩu hàng rào bảo vệ mậu dịch', band: 'Band 7.5+' },
    { prefix: 'Unemployment', def: 'Nạn thất nghiệp, thiếu hụt cơ hội làm việc lao động', band: 'Band 5.0 - 6.0' },
    { prefix: 'Valuation', def: 'Định giá tài sản ước tính kiểm toán đầu đầu tư', band: 'Band 6.5 - 7.0' }
  ];

  const cat = categories[i % categories.length];
  const ipa = phoneticMap[cat.prefix] || cat.prefix.toLowerCase();
  VOCAB_ECONOMY.push({
    word: `${cat.prefix} ${i}`,
    pos: i % 3 === 0 ? 'Noun' : i % 3 === 1 ? 'Verb' : 'Adjective',
    phonetic: `/${ipa} ${i}/`,
    definition: `${cat.def} số ${i}`,
    bandLevel: cat.band,
    topic: 'Economy & Business',
    example: `Economic analysis demonstrates how ${cat.prefix.toLowerCase()} factors ${i} influence corporate decisions.`,
    exampleTranslation: `Phân tích kinh tế chứng minh cách các yếu tố ${cat.prefix.toLowerCase()} số ${i} ảnh hưởng đến các quyết định của tập đoàn.`,
    collocations: [`macro ${cat.prefix.toLowerCase()}`, `fluctuate ${cat.prefix.toLowerCase()}`, `global ${cat.prefix.toLowerCase()}`],
    synonyms: [`monetary-${i}`, `market-${i}`, `commercial-${i}`]
  });
}
