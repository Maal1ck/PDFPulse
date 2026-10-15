import React, { useState } from 'react';
import {
  X,
  Laptop,
  Download,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Monitor,
  Flame,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'pwa' | 'exe'>('pwa');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      onClose();
    }
  };

  const copyBuildScript = () => {
    const script = `# 1. Install Electron packaging tools\nnpm install -D electron electron-builder\n\n# 2. Build the Windows executable (.exe)\nnpm run electron:build`;
    navigator.clipboard.writeText(script);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-xl border border-slate-200">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-sm">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Install PDFPulse on Your PC</h3>
                <p className="text-xs text-slate-500">Run as a standalone desktop app with offline support</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="p-2 bg-slate-100 flex items-center gap-1.5 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('pwa')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'pwa'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Direct PC Install (Instant)</span>
            </button>
            <button
              onClick={() => setActiveTab('exe')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'exe'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Package as Native .EXE</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'pwa' ? (
              <div className="space-y-5">
                {isInstalled ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-emerald-900">Already Installed!</div>
                      <div className="text-xs text-emerald-700 mt-0.5">
                        PDFPulse is running in standalone desktop mode on your PC.
                      </div>
                    </div>
                  </div>
                ) : isInstallable ? (
                  <div className="text-center p-6 bg-rose-50/50 border border-rose-200 rounded-2xl">
                    <div className="text-sm font-bold text-slate-900 mb-1">
                      Ready to install in 1 click
                    </div>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto mb-4">
                      Installs a native shortcut to your desktop, taskbar, and Start menu.
                      Runs in its own window without browser bars and works 100% offline.
                    </p>
                    <button
                      onClick={handleInstallClick}
                      className="px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 rounded-xl shadow-md shadow-rose-600/20 hover:shadow-lg transition-all flex items-center gap-2 mx-auto cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Install PDFPulse App</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-xs text-slate-600 leading-relaxed">
                      You can install this app directly from your browser in 5 seconds without downloading installer files:
                    </div>

                    {/* Step by step for Chrome / Edge */}
                    <div className="space-y-3">
                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                        <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center shrink-0">
                          1
                        </div>
                        <div className="text-xs text-slate-700">
                          <strong className="text-slate-900">In Google Chrome or Microsoft Edge:</strong>
                          <br />
                          Look at the right side of the URL address bar at the top of your screen.
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                        <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center shrink-0">
                          2
                        </div>
                        <div className="text-xs text-slate-700">
                          Click the <strong className="text-slate-900">Install icon</strong> (computer monitor with downward arrow) or open the browser menu <strong className="text-slate-900">(⋮) &rarr; "Install PDFPulse"</strong>.
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                        <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center shrink-0">
                          3
                        </div>
                        <div className="text-xs text-slate-700">
                          Click <strong className="text-slate-900">"Install"</strong> in the popup prompt. Windows will place a shortcut on your Desktop and pin it to your Start menu!
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    No administrator permissions or virus scanner warnings required. All PDF processing happens 100% locally.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-left">
                <div className="text-xs text-slate-600 leading-relaxed">
                  If you prefer a compiled standalone <strong>.exe installer</strong> (using Electron) to run without opening any browser:
                </div>

                <div className="relative p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto">
                  <button
                    onClick={copyBuildScript}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                    title="Copy command"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                  <pre className="pr-16 text-slate-200 font-mono text-[11px] leading-relaxed">
{`# 1. Install packaging tools
npm install -D electron electron-builder

# 2. Compile into a Windows .exe installer
npm run electron:build`}
                  </pre>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="font-semibold text-slate-800">What happens:</div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Vite builds the production bundle into <code className="bg-slate-100 px-1 py-0.5 rounded text-rose-600">dist/</code>.</li>
                    <li>Electron packages it with the included <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">electron/main.cjs</code>.</li>
                    <li>You will get an installable setup file: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">dist/PDFPulse Setup.exe</code>.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200/70 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
