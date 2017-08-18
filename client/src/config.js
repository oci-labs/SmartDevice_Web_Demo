const prod = process.env.NODE_ENV === 'production';

console.log(`Loading ${process.env.NODE_ENV} config...`);

export const SERVER_URL = prod ? '' : 'http://localhost:8080';

export const CYCLE_COUNT_THRESHOLD = 10000;
