# CSS Sound

A silly little project that converts certain css properties of a webpage to audio.

## Dependencies

[Tone.js](https://tonejs.github.io/)

## How to run

- Clone the repo to a new directory
- `npm run build` in the terminal
- Open Chrome and navigate to `chrome://extensions/`
- Click `Load unpacked`
- Select the csssound/build directory you created
- Make sure it's activated in the browser
- Go to a website, open it up and hit play!
  - NOTE: sites which already use audio will not always work well (such as youtube), nor will it work on certain pages like `chrome://extensions/`, you need to be on an actual website page.

## Future improvements

It currently works, but I bashed it out for fun, so it's not incredibly well implemented. What I'm planning on working on in future if I find the will/time:

- Make it more rhythmic, currently there are two tones per element, which are completely coupled. It would be nice to have multiple channels running.
- instrument choices
- volume controls
- playback speed controls
- pausing
