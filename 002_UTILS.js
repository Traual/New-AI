include("include");

function getAreaNumber(@item) {
	var area = isChip(item) ? getChipArea(item) : getWeaponArea(item);
	if (area == AREA_CIRCLE_1) {
		return 1;
	}
	if (area == AREA_CIRCLE_2) {
		return 2;
	}
	if (area == AREA_CIRCLE_3) {
		return 3;
	}
	if (area == AREA_LASER_LINE || area == AREA_POINT) {
		return 0;
	}

}

function cellarea1(c) {
	if (isObstacle(c)) return;
	var tabcellz = [];
	var x = getCellX(c);
	var y = getCellY(c);
	push(tabcellz, c);
	var cell;
	cell = getCellFromXY(x + 1, y);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}
	cell = getCellFromXY(x - 1, y);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x, y + 1);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x, y - 1);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}
	return tabcellz;
}

function cellarea2(c) {
	if (isObstacle(c)) return;
	var tabcellz = [];
	pushAll(tabcellz, cellarea1(c));
	var x = getCellX(c);
	var y = getCellY(c);
	var cell;
	cell = getCellFromXY(x + 1, y + 1);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}
	cell = getCellFromXY(x + 1, y - 1);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x - 1, y + 1);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x - 1, y - 1);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x + 2, y);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x, y + 2);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x, y - 2);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x - 2, y);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}
	return tabcellz;
}

function cellarea3(c) {
	if (isObstacle(c)) return;
	var tabcellz = [];
	pushAll(tabcellz, cellarea2(c));
	var x = getCellX(c);
	var y = getCellY(c);
	var cell;
	cell = getCellFromXY(x + 2, y + 1);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x + 2, y - 1);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x - 2, y + 1);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x - 2, y - 1);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x + 1, y + 2);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}
	cell = getCellFromXY(x + 1, y - 2);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x - 1, y + 2);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x - 1, y - 2);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x + 3, y);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x, y + 3);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x, y - 3);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}

	cell = getCellFromXY(x - 3, y);
	if (cell != null && !isObstacle(cell)) {
		push(tabcellz, cell);
	}
	return tabcellz;
}

function EnemyLeekArray() {
	var array = [];
	for (var i in getAliveEnemies()) {
		if (!isSummon(i)) {
			push(array, i);
		}
	}
	return array;
}

function EnemyLeek() {
	var bestleek;
	var BestDist = 99999;
	for (var leek in EnemyLeekArray()) {
		var g = getPathLength(_CELL[_MY_SELF], _CELL[leek]);
		if (g < BestDist) {
			BestDist = g;
			bestleek = leek;
		}
	}
	return bestleek;
}
if (getTurn() == 1 || EnemyLeekG != null && isDead(EnemyLeekG) || EnemyLeekG == null) EnemyLeekG = EnemyLeek();

function bulbname(entity, leekatq) {
	var MetaBulbCoef = _STRENGTH[leekatq] > 0 ? 7 : 0;
	var GueriBulbCoef = _MAGIC[leekatq] > 0 ? 6 : 4;
	if (isSummon(entity)) {
		var name = getName(entity);
		if (name == "metallic_bulb") {
			return [ENTITY_METALLIC_BULB, MetaBulbCoef];
		} else if (name == "healer_bulb") {
			return [ENTITY_HEALER_BULB, GueriBulbCoef];
		} else if (name == "lightning_bulb") {
			return [ENTITY_LIGHTNING_BULB, 5];
		} else if (name == "fire_bulb") {
			return [ENTITY_FIRE_BULB, 4];
		} else if (name == "iced_bulb") {
			return [ENTITY_ICED_BULB, 4];
		} else if (name == "rocky_bulb") {
			return [ENTITY_ROCKY_BULB, 3];
		} else if (name == "puny_bulb") {
			return [ENTITY_PUNY_BULB, 2];
		}
	} else {
		return [ENTITY_LEEK, 25];
	}
}

function RealLeeklife(@leek) {
	var life = _LIFE[leek];
	for (var eff in _EFFECTS[leek]) {
		if (eff[0] == EFFECT_POISON) {
			life -= eff[1];
		}
		if (eff[0] == EFFECT_HEAL) {
			life += eff[1];
		}
	}
	return life;
}

function getItemName(Item) {
	if (isChip(Item)) {
		return getChipName(Item);
	} else return getWeaponName(Item);
}

