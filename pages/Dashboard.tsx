import React from 'react';
import { MessageSquare, FileText, TrendingUp, Code, Database, Cpu } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Introduction Hero */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-slate-800">Elevate Lab Internship Report</h1>
          <p className="text-slate-600 leading-relaxed text-lg">
            This dashboard serves as the definitive submission for the Elevate Lab Internship. 
            It exclusively showcases the three core required AI modules, demonstrating applied skills in NLP, Content Generation, and Data Intelligence.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold uppercase tracking-wide">React 18</span>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold uppercase tracking-wide">Gemini 2.5 Flash</span>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold uppercase tracking-wide">TypeScript</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Project 1 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-blue-600 p-4 flex items-center gap-3 text-white">
            <MessageSquare size={24} />
            <h2 className="text-xl font-bold">Project 1: AI Career Counsellor</h2>
            <span className="ml-auto text-xs bg-blue-700 px-3 py-1 rounded-full border border-blue-400">NLP Chatbot</span>
          </div>
          <div className="p-6 grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Objective</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                To engineer an intelligent conversational agent capable of assessing a user's unique profile—skills, education, and interests—to generate personalized career recommendations.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Advantages</h4>
              <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                <li>Delivers instant, bias-free career guidance 24/7.</li>
                <li>Helps users discover roles they may not have considered.</li>
                <li>Scalable tool for educational institutions to support student planning.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Implementing Procedure</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                We utilized the <strong>Gemini 2.5 Flash API</strong> with a sophisticated "System Instruction" to enforce a professional counsellor persona. The React frontend manages chat state and history, allowing the model to remember context across multiple turns of conversation.
              </p>
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-indigo-600 p-4 flex items-center gap-3 text-white">
            <FileText size={24} />
            <h2 className="text-xl font-bold">Project 2: AI Writer & Summarizer</h2>
            <span className="ml-auto text-xs bg-indigo-700 px-3 py-1 rounded-full border border-indigo-400">Content Gen</span>
          </div>
          <div className="p-6 grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Objective</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                To build a productivity tool that leverages Large Language Models (LLMs) to condense extensive documents into concise summaries, facilitating faster information consumption.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Advantages</h4>
              <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                <li>Drastically reduces time spent reading long reports.</li>
                <li>Extracts core value and key points without losing context.</li>
                <li>Supports variable summary lengths (Short/Medium/Long) for flexibility.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Implementing Procedure</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                The application sends user input text and a selected length parameter to the AI model. We optimized the prompt structure to prioritize "information density" and rendering in Markdown for clean, readable output.
              </p>
            </div>
          </div>
        </div>

        {/* Project 3 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-emerald-600 p-4 flex items-center gap-3 text-white">
            <TrendingUp size={24} />
            <h2 className="text-xl font-bold">Project 3: Stock Trend Prediction</h2>
            <span className="ml-auto text-xs bg-emerald-700 px-3 py-1 rounded-full border border-emerald-400">Data Vis + AI</span>
          </div>
          <div className="p-6 grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Objective</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                To create a hybrid financial tool that combines quantitative data visualization with qualitative sentiment analysis, bridging the gap between raw numbers and market meaning.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Advantages</h4>
              <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                <li>Visualizes complex time-series data using interactive charts.</li>
                <li>Provides real-time "Bullish/Bearish" sentiment analysis on news.</li>
                <li>Demonstrates the power of multimodal AI in finance.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Implementing Procedure</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                This module integrates the <strong>Recharts</strong> library for simulating LSTM prediction curves. A separate AI pipeline analyzes news headlines entered by the user to determine market sentiment, updating the UI asynchronously.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Overview */}
      <div className="bg-slate-900 rounded-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6">Technical Architecture</h3>
        <div className="grid md:grid-cols-3 gap-8">
           <div className="space-y-3">
             <div className="flex items-center gap-2 text-blue-400 font-semibold">
               <Code size={20} /> Frontend Layer
             </div>
             <p className="text-sm text-slate-400">
               Built with React.js and Tailwind CSS for a responsive, modern UI. State management is handled via React Hooks to ensure real-time updates during AI streaming.
             </p>
           </div>
           <div className="space-y-3">
             <div className="flex items-center gap-2 text-indigo-400 font-semibold">
               <Cpu size={20} /> AI Integration Layer
             </div>
             <p className="text-sm text-slate-400">
               Direct integration with Google's Gemini 2.5 Flash model via the <code>@google/genai</code> SDK. This layer handles prompt engineering, context management, and error handling.
             </p>
           </div>
           <div className="space-y-3">
             <div className="flex items-center gap-2 text-emerald-400 font-semibold">
               <Database size={20} /> Data Layer
             </div>
             <p className="text-sm text-slate-400">
               While currently using mock data for demonstration purposes, the architecture allows for swapping in real endpoints (e.g., yfinance) without significant frontend refactoring.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};
