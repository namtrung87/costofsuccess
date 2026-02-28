
import { GamePhase, GameState, Language } from './types';

// Assets - Localized to public folder
export const ASSETS = {
  // Backgrounds
  BG_LOBBY: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/bg_lobby_v2_1772162710449.png",
  BG_DESIGN_LAB: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/bg_design_lab_v3_1772163232223.png",
  BG_TECH_ROOM: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/bg_deconstruction_v2_1772163257940.png",
  BG_OPS_CENTER: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/bg_ops_center_v2_1772164400000_1772163872253.png",
  BG_ALLOCATION_SECTOR: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/bg_allocation_sector_v1_1772164400001_1772163885837.png",
  BG_COMMAND_CENTER: "/assets/images/bg_cfo_office.png",
  BG_PUMP_ROOM: "/assets/images/bg_pump_room.png",
  BG_VALUATION_ROOM: "/assets/images/bg_valuation.png",
  BG_MAINFRAME: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/bg_mainframe_v1_1772164400003_1772163927218.png",
  BG_DROP_ROOM: "/assets/images/bg_drop_room.png",
  BG_ROOFTOP: "/assets/images/bg_cfo_office.png",
  BG_OFFICE: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/bg_design_lab_v3_1772163232223.png",

  // Characters & Aliases
  CHAR_JULES: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/char_jules_smug_v2_1772162729891.png",
  CHAR_JULES_NEUTRAL: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/char_jules_smug_v2_1772162729891.png",
  CHAR_JULES_SMUG: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/char_jules_smug_v2_1772162729891.png",
  CHAR_JULES_HAPPY: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/char_jules_smug_v2_1772162729891.png",
  CHAR_JULES_ANGRY: "/assets/images/char_jules.png",
  CHAR_JULES_SIP: "/assets/images/char_jules.png",

  CHAR_ROB: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/char_rob_neutral_v2_1772164400002_1772163905389.png",
  CHAR_ROB_NEUTRAL: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/char_rob_neutral_v2_1772164400002_1772163905389.png",
  CHAR_ROB_ANGRY: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/char_rob_angry_v2_1772164400004_1772163944130.png",
  CHAR_ROB_SHOCKED: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/char_rob_angry_v2_1772164400004_1772163944130.png",

  CHAR_KAI: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/char_kai_confident_v2_1772164400005_1772163960770.png",
  CHAR_KAI_NEUTRAL: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/char_kai_confident_v2_1772164400005_1772163960770.png",
  CHAR_KAI_STRESSED: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/char_kai_stressed_v2_1772163273581.png",
  CHAR_KAI_CONFIDENT: "file:///C:/Users/Trung%20Nguyen/.gemini/antigravity/brain/78b1a61a-8834-4bd6-9e87-aa4680dfce9c/char_kai_confident_v2_1772164400005_1772163960770.png",

  CHAR_KEN: "/assets/images/char_avatar_d.png",
  CHAR_KEN_NEUTRAL: "/assets/images/char_avatar_d.png",

  // Extra Avatars
  CHAR_AVATAR_A: "/assets/images/char_avatar_a.png",
  CHAR_AVATAR_B: "/assets/images/char_avatar_b.png",
  CHAR_AVATAR_C: "/assets/images/char_avatar_c.png",

  // Props / UI Elements
  PROP_GATEKEEPER: "/assets/images/prop_gatekeeper.png",
  UI_INVOICE_FRAME: "/assets/images/ui_invoice_frame.png",
  UI_DEPT_MAP: "/assets/images/ui_dept_map.png",
  ICON_GEAR: "/assets/images/icon_valve.png",
  ICON_LOGO: "/assets/images/icon_launch.png",
  ICON_VISOR: "/assets/images/char_avatar_c.png",

  // New Visualization Assets
  ICON_BOX: "/assets/images/icon_box.png",
  ICON_DATA: "/assets/images/icon_data.png",
  ICON_NEEDLE: "/assets/images/icon_needle.png",
  ICON_FABRIC: "/assets/images/icon_fabric.png",
  VFX_PIPES: "/assets/images/vfx_pipes.png",
  VFX_CLOUD: "/assets/images/vfx_cloud.png",

  // Rewards/Items
  UNLIMITED_BOBA: "/assets/images/ui_boba.png",
  NEON_VISOR_SKIN: "/assets/images/char_avatar_c.png",
  RANK_COST_ANALYST_LV1: "/assets/images/icon_data.png",
  RANK_ALLOCATION_EXPERT: "/assets/images/ui_dept_map.png",
  RANK_REAPPORTIONMENT_SPEC: "/assets/images/icon_valve.png",
  NAMED_HOODIE: "/assets/images/item_hoodie.png",
  RANK_CERTIFIED_CONTROLLER: "/assets/images/icon_launch.png",
};

export const DIFFICULTY_SETTINGS = {
  ZEN: {
    startingBudget: 5000,
    startingSanity: 100,
    sanityDecayMultiplier: 0.5,
    penaltyMultiplier: 0.5,
    rewardMultiplier: 1.2
  },
  NORMAL: {
    startingBudget: 2000,
    startingSanity: 100,
    sanityDecayMultiplier: 1.0,
    penaltyMultiplier: 1.0,
    rewardMultiplier: 1.0
  },
  HARDCORE: {
    startingBudget: 500,
    startingSanity: 80,
    sanityDecayMultiplier: 2.0,
    penaltyMultiplier: 2.0,
    rewardMultiplier: 0.8
  }
};

// Lazy Load Bundles
export const ASSET_BUNDLES = {
  BUNDLE_LAB: ['BG_DESIGN_LAB', 'BG_TECH_ROOM', 'CHAR_KAI_NEUTRAL'],
  BUNDLE_OPS: ['BG_OPS_CENTER', 'BG_COMMAND_CENTER', 'CHAR_ROB_NEUTRAL'],
  BUNDLE_FINALE: ['BG_PUMP_ROOM', 'BG_VALUATION_ROOM', 'BG_DROP_ROOM', 'BG_ROOFTOP']
};

