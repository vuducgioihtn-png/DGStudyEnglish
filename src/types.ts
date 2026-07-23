export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  category: 'Grammar' | 'Vocabulary' | 'Reading' | 'Listening';
  explanation: string;
}

export interface TestResultBreakdown {
  grammar: number;
  vocabulary: number;
  reading: number;
  overall: number;
}

export interface PersonalizedRoadmapLesson {
  id: string;
  title: string;
  description: string;
  category: 'Grammar' | 'Vocabulary' | 'Communication' | 'Reading';
  duration: string; // e.g. "20 mins"
  status: 'locked' | 'unlocked' | 'completed';
  vocabulary: string[];
  keyGrammar: string;
  dialogueModel?: string[];
  objectives: string[];
}

export interface PersonalizedRoadmap {
  level: CEFRLevel;
  title: string;
  description: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  lessons: PersonalizedRoadmapLesson[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  audio?: string; // base64 encoded audio for TTS
}

export interface TeachingCurriculum {
  title: string;
  targetLevel: CEFRLevel;
  topic: string;
  objectives: string[];
  vocabulary: { phrase: string; phonetic?: string; meaning: string; example: string }[];
  grammarPoints: { structure: string; explanation: string; example: string }[];
  classroomActivities: { name: string; duration: string; description: string }[];
  homeworkQuiz: { question: string; options: string[]; answer: string; explanation: string }[];
}

export interface StudentProgress {
  name: string;
  currentLevel: CEFRLevel;
  streakDays: number;
  completedLessonsCount: number;
  joinDate: string;
  strengths: string[];
  weaknesses: string[];
}

export interface HomeworkAssignment {
  id: string;
  title: string;
  topic: string;
  level: CEFRLevel;
  assignedTo: string; // "all" or specific username
  dueDate: string;
  questions: {
    id: number;
    question: string;
    options?: string[]; // Multiple choice if quiz, otherwise empty
    correctAnswer?: string; // correct option index if quiz
    type: 'quiz' | 'essay' | 'sentence_construction';
    hint?: string;
  }[];
  createdAt: string;
}

export interface HomeworkSubmission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  studentUsername: string;
  studentFullName: string;
  answers: {
    questionId: number;
    studentAnswer: string;
  }[];
  submittedAt: string;
  status: 'pending' | 'graded';
  score?: number; // e.g., 0-100 or 1-10
  feedback?: string; // Core teacher feedback
  aiReviewDraft?: string; // AI-evaluated review draft for teacher
  submittedFileUrl?: string; // Optional homework uploaded file url (or base64 / display name)
  submittedFileName?: string; // Optional homework uploaded file name
}

export interface Classroom {
  id: string;
  name: string;
  section?: string;
  grade?: string;
  subject?: string;
  room?: string;
  code: string;
  studentCount: number;
  createdAt: string;
  themeColor?: string;
  themePattern?: number;
  announcements?: {
    id: string;
    content: string;
    createdAt: string;
    comments?: {
      id: string;
      author: string;
      content: string;
      createdAt: string;
    }[];
  }[];
  enrolledStudents?: {
    id?: string;
    username?: string;
    fullName: string;
    email: string;
    status: 'invited' | 'joined';
    joinedAt?: string;
  }[];
}

export interface IeltsWord {
  word: string;
  pos: string; // e.g. "noun", "verb", "adjective", "adverb"
  phonetic: string; // e.g. "/əˈkʌmplɪʃ/"
  definition: string; // Vietnamese meaning
  bandLevel: string; // "Band 5.0 - 6.0" | "Band 6.5 - 7.0" | "Band 7.5+"
  topic: string; // e.g. "Education", "Technology", "Environment"
  example: string; // English example sentence
  exampleTranslation: string; // Vietnamese translation of example
  examplePhonetic?: string; // Phonetic transcription for the example sentence
  collocations: string[]; // common collocations
  synonyms: string[]; // synonyms
}


