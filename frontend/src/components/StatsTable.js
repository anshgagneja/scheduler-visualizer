import React from 'react';

const StatsTable = ({ stats }) => {
  return (
    <div className="mb-3">
      <h4>Statistics</h4>
      <table className="table table-striped table-bordered w-50">
        <thead className="table-light">
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Average Waiting Time</td>
            <td>{stats.avgWaitingTime.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Average Turnaround Time</td>
            <td>{stats.avgTurnaroundTime.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;
