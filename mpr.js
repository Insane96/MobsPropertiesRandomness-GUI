class Mob {
	constructor(mob_id) {
		this.mob_id = mob_id;
		this.potion_effects = null;
		this.attributes = null;
		this.equipment = null;
	}
}

var DOM = {};
window.onload = function() {
	DOM.json = document.getElementById("json");
	DOM.potion_effects = document.getElementById("potion_effects");
	DOM.attributes = document.getElementById("attributes");

	DOM.version = document.getElementById("version");

	DOM.tooltip = document.getElementById("tooltip");
	
	refreshTooltips();
}

/*window.onbeforeunload = function() {
    return false;
}*/

function generate() {

	mob_id = getInputValue("mob_id");
	mob = new Mob(mob_id);

	mandatory_fields = Array.from(document.getElementsByClassName("mandatory"));
	for (var e = 0; e < mandatory_fields.length; e++) {
		element = mandatory_fields[e];
		if (element.id != "" && !element.id.endsWith("%0") && !isValid(element))
			return null;
	}

	if (hasPotionEffects()){
		mob.potion_effects = getPotionEffects();
	}
	if (hasAttributes()) {
		mob.attributes = getAttributes();
	}

	json = JSON.stringify(mob, (key, value) => {
		if (value !== null && value !== "")
			return value;
	}, "\t");
	DOM.json.innerHTML = json;

	document.getElementById("download_json").style.visibility = "initial";

}

function downloadJson() {
	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(DOM.json.innerHTML);
	var downloadAnchorNode = document.createElement('a');
	var exportName = mob.mob_id;
	downloadAnchorNode.setAttribute("href", dataStr);
	downloadAnchorNode.setAttribute("download", exportName + ".json");
	document.body.appendChild(downloadAnchorNode); // required for firefox
	downloadAnchorNode.click();
	downloadAnchorNode.remove();
}

function getInputValue(id) {
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

function isValid(dom) {
	if (dom.tagName == "INPUT"){
		if (dom.type == "number") {
			if (parseFloat(dom.value) == null || isNaN(parseFloat(dom.value))) {
				alert(dom.id + " is mandatory!");
				return false;
			}
		}
		else {
			if (dom.value === null || dom.value == "") {
				alert(dom.id + " is mandatory!");
				return false;
			}
		}
	}
	else {
		if (dom.value === null) {
			alert(dom.id + " is mandatory!");
			return false;
		}
	}
	return true;
}