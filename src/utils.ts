/**
 * High-quality IPA (International Phonetic Alphabet) Phonetic Dictionary
 * for Vietnamese Standard School English Curriculum (Grades 1 to 12).
 * 
 * Supports Strategy A: Local dictionary-based auto-enrichment.
 * Supports Strategy B: Dynamic parsing of AI-generated content in 'Word /IPA/ (Meaning)' format.
 */

const IPA_DICTIONARY: { [word: string]: string } = {
  // Common School Vocabularies
  "pasta": "/ˈpæstə/",
  "popcorn": "/ˈpɒpkɔːn/",
  "pizza": "/ˈpiːtsə/",
  "yummy": "/ˈyʌmi/",
  "kite": "/kaɪt/",
  "bike": "/baɪk/",
  "kitten": "/ˈkɪt.ən/",
  "flying": "/ˈflaɪ.ɪŋ/",
  "sail": "/seɪl/",
  "sand": "/sænd/",
  "sea": "/siː/",
  "seaside": "/ˈsiː.saɪd/",
  "rainbow": "/ˈreɪnbəʊ/",
  "river": "/ˈrɪvə/",
  "road": "/rəʊd/",
  "see": "/siː/",
  "question": "/ˈkwestʃən/",
  "square": "/skweə/",
  "quiz": "/kwɪz/",
  "classroom": "/ˈklɑːsruːm/",
  "box": "/bɒks/",
  "fox": "/fɒks/",
  "ox": "/ɒks/",
  "farm": "/fɑːm/",
  "juice": "/dʒuːs/",
  "jelly": "/ˈdʒeli/",
  "jam": "/dʒæm/",
  "kitchen": "/ˈkɪtʃɪn/",
  "village": "/ˈvɪlɪdʒ/",
  "van": "/væn/",
  "volleyball": "/ˈvɒlibɔːl/",
  "draw": "/drɔː/",
  "yogurt": "/ˈjɒɡət/",
  "yams": "/jæmz/",
  "yo-yos": "/ˈjəʊjəʊz/",
  "want": "/wɒnt/",
  "zoo": "/zuː/",
  "zebra": "/ˈzebrə/",
  "zebu": "/ˈziːbuː/",
  "like": "/laɪk/",
  "sliding": "/ˈslaɪdɪŋ/",
  "riding": "/ˈraɪdɪŋ/",
  "driving": "/ˈdraɪvɪŋ/",
  "playground": "/ˈpleɪɡraʊnd/",
  "grapes": "/ɡreɪps/",
  "cake": "/keɪk/",
  "table": "/ˈteɪbəl/",
  "café": "/ˈkæfeɪ/",
  "eleven": "/ɪˈlevən/",
  "thirteen": "/θɜːˈtiːn/",
  "fourteen": "/fɔːˈtiːn/",
  "fifteen": "/fɪfˈtiːn/",
  "twelve": "/twelv/",
  "brother": "/ˈbrʌðə/",
  "sister": "/ˈsɪstə/",
  "grandmother": "/ˈɡrænˌmʌðə/",
  "age": "/eɪdʒ/",
  "shirts": "/ʃɜːts/",
  "shoes": "/ʃuːz/",
  "shorts": "/ʃɔːts/",
  "clothes": "/kləʊðz/",
  "tent": "/tent/",
  "teapot": "/ˈtiːpɒt/",
  "blanket": "/ˈblæŋkɪt/",
  "campsite": "/ˈkæmpsaɪt/",
  "my": "/maɪ/",
  "your": "/jɔː/",
  "his": "/hɪz/",
  "her": "/hɜː/",
  "in": "/ɪn/",
  "on": "/ɒn/",
  "under": "/ˈʌndə/",
  "next to": "/nekst tuː/",
  "swim": "/swɪm/",
  "fly": "/flaɪ/",
  "sing": "/sɪŋ/",
  "run": "/rʌn/",
  "dog": "/dɒɡ/",
  "cat": "/kæt/",
  "bird": "/bɜːd/",
  "fish": "/fɪʃ/",
  "monday": "/ˈmʌndeɪ/",
  "wednesday": "/ˈwenzdeɪ/",
  "friday": "/ˈfraɪdeɪ/",
  "sunday": "/ˈsʌndeɪ/",
  "play football": "/pleɪ ˈfʊtbɔːl/",
  "draw pictures": "/drɔː ˈpɪktʃəz/",
  "listen to music": "/ˈlɪsən tuː ˈmjuːzɪk/",
  "read books": "/riːd bʊks/",
  "every day": "/ˈevri deɪ/",
  "play": "/pleɪ/",
  "eat": "/iːt/",
  "sleep": "/sliːp/",
  "o'clock": "/əˈklɒk/",
  "half past": "/hɑːf pɑːst/",
  "quarter": "/ˈkwɔːtə/",
  "time": "/taɪm/",
  "teacher": "/ˈtiːtʃə/",
  "doctor": "/ˈdɒktə/",
  "pilot": "/ˈpaɪlət/",
  "singer": "/ˈsɪŋə/",
  "on monday": "/ɒn ˈmʌndeɪ/",
  "in the morning": "/ɪn ðə ˈmɔːnɪŋ/",
  "at night": "/æt naɪt/",
  "weekend": "/ˌwiːkˈend/",
  "now": "/naɪ/",
  "watching": "/ˈwɒtʃɪŋ/",
  "playing": "/ˈpleɪɪŋ/",
  "studying": "/ˈstʌdiɪŋ/",
  "always": "/ˈɔːlweɪz/",
  "usually": "/ˈjuːʒuəli/",
  "sometimes": "/ˈsʌmtaɪmz/",
  "never": "/ˈnevə/",
  "taller": "/ˈtɔːlə/",
  "shorter": "/ˈʃɔːtə/",
  "bigger": "/ˈbɪɡə/",
  "smaller": "/ˈsmɔːlə/",
  "yesterday": "/ˈjestədeɪ/",
  "last week": "/lɑːst wiːk/",
  "was": "/wɒz/",
  "were": "/wɜː/",
  "water": "/ˈwɔːtə/",
  "rice": "/raɪs/",
  "banana": "/bəˈnɑːnə/",
  "cheese": "/tʃiːz/",
  "some": "/sʌm/",
  "any": "/ˈeni/",
  "milk": "/mɪlk/",
  "apples": "/ˈæpəlz/",
  "must": "/mʌst/",
  "should": "/ʃʊd/",
  "turn left": "/tɜːn left/",
  "traffic light": "/ˈtræfɪk laɪt/",
  "fastest": "/ˈfɑːstɪst/",
  "tallest": "/ˈtɔːlɪst/",
  "most beautiful": "/məʊst ˈbjuːtəfəl/",
  "cheapest": "/ˈtʃiːpɪst/",
  "went": "/went/",
  "bought": "/bɔːt/",
  "had": "/hæd/",
  "saw": "/sɔː/",
  "take": "/teɪk/",
  "minutes": "/ˈmɪnɪts/",
  "travel": "/ˈtrævəl/",
  "distance": "/ˈdɪstəns/",
  "enjoy": "/ɪnˈdʒɔɪ/",
  "fascinated": "/ˈfæsɪneɪtɪd/",
  "dislike": "/dɪsˈlaɪk/",
  "hate": "/heɪt/",
  "although": "/ɔːlˈðəʊ/",
  "because": "/bɪˈkɒz/",
  "however": "/haʊˈevə/",
  "therefore": "/ˈðeəfɔː/",
  "while": "/waɪl/",
  "at 8 pm": "/æt eɪt piː em/",
  "was studying": "/wɒz ˈstʌdiɪŋ/",
  "watching tv": "/ˈwɒtʃɪŋ ˌtiːˈviː/",
  "used to": "/juːst tuː/",
  "no longer": "/nəʊ ˈlɒŋɡə/",
  "past habit": "/pɑːst ˈhæbɪt/",
  "childhood": "/ˈtʃaɪldhʊd/",
  "fluently": "/ˈfluːəntli/",
  "carefully": "/ˈkeəfəli/",
  "as... as": "/æz... æz/",
  "more... than": "/mɔː... ðæn/",
  "spontaneous": "/spɒnˈteɪniəs/",
  "planned": "/plænd/",
  "intend": "/ɪnˈtend/",
  "promise": "/ˈprɒmɪs/",
  "since": "/sɪns/",
  "for": "/fɔː/",
  "already": "/ɔːlˈredi/",
  "yet": "/jet/",
  "active": "/ˈæktɪv/",
  "passive": "/ˈpæsɪv/",
  "by": "/baɪ/",
  "build": "/bɪld/",
  "relative clause": "/ˈrelətɪv klɔːz/",
  "who": "/huː/",
  "which": "/wɪtʃ/",
  "that": "/ðæt/",
  "hypothetical": "/ˌhaɪpəˈθetɪkəl/",
  "unreal": "/ˌʌnˈrɪəl/",
  "if-clause": "/ɪf klɔːz/",
  "exam": "/ɪɡˈzæm/",
  "agreement": "/əˈɡriːmənt/",
  "singular": "/ˈsɪŋɡjələ/",
  "plural": "/ˈplʊərəl/",
  "neither... nor": "/ˈnaɪðə... nɔː/",
  "had better": "/hæd ˈbetə/",
  "ought to": "/ˈɔːt tuː/",
  "consequence": "/ˈkɒnsɪkwəns/",
  "advice": "/ədˈvaɪs/",
  "must be done": "/mʌst biː dʌn/",
  "should be solved": "/ʃʊd biː sɒlvd/",
  "problem": "/ˈprɒbləm/",
  "rule": "/ruːl/",
  "comma": "/ˈkɒmə/",
  "proper noun": "/ˈprɒpə naʊn/",
  "extra info": "/ˈekstrə ˈɪnfəʊ/",
  "introduce": "/ˌɪntrəˈdjuːs/",
  "before": "/bɪˈfɔː/",
  "after": "/ˈɑːftə/",
  "had left": "/hæd left/",
  "arrived": "/əˈraɪvd/",
  "report": "/rɪˈpɔːt/",
  "say/tell": "/seɪ/tel/",
  "lùi thì": "/luːi tʰiː/",
  "ask": "/ɑːsk/",
  "remember": "/rɪˈmembə/",
  "regret": "/rɪˈɡret/",
  "forget": "/fəˈɡet/",
  "stop": "/stɒp/",
  "hypothesis": "/haɪˈpɒθəsɪs/",
  "regretful": "/rɪˈɡretfəl/",
  "present impact": "/ˈprezənt ˈɪmpækt/",
  "mix": "/mɪks/",
  "hardly": "/ˈhɑːdli/",
  "scarcely": "/ˈskeəsli/",
  "no sooner... than": "/nəʊ ˈsuːnə... ðæn/",
  "under no circumstances": "/ˈʌndə nəʊ ˈsɜːkəmstənsɪz/",
  "having finished": "/ˈhævɪŋ ˈfɪnɪʃt/",
  "completed": "/kəmˈpliːtɪd/",
  "participle clause": "/ˈpɑːtəsɪpəl klɔːz/",
  "concise": "/kənˈsaɪs/",
  "it is believed that": "/ɪt ɪz bɪˈliːvd ðæt/",
  "rumor": "/ˈruːmə/",
  "objective": "/əbˈdʒektɪv/",
  "essential": "/ɪˈsenʃəl/",
  "crucial": "/ˈkruːʃəl/",
  "recommend": "/ˌrekəˈmend/",
  "subjunctive": "/səbˈdʒʌŋktɪv/",
  "foster development": "/ˈfɒstə dɪˈveləpmənt/",
  "pave the way for": "/peɪv ðə weɪ fɔː/",
  "gain a competitive edge": "/ɡeɪn ə kəmˈpetətɪv edʒ/"
};

