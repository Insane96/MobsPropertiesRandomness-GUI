class PotionEffect {
	constructor(id, amplifier, chance, ambient, hide_particles, dimensions, biomes) {
		this.id = id;
		this.amplifier = amplifier;
		this.chance = chance;
		this.ambient = ambient;
		this.hide_particles = hide_particles;
		this.dimensions = dimensions;
		this.biomes = biomes;
	}
}

PotionEffect.count = 0;
PotionEffect.form = "<table class=\"potion_effect_table\"><tr><td colspan=\"2\"><p class=\"form_name\">Potion Effect #%0</p></td></tr><tr><td>Id <input class=\"has_tooltip\" data-tooltip=\"The Potion Effect ID\" onmouseenter=\"ShowTooltip('The Potion Effect ID', this)\" onmouseleave=\"HideTooltip()\" type=\"text\" id=\"potion_effect_id_%0\" placeholder=\"minecraft:regeneration\" /><br /></td><td>Amplifier Min & Max<br /><input onmouseenter=\"ShowTooltip('The minimum amplifier possible when the potion effect is applied', this)\" onmouseleave=\"HideTooltip()\" type=\"number\" id=\"potion_effect_amplifier_min_%0\" min=\"0\" max=\"255\" value=\"0\" /> <input onmouseenter=\"ShowTooltip('The maximum amplifier possible when the potion effect is applied', this)\" onmouseleave=\"HideTooltip()\" type=\"number\" id=\"potion_effect_amplifier_max_%0\" min=\"0\" max=\"255\" value=\"0\" /></td></tr><tr><td><p class=\"chance_title\">Chance</p>Amount <input onmouseenter=\"ShowTooltip('Percentage Chance for this Potion Effect to be Applied', this)\" onmouseleave=\"HideTooltip()\" type=\"number\" id=\"potion_effect_chance_amount_%0\" min=\"0\" max=\"100\" step=\"0.1\" value=\"100\" /> <br />Is Affected By Difficulty <input onmouseenter=\"ShowTooltip('If the percentage chance should be modified by Difficulty', this)\" onmouseleave=\"HideTooltip()\" type=\"checkbox\" id=\"potion_effect_chance_affected_by_difficulty_%0\" /> <br />Is Local Difficulty <input onmouseenter=\"ShowTooltip('If percentage chance should be modified by Local Difficulty (aka Regional Difficulty) instead of plain difficulty (Easy, Normal or Hard)', this)\" onmouseleave=\"HideTooltip()\" type=\"checkbox\" id=\"potion_effect_chance_is_local_difficulty_%0\" /> <br />Multiplier <input onmouseenter=\"ShowTooltip('Multiplier for the percentage chance', this)\" onmouseleave=\"HideTooltip()\" type=\"number\" id=\"potion_effect_chance_multiplier_%0\" min=\"0\" max=\"128\" value=\"1\" /></td><td>Ambient <input onmouseenter=\"ShowTooltip('If potion effect particles should be visible partially like beacon effects ones', this)\" onmouseleave=\"HideTooltip()\" type=\"checkbox\" id=\"potion_effect_ambient_%0\" /> <br />Hide Particles <input onmouseenter=\"ShowTooltip('If particles should not be displayed at all', this)\" onmouseleave=\"HideTooltip()\" type=\"checkbox\" id=\"potion_effect_hide_particles_%0\" /></td></tr><tr><td>Dimensions<br /><textarea onmouseenter=\"ShowTooltip('A list of dimensions where the potion effect should be applied. NOTE: only one dimension per line', this)\" onmouseleave=\"HideTooltip()\" id=\"potion_effect_dimensions_%0\" cols=\"5\" rows=\"5\" placeholder=\"0\n-1\"></textarea></td><td>Biomes<br /><textarea onmouseenter=\"ShowTooltip('A list of biomes where the potion effect should be applied. NOTE: only one biome per line', this)\" onmouseleave=\"HideTooltip()\" id=\"potion_effect_biomes_%0\" cols=\"25\" rows=\"5\" placeholder=\"minecraft:plains\nminecraft:desert\"></textarea></td></tr></table>";

function AddPotionEffect() {
	container = document.createElement("div");
	container.id = "potion_effect_" + PotionEffect.count;

	pe_form = PotionEffect.form.replace(/%0/g, PotionEffect.count);

	container.innerHTML = pe_form;

	DOM.potion_effects.appendChild(container);

	PotionEffect.count++;
}

function GetPotionEffects() {
	potion_effects = [];
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

		potion_effects.push(potion_effect);
	}

	return potion_effects;
}