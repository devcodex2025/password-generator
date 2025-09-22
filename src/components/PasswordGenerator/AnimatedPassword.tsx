'use client';

import { useState, useEffect } from 'react';
import '../../styles/password-cracking.css';

interface AnimatedPasswordProps {
  length?: number;
}

export default function AnimatedPassword({ length = 7 }: AnimatedPasswordProps) {
  const [currentChars, setCurrentChars] = useState<string[]>(Array(length).fill('*'));
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isBlinking, setIsBlinking] = useState<boolean>(false);

  useEffect(() => {
    const characters = ['*', 'A', 'B', 'C', '1', '2', '3', 'X', 'Y', 'Z', '9', '8', '7'];
    let charIndex = 0;
    let isPaused = false;

    const interval = setInterval(() => {
      if (!isPaused && !isBlinking) {
        setCurrentChars((prev) => {
          const newChars = [...prev];
          newChars[activeIndex] = characters[charIndex % characters.length];
          return newChars;
        });
        charIndex++;
        if (charIndex >= characters.length) {
          isPaused = true;
          setTimeout(() => {
            isPaused = false;
            charIndex = 0;
            if (activeIndex < length - 1) {
              setActiveIndex((prev) => prev + 1);
            } else {
              setIsComplete(true);
              setIsBlinking(true);
              const blinkInterval = setInterval(() => {
                setIsBlinking(false);
                setIsComplete(false);
                setCurrentChars(Array(length).fill('*'));
                setActiveIndex(0);
                clearInterval(blinkInterval);
              }, 4000);
            }
          }, 1000);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [activeIndex, length, isComplete, isBlinking]);

  return (
    <span className="password-cracking">
      {currentChars.map((char, index) => (
        <span
          key={index}
          className={`char ${index === activeIndex ? 'active' : ''} ${isComplete ? 'complete' : ''} ${
            isBlinking ? 'blinking' : ''
          }`}
          style={{ '--char-index': index } as React.CSSProperties}
        >
          {char}
        </span>
      ))}
    </span>
  );
}