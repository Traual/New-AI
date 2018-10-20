include('include');

function Play(@enemys, @weapon, @cell, @mp, @enemyweapon, @tpa, @healAlly) {
	StartTestFunction();
	TryOneShoot(EnemyLeekG);
	OS();
	var tp = getTP();
	var tabSummon = [];
	var WhilePlay = 0;
	var BulbAlreadySpawned = false;
	var inv = GetItems(_MY_SELF);
	var oldcell ;
	while (true) {
		setCoef();
		UpdateLeekEffects();
		if (getLife() < getTotalLife() - (200 * (1 + getWisdom() / 100)) && getCooldown(CHIP_REGENERATION) == 0 && inArray(getChips(), CHIP_REGENERATION)) {
			useChip(CHIP_REGENERATION, _MY_SELF);
			tp -= 8;
			UpdateLeekEffects();
		}
		if (isDead(EnemyLeekG)) EnemyLeekG = EnemyLeek();
		if (getOperations() > _PLAY_OP_LIMIT) {
			debug("Break : " + (getOperations() / 1000000) + " OP PLAY");
			break;
		}
		WhilePlay++;
		if (inArray(getChips(), CHIP_LIBERATION)) {
			for (var i in getAliveEnemies()) {
				if (_RESISTANCE[i]==0 && _SCIENCE[i]==0) continue;
				debug("Libe Score : " + getName(i) + " : " + HelpLibeScoreEnemy(i));
				var cl = getCellToUseChip(CHIP_LIBERATION, i);
				var celltp = getCellToUseChipOnCell(CHIP_TELEPORTATION, cl);
				var PathTp = getPathLength(_CELL[_MY_SELF], celltp);
				var Path = getPathLength(_CELL[_MY_SELF], cl);
				if (HelpLibeScoreEnemy(i) > 12000 && PathTp <= 5 && Path >= 10 && getCooldown(CHIP_LIBERATION) == 0 && tp >= 12) {
					moveTowardCell(celltp);
					useChipOnCell(CHIP_TELEPORTATION, cl);
					useChip(CHIP_LIBERATION, i);
					tp -= 12;
					UpdateLeekEffects();
				}
				if (HelpLibeScoreEnemy(i) > 4000 && Path <= 6 && getCooldown(CHIP_LIBERATION) == 0 && tp >= 5) {
					moveTowardCell(cl);
					useChip(CHIP_LIBERATION, i);
					tp -= 5;
					UpdateLeekEffects();
				}
			}
		}
		var bi = getBestOnlyItem(_CELL[_MY_SELF] , _MP[_MY_SELF] , tp , oldcell);
		var BestShootingCell = bi[2];
		var CellToShoot = bi[1];
		if (bi[0] == null || !inArray(inv, bi[0]) || tp <= 0) {
			debug("break moving to hiden cells");
			break;
		}
		debug("Using : " + getItemName(bi[0]));
		if (isPositiv(bi[0]) != null || bi[0] == CHIP_INVERSION) {
			if (BestShootingCell != null) {
				mark(BestShootingCell, COLOR_RED);
				moveTowardCell(CellToShoot);
			}
			if (bi[0] == CHIP_DEVIL_STRIKE && getCellDistance(_CELL[_MY_SELF], BestShootingCell) < 3) {
				useChip(bi[0], _MY_SELF);
				tp -= _ITEM_COST[bi[0]];
			}
			if (count(getItemTargets(bi[0], BestShootingCell)) > 0) {
				while (tp>=_ITEM_COST[bi[0]]) {
					if (bi[0]!=getWeapon() && _ITEM_IS_WEAPON[bi[0]]) tp -= 1;
					useItem(bi[0], BestShootingCell, getWeapon());
					tp -= _ITEM_COST[bi[0]];
					if (_ITEM_COOLDOWN[bi[0]]>0 || count(getItemTargets(bi[0], BestShootingCell)) == 0) break;
				}
			}
		}
		if (isPositiv(bi[0]) == null && bi[0] != CHIP_TELEPORTATION && bi[0] != CHIP_ANTIDOTE && bi[0] != CHIP_INVERSION && bi[0] != CHIP_LIBERATION && bi[0] != CHIP_RESURRECTION && !BulbAlreadySpawned) {
			removeElement(inv, bi[0]);
			tp -= _ITEM_COST[bi[0]];
			push(tabSummon, bi[0]);
		}

		if (bi[0] == CHIP_RESURRECTION) {
			resurrect(DeadAlly()[0], getCellToUseChip(CHIP_FIRE_BULB, _MY_SELF));
		}
		if (isPositiv(bi[0]) != null || bi[0] == CHIP_INVERSION || bi[0] == CHIP_RESURRECTION) inv = GetItems(_MY_SELF);
		oldcell = getCell();
	}//Fin While
	var BestHideCellz = getBestCellToHide(_MAP_DANGER, EnemyLeekG , GetWalkableCells(getCell(), getMP()));
	moveTowardCell(BestHideCellz[0]);
	for (var i in tabSummon) {
		spawn(i, AiForBulbs);
	}
	//FailSafe();
	if (getWeapon() == null && getTP() >= 1 && inArray(getWeapons(), WEAPON_GAZOR)) {
		setWeapon(WEAPON_GAZOR);
	}
	StopTestFunction("Play");
	return tabSummon;
}
