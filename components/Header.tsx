import React from 'react';
import { Languages } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary-600">
          <Languages className="w-8 h-8" />
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Translator5</h1>
        </div>
        <div className="text-sm font-medium text-slate-500">
          English <span className="mx-2 text-slate-300">→</span> Thai
        </div>
      </div>
    </header>
  );
};