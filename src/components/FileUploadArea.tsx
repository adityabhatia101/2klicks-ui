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

  const getCardColors = () => {
    if (fileNumber === 1) {
      return {
        uploaded: 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg shadow-emerald-100/50',
        dragging: 'border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50',
        default: 'border-slate-300 bg-white/80 backdrop-blur-sm hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-indigo-50/50 hover:shadow-lg hover:shadow-blue-100/30'
      };
    } else {
      return {
        uploaded: 'border-violet-400 bg-gradient-to-br from-violet-50 to-purple-50 shadow-lg shadow-violet-100/50',
        dragging: 'border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50',
        default: 'border-slate-300 bg-white/80 backdrop-blur-sm hover:border-indigo-400 hover:bg-gradient-to-br hover:from-indigo-50/50 hover:to-purple-50/50 hover:shadow-lg hover:shadow-indigo-100/30'
      };
    }
  };

  const colors = getCardColors();

  return (
    <div className={`transition-all duration-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer
          ${fileState.isUploaded
            ? colors.uploaded
            : fileState.isDragging
            ? colors.dragging
            : colors.default
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
              <div className={`w-16 h-16 rounded-full ${fileNumber === 1 ? 'bg-gradient-to-br from-emerald-400 to-green-500' : 'bg-gradient-to-br from-violet-400 to-purple-500'} flex items-center justify-center mx-auto shadow-lg`}>
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
                <div className="bg-white/90 backdrop-blur-sm border border-white/50 rounded-lg p-4 shadow-sm">
                  <p className="text-slate-700 font-medium text-sm break-all">
                    {fileState.file?.name}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    {(fileState.file?.size ? (fileState.file.size / 1024).toFixed(1) : '0')} KB
                  </p>
                </div>
              </div>
              <button
                onClick={handleDeleteClick}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-600 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <X className="w-4 h-4 mr-2" />
                Remove File
              </button>
            </>
          ) : (
            <>
              <div className={`w-16 h-16 rounded-full ${fileNumber === 1 ? 'bg-gradient-to-br from-blue-100 to-indigo-100' : 'bg-gradient-to-br from-indigo-100 to-purple-100'} flex items-center justify-center mx-auto`}>
                <FileSpreadsheet className={`w-8 h-8 ${fileNumber === 1 ? 'text-blue-600' : 'text-indigo-600'}`} />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
                <p className="text-slate-600 text-sm">{description}</p>
                <div className="flex items-center justify-center mt-4">
                  <div className={`flex items-center space-x-2 px-4 py-2 ${fileNumber === 1 ? 'bg-gradient-to-r from-blue-100 to-indigo-100' : 'bg-gradient-to-r from-indigo-100 to-purple-100'} rounded-lg border border-white/50 shadow-sm`}>
                    <Upload className={`w-4 h-4 ${fileNumber === 1 ? 'text-blue-600' : 'text-indigo-600'}`} />
                    <span className="text-sm font-medium text-slate-700">
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