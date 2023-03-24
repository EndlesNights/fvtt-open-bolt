import { SYSTEM, SYSTEM_ID } from "../CONSTANTS";

export class ActivationCombatTracker extends CombatTracker {

    /** @inheritdoc */
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			id: "combat",
			template: "systems/openbolt/templates/sidebar/activation-combat-tracker.html",
			title: "Combat Tracker",
			scrollY: [".directory-list"]
		});
	}

    	/** @inheritdoc */
	async getData(options) {
        const combat = this.viewed;
		const hasCombat = combat !== null;
		if(!hasCombat) return super.getData(options);

		const combats = this.combats;
		const currentIdx = combats.findIndex(c => c === combat);

        const data = await super.getData(options);

		data.phase = combat.phase;
		if(combat.phase && SYSTEM.activationPhases.indexOf(combat.phase) > 0){
			data.phase_label = `${combat._getCurrentPlayerName()} ${game.i18n.localize(`${SYSTEM_ID}.activationPhases.${combat.phase}`)}` ?? "";
		} else {
			data.phase_label = game.i18n.localize(`${SYSTEM_ID}.activationPhases.${combat.phase}`) ?? "";
		}

		data.turns = [];
		console.log(SYSTEM.activationPhases.indexOf(combat.phase))
		if(SYSTEM.activationPhases.indexOf(combat.phase) === 0){
			data.startPhase = true;
			for(const player of combat.combatants){
				if(player.getFlag(SYSTEM_ID, "armyID")){
					player.data.armyName = game.folders.get(player.getFlag(SYSTEM_ID, "armyID")).name;
					data.turns.push(player)
				}
			}
		} else {
			for(const unit of combat.combatants){
				if(unit.getFlag(SYSTEM_ID, "type") === "unit" && unit.getFlag(SYSTEM_ID, "userID") === combat._getCurrentPlayerID()){
					
					const hasAction = unit.getFlag(SYSTEM_ID, "hasAction");
					unit.toggleClass = hasAction ? "action" : "";
					unit.toggleTitle = hasAction ? "Unit Ready to take action" : "Unit has expended its action.";
					data.turns.push(unit);
				}
			}
		}

		if(combat.turnOrder.length){
			console.log(combat._getCurrentPlayerID() === game.userId);
			console.log(combat._getCurrentPlayerID());
			console.log(game.userId);
			data.control = (combat._getCurrentPlayerID() === game.userId);
			// data.control = true;
		}
		return data;
    }
}
