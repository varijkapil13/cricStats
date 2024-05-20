import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { BowlerTableStats } from '../modal/BowlerTableStats';
import { CalculatorService } from '../calculator/calculator.service';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { generateInfoForEachMatch } from '../modal/data/DataGenerator';
import { MatchInfo } from '../modal/Match';
import { bowlerData } from '../modal/data/bowlerData';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData } from 'chart.js';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatTableModule,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatSortHeader,
    MatSortModule,
    MatGridList,
    MatGridTile,
    BaseChartDirective,
    DecimalPipe,
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent implements AfterViewInit {
  matchInfo: MatchInfo[];
  @ViewChild(MatSort) sort: MatSort;
  bowlerStats: BowlerTableStats[] = [];
  tableDataSource: MatTableDataSource<BowlerTableStats> =
    new MatTableDataSource();
  bowlerStatsFor6Overs: BowlerTableStats[] = [];
  bowlerChartStatsFor6Overs: ChartData<'bar'>;
  bowlerChartStats: ChartData<'bar'>;
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

  constructor(private calculatorService: CalculatorService) {
    this.matchInfo = generateInfoForEachMatch();
    this.bowlerStats = calculatorService.generateBowlerStats(
      this.matchInfo,
      bowlerData,
    );
    this.tableDataSource = new MatTableDataSource(this.bowlerStats);
    this.bowlerStatsFor6Overs =
      calculatorService.generateBowlerStatsForFirstSixOvers(
        this.matchInfo,
        bowlerData,
      );
    this.bowlerChartStatsFor6Overs = calculatorService.convertStatsToChartData(
      this.bowlerStatsFor6Overs,
    );
    this.bowlerChartStats = calculatorService.convertStatsToChartData(
      this.bowlerStats,
    );
  }

  ngAfterViewInit() {
    this.tableDataSource.sort = this.sort;
  }
}
