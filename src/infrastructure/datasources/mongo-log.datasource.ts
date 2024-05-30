import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource {
    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

    // async saveLog(log: LogEntity): Promise<void> {
    //     const newLog = await LogModel.create(log);
    //     await newLog.save();
    //     console.log('Mongo log created', newLog.id);
    // }

    // async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    //     const logs = await LogModel.find({
    //         level: severityLevel,
    //     });

    //     return logs.map()
    //     // return logs.map( mongoLog => LogEntity.fromObject(mongoLog));
    // }

}