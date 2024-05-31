import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository  = new LogRepositoryImpl(
    new FileSystemDatasource()
)

const mongoLogRepository  = new LogRepositoryImpl(
    new MongoLogDatasource()
)

const postgresLogRepository  = new LogRepositoryImpl(
    new PostgresLogDatasource()
)

const emailService = new EmailService();

export class Server {
    public static async start(){
        console.log('server started')

        //Mandar email
        // const emailService = new EmailService();
        // emailService.sendEmail({
        //     to: 'noa.4004@gmail.com',
        //     subject: 'testing email',
        //     htmlBody: `
        //     <h3>Logs de sistema - NOC </h3>
        //     `
        // })

        // //
        // const logs = await logRepository.getLogs(LogSeverityLevel.low)

        // console.log( logs );

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'http://k.com';               
        //         new CheckServiceMultiple(
        //             [fsLogRepository, mongoLogRepository],
        //             () => console.log(`${ url } is ok`),
        //             ( error ) => console.log( error ),
        //         ).execute( url );
        //     }
        // );
    }
}
