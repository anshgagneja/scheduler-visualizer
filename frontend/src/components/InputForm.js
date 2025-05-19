import React, { useState } from 'react';
import axios from 'axios';

const InputForm = ({ onResult }) => {
  const [algorithm, setAlgorithm] = useState('fcfs');
  const [quantum, setQuantum] = useState(2);
  const [processes, setProcesses] = useState([
    { pid: 'P1', arrivalTime: 0, burstTime: 4, priority: 1 },
    { pid: 'P2', arrivalTime: 1, burstTime: 3, priority: 2 }
  ]);

  const isPriority = algorithm.includes('priority');
  const isRR = algorithm === 'rr';

  const handleChange = (index, field, value) => {
    const updated = [...processes];
    updated[index][field] = field === 'pid' ? value : parseInt(value);
    setProcesses(updated);
  };

  const addProcess = () => {
    setProcesses([
      ...processes,
      { pid: `P${processes.length + 1}`, arrivalTime: 0, burstTime: 0, priority: 1 }
    ]);
  };

  const resetForm = () => {
    setProcesses([
      { pid: 'P1', arrivalTime: 0, burstTime: 4, priority: 1 },
      { pid: 'P2', arrivalTime: 1, burstTime: 3, priority: 2 }
    ]);
    setAlgorithm('fcfs');
    setQuantum(2);
    onResult({ chartData: [], stats: null });
  };

  const validate = () => {
    return processes.every(p =>
      p.pid &&
      Number.isInteger(p.arrivalTime) &&
      Number.isInteger(p.burstTime) &&
      p.arrivalTime >= 0 &&
      p.burstTime > 0 &&
      (!isPriority || Number.isInteger(p.priority))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      alert('Please fill all fields correctly.');
      return;
    }

    try {
      const body = { algorithm, processes };
      if (isRR) body.quantum = quantum;

      const res = await axios.post('http://localhost:5000/simulate', body);
      onResult(res.data);
    } catch (err) {
      alert('Error: ' + err.response?.data?.error || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>PID</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            {isPriority && <th>Priority</th>}
          </tr>
        </thead>
        <tbody>
          {processes.map((p, index) => (
            <tr key={index}>
              <td>
                <input className="form-control" value={p.pid} onChange={(e) => handleChange(index, 'pid', e.target.value)} />
              </td>
              <td>
                <input type="number" className="form-control" value={p.arrivalTime} onChange={(e) => handleChange(index, 'arrivalTime', e.target.value)} />
              </td>
              <td>
                <input type="number" className="form-control" value={p.burstTime} onChange={(e) => handleChange(index, 'burstTime', e.target.value)} />
              </td>
              {isPriority && (
                <td>
                  <input type="number" className="form-control" value={p.priority} onChange={(e) => handleChange(index, 'priority', e.target.value)} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-3">
        <button type="button" className="btn btn-outline-primary me-2" onClick={addProcess}>Add Process</button>
        <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>Reset</button>
      </div>

      <div className="mb-3">
        <label className="form-label">Select Algorithm:</label>
        <select className="form-select" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
          <option value="fcfs">First-Come First-Served (FCFS)</option>
          <option value="sjf">Shortest Job First (Non-Preemptive)</option>
          <option value="sjf-preemptive">Shortest Remaining Time First (Preemptive)</option>
          <option value="rr">Round Robin (RR)</option>
          <option value="priority">Priority Scheduling (Non-Preemptive)</option>
          <option value="priority-preemptive">Priority Scheduling (Preemptive)</option>
        </select>
      </div>

      {isRR && (
        <div className="mb-3">
          <label className="form-label">Quantum:</label>
          <input type="number" className="form-control w-25" value={quantum} onChange={(e) => setQuantum(parseInt(e.target.value))} />
        </div>
      )}

      <button type="submit" className="btn btn-success">Simulate</button>
    </form>
  );
};

export default InputForm;
