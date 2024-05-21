import { CronJob } from "cron";

export class Server {
    public static start(){
        console.log('Server started....');
        var job = new CronJob(
            '******',
            ()=>{
                const date = new Date();
                console.log('message');
            },
        )
        job.start();
    }
}
