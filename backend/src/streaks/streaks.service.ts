import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { data } from './streaks';

export type Streak = {
  date: string;
  activities: number;
};

enum StreakState {
  COMPLETED = "COMPLETED",
  SAVED = "SAVED",
  AT_RISK = "AT_RISK",
}

@Injectable()
export class StreaksService {
  private readData(): Record<string, Streak[]> {
    return data;
  }

  private determineState(
    activities: number,
    missedDays: number,
    streakExists: boolean
  ): string {
    if (activities > 0) return StreakState.COMPLETED;

    if (streakExists) {
      if (missedDays < 3) return StreakState.SAVED; // Within recovery window
      if (missedDays === 3) return StreakState.AT_RISK; // Last chance to recover
    }

    return 'INCOMPLETE';
  }

  getStreak(caseId: string) {
    console.log('caseId', caseId)
    const data = this.readData()[caseId];
    if (!data) return { message: 'Case not found' };

    const today: string = dayjs().format('YYYY-MM-DD');
    let total = 0;
    let streakExists = false;
    let missedDays = 0;

    // Determine state for each day
    const days = data.map((day) => {
      if (day.activities > 0) {
        total++;
        streakExists = true;
        missedDays = 0; // Reset missed days on activity
      } else {
        missedDays++;
      }

      return {
        ...day,
        state: this.determineState(day.activities, missedDays, streakExists),
      };
    });

    return {
      activitiesToday: days.find((d) => d.date === today)?.activities || 0,
      total,
      days,
    };
  }
}
