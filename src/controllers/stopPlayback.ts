import { state } from '../state';

export const stopPlayback = () => {
  state.transport.cancel();
  state.transport.stop();
  state.isRunning = false;
};
