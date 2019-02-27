var DOM = {};
window.onload = function() {
	DOM.json = document.getElementById("json");
	DOM.potion_effects = document.getElementById("potion_effects");
	DOM.attributes = document.getElementById("attributes");

	DOM.version = document.getElementById("version");

	DOM.tooltip = document.getElementById("tooltip");
	
	RefreshTooltips();
}

/*window.onbeforeunload = function() {
	return false;
}*/

function Mob(mob_id) {
	this.mob_id = mob_id;
	this.potion_effects = [];
	this.attributes = [];
}

function Generate() {

	mob_id = GetInputValue("mob_id");
	mob = new Mob(mob_id);

	mob.potion_effects.push(GetPotionEffects());
	mob.potion_effects.push(GetAttributes());

	json = JSON.stringify(mob, (key, value) => {
		//console.log(key + ": " + value);
		if (value !== null && value !== "")
			return value;
	}, "\t");
	DOM.json.innerHTML = json;

}

function GetInputValue(id) {
	dom = document.getElementById(id);
	if (dom.tagName == "INPUT"){
		if (dom.type == "checkbox") {
			return dom.checked;
		}
		else if (dom.type == "number") {
			return parseFloat(dom.value);
		}
		else {
			return dom.value;
		}
	}
	else {
		return dom.value;
	}
}