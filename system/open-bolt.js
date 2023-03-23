import {SYSTEM_ID} from "./CONSTANTS.js";
import {init} from "./hooks/init.js";

Hooks.once("init", init);