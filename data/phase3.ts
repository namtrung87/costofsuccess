import { DialogueNode, Language } from '../types';

export type ElementCategory = 'MATERIAL' | 'LABOR' | 'EXPENSE';

export interface ElementItem {
  id: string;
  name: string;
  category: ElementCategory;
  feedback: string;
}

export interface LabChallenge {
  name: string;
  description: string;
  hint: string;
  requiredIngredients: string[];
}

export interface LabIngredient {
    id: string;
    label: string;
    icon: string;
    color: string;
}

export const LAB_INGREDIENTS: Record<Language, LabIngredient[]> = {
  EN: [
    { id: 'POLY', label: 'Polyester', icon: '🧵', color: 'cyan' },
    { id: 'DYE', label: 'Neon Dye', icon: '🎨', color: 'purple' },
    { id: 'COTTON', label: 'Cotton', icon: '☁️', color: 'gray' },
    { id: 'NANO', label: 'Nano-Coat', icon: '🛡️', color: 'orange' },
    { id: 'LED', label: 'LED Strip', icon: '💡', color: 'pink' }
  ],
  VI: [
    { id: 'POLY', label: 'Polyester', icon: '🧵', color: 'cyan' },
    { id: 'DYE', label: 'Thuốc Nhuộm', icon: '🎨', color: 'purple' },
    { id: 'COTTON', label: 'Cotton', icon: '☁️', color: 'gray' },
    { id: 'NANO', label: 'Phủ Nano', icon: '🛡️', color: 'orange' },
    { id: 'LED', label: 'Dải LED', icon: '💡', color: 'pink' }
  ]
};

