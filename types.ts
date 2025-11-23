export enum AppRoute {
  DASHBOARD = 'dashboard',
  CAREER_COUNSELLOR = 'career_counsellor',
  TEXT_SUMMARIZER = 'text_summarizer',
  STOCK_PREDICTOR = 'stock_predictor',
  RESUME_OPTIMIZER = 'resume_optimizer'
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

export interface OptimizationResult {
  selectedResumeType: 'Software' | 'Core';
  content: {
    fullName: string;
    title: string;
    contactInfo: string;
    summary: string;
    skills: string[];
    experience: {
      role: string;
      company: string;
      duration: string;
      points: string[];
    }[];
    projects: {
      name: string;
      techStack: string;
      description: string;
    }[];
    education: {
      degree: string;
      institution: string;
      year: string;
    }[];
  };
}