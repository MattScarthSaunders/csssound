'use strict';
import { handlePlaybackFinished } from './utils/tone';
import { stopPlayback } from './controllers/stopPlayback';
import { configureRunner } from './controllers/configureRunner';
import { startPlayback } from './controllers/startPlayback';
import { state } from './state';

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === 'STOP') {
    stopPlayback();
    sendResponse({ isRunning: state.isRunning, statusText: state.statusText });
  }

  if (request.type === 'START') {
    const synths = await configureRunner();

    await startPlayback(synths);

    handlePlaybackFinished();
  }

  if (request.type === 'GET_STATUS') {
    sendResponse({ isRunning: state.isRunning, statusText: state.statusText });
  }

  sendResponse({ isRunning: state.isRunning, statusText: state.statusText });
  return true;
});
