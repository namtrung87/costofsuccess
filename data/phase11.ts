import { DialogueNode, Language } from '../types';

export interface CostOrb {
    id: string;
    label: string;
    amount: number;
    type: 'PRIME' | 'FACTORY_OH' | 'TRAP';
    description: string;
}

export const COST_ORBS: Record<Language, CostOrb[]> = {
  EN: [
    { id: 'A', label: 'Fabric & Zippers', amount: 30.00, type: 'PRIME', description: 'Direct Materials' },
    { id: 'B', label: 'Sewing Labor', amount: 15.00, type: 'PRIME', description: 'Direct Labor' },
    { id: 'C', label: 'Design Royalty', amount: 5.00, type: 'PRIME', description: 'Direct Expense' },
    { id: 'D', label: 'Factory Rent', amount: 20000, type: 'TRAP', description: 'TRAP: Already in OAR!' },
    { id: 'E', label: 'Cutting Absorbed', amount: 17.50, type: 'FACTORY_OH', description: 'OAR x Hours' },
    { id: 'F', label: 'Sewing Absorbed', amount: 65.00, type: 'FACTORY_OH', description: 'OAR x Hours' },
    { id: 'G', label: 'Actual Elec. Bill', amount: 105.00, type: 'TRAP', description: 'TRAP: Use Absorbed!' }
  ],
  VI: [
    { id: 'A', label: 'Vải & Khóa kéo', amount: 30.00, type: 'PRIME', description: 'Nguyên liệu Trực tiếp' },
    { id: 'B', label: 'Nhân công May', amount: 15.00, type: 'PRIME', description: 'Nhân công Trực tiếp' },
    { id: 'C', label: 'Bản quyền Thiết kế', amount: 5.00, type: 'PRIME', description: 'Chi phí Trực tiếp Khác' },
    { id: 'D', label: 'Thuê Nhà máy', amount: 20000, type: 'TRAP', description: 'BẪY: Đã tính trong OAR!' },
    { id: 'E', label: 'Phân bổ Cắt', amount: 17.50, type: 'FACTORY_OH', description: 'OAR x Giờ' },
    { id: 'F', label: 'Phân bổ May', amount: 65.00, type: 'FACTORY_OH', description: 'OAR x Giờ' },
    { id: 'G', label: 'Hóa đơn Điện thực tế', amount: 105.00, type: 'TRAP', description: 'BẪY: Dùng số ước tính!' }
  ]
};

export const PHASE11_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
  EN: {
    'start': {
        id: 'start',
        speaker: 'System',
        text: 'SECTOR 11: THE DROP ROOM. T-MINUS 5 MINUTES.',
        backgroundImage: 'BG_DROP_ROOM',
        nextId: 'jules_countdown'
    },
    'jules_countdown': {
        id: 'jules_countdown',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Five minutes to launch. The marketing team is ready. The influencers are posting. But we still don’t have the Final Selling Price.",
        nextId: 'kai_panic'
    },
    'kai_panic': {
        id: 'kai_panic',
        speaker: 'Kai',
        speakerTitle: 'Head Designer',
        characterId: 'CHAR_KAI',
        text: "I want to sell it for $100! It's a nice round number!",
        nextId: 'jules_glare'
    },
    'jules_glare': {
        id: 'jules_glare',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "If we sell it for $100, we might go bankrupt. We need to know the Total Cost first. Controller, bring up the Job Cost Sheet.",
        nextId: 'jules_burger'
    },
    'jules_burger': {
        id: 'jules_burger',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Remember the stack: Prime Cost + Factory Overheads = Factory Cost. Then add Non-Production Overheads (Admin/Selling).",
        nextId: 'game_intro'
    },
    'game_intro': {
        id: 'game_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Drag the correct data orbs into the sheet. Calculate the totals. Set the price. Don't miss anything, or we lose our bonus.",
        choices: [
        { text: "Assemble Cost Sheet", nextId: 'START_GAME' }
        ]
    },
    // --- Post Game ---
    'post_game': {
        id: 'post_game',
        speaker: 'System',
        text: "LAUNCH SEQUENCE INITIATED...",
        backgroundImage: 'BG_DROP_ROOM',
        nextId: 'sold_out'
    },
    'sold_out': {
        id: 'sold_out',
        speaker: 'System',
        text: "INVENTORY: 0 / 5000 UNITS. STATUS: SOLD OUT. REVENUE: $1,060,000.",
        backgroundImage: 'BG_DROP_ROOM',
        nextId: 'rooftop_scene'
    },
    'rooftop_scene': {
        id: 'rooftop_scene',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        backgroundImage: 'BG_ROOFTOP',
        characterId: 'CHAR_JULES',
        text: "We did it. The books are balanced. The profit is secured. You walked in here not knowing a Prime Cost from a Period Cost.",
        nextId: 'player_response'
    },
    'player_response': {
        id: 'player_response',
        speaker: 'Player',
        text: "So, is the game over? Did I win accounting?",
        nextId: 'jules_laugh'
    },
    'jules_laugh': {
        id: 'jules_laugh',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Win accounting? Oh, Intern. You just finished the tutorial. This was Absorption Costing. The traditional way.",
        nextId: 'jules_future'
    },
    'jules_future': {
        id: 'jules_future',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Next month: Activity Based Costing. And Variance Analysis. It only gets harder. But for now... enjoy the view.",
        choices: [
            { text: "Credits (Coming Soon)", nextId: 'start' } 
        ]
    }
  },
  VI: {
    'start': {
        id: 'start',
        speaker: 'Hệ thống',
        text: 'KHU VỰC 11: PHÒNG PHÁT HÀNH. CÒN 5 PHÚT.',
        backgroundImage: 'BG_DROP_ROOM',
        nextId: 'jules_countdown'
    },
    'jules_countdown': {
        id: 'jules_countdown',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Năm phút nữa là phát hành. Đội marketing đã sẵn sàng. Các influencer đang đăng bài. Nhưng chúng ta vẫn chưa có Giá Bán Cuối Cùng.",
        nextId: 'kai_panic'
    },
    'kai_panic': {
        id: 'kai_panic',
        speaker: 'Kai',
        speakerTitle: 'Trưởng Thiết kế',
        characterId: 'CHAR_KAI',
        text: "Tôi muốn bán $100! Số tròn đẹp mà!",
        nextId: 'jules_glare'
    },
    'jules_glare': {
        id: 'jules_glare',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Nếu bán $100, chúng ta có thể phá sản. Cần biết Tổng Chi Phí trước đã. Kế toán trưởng, mở Phiếu Tính Giá Thành lên.",
        nextId: 'jules_burger'
    },
    'jules_burger': {
        id: 'jules_burger',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Nhớ công thức: Chi phí Cơ bản + Chi phí SX Chung = Chi phí Sản xuất. Sau đó cộng Chi phí Ngoài SX (Quản lý/Bán hàng).",
        nextId: 'game_intro'
    },
    'game_intro': {
        id: 'game_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Kéo các quả cầu dữ liệu đúng vào bảng. Tính tổng. Đặt giá. Đừng sai sót, không là mất thưởng đấy.",
        choices: [
        { text: "Lập Bảng Chi Phí", nextId: 'START_GAME' }
        ]
    },
    'post_game': {
        id: 'post_game',
        speaker: 'Hệ thống',
        text: "KÍCH HOẠT QUY TRÌNH PHÁT HÀNH...",
        backgroundImage: 'BG_DROP_ROOM',
        nextId: 'sold_out'
    },
    'sold_out': {
        id: 'sold_out',
        speaker: 'Hệ thống',
        text: "TỒN KHO: 0 / 5000 ĐƠN VỊ. TRẠNG THÁI: HẾT HÀNG. DOANH THU: $1,060,000.",
        backgroundImage: 'BG_DROP_ROOM',
        nextId: 'rooftop_scene'
    },
    'rooftop_scene': {
        id: 'rooftop_scene',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        backgroundImage: 'BG_ROOFTOP',
        characterId: 'CHAR_JULES',
        text: "Làm được rồi. Sổ sách đã cân. Lợi nhuận đã chốt. Cưng bước vào đây còn không phân biệt được Chi phí Cơ bản với Chi phí Thời kỳ.",
        nextId: 'player_response'
    },
    'player_response': {
        id: 'player_response',
        speaker: 'Người chơi',
        text: "Vậy là hết game rồi hả? Tôi đã thắng môn kế toán chưa?",
        nextId: 'jules_laugh'
    },
    'jules_laugh': {
        id: 'jules_laugh',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Thắng kế toán á? Ôi, thực tập sinh. Cưng mới xong bài hướng dẫn thôi. Đây là Kế toán Chi phí Toàn bộ. Cách truyền thống.",
        nextId: 'jules_future'
    },
    'jules_future': {
        id: 'jules_future',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Tháng sau: Kế toán dựa trên Hoạt động (ABC). Và Phân tích Biến động. Chỉ có khó hơn thôi. Nhưng giờ thì... ngắm cảnh đi.",
        choices: [
            { text: "Kết thúc (Sắp ra mắt)", nextId: 'start' } 
        ]
    }
  }
};