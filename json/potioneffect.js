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

function addPotionEffect() {
	pe_form = document.getElementById("potion_effect_form").cloneNode(true);
	pe_form.id = "potion_effect_" + PotionEffect.count;
	pe_form.className = "form";
	pe_form.innerHTML = pe_form.innerHTML.replace(/%0/g, PotionEffect.count);

	DOM.potion_effects.appendChild(pe_form);

	refreshTooltips();

	PotionEffect.count++;
}

function getPotionEffects() {
	potion_effects = [];
	for (var i = 0; i < PotionEffect.count; i++) {
		amount = getInputValue("potion_effect_chance_amount_" + i);
		affected_by_difficulty = getInputValue("potion_effect_chance_affected_by_difficulty_" + i);
		is_local_difficulty = getInputValue("potion_effect_chance_is_local_difficulty_" + i);
		multiplier = getInputValue("potion_effect_chance_multiplier_" + i);
		chance = new Chance(amount, affected_by_difficulty, is_local_difficulty, multiplier);
	
		min = getInputValue("potion_effect_amplifier_min_" + i);
		max = getInputValue("potion_effect_amplifier_max_" + i);
		amplifier = new RangeMinMax(min, max);
	
		id = getInputValue("potion_effect_id_" + i);
		ambient = getInputValue("potion_effect_ambient_" + i);
		hide_particles = getInputValue("potion_effect_hide_particles_" + i);
		dimensions = getInputValue("potion_effect_dimensions_" + i);
		if (dimensions != "") {
			dimensions = dimensions.split("\n");
			for (var d = 0; d < dimensions.length; d++) {
				dimensions[d] = parseInt(dimensions[d]);
			}
		}
		biomes = getInputValue("potion_effect_biomes_" + i);
		if (biomes != "") {
			biomes = biomes.split("\n");
		}

		potion_effect = new PotionEffect(id, amplifier, chance, ambient, hide_particles, dimensions, biomes);
		console.log(potion_effect);

		potion_effects.push(potion_effect);
	}

	return potion_effects;
}

function hasPotionEffects() {
	return PotionEffect.count > 0;
}
