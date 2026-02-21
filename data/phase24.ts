import { DialogueNode, Language } from '../types';

export interface MaterialMixYieldScenario {
    materials: {
        id: string;
        name: { EN: string, VI: string };
        standardPrice: number;
        standardMixPercent: number; // e.g. 0.6 for 60%
        actualQuantity: number;
    }[];
    actualUnitsProduced: number;
    standardYieldPerUnitTotal: number; // total kg/m per unit
}

export const PHASE24_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'PRODUCTION FLOOR. R&D WING.',
            backgroundImage: 'BG_DESIGN_LAB',
            nextId: 'rob_mix'
        },
        'rob_mix': {
            id: 'rob_mix',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "The 'Secret Sauce' isn't just one material. It's a blend of Premium Fabric and Neon Lining. We used too much of the expensive stuff this time.",
            nextId: 'jules_logic'
        },
        'jules_logic': {
            id: 'jules_logic',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Using a different ratio than planned is a Mix Variance. Getting fewer units than expected from the input is a Yield Variance. Intern, find the real cause of the waste.",
            choices: [
                { text: "Analyze Mix & Yield", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "So it wasn't just 'wasted' fabric—the ratio was wrong (Mix Adverse), and the quality was so low we lost output (Yield Adverse).",
            nextId: 'jules_next'
        },
        'jules_next': {
            id: 'jules_next',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Now you see why 'Total Usage' is too simple. Precision is power in the audit vault.",
            choices: [
                { text: "Move to Phase 25", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_SHOCKED',
            text: "You can't just add them up! The mix must balance. Check your standard ratios again!",
            choices: [
                { text: "Recalculate Mix & Yield", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'SÀN SẢN XUẤT. KHU VỰC R&D.',
            backgroundImage: 'BG_DESIGN_LAB',
            nextId: 'rob_mix'
        },
        'rob_mix': {
            id: 'rob_mix',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "Cái 'Công thức bí mật' không chỉ là một loại nguyên liệu. Đó là sự pha trộn giữa Vải cao cấp và Lót Neon. Lần này chúng ta dùng quá nhiều loại đắt tiền.",
            nextId: 'jules_logic'
        },
        'jules_logic': {
            id: 'jules_logic',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Dùng sai tỉ lệ so với kế hoạch là Biến động Hợp phần (Mix). Thu được ít sản phẩm hơn kỳ vọng từ lượng đầu vào là Biến động Hiệu suất (Yield). Thực tập sinh, hãy tìm nguyên nhân thực sự của sự lãng phí.",
            choices: [
                { text: "Phân tích Hợp phần & Hiệu suất", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "Vậy không chỉ là 'lãng phí' vải—tỉ lệ đã bị sai (Mix Adverse), và chất lượng thấp đến mức ta mất luôn sản lượng đầu ra (Yield Adverse).",
            nextId: 'jules_next'
        },
        'jules_next': {
            id: 'jules_next',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Giờ thì bạn đã hiểu tại sao 'Tổng lượng sử dụng' là quá đơn giản rồi chứ. Sự chính xác là sức mạnh trong hầm kiểm toán.",
            choices: [
                { text: "Sang Màn 25", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_SHOCKED',
            text: "Bạn không thể chỉ cộng chúng lại! Tỉ lệ hợp phần phải cân bằng. Kiểm tra lại các tỉ lệ tiêu chuẩn đi!",
            choices: [
                { text: "Tính toán lại", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE24_DATA: MaterialMixYieldScenario = {
    materials: [
        {
            id: 'fabric',
            name: { EN: "Premium Fabric", VI: "Vải Cao Cấp" },
            standardPrice: 40,
            standardMixPercent: 0.6,
            actualQuantity: 6500
        },
        {
            id: 'lining',
            name: { EN: "Neon Lining", VI: "Lót Dạ Quang" },
            standardPrice: 10,
            standardMixPercent: 0.4,
            actualQuantity: 3500
        }
    ],
    actualUnitsProduced: 6000,
    standardYieldPerUnitTotal: 1.5 // 1.5m total input per unit (0.9m fabric + 0.6m lining)
};