export const PHASE3_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
  EN: {
    'start': {
        id: 'start',
        speaker: 'System',
        text: 'SECTOR 3: TECH-PACK ROOM. 11:30 AM.',
        backgroundImage: 'BG_TECH_ROOM',
        nextId: 'jules_intro'
    },
    'jules_intro': {
        id: 'jules_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Okay, Intern. You did good on the sorting. We know which costs belong to the product. But telling me 'This hoodie costs $40' isn't enough.",
        nextId: 'jules_analysis'
    },
    'jules_analysis': {
        id: 'jules_analysis',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "If I want to lower the cost, I need to know: Is the fabric too expensive? Are the tailors working too slow? Or are we paying too much for the patent rights?",
        nextId: 'kai_analogy'
    },
    'kai_analogy': {
        id: 'kai_analogy',
        speaker: 'Kai',
        speakerTitle: 'Head Designer',
        characterId: 'CHAR_KAI',
        text: "(Spins a hologram of the Cyber-Sneaker) Think of it like cooking. MATERIAL is the ingredients. LABOR is the Chef. EXPENSE is the oven rental or recipe fees.",
        nextId: 'jules_elements'
    },
    'jules_elements': {
        id: 'jules_elements',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Exactly. We call these the Three Elements of Cost. Your job is to take the pile of 'Product Costs' you saved and split them into these three buckets.",
        nextId: 'quiz_intro'
    },
    'quiz_intro': {
        id: 'quiz_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Quick test. To make our limited edition 'Glow-Hoodie', we pay a $2 royalty to the artist 'Graffiti-X' for every single hoodie we print. What element is that?",
        choices: [
        { 
            text: "Material. It's part of the design.", 
            nextId: 'quiz_wrong_material',
            action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: -5 })
        },
        { 
            text: "Labor. The artist worked on it.", 
            nextId: 'quiz_wrong_labor',
            action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: -5 })
        },
        { 
            text: "Direct Expense.", 
            nextId: 'quiz_correct',
            action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: 10 })
        }
        ]
    },
    'quiz_wrong_material': {
        id: 'quiz_wrong_material',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "No. You can't touch a royalty fee. It's not physical.",
        nextId: 'game_start'
    },
    'quiz_wrong_labor': {
        id: 'quiz_wrong_labor',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Tricky, but no. We aren't paying the artist an hourly wage to sew. We are paying for the right to use the art.",
        nextId: 'game_start'
    },
    'quiz_correct': {
        id: 'quiz_correct',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Bingo. It's a Direct Expense. It's a cost per unit, but it's neither material nor labor.",
        nextId: 'game_start'
    },
    'game_start': {
        id: 'game_start',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Here is the data for our upcoming 'Summer Cyber-Goth' collection. Drag the cost item to the correct Element.",
        choices: [
        { text: "Start Deconstruction", nextId: 'START_GAME' }
        ]
    },
    // --- Post Game ---
    'post_game': {
        id: 'post_game',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Okay, you've sorted the elements. Now look at the breakdown.",
        nextId: 'SHOW_COST_CARD'
    },
    'kai_interruption': {
        id: 'kai_interruption',
        speaker: 'Kai',
        speakerTitle: 'Head Designer',
        characterId: 'CHAR_KAI',
        text: "Jules! The factory lights? The security guard? The depreciation on my expensive design computers? We can't sell this shoe for $50. We’d be losing money!",
        nextId: 'jules_overhead_intro'
    },
    'jules_overhead_intro': {
        id: 'jules_overhead_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Exactly. We have identified the Direct elements. But now comes the hardest part: Factory Overheads. The ghosts of the factory.",
        nextId: 'player_question'
    },
    'player_question': {
        id: 'player_question',
        speaker: 'Player',
        text: "So... how do we charge the light bill to a single sneaker?",
        nextId: 'jules_outro'
    },
    'jules_outro': {
        id: 'jules_outro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "We divide and conquer. We allocate, apportion, and absorb. Get ready, Intern. Phase 4 is where the real math starts. Grab another Boba.",
        choices: [
        { text: "Redeem Reward & Continue", nextId: 'END_PHASE' }
        ]
    }
  },
  VI: {
    'start': {
        id: 'start',
        speaker: 'Hệ thống',
        text: 'KHU VỰC 3: PHÒNG KỸ THUẬT. 11:30 SÁNG.',
        backgroundImage: 'BG_TECH_ROOM',
        nextId: 'jules_intro'
    },
    'jules_intro': {
        id: 'jules_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Được rồi, thực tập sinh. Làm tốt phần phân loại đấy. Chúng ta đã biết chi phí nào thuộc về sản phẩm. Nhưng nói 'Cái áo này giá $40' là chưa đủ.",
        nextId: 'jules_analysis'
    },
    'jules_analysis': {
        id: 'jules_analysis',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Nếu chị muốn giảm chi phí, chị cần biết: Vải có đắt quá không? Thợ may làm chậm quá hả? Hay phí bản quyền quá cao?",
        nextId: 'kai_analogy'
    },
    'kai_analogy': {
        id: 'kai_analogy',
        speaker: 'Kai',
        speakerTitle: 'Trưởng Thiết kế',
        characterId: 'CHAR_KAI',
        text: "(Xoay hình chiếu đôi giày Cyber) Nghĩ giống như nấu ăn đi. NGUYÊN LIỆU là thực phẩm. NHÂN CÔNG là Đầu bếp. CHI PHÍ KHÁC là tiền thuê lò nướng hay công thức.",
        nextId: 'jules_elements'
    },
    'jules_elements': {
        id: 'jules_elements',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Chính xác. Chúng ta gọi đó là Ba Yếu Tố Chi Phí. Nhiệm vụ của cưng là lấy đống 'Chi phí Sản phẩm' lúc nãy và chia vào 3 giỏ này.",
        nextId: 'quiz_intro'
    },
    'quiz_intro': {
        id: 'quiz_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Test nhanh. Để làm cái 'Glow-Hoodie' bản giới hạn, mình trả $2 phí bản quyền cho nghệ sĩ 'Graffiti-X' trên mỗi cái áo in ra. Đó là yếu tố gì?",
        choices: [
        { 
            text: "Nguyên liệu. Nó là một phần của thiết kế.", 
            nextId: 'quiz_wrong_material',
            action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: -5 })
        },
        { 
            text: "Nhân công. Nghệ sĩ đã làm việc mà.", 
            nextId: 'quiz_wrong_labor',
            action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: -5 })
        },
        { 
            text: "Chi phí Trực tiếp Khác.", 
            nextId: 'quiz_correct',
            action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: 10 })
        }
        ]
    },
    'quiz_wrong_material': {
        id: 'quiz_wrong_material',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Không. Cưng không sờ được phí bản quyền. Nó không phải vật chất.",
        nextId: 'game_start'
    },
    'quiz_wrong_labor': {
        id: 'quiz_wrong_labor',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Dễ nhầm, nhưng không. Mình không trả lương theo giờ cho nghệ sĩ để may. Mình trả tiền để được quyền sử dụng tranh.",
        nextId: 'game_start'
    },
    'quiz_correct': {
        id: 'quiz_correct',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Bingo. Đó là Chi phí Trực tiếp Khác (Direct Expense). Tính trên từng đơn vị, nhưng không phải nguyên liệu hay nhân công.",
        nextId: 'game_start'
    },
    'game_start': {
        id: 'game_start',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Đây là dữ liệu cho bộ sưu tập 'Summer Cyber-Goth'. Kéo chi phí vào đúng Yếu tố.",
        choices: [
        { text: "Bắt đầu Phân rã", nextId: 'START_GAME' }
        ]
    },
    'post_game': {
        id: 'post_game',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Được rồi, đã phân loại xong. Giờ nhìn vào bảng phân tích.",
        nextId: 'SHOW_COST_CARD'
    },
    'kai_interruption': {
        id: 'kai_interruption',
        speaker: 'Kai',
        speakerTitle: 'Trưởng Thiết kế',
        characterId: 'CHAR_KAI',
        text: "Jules! Còn tiền điện nhà máy? Bảo vệ? Khấu hao máy tính thiết kế đắt tiền của tôi? Bán giày $50 thì lỗ chổng vó!",
        nextId: 'jules_overhead_intro'
    },
    'jules_overhead_intro': {
        id: 'jules_overhead_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Chuẩn. Chúng ta đã xác định được các yếu tố Trực tiếp. Nhưng giờ mới là phần khó nhất: Chi phí Sản xuất Chung (Overheads). Những bóng ma của nhà máy.",
        nextId: 'player_question'
    },
    'player_question': {
        id: 'player_question',
        speaker: 'Người chơi',
        text: "Vậy... làm sao tính tiền điện vào từng chiếc giày?",
        nextId: 'jules_outro'
    },
    'jules_outro': {
        id: 'jules_outro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Chia để trị. Tập hợp, Phân bổ, và Tính vào giá thành. Chuẩn bị đi thực tập sinh. Màn 4 mới là lúc tính toán thật sự bắt đầu. Uống miếng trà sữa đi.",
        choices: [
        { text: "Nhận thưởng & Tiếp tục", nextId: 'END_PHASE' }
        ]
    }
  }
};

