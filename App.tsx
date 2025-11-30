import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TranslationArea } from './components/TranslationArea';
import { translateEngToThai } from './services/geminiService';
import { ArrowRight, ArrowDown, Sparkles, AlertCircle } from 'lucide-react';
import { TranslationStatus } from './types';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [status, setStatus] = useState<TranslationStatus>(TranslationStatus.IDLE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleTranslate = useCallback(async () => {
    if (!inputText.trim()) return;

    setStatus(TranslationStatus.LOADING);
    setErrorMsg(null);

    try {
      const result = await translateEngToThai(inputText);
      setTranslatedText(result);
      setStatus(TranslationStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : "An unexpected error occurred.");
      setStatus(TranslationStatus.ERROR);
    }
  }, [inputText]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleTranslate();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 flex flex-col gap-6">
        
        {/* Intro / Instructions */}
        <div className="text-center md:text-left mb-2">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Translate English to Thai
          </h2>
          <p className="text-slate-500">
            Enter your text below and let our AI handle the nuances of the Thai language.
          </p>
        </div>

        {/* Error Message */}
        {status === TranslationStatus.ERROR && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 text-sm font-medium">{errorMsg}</div>
            <button 
              onClick={() => setStatus(TranslationStatus.IDLE)}
              className="text-red-500 hover:text-red-700 font-semibold text-sm"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Translation Area Container */}
        <div className="flex flex-col md:flex-row gap-4 h-[500px] md:h-[400px]">
          {/* Input Side */}
          <div className="flex-1 h-full" onKeyDown={handleKeyDown}>
            <TranslationArea
              label="English"
              value={inputText}
              onChange={setInputText}
              placeholder="Type or paste English text here..."
            />
          </div>

          {/* Action Area (Desktop: Center Column, Mobile: Middle Row) */}
          <div className="flex md:flex-col items-center justify-center gap-4 shrink-0">
             <div className="hidden md:flex flex-col items-center justify-center h-full gap-2">
                 <div className="h-px bg-slate-200 w-full flex-1 mx-auto my-2 w-0.5 h-full"></div>
                 <div className="p-2 rounded-full bg-white border border-slate-200 text-slate-400 shadow-sm">
                    <ArrowRight size={20} />
                 </div>
                 <div className="h-px bg-slate-200 w-full flex-1 mx-auto my-2 w-0.5 h-full"></div>
             </div>
             <div className="md:hidden w-full flex items-center justify-center py-2">
                <ArrowDown size={24} className="text-slate-300" />
             </div>
          </div>

          {/* Output Side */}
          <div className="flex-1 h-full">
            <TranslationArea
              label="Thai"
              value={translatedText}
              readOnly={true}
              placeholder="Translation will appear here..."
              isLoading={status === TranslationStatus.LOADING}
            />
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="flex justify-end pt-2 sticky bottom-6 z-20 md:static">
          <button
            onClick={handleTranslate}
            disabled={!inputText.trim() || status === TranslationStatus.LOADING}
            className={`
              flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white shadow-lg shadow-primary-500/30 transition-all transform active:scale-95
              ${(!inputText.trim() || status === TranslationStatus.LOADING) 
                ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                : 'bg-primary-600 hover:bg-primary-700 hover:-translate-y-0.5'
              }
            `}
          >
            {status === TranslationStatus.LOADING ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Translating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Translate</span>
              </>
            )}
          </button>
        </div>

        {/* Keyboard shortcut hint */}
        <div className="text-center md:text-right text-xs text-slate-400 mt-[-10px] md:mt-0">
           Press <kbd className="font-mono bg-slate-100 border border-slate-300 rounded px-1 py-0.5 text-slate-500">Cmd/Ctrl + Enter</kbd> to translate
        </div>

      </main>
    </div>
  );
}