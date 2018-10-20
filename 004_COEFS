include("include");
global _COEF_DMG = [];
global _COEF_ABS_SHIELD = [];
global _COEF_HEAL = [];
global _COEF_BOOST_STR = [];
global _COEF_BOOST_MP = [];
global _COEF_BOOST_TP = [];
global _COEF_BOOST_AGILITY = [];
global _COEF_REL_SHIELD = [];
global _COEF_SUMMON = 5000;
if (_RESISTANCE[_MY_SELF]==0 && _STRENGTH[EnemyLeekG]<200) _COEF_SUMMON +=60000;
if (_RESISTANCE[_MY_SELF]==0) _COEF_SUMMON +=40000;
if (getScience()>=600) _COEF_SUMMON /=50000;
global _COEF_BOOST_MAX_LIFE = [];
global _COEF_BUFF_RESI = [];
global _COEF_BUFF_WISDOM = [];
global _COEF_DMG_RETURN = [];
global _COEF_SHACKLE_STRENGTH = [];
global _COEF_SHACKLE_MP = [];
global _COEF_VULNERABILITY = [];
global _COEF_SHACKLE_TP = [];
global COEF_DMG = [];
global COEF_SHACKLE_STRENGTH = [];
global COEF_SHACKLE_TP = [];
global _COEF_AGILITY = [];
global _COEF_BOOST_RESI = [];
global _COEF_DAMAGE_RETURN = [];

