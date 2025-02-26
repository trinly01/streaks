"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CheckIcon } from "@heroicons/react/24/solid";

enum StreakState {
  COMPLETED = "COMPLETED",
  SAVED = "SAVED",
  AT_RISK = "AT_RISK",
}

const StreakPage = () => {
  const searchParams = useParams();
  const caseParam = searchParams.case;
  const caseNumber = Number(caseParam) || 1;
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [streak, setStreak] = useState<{
    activitiesToday: number;
    total: number;
    days: { date: string; activities: number; state: string }[]
  } | null>(null);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/streaks/${caseNumber}`);
        if (!response.ok) throw new Error("Failed to fetch streak data");
        const data = await response.json();
        console.log('data', data)
        setStreak(data);
      } catch (error) {
        console.error("Error fetching streak data:", error);
      }
    };
    fetchStreak();
  }, [caseNumber]);

  if (!streak) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 text-center">
      <h1 className="text-2xl font-semibold text-gray-900">Your streak is {streak.total} days</h1>
      <p className="text-gray-600">Activities Today: {streak.activitiesToday}</p>
      <div className="mt-4 bg-white p-6 rounded-xl shadow-md flex flex-col items-center w-full max-w-md">
        <div className="flex gap-4">
          {streak.days.slice(-7).map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 relative ${
                  day.state === StreakState.COMPLETED ? "bg-purple-200 text-purple-600 border-purple-300" :
                  day.state === StreakState.SAVED ? "bg-gray-200 text-gray-500 border-gray-300" :
                  day.state === StreakState.AT_RISK ? "bg-yellow-400 text-white border-yellow-500" :
                  "bg-gray-200 text-gray-400"
                }`}
              >
                {day.state === StreakState.COMPLETED && <CheckIcon className="w-5 h-5 text-purple-600" />}
                {day.state !== StreakState.COMPLETED && daysOfWeek[new Date(day.date).getDay()][0]}
              </div>
              <span className={`mt-1 text-sm font-semibold ${
                day.state === StreakState.COMPLETED ? "text-purple-600" : "text-gray-500"
              }`}>{daysOfWeek[new Date(day.date).getDay()]}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 w-full h-1 bg-gray-200 relative">
          <div className="h-1 bg-purple-600" style={{ width: `${(streak.total / 7) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default StreakPage;