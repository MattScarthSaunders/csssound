import { state } from '../state';
import { MessagingResponse } from './types';

export const sendRuntimeMessage = (type: string) =>
  chrome.runtime.sendMessage({
    type: type,
    isRunning: state.isRunning,
    statusText: state.statusText,
  });

export const sendTabsMessage = (
  type: string,
  responseHandler?: (response: MessagingResponse) => void
) =>
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) =>
    chrome.tabs.sendMessage(
      tabs[0].id!,
      {
        type,
      },
      responseHandler!
    )
  );
