import { Injectable } from '@angular/core';
import { Excel } from '../modal/Excel';
import { Bowler } from '../modal/Bowler';
import { BowlerTableStats } from '../modal/BowlerTableStats';
import { Match } from '../modal/Match';
import { WicketType } from '../modal/BallBowledInAMatch';
import { BowlerChartStats } from '../modal/BowlerChartStats';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {}

  generateBowlerStats(excel: Excel, bowlers: Bowler[]): BowlerTableStats[] {
    let bowlerStats: BowlerTableStats[] = [];
    for (const bowler of bowlers) {
      let matches = excel.matches;
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
    excel: Excel,
    bowlers: Bowler[],
  ): BowlerTableStats[] {
    let bowlerStats: BowlerTableStats[] = [];
    let matches = excel.matches;
    // filter out ballsBowled where over <= 6
    matches.forEach((match) => {
      match.ballsBowled = match.ballsBowled.filter((ball) => {
        return ball.over <= 5;
      });
    });
    console.log(matches);

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
    matches: Match[],
  ): number {
    // find how many Match objects contain at least 1 ballsBowled from where playerName === bowler.initials
    return matches.filter((match: Match) => {
      return match.ballsBowled.some((ballBowled) => {
        return ballBowled.bowlerName === bowler.initials;
      });
    }).length;
  }

  private calculateNoOfInningsForBowler(
    bowler: Bowler,
    matches: Match[],
  ): number {
    // find how many Match objects contain at least 1 ballsBowled from where playerName === bowler.initials
    return matches.filter((match: Match) => {
      return match.ballsBowled.some((ballBowled) => {
        return ballBowled.bowlerName === bowler.initials;
      });
    }).length;
  }

  private calculateRunsForBowler(bowler: Bowler, matches: Match[]): number {
    // sum of runs from oversInMatch where bowlerName === bowler.initials
    return matches.reduce((totalRuns, match) => {
      return (
        totalRuns +
        match.oversInMatch.reduce((totalRunsInMatch, over) => {
          return (
            totalRunsInMatch +
            (over.bowlerName === bowler.initials ? over.runs : 0)
          );
        }, 0)
      );
    }, 0);
  }

  private calculateWicketsForBowler(bowler: Bowler, matches: Match[]): number {
    // sum of wickets from ballsBowled where bowlerName === bowler.initials and WicketType !== 'run out'
    return matches.reduce((totalWickets, match) => {
      return (
        totalWickets +
        match.ballsBowled.reduce((totalWicketsInMatch, ballBowled) => {
          return (
            totalWicketsInMatch +
            (ballBowled.bowlerName === bowler.initials &&
            ballBowled.wicket &&
            ballBowled.wicketType !== WicketType.RunOut
              ? 1
              : 0)
          );
        }, 0)
      );
    }, 0);
  }

  private calculateMaidensForBowler(bowler: Bowler, matches: Match[]): number {
    // sum of maidens from oversInMatch where bowlerName === bowler.initials
    return matches.reduce((totalMaidens, match) => {
      return (
        totalMaidens +
        match.oversInMatch.reduce((totalMaidensInMatch, over) => {
          return (
            totalMaidensInMatch +
            (over.bowlerName === bowler.initials && over.maiden ? 1 : 0)
          );
        }, 0)
      );
    }, 0);
  }

  private calculateNoBallsForBowler(bowler: Bowler, matches: Match[]): number {
    // sum of noBalls from ballsBowled where bowlerName === bowler.initials
    return matches.reduce((totalNoBalls, match) => {
      return (
        totalNoBalls +
        match.ballsBowled.reduce((totalNoBallsInMatch, ballBowled) => {
          return (
            totalNoBallsInMatch +
            (ballBowled.bowlerName === bowler.initials && ballBowled.noBall
              ? 1
              : 0)
          );
        }, 0)
      );
    }, 0);
  }

  private calculateWidesForBowler(bowler: Bowler, matches: Match[]): number {
    // sum of wides from ballsBowled where bowlerName === bowler.initials
    return matches.reduce((totalWides, match) => {
      return (
        totalWides +
        match.ballsBowled.reduce((totalWidesInMatch, ballBowled) => {
          return (
            totalWidesInMatch +
            (ballBowled.bowlerName === bowler.initials && ballBowled.wide
              ? 1
              : 0)
          );
        }, 0)
      );
    }, 0);
  }

  private calculateDotsForBowler(bowler: Bowler, matches: Match[]): number {
    // sum of dots from ballsBowled where bowlerName === bowler.initials
    return matches.reduce((totalDots, match) => {
      return (
        totalDots +
        match.ballsBowled.reduce((totalDotsInMatch, ballBowled) => {
          return (
            totalDotsInMatch +
            (ballBowled.bowlerName === bowler.initials &&
            ballBowled.runsScored === 0
              ? 1
              : 0)
          );
        }, 0)
      );
    }, 0);
  }

  private calculateHatTricksForBowler(
    bowler: Bowler,
    matches: Match[],
  ): number {
    // sum of hatTricks from oversInMatch where bowlerName === bowler.initials
    return matches.reduce((totalHatTricks, match) => {
      return (
        totalHatTricks +
        match.oversInMatch.reduce((totalHatTricksInMatch, over) => {
          return (
            totalHatTricksInMatch +
            (over.bowlerName === bowler.initials && over.hatTrick ? 1 : 0)
          );
        }, 0)
      );
    }, 0);
  }

  private calculateFourWicketsForBowler(
    bowler: Bowler,
    matches: Match[],
  ): number {
    // return true when sum of wickets in a match = 4 where bowlerName === bowler.initials
    let fourWickets = 0;
    for (const match of matches) {
      let wickets = 0;
      let playerOvers = match.oversInMatch.filter((over) => {
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
    matches: Match[],
  ): number {
    // return true when sum of wickets in a match = 4 where bowlerName === bowler.initials
    let fiveWickets = 0;
    for (const match of matches) {
      let wickets = 0;
      let playerOvers = match.oversInMatch.filter((over) => {
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
    matches: Match[],
  ): number {
    // sum of wickets from ballsBowled where bowlerName === bowler.initials
    let wickets = matches.reduce((totalWickets, match) => {
      return (
        totalWickets +
        match.ballsBowled.reduce((totalWicketsInMatch, ballBowled) => {
          return (
            totalWicketsInMatch +
            (ballBowled.bowlerName === bowler.initials && ballBowled.wicket
              ? 1
              : 0)
          );
        }, 0)
      );
    }, 0);
    // sum of balls from ballsBowled where bowlerName === bowler.initials
    let ballsBowled = matches.reduce((totalBalls, match) => {
      return (
        totalBalls +
        match.ballsBowled.reduce((totalBallsInMatch, ballBowled) => {
          return (
            totalBallsInMatch +
            (ballBowled.bowlerName === bowler.initials ? 1 : 0)
          );
        }, 0)
      );
    }, 0);
    // strikeRate = balls / wickets
    // avoid division by 0
    if (wickets === 0) {
      return 0;
    }
    return ballsBowled / wickets;
  }
  private calculateAverageForBowler(bowler: Bowler, matches: Match[]): number {
    // sum of runs from ballsBowled where bowlerName === bowler.initials
    let runs = matches.reduce((totalRuns, match) => {
      return (
        totalRuns +
        match.ballsBowled.reduce((totalRunsInMatch, ballBowled) => {
          return (
            totalRunsInMatch +
            (ballBowled.bowlerName === bowler.initials
              ? ballBowled.runsScored
              : 0)
          );
        }, 0)
      );
    }, 0);
    // sum of wickets from ballsBowled where bowlerName === bowler.initials
    let wickets = matches.reduce((totalWickets, match) => {
      return (
        totalWickets +
        match.ballsBowled.reduce((totalWicketsInMatch, ballBowled) => {
          return (
            totalWicketsInMatch +
            (ballBowled.bowlerName === bowler.initials && ballBowled.wicket
              ? 1
              : 0)
          );
        }, 0)
      );
    }, 0);
    // average = runs / wickets
    // avoid division by 0
    if (wickets === 0) {
      return 0;
    }
    return runs / wickets;
  }
  private calculateEconomyForBowler(bowler: Bowler, matches: Match[]): number {
    // sum of runs from oversInMatch where bowlerName === bowler.initials
    let sumOfRuns = matches.reduce((totalRuns, match) => {
      return (
        totalRuns +
        match.oversInMatch.reduce((totalRunsInMatch, over) => {
          return (
            totalRunsInMatch +
            (over.bowlerName === bowler.initials ? over.runs : 0)
          );
        }, 0)
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
    matches: Match[],
  ): number {
    // sum of overs from oversInMatch where bowlerName === bowler.initials
    return matches.reduce((totalOvers, match) => {
      return (
        totalOvers +
        match.oversInMatch.reduce((totalOversInMatch, over) => {
          return (
            totalOversInMatch + (over.bowlerName === bowler.initials ? 1 : 0)
          );
        }, 0)
      );
    }, 0);
  }
}
