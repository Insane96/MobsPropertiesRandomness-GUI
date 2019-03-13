class RangeMinMax {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
}

class Chance {
    constructor(amount, affected_by_difficulty, is_local_difficulty, multiplier) {
        this.amount = amount;
        this.affected_by_difficulty = affected_by_difficulty;
        this.is_local_difficulty = is_local_difficulty;
        this.multiplier = multiplier;
    }
}

class Difficulty {
    constructor(affects_max_only, is_local_difficulty, multiplier) {
        this.affects_max_only = affects_max_only;
        this.is_local_difficulty = is_local_difficulty;
        this.multiplier = multiplier;
    }
}

class Slot {
    constructor(override_vanilla, replace_only, chance, items) {
        this.override_vanilla = override_vanilla;
        this.replace_only = replace_only;
        this.chance = chance;
        this.items = items;
    }
}

class Item {
    constructor(id, data, weight, weight_difficulty, drop_chance, enchantments, attributes, nbt, dimensions, biomes) {
        this.id = id;
        this.data = data;
        this.weight = weight;
        this.weight_difficulty = weight_difficulty;
        this.drop_chance = drop_chance;
        this.enchantments = enchantments;
        this.attributes = attributes;
        this.nbt = nbt;
        this.dimensions = dimensions;
        this.biomes = biomes;
    }
}

class WeightedDifficulty {
    constructor(easy, normal, hard) {
        this.easy = easy;
        this.normal = normal;
        this.hard = hard;
    }
}

class Enchantment {
    constructor(id, level, chance) {
        this.id = id; 
        this.level = level;
        this.chance = chance;
    }
}

class ItemAttribute {
    constructor(modifier, attribute_name, operation, amount, id, slot) {
        this.modifier = modifier;
        this.attribute_name = attribute_name;
        this.operation = operation;
        this.amount = amount;
        this.id = id;
        this.slot = slot;
    }
}

var EntityEquipmentSlot = Object.freeze({"HEAD": 1, "CHEST": 2, "LEGS": 3, "FEET": 4, "MAIN_HAND": 5, "OFF_HAND": 6});