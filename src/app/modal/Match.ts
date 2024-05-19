import { BallBowledInAMatch, WicketType } from './BallBowledInAMatch';

interface IMatch {
  ballsBowled: BallBowledInAMatch[];
  readonly oversInMatch?: OversInMatch[];
}

export class Match implements IMatch {
  constructor(ballsBowled: BallBowledInAMatch[]) {
    this.ballsBowled = ballsBowled;
  }

  public ballsBowled: BallBowledInAMatch[] = [];

  get oversInMatch(): OversInMatch[] {
    return convertBallBowledInMatchToOversInMatch(this.ballsBowled);
  }
}

export interface OversInMatch {
  over: number;
  balls: BallBowledInAMatch[];
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
  ballsBowled: BallBowledInAMatch[],
): OversInMatch[] {
  let oversInMatch: OversInMatch[] = [];
  let over: number = 0;
  let balls: BallBowledInAMatch[] = [];
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
      runs += ball.runsScored;
      if (ball.wicket && ball.wicketType !== WicketType.RunOut) {
        wickets++;
      }
      if (ball.wide) {
        wide++;
      }
      if (ball.noBall) {
        noBall++;
      }
      if (ball.legBye > 0) {
        legBye += ball.legBye;
      }
      if (ball.bye > 0) {
        bye += ball.bye;
      }
      if (ball.extraRuns > 0) {
        extraRuns += ball.extraRuns;
      }
      if (ball.runsScored === 0) {
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
      bowlerName = ball.bowlerName;
      runs = ball.runsScored;
      wickets = ball.wicket && ball.wicketType !== WicketType.RunOut ? 1 : 0;
      wide = ball.wide ? 1 : 0;
      noBall = ball.noBall ? 1 : 0;
      legBye = ball.legBye;
      bye = ball.bye;
      extraRuns = ball.extraRuns;
      economy = 0;
      dots = ball.runsScored === 0 ? 1 : 0;
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
