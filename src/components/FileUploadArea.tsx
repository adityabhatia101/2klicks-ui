import React from 'react';
import { Upload, FileSpreadsheet, CheckCircle, X } from 'lucide-react';
import { FileUploadState } from '../types/FileUploadState';

interface FileUploadAreaProps {
  fileState: FileUploadState;
  fileNumber: 1 | 2;
  title: string;
  description: string;
  mounted: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onDragOver: (e: React.DragEvent, fileNumber: 1 | 2) => void;
  onDragLeave: (e: React.DragEvent, fileNumber: 1 | 2) => void;
  onDrop: (e: React.DragEvent, fileNumber: 1 | 2) => void;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>, fileNumber: 1 | 2) => void;
  onDeleteFile: (fileNumber: 1 | 2) => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  fileState,
  fileNumber,
  title,
  description,
  mounted,
  fileInputRef,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileInputChange,
  onDeleteFile
}) => {
  const handleClick = () => {
    if (!fileState.isUploaded) {
      fileInputRef.current?.click();
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteFile(fileNumber);
  };

  return (
    <div className={`transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer
          ${fileState.isUploaded
            ? 'border-green-400 bg-green-50 shadow-sm'
            : fileState.isDragging
            ? 'border-gray-500 bg-gray-100'
            : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
          }
        `}
        onDragOver={(e) => onDragOver(e, fileNumber)}
        onDragLeave={(e) => onDragLeave(e, fileNumber)}
        onDrop={(e) => onDrop(e, fileNumber)}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={(e) => onFileInputChange(e, fileNumber)}
        />
        
        <div className="space-y-4">
          {fileState.isUploaded ? (
            <>
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
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
                onClick={handleDeleteClick}
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
};

export default FileUploadArea;