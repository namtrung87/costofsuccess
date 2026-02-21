import { DialogueNode, Language } from '../types';

export interface MoSScenario {
    breakEvenUnits: number;
    requiredMoSPercentage: number; // e.g., 25 for 25%
    maxCapacity: number;
}

export const PHASE16_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'THE BOARDROOM: THE FINAL PITCH. 15:00 PM.',
            backgroundImage: 'BG_OFFICE', // Boss fight background
            nextId: 'board_demand'
        },
        'board_demand': {
            id: 'board_demand',
            speaker: 'Board of Directors',
            speakerTitle: 'The Investors',
            characterId: 'CHAR_JULES_NEUTRAL', // Reusing Jules as the proxy for the board, or just a system text
            text: "We've reviewed your Break-Even Analysis. 6,000 units is the floor. But we didn't invest in Neon Drop to merely 'break even'.",
            nextId: 'jules_steps_up'
        },
        'jules_steps_up': {
            id: 'jules_steps_up',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Of course. We have a robust sales forecast.",
            nextId: 'board_ultimatum'
        },
        'board_ultimatum': {
            id: 'board_ultimatum',
            speaker: 'Board of Directors',
            speakerTitle: 'The Investors',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Forecasting is just guessing in a suit. We require a buffer. We will only approve this launch if you can guarantee a Margin of Safety (MoS) of exactly 25%. What is your Target Sales Volume?",
            choices: [
                { text: "I'll do the math.", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "8,000 units it is. If our expected sales drop by 25%, we still won't lose money.",
            choices: [
                { text: "We did it.", nextId: 'rob_celebrates' }
            ]
        },
        'rob_celebrates': {
            id: 'rob_celebrates',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_CONFIDENT',
            text: "8,000 units is our exact max capacity. I'll fire up all the machines. The Cyber-Samurai drop is a GO!",
            choices: [
                { text: "End Season 2", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Board of Directors',
            speakerTitle: 'The Investors',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Unacceptable. Your numbers don't provide the safety net we demanded. Project rejected.",
            choices: [
                { text: "Try again...", nextId: 'END_PHASE' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'PHÒNG HỌP BAN QUẢN TRỊ: VÒNG GỌI VỐN CUỐI. 15:00 CHIỀU.',
            backgroundImage: 'BG_OFFICE',
            nextId: 'board_demand'
        },
        'board_demand': {
            id: 'board_demand',
            speaker: 'Hội đồng Quản trị',
            speakerTitle: 'Nhà Đầu tư',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Chúng tôi đã xem Phân tích Hòa vốn của các cô cậu. 6,000 sản phẩm là mức đáy. Nhưng chúng tôi không rót vốn vào Neon Drop chỉ để 'hòa vốn'.",
            nextId: 'jules_steps_up'
        },
        'jules_steps_up': {
            id: 'jules_steps_up',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Dĩ nhiên rồi ạ. Chúng tôi có một bản dự phóng doanh thu rất mạnh mẽ.",
            nextId: 'board_ultimatum'
        },
        'board_ultimatum': {
            id: 'board_ultimatum',
            speaker: 'Hội đồng Quản trị',
            speakerTitle: 'Nhà Đầu tư',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Dự phóng chỉ là đoán mò mặc vest thôi. Chúng tôi cần một vùng đệm an toàn. Dự án này chỉ được duyệt nếu các vị cam kết được Mức Biên An Toàn (Margin of Safety) chính xác là 25%. Mục tiêu Doanh số là bao nhiêu?",
            choices: [
                { text: "Để tôi tính.", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Chính xác là 8,000 sản phẩm. Nếu doanh số kỳ vọng có sụt giảm 25% đi nữa, chúng ta vẫn không lỗ 1 xu.",
            choices: [
                { text: "Thành công rồi.", nextId: 'rob_celebrates' }
            ]
        },
        'rob_celebrates': {
            id: 'rob_celebrates',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_CONFIDENT',
            text: "8,000 chiếc đúng bằng công suất tối đa của xưởng. Tôi sẽ cho chạy toàn bộ máy móc. Dự án Cyber-Samurai được duyệt!",
            choices: [
                { text: "Kết thúc Season 2", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Hội đồng Quản trị',
            speakerTitle: 'Nhà Đầu tư',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Không thể chấp nhận. Những con số này không mang lại lưới an toàn mà chúng tôi yêu cầu. Dự án bị từ chối.",
            choices: [
                { text: "Thử lại...", nextId: 'END_PHASE' }
            ]
        }
    }
};

export const PHASE16_DATA: MoSScenario = {
    breakEvenUnits: 6000,
    requiredMoSPercentage: 25,
    maxCapacity: 10000
};
