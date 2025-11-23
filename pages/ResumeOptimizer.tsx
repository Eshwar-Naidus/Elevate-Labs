import React, { useState, useRef } from 'react';
import { FileBadge, Wand2, CheckCircle, RefreshCcw, LayoutTemplate, Upload, FileText, X } from 'lucide-react';
import { optimizeResume } from '../services/gemini';
import { OptimizationResult } from '../types';

type Theme = 'elegant-green' | 'minimal-pink' | 'vintage-brown';

export const ResumeOptimizer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  
  // File States
  const [softwareFile, setSoftwareFile] = useState<File | null>(null);
  const [coreFile, setCoreFile] = useState<File | null>(null);
  
  // Text Fallback States (if user prefers text)
  const [softwareText, setSoftwareText] = useState('');
  const [coreText, setCoreText] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [activeTheme, setActiveTheme] = useState<Theme>('elegant-green');
  
  const softwareInputRef = useRef<HTMLInputElement>(null);
  const coreInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'software' | 'core') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'software') setSoftwareFile(e.target.files[0]);
      else setCoreFile(e.target.files[0]);
    }
  };

  const handleOptimize = async () => {
    if (!jobDescription.trim()) return;
    
    // Determine input source (File takes precedence, then Text)
    const softInput = softwareFile || softwareText;
    const coreInput = coreFile || coreText;

    if (!softInput || !coreInput) {
      alert("Please provide both Software and Core resumes (either file or text).");
      return;
    }

    setIsProcessing(true);
    const optimized = await optimizeResume(jobDescription, softInput, coreInput);
    setResult(optimized);
    setIsProcessing(false);
  };

  const ThemeSelector = () => (
    <div className="flex gap-2 mb-4 bg-white p-2 rounded-lg shadow-sm border border-slate-100">
      <button 
        onClick={() => setActiveTheme('elegant-green')}
        className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-all ${activeTheme === 'elegant-green' ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200' : 'text-slate-500 hover:bg-slate-50'}`}
      >
        <div className="w-4 h-4 rounded-full bg-emerald-700"></div> Elegant Green
      </button>
      <button 
        onClick={() => setActiveTheme('minimal-pink')}
        className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-all ${activeTheme === 'minimal-pink' ? 'bg-pink-50 text-pink-700 font-bold border border-pink-200' : 'text-slate-500 hover:bg-slate-50'}`}
      >
        <div className="w-4 h-4 rounded-full bg-pink-400"></div> Minimal Pink
      </button>
      <button 
        onClick={() => setActiveTheme('vintage-brown')}
        className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-all ${activeTheme === 'vintage-brown' ? 'bg-amber-50 text-amber-800 font-bold border border-amber-200' : 'text-slate-500 hover:bg-slate-50'}`}
      >
        <div className="w-4 h-4 rounded-full bg-amber-800"></div> Vintage Brown
      </button>
    </div>
  );

  const FileUploader = ({ 
    label, 
    file, 
    setFile, 
    text, 
    setText, 
    inputRef 
  }: { 
    label: string, 
    file: File | null, 
    setFile: (f: File | null) => void,
    text: string,
    setText: (s: string) => void,
    inputRef: React.RefObject<HTMLInputElement | null>
  }) => (
    <div className="mb-4">
      <p className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">{label}</p>
      
      {!file ? (
        <div className="space-y-2">
          {/* Upload Box */}
          <div 
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-blue-400 cursor-pointer transition-colors"
          >
            <Upload size={20} className="mb-1"/>
            <span className="text-xs">Click to upload PDF/Image</span>
          </div>
          
          {/* Text Fallback Toggle */}
          {text.length > 0 ? (
             <textarea
               className="w-full h-20 p-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
               value={text}
               onChange={(e) => setText(e.target.value)}
               placeholder="Or paste text content..."
             />
          ) : (
            <button 
              onClick={() => setText(' ')} 
              className="text-[10px] text-blue-600 hover:underline pl-1"
            >
              Or paste text manually
            </button>
          )}
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <FileText size={16} className="text-blue-600 flex-shrink-0" />
            <span className="text-xs font-medium text-blue-800 truncate max-w-[150px]">{file.name}</span>
          </div>
          <button 
            onClick={() => { setFile(null); if (inputRef.current) inputRef.current.value = ''; }}
            className="text-blue-400 hover:text-blue-700"
          >
            <X size={16} />
          </button>
        </div>
      )}
      
      <input 
        type="file" 
        ref={inputRef} 
        className="hidden" 
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => {
           if (e.target.files?.[0]) setFile(e.target.files[0]);
        }}
      />
    </div>
  );

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 overflow-hidden">
      {/* LEFT COLUMN: Inputs */}
      <div className="w-full md:w-1/3 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
        
        {/* Job Description */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
           <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
             <LayoutTemplate size={18} className="text-blue-600"/> 
             1. Job Description
           </h3>
           <textarea
             className="w-full h-24 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
             placeholder="Paste the Job Description here..."
             value={jobDescription}
             onChange={(e) => setJobDescription(e.target.value)}
           />
        </div>

        {/* Resumes Upload */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-1 flex flex-col">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
             <FileBadge size={18} className="text-purple-600"/> 
             2. Upload Your Resumes
           </h3>
           
           <FileUploader 
             label="Software Resume" 
             file={softwareFile} 
             setFile={setSoftwareFile}
             text={softwareText}
             setText={setSoftwareText}
             inputRef={softwareInputRef}
           />

           <FileUploader 
             label="Core Electrical Resume" 
             file={coreFile} 
             setFile={setCoreFile}
             text={coreText}
             setText={setCoreText}
             inputRef={coreInputRef}
           />
           
           <button
             onClick={handleOptimize}
             disabled={isProcessing || !jobDescription || (!softwareFile && !softwareText)}
             className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
           >
             {isProcessing ? <RefreshCcw className="animate-spin" size={20}/> : <Wand2 size={20}/>}
             {isProcessing ? 'Analyzing & Optimizing...' : 'Generate Tailored Resume'}
           </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Preview */}
      <div className="w-full md:w-2/3 flex flex-col bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden relative">
        <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center shadow-sm z-10">
          <h3 className="font-bold text-slate-700">Preview Canvas</h3>
          {result && (
             <div className="flex items-center gap-2 text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
               <CheckCircle size={14} /> Selected: {result.selectedResumeType}
             </div>
          )}
        </div>
        
        <div className="p-4 bg-slate-200/50 flex-1 overflow-y-auto flex flex-col items-center">
          <ThemeSelector />
          
          {result ? (
            <div className={`
              w-full max-w-[210mm] min-h-[297mm] bg-white shadow-2xl transition-all duration-500
              ${activeTheme === 'elegant-green' ? 'font-serif text-slate-900' : ''}
              ${activeTheme === 'minimal-pink' ? 'font-sans text-slate-800' : ''}
              ${activeTheme === 'vintage-brown' ? 'bg-[#fdfbf7] text-[#4a3b32]' : ''}
            `}>
              {/* RESUME CONTENT RENDERER */}
              
              {/* HEADER */}
              <div className={`
                p-10 
                ${activeTheme === 'elegant-green' ? 'bg-[#1a4a3e] text-white' : ''}
                ${activeTheme === 'minimal-pink' ? 'bg-white text-slate-900 border-b-4 border-pink-400' : ''}
                ${activeTheme === 'vintage-brown' ? 'border-b-2 border-[#8c7b70] pb-6' : ''}
              `}>
                <h1 className={`text-4xl uppercase tracking-wider mb-2 ${activeTheme === 'elegant-green' ? 'font-serif' : 'font-bold'}`}>
                  {result.content.fullName}
                </h1>
                <p className={`text-lg opacity-90 ${activeTheme === 'minimal-pink' ? 'text-pink-600 font-medium' : ''}`}>
                  {result.content.title}
                </p>
                <div className={`text-sm mt-4 opacity-80 flex flex-wrap gap-4`}>
                  {result.content.contactInfo}
                </div>
              </div>

              {/* BODY */}
              <div className="p-10 grid gap-8">
                
                {/* SUMMARY */}
                <section>
                  <h2 className={`
                    text-sm font-bold uppercase tracking-widest mb-3 border-b pb-1
                    ${activeTheme === 'elegant-green' ? 'text-[#1a4a3e] border-[#1a4a3e]' : ''}
                    ${activeTheme === 'minimal-pink' ? 'text-pink-500 border-pink-200' : ''}
                    ${activeTheme === 'vintage-brown' ? 'text-[#8c7b70] border-[#d6cfc7]' : ''}
                  `}>Professional Profile</h2>
                  <p className="leading-relaxed text-sm">{result.content.summary}</p>
                </section>

                {/* SKILLS */}
                <section>
                   <h2 className={`
                    text-sm font-bold uppercase tracking-widest mb-3 border-b pb-1
                    ${activeTheme === 'elegant-green' ? 'text-[#1a4a3e] border-[#1a4a3e]' : ''}
                    ${activeTheme === 'minimal-pink' ? 'text-pink-500 border-pink-200' : ''}
                    ${activeTheme === 'vintage-brown' ? 'text-[#8c7b70] border-[#d6cfc7]' : ''}
                  `}>Core Competencies</h2>
                  <div className="flex flex-wrap gap-2">
                    {result.content.skills.map((skill, i) => (
                      <span key={i} className={`
                        px-2 py-1 text-xs font-semibold
                        ${activeTheme === 'elegant-green' ? 'bg-[#e8f3f0] text-[#1a4a3e]' : ''}
                        ${activeTheme === 'minimal-pink' ? 'bg-pink-50 text-pink-700 rounded' : ''}
                        ${activeTheme === 'vintage-brown' ? 'border border-[#8c7b70] text-[#4a3b32]' : ''}
                      `}>{skill}</span>
                    ))}
                  </div>
                </section>

                {/* EXPERIENCE */}
                <section>
                  <h2 className={`
                    text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1
                    ${activeTheme === 'elegant-green' ? 'text-[#1a4a3e] border-[#1a4a3e]' : ''}
                    ${activeTheme === 'minimal-pink' ? 'text-pink-500 border-pink-200' : ''}
                    ${activeTheme === 'vintage-brown' ? 'text-[#8c7b70] border-[#d6cfc7]' : ''}
                  `}>Experience</h2>
                  <div className="space-y-6">
                    {result.content.experience.map((exp, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-lg">{exp.role}</h3>
                          <span className="text-sm opacity-70 italic">{exp.duration}</span>
                        </div>
                        <p className={`text-sm mb-2 font-medium ${activeTheme === 'elegant-green' ? 'text-[#1a4a3e]' : 'text-slate-600'}`}>{exp.company}</p>
                        <ul className="list-disc ml-4 space-y-1 text-sm opacity-90 marker:opacity-50">
                          {exp.points.map((pt, j) => (
                            <li key={j}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* PROJECTS */}
                <section>
                  <h2 className={`
                    text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1
                    ${activeTheme === 'elegant-green' ? 'text-[#1a4a3e] border-[#1a4a3e]' : ''}
                    ${activeTheme === 'minimal-pink' ? 'text-pink-500 border-pink-200' : ''}
                    ${activeTheme === 'vintage-brown' ? 'text-[#8c7b70] border-[#d6cfc7]' : ''}
                  `}>Key Projects</h2>
                  <div className="grid gap-4">
                    {result.content.projects.map((proj, i) => (
                      <div key={i} className="bg-opacity-50 p-3 rounded bg-black/5">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-bold text-sm">{proj.name}</h3>
                          <span className="text-[10px] uppercase tracking-wide opacity-70">{proj.techStack}</span>
                        </div>
                        <p className="text-sm opacity-80">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                 {/* EDUCATION */}
                 <section>
                  <h2 className={`
                    text-sm font-bold uppercase tracking-widest mb-3 border-b pb-1
                    ${activeTheme === 'elegant-green' ? 'text-[#1a4a3e] border-[#1a4a3e]' : ''}
                    ${activeTheme === 'minimal-pink' ? 'text-pink-500 border-pink-200' : ''}
                    ${activeTheme === 'vintage-brown' ? 'text-[#8c7b70] border-[#d6cfc7]' : ''}
                  `}>Education</h2>
                  <div className="space-y-2">
                    {result.content.education.map((edu, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <div>
                          <span className="font-bold block">{edu.degree}</span>
                          <span className="opacity-80">{edu.institution}</span>
                        </div>
                        <span className="opacity-70">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[500px] text-slate-400">
               <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                 <LayoutTemplate size={32} />
               </div>
               <p className="font-medium">Waiting for Input...</p>
               <p className="text-sm">Upload resumes and job description to generate.</p>
            </div>
          )}
          <div className="h-10"></div>
        </div>
      </div>
    </div>
  );
};