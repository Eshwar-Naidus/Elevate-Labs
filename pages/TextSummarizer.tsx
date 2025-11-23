import React, { useState } from 'react';
import { FileText, AlignLeft, Check, Clipboard, RefreshCw, BarChart2 } from 'lucide-react';
import { summarizeText } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

export const TextSummarizer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [metrics, setMetrics] = useState<{ wordCount: number, readingTime: number } | null>(null);

  const handleSummarize = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    setSummary(''); 

    const result = await summarizeText(inputText, length);
    
    setSummary(result);
    setMetrics({
      wordCount: inputText.trim().split(/\s+/).length,
      readingTime: Math.ceil(inputText.trim().split(/\s+/).length / 200)
    });
    setIsProcessing(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 h-full">
      {/* Input Section */}
      <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-semibold text-slate-700 flex items-center gap-2">
            <FileText size={18} className="text-blue-500" />
            Source Text
          </h3>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Project #14</span>
        </div>
        <div className="flex-1 p-4">
          <textarea
            className="w-full h-full resize-none p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 placeholder:text-slate-400 text-sm leading-relaxed"
            placeholder="Paste your article, report, or essay here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
            {(['short', 'medium', 'long'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLength(l)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${
                  length === l 
                    ? 'bg-white text-blue-700 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={handleSummarize}
            disabled={!inputText.trim() || isProcessing}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? <RefreshCw size={16} className="animate-spin" /> : <AlignLeft size={16} />}
            {isProcessing ? 'Processing...' : 'Summarize'}
          </button>
        </div>
      </div>

      {/* Output Section */}
      <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-indigo-50">
          <h3 className="font-semibold text-indigo-900 flex items-center gap-2">
            <Check size={18} className="text-indigo-600" />
            AI Summary
          </h3>
          {metrics && (
             <div className="flex items-center gap-4 text-xs text-indigo-600 font-medium">
                <span className="flex items-center gap-1"><BarChart2 size={12}/> {metrics.wordCount} words src</span>
             </div>
          )}
        </div>
        <div className="flex-1 p-6 overflow-y-auto bg-white relative">
          {!summary && !isProcessing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
              <FileText size={48} className="mb-4 opacity-20" />
              <p>Summary will appear here</p>
            </div>
          )}
          
          {isProcessing && (
             <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                <div className="h-4 bg-slate-100 rounded w-4/6"></div>
             </div>
          )}

          {summary && (
            <div className="prose prose-slate prose-sm max-w-none">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          )}
        </div>
        {summary && (
          <div className="p-4 border-t border-slate-100 flex justify-end">
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              <Clipboard size={16} />
              Copy Text
            </button>
          </div>
        )}
      </div>
    </div>
  );
};