export const INITIAL_STATE: GameState = {
  language: 'EN', // Default Language
  currentPhase: GamePhase.START_SCREEN,
  lastActivePhase: null,
  // Unlock ONLY start screen by default (Fixing Dev Mode)
  unlockedPhases: [GamePhase.START_SCREEN],
  sanity: 100,
  budget: 1000,
  playerName: "Intern",
  playerAvatar: ASSETS.CHAR_AVATAR_A,
  inventory: [],
  musicEnabled: true,
  textSpeed: 30, // Default Text Speed
  isHandbookOpen: false,
  isMenuOpen: false,
  isFeedbackOpen: false,
  // Pre-load all assets to lock them in
  assets: {
    ...ASSETS
  },
  loadedBundles: [],
  isAssetsLoading: false,
  percentageLoaded: 0,
  toasts: [],
  unlockedAchievements: [],
  streak: 0,
  maxStreak: 0,
  equippedAvatar: 'avatar_default',
  unlockedCosmetics: ['avatar_default', 'theme_default'],
  activeTheme: 'theme_default',
  isWardrobeOpen: false,
  isShareModalOpen: false,
  flags: [],
  difficulty: 'NORMAL' as any // Will be initialized correctly in context
};

export const SANITY_CRITICAL_THRESHOLD = 25;

// GEN Z PHASE TITLES
export const PHASE_TITLES: Record<string, Record<Language, string>> = {
  'PHASE_1': { EN: 'LEVEL 1: THE VIBE CHECK', VI: 'MÀN 1: KIỂM TRA VIBE' },
  'PHASE_2': { EN: 'LEVEL 2: RED FLAGS & RECEIPTS', VI: 'MÀN 2: CỜ ĐỎ & HÓA ĐƠN' },
  'PHASE_3': { EN: 'LEVEL 3: DECONSTRUCTING THE DRIP', VI: 'MÀN 3: MỔ XẺ OUTFIT' },
  'PHASE_4': { EN: 'LEVEL 4: GHOST HUNTING', VI: 'MÀN 4: TRUY TÌM BÓNG MA' },
  'PHASE_5': { EN: 'LEVEL 5: TURF WARS', VI: 'MÀN 5: TRANH GIÀNH LÃNH ĐỊA' },
  'PHASE_6': { EN: 'LEVEL 6: MATH IS MATHING', VI: 'MÀN 6: TÍNH TOÁN SỐ LIỆU' },
  'PHASE_7': { EN: 'LEVEL 7: AIRDROP SECURED', VI: 'MÀN 7: AIRDROP THÀNH CÔNG' },
  'PHASE_8': { EN: 'LEVEL 8: MAINFRAME DRAIN', VI: 'MÀN 8: XẢ TRÀN HỆ THỐNG' },
  'PHASE_9': { EN: 'LEVEL 9: ABSORPTION PROTOCOL', VI: 'MÀN 9: GIAO THỨC THẨM THẤU' },
  'PHASE_10': { EN: 'LEVEL 10: REALITY CHECK', VI: 'MÀN 10: VA CHẠM THỰC TẾ' },
  'PHASE_11': { EN: 'LEVEL 11: THE DROP', VI: 'MÀN 11: THE DROP' },
  'PHASE_12': { EN: 'LEVEL 12: THE BEHAVIOR SPLIT', VI: 'MÀN 12: BÓC TÁCH ỨNG XỬ' },
  'PHASE_13': { EN: 'LEVEL 13: THE CONTRIBUTION REVELATION', VI: 'MÀN 13: SỐ DƯ ĐẢM PHÍ' },
  'PHASE_14': { EN: 'LEVEL 14: THE DUAL BOOKS', VI: 'MÀN 14: HAI CUỐN SỔ' },
  'PHASE_15': { EN: 'LEVEL 15: THE BREAK-EVEN CANVAS', VI: 'MÀN 15: ĐIỂM HÒA VỐN' },
  'PHASE_16': { EN: 'LEVEL 16: THE SAFETY NET PITCH', VI: 'MÀN 16: CHIẾN LƯỢC AN TOÀN' },
  'PHASE_17': { EN: 'LEVEL 17: THE MASTER BLUEPRINT', VI: 'MÀN 17: BẢN THIẾT KẾ' },
  'PHASE_18': { EN: 'LEVEL 18: THE MARKET SHOCK', VI: 'MÀN 18: CÚ SỐC THỊ TRƯỜNG' },
  'PHASE_19': { EN: 'LEVEL 19: THE SUPPLY CHAIN CRISIS', VI: 'MÀN 19: KHỦNG HOẢNG CHUỖI CUNG ỨNG' },
  'PHASE_20': { EN: 'LEVEL 20: THE EFFICIENCY TRAP', VI: 'MÀN 20: CÁI BẪY HIỆU SUẤT' },
  'PHASE_21': { EN: 'LEVEL 21: THE OVERHEAD ILLUSION', VI: 'MÀN 21: ẢO ẢNH PHÍ CHUNG' },
  'PHASE_22': { EN: 'FINAL BOSS: THE OPERATING STATEMENT', VI: 'BOSS CUỐI: BÁO CÁO VẬN HÀNH' },
  'PHASE_23': { EN: 'THE MASTER CONTROLLER', VI: 'BẬC THẦY KIỂM SOÁT' },
  'PHASE_24': { EN: 'LEVEL 24: THE SECRET SAUCE', VI: 'MÀN 24: CÔNG THỨC BÍ MẬT' },
  'PHASE_25': { EN: 'LEVEL 25: THE BLAME GAME', VI: 'MÀN 25: ĐỔ LỖI CHO AI' },
  'PHASE_26': { EN: 'LEVEL 26: THE CELEBRITY DROP', VI: 'MÀN 26: CELEBRITY DROP' },
  'PHASE_27': { EN: 'LEVEL 27: THE FABRIC GAP', VI: 'MÀN 27: KHỦNG HOẢNG VẢI' },
  'PHASE_28': { EN: 'LEVEL 28: TO CRAFT OR TO BUY', VI: 'MÀN 28: TỰ LÀM HAY ĐI MUA' },
  'PHASE_29': { EN: 'LEVEL 29: THE KILL ORDER', VI: 'MÀN 29: LỆNH KHAI TỬ' },
  'PHASE_30': { EN: 'FINAL BOSS: THE GRAND STRATEGY', VI: 'BOSS CUỐI: ĐẠI CHIẾN LƯỢC' },
  'PHASE_31': { EN: 'LEVEL 31: THE INTERNAL MARKET', VI: 'MÀN 31: THỊ TRƯỜNG NỘI BỘ' },
  'PHASE_32': { EN: 'LEVEL 32: THE EFFICIENCY DUEL', VI: 'MÀN 32: CUỘC ĐẤU HIỆU SUẤT' },
  'PHASE_33': { EN: 'LEVEL 33: BEYOND THE NUMBERS', VI: 'MÀN 33: HƠN CẢ NHỮNG CON SỐ' },
  'PHASE_34': { EN: 'LEVEL 34: PROFIT CENTER PORTFOLIO', VI: 'MÀN 34: DANH MỤC TRUNG TÂM LỢI NHUẬN' },
  'PHASE_35': { EN: 'FINAL BOSS: THE GLOBAL CONGLOMERATE', VI: 'BOSS CUỐI: TẬP ĐOÀN TOÀN CẦU' },
  'PRACTICE': { EN: 'INFINITE GRIND LOOP', VI: 'VÒNG LẶP CÀY CUỐC' },
};

