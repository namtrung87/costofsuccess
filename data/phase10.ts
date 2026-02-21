
import { DialogueNode, Language } from '../types';

export interface RealityChallenge {
    id: string;
    departmentName: string;
    oar: number;
    actualHours: number;
    actualOverhead: number;
    correctAbsorbed: number;
    varianceAmount: number;
    varianceType: 'UNDER' | 'OVER';
    context: string;
    promptStep1: string;
    promptStep2: string;
    explanation: string;
}

export const PHASE10_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
  EN: {
    'start': {
        id: 'start',
        speaker: 'System',
        text: 'CFO OFFICE. NIGHT TIME. RAIN.',
        backgroundImage: 'BG_COMMAND_CENTER',
        nextId: 'jules_dilemma'
    },
    'jules_dilemma': {
        id: 'jules_dilemma',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "The month is over. The 'Cyber-Punk Hoodies' are sold. But we have a problem. We costed them using our Budgeted OAR (the $35 and $32.50 rates).",
        nextId: 'rob_entry'
    },
    'rob_entry': {
        id: 'rob_entry',
        speaker: 'Rob',
        speakerTitle: 'Production',
        characterId: 'CHAR_ROB',
        text: "Yeah. The electric company doesn't care about your 'Budget'. They sent us the real invoice.",
        nextId: 'jules_debate'
    },
    'jules_debate': {
        id: 'jules_debate',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "This is the eternal debate in Cost Accounting.",
        nextId: 'training_module'
    },
    'training_module': {
        id: 'training_module',
        speaker: 'System',
        text: "[TRAINING MODULE: PROS & CONS]",
        nextId: 'jules_pros_cons_1'
    },
    'jules_pros_cons_1': {
        id: 'jules_pros_cons_1',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "1. ACTUAL OAR (Wait and See): 100% Accurate but Too Slow. We can't price a hoodie on June 1st if we don't know the cost until June 30th. Verdict: Trash.",
        nextId: 'jules_pros_cons_2'
    },
    'jules_pros_cons_2': {
        id: 'jules_pros_cons_2',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "2. PREDETERMINED OAR (Guess and Go): Timely but Inaccurate. We prefer this. We choose speed over perfect accuracy.",
        nextId: 'jules_consequence'
    },
    'jules_consequence': {
        id: 'jules_consequence',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Because we chose Speed, we now have a mess to clean up. We have Under or Over Absorption.",
        nextId: 'mechanism_intro'
    },
    'mechanism_intro': {
        id: 'mechanism_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Think of it like this: ABSORBED OVERHEAD is the 'Token' value we put into the product. Formula: Actual Hours x Predetermined OAR.",
        nextId: 'mechanism_intro_2'
    },
    'mechanism_intro_2': {
        id: 'mechanism_intro_2',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "ACTUAL OVERHEAD is the amount of money we paid out of the bank account.",
        nextId: 'mechanism_rules'
    },
    'mechanism_rules': {
        id: 'mechanism_rules',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "UNDER-ABSORBED: We put less in than we paid out. Result: Loss (Expense). OVER-ABSORBED: We put more in than we paid out. Result: Gain (Profit).",
        nextId: 'game_start'
    },
    'game_start': {
        id: 'game_start',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Let's reconcile. Start with the Cutting Department.",
        choices: [
            { text: "Start Reconciliation", nextId: 'START_GAME' }
        ]
    },
    'post_game': {
        id: 'post_game',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "So, here is the final score: Cutting Dept: ($1,500) Loss. Sewing Dept: +$3,500 Gain. Net Adjustment: +$2,000 Profit.",
        nextId: 'player_reaction'
    },
    'player_reaction': {
        id: 'player_reaction',
        speaker: 'Player',
        text: "So... being wrong about the budget actually made us money this time?",
        nextId: 'jules_final'
    },
    'jules_final': {
        id: 'jules_final',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Only because Rob kept his costs down. If we were Under-Absorbed everywhere, the CEO would be screaming at us right now.",
        nextId: 'mission_complete'
    },
    'mission_complete': {
        id: 'mission_complete',
        speaker: 'System',
        text: "[MISSION COMPLETE] Status: Controller. Skill Mastered: Variance Analysis. Reward: The Golden Ledger.",
        nextId: 'jules_finale_intro'
    },
    'jules_finale_intro': {
        id: 'jules_finale_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "You've done it, Controller. There is one thing left. The CEO wants the Final Cost Sheet for the Hoodie to decide the global selling price.",
        choices: [
            { text: "Put it all together (Phase 11)", nextId: 'END_PHASE' }
        ]
    }
  },
  VI: {
    'start': {
        id: 'start',
        speaker: 'Hệ thống',
        text: 'VĂN PHÒNG CFO. ĐÊM. MƯA RƠI.',
        backgroundImage: 'BG_COMMAND_CENTER',
        nextId: 'jules_dilemma'
    },
    'jules_dilemma': {
        id: 'jules_dilemma',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Hết tháng rồi. Áo Hoodie đã bán xong. Nhưng có vấn đề. Mình tính giá vốn dựa trên OAR Ước tính (mức $35 và $32.50).",
        nextId: 'rob_entry'
    },
    'rob_entry': {
        id: 'rob_entry',
        speaker: 'Rob',
        speakerTitle: 'Sản xuất',
        characterId: 'CHAR_ROB',
        text: "Phải. Công ty điện lực không quan tâm 'Ngân sách' của cô đâu. Họ gửi hóa đơn thật rồi đây.",
        nextId: 'jules_debate'
    },
    'jules_debate': {
        id: 'jules_debate',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Đây là tranh cãi muôn thuở của Kế toán Chi phí.",
        nextId: 'training_module'
    },
    'training_module': {
        id: 'training_module',
        speaker: 'Hệ thống',
        text: "[MODULE ĐÀO TẠO: ƯU & NHƯỢC ĐIỂM]",
        nextId: 'jules_pros_cons_1'
    },
    'jules_pros_cons_1': {
        id: 'jules_pros_cons_1',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "1. OAR THỰC TẾ: Đúng 100% nhưng Quá Chậm. Không thể báo giá tháng 6 nếu đợi hóa đơn cuối tháng. Phế.",
        nextId: 'jules_pros_cons_2'
    },
    'jules_pros_cons_2': {
        id: 'jules_pros_cons_2',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "2. OAR ƯỚC TÍNH (Đoán và Làm): Kịp thời nhưng Không chính xác. Ta chọn cách này vì tốc độ.",
        nextId: 'jules_consequence'
    },
    'jules_consequence': {
        id: 'jules_consequence',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Vì chọn Tốc độ, giờ ta phải dọn hậu quả. Ta bị Phân bổ Thừa hoặc Thiếu.",
        nextId: 'mechanism_intro'
    },
    'mechanism_intro': {
        id: 'mechanism_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Nghĩ đơn giản thôi: ĐÃ PHÂN BỔ là tiền 'ảo' (Token) ta tính vào sản phẩm. Công thức: Giờ Thực x OAR.",
        nextId: 'mechanism_intro_2'
    },
    'mechanism_intro_2': {
        id: 'mechanism_intro_2',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "THỰC TẾ là số tiền thật ta trả ra khỏi ngân hàng.",
        nextId: 'mechanism_rules'
    },
    'mechanism_rules': {
        id: 'mechanism_rules',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "THIẾU (UNDER): Ta tính ít hơn thực tế chi. Kết quả: Lỗ (Chi phí). THỪA (OVER): Ta tính nhiều hơn thực tế chi. Kết quả: Lời (Lợi nhuận).",
        nextId: 'game_start'
    },
    'game_start': {
        id: 'game_start',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Đối chiếu thôi. Bắt đầu với Phòng Cắt.",
        choices: [
            { text: "Bắt đầu Đối chiếu", nextId: 'START_GAME' }
        ]
    },
    'post_game': {
        id: 'post_game',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Tỉ số cuối cùng: Cắt lỗ $1,500. May lời $3,500. Điều chỉnh ròng: Lời $2,000.",
        nextId: 'player_reaction'
    },
    'player_reaction': {
        id: 'player_reaction',
        speaker: 'Người chơi',
        text: "Vậy... dự đoán sai ngân sách lại giúp mình có tiền sao?",
        nextId: 'jules_final'
    },
    'jules_final': {
        id: 'jules_final',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Chỉ vì Rob đã tiết kiệm chi phí thôi. Nếu chỗ nào cũng Thiếu, CEO sẽ hét vào mặt chúng ta ngay.",
        nextId: 'mission_complete'
    },
    'mission_complete': {
        id: 'mission_complete',
        speaker: 'Hệ thống',
        text: "[NHIỆM VỤ HOÀN THÀNH] Trạng thái: Controller. Kỹ năng: Phân tích Biến động. Phần thưởng: Sổ Cái Vàng.",
        nextId: 'jules_finale_intro'
    },
    'jules_finale_intro': {
        id: 'jules_finale_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Cưng làm được rồi. Còn một việc cuối. CEO cần Bảng Giá Thành Cuối Cùng cho áo Hoodie.",
        choices: [
            { text: "Tổng hợp tất cả trong Màn Cuối", nextId: 'END_PHASE' }
        ]
    }
  }
};

