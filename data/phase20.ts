import { DialogueNode, Language } from '../types';

export interface LaborVOHScenario {
    standardLaborRate: number;
    standardLaborHoursPerUnit: number;
    standardVOHRate: number; // per labor hour
    actualLaborRate: number;
    actualLaborHours: number; // total
    actualVOH: number; // total
    actualUnitsProduced: number;
}

export const PHASE20_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'ASSEMBLY LINE B. 3:00 PM.',
            backgroundImage: 'BG_TECH_ROOM',
            nextId: 'kai_frustrated'
        },
        'kai_frustrated': {
            id: 'kai_frustrated',
            speaker: 'Kai',
            speakerTitle: 'Lead Designer',
            characterId: 'CHAR_KAI_STRESSED',
            text: "The sneakers are taking forever to finish. The new 'economy' team HR hired is saving us $2 an hour, but they're still learning the patterns.",
            nextId: 'rob_voh'
        },
        'rob_voh': {
            id: 'rob_voh',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "It's not just the wages, Kai. Because the line is moving slower, we're burning more electricity and industrial glue per unit. The Variable Overheads are bleeding out.",
            nextId: 'jules_math'
        },
        'jules_math': {
            id: 'jules_math',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "The efficiency trap. Lower wages leads to slower work, which spikes our overheads. Intern, sync the data. I want to see the combined impact of Labor and VOH variances.",
            choices: [
                { text: "Open Efficiency Synchro", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Ugly numbers. We saved $26,000 on Labor Rate, but lost $60,000 in Efficiency. And that efficiency loss triggered another $20,000 in VOH waste.",
            choices: [
                { text: "Cheap labor costs us more.", nextId: 'jules_closing' }
            ]
        },
        'jules_closing': {
            id: 'jules_closing',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "It's a classic P1 mistake. We need to invest in training. But wait—we still haven't checked the factory rent performance.",
            choices: [
                { text: "Analyze Fixed Overheads", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "You can't even clock a worker's time correctly! Try the synchro again if you want to keep your internship.",
            choices: [
                { text: "Recalculate Synchro", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'DÂY CHUYỀN LẮP RÁP B. 3:00 CHIỀU.',
            backgroundImage: 'BG_TECH_ROOM',
            nextId: 'kai_frustrated'
        },
        'kai_frustrated': {
            id: 'kai_frustrated',
            speaker: 'Kai',
            speakerTitle: 'Thiết kế trưởng',
            characterId: 'CHAR_KAI_STRESSED',
            text: "Mấy đôi giày này may mãi không xong. Đội ngũ 'tiết kiệm' mà HR thuê giúp ta bớt được $2 mỗi giờ, nhưng họ vẫn đang phải học cách may.",
            nextId: 'rob_voh'
        },
        'rob_voh': {
            id: 'rob_voh',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "Không chỉ là tiền lương đâu, Kai. Vì dây chuyền chạy chậm, chúng ta đang tốn thêm điện và keo dán công nghiệp trên từng sản phẩm. Biến phí sản xuất đang rò rỉ.",
            nextId: 'jules_math'
        },
        'jules_math': {
            id: 'jules_math',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Cái bẫy hiệu suất. Lương thấp dẫn đến làm chậm, làm tăng chi phí sản xuất chung. Thực tập sinh, hãy đồng bộ dữ liệu. Tôi muốn thấy tác động kết hợp của biến động Nhân công và VOH.",
            choices: [
                { text: "Mở Đồng bộ Hiệu suất", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Con số thật tệ. Ta tiết kiệm được $26,000 từ Đơn giá lương, nhưng lỗ $60,000 do Hiệu suất kém. Và sự kém hiệu suất đó kéo theo $20,000 lãng phí VOH.",
            choices: [
                { text: "Nhân công rẻ khiến ta tốn nhiều hơn.", nextId: 'jules_closing' }
            ]
        },
        'jules_closing': {
            id: 'jules_closing',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Đó là một sai lầm kinh điển. Chúng ta cần đầu tư vào đào tạo. Nhưng chờ đã—ta vẫn chưa kiểm tra tiền thuê nhà máy.",
            choices: [
                { text: "Phân tích Định phí", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Bạn thậm chí không tính nổi giờ làm của công nhân! Thử đồng bộ lại đi nếu còn muốn giữ ghế thực tập.",
            choices: [
                { text: "Tính toán lại", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE20_DATA: LaborVOHScenario = {
    standardLaborRate: 30,
    standardLaborHoursPerUnit: 2,
    standardVOHRate: 10, // per labor hour
    actualLaborRate: 28, // Favorable rate
    actualLaborHours: 13000,
    actualVOH: 135000,
    actualUnitsProduced: 5500
};