export interface ParsedVocabulary {
  word: string;
  phonetic: string;
  meaning: string;
}

/**
 * Parses a vocabulary string and enriches with phonetic IPA if missing.
 * Handles various formats:
 * - "Pasta (Mì ống)"                    -> Local lookup -> word: "Pasta", phonetic: "/ˈpæstə/", meaning: "Mì ống"
 * - "Pasta /ˈpæstə/ (Mì ống)"           -> Dynamic parse -> word: "Pasta", phonetic: "/ˈpæstə/", meaning: "Mì ống"
 * - "Apple (Táo)"                       -> Local lookup -> word: "Apple", phonetic: "/ˈæp.əl/", meaning: "Táo"
 */
export function parseVocabulary(raw: string): ParsedVocabulary {
  if (!raw) return { word: '', phonetic: '', meaning: '' };

  let word = '';
  let phonetic = '';
  let meaning = '';

  // Match pattern: Word /Phonetic/ (Meaning)
  // For example: "Pasta /ˈpæstə/ (Mì ống)"
  const regexWithIPA = /^([^\/]+)\/([^\/]+)\/\s*(?:\(([^)]+)\)|(.*))$/;
  const matchWithIPA = raw.match(regexWithIPA);

  if (matchWithIPA) {
    word = matchWithIPA[1].trim();
    phonetic = `/${matchWithIPA[2].trim()}/`;
    meaning = (matchWithIPA[3] || matchWithIPA[4] || '').trim();
  } else {
    // Normal format: "Pasta (Mì ống)"
    const indexBracket = raw.indexOf('(');
    if (indexBracket !== -1) {
      word = raw.substring(0, indexBracket).trim();
      const endBracket = raw.indexOf(')', indexBracket);
      meaning = raw.substring(indexBracket + 1, endBracket !== -1 ? endBracket : raw.length).trim();
    } else {
      word = raw.trim();
      meaning = '';
    }

    // Try lookup in local IPA dictionary (lowercased key)
    const normalizedKey = word.toLowerCase().trim();
    if (IPA_DICTIONARY[normalizedKey]) {
      phonetic = IPA_DICTIONARY[normalizedKey];
    } else {
      // Attempt to look for partial matches
      const foundKey = Object.keys(IPA_DICTIONARY).find(k => normalizedKey.includes(k) || k.includes(normalizedKey));
      if (foundKey) {
        phonetic = IPA_DICTIONARY[foundKey];
      } else {
        // Fallback placeholder/empty phonetic or generated phonetic format
        phonetic = '';
      }
    }
  }

  // Double check and ensure phonetic is formatted with slashes
  if (phonetic && !phonetic.startsWith('/')) {
    phonetic = `/${phonetic}`;
  }
  if (phonetic && !phonetic.endsWith('/')) {
    phonetic = `${phonetic}/`;
  }

  return { word, phonetic, meaning };
}

