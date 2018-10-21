include('include');

StartTestFunction();
_MAP_DANGER = [];
function setDamageMap() {
	var Items = [];
	var _accescellz = GetWalkableCells(_CELL[_MY_SELF], _MP[_MY_SELF]);
	var _danger = [];
	var JustToDebug = 0;
	var NumberEnemys;
	var maxRanges = [];
	//Register all enemys items in an array and walkable cellz and max range items
	for (var e in _ALIVE_ENEMIES) {
		Items[e] = getBestSortedItems(e, _MY_SELF);
		if (isEmpty(Items[e])) continue;
		debug("Best items : "+getName(e)+" "+ArrayItemToString(Items[e]));
		_ACCESCELLS[e] = GetWalkableCells(_CELL[e], _MP[e]);
		maxRanges[e] = MaxItemRange(Items[e]);
	}
	for (var index = 0; index < 10; index++) {
		NumberEnemys = 0;
		JustToDebug = index;
		for (var e in _ALIVE_ENEMIES) {
			if (getCellDistance(_CELL[_MY_SELF] , _CELL[e])-maxRanges[e] > _MP[e])continue;
			if (Items[e][index] == null) {
				NumberEnemys++;
				continue;
			}
			for (var cell: var percentage in getDamageMap(Items[e][index], _accescellz, _ACCESCELLS[e] , [])) {
				var score = getRealDmg(Items[e][index], _STRENGTH[e], _RELATIVE_SHIELD[_MY_SELF], _ABSOLUTE_SHIELD[_MY_SELF], _MAGIC[e], percentage, e);
				var iterations = 0;
				var _tp = _TP[e];
				var cost = _ITEM_COST[Items[e][index]];
				while (_tp >= cost) {
					_tp -= cost;
					iterations++;
					if (_ITEM_COOLDOWN[Items[e][index]] > 0 || iterations > 10) break;
				}
				score *= iterations;
				if (_danger[cell] == null || score > _danger[cell]) _danger[cell] = score;
			}
		}
		if (getOperations() > _MAP_DANGER_OP_LIMIT || NumberEnemys==count(_ALIVE_ENEMIES)) break;
	}
	debugW("Loaded damage map at index : "+JustToDebug);
	for (var c in _accescellz) {
		if (_danger[c] == null || _danger[c] < 0) _danger[c] = 0;
	}
	_MAP_DANGER = _danger;
}

function getBestSortedItems(@leek, @tanker) {
	var array = [];
	var summ = isSummon(tanker);
	for (var item in GetItems(leek)) {
		if (isPositiv(item) != false || !summ && item == CHIP_BURNING || item == CHIP_DEVIL_STRIKE) continue;
		var dmg = getRealDmg(item, _STRENGTH[leek], _RELATIVE_SHIELD[tanker], _ABSOLUTE_SHIELD[tanker], _MAGIC[leek], 0, leek);
		if (dmg <= 0) continue;
		array[item] = dmg / _ITEM_COST[item];
	}
	var _array_sorted = arraySort(array, function(a, b) {
		if (a < b) return 1;
		else if (a > b) return -1;
		else return 0;
	});
	var _final = [];
	for (var item: var score in _array_sorted) {
		push(_final, item);
	}
	return _final;
}

function MaxItemRange(Items) {
var max = 0;
	for (var i in Items) {
		if (_ITEM_MAXRANGE[i] > max) {
			max = _ITEM_MAXRANGE[i];
		}
	}
	return max;
}

function ArrayItemToString(arrayItems) {
	return arrayMap(arrayItems, function(x) {
		return getItemName(x);
	});
}

function getDamageMap(@item, @myaccescellz, @enemyaccescellz , ArrayDid) { //Return [cell : score , cell : score , ...] Score = dmg percent of weapon
	var array = [];
	//Check des cases sur lesquelles l'enemy peut tirer (qui font bien sur parti de mes accescellz)
	for (var c in myaccescellz) {
		if (ArrayDid[c]!=null) continue;
		for (var ce in enemyaccescellz) {
			if (getUsableItemsFromCellToCell(ce, c, item , _ALL_LEEKS)) array[c] = 100;
		}
	}
	//Plus complexe : gestion des aoe 
	if (_ITEM_AREA[item] == AREA_CIRCLE_1 || _ITEM_AREA[item] == AREA_CIRCLE_2 || _ITEM_AREA[item] == AREA_CIRCLE_3) {
		//On recup les cases sur lesquelles l'enemy peut tirer
		var arrayShootCellz = [];
		for (var cell: var score in array) push(arrayShootCellz, cell);
		//Et on fais un cellarea de ces cellz en mettant des scores
		for (var c in arrayShootCellz) {
		if (ArrayDid[c]!=null) continue;
			for (var circlec in _CELL_AREA[item][c]) {
				var dist = getCellDistance(c, circlec);
				var ratio = DivideAoe(getAreaNumber(item), dist, 100);
				if (array[circlec] == null || array[circlec] < ratio) array[circlec] = ratio;
			}
		}
	}
	return array;
}

StopTestFunction("New dmg map");

StartTestFunction();

