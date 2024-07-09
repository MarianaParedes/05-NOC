import { envs } from "./envs.plugin"



describe('env.plugin.ts', () => {
    test('should return env options', () => {
        
        expect( envs ).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'mariana.andrea.paredes@gmail.com',
            MAILER_SECRET_KEY: 'xitjjficpcdkuxae',
            PROD: false,
            MONGO_URL: 'mongodb://mariana:1234@localhost:27018/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'mariana',
            MONGO_PASS: '1234'
        });
    });

    test('should return error if not found env', async() => {
        
        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('./envs.plugin');
            expect(true).toBe(false);

        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }

    });
})