import { MatchInfo } from '../Match';
import { matchData } from './matchData';
import { ballsBowledData } from './ballsBowled';

export function generateInfoForEachMatch() {
  let matchInfo: MatchInfo[] = [];
  // for each match in matchData
  // matchInfo.push(new MatchInfo(match, ballsBowled));
  for (const match of matchData) {
    matchInfo.push(
      new MatchInfo(
        match,
        ballsBowledData.filter((ball) => ball.match === match.id),
      ),
    );
  }
  return matchInfo;
}
