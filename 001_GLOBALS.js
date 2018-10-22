include('include');

/////////////////////////////////////////////////////////////////////////////////////////////
//Les Globals Utiles
/////////////////////////////////////////////////////////////////////////////////////////////

global _ALL_CELLZ;
global _CELL_AREA = [];
global _AOE0 = [];
global _AOE1 = [];
global _AOE2 = [];
global _AOE3 = [];
global ArrayItemsCellsTo = [];
global DoNotSpeak2Times = false;
global PourChanterEnRythme = 0;
global _OPS = 0;
global _MAP_DANGER = [];
global _MAP_ACTION = [];
global _CELLZ_TO_USE = [];
global _POSSIBLE_TARGETS = [];//Array[item] --> Possible targets (not too far ones)
global _EGUAL_DMG_CELLZ = [];
global _BEST_DMG_CELL = [];//Cell : [BestCellToHide , BestScoreOfCell]
global _ACCESCELLS = [];
global _REAL_LIFES = [];

/////////////////////////////////////////////////////////////////////////////////////////////
//Les Globals Pour la function bulbname
/////////////////////////////////////////////////////////////////////////////////////////////
global ENTITY_LEEK_ = 0;
global ENTITY_PUNY_BULB = 1;
global ENTITY_ROCKY_BULB = 2;
global ENTITY_ICED_BULB = 3;
global ENTITY_HEALER_BULB = 4;
global ENTITY_METALLIC_BULB = 5;
global ENTITY_FIRE_BULB = 6;
global ENTITY_LIGHTNING_BULB = 7;

/////////////////////////////////////////////////////////////////////////////////////////////
//Les Globals De Score 
/////////////////////////////////////////////////////////////////////////////////////////////

global _COEF_DIVIDE_COEFS = 100;
global _SCORE_KILL = 1000;
global _SCORE_PLAY_SAFE = 120;
global _MAP_DANGER_OP_LIMIT = 7000000;
global _MAP_ACTION_OP_LIMIT = 2000000;
global _PLAY_OP_LIMIT = 17000000;
global _COEF_TIMES_ABSOLUTE_SHIELD = 700;
global _COEF_TIMES_BOOST_MAX_LIFE = 400;
global _COEF_TIMES_BOOST_AGILITY = 600;
global _COEF_TIMES_BOOST_STRENGTH = 700;
global _COEF_TIMES_BOOST_MP = 3300;
global _COEF_TIMES_BOOST_TP = 3500;
global _COEF_TIMES_BOOST_RESI = 1500;
global _COEF_TIMES_DAMAGE_RETURN = 60000;
global _COEF_TIMES_HEAL = 1300;//1300
global _COEF_TIMES_RELATIVE_SHIELD = 2400;

//////////////////////////////////////////////////////////////////////////////////////////
//
//Les Tableaux Pour Items
//////////////////////////////////////////////////////////////////////////////////////////
//

global _ITEM_MINRANGE = [];
global _ITEM_MAXRANGE = [];
global _ITEM_COOLDOWN = [];
global _ITEM_INLINE = [];
global _ITEM_AREA = [];
global _ITEM_COST = [];
global _ITEM_EFFECTS = [];
global _ITEM_POWER = [];
global _ITEM_IS_WEAPON = [];

//////////////////////////////////////////////////////////////////////////////////////////
//
//Les Tableaux Pour Leeks
//////////////////////////////////////////////////////////////////////////////////////////
//

global EnemyLeekG = getNearestEnemy();
global _DEAD_ALLIES = getDeadAllies();
global _DEAD_ENEMIES = getDeadEnemies();
global _ALIVE_ALLIES = getAliveAllies();
global _ALIVE_ENEMIES = getAliveEnemies();
global _ALL_LEEKS = _ALIVE_ALLIES+_ALIVE_ENEMIES;
global _IS_ALLY = [];

global _CELL = [];
global _MY_SELF = getLeek();
global _EFFECTS = [];
global _LIFE = [];
global _ABSOLUTE_SHIELD = [];
global _RELATIVE_SHIELD = [];
global _AGILITY = [];
global _STRENGTH = [];
global _MAGIC = [];
global _MP = [];
global _TP = [];
global _RESISTANCE = [];
global _SCIENCE = [];
global _TOTAL_LIFE = [];
global _WISDOM = [];
global _DAMAGE_RETURN = [];

global _COUNT_LIGHTNING_ALLY;
global _COUNT_LIGHTNING_ENEMY;
global _COUNT_FIRE_ALLY;
global _COUNT_FIRE_ENEMY;
global _COUNT_METALLIC_ALLY;
global _COUNT_METALLIC_ENEMY;
global _COUNT_HEALER_ALLY;
global _COUNT_HEALER_ENEMY;
global _COUNT_ICED_ALLY;
global _COUNT_ICED_ENEMY;
global _COUNT_ROCKY_ALLY;
global _COUNT_ROCKY_ENEMY;
global _COUNT_PUNY_ALLY;
global _COUNT_PUNY_ENEMY;
_COUNT_LIGHTNING_ALLY = 0;
_COUNT_LIGHTNING_ENEMY = 0;
_COUNT_FIRE_ALLY = 0;
_COUNT_FIRE_ENEMY = 0;
_COUNT_METALLIC_ALLY = 0;
_COUNT_METALLIC_ENEMY = 0;
_COUNT_HEALER_ALLY = 0;
_COUNT_HEALER_ENEMY = 0;
_COUNT_ICED_ALLY = 0;
_COUNT_ICED_ENEMY = 0;
_COUNT_ROCKY_ALLY = 0;
_COUNT_ROCKY_ENEMY = 0;
_COUNT_PUNY_ALLY = 0;
_COUNT_PUNY_ENEMY = 0;

