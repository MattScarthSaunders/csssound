'use strict';
import * as Tone from 'tone';
import { statusUpdate } from './utils';
import {
  handlePlaybackFinished,
  populateTransport,
  setupInstruments,
} from './toneFuncs';

let statusText = '';
let isRunning = false;

let bgcSynth;
let cSynth;
let t = Tone.Transport;

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === 'STOP') {
    t.cancel();
    t.stop();
    isRunning = false;
    sendResponse({});
  }

  if (request.type === 'START') {
    isRunning = true;

    await Tone.start();
    Tone.setContext(new AudioContext());

    statusText = await statusUpdate('Tuning instruments...', isRunning);

    const { synth1, synth2 } = setupInstruments(bgcSynth, cSynth, Tone);

    t.start();

    statusText = await statusUpdate('Composing...', isRunning);

    const { finalTime, elementCount } = await populateTransport(
      t,
      synth1,
      synth2,
      Tone
    );

    statusText = await statusUpdate(
      `${elementCount} notes plotted, the recital is now underway...`,
      isRunning
    );

    await handlePlaybackFinished(t, finalTime);

    isRunning = false;

    statusText = await statusUpdate(
      `This performance has finished. I hope you enjoyed the dulcet tones of ${window.location.hostname}`,
      isRunning
    );
  }

  if (request.type === 'GET_STATUS') {
    sendResponse({ isRunning, statusText });
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({ isRunning, statusText });
  return true;
});
