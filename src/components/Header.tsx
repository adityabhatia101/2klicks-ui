import React from 'react';
import { FileSpreadsheet, Zap, Shield, Cpu } from 'lucide-react';

interface HeaderProps {
  mounted: boolean;
}

const Header: React.FC<HeaderProps> = ({ mounted }) => {
  const features = [
    { icon: Zap, text: 'Fast Processing', color: 'from-yellow-400 to-orange-500' },
    { icon: Shield, text: 'Secure', color: 'from-green-400 to-emerald-500' },
    { icon: Cpu, text: 'Automated', color: 'from-blue-400 to-indigo-500' }
  ];

  return (
    <div className={`text-center mb-12 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl mb-6 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl"></div>
        <FileSpreadsheet className="w-10 h-10 text-white relative z-10" />
      </div>
      <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-4">
        2Klicks Transformer System
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
        Upload your <span className="font-semibold text-blue-600">ECC extracted file</span> and{' '}
        <span className="font-semibold text-indigo-600">S/4HANA target file</span> to perform enterprise-grade data transformation.{' '}
        Our system will process your files and generate optimized output for seamless migration.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {features.map((feature, index) => (
          <div 
            key={feature.text}
            className={`group flex items-center space-x-3 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/50 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            style={{ transitionDelay: `${400 + index * 100}ms` }}
          >
            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200`}>
              <feature.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-700 text-sm font-medium">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;