function spawn(@BulbChip, @ai) {
	var CellToUse;
	var getcellstouse = getCellsToUseChip(BulbChip, _MY_SELF);
	var BestDist;
	var BestCell;
	if (_IS_GENTLE_BULB[BulbChip]) {
		BestDist = 0;
		for (var cell in getcellstouse) { //GENTLE BULB
			var dist = getCellDistance(getCell(EnemyLeekG), cell);
			if (dist > BestDist) {
				BestDist = dist;
				BestCell = cell;
			}
		}
	} else {
		BestDist = 99999;
		for (var cell in getcellstouse) { //NOT GENTLE BULB
			var Item = _BEST_ITEM_NOT_GENTLE_BULB[BulbChip];
			var dist = getCellDistance(getCellToUseChip(Item, EnemyLeekG), cell);
			if (dist < BestDist) {
				BestDist = dist;
				BestCell = cell;
			}
		}
	}
	summon(BulbChip, BestCell, ai);
}

function getUsableItemsFromCellToCell(@cell, @cellto, item, ignore) {
	var dist = getCellDistance(cell, cellto);
	if (!_ITEM_INLINE[item] && dist <= _ITEM_MAXRANGE[item] && dist >= _ITEM_MINRANGE[item] && lineOfSight(cell, cellto, ignore)) {
		return true;
	}
	if (dist >= _ITEM_MINRANGE[item] && dist <= _ITEM_MAXRANGE[item] && isOnSameLine(cell, cellto) && lineOfSight(cell, cellto, ignore)) {
		return true;
	}
	return false;
}

function DivideAoe(area, dist, DMG) {
	if (dist == 0) return DMG;
	if (dist == 1 && area == 1) return DMG * 0.5;
	if (dist == 1 && area == 2) return DMG * 0.75;
	if (dist == 1 && area == 3) return DMG * 0.83;
	if (dist == 2 && area == 2) return DMG * 0.50;
	if (dist == 2 && area == 3) return DMG * 0.67;
	if (dist == 3 && area == 3) return DMG * 0.50;
	return 0;
}

function percentagetodist(@value, area) {
	if (value == 100) return 0;
	if (value == 83) return 1;
	if (value == 67) return 2;
	if (value == 50 && area == 3) return 3;
	if (value == 75 && area == 2) return 1;
	if (value == 50 && area == 1) return 1;
	if (value == 50 && area == 2) return 2;
	return value;
}

function getRealDmg(@item, @str, @relshield, @absshield, @magic, @distorpercentage, @enemy) {
	var area = areaNbFromWeapon(item);
	var dmg = DivideAoe(area, percentagetodist(distorpercentage, area), _ITEM_POWER[item]);
	if (item == CHIP_DEVIL_STRIKE) dmg /= 5;
	//FORCE
	if (_ITEM_EFFECTS[item][0][0] == EFFECT_DAMAGE) dmg = dmg * (1 + str / 100) * (1 - relshield / 100) - absshield;
	//MAGIC
	if (_ITEM_EFFECTS[item][0][0] == EFFECT_POISON || _ITEM_EFFECTS[item][0][0] == EFFECT_SHACKLE_MAGIC || _ITEM_EFFECTS[item][0][0] == EFFECT_SHACKLE_MP || _ITEM_EFFECTS[item][0][0] == EFFECT_SHACKLE_STRENGTH || _ITEM_EFFECTS[item][0][0] == EFFECT_SHACKLE_TP) return dmg * 1 + _ITEM_EFFECTS[item][0][3] * (1 + magic / 100);
	//WISDOM
	if (_ITEM_EFFECTS[item][0][0] == EFFECT_HEAL || _ITEM_EFFECTS[item][0][0] == EFFECT_BOOST_MAX_LIFE) return dmg * (1 + _WISDOM[_MY_SELF] / 100);
	//RESISTANCE
	if (_ITEM_EFFECTS[item][0][0] == EFFECT_ABSOLUTE_SHIELD || _ITEM_EFFECTS[item][0][0] == EFFECT_RELATIVE_SHIELD) return dmg * (1 + _RESISTANCE[_MY_SELF] / 100);
	//Summon
	if (_ITEM_EFFECTS[item][0][0] == EFFECT_SUMMON) return 1;
	//SCIENCE
	if (_ITEM_EFFECTS[item][0][0] == EFFECT_BUFF_AGILITY || _ITEM_EFFECTS[item][0][0] == EFFECT_BUFF_RESISTANCE || _ITEM_EFFECTS[item][0][0] == EFFECT_BUFF_MP || _ITEM_EFFECTS[item][0][0] == EFFECT_BUFF_STRENGTH || _ITEM_EFFECTS[item][0][0] == EFFECT_BUFF_TP || _ITEM_EFFECTS[item][0][0] == EFFECT_BUFF_WISDOM) return dmg * (1 + _SCIENCE[_MY_SELF] / 100);
	//AGILITY
	if (_ITEM_EFFECTS[item][0][0] == EFFECT_DAMAGE_RETURN) return dmg * (1 + _AGILITY[_MY_SELF] / 100);
	//LIBE
	if (item == CHIP_LIBERATION) return HelpLibeScoreEnemy(enemy);
	//INVERSION
	if (item == CHIP_INVERSION) return dmg;
	if (item == CHIP_DEVIL_STRIKE) dmg *= 5;
	return dmg;
}

