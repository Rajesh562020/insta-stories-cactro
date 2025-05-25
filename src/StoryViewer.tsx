import React, { useEffect, useState, useRef } from 'react';

type Story = {
  id: number;
  image: string;
};

type Props = {
  stories: Story[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

const StoryViewer: React.FC<Props> = ({ stories, currentIndex, onClose, onNext, onPrev }) => {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setProgress(0);
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timerRef.current!);
        //   onNext();
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  useEffect(() => {
  if (progress >= 100) {
    onNext();
  }
}, [progress]);
  if (!stories[currentIndex]) return null;

  return (
    <div className="viewer">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="story-image" onClick={(e) => {
        const x = e.clientX;
        const half = window.innerWidth / 2;
        if (x < half) onPrev();
        else onNext();
      }}>
        <img src={stories[currentIndex].image} alt="story" />
      </div>
      <button className="close-btn" onClick={onClose}>✕</button>
    </div>
  );
};

export default StoryViewer;
