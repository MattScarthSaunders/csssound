'use strict';

import { sendTabsMessage } from './messaging';
import './popup.css';
import { setDisableButton, setInnerText } from './utils/html';

(function () {
  function setupButtons() {
    document.getElementById('stopBtn')!.addEventListener('click', () => {
      sendTabsMessage('STOP', () => {
        setDisableButton('playBtn', false);
        setInnerText('status', '');
      });
      document.getElementById('wheel1')!.style.animation = 'none';
      document.getElementById('wheel2')!.style.animation = 'none';
    });

    document.getElementById('playBtn')!.addEventListener('click', () => {
      setDisableButton('playBtn', true);
      sendTabsMessage('START');
      document.getElementById('wheel1')!.style.animation =
        'rotate 2s linear infinite';
      document.getElementById('wheel2')!.style.animation =
        'rotate 2s linear infinite';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    sendTabsMessage('GET_STATUS', (response) => {
      setDisableButton('playBtn', response.isRunning);
      setInnerText('status', response.statusText);
    });

    setupButtons();
  });

  chrome.runtime.onMessage.addListener(async (request) => {
    if (request.type === 'STATUS_UPDATE') {
      setDisableButton('playBtn', request.isRunning);
      setInnerText('status', request.statusText);
    }
  });
})();
