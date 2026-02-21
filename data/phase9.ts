import { DialogueNode, Language } from '../types';

export interface OARChallenge {
    id: string;
    departmentName: string;
    description: string;
    budgetedOverhead: number;
    budgetedActivity: number;
    activityLabel: string;
    correctBasisId: string;
    correctOAR: number;
    basisOptions: { id: string; text: string; feedback: string }[];
}

export const PHASE9_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
  EN: {
    'start': {
        id: 'start',
        speaker: 'System',
        text: 'SECTOR 9: VALUATION STATION. 16:30 PM.',
        backgroundImage: 'BG_VALUATION_ROOM',
        nextId: 'jules_situation'
    },
    'jules_situation': {
        id: 'jules_situation',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "We have a situation. Cutting holds $70,000 of overheads. Sewing holds $130,000. That's a massive pool of money.",
        nextId: 'rob_concern'
    },
    'rob_concern': {
        id: 'rob_concern',
        speaker: 'Rob',
        speakerTitle: 'Production Manager',
        characterId: 'CHAR_ROB',
        text: "I can't send an invoice to a customer for $130,000 just because they bought one hoodie. They’d laugh at us on TikTok.",
        nextId: 'jules_solution'
    },
    'jules_solution': {
        id: 'jules_solution',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Exactly. We need to absorb it drop by drop. We need the OAR (Overhead Absorption Rate).",
        nextId: 'player_question'
    },
    'player_question': {
        id: 'player_question',
        speaker: 'Player',
        text: "Can't we just wait until the end of the year to see actual costs?",
        nextId: 'jules_theory'
    },
    'jules_theory': {
        id: 'jules_theory',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "And tell the customer the price in December? No. We use the PREDETERMINED OAR based on Budget. Predicting the future to price the present.",
        nextId: 'game_intro'
    },
    'game_intro': {
        id: 'game_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "First, choose the Basis. Then, calculate the Rate. Finally, apply it to the hoodie on the pedestal.",
        choices: [
        { text: "Activate Pricing Gun", nextId: 'START_GAME' }
        ]
    },
    // --- Post Game ---
    'post_game': {
        id: 'post_game',
        speaker: 'Player',
        text: "So... just the overheads for this hoodie are $82.50?",
        nextId: 'rob_context'
    },
    'rob_context': {
        id: 'rob_context',
        speaker: 'Rob',
        speakerTitle: 'Production Manager',
        characterId: 'CHAR_ROB',
        text: "And that’s before you add the leather and the zipper (Prime Cost). Expensive.",
        nextId: 'jules_closing'
    },
    'jules_closing': {
        id: 'jules_closing',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "If we ignored this, we'd sell it for $60 and lose a fortune. We calculated this using Budget. But what if the real world is different?",
        nextId: 'transition'
    },
    'transition': {
        id: 'transition',
        speaker: 'System',
        text: "(Thunder rumbles outside. The lights flicker.)",
        nextId: 'jules_warning'
    },
    'jules_warning': {
        id: 'jules_warning',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "That is the final boss: Under and Over Absorption. Get ready.",
        choices: [
        { text: "Face Reality (Phase 10)", nextId: 'END_PHASE' }
        ]
    }
  },
  VI: {
    'start': {
        id: 'start',
        speaker: 'Hệ thống',
        text: 'KHU VỰC 9: TRẠM ĐỊNH GIÁ. 16:30 CHIỀU.',
        backgroundImage: 'BG_VALUATION_ROOM',
        nextId: 'jules_situation'
    },
    'jules_situation': {
        id: 'jules_situation',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Tình hình căng rồi. Phòng Cắt giữ $70,000 chi phí sản xuất chung. Phòng May giữ $130,000. Tiền nhiều quá.",
        nextId: 'rob_concern'
    },
    'rob_concern': {
        id: 'rob_concern',
        speaker: 'Rob',
        speakerTitle: 'Quản lý Sản xuất',
        characterId: 'CHAR_ROB',
        text: "Tôi không thể gửi hóa đơn $130,000 cho khách chỉ vì họ mua 1 cái áo. Họ sẽ cười vào mặt mình trên TikTok.",
        nextId: 'jules_solution'
    },
    'jules_solution': {
        id: 'jules_solution',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Đúng. Phải tính dần vào (absorb) từ từ. Cần Hệ số Phân bổ (OAR).",
        nextId: 'player_question'
    },
    'player_question': {
        id: 'player_question',
        speaker: 'Người chơi',
        text: "Không đợi đến cuối năm để xem chi phí thực tế được sao?",
        nextId: 'jules_theory'
    },
    'jules_theory': {
        id: 'jules_theory',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Rồi báo giá cho khách vào tháng 12 hả? Không. Mình dùng OAR ƯỚC TÍNH dựa trên Ngân sách. Dự đoán tương lai để định giá hiện tại.",
        nextId: 'game_intro'
    },
    'game_intro': {
        id: 'game_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Đầu tiên, chọn Tiêu thức. Sau đó tính Hệ số. Cuối cùng, áp vào cái áo trên bệ kia.",
        choices: [
        { text: "Bật Súng Định giá", nextId: 'START_GAME' }
        ]
    },
    'post_game': {
        id: 'post_game',
        speaker: 'Người chơi',
        text: "Vậy... chỉ riêng chi phí sản xuất chung cho cái áo này là $82.50?",
        nextId: 'rob_context'
    },
    'rob_context': {
        id: 'rob_context',
        speaker: 'Rob',
        speakerTitle: 'Quản lý Sản xuất',
        characterId: 'CHAR_ROB',
        text: "Đấy là chưa cộng tiền da với khóa kéo (Chi phí Cơ bản) đấy nhé. Đắt đỏ.",
        nextId: 'jules_closing'
    },
    'jules_closing': {
        id: 'jules_closing',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Nếu lờ đi, mình bán giá $60 là lỗ chổng vó. Mình tính cái này dựa trên Ngân sách. Nhưng nhỡ thực tế khác thì sao?",
        nextId: 'transition'
    },
    'transition': {
        id: 'transition',
        speaker: 'Hệ thống',
        text: "(Sấm chớp bên ngoài. Đèn nhấp nháy.)",
        nextId: 'jules_warning'
    },
    'jules_warning': {
        id: 'jules_warning',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Đó là Trùm cuối: Phân bổ Thừa và Thiếu. Chuẩn bị đi.",
        choices: [
        { text: "Đối mặt Thực tế (Màn 10)", nextId: 'END_PHASE' }
        ]
    }
  }
};

