import { DialogueNode, Language } from '../types';

export interface MaterialVarianceScenario {
    standardPrice: number;
    standardQuantity: number; // per unit
    actualPrice: number;
    actualQuantity: number; // total used
    actualUnitsProduced: number;
}

export const PHASE19_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'WAREHOUSE SECTOR 7. 10:00 AM.',
            backgroundImage: 'BG_PUMP_ROOM',
            nextId: 'rob_fuming'
        },
        'rob_fuming': {
            id: 'rob_fuming',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_ANGRY',
            text: "I told them! I TOLD THEM! This fabric is garbage. It's thin, it tears when the machines even look at it, and my waste bins are overflowing!",
            nextId: 'procurement_defense'
        },
        'procurement_defense': {
            id: 'procurement_defense',
            speaker: 'Purchasing Bot',
            speakerTitle: 'Procurement AI',
            characterId: 'PROP_GATEKEEPER',
            text: "Efficiency detected. Premium Fabric was budgeted at $40/m. I secured a 10% discount at $36/m. Favorable Price Variance achieved.",
            nextId: 'rob_counter'
        },
        'rob_counter': {
            id: 'rob_counter',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_SHOCKED',
            text: "You saved $4 a meter but we used nearly double the fabric because so much was defective! Jules is going to have my head for the usage numbers.",
            nextId: 'jules_logic'
        },
        'jules_logic': {
            id: 'jules_logic',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Stop shouting. Intern, show us the real damage. Calculate the Material Price and Usage variances. Let's see if Procurement's 'savings' were actually a cost.",
            choices: [
                { text: "Open Audit Terminal", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Exactly as I thought. We saved $42,000 on price, but we lost $70,000 in wasted material. A net loss of $28,000. Cheap is expensive.",
            choices: [
                { text: "Rob was right.", nextId: 'jules_closing' }
            ]
        },
        'jules_closing': {
            id: 'jules_closing',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "The data doesn't lie. Next time, Procurement needs to check the quality specs. Now, let's talk about the people on the line.",
            choices: [
                { text: "Go to Assembly Line", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "If you can't calculate the waste, you're part of the waste! Get those variance figures right.",
            choices: [
                { text: "Recalculate", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'KHU VỰC KHO SỐ 7. 10:00 SÁNG.',
            backgroundImage: 'BG_PUMP_ROOM',
            nextId: 'rob_fuming'
        },
        'rob_fuming': {
            id: 'rob_fuming',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_ANGRY',
            text: "Tôi đã nói rồi! ĐÃ NÓI RỒI! Loại vải này là rác rưởi. Nó mỏng, nó rách ngay khi máy móc vừa chạm vào, và thùng rác của tôi đang tràn ngập vải vụn!",
            nextId: 'procurement_defense'
        },
        'procurement_defense': {
            id: 'procurement_defense',
            speaker: 'Purchasing Bot',
            speakerTitle: 'AI Thu mua',
            characterId: 'PROP_GATEKEEPER',
            text: "Phát hiện hiệu quả. Vải cao cấp được dự toán $40/m. Tôi đã chốt được mức giảm 10% còn $36/m. Đạt được Biến động Giá có lợi (Favorable).",
            nextId: 'rob_counter'
        },
        'rob_counter': {
            id: 'rob_counter',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_SHOCKED',
            text: "Các người tiết kiệm được $4 mỗi mét nhưng chúng tôi dùng gần gấp đôi lượng vải vì quá nhiều lỗi! Jules sẽ xử tôi vì con số hao hụt này mất.",
            nextId: 'jules_logic'
        },
        'jules_logic': {
            id: 'jules_logic',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Đừng hét lên nữa. Thực tập sinh, hãy cho chúng tôi thấy thiệt hại thực sự. Tính toán các Biến động Giá và Lượng nguyên liệu. Để xem khoản 'tiết kiệm' của bộ phận Thu mua thực chất là gì.",
            choices: [
                { text: "Mở Cổng Kiểm toán", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Chính xác như tôi nghĩ. Ta tiết kiệm được $42,000 tiền giá, nhưng lỗ $70,000 vì vải hỏng. Lỗ ròng $28,000. Rẻ chính là đắt.",
            choices: [
                { text: "Rob đã đúng.", nextId: 'jules_closing' }
            ]
        },
        'jules_closing': {
            id: 'jules_closing',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Dữ liệu không biết nói dối. Lần tới, bộ phận Thu mua cần kiểm tra kỹ thông số chất lượng. Giờ thì, hãy nói về con người ở dây chuyền sản xuất.",
            choices: [
                { text: "Tới Dây chuyền Lắp ráp", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Nếu bạn không tính được lượng hao hụt, bạn chính là một phần của sự lãng phí đó! Tính toán lại biến động cho đúng đi.",
            choices: [
                { text: "Tính toán lại", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE19_DATA: MaterialVarianceScenario = {
    standardPrice: 40,
    standardQuantity: 1.5,
    actualPrice: 36,
    actualQuantity: 11500, // Total used
    actualUnitsProduced: 6000 // Total sneakers actually made
};
