'use client';
import { useDropzone } from 'react-dropzone';

export function ResumeUpload({ onUpload }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx']
    },
    onDrop: acceptedFiles => {
      onUpload(acceptedFiles[0]);
    }
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        Drag & drop your resume here, or click to select
      </p>
    </div>
  );
}