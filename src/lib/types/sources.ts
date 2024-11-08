import type { ValueOf } from './utils';

export const Service = {
  LOL: 'lol',
  LOR: 'lor',
  VAL: 'val',
  TFT: 'tft',
  WR: 'wr',
  RIOTGAMES: 'riotgames',
} as const;
export type Service = ValueOf<typeof Service>;

export const Source = {
  LOL: 'lol',
  LOL_ESPORTS: 'lol_esports',
  LOR: 'lor',
  VAL: 'val',
  VAL_ESPORTS: 'val_esports',
  TFT: 'tft',
  WR: 'wr',
  RIOTGAMES: 'riotgames',
} as const;
export type Source = ValueOf<typeof Source>;