function UpdateAllSafeScore(WalkableCellz) { //Update _BEST_DMG_CELL
	StartTestFunction();
	_BEST_DMG_CELL = [];
	for (var cell in WalkableCellz) {
		if (getOperations() - _OPS > 3000000) break;
		_BEST_DMG_CELL[cell] = getBestCellToHide(_MAP_DANGER, EnemyLeekG, GetWalkableCells(cell, _MP[_MY_SELF] - getPathLength(_CELL[_MY_SELF], cell)));
	}
	StopTestFunction("Refresh Danger From All Cellz");
}

function SortedBestItemsForBulb(Enemy, self) {
	var sorted = getBestSortedItems(Enemy, self);
	var array = [];
	for (var i in sorted) { //J'essaye de recupere 3 items
		if (i == WEAPON_M_LASER || i == WEAPON_ELECTRISOR || i == WEAPON_KATANA) push(array, i);
		if (count(array) == 1) break;
	}
	if (count(array) < 1) { //Si j'ai pas 3 items , je me debrouille pour boucher les trou
		for (var i = 0; i < 1; i++) {
			if (sorted[i] != null && !inArray(array, i)) push(array, sorted[i]);
		}
	}
	return array;
}

function HidenCellBulb(@celldepart, @mp) {
	var _map = [];
	var _items = SortedBestItemsForBulb(EnemyLeekG, _MY_SELF);
	var MyAccesCellz = GetWalkableCells(celldepart, mp);
	var did = [];
	StartTestFunction();
	for (var c in MyAccesCellz) if (_MAP_DANGER[c]!=null) _map[c] = _MAP_DANGER[c];
	for (var c:var score in _map) push(did, c);
	for (var i = 0; i < count(_items); i++) {
			for (var cell: var percentage in getDamageMap(_items[i], MyAccesCellz, _ACCESCELLS[EnemyLeekG] , did)) {
				if (_map[cell]==null) _map[cell] = 0;
				_map[cell] += percentage*_ITEM_POWER[_items[i]];
			}
	}
	StopTestFunction("Bulb map danger");
	for (var c in MyAccesCellz) {
		for (var cell:var score in _map) {
			if (!inArray(MyAccesCellz, cell)) _map[cell] = 9999999;
			if (_map[c]==null) _map[c] = 0;
		}
		_map[c] += (getNumberOfBulbInAnArea(2, c)*2000);
	}
	var BestScore = 9999999;
	var BestCellz = [];
	for (var cell:var score in _map) {
		if (score < BestScore) {
			BestScore = score;
			BestCellz = [];
			push(BestCellz, cell);
		} else {
			if (score == BestScore) {
				push(BestCellz, cell);
			}
		}
	}
	var _final = BestCellBulb(BestCellz);
	if (_final!=null) return _final;
	else return BestCellBulb(MyAccesCellz);
}

function getNumberOfBulbInAnArea(@rayon, @cellCentrale) {
	var NBulb = 0;
	for (var leek in _ALIVE_ALLIES) {
		if (getCellDistance(_CELL[leek], cellCentrale) <= rayon && leek != _MY_SELF) {
			NBulb++;
		}
	}
	return NBulb;
}

function BestCellBulb(@tableaucellz) {
	var BestNb = -2;
	var BestCell;
	var BestDist = 999;
	var array = [];
	for (var cell in tableaucellz) {
		var NumBulbArea = getNumberOfBulbInAnArea(6, cell);
		if (NumBulbArea > BestNb) {
			BestNb = NumBulbArea;
			array = [];
			push(array, cell);
		} else {
			if (NumBulbArea == BestNb) {
				push(array, cell);
			}
		}
	}
	if (isSummon(getLeek()) && BestNb== 0) {
		for (var cell in tableaucellz) {
			var dist = getCellDistance(cell, _CELL[getSummoner()]);
			if (dist < BestDist) {
				BestDist = dist;
				BestCell = cell;
			}
		}
		return BestCell;
	}
	for (var cell in array) {
		var dist = getCellDistance(cell, _CELL[EnemyLeekG]);
		if (BestDist > dist) {
			BestDist = dist;
			BestCell = cell;
		}
	}
	return BestCell;
}

function getBestCellToHide(arraydanger, @enemy, AccesCellz) {
	var arrayForDmg = [];
	var BestScore = 999;
	var BestCell;
	var ArrayCellzEgal = [];
	var BestDist = 999;
	var ecell = _CELL[enemy];
	var ArrayCellzDanger = arraydanger;
	var MustFocus = MustFocusEnemy(enemy);
	for (var cell: var score in ArrayCellzDanger) {
		if (!inArray(AccesCellz, cell)) continue;
		if (score < BestScore) {
			BestScore = score;
		}
	}
	for (var cell: var score in ArrayCellzDanger) {
		if (score == BestScore) {
			push(ArrayCellzEgal, cell);
		}
	}
	BestCell = BestCellBulb(ArrayCellzEgal);
	return [BestCell, BestScore];
}

function getReallySureCell() {
	for (var cell in GetTableauDesCells()) {
		if (getCellDistance(_CELL[EnemyLeekG], cell) > 20 && !lineOfSight(cell, _CELL[EnemyLeekG])) {
			return cell;
		}
	}
}
