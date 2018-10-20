include("include");

function getCellToUseItemBasic(@item, @cellto) {
	return isChip(item) ? getCellToUseChipOnCell(item, cellto) : getCellToUseWeaponOnCell(item, cellto);
}

function getCellsToUseItem(@Item, @Cell) {
	return isChip(Item) ? getCellsToUseChipOnCell(Item, Cell) : getCellsToUseWeaponOnCell(Item, Cell);
}

function getCelltoUseItem(@item, @cellto, accescellz) {
	if (item == CHIP_DEVIL_STRIKE) return cellto;
	if (cellto == null) return;
	var BestScoreLazer = 0;
	var BestShootLaser = 0;
	var BestCell;
	var BestDist = 99999;
	var ArrayPossibleCellz = [];
	for (var cell in getCellsToUseItem(item, cellto)) {
		if (getCellDistance(_CELL[_MY_SELF], cell) <= _MP[_MY_SELF]) {
			push(ArrayPossibleCellz, cell);
		}
	}
	for (var c in ArrayPossibleCellz) {
		if (!inArray(accescellz, c)) removeElement(ArrayPossibleCellz, c);
	}
	for (var cell in ArrayPossibleCellz) {
		var dist = getCellDistance(_CELL[_MY_SELF], cell);
		if (getCellDistance(cell, cellto) >= DistFromArea(item) && dist < BestDist) {
			BestDist = dist;
			BestCell = cell;
		}
	}
	return BestCell;
}

function getTargetableLeeks(@cellfrom, @item) { //CELL , ITEM ----> [LeeksTargetables]
	var _array = [];
	for (var target in _ALL_LEEKS) {
		for (var cell in _CELL_AREA[item][_CELL[target]]) {
			if (inArray(_array, target)) break;
			if (getUsableItemsFromCellToCell(cellfrom, cell, item, [])) push(_array, target);
		}
	}
	return _array;
}

function CanBrochette(@Start, @End) {
	if (isOnSameLine(Start, End) && lineOfSight(Start, End)) {
		return true;
	} else return false;
}


function IsBrochetteSafe(@cell) {
	for (var leek in getAliveAllies()) {
		if (leek != _MY_SELF && CanBrochette(_CELL[leek], cell)) {
			return false;
		}
	}
	return true;
}

function getAllPossibleAreaCellz(item, cell) {
	var _array_area_cellz = [];
	var targetsleek = getTargetableLeeks(cell, item);
	for (var target in targetsleek) {
		for (var _acell in _CELL_AREA[item][_CELL[target]])
		if (getUsableItemsFromCellToCell(cell, _acell, item, []) && !inArray(_array_area_cellz, _acell)) push(_array_area_cellz, _acell);
	}
	return _array_area_cellz;
}

function getAllLazerTargets(item, from, to) {
var _final = [];
	for (var e in _ALL_LEEKS) {
		if (e==_MY_SELF) continue;
		if (isOnSameLine(_CELL[e], to) && isOnSameLine(_CELL[e], from) && lineOfSight(from, _CELL[e], _ALL_LEEKS) && getCellDistance(from, _CELL[e])<=_ITEM_MAXRANGE[item]) {
			push(_final, e);
		}
	}
	return _final;
}

