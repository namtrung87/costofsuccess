import { DialogueNode, Language } from '../types';

export type AllocationType = 'ALLOCATE' | 'APPORTION';
export type Department = 'CUTTING' | 'SEWING' | 'MAINTENANCE' | 'CANTEEN' | 'SHARED';

export interface AllocationItem {
  id: string;
  title: string;
  details: string;
  correctType: AllocationType;
  correctDept: Department; // If APPORTION, use 'SHARED'
  feedback: string;
}

export const PHASE5_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
  EN: {
    'start': {
        id: 'start',
        speaker: 'System',
        text: 'SECTOR 5: COMMAND CENTER. 14:00 PM.',
        backgroundImage: 'BG_COMMAND_CENTER',
        nextId: 'jules_overview'
    },
    'jules_overview': {
        id: 'jules_overview',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Okay, Intern. We have a pile of overhead bills worth $100,000. Rent, Electricity, Supervisors. Right now, they are just a 'blob' of money.",
        nextId: 'jules_roadmap'
    },
    'jules_roadmap': {
        id: 'jules_roadmap',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "We need to push them into the specific rooms where they were used. This is Step 1 of the Absorption Flow: Allocation & Apportionment.",
        nextId: 'player_question'
    },
    'player_question': {
        id: 'player_question',
        speaker: 'Player',
        text: "So we are assigning costs to the Departments?",
        nextId: 'jules_confirm'
    },
    'jules_confirm': {
        id: 'jules_confirm',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Yes. Look at the map. 4 Centers: Production (Cutting, Sewing) and Service (Maintenance, Canteen).",
        nextId: 'rob_interjection'
    },
    'rob_interjection': {
        id: 'rob_interjection',
        speaker: 'Rob',
        speakerTitle: 'Production Manager',
        characterId: 'CHAR_ROB',
        text: "Listen up. I run Sewing. I don't want to pay for the Canteen's new microwave. You need to be fair.",
        nextId: 'jules_methods'
    },
    'jules_methods': {
        id: 'jules_methods',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "That's why we have two methods. 1. ALLOCATION: When a cost belongs entirely to ONE room. (Like a specific supervisor).",
        nextId: 'jules_methods_2'
    },
    'jules_methods_2': {
        id: 'jules_methods_2',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "2. APPORTIONMENT: When a cost is SHARED. (Like Rent). We split the bill.",
        nextId: 'game_intro'
    },
    'game_intro': {
        id: 'game_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Time to work. Here is the pile of invoices. Tell me: Do we ALLOCATE (send to a room) or APPORTION (share it)?",
        choices: [
        { text: "Start Distribution", nextId: 'START_GAME' }
        ]
    },
    // --- Post Game ---
    'post_game': {
        id: 'post_game',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Excellent. You have locked in the specific Allocated costs. Now we are left with the dark cloud of 'Shared Costs'.",
        nextId: 'jules_math_intro'
    },
    'jules_math_intro': {
        id: 'jules_math_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "To split that Rent and Electricity, we need math. We need a 'Basis of Apportionment'.",
        nextId: 'rob_warning'
    },
    'rob_warning': {
        id: 'rob_warning',
        speaker: 'Rob',
        speakerTitle: 'Production Manager',
        characterId: 'CHAR_ROB',
        text: "You better pick the right basis. I'm not paying for the Cutting Room's electricity if they use more than me.",
        nextId: 'jules_next_phase'
    },
    'jules_next_phase': {
        id: 'jules_next_phase',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Don't worry, Rob. Phase 6 is all about the math. Here's a voucher for extra boba toppings. You'll need the sugar.",
        choices: [
        { text: "Enter Phase 6", nextId: 'END_PHASE' }
        ]
    }
  },
  VI: {
    'start': {
        id: 'start',
        speaker: 'Hệ thống',
        text: 'KHU VỰC 5: TRUNG TÂM CHỈ HUY. 14:00 CHIỀU.',
        backgroundImage: 'BG_COMMAND_CENTER',
        nextId: 'jules_overview'
    },
    'jules_overview': {
        id: 'jules_overview',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Được rồi. Mình có đống hóa đơn chi phí sản xuất chung trị giá $100,000. Tiền thuê, Điện, Giám sát. Hiện tại, nó chỉ là một 'cục' tiền.",
        nextId: 'jules_roadmap'
    },
    'jules_roadmap': {
        id: 'jules_roadmap',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Chúng ta cần đẩy chúng vào đúng phòng đã sử dụng. Đây là Bước 1 của quy trình: Tập hợp & Phân bổ (Allocation & Apportionment).",
        nextId: 'player_question'
    },
    'player_question': {
        id: 'player_question',
        speaker: 'Người chơi',
        text: "Tức là gán chi phí cho các Phòng ban?",
        nextId: 'jules_confirm'
    },
    'jules_confirm': {
        id: 'jules_confirm',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Đúng. Nhìn bản đồ. 4 Trung tâm: Sản xuất (Cắt, May) và Dịch vụ (Bảo trì, Canteen).",
        nextId: 'rob_interjection'
    },
    'rob_interjection': {
        id: 'rob_interjection',
        speaker: 'Rob',
        speakerTitle: 'Quản lý Sản xuất',
        characterId: 'CHAR_ROB',
        text: "Nghe này. Tôi quản lý phòng May. Tôi không muốn trả tiền cho lò vi sóng mới của Canteen đâu nhé. Phải công bằng.",
        nextId: 'jules_methods'
    },
    'jules_methods': {
        id: 'jules_methods',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Thế nên mới có 2 phương pháp. 1. TẬP HỢP (ALLOCATION): Khi chi phí thuộc hoàn toàn về MỘT phòng. (Như một giám sát viên cụ thể).",
        nextId: 'jules_methods_2'
    },
    'jules_methods_2': {
        id: 'jules_methods_2',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "2. PHÂN BỔ (APPORTIONMENT): Khi chi phí được DÙNG CHUNG. (Như tiền Thuê). Mình chia hóa đơn ra.",
        nextId: 'game_intro'
    },
    'game_intro': {
        id: 'game_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Làm việc nào. Đây là chồng hóa đơn. Nói cho chị: TẬP HỢP (gửi vào phòng) hay PHÂN BỔ (chia sẻ)?",
        choices: [
        { text: "Bắt đầu Phân phối", nextId: 'START_GAME' }
        ]
    },
    'post_game': {
        id: 'post_game',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Xuất sắc. Đã chốt xong các chi phí Tập hợp. Giờ chỉ còn lại đám mây đen 'Chi phí dùng chung'.",
        nextId: 'jules_math_intro'
    },
    'jules_math_intro': {
        id: 'jules_math_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Để chia tiền Thuê và Điện, cần tính toán. Cần một 'Tiêu thức Phân bổ' (Basis).",
        nextId: 'rob_warning'
    },
    'rob_warning': {
        id: 'rob_warning',
        speaker: 'Rob',
        speakerTitle: 'Quản lý Sản xuất',
        characterId: 'CHAR_ROB',
        text: "Chọn cho đúng nhé. Tôi không trả tiền điện cho phòng Cắt nếu họ dùng nhiều hơn tôi đâu.",
        nextId: 'jules_next_phase'
    },
    'jules_next_phase': {
        id: 'jules_next_phase',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Yên tâm đi Rob. Màn 6 toàn toán thôi. Tặng phiếu thêm topping trà sữa nè. Cưng sẽ cần đường đấy.",
        choices: [
        { text: "Vào Màn 6", nextId: 'END_PHASE' }
        ]
    }
  }
};

