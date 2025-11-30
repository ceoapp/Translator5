import React from 'react';
import { Copy, Check } from 'lucide-react';

interface TranslationAreaProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  isLoading?: boolean;
}

export const TranslationArea: React.FC<TranslationAreaProps> = ({
  label,
  value,
  onChange,
  readOnly = false,
  placeholder,
  isLoading = false
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
        <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
          {label}
        </span>
        <div className="flex items-center gap-2">
           {/* Copy Button */}
           {value && (
            <button
              onClick={handleCopy}
              className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-white rounded-md transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          )}
        </div>
      </div>
      
      <div className="relative flex-1">
        {isLoading && readOnly && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10 backdrop-blur-[1px]">
             <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs text-primary-600 font-medium">Translating...</span>
             </div>
          </div>
        )}
        <textarea
          className={`w-full h-full p-4 resize-none outline-none text-lg leading-relaxed bg-transparent text-slate-800 placeholder-slate-300 ${readOnly ? 'cursor-text' : ''}`}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          readOnly={readOnly}
          placeholder={placeholder}
          spellCheck="false"
        />
      </div>
      
      {/* Character count for input */}
      {!readOnly && (
        <div className="px-4 py-2 bg-white border-t border-slate-50 text-right">
          <span className="text-xs text-slate-400 font-medium">
            {value.length} characters
          </span>
        </div>
      )}
    </div>
  );
};