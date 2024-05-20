import { BowlerStatsConfig } from './BowlerStatsConfig';

export interface ChartConfigType extends BowlerStatsConfig {
  chartType: string;
  dataPoints: ChartConfigDataPointType[];
}

export interface ChartConfigDataPointType {
  name: string;
  property: string;
}
