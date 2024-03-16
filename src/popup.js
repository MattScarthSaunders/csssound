'use strict';

import './popup.css';

(function () {
  function setupButtons() {
    document.getElementById('stopBtn').addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

        chrome.tabs.sendMessage(
          tab.id,
          {
            type: 'STOP',
          },
          () => {
            setDisablePlayButton(false);
            setTextStatus('');
          }
        );
      });
    });

    document.getElementById('playBtn').addEventListener('click', () => {
      document.getElementById('playBtn').disabled = true;
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];

        chrome.tabs.sendMessage(tab.id, {
          type: 'START',
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];

      chrome.tabs.sendMessage(
        tab.id,
        {
          type: 'GET_STATUS',
        },
        (response) => {
          setDisablePlayButton(response.isRunning);
          setTextStatus(response.statusText);
        }
      );
    });

    setupButtons();
  });

  chrome.runtime.onMessage.addListener(async (request) => {
    if (request.type === 'STATUS_UPDATE') {
      setDisablePlayButton(request.isRunning);
      setTextStatus(request.statusText);
    }
  });
})();

const setTextStatus = (status) => {
  document.getElementById('status').innerText = status;
};

const setDisablePlayButton = (state) => {
  document.getElementById('playBtn').disabled = state;
};
