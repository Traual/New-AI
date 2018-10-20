include('include');

if (getTurn() == 1) {
	for (var c = 0; c <= 612; c++) {
		_AOE0[c] = [c];
		_AOE1[c] = cellarea1(c);
		_AOE2[c] = cellarea2(c);
		_AOE3[c] = cellarea3(c);
	}
	//debug("Aoe 3 : "+_AOE2[306]);
	//debug("Tab aoe3 : "+_AOE3[300]);
	for (var item = 0; item <= 110; item++) {
		if (isWeapon(item)) {
			_ITEM_MINRANGE[item] = getWeaponMinRange(item);
			_ITEM_MAXRANGE[item] = getWeaponMaxRange(item);
			_ITEM_COOLDOWN[item] = 0;
			_ITEM_INLINE[item] = isInlineWeapon(item);
			_ITEM_AREA[item] = getWeaponArea(item);
			_ITEM_COST[item] = getWeaponCost(item);
			_ITEM_EFFECTS[item] = getWeaponEffects(item);
			_ITEM_POWER[item] = getWeaponEffects(item)[0][1];
			_ITEM_IS_WEAPON[item] = true;
		}
		if (isChip(item)) {
			_ITEM_MINRANGE[item] = getChipMinRange(item);
			_ITEM_MAXRANGE[item] = getChipMaxRange(item);
			_ITEM_COOLDOWN[item] = getChipCooldown(item);
			_ITEM_INLINE[item] = isInlineChip(item);
			_ITEM_AREA[item] = getChipArea(item);
			_ITEM_COST[item] = getChipCost(item);
			_ITEM_EFFECTS[item] = getChipEffects(item);
			_ITEM_POWER[item] = getChipEffects(item)[0][1];
			_ITEM_IS_WEAPON[item] = false;
		}
		if (_ITEM_AREA[item] == AREA_POINT || _ITEM_AREA[item] == AREA_LASER_LINE) _CELL_AREA[item] = _AOE0;
		if (_ITEM_AREA[item] == AREA_CIRCLE_1) _CELL_AREA[item] = _AOE1;
		if (_ITEM_AREA[item] == AREA_CIRCLE_2) _CELL_AREA[item] = _AOE2;
		if (_ITEM_AREA[item] == AREA_CIRCLE_3) _CELL_AREA[item] = _AOE3;
	}
	_ITEM_POWER[CHIP_DEVIL_STRIKE] = 125;
	_ITEM_MINRANGE[WEAPON_GAZOR] = 4;
	_ITEM_MINRANGE[CHIP_PLAGUE] = 4;
	_ITEM_MINRANGE[CHIP_BALL_AND_CHAIN] = 3;
	_ITEM_MINRANGE[CHIP_SOPORIFIC] = 3;
	_ITEM_MINRANGE[CHIP_TOXIN] = 2;
}

function UpdateLeekEffects() {
	_IS_ALLY = [];
	_MY_SELF = getLeek();
	_DEAD_ALLIES = getDeadAllies();
	_DEAD_ENEMIES = getDeadEnemies();
	_ALIVE_ALLIES = getAliveAllies();
	_ALIVE_ENEMIES = getAliveEnemies();
	_ALL_LEEKS = _ALIVE_ALLIES + _ALIVE_ENEMIES;

	for (var leek in _ALL_LEEKS) {
		_REAL_LIFES[leek] = RealLeeklife(leek);
		var Entity_type = bulbname(leek, leek)[0];
		_CELL[leek] = getCell(leek);
		_EFFECTS[leek] = getEffects(leek);
		_LIFE[leek] = getLife(leek);
		_ABSOLUTE_SHIELD[leek] = getAbsoluteShield(leek);
		_RELATIVE_SHIELD[leek] = getRelativeShield(leek);
		_AGILITY[leek] = getAgility(leek);
		_STRENGTH[leek] = getStrength(leek);
		_MAGIC[leek] = getMagic(leek);
		_MP[leek] = getMP(leek);
		_TP[leek] = getTP(leek);
		_RESISTANCE[leek] = getResistance(leek);
		_SCIENCE[leek] = getScience(leek);
		_TOTAL_LIFE[leek] = getTotalLife(leek);
		_WISDOM[leek] = getWisdom(leek);
		_DAMAGE_RETURN[leek] = getDamageReturn(leek);
		if (isAlly(leek)) { //isAlly
			_IS_ALLY[leek] = true;
			if (isSummon(leek)) { //LesBulbes
				if (Entity_type == ENTITY_LIGHTNING_BULB) _COUNT_LIGHTNING_ALLY++;
				if (Entity_type == ENTITY_FIRE_BULB) _COUNT_FIRE_ALLY++;
				if (Entity_type == ENTITY_METALLIC_BULB) _COUNT_METALLIC_ALLY++;
				if (Entity_type == ENTITY_HEALER_BULB) _COUNT_HEALER_ALLY++;
				if (Entity_type == ENTITY_ICED_BULB) _COUNT_ICED_ALLY++;
				if (Entity_type == ENTITY_ROCKY_BULB) _COUNT_ROCKY_ALLY++;
				if (Entity_type == ENTITY_PUNY_BULB) _COUNT_PUNY_ALLY++;
			}
		} else { //isEnemy
			_IS_ALLY[leek] = false;
			if (isSummon(leek)) {
				if (Entity_type == ENTITY_LIGHTNING_BULB) _COUNT_LIGHTNING_ENEMY++;
				if (Entity_type == ENTITY_FIRE_BULB) _COUNT_FIRE_ENEMY++;
				if (Entity_type == ENTITY_METALLIC_BULB) _COUNT_METALLIC_ENEMY++;
				if (Entity_type == ENTITY_HEALER_BULB) _COUNT_HEALER_ENEMY++;
				if (Entity_type == ENTITY_ICED_BULB) _COUNT_ICED_ENEMY++;
				if (Entity_type == ENTITY_ROCKY_BULB) _COUNT_ROCKY_ENEMY++;
				if (Entity_type == ENTITY_PUNY_BULB) _COUNT_PUNY_ENEMY++;
			}
		}
	}
}
