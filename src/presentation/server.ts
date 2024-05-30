import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository  = new LogRepositoryImpl(
    new FileSystemDatasource()
)

export class Server {
    public static start(){
        console.log('server started')

        //Mandar email
        const emailService = new EmailService();
        emailService.sendEmail({
            to: 'noa.4004@gmail.com',
            subject: 'testing email',
            htmlBody: `
            <h3>Logs de sistema - NOC </h3>
            `
        })

        // console.log(envs.MAILER_SECRET_KEY)

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'http://google.com';               
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${ url } is ok`),
        //             ( error ) => console.log( error ),
        //         ).execute( url );
        //     }
        // );
    }
}
