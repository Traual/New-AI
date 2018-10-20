include('include');
StartTestFunction();
function LoadActionMap() {
	_CELLZ_TO_USE = [];
	var _usablecellz = [];
	var _arrayAlly = []; //Tricky test pour arriver a deux tableau avec key : [combo , target]
	var _ARRAY_ = [];
	var _Array_Targets = [];
	var _array_positiv = [];
	var _Array_Special = [];
	var items = GetItems(_MY_SELF);
	var WCellz = GetWalkableCells(_CELL[_MY_SELF], _MP[_MY_SELF]);
	//JE RECUPERE LES ITEMS DE MANIERE A SAVOIR SI ILS DOIVENT ETRE UTILISES SUR ENEMY OU ALLY OU SPECIAL
	for (var item in items) {
		if (isPositiv(item)) {
			removeElement(items, item);
			push(_array_positiv, item);
		}
		if (isPositiv(item) == null) {
			removeElement(items, item);
			push(_Array_Special, item);
		}
	}
	//FIN DU TRIAGE D'ITEMS
	//[item] ---> [cells]
	for (var i in GetItems(_MY_SELF)) {
		_usablecellz = [];
		for (var cell in WCellz) {
		var tobreak = false;
			for (var e in _ALL_LEEKS) {
				for (var acell in _CELL_AREA[i][_CELL[e]]) {
					if (getUsableItemsFromCellToCell(cell, acell, i, [])) {
						push(_usablecellz, cell);
						tobreak = true;
						break;
					}
				}
				if (tobreak) break;
			}
		}
		_CELLZ_TO_USE[i] = _usablecellz;
	}
	//CELL : [items]
	for (var cell in WCellz) {
		if (getOperations() > _MAP_ACTION_OP_LIMIT) break;
		for (var target in _ALIVE_ENEMIES) {
			if (getOperations() > _MAP_ACTION_OP_LIMIT) break;
			var usableitems = getAllUsableItems(cell, target, items);
			for (var item in usableitems) {
				push(_ARRAY_, item);
			}
		}
		for (var ally in _ALIVE_ALLIES) {
			if (getOperations() > _MAP_ACTION_OP_LIMIT) break;
			var usableitems = getAllUsableItems(cell, ally, _array_positiv);
			for (var item in usableitems) {
				push(_ARRAY_, item);
			}
		}
		for (var i in _array_positiv) {
			if (_ITEM_MINRANGE[i] == 0) push(_ARRAY_, i);
		}
		for (var item in _Array_Special) {
			if (item != CHIP_TELEPORTATION && item != CHIP_ANTIDOTE) push(_ARRAY_, item);
		}
		_MAP_ACTION[cell] = _ARRAY_;
	}
}

function getAllUsableItems(@cellfrom, @target, @inventory) {
	var array = [];
	for (var item in inventory) {
		for (var cell in _CELL_AREA[item][_CELL[target]]) {
			if (getUsableItemsFromCellToCell(cellfrom, cell, item, [_MY_SELF])) {
				push(array, item);
				break;
			}
		}
	}
	return array;
}

function getAllShootableCellz(@cell, @item) {
	var _final = [];
	var Leeks = isPositiv(item) ? _ALIVE_ALLIES : _ALIVE_ENEMIES;
	for (var leek in Leeks) {
		for (var to in _CELL_AREA[item][_CELL[leek]]) {
			if (!inArray(_final, to) && getUsableItemsFromCellToCell(cell, to, item, [])) push(_final, to);
		}
	}
	return _final;
}

function getCellzToUseItem(@accescellz, item) {
	if (isPositiv(item) == null && item != CHIP_LIBERATION && item != CHIP_ANTIDOTE) return [getCell()];
	return _CELLZ_TO_USE[item];
}

StopTestFunction("Map action");
