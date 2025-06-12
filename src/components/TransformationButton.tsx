import React, { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);
  const isDisabled = !canRun || isProcessing;

  // Generate array of arrows for animation
  const arrowCount = 8;
  const arrows = Array.from({ length: arrowCount }, (_, i) => i);

  return (
    <div className={`text-center mb-12 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <button
        onClick={onRun}
        disabled={isDisabled}
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 overflow-hidden
          ${isDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-sky-500 text-white hover:bg-sky-600 shadow-md hover:shadow-lg'
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
            {/* Normal state content */}
            <div className={`flex items-center transition-opacity duration-300 ${isHovered && !isDisabled ? 'opacity-0' : 'opacity-100'}`}>
              <span className="mr-3">Run Transformation</span>
              <Play className="w-5 h-5" />
            </div>

            {/* Hover state arrows */}
            {!isDisabled && (
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                {arrows.map((index) => (
                  <Play
                    key={index}
                    className={`w-5 h-5 mx-1 transition-all duration-300 ${
                      isHovered 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-8'
                    }`}
                    style={{
                      transitionDelay: `${index * 50}ms`
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </button>
    </div>
  );
};

export default TransformationButton;