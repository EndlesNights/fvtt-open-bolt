import { SYSTEM, SYSTEM_ID } from "../CONSTANTS";

export class ActivationCombat extends Combat {

    constructor(data, context) {
		super(data, context);
	}
	get phase() {
		return this.combatants.values().next().value?.getFlag(SYSTEM_ID, "phase") || SYSTEM.phases[0];
	}

	get isOwner(){
		return true;
	}

    nextTurn(options){
		if(SYSTEM.activationPhases.indexOf(this.phase)){
			this.nextPlayerTurn();
		} else {
			return this.nextRound();
		}
	}

	async nextRound() {
		this._resetUnitActionsOff();
		if(SYSTEM.activationPhases.indexOf(this.phase) === SYSTEM.activationPhases.length - 1){

			this.resetPlayerTurns();
			super.nextRound();
			this.combatants.values().next().value.setFlag(
				SYSTEM_ID,
				'phase',
				SYSTEM.activationPhases[0]
			);
			await this.render();
			return {turn: 0};
		}
		else if(SYSTEM.activationPhases.indexOf(this.phase) >= 0){
			this.combatants.values().next().value.setFlag(
				SYSTEM_ID,
				'phase',
				SYSTEM.activationPhases[SYSTEM.activationPhases.indexOf(this.phase)+1]
			);
			await this.render();
			return {turn: 0};
		}
		else {
			this.combatants.values().next().value.setFlag(
				SYSTEM_ID,
				'phase',
				SYSTEM.activationPhases[0]
			); // Back to the assign phase
			return super.nextRound()
		}
	}

    // nextPlayerTurn() {
	// 	if( this._getPlayerTurn() + 1 >= this.getFlag(SYSTEM_ID, 'playersSize')) { 
	// 		return this.combatants.values().next().value.setFlag(SYSTEM_ID, "playerTurn", 0);
	// 	}
	// 	return this.combatants.values().next().value.setFlag(SYSTEM_ID, "playerTurn", this._getPlayerTurn() + 1);
	// }
}
