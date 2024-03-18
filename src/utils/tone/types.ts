import { Synth } from 'tone';

export type Synths = {
  synth1: Synth;
  synth2: Synth;
};

export type FormattedValues = {
  isTall: boolean;
  isWide: boolean;
  bgColorResolvedValue: number;
  colorResolvedValue: number;
};
