import { DialogueNode, Language } from '../types';

export interface BreakEvenScenario {
    sellingPrice: number;
    variableCost: number;
    fixedCost: number;
    maxUnits: number; // for graph scaling
}

export const PHASE15_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'EXECUTIVE BOARDROOM. 09:00 AM.',
            backgroundImage: 'BG_TECH_ROOM',
            nextId: 'kai_pitch'
        },
        'kai_pitch': {
            id: 'kai_pitch',
            speaker: 'Kai',
            speakerTitle: 'Lead Designer',
            characterId: 'CHAR_KAI_CONFIDENT',
            text: "The 'Cyber-Samurai' collection is ready. It's our most expensive line yet. High quality materials mean Variable Cost is $30. We're selling it at a premium $50.",
            nextId: 'rob_concerned'
        },
        'rob_concerned': {
            id: 'rob_concerned',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "But buying the new specialized sewing machines adds $100,000 to our Fixed Costs for the quarter. That's a massive risk.",
            choices: [
                { text: "What's our safety net?", nextId: 'jules_enters' }
            ]
        },
        'jules_enters': {
            id: 'jules_enters',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "We don't do 'hope' as a business strategy. We need to know exactly how many units we must sell just to break even—the point where we make exactly zero profit, but lose nothing.",
            nextId: 'jules_explain'
        },
        'jules_explain': {
            id: 'jules_explain',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Break-Even Point (Units) = Total Fixed Costs / Contribution per unit. Intern, fire up the CVP Canvas. Find the intersection.",
            choices: [
                { text: "Open CVP Canvas", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "5,000 units. That's our target. Below that, we bleed. Above that, every jacket is $20 of pure profit.",
            choices: [
                { text: "Are we capable of making 5,000?", nextId: 'rob_confident' }
            ]
        },
        'rob_confident': {
            id: 'rob_confident',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_CONFIDENT',
            text: "Our max capacity is 8,000 units. If marketing can push it, production can handle it.",
            choices: [
                { text: "Next...", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Look at the intersection of Total Revenue and Total Costs! Try again.",
            choices: [
                { text: "Recalculating...", nextId: 'END_PHASE' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'PHÒNG HỌP BAN GIÁM ĐỐC. 09:00 SÁNG.',
            backgroundImage: 'BG_TECH_ROOM',
            nextId: 'kai_pitch'
        },
        'kai_pitch': {
            id: 'kai_pitch',
            speaker: 'Kai',
            speakerTitle: 'Lead Designer',
            characterId: 'CHAR_KAI_CONFIDENT',
            text: "Bộ sưu tập 'Cyber-Samurai' đã sẵn sàng. Đây là dòng đắt tiền nhất của chúng ta. Vật liệu xịn nên Biến phí là $30. Giá bán định vị ở mức $50.",
            nextId: 'rob_concerned'
        },
        'rob_concerned': {
            id: 'rob_concerned',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "Nhưng mua dàn máy may chuyên dụng mới khiến Định phí tăng vọt lên $100,000 trong quý này. Rủi ro khổng lồ đấy.",
            choices: [
                { text: "Mạng lưới an toàn của ta là gì?", nextId: 'jules_enters' }
            ]
        },
        'jules_enters': {
            id: 'jules_enters',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Chúng ta không dùng 'hi vọng' làm chiến lược kinh doanh. Phải biết chính xác cần bán bao nhiêu sản phẩm để Hòa Vốn—điểm mà lợi nhuận bằng 0, không lãi không lỗ.",
            nextId: 'jules_explain'
        },
        'jules_explain': {
            id: 'jules_explain',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Điểm Hòa Vốn (SP) = Tổng Định phí / Số dư Đảm phí 1 SP. Thực tập sinh, bật Bảng vẽ CVP lên. Tìm điểm giao cắt đi.",
            choices: [
                { text: "Bật CVP Canvas", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "5,000 sản phẩm. Đó là mục tiêu. Dưới mức đó, công ty chảy máu. Trên mức đó, mỗi cái áo mang về $20 lợi nhuận ròng.",
            choices: [
                { text: "Cơ ngơi đủ sức làm 5,000 cái không?", nextId: 'rob_confident' }
            ]
        },
        'rob_confident': {
            id: 'rob_confident',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_CONFIDENT',
            text: "Công suất tối đa là 8,000. Nếu Marketing đẩy được, Sản xuất gánh tốt.",
            choices: [
                { text: "Tiếp tục...", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Nhìn vào điểm giao cắt của Tổng Doanh Thu và Tổng Chi Phí ấy! Thử lại.",
            choices: [
                { text: "Đang tính lại...", nextId: 'END_PHASE' }
            ]
        }
    }
};

export const PHASE15_DATA: BreakEvenScenario = {
    sellingPrice: 50,
    variableCost: 30,
    fixedCost: 100000,
    maxUnits: 10000
};
