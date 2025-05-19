import React from 'react';

const GanttChart = ({ data }) => {
  const totalTime = data[data.length - 1].end;

  return (
    <div className="mb-4">
      <h4 className="mb-3">Gantt Chart</h4>
      <div className="d-flex border">
        {data.map((block, index) => {
          const width = ((block.end - block.start) / totalTime) * 100;
          return (
            <div
              key={index}
              className="border-end text-center bg-info text-white"
              style={{ width: `${width}%`, padding: '10px 0' }}
            >
              <div>{block.pid}</div>
              <small>{block.start} - {block.end}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GanttChart;
