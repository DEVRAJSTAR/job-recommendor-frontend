"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react";
import { parseResumeFromBuffer, createFallbackResumeText } from "../lib/pdfParser";

interface ResumeUploadProps {
  onFileUpload: (text: string) => void;
  onRemove: () => void;
  uploadedText: string | null;
  isLoading: boolean;
}

export default function ResumeUpload({ onFileUpload, onRemove, uploadedText, isLoading }: ResumeUploadProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setError(null);

    try {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      // Check file type
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith('.pdf')) {
        setError("Please upload a PDF file only");
        return;
      }

      // Read file content
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Simple PDF text extraction (basic implementation)
      // In a real app, you'd use a proper PDF parsing library
      const text = await extractTextFromPDF(uint8Array);
      
      if (text.length < 50) {
        setError("The PDF appears to be empty or contains very little text. Please try a different file.");
        return;
      }

      onFileUpload(text);
    } catch (err) {
      console.error("Error processing file:", err);
      setError("Error processing the file. Please try again.");
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    maxSize: 5 * 1024 * 1024 // 5MB
  });

  return (
    <div className="space-y-4">
      {!uploadedText ? (
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? "border-[var(--african-violet)] bg-[var(--african-violet-100)]"
              : "border-[var(--lilac-300)] hover:border-[var(--african-violet)] hover:bg-[var(--african-violet-100)]"
          }`}
        >
          <input {...getInputProps()} />
          
          <motion.div
            animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Upload className="w-12 h-12 text-[var(--african-violet)] mx-auto mb-4" />
          </motion.div>
          
          <h3 className="text-lg font-semibold text-[var(--russian-violet)] mb-2">
            {isDragActive ? "Drop your resume here" : "Upload Your Resume"}
          </h3>
          
          <p className="text-[var(--ultra-violet)] mb-4">
            Drag and drop your PDF resume, or click to browse
          </p>
          
          <div className="text-sm text-[var(--ultra-violet)] space-y-1">
            <p>• PDF format only</p>
            <p>• Maximum file size: 5MB</p>
            <p>• We'll extract your experience automatically</p>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-xl p-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-800 mb-1">
                  Resume Successfully Uploaded
                </h3>
                <p className="text-green-700 text-sm">
                  We've extracted your experience from the resume. You can review it below or continue with the analysis.
                </p>
              </div>
            </div>
            <button
              onClick={onRemove}
              className="text-green-600 hover:text-green-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {isLoading && (
            <div className="mt-4 flex items-center gap-2 text-sm text-green-700">
              <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              Processing resume...
            </div>
          )}
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-800 mb-1">Upload Error</h4>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Enhanced PDF text extraction function
async function extractTextFromPDF(uint8Array: Uint8Array): Promise<string> {
  try {
    // Convert Uint8Array to ArrayBuffer
    const arrayBuffer = uint8Array.buffer;
    
    // Use enhanced PDF parser
    const parsedResume = await parseResumeFromBuffer(uint8Array.buffer as ArrayBuffer);
    
    // If the extraction is too short, provide a fallback message
    if (parsedResume.text.length < 100) {
      return createFallbackResumeText();
    }
    
    // Format the extracted text nicely
    let formattedText = parsedResume.text;
    
    // Add section headers if we detected any
    if (parsedResume.sections.experience) {
      formattedText = `WORK EXPERIENCE:\n${parsedResume.sections.experience}\n\n${formattedText}`;
    }
    
    if (parsedResume.sections.skills) {
      formattedText = `TECHNICAL SKILLS:\n${parsedResume.sections.skills}\n\n${formattedText}`;
    }
    
    return formattedText;
  } catch (error) {
    console.error("PDF parsing error:", error);
    // Return fallback text instead of throwing error
    return createFallbackResumeText();
  }
}
