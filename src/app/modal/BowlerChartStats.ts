export interface BowlerChartStats {
  name: string;
  series: BowlerChartStatsSeries[];
}
export interface BowlerChartStatsSeries {
  name: string;
  value: number;
}
