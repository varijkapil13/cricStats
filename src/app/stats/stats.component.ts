import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { DecimalPipe } from '@angular/common';
import { ChartConfigType } from '../types/ChartConfigType';
import { CHART_CONFIGS } from '../types/ConfigConstants';
import { generateChartData } from '../calculator/calculator.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective, DecimalPipe],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent {
  protected readonly CHART_CONFIGS = CHART_CONFIGS;

  constructor() {}

  getChartData(chartConfig: ChartConfigType) {
    return generateChartData(chartConfig);
  }
}
