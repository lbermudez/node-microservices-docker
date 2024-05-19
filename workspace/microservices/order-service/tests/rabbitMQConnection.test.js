const amqp = require('amqplib');
const {connect, maxRetries} = require('../lib/rabbitMQConnection');

jest.mock('amqplib');

describe('connect', () => {
    const RETRY_TIME = 5;
    const RETRIES = 0
    const MAX_RETRIES = 3;
    let RETRY_OPTIONS;

    beforeEach(() => {
        jest.clearAllMocks();
        RETRY_OPTIONS = {retries: RETRIES, maxRetries: MAX_RETRIES, retryTime: RETRY_TIME};
    });

    it('should connect successfully on the first try', async () => {
        const mockConnection = { connected: true };
        amqp.connect.mockResolvedValue(mockConnection);

        const connectionString = 'amqp://localhost';
        const connection = await connect(connectionString, RETRY_OPTIONS);

        expect(amqp.connect).toHaveBeenCalledTimes(1);
        expect(amqp.connect).toHaveBeenCalledWith(connectionString);
        expect(connection).toBe(mockConnection);
    });

    it('should connect successfully after a few retries', async () => {
        const mockConnection = { connected: true };
        amqp.connect
            .mockRejectedValueOnce(new Error('Connection failed'))
            .mockRejectedValueOnce(new Error('Connection failed'))
            .mockResolvedValue(mockConnection);

        const connectionString = 'amqp://localhost';
        const connection = await connect(connectionString, RETRY_OPTIONS);

        expect(amqp.connect).toHaveBeenCalledTimes(3);
        expect(amqp.connect).toHaveBeenCalledWith(connectionString);
        expect(connection).toBe(mockConnection);
    });

    it('should throw an error after reaching max retries', async () => {
        amqp.connect.mockRejectedValue(new Error('Connection failed'));

        const connectionString = 'amqp://localhost';

        await expect(connect(connectionString, RETRY_OPTIONS)).rejects.toThrow('Max retries reached');
        expect(amqp.connect).toHaveBeenCalledTimes(MAX_RETRIES);
    });
});
