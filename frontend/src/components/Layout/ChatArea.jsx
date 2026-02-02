import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatArea({ messages, loading, onSend }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (messages.length === 0) {
      const sampleQuestions = [
          "What helps reduce joint stiffness and pain?",
          "How can sciatic pain be managed naturally?",
          "What helps relieve neck and shoulder tension?",
          "How can muscle soreness be reduced at home?",
          "What helps with burning or tingling nerve pain?",
          "How can leg or foot nerve pain be eased naturally?",
          "What helps reduce body pain in daily life?"
      ];

      return (
          <div className="flex-1 flex flex-col items-center text-center p-4 md:p-8 opacity-90 animate-fadeIn min-h-0 overflow-y-auto">
             <div className="w-full max-w-4xl my-auto flex flex-col items-center">
                 <div className="text-6xl mb-6 grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-110 cursor-pointer p-4 pb-0 leading-normal">🩺</div>
                 <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500 mb-3 px-4">Lumina Health Assistant</h3>
                 <p className="text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed mb-6 px-4 text-sm md:text-base">
                    Your AI companion for medical insights and health advice. 
                    Ask me anything about symptoms, treatments, or general wellness.
                 </p>

                 <div className="mb-8 px-4 py-2.5 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg text-xs md:text-sm text-amber-800 dark:text-amber-200 max-w-md mx-auto flex items-center gap-2">
                    <span className="text-base">⚠️</span>
                    <span>This AI provides home-based, general information only and is not a substitute for professional medical advice. <Link to="/disclaimer" className="underline hover:text-amber-900 dark:hover:text-amber-100 transition-colors">Read full disclaimer.</Link></span>
                 </div>
    
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full px-2">
                    {sampleQuestions.map((q, idx) => (
                        <button 
                            key={idx}
                            onClick={() => onSend && onSend(q)}
                            className="px-4 py-3 bg-white dark:bg-[#1E1F2E] border border-gray-200 dark:border-white/5 rounded-xl text-sm text-slate-700 dark:text-slate-300 hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 shadow-sm hover:shadow-md text-left"
                        >
                            {q}
                        </button>
                    ))}
                 </div>
             </div>
          </div>
      )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth custom-scrollbar min-h-0">
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}>
          <div className={`flex max-w-[90%] md:max-w-[70%] gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
             
             {/* Avatar */}
             <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs border border-gray-200 dark:border-white/10 shadow-sm ${msg.role === 'ai' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white'}`}>
                {msg.role === 'ai' ? '✨' : '👤'}
             </div>

             {/* BUBBLE */}
            <div className={`relative px-6 py-4 rounded-2xl shadow-md text-[0.95rem] leading-relaxed transition-colors duration-300 ${
                 msg.role === 'user' 
                 ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-tr-sm' 
                 : 'bg-white dark:bg-[#1E1F2E] border border-gray-200 dark:border-white/5 text-slate-800 dark:text-slate-200 rounded-tl-sm'
             }`}>
                {msg.role === 'user' ? (
                  msg.content
                ) : (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 mb-3 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-5 mb-3 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="pl-1" {...props} />,
                      p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-indigo-700 dark:text-indigo-300" {...props} />,
                      a: ({node, ...props}) => <a className="text-blue-500 hover:text-blue-600 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                      h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-3 mt-4" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-2 mt-4" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-md font-bold mb-2 mt-3" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-indigo-400 pl-4 italic my-3 opacity-80" {...props} />,
                      code: ({node, inline, ...props}) => 
                        inline 
                          ? <code className="bg-black/10 dark:bg-white/10 rounded px-1 py-0.5 text-[0.9em] font-mono" {...props} />
                          : <pre className="bg-black/5 dark:bg-white/5 rounded-lg p-3 overflow-x-auto my-3 text-sm font-mono"><code {...props} /></pre>,
                      hr: ({node, ...props}) => <hr className="my-4 border-black/10 dark:border-white/10" {...props} />,
                      table: ({node, ...props}) => <div className="overflow-x-auto my-4"><table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg" {...props} /></div>,
                      th: ({node, ...props}) => <th className="px-3 py-2 bg-gray-50 dark:bg-white/5 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" {...props} />,
                      td: ({node, ...props}) => <td className="px-3 py-2 whitespace-nowrap text-sm border-t border-gray-100 dark:border-gray-800" {...props} />,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                )}
             </div>
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex w-full justify-start animate-pulse">
             <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center border border-gray-200 dark:border-white/10 text-indigo-600 dark:text-indigo-300">✨</div>
                 <div className="bg-white dark:bg-[#1E1F2E] border border-gray-200 dark:border-white/5 px-6 py-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce delay-150"></span>
                 </div>
             </div>
        </div>
      )}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
