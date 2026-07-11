/**
 * 18 件可探索物品的完整定义
 * tier: 'surface' | 'mid' | 'deep'
 * position: { x, y } — 百分比坐标
 * size: { w, h } — 点击区域的百分比大小
 * flag: 发现后设置的 flag key
 * memory: 记忆覆层中显示的文本
 * miniChoice: 可选，点击后弹出的小选择
 * prerequisite: 可选，需要先发现的其他物品 ID
 * hint: 光标悬停时显示的提示文字
 */

export const ITEMS = [
  // ==================== 🟢 表层 ====================
  {
    id: 'tie',
    name: '领带',
    tier: 'surface',
    position: { x: 42, y: 35 },
    size: { w: 8, h: 12 },
    flag: 'foundIntimacy',
    hint: '一条深蓝色的领带，挂在椅背上',
    memory: [
      '"你总喜欢弄皱我的东西。"',
      '刘建明记得叼着它泄愤的触感。丝绸的凉。杨锦荣把领带从他嘴里抽出来的动作——很慢，像是在享受布料划过嘴唇的阻力。',
      '深蓝色。有一点皱。凑近了能看到浅浅的牙印。',
      '这条领带挂在这里多久了？杨锦荣没有再戴它。',
    ],
  },
  {
    id: 'badge',
    name: '警官证',
    tier: 'surface',
    position: { x: 22, y: 48 },
    size: { w: 6, h: 7 },
    flag: 'foundIdentity',
    hint: '一本倒扣着的警官证',
    miniChoice: {
      prompt: '刘建明看着证件上自己的照片。制服很整齐。表情很正经。奇怪，自己的警官证怎么在这里？',
      options: [
        { text: '拿起来细看', value: 'pickUp' },
        { text: '翻过去不看', value: 'putDown' },
      ],
    },
    memory: [
      '"警官证跟情趣道具似的。"',
      '杨锦荣说这话的时候在笑。金丝镜片后面的眼睛眯起来，看不出来是轻蔑还是觉得好玩。',
    ],
  },
  {
    id: 'glasses',
    name: '眼镜',
    tier: 'surface',
    position: { x: 25, y: 43 },
    size: { w: 5, h: 5 },
    flag: 'foundClarity',
    hint: '一副金丝眼镜，放在书桌角落',
    memory: [
      '杨锦荣的平光镜。没有度数。',
    ],
  },
  {
    id: 'mcdonalds',
    name: '麦当劳收据',
    tier: 'surface',
    position: { x: 30, y: 55 },
    size: { w: 5, h: 4 },
    flag: 'foundShared',
    hint: '一张被揉过又展平的收据',
    memory: [
      '那天刘建明兴冲冲地提了麦当劳到保安科。杨锦荣看了一眼袋子。说了两个字。"不吃。"',
      '但袋子还是被拿走了。里面的薯条也少了一半。',
    ],
  },
  {
    id: 'biscuit',
    name: '焦糖饼干',
    tier: 'surface',
    position: { x: 28, y: 45 },
    size: { w: 4, h: 4 },
    flag: 'foundDomestic',
    hint: '一块焦糖饼干，包装纸上画着一只老鼠',
    memory: [
      '那天杨锦荣在办公。刘建明在边上等着——忘了是等什么。桌上有一块焦糖饼干。他趁杨锦荣不注意拿起来吃了。',
      '杨锦荣没有抬头。"那是最后一块。""哦。""你赔我。""明天给你买。""明天不一定是焦糖味的。"',
      '包装纸上画着一只老鼠。戴着小领结。看起来很快乐。但饼干没了。',
    ],
  },

  // ==================== 🟡 中层 ====================
  {
    id: 'mint',
    name: '薄荷糖铁盒',
    tier: 'mid',
    position: { x: 62, y: 22 },
    size: { w: 5, h: 5 },
    flag: 'foundTenderness',
    hint: '一个小小的铁盒，里面还有几颗白色薄荷糖',
    miniChoice: {
      prompt: '铁盒打开。薄荷糖还剩三颗。白白的。圆圆的。有一点点粉末粘在盒底。',
      options: [
        { text: '吃一颗', value: 'eat' },
        { text: '盖上盖子', value: 'close' },
      ],
    },
    memory: [
      '"我喜欢薄荷味*好心*。"',
      '那次杨锦荣漱完口后，含了一颗薄荷糖，挨过去搂着刘建明的腰吻他。然后他尝到了薄荷味。',
    ],
  },
  {
    id: 'mouseEars',
    name: '老鼠耳朵',
    tier: 'mid',
    position: { x: 68, y: 12 },
    size: { w: 5, h: 5 },
    flag: 'foundMouseEars',
    hint: '书架顶上，一对毛绒老鼠耳朵发箍',
    prerequisite: null,
    memory: [
      '"闲人免进，但没说闲老鼠不能进——"',
      '他真的戴着这个进了保安科。',
      '杨锦荣正在喝咖啡。看到他的一瞬间——停顿。杯沿停在嘴唇上。然后若无其事地继续喝。嘴角动了一下。他在忍笑。他忍住了。',
      '发箍上沾了一点灰。他戴完之后就扔在书架顶上。杨锦荣没有收走。',
    ],
  },
  {
    id: 'sleepPills',
    name: '安眠药瓶',
    tier: 'mid',
    position: { x: 20, y: 58 },
    size: { w: 4, h: 4 },
    flag: 'foundSleepPills',
    hint: '一个药瓶',
    miniChoice: {
      prompt: '苯二氮卓类。处方日期——两周前。剂量——每晚两颗。他打开瓶盖。',
      options: [
        { text: '数一数还剩几颗', value: 'count' },
        { text: '盖上放回去', value: 'putBack' },
      ],
    },
    memory: [
      '"最近靠安眠药才能入睡。"',
      '他说这话的时候杨锦荣没有接话。只是看了他一眼——那种让人觉得自己被看透了的眼神。',
      '后来杨锦荣把毯子和垫子放到了房间角落。"睡不着就过来。别吃药。"说得很随意，像在交代一件无关紧要的事。但毯子是新的。垫子也是。',
    ],
  },
  {
    id: 'cufflink',
    name: '袖扣',
    tier: 'mid',
    position: { x: 18, y: 68 },
    size: { w: 4, h: 4 },
    flag: 'foundLost',
    hint: '一只银色的袖扣，掉在书桌脚边',
    memory: [
      '"失去了一只袖扣。那个人丢下你走了。现在你要自己寻找出口了。"',
      '袖扣上刻着一个字母：`Y`。',
      '他把袖扣放在手心里。很轻。很凉。那个人丢下他走了。但袖扣留下了。',
    ],
  },
  {
    id: 'noodles',
    name: '湿炒牛河结账单',
    tier: 'mid',
    position: { x: 25, y: 60 },
    size: { w: 5, h: 5 },
    flag: 'foundSharedMeal',
    hint: '一张结账单，压在抽屉里的文件下面',
    memory: [
      '"我喜欢湿炒带芥兰的。""你跟我吃大份的湿炒。"',
      '大排档。塑料凳。折叠桌。杨锦荣没有甩脸子——和周围喧闹的环境居然很搭。他吃得很慢，芥兰一根一根夹。刘建明把干炒往他那边推了推。"你也尝尝这个。"杨锦荣尝了一口。"太油。"',
      '结账单上点了两份。一份大份湿炒。一份干炒。干炒最终被划掉了，旁边一行字："跟他一样。"',
      '那天杨锦荣穿的不是制服。是普通的衬衫。领口解开了一颗扣子。看起来像个普通人。',
    ],
  },
  {
    id: 'keys',
    name: '钥匙串',
    tier: 'mid',
    position: { x: 56, y: 58 },
    size: { w: 5, h: 8 },
    flag: 'foundTrust',
    hint: '一串钥匙，挂在门边的挂钩上',
    memory: [
      '钥匙还在。选择还在。',
    ],
  },
  {
    id: 'blanket',
    name: '毯子和垫子',
    tier: 'mid',
    position: { x: 85, y: 75 },
    size: { w: 10, h: 10 },
    flag: 'foundBelonging',
    hint: '办公椅后面的角落，铺着灰色毯子和厚地垫',
    memory: [
      '"房角，那里有给你准备的厚地垫。"',
      '毯子是灰色的。有一点旧——但洗得很干净。垫子上有一个微微凹陷的形状。一个人蜷缩着睡觉的形状。他在这里睡过不止一次。',
      '刘建明蹲下来。用手摸了摸垫子的厚度。很厚。睡上去不会冷。他不知道这是关心还是效率——杨锦荣会确保他的东西不会坏。',
    ],
  },

  // ==================== 🔴 深层 ====================
  {
    id: 'belt',
    name: '皮带',
    tier: 'deep',
    position: { x: 78, y: 28 },
    size: { w: 6, h: 10 },
    flag: 'foundControl',
    hint: '衣柜里挂着一条黑色皮带，扣针上多打了一个孔',
    memory: [
      '"套在他脖子上强行用扣针在皮带上穿个窿。"',
      '皮带上有一个额外的孔。不是出厂时打的，是后来用扣针硬穿的。位置不对——不像是为了系裤子。刚好是一个脖子的围度。',
      '刘建明把皮带拿下来。他记得这条皮带，记得它勒在脖子上，卡在喉结下方，被杨锦荣牵着走——从床到角落的垫子。',
      '他不记得自己当时是害怕还是兴奋。也许两者都有。',
    ],
  },
  {
    id: 'handcuffs',
    name: '手铐',
    tier: 'deep',
    position: { x: 22, y: 64 },
    size: { w: 5, h: 5 },
    flag: 'foundPower',
    hint: '上锁的抽屉里，一副警用标准手铐',
    prerequisite: 'keys',
    memory: [
      '"咔哒一声解开了，立刻就在背后摸索着把他给铐了，攻守异势。"',
      '手铐内侧刻了一行小字：`Property of CIB`。CIB的财产。但被用在了非公务场合。刘建明那次违规带手铐出去，杨锦荣说要参他一本，最后却还是没有揭露他。',
    ],
  },
  {
    id: 'recorder',
    name: '录音设备',
    tier: 'deep',
    position: { x: 24, y: 66 },
    size: { w: 5, h: 4 },
    flag: 'foundSurveillance',
    hint: '上锁的抽屉里，手铐旁边，一台小型录音机',
    prerequisite: 'keys',
    miniChoice: {
      prompt: '录音机里有一盘磁带。标签上没有写字，只有一行日期——他认出来了。是三个月前的某个晚上。他刚和韩琛通完电话的那个晚上。播放键是红色的。',
      options: [
        { text: '按下播放键', value: 'play' },
        { text: '放回抽屉', value: 'putBack' },
      ],
    },
    memory: [
      '扬声器里先是一阵杂音。然后是他自己的声音。他正在给韩琛汇报。最近的行动细节、下一步的计划。',
      '磁带继续转。韩琛的声音。又是他的声音。杨锦荣把不止一次通话录了下来——在不同的日期，不同的时间。',
      '一段很长的空白。嘶嘶的磁带噪声。然后是按键声。最后是——杨锦荣的声音：',
      '"刘sir，其实你长的很好看，我实在不大想扇脸。"',
      '回以他的是有些饥渴的喘息声：',
      '"打坏了算我的。"',
    ],
  },
  {
    id: 'rivalFile',
    name: '陈永仁的档案',
    tier: 'deep',
    position: { x: 72, y: 38 },
    size: { w: 6, h: 8 },
    flag: 'foundRival',
    hint: '文件柜里，一份标注"已故"的调查档案',
    miniChoice: {
      prompt: '保安科对陈永仁的调查档案。封面盖着红色印章："已故"。打开第一页，是陈永仁的照片。',
      options: [
        { text: '从头到尾读完', value: 'read' },
        { text: '翻过去，合上', value: 'skip' },
      ],
    },
    memory: [
      '档案最后一页。杨锦荣的笔迹。不是警用报告的正式措辞，是随手写在空白处的一行字：',
      '"如果你还在，有些事情会不一样。"',
      '刘建明想：如果陈永仁还在。陈永仁，杨锦荣的警校同期，那个各项成绩都压他一头的人。如果他还在，那自己和杨锦荣之间还会有这些东西吗？',
      '也许这些都不重要。反正陈永仁已经死了。',
    ],
  },
  {
    id: 'mazeDrawing',
    name: '迷宫图纸',
    tier: 'deep',
    position: { x: 65, y: 16 },
    size: { w: 5, h: 4 },
    flag: 'foundGame',
    hint: '一张手绘的迷宫图',
    memory: [
      '"这里面路似乎很曲折，你自己找找看吧。"',
      '铅笔手绘的迷宫。右下角画了一只老鼠，站在迷宫入口，尾巴卷成一个问号。出口画了一只猫——坐在迷宫外面，背对着出口，好像在等老鼠自己走出来。',
    ],
  },
  {
    id: 'report',
    name: '半页报告',
    tier: 'deep',
    position: { x: 32, y: 50 },
    size: { w: 7, h: 5 },
    flag: 'foundReport',
    hint: '书桌吸墨纸下面，写了一半就停了的报告',
    miniChoice: {
      prompt: '杨锦荣的笔迹工整、冷静。报告记录了关于"某高级督察的可疑行为"的各种证据。写得很完整。直到结论部分——只写了一个冒号。后面是空的。翻到最后一页。有一行被划掉的铅笔字。',
      options: [
        { text: '看被划掉的那行字', value: 'readAll' },
        { text: '折起来放回原处', value: 'foldAway' },
      ],
    },
    memory: [
      '被划掉的铅笔字。杨锦荣的笔迹——但比正式报告的字要轻。好像写的时候怕被人看到：',
      '"……或许他是真的想做好人。"',
    ],
  },
];

// 按 tier 筛选
export function getItemsByTier(tier) {
  return ITEMS.filter(item => item.tier === tier);
}

// 获取物品的 flag key → id 映射
export function getItemByFlag(flagKey) {
  return ITEMS.find(item => item.flag === flagKey);
}
