import { Transport } from 'tone/build/esm/core/clock/Transport';
import { isNonZero } from '../checkers';
import { convertCSSValuesToUseableFormats } from '../converters';
import * as tone from 'tone';
import { state } from '../../state';
import { fetchCSSProperties } from '../css';
import { Synths } from './types';
import { statusUpdate } from '../../controllers/statusUpdate';

export async function populateTransport(transport: Transport, synths: Synths) {
  let all = document.getElementsByTagName('*');

  for (let i = 0, max = all.length; i < max; i++) {
    const { dims, colors } = fetchCSSProperties(all[i]);

    if (!isNonZero(colors.rgbaBGColor)) {
      if (!isNonZero(colors.rgbaColor)) {
        continue;
      }
    }

    const formattedValues = convertCSSValuesToUseableFormats(dims, colors);

    const now = tone.now();

    scheduleNotesInTransport(transport, synths, formattedValues, now, i);

    if (i === max - 1) {
      state.finalTime = now + i / 40;
    }
  }

  return all.length;
}

export const scheduleNotesInTransport = (
  transport: Transport,
  synths: Synths,
  formattedValues: any,
  now: number,
  i: number
) => {
  const { isTall, isWide, bgColorResolvedValue, colorResolvedValue } =
    formattedValues;

  synths.synth1.volume.rampTo(isTall ? -1 : 0, 0.2);
  synths.synth2.volume.rampTo(isTall ? -1 : 0, 0.2);

  transport.schedule(() => {
    synths.synth1.triggerAttackRelease(
      bgColorResolvedValue,
      isWide ? '8n' : '4n'
    );
    synths.synth2.triggerAttackRelease(
      colorResolvedValue,
      isWide ? '8n' : '4n'
    );
  }, now + i / 40);
};

export const setupInstruments = () => {
  // declare synths
  const bgcSynth = new tone.Synth({
    envelope: { attack: 5, decay: 1, sustain: 1, release: 5 },
  });
  const cSynth = new tone.Synth({
    envelope: { attack: 2, decay: 1, sustain: 1, release: 2 },
  });

  // declare effects
  const reverb1 = new tone.Reverb();
  const reverb2 = new tone.Reverb();

  // add effects to synths
  bgcSynth.connect(reverb1);
  cSynth.connect(reverb2);

  // complete connection
  reverb1.toDestination();
  reverb2.toDestination();

  return { synth1: bgcSynth, synth2: cSynth };
};

export const handlePlaybackFinished = () => {
  state.transport.schedule(async () => {
    state.transport.cancel();
    state.transport.stop();
    state.isRunning = false;

    await statusUpdate(
      `This performance has finished. I hope you enjoyed the dulcet tones of ${window.location.hostname}`
    );
  }, state.finalTime + 1);
};
