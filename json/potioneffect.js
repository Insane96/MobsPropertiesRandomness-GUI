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
PotionEffect.form = "<table class=\"potion_effect_table\"><tr><td colspan=\"2\"><p class=\"form_name\">Potion Effect #%0</p></td></tr><tr><td>Id <input class=\"has_tooltip\" data-tooltip=\"The Potion Effect ID\" type=\"text\" id=\"potion_effect_id_%0\" placeholder=\"minecraft:regeneration\" /><br /></td><td>Amplifier Min & Max<br /><input class=\"has_tooltip\" data-tooltip=\"The minimum amplifier possible when the potion effect is applied\" type=\"number\" id=\"potion_effect_amplifier_min_%0\" min=\"0\" max=\"255\" value=\"0\" /> <input class=\"has_tooltip\" data-tooltip=\"The maximum amplifier possible when the potion effect is applied\" type=\"number\" id=\"potion_effect_amplifier_max_%0\" min=\"0\" max=\"255\" value=\"0\" /></td></tr><tr><td><p class=\"chance_title\">Chance</p>Amount <input class=\"has_tooltip\" data-tooltip=\"Percentage Chance for this Potion Effect to be Applied\" type=\"number\" id=\"potion_effect_chance_amount_%0\" min=\"0\" max=\"100\" step=\"0.1\" value=\"100\" /> <br />Is Affected By Difficulty <input class=\"has_tooltip\" data-tooltip=\"If the percentage chance should be modified by Difficulty\" type=\"checkbox\" id=\"potion_effect_chance_affected_by_difficulty_%0\" /> <br />Is Local Difficulty <input class=\"has_tooltip\" data-tooltip=\"If percentage chance should be modified by Local Difficulty (aka Regional Difficulty) instead of plain difficulty (Easy, Normal or Hard)\" type=\"checkbox\" id=\"potion_effect_chance_is_local_difficulty_%0\" /> <br />Multiplier <input class=\"has_tooltip\" data-tooltip=\"Multiplier for the percentage chance\" type=\"number\" id=\"potion_effect_chance_multiplier_%0\" min=\"0\" max=\"128\" value=\"1\" /></td><td>Ambient <input class=\"has_tooltip\" data-tooltip=\"If potion effect particles should be visible partially like beacon effects ones\" type=\"checkbox\" id=\"potion_effect_ambient_%0\" /><br />Hide Particles <input class=\"has_tooltip\" data-tooltip=\"If particles should not be displayed at all\" type=\"checkbox\" id=\"potion_effect_hide_particles_%0\" /></td></tr><tr><td>Dimensions<br /><textarea class=\"has_tooltip\" data-tooltip=\"A list of dimensions where the potion effect should be applied. NOTE: only one dimension per line\" id=\"potion_effect_dimensions_%0\" cols=\"5\" rows=\"5\" placeholder=\"0\n-1\"></textarea></td><td>Biomes<br /><textarea class=\"has_tooltip\" data-tooltip=\"A list of biomes where the potion effect should be applied. NOTE: only one biome per line\" id=\"potion_effect_biomes_%0\" cols=\"25\" rows=\"5\" placeholder=\"minecraft:plains\nminecraft:desert\"></textarea></td></tr></table>";

function AddPotionEffect() {
	container = document.createElement("div");
	container.id = "potion_effect_" + PotionEffect.count;

	pe_form = PotionEffect.form.replace(/%0/g, PotionEffect.count);

	container.innerHTML = pe_form;

	DOM.potion_effects.appendChild(container);

	RefreshTooltips();

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