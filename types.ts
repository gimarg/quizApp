export type Question = {
  id: string | number;
  question: string;
  options: string[];
  answer: number;
  info: string;
};

export type CategoryData = {
  category: string;
  questions: Question[];
};
