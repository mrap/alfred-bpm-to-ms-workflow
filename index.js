'use strict';

const MAX_BEAT_DIV = 128;

function msPerBar(bpm) {
  const MS_PER_SECOND = 1000;
  const MS_PER_MINUTE = MS_PER_SECOND * 60;
  const BEATS_PER_BAR = 4;
  return (MS_PER_MINUTE / bpm) * BEATS_PER_BAR;
}

function bpmToNotesMs(bpm) {
  const barMs = msPerBar(bpm);
  const items = [];
  for (let div = 1; div <= MAX_BEAT_DIV; div*=2) {
    const ms = barMs / div;
    items.push(new AlfredMsItem(ms, div));
  }

  return items;
}

class AlfredMsItem {
  constructor(ms, div) {
    this.title = `${ms} ms`;
    this.subtitle = `1/${div}`;
    this.arg = ms;
  }
}

const query = process.argv.slice(2);

const workflowOutput = {
  items: bpmToNotesMs(query),
};

console.log(JSON.stringify(workflowOutput));

