import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { DecimalPipe } from '@angular/common';
import { ChartConfigType } from '../types/ChartConfigType';
import { CHART_CONFIGS } from '../types/ConfigConstants';
import { generateChartData } from '../calculator/calculator.service';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective, DecimalPipe],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent {
  protected readonly CHART_CONFIGS = CHART_CONFIGS;

  constructor() {
    //   Show data labels on the chartjs v4
    Chart.register(ChartDataLabels);
    Chart.defaults.set('plugins.datalabels', {
      formatter: Math.floor,
    });
  }

  getChartData(chartConfig: ChartConfigType) {
    return generateChartData(chartConfig);
  }
}
