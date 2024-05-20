import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
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
import { BowlerChartStats } from '../modal/BowlerChartStats';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { generateInfoForEachMatch } from '../modal/data/DataGenerator';
import { MatchInfo } from '../modal/Match';
import { bowlerData } from '../modal/data/bowlerData';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    NgxChartsModule,
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
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent implements AfterViewInit {
  view: [number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Stats';
  showYAxisLabel: boolean = true;
  xAxisLabel = 'Bowler';
  colorScheme = 'cool';

  matchInfo: MatchInfo[];
  @ViewChild(MatSort) sort: MatSort;
  bowlerStats: BowlerTableStats[] = [];
  tableDataSource: MatTableDataSource<BowlerTableStats> =
    new MatTableDataSource();
  bowlerStatsFor6Overs: BowlerTableStats[] = [];
  bowlerChartStatsFor6Overs: BowlerChartStats[] = [];
  bowlerChartStats: BowlerChartStats[] = [];
  displayedColumns: string[] = [
    'id',
    'matches',
    'innings',
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

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
