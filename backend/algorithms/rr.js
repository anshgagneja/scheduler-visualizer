function rr(processes, quantum) {
  const queue = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const result = [];
  const n = processes.length;
  const remaining = {};
  const waiting = {};
  const turnaround = {};
  const completeTime = {};

  queue.forEach(p => {
    remaining[p.pid] = p.burstTime;
    waiting[p.pid] = 0;
    turnaround[p.pid] = 0;
  });

  const ready = [];
  let time = 0;
  let i = 0;

  while (Object.keys(completeTime).length < n) {
    while (i < queue.length && queue[i].arrivalTime <= time) {
      ready.push(queue[i]);
      i++;
    }

    if (ready.length === 0) {
      time++;
      continue;
    }

    const p = ready.shift();
    const execTime = Math.min(quantum, remaining[p.pid]);
    const start = time;
    const end = time + execTime;

    result.push({ pid: p.pid, start, end });
    remaining[p.pid] -= execTime;
    time = end;

    while (i < queue.length && queue[i].arrivalTime <= time) {
      ready.push(queue[i]);
      i++;
    }

    if (remaining[p.pid] > 0) {
      ready.push(p);
    } else {
      completeTime[p.pid] = time;
    }
  }

  processes.forEach(p => {
    turnaround[p.pid] = completeTime[p.pid] - p.arrivalTime;
    waiting[p.pid] = turnaround[p.pid] - p.burstTime;
  });

  const avgWaitingTime = Object.values(waiting).reduce((a, b) => a + b, 0) / n;
  const avgTurnaroundTime = Object.values(turnaround).reduce((a, b) => a + b, 0) / n;

  return {
    chartData: result,
    stats: { avgWaitingTime, avgTurnaroundTime }
  };
}

module.exports = rr;
