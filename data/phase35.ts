import { DialogueNode, Language } from '../types';

export interface ConglomerateDivision {
    id: string;
    name: { EN: string, VI: string };
    roi: number;
    customerSatisfaction: number; // 0-100
    staffRetention: number; // 0-100
    budgetNeeded: number;
}

export interface ConglomerateBossData {
    divisions: ConglomerateDivision[];
    totalBudgetAvailable: number;
    targetGroupProfit: number;
    targetGroupNPS: number;
}

export const PHASE35_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'NEON GROUP COMMAND CENTER. THE FINAL YEAR.',
            backgroundImage: 'BG_COMMAND_CENTER',
            nextId: 'jules_final'
        },
        'jules_final': {
            id: 'jules_final',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "The fiscal year is closing. We have three autonomous divisions and one limited capital budget. If we don't hit the Group profit and satisfaction targets, the conglomerate collapses.",
            nextId: 'ceo_voice'
        },
        'ceo_voice': {
            id: 'ceo_voice',
            speaker: 'CEO',
            speakerTitle: 'The Controller',
            characterId: 'PROP_GATEKEEPER',
            text: "Don't just chase ROI. If you starve the 'Fab' division of budget, our staff will leave. If you ignore 'Retail', our customers will defect. Balance the scales.",
            nextId: 'jules_go'
        },
        'jules_go': {
            id: 'jules_go',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "This is your final test, Strategist. Allocate the budget to maximize absolute Residual Income while keeping the non-financial KPIs green. Good luck.",
            choices: [
                { text: "Enter Command Center", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Incredible. You've managed the complexity of a global group with the precision of a master. The Neon Group is now the most 'Balanced' empire in the city.",
            choices: [
                { text: "Legacy Finalized", nextId: 'VICTORY' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Your allocation is reckless! One division is thriving while the others are decaying. The Board has issued a Vote of No Confidence. Recalibrate!",
            choices: [
                { text: "Try Global Audit Again", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'TRUNG TÂM ĐIỀU HÀNH TẬP ĐOÀN NEON. NĂM TÀI CHÍNH CUỐI CÙNG.',
            backgroundImage: 'BG_COMMAND_CENTER',
            nextId: 'jules_final'
        },
        'jules_final': {
            id: 'jules_final',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Năm tài chính sắp kết thúc. Chúng ta có ba bộ phận tự trị và một ngân sách vốn hạn hẹp. Nếu không đạt được các mục tiêu lợi nhuận và sự hài lòng của Tập đoàn, tập đoàn sẽ sụp đổ.",
            nextId: 'ceo_voice'
        },
        'ceo_voice': {
            id: 'ceo_voice',
            speaker: 'CEO',
            speakerTitle: 'Người Kiểm Soát',
            characterId: 'PROP_GATEKEEPER',
            text: "Đừng chỉ chạy theo ROI. Nếu bạn bỏ đói ngân sách của bộ phận 'Sản xuất', nhân viên sẽ rời đi. Nếu bạn phớt lờ 'Bán lẻ', khách hàng sẽ bỏ ta mà đi. Hãy cân bằng bàn cân.",
            nextId: 'jules_go'
        },
        'jules_go': {
            id: 'jules_go',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_SMUG',
            text: "Đây là bài kiểm tra cuối cùng của bạn, Nhà chiến lược. Hãy phân bổ ngân sách để tối đa hóa Lợi nhuận thặng dư (RI) (RI) tuyệt đối trong khi giữ cho các KPI phi tài chính ở mức an toàn. Chúc may mắn.",
            choices: [
                { text: "Vào Trung tâm Điều hành", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Thật không thể tin được. Bạn đã quản lý sự phức tạp của một tập đoàn toàn cầu với độ chính xác của một bậc thầy. Tập đoàn Neon hiện là đế chế 'Cân bằng' nhất thành phố.",
            choices: [
                { text: "Hoàn tất Di sản", nextId: 'VICTORY' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Phân bổ của bạn quá liều lĩnh! Một bộ phận đang phát triển mạnh trong khi những bộ phận khác đang lụi tàn. Hội đồng quản trị đã bỏ phiếu bất tín nhiệm. Hãy hiệu chỉnh lại!",
            choices: [
                { text: "Thử lại Đánh giá Toàn cầu", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE35_DATA: ConglomerateBossData = {
    totalBudgetAvailable: 10000000, // 10M
    targetGroupProfit: 2500000, // 2.5M
    targetGroupNPS: 80,
    divisions: [
        {
            id: 'fab',
            name: { EN: "Neon Fab", VI: "Neon Fab" },
            roi: 0.18,
            customerSatisfaction: 75,
            staffRetention: 70,
            budgetNeeded: 5000000
        },
        {
            id: 'retail',
            name: { EN: "Neon Retail", VI: "Neon Retail" },
            roi: 0.25,
            customerSatisfaction: 65,
            staffRetention: 85,
            budgetNeeded: 3000000
        },
        {
            id: 'design',
            name: { EN: "Neon Design", VI: "Neon Thiết kế" },
            roi: 0.30,
            customerSatisfaction: 90,
            staffRetention: 60,
            budgetNeeded: 4000000
        }
    ]
};