export const TUTORIALS = {
  PHASE_2: {
    title: "TUTORIAL: RED FLAG DETECTION",
    steps: [
      "Your Goal: Sort the mess. Separate ASSETS from EXPENSES.",
      "PRIME COST (Product): The 'Meat & Potatoes'. Material & Labor. This creates value.",
      "PERIOD COST (Expense): The 'Vibe Tax'. Rent & Marketing. This just keeps the lights on.",
      "Swipe LEFT for Prime, RIGHT for Period."
    ]
  },
  PHASE_3: {
    title: "TUTORIAL: ELEMENT ANATOMY",
    steps: [
      "Costs have 3 ingredients.",
      "MATERIAL: Physical stuff you can touch.",
      "LABOR: Human effort.",
      "EXPENSE: Costs that aren't material or labor (e.g. Royalties, Hire fees).",
      "Drag the item to the correct bucket."
    ]
  },
  PHASE_5: {
    title: "TUTORIAL: ALLOCATION vs APPORTIONMENT",
    steps: [
      "ALLOCATION: When a cost belongs 100% to a specific department. Assign it directly.",
      "APPORTIONMENT: When a cost is SHARED (e.g., Rent). Send it to the 'Shared' cloud.",
      "Look at the Invoice details to decide."
    ]
  },
  PHASE_12: {
    title: "TUTORIAL: BEHAVIOR SPLIT",
    steps: [
      "Your Goal: Separate Variable Costs from Fixed Costs.",
      "VARIABLE COST: Fluctuates with production (e.g., Fabric).",
      "FIXED COST: Remains constant regardless of production (e.g., Rent).",
      "Swipe LEFT for VARIABLE, RIGHT for FIXED."
    ]
  },
  PHASE_13: {
    title: "TUTORIAL: MARGINAL COSTING",
    steps: [
      "Your Goal: Find the true Contribution Margin.",
      "ABSORPTION COST includes Fixed Overheads.",
      "MARGINAL COST ignores Fixed Overheads to focus on Variable Costs.",
      "Peel away the Fixed Cost using the slider to reveal the Contribution."
    ]
  },
  PHASE_14: {
    title: "TUTORIAL: RECONCILIATION",
    steps: [
      "Your Goal: Explain the Profit Difference.",
      "Look at the Absorption Profit vs Marginal Profit.",
      "Find the Change in Inventory Units (Closing - Opening).",
      "Multiply that Change by the Fixed Overhead Absorption Rate (OAR) to balance the scale."
    ]
  },
  PHASE_15: {
    title: "TUTORIAL: CVP ANALYSIS",
    steps: [
      "Your Goal: Find the Break-Even Point (BEP).",
      "BEP is where Total Revenue equals Total Costs (Profit is exactly $0).",
      "Adjust the slider to simulate Sales Volume.",
      "Watch the 'Total Revenue' vs 'Total Cost' graph to find the intersection."
    ]
  },
  PHASE_16: {
    title: "TUTORIAL: MARGIN OF SAFETY (BOSS FIGHT)",
    steps: [
      "Your Goal: Pitch a Sales Target to the Board.",
      "The Board requires a precise 25% Margin of Safety.",
      "MoS % = (Target Sales - Break-Even Sales) / Target Sales.",
      "TIME IS LIMITED. Calculate fast and lock in the volume."
    ]
  },
  PHASE_17: {
    title: "TUTORIAL: STANDARD COSTING",
    steps: [
      "Your Goal: Build the 'Truth'.",
      "Input the Standard Quantity and Standard Price for each element.",
      "Refer to Rob's specs (Fabric: 1.5m @ $40, Labor: 2h @ $30).",
      "This card will be the baseline for all future Variances."
    ]
  },
  PHASE_18: {
    title: "TUTORIAL: SALES VARIANCES",
    steps: [
      "Your Goal: Audit the Marketing performance.",
      "Sales Price Variance: (Actual Price - Std. Price) * Actual Quantity.",
      "Sales Volume Profit Variance: (Actual Qty - Budget Qty) * Std. Profit per unit.",
      "A higher price than standard is Favorable (F).",
      "Higher sales volume than budget is Favorable (F)."
    ]
  },
  PHASE_19: {
    title: "TUTORIAL: MATERIAL VARIANCES",
    steps: [
      "Your Goal: Expose the true cost of cheap original materials.",
      "Material Price Variance: (Actual Price - Std. Price) * Actual Quantity.",
      "Material Usage Variance: (Actual Qty - Std. Qty for actual output) * Std. Price.",
      "Costing less than standard is Favorable (F).",
      "Using more quantity than standard is Adverse (A)."
    ]
  },
  PHASE_20: {
    title: "TUTORIAL: LABOR & VOH VARIANCES",
    steps: [
      "Your Goal: Sync Labor and Variable Overhead performance.",
      "Labor Rate Variance: (Actual Rate - Std. Rate) * Actual Hours.",
      "Labor Efficiency Variance: (Actual Hours - Std. Hours for actual output) * Std. Rate.",
      "VOH Expenditure Variance: Actual VOH - (Actual Hours * Std. VOH Rate).",
      "VOH Efficiency Variance: (Actual Hours - Std. Hours for actual output) * Std. VOH Rate."
    ]
  },
  PHASE_21: {
    title: "TUTORIAL: FIXED OVERHEAD VARIANCES",
    steps: [
      "Your Goal: Analyze factory-level costs and absorption.",
      "FO Expenditure Variance: Actual Fixed OH - Budgeted Fixed OH.",
      "FO Volume Variance: (Actual Qty - Budgeted Qty) * Std. Fixed OH Rate per unit.",
      "Spending more than budget is Adverse (A).",
      "Sản xuất nhiều hơn dự toán là Favorable (F) trong kế toán chi phí hấp thụ."
    ]
  },
  PHASE_22: {
    title: "BOSS FIGHT: THE OPERATING STATEMENT",
    steps: [
      "Your Goal: Reconcile Budgeted Profit to Actual Profit.",
      "Assign each variance as Favorable (+) or Adverse (-).",
      "Favorable (F) variances are ADDED to the profit path.",
      "Adverse (A) variances are SUBTRACTED from the profit path.",
      "Match the final 'Current Balance' to the Target Actual Profit."
    ]
  },
  PHASE_24: {
    title: "TUTORIAL: MIX & YIELD VARIANCES",
    steps: [
      "Your Goal: Split Total Material Usage Variance.",
      "MIX variance: Did we use the wrong ratio of materials?",
      "YIELD variance: Did we get less output than expected from our input?",
      "Mix formula: (Actual Mix - Std Mix) * Std Price.",
      "Sum of Mix + Yield = Total Usage Variance."
    ]
  },
  PHASE_25: {
    title: "TUTORIAL: PLANNING & OPERATIONAL",
    steps: [
      "Your Goal: Isolate controllable errors.",
      "PLANNING: Errors in setting the standard (e.g. market shift).",
      "OPERATIONAL: Performance errors (e.g. bad negotiating).",
      "Planning = (Revised Std - Original Std) * Actual Qty.",
      "Operational = (Actual Price - Revised Std) * Actual Qty."
    ]
  },
  PHASE_26: {
    title: "TUTORIAL: RELEVANT COSTING",
    steps: [
      "Your Goal: Evaluate a Special Order.",
      "IGNORE: Sunk Costs (money already spent), Allocated Overheads (fixed costs that stay the same), and Depreciation.",
      "INCLUDE: Variable Costs, Opportunity Costs, and Incremental Fixed Costs.",
      "If (Relevant Revenue > Relevant Cost), the deal is BASED."
    ]
  },
  PHASE_27: {
    title: "TUTORIAL: LIMITING FACTORS",
    steps: [
      "Your Goal: Maximize profit with scarce resources.",
      "Find 'Contribution per unit' first.",
      "Divide by 'Fabric per unit' to find 'Contribution per Meter'.",
      "Rank products: Highest contribution per limiting factor goes FIRST."
    ]
  },
  PHASE_28: {
    title: "TUTORIAL: MAKE OR BUY",
    steps: [
      "Your Goal: Decide whether to build internally or outsource.",
      "Relevant Cost to MAKE = Variable Cost + Avoidable Fixed Costs.",
      "Relevant Cost to BUY = Purchase Price.",
      "Compare the two. Don't forget qualitative factors (quality, reliability)!"
    ]
  },
  PHASE_29: {
    title: "TUTORIAL: SHUTDOWN DECISIONS",
    steps: [
      "Your Goal: Decide if a product line should be terminated.",
      "A product is worth keeping IF it has a POSITIVE CONTRIBUTION.",
      "Only SHUT DOWN if Avoidable Fixed Costs > Contribution.",
      "Unavoidable costs will stay even if the product is gone."
    ]
  },
  PHASE_30: {
    title: "BOSS FIGHT: THE GRAND STRATEGY",
    steps: [
      "Your Goal: Global Portfolio Optimization.",
      "Manage multiple limiting factors (Labor & Material) simultaneously.",
      "Allocate resources across 3 products based on priority rankings.",
      "Target Profit must be met or Neon Drop goes dark."
    ]
  },
  PHASE_31: {
    title: "TUTORIAL: TRANSFER PRICING",
    steps: [
      "Your Goal: Set an internal price for goods traded between divisions.",
      "Minimum Price (Seller): Marginal Cost + Opportunity Cost of internal sale.",
      "Maximum Price (Buyer): External Market Price.",
      "Goal Congruence: If a price exists between Min and Max, the group profits from the trade."
    ]
  },
  PHASE_32: {
    title: "TUTORIAL: ROI VS RI",
    steps: [
      "Your Goal: Evaluate division performance.",
      "ROI = (Profit / Investment) * 100%. Managers love this but it can cause dysfunction.",
      "RI = Profit - (Investment * Cost of Capital). Best for group alignment.",
      "RI encourages accepting all projects that earn more than the cost of capital."
    ]
  },
  PHASE_33: {
    title: "TUTORIAL: BALANCED SCORECARD",
    steps: [
      "Your Goal: Align strategy with multiple perspectives.",
      "1. Financial: How do we look to shareholders?",
      "2. Customer: How do customers see us?",
      "3. Internal Process: What must we excel at?",
      "4. Learning & Growth: Can we continue to improve/create value?"
    ]
  },
  PHASE_34: {
    title: "TUTORIAL: DIVISIONAL PERFORMANCE",
    steps: [
      "Your Goal: Judge a manager's performance fairly.",
      "Only include Controllable Costs in the manager's report.",
      "Apportioned central overheads (like Group CEO salary) are UNCONTROLLABLE.",
      "Controllable Profit = Revenue - Variable Costs - Controllable Fixed Costs."
    ]
  },
  PHASE_35: {
    title: "BOSS FIGHT: THE GLOBAL CONGLOMERATE",
    steps: [
      "Your Goal: Global Group Optimization.",
      "Manage 3 autonomous divisions simultaneously.",
      "Balance ROI targets, Customer Satisfaction, and Staff Retention.",
      "Allocate Group Capital Budget to the divisions that maximize Total Value."
    ]
  }
};

