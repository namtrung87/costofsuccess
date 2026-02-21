import { DialogueNode, Language } from '../types';

export interface LimitingFactorProduct {
    id: string;
    name: { EN: string, VI: string };
    sellingPrice: number;
    variableCost: number;
    materialNeeded: number; // e.g. Meters of fabric
    maxDemand: number;
}

export interface LimitingFactorScenario {
    totalMaterialAvailable: number;
    products: LimitingFactorProduct[];
    limitingFactorName: { EN: string, VI: string };
    limitingFactorUnit: string;
}

export const PHASE27_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'WAREHOUSE 04. STOCK ALERT RED.',
            backgroundImage: 'BG_OPS_CENTER',
            nextId: 'rob_panic'
        },
        'rob_panic': {
            id: 'rob_panic',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_ANGRY',
            text: "The shipment of 'Hyper-Neon' silk was hijacked! We only have 800 meters left, but if we fulfilled every order, we'd need 2,000 meters. What do we cut?!",
            nextId: 'jules_logic'
        },
        'jules_logic': {
            id: 'jules_logic',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Rob wants to cut the cheapest product, but that's rookie math. We need to maximize profit per METER of fabric, not per unit. Rank them, Intern.",
            choices: [
                { text: "Launch Optimization Grid", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Efficiency maximized. By ranking them by contribution per meter, you've extracted every possible dollar from that limited silk pile.",
            choices: [
                { text: "Next: The Outsourcing Dilemma", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Your production ranking is inefficient. Don't look at total profit—look at profit PER METER. That's the limiting factor bottleneck!",
            choices: [
                { text: "Optimize Again", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'KHO HÀNG 04. CẢNH BÁO ĐỎ.',
            backgroundImage: 'BG_OPS_CENTER',
            nextId: 'rob_panic'
        },
        'rob_panic': {
            id: 'rob_panic',
            speaker: 'Rob',
            speakerTitle: 'Phụ trách Vận hành',
            characterId: 'CHAR_ROB_ANGRY',
            text: "Lô hàng lụa 'Hyper-Neon' bị cướp rồi! Chúng ta chỉ còn 800 mét, nhưng nếu làm hết đơn hàng thì cần tới 2,000 mét. Bỏ mẫu nào đây?!",
            nextId: 'jules_logic'
        },
        'jules_logic': {
            id: 'jules_logic',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Rob muốn bỏ mẫu rẻ nhất, nhưng đó là cách tính của lính mới. Chúng ta phải tối ưu hóa lợi nhuận trên mỗi MÉT vải, chứ không phải mỗi sản phẩm. Xếp hạng đi, Thực tập sinh.",
            choices: [
                { text: "Khởi động Lưới Tối ưu", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Hiệu suất tối đa. Bằng cách xếp hạng theo số dư đảm phí trên mỗi mét, bạn đã vắt kiệt từng đồng lợi nhuận từ đống lụa ít ỏi đó.",
            choices: [
                { text: "Tiếp theo: Tiến thoái lưỡng nan khi thuê ngoài", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Thứ tự sản xuất của bạn không hiệu quả. Đừng nhìn vào tổng lợi nhuận—hãy nhìn vào lợi nhuận TRÊN MỖI MÉT. Đó mới là nút thắt cổ chai!",
            choices: [
                { text: "Tối ưu hóa lại", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE27_DATA: LimitingFactorScenario = {
    totalMaterialAvailable: 800,
    limitingFactorName: { EN: "Hyper-Neon Silk", VI: "Lụa Hyper-Neon" },
    limitingFactorUnit: "m",
    products: [
        {
            id: 'jacket',
            name: { EN: "Tech-Jacket", VI: "Áo khoác Công nghệ" },
            sellingPrice: 200,
            variableCost: 120,
            materialNeeded: 4,
            maxDemand: 150
        },
        {
            id: 'pants',
            name: { EN: "Cargo-Pants", VI: "Quần Cargo" },
            sellingPrice: 150,
            variableCost: 90,
            materialNeeded: 2,
            maxDemand: 200
        },
        {
            id: 'vest',
            name: { EN: "Neon-Vest", VI: "Gilet Neon" },
            sellingPrice: 100,
            variableCost: 75,
            materialNeeded: 1,
            maxDemand: 300
        }
    ]
};
