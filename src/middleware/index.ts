import { appMiddleware } from "./app";

/**
 * Middlewares which can be used in your app.
 *
 * @note Additional useful middlewares are added by `createStore`. See LRS.actions for the available
 *       features.
 */
export default [
  appMiddleware,
];
