import { Bowler } from './Bowler';

export interface BallBowledInAMatch {
  bowlerName: string;
  over: number;
  ball: number;
  runsScored: number;
  single?: number;
  double?: number;
  three?: number;
  four?: number;
  six?: number;
  wide: boolean;
  noBall: boolean;
  legBye: number;
  bye: number;
  extraRuns: number;
  wicket: boolean;
  wicketType: WicketType;
}
export enum WicketType {
  Bowled,
  Lbw,
  Catch,
  RunOut,
  HitWicket,
  NotOut,
}
