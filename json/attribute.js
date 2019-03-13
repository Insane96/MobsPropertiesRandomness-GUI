class Attribute {
    constructor(id, modifier, is_flat, affected_by_difficulty, difficulty, dimension, biomes) {
        this.id = id;
        this.modifier = modifier;
        this.is_flat = is_flat;
        this.affected_by_difficulty = affected_by_difficulty;
        this.difficulty = difficulty;
        this.dimensions = dimensions;
        this.biomes = biomes;
    }
}

Attribute.count = 0;

function addAttribute() {
	attribute_form = document.getElementById("attribute_form").cloneNode(true);
	attribute_form.id = "attribute_" + Attribute.count;
	attribute_form.className = "form";
	attribute_form.innerHTML = attribute_form.innerHTML.replace(/%0/g, Attribute.count);

    DOM.attributes.appendChild(attribute_form);
    
	refreshTooltips();

	Attribute.count++;
}

function getAttributes() {
    attributes = [];
    for (var i = 0; i < Attribute.count; i++) {
		affected_by_difficulty = getInputValue("attribute_affected_by_difficulty_" + i);
		difficulty = null;
		if (affected_by_difficulty){
			affects_max_only = getInputValue("attribute_difficulty_affects_max_only_" + i);
			is_local_difficulty = getInputValue("attribute_difficulty_is_local_difficulty_" + i);
			multiplier = getInputValue("attribute_difficulty_multiplier_" + i);
			difficulty = new Difficulty(affects_max_only, is_local_difficulty, multiplier);
		}

		min = getInputValue("attribute_modifier_min_" + i);
		max = getInputValue("attribute_modifier_max_" + i);
		modifier = new RangeMinMax(min, max);

		id = getInputValue("attribute_id_" + i);
		is_flat = getInputValue("attribute_is_flat_" + i);
		dimensions = getInputValue("attribute_dimensions_" + i);
		if (dimensions != "") {
			dimensions = dimensions.split("\n");
			for (var d = 0; d < dimensions.length; d++) {
				dimensions[d] = parseInt(dimensions[d]);
			}
		}
		biomes = getInputValue("attribute_biomes_" + i);
		if (biomes != "") {
			biomes = biomes.split("\n");
		}

		attribute = new Attribute(id, modifier, is_flat, affected_by_difficulty, difficulty, dimensions, biomes);
		attributes.push(attribute);
    }
    return attributes;
}