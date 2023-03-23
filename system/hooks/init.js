import {SYSTEM, SYSTEM_ID, SYSTEM_NAME} from "../CONSTANTS.js";
import { removeToggleCombatState } from "../apps/remove-toggle-combat-state.js";

export function init() {
    console.log(`${SYSTEM_NAME} | Initializing  System`);
    CONFIG.SYSTEM = SYSTEM;

    removeToggleCombatState();
}