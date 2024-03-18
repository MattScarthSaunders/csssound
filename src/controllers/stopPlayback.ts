import { state } from '../state';

export const stopPlayback = () => {
  const { transport } = state;
  transport.cancel();
  transport.stop();
  state.isRunning = false;
};
