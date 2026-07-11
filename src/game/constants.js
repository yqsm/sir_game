// 场景名称
export const SCENES = {
  TITLE: 'title',
  INTRO: 'intro',
  ROOM: 'room',
  MEMORY: 'memory',
  MINI_CHOICE: 'miniChoice',
  DECISION: 'decision',
  ENDING: 'ending',
};

// 结局标识
export const ENDINGS = {
  FENLI_ROAD: 'fenliRoad',
  NO_LOVE_IN_KILLING: 'noLoveInYourKilling',
  UNDER_VAST_SKY: 'underVastSky',       // 浩园之下 → 内部用 underVastSky
  STOCKHOLM_LOVER: 'stockholmLover',
  SNAKE_BITES_TAIL: 'snakeBitesTail',        // ⑤ 咬自己尾巴的蛇
  SUSPENDED: 'suspended',                     // ⑥ 搁置
  ETERNAL_FRIENDSHIP: 'eternalFriendship',
};

// 氛围阶段阈值
export const ATMOSPHERE_THRESHOLDS = {
  PHASE_1: 3,   // 闪电
  PHASE_2: 6,   // 台灯闪烁
  PHASE_3: 9,   // 暴雨
  PHASE_4: 12,  // 灯泡烧了
  PHASE_5: 15,  // 雨停
};

// 抉择点触发条件
export const DECISION_TRIGGERS = {
  DOOR_KNOCK: 18,  // 18件全找到触发敲门声
};

// 物品层级解锁阈值
export const ITEM_TIER_THRESHOLDS = {
  MID_TIER: 3,   // 发现 ≥3 件表层 → 中层物品可交互
  DEEP_TIER: 6,  // 发现 ≥6 件 → 深层物品可交互
};

// localStorage key
export const STORAGE_KEY = 'sir_game_completed_endings';