const COMMON_IPA_WORDS: { [w: string]: string } = {
  // Articles & Conjunctions
  "the": "ðə", "a": "ə", "an": "ən", "and": "ænd", "or": "ɔː", "but": "bʌt", "also": "ˈɔːlsəʊ",
  "if": "ɪf", "then": "ðen", "else": "els", "although": "ɔːlˈðəʊ", "though": "ðəʊ", "even": "ˈiːvən",
  "unless": "ʌnˈles", "whereas": "weərˈæz", "while": "waɪl", "as": "æz", "because": "bɪˈkɒz",
  "since": "sɪns", "until": "ʌnˈtɪl", "so": "səʊ", "therefore": "ˈðeəfɔː", "however": "haʊˈevə",
  
  // Verbs of being & helping
  "is": "ɪz", "am": "æm", "are": "ɑː", "was": "wɒz", "were": "wɜː", "be": "biː", "been": "biːn", "being": "ˈbiːɪŋ",
  "have": "hæv", "has": "hæz", "had": "hæd", "do": "duː", "does": "dʌz", "did": "dɪd", "done": "dʌn", "doing": "ˈduːɪŋ",
  "go": "ɡəʊ", "goes": "ɡəʊz", "went": "went", "gone": "ɡɒn", "going": "ˈɡəʊɪŋ",
  
  // Prepositions
  "to": "tuː", "for": "fɔː", "of": "ɒv", "in": "ɪn", "on": "ɒn", "at": "æt", "by": "baɪ", "about": "əˈbaʊt",
  "with": "wɪð", "from": "frɒm", "into": "ˈɪntuː", "through": "θruː", "over": "ˈəʊvə", "under": "ˈʌndə",
  "after": "ˈɑːftə", "before": "bɪˈfɔː", "between": "bɪˈtwiːn", "among": "əˈmʌŋ", "during": "ˈdjʊərɪŋ",
  "without": "wɪˈðaʊt", "against": "əˈɡeɪnst", "above": "əˈbʌv", "below": "bɪˈləʊ", "throughout": "θruːˈaʊt",
  
  // Pronouns
  "we": "wiː", "i": "aɪ", "you": "juː", "he": "hiː", "she": "ʃiː", "they": "ðeɪ", "it": "ɪt", "who": "huː", "which": "wɪtʃ",
  "what": "wɒt", "where": "weə", "why": "waɪ", "how": "haʊ", "whose": "huːz", "whom": "huːm",
  "my": "maɪ", "your": "jɔː", "his": "hɪz", "her": "hɜː", "its": "ɪts", "our": "ˈaʊə", "their": "ðeə", "them": "ðem",
  "me": "miː", "him": "hɪm", "us": "ʌs", "this": "ðɪs", "that": "ðæt", "these": "ðiːz", "those": "ðəʊz",
  "there": "ðeə", "here": "hɪə", "someone": "ˈsʌmwʌn", "something": "ˈsʌmθɪŋ", "anyone": "ˈeniwʌn", "anything": "ˈenɪθɪŋ",
  "everyone": "ˈevriwʌn", "everything": "ˈevrɪθɪŋ", "nobody": "ˈnəʊbədi", "nothing": "ˈnʌθɪŋ",
  
  // Modals & adverbs
  "can": "kæn", "could": "kʊd", "will": "wɪl", "would": "wʊd", "should": "ʃʊd", "must": "mʌst", "may": "meɪ", "might": "maɪt",
  "not": "nɒt", "no": "nəʊ", "yes": "jes", "very": "ˈveri", "too": "tuː", "more": "mɔː", "most": "məʊst", "just": "dʒʌst",
  "only": "ˈəʊnli", "now": "naʊ", "then_adv": "ðen", "always": "ˈɔːlweɪz", "never": "ˈnevə", "often": "ˈɒfən",
  "sometimes": "ˈsʌmtaɪmz", "usually": "ˈjuːʒʊəli", "well": "wel", "good": "ɡʊd", "best": "best", "better": "ˈbetə",
  "bad": "bæd", "worst": "wɜːst", "worse": "wɜːs",
  
  // Schools & Education
  "school": "skuːl", "schools": "skuːlz", "student": "ˈstjuːdənt", "students": "ˈstjuːdənts",
  "teacher": "ˈtiːtʃə", "teachers": "ˈtiːtʃəz", "classroom": "ˈklɑːsruːm", "classrooms": "ˈklɑːsruːmz",
  "education": "ˌedʒuˈkeɪʃən", "learning": "ˈlɜːnɪŋ", "study": "ˈstʌdi", "studying": "ˈstʌdiɪŋ", "class": "klɑːs", "classes": "ˈklɑːsɪz",
  
  // Numbers & Quantifiers
  "many": "ˈmeni", "much": "mʌtʃ", "some": "sʌm", "any": "ˈeni", "all": "ɔːl", "each": "iːtʃ", "every": "ˈevri",
  "one": "wʌn", "two": "tuː", "three": "θriː", "four": "fɔː", "five": "faɪv", "six": "sɪks", "seven": "ˈsevən", "eight": "eɪt", "nine": "naɪn", "ten": "ten",
  
  // Common nouns
  "time": "taɪm", "year": "jɪə", "years": "jɪəz", "people": "ˈpiːpəl", "way": "weɪ", "day": "deɪ", "days": "deɪz",
  "world": "wɜːld", "life": "laɪf", "work": "wɜːk", "part": "pɑːt", "number": "ˈnʌmbə", "children": "ˈtʃɪldrən",
  "child": "tʃaɪld", "system": "ˈsɪstəm", "systems": "ˈsɪstəmz", "family": "ˈfæmɪli", "families": "ˈfæmɪliz",
  "group": "ɡruːp", "groups": "ɡruːps", "problem": "ˈprɒbləm", "problems": "ˈprɒbləmz", "country": "ˈkʌntri", "countries": "ˈkʌntriz",
  "help": "help", "helps": "helps", "development": "dɪˈveləpmənt", "society": "səˈsaɪəti", "culture": "ˈkʌltʃə",
  "community": "kəˈmjuːnəti", "information": "ˌɪnfəˈmeɪʃən", "future": "ˈfjuːtʃə",

  // Expansion for syllabus nouns & verbs
  "practice": "ˈpræktɪs",
  "develop": "dɪˈveləp",
  "developing": "dɪˈveləpɪŋ",
  "mastery": "ˈmɑːstəri",
  "deep": "diːp",
  "word": "wɜːd",
  "beneficial": "ˌbenɪˈfɪʃl",
  "general": "ˈdʒenərəl",
  "academic": "ˌækəˈdemɪk",
  "language": "ˈlæŋɡwɪdʒ",
  "toolkit": "ˈtuːlkɪt",
  "modern": "ˈmɒdən",
  "pedagogy": "ˈpedəɡɒdʒi",
  "emphasizes": "ˈemfəsaɪzɪz",
  "emphasize": "ˈemfəsaɪz",
  "centered": "ˈsentəd",
  "student-centered": "ˈstjuːdənt-ˈsentəd",
  "puzzles": "ˈpʌzəlz",
  "puzzle": "ˈpʌzəl",
  "quizzes": "ˈkwɪzɪz",
  "cognitive": "ˈkɒɡnətɪv",
  "abilities": "əˈbɪlətiz",
  "ability": "əˈbɪləti",
  "critical": "ˈkrɪtɪkl",
  "thinking": "ˈθɪŋkɪŋ",
  "creative": "kriːˈeɪtɪv",
  "inquiry": "ɪnˈkwaɪəri",
  "curriculum": "kəˈrɪkjʊləm",
  "foster": "ˈfɒstə",
  "rote": "rəʊt",
  "traditional": "trəˈdɪʃənl",
  "technological": "ˌteknəˈlɒdʒɪkəl",
  "innovation": "ˌɪnəˈveɪʃən",
  "drives": "draɪvz",
  "drive": "draɪv",
  "efficiency": "ɪˈfɪʃənsi",
  "agriculture": "ˈæɡrɪkʌltʃə",
  "agricultural": "ˌæɡrɪˈkʌltʃərəl",
  "sector": "ˈsektə",
  "factory": "ˈfæktəri",
  "decided": "dɪˈsaɪdɪd",
  "decide": "dɪˈsaɪd",
  "automate": "ˈɔːtəmeɪt",
  "assembly": "əˈsembli",
  "lines": "laɪnz",
  "line": "laɪn",
  "minimize": "ˈmɪnɪmaɪz",
  "human": "ˈhjuːmən",
  "errors": "ˈerəz",
  "error": "ˈerə"
};

