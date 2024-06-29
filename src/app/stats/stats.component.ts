import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { DecimalPipe } from '@angular/common';
import { ChartConfigType } from '../types/ChartConfigType';
import { CHART_CONFIGS } from '../types/ConfigConstants';
import { generateChartData } from '../calculator/calculator.service';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ActivatedRoute } from '@angular/router';
import { MatchFormat } from '../modal/Match';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective, DecimalPipe],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent implements OnInit {
  protected readonly CHART_CONFIGS = CHART_CONFIGS;

  constructor(private route: ActivatedRoute) {
    //   Show data labels on the chartjs v4
    Chart.register(ChartDataLabels);
    Chart.defaults.set('plugins.datalabels', {
      formatter: Math.floor,
    });
  }

  ngOnInit(): void {}

  getConfigValue(value: string) {
    const format = this.route.snapshot.queryParamMap.get('format');
    if (format === 'T20') {
      // @ts-ignore
      return this.CHART_CONFIGS.T20[value];
    }
    // @ts-ignore
    return this.CHART_CONFIGS.ODI[value];
  }

  getChartData(chartConfig: ChartConfigType) {
    const format = this.route.snapshot.queryParamMap.get('format');
    return generateChartData(chartConfig, format as MatchFormat);
  }
}
