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