//////////////////////////////////////////////////////////////////////////////////////////
//
//Les Tableau Debiles
//////////////////////////////////////////////////////////////////////////////////////////
//

global _IS_GENTLE_BULB = [
	CHIP_LIGHTNING_BULB : true,
	CHIP_FIRE_BULB : false,
	CHIP_METALLIC_BULB : true ,
	CHIP_HEALER_BULB : true ,
	CHIP_ICED_BULB : false ,
	CHIP_ROCKY_BULB : false,
	CHIP_PUNY_BULB : true
];

global _BEST_ITEM_NOT_GENTLE_BULB = [//PETITE AIDE POUR LE GETCELLTOSUMMON
	CHIP_FIRE_BULB : CHIP_METEORITE,
	CHIP_ICED_BULB : CHIP_ICEBERG,
	CHIP_ROCKY_BULB : CHIP_ROCKFALL
];

global _CHIP_ISPOSITIV = [
    CHIP_ACCELERATION:true,
    CHIP_ADRENALINE:true,
    CHIP_ANTIDOTE:true,
    CHIP_ARMOR:true,
    CHIP_ARMORING:true,
    CHIP_BALL_AND_CHAIN:false,
    CHIP_BANDAGE:true,
    CHIP_BARK:true,
    CHIP_BURNING:false,
    CHIP_CARAPACE:true,
    CHIP_COLLAR:true,
    CHIP_CURE:true,
    CHIP_DEVIL_STRIKE:false,
    CHIP_DOPING:true,
    CHIP_DRIP:true,
    CHIP_FEROCITY:true,
    CHIP_FERTILIZER:true,
    CHIP_FIRE_BULB:null,
    CHIP_FLAME:false,
	CHIP_FLASH:false,
    CHIP_FORTRESS:true,
    CHIP_FRACTURE:false,
    CHIP_HEALER_BULB:null,
    CHIP_HELMET:true,
    CHIP_ICE:false,
    CHIP_ICEBERG:false,
    CHIP_ICED_BULB:null,
    CHIP_INVERSION:false,
    CHIP_LEATHER_BOOTS:true,
    CHIP_LIBERATION:null,
    CHIP_LIGHTNING:false,
    CHIP_LIGHTNING_BULB:null,
    CHIP_LOAM:true,
    CHIP_METALLIC_BULB:null,
    CHIP_METEORITE:false,
    CHIP_MIRROR:true,
    CHIP_MOTIVATION:true,
    CHIP_PEBBLE:false,
    CHIP_PLAGUE:false,
    CHIP_PROTEIN:true,
    CHIP_PUNY_BULB:null,
    CHIP_RAGE:true,
    CHIP_RAMPART:true,
    CHIP_REFLEXES:true,
    CHIP_REGENERATION:true,
    CHIP_REMISSION:true,
    CHIP_RESURRECTION:null,
    CHIP_ROCK:false,
    CHIP_ROCKFALL:false,
    CHIP_ROCKY_BULB:null,
    CHIP_SEVEN_LEAGUE_BOOTS:true,
    CHIP_SHIELD:true,
    CHIP_SHOCK:false,
    CHIP_SLOW_DOWN:false,
    CHIP_SOLIDIFICATION:true,
    CHIP_SOPORIFIC:false,
    CHIP_SPARK:false,
    CHIP_STALACTITE:false,
    CHIP_STEROID:true,
    CHIP_STRETCHING:true,
    CHIP_TELEPORTATION:null,
    CHIP_THORN:true,
    CHIP_TOXIN:false,
    CHIP_TRANQUILIZER:false,
    CHIP_VACCINE:true,
    CHIP_VENOM:false,
    CHIP_WALL:true,
    CHIP_WARM_UP:true,
    CHIP_WHIP:true,
    CHIP_WINGED_BOOTS:true,
	WEAPON_AXE:false,
	WEAPON_B_LASER:false,
	WEAPON_BROADSWORD:false,
	WEAPON_DESTROYER:false,
	WEAPON_DOUBLE_GUN:false,
	WEAPON_ELECTRISOR:false,
	WEAPON_FLAME_THROWER:false,
	WEAPON_GAZOR:false,
	WEAPON_GRENADE_LAUNCHER:false,
	WEAPON_KATANA:false,
	WEAPON_LASER:false,
	WEAPON_MACHINE_GUN:false,
	WEAPON_MAGNUM:false,
	WEAPON_M_LASER:false,
	WEAPON_PISTOL:false,
	WEAPON_SHOTGUN:false
];
