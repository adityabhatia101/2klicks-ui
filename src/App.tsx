import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import FileUploadArea from './components/FileUploadArea';
import ProgressIndicator from './components/ProgressIndicator';
import TransformationButton from './components/TransformationButton';
import Instructions from './components/Instructions';
import { FileUploadState } from './types/FileUploadState';
import { isValidExcelFile } from './utils/fileValidation';

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

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Header mounted={mounted} />

          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            <FileUploadArea
              fileState={file1}
              fileNumber={1}
              title="ECC Extracted File"
              description="Upload your ECC extracted Excel file (.xlsx or .xls)"
              mounted={mounted}
              fileInputRef={fileInput1Ref}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onFileInputChange={handleFileInputChange}
              onDeleteFile={deleteFile}
            />
            <FileUploadArea
              fileState={file2}
              fileNumber={2}
              title="S/4HANA Target File"
              description="Upload your S/4HANA target Excel file (.xlsx or .xls)"
              mounted={mounted}
              fileInputRef={fileInput2Ref}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onFileInputChange={handleFileInputChange}
              onDeleteFile={deleteFile}
            />
          </div>

          <ProgressIndicator
            file1Uploaded={file1.isUploaded}
            file2Uploaded={file2.isUploaded}
            isProcessing={isProcessing}
            mounted={mounted}
          />

          <TransformationButton
            canRun={file1.isUploaded && file2.isUploaded}
            isProcessing={isProcessing}
            mounted={mounted}
            onRun={handleRunTransformation}
          />

          <Instructions mounted={mounted} />
        </div>
      </div>
    </div>
  );
}

export default App;