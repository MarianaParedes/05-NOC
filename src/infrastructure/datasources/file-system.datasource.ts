import fs from 'fs';

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDatasource{

    private readonly logPath = 'logs/';

    private readonly allLogSPath = 'logs/logs-all.log';
    private readonly mediumLogSPath = 'logs/logs-medium.log';
    private readonly highLogSPath = 'logs/logs-high.log';

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles = () =>{
        if ( !fs.existsSync(this.logPath)){
            fs.mkdirSync( this.logPath)
        }

        [
            this.allLogSPath,
            this.mediumLogSPath,
            this.highLogSPath

        ].forEach( path => {
            if ( fs.existsSync( path )) return;
            fs.writeFileSync( path, '');
        })
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJSON = `${JSON.stringify(newLog)}\n`;

        fs.appendFileSync( this.allLogSPath, logAsJSON );
        
        if( newLog.level === LogSeverityLevel.low) return;
        
        if( newLog.level === LogSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogSPath, logAsJSON);
        }else{
            fs.appendFileSync(this.highLogSPath, logAsJSON)
        } 
    }

    // don´t repeat your self

    private getLogsFromFile = ( path: string ) : LogEntity[] => {
        const content = fs.readFileSync( path, `utf-8`);
        if ( content === '' ) return [];
        const logs = content.split('\n').map(LogEntity.fromJson);
        // const logs = content.split('\n').map(
        //     log => LogEntity.fromJson(log)
        // );
        return logs;
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        switch( severityLevel ){
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogSPath);
            
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogSPath);
            
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogSPath);
            
            default:
                throw new Error(`${ severityLevel} not implemented`);
        }
    }
}