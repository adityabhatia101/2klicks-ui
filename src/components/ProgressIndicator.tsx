import React from 'react';

interface ProgressIndicatorProps {
  file1Uploaded: boolean;
  file2Uploaded: boolean;
  isProcessing: boolean;
  mounted: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  file1Uploaded,
  file2Uploaded,
  isProcessing,
  mounted
}) => {
  const steps = [
    { label: 'ECC File Uploaded', isComplete: file1Uploaded, color: 'emerald' },
    { label: 'S/4HANA File Uploaded', isComplete: file2Uploaded, color: 'violet' },
    { label: 'Processing', isComplete: isProcessing, color: 'sky' }
  ];

  const getStepColor = (step: typeof steps[0]) => {
    if (!step.isComplete) return 'text-slate-400';
    
    if (step.color === 'emerald') {
      return 'text-emerald-600';
    } else if (step.color === 'violet') {
      return 'text-violet-600';
    } else if (step.color === 'sky') {
      return 'text-sky-600';
    }
    return 'text-slate-800';
  };

  const getDotColor = (step: typeof steps[0]) => {
    if (!step.isComplete) return 'bg-slate-300';
    
    if (step.color === 'emerald') {
      return 'bg-gradient-to-r from-emerald-400 to-green-500 shadow-lg shadow-emerald-200';
    } else if (step.color === 'violet') {
      return 'bg-gradient-to-r from-violet-400 to-purple-500 shadow-lg shadow-violet-200';
    } else if (step.color === 'sky') {
      return 'bg-gradient-to-r from-sky-400 to-blue-500 shadow-lg shadow-sky-200';
    }
    return 'bg-slate-800';
  };

  const getLineColor = (step: typeof steps[0]) => {
    if (!step.isComplete) return 'bg-slate-300';
    
    if (step.color === 'emerald') {
      return 'bg-gradient-to-r from-emerald-400 to-green-500';
    } else if (step.color === 'violet') {
      return 'bg-gradient-to-r from-violet-400 to-purple-500';
    } else if (step.color === 'sky') {
      return 'bg-gradient-to-r from-sky-400 to-blue-500';
    }
    return 'bg-slate-800';
  };

  return (
    <div className={`mb-8 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50">
        <div className="flex items-center justify-center space-x-6 text-sm">
          {steps.map((step, index) => (
            <React.Fragment key={step.label}>
              <div className={`flex items-center space-x-3 transition-all duration-300 ${getStepColor(step)}`}>
                <div className={`w-4 h-4 rounded-full transition-all duration-300 ${getDotColor(step)} ${step.isComplete ? 'scale-110' : ''}`} />
                <span className="font-medium">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-1 rounded-full transition-all duration-300 ${getLineColor(step)}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;