function ShieldScore(@leek) {
	return _ABSOLUTE_SHIELD[leek] + _RELATIVE_SHIELD[leek] * 50;
}

function isPositiv(@item) {
	return _CHIP_ISPOSITIV[item];
}

function getItemMinDmg(@item) {
	var NumberOfDMG = 0;
	var ie = _ITEM_EFFECTS[item];
	for (var eff in ie) {
		if (eff[0] == EFFECT_DAMAGE || eff[0] == EFFECT_POISON) {
			NumberOfDMG += eff[1];
		}
	}
	return NumberOfDMG;
}

function StartTestFunction() {
	_OPS = getOperations();
}

function StopTestFunction(@name) {
	debug('Opés ' + name + " : " + ((getOperations() - _OPS) / 1000) + ' k ');
}

function HelpLibeScoreEnemy(@leek) {
	var effects = _EFFECTS[leek];
	var Score = 0;
	for (var eff in effects) {
		if (eff[0] == EFFECT_RELATIVE_SHIELD) Score += (eff[1] * 55);
		if (eff[0] == EFFECT_ABSOLUTE_SHIELD) Score += (eff[1] * 25);
		if (eff[0] == EFFECT_POISON) Score -= (eff[1] * 15);
		if (eff[0] == EFFECT_BUFF_AGILITY) Score += (eff[1] * 5);
		if (eff[0] == EFFECT_BUFF_MP) Score += (eff[1] * 100);
		if (eff[0] == EFFECT_BUFF_RESISTANCE) Score += (eff[1] * 80);
		if (eff[0] == EFFECT_BUFF_STRENGTH) Score += (eff[1] * 15);
		if (eff[0] == EFFECT_BUFF_TP) Score += (eff[1] * 105);
		if (eff[0] == EFFECT_BUFF_WISDOM) Score += (eff[1] * 70);
		if (eff[0] == EFFECT_DAMAGE_RETURN) Score += (eff[1] * 100);
		if (eff[0] == EFFECT_HEAL) Score += (eff[1] * 15);
		if (eff[0] == EFFECT_SHACKLE_MAGIC) Score -= (eff[1] * 25);
		if (eff[0] == EFFECT_SHACKLE_MP) Score -= (eff[1] * 100);
		if (eff[0] == EFFECT_SHACKLE_STRENGTH) Score -= (eff[1] * 25);
		if (eff[0] == EFFECT_SHACKLE_TP) Score -= (eff[1] * 100);
		if (eff[0] == EFFECT_VULNERABILITY) Score -= (eff[1] * 40);

	}
	return Score;
}

function getItemTargets(@item, @cell) {
	return isChip(item) ? getChipTargets(item, cell) : getWeaponTargets(item, cell);
}

function getItemTargetsEnemyMinusAlly(@item, @cell) {
	var JspCommentTappelerDsl = 0;
	for (var target in getItemTargets(item, cell)) {
		if (target == _MY_SELF) continue;
		if (isAlly(target)) {
			JspCommentTappelerDsl -= 1;
		} else {
			if (isEnemy(target)) {
				JspCommentTappelerDsl += 1;
			}
		}
	}
	if (isPositiv(item)) {
		JspCommentTappelerDsl = 0 - JspCommentTappelerDsl;
	}
	return JspCommentTappelerDsl;
}

function DoesHaveChip(@leek, @item) {
	for (var eff in _EFFECTS[leek]) {
		if (eff[5] == item) {
			return true;
		}
	}
	return false;
}

function isOnlyBulb(@item) {
	var IE = _ITEM_EFFECTS[item];
	if (IE[0][4] == 21 || IE[0][4] == 22) {
		return true;
	} else return false;
}

function DmgForTurn(@leek) {
	return _LIFE[leek] - RealLeeklife(leek);
}

function getNumberOfBulb() {
	var nbally = 0;
	var nbenemy = 0;
	for (var i in getAliveAllies()) {
		if (isSummon(i)) {
			nbally++;
		}
	}
	for (var i in getAliveEnemies()) {
		if (isSummon(i)) {
			nbenemy++;
		}
	}
	return [nbally, nbenemy];
}

