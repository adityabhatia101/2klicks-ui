import React from 'react';
import { FileSpreadsheet, Zap, Lock, Cpu } from 'lucide-react';

interface HeaderProps {
  mounted: boolean;
}

const Header: React.FC<HeaderProps> = ({ mounted }) => {
  const features = [
    { icon: Zap, text: 'Fast Processing', color: 'orange' },
    { icon: Lock, text: 'Secure', color: 'green' },
    { icon: Cpu, text: 'Automated', color: 'blue' }
  ];

  const getFeatureStyles = (color: string) => {
    switch (color) {
      case 'orange':
        return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'green':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'blue':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      default:
        return 'bg-white border-gray-200 text-gray-700';
    }
  };

  const getIconStyles = (color: string) => {
    switch (color) {
      case 'orange':
        return 'text-orange-600';
      case 'green':
        return 'text-green-600';
      case 'blue':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

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
            className={`flex items-center space-x-2 px-3 py-1 border rounded-full transition-all duration-300 ${getFeatureStyles(feature.color)} ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            style={{ transitionDelay: `${400 + index * 100}ms` }}
          >
            <feature.icon className={`w-4 h-4 ${getIconStyles(feature.color)}`} />
            <span className="text-sm font-medium">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;