// backend/routes/scheduler.js

const express = require('express');
const router = express.Router();
const fcfs = require('../algorithms/fcfs');
const sjf = require('../algorithms/sjf');
const rr = require('../algorithms/rr');
const priority = require('../algorithms/priority');
const sjfPreemptive = require('../algorithms/sjf_preemptive');
const priorityPreemptive = require('../algorithms/priority_preemptive');

router.post('/', (req, res) => {
  const { algorithm, processes, quantum } = req.body;

  if (!algorithm || !processes || !Array.isArray(processes)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  let result;

  switch (algorithm.toLowerCase()) {
    case 'fcfs':
      result = fcfs(processes);
      break;
    case 'sjf':
      result = sjf(processes);
      break;
    case 'rr':
      if (!quantum) return res.status(400).json({ error: 'Quantum required for Round Robin' });
      result = rr(processes, quantum);
      break;
    case 'priority':
      result = priority(processes);
      break;
    case 'sjf-preemptive':
      result = sjfPreemptive(processes);
      break;
    case 'priority-preemptive':
      result = priorityPreemptive(processes);
      break;
    default:
      return res.status(400).json({ error: 'Unsupported algorithm' });
  }

  res.json(result);
});

module.exports = router;
