import { Bowler } from './Bowler';
import { BallBowledInAMatch } from './BallBowledInAMatch';
import { Match } from './Match';

export interface Excel {
  bowlers: Bowler[];
  matches: Match[];
}