export const ELEMENT_ITEMS: Record<Language, ElementItem[]> = {
  EN: [
    {
        id: '1',
        name: 'Recycled Polyester Fabric Rolls',
        category: 'MATERIAL',
        feedback: "Solid. That’s the base ingredient."
    },
    {
        id: '2',
        name: 'Wages of Sewing Machine Operators',
        category: 'LABOR',
        feedback: "Correct. Human effort converting fabric to clothes."
    },
    {
        id: '3',
        name: 'Patent Fee paid for Nano-Coating',
        category: 'EXPENSE',
        feedback: "Yes. We pay this fee based on usage. It's a Direct Expense."
    },
    {
        id: '4',
        name: 'YKK Metal Zippers (Custom Neon)',
        category: 'MATERIAL',
        feedback: "Component part. Material."
    },
    {
        id: '5',
        name: 'Assembly Line Supervisor\'s Wages',
        category: 'LABOR',
        feedback: "It's Labor. (Undeniably human effort)."
    },
    {
        id: '6',
        name: 'Hire of Special 3D Knitting Machine',
        category: 'EXPENSE',
        feedback: "Correct. We hired this specific tool just for this job."
    },
    {
        id: '7',
        name: 'Thread and Glue',
        category: 'MATERIAL',
        feedback: "Yes, it's physical stuff. Indirect material is still material in nature."
    },
    {
        id: '8',
        name: 'Quality Control Inspector\'s Wages',
        category: 'LABOR',
        feedback: "Human effort. Labor."
    }
  ],
  VI: [
    {
        id: '1',
        name: 'Cuộn vải Polyester Tái chế',
        category: 'MATERIAL',
        feedback: "Tốt. Đó là nguyên liệu chính."
    },
    {
        id: '2',
        name: 'Lương Công nhân May',
        category: 'LABOR',
        feedback: "Đúng. Sức người biến vải thành quần áo."
    },
    {
        id: '3',
        name: 'Phí bằng sáng chế Nano-Coating',
        category: 'EXPENSE',
        feedback: "Chuẩn. Trả phí dựa trên mức sử dụng. CP Trực tiếp Khác."
    },
    {
        id: '4',
        name: 'Khóa kéo YKK (Neon)',
        category: 'MATERIAL',
        feedback: "Linh kiện. Nguyên liệu."
    },
    {
        id: '5',
        name: 'Lương Giám sát Dây chuyền',
        category: 'LABOR',
        feedback: "Là Nhân công (Sức người)."
    },
    {
        id: '6',
        name: 'Thuê máy dệt 3D đặc biệt',
        category: 'EXPENSE',
        feedback: "Đúng. Thuê máy riêng cho lô hàng này."
    },
    {
        id: '7',
        name: 'Chỉ và Keo',
        category: 'MATERIAL',
        feedback: "Đúng, là vật chất. Nguyên liệu gián tiếp vẫn là nguyên liệu."
    },
    {
        id: '8',
        name: 'Lương nhân viên KCS',
        category: 'LABOR',
        feedback: "Sức người. Nhân công."
    }
  ]
};