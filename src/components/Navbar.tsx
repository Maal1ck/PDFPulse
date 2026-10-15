import React from 'react';
import { FileCheck, Clock, ShieldCheck, Laptop } from 'lucide-react';
import { ToolCategory } from '../types';

interface NavbarProps {
  activeCategory: ToolCategory;
  onSelectCategory: (cat: ToolCategory) => void;
  onOpenHistory: () => void;
  onOpenInstall: () => void;
  historyCount: number;
  onBackToHome: () => void;
  isInsideTool: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenHistory,
  onOpenInstall,
  historyCount,
  onBackToHome,
  isInsideTool,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-sm shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <FileCheck className="w-5 h-5" />
          </div>
          <div className="whitespace-nowrap shrink-0">
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors">
              PDFPulse
            </span>
          </div>
        </button>

        {/* Zone 2: Single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => {
              onBackToHome();
              onSelectCategory('all');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              !isInsideTool && activeCategory === 'all'
                ? 'text-rose-600 border-rose-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            All Tools
          </button>
          <button
            onClick={() => {
              onBackToHome();
              onSelectCategory('organize');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              !isInsideTool && activeCategory === 'organize'
                ? 'text-rose-600 border-rose-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Merge & Split
          </button>
          <button
            onClick={() => {
              onBackToHome();
              onSelectCategory('to-pdf');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              !isInsideTool && activeCategory === 'to-pdf'
                ? 'text-rose-600 border-rose-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Convert to PDF
          </button>
          <button
            onClick={() => {
              onBackToHome();
              onSelectCategory('from-pdf');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              !isInsideTool && activeCategory === 'from-pdf'
                ? 'text-rose-600 border-rose-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Convert from PDF
          </button>
          <button
            onClick={() => {
              onBackToHome();
              onSelectCategory('edit-security');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              !isInsideTool && activeCategory === 'edit-security'
                ? 'text-rose-600 border-rose-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Watermark & Numbers
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="whitespace-nowrap">100% Client-Side Private</span>
          </div>

          <button
            onClick={onOpenInstall}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200/80 rounded-lg hover:bg-rose-100/70 transition-colors shadow-2xs whitespace-nowrap shrink-0 cursor-pointer"
            title="Install PDFPulse as a standalone app on your PC"
          >
            <Laptop className="w-3.5 h-3.5 text-rose-600" />
            <span>Install on PC</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors shadow-2xs whitespace-nowrap shrink-0"
            title="View recent processed files"
          >
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Recent Files</span>
            {historyCount > 0 && (
              <span className="font-mono text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