function setCoef() {
	for (var target in _ALL_LEEKS) {
		var nBulb = getNumberOfBulb();
		var str = getStrength(target);
		var mgc = getMagic(target);
		var wsd = getWisdom(target);
		var rs = getRelativeShield(target);
		var as = getAbsoluteShield(target);
		var tp = getTP(target);
		var life = getLife(target);
		var totallife = getTotalLife(target);
		var melife = getLife();
		var dist = getCellDistance(_CELL[_MY_SELF], _CELL[target]);
		var lp = LifePercent(getLife(target), getTotalLife(target));
		var dft = DmgForTurn(target);
		var mestr = getStrength();
		var memgc = getMagic();
		var sum = isSummon(target);
		var resi = _RESISTANCE[target];
		var aglty = _AGILITY[target];
		var dmgreturn = _DAMAGE_RETURN[target];
		var strleekg = _STRENGTH[EnemyLeekG];
		var mp = _MP[target];
		var summ = isSummon(target);
		var ashield = _ABSOLUTE_SHIELD[target];
		var relshield = _RELATIVE_SHIELD[target];
		var StrShield = strleekg / 10;
		//INIT Pour eviter les null : 
		_COEF_VULNERABILITY[target] = 0;
		_COEF_DMG[target] = 0;
		_COEF_SHACKLE_STRENGTH[target] = 0;
		_COEF_SHACKLE_TP[target] = 0;
		_COEF_ABS_SHIELD[target] = 0;
		_COEF_REL_SHIELD[target] = 0;
		_COEF_DAMAGE_RETURN[target] = 0;
		_COEF_BOOST_RESI[target] = 0;
		_COEF_BOOST_AGILITY[target] = 0;
		_COEF_DMG_RETURN[target] = 0;
		_COEF_BUFF_WISDOM[target] = 0;
		_COEF_BOOST_MAX_LIFE[target] = 0;
		_COEF_BOOST_TP[target] = 0;
		_COEF_BOOST_MP[target] = 0;
		_COEF_BOOST_STR[target] = 0;
		_COEF_HEAL[target] = 0;

		if (isEnemy(target)) {

			if (mestr < 400) _COEF_VULNERABILITY[target] -= 20;
			if (nBulb[0] >= nBulb[1]) {
				_COEF_DMG[target] += 4;
				_COEF_VULNERABILITY[target] -= 8;
			}
			if (getCooldown(CHIP_ANTIDOTE, target) == 0 && mgc > 0) _COEF_DMG[target] += 10;
			if (nBulb[1] == 0) _COEF_DMG[target] += 3;
			if (getTurn() > 55) _COEF_DMG[target] += 3;
			if (lp < 90) _COEF_DMG[target] += 2;
			if (lp < 80) _COEF_DMG[target] += 3;
			if (lp < 70) _COEF_DMG[target] += 4;
			if (lp < 60) _COEF_DMG[target] += 5;
			if (lp < 50) _COEF_DMG[target] += 6;
			if (lp < 40) _COEF_DMG[target] += 7;
			if (lp < 30) _COEF_DMG[target] += 8;
			if (lp < 20) _COEF_DMG[target] += 9;
			if (lp < 10) _COEF_DMG[target] += 10;
			if (wsd < 200) _COEF_DMG[target] += 10;
			if (str >= 200) _COEF_DMG[target] += 1;
			if (mgc >= 200) _COEF_DMG[target] += 1;
			if (str >= 400) _COEF_DMG[target] += 1.5;
			if (mgc >= 400) _COEF_DMG[target] += 1.5;
			if (str >= 600) _COEF_DMG[target] += 2;
			if (mgc >= 600) _COEF_DMG[target] += 2;
			if (str >= 800) _COEF_DMG[target] += 2.5;
			if (str >= 1000) _COEF_DMG[target] += 3;
			if (str >= 1200) _COEF_DMG[target] += 3.5;
			if (dist < 15) {
				_COEF_DMG[target] += 4;
				_COEF_VULNERABILITY[target] += 4;
			}
			if (dist < 10) {
				_COEF_DMG[target] += 6;
				_COEF_VULNERABILITY[target] += 6;
			}
			if (dist < 5) {
				_COEF_DMG[target] += 8;
				_COEF_VULNERABILITY[target] += 10;
			}
			if (dist <= 1) {
				_COEF_DMG[target] += 4;
				_COEF_VULNERABILITY[target] += 100;
			}
			if (str >= 200) _COEF_SHACKLE_STRENGTH[target] += 4;
			if (mgc >= 200) _COEF_SHACKLE_STRENGTH[target] += 2;
			if (str >= 400) _COEF_SHACKLE_STRENGTH[target] += 6;
			if (mgc >= 400) _COEF_SHACKLE_STRENGTH[target] += 5;
			if (str >= 600) _COEF_SHACKLE_STRENGTH[target] += 8;
			if (mgc >= 600) _COEF_SHACKLE_STRENGTH[target] += 6;
			if (str >= 800) _COEF_SHACKLE_STRENGTH[target] += 8;
			if (str >= 1000) _COEF_SHACKLE_STRENGTH[target] += 10;
			if (str >= 1200) _COEF_SHACKLE_STRENGTH[target] += 15;

			if (dist < 15 && str > 1 || dist < 15 && mgc > 1) _COEF_SHACKLE_STRENGTH[target] += 1;
			if (dist < 10 && str > 1 || dist < 10 && mgc > 1) _COEF_SHACKLE_STRENGTH[target] += 2;
			if (dist < 5 && str > 1 || dist < 5 && mgc > 1) _COEF_SHACKLE_STRENGTH[target] += 3;
			if (dist < 1 && str > 1 || dist < 1 && mgc > 1) _COEF_SHACKLE_STRENGTH[target] += 4;
			if (dft >= 500) _COEF_SHACKLE_STRENGTH[target] -= 2;
			if (dft >= 300) _COEF_SHACKLE_STRENGTH[target] -= 2;
			if (str <= 0 && mgc <= 0) _COEF_SHACKLE_STRENGTH[target] = 0;
			if (rs > 10 && memgc <= 200) _COEF_DMG[target] -= 1;
			if (rs > 20 && memgc <= 200) _COEF_DMG[target] -= 1.25;
			if (rs > 30 && memgc <= 200) _COEF_DMG[target] -= 1.5;
			if (rs > 40 && memgc <= 200) _COEF_DMG[target] -= 2;
			if (rs > 60 && memgc <= 200) _COEF_DMG[target] -= 4;
			if (rs > 80 && memgc <= 200) _COEF_DMG[target] -= 5;
			if (rs > 100 && memgc <= 200) _COEF_DMG[target] -= 9999999999999999999;
			if (as > 50 && memgc <= 200) _COEF_DMG[target] -= 1;
			if (as > 100 && memgc <= 200) _COEF_DMG[target] -= 1.5;
			if (as > 150 && memgc <= 200) _COEF_DMG[target] -= 2;
			if (as > 200 && memgc <= 200) _COEF_DMG[target] -= 2.5;
			if (as > 250 && memgc <= 200) _COEF_DMG[target] -= 3;
			if (as > 300 && memgc <= 200) _COEF_DMG[target] -= 3.5;
			if (as > 350 && memgc <= 200) _COEF_DMG[target] -= 4;
			if (as > 400 && memgc <= 200) _COEF_DMG[target] -= 4.5;
			if (as > 450 && memgc <= 200) _COEF_DMG[target] -= 5;
			if (as == 0 && rs == 0 && mestr >= 300) _COEF_DMG[target] += 2.5;
			if (tp > 20) _COEF_SHACKLE_TP[target] += 10;
			if (tp > 16) _COEF_SHACKLE_TP[target] += 8;
			if (tp > 14) _COEF_SHACKLE_TP[target] += 6;
			if (tp > 12) _COEF_SHACKLE_TP[target] += 4;
			if (tp >= 10) _COEF_SHACKLE_TP[target] += 2;
			_COEF_SHACKLE_TP[target] *= 2400;
			if (melife > life) {
				_COEF_DMG[target] += 20;
				_COEF_VULNERABILITY[target] += 6;
			}
			if (_TP[_MY_SELF] == getTotalTP(_MY_SELF)) _COEF_VULNERABILITY[target] += 15;
			else _COEF_VULNERABILITY[target] -= 10;
			if (life == RealLeeklife(target) && memgc >= 200) _COEF_DMG[target] += 7;
			if (LifePercent(life, getTotalLife()) < 40) _COEF_DMG[target] -= 5;
			if (bulbname(target, _MY_SELF)[1] > 0) {
				_COEF_DMG[target] += (bulbname(target, _MY_SELF)[1]);
			} else _COEF_DMG[target] = 0;
			_COEF_DMG[target] *= 1200; 
			if (getFightType() == FIGHT_TYPE_FARMER || getFightType() == FIGHT_TYPE_TEAM) {
				_COEF_DMG[target] *= 2;
			}
			_COEF_VULNERABILITY[target] *= 56000;
			_COEF_SHACKLE_STRENGTH[target] *= 1600;
		}
		if (isAlly(target)) {
			_COEF_ABS_SHIELD[target] += StrShield;
			_COEF_REL_SHIELD[target] += StrShield;
			if (dmgreturn == 0) _COEF_DAMAGE_RETURN[target] += 5;
			if (dmgreturn < 10) _COEF_DAMAGE_RETURN[target] += 4.5;
			if (dmgreturn < 20) _COEF_DAMAGE_RETURN[target] += 4;
			if (dmgreturn < 30) _COEF_DAMAGE_RETURN[target] += 3.5;
			if (dmgreturn < 40) _COEF_DAMAGE_RETURN[target] += 3;
			if (dmgreturn < 50) _COEF_DAMAGE_RETURN[target] += 2.5;
			if (dmgreturn < 60) _COEF_DAMAGE_RETURN[target] += 2;
			if (dmgreturn < 70) _COEF_DAMAGE_RETURN[target] += 1.5;
			if (dmgreturn < 80) _COEF_DAMAGE_RETURN[target] += 1;
			if (dmgreturn < 90) _COEF_DAMAGE_RETURN[target] += 0.5;

			if (aglty > 0) _COEF_BOOST_AGILITY[target] += 15;
			if (aglty >= 200) _COEF_BOOST_AGILITY[target] += 5;
			if (aglty >= 300) _COEF_BOOST_AGILITY[target] += 5;
			if (aglty >= 400) _COEF_BOOST_AGILITY[target] += 10;
			if (aglty >= 600) _COEF_BOOST_AGILITY[target] += 15;
			if (aglty > 1000) _COEF_BOOST_AGILITY[target] = 0;

			if (resi > 0) _COEF_BOOST_RESI[target] += 15;
			if (resi >= 200) _COEF_BOOST_RESI[target] += 5;
			if (resi >= 300) _COEF_BOOST_RESI[target] += 5;
			if (resi >= 400) _COEF_BOOST_RESI[target] += 10;
			if (resi >= 600) _COEF_BOOST_RESI[target] += 15;
			if (resi == 0) _COEF_BOOST_RESI[target] = 0;
			if (isSummon(target)) _COEF_BOOST_RESI[target] /= 5;
			if (str >= 200) {
				_COEF_BOOST_STR[target] += 5;
				_COEF_BOOST_MP[target] += 5;
				_COEF_BOOST_TP[target] += 5;
			}
			if (str >= 300) {
				_COEF_BOOST_STR[target] += 7.5;
				_COEF_BOOST_MP[target] += 7.5;
				_COEF_BOOST_TP[target] += 7.5;
			}
			if (str >= 400) {
				_COEF_BOOST_STR[target] += 10;
				_COEF_BOOST_MP[target] += 10;
				_COEF_BOOST_TP[target] += 10;
			}
			if (str >= 500) {
				_COEF_BOOST_STR[target] += 15;
				_COEF_BOOST_MP[target] += 15;
				_COEF_BOOST_TP[target] += 15;
			}
			if (str > 1100) _COEF_BOOST_STR[target] -= 30;

			if (tp >= 24) _COEF_BOOST_TP[target] -= 45;
			if (mp >= 20) _COEF_BOOST_MP[target] -= 45;
			if (dist < 15) {
				_COEF_BOOST_STR[target] += 2.5;
				_COEF_BOOST_MP[target] += 2.5;
				_COEF_BOOST_TP[target] += 2.5;
			}
			if (dist < 10) {
				_COEF_BOOST_STR[target] += 5;
				_COEF_BOOST_MP[target] += 5;
				_COEF_BOOST_TP[target] += 5;
			}
			if (dist < 5) {
				_COEF_BOOST_STR[target] += 7.5;
				_COEF_BOOST_MP[target] += 7.5;
				_COEF_BOOST_TP[target] += 7.5;
			}
			if (dist <= 1) {
				_COEF_BOOST_STR[target] += 10;
				_COEF_BOOST_MP[target] += 10;
				_COEF_BOOST_TP[target] += 10;
			}
			if (str < 200) _COEF_BOOST_STR[target] = 0;
			if (summ) {
				_COEF_BOOST_STR[target] /= 15;
				_COEF_BOOST_MP[target] /= 15;
				_COEF_BOOST_TP[target] /= 15;
			}
			if (ashield == 0) _COEF_ABS_SHIELD[target] += 5;
			if (ashield < 50) _COEF_ABS_SHIELD[target] += 4;
			if (ashield < 100) _COEF_ABS_SHIELD[target] += 3;
			if (ashield < 150) _COEF_ABS_SHIELD[target] += 2;
			if (ashield < 200) _COEF_ABS_SHIELD[target] += 1;
			if (relshield == 0) _COEF_REL_SHIELD[target] += 5;
			if (relshield < 10) _COEF_REL_SHIELD[target] += 4;
			if (relshield < 20) _COEF_REL_SHIELD[target] += 3;
			if (relshield < 30) _COEF_REL_SHIELD[target] += 2;
			if (relshield < 40) _COEF_REL_SHIELD[target] += 1;
			if (strleekg < 200 && getFightType() == FIGHT_TYPE_SOLO) {
				_COEF_REL_SHIELD[target] = 1;
				_COEF_ABS_SHIELD[target] = 1;
			}
			if (summ) {
				_COEF_REL_SHIELD[target] -= 15;
				_COEF_ABS_SHIELD[target] -= 20;
			}

			if (life < totallife) _COEF_HEAL[target] += 5;
			if (lp < 80) _COEF_HEAL[target] += 3;
			if (lp < 60) _COEF_HEAL[target] += 4;
			if (lp < 40) _COEF_HEAL[target] += 5;
			if (lp < 20) _COEF_HEAL[target] += 6;
			if (lp < 5) _COEF_HEAL[target] += 10;
			if (summ) _COEF_HEAL[target] /= 5;
			if (life == totallife) _COEF_HEAL[target] = 0;
			if (totallife < 2000) _COEF_BOOST_MAX_LIFE[target] += 1;
			if (totallife < 1600) _COEF_BOOST_MAX_LIFE[target] += 2;
			if (totallife < 1200) _COEF_BOOST_MAX_LIFE[target] += 3;
			if (totallife < 800) _COEF_BOOST_MAX_LIFE[target] += 4;
			if (totallife < 400) _COEF_BOOST_MAX_LIFE[target] += 5;
			if (summ) _COEF_BOOST_MAX_LIFE[target] -= 25;
			_COEF_BOOST_MAX_LIFE[target] += bulbname(target, EnemyLeekG)[1];
			_COEF_BOOST_AGILITY[target] *= _COEF_TIMES_BOOST_AGILITY;
			_COEF_BOOST_MAX_LIFE[target] *= _COEF_TIMES_BOOST_MAX_LIFE;
			_COEF_HEAL[target] *= _COEF_TIMES_HEAL;
			_COEF_ABS_SHIELD[target] *= _COEF_TIMES_ABSOLUTE_SHIELD;
			_COEF_REL_SHIELD[target] *= _COEF_TIMES_RELATIVE_SHIELD;
			_COEF_DAMAGE_RETURN[target] *= _COEF_TIMES_DAMAGE_RETURN;
			_COEF_BOOST_STR[target] *= _COEF_TIMES_BOOST_STRENGTH;
			_COEF_BOOST_MP[target] *= _COEF_TIMES_BOOST_MP;
			_COEF_BOOST_TP[target] *= _COEF_TIMES_BOOST_TP;
			_COEF_BOOST_RESI[target] *= _COEF_TIMES_BOOST_RESI;
		}
	}
}

