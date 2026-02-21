import { DialogueNode, Language } from '../types';

export const PHASE23_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'CITADEL SUMMIT. NEON DROP CEREMONY.',
            backgroundImage: 'BG_ROOFTOP',
            nextId: 'jules_congrats'
        },
        'jules_congrats': {
            id: 'jules_congrats',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "You did it. In the middle of a reality storm, you kept the financial blueprints alive. You've identified every leak, every waste, and every hidden gain.",
            nextId: 'ceo_final'
        },
        'ceo_final': {
            id: 'ceo_final',
            speaker: 'CEO',
            speakerTitle: 'The Controller',
            characterId: 'PROP_GATEKEEPER',
            text: "Variance analysis is not about blaming Rob or Marketing. It's about learning. You've proven you can convert chaos into control.",
            nextId: 'award'
        },
        'award': {
            id: 'award',
            speaker: 'System',
            text: "PROMOTION GRANTED: MASTER CONTROLLER. YOU HAVE COMPLETED SEASON 3.",
            choices: [
                { text: "View Performance Analytics", nextId: 'VICTORY' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'ĐỈNH CITADEL. LỄ KỶ NIỆM NEON DROP.',
            backgroundImage: 'BG_ROOFTOP',
            nextId: 'jules_congrats'
        },
        'jules_congrats': {
            id: 'jules_congrats',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Bạn đã làm được. Giữa cơn bão thực tại, bạn đã giữ cho các bản thiết kế tài chính luôn vững vàng. Bạn đã chỉ ra mọi rò rỉ, mọi lãng phí và mọi khoản lãi tiềm ẩn.",
            nextId: 'ceo_final'
        },
        'ceo_final': {
            id: 'ceo_final',
            speaker: 'CEO',
            speakerTitle: 'Người Kiểm Soát',
            characterId: 'PROP_GATEKEEPER',
            text: "Phân tích biến động không phải là để đổ lỗi cho Rob hay Marketing. Đó là để học hỏi. Bạn đã chứng minh mình có thể biến sự hỗn loạn thành sự kiểm soát.",
            nextId: 'award'
        },
        'award': {
            id: 'award',
            speaker: 'Hệ thống',
            text: "THĂNG CHỨC: BẬC THẦY KIỂM SOÁT. BẠN ĐÃ HOÀN THÀNH PHẦN 3.",
            choices: [
                { text: "Xem Phân tích Hiệu suất", nextId: 'VICTORY' }
            ]
        }
    }
};
