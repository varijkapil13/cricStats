import { FORMAT_OPTIONS, POWERPLAY_OPTIONS } from './ConfigConstants';

export interface BowlerStatsConfig {
  powerplay: string;
  format: string;
  type: string;
  sortBy: string;
}

export class PowerplayOverRange {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    this.start = start - 1;
    this.end = end - 1;
  }
}

export const powerplayOverRange = (
  format: String,
  powerplay: String,
): PowerplayOverRange => {
  if (format === FORMAT_OPTIONS.T20.value) {
    if (powerplay === POWERPLAY_OPTIONS.powerplay.value) {
      return new PowerplayOverRange(1, 6);
    } else if (powerplay === POWERPLAY_OPTIONS.death.value) {
      return new PowerplayOverRange(16, 20);
    } else {
      return new PowerplayOverRange(1, 20);
    }
  } else {
    if (powerplay === POWERPLAY_OPTIONS.powerplay.value) {
      return new PowerplayOverRange(1, 10);
    } else if (powerplay === POWERPLAY_OPTIONS.death.value) {
      return new PowerplayOverRange(41, 50);
    } else {
      return new PowerplayOverRange(1, 50);
    }
  }
};
