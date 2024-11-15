"use client"

import React, { useEffect, useRef, useState } from 'react';

const Home: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setShowInput(true);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowInput(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  return (
    <div className="h-screen flex items-center justify-center relative">
      {showInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <input
            ref={inputRef}
            type="text"
            className="border border-gray-300 p-2 text-black rounded shadow bg-white"
            placeholder="Type here..."
          />
        </div>
      )}
      <p>Press Ctrl + K to show input</p>
    </div>
  );
};

export default Home;
