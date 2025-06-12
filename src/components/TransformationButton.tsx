import React from 'react';
import { Play } from 'lucide-react';

interface TransformationButtonProps {
  canRun: boolean;
  isProcessing: boolean;
  mounted: boolean;
  onRun: () => void;
}

const TransformationButton: React.FC<TransformationButtonProps> = ({
  canRun,
  isProcessing,
  mounted,
  onRun
}) => {
  const isDisabled = !canRun || isProcessing;

  return (
    <div className={`text-center mb-12 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <button
        onClick={onRun}
        disabled={isDisabled}
        className={`
          inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform
          ${isDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-sky-500 text-white hover:bg-sky-600 hover:scale-105 hover:shadow-lg shadow-md'
          }
        `}
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
            <span>Processing Files...</span>
          </>
        ) : (
          <>
            <Play className="w-5 h-5 mr-3" />
            <span>Run Transformation</span>
          </>
        )}
      </button>
    </div>
  );
};

export default TransformationButton;