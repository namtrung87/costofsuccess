import { DialogueNode, Language } from '../types';

export interface StrategyProduct {
    id: string;
    name: { EN: string, VI: string };
    price: number;
    variableCost: number;
    materialNeeded: number; // The limiting factor
    maxDemand: number;
}

export interface StrategyBossData {
    products: StrategyProduct[];
    totalAvailableMaterial: number;
    targetProfit: number;
    fixedCosts: number;
    materialName: { EN: string, VI: string };
}

export const PHASE30_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'NEON DROP WAR ROOM. FINAL RESOURCE ALLOCATION.',
            backgroundImage: 'BG_TECH_ROOM',
            nextId: 'ceo_intro'
        },
        'ceo_intro': {
            id: 'ceo_intro',
            speaker: 'CEO',
            speakerTitle: 'The Controller',
            characterId: 'PROP_GATEKEEPER',
            text: "The 'Hyper-Neon' silk shortage has reached critical levels. We have orders for thousands of units, but only a fraction of materials. If we don't hit $50,000 profit tonight, the Board shuts us down.",
            nextId: 'jules_challenge'
        },
        'jules_challenge': {
            id: 'jules_challenge',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "This is it, Intern. You have 3 flagship products and limited fabric. Rank them by contribution per meter, allocate the meters in order of priority, and reach that profit target.",
            nextId: 'rob_warning'
        },
        'rob_warning': {
            id: 'rob_warning',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "Remember, you can't produce more than the market demands for each product. Once a product's demand is filled, move to the next highest rank.",
            choices: [
                { text: "Take Command of the War Room", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'CEO',
            speakerTitle: 'The Controller',
            characterId: 'PROP_GATEKEEPER',
            text: "The Board is silent. $50,000 profit achieved with minimal waste. You've proven yourself as more than just a numbers cruncher—you are a Strategist.",
            choices: [
                { text: "Accept Strategic Advisor Status", nextId: 'VICTORY' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Your allocation is inefficient! You're producing low-contribution-per-meter items before the high-value ones. We missed the profit target by a mile. Reset and recalculate!",
            choices: [
                { text: "Try Allocation Again", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'PHÒNG CHIẾN LƯỢC NEON DROP. PHÂN BỔ NGUỒN LỰC CUỐI CÙNG.',
            backgroundImage: 'BG_TECH_ROOM',
            nextId: 'ceo_intro'
        },
        'ceo_intro': {
            id: 'ceo_intro',
            speaker: 'CEO',
            speakerTitle: 'Người Kiểm Soát',
            characterId: 'PROP_GATEKEEPER',
            text: "Tình trạng thiếu lụa 'Hyper-Neon' đã đến mức báo động. Chúng ta có hàng ngàn đơn hàng, nhưng chỉ có một phần nhỏ nguyên liệu. Nếu không đạt $50,000 lợi nhuận tối nay, Hội đồng sẽ đóng cửa công ty.",
            nextId: 'jules_challenge'
        },
        'jules_challenge': {
            id: 'jules_challenge',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Đến lúc rồi, Thực tập sinh. Bạn có 3 sản phẩm chủ lực và số vải ít ỏi. Hãy xếp hạng chúng theo số dư đảm phí trên mỗi mét, phân bổ vải theo thứ tự ưu tiên và đạt được mục tiêu lợi nhuận.",
            nextId: 'rob_warning'
        },
        'rob_warning': {
            id: 'rob_warning',
            speaker: 'Rob',
            speakerTitle: 'Phụ trách Vận hành',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "Hãy nhớ, bạn không thể sản xuất quá nhu cầu thị trường của từng loại. Khi nhu cầu của một loại đã được đáp ứng, hãy chuyển sang loại có thứ hạng tiếp theo.",
            choices: [
                { text: "Nắm quyền điều hành", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'CEO',
            speakerTitle: 'Người Kiểm Soát',
            characterId: 'PROP_GATEKEEPER',
            text: "Hội đồng quản trị đã im lặng. Đạt mốc $50,000 lợi nhuận với mức lãng phí thấp nhất. Bạn đã chứng minh mình không chỉ là người tính toán—bạn là một Nhà chiến lược.",
            choices: [
                { text: "Nhận danh hiệu Cố vấn Chiến lược", nextId: 'VICTORY' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Phân bổ của bạn không hiệu quả! Bạn đang sản xuất những mặt hàng có số dư đảm phí trên mỗi mét thấp trước những mặt hàng giá trị cao. Chúng ta đã hụt mục tiêu lợi nhuận rồi. Thiết lập lại và tính toán lại ngay!",
            choices: [
                { text: "Thử phân bổ lại", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE30_DATA: StrategyBossData = {
    materialName: { EN: "Hyper-Neon Silk", VI: "Lụa Hyper-Neon" },
    totalAvailableMaterial: 1800,
    targetProfit: 50000,
    fixedCosts: 25000, // Total contribution needed = 75,000
    products: [
        {
            id: 'sneaker',
            name: { EN: "Neon-Kicks", VI: "Giày Neon-Kicks" },
            price: 350,
            variableCost: 200, // Contrib = 150
            materialNeeded: 3, // Contrib/m = 50 (Rank 1)
            maxDemand: 400
        },
        {
            id: 'cap',
            name: { EN: "Cyber-Cap", VI: "Mũ Cyber" },
            price: 120,
            variableCost: 80, // Contrib = 40
            materialNeeded: 1, // Contrib/m = 40 (Rank 2)
            maxDemand: 500
        },
        {
            id: 'hoodie',
            name: { EN: "Alpha-Hoodie", VI: "Áo Hoodie Alpha" },
            price: 160,
            variableCost: 100, // Contrib = 60
            materialNeeded: 2, // Contrib/m = 30 (Rank 3)
            maxDemand: 300
        }
    ]
};
