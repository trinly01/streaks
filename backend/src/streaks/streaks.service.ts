import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';

export type Streak = {
  date: string;
  activities: number;
};

@Injectable()
export class StreaksService {
  private dataFile = path.join(__dirname, 'streaks.json');

  private readData(): Record<string, Streak[]> {
    const rawData = fs.readFileSync(this.dataFile, 'utf-8');
    return JSON.parse(rawData) as Record<string, Streak[]>;
  }

  private determineState(
    activities: number,
    prevDayActivities: number,
    streakExists: boolean,
  ): string {
    if (activities > 0) return 'COMPLETED';
    if (
      streakExists &&
      (prevDayActivities > 0 || prevDayActivities === undefined)
    )
      return 'AT_RISK';
    return 'INCOMPLETE';
  }

  getStreak(caseId: string) {
    const data = this.readData()[caseId];
    if (!data) return { message: 'Case not found' };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const today: string = dayjs().format('YYYY-MM-DD');
    let total = 0;
    let streakExists = false;

    // Determine state for each day
    const days = data.map((day, index, arr) => {
      if (day.activities > 0) {
        total++;
        streakExists = true;
      }
      const prevDayActivities = index > 0 ? arr[index - 1].activities : 0;
      return {
        ...day,
        state: this.determineState(
          day.activities,
          prevDayActivities,
          streakExists,
        ),
      };
    });

    return {
      activitiesToday: days.find((d) => d.date === today)?.activities || 0,
      total,
      days,
    };
  }
}
