"use client";

// Simple notification fallback for build issues
export const toast = {
  success: (message: string) => {
    console.log('SUCCESS:', message);
    if (typeof window !== 'undefined') {
      // Create a simple toast notification
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);
    }
  },
  error: (message: string) => {
    console.error('ERROR:', message);
    if (typeof window !== 'undefined') {
      // Create a simple toast notification
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50';
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);
    }
  }
};