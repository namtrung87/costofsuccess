import { DialogueNode, Language } from '../types';

export interface PlanningOperationalScenario {
    originalStandardPrice: number;
    revisedStandardPrice: number;
    actualPrice: number;
    actualQuantity: number;
    itemName: { EN: string, VI: string };
}

export const PHASE25_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'EXECUTIVE SUITE. BUDGET REVISION MEETING.',
            backgroundImage: 'BG_OFFICE',
            nextId: 'jules_market'
        },
        'jules_market': {
            id: 'jules_market',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "The Board is breathing down Rob's neck for a $7,000 overspend on fabric. But it's not all his fault. The global market for Premium Fabric shifted after we set the budget.",
            nextId: 'rob_defense'
        },
        'rob_defense': {
            id: 'rob_defense',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_ANGRY',
            text: "Exactly! I can't control the market. I did my best to buy at $47 when the new market average was $45. My 'real' error is only $2 per meter.",
            nextId: 'jules_theory'
        },
        'jules_theory': {
            id: 'jules_theory',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Listen closely. The $5 shift from original standard to revised market is a Planning Variance. The $2 shift from market to actual is an Operational Variance. Intern, split the blame.",
            choices: [
                { text: "Allocate Variances", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Fair assessment. Rob is still accountable for the Operational part, but at least we're not firing him for things he can't control.",
            choices: [
                { text: "Prepare for the Final Reconciliation", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "You're mixing up 'bad planning' with 'bad performance'! The planning variance is the difference between the TWO standards. Try again.",
            choices: [
                { text: "Recalculate Blame", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'PHÒNG ĐIỀU HÀNH. HỌP ĐIỀU CHỈNH NGÂN SÁCH.',
            backgroundImage: 'BG_OFFICE',
            nextId: 'jules_market'
        },
        'jules_market': {
            id: 'jules_market',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Hội đồng quản trị đang đổ lỗi cho Rob vì chi vượt mức $7,000 tiền vải. Nhưng không hoàn toàn là lỗi của ông ấy. Thị trường toàn cầu đã biến động sau khi chúng ta lập ngân sách.",
            nextId: 'rob_defense'
        },
        'rob_defense': {
            id: 'rob_defense',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_ANGRY',
            text: "Chính xác! Tôi không thể kiểm soát thị trường. Tôi đã cố gắng hết sức để mua ở mức $47 khi giá trung bình thị trường mới là $45. Lỗi 'thực sự' của tôi chỉ là $2 mỗi mét thôi.",
            nextId: 'jules_theory'
        },
        'jules_theory': {
            id: 'jules_theory',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Nghe kĩ đây. Khoản chênh lệch $5 từ tiêu chuẩn ban đầu đến giá thị trường đã sửa đổi là Biến động Lập kế hoạch (Planning). Khoản chênh lệch $2 từ giá thị trường đến thực tế là Biến động Vận hành (Operational). Thực tập sinh, hãy chia lỗi đi.",
            choices: [
                { text: "Phân bổ Biến động", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Đánh giá công bằng. Rob vẫn phải chịu trách nhiệm cho phần Vận hành, nhưng ít nhất chúng ta không đuổi việc ông ấy vì những thứ ông ấy không thể kiểm soát.",
            choices: [
                { text: "Chuẩn bị cho Đối chiếu Cuối cùng", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Bạn đang nhầm lẫn giữa 'kế hoạch tồi' và 'thực hiện tồi' rồi! Biến động lập kế hoạch là chênh lệch giữa HAI mức tiêu chuẩn. Thử lại đi.",
            choices: [
                { text: "Tính toán lại", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE25_DATA: PlanningOperationalScenario = {
    originalStandardPrice: 40,
    revisedStandardPrice: 45,
    actualPrice: 47,
    actualQuantity: 1000,
    itemName: { EN: "Premium Fabric", VI: "Vải Cao Cấp" }
};
