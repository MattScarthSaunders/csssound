import { sendRuntimeMessage } from '../messaging';
import { state } from '../state';

export const statusUpdate = async (message: string) => {
  await new Promise((res) => setTimeout(res, 1000)); // ensure each ui update always displays for at least 1 second
  if (state.isRunning || message.includes('This performance has finished.')) {
    console.log('CSS Sound: ', message);
    state.statusText = message;
    sendRuntimeMessage('STATUS_UPDATE');
  }
};
