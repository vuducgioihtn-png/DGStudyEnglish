import { eatingChapter } from "./mindmaps/eatingChapter";
import {
  drinkingChapter,
  homeChapter,
  leisureChapter,
  blueMondayChapter,
  sportsChapter
} from "./mindmaps/chapters2to6";
import {
  moodsChapter,
  transportChapter,
  bodyPartsChapter,
  happyHolidaysChapter,
  aboutNumbersChapter
} from "./mindmaps/chapters7to11";
import {
  loveChapter,
  aboutPeopleChapter,
  makeupChapter,
  animalKingdomChapter,
  natureChapter,
  whatElseChapter
} from "./mindmaps/chapters12to17";

export interface BookMindmapNode {
  word: string;
  pos: string;
  phonetic: string;
  definition: string;
  example: string;
  exampleTranslation: string;
  category: string;
}

export interface BookMindmapSection {
  id: string;
  name: string;
  description: string;
  categories: { id: string; name: string; color: string }[];
  nodes: BookMindmapNode[];
}

export interface BookMindmapChapter {
  id: number;
  title: string;
  vietnameseTitle: string;
  sections: BookMindmapSection[];
}

export const BOOK_MINDMAPS: BookMindmapChapter[] = [
  eatingChapter,         // id: 1
  drinkingChapter,       // id: 2
  homeChapter,           // id: 3
  leisureChapter,        // id: 4
  blueMondayChapter,     // id: 5
  sportsChapter,         // id: 6
  moodsChapter,          // id: 7
  transportChapter,      // id: 8
  bodyPartsChapter,      // id: 9
  happyHolidaysChapter,  // id: 10
  aboutNumbersChapter,   // id: 11
  loveChapter,           // id: 12
  aboutPeopleChapter,    // id: 13
  makeupChapter,         // id: 14
  animalKingdomChapter,  // id: 15
  natureChapter,         // id: 16
  whatElseChapter        // id: 17
];
