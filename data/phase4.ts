import { DialogueNode, Language } from '../types';

export type TraceabilityType = 'DIRECT' | 'INDIRECT';

export interface TraceabilityItem {
  id: string;
  name: string;
  element: 'MATERIAL' | 'LABOR' | 'EXPENSE';
  type: TraceabilityType;
  reason: string;
}

export const PHASE4_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
  EN: {
    'start': {
        id: 'start',
        speaker: 'System',
        text: 'SECTOR 4: OPS CENTER. 13:00 PM.',
        backgroundImage: 'BG_OPS_CENTER', 
        nextId: 'jules_intro'
    },
    'jules_intro': {
        id: 'jules_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Okay, you know what the costs are (Material, Labor, Expense). Now we need to figure out where they go.",
        nextId: 'meet_rob'
    },
    'meet_rob': {
        id: 'meet_rob',
        speaker: 'Rob',
        speakerTitle: 'Production Manager',
        characterId: 'CHAR_ROB',
        text: "Welcome to the Ops Center. I'm Rob. I run the floor. If it's broken, I fix it. If it's too expensive, Jules yells at me.",
        nextId: 'jules_terminology'
    },
    'jules_terminology': {
        id: 'jules_terminology',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Before we sort, you need to learn the language. First: THE COST OBJECT. This is anything we want to know the cost of. Right now, it's the 'Cyber-Punk Hoodie'.",
        nextId: 'jules_unit'
    },
    'jules_unit': {
        id: 'jules_unit',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Second: THE COST UNIT. This is a single unit of product. One single Hoodie.",
        nextId: 'rob_center'
    },
    'rob_center': {
        id: 'rob_center',
        speaker: 'Rob',
        speakerTitle: 'Production Manager',
        characterId: 'CHAR_ROB',
        text: "Third: THE COST CENTER. That's my domain. A location or department where costs are collected. Like the Cutting Room (Production) or the Canteen (Service).",
        nextId: 'jules_direct_demo'
    },
    'jules_direct_demo': {
        id: 'jules_direct_demo',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Now, the Golden Rule: DIRECT vs INDIRECT. (She holds up a hoodie). If I can physically TRACE a cost to this specific unit, it is DIRECT.",
        nextId: 'jules_indirect_demo'
    },
    'jules_indirect_demo': {
        id: 'jules_indirect_demo',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "But... can I stick a tag on the electricity bill that says 'This $0.05 belongs to this hoodie'? No. It's shared. That is INDIRECT.",
        nextId: 'game_intro'
    },
    'game_intro': {
        id: 'game_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Open your tablet. You have the costs from Phase 3. Split them again. Is it Traceable (Direct)? Or is it Shared (Indirect)?",
        choices: [
        { text: "Start Traceability Test", nextId: 'START_GAME' }
        ]
    },
    // --- Post Game ---
    'post_game': {
        id: 'post_game',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Look at what you built. This is the structure of cost. Prime Cost is the stuff we can trace. Overheads are the cloud of costs floating above us.",
        nextId: 'rob_concern'
    },
    'rob_concern': {
        id: 'rob_concern',
        speaker: 'Rob',
        speakerTitle: 'Production Manager',
        characterId: 'CHAR_ROB',
        text: "Great. So we know the Prime Cost is $50. But we have a pile of 'Overheads'—$100,000 of Rent and Power—sitting in the middle of my factory floor.",
        nextId: 'jules_solution'
    },
    'jules_solution': {
        id: 'jules_solution',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "We can't ignore them. We need to spread that $100,000 over the hoodies. We need a system.",
        nextId: 'jules_outro'
    },
    'jules_outro': {
        id: 'jules_outro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Intern, you've earned your stripes. Rank Up: Cost Analyst (Level 1). Next up: Apportionment.",
        choices: [
        { text: "View Cost Center Map", nextId: 'END_PHASE' }
        ]
    }
  },
  VI: {
    'start': {
        id: 'start',
        speaker: 'Hệ thống',
        text: 'KHU VỰC 4: TRUNG TÂM VẬN HÀNH. 13:00 CHIỀU.',
        backgroundImage: 'BG_OPS_CENTER', 
        nextId: 'jules_intro'
    },
    'jules_intro': {
        id: 'jules_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Được rồi, biết chi phí là gì rồi (Nguyên liệu, Nhân công, Khác). Giờ phải xem nó đi về đâu.",
        nextId: 'meet_rob'
    },
    'meet_rob': {
        id: 'meet_rob',
        speaker: 'Rob',
        speakerTitle: 'Quản lý Sản xuất',
        characterId: 'CHAR_ROB',
        text: "Chào mừng đến Trung tâm Vận hành. Tôi là Rob. Tôi quản lý sàn. Hỏng thì tôi sửa. Đắt quá thì Jules la tôi.",
        nextId: 'jules_terminology'
    },
    'jules_terminology': {
        id: 'jules_terminology',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Trước khi phân loại, học từ vựng đã. 1: ĐỐI TƯỢNG TÍNH GIÁ (COST OBJECT). Bất cứ thứ gì mình muốn biết giá. Hiện tại là 'Cyber-Punk Hoodie'.",
        nextId: 'jules_unit'
    },
    'jules_unit': {
        id: 'jules_unit',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "2: ĐƠN VỊ TÍNH GIÁ (COST UNIT). Một đơn vị sản phẩm. Một cái áo Hoodie.",
        nextId: 'rob_center'
    },
    'rob_center': {
        id: 'rob_center',
        speaker: 'Rob',
        speakerTitle: 'Quản lý Sản xuất',
        characterId: 'CHAR_ROB',
        text: "3: TRUNG TÂM CHI PHÍ (COST CENTER). Lãnh địa của tôi. Nơi chi phí phát sinh. Như Phòng Cắt (Sản xuất) hay Canteen (Dịch vụ).",
        nextId: 'jules_direct_demo'
    },
    'jules_direct_demo': {
        id: 'jules_direct_demo',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Giờ là Nguyên tắc Vàng: TRỰC TIẾP vs GIÁN TIẾP. (Cầm áo lên). Nếu chị có thể TRUY XUẤT vật lý một chi phí vào cái áo này, nó là TRỰC TIẾP.",
        nextId: 'jules_indirect_demo'
    },
    'jules_indirect_demo': {
        id: 'jules_indirect_demo',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Nhưng... chị có thể dán nhãn lên hóa đơn tiền điện ghi ' $0.05 này thuộc về cái áo này' không? Không. Nó dùng chung. Đó là GIÁN TIẾP.",
        nextId: 'game_intro'
    },
    'game_intro': {
        id: 'game_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Mở máy tính bảng lên. Lấy chi phí từ Màn 3. Chia lại lần nữa. Truy xuất được (Trực tiếp)? Hay Dùng chung (Gián tiếp)?",
        choices: [
        { text: "Bắt đầu Kiểm tra", nextId: 'START_GAME' }
        ]
    },
    'post_game': {
        id: 'post_game',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Nhìn thành quả đi. Đây là cấu trúc chi phí. Chi phí Cơ bản là thứ mình truy xuất được. Chi phí sản xuất chung là đám mây lơ lửng bên trên.",
        nextId: 'rob_concern'
    },
    'rob_concern': {
        id: 'rob_concern',
        speaker: 'Rob',
        speakerTitle: 'Quản lý Sản xuất',
        characterId: 'CHAR_ROB',
        text: "Tuyệt. Biết Chi phí Cơ bản là $50 rồi. Nhưng tôi còn một đống 'Chi phí Chung'—$100,000 tiền Thuê và Điện—nằm giữa xưởng.",
        nextId: 'jules_solution'
    },
    'jules_solution': {
        id: 'jules_solution',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Không lờ đi được. Phải chia $100,000 đó vào từng cái áo. Cần một hệ thống.",
        nextId: 'jules_outro'
    },
    'jules_outro': {
        id: 'jules_outro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Thực tập sinh, cưng làm tốt lắm. Thăng hạng: Chuyên viên Phân tích (Cấp 1). Tiếp theo: Phân bổ.",
        choices: [
        { text: "Xem Bản đồ Trung tâm CP", nextId: 'END_PHASE' }
        ]
    }
  }
};

