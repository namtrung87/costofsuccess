import { DialogueNode, Language } from '../types';

export interface MakeBuyScenario {
    itemName: { EN: string, VI: string };
    quantityNeeded: number;
    internalVariableCost: number; // per unit
    internalAvoidableFixedCost: number; // total
    internalUnavoidableFixedCost: number; // total
    externalPrice: number; // per unit
    externalQualityRisk: string; // descriptive
}

export const PHASE28_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'PRODUCTION FLOOR. DESIGNER_CALIBRATION_UNIT.',
            backgroundImage: 'BG_TECH_ROOM',
            nextId: 'rob_panic'
        },
        'rob_panic': {
            id: 'rob_panic',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_ANGRY',
            text: "The main zipper-embosser just fried. Replacing the chip costs $4,000 upfront. Or we can just buy pre-embossed zippers from 'Z-Corp' for $2 each. What's the play?",
            nextId: 'jules_logic'
        },
        'jules_logic': {
            id: 'jules_logic',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Rob is only looking at the sticker price. We need to compare the *Relevant* cost to make vs the price to buy. If we buy, we save the avoidable part of our fixed overheads too. Crack the math, Intern.",
            choices: [
                { text: "Launch Make/Buy Scaler", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Efficiency confirmed. You've identified the break-even point between internal craftsmanship and external convenience. We save $1,000 with your plan.",
            choices: [
                { text: "Next: The Kill Order", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Your comparison is flawed! You're including unavoidable costs that we have to pay anyway. Only compare the costs that actually CHANGE.",
            choices: [
                { text: "Re-evaluate Scaler", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'SÀN SẢN XUẤT. BỘ PHẬN HIỆU CHUẨN THIẾT KẾ.',
            backgroundImage: 'BG_TECH_ROOM',
            nextId: 'rob_panic'
        },
        'rob_panic': {
            id: 'rob_panic',
            speaker: 'Rob',
            speakerTitle: 'Phụ trách Vận hành',
            characterId: 'CHAR_ROB_ANGRY',
            text: "Máy dập khóa kéo chính vừa bị cháy. Thay chip tốn tận $4,000. Hoặc chúng ta có thể mua khóa dập sẵn từ 'Z-Corp' với giá $2 mỗi chiếc. Tính sao đây?",
            nextId: 'jules_logic'
        },
        'jules_logic': {
            id: 'jules_logic',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Rob chỉ nhìn vào giá niêm yết. Chúng ta cần so sánh chi phí *Liên quan* để tự làm so với giá đi mua. Nếu mua, chúng ta cũng tiết kiệm được phần định phí có thể tránh được. Giải toán đi, Thực tập sinh.",
            choices: [
                { text: "Khởi động Bộ so sánh Tự làm/Mua", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Xác nhận hiệu quả. Bạn đã tìm thấy điểm hòa vốn giữa sự tỉ mỉ nội bộ và sự tiện lợi bên ngoài. Chúng ta tiết kiệm được $1,000 nhờ kế hoạch của bạn.",
            choices: [
                { text: "Tiếp theo: Lệnh khai tử", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "So sánh của bạn sai rồi! Bạn đang đưa cả những chi phí không thể tránh khỏi—thứ mà đằng nào chúng ta cũng phải trả. Chỉ so sánh những gì thực sự THAY ĐỔI thôi.",
            choices: [
                { text: "Đánh giá lại", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE28_DATA: MakeBuyScenario = {
    itemName: { EN: "Embossed Zippers", VI: "Khóa kéo Dập nổi" },
    quantityNeeded: 5000,
    internalVariableCost: 0.5,
    internalAvoidableFixedCost: 4000,
    internalUnavoidableFixedCost: 2500,
    externalPrice: 1.5,
    externalQualityRisk: "Low - Z-Corp is reliable but generic."
};
