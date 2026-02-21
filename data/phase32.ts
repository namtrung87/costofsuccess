import { DialogueNode, Language } from '../types';

export interface PerformanceDivision {
    id: string;
    name: { EN: string, VI: string };
    profit: number;
    investment: number;
}

export interface PerformanceScenario {
    divisions: PerformanceDivision[];
    costOfCapital: number; // e.g. 0.15 for 15%
}

export const PHASE32_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'NEON GROUP HEADQUARTERS. THE BOARDROOM.',
            backgroundImage: 'BG_OFFICE',
            nextId: 'jules_intro'
        },
        'jules_intro': {
            id: 'jules_intro',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "It's bonus season. Two division managers are arguing over who performed better. One runs a massive factory, the other a boutique studio.",
            nextId: 'large_manager'
        },
        'large_manager': {
            id: 'large_manager',
            speaker: 'Big Al',
            speakerTitle: 'Neon Fab Manager',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "I made $2,000,000 in profit! That's ten times what the studio made. I should get the Golden Pager.",
            nextId: 'small_manager'
        },
        'small_manager': {
            id: 'small_manager',
            speaker: 'Little Lu',
            speakerTitle: 'Neon Studio Manager',
            characterId: 'CHAR_KAI_NEUTRAL',
            text: "Yeah, but you used $20,000,000 in capital to do it. I only used $1,000,000. My ROI is much higher!",
            nextId: 'jules_challenge'
        },
        'jules_challenge': {
            id: 'jules_challenge',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Profit and ROI don't tell the whole story. Calculate the Residual Income (RI) based on our 15% cost of capital. Who really added more value to the Group?",
            choices: [
                { text: "Launch Performance Comparer", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Spot on. Residual Income proves that even with a lower ROI, the larger division might be adding more absolute wealth to the Group. Balanced perspective achieved.",
            choices: [
                { text: "Next: Beyond the Numbers", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "You're blinded by percentages! RI is Profit minus the Imputed Interest on capital. Recalculate and find the true value-adder.",
            choices: [
                { text: "Re-evaluate Managers", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'TRỤ SỞ TẬP ĐOÀN NEON. PHÒNG HỌP BAN QUẢN TRỊ.',
            backgroundImage: 'BG_OFFICE',
            nextId: 'jules_intro'
        },
        'jules_intro': {
            id: 'jules_intro',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Đến mùa thưởng rồi. Hai quản lý bộ phận đang tranh cãi xem ai làm tốt hơn. Một người điều hành nhà máy khổng lồ, người kia điều hành một studio nhỏ.",
            nextId: 'large_manager'
        },
        'large_manager': {
            id: 'large_manager',
            speaker: 'Big Al',
            speakerTitle: 'Quản lý Neon Fab',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "Tôi đã tạo ra 2 triệu đô lợi nhuận! Gấp 10 lần những gì studio làm được. Tôi nên nhận được phần thưởng!",
            nextId: 'small_manager'
        },
        'small_manager': {
            id: 'small_manager',
            speaker: 'Little Lu',
            speakerTitle: 'Quản lý Neon Studio',
            characterId: 'CHAR_KAI_NEUTRAL',
            text: "Đúng, nhưng ông đã dùng tận 20 triệu đô vốn để làm việc đó. Tôi chỉ dùng 1 triệu đô. ROI của tôi cao hơn nhiều!",
            nextId: 'jules_challenge'
        },
        'jules_challenge': {
            id: 'jules_challenge',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_SMUG',
            text: "Lợi nhuận và ROI không nói lên toàn bộ câu chuyện. Hãy tính Lợi nhuận thặng dư (RI) (RI) dựa trên chi phí vốn 15% của tập đoàn. Ai thực sự tạo ra nhiều giá trị hơn?",
            choices: [
                { text: "Khởi động Bộ so sánh Hiệu suất", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Chính xác. RI chứng minh rằng ngay cả khi ROI thấp hơn, bộ phận lớn hơn có thể góp phần làm tăng giá trị tuyệt đối nhiều hơn cho tập đoàn. Đã đạt được cái nhìn cân bằng.",
            choices: [
                { text: "Tiếp theo: Hơn cả những con số", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Bạn đang bị mờ mắt bởi các con số phần trăm rồi! RI là Lợi nhuận trừ đi Lãi suất tính toán trên vốn. Hãy tính toán lại và tìm ra người tạo giá trị thực sự.",
            choices: [
                { text: "Đánh giá lại Quản lý", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE32_DATA: PerformanceScenario = {
    costOfCapital: 0.15,
    divisions: [
        {
            id: 'fab',
            name: { EN: "Neon Fab", VI: "Neon Fab" },
            profit: 2000000,
            investment: 20000000 // ROI = 10%. RI = 2M - (20M * 0.15) = -1M? Oh, that makes them bad.
        },
        {
            id: 'studio',
            name: { EN: "Neon Studio", VI: "Neon Studio" },
            profit: 250000,
            investment: 1000000 // ROI = 25%. RI = 250k - (1M * 0.15) = 100k.
        }
    ]
};

// Adjusted for a more subtle duel:
// Fab: Profit 3.5M, Investment 20M -> ROI = 17.5%. RI = 3.5M - 3M = 0.5M.
// Studio: Profit 300k, Investment 1M -> ROI = 30%. RI = 300k - 150k = 150k.
// Here Studio has higher ROI, but Fab has much higher RI ($500k vs $150k).
export const PHASE32_DATA_FINAL: PerformanceScenario = {
    costOfCapital: 0.15,
    divisions: [
        {
            id: 'fab',
            name: { EN: "Neon Fab (Large)", VI: "Neon Fab (Lớn)" },
            profit: 3500000,
            investment: 20000000
        },
        {
            id: 'studio',
            name: { EN: "Neon Studio (Small)", VI: "Neon Studio (Nhỏ)" },
            profit: 300000,
            investment: 1000000
        }
    ]
};