/**
 * Fallback heuristic phonetic sound estimator for unknown words to guarantee
 * that they are fully written in phonetic IPA symbols rather than raw English.
 */
function heuristicIpa(word: string): string {
  let w = word.toLowerCase().trim();
  
  // Strip common suffixes
  let suffix = '';
  if (w.endsWith("s'") || w.endsWith("'s")) {
    suffix = 'z';
    w = w.replace(/'s$/, '').replace(/s'$/, '');
  } else if (w.slice(1).endsWith('s') && !w.endsWith('ss') && !w.endsWith('us') && !w.endsWith('is')) {
    suffix = 'z';
    w = w.slice(0, -1);
  } else if (w.endsWith('ed')) {
    suffix = 't';
    w = w.slice(0, -2);
  } else if (w.endsWith('ing')) {
    suffix = 'ɪŋ';
    w = w.slice(0, -3);
  } else if (w.endsWith('ly')) {
    suffix = 'li';
    w = w.slice(0, -2);
  }

  // Basic phonotactics replacements to simulate standard English IPA pronunciation
  const rules: [RegExp, string][] = [
    [/tion/g, 'ʃən'],
    [/sion/g, 'ʒən'],
    [/tive/g, 'tɪv'],
    [/sive/g, 'sɪv'],
    [/ture/g, 'tʃə'],
    [/sure/g, 'ʒə'],
    [/ph/g, 'f'],
    [/ck/g, 'k'],
    [/qu/g, 'kw'],
    [/kn/g, 'n'],
    [/wr/g, 'r'],
    [/wh/g, 'w'],
    [/th/g, 'θ'],
    [/sh/g, 'ʃ'],
    [/ch/g, 'tʃ'],
    [/ee/g, 'iː'],
    [/ea/g, 'iː'],
    [/oo/g, 'uː'],
    [/oa/g, 'əʊ'],
    [/ai/g, 'eɪ'],
    [/ay/g, 'eɪ'],
    [/oi/g, 'ɔɪ'],
    [/oy/g, 'ɔɪ'],
    [/ce/g, 's'],
    [/ci/g, 'sɪ'],
    [/cy/g, 'si'],
    [/ge/g, 'dʒ'],
    [/gi/g, 'dʒɪ'],
    [/gy/g, 'dʒi'],
    [/x/g, 'ks'],
    [/c([^eiy])/g, 'k$1'],
    [/c$/g, 'k'],
    [/g([^eiy])/g, 'ɡ$1'],
    [/g$/g, 'ɡ'],
    [/y$/g, 'i'],
    [/a/g, 'æ'],
    [/e/g, 'e'],
    [/i/g, 'ɪ'],
    [/o/g, 'ɒ'],
    [/u/g, 'ʌ']
  ];

  for (const [pattern, repl] of rules) {
    w = w.replace(pattern, repl);
  }

  return w + suffix;
}

