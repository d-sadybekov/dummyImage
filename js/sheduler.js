import CronJob from "node-cron"
import fs from 'fs'
import path from 'path'

export const initScheduledJobs = () => {
  
  const directory = './result';
  const scheduledJobFunction = CronJob.schedule("*/5 * * * *", () => {
    console.log("I'm executed on a schedule!");
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
          fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
          });
        }
      });
  });

  scheduledJobFunction.start();
}




