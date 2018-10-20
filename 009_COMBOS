include("include");
global _NEAREST_ENEMY_LEEK;
global _NEAREST_ENEMY_BULB;
var _BEST_SAFE_CELL;
var _BEST_TARGET;
function _COEF_WEAPON_SHACKLE_DMG(@item) {
	if (isWeapon(item)) return 0.00000000000001;
	else return 1;
}

function useItem(item, cell, weapon) {
	if (isWeapon(item) && weapon != item) setWeapon(item);
	var lol = isChip(item) ? useChipOnCell(item, cell) : useWeaponOnCell(cell);
	lol;
}

function getBestOnlyItem(cellfrom , mp , tp , cellold) {
StartTestFunction();
debug("score play safe ! "+_SCORE_PLAY_SAFE);
if (cellfrom != cellold) UpdateAllSafeScore(GetWalkableCells(getCell() , getMP()));
var AccesCellz = GetWalkableCells(cellfrom , mp);
var BestScore = 0;
var BestItem ;
var BestFrom ; 
var BestTo ;
var ItemScore = 0;
var cell = 0;
var score = 1;
var myweap = getWeapon();
var mytp = tp;
	for (var item in GetItems(_MY_SELF)) {
	if (_ITEM_IS_WEAPON[item] && myweap!=item) mytp -= 1;
	var TimesUseItem = _ITEM_COOLDOWN[item]  > 0 ? 1 : floor(mytp/_ITEM_COST[item]);
	var cost = (_ITEM_IS_WEAPON[item] && myweap!=item) ? (_ITEM_COST[item]*TimesUseItem+1) : (_ITEM_COST[item]*TimesUseItem);
	if (cost>tp) continue;
	if (tp < 8) cost = 1; // Pour eviter de prendre en compt les tp sur le last item
		for (var from in getCellzToUseItem(AccesCellz , item)) {
			var CAoE = getBestAoeCell(from , item , TimesUseItem);
			if (CAoE[score]==0 || CAoE[cell]==null || !getUsableItemsFromCellToCell(from, CAoE[cell], item , [])) continue;
			var dmgBestCell = _BEST_DMG_CELL[from];
			if (dmgBestCell[0]==null) continue;
			ItemScore = (CAoE[score]-(dmgBestCell[1]*_SCORE_PLAY_SAFE))/cost;
			ItemScore -= getCellDistance(_CELL[_MY_SELF], from);
			if (ItemScore>BestScore) {
				BestScore = ItemScore;
				BestItem = item;
				BestFrom = from;
				BestTo = CAoE[cell];
			}
		}//Fin from
	}//Fin Item
	StopTestFunction("New Only Item");
	return [BestItem , BestFrom , BestTo];
}

function DeadAlly() {
	var array = [];
	for (var i in getAllies()) {
		if (!isSummon(i) && isDead(i)) {
			push(array, i);
		}
	}
	return array;
}

function getcelltouseitem(item, cell) {
	return isChip(item) ? getCellToUseChipOnCell(item, cell) : getCellToUseWeaponOnCell(item, cell);
}

function badAss(leek) {
	if (count(EnemyLeekArray()) == 1) {
		return true;
	} else return RealLeeklife(leek) > 0;
}
global os;
os = false;

function OS() {
	if (_MAGIC[_MY_SELF] > 399) {
		for (var leek in getAliveEnemies()) {
			if (!isSummon(leek)) {
				for (var item in GetItems(_MY_SELF)) {
					var CellItem = getCelltoUseItem(item, _CELL[leek] , GetWalkableCells(_CELL[_MY_SELF] , _MP[_MY_SELF]));
					var Path = getPathLength(_CELL[_MY_SELF], CellItem);
					if (CellItem != null && _ITEM_EFFECTS[0][0] == EFFECT_POISON) {
						if (CellItem != null && getItemMinDmg(item) * (1 + _MAGIC[_MY_SELF] / 100) > RealLeeklife(leek) && badAss(leek)) {

							if (_TP[_MY_SELF] - _ITEM_COST[CHIP_TELEPORTATION] > _ITEM_COST[item] && inArray(GetItems(_MY_SELF), CHIP_TELEPORTATION) && !os) {
								os = true;
								useChipOnCell(CHIP_TELEPORTATION, CellItem);
								useItem(item, _CELL[leek], getWeapon());
								say("Il ne manquait que cette petite chose et Pouf , ça fais des chocapic !");
								DoNotSpeak2Times = false;
							} else {
								if (Path <= _MP[_MY_SELF] && Path != null && _TP[_MY_SELF] > _ITEM_COST[item] && !os) {
									os = true;
									moveTowardCell(CellItem);
									useItem(item, _CELL[leek], getWeapon());
									say("Il ne manquait que cette petite chose et Pouf , ça fais des chocapic !");
									DoNotSpeak2Times = false;
								}

							}
						}
					}
				}
				if (RealLeeklife(leek) < 0 && getFightType() == FIGHT_TYPE_SOLO) {
					if (!os && _TP>=1) {
					var i = 0;
					say("Attention " + getName(leek) + " je vais crash , ecarte toi ...");
					while (true) i++;
					}
				}
			}
		}
	}
}

function UrgentHeals() {
	if (_LIFE[_MY_SELF] < _TOTAL_LIFE[_MY_SELF] - (200 * (1 + _WISDOM[_MY_SELF] / 100))) {
		useChip(CHIP_REGENERATION, _MY_SELF);
	}
}
