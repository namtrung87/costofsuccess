import { DialogueNode, Language } from '../types';

export interface OperatingStatementData {
    budgetedProfit: number;
    variances: {
        id: string;
        name: { EN: string, VI: string };
        value: number; // Positive is Favorable, Negative is Adverse (for the game logic we will handle signs)
        category: 'SALES_VOL' | 'SALES_PRICE' | 'MATERIAL' | 'LABOR' | 'VOH' | 'FOH' | 'MATERIAL_MIX' | 'MATERIAL_YIELD' | 'PLANNING' | 'OPERATIONAL';
    }[];
    actualProfit: number;
}

export const PHASE22_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'NEON DROP GLOBAL HQ. THE AUDIT VAULT.',
            backgroundImage: 'BG_VALUATION_ROOM',
            nextId: 'ceo_intro'
        },
        'ceo_intro': {
            id: 'ceo_intro',
            speaker: 'CEO',
            speakerTitle: 'The Controller',
            characterId: 'PROP_GATEKEEPER',
            text: "The Board is here. They see we made more sales, used cheaper materials, and hired cheaper labor—yet our bank account doesn't look as fat as they expected.",
            nextId: 'jules_challenge'
        },
        'jules_challenge': {
            id: 'jules_challenge',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "It's time to reconcile the 'Dream' with the 'Reality'. Intern, build the Operating Statement. Prove you can track every penny that bled out of this company.",
            nextId: 'ceo_final_word'
        },
        'ceo_final_word': {
            id: 'ceo_final_word',
            speaker: 'CEO',
            speakerTitle: 'The Controller',
            characterId: 'PROP_GATEKEEPER',
            text: "One mistake in the reconciliation and your clearance is revoked. Start with the Budgeted Profit and layer in every variance you found.",
            choices: [
                { text: "Enter the Audit Vault", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'CEO',
            speakerTitle: 'The Controller',
            characterId: 'PROP_GATEKEEPER',
            text: "Calculations verified. You've mapped the storm with 100% accuracy. The board is satisfied... for now.",
            choices: [
                { text: "Accept the Master Controller status.", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "The numbers don't balance! If the Operating Statement doesn't reach the Actual Profit, it's just a piece of fiction. Back to the vault!",
            choices: [
                { text: "Try Reconciliation Again", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'TRỤ SỞ NEON DROP TOÀN CẦU. CĂN HẦM KIỂM TOÁN.',
            backgroundImage: 'BG_VALUATION_ROOM',
            nextId: 'ceo_intro'
        },
        'ceo_intro': {
            id: 'ceo_intro',
            speaker: 'CEO',
            speakerTitle: 'Người Kiểm Soát',
            characterId: 'PROP_GATEKEEPER',
            text: "Hội đồng quản trị đang ở đây. Họ thấy chúng ta bán được nhiều hơn, dùng vải rẻ hơn, và thuê nhân công lương thấp hơn—vậy mà tài khoản ngân hàng không đầy như họ mong đợi.",
            nextId: 'jules_challenge'
        },
        'jules_challenge': {
            id: 'jules_challenge',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Đã đến lúc đối chiếu giữa 'Giấc mơ' và 'Thực tại'. Thực tập sinh, hãy lập Báo cáo Vận hành. Hãy chứng minh bạn có thể theo dấu từng xu đã thất thoát khỏi công ty này.",
            nextId: 'ceo_final_word'
        },
        'ceo_final_word': {
            id: 'ceo_final_word',
            speaker: 'CEO',
            speakerTitle: 'Người Kiểm Soát',
            characterId: 'PROP_GATEKEEPER',
            text: "Chỉ một sai sót nhỏ trong việc đối chiếu, quyền truy cập của bạn sẽ bị thu hồi. Bắt đầu từ Lợi nhuận Dự toán và đưa vào mọi biến động bạn đã tìm thấy.",
            choices: [
                { text: "Tiến vào Hầm Kiểm toán", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'CEO',
            speakerTitle: 'Người Kiểm Soát',
            characterId: 'PROP_GATEKEEPER',
            text: "Tính toán đã được xác minh. Bạn đã ánh xạ cơn bão với độ chính xác 100%. Hội đồng quản trị đã hài lòng... tạm thời là thế.",
            choices: [
                { text: "Nhận danh hiệu Bậc thầy Kiểm soát.", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Con số không khớp! Nếu Báo cáo Vận hành không khớp với Lợi nhuận Thực tế, nó chỉ là một tác phẩm hư cấu. Trở lại hầm ngay!",
            choices: [
                { text: "Đối chiếu lại", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE22_DATA: OperatingStatementData = {
    budgetedProfit: 400000, // 5000 units * $80 profit
    variances: [
        { id: 'svv', name: { EN: "Sales Volume Profit Variance", VI: "Biến động Lượng (Lợi nhuận)" }, value: 120000, category: 'SALES_VOL' },
        { id: 'spv', name: { EN: "Sales Price Variance", VI: "Biến động Giá bán" }, value: -130000, category: 'SALES_PRICE' },
        { id: 'mpv', name: { EN: "Material Price Variance", VI: "Biến động Giá Nguyên liệu" }, value: 46000, category: 'MATERIAL' },
        { id: 'muv', name: { EN: "Material Usage Variance", VI: "Biến động Lượng Nguyên liệu" }, value: -100000, category: 'MATERIAL' },
        { id: 'lrv', name: { EN: "Labor Rate Variance", VI: "Biến động Đơn giá Lương" }, value: 26000, category: 'LABOR' },
        { id: 'lev', name: { EN: "Labor Efficiency Variance", VI: "Biến động Hiệu suất Lương" }, value: -60000, category: 'LABOR' },
        { id: 'vox', name: { EN: "VOH Expenditure Variance", VI: "Biến động Chi tiêu VOH" }, value: -5000, category: 'VOH' },
        { id: 'vof', name: { EN: "VOH Efficiency Variance", VI: "Biến động Hiệu suất VOH" }, value: -20000, category: 'VOH' },
        { id: 'fox', name: { EN: "Fixed OH Expenditure Variance", VI: "Biến động Chi tiêu Định phí" }, value: -30000, category: 'FOH' },
        { id: 'fov', name: { EN: "Fixed OH Volume Variance", VI: "Biến động Lượng Định phí" }, value: 50000, category: 'FOH' },
        { id: 'mmx', name: { EN: "Material Mix Variance", VI: "Biến động Hợp phần NVL" }, value: -25000, category: 'MATERIAL_MIX' },
        { id: 'myd', name: { EN: "Material Yield Variance", VI: "Biến động Hiệu suất NVL" }, value: -15000, category: 'MATERIAL_YIELD' },
        { id: 'pnv', name: { EN: "Planning Price Variance", VI: "Biến động Lập kế hoạch (Giá)" }, value: -50000, category: 'PLANNING' },
        { id: 'opv', name: { EN: "Operational Price Variance", VI: "Biến động Vận hành (Giá)" }, value: -20000, category: 'OPERATIONAL' }
    ],
    actualProfit: 187000
    // Previous balance: 297,000
    // - 25,000 (Mix) = 272,000
    // - 15,000 (Yield) = 257,000
    // - 50,000 (Planning) = 207,000
    // - 20,000 (Operational) = 187,000

    // 400k (Budget) 
    // + 120k (Vol) = 520k (Std profit on actual sales)
    // - 130k (Price) = 390k
    // + 46k (Mat P) = 436k
    // - 100k (Mat U) = 336k
    // + 26k (Lab R) = 362k
    // - 60k (Lab E) = 302k
    // - 5k (VOH X) = 297k
    // - 20k (VOH E) = 277k
    // - 30k (FOH X) = 247k
    // + 50k (FOH V) = 297k
};
