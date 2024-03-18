import * as Tone from 'tone';
import { statusUpdate } from './statusUpdate';
import { setupInstruments } from '../utils/tone';
import { state } from '../state';

export const configureRunner = async () => {
  await Tone.start();
  Tone.setContext(new AudioContext());
  state.isRunning = true;

  await statusUpdate('Tuning instruments...');

  const synths = setupInstruments();

  return synths;
};
