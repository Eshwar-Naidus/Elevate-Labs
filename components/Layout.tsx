import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  Menu,
  X
} from 'lucide-react';
import { AppRoute } from '../types';

interface LayoutProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentRoute, onNavigate, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: AppRoute.DASHBOARD, label: 'Overview & Guidance', icon: LayoutDashboard },
    { id: AppRoute.CAREER_COUNSELLOR, label: 'AI Career Counsellor', icon: MessageSquare },
    { id: AppRoute.TEXT_SUMMARIZER, label: 'AI Writer & Summarizer', icon: FileText },
    { id: AppRoute.STOCK_PREDICTOR, label: 'Stock Trend Prediction', icon: TrendingUp },
  ];

  const handleNav = (route: AppRoute) => {
    onNavigate(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-900 text-white shadow-xl">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Elevate Labs
          </h1>
          <p className="text-xs text-slate-400 mt-1">Internship Project Suite</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                currentRoute === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded p-3 text-xs text-slate-400">
            <p className="font-semibold text-slate-300 mb-1">Status: Active</p>
            <p>API Key: Configured</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-slate-900 text-white z-50 flex items-center justify-between p-4 shadow-md">
        <span className="font-bold">Elevate Labs Suite</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900 z-40 pt-20 px-4 md:hidden">
          <nav className="space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-lg text-lg ${
                  currentRoute === item.id ? 'bg-blue-600 text-white' : 'text-slate-300'
                }`}
              >
                <item.icon size={24} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative md:static mt-16 md:mt-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shadow-sm z-10">
          <h2 className="text-lg font-semibold text-slate-800">
            {navItems.find(n => n.id === currentRoute)?.label}
          </h2>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            System Online
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8 relative">
          <div className="max-w-6xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};