export const OAR_CHALLENGES: Record<Language, OARChallenge[]> = {
  EN: [
    {
        id: 'cutting',
        departmentName: 'CUTTING DEPT',
        description: 'Automated Room. Lasers & Robots.',
        budgetedOverhead: 70000,
        budgetedActivity: 2000,
        activityLabel: 'Machine Hours',
        correctBasisId: 'MACHINE',
        correctOAR: 35.00,
        basisOptions: [
            { id: 'LABOR', text: 'Direct Labor Hours', feedback: "Robots don't have salaries." },
            { id: 'MACHINE', text: 'Machine Hours', feedback: "Correct. The lasers drive the cost." },
            { id: 'UNIT', text: 'Per Unit', feedback: "Only works if all products are identical. Ours aren't." }
        ]
    },
    {
        id: 'sewing',
        departmentName: 'SEWING DEPT',
        description: 'Manual Room. Humans stitching.',
        budgetedOverhead: 130000,
        budgetedActivity: 4000,
        activityLabel: 'Labor Hours',
        correctBasisId: 'LABOR',
        correctOAR: 32.50,
        basisOptions: [
            { id: 'LABOR', text: 'Direct Labor Hours', feedback: "Correct. People drive the sewing cost." },
            { id: 'MACHINE', text: 'Machine Hours', feedback: "Sewing machines are cheap. The people are expensive." },
            { id: 'FLOOR', text: 'Floor Area', feedback: "That's for Rent apportionment, not Absorption." }
        ]
    }
  ],
  VI: [
    {
        id: 'cutting',
        departmentName: 'PHÒNG CẮT',
        description: 'Phòng tự động. Laser & Robot.',
        budgetedOverhead: 70000,
        budgetedActivity: 2000,
        activityLabel: 'Giờ Máy',
        correctBasisId: 'MACHINE',
        correctOAR: 35.00,
        basisOptions: [
            { id: 'LABOR', text: 'Giờ Nhân công', feedback: "Robot không nhận lương." },
            { id: 'MACHINE', text: 'Giờ Máy', feedback: "Đúng. Laser tiêu tốn chi phí." },
            { id: 'UNIT', text: 'Theo Sản phẩm', feedback: "Chỉ đúng nếu mọi sản phẩm giống hệt nhau." }
        ]
    },
    {
        id: 'sewing',
        departmentName: 'PHÒNG MAY',
        description: 'Thủ công. Thợ may làm việc.',
        budgetedOverhead: 130000,
        budgetedActivity: 4000,
        activityLabel: 'Giờ Công',
        correctBasisId: 'LABOR',
        correctOAR: 32.50,
        basisOptions: [
            { id: 'LABOR', text: 'Giờ Nhân công', feedback: "Đúng. Con người là chi phí chính ở đây." },
            { id: 'MACHINE', text: 'Giờ Máy', feedback: "Máy may rẻ. Con người mới đắt." },
            { id: 'FLOOR', text: 'Diện tích sàn', feedback: "Đó là phân bổ tiền thuê, không phải tính giá thành." }
        ]
    }
  ]
};

export const HOODIE_JOB_CARD = {
    cuttingUsage: 0.5, // Machine Hours
    sewingUsage: 2.0,  // Labor Hours
    correctTotal: 82.50 // (0.5 * 35) + (2.0 * 32.50)
};