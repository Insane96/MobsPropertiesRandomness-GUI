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
Attribute.form = "<table class=\"potion_effect_table\"><tr><td colspan=\"2\"><p class=\"form_name\">Attribute #%0</p></td></tr><tr><td>Id <input class=\"has_tooltip\" data-tooltip=\"The attribute ID\" type=\"text\" id=\"attribute_id_%0\" placeholder=\"generic.maxHealth\" /><br /></td><td>Modifier Min & Max<br /><input class=\"has_tooltip\" data-tooltip=\"Minimum percentage modifier for this attribute\" type=\"number\" id=\"attribute_modifier_min_%0\" min=\"0\" max=\"1024\" value=\"0\" /><input class=\"has_tooltip\" data-tooltip=\"Minimum percentage modifier for this attribute\" type=\"number\" id=\"attribute_modifier_max_%0\" min=\"0\" max=\"1024\" value=\"0\" /></td></tr><tr><td>Is Flat <input class=\"has_tooltip\" data-tooltip=\"If the modifier values should be applied as they are to the mob instead of begin percentages (e.g. 50 generic.maxHealth would be 50 health instead of 50% more health\" type=\"checkbox\" id=\"attribute_is_flat_%0\" /><br />Affected By Difficulty <input class=\"has_tooltip\" data-tooltip=\"If modifier values should be affected by difficulty. This must be true for the difficulty settings to apply\" type=\"checkbox\" id=\"attribute_affected_by_difficulty_%0\" /></td><td><p class=\"chance_title\">Difficulty</p>Affects Max Only<input class=\"has_tooltip\" data-tooltip=\"If the difficulty should affect the maximum modifier only\" type=\"checkbox\" id=\"attribute_difficulty_affects_max_only_%0\" /> <br />Is Local Difficulty <input class=\"has_tooltip\" data-tooltip=\"If modifier values should be modified by Local Difficulty (aka Regional Difficulty) instead of plain difficulty (Easy, Normal or Hard)\" type=\"checkbox\" id=\"attribute_difficulty_is_local_difficulty_%0\" /><br />Multiplier <input class=\"has_tooltip\" data-tooltip=\"The multiplier for the modifiers\" type=\"number\" id=\"attribute_difficulty_multiplier_%0\" min=\"0\" max=\"128\" step=\"0.1\" value=\"1\" /></td></tr><tr><td>Dimensions<br /><textarea class=\"has_tooltip\" data-tooltip=\"A list of dimensions where the attribute should be modified. NOTE: only one dimension per line\" id=\"attribute_dimensions_%0\" cols=\"5\" rows=\"5\" placeholder=\"0\n-1\"></textarea></td><td>Biomes<br /><textarea class=\"has_tooltip\" data-tooltip=\"A list of biomes where the attribute should be modified. NOTE: only one biome per line\" id=\"attribute_biomes_%0\" cols=\"25\" rows=\"5\" placeholder=\"minecraft:plains\nminecraft:desert\"></textarea></td></tr></table>";

function AddAttribute() {
	container = document.createElement("div");
	container.id = "attribute_" + Attribute.count;

	attribute_form = Attribute.form.replace(/%0/g, Attribute.count);

	container.innerHTML = attribute_form;

    DOM.attributes.appendChild(container);
    
	RefreshTooltips();

	Attribute.count++;
}

function GetAttributes() {
    attributes = [];
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
		attributes.push(attribute);
    }
    return attributes;
}