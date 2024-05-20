import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { IMatch, MatchInfo } from '../modal/Match';
import { matchData } from '../modal/data/matchData';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [
    DecimalPipe,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    DatePipe,
  ],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css',
})
export class MatchComponent implements AfterViewInit {
  matchInfo: MatchInfo[];
  @ViewChild(MatSort) sort: MatSort;
  matchDataSource: MatTableDataSource<IMatch> = new MatTableDataSource();
  displayedColumns: string[] = [
    'team',
    'against',
    'date',
    'format',
    'location',
    'type',
  ];

  constructor() {
    this.matchDataSource = new MatTableDataSource<IMatch>(
      matchData.sort((a, b) => a.date.localeCompare(b.date)),
    );
  }

  ngAfterViewInit() {
    this.matchDataSource.sort = this.sort;
  }
}
