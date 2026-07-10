import { SCENES } from '../game/constants';

export const initialState = {
  // 当前场景
  scene: SCENES.TITLE,

  // 已发现的物品 ID 列表
  discoveredItems: [],

  // 叙事 flag（由物品发现设置）
  flags: {
    foundIntimacy: false,       // 领带
    foundIdentity: false,       // 警官证
    foundClarity: false,        // 眼镜
    foundControl: false,        // 皮带
    foundPower: false,          // 手铐
    foundTenderness: false,     // 薄荷糖
    foundDomestic: false,       // 焦糖饼干
    foundBelonging: false,      // 毯子垫子
    foundTrust: false,          // 钥匙
    foundLost: false,           // 袖扣
    foundShared: false,         // 麦麦收据
    foundSurveillance: false,   // 录音设备
    foundRival: false,          // 陈永仁档案
    foundGame: false,           // 迷宫图纸
    foundReport: false,         // 半页报告
    foundMouseEars: false,      // 老鼠耳朵
    foundSleepPills: false,     // 安眠药
    foundSharedMeal: false,     // 湿炒牛河外卖单
  },

  // 关键抉择记录
  choices: {
    phoneAnswered: null,        // 'answer' | 'ignore'
    computerChecked: null,      // 'lookCloser' | 'close'
    reportRead: null,           // 'readAll' | 'foldAway'
    doorOpened: null,           // 'open' | 'staySilent'
  },

  // 迷你分支记录
  miniChoices: {
    tapePlayed: false,
    sleepPillsCounted: false,
    mintEaten: false,
    rivalArchiveRead: false,
  },

  // 结局路径（后台自动锁定，玩家不可见）
  lockedEnding: null,

  // 当前结局（用于 EndingScreen 展示）
  ending: null,

  // 氛围阶段 0-4
  atmospherePhase: 0,

  // 当前记忆（MemoryOverlay 展示的物品）
  currentMemory: null,

  // 对话队列
  dialogueQueue: [],

  // 当前抉择点 ID
  currentDecision: null,

  // 已触发的抉择点（防止重复触发）
  triggeredDecisions: [],

  // 彩蛋发现记录
  easterEggsFound: [],

  // 物品点击计数（用于彩蛋）
  itemClickCounts: {},

  // 过渡效果
  transitionEffect: null,
};
