import { DialogueNode, Language } from '../types';

export interface ShutdownSection {
    id: string;
    name: { EN: string, VI: string };
    revenue: number;
    variableCosts: number;
    avoidableFixedCosts: number;
    unavoidableFixedCosts: number;
}

export interface ShutdownScenario {
    sections: ShutdownSection[];
}

export const PHASE29_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'EXECUTIVE SUITE. THE CHOPPING BLOCK.',
            backgroundImage: 'BG_OFFICE',
            nextId: 'jules_anger'
        },
        'jules_anger': {
            id: 'jules_anger',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "The 'Cyber-Sneaker' line is a disaster. It's showing a $5,000 net loss. I'm ready to issue the Kill Order and shut down the whole department.",
            nextId: 'rob_defense'
        },
        'rob_defense': {
            id: 'rob_defense',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "Wait! If we shut it down, we still have to pay the equipment lease and the warehouse rent. Those costs aren't going anywhere.",
            nextId: 'jules_challenge'
        },
        'jules_challenge': {
            id: 'jules_challenge',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "A product is only worth killing if the costs we save are greater than the contribution we lose. Intern, slice the costs. Should we issue the Kill Order?",
            choices: [
                { text: "Launch Shutdown Analyzer", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Good save. You proved that keeping the line actually helps cover our unavoidable overheads. The sneakers live to see another drop.",
            choices: [
                { text: "Prepare for the Grand Strategy", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "You're ignoring the contribution! Even if it shows a net loss, if it's contributing to our shared fixed costs, shutting it down makes our total profit WORSE.",
            choices: [
                { text: "Re-analyze the Chop", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'PHÒNG ĐIỀU HÀNH. THỚT KIỂM TOÁN.',
            backgroundImage: 'BG_OFFICE',
            nextId: 'jules_anger'
        },
        'jules_anger': {
            id: 'jules_anger',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Dòng 'Cyber-Sneaker' là một thảm họa. Nó đang lỗ ròng $5,000. Tôi sẵn sàng ra Lệnh khai tử và đóng cửa toàn bộ bộ phận đó.",
            nextId: 'rob_defense'
        },
        'rob_defense': {
            id: 'rob_defense',
            speaker: 'Rob',
            speakerTitle: 'Phụ trách Vận hành',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "Đợi đã! Nếu đóng cửa, chúng ta vẫn phải trả tiền thuê thiết bị và tiền thuê kho. Những chi phí đó không mất đi đâu cả.",
            nextId: 'jules_challenge'
        },
        'jules_challenge': {
            id: 'jules_challenge',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Một sản phẩm chỉ đáng bị khai tử nếu chi phí chúng ta tiết kiệm được lớn hơn phần số dư đảm phí bị mất đi. Thực tập sinh, hãy bóc tách chi phí. Có nên ra Lệnh khai tử không?",
            choices: [
                { text: "Khởi động Bộ phân tích Khai tử", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Cứu thua ngoạn mục. Bạn đã chứng minh rằng giữ lại dòng sản phẩm này thực chất giúp trang trải các định phí không thể tránh khỏi. Đôi giày thể thao này vẫn sẽ tiếp tục tồn tại.",
            choices: [
                { text: "Chuẩn bị cho Đại chiến lược", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Bạn đang phớt lờ số dư đảm phí! Ngay cả khi nó lỗ ròng, nếu nó đang góp phần bù đắp định phí chung, việc đóng cửa sẽ làm tổng lợi nhuận TỆ HƠN.",
            choices: [
                { text: "Phân tích lại", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE29_DATA: ShutdownScenario = {
    sections: [
        {
            id: 'sneakers',
            name: { EN: "Cyber-Sneaker Line", VI: "Dòng Cyber-Sneaker" },
            revenue: 50000,
            variableCosts: 35000,
            avoidableFixedCosts: 10000,
            unavoidableFixedCosts: 10000 // Total costs = 35 + 10 + 10 = 55k. Net Loss = 5k.
        }
    ]
};