export const UI_STRINGS = {
  EN: {
    START_SIM: "INITIATE SYSTEM",
    GENERATE_ASSETS: "GENERATE ASSETS (AI)",
    ASSETS_READY: "ASSETS READY",
    INIT_ART: "INITIALIZING ART ASSETS...",
    SANITY: "Sanity",
    CASH: "Credits",
    PHASE: "Phase",
    HANDBOOK_TITLE: "THE WIKI",
    CLOSE: "CLOSE",
    PAUSE: "SYSTEM PAUSED",
    RESUME: "RESUME",
    RESTART: "REBOOT LEVEL",
    LEVEL_SELECT: "LEVEL SELECT",
    PHASE_COMPLETE: "PHASE CLEARED",
    SCORE: "SCORE",
    EXCELLENT: ">> S-TIER PERFORMANCE",
    IMPROVE: ">> SKILL ISSUE DETECTED",
    PRO_TIP: "CHEAT CODE",
    RETRY: "RESPAWN",
    CONTINUE: "CONTINUE",
    PROCEED: "PROCEED ANYWAY",
    CORRECT: "BASED",
    ERROR: "CRINGE",
    CONFIRM: "CONFIRM",
    NEXT: "NEXT",
    SUBMIT: "SEND IT",
    PRIME_COST: "PRIME COST",
    PERIOD_COST: "PERIOD COST",
    DIRECT: "DIRECT",
    INDIRECT: "INDIRECT",
    ALLOCATE: "ALLOCATE",
    APPORTION: "APPORTION",
    LAUNCH: "LAUNCH DROP",
    WAIT: "LOADING...",
    PRACTICE_MODE: "INFINITE GRIND",
    PRACTICE_DESC: "Endless Drills. No Story. Just XP.",
    EXIT_PRACTICE: "LOGOUT",
    ACCESS_GRANTED: "ACCESS GRANTED",
    ACCESS_DENIED: "ACCESS DENIED",
    FEEDBACK: "REPORT BUG",
    SEND_FEEDBACK: "TRANSMIT DATA",
    FEEDBACK_PLACEHOLDER: "Spill the tea...",
    FEEDBACK_SENT: "PACKET RECEIVED",
    REQUIRED_FIELD: "INPUT REQUIRED",
    INVALID_NUMBER: "INVALID INPUT",
    SHARE_SUCCESS: "RECEIPT GENERATED",

    // Mission Briefing
    BRIEFING: {
      TITLE: "MISSION BRIEFING",
      WELCOME: "Welcome to Neon Drop Studios. High-tech fashion. Low-key stress.",
      GOAL: "Your Mission: Survive the internship. Master 'Absorption Costing'. Don't get cancelled.",
      MECHANICS: [
        { icon: "🧠", title: "SANITY", desc: "Your HP. Wrong answers hurt. 0 HP = Fired." },
        { icon: "💰", title: "CREDITS", desc: "Get paid. Buy Boba to heal HP." },
        { icon: "📘", title: "THE WIKI", desc: "Use the '?' button. It's basically Chegg." }
      ],
      READY: "ARE YOU READY?"
    },

    // Phase 3
    ELEMENTS_TITLE: "DECONSTRUCTION",
    MATERIAL: "Material",
    LABOR: "Labor",
    EXPENSE: "Expense",
    PHYSICAL_INPUT: "Physical Inputs",
    HUMAN_EFFORT: "Human Effort",
    DIRECT_CHARGES: "Direct Charges",
    HINT: "Hint",
    INITIATE_FUSION: "INITIATE FUSION",
    SYNTHESIZING: "SYNTHESIZING...",

    // Phase 4
    TRACE_TITLE: "TRACEABILITY PROTOCOL",
    TRACE_Q: "Can we trace this cost to the unit?",
    TRACE_DIRECT_DESC: "Traceable to Unit",
    TRACE_INDIRECT_DESC: "Shared / Overhead",

    // Phase 5
    INCOMING_BILL: "INVOICE DETECTED",
    SELECT_DEST: "Select Destination",
    SHARED_COST: "Shared Cost",

    // Phase 6
    CALCULATE_APPORTIONMENT: "CALCULATE SHARE",
    TOTAL_COST: "Total Cost",
    BASIS_TOTAL: "Total Basis",
    DEPT_BASIS: "Dept Basis",

    // Phase 8
    TANK: "Tank",
    OPEN_VALVES: "OPEN VALVES",
    SELECT_BASIS: "Select Basis",
    DRAINING: "DRAINING...",
    TRANSFER_COMPLETE: "TRANSFER COMPLETE",

    // Phase 9
    VALUATION: "VALUATION STATION",
    BUDGET_OH: "Budgeted Overhead",
    BUDGET_ACT: "Budgeted Activity",
    FORMULA_HINT: "Cost / Activity = Rate",
    CALC_SUCCESS: "OAR CALCULATED",
    CALC_FAIL: "CALC ERROR. RETRY.",
    VAL_COMPLETE: "VALUATION LOCKED.",
    VAL_FAIL: "MATH ERROR.",

    // Phase 11
    JOB_SHEET: "JOB COST SHEET",
    STATUS: "Status",
    DATA_FRAGMENTS: "DATA FRAGMENTS",
    COST_STATEMENT: "COST STATEMENT",
    ADD_PRIME: "Add Prime Items",
    ADD_OH: "Add Overheads",
    NON_PROD: "Non-Prod Overheads",
    TOTAL_UNIT_COST: "Total Unit Cost",
    SELLING_PRICE: "Selling Price",
    PRIME_SUBTOTAL: "PRIME SUBTOTAL",
    FACTORY_SUBTOTAL: "FACTORY SUBTOTAL",
    ERR_TRAP: "ERROR: TRAP CARD ACTIVATED",
    ERR_CATEGORY: "WRONG CATEGORY",
    ERR_NON_PROD: "Error: Calc 20% of Factory Cost.",
    ERR_TOTAL: "Error: Sum Factory Cost + Non-Prod OH.",
    ERR_MARGIN: "Error: Target 25% Margin.",
    MSG_CORRECT_LOAD: "CORRECT: Admin Load Added.",
    MSG_TOTAL_VERIFIED: "UNIT COST VERIFIED.",
    MSG_PRICE_SET: "PRICE SET. READY TO DROP."
  },
  VI: {
    START_SIM: "KÍCH HOẠT",
    GENERATE_ASSETS: "TẠO TÀI NGUYÊN (AI)",
    ASSETS_READY: "DỮ LIỆU SẴN SÀNG",
    INIT_ART: "ĐANG TẢI DỮ LIỆU ẢNH...",
    SANITY: "Tinh thần",
    CASH: "Ngân lượng",
    PHASE: "Màn",
    HANDBOOK_TITLE: "TỪ ĐIỂN WIKI",
    CLOSE: "ĐÓNG",
    PAUSE: "TẠM DỪNG",
    RESUME: "TIẾP TỤC",
    RESTART: "CHƠI LẠI",
    LEVEL_SELECT: "CHỌN MÀN",
    PHASE_COMPLETE: "HOÀN THÀNH",
    SCORE: "ĐIỂM",
    EXCELLENT: ">> QUÁ ĐỈNH",
    IMPROVE: ">> CẦN CỐ GẮNG",
    PRO_TIP: "MẸO NHỎ",
    RETRY: "HỒI SINH",
    CONTINUE: "TIẾP TỤC",
    PROCEED: "TIẾP TỤC",
    CORRECT: "CHUẨN CƠM MẸ NẤU",
    ERROR: "LỖI RỒI BẠN ÊI",
    CONFIRM: "CHỐT",
    NEXT: "TIẾP",
    SUBMIT: "GỬI",
    PRIME_COST: "CHI PHÍ CƠ BẢN",
    PERIOD_COST: "CHI PHÍ THỜI KỲ",
    DIRECT: "TRỰC TIẾP",
    INDIRECT: "GIÁN TIẾP",
    ALLOCATE: "TẬP HỢP",
    APPORTION: "PHÂN BỔ",
    LAUNCH: "PHÁT HÀNH",
    WAIT: "ĐANG XỬ LÝ...",
    PRACTICE_MODE: "CHẾ ĐỘ CÀY CUỐC",
    PRACTICE_DESC: "Bài tập vô hạn. Không cốt truyện.",
    EXIT_PRACTICE: "THOÁT",
    ACCESS_GRANTED: "TRUY CẬP THÀNH CÔNG",
    ACCESS_DENIED: "TRUY CẬP BỊ TỪ CHỐI",
    FEEDBACK: "GÓP Ý",
    SEND_FEEDBACK: "GỬI DỮ LIỆU",
    FEEDBACK_PLACEHOLDER: "Báo lỗi hoặc đề xuất tính năng...",
    FEEDBACK_SENT: "ĐÃ NHẬN DỮ LIỆU",
    REQUIRED_FIELD: "YÊU CẦU NHẬP",
    INVALID_NUMBER: "SỐ KHÔNG HỢP LỆ",
    SHARE_SUCCESS: "ĐÃ TẠO HÓA ĐƠN",

    // Mission Briefing
    BRIEFING: {
      TITLE: "NHIỆM VỤ",
      WELCOME: "Chào mừng đến Neon Drop Studios. Startup thời trang công nghệ.",
      GOAL: "Nhiệm vụ: Sống sót kỳ thực tập. Làm chủ 'Kế toán Chi phí'. Đừng để bị đuổi.",
      MECHANICS: [
        { icon: "🧠", title: "TINH THẦN", desc: "Máu (HP) của bạn. Sai là mất máu. Về 0 là Game Over." },
        { icon: "💰", title: "NGÂN LƯỢNG", desc: "Lương. Làm đúng thì có tiền. Mua Trà sữa để hồi máu." },
        { icon: "📘", title: "WIKI", desc: "Dùng nút '?' để tra cứu. Đừng đoán mò." }
      ],
      READY: "SẴN SÀNG CHƯA?"
    },

    // Phase 3
    ELEMENTS_TITLE: "PHÂN RÃ",
    MATERIAL: "Nguyên liệu",
    LABOR: "Nhân công",
    EXPENSE: "Chi phí khác",
    PHYSICAL_INPUT: "Vật chất",
    HUMAN_EFFORT: "Sức người",
    DIRECT_CHARGES: "Chi phí trực tiếp",
    HINT: "Gợi ý",
    INITIATE_FUSION: "HỢP NHẤT",
    SYNTHESIZING: "Đang tổng hợp...",

    // Phase 4
    TRACE_TITLE: "GIAO THỨC TRUY XUẤT",
    TRACE_Q: "Chi phí này có thể truy xuất trực tiếp không?",
    TRACE_DIRECT_DESC: "Gắn với từng sản phẩm",
    TRACE_INDIRECT_DESC: "Chi phí chung / Gián tiếp",

    // Phase 5
    INCOMING_BILL: "HÓA ĐƠN ĐẾN",
    SELECT_DEST: "Chọn điểm đến",
    SHARED_COST: "Chi phí chung",

    // Phase 6
    CALCULATE_APPORTIONMENT: "TÍNH TOÁN PHÂN BỔ",
    TOTAL_COST: "Tổng Chi phí",
    BASIS_TOTAL: "Tổng Tiêu thức",
    DEPT_BASIS: "Tiêu thức Bộ phận",

    // Phase 8
    TANK: "Bể chứa",
    OPEN_VALVES: "Mở Van",
    SELECT_BASIS: "Chọn Tiêu thức",
    DRAINING: "Đang xả...",
    TRANSFER_COMPLETE: "Chuyển hoàn tất",

    // Phase 9
    VALUATION: "Trạm Định Giá",
    BUDGET_OH: "Chi phí SXC Ước tính",
    BUDGET_ACT: "Mức Hoạt động Ước tính",
    FORMULA_HINT: "Chi phí / Mức độ = Hệ số",
    CALC_SUCCESS: "TÍNH OAR THÀNH CÔNG",
    CALC_FAIL: "TÍNH SAI RỒI. THỬ LẠI ĐI.",
    VAL_COMPLETE: "ĐỊNH GIÁ HOÀN TẤT. DỮ LIỆU ĐÃ KHÓA.",
    VAL_FAIL: "TỔNG SAI. KIỂM TRA LẠI TOÁN.",

    // Phase 11
    JOB_SHEET: "Phiếu Tính Giá Thành",
    STATUS: "Trạng thái",
    DATA_FRAGMENTS: "Mảnh Dữ liệu",
    COST_STATEMENT: "Báo cáo Chi phí",
    ADD_PRIME: "Thêm CP Cơ bản",
    ADD_OH: "Thêm CP Sản xuất chung",
    NON_PROD: "CP Ngoài Sản xuất",
    TOTAL_UNIT_COST: "Tổng Giá thành Đơn vị",
    SELLING_PRICE: "Giá Bán",
    PRIME_SUBTOTAL: "TỔNG CP CƠ BẢN",
    FACTORY_SUBTOTAL: "TỔNG GIÁ THÀNH SX",
    ERR_TRAP: "LỖI: KÍCH HOẠT BẪY",
    ERR_CATEGORY: "Sai danh mục",
    ERR_NON_PROD: "Lỗi: Tính 20% của Giá thành SX.",
    ERR_TOTAL: "Lỗi: Cộng Giá thành SX + CP Ngoài SX.",
    ERR_MARGIN: "Lỗi: Mục tiêu biên lợi nhuận 25%.",
    MSG_CORRECT_LOAD: "ĐÚNG: Đã cộng 20% Phí Quản lý.",
    MSG_TOTAL_VERIFIED: "ĐÃ XÁC NHẬN TỔNG GIÁ THÀNH.",
    MSG_PRICE_SET: "ĐÃ CHỐT GIÁ. SẴN SÀNG PHÁT HÀNH."
  }
};

