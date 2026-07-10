import { SCENES, ATMOSPHERE_THRESHOLDS } from '../game/constants';

export const ACTIONS = {
  SET_SCENE: 'SET_SCENE',
  DISCOVER_ITEM: 'DISCOVER_ITEM',
  SET_FLAG: 'SET_FLAG',
  MAKE_CHOICE: 'MAKE_CHOICE',
  SET_MINI_CHOICE: 'SET_MINI_CHOICE',
  QUEUE_DIALOGUE: 'QUEUE_DIALOGUE',
  ADVANCE_DIALOGUE: 'ADVANCE_DIALOGUE',
  SET_CURRENT_MEMORY: 'SET_CURRENT_MEMORY',
  TRIGGER_DECISION: 'TRIGGER_DECISION',
  LOCK_ENDING: 'LOCK_ENDING',
  SET_ENDING: 'SET_ENDING',
  UPDATE_ATMOSPHERE: 'UPDATE_ATMOSPHERE',
  RECORD_EASTER_EGG: 'RECORD_EASTER_EGG',
  INCREMENT_CLICK_COUNT: 'INCREMENT_CLICK_COUNT',
  SET_TRANSITION: 'SET_TRANSITION',
  RESET_GAME: 'RESET_GAME',
};

function computeAtmospherePhase(discoveredCount) {
  if (discoveredCount >= ATMOSPHERE_THRESHOLDS.PHASE_5) return 5;
  if (discoveredCount >= ATMOSPHERE_THRESHOLDS.PHASE_4) return 4;
  if (discoveredCount >= ATMOSPHERE_THRESHOLDS.PHASE_3) return 3;
  if (discoveredCount >= ATMOSPHERE_THRESHOLDS.PHASE_2) return 2;
  if (discoveredCount >= ATMOSPHERE_THRESHOLDS.PHASE_1) return 1;
  return 0;
}

export function gameReducer(state, action) {
  switch (action.type) {

    case ACTIONS.SET_SCENE:
      return { ...state, scene: action.payload, transitionEffect: null };

    case ACTIONS.DISCOVER_ITEM: {
      const itemId = action.payload;
      if (state.discoveredItems.includes(itemId)) return state;
      const newDiscovered = [...state.discoveredItems, itemId];
      const newPhase = computeAtmospherePhase(newDiscovered.length);
      return {
        ...state,
        discoveredItems: newDiscovered,
        atmospherePhase: newPhase,
      };
    }

    case ACTIONS.SET_FLAG: {
      const { flag, value } = action.payload;
      return {
        ...state,
        flags: { ...state.flags, [flag]: value ?? true },
      };
    }

    case ACTIONS.MAKE_CHOICE: {
      const { choiceKey, value } = action.payload;
      return {
        ...state,
        choices: { ...state.choices, [choiceKey]: value },
      };
    }

    case ACTIONS.SET_MINI_CHOICE: {
      const { key, value } = action.payload;
      return {
        ...state,
        miniChoices: { ...state.miniChoices, [key]: value ?? true },
      };
    }

    case ACTIONS.QUEUE_DIALOGUE:
      return {
        ...state,
        dialogueQueue: Array.isArray(action.payload)
          ? action.payload
          : [...state.dialogueQueue, action.payload],
      };

    case ACTIONS.ADVANCE_DIALOGUE: {
      const newQueue = state.dialogueQueue.slice(1);
      return { ...state, dialogueQueue: newQueue };
    }

    case ACTIONS.SET_CURRENT_MEMORY:
      return { ...state, currentMemory: action.payload };

    case ACTIONS.TRIGGER_DECISION: {
      const decisionId = action.payload;
      if (state.triggeredDecisions.includes(decisionId)) return state;
      // reportDP 和 computer-silent 不进入 DECISION 场景，只记录
      if (decisionId === 'reportDP' || decisionId === 'computer-silent' || decisionId === 'mirror-silent') {
        const normalizedId = decisionId === 'computer-silent' ? 'computer' : decisionId;
        return {
          ...state,
          triggeredDecisions: [...state.triggeredDecisions, normalizedId],
        };
      }
      return {
        ...state,
        currentDecision: decisionId,
        scene: SCENES.DECISION,
        triggeredDecisions: [...state.triggeredDecisions, decisionId],
      };
    }

    case ACTIONS.LOCK_ENDING:
      return { ...state, lockedEnding: action.payload };

    case ACTIONS.SET_ENDING:
      return { ...state, ending: action.payload, scene: SCENES.ENDING };

    case ACTIONS.UPDATE_ATMOSPHERE:
      return {
        ...state,
        atmospherePhase: computeAtmospherePhase(state.discoveredItems.length),
      };

    case ACTIONS.RECORD_EASTER_EGG: {
      const eggId = action.payload;
      if (state.easterEggsFound.includes(eggId)) return state;
      return {
        ...state,
        easterEggsFound: [...state.easterEggsFound, eggId],
      };
    }

    case ACTIONS.INCREMENT_CLICK_COUNT: {
      const itemId = action.payload;
      const current = state.itemClickCounts[itemId] || 0;
      return {
        ...state,
        itemClickCounts: { ...state.itemClickCounts, [itemId]: current + 1 },
      };
    }

    case ACTIONS.SET_TRANSITION:
      return { ...state, transitionEffect: action.payload };

    case ACTIONS.RESET_GAME:
      // 通过 window.location.reload() 在 EndingScreen 中重置
      return state;

    default:
      return state;
  }
}
