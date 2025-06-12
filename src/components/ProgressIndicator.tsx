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
    { label: 'ECC File Uploaded', isComplete: file1Uploaded, color: 'green' },
    { label: 'S/4HANA File Uploaded', isComplete: file2Uploaded, color: 'green' },
    { label: 'Processing', isComplete: isProcessing, color: 'blue' }
  ];

  const getStepColor = (step: typeof steps[0]) => {
    if (!step.isComplete) return 'text-gray-400';
    
    if (step.color === 'green') {
      return 'text-green-600';
    } else if (step.color === 'blue') {
      return 'text-blue-600';
    }
    return 'text-gray-800';
  };

  const getDotColor = (step: typeof steps[0]) => {
    if (!step.isComplete) return 'bg-gray-300';
    
    if (step.color === 'green') {
      return 'bg-green-600';
    } else if (step.color === 'blue') {
      return 'bg-blue-600';
    }
    return 'bg-gray-800';
  };

  const getLineColor = (step: typeof steps[0]) => {
    if (!step.isComplete) return 'bg-gray-300';
    
    if (step.color === 'green') {
      return 'bg-green-600';
    } else if (step.color === 'blue') {
      return 'bg-blue-600';
    }
    return 'bg-gray-800';
  };

  return (
    <div className={`mb-8 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-center justify-center space-x-6 text-sm">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <div className={`flex items-center space-x-2 transition-all duration-300 ${getStepColor(step)}`}>
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${getDotColor(step)}`} />
              <span className="font-medium">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-px transition-all duration-300 ${getLineColor(step)}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;