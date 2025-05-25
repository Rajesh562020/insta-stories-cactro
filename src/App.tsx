import React, { useState, useEffect } from 'react';
import './App.css';
import StoryViewer from './StoryViewer';
import storiesData from './data/stories.json';

type Story = {
  id: number;
  image: string;
};

const App: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  useEffect(() => {
    setStories(storiesData);
  }, []);

  const handleStoryClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="app">
      {currentIndex === null ? (
        <div className="story-list">
          {stories.map((story, idx) => (
            <img
              key={story.id}
              src={story.image}
              className="thumbnail"
              onClick={() => handleStoryClick(idx)}
            />
          ))}
        </div>
      ) : (
        <StoryViewer
          stories={stories}
          currentIndex={currentIndex}
          onClose={() => setCurrentIndex(null)}
          onNext={() =>
            setCurrentIndex((prev) =>
              prev !== null && prev < stories.length - 1 ? prev + 1 : null
            )
          }
          onPrev={() =>
            setCurrentIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : 0))
          }
        />
      )}
    </div>
  );
};

export default App;
