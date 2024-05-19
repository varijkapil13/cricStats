import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ExcelService } from '../excel/excel.service';
import { Excel } from '../modal/Excel';
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
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { BowlerTableStats } from '../modal/BowlerTableStats';
import { CalculatorService } from '../calculator/calculator.service';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { BowlerChartStats } from '../modal/BowlerChartStats';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

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
  multi = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 7300000,
        },
        {
          name: '2011',
          value: 8940000,
        },
      ],
    },

    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 7870000,
        },
        {
          name: '2011',
          value: 8270000,
        },
      ],
    },

    {
      name: 'France',
      series: [
        {
          name: '2010',
          value: 5000002,
        },
        {
          name: '2011',
          value: 5800000,
        },
      ],
    },
  ];
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

  json: Excel | undefined;
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

  constructor(
    private excelService: ExcelService,
    private calculatorService: CalculatorService,
  ) {
    this.getExcelData().then(() => {
      if (this.json) {
        this.bowlerStats = calculatorService.generateBowlerStats(
          this.json,
          this.json.bowlers,
        );
        this.tableDataSource = new MatTableDataSource(this.bowlerStats);
        this.bowlerStatsFor6Overs =
          calculatorService.generateBowlerStatsForFirstSixOvers(
            this.json,
            this.json.bowlers,
          );
        this.bowlerChartStatsFor6Overs =
          calculatorService.convertStatsToChartData(this.bowlerStatsFor6Overs);
        this.bowlerChartStats = calculatorService.convertStatsToChartData(
          this.bowlerStats,
        );
      }
    });
  }

  ngAfterViewInit() {
    this.tableDataSource.sort = this.sort;
  }

  async getExcelData() {
    this.json = await this.excelService.readExcelToJson();
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
