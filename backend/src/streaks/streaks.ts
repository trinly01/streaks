export const data = {
  '1': [
    { date: '2025-02-22', activities: 0 },
    { date: '2025-02-23', activities: 1 }, // Activity 4 days ago (not breaking streak)
    { date: '2025-02-24', activities: 0 }, // Missed
    { date: '2025-02-25', activities: 0 }, // Missed
    { date: '2025-02-26', activities: 3 }, // Recovery with 3 activities today
    { date: '2025-02-27', activities: 0 },
    { date: '2025-02-28', activities: 0 },
    { date: '2025-02-29', activities: 0 },
  ],
  '2': [
    { date: '2025-02-22', activities: 0 },
    { date: '2025-02-23', activities: 1 }, // Activity 4 days ago
    { date: '2025-02-24', activities: 0 }, // Missed
    { date: '2025-02-25', activities: 1 }, // Activity 3 days ago (ongoing recovery)
    { date: '2025-02-26', activities: 1 }, // Activity today (not enough yet to recover fully)
    { date: '2025-02-27', activities: 0 },
    { date: '2025-02-28', activities: 0 },
    { date: '2025-02-29', activities: 0 },
  ],
  '3': [
    { date: '2025-02-22', activities: 0 },
    { date: '2025-02-23', activities: 1 }, // Activity 4 days ago
    { date: '2025-02-24', activities: 0 }, // Missed (streak in danger)
    { date: '2025-02-25', activities: 0 }, // Missed (streak lost)
    { date: '2025-02-26', activities: 3 }, // Activity today but streak already failed
    { date: '2025-02-27', activities: 0 },
    { date: '2025-02-28', activities: 0 },
    { date: '2025-02-29', activities: 0 },
  ],
};