function getItemCoef(Item, target) {
	var ie = _ITEM_EFFECTS[Item];
	for (var eff in ie)
	if (eff[0] == EFFECT_DAMAGE && Item!=WEAPON_B_LASER && Item!=WEAPON_DESTROYER|| eff[0] == EFFECT_POISON) return _COEF_DMG[target];
	for (var eff in ie)
	if (eff[0] == EFFECT_HEAL || Item == WEAPON_B_LASER) return _COEF_HEAL[target];
	for (var eff in ie)
	if (eff[0] == EFFECT_ABSOLUTE_SHIELD) return _COEF_ABS_SHIELD[target];
	for (var eff in ie)
	if (eff[0] == EFFECT_RELATIVE_SHIELD) return _COEF_REL_SHIELD[target];
	for (var eff in ie)
	if (eff[0] == EFFECT_SUMMON) return _COEF_SUMMON;
	for (var eff in ie)
	if (eff[0] == EFFECT_BUFF_STRENGTH) return _COEF_BOOST_STR[target];
	for (var eff in ie)
	if (eff[0] == EFFECT_BUFF_TP) return _COEF_BOOST_TP[target];
	for (var eff in ie)
	if (eff[0] == EFFECT_BUFF_MP) return _COEF_BOOST_MP[target];
	for (var eff in ie)
	if (eff[0] == EFFECT_SHACKLE_TP) return _COEF_SHACKLE_TP[target];
	for (var eff in ie)
	if (eff[0] == EFFECT_SHACKLE_MP) return _COEF_SHACKLE_MP[target];
	for (var eff in ie)
	if (eff[0] == EFFECT_SHACKLE_STRENGTH ||Item == WEAPON_DESTROYER) return _COEF_SHACKLE_STRENGTH[target];
	for (var eff in ie)
	if (eff[0] == EFFECT_VULNERABILITY) return _COEF_VULNERABILITY[target];
	for (var eff in ie)
	if (eff[0] == EFFECT_BOOST_MAX_LIFE) return _COEF_BOOST_MAX_LIFE[target];
	for (var eff in ie)
	if (eff[0] == EFFECT_BUFF_AGILITY) return _COEF_AGILITY[target];
	for (var eff in ie)
	if (eff[0] == EFFECT_DAMAGE_RETURN) return _COEF_DMG_RETURN[target];
	for (var eff in ie)
	if (eff[0] == EFFECT_BUFF_RESISTANCE) return _COEF_BOOST_RESI[target];
	return 0;
}

function BestTarget(@item) {
	var summ = isOnlyBulb(@item);
	var IE = _ITEM_EFFECTS[item];
	var BestScore = 0;
	var BesTarget;
	var targets = _ALL_LEEKS;
	for (var target in targets) {
		var DoHaveIt = isPositiv(item) ? DoesHaveChip(target, item) : false;
		var Coef = getItemCoef(item, target);
		var RealLife = RealLeeklife(target);
		if (!DoHaveIt && Coef > BestScore && RealLife > 0 && !summ || !DoHaveIt &&  Coef > BestScore && RealLife > 0 && summ && isSummon(target)) {
			BestScore = Coef;
			BesTarget = target;
		}
	}
	if (IE[0][0] == EFFECT_SUMMON) return _MY_SELF;
	return BesTarget;
}
