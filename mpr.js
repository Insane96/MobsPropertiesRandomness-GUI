var DOM = {};
window.onload = function() {
	DOM.json = document.getElementById("json");
	DOM.potion_effects = document.getElementById("potion_effects");
	DOM.attributes = document.getElementById("attributes");

	DOM.version = document.getElementById("version");

	DOM.tooltip = document.getElementById("tooltip");

	DOM.version.addEventListener("mouseenter", function() {
		ShowTooltip("Missing Equipment and Mobs Specific Properties", DOM.version);
	});
	DOM.version.addEventListener("mouseleave", function() {
		HideTooltip();
	});
}

/*window.onbeforeunload = function() {
	return false;
}*/

function Mob(mob_id) {
	this.mob_id = mob_id;
	this.potion_effects = [];
	this.attributes = [];
}

function PotionEffect(id, amplifier, chance, ambient, hide_particles, dimensions, biomes) {
	this.id = id;
	this.amplifier = amplifier;
	this.chance = chance;
	this.ambient = ambient;
	this.hide_particles = hide_particles;
	this.dimensions = dimensions;
	this.biomes = biomes;
}

PotionEffect.count = 0;
PotionEffect.form = "<table class=\"potion_effect_table\"><tr><td colspan=\"2\"><p class=\"form_name\">Potion Effect #%0</p></td></tr><tr><td>Id <input type=\"text\" id=\"potion_effect_id_%0\" placeholder=\"minecraft:regeneration\" /><br /></td><td>Amplifier Min & Max<br /><input type=\"number\" id=\"potion_effect_amplifier_min_%0\" min=\"0\" max=\"255\" value=\"0\" /> <input type=\"number\" id=\"potion_effect_amplifier_max_%0\" min=\"0\" max=\"255\" value=\"0\" /></td></tr><tr><td><p class=\"chance_title\">Chance</p>Amount <input type=\"number\" id=\"potion_effect_chance_amount_%0\" min=\"0\" max=\"100\" step=\"0.1\" value=\"100\" /> <br />Is Affected By Difficulty <input type=\"checkbox\" id=\"potion_effect_chance_affected_by_difficulty_%0\" /> <br />Is Local Difficulty <input type=\"checkbox\" id=\"potion_effect_chance_is_local_difficulty_%0\" /> <br />Multiplier <input type=\"number\" id=\"potion_effect_chance_multiplier_%0\" min=\"0\" max=\"128\" value=\"1\" /></td><td>Ambient <input type=\"checkbox\" id=\"potion_effect_ambient_%0\" /> <br />Hide Particles <input type=\"checkbox\" id=\"potion_effect_hide_particles_%0\" /></td></tr><tr><td>Dimensions<br /><span class=\"tip\">One dimension per line</span><br /><textarea id=\"potion_effect_dimensions_%0\" cols=\"5\" rows=\"5\" placeholder=\"0\n-1\"></textarea></td><td>Biomes<br /><span class=\"tip\">One biome per line</span><br /><textarea id=\"potion_effect_biomes_%0\" cols=\"25\" rows=\"5\" placeholder=\"minecraft:plains\nminecraft:desert\"></textarea></td></tr></table>";

function Attribute(id, modifier, is_flat, affected_by_difficulty, difficulty, dimension, biomes) {
	this.id = id;
	this.modifier = modifier;
	this.is_flat = is_flat;
	this.affected_by_difficulty = affected_by_difficulty;
	this.difficulty = difficulty;
	this.dimensions = dimensions;
	this.biomes = biomes;
}

Attribute.count = 0;
Attribute.form = "<table class=\"potion_effect_table\"><tr><td colspan=\"2\"><p class=\"form_name\">Attribute #%0</p></td></tr><tr><td>Id <input type=\"text\" id=\"attribute_id_%0\" placeholder=\"generic.maxHealth\" /><br /></td><td>Modifier Min & Max<br /><input type=\"number\" id=\"attribute_modifier_min_%0\" min=\"0\" max=\"1024\" value=\"0\" /><input type=\"number\" id=\"attribute_modifier_max_%0\" min=\"0\" max=\"1024\" value=\"0\" /></td></tr><tr><td><p class=\"chance_title\">Difficulty</p>Affects Max Only<input type=\"checkbox\" id=\"attribute_difficulty_affects_max_only_%0\" /> <br />Is Local Difficulty <input type=\"checkbox\" id=\"attribute_difficulty_is_local_difficulty_%0\" /><br />Multiplier <input type=\"number\" id=\"attribute_difficulty_multiplier_%0\" min=\"0\" max=\"128\" step=\"0.1\" value=\"1\" /></td><td>Is Flat <input type=\"checkbox\" id=\"attribute_is_flat_%0\" /><br />Affected By Difficulty <input type=\"checkbox\" id=\"attribute_affected_by_difficulty_%0\" /></td></tr><tr><td>Dimensions<br /><span class=\"tip\">One dimension per line</span><br /><textarea id=\"attribute_dimensions_%0\" cols=\"5\" rows=\"5\" placeholder=\"0\n-1\"></textarea></td><td>Biomes<br /><span class=\"tip\">One biome per line</span><br /><textarea id=\"attribute_biomes_%0\" cols=\"25\" rows=\"5\" placeholder=\"minecraft:plains\nminecraft:desert\"></textarea></td></tr></table>";

