function priorityScheduling(processes) {
  const n = processes.length;
  const result = [];
  let time = 0;
  const queue = [...processes];
  const completed = new Set();

  while (completed.size < n) {
    const available = queue.filter(p => !completed.has(p.pid) && p.arrivalTime <= time);
    if (available.length === 0) {
      time++;
      continue;
    }

    available.sort((a, b) => a.priority - b.priority);
    const p = available[0];

    const start = time;
    const end = start + p.burstTime;
    const waitingTime = start - p.arrivalTime;
    const turnaroundTime = end - p.arrivalTime;

    result.push({ ...p, start, end, waitingTime, turnaroundTime });
    time = end;
    completed.add(p.pid);
  }

  const avgWaitingTime = result.reduce((a, p) => a + p.waitingTime, 0) / n;
  const avgTurnaroundTime = result.reduce((a, p) => a + p.turnaroundTime, 0) / n;

  return {
    chartData: result.map(({ pid, start, end }) => ({ pid, start, end })),
    stats: { avgWaitingTime, avgTurnaroundTime }
  };
}

module.exports = priorityScheduling;