export const TRACEABILITY_ITEMS: Record<Language, TraceabilityItem[]> = {
  EN: [
    {
        id: '1',
        name: 'Recycled Polyester Fabric',
        element: 'MATERIAL',
        type: 'DIRECT',
        reason: "We know exactly how much (2m) goes into one unit."
    },
    {
        id: '2',
        name: 'Cleaning Rags & Oil',
        element: 'MATERIAL',
        type: 'INDIRECT',
        reason: "Used for machines, not traceable to a specific hoodie."
    },
    {
        id: '3',
        name: 'Thread and Glue',
        element: 'MATERIAL',
        type: 'INDIRECT',
        reason: "Too small/hard to measure per unit. Factory Consumable."
    },
    {
        id: '4',
        name: 'Wages of Kai (Tailor)',
        element: 'LABOR',
        type: 'DIRECT',
        reason: "He touches the product. We pay him to make it."
    },
    {
        id: '5',
        name: 'Wages of Rob (Supervisor)',
        element: 'LABOR',
        type: 'INDIRECT',
        reason: "Rob supervises the room. His cost is shared."
    },
    {
        id: '6',
        name: 'Forklift Driver Wages',
        element: 'LABOR',
        type: 'INDIRECT',
        reason: "Supports the process, doesn't make the unit."
    },
    {
        id: '7',
        name: 'Royalty to Artist',
        element: 'EXPENSE',
        type: 'DIRECT',
        reason: "One hoodie sold = One payment. Directly traceable."
    },
    {
        id: '8',
        name: 'Factory Rent',
        element: 'EXPENSE',
        type: 'INDIRECT',
        reason: "Rent is for time/space, not per hoodie. Shared."
    },
    {
        id: '9',
        name: 'Machine Depreciation',
        element: 'EXPENSE',
        type: 'INDIRECT',
        reason: "General factory cost. Indirect."
    }
  ],
  VI: [
    {
        id: '1',
        name: 'Vải Polyester Tái chế',
        element: 'MATERIAL',
        type: 'DIRECT',
        reason: "Biết chính xác bao nhiêu (2m) cho một cái."
    },
    {
        id: '2',
        name: 'Giẻ lau & Dầu máy',
        element: 'MATERIAL',
        type: 'INDIRECT',
        reason: "Dùng cho máy, không gắn với từng cái áo."
    },
    {
        id: '3',
        name: 'Chỉ và Keo',
        element: 'MATERIAL',
        type: 'INDIRECT',
        reason: "Quá nhỏ/khó đo lường trên từng đơn vị. Vật tư tiêu hao."
    },
    {
        id: '4',
        name: 'Lương Kai (Thợ may)',
        element: 'LABOR',
        type: 'DIRECT',
        reason: "Cậu ấy làm ra sản phẩm. Trả tiền để may."
    },
    {
        id: '5',
        name: 'Lương Rob (Giám sát)',
        element: 'LABOR',
        type: 'INDIRECT',
        reason: "Rob quản lý phòng. Chi phí dùng chung."
    },
    {
        id: '6',
        name: 'Lương Lái xe nâng',
        element: 'LABOR',
        type: 'INDIRECT',
        reason: "Hỗ trợ quy trình, không trực tiếp làm ra áo."
    },
    {
        id: '7',
        name: 'Phí bản quyền Nghệ sĩ',
        element: 'EXPENSE',
        type: 'DIRECT',
        reason: "Một áo bán = Một lần trả. Truy xuất trực tiếp."
    },
    {
        id: '8',
        name: 'Thuê Nhà máy',
        element: 'EXPENSE',
        type: 'INDIRECT',
        reason: "Thuê theo thời gian/không gian. Dùng chung."
    },
    {
        id: '9',
        name: 'Khấu hao Máy móc',
        element: 'EXPENSE',
        type: 'INDIRECT',
        reason: "Chi phí sản xuất chung của nhà máy. Gián tiếp."
    }
  ]
};
