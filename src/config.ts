import packageJson from "../package.json";

export const FRONTEND_ACCEPT = 'application/hex+x-ndjson';

export const production = process.env.NODE_ENV === 'production';
export const applicationURL = 'localhost:1234'
