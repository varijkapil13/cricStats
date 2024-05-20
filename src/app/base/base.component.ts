import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { ChartConfigType } from '../types/ChartConfigType';
import {
  generateBowlerStats,
  generateChartData,
} from '../calculator/calculator.service';
import { CHART_CONFIGS, TABLE_CONFIGS } from '../types/ConfigConstants';
import { DecimalPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BowlerTableStats } from '../modal/BowlerTableStats';
import { generateInfoForEachMatch } from '../modal/data/DataGenerator';
import { BowlerStatsConfig } from '../types/BowlerStatsConfig';
import { bowlerData } from '../modal/data/bowlerData';
import { MatchInfo } from '../modal/Match';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    BaseChartDirective,
    MatCardModule,
    DecimalPipe,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
})
export class BaseComponent implements AfterViewInit {
  matchInfo: MatchInfo[];
  @ViewChild(MatSort) sort: MatSort;
  t20DataSource: MatTableDataSource<BowlerTableStats> =
    new MatTableDataSource();
  odiDataSource: MatTableDataSource<BowlerTableStats> =
    new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'matches',
    'overs',
    'runs',
    'wickets',
    'maidens',
    'dots',
    'economy',
    'average',
    'strikeRate',
    'hatTrick',
    'fourWickets',
    'fiveWickets',
    'wides',
    'noBalls',
  ];
  protected readonly CHART_CONFIGS = CHART_CONFIGS;

  constructor() {
    this.matchInfo = generateInfoForEachMatch();
    this.generateT20TableSource(TABLE_CONFIGS.tableT20AllOvers);
    this.generateOdiTableSource(TABLE_CONFIGS.tableOdiAllOvers);
  }

  ngAfterViewInit() {
    this.t20DataSource.sort = this.sort;
    this.odiDataSource.sort = this.sort;
  }

  generateT20TableSource(bowlerConfig: BowlerStatsConfig) {
    let bowlerStats = generateBowlerStats(
      this.matchInfo,
      bowlerData,
      bowlerConfig,
    );
    this.t20DataSource = new MatTableDataSource(bowlerStats);
  }

  generateOdiTableSource(bowlerConfig: BowlerStatsConfig) {
    let bowlerStats = generateBowlerStats(
      this.matchInfo,
      bowlerData,
      bowlerConfig,
    );
    this.odiDataSource = new MatTableDataSource(bowlerStats);
  }

  public getChartData(config: ChartConfigType) {
    return generateChartData(config);
  }
}
