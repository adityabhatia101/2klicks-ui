import React from 'react';
import { Upload, Cpu, CheckCircle } from 'lucide-react';

interface InstructionsProps {
  mounted: boolean;
}

const Instructions: React.FC<InstructionsProps> = ({ mounted }) => {
  const steps = [
    {
      step: '01',
      title: 'Upload Files',
      description: 'Upload your ECC extracted file and S/4HANA target file',
      icon: Upload
    },
    {
      step: '02',
      title: 'Transform Data',
      description: 'Our system analyzes and transforms your SAP data automatically',
      icon: Cpu
    },
    {
      step: '03',
      title: 'Download Result',
      description: 'Get your transformed Excel file ready for S/4HANA migration',
      icon: CheckCircle
    }
  ];

  return (
    <div className={`bg-gray-50 rounded-lg p-8 shadow-sm border border-gray-200 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How it works</h2>
      <div className="grid md:grid-cols-3 gap-6 text-sm">
        {steps.map((item) => (
          <div key={item.step} className="text-center">
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold text-gray-500 tracking-wider">{item.step}</div>
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructions;