include('include');


function GetItems(Leek) {
	var TabItems = [];
	for (var i in getChips(Leek)) {
		if (getNumberOfBulb()[0]==6 && _ITEM_EFFECTS[i]==EFFECT_SUMMON) continue; 
		if (getCooldown(i, Leek) == 0) push(TabItems, i);
	}
	pushAll(TabItems, getWeapons(Leek));
	if (getLife(Leek) < 1000) removeElement(TabItems, CHIP_DEVIL_STRIKE);
	if (getAbsoluteShield(Leek) == 0) removeElement(TabItems, CHIP_DEVIL_STRIKE);
	
	removeElement(TabItems, CHIP_REGENERATION);
	removeElement(TabItems, CHIP_ANTIDOTE);
	removeElement(TabItems, CHIP_LIBERATION);
	removeElement(TabItems, CHIP_TELEPORTATION);
	return TabItems;
}



function MustFocusEnemy(@enemy) {
	var totalLife = _TOTAL_LIFE[enemy];
	var enemymgc = _MAGIC[enemy];
	var EnemyRealLife = RealLeeklife(enemy);
	var MyRealLife = RealLeeklife(_MY_SELF);
	var NbBulb = getNumberOfBulb();
	var EnemyChips = getChips(enemy);
	var MyMgc = _MAGIC[_MY_SELF];
	var MyStr = _STRENGTH[_MY_SELF];
	var MyPwr = MyMgc > MyStr ? MyMgc : MyStr;
	var Life = _LIFE[enemy];
	var EnemyPwr = _MAGIC[enemy] > _STRENGTH[enemy] ? _MAGIC[enemy] : _STRENGTH[enemy];
	var Score = 0;
	if (MyMgc >= 400) {
		Score += (getCooldown(CHIP_LIBERATION, enemy) * 0.3);
		Score += (getCooldown(CHIP_ANTIDOTE, enemy) * 0.8);
		}
	if (ShieldScore(_MY_SELF)==0) Score -= 10;
	if (ShieldScore(_MY_SELF)<=200) Score -= 7;
	if (ShieldScore(_MY_SELF)>=350) Score += 5;
	if (!inArray(EnemyChips, CHIP_ANTIDOTE) && MyMgc >= 400) Score += 3;
	if (!inArray(EnemyChips, CHIP_LIBERATION) && MyMgc >= 400) Score += 2;
	if (EnemyPwr <= 400) Score += 4;
	if (EnemyRealLife > MyRealLife) Score -= 6;
	if (MyRealLife > EnemyRealLife) Score += 9;
	if (NbBulb[0] > NbBulb[1]) Score += 6;
	if (NbBulb[1] > NbBulb[0]) Score -= 6;
	if (totalLife<1000) Score +=8;
	if (NbBulb[0]==0) Score -= 6;
	if (NbBulb[1]) Score += 8;
	Score += (MyPwr / 100);
	Score -= (EnemyPwr / 100);
	return Score;
}
