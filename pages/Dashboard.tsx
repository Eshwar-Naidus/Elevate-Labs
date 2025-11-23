import React from 'react';
import { Terminal, Code, Cpu, Database, ChevronRight, Layers } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Introduction Hero */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-3xl font-bold text-slate-800">Internship Project Report</h1>
            <p className="text-slate-600 leading-relaxed">
              This dashboard serves as the interactive submission for the Elevate Labs Internship Phase. 
              Per the guidelines, I have selected and implemented three distinct AI/ML applications 
              demonstrating proficiency in NLP, Data Visualization, and Conversational AI.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wide">React 18</span>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold uppercase tracking-wide">Tailwind CSS</span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold uppercase tracking-wide">Gemini 2.5 Flash</span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold uppercase tracking-wide">TypeScript</span>
            </div>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 min-w-[300px]">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Layers size={18} className="text-blue-600" />
              Selected Projects
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
                AI Virtual Career Counsellor
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">14</span>
                AI Writer & Summarizer
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">3</span>
                Stock Price Trend Prediction
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Expert Consultation Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-900 rounded-lg text-white">
              <Terminal size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Environment & Platform Strategy</h2>
          </div>
          <div className="space-y-4 text-sm text-slate-600">
            <p>
              <strong className="text-slate-800">Development Environment:</strong> While the guidelines are flexible, the industry standard "Optimized Route" uses <span className="font-medium text-blue-600">VS Code</span> as the primary IDE due to its robust extension ecosystem for Python and React. 
            </p>
            <p>
              <strong className="text-slate-800">Docker vs. Local:</strong> For internship scale projects, a <span className="font-medium text-blue-600">Virtual Environment (venv/conda)</span> is sufficient and faster to set up than Docker. However, using Docker ensures reproducibility if deploying to a cloud container service.
            </p>
            <p>
              <strong className="text-slate-800">Deployment:</strong> The PDF suggests Streamlit Cloud or Render. 
              <br/>- <span className="italic">Streamlit Cloud:</span> Best for pure Python data apps (Project 3).
              <br/>- <span className="italic">Vercel/Netlify:</span> Best for this React Frontend.
              <br/>- <span className="italic">Render:</span> Best for the Flask Backend (if implementing full backend).
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Code size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Implementation Frameworks</h2>
          </div>
          <div className="space-y-4 text-sm text-slate-600">
             <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded bg-yellow-50 flex-shrink-0 flex items-center justify-center text-yellow-600">
                   <Cpu size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Machine Learning (Backend)</h4>
                  <p className="mt-1">PyTorch or TensorFlow/Keras are the standards. For NLP tasks (Project 2, 14), <span className="font-medium">Hugging Face Transformers</span> is the modern gold standard over basic NLTK.</p>
                </div>
             </div>
             <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded bg-cyan-50 flex-shrink-0 flex items-center justify-center text-cyan-600">
                   <Database size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Data Handling</h4>
                  <p className="mt-1">Pandas for manipulation. For Project 3 (Stocks), <span className="font-medium">yfinance</span> is the standard API. For this web showcase, we simulate the ML output using Gemini and synthetic data algorithms.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};