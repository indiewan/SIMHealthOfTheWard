import React, { useState, useEffect, useRef } from 'react';
import { Lock, X, KeyRound, AlertCircle } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prompt specifies: "prompted for a password which will be 'Admin'"
    if (password === 'Admin' || password === 'admin') {
      setError(false);
      onSuccess();
      onClose();
    } else {
      setError(true);
      inputRef.current?.select();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-300 w-full max-w-md overflow-hidden text-slate-800">
        {/* Modal Header */}
        <div className="bg-[#044b70] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-sky-200" />
            <h3 className="font-bold text-base tracking-wide">
              Wardview Mode Authorization
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            Please enter the administrator password to unlock <span className="font-semibold text-slate-900">Edit Mode</span> and modify simulated patient allocations and clinical symbols.
          </p>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Enter password..."
                className={`w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-hidden focus:ring-2 transition-all ${
                  error
                    ? 'border-red-500 focus:ring-red-300 bg-red-50/50'
                    : 'border-slate-300 focus:ring-[#044b70]/40 focus:border-[#044b70]'
                }`}
              />
            </div>
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Incorrect password. (Password is <strong className="font-bold">Admin</strong>)</span>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#044b70] hover:bg-[#033b58] active:bg-[#022c42] rounded-md shadow-xs transition-colors cursor-pointer"
            >
              Unlock Edit Mode
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
