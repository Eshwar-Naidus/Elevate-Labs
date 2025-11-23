import React, { useState, useRef } from 'react';
import { FileText, AlignLeft, Check, Clipboard, RefreshCw, BarChart2, Upload, X } from 'lucide-react';
import { summarizeText } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

export const TextSummarizer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [summary, setSummary] = useState('');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [metrics, setMetrics] = useState<{ wordCount: number, readingTime: number } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSummarize = async () => {
    if (!inputText.trim() && !selectedFile) return;

    setIsProcessing(true);
    setSummary(''); 

    // Determine input source (File takes priority for simplicity in this demo, or we could combine)
    const input = selectedFile || inputText;

    const result = await summarizeText(input, length);
    
    setSummary(result);
    
    // Metrics are approximate for files
    const wordCount = selectedFile 
      ? "N/A (File)" 
      : inputText.trim().split(/\s+/).length;
      
    setMetrics({
      wordCount: typeof wordCount === 'number' ? wordCount : 0,
      readingTime: typeof wordCount === 'number' ? Math.ceil(wordCount / 200) : 1
    });
    setIsProcessing(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 h-full">
      {/* Input Section */}
      <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-semibold text-slate-700 flex items-center gap-2">
            <FileText size={18} className="text-blue-500" />
            Source Content
          </h3>
          <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Project #14</span>
        </div>
        
        <div className="flex-1 p-4 flex flex-col">
          {/* File Upload Area */}
          <div className="mb-4">
             {!selectedFile ? (
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-blue-400 cursor-pointer transition-all"
               >
                 <Upload size={24} className="mb-2"/>
                 <span className="text-sm font-medium">Drop PDF, JPG, PNG here</span>
                 <span className="text-xs opacity-70">or click to browse</span>
               </div>
             ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <FileText size={20}/>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{selectedFile.name}</p>
                      <p className="text-xs text-slate-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setSelectedFile(null); if(fileInputRef.current) fileInputRef.current.value=''; }}
                    className="p-2 hover:bg-blue-100 rounded-full text-slate-500 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
             )}
             <input 
               type="file" 
               ref={fileInputRef} 
               onChange={handleFileChange} 
               className="hidden" 
               accept=".pdf,.jpg,.jpeg,.png,.txt"
             />
          </div>

          <div className="relative flex items-center gap-4 mb-4">
             <div className="flex-1 h-px bg-slate-100"></div>
             <span className="text-xs text-slate-400 font-medium">OR TYPE TEXT</span>
             <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          <textarea
            className={`w-full flex-1 resize-none p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 placeholder:text-slate-400 text-sm leading-relaxed transition-opacity ${selectedFile ? 'opacity-50 pointer-events-none' : ''}`}
            placeholder={selectedFile ? "File selected. Remove file to type text." : "Paste your article, report, or essay here..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={!!selectedFile}
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
            disabled={(!inputText.trim() && !selectedFile) || isProcessing}
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
          {metrics && metrics.wordCount > 0 && (
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