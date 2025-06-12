import React from 'react';
import { FileSpreadsheet, Zap, Shield, Cpu } from 'lucide-react';

interface HeaderProps {
  mounted: boolean;
}

const Header: React.FC<HeaderProps> = ({ mounted }) => {
  const features = [
    { icon: Zap, text: 'Fast Processing' },
    { icon: Shield, text: 'Secure' },
    { icon: Cpu, text: 'Automated' }
  ];

  return (
    <div className={`text-center mb-12 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-lg mb-6">
        <FileSpreadsheet className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        2Klicks Transformer System
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Upload your <strong>ECC extracted file</strong> and{' '}
        <strong>S/4HANA target file</strong> to perform enterprise-grade data transformation.{' '}
        Our system will process your files and generate optimized output for seamless migration.
      </p>
      
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {features.map((feature, index) => (
          <div 
            key={feature.text}
            className={`flex items-center space-x-2 px-3 py-1 bg-white border border-gray-200 rounded-full transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            style={{ transitionDelay: `${400 + index * 100}ms` }}
          >
            <feature.icon className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700 text-sm font-medium">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;