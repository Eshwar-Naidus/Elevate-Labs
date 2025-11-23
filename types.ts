export enum AppRoute {
  DASHBOARD = 'dashboard',
  CAREER_COUNSELLOR = 'career_counsellor',
  TEXT_SUMMARIZER = 'text_summarizer',
  STOCK_PREDICTOR = 'stock_predictor'
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface StockDataPoint {
  date: string;
  actual: number;
  predicted: number;
}

export interface SummaryResult {
  originalText: string;
  summary: string;
  wordCount: number;
  reductionPercentage: number;
}