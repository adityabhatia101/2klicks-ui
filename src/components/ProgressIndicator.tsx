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
    { label: 'ECC File Uploaded', isComplete: file1Uploaded },
    { label: 'S/4HANA File Uploaded', isComplete: file2Uploaded },
    { label: 'Processing', isComplete: isProcessing }
  ];

  return (
    <div className={`mb-8 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex items-center justify-center space-x-6 text-sm">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <div className={`flex items-center space-x-2 transition-all duration-300 ${
              step.isComplete ? 'text-gray-800' : 'text-gray-400'
            }`}>
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step.isComplete ? 'bg-gray-800' : 'bg-gray-300'
              }`} />
              <span className="font-medium">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-px transition-all duration-300 ${
                step.isComplete ? 'bg-gray-800' : 'bg-gray-300'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;