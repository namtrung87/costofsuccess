import { DialogueNode, Language } from '../types';

export interface SalesVarianceScenario {
    standardSellingPrice: number;
    standardProfitPerUnit: number;
    budgetedQuantity: number;
    actualSellingPrice: number;
    actualQuantity: number;
}

export const PHASE18_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'MARKETING DEPARTMENT. 1 WEEK AFTER LAUNCH.',
            backgroundImage: 'BG_LOBBY',
            nextId: 'marketing_lead'
        },
        'marketing_lead': {
            id: 'marketing_lead',
            speaker: 'Marketing Lead',
            speakerTitle: 'Growth Hacker',
            characterId: 'CHAR_AVATAR_B',
            text: "The Cyber-Sneaker is viral! We've sold way more than the 5,000 pairs Jules budgeted for. We hit 6,500!",
            nextId: 'jules_skeptical'
        },
        'jules_skeptical': {
            id: 'jules_skeptical',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "That sounds great, but I see a lot of discount codes in the system. What was the average selling price?",
            nextId: 'marketing_reveal'
        },
        'marketing_reveal': {
            id: 'marketing_reveal',
            speaker: 'Marketing Lead',
            speakerTitle: 'Growth Hacker',
            characterId: 'CHAR_AVATAR_B',
            text: "Well, to keep the momentum, we lowered the price from $200 to $180 for the first month. But look at the volume!",
            nextId: 'jules_verdict'
        },
        'jules_verdict': {
            id: 'jules_verdict',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Volume is vanity, profit is sanity. Intern, calculate the Sales Variances. Did getting more volume at a lower price actually help our bottom line or hurt it?",
            choices: [
                { text: "Analyze Sales Data", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "I see. The $120,000 gain from extra volume (Favorable) was wiped out by a $130,000 loss from the price drop (Adverse). We're down $10,000 overall on sales performance.",
            choices: [
                { text: "Marketing owes us an apology.", nextId: 'jules_closing' }
            ]
        },
        'jules_closing': {
            id: 'jules_closing',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "In the board meeting, we call this 'Cannibalizing the Margin'. Lesson learned. Now, let's look at the factory.",
            choices: [
                { text: "Head to Production", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Your math is as messy as this marketing campaign! Get the variances right so I can talk to the CEO.",
            choices: [
                { text: "Recalculate", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'PHÒNG MARKETING. 1 TUẦN SAU KHI RA MẮT.',
            backgroundImage: 'BG_LOBBY',
            nextId: 'marketing_lead'
        },
        'marketing_lead': {
            id: 'marketing_lead',
            speaker: 'Trưởng phòng Marketing',
            speakerTitle: 'Growth Hacker',
            characterId: 'CHAR_AVATAR_B',
            text: "Cyber-Sneaker đang cực kỳ viral! Chúng ta đã bán vượt xa con số 5.000 đôi mà Jules kỳ vọng. Con số thực tế là 6.500 đôi!",
            nextId: 'jules_skeptical'
        },
        'jules_skeptical': {
            id: 'jules_skeptical',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Nghe thì hay đấy, nhưng tôi thấy rất nhiều mã giảm giá trong hệ thống. Giá bán trung bình thực tế là bao nhiêu?",
            nextId: 'marketing_reveal'
        },
        'marketing_reveal': {
            id: 'marketing_reveal',
            speaker: 'Trưởng phòng Marketing',
            speakerTitle: 'Growth Hacker',
            characterId: 'CHAR_AVATAR_B',
            text: "À thì, để giữ đà tăng trưởng, chúng tôi đã hạ giá từ $200 xuống $180 trong tháng đầu. Nhưng nhìn vào lượng bán mà xem!",
            nextId: 'jules_verdict'
        },
        'jules_verdict': {
            id: 'jules_verdict',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Doanh số là hào nhoáng, lợi nhuận mới là thực tế. Thực tập sinh, hãy tính toán các Biến động Doanh thu. Việc bán nhiều hơn với giá thấp hơn thực sự giúp ích hay đang làm hại túi tiền của chúng ta?",
            choices: [
                { text: "Phân tích Dữ liệu Bán hàng", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Tôi hiểu rồi. Khoản lời $120,000 từ việc bán thêm (Favorable) đã bị quét sạch bởi khoản lỗ $130,000 do giảm giá (Adverse). Tổng thể chúng ta đang hụt $10,000 trong mảng bán hàng.",
            choices: [
                { text: "Marketing nợ chúng ta một lời xin lỗi.", nextId: 'jules_closing' }
            ]
        },
        'jules_closing': {
            id: 'jules_closing',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Trong cuộc họp HĐQT, ta gọi đây là 'Tự xâu xé biên lợi nhuận'. Bài học rút ra rồi nhé. Giờ thì, hãy ngó qua phía xưởng sản xuất xem sao.",
            choices: [
                { text: "Tới khu sản xuất", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Phép tính của bạn lộn xộn y như cái chiến dịch marketing này vậy! Tính toán chính xác đi để tôi còn báo cáo CEO.",
            choices: [
                { text: "Tính toán lại", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE18_DATA: SalesVarianceScenario = {
    standardSellingPrice: 200,
    standardProfitPerUnit: 80, // From Phase 17
    budgetedQuantity: 5000,
    actualSellingPrice: 180,
    actualQuantity: 6500
};