function RangeMinMax(min, max) {
	this.min = min;
	this.max = max;
}

function Chance(amount, affected_by_difficulty, is_local_difficulty, multiplier) {
	this.amount = amount;
	this.affected_by_difficulty = affected_by_difficulty;
	this.is_local_difficulty = is_local_difficulty;
	this.multiplier = multiplier;
}

function Difficulty(affects_max_only, is_local_difficulty, multiplier) {
	this.affects_max_only = affects_max_only;
	this.is_local_difficulty = is_local_difficulty;
	this.multiplier = multiplier;
}

function AddPotionEffect() {
	container = document.createElement("div");
	container.id = "potion_effect_" + PotionEffect.count;

	pe_form = PotionEffect.form.replace(/%0/g, PotionEffect.count);

	container.innerHTML = pe_form;

	DOM.potion_effects.appendChild(container);

	PotionEffect.count++;
}

function AddAttribute() {
	container = document.createElement("div");
	container.id = "attribute_" + Attribute.count;

	attribute_form = Attribute.form.replace(/%0/g, Attribute.count);

	container.innerHTML = attribute_form;

	DOM.attributes.appendChild(container);

	Attribute.count++;
}

function Generate() {

	mob_id = GetInputValue("mob_id");
	mob = new Mob(mob_id);

	//Potion Effect
	for (var i = 0; i < PotionEffect.count; i++) {
		amount = GetInputValue("potion_effect_chance_amount_" + i);
		affected_by_difficulty = GetInputValue("potion_effect_chance_affected_by_difficulty_" + i);
		is_local_difficulty = GetInputValue("potion_effect_chance_is_local_difficulty_" + i);
		multiplier = GetInputValue("potion_effect_chance_multiplier_" + i);
		chance = new Chance(amount, affected_by_difficulty, is_local_difficulty, multiplier);
	
		min = GetInputValue("potion_effect_amplifier_min_" + i);
		max = GetInputValue("potion_effect_amplifier_max_" + i);
		amplifier = new RangeMinMax(min, max);
	
		id = GetInputValue("potion_effect_id_" + i);
		ambient = GetInputValue("potion_effect_ambient_" + i);
		hide_particles = GetInputValue("potion_effect_hide_particles_" + i);
		dimensions = GetInputValue("potion_effect_dimensions_" + i);
		if (dimensions != "") {
			dimensions = dimensions.split("\n");
			for (var d = 0; d < dimensions.length; d++) {
				dimensions[d] = parseInt(dimensions[d]);
			}
		}
		biomes = GetInputValue("potion_effect_biomes_" + i);
		if (biomes != "") {
			biomes = biomes.split("\n");
		}

		potion_effect = new PotionEffect(id, amplifier, chance, ambient, hide_particles, dimensions, biomes);

		mob.potion_effects.push(potion_effect);
	}

	//Attribute
	for (var i = 0; i < Attribute.count; i++) {
		affected_by_difficulty = GetInputValue("attribute_affected_by_difficulty_" + i);
		difficulty = null;
		if (affected_by_difficulty){
			affects_max_only = GetInputValue("attribute_difficulty_affects_max_only_" + i);
			is_local_difficulty = GetInputValue("attribute_difficulty_is_local_difficulty_" + i);
			multiplier = GetInputValue("attribute_difficulty_multiplier_" + i);
			difficulty = new Difficulty(affects_max_only, is_local_difficulty, multiplier);
		}

		min = GetInputValue("attribute_modifier_min_" + i);
		max = GetInputValue("attribute_modifier_max_" + i);
		modifier = new RangeMinMax(min, max);

		id = GetInputValue("attribute_id_" + i);
		is_flat = GetInputValue("attribute_is_flat_" + i);
		dimensions = GetInputValue("attribute_dimensions_" + i);
		if (dimensions != "") {
			dimensions = dimensions.split("\n");
			for (var d = 0; d < dimensions.length; d++) {
				dimensions[d] = parseInt(dimensions[d]);
			}
		}
		biomes = GetInputValue("attribute_biomes_" + i);
		if (biomes != "") {
			biomes = biomes.split("\n");
		}

		attribute = new Attribute(id, modifier, is_flat, affected_by_difficulty, difficulty, dimensions, biomes);
		mob.attributes.push(attribute);
	}

	json = JSON.stringify(mob, (key, value) => {
		//console.log(key + ": " + value);
		if (value !== null && value !== "")
			return value;
	}, "\t");
	DOM.json.innerHTML = json;

}

function ShowTooltip(text, dom) {
	DOM.tooltip.style.display = "initial";
	DOM.tooltip.innerHTML = text;
	x = dom.getBoundingClientRect().x - 200;
	y = dom.getBoundingClientRect().y + dom.getBoundingClientRect().height;
	/*if (DOM.tooltip.getBoundingClientRect().width < 200){
		DOM.tooltip.style.minWidth = 200px;
	}*/
	DOM.tooltip.style.left = x + "px";
	DOM.tooltip.style.top = y + "px";
	DOM.tooltip.style.visibility = "visible";
}

function HideTooltip() {
	DOM.tooltip.style.display = "none";
	DOM.tooltip.style.visibility = "hidden";
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