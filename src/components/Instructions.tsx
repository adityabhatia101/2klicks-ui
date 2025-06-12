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
      icon: Upload,
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      step: '02',
      title: 'Transform Data',
      description: 'Our system analyzes and transforms your SAP data automatically',
      icon: Cpu,
      color: 'from-purple-400 to-violet-500',
      bgColor: 'from-purple-50 to-violet-50'
    },
    {
      step: '03',
      title: 'Download Result',
      description: 'Get your transformed Excel file ready for S/4HANA migration',
      icon: CheckCircle,
      color: 'from-emerald-400 to-green-500',
      bgColor: 'from-emerald-50 to-green-50'
    }
  ];

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm border border-white/50 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-8 text-center">How it works</h2>
      <div className="grid md:grid-cols-3 gap-8 text-sm">
        {steps.map((item, index) => (
          <div key={item.step} className={`text-center group hover:scale-105 transition-all duration-300 p-6 rounded-xl bg-gradient-to-br ${item.bgColor} border border-white/50`}>
            <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <item.icon className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-500 tracking-wider">{item.step}</div>
              <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructions;