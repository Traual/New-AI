include("include");

function getArrayComboBulbSorted(@entity) {
	if (entity == ENTITY_ICED_BULB) return [CHIP_ICEBERG, CHIP_STALACTITE, CHIP_REFLEXES, CHIP_ICE];
	if (entity == ENTITY_HEALER_BULB) return [CHIP_VACCINE, CHIP_CURE, CHIP_DRIP, CHIP_BANDAGE];
	if (entity == ENTITY_ROCKY_BULB) return [CHIP_ROCKFALL, CHIP_HELMET, CHIP_ROCK, CHIP_PEBBLE];
	if (entity == ENTITY_PUNY_BULB) return [CHIP_PROTEIN, CHIP_BANDAGE, CHIP_HELMET, CHIP_PEBBLE];
	if (entity == ENTITY_METALLIC_BULB) return [CHIP_ARMOR, CHIP_SHIELD, CHIP_WALL, CHIP_SEVEN_LEAGUE_BOOTS];
	if (entity == ENTITY_FIRE_BULB) return [CHIP_METEORITE, CHIP_DEVIL_STRIKE, CHIP_FLAME, CHIP_SPARK];
	if (entity == ENTITY_LIGHTNING_BULB) return [CHIP_DOPING, CHIP_LIGHTNING, CHIP_FLASH, CHIP_SHOCK];
	return [null];
}

function getBestOnlyChipToUseForBulb(@entity, @inventory) {

var WCellz = GetWalkableCells(_CELL[_MY_SELF] , _MP[_MY_SELF]);
	for (var item in inventory) {
		var Target = BestTarget(item);
		var BestShootCell = _CELL[Target];
		var getCellToUse = getCelltoUseItem(item, BestShootCell , WCellz);
		var Path = getPathLength(_CELL[_MY_SELF], getCellToUse);
		if (getCooldown(item)==0 && BestShootCell != null && Target != null && getTP() >= _ITEM_COST[item] && Path <= _MP[_MY_SELF]) {
			return item;
		}
	}
	return null;
}

function AiForBulbs() {
StartTestFunction();
var Ops = getOperations();
	for (var i = 0; i < 10; i++) {
		if (getOperations()-500000>Ops) break;
		UpdateLeekEffects();
		var WCellz = GetWalkableCells(_CELL[_MY_SELF] , _MP[_MY_SELF]);
		var Name = bulbname(_MY_SELF, EnemyLeekG)[0];
		var item = getBestOnlyChipToUseForBulb(Name, getArrayComboBulbSorted(Name));
		if (item == null) break;
		var Target = BestTarget(item);
		var BestShootCell = _CELL[Target];
		var getCellToUse = getCelltoUseItem(item, BestShootCell , WCellz);
		var Path = getPathLength(_CELL[_MY_SELF], getCellToUse);
		moveTowardCell(getCellToUse);
		useChipOnCell(item, BestShootCell);
	}
	PiptronBulb();
	moveTowardCell(HidenCellBulb(getCell(), getMP()));
	StopTestFunction("Bulb");
}
