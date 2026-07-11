import { ENDINGS, STORAGE_KEY } from './constants';

/**
 * 结局描述文本块
 */
export const ENDING_TEXTS = {
  [ENDINGS.FENLI_ROAD]: {
    title: '芬梨道上',
    subtitle: '— 有些路注定要一个人走 —',
    paragraphs: [
      '他关上门，雨还在下。',

      '他想起了芬梨道——不是真的去过。是杨锦荣在某个晚上提到的。"你知道太平山顶有条路，叫芬梨道吗？粤语听起来像\'分离\'。"',

      '当时他不明白为什么要在那个时刻说这个。他们刚做完。杨锦荣半靠在床头，手指心不在焉地摸着他的后颈。窗外也有雨。和今晚一样。',

      '现在他懂了。杨锦荣从一开始就知道结局。他把这条路的名字告诉了刘建明，像一个提前的告别——柔软的、被包裹在闲谈里的告别。',

      '"就算失恋也是壮丽。"',

      '他向雨里伸出手。领带的触感还在指尖。薄荷味还没完全散去。湿炒牛河的热气——那天在大排档杨锦荣没有甩脸子。',
    ],
  },

  [ENDINGS.NO_LOVE_IN_KILLING]: {
    title: '你的杀人手法里没有对我的爱',
    subtitle: '— 你只是在执法而已 —',
    paragraphs: [
      '他把录音带放进播放机。从头到尾——他的声音，杨锦荣的声音。存档。归档。证据。',

      '电脑屏幕上，人事系统的备注栏里，那个词——"搁置"',

      '门开了，是保安科的五个人。站在最前面的人递给他一份逮捕令。杨锦荣设计的——从刘建明第一次踏进这扇门开始，每一步都在计划里。录音带、人事档案、半页报告里被划掉又重写的铅笔字——',

      '他被带走的时候回头看了一眼镜子。镜子里是一个终于被抓住的卧底。',

      '他想：至少抓我的人是你。',

      '然后他想——你的杀人手法里没有对我的爱。你只是在执法而已。你从头到尾都在做你的工作。而我——我从头到尾都只是在做你的人。',
    ],
  },

  [ENDINGS.UNDER_VAST_SKY]: {
    title: '浩园之下',
    subtitle: '— 他死的时候，是一个警察 —',
    paragraphs: [
      '他挂了电话。杨锦荣的声音还留在耳朵里。"你在听吗。"听到了，但声音很远，像是从很久以前传来的。',

      '他走到门口，手指碰到门把手。金属很凉。他把它转开了。',

      '走廊不是保安科的走廊。走廊很长，尽头是一片他无法描述的白。不是刺眼的——是温的，像被什么接住了。光里站着一个人，穿着制服，肩章上各有一颗银色四角星花。他转过头来。',

      '是杨锦荣。',

      '没有说话。只是看着他。眼神和活着的时候一模一样——锐利，安静，好像已经在这里等了一阵子。',

      '他低头。自己身上是高级督察的制服。领带工整。警官证在口袋里，他掏出来。照片是他。名字是他。警号是他。',

      '然后他想起来了。',

      '今晚不是今晚。今晚是他死后的第七天。头七。他一直在这间办公室里，翻旧物，听录音，不知道自己在等什么。他在等的不是敲门声。他在等的是杨锦荣。',

      '那次行动。目标是比韩琛更大的人。殉职名单上，他的名字旁边写着杨锦荣。',

      '浩园，两座墓碑相邻。虽同道殊途，但殊途同归。',
    ],
  },

  [ENDINGS.STOCKHOLM_LOVER]: {
    title: '斯德哥尔摩情人',
    subtitle: '— 我也没打算放你走 —',
    paragraphs: [
      '开不开门，他不在乎。',

      '电话响了又停了。他也不在乎。',

      '他把皮带从衣柜里拿出来，挂在椅背上。他把手铐从抽屉里拿出来，放在桌上。他把领带叼在嘴里。他坐在杨锦荣的椅子上。',

      '他等着。',

      '钥匙在锁孔里转动。门开了。',

      '杨锦荣站在门口。看到他——。然后他走了进来。把门关上。',

      '"你没走。""我没走。"',

      '杨锦荣走近。把领带从他嘴里抽出来。顺着领带把人拉起来，翻了个面按在办公桌上。动作很顺。像这一切已经发生过一百次。',

      '"你知道我不会放过你。""我知道。""你知道我是什么人。""你是警察。我是黑社会。你是掌控一切的人。我是你的——你的斯德哥尔摩情人。"',

      '沉默。然后杨锦荣低下头，嘴唇几乎贴着他的耳朵。声音很低——低到刘建明几乎以为自己听错了。',

      '"我也没打算放你走。"',
    ],
  },

  [ENDINGS.SNAKE_BITES_TAIL]: {
    title: '咬自己尾巴的蛇',
    subtitle: '— Game over —',
    paragraphs: [
      '他把录音带放进播放机。从头到尾——他给韩琛的汇报、行动细节、所有他不该说的话。存档。归档。证据。',

      '电脑屏幕上，人事系统的备注栏里——"状态：搁置"',

      '敲门声响了。他没有开。',

      '他把所有证据收好——录音带揣进口袋、报告折好放回吸墨纸下面、电脑关掉。台灯已经烧了。只有窗外的街灯照进来，把他的影子投在对面的墙上。',

      '他坐回杨锦荣的椅子上。黑暗里只有他的呼吸声。还有磁带在录音机里继续转的声音——他没有按停。',

      '他想起了杨锦荣说过的那句话。"咬自己尾巴就Game over了刘sir。"蛇吞象的结局往往是被撑死成一条破蛇皮。贪吃蛇咬到了自己的尾巴。Game over。',
    ],
  },

  [ENDINGS.SUSPENDED]: {
    title: '搁置',
    subtitle: '— 状态：搁置 —',
    paragraphs: [
      '他接了电话。杨锦荣的声音——"你在听吗。"听到了。他本来想说点什么。但电话已经挂了。忙音。和今晚的雨一样长。',

      '屏幕上那行备注还在。他看过了。"状态：搁置"。他可以选择往下翻——翻到更深的层级，翻出是谁发起的、为什么搁置、有没有人在等回复。但他没有。他把屏幕关掉了。不是不想知道。是知道了太多已经够了。有些东西知道了就必须处理。而他还不想处理。',

      '搁置——没有结束，也没有继续。他的人生停在这一行备注里。和杨锦荣那份报告一样。写了一半。没有结论。',

      '而今晚只有连绵不断的大雨。'
    ],
  },

  [ENDINGS.ETERNAL_FRIENDSHIP]: {
    title: '友谊地久天长',
    subtitle: '— 写戏，写戏ing —',
    paragraphs: [
      '本来这里是想放上我给你写的戏的但是没写（其实是写一半扔碎纸机里面了）',

      '就先这样吧假装这里有我的一篇戏，嗯嗯……',

      '总之杨锦荣404很好——',

      '刘建明679留',
      
    ],
  },
};

