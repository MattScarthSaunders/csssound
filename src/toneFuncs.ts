import { Transport } from 'tone/build/esm/core/clock/Transport';
import { toRGBA, isNonZero, getElementDimensionsPx } from './utils';
import * as tone from 'tone';

export async function populateTransport(
  transport: Transport,
  bgcSynth: tone.Synth,
  cSynth: tone.Synth
) {
  let all = document.getElementsByTagName('*');

  let finalTime;

  for (let i = 0, max = all.length; i < max; i++) {
    const style = window.getComputedStyle(all[i]);
    let rgbaBGColor = toRGBA(style.backgroundColor);
    let rgbaColor = toRGBA(style.color);
    const { width, height } = getElementDimensionsPx(all[i]);

    if (!isNonZero(rgbaBGColor)) {
      if (!isNonZero(rgbaColor)) {
        continue;
      }
    }

    const now = tone.now();

    const bgcv = Math.floor(rgbaBGColor.reduce((a, c) => a + c, 0) / 4);
    const cv = Math.floor(rgbaColor.reduce((a, c) => a + c, 0) / 4);

    const isTall = height >= width;
    const isWide = width >= height;

    bgcSynth.volume.rampTo(isTall ? -1 : 0, 0.2);
    cSynth.volume.rampTo(isTall ? -1 : 0, 0.2);

    transport.schedule(() => {
      bgcSynth.triggerAttackRelease(bgcv, isWide ? '8n' : '4n');
      cSynth.triggerAttackRelease(cv, isWide ? '8n' : '4n');
    }, now + i / 40);

    if (i === max - 1) {
      finalTime = now + i / 40;
    }
  }

  return { finalTime, elementCount: all.length };
}

export const setupInstruments = (bgcSynth: tone.Synth, cSynth: tone.Synth) => {
  bgcSynth = new tone.Synth({
    envelope: { attack: 5, decay: 1, sustain: 1, release: 5 },
  });
  cSynth = new tone.Synth({
    envelope: { attack: 2, decay: 1, sustain: 1, release: 2 },
  });

  const reverb1 = new tone.Reverb();
  const reverb2 = new tone.Reverb();

  bgcSynth.connect(reverb1);
  cSynth.connect(reverb2);

  reverb1.toDestination();
  reverb2.toDestination();

  return { synth1: bgcSynth, synth2: cSynth };
};

export const handlePlaybackFinished = async (
  transport: Transport,
  finalTime: number
) => {
  return new Promise(async (resolve) => {
    transport.schedule(async () => {
      transport.cancel();
      transport.stop();

      resolve(null);
    }, finalTime + 1);
  });
};
