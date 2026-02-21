import { DialogueNode, Language } from '../types';

export interface PerformanceCostItem {
    id: string;
    name: { EN: string, VI: string };
    amount: number;
    isControllable: boolean;
    description: { EN: string, VI: string };
}

export interface DivisionalScenario {
    divisionName: { EN: string, VI: string };
    revenue: number;
    variableCosts: number;
    items: PerformanceCostItem[];
}

export const PHASE34_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'NEON GROUP HEADQUARTERS. AUDIT CHAMBER.',
            backgroundImage: 'BG_OFFICE',
            nextId: 'jules_anger'
        },
        'jules_anger': {
            id: 'jules_anger',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "The manager of the 'Neon Fab' division is complaining. Their net profit is low, but they claim it's because the Group is charging them for things they can't control.",
            nextId: 'rob_defense'
        },
        'rob_defense': {
            id: 'rob_defense',
            speaker: 'Rob',
            speakerTitle: 'Neon Fab Manager',
            characterId: 'CHAR_ROB_ANGRY',
            text: "It's not fair! You're hitting my profit with the Group CEO's private jet maintenance and the head office rent in the city center. I don't decide those things!",
            nextId: 'jules_challenge'
        },
        'jules_challenge': {
            id: 'jules_challenge',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "He's right. To judge a manager fairly, we must look at the 'Controllable Profit'. Intern, audit the division's fixed costs. Strip away what the manager can't control.",
            choices: [
                { text: "Open Controllable Audit", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Audit complete. By removing the apportioned city-center overheads, we can see the manager actually performed brilliantly. Bonuses are restored.",
            choices: [
                { text: "Prepare for the Final Boss", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'Group CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "You're still including uncontrollable costs! A manager cannot be held responsible for costs allocated from the head office. Filter the list again.",
            choices: [
                { text: "Re-audit Division", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'TRỤ SỞ TẬP ĐOÀN NEON. PHÒNG KIỂM TOÁN.',
            backgroundImage: 'BG_OFFICE',
            nextId: 'jules_anger'
        },
        'jules_anger': {
            id: 'jules_anger',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Quản lý bộ phận 'Neon Fab' đang khiếu nại. Lợi nhuận ròng của họ thấp, nhưng họ khẳng định đó là vì Tập đoàn đang tính cho họ những chi phí mà họ không thể kiểm soát.",
            nextId: 'rob_defense'
        },
        'rob_defense': {
            id: 'rob_defense',
            speaker: 'Rob',
            speakerTitle: 'Quản lý Neon Fab',
            characterId: 'CHAR_ROB_ANGRY',
            text: "Thật không công bằng! Các người đang trừ vào lợi nhuận của tôi chi phí bảo trì chuyên cơ của CEO Tập đoàn và tiền thuê trụ sở chính ở trung tâm thành phố. Tôi đâu có quyết định những việc đó!",
            nextId: 'jules_challenge'
        },
        'jules_challenge': {
            id: 'jules_challenge',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_SMUG',
            text: "Ông ấy nói đúng. Để đánh giá một quản lý công bằng, chúng ta phải nhìn vào 'Lợi nhuận có thể kiểm soát'. Thực tập sinh, hãy kiểm toán các định phí của bộ phận. Loại bỏ những gì quản lý không thể kiểm soát.",
            choices: [
                { text: "Mở Kiểm toán Khả năng Kiểm soát", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Kiểm toán hoàn tất. Khi loại bỏ các chi phí phân bổ từ trụ sở chính, chúng ta thấy quản lý thực chất đã làm việc rất xuất sắc. Tiền thưởng đã được khôi phục.",
            choices: [
                { text: "Chuẩn bị cho Boss Cuối", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO Tập đoàn',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Bạn vẫn đang bao gồm các chi phí không thể kiểm soát! Một quản lý không thể chịu trách nhiệm cho các chi phí được phân bổ từ trụ sở chính. Hãy lọc lại danh sách.",
            choices: [
                { text: "Kiểm toán lại Bộ phận", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE34_DATA: DivisionalScenario = {
    divisionName: { EN: "Neon Fab", VI: "Neon Fab" },
    revenue: 1200000,
    variableCosts: 700000,
    items: [
        {
            id: 'labor',
            name: { EN: "Direct Production Labor", VI: "Nhân công trực tiếp sản xuất" },
            amount: 200000,
            isControllable: true,
            description: { EN: "Manager hires and sets shifts for fab workers.", VI: "Quản lý tuyển dụng và sắp ca cho công nhân fab." }
        },
        {
            id: 'city_rent',
            name: { EN: "Allocated City Headquarters Rent", VI: "Chi phí thuê Trụ sở Chính (Phân bổ)" },
            amount: 150000,
            isControllable: false,
            description: { EN: "Shared cost of the Group's main office in Neon City.", VI: "Chi phí sản xuất chung của văn phòng chính Tập đoàn tại Neon City." }
        },
        {
            id: 'local_power',
            name: { EN: "Fab Electricity & Utilities", VI: "Điện & Tiện ích tại Nhà máy" },
            amount: 50000,
            isControllable: true,
            description: { EN: "Fab manager monitors usage and efficiency.", VI: "Quản lý nhà máy giám sát việc sử dụng và hiệu quả." }
        },
        {
            id: 'ceo_jet',
            name: { EN: "Group CEO Travel Expenses", VI: "Chi phí đi lại của CEO Tập đoàn" },
            amount: 80000,
            isControllable: false,
            description: { EN: "Corporate travel costs for top executives.", VI: "Chi phí đi lại của các lãnh đạo cấp cao tập đoàn." }
        },
        {
            id: 'local_mkt',
            name: { EN: "Divisional Recruitment Marketing", VI: "Marketing Tuyển dụng của Bộ phận" },
            amount: 20000,
            isControllable: true,
            description: { EN: "Spent by the manager to find new talent.", VI: "Quản lý chi trả để tìm kiếm tài năng mới." }
        },
        {
            id: 'audit_fee',
            name: { EN: "External Statutory Audit Fee", VI: "Phí kiểm toán độc lập bắt buộc" },
            amount: 30000,
            isControllable: false,
            description: { EN: "Required by Law/Group policy, manager has no choice.", VI: "Bắt buộc theo Luật/Chính sách tập đoàn, quản lý không có lựa chọn." }
        }
    ]
};
// Math: Total Profit = 1.2M - 0.7M - (200k+150k+50k+80k+20k+30k) = 500k - 530k = -30k (Loss).
// Controllable Profit = 500k - (200k+50k+20k) = 500k - 270k = +230k (Profit).
