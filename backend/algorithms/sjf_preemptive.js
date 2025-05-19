function sjfPreemptive(processes) {
  const n = processes.length;
  const timeline = [];
  const remaining = {};
  const arrivalMap = {};
  const complete = {};
  const waiting = {};
  const turnaround = {};

  processes.forEach(p => {
    remaining[p.pid] = p.burstTime;
    arrivalMap[p.arrivalTime] = (arrivalMap[p.arrivalTime] || []).concat(p);
  });

  let time = 0;
  let lastPid = null;
  let executed = [];

  while (Object.keys(complete).length < n) {
    const available = processes.filter(p => p.arrivalTime <= time && remaining[p.pid] > 0);
    if (available.length === 0) {
      time++;
      continue;
    }

    available.sort((a, b) => remaining[a.pid] - remaining[b.pid]);
    const current = available[0];

    if (lastPid !== current.pid) {
      if (executed.length) {
        timeline.push({ pid: lastPid, start: executed[0], end: time });
      }
      executed = [time];
      lastPid = current.pid;
    }

    remaining[current.pid]--;
    time++;

    if (remaining[current.pid] === 0) {
      complete[current.pid] = time;
    }
  }

  if (executed.length) {
    timeline.push({ pid: lastPid, start: executed[0], end: time });
  }

  processes.forEach(p => {
    turnaround[p.pid] = complete[p.pid] - p.arrivalTime;
    waiting[p.pid] = turnaround[p.pid] - p.burstTime;
  });

  const avgWaitingTime = Object.values(waiting).reduce((a, b) => a + b, 0) / n;
  const avgTurnaroundTime = Object.values(turnaround).reduce((a, b) => a + b, 0) / n;

  return {
    chartData: timeline,
    stats: { avgWaitingTime, avgTurnaroundTime }
  };
}

module.exports = sjfPreemptive;
