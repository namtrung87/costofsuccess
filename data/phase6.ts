import { DialogueNode, Language } from '../types';

export interface ApportionmentMathProblem {
    id: string;
    costName: string;
    totalCost: number;
    basisName: string;
    basisTotal: number;
    targetDept: string;
    targetBasisValue: number;
    correctAmount: number;
    hint: string;
}

export const PHASE6_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
  EN: {
    'start': {
        id: 'start',
        speaker: 'System',
        text: 'SECTOR 6: THE MATH LAB. 14:30 PM.',
        backgroundImage: 'BG_OPS_CENTER',
        nextId: 'jules_math'
    },
    'jules_math': {
        id: 'jules_math',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "You categorized the costs (Phase 5). Now you have to calculate the split. This is where most interns quit.",
        nextId: 'explanation'
    },
    'explanation': {
        id: 'explanation',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Formula: (Dept Basis / Total Basis) * Total Cost. It’s a simple ratio. Don't overthink it.",
        choices: [
            { text: "Start Calculation", nextId: 'START_GAME' }
        ]
    },
    'post_game': {
        id: 'post_game',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Numbers look solid. You've split the Rent and Power bills fairly. Rob can't complain now.",
        choices: [
            { text: "Deliver the Budget (Phase 7)", nextId: 'END_PHASE' }
        ]
    }
  },
  VI: {
    'start': {
        id: 'start',
        speaker: 'Hệ thống',
        text: 'KHU VỰC 6: PHÒNG TÍNH TOÁN. 14:30 CHIỀU.',
        backgroundImage: 'BG_OPS_CENTER',
        nextId: 'jules_math'
    },
    'jules_math': {
        id: 'jules_math',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Cưng đã phân loại chi phí rồi (Màn 5). Giờ phải tính toán chia tiền. Đây là lúc thực tập sinh bỏ cuộc nhiều nhất.",
        nextId: 'explanation'
    },
    'explanation': {
        id: 'explanation',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Công thức: (Tiêu thức Bộ phận / Tổng Tiêu thức) * Tổng Chi phí. Tỷ lệ đơn giản thôi. Đừng nghĩ phức tạp.",
        choices: [
            { text: "Bắt đầu Tính toán", nextId: 'START_GAME' }
        ]
    },
    'post_game': {
        id: 'post_game',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Số liệu ổn đấy. Cưng đã chia tiền Thuê và Điện công bằng. Rob hết lý do phàn nàn rồi.",
        choices: [
            { text: "Giao Ngân sách (Màn 7)", nextId: 'END_PHASE' }
        ]
    }
  }
};

export const MATH_PROBLEMS: Record<Language, ApportionmentMathProblem[]> = {
  EN: [
    {
        id: '1',
        costName: 'Rent',
        totalCost: 20000,
        basisName: 'Floor Area (sq m)',
        basisTotal: 4000,
        targetDept: 'Sewing',
        targetBasisValue: 2000,
        correctAmount: 10000,
        hint: "(2000 / 4000) * 20,000"
    },
    {
        id: '2',
        costName: 'Electricity',
        totalCost: 5000,
        basisName: 'Machine Capacity (kW)',
        basisTotal: 100,
        targetDept: 'Cutting',
        targetBasisValue: 20,
        correctAmount: 1000,
        hint: "(20 / 100) * 5,000"
    },
    {
        id: '3',
        costName: 'Canteen Subsidy',
        totalCost: 8000,
        basisName: 'Employees',
        basisTotal: 80,
        targetDept: 'Maintenance',
        targetBasisValue: 8,
        correctAmount: 800,
        hint: "(8 / 80) * 8,000"
    }
  ],
  VI: [
    {
        id: '1',
        costName: 'Tiền Thuê',
        totalCost: 20000,
        basisName: 'Diện tích (m2)',
        basisTotal: 4000,
        targetDept: 'May (Sewing)',
        targetBasisValue: 2000,
        correctAmount: 10000,
        hint: "(2000 / 4000) * 20,000"
    },
    {
        id: '2',
        costName: 'Tiền Điện',
        totalCost: 5000,
        basisName: 'Công suất (kW)',
        basisTotal: 100,
        targetDept: 'Cắt (Cutting)',
        targetBasisValue: 20,
        correctAmount: 1000,
        hint: "(20 / 100) * 5,000"
    },
    {
        id: '3',
        costName: 'Trợ cấp Canteen',
        totalCost: 8000,
        basisName: 'Số nhân viên',
        basisTotal: 80,
        targetDept: 'Bảo trì',
        targetBasisValue: 8,
        correctAmount: 800,
        hint: "(8 / 80) * 8,000"
    }
  ]
};