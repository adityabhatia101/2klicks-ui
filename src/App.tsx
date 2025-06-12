import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileSpreadsheet, Play, CheckCircle, X, Zap, Shield, Cpu } from 'lucide-react';

interface FileUploadState {
  file: File | null;
  isDragging: boolean;
  isUploaded: boolean;
}

function App() {
  const [file1, setFile1] = useState<FileUploadState>({
    file: null,
    isDragging: false,
    isUploaded: false,
  });
  
  const [file2, setFile2] = useState<FileUploadState>({
    file: null,
    isDragging: false,
    isUploaded: false,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  const fileInput1Ref = useRef<HTMLInputElement>(null);
  const fileInput2Ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isValidExcelFile = (file: File): boolean => {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      '.xlsx',
      '.xls'
    ];
    return validTypes.some(type => 
      file.type === type || file.name.toLowerCase().endsWith(type)
    );
  };

  const handleFileUpload = (file: File, fileNumber: 1 | 2) => {
    if (!isValidExcelFile(file)) {
      alert('Please upload a valid Excel file (.xlsx or .xls)');
      return;
    }

    const setState = fileNumber === 1 ? setFile1 : setFile2;
    setState({
      file,
      isDragging: false,
      isUploaded: true,
    });
  };

  const handleDragOver = (e: React.DragEvent, fileNumber: 1 | 2) => {
    e.preventDefault();
    const setState = fileNumber === 1 ? setFile1 : setFile2;
    setState(prev => ({ ...prev, isDragging: true }));
  };

  const handleDragLeave = (e: React.DragEvent, fileNumber: 1 | 2) => {
    e.preventDefault();
    const setState = fileNumber === 1 ? setFile1 : setFile2;
    setState(prev => ({ ...prev, isDragging: false }));
  };

  const handleDrop = (e: React.DragEvent, fileNumber: 1 | 2) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0], fileNumber);
    }
    const setState = fileNumber === 1 ? setFile1 : setFile2;
    setState(prev => ({ ...prev, isDragging: false }));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, fileNumber: 1 | 2) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0], fileNumber);
    }
  };

  const handleRunTransformation = async () => {
    if (!file1.file || !file2.file) {
      alert('Please upload both Excel files before running the transformation.');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      alert('Transformation completed! (This is a demo - actual file processing would happen here)');
    }, 3000);
  };

  const deleteFile = (fileNumber: 1 | 2) => {
    const setState = fileNumber === 1 ? setFile1 : setFile2;
    const inputRef = fileNumber === 1 ? fileInput1Ref : fileInput2Ref;
    
    setState({
      file: null,
      isDragging: false,
      isUploaded: false,
    });
    
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const FileUploadArea = ({ 
    fileState, 
    fileNumber, 
    title, 
    description 
  }: { 
    fileState: FileUploadState; 
    fileNumber: 1 | 2; 
    title: string; 
    description: string; 
  }) => (
    <div className={`transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer
          ${fileState.isUploaded
            ? 'border-gray-400 bg-gray-50 shadow-sm'
            : fileState.isDragging
            ? 'border-gray-500 bg-gray-100'
            : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
          }
        `}
        onDragOver={(e) => handleDragOver(e, fileNumber)}
        onDragLeave={(e) => handleDragLeave(e, fileNumber)}
        onDrop={(e) => handleDrop(e, fileNumber)}
        onClick={() => {
          if (!fileState.isUploaded) {
            const inputRef = fileNumber === 1 ? fileInput1Ref : fileInput2Ref;
            inputRef.current?.click();
          }
        }}
      >
        <input
          ref={fileNumber === 1 ? fileInput1Ref : fileInput2Ref}
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={(e) => handleFileInputChange(e, fileNumber)}
        />
        
        <div className="space-y-4">
          {fileState.isUploaded ? (
            <>
              <CheckCircle className="w-12 h-12 text-gray-600 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <div className="bg-white border border-gray-200 rounded p-3">
                  <p className="text-gray-700 font-medium text-sm break-all">
                    {fileState.file?.name}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {(fileState.file?.size ? (fileState.file.size / 1024).toFixed(1) : '0')} KB
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile(fileNumber);
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200"
              >
                <X className="w-4 h-4 mr-2" />
                Remove File
              </button>
            </>
          ) : (
            <>
              <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
                <div className="flex items-center justify-center mt-3">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded border">
                    <Upload className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Drop file here or click to browse
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
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
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {[
                { icon: Zap, text: 'Fast Processing' },
                { icon: Shield, text: 'Secure' },
                { icon: Cpu, text: 'Automated' }
              ].map((feature, index) => (
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

          {/* Upload Areas */}
          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            <FileUploadArea
              fileState={file1}
              fileNumber={1}
              title="ECC Extracted File"
              description="Upload your ECC extracted Excel file (.xlsx or .xls)"
            />
            <FileUploadArea
              fileState={file2}
              fileNumber={2}
              title="S/4HANA Target File"
              description="Upload your S/4HANA target Excel file (.xlsx or .xls)"
            />
          </div>

          {/* Progress Indicator */}
          <div className={`mb-8 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-center space-x-6 text-sm">
              {[
                { label: 'ECC File Uploaded', isComplete: file1.isUploaded },
                { label: 'S/4HANA File Uploaded', isComplete: file2.isUploaded },
                { label: 'Processing', isComplete: isProcessing }
              ].map((step, index) => (
                <React.Fragment key={step.label}>
                  <div className={`flex items-center space-x-2 transition-all duration-300 ${
                    step.isComplete ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      step.isComplete ? 'bg-gray-800' : 'bg-gray-300'
                    }`} />
                    <span className="font-medium">{step.label}</span>
                  </div>
                  {index < 2 && (
                    <div className={`w-8 h-px transition-all duration-300 ${
                      step.isComplete ? 'bg-gray-800' : 'bg-gray-300'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Run Transformation Button */}
          <div className={`text-center mb-12 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={handleRunTransformation}
              disabled={!file1.isUploaded || !file2.isUploaded || isProcessing}
              className={`
                inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200
                ${(!file1.isUploaded || !file2.isUploaded || isProcessing)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-900 shadow-sm hover:shadow-md'
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

          {/* Instructions */}
          <div className={`bg-white rounded-lg p-8 shadow-sm border border-gray-200 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How it works</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              {[
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
              ].map((item) => (
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
        </div>
      </div>
    </div>
  );
}

export default App;