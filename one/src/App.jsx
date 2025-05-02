import React, { useState } from 'react';
import './App.css';

function App() {
  const [circles, setCircles] = useState([
    { color: 'red', placed: false },
    { color: 'blue', placed: false },
  ]);

  const squares = [
    { color: 'red' },
    { color: 'blue' },
  ];

  const handleDragStart = (e, color) => {
    e.dataTransfer.setData('color', color);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColor) => {
    e.preventDefault();
    const draggedColor = e.dataTransfer.getData('color');

    if (draggedColor === targetColor) {
      setCircles(prev =>
        prev.map(c =>
          c.color === targetColor ? { ...c, placed: true } : c
        )
      );
    }
  };

  return (
    <div className="container">
      <div className="col">
        {circles
          .filter(c => !c.placed)
          .map(c => (
            <div
              key={c.color}
              className={`${c.color}-circle`}
              draggable
              onDragStart={e => handleDragStart(e, c.color)}
            />
          ))}
      </div>

      <div className="col">
        {squares.map(s => (
          <div
            key={s.color}
            className={`${s.color}-square`}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, s.color)}
          >
            {circles.find(c => c.color === s.color && c.placed) && (
              <div className={`${s.color}-circle`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
