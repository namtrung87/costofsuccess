
import { DialogueNode, Language } from '../types';

export type MethodType = 'DIRECT' | 'STEP_DOWN' | 'RECIPROCAL';

export interface PumpChallenge {
    id: string;
    method: MethodType;
    sourceName: string;
    secondarySourceName?: string; // For Step-Down/Reciprocal
    totalAmount: number;
    secondaryTotalAmount?: number;
    
    // For Step-Down: Which Dept goes first?
    stepDownOrder?: [string, string]; 
    
    // For Reciprocal: The math equation hint
    equationHint?: string;

    basisOptions: { id: string; text: string; isCorrect: boolean; feedback: string }[];
    targets: {
        id: string;
        name: string;
        basisValue: number;
        basisLabel: string;
        correctAmount: number; // The final amount absorbed
    }[];
}

export const PHASE8_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
  EN: {
    'start': {
        id: 'start',
        speaker: 'System',
        text: 'SECTOR 8: THE PUMP ROOM. 15:45 PM.',
        backgroundImage: 'BG_PUMP_ROOM',
        nextId: 'jules_recap'
    },
    'jules_recap': {
        id: 'jules_recap',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Okay, Intern. We have costs in Service Depts (Canteen, Power, Maintenance). They don't make products, so we must flush their costs into Production.",
        nextId: 'jules_level1'
    },
    'jules_level1': {
        id: 'jules_level1',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "LEVEL 1: DIRECT METHOD. The brute force approach. Service Depts dump costs straight to Production. We ignore that Service Depts help each other.",
        nextId: 'ken_complaint'
    },
    'ken_complaint': {
        id: 'ken_complaint',
        speaker: 'Ken',
        speakerTitle: 'Facilities',
        characterId: 'CHAR_KEN',
        text: "But the Power Plant powers the Canteen! And Maintenance fixes the Generator! You're ignoring reality.",
        nextId: 'jules_level2_intro'
    },
    'jules_level2_intro': {
        id: 'jules_level2_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Fine. That brings us to LEVEL 2: STEP-DOWN METHOD. We acknowledge that one Service Dept helps another.",
        nextId: 'jules_level2_expl'
    },
    'jules_level2_expl': {
        id: 'jules_level2_expl',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "It's a waterfall. The biggest Service Dept drains first—filling the other Service Dept AND Production. Then the next one drains. It flows one way.",
        nextId: 'jules_level3_intro'
    },
    'jules_level3_intro': {
        id: 'jules_level3_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "And finally, LEVEL 3: RECIPROCAL METHOD. The Neural Loop. Service A helps B, and B helps A. Infinite loop?",
        nextId: 'jules_level3_math'
    },
    'jules_level3_math': {
        id: 'jules_level3_math',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "No. Simultaneous Equations. We calculate the 'True Total' before distributing. This is the most accurate method.",
        choices: [
            { text: "Start Sequence: Direct -> Step -> Reciprocal", nextId: 'START_GAME' }
        ]
    },
    // --- Post Game ---
    'post_game': {
        id: 'post_game',
        speaker: 'Ken',
        speakerTitle: 'Facilities Manager',
        characterId: 'CHAR_KEN',
        text: "Tanks are empty. My budget is zero. The pressure is gone.",
        nextId: 'rob_complaint'
    },
    'rob_complaint': {
        id: 'rob_complaint',
        speaker: 'Rob',
        speakerTitle: 'Production Manager',
        characterId: 'CHAR_ROB',
        text: "Great. Now I have HUGE overheads in Sewing and Cutting. How do I get rid of it?",
        nextId: 'jules_final'
    },
    'jules_final': {
        id: 'jules_final',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Phase 9: Absorption. We attach these costs to the products using the O.A.R. Get ready for the final calculation.",
        choices: [
        { text: "Proceed to Phase 9", nextId: 'END_PHASE' }
        ]
    }
  },
  VI: {
    'start': {
        id: 'start',
        speaker: 'Hệ thống',
        text: 'KHU VỰC 8: PHÒNG BƠM. 15:45 CHIỀU.',
        backgroundImage: 'BG_PUMP_ROOM',
        nextId: 'jules_recap'
    },
    'jules_recap': {
        id: 'jules_recap',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Nghe này. Chúng ta có chi phí ở các Phòng Dịch vụ (Canteen, Điện, Bảo trì). Họ không làm ra sản phẩm, nên ta phải đẩy chi phí của họ sang Sản xuất.",
        nextId: 'jules_level1'
    },
    'jules_level1': {
        id: 'jules_level1',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "CẤP ĐỘ 1: PHƯƠNG PHÁP TRỰC TIẾP. Cách thô sơ nhất. Xả thẳng vào Sản xuất. Lờ đi việc các phòng Dịch vụ hỗ trợ lẫn nhau.",
        nextId: 'ken_complaint'
    },
    'ken_complaint': {
        id: 'ken_complaint',
        speaker: 'Ken',
        speakerTitle: 'Cơ sở vật chất',
        characterId: 'CHAR_KEN',
        text: "Nhưng Nhà máy điện cấp điện cho Canteen! Và Bảo trì sửa Máy phát điện! Cô đang lờ đi thực tế.",
        nextId: 'jules_level2_intro'
    },
    'jules_level2_intro': {
        id: 'jules_level2_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Được rồi. Đến CẤP ĐỘ 2: PHƯƠNG PHÁP BẬC THANG (Step-Down). Chúng ta thừa nhận Phòng Dịch vụ này giúp Phòng kia.",
        nextId: 'jules_level2_expl'
    },
    'jules_level2_expl': {
        id: 'jules_level2_expl',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Như thác nước. Phòng lớn nhất xả trước—vào cả phòng Dịch vụ kia VÀ Sản xuất. Sau đó phòng tiếp theo mới xả. Chảy một chiều.",
        nextId: 'jules_level3_intro'
    },
    'jules_level3_intro': {
        id: 'jules_level3_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Và cuối cùng, CẤP ĐỘ 3: PHƯƠNG PHÁP ĐẠI SỐ (Reciprocal). Vòng lặp vô tận. A giúp B, B giúp A.",
        nextId: 'jules_level3_math'
    },
    'jules_level3_math': {
        id: 'jules_level3_math',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Không vô tận đâu. Dùng Hệ phương trình. Tính ra 'Tổng chi phí thực' trước khi phân bổ. Đây là cách chính xác nhất.",
        choices: [
            { text: "Bắt đầu: Trực tiếp -> Bậc thang -> Đại số", nextId: 'START_GAME' }
        ]
    },
    'post_game': {
        id: 'post_game',
        speaker: 'Ken',
        speakerTitle: 'Cơ sở vật chất',
        characterId: 'CHAR_KEN',
        text: "Bể chứa cạn rồi. Ngân sách về 0. Hết áp lực.",
        nextId: 'rob_complaint'
    },
    'rob_complaint': {
        id: 'rob_complaint',
        speaker: 'Rob',
        speakerTitle: 'Quản lý Sản xuất',
        characterId: 'CHAR_ROB',
        text: "Tuyệt. Giờ tôi ôm đống chi phí khổng lồ ở May và Cắt. Tống đi kiểu gì?",
        nextId: 'jules_final'
    },
    'jules_final': {
        id: 'jules_final',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES',
        text: "Màn 9: Tính giá (Absorption). Chúng ta sẽ gắn chi phí này vào sản phẩm bằng O.A.R. Chuẩn bị tính toán đi.",
        choices: [
        { text: "Vào Màn 9", nextId: 'END_PHASE' }
        ]
    }
  }
};

