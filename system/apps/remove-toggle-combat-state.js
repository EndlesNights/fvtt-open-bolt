export function removeToggleCombatState(){
    //Currently disabled the Combat State Button as with how Combat Tracker works in this module, it funcationly does nothing.
    //Will consider removing the vissual instead if new function can not be found.
	TokenHUD.prototype._onClickControl = (function(){
		const original = TokenHUD.prototype._onClickControl;
		return function() {
			if (arguments[0].currentTarget.dataset.action === "combat") return console.log("Currently turned off to do nothing.")
			return original.apply(this, arguments);
		}
	})();
}