export interface HandbookEntry {
  id: string;
  category: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';
  title: string;
  definition: string;
  example: string;
}

export const HANDBOOK_DATA: Record<Language, HandbookEntry[]> = {
  EN: [
    {
      id: 'prime_cost',
      category: 'BASIC',
      title: 'Prime Cost',
      definition: 'The sum of all direct costs: Direct Material + Direct Labor + Direct Expenses. These costs can be directly traced to the product.',
      example: 'Fabric for a hoodie ($20) + Wages of the tailor ($15) = $35 Prime Cost.'
    },
    {
      id: 'period_cost',
      category: 'BASIC',
      title: 'Period Cost',
      definition: 'Operating expenses that are not tied to production. They are expensed in the period they occur.',
      example: 'Office Rent, Marketing Budget, CFO Salary.'
    },
    {
      id: 'direct_cost',
      category: 'BASIC',
      title: 'Direct Costs',
      definition: 'Costs that can be specifically traced to a single unit of product.',
      example: '2 meters of Denim for 1 Hoodie.'
    },
    {
      id: 'indirect_cost',
      category: 'BASIC',
      title: 'Indirect Costs (Overheads)',
      definition: 'Costs that cannot be traced to a specific unit. They are shared across multiple units.',
      example: 'Factory Supervisor salary, Cleaning supplies.'
    },
    {
      id: 'fixed_cost',
      category: 'BASIC',
      title: 'Fixed Costs',
      definition: 'Costs that stay the same regardless of how many units are produced (within a relevant range).',
      example: 'Factory Rent is $20k whether we make 0 or 5000 units.'
    },
    {
      id: 'variable_cost',
      category: 'BASIC',
      title: 'Variable Costs',
      definition: 'Costs that increase directly as production increases.',
      example: 'More hoodies made = More zippers bought.'
    },
    {
      id: 'cost_object',
      category: 'INTERMEDIATE',
      title: 'Cost Object',
      definition: 'Anything for which a separate measurement of cost is desired.',
      example: 'A product (Hoodie), a service (Repair), or a department (Marketing).'
    },
    {
      id: 'cost_center',
      category: 'INTERMEDIATE',
      title: 'Cost Center',
      definition: 'A specific department or location where costs are collected before being shared.',
      example: 'The Cutting Room, The Canteen.'
    },
    {
      id: 'production_oh',
      category: 'INTERMEDIATE',
      title: 'Production Overhead',
      definition: 'All indirect material, labor, and expense incurred within the factory walls.',
      example: 'Factory Light & Heat, Depreciation of Machines.'
    },
    {
      id: 'non_production_oh',
      category: 'INTERMEDIATE',
      title: 'Non-Production Overhead',
      definition: 'Costs incurred outside the factory floor (Admin, Selling, Distribution). Added AFTER Factory Cost.',
      example: 'HQ Rent, TikTok Ads, Legal Fees.'
    },
    {
      id: 'allocation',
      category: 'INTERMEDIATE',
      title: 'Allocation',
      definition: 'Assigning a whole item of cost to a single cost center. No splitting required.',
      example: 'Salary of the Canteen Chef is allocated 100% to the Canteen Department.'
    },
    {
      id: 'apportionment',
      category: 'INTERMEDIATE',
      title: 'Apportionment',
      definition: 'Sharing a common cost amongst multiple cost centers based on a fair basis.',
      example: 'Splitting the Factory Rent ($20k) based on the floor area of each room.'
    },
    {
      id: 'absorption',
      category: 'ADVANCED',
      title: 'Absorption (OAR)',
      definition: 'The process of charging overheads to production units using a predetermined rate.',
      example: 'Charging $5 of electricity to every hoodie made based on machine hours.'
    },
    {
      id: 'oar',
      category: 'ADVANCED',
      title: 'O.A.R.',
      definition: 'Overhead Absorption Rate. Calculated as: Budgeted Overhead / Budgeted Activity.',
      example: '$100,000 Rent / 5,000 Labor Hours = $20 per Labor Hour.'
    },
    {
      id: 'basis_apportionment',
      category: 'ADVANCED',
      title: 'Basis of Apportionment',
      definition: 'The fairest metric used to share a common cost.',
      example: 'Sharing Electricity based on Kilowatt Hours (kW) or Machine Hours.'
    },
    {
      id: 'under_over',
      category: 'ADVANCED',
      title: 'Under/Over Absorption',
      definition: 'The difference between the overheads we "guessed" (Absorbed) and what we actually spent.',
      example: 'If Actual Rent > Budgeted Rent, we have Under-Absorbed (Lost money).'
    },
    {
      id: 'marginal_costing',
      category: 'ADVANCED',
      title: 'Marginal Costing',
      definition: 'A decision-making technique that only considers Variable (Marginal) costs. Fixed costs are treated as period costs.',
      example: 'Used for short-term decisions like "Should we accept this one-off TikTok order?"'
    },
    {
      id: 'contribution',
      category: 'ADVANCED',
      title: 'Contribution',
      definition: 'Sales Price minus Variable Cost. This is what "contributes" toward covering fixed costs and making profit.',
      example: 'Selling price $100 - Variable cost $60 = $40 Contribution.'
    },
    {
      id: 'break_even',
      category: 'ADVANCED',
      title: 'Break-Even Point',
      definition: 'The level of sales where Total Profit is Zero. Fixed Costs / Contribution per unit.',
      example: 'Fixed Costs $10,000 / $40 Contribution = 250 units to break even.'
    },
    {
      id: 'standard_cost',
      category: 'ADVANCED',
      title: 'Standard Costing',
      definition: 'A "Budgeted" cost for a single unit, used to measure performance through variance analysis.',
      example: 'Rob setting a standard of 2m fabric per hoodie.'
    },
    {
      id: 'variance',
      category: 'ADVANCED',
      title: 'Variance',
      definition: 'The difference between the Actual cost and the Standard (Budgeted) cost.',
      example: 'Actual $50 - Standard $45 = $5 Adverse Variance (Overspent).'
    }
  ],
  VI: [
    {
      id: 'prime_cost',
      category: 'BASIC',
      title: 'Chi phí Cơ bản (Prime Cost)',
      definition: 'Tổng của tất cả chi phí trực tiếp: Nguyên liệu TT + Nhân công TT + Chi phí TT khác.',
      example: 'Vải may áo ($20) + Lương thợ may ($15) = $35 Chi phí Cơ bản.'
    },
    {
      id: 'period_cost',
      category: 'BASIC',
      title: 'Chi phí Thời kỳ (Period Cost)',
      definition: 'Chi phí hoạt động không gắn liền với việc sản xuất. Được tính vào chi phí trong kỳ phát sinh.',
      example: 'Thuê văn phòng, Ngân sách Marketing, Lương Giám đốc.'
    },
    {
      id: 'direct_cost',
      category: 'BASIC',
      title: 'Chi phí Trực tiếp',
      definition: 'Chi phí có thể xác định cụ thể cho từng đơn vị sản phẩm.',
      example: '2 mét vải Denim cho 1 cái áo.'
    },
    {
      id: 'indirect_cost',
      category: 'BASIC',
      title: 'Chi phí Gián tiếp (SXC)',
      definition: 'Chi phí không thể gắn cho một sản phẩm cụ thể. Dùng chung cho nhiều sản phẩm.',
      example: 'Lương quản đốc phân xưởng, vật tư lau dọn.'
    },
    {
      id: 'fixed_cost',
      category: 'BASIC',
      title: 'Chi phí Cố định',
      definition: 'Chi phí không thay đổi bất kể sản lượng sản xuất (trong phạm vi phù hợp).',
      example: 'Tiền thuê xưởng $20k dù làm 0 hay 5000 cái áo.'
    },
    {
      id: 'variable_cost',
      category: 'BASIC',
      title: 'Chi phí Biến đổi',
      definition: 'Chi phí tăng giảm tỷ lệ thuận theo sản lượng.',
      example: 'Bán 100k - Biến phí 60k = 40k Số dư đảm phí.'
    },
    {
      id: 'cost_object',
      category: 'INTERMEDIATE',
      title: 'Đối tượng tính giá (Cost Object)',
      definition: 'Bất cứ thứ gì mà chúng ta muốn đo lường chi phí riêng biệt.',
      example: 'Sản phẩm (Áo Hoodie), Dịch vụ (Sửa chữa), hoặc Phòng ban (Marketing).'
    },
    {
      id: 'cost_center',
      category: 'INTERMEDIATE',
      title: 'Trung tâm Chi phí',
      definition: 'Một bộ phận hoặc địa điểm cụ thể nơi chi phí được tập hợp trước khi phân bổ.',
      example: 'Phòng Cắt, Nhà ăn (Canteen).'
    },
    {
      id: 'production_oh',
      category: 'INTERMEDIATE',
      title: 'Chi phí SX Chung',
      definition: 'Tất cả nguyên liệu, nhân công, chi phí gián tiếp phát sinh trong phạm vi nhà xưởng.',
      example: 'Điện & Nhiệt nhà máy, Khấu hao máy móc.'
    },
    {
      id: 'non_production_oh',
      category: 'INTERMEDIATE',
      title: 'Chi phí Ngoài SX',
      definition: 'Chi phí phát sinh ngoài phân xưởng (Quản lý, Bán hàng). Được cộng SAU giá thành sản xuất.',
      example: 'Thuê văn phòng HQ, Quảng cáo TikTok, Phí pháp lý.'
    },
    {
      id: 'allocation',
      category: 'INTERMEDIATE',
      title: 'Tập hợp (Allocation)',
      definition: 'Gán toàn bộ một khoản chi phí cho một trung tâm chi phí cụ thể. Không cần chia nhỏ.',
      example: 'Lương Đầu bếp Canteen được tập hợp 100% vào Phòng Canteen.'
    },
    {
      id: 'apportionment',
      category: 'INTERMEDIATE',
      title: 'Phân bổ (Apportionment)',
      definition: 'Chia sẻ một chi phí chung cho nhiều trung tâm chi phí dựa trên một tiêu thức công bằng.',
      example: 'Chia tiền Thuê nhà máy ($20k) dựa trên diện tích sàn của từng phòng.'
    },
    {
      id: 'absorption',
      category: 'ADVANCED',
      title: 'Tính giá (Absorption)',
      definition: 'Quá trình tính chi phí sản xuất chung vào đơn vị sản phẩm sử dụng một hệ số định trước.',
      example: 'Tính $5 tiền điện vào mỗi cái áo dựa trên giờ máy chạy.'
    },
    {
      id: 'oar',
      category: 'ADVANCED',
      title: 'Hệ số Phân bổ (O.A.R.)',
      definition: 'Overhead Absorption Rate. Tính bằng: Chi phí SXC Ước tính / Mức độ Hoạt động Ước tính.',
      example: '$100,000 Tiền thuê / 5,000 Giờ công = $20 mỗi Giờ công.'
    },
    {
      id: 'basis_apportionment',
      category: 'ADVANCED',
      title: 'Tiêu thức Phân bổ',
      definition: 'Thước đo công bằng nhất dùng để chia chi phí chung.',
      example: 'Chia tiền Điện dựa trên Số ki-lô-oát giờ (kW) hoặc Giờ máy.'
    },
    {
      id: 'under_over',
      category: 'ADVANCED',
      title: 'Phân bổ Thừa/Thiếu',
      definition: 'Chênh lệch giữa chi phí đã tính (Ước tính) và chi phí thực tế bỏ ra.',
      example: 'Nếu Tiền thuê thực tế > Ngân sách, ta bị Phân bổ Thiếu (Lỗ thật).'
    }
  ]
};

export const DISCORD_LINK = "https://discord.gg/cfQAhSk8";
