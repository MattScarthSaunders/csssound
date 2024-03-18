import { Transport } from 'tone/build/esm/core/clock/Transport';
import * as Tone from 'tone';

export type State = {
  statusText: string;
  isRunning: boolean;
  finalTime: number;
  elementCount: number;
  transport: Transport;
};

export const state: State = {
  statusText: '',
  isRunning: false,
  transport: Tone.Transport,
  finalTime: 0,
  elementCount: 0,
};
