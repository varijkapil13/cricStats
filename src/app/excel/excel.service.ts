import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as ExcelJS from 'exceljs';
import { Bowler } from '../modal/Bowler';
import { BallBowledInAMatch, WicketType } from '../modal/BallBowledInAMatch';
import { Excel } from '../modal/Excel';
import { Match } from '../modal/Match';

const BOWLERS_WORKSHEET = 'Bowlers';
const MATCH_WORKSHEET = 'Match';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor(private http: HttpClient) {}

  getExcelFile() {
    return this.http.get('assets/Bowling_Stats.xlsx', { responseType: 'blob' });
  }

  async readExcelToJson(): Promise<Excel> {
    //
    const workbook = new ExcelJS.Workbook();
    let bowlers: Bowler[] = [];
    let matches: Match[] = [];

    const excelFile = await this.getExcelFile().toPromise();
    // @ts-ignore
    const arrayBuffer = await excelFile.arrayBuffer();
    const workbookData = await workbook.xlsx.load(arrayBuffer);
    workbookData.eachSheet((worksheet, sheetId) => {
      let ballsBowled: BallBowledInAMatch[] = [];
      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (worksheet.name === BOWLERS_WORKSHEET && rowNumber > 1) {
          let bowler = this.generateBowlerElement(row);
          if (bowler) {
            bowlers.push(bowler);
          }
        }
        if (worksheet.name.startsWith(MATCH_WORKSHEET) && rowNumber > 1) {
          ballsBowled.push(this.generateMatchElement(row));
        }
      });
      if (ballsBowled.length > 0) {
        matches.push(new Match(ballsBowled));
      }
    });

    return {
      bowlers,
      matches,
    };
  }

  private generateBowlerElement(row: ExcelJS.Row): Bowler | undefined {
    let id: number, firstName: string, lastName: string, initials: string;
    let bowler: Bowler;

    id = parseInt(row.getCell(1).text);

    firstName = row.getCell(2).text;

    lastName = row.getCell(3).text;

    initials = row.getCell(4).text;

    if (firstName === '' || lastName === '' || initials === '') {
      return undefined;
    }
    bowler = {
      id,
      firstName,
      lastName,
      initials,
    };
    return bowler;
  }

  private generateMatchElement(row: ExcelJS.Row): BallBowledInAMatch {
    let bowlerName: string,
      over: number,
      ball: number,
      runsScored: number,
      single: number,
      double: number,
      three: number,
      four: number,
      six: number,
      wide: boolean,
      noBall: boolean,
      legBye: number,
      bye: number,
      extraRuns: number,
      wicket: boolean,
      wicketType: WicketType;
    let match: BallBowledInAMatch;

    bowlerName = row.getCell(1).text;
    over = this.convertEmptyStringToZero(row.getCell(2).text);
    ball = this.convertEmptyStringToZero(row.getCell(3).text);
    runsScored = this.convertEmptyStringToZero(row.getCell(4).text);
    single = this.convertEmptyStringToZero(row.getCell(5).text);
    double = this.convertEmptyStringToZero(row.getCell(6).text);
    three = this.convertEmptyStringToZero(row.getCell(7).text);
    four = this.convertEmptyStringToZero(row.getCell(8).text);
    six = this.convertEmptyStringToZero(row.getCell(9).text);
    wide = this.convertEmptyStringToZero(row.getCell(10).text) === 1;
    noBall = this.convertEmptyStringToZero(row.getCell(11).text) === 1;
    legBye = this.convertEmptyStringToZero(row.getCell(12).text);
    bye = this.convertEmptyStringToZero(row.getCell(13).text);
    extraRuns = this.convertEmptyStringToZero(row.getCell(14).text);
    wicket = row.getCell(15).text.toLowerCase() === 'x';
    const bowled = row.getCell(16).text.toLowerCase() === 'x';
    const byCatch = row.getCell(17).text.toLowerCase() === 'x';
    const lbw = row.getCell(18).text.toLowerCase() === 'x';
    const runOut = row.getCell(19).text.toLowerCase() === 'x';
    if (bowled) {
      wicketType = WicketType.Bowled;
    } else if (byCatch) {
      wicketType = WicketType.Catch;
    } else if (lbw) {
      wicketType = WicketType.Lbw;
    } else if (runOut) {
      wicketType = WicketType.RunOut;
    } else {
      wicketType = WicketType.NotOut;
    }

    match = {
      bowlerName,
      over,
      ball,
      runsScored,
      single,
      double,
      three,
      four,
      six,
      wide,
      noBall,
      legBye,
      bye,
      extraRuns,
      wicket,
      wicketType,
    };
    return match;
  }

  private convertEmptyStringToZero(value: string): number {
    return value === '' ? 0 : parseInt(value);
  }
}
