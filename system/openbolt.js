import {SYSTEM_ID} from "./CONSTANTS.js";
import {init} from "./hooks/init.js";
import { dropfolder } from "./apps/drop-folder.js";

Hooks.once("init", init);

Hooks.on("dropCanvasData", dropfolder);