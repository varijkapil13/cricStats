export interface BowlerTableStats {
  id: string;
  bowlerName: string;
  matches: number;
  innings: number;
  overs: number;
  runs: number;
  wickets: number;
  bbf?: string;
  maidens: number;
  dots: number;
  economy: number;
  average: number;
  strikeRate: number;
  hatTrick: number;
  fourWickets: number;
  fiveWickets: number;
  wides: number;
  noBalls: number;
}
