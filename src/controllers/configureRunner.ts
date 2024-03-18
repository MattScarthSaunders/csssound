import * as Tone from 'tone';
import { statusUpdate } from './statusUpdate';
import { setupInstruments } from '../utils/tone';

export const configureRunner = async () => {
  await Tone.start();
  Tone.setContext(new AudioContext());

  await statusUpdate('Tuning instruments...');

  const synths = setupInstruments();

  return synths;
};