export const REALITY_CHALLENGES: Record<Language, RealityChallenge[]> = {
  EN: [
    {
        id: 'cutting',
        departmentName: 'CUTTING DEPT',
        oar: 35.00,
        actualHours: 2100,
        actualOverhead: 75000,
        correctAbsorbed: 73500,
        varianceAmount: 1500,
        varianceType: 'UNDER',
        context: "We worked harder than planned (2,100 Hours).",
        promptStep1: "How much cost did we 'apply' to the products?",
        promptStep2: "Compare it. Did we absorb enough?",
        explanation: "Correct. We are short. The bill is $75k, but we only accounted for $73.5k in our product costs. Treatment: This $1,500 is an Expense. We 'Take the L'."
    },
    {
        id: 'sewing',
        departmentName: 'SEWING DEPT',
        oar: 32.50,
        actualHours: 3800,
        actualOverhead: 120000,
        correctAbsorbed: 123500,
        varianceAmount: 3500,
        varianceType: 'OVER',
        context: "We worked less (3,800 Hours). Rob saved on electricity (Bill: $120k).",
        promptStep1: "Calculate the amount charged to products.",
        promptStep2: "Compare it. Did we charge too much or too little?",
        explanation: "Exactly. We charged the products $123,500, but only spent $120,000. That means we made extra money! Treatment: This $3,500 is a Gain. It increases our profit."
    }
  ],
  VI: [
    {
        id: 'cutting',
        departmentName: 'PHÒNG CẮT',
        oar: 35.00,
        actualHours: 2100,
        actualOverhead: 75000,
        correctAbsorbed: 73500,
        varianceAmount: 1500,
        varianceType: 'UNDER',
        context: "Làm việc nhiều hơn dự kiến (2,100 giờ).",
        promptStep1: "Ta đã 'tính' bao nhiêu chi phí vào sản phẩm?",
        promptStep2: "So sánh đi. Đã phân bổ đủ chưa?",
        explanation: "Chính xác. Ta bị thiếu. Hóa đơn $75k nhưng chỉ tính vào sản phẩm $73.5k. Xử lý: $1,500 này là Chi phí. Ta chịu Lỗ."
    },
    {
        id: 'sewing',
        departmentName: 'PHÒNG MAY',
        oar: 32.50,
        actualHours: 3800,
        context: "Làm ít hơn (3,800 giờ). Rob tiết kiệm điện (Hóa đơn $120k).",
        actualOverhead: 120000,
        correctAbsorbed: 123500,
        varianceAmount: 3500,
        varianceType: 'OVER',
        promptStep1: "Tính số tiền đã tính vào sản phẩm.",
        promptStep2: "So sánh đi. Tính thừa hay thiếu?",
        explanation: "Chuẩn. Ta tính vào sản phẩm $123,500 nhưng chỉ chi $120,000. Tức là ta có thêm tiền! Xử lý: $3,500 này là Lợi nhuận."
    }
  ]
};
