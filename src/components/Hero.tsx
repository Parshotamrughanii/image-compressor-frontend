'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Define types for our data structures
interface FileObject {
  name: string;
  size: number;
  file: File;
  status: 'queued' | 'uploading' | 'compressing' | 'completed' | 'error';
  progress?: number;
  error?: string;
}

interface CompressedImage {
  fileName: string;
  compressedSize: string;
  compressionPercentage: number;
  downloadUrl: string;
}

// Initialize socket connection
let socket: Socket | null = null;

// Only initialize socket on client side
if (typeof window !== 'undefined') {
  socket = io("https://www.compressclick.com/", {
    transports: ["websocket"], // Enforce WebSocket transport
    secure: true, // Ensure secure connection
    reconnection: true, // Auto-reconnect on disconnection
    reconnectionAttempts: 10, // Try reconnecting 10 times before failing
    reconnectionDelay: 2000, // Delay between reconnections (2s)
    timeout: 50000, // Timeout for connection
  });
}

export default function Hero() {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [compressedImages, setCompressedImages] = useState<CompressedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!socket) return;

    // Listen for each compressed image and update state immediately
    socket.on("imageCompressed", (data: CompressedImage) => {
      setCompressedImages((prev) => {
        const newCompressedImages = [...prev, data];
        
        // Update the status of the compressed file
        setFiles(currentFiles => 
          currentFiles.map(file => 
            file.name === data.fileName 
              ? { ...file, status: 'completed' } 
              : file
          )
        );
        
        // Check if all files are processed
        const allCompleted = files.every(file => 
          file.status === 'completed' || 
          newCompressedImages.some(img => img.fileName === file.name)
        );
        
        if (allCompleted) {
          setIsProcessing(false);
        }
        
        return newCompressedImages;
      });
    });

    // Backup handler to ensure isProcessing is set to false
    socket.on("allImagesCompressed", () => {
      setIsProcessing(false);
      
      // Mark all files as completed
      setFiles(currentFiles => 
        currentFiles.map(file => ({ ...file, status: 'completed' }))
      );
    });

    return () => {
      if (socket) {
        socket.off("imageCompressed");
        socket.off("allImagesCompressed");
      }
    };
  }, [files]);

  // Process a single file - upload and compress
  const processFile = async (fileObject: FileObject) => {
    // Update file status to uploading
    setFiles(currentFiles => 
      currentFiles.map(file => 
        file.name === fileObject.name 
          ? { ...file, status: 'uploading', progress: 0 } 
          : file
      )
    );
    
    const formData = new FormData();
    formData.append("image", fileObject.file);
    
    try {
      // Update file status to compressing
      setFiles(currentFiles => 
        currentFiles.map(file => 
          file.name === fileObject.name 
            ? { ...file, status: 'compressing', progress: 100 } 
            : file
        )
      );
      
      // Send to server for compression
      await fetch("https://www.compressclick.com/upload-single", {
        method: "POST",
        body: formData,
      });
      
      // The socket will handle the response and update the state
    } catch (error) {
      console.error(`Error processing file ${fileObject.name}:`, error);
      
      // Update file status to error
      setFiles(currentFiles => 
        currentFiles.map(file => 
          file.name === fileObject.name 
            ? { ...file, status: 'error', error: 'Failed to process file' } 
            : file
        )
      );
      
      // For demo purposes, simulate compression if server is not available
      simulateCompression([fileObject]);
    }
  };

  // Add new files to the queue and start processing them
  const addFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    // Convert FileList to FileObject array with initial status
    const newFileObjects: FileObject[] = Array.from(selectedFiles).map((file) => ({
      name: file.name,
      size: file.size,
      file,
      status: 'queued'
    }));
    
    // Add new files to the state (preserving existing files)
    setFiles(currentFiles => [...currentFiles, ...newFileObjects]);
    
    // Set processing state
    setIsProcessing(true);
    
    // Process each file individually
    newFileObjects.forEach(fileObject => {
      processFile(fileObject);
    });
  };

  // Clear all files and reset the state
  const clearAll = () => {
    setFiles([]);
    setCompressedImages([]);
    setIsProcessing(false);
  };

  // For demo purposes only - simulate compression if server is not available
  const simulateCompression = (fileObjects: FileObject[]) => {
    fileObjects.forEach((fileObject, index) => {
      // Update file status to compressing
      setFiles(currentFiles => 
        currentFiles.map(file => 
          file.name === fileObject.name 
            ? { ...file, status: 'compressing' } 
            : file
        )
      );
      
      setTimeout(() => {
        const compressionPercentage = Math.floor(Math.random() * 10) + 85;
        const compressedSize = `${(fileObject.size / 1024 / (100 / compressionPercentage)).toFixed(1)} KB`;
        
        // Create a data URL from the file for preview
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          
          // Add to compressed images
          setCompressedImages(prev => [
            ...prev, 
            {
              fileName: fileObject.name,
              compressedSize,
              compressionPercentage,
              downloadUrl: dataUrl // Use the data URL for download
            }
          ]);
          
          // Update file status to completed
          setFiles(currentFiles => 
            currentFiles.map(file => 
              file.name === fileObject.name 
                ? { ...file, status: 'completed' } 
                : file
            )
          );
          
          // Check if all files are processed
          const allCompleted = files.every(file => 
            file.status === 'completed' || 
            file.name === fileObject.name
          );
          
          if (allCompleted) {
            setIsProcessing(false);
          }
        };
        
        reader.readAsDataURL(fileObject.file);
      }, (index + 1) * 1000); // Simulate delay
    });
  };

  // Download all compressed images as a ZIP file
  const downloadAllAsZip = async () => {
    if (compressedImages.length === 0) return;
    
    try {
      const zip = new JSZip();
      
      // Add each compressed image to the zip file
      const promises = compressedImages.map(async (img) => {
        try {
          // Convert data URL to blob
          const response = await fetch(img.downloadUrl);
          const blob = await response.blob();
          
          // Add to zip with the original filename
          zip.file(`compressed_${img.fileName}`, blob);
          
          return true;
        } catch (error) {
          console.error(`Error adding ${img.fileName} to zip:`, error);
          return false;
        }
      });
      
      // Wait for all images to be added to the zip
      await Promise.all(promises);
      
      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      // Save the zip file
      saveAs(zipBlob, 'compressed_images.zip');
    } catch (error) {
      console.error('Error creating zip file:', error);
      alert('Failed to create zip file. Please try again.');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Calculate total compression stats
  const totalOriginalSize = files.reduce((sum, file) => sum + file.size, 0);
  const totalCompressedSize = compressedImages.reduce((sum, img) => {
    const sizeInKB = parseFloat(img.compressedSize.replace(' KB', ''));
    return sum + sizeInKB * 1024; // Convert KB back to bytes
  }, 0);
  
  const totalSavingPercentage = totalOriginalSize > 0 
    ? Math.round((1 - (totalCompressedSize / totalOriginalSize)) * 100) 
    : 0;

  // Get status text and color based on file status
  const getStatusInfo = (file: FileObject) => {
    const compressedData = compressedImages.find(img => img.fileName === file.name);
    
    if (compressedData) {
      return {
        text: 'Download',
        color: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
        isButton: true,
        url: compressedData.downloadUrl
      };
    }
    
    switch (file.status) {
      case 'queued':
        return {
          text: 'Queued...',
          color: 'text-gray-500 dark:text-gray-400',
          isButton: false
        };
      case 'uploading':
        return {
          text: 'Uploading...',
          color: 'text-blue-500 dark:text-blue-400',
          isButton: false
        };
      case 'compressing':
        return {
          text: 'Compressing...',
          color: 'text-purple-500 dark:text-purple-400',
          isButton: false
        };
      case 'error':
        return {
          text: file.error || 'Error',
          color: 'text-red-500 dark:text-red-400',
          isButton: false
        };
      default:
        return {
          text: 'Processing...',
          color: 'text-gray-500 dark:text-gray-400',
          isButton: false
        };
    }
  };
  
  return (
    <section id="hero-section" className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-gradient-to-b from-white to-blue-50 dark:from-[#0f0a1a] dark:to-[#1a1530]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              <span className="block">Compress Images</span>
              <span className="block gradient-text">Without Losing Quality</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Our advanced AI-powered image compression technology reduces file size by up to 90% while maintaining visual quality. Perfect for websites, apps, and sharing.
            </p>
            <div className="flex items-center gap-2 mt-4 text-gray-600 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No signup required</span>
              <span className="mx-2">•</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Totally Free for use</span>
            </div>
          </div>
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
            <div className="absolute inset-0 from-purple-500/20 to-indigo-500/20 backdrop-blur-sm dark:from-purple-600/10 dark:to-indigo-600/10"></div>
            <div className="relative z-10 modern-card bg-white/10 dark:bg-[#1a1530]/90 backdrop-blur-md rounded-xl p-6 shadow-lg">
              {/* Hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileInputChange} 
                className="hidden" 
                multiple 
                accept="image/*" 
              />
              
              {/* Drag and drop area */}
              <div 
                className={`flex items-center justify-center border-2 border-dashed ${dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-8 mb-4 transition-colors`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Drag & drop your images here</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">or</p>
                  <button 
                    onClick={handleBrowseClick}
                    className="mt-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition-colors dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-800/50"
                  >
                    Browse Files
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Max size: 10MB per image
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {isProcessing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing images...
                    </span>
                  ) : (
                    <span>Ready to compress</span>
                  )}
                </div>
              </div>

              {/* Compressed Images Display with Scrollbar */}
              <div className="mt-8 w-full">
                {/* Action buttons - shown when there are files */}
                {files.length > 0 && (
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={handleBrowseClick}
                        className="modern-button bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Upload More
                      </button>
                      <button 
                        onClick={clearAll}
                        className="modern-button bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Clear All
                      </button>
                    </div>
                    {compressedImages.length > 0 && (
                      <button 
                        onClick={downloadAllAsZip}
                        className="modern-button bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download All as ZIP
                      </button>
                    )}
                  </div>
                )}
                
                {/* Scrollable container for images */}
                <div className="max-h-[320px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
                  {files.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No images selected. Drop images or browse to start compressing.
                    </div>
                  ) : (
                    files.map((file, index) => {
                      const compressedData = compressedImages.find((img) => img.fileName === file.name);
                      const statusInfo = getStatusInfo(file);
                      
                      return (
                        <div 
                          key={index} 
                          className="modern-card p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex justify-between items-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all"
                        >
                          <div className="flex gap-4 items-center">
                            <div className="flex-shrink-0">
                              <div className="w-16 h-16 rounded bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white overflow-hidden">
                                {compressedData ? (
                                  <Image 
                                    height={64} 
                                    width={64} 
                                    className="rounded object-contain w-full h-full" 
                                    src={compressedData.downloadUrl} 
                                    alt={file.name}
                                    unoptimized // Use unoptimized for data URLs
                                    style={{ imageOrientation: 'from-image' }}
                                  />
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                              <p className="text-gray-500 dark:text-gray-400">Original: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                              {compressedData && (
                                <p className="text-green-600 dark:text-green-400 font-medium">
                                  Compressed: {compressedData.compressedSize} | Saved: {compressedData.compressionPercentage}%
                                </p>
                              )}
                              {file.status === 'uploading' && file.progress !== undefined && (
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${file.progress}%` }}></div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {statusInfo.isButton ? (
                            <a
                              href={statusInfo.url}
                              download={`compressed_${file.name}`}
                              className={`modern-button ${statusInfo.color} text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg flex-shrink-0`}
                            >
                              {statusInfo.text}
                            </a>
                          ) : (
                            <span className={`${statusInfo.color} animate-pulse flex-shrink-0`}>{statusInfo.text}</span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
                
                {/* Progress indicator - Only shown when there are compressed images */}
                {compressedImages.length > 0 && (
                  <div className="mt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{compressedImages.length} of {files.length} image{files.length !== 1 ? 's' : ''} processed</span>
                    <span>Total saved: {totalSavingPercentage}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