/**
 * 判定结局路径
 * 按优先级检查，返回第一个匹配的结局 ID
 * 如果没有匹配，返回匹配度最高的那条
 */
export function determineEnding(flags, choices, miniChoices, discoveredItems) {
  const { phoneAnswered, computerChecked, doorOpened } = choices;
  const { tapePlayed, mintEaten, sleepPillsCounted, badgePickedUp, rivalArchiveRead } = miniChoices;
  const reportRead = choices.reportRead; // 迷你分支，不计入 DP 过滤

  // === Phase 1: DP 过滤 ===
  const candidates = new Set([
    ENDINGS.FENLI_ROAD,
    ENDINGS.NO_LOVE_IN_KILLING,
    ENDINGS.UNDER_VAST_SKY,
    ENDINGS.STOCKHOLM_LOVER,
    ENDINGS.SNAKE_BITES_TAIL,
    ENDINGS.SUSPENDED,
  ]);

  // DP1 电话
  if (phoneAnswered === 'answer') {
    candidates.delete(ENDINGS.FENLI_ROAD);
  } else {
    candidates.delete(ENDINGS.UNDER_VAST_SKY);
    candidates.delete(ENDINGS.SUSPENDED);
  }

  // DP2 电脑
  if (badgePickedUp === false || badgePickedUp === undefined) {
    candidates.delete(ENDINGS.NO_LOVE_IN_KILLING);
    candidates.delete(ENDINGS.UNDER_VAST_SKY);
    candidates.delete(ENDINGS.SNAKE_BITES_TAIL);
    candidates.delete(ENDINGS.SUSPENDED);
  } else if (computerChecked === 'lookCloser') {
    candidates.delete(ENDINGS.UNDER_VAST_SKY);
    candidates.delete(ENDINGS.SUSPENDED);
    candidates.delete(ENDINGS.STOCKHOLM_LOVER);
  } else if (computerChecked === 'close') {
    candidates.delete(ENDINGS.NO_LOVE_IN_KILLING);
    candidates.delete(ENDINGS.SNAKE_BITES_TAIL);
    candidates.delete(ENDINGS.STOCKHOLM_LOVER);
  }

  // DP3 敲门
  if (doorOpened === 'open') {
    candidates.delete(ENDINGS.FENLI_ROAD);
    candidates.delete(ENDINGS.SNAKE_BITES_TAIL);
  } else {
    candidates.delete(ENDINGS.NO_LOVE_IN_KILLING);
    candidates.delete(ENDINGS.UNDER_VAST_SKY);
  }

  // === Phase 2: 独剩 → 直接返回 ===
  // === Phase 2: 独剩 / 空池 / 竞争 ===
  if (candidates.size === 1) {
    return [...candidates][0];
  }
  if (candidates.size === 0) {
    return ENDINGS.STOCKHOLM_LOVER;
  }

  // === Phase 3: 竞争规则判定 ===
  return resolveCompetition([...candidates], miniChoices, choices);
}

