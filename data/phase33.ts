import { DialogueNode, Language } from '../types';

export type Perspective = 'FINANCIAL' | 'CUSTOMER' | 'INTERNAL_PROCESS' | 'LEARNING_GROWTH';

export interface ScorecardObjective {
    id: string;
    text: { EN: string, VI: string };
    perspective: Perspective;
}

export interface ScorecardScenario {
    objectives: ScorecardObjective[];
}

export const PHASE33_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'NEON GROUP STRATEGY SUITE.',
            backgroundImage: 'BG_OFFICE',
            nextId: 'jules_bored'
        },
        'jules_bored': {
            id: 'jules_bored',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "The Board room is tired of looking at profit charts. They say we're winning the battle but losing the war because our customers are unhappy and our tech is outdated.",
            nextId: 'jules_vision'
        },
        'jules_vision': {
            id: 'jules_vision',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "We need a Balanced Scorecard. It's not just about money (Financial). It's about how the Customer feels, how smooth our Processes are, and how much our staff is Learning.",
            nextId: 'jules_task'
        },
        'jules_task': {
            id: 'jules_task',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "I have a list of targets. Categorize them into the four perspectives. If we get the balance right, the profit will follow automatically.",
            choices: [
                { text: "Launch Scorecard Linker", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Perfectly balanced, as all things should be. The Board can now see the 'engine' behind the money. We're building a sustainable empire.",
            choices: [
                { text: "Next: Divisional Performance", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "You're confusing 'Staff Training' with 'Profit'. One is a cause (Learning), the other is a result (Financial). Check your logic and re-categorize.",
            choices: [
                { text: "Recalibrate Strategy", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'PHÒNG CHIẾN LƯỢC TẬP ĐOÀN NEON.',
            backgroundImage: 'BG_OFFICE',
            nextId: 'jules_bored'
        },
        'jules_bored': {
            id: 'jules_bored',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Hội đồng quản trị đã chán ngấy việc nhìn vào các biểu đồ lợi nhuận rồi. Họ nói chúng ta đang thắng trận đánh nhưng thua cả cuộc chiến vì khách hàng không hài lòng và công nghệ lạc hậu.",
            nextId: 'jules_vision'
        },
        'jules_vision': {
            id: 'jules_vision',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_SMUG',
            text: "Chúng ta cần một Thẻ điểm cân bằng (BSC). Nó không chỉ là về tiền (Tài chính). Nó còn là về cảm nhận của Khách hàng, quy trình (Vận hành) trơn tru thế nào và nhân viên Học hỏi được bao nhiêu.",
            nextId: 'jules_task'
        },
        'jules_task': {
            id: 'jules_task',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_SMUG',
            text: "Tôi có một danh sách các mục tiêu. Hãy phân loại chúng vào 4 khía cạnh. Nếu chúng ta đạt được sự cân bằng, lợi nhuận sẽ tự khắc theo sau.",
            choices: [
                { text: "Khởi động Bộ kết nối Thẻ điểm", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Sự cân bằng hoàn hảo. Hội đồng quản trị hiện có thể thấy 'cỗ máy' đằng sau những đồng tiền. Chúng ta đang xây dựng một đế chế bền vững.",
            choices: [
                { text: "Tiếp theo: Hiệu suất bộ phận", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Bạn đang nhầm lẫn 'Đào tạo nhân viên' với 'Lợi nhuận' rồi. Một cái là nguyên nhân (Học hỏi), cái kia là kết cục (Tài chính). Hãy kiểm tra logic và phân loại lại.",
            choices: [
                { text: "Hiệu chỉnh Chiến lược", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE33_DATA: ScorecardScenario = {
    objectives: [
        {
            id: 'roi',
            text: { EN: "Increase Return on Investment (ROI)", VI: "Tăng Tỷ suất hoàn vốn (ROI)" },
            perspective: 'FINANCIAL'
        },
        {
            id: 'churn',
            text: { EN: "Reduce Customer Churn Rate", VI: "Giảm Tỷ lệ rời bỏ của khách hàng" },
            perspective: 'CUSTOMER'
        },
        {
            id: 'cycle',
            text: { EN: "Reduce Manufacturing Cycle Time", VI: "Giảm Thời gian chu kỳ sản xuất" },
            perspective: 'INTERNAL_PROCESS'
        },
        {
            id: 'skills',
            text: { EN: "Employee Skill Certifications", VI: "Chứng chỉ Kỹ năng của nhân viên" },
            perspective: 'LEARNING_GROWTH'
        },
        {
            id: 'errors',
            text: { EN: "Reduce Order Processing Errors", VI: "Giảm Lỗi xử lý đơn hàng" },
            perspective: 'INTERNAL_PROCESS'
        },
        {
            id: 'loyalty',
            text: { EN: "Net Promoter Score (NPS) Improvement", VI: "Cải thiện Chỉ số đo lường sự hài lòng (NPS)" },
            perspective: 'CUSTOMER'
        }
    ]
};
