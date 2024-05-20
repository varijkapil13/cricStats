import { Injectable } from '@angular/core';
import { Bowler } from '../modal/Bowler';
import { BowlerTableStats } from '../modal/BowlerTableStats';
import { MatchInfo, OversInMatch } from '../modal/Match';
import { BallBowled } from '../modal/BallBowled';
import { BowlerChartStats } from '../modal/BowlerChartStats';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {}

  generateBowlerStats(
    matches: MatchInfo[],
    bowlers: Bowler[],
  ): BowlerTableStats[] {
    let bowlerStats: BowlerTableStats[] = [];
    for (const bowler of bowlers) {
      bowlerStats.push({
        average: this.calculateAverageForBowler(bowler, matches),
        dots: this.calculateDotsForBowler(bowler, matches),
        economy: this.calculateEconomyForBowler(bowler, matches),
        fiveWickets: this.calculateFiveWicketsForBowler(bowler, matches),
        fourWickets: this.calculateFourWicketsForBowler(bowler, matches),
        hatTrick: this.calculateHatTricksForBowler(bowler, matches),
        innings: this.calculateNoOfInningsForBowler(bowler, matches),
        maidens: this.calculateMaidensForBowler(bowler, matches),
        noBalls: this.calculateNoBallsForBowler(bowler, matches),
        overs: this.calculateOversBowledForBowler(bowler, matches),
        runs: this.calculateRunsForBowler(bowler, matches),
        strikeRate: this.calculateStrikeRateForBowler(bowler, matches),
        wickets: this.calculateWicketsForBowler(bowler, matches),
        wides: this.calculateWidesForBowler(bowler, matches),
        bowlerName: bowler.initials,
        id: bowler.initials,
        matches: this.calculateNoOfMatchesForBowler(bowler, matches),
      });
    }
    return bowlerStats.sort((a, b) => {
      return b.wickets - a.wickets;
    });
  }

  generateBowlerStatsForFirstSixOvers(
    matches: MatchInfo[],
    bowlers: Bowler[],
  ): BowlerTableStats[] {
    let bowlerStats: BowlerTableStats[] = [];
    // filter out ballsBowled where over <= 6
    matches.forEach((match) => {
      match.ballsBowled = match.ballsBowled.filter((ball: BallBowled) => {
        return ball.over <= 5;
      });
    });

    for (const bowler of bowlers) {
      bowlerStats.push({
        average: this.calculateAverageForBowler(bowler, matches),
        dots: this.calculateDotsForBowler(bowler, matches),
        economy: this.calculateEconomyForBowler(bowler, matches),
        fiveWickets: this.calculateFiveWicketsForBowler(bowler, matches),
        fourWickets: this.calculateFourWicketsForBowler(bowler, matches),
        hatTrick: this.calculateHatTricksForBowler(bowler, matches),
        innings: this.calculateNoOfInningsForBowler(bowler, matches),
        maidens: this.calculateMaidensForBowler(bowler, matches),
        noBalls: this.calculateNoBallsForBowler(bowler, matches),
        overs: this.calculateOversBowledForBowler(bowler, matches),
        runs: this.calculateRunsForBowler(bowler, matches),
        strikeRate: this.calculateStrikeRateForBowler(bowler, matches),
        wickets: this.calculateWicketsForBowler(bowler, matches),
        wides: this.calculateWidesForBowler(bowler, matches),
        bowlerName: bowler.initials,
        id: bowler.initials,
        matches: this.calculateNoOfMatchesForBowler(bowler, matches),
      });
    }
    return bowlerStats
      .filter((items) => {
        return items.overs > 0;
      })
      .sort((a, b) => {
        return b.wickets - a.wickets;
      });
  }

  convertStatsToChartData(stats: BowlerTableStats[]): BowlerChartStats[] {
    return stats.map((stat) => {
      return {
        name: stat.bowlerName,
        series: [
          {
            name: 'Economy',
            value: stat.economy,
          },
          {
            name: 'Wickets',
            value: stat.wickets,
          },
          {
            name: 'Dots',
            value: stat.dots,
          },
          {
            name: 'Runs',
            value: stat.runs,
          },
        ],
      };
    });
  }

  private calculateNoOfMatchesForBowler(
    bowler: Bowler,
    matches: MatchInfo[],
  ): number {
    // find how many Match objects contain at least 1 ballsBowled from where playerName === bowler.initials
    return matches.filter((match: MatchInfo) => {
      return match.ballsBowled.some((ballBowled: BallBowled) => {
        return ballBowled.bowler === bowler.initials;
      });
    }).length;
  }

  private calculateNoOfInningsForBowler(
    bowler: Bowler,
    matches: MatchInfo[],
  ): number {
    // find how many Match objects contain at least 1 ballsBowled from where playerName === bowler.initials
    return matches.filter((match: MatchInfo) => {
      return match.ballsBowled.some((ballBowled: BallBowled) => {
        return ballBowled.bowler === bowler.initials;
      });
    }).length;
  }

  private calculateRunsForBowler(bowler: Bowler, matches: MatchInfo[]): number {
    // sum of runs from oversInMatch where bowlerName === bowler.initials
    return matches.reduce((totalRuns, match) => {
      return (
        totalRuns +
        match.oversInMatch.reduce(
          (totalRunsInMatch: number, over: OversInMatch) => {
            return (
              totalRunsInMatch +
              (over.bowlerName === bowler.initials ? over.runs : 0)
            );
          },
          0,
        )
      );
    }, 0);
  }

  private calculateWicketsForBowler(
    bowler: Bowler,
    matches: MatchInfo[],
  ): number {
    // sum of wickets from ballsBowled where bowlerName === bowler.initials and WicketType !== 'run out'
    return matches.reduce((totalWickets, match) => {
      return (
        totalWickets +
        match.ballsBowled.reduce(
          (totalWicketsInMatch: number, ballBowled: BallBowled) => {
            return (
              totalWicketsInMatch +
              (ballBowled.bowler === bowler.initials &&
              ballBowled.wicket &&
              ballBowled.wicketType !== 'RUNOUT'
                ? 1
                : 0)
            );
          },
          0,
        )
      );
    }, 0);
  }

  private calculateMaidensForBowler(
    bowler: Bowler,
    matches: MatchInfo[],
  ): number {
    // sum of maidens from oversInMatch where bowlerName === bowler.initials
    return matches.reduce((totalMaidens, match) => {
      return (
        totalMaidens +
        match.oversInMatch.reduce(
          (totalMaidensInMatch: number, over: OversInMatch) => {
            return (
              totalMaidensInMatch +
              (over.bowlerName === bowler.initials && over.maiden ? 1 : 0)
            );
          },
          0,
        )
      );
    }, 0);
  }

  private calculateNoBallsForBowler(
    bowler: Bowler,
    matches: MatchInfo[],
  ): number {
    // sum of noBalls from ballsBowled where bowlerName === bowler.initials
    return matches.reduce((totalNoBalls, match) => {
      return (
        totalNoBalls +
        match.ballsBowled.reduce(
          (totalNoBallsInMatch: number, ballBowled: BallBowled) => {
            return (
              totalNoBallsInMatch +
              (ballBowled.bowler === bowler.initials && ballBowled.noBall
                ? 1
                : 0)
            );
          },
          0,
        )
      );
    }, 0);
  }

  private calculateWidesForBowler(
    bowler: Bowler,
    matches: MatchInfo[],
  ): number {
    // sum of wides from ballsBowled where bowlerName === bowler.initials
    return matches.reduce((totalWides, match) => {
      return (
        totalWides +
        match.ballsBowled.reduce(
          (totalWidesInMatch: number, ballBowled: BallBowled) => {
            return (
              totalWidesInMatch +
              (ballBowled.bowler === bowler.initials && ballBowled.wide ? 1 : 0)
            );
          },
          0,
        )
      );
    }, 0);
  }

  private calculateDotsForBowler(bowler: Bowler, matches: MatchInfo[]): number {
    // sum of dots from ballsBowled where bowlerName === bowler.initials
    return matches.reduce((totalDots, match) => {
      return (
        totalDots +
        match.ballsBowled.reduce(
          (totalDotsInMatch: number, ballBowled: BallBowled) => {
            return (
              totalDotsInMatch +
              (ballBowled.bowler === bowler.initials && ballBowled.runs === 0
                ? 1
                : 0)
            );
          },
          0,
        )
      );
    }, 0);
  }

  private calculateHatTricksForBowler(
    bowler: Bowler,
    matches: MatchInfo[],
  ): number {
    // sum of hatTricks from oversInMatch where bowlerName === bowler.initials
    return matches.reduce((totalHatTricks, match) => {
      return (
        totalHatTricks +
        match.oversInMatch.reduce(
          (totalHatTricksInMatch: number, over: OversInMatch) => {
            return (
              totalHatTricksInMatch +
              (over.bowlerName === bowler.initials && over.hatTrick ? 1 : 0)
            );
          },
          0,
        )
      );
    }, 0);
  }

  private calculateFourWicketsForBowler(
    bowler: Bowler,
    matches: MatchInfo[],
  ): number {
    // return true when sum of wickets in a match = 4 where bowlerName === bowler.initials
    let fourWickets = 0;
    for (const match of matches) {
      let playerOvers = match.oversInMatch.filter((over: OversInMatch) => {
        return over.bowlerName === bowler.initials;
      });
      // sum of wickets in player overs
      let wicketsInAMatch = 0;
      for (const over of playerOvers) {
        wicketsInAMatch += over.wickets;
      }
      if (wicketsInAMatch === 4) {
        fourWickets++;
      }
    }
    return fourWickets;
  }

  private calculateFiveWicketsForBowler(
    bowler: Bowler,
    matches: MatchInfo[],
  ): number {
    // return true when sum of wickets in a match = 4 where bowlerName === bowler.initials
    let fiveWickets = 0;
    for (const match of matches) {
      let playerOvers = match.oversInMatch.filter((over: OversInMatch) => {
        return over.bowlerName === bowler.initials;
      });
      // sum of wickets in player overs
      let wicketsInAMatch = 0;
      for (const over of playerOvers) {
        wicketsInAMatch += over.wickets;
      }
      if (wicketsInAMatch >= 5) {
        fiveWickets++;
      }
    }
    return fiveWickets;
  }

  private calculateStrikeRateForBowler(
    bowler: Bowler,
    matches: MatchInfo[],
  ): number {
    // sum of wickets from ballsBowled where bowlerName === bowler.initials
    let wickets = matches.reduce((totalWickets, match) => {
      return (
        totalWickets +
        match.ballsBowled.reduce(
          (totalWicketsInMatch: number, ballBowled: BallBowled) => {
            return (
              totalWicketsInMatch +
              (ballBowled.bowler === bowler.initials && ballBowled.wicket
                ? 1
                : 0)
            );
          },
          0,
        )
      );
    }, 0);
    // sum of balls from ballsBowled where bowlerName === bowler.initials
    let ballsBowled = matches.reduce((totalBalls, match) => {
      return (
        totalBalls +
        match.ballsBowled.reduce(
          (totalBallsInMatch: number, ballBowled: BallBowled) => {
            return (
              totalBallsInMatch +
              (ballBowled.bowler === bowler.initials ? 1 : 0)
            );
          },
          0,
        )
      );
    }, 0);
    // strikeRate = balls / wickets
    // avoid division by 0
    if (wickets === 0) {
      return 0;
    }
    return ballsBowled / wickets;
  }

  private calculateAverageForBowler(
    bowler: Bowler,
    matches: MatchInfo[],
  ): number {
    // sum of runs from ballsBowled where bowlerName === bowler.initials
    let runs = matches.reduce((totalRuns, match) => {
      return (
        totalRuns +
        match.ballsBowled.reduce(
          (totalRunsInMatch: number, ballBowled: BallBowled) => {
            return (
              totalRunsInMatch +
              (ballBowled.bowler === bowler.initials ? ballBowled.runs : 0)
            );
          },
          0,
        )
      );
    }, 0);
    // sum of wickets from ballsBowled where bowlerName === bowler.initials
    let wickets = matches.reduce((totalWickets, match) => {
      return (
        totalWickets +
        match.ballsBowled.reduce(
          (totalWicketsInMatch: number, ballBowled: BallBowled) => {
            return (
              totalWicketsInMatch +
              (ballBowled.bowler === bowler.initials && ballBowled.wicket
                ? 1
                : 0)
            );
          },
          0,
        )
      );
    }, 0);
    // average = runs / wickets
    // avoid division by 0
    if (wickets === 0) {
      return 0;
    }
    return runs / wickets;
  }

  private calculateEconomyForBowler(
    bowler: Bowler,
    matches: MatchInfo[],
  ): number {
    // sum of runs from oversInMatch where bowlerName === bowler.initials
    let sumOfRuns = matches.reduce((totalRuns, match) => {
      return (
        totalRuns +
        match.oversInMatch.reduce(
          (totalRunsInMatch: number, over: OversInMatch) => {
            return (
              totalRunsInMatch +
              (over.bowlerName === bowler.initials ? over.runs : 0)
            );
          },
          0,
        )
      );
    }, 0);

    // sum of overs from oversInMatch where bowlerName === bowler.initials
    let sumOfOvers = this.calculateOversBowledForBowler(bowler, matches);

    // economy = runs / overs
    // avoid division by 0
    if (sumOfOvers === 0) {
      return 0;
    }
    return sumOfRuns / sumOfOvers;
  }

  private calculateOversBowledForBowler(
    bowler: Bowler,
    matches: MatchInfo[],
  ): number {
    // sum of overs from oversInMatch where bowlerName === bowler.initials
    return matches.reduce((totalOvers, match) => {
      return (
        totalOvers +
        match.oversInMatch.reduce(
          (totalOversInMatch: number, over: OversInMatch) => {
            return (
              totalOversInMatch + (over.bowlerName === bowler.initials ? 1 : 0)
            );
          },
          0,
        )
      );
    }, 0);
  }
}
