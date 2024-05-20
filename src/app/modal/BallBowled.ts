import { Bowler } from './Bowler';

export interface BallBowled {
  id: number;
  bowler: string;
  over: number;
  ball: number;
  overText: string;
  runs: number;
  single?: boolean;
  double?: boolean;
  three?: boolean;
  four?: boolean;
  six?: boolean;
  wide: boolean;
  noBall: boolean;
  legBye: number | null;
  bye: number | null;
  extraRuns: number | null;
  wicket: boolean;
  wicketType: string | null;
  match: number;
}