export const ALLOCATION_ITEMS: Record<Language, AllocationItem[]> = {
  EN: [
    {
        id: '1',
        title: 'Sewing Machine Oil',
        details: 'Invoice: Delivered to Sewing Dept',
        correctType: 'ALLOCATE',
        correctDept: 'SEWING',
        feedback: "Rob: Good. That's my grease. I'll pay for it."
    },
    {
        id: '2',
        title: 'Factory Rent ($20,000)',
        details: 'Invoice: Covers entire building',
        correctType: 'APPORTION',
        correctDept: 'SHARED',
        feedback: "Jules: Correct. We share the roof, we share the rent."
    },
    {
        id: '3',
        title: 'Canteen Chef Wages',
        details: 'Employee: Cooks only in Canteen',
        correctType: 'ALLOCATE',
        correctDept: 'CANTEEN',
        feedback: "Jules: Easy. 100% to the Canteen."
    },
    {
        id: '4',
        title: 'Factory Insurance',
        details: 'Policy: Covers all machinery & building',
        correctType: 'APPORTION',
        correctDept: 'SHARED',
        feedback: "Jules: Yes. Every department has assets. We split this later."
    },
    {
        id: '5',
        title: 'Maintenance Engineer Salary',
        details: 'Employee: Fixes machines everywhere, based in Maintenance',
        correctType: 'ALLOCATE',
        correctDept: 'MAINTENANCE',
        feedback: "Jules: Smart. We park his cost in his home department (Maintenance) first."
    },
    {
        id: '6',
        title: 'Electricity Bill',
        details: 'Meter: One meter for whole factory',
        correctType: 'APPORTION',
        correctDept: 'SHARED',
        feedback: "Rob: Correct. Don't charge me equally! I have heavy machines."
    }
  ],
  VI: [
    {
        id: '1',
        title: 'Dầu máy may',
        details: 'Hóa đơn: Giao cho phòng May',
        correctType: 'ALLOCATE',
        correctDept: 'SEWING',
        feedback: "Rob: Tốt. Dầu của tôi. Tôi trả."
    },
    {
        id: '2',
        title: 'Thuê Nhà máy ($20,000)',
        details: 'Hóa đơn: Bao gồm cả tòa nhà',
        correctType: 'APPORTION',
        correctDept: 'SHARED',
        feedback: "Jules: Đúng. Chung mái nhà, chung tiền thuê."
    },
    {
        id: '3',
        title: 'Lương Đầu bếp Canteen',
        details: 'Nhân viên: Chỉ nấu ở Canteen',
        correctType: 'ALLOCATE',
        correctDept: 'CANTEEN',
        feedback: "Jules: Dễ. 100% vào Canteen."
    },
    {
        id: '4',
        title: 'Bảo hiểm Nhà máy',
        details: 'HĐ: Bảo hiểm máy móc & tòa nhà',
        correctType: 'APPORTION',
        correctDept: 'SHARED',
        feedback: "Jules: Phải. Phòng nào cũng có tài sản. Chia sau."
    },
    {
        id: '5',
        title: 'Lương Kỹ sư Bảo trì',
        details: 'NV: Sửa máy khắp nơi, thuộc đội Bảo trì',
        correctType: 'ALLOCATE',
        correctDept: 'MAINTENANCE',
        feedback: "Jules: Thông minh. Tính vào phòng chủ quản (Bảo trì) trước."
    },
    {
        id: '6',
        title: 'Hóa đơn Tiền điện',
        details: 'Công tơ: Một cái cho cả nhà máy',
        correctType: 'APPORTION',
        correctDept: 'SHARED',
        feedback: "Rob: Chuẩn. Đừng có chia đều! Máy tôi ngốn điện lắm."
    }
  ]
};