export const PUMP_CHALLENGES: Record<Language, PumpChallenge[]> = {
  EN: [
    // 1. DIRECT METHOD (Simple)
    {
        id: 'direct_1',
        method: 'DIRECT',
        sourceName: 'CANTEEN (S1)',
        totalAmount: 10000,
        basisOptions: [
            { id: 'A', text: 'Machine Hours', isCorrect: false, feedback: "Robots don't eat lunch." },
            { id: 'B', text: 'Number of Employees', isCorrect: true, feedback: "Correct. Use Direct Method: Ignore other Service Depts." },
            { id: 'C', text: 'Floor Area', isCorrect: false, feedback: "Irrelevant for food." }
        ],
        targets: [
            { id: 'cutting', name: 'Cutting', basisValue: 10, basisLabel: 'Emp', correctAmount: 2000 },
            { id: 'sewing', name: 'Sewing', basisValue: 40, basisLabel: 'Emp', correctAmount: 8000 }
        ]
    },
    // 2. STEP-DOWN METHOD (Hierarchy)
    {
        id: 'step_1',
        method: 'STEP_DOWN',
        sourceName: 'POWER (S1)', // Costs: 20,000
        secondarySourceName: 'MAINTENANCE (S2)', // Costs: 10,000
        totalAmount: 20000,
        secondaryTotalAmount: 10000,
        stepDownOrder: ['POWER (S1)', 'MAINTENANCE (S2)'],
        basisOptions: [
            { id: 'A', text: 'Drain Maintenance First', isCorrect: false, feedback: "Power provides more service. Drain Power first." },
            { id: 'B', text: 'Drain Power First', isCorrect: true, feedback: "Yes. Power feeds Maintenance + Production." },
        ],
        targets: [
            // Power (20k) splits: 10% to Maint, 40% Cutting, 50% Sewing
            { id: 'maint', name: 'Maintenance', basisValue: 10, basisLabel: '%', correctAmount: 2000 }, 
            { id: 'cutting', name: 'Cutting', basisValue: 40, basisLabel: '%', correctAmount: 8000 },
            { id: 'sewing', name: 'Sewing', basisValue: 50, basisLabel: '%', correctAmount: 10000 }
        ]
    },
    // 3. RECIPROCAL METHOD (Simultaneous)
    {
        id: 'recip_1',
        method: 'RECIPROCAL',
        sourceName: 'HR (S1)', // Own: 50,000. Uses 10% of IT.
        secondarySourceName: 'IT (S2)', // Own: 30,000. Uses 20% of HR.
        totalAmount: 50000, 
        secondaryTotalAmount: 30000,
        equationHint: "S1 = 50,000 + 0.1(S2)  |  S2 = 30,000 + 0.2(S1)",
        basisOptions: [
            { id: 'A', text: 'Calculated: S1=54,082 | S2=40,816', isCorrect: true, feedback: "Correct. Simultaneous equations solved." },
            { id: 'B', text: 'Just use 50,000 and 30,000', isCorrect: false, feedback: "No. That ignores the reciprocal service." }
        ],
        targets: [
            // Only strictly checking the math logic here for the game
            { id: 'cutting', name: 'Production A', basisValue: 0, basisLabel: '-', correctAmount: 0 },
            { id: 'sewing', name: 'Production B', basisValue: 0, basisLabel: '-', correctAmount: 0 }
        ]
    }
  ],
  VI: [
    // 1. TRỰC TIẾP
    {
        id: 'direct_1',
        method: 'DIRECT',
        sourceName: 'CANTEEN (S1)',
        totalAmount: 10000,
        basisOptions: [
            { id: 'A', text: 'Giờ Máy', isCorrect: false, feedback: "Robot không ăn trưa." },
            { id: 'B', text: 'Số nhân viên', isCorrect: true, feedback: "Đúng. Phương pháp Trực tiếp: Bỏ qua phòng Dịch vụ khác." },
            { id: 'C', text: 'Diện tích', isCorrect: false, feedback: "Không liên quan." }
        ],
        targets: [
            { id: 'cutting', name: 'Cắt', basisValue: 10, basisLabel: 'NV', correctAmount: 2000 },
            { id: 'sewing', name: 'May', basisValue: 40, basisLabel: 'NV', correctAmount: 8000 }
        ]
    },
    // 2. BẬC THANG
    {
        id: 'step_1',
        method: 'STEP_DOWN',
        sourceName: 'ĐIỆN (S1)', 
        secondarySourceName: 'BẢO TRÌ (S2)',
        totalAmount: 20000,
        secondaryTotalAmount: 10000,
        stepDownOrder: ['ĐIỆN (S1)', 'BẢO TRÌ (S2)'],
        basisOptions: [
            { id: 'A', text: 'Xả Bảo Trì Trước', isCorrect: false, feedback: "Điện cung cấp nhiều dịch vụ hơn. Xả Điện trước." },
            { id: 'B', text: 'Xả Điện Trước', isCorrect: true, feedback: "Đúng. Điện nuôi Bảo trì + Sản xuất." },
        ],
        targets: [
            { id: 'maint', name: 'Bảo Trì', basisValue: 10, basisLabel: '%', correctAmount: 2000 }, 
            { id: 'cutting', name: 'Cắt', basisValue: 40, basisLabel: '%', correctAmount: 8000 },
            { id: 'sewing', name: 'May', basisValue: 50, basisLabel: '%', correctAmount: 10000 }
        ]
    },
    // 3. ĐẠI SỐ
    {
        id: 'recip_1',
        method: 'RECIPROCAL',
        sourceName: 'NHÂN SỰ (S1)', 
        secondarySourceName: 'CNTT (S2)', 
        totalAmount: 50000, 
        secondaryTotalAmount: 30000,
        equationHint: "S1 = 50k + 0.1(S2)  |  S2 = 30k + 0.2(S1)",
        basisOptions: [
            { id: 'A', text: 'Tính ra: S1=54,082 | S2=40,816', isCorrect: true, feedback: "Chính xác. Đã giải hệ phương trình." },
            { id: 'B', text: 'Dùng luôn 50k và 30k', isCorrect: false, feedback: "Sai. Phải tính dịch vụ qua lại." }
        ],
        targets: [
            { id: 'cutting', name: 'SX A', basisValue: 0, basisLabel: '-', correctAmount: 0 },
            { id: 'sewing', name: 'SX B', basisValue: 0, basisLabel: '-', correctAmount: 0 }
        ]
    }
  ]
};
