import cron, { ScheduledTask }  from 'node-cron';
import moment from 'moment-timezone';
import { prismaClient } from './database';


let scheduledTask : ScheduledTask | null = null;

// Function to start the cron job
export function startScheduler() : void {
  if (!scheduledTask) {
    scheduledTask = cron.schedule(
      '45 18 * * *',
      async () => {
        const currentTime = moment().tz('Asia/Jakarta').format();
        console.log(`Running scheduled task at: ${currentTime}`);
        console.log('Limit telah diupdate')
        // Your task logic here
        await prismaClient.student.updateMany({
            where: {
                membership: "Basic",
            },
            data: {
                quota: 5,
            }
        })
      },
      {
        scheduled: true,
        timezone: 'Asia/Jakarta',
      }
    );
    console.log('Scheduler started!');
    console.log('Limit dari setiap student tanpa membership akan di reset ke 5 soal per hari pada pukul 18:45 WIB')
  } else {
    console.log('Scheduler is already running.');
  }
}