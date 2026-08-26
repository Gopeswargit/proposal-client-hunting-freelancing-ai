import React from "react";
import { GenerationHistory, Language } from "../types";
import { X, Copy, Check, Trash2, Download, History, Sparkles } from "lucide-react";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: GenerationHistory[];
  onClearHistory: () => void;
  onDeleteHistoryItem: (id: string) => void;
  language: Language;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onDeleteHistoryItem,
  language,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (item: GenerationHistory) => {
    const element = document.createElement("a");
    const file = new Blob([item.result], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `${item.toolTitle.replace(/\s+/g, "_")}_${new Date(item.createdAt).toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
      <div
        id="history-drawer"
        className="h-full w-full max-w-md bg-white p-6 shadow-2xl flex flex-col justify-between overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-900">
              {language === "bn" ? "পূর্ববর্তী জেনারেশন হিস্ট্রি" : "Generation History"}
            </h2>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
              {history.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* History List */}
        <div className="my-4 flex-1 overflow-y-auto space-y-4 pr-1">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center text-slate-400">
              <Sparkles className="h-10 w-10 text-slate-300 mb-2" />
              <p className="text-sm">
                {language === "bn" ? "এখনো কোনো জেনারেশন সংরক্ষিত নেই" : "No saved history yet"}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {language === "bn" ? "যেকোনো টুলে কন্টেন্ট বানালে এখানে সেভ হবে" : "Generated content will appear here"}
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-slate-300"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 truncate">
                    {item.toolTitle}
                  </span>
                  <span className="text-[11px] text-slate-400 shrink-0">
                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-600 line-clamp-2 italic">
                  "{item.prompt}"
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-slate-200/60 pt-2.5">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(item.id, item.result)}
                      className="flex items-center gap-1 rounded-md bg-white border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-emerald-700">{language === "bn" ? "কপি হয়েছে" : "Copied"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 text-slate-500" />
                          <span>{language === "bn" ? "কপি" : "Copy"}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDownload(item)}
                      className="flex items-center gap-1 rounded-md bg-white border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                      title={language === "bn" ? "ডাউনলোড টেক্সট" : "Download TXT"}
                    >
                      <Download className="h-3 w-3 text-slate-500" />
                    </button>
                  </div>

                  <button
                    onClick={() => onDeleteHistoryItem(item.id)}
                    className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                    title={language === "bn" ? "মুছে ফেলুন" : "Delete"}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {history.length > 0 && (
          <div className="border-t border-slate-100 pt-3">
            <button
              onClick={onClearHistory}
              className="w-full rounded-xl border border-red-200 bg-red-50/60 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
            >
              {language === "bn" ? "সব হিস্ট্রি মুছে ফেলুন" : "Clear All History"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
