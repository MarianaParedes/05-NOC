import mongoose from "mongoose";
import { MongoDatabase } from "./init"



describe('init MongoDB', ()=>{

    afterAll(() => {
        mongoose.connection.close();
    })

    test('should connect to MongoDB', async() => {
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!, 
            mongoUrl: process.env.MONGO_URL!,
        })
        expect(connected).toBe(true);
    })

    test('should throw an error', async() => {

        try {
            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: 'mongodb://mariana:12555453@localhostfedfws:27018/'
            })
            expect(true).toBe(false);            
        } catch (error) {
        }
    })
})