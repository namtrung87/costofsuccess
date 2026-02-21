import { DialogueNode, Language } from '../types';

export interface TransferPricingScenario {
    sellerName: { EN: string, VI: string };
    buyerName: { EN: string, VI: string };
    itemName: { EN: string, VI: string };
    sellerMarginalCost: number;
    sellerOpportunityCost: number; // e.g. Lost external contribution if no spare capacity
    buyerExternalPrice: number;
}

export const PHASE31_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'NEON GROUP PENTHOUSE. THE NEGOTIATION TABLE.',
            backgroundImage: 'BG_OFFICE',
            nextId: 'jules_intro'
        },
        'jules_intro': {
            id: 'jules_intro',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Welcome to the big leagues, Intern. Neon Group is now a conglomerate. But we have a problem: our 'Fab' division and 'Retail' division are at war over prices.",
            nextId: 'rob_complaint'
        },
        'rob_complaint': {
            id: 'rob_complaint',
            speaker: 'Rob',
            speakerTitle: 'Neon Fab Manager',
            characterId: 'CHAR_ROB_ANGRY',
            text: "Retail wants me to give them hoodies for $50, but it costs me $40 just to make them, and I could sell them outside for $70! I'm losing my bonus if I sell cheap to them.",
            nextId: 'retail_manager'
        },
        'retail_manager': {
            id: 'retail_manager',
            speaker: 'Manager X',
            speakerTitle: 'Neon Retail Manager',
            characterId: 'CHAR_KAI_SMUG', // Reusing asset for new character vibe
            text: "And I can buy generic hoodies from the market for $65. Why should I pay Fab more than that? We need to find a 'Goal Congruent' price.",
            nextId: 'jules_logic'
        },
        'jules_logic': {
            id: 'jules_logic',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "A good transfer price motivates both managers while making the Group profit. Set the slider. Find the range where both say yes and the Group wins.",
            choices: [
                { text: "Open Negotiation Slider", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Clean negotiation. You've balanced the seller's floor and the buyer's ceiling. The Group remains unified.",
            choices: [
                { text: "Next: The Efficiency Duel", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "You're either starving the seller or robbing the buyer! If the price is too high, Retail will buy outside. If too low, Fab will refuse to sell. Try again.",
            choices: [
                { text: "Adjust the Deal", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'PENTHOUSE TẬP ĐOÀN NEON. BÀN ĐÀM PHÁN.',
            backgroundImage: 'BG_OFFICE',
            nextId: 'jules_intro'
        },
        'jules_intro': {
            id: 'jules_intro',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Chào mừng đến với giải đấu lớn, Thực tập sinh. Tập đoàn Neon hiện là một đại tập đoàn. Nhưng chúng ta có vấn đề: bộ phận 'Sản xuất' và 'Bán lẻ' đang mâu thuẫn về giá nội bộ.",
            nextId: 'rob_complaint'
        },
        'rob_complaint': {
            id: 'rob_complaint',
            speaker: 'Rob',
            speakerTitle: 'Quản lý Neon Fab',
            characterId: 'CHAR_ROB_ANGRY',
            text: "Bán lẻ muốn tôi giao hoodie với giá $50, nhưng tôi tốn $40 để làm và có thể bán ra ngoài với giá $70! Tôi sẽ mất thưởng nếu bán rẻ cho họ.",
            nextId: 'retail_manager'
        },
        'retail_manager': {
            id: 'retail_manager',
            speaker: 'Manager X',
            speakerTitle: 'Quản lý Neon Retail',
            characterId: 'CHAR_KAI_SMUG',
            text: "Và tôi có thể mua hoodie phổ thông ngoài thị trường với giá $65. Tại sao tôi phải trả cho Sản xuất nhiều hơn thế? Chúng ta cần một mức giá 'Hòa hợp mục tiêu'.",
            nextId: 'jules_logic'
        },
        'jules_logic': {
            id: 'jules_logic',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_SMUG',
            text: "Một mức giá chuyển giao tốt sẽ thúc đẩy cả hai quản lý trong khi vẫn giúp Tập đoàn có lãi. Hãy điều chỉnh thanh trượt. Tìm khoảng giá mà cả hai đều đồng ý và Tập đoàn chiến thắng.",
            choices: [
                { text: "Mở Thanh Đàm phán", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Đàm phán sắc sảo. Bạn đã cân bằng được mức sàn của người bán và mức trần của người mua. Tập đoàn vẫn giữ được sự thống nhất.",
            choices: [
                { text: "Tiếp theo: Cuộc đấu hiệu suất", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Bạn đang bỏ đói người bán hoặc trấn lột người mua rồi! Nếu giá quá cao, Bán lẻ sẽ mua ngoài. Nếu quá thấp, Sản xuất sẽ từ chối bán. Thử lại đi.",
            choices: [
                { text: "Điều chỉnh lại Kèo", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE31_DATA: TransferPricingScenario = {
    sellerName: { EN: "Neon Fab", VI: "Neon Fab (Sản xuất)" },
    buyerName: { EN: "Neon Retail", VI: "Neon Retail (Bán lẻ)" },
    itemName: { EN: "Signature Glitch-Hoodie", VI: "Áo Glitch-Hoodie Đặc trưng" },
    sellerMarginalCost: 40,
    sellerOpportunityCost: 20, // $70 market price - $40 cost = $30 lost per unit? 
    // Wait, let's simplify for the slider:
    // Min Price (Seller) = Marginal Cost + Opportunity Cost.
    // In the example dialogue: Market price is $70, Cost is $40. 
    // If Fab sells to Retail, they lose $30 contribution per unit.
    // So Min Price = $40 + $30 = $70.
    // But Retail can buy for $65 outside. 
    // In this case, the Group profit says Retail SHOULD buy outside because $65 < $70 (Fab's true cost to group).
    // Let's adjust numbers to make an internal trade beneficial.
    buyerExternalPrice: 65,
};

// Adjusted for internal benefit:
// Fab Market Price = $60, Cost = $40 -> Opportunity Cost = $20. Min Price = $60.
// Retail can buy outside for $65.
// Min = $60, Max = $65. Internal trade saves Group $5.
export const PHASE31_DATA_FINAL: TransferPricingScenario = {
    sellerName: { EN: "Neon Fab", VI: "Neon Fab (Sản xuất)" },
    buyerName: { EN: "Neon Retail", VI: "Neon Retail (Bán lẻ)" },
    itemName: { EN: "Signature Glitch-Hoodie", VI: "Áo Glitch-Hoodie Đặc trưng" },
    sellerMarginalCost: 40,
    sellerOpportunityCost: 20,
    buyerExternalPrice: 65,
};
