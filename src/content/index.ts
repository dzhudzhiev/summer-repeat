import type { DayData } from './types';
import { day01 } from './week-01/day-01';
import { day02 } from './week-01/day-02';
import { day03 } from './week-01/day-03';
import { day04 } from './week-01/day-04';
import { day05 } from './week-01/day-05';
import { day06 } from './week-02/day-06';
import { day07 } from './week-02/day-07';
import { day08 } from './week-02/day-08';
import { day09 } from './week-02/day-09';
import { day10 } from './week-02/day-10';
import { day11 } from './week-03/day-11';
import { day12 } from './week-03/day-12';
import { day13 } from './week-03/day-13';
import { day14 } from './week-03/day-14';
import { day15 } from './week-03/day-15';
import { day16 } from './week-04/day-16';
import { day17 } from './week-04/day-17';
import { day18 } from './week-04/day-18';
import { day19 } from './week-04/day-19';
import { day20 } from './week-04/day-20';
import { day21 } from './week-05/day-21';
import { day22 } from './week-05/day-22';
import { day23 } from './week-05/day-23';
import { day24 } from './week-05/day-24';
import { day25 } from './week-05/day-25';
import { day26 } from './week-06/day-26';
import { day27 } from './week-06/day-27';
import { day28 } from './week-06/day-28';
import { day29 } from './week-06/day-29';
import { day30 } from './week-06/day-30';
import { day31 } from './week-07/day-31';
import { day32 } from './week-07/day-32';
import { day33 } from './week-07/day-33';
import { day34 } from './week-07/day-34';
import { day35 } from './week-07/day-35';
import { day36 } from './week-08/day-36';
import { day37 } from './week-08/day-37';
import { day38 } from './week-08/day-38';
import { day39 } from './week-08/day-39';
import { day40 } from './week-08/day-40';
import { day41 } from './week-09/day-41';
import { day42 } from './week-09/day-42';
import { day43 } from './week-09/day-43';
import { day44 } from './week-09/day-44';
import { day45 } from './week-09/day-45';
import { day46 } from './week-10/day-46';
import { day47 } from './week-10/day-47';
import { day48 } from './week-10/day-48';
import { day49 } from './week-10/day-49';
import { day50 } from './week-10/day-50';
import { day51 } from './week-11/day-51';
import { day52 } from './week-11/day-52';
import { day53 } from './week-11/day-53';
import { day54 } from './week-11/day-54';
import { day55 } from './week-11/day-55';
import { day56 } from './week-12/day-56';
import { day57 } from './week-12/day-57';
import { day58 } from './week-12/day-58';
import { day59 } from './week-12/day-59';
import { day60 } from './week-12/day-60';

export const allDays: DayData[] = [
  day01, day02, day03, day04, day05,
  day06, day07, day08, day09, day10,
  day11, day12, day13, day14, day15,
  day16, day17, day18, day19, day20,
  day21, day22, day23, day24, day25,
  day26, day27, day28, day29, day30,
  day31, day32, day33, day34, day35,
  day36, day37, day38, day39, day40,
  day41, day42, day43, day44, day45,
  day46, day47, day48, day49, day50,
  day51, day52, day53, day54, day55,
  day56, day57, day58, day59, day60,
];

export function getDay(dayId: number): DayData | undefined {
  return allDays.find((d) => d.day === dayId);
}

export function getDaysInRange(start: number, end: number): DayData[] {
  return allDays.filter((d) => d.day >= start && d.day <= end);
}

export function getTotalDays(): number {
  return allDays.length;
}
