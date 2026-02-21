import { DialogueNode, Language } from '../types';

export interface ContributionData {
    sellingPrice: number;
    variableCost: number;
    fixedCostTotal: number;
    expectedUnits: number;
    targetContribution: number; // Solution
}

export const PHASE13_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'DESIGN LAB: NEON DROP DROP. 10:00 AM.',
            backgroundImage: 'BG_DESIGN_LAB',
            nextId: 'kai_excited'
        },
        'kai_excited': {
            id: 'kai_excited',
            speaker: 'Kai',
            speakerTitle: 'Lead Designer',
            characterId: 'CHAR_KAI_CONFIDENT',
            text: "The 'Hypebeast Cartel' wants to buy 5,000 units of our new Holographic Jacket! But they only want to pay $50 each.",
            nextId: 'rob_interjects'
        },
        'rob_interjects': {
            id: 'rob_interjects',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_ANGRY',
            text: "Are you insane, Kai? Under Absorption Costing, our total cost per unit is $65! If we sell at $50, we lose $15 on every jacket! Reject the deal.",
            nextId: 'kai_pleads'
        },
        'kai_pleads': {
            id: 'kai_pleads',
            speaker: 'Kai',
            speakerTitle: 'Lead Designer',
            characterId: 'CHAR_KAI_STRESSED',
            text: "But the clout! The exposure! We need this drop. You're the numbers person, there has to be a way to make it look good on paper.",
            choices: [
                { text: "Let me look at the breakdown.", nextId: 'jules_enters' }
            ]
        },
        'jules_enters': {
            id: 'jules_enters',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Rob is looking at the 'Full Cost'. It includes a chunk of our regular factory rent. But we pay that rent anyway, right? Pull up the Marginal Costing Calculator.",
            choices: [
                { text: "What's the goal here?", nextId: 'jules_explain' }
            ]
        },
        'jules_explain': {
            id: 'jules_explain',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Peel away the Fixed Costs out of that $65. Focus only on the Variable Costs (Materials & Labor). As long as the $50 Selling Price covers the Variable Costs, every jacket brings in a 'Contribution' towards our fixed expenses.",
            nextId: 'start_game'
        },
        'start_game': {
            id: 'start_game',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Use the slider to separate the Fixed Cost from the Total Cost. Find our true Contribution Margin per unit.",
            choices: [
                { text: "Run Calculator", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Exactly. The Variable Cost is $40. Selling at $50 gives us a $10 Contribution Margin per unit. That's $50,000 total contribution! Rob, we're taking the deal.",
            choices: [
                { text: "We made money?", nextId: 'rob_surprised' }
            ]
        },
        'rob_surprised': {
            id: 'rob_surprised',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "I... I guess? If the fixed costs are already covered by our normal sales, this special order is pure extra cash towards the bottom line. I'll prep the warehouse.",
            choices: [
                { text: "Next Phase", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "You didn't separate the costs correctly. Contribution Margin = Selling Price - Variable Cost. Go recalculate it before we lose this deal.",
            choices: [
                { text: "I'll try again.", nextId: 'END_PHASE' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'PHÒNG THIẾT KẾ: KẾ HOẠCH MỚI. 10:00 SÁNG.',
            backgroundImage: 'BG_DESIGN_LAB',
            nextId: 'kai_excited'
        },
        'kai_excited': {
            id: 'kai_excited',
            speaker: 'Kai',
            speakerTitle: 'Lead Designer',
            characterId: 'CHAR_KAI_CONFIDENT',
            text: "Bọn 'Hypebeast Cartel' muốn mua 5,000 cái Áo khoác Hologram mới của mình! Nhưng họ chỉ chịu trả $50 một cái.",
            nextId: 'rob_interjects'
        },
        'rob_interjects': {
            id: 'rob_interjects',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_ANGRY',
            text: "Cậu điên à Kai? Tính theo Toàn bộ chi phí (Absorption Costing), giá vốn đã là $65/cái rồi! Bán $50 thì lỗ $15 mỗi cái à! Hủy kèo ngay.",
            nextId: 'kai_pleads'
        },
        'kai_pleads': {
            id: 'kai_pleads',
            speaker: 'Kai',
            speakerTitle: 'Lead Designer',
            characterId: 'CHAR_KAI_STRESSED',
            text: "Nhưng cái tiếng tăm! Sự lan tỏa! Mình cần vụ này. Cậu là dân số liệu, phải có cách nào làm cho nó trông có lãi trên giấy tờ chứ.",
            choices: [
                { text: "Để tôi xem chi tiết.", nextId: 'jules_enters' }
            ]
        },
        'jules_enters': {
            id: 'jules_enters',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Rob đang nhìn vào 'Toàn bộ Chi phí'. Nó bao gồm cả một phần tiền thuê nhà máy cố định. Nhưng đằng nào chúng ta chả phải trả tiền thuê nhà? Mở Máy tính Marginal Costing lên.",
            choices: [
                { text: "Mục tiêu là gì vậy chị?", nextId: 'jules_explain' }
            ]
        },
        'jules_explain': {
            id: 'jules_explain',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Bóc cái phần Định phí ra khỏi con số $65 đó. Chỉ tập trung vào Biến phí (Nguyên liệu & Nhân công). Chừng nào Giá bán $50 còn bù đắp được Biến phí, mỗi cái áo sẽ mang lại một khoản 'Đảm phí' (Contribution) góp phần trả tiền thuê nhà.",
            nextId: 'start_game'
        },
        'start_game': {
            id: 'start_game',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Dùng thanh trượt để kéo phần Định phí ra khỏi Tổng chi phí. Tìm ra Số dư Đảm phí (Contribution Margin) thực sự trên mỗi sản phẩm.",
            choices: [
                { text: "Mở Máy tính", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Chính xác. Biến phí là $40. Bán $50 thì ta có Số dư Đảm phí $10/cái. Tổng cộng là $50,000 contribution! Rob, chúng ta nhận kèo này.",
            choices: [
                { text: "Vậy là mình có lãi?", nextId: 'rob_surprised' }
            ]
        },
        'rob_surprised': {
            id: 'rob_surprised',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "Tôi... tôi nghĩ vậy? Vì dù sao tiền thuê nhà cũng đã được các mặt hàng bình thường chi trả hết, đơn hàng đặc biệt này sẽ tạo ra tiền lãi ròng. Tôi đi chuẩn bị kho đây.",
            choices: [
                { text: "Màn tiếp theo", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Cưng chưa tách chi phí đúng. Đảm phí = Giá Bán - Biến Phí. Tính lại ngay đi trước khi mất hợp đồng lớn mâm.",
            choices: [
                { text: "Đã hiểu.", nextId: 'END_PHASE' }
            ]
        }
    }
};

export const PHASE13_DATA = {
    sellingPrice: 50,
    totalAbsorptionCost: 65,
    variableCost: 40,
    fixedCostIncluded: 25,
    targetContribution: 10
};