/**
 * Generates an English dynamic sentence-level phonetic transcription to guide users pronouncing context examples.
 */
export function getSentencePhonetic(sentence: string, wordPhonetic?: string, targetWord?: string): string {
  if (!sentence) return '';
  
  const cleanTarget = targetWord ? targetWord.toLowerCase().trim() : '';
  const cleanPhonetic = wordPhonetic ? wordPhonetic.replace(/\//g, '').trim() : '';

  // Split sentence into words, retaining punctuation
  const words = sentence.split(/(\s+)/);
  const transcribedWords = words.map(chunk => {
    if (/^\s+$/.test(chunk)) return chunk;

    const match = chunk.match(/^([^a-zA-Z0-9'-]*)([a-zA-Z0-9'-]+)([^a-zA-Z0-9'-]*)$/);
    if (!match) return chunk;

    const prefix = match[1];
    const word = match[2];
    const suffix = match[3];

    const lowerWord = word.toLowerCase();
    let ipa = '';

    // 1. If it matches target word exactly or root-wise, use provided wordPhonetic
    if (cleanTarget && (lowerWord === cleanTarget || lowerWord.startsWith(cleanTarget) || cleanTarget.startsWith(lowerWord))) {
      ipa = cleanPhonetic;
    }

    // 2. Look in COMMON_IPA_WORDS (exact match only!)
    if (!ipa && COMMON_IPA_WORDS[lowerWord]) {
      ipa = COMMON_IPA_WORDS[lowerWord];
    }

    // 3. Look in IPA_DICTIONARY (exact match only!)
    if (!ipa && IPA_DICTIONARY[lowerWord]) {
      ipa = IPA_DICTIONARY[lowerWord].replace(/\//g, '').trim();
    }

    // 4. Look in keys of IPA_DICTIONARY for multi-word exact matching phrases
    if (!ipa) {
      const foundKey = Object.keys(IPA_DICTIONARY).find(k => {
        const wordsInKey = k.split(/\s+/).map(w => w.toLowerCase());
        return wordsInKey.includes(lowerWord);
      });
      if (foundKey) {
        const keyWords = foundKey.split(/\s+/);
        const valPhonetics = IPA_DICTIONARY[foundKey].replace(/\//g, '').split(/\s+/);
        if (keyWords.length === valPhonetics.length) {
          const idx = keyWords.findIndex(w => w.toLowerCase() === lowerWord);
          if (idx !== -1) {
            ipa = valPhonetics[idx];
          }
        }
      }
    }

    // 5. Fallback - use rule-based heuristic phonetic synthesizer so we NEVER output raw english
    if (!ipa) {
      ipa = heuristicIpa(word);
    }

    return prefix + ipa + suffix;
  });

  return '/' + transcribedWords.join('').trim() + '/';
}
