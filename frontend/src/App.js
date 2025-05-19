import React, { useState } from 'react';
import InputForm from './components/InputForm';
import GanttChart from './components/GanttChart';
import StatsTable from './components/StatsTable';

function App() {
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState(null);

  const handleResult = (data) => {
    setChartData(data.chartData);
    setStats(data.stats);
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4">
        <h1 className="text-center text-primary mb-4">OS Process Scheduler Visualizer</h1>
        <InputForm onResult={handleResult} />
        {chartData.length > 0 && <GanttChart data={chartData} />}
        {stats && <StatsTable stats={stats} />}
      </div>
    </div>
  );
}

export default App;