function bulbcoef(@chip, @enemyPrincipal) {
	var MetaBulbCoef = _STRENGTH[enemyPrincipal] > 0 ? 255 : 0;
	if (_SCIENCE[enemyPrincipal] >= 400) MetaBulbCoef += 60;
	var GueriBulbCoef = _MAGIC[enemyPrincipal] > 0 ? 45 : 20;
	if (chip == CHIP_METALLIC_BULB) {
		return [ENTITY_METALLIC_BULB, MetaBulbCoef];
	} else if (chip == CHIP_HEALER_BULB) {
		return [ENTITY_HEALER_BULB, GueriBulbCoef];
	} else if (chip == CHIP_LIGHTNING_BULB) {
		return [ENTITY_LIGHTNING_BULB, 30];
	} else if (chip == CHIP_FIRE_BULB) {
		return [ENTITY_FIRE_BULB, 25];
	} else if (chip == CHIP_ICED_BULB) {
		return [ENTITY_ICED_BULB, 16];
	} else if (chip == CHIP_ROCKY_BULB) {
		return [ENTITY_ROCKY_BULB, 10];
	} else if (chip == CHIP_PUNY_BULB) {
		return [ENTITY_PUNY_BULB, 8];
	}
}

function AntidoteScore(@leek) {
	var i = 0;
	for (var eff in _EFFECTS) {
		if (eff[0] == EFFECT_POISON) {
			i++;
		}
	}
	return i;
}

function areaNbFromWeapon(WeaponOrChip) {
	var area = 0;
	var IArea = _ITEM_AREA[WeaponOrChip];
	if (IArea == AREA_CIRCLE_1) {
		area = 1;
	}
	if (IArea == AREA_CIRCLE_2) {
		area = 2;
	}
	if (IArea == AREA_CIRCLE_3) {
		area = 3;
	}
	return area;
}

function DistFromArea(WeaponOrChip) {
	var area = 0;
	var IArea = _ITEM_AREA[WeaponOrChip];
	if (IArea == AREA_CIRCLE_1) {
		area = 2;
	}
	if (IArea == AREA_CIRCLE_2) {
		area = 3;
	}
	if (IArea == AREA_CIRCLE_3) {
		area = 4;
	}
	if (isPositiv(WeaponOrChip) || WeaponOrChip == CHIP_LIGHTNING) {
		area = 0;
	}
	return area;
}

function LifePercent(@life, @totallife) {
	if (totallife > 0) return life / totallife * 100;
	else return 100;
}

function GetTableauDesCells() {
	var tab = [];
	for (var i = 0; i <= 612; i++) {
		push(tab, i);
	}
	return tab;
}
_ALL_CELLZ = GetTableauDesCells();

function getAnnauxCells(cell, mindist, maxdist) {
	var tab = [];
	for (var i in _ALL_CELLZ) {
		var dist = getCellDistance(cell, i);
		if (dist <= maxdist && dist >= mindist && !isObstacle(i) && i != null) {
			push(tab, i);
		}
	}
	return tab;
}

function getNeighbouringCellz(@cell) {

	var tabcellz = [];
	var cellxy;
	var x = getCellX(cell);
	var y = getCellY(cell);
	cellxy = getCellFromXY(x + 1, y);
	if (cellxy != null && !isObstacle(cellxy) && isEmptyCell(cellxy)) {
		push(tabcellz, cellxy);
	}
	cellxy = getCellFromXY(x - 1, y);
	if (cellxy != null && !isObstacle(cellxy) && isEmptyCell(cellxy)) {
		push(tabcellz, cellxy);
	}
	cellxy = getCellFromXY(x, y + 1);
	if (cellxy != null && !isObstacle(cellxy) && isEmptyCell(cellxy)) {
		push(tabcellz, cellxy);
	}
	cellxy = getCellFromXY(x, y - 1);
	if (cellxy != null && !isObstacle(cellxy) && isEmptyCell(cellxy)) {
		push(tabcellz, cellxy);
	}
	return tabcellz;
}

function GetWalkableCells(cell, mp) {
	var accesscells = [cell];
	var set = [cell];
	for (var i = 0; i < mp; i++) {
		var Bords = [];
		for (var cellz in set) {
			for (var c in getNeighbouringCellz(cellz)) {
				if (!inArray(accesscells, c)) {
					push(accesscells, c);
					push(Bords, c);
				}
			}
		}
		set = Bords;
	}
	return @accesscells;
}