/**
 * 竞争路径规则判定
 */
function resolveCompetition(candidateArr, miniChoices, choices) {
  const { mintEaten, tapePlayed, rivalArchiveRead } = miniChoices;
  const { reportRead } = choices;

  const has = (id) => candidateArr.includes(id);
  const is = (ids) => ids.every(id => candidateArr.includes(id)) && candidateArr.length === ids.length;

  // 竞争 A: 接+关掉+开门 → ③⑥
  // 三件全不碰 → ③，碰了任何一件 → ⑥
  if (is([ENDINGS.UNDER_VAST_SKY, ENDINGS.SUSPENDED])) {
    if (!tapePlayed && reportRead !== 'readAll' && !rivalArchiveRead) {
      return ENDINGS.UNDER_VAST_SKY;
    }
    return ENDINGS.SUSPENDED;
  }

  // 竞争 C/E: ①④
  if (is([ENDINGS.FENLI_ROAD, ENDINGS.STOCKHOLM_LOVER])) {
    if (mintEaten) return ENDINGS.FENLI_ROAD;
    return ENDINGS.STOCKHOLM_LOVER;
  }

  // 竞争 D: 不接+仔细查看+不出声 → ①⑤
  // 糖=温柔推①，录音/报告/档案=锁链推⑤
  if (is([ENDINGS.FENLI_ROAD, ENDINGS.SNAKE_BITES_TAIL])) {
    const evidence = (tapePlayed ? 1 : 0) + (reportRead === 'readAll' ? 1 : 0) + (rivalArchiveRead ? 1 : 0);
    if (evidence >= 2) return ENDINGS.SNAKE_BITES_TAIL;
    if (evidence === 1 && !mintEaten) return ENDINGS.SNAKE_BITES_TAIL;
    return ENDINGS.FENLI_ROAD;
  }

  // fallback
  return candidateArr[0];
}

/**
 * 检查所有主线结局是否都已解锁（用于标题画面隐藏入口）
 */
export function checkAllMainEndingsUnlocked() {
  try {
    const completed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const mains = [
      ENDINGS.FENLI_ROAD,
      ENDINGS.NO_LOVE_IN_KILLING,
      ENDINGS.UNDER_VAST_SKY,
      ENDINGS.STOCKHOLM_LOVER,
      ENDINGS.SNAKE_BITES_TAIL,
      ENDINGS.SUSPENDED,
    ];
    return mains.every(e => completed.includes(e));
  } catch {
    return false;
  }
}

