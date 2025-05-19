// backend/algorithms/fcfs.js

function fcfs(processes) {
  // Sort by arrival time
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  let time = 0;
  const result = [];

  for (const p of processes) {
    if (time < p.arrivalTime) time = p.arrivalTime;

    const start = time;
    const end = start + p.burstTime;
    const waitingTime = start - p.arrivalTime;
    const turnaroundTime = end - p.arrivalTime;

    result.push({ ...p, start, end, waitingTime, turnaroundTime });
    time = end;
  }

  const avgWaitingTime =
    result.reduce((acc, p) => acc + p.waitingTime, 0) / result.length;
  const avgTurnaroundTime =
    result.reduce((acc, p) => acc + p.turnaroundTime, 0) / result.length;

  return {
    chartData: result.map(({ pid, start, end }) => ({ pid, start, end })),
    stats: { avgWaitingTime, avgTurnaroundTime },
  };
}

module.exports = fcfs;
