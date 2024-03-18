import { state } from '../state';
import { populateTransport } from '../utils/tone';
import { Synths } from '../utils/tone/types';
import { statusUpdate } from './statusUpdate';

export const startPlayback = async (synths: Synths) => {
  state.transport.start();
  await statusUpdate('Composing...');

  const elementCount = await populateTransport(state.transport, synths);

  await statusUpdate(
    `${elementCount} notes plotted, the recital is now underway...`
  );
};
