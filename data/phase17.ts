import { DialogueNode, Language } from '../types';

export interface StandardCostElement {
    id: string;
    name: string;
    standardQuantity: number;
    standardPrice: number;
    unit: string;
}

export interface Phase17Data {
    sellingPrice: number;
    elements: StandardCostElement[];
}

export const PHASE17_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'NEON DROP HQ. THE MASTER CONTROL ROOM.',
            backgroundImage: 'BG_COMMAND_CENTER',
            nextId: 'jules_intro'
        },
        'jules_intro': {
            id: 'jules_intro',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Season 3. The mass production era. We can't track every thread manually anymore. We need a 'Standard'—a financial blueprint for every item we make.",
            nextId: 'rob_input'
        },
        'rob_input': {
            id: 'rob_input',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "I've talked to the engineers. For the new 'Cyber-Sneaker', we should use exactly 1.5 meters of premium fabric and it should take a pro about 2 hours to assemble.",
            nextId: 'jules_warning'
        },
        'jules_warning': {
            id: 'jules_warning',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "If you set the bar too low, we lose profits. Too high, and the team will burn out trying to hit impossible targets. Intern, build the Master Card. This is the truth we'll be measured against.",
            choices: [
                { text: "Open Blueprint Tool", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Perfect. The blueprint is locked. $120 total standard cost with a $200 selling price. That's an expected $80 profit per pair.",
            choices: [
                { text: "What if things change?", nextId: 'jules_closing' }
            ]
        },
        'jules_closing': {
            id: 'jules_closing',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Oh, they will. Reality is messy, Intern. And that's where 'Variance' comes in. But for now, we have our plan.",
            choices: [
                { text: "Onward to the Launch", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "These numbers don't add up! Check Rob's specs again. We need a valid standard cost card.",
            choices: [
                { text: "Review Specs", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'TRỤ SỞ NEON DROP. PHÒNG ĐIỀU KHIỂN TRUNG TÂM.',
            backgroundImage: 'BG_COMMAND_CENTER',
            nextId: 'jules_intro'
        },
        'jules_intro': {
            id: 'jules_intro',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Season 3. Kỷ nguyên sản xuất hàng loạt. Chúng ta không thể theo dõi từng sợi chỉ bằng tay nữa. Ta cần một 'Định mức'—một bản thiết kế tài chính cho mọi sản phẩm.",
            nextId: 'rob_input'
        },
        'rob_input': {
            id: 'rob_input',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "Tôi đã bàn với kỹ sư. Cho dòng 'Cyber-Sneaker' mới, ta nên dùng chính xác 1.5 mét vải xịn và một thợ lành nghề mất khoảng 2 giờ để lắp ráp.",
            nextId: 'jules_warning'
        },
        'jules_warning': {
            id: 'jules_warning',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Nếu đặt mục tiêu quá thấp, ta mất lợi nhuận. Quá cao, đội ngũ sẽ kiệt sức vì những con số bất khả thi. Thực tập sinh, hãy xây dựng Thẻ Định Mức. Đây là sự thật mà chúng ta sẽ dùng để đối chiếu.",
            choices: [
                { text: "Mở Công cụ Thiết kế", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Hoàn hảo. Bản thiết kế đã khóa. Tổng chi phí định mức $120 với giá bán $200. Lợi nhuận kỳ vọng là $80 mỗi đôi.",
            choices: [
                { text: "Nếu thực tế thay đổi thì sao?", nextId: 'jules_closing' }
            ]
        },
        'jules_closing': {
            id: 'jules_closing',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Ồ, chắc chắn sẽ thay đổi. Thực tế luôn hỗn loạn, Thực tập sinh ạ. Và đó là lúc 'Biến động' (Variance) xuất hiện. Nhưng hiện tại, ta đã có kế hoạch.",
            choices: [
                { text: "Tiến tới đợt ra mắt", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Mấy con số này không khớp! Kiểm tra lại thông số của Rob đi. Ta cần một thẻ định mức hợp lý.",
            choices: [
                { text: "Xem lại thông số", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE17_DATA: Phase17Data = {
    sellingPrice: 200,
    elements: [
        { id: 'mat', name: 'Premium Fabric', standardQuantity: 1.5, standardPrice: 40, unit: 'm' },
        { id: 'lab', name: 'Skilled Labor', standardQuantity: 2, standardPrice: 30, unit: 'hrs' }
    ]
};