function getBestAoeCell(from, item, timesuseitem) {
	var BestAoeCell;
	var BestInterest = 0;
	var Interest;
	var CoefKillAlly = (item == CHIP_BURNING) ? 99999 : 2;
	var pos = isPositiv(item);
	var OnlyBulb = isOnlyBulb(item);
	if (_ITEM_AREA[item] == AREA_LASER_LINE) {
		for (var to in getAllShootableCellz(from, item)) {
		Interest = 0;
			for (var target in getAllLazerTargets(item, from, to)) {
				if (!isSummon(target) && OnlyBulb || target == _MY_SELF) continue;
				var Life = _REAL_LIFES[target];
				var RealDmg = getRealDmg(item, _STRENGTH[_MY_SELF], _RELATIVE_SHIELD[target], _ABSOLUTE_SHIELD[target], _MAGIC[_MY_SELF], 0, target);
				RealDmg *= timesuseitem;
				if (_IS_ALLY[target] == false) {
					if (RealDmg >= Life && Life > 0) {

						RealDmg = Life;
						RealDmg += _SCORE_KILL;
						Life = 0;
					}
					Interest += RealDmg * (getItemCoef(item, target) / _COEF_DIVIDE_COEFS);
				} else {
					Interest -= RealDmg * CoefKillAlly;
				}
			}
			if (Interest > BestInterest) {
				BestInterest = Interest;
				BestAoeCell = to;
			}
		}
		return [BestAoeCell, BestInterest];
	}

	if (pos == null) {
		var Coef = bulbcoef(item, EnemyLeekG)[1] * (getItemCoef(item, _MY_SELF) / _COEF_DIVIDE_COEFS);
		return [from, Coef];
	}
	for (var to in getAllShootableCellz(from, item)) {
		Interest = 0;
		if (_ITEM_AREA[item] == AREA_LASER_LINE) break;
		if (!pos) {
			for (var target in getItemTargets(item, to)) {
				if (!isSummon(target) && OnlyBulb || target == _MY_SELF) continue;
				var Life = _REAL_LIFES[target];
				var RealDmg = getRealDmg(item, _STRENGTH[_MY_SELF], _RELATIVE_SHIELD[target], _ABSOLUTE_SHIELD[target], _MAGIC[_MY_SELF], getCellDistance(to, _CELL[target]), target);
				RealDmg *= timesuseitem;
				if (_IS_ALLY[target] == false) {
					if (RealDmg >= Life && Life > 0) {

						RealDmg = Life;
						RealDmg += _SCORE_KILL;
						Life = 0;
					}
					Interest += RealDmg * (getItemCoef(item, target) / _COEF_DIVIDE_COEFS);
				} else {
					Interest -= RealDmg * CoefKillAlly;
				}
			}
		} else {
			for (var target in getItemTargets(item, to)) {
				if (!isSummon(target) && OnlyBulb) continue;
				var real = getRealDmg(item, _STRENGTH[_MY_SELF], _RELATIVE_SHIELD[target], _ABSOLUTE_SHIELD[target], _MAGIC[_MY_SELF], getCellDistance(to, _CELL[target]), target);
				if (_IS_ALLY[target]) Interest += real * (getItemCoef(item, target) / _COEF_DIVIDE_COEFS);
				if (_IS_ALLY[target] == false) Interest -= real * CoefKillAlly;
			}
		} //Fin Target
		if (Interest > BestInterest) {
			BestInterest = Interest;
			BestAoeCell = to;
		}

	} //Fin To
	return [BestAoeCell, BestInterest];
}

function BestCellToShoot(@LeekFrom, Leekto, @Mp, @WeaponOrChip, accescellz) {
	var area = areaNbFromWeapon(WeaponOrChip);
	if (Leekto == _MY_SELF && area == 0) {
		return _CELL[_MY_SELF];
	}
	var BestCellz;
	var BestDist = 9999;
	var BestCount = 0;
	var BestCell;
	var tab = [];
	var ArrayGoodCellz = [];
	pushAll(tab, _CELL_AREA[WeaponOrChip][_CELL[Leekto]]);

	for (var cell in tab) {
		var count = getItemTargetsEnemyMinusAlly(WeaponOrChip, cell);
		if (BestCount < count) {
			BestCount = count;
		}
	}
	for (var cell in tab) {
		if (getItemTargetsEnemyMinusAlly(WeaponOrChip, cell) == BestCount) {
			push(ArrayGoodCellz, cell);
		}
	}

	for (var cellz in ArrayGoodCellz) {

		var cellzitem = getCelltoUseItem(WeaponOrChip, cellz, accescellz);
		var path = getCellDistance(_CELL[LeekFrom], cellzitem);
		if (cellzitem != null && path + 4 < BestDist) {
			BestCellz = cellz;
			BestDist = path;
		}
	}

	return BestCellz;
}
