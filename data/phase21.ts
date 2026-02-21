import { DialogueNode, Language } from '../types';

export interface FixedOverheadScenario {
    budgetedFixedOH: number;
    budgetedVolume: number; // in units
    actualFixedOH: number;
    actualVolume: number; // in units
}

export const PHASE21_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'CORPORATE HQ. BOARDROOM ANCHOR.',
            backgroundImage: 'BG_OFFICE',
            nextId: 'jules_final_check'
        },
        'jules_final_check': {
            id: 'jules_final_check',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "We're almost ready for the full P&L. But there's a discrepancy in the factory lease and management salaries. We budgeted $500,000, but the actuals are higher.",
            nextId: 'rob_volume'
        },
        'rob_volume': {
            id: 'rob_volume',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "The lease went up by $20,000, but don't forget we produced more units than planned. Doesn't that mean we 'absorbed' more of the cost?",
            nextId: 'jules_logic'
        },
        'jules_logic': {
            id: 'jules_logic',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "In absorption costing, yes. Higher volume creates a Favorable Volume Variance. Intern, break it down. Show me the real spending overflow and the volume effect.",
            choices: [
                { text: "Analyze Fixed Overheads", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Clear enough. We overspent $30,000 on items (Expenditure Adverse), but because we made 500 extra sneakers, we gained $50,000 in volume efficiency (Volume Favorable).",
            choices: [
                { text: "Net $20,000 Favorable for Fixed OH.", nextId: 'jules_closing' }
            ]
        },
        'jules_closing': {
            id: 'jules_closing',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Good work. Now, the main event. All these variances need to be reconciled in one master statement. The CEO is waiting.",
            choices: [
                { text: "Prepare the Operating Statement", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "You're confusing rent with output! Fixed costs don't move with volume—only the variance does. Fix your logic.",
            choices: [
                { text: "Recalculate Fixed OH", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'TRỤ SỞ CHÍNH. PHÒNG HỌP HĐQT.',
            backgroundImage: 'BG_OFFICE',
            nextId: 'jules_final_check'
        },
        'jules_final_check': {
            id: 'jules_final_check',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Chúng ta sắp hoàn tất Báo cáo kết quả kinh doanh. Nhưng có sự sai lệch trong tiền thuê nhà máy và lương quản lý. Ta dự toán $500,000, nhưng thực tế cao hơn.",
            nextId: 'rob_volume'
        },
        'rob_volume': {
            id: 'rob_volume',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "Tiền thuê tăng thêm $20,000, nhưng đừng quên chúng ta sản xuất nhiều hơn kế hoạch. Chẳng lẽ điều đó không có nghĩa là ta 'hấp thụ' (absorb) được nhiều chi phí hơn sao?",
            nextId: 'jules_logic'
        },
        'jules_logic': {
            id: 'jules_logic',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Trong kế toán chi phí hấp thụ, đúng là vậy. Lượng sản xuất cao hơn tạo ra Biến động Lượng có lợi. Thực tập sinh, hãy bóc tách nó ra. Cho tôi thấy phần chi tiêu thực tế và tác động của sản lượng.",
            choices: [
                { text: "Phân tích Định phí", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Đã rõ. Ta chi quá tay $30,000 (Expenditure Adverse), nhưng vì làm thêm được 500 đôi giày, ta có thêm $50,000 giá trị từ hiệu suất quy mô (Volume Favorable).",
            choices: [
                { text: "Lãi ròng $20,000 cho mảng Định phí.", nextId: 'jules_closing' }
            ]
        },
        'jules_closing': {
            id: 'jules_closing',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Làm tốt lắm. Giờ thì, màn chính đây. Tất cả các biến động này cần được hợp nhất vào một báo cáo vận hành tổng thể. CEO đang đợi đấy.",
            choices: [
                { text: "Chuẩn bị Báo cáo Vận hành", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Bạn đang nhầm lẫn giữa tiền thuê nhà và sản lượng rồi! Định phí không thay đổi theo lượng—chỉ có biến động mới thay đổi thôi. Sửa lại tư duy đi.",
            choices: [
                { text: "Tính toán lại Định phí", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE21_DATA: FixedOverheadScenario = {
    budgetedFixedOH: 500000,
    budgetedVolume: 5000,
    actualFixedOH: 530000,
    actualVolume: 5500
};
