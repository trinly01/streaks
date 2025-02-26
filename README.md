# Streaks Module (NestJS)

## Overview
This module follows **NestJS best practices**, implementing the **Streaks module** with a **Controller and Service**.  
The `streaks.ts` file is used as a **mock database** for the sake of the demo in this code assessment.  

In a real-world application, this would be replaced with a proper database like **PostgreSQL, MongoDB, or Firebase**.

---

## **Module Structure**
The **Streaks module** consists of the following components:

- **`streaks.ts`** – Simulates a database for testing.
- **`StreaksModule`** – Defines and imports the controller and service.
- **`StreaksController`** – Handles HTTP requests and responses.
- **`StreaksService`** – Contains business logic for calculating streaks.

---

## **How It Works**
1. **Client Calls API (Controller)**
   - Example: `GET /streaks/1`
   - The **StreaksController** receives the request and calls the service.

2. **Service Processes the Data**
   - The **StreaksService** fetches data from `streaks.ts` (mock database).
   - It applies logic to determine streak states (`COMPLETED`, `SAVED`, `AT_RISK`, etc.).
   - Returns the processed streak information.

3. **Response Sent to Client**
   - The API responds with the user's streak data based on the simulated database.

---

## **Why Use `streaks.ts`?**
✅ `streaks.ts` is just a **temporary mock database** for testing.  
✅ The architecture follows **NestJS module-based coding patterns**.  
✅ Can be easily swapped for a real **database** like PostgreSQL, MySQL, or MongoDB in a production environment.  

---

## **Future Improvement**
To integrate a real database, replace `streaks.ts` with an **ORM** like:

- [Prisma](https://www.prisma.io/)
- [TypeORM](https://typeorm.io/)
- [Mongoose (MongoDB)](https://mongoosejs.com/)


# How I Would Implement a Streak Reminder Notification System

## 1. Storing Streak Data  
If I were to implement this, I’d use **Firestore** to store each user’s streak data. Each entry would have:  
- `lastActivity`: A timestamp of when the user last logged an activity.  
- `streakCount`: The current number of consecutive active days.  
- `deviceTokens`: FCM tokens to send push notifications.  

## 2. Scheduling Streak Checks  
I’d set up a **Google Cloud Scheduler** job to run **hourly**. This job would trigger a **Cloud Function** that checks which users haven’t logged an activity in the past **24 hours**.

## 3. Detecting At-Risk Users & Sending Notifications  
Inside the Cloud Function, I’d query Firestore for users whose `lastActivity` timestamp is **older than 24 hours**. For each at-risk user, I’d send a push notification via **Firebase Cloud Messaging (FCM)**, reminding them to continue their streak.

## 4. Handling Notifications on the Frontend  
On the client side, I’d request notification permissions and store FCM tokens in Firestore. When a notification is received, I’d display an in-app alert or navigate the user directly to the streak page.

## Challenges & Considerations  
- **Timing Accuracy:** Since the check runs hourly, reminders might not be exactly at the 24-hour mark.  
- **Expired Tokens:** Users might uninstall or disable notifications, so I’d periodically clean up stale FCM tokens.  
- **User Preferences:** Some users might prefer reminders at specific times, so I’d add an option to customize this.  
- **Rate Limits:** Firebase has limits on notifications, so I’d batch messages efficiently.  

With this setup, I’d ensure the system is **scalable, reliable, and keeps users engaged** with minimal maintenance. 🚀  
