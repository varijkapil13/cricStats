import { Bowler } from '../modal/Bowler';
import { BowlerTableStats } from '../modal/BowlerTableStats';
import { MatchInfo, OversInMatch } from '../modal/Match';
import { BallBowled } from '../modal/BallBowled';
import { ChartData } from 'chart.js';
import { ChartConfigType } from '../types/ChartConfigType';
import { generateInfoForEachMatch } from '../modal/data/DataGenerator';
import { bowlerData } from '../modal/data/bowlerData';
import {
  BowlerStatsConfig,
  powerplayOverRange,
} from '../types/BowlerStatsConfig';
import { TYPE_OPTIONS } from '../types/ConfigConstants';

export function generateBowlerStats(
  matchInfo: MatchInfo[],
  bowlers: Bowler[],
  config: BowlerStatsConfig,
): BowlerTableStats[] {
  let matches = matchInfo
    .filter((match: MatchInfo) => {
      return match.match.format.toLowerCase() === config.format.toLowerCase();
    })
    .filter((match: MatchInfo) => {
      if (config.type.toLowerCase() === TYPE_OPTIONS.official.value) {
        return match.match.type.toLowerCase() === TYPE_OPTIONS.official.value;
      } else if (config.type.toLowerCase() === TYPE_OPTIONS.practice.value) {
        return match.match.type.toLowerCase() === TYPE_OPTIONS.practice.value;
      } else {
        return match;
      }
    });
  // filter out ballsBowled for the range provided in config
  const powerplayRange = powerplayOverRange(config.format, config.powerplay);
  matches.forEach((match) => {
    match.ballsBowled = match.ballsBowled.filter((ball: BallBowled) => {
      return (
        ball.over >= powerplayRange.start && ball.over <= powerplayRange.end
      );
    });
  });
  let bowlerStats: BowlerTableStats[] = [];
  for (const bowler of bowlers) {
    bowlerStats.push({
      average: calculateAverageForBowler(bowler, matches),
      dots: calculateDotsForBowler(bowler, matches),
      economy: calculateEconomyForBowler(bowler, matches),
      fiveWickets: calculateFiveWicketsForBowler(bowler, matches),
      fourWickets: calculateFourWicketsForBowler(bowler, matches),
      hatTrick: calculateHatTricksForBowler(bowler, matches),
      maidens: calculateMaidensForBowler(bowler, matches),
      noBalls: calculateNoBallsForBowler(bowler, matches),
      overs: calculateOversBowledForBowler(bowler, matches),
      runs: calculateRunsForBowler(bowler, matches),
      strikeRate: calculateStrikeRateForBowler(bowler, matches),
      wickets: calculateWicketsForBowler(bowler, matches),
      wides: calculateWidesForBowler(bowler, matches),
      bowlerName: bowler.initials,
      id: bowler.initials,
      matches: calculateNoOfMatchesForBowler(bowler, matches),
    });
  }
  return bowlerStats.sort((a: BowlerTableStats, b: BowlerTableStats) => {
    // @ts-ignore
    let firstValue = String(a[config.sortBy]);
    // @ts-ignore
    let secondValue = String(b[config.sortBy]);
    return secondValue.localeCompare(firstValue);
  });
}

/**
 * Generate chart data for bowler stats
 * @param config
 * @returns ChartData object for bowler stats chart component to render chart
 *
 */
export function generateChartData(config: ChartConfigType): ChartData {
  const matchInfo = generateInfoForEachMatch();
  const bowlerStatsConfig: BowlerStatsConfig = {
    format: config.format,
    powerplay: config.powerplay,
    sortBy: config.sortBy,
    type: config.type,
  };

  const stats = generateBowlerStats(matchInfo, bowlerData, bowlerStatsConfig);
  const sortedStats = stats.sort((a: BowlerTableStats, b: BowlerTableStats) => {
    // @ts-ignore
    let firstValue = String(a[config.sortBy]);
    // @ts-ignore
    let secondValue = String(b[config.sortBy]);
    return firstValue.localeCompare(secondValue);
  });
  const datasets = config.dataPoints.map((dataPoint) => {
    return {
      // @ts-ignore
      data: sortedStats.map((stat) => stat[dataPoint.property]),
      label: dataPoint.name,
    };
  });
  let zeroValuesFromDataSets = removeZeroValuesFromDataSets(datasets);
  let labels = sortedStats.map((stat) => stat.bowlerName);
  let labelsCopy = JSON.parse(JSON.stringify(labels));
  if (zeroValuesFromDataSets.zeroIndexes.length > 0) {
    labelsCopy = labels.filter((label, index) => {
      return !zeroValuesFromDataSets.zeroIndexes.includes(index);
    });
  }
  return {
    labels: labelsCopy,
    datasets: zeroValuesFromDataSets.datasets,
  };
}

function removeZeroValuesFromDataSets(
  datasets: { data: any[]; label: string }[],
): {
  datasets: {
    data: any[];
    label: string;
  }[];
  zeroIndexes: number[];
} {
  // a dataset object can have multiple data arrays.
  // if all the data arrays have value 0, at the same index, remove that index from all data arrays
  let zeroIndexes: number[] = [];
  const datasetsCopy = JSON.parse(JSON.stringify(datasets));
  datasetsCopy.forEach((datasetsCopy: { data: any[]; label: string }) => {
    datasetsCopy.data.forEach((data, index) => {
      if (data === 0) {
        zeroIndexes.push(index);
      }
    });
  });
  zeroIndexes = Array.from(new Set(zeroIndexes));
  zeroIndexes.sort((a, b) => b - a);
  zeroIndexes.forEach((index) => {
    datasetsCopy.forEach((datasetsCopy: { data: any[]; label: string }) => {
      datasetsCopy.data.splice(index, 1);
    });
  });
  return { datasets: datasetsCopy, zeroIndexes };
}

function calculateNoOfMatchesForBowler(
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

function calculateRunsForBowler(bowler: Bowler, matches: MatchInfo[]): number {
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

function calculateWicketsForBowler(
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

function calculateMaidensForBowler(
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

function calculateNoBallsForBowler(
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
            (ballBowled.bowler === bowler.initials && ballBowled.noBall ? 1 : 0)
          );
        },
        0,
      )
    );
  }, 0);
}

function calculateWidesForBowler(bowler: Bowler, matches: MatchInfo[]): number {
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

function calculateDotsForBowler(bowler: Bowler, matches: MatchInfo[]): number {
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

function calculateHatTricksForBowler(
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

function calculateFourWicketsForBowler(
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

function calculateFiveWicketsForBowler(
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

function calculateStrikeRateForBowler(
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
            (ballBowled.bowler === bowler.initials && ballBowled.wicket ? 1 : 0)
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
            totalBallsInMatch + (ballBowled.bowler === bowler.initials ? 1 : 0)
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

function calculateAverageForBowler(
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
            (ballBowled.bowler === bowler.initials && ballBowled.wicket ? 1 : 0)
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

function calculateEconomyForBowler(
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
  let sumOfOvers = calculateOversBowledForBowler(bowler, matches);

  // economy = runs / overs
  // avoid division by 0
  if (sumOfOvers === 0) {
    return 0;
  }
  return sumOfRuns / sumOfOvers;
}

function calculateOversBowledForBowler(
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
