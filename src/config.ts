import packageJson from "../package.json";

const packageConfig = packageJson.solid;

export const FRONTEND_ACCEPT = 'application/hex+x-ndjson';

export const production = process.env.NODE_ENV === 'production';
export const applicationURL = production
  ? packageConfig.applicationURL.production
  : packageConfig.applicationURL.development;
