import { BallBowled } from './BallBowled';

export interface IMatch {
  id: number;
  date: string;
  format: string;
  location: string;
  against: string;
  type: string;
  team: string;
}

interface IMatchInfo {
  match: IMatch;
  ballsBowled: BallBowled[];
  readonly oversInMatch?: OversInMatch[];
}

export class MatchInfo implements IMatchInfo {
  constructor(match: IMatch, ballsBowled: BallBowled[]) {
    this.match = match;
    this.ballsBowled = ballsBowled;
    this.oversInMatch = convertBallBowledInMatchToOversInMatch(ballsBowled);
  }

  public match: IMatch;
  public ballsBowled: BallBowled[] = [];
  public oversInMatch: OversInMatch[];
}

export interface OversInMatch {
  over: number;
  balls: BallBowled[];
  bowlerName: string;
  runs: number;
  wickets: number;
  wide: number;
  noBall: number;
  legBye: number;
  bye: number;
  extraRuns: number;
  maiden: boolean;
  economy: number;
  dots: number;
  hatTrick: boolean;
}

function convertBallBowledInMatchToOversInMatch(
  ballsBowled: BallBowled[],
): OversInMatch[] {
  let oversInMatch: OversInMatch[] = [];
  let over: number = 0;
  let balls: BallBowled[] = [];
  let bowlerName: string = '';
  let runs: number = 0;
  let wickets: number = 0;
  let wide: number = 0;
  let noBall: number = 0;
  let legBye: number = 0;
  let bye: number = 0;
  let extraRuns: number = 0;
  let economy: number = 0;
  let dots: number = 0;
  let hatTrick: boolean = false;

  // for each ball in ballsBowled

  for (const ball of ballsBowled) {
    // if ball.over === over then add ball to balls and update runs, wickets, wide, noBall, legBye, bye, extraRuns, dots, hatTrick
    // if ball.wicket then check if wickets === 3 then hatTrick = true

    if (ball.over === over) {
      balls.push(ball);
      runs += ball.runs;
      if (ball.wicket && ball.wicketType !== 'RUNOUT') {
        wickets++;
      }
      if (ball.wide) {
        wide++;
      }
      if (ball.noBall) {
        noBall++;
      }
      if (ball.legBye != null && ball.legBye > 0) {
        legBye += ball.legBye;
      }
      if (ball.bye != null && ball.bye > 0) {
        bye += ball.bye;
      }
      if (ball.extraRuns != null && ball.extraRuns > 0) {
        extraRuns += ball.extraRuns;
      }
      if (ball.runs === 0) {
        dots++;
      }
      if (ball.wicket) {
        if (wickets === 3) {
          hatTrick = true;
        }
      }
    } else {
      economy = runs / balls.length;
      oversInMatch.push({
        over,
        balls,
        bowlerName,
        runs,
        wickets,
        wide,
        noBall,
        legBye,
        bye,
        extraRuns,
        maiden: runs === 0,
        economy,
        dots,
        hatTrick,
      });
      over = ball.over;
      balls = [ball];
      bowlerName = ball.bowler;
      runs = ball.runs;
      wickets = ball.wicket && ball.wicketType !== 'RUNOUT' ? 1 : 0;
      wide = ball.wide ? 1 : 0;
      noBall = ball.noBall ? 1 : 0;
      legBye = ball.legBye != null && ball.legBye > 0 ? ball.legBye : 0;
      bye = ball.bye != null && ball.bye > 0 ? ball.bye : 0;
      extraRuns =
        ball.extraRuns != null && ball.extraRuns > 0 ? ball.extraRuns : 0;
      economy = 0;
      dots = ball.runs === 0 ? 1 : 0;
      hatTrick = false;
    }
  }
  economy = runs / balls.length;
  oversInMatch.push({
    over,
    balls,
    bowlerName,
    runs,
    wickets,
    wide,
    noBall,
    legBye,
    bye,
    extraRuns,
    maiden: runs === 0,
    economy,
    dots,
    hatTrick,
  });
  return oversInMatch;
}
