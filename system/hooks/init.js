import {SYSTEM, SYSTEM_ID, SYSTEM_NAME} from "../CONSTANTS.js";

export function init() {
    console.log(`${SYSTEM_NAME} | Initializing  System`);
    CONFIG.SYSTEM = SYSTEM;
}