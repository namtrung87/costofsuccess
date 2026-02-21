import { DialogueNode, Language } from '../types';

export interface RelevantCostItem {
    id: string;
    name: { EN: string, VI: string };
    description: { EN: string, VI: string };
    cost: number;
    isRelevant: boolean;
    category: 'SUNK' | 'VARIABLE' | 'OPPORTUNITY' | 'FIXED_ALLOCATED' | 'FIXED_INCREMENTAL';
}

export interface RelevantCostScenario {
    specialOrderRevenue: number;
    items: RelevantCostItem[];
}

export const PHASE26_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'NEON DROP HQ. PRIVATE COMMUNICATIONS CHANNEL.',
            backgroundImage: 'BG_TECH_ROOM',
            nextId: 'jules_leak'
        },
        'jules_leak': {
            id: 'jules_leak',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "We just got a ping from 'V0id_Star', the top Meta-Verse influencer. They want 500 custom 'Glitch-Hoodies' for their virtual world drop.",
            nextId: 'rob_panic'
        },
        'rob_panic': {
            id: 'rob_panic',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_ANGRY',
            text: "500 units in a week? The printers are already humming! Plus, we spent $5,000 on the hoodie research last month—we need to make that back!",
            nextId: 'jules_logic'
        },
        'jules_logic': {
            id: 'jules_logic',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Forget the research cost, Rob. That money is gone—it's a Sunk Cost. What matters is the cash flow from *this* moment forward. Intern, use the Radar. Filter out the noise and tell me: Is this order worth it?",
            choices: [
                { text: "Launch Relevant Radar", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Clean analysis. By ignoring the fixed ghosts and past costs, you saw the true profit hidden in the deal. V0id_Star is going to love these.",
            choices: [
                { text: "Next: The Resource Bottleneck", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "You're letting Sunk Costs cloud your vision! If the money is already spent, it doesn't change our decision for today. Level up your focus.",
            choices: [
                { text: "Re-scan the Costs", nextId: 'START_GAME' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'TRỤ SỞ NEON DROP. KÊNH TRUYỀN THÔNG RIÊNG.',
            backgroundImage: 'BG_TECH_ROOM',
            nextId: 'jules_leak'
        },
        'jules_leak': {
            id: 'jules_leak',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Chúng ta vừa nhận được tin từ 'V0id_Star', influencer hàng đầu Meta-Verse. Họ muốn 500 chiếc 'Glitch-Hoodies' tùy chỉnh cho đợt mở bán thế giới ảo của họ.",
            nextId: 'rob_panic'
        },
        'rob_panic': {
            id: 'rob_panic',
            speaker: 'Rob',
            speakerTitle: 'Phụ trách Vận hành',
            characterId: 'CHAR_ROB_ANGRY',
            text: "500 chiếc trong một tuần? Máy in đang chạy hết công suất rồi! Thêm nữa, chúng ta đã tốn $5,000 nghiên cứu hoodie tháng trước—phải gỡ lại vốn chứ!",
            nextId: 'jules_logic'
        },
        'jules_logic': {
            id: 'jules_logic',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Quên chi phí nghiên cứu đi, Rob. Số tiền đó đã tiêu rồi—đó là Chi phí Chìm. Điều quan trọng là dòng tiền từ *bây giờ* trở đi. Thực tập sinh, dùng Ra-đa đi. Lọc bỏ nhiễu và cho tôi biết: Đơn hàng này có đáng nhận không?",
            choices: [
                { text: "Khởi động Ra-đa Đối chiếu", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Phân tích sắc sảo. Bằng cách lờ đi những 'bóng ma' định phí và chi phí quá khứ, bạn đã thấy được lợi nhuận thực sự ẩn giấu. V0id_Star sẽ thích chúng lắm đây.",
            choices: [
                { text: "Tiếp theo: Nút thắt Nguồn lực", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Bạn đang để Chi phí Chìm làm mờ mắt rồi! Nếu tiền đã tiêu, nó không thay đổi quyết định hôm nay của chúng ta. Tập trung lại đi.",
            choices: [
                { text: "Quét lại Chi phí", nextId: 'START_GAME' }
            ]
        }
    }
};

export const PHASE26_DATA: RelevantCostScenario = {
    specialOrderRevenue: 25000, // $50 per hoodie * 500 units
    items: [
        {
            id: 'mat',
            name: { EN: "Custom Fabric", VI: "Vải Tùy Chỉnh" },
            description: { EN: "New material needed just for this order.", VI: "Vải mới cần mua riêng cho đơn này." },
            cost: 8000,
            isRelevant: true,
            category: 'VARIABLE'
        },
        {
            id: 'res',
            name: { EN: "Initial Research Flow", VI: "Nghiên cứu Ban đầu" },
            description: { EN: "Money spent last month on market research.", VI: "Tiền đã tiêu tháng trước để nghiên cứu thị trường." },
            cost: 5000,
            isRelevant: false,
            category: 'SUNK'
        },
        {
            id: 'dep',
            name: { EN: "Machine Depreciation", VI: "Khấu hao Máy móc" },
            description: { EN: "Standard monthly wear and tear accounting.", VI: "Hạch toán hao mòn máy móc hàng tháng." },
            cost: 2000,
            isRelevant: false,
            category: 'FIXED_ALLOCATED'
        },
        {
            id: 'lab',
            name: { EN: "Overtime Labor", VI: "Nhân công Tăng ca" },
            description: { EN: "Extra pay for operators to finish this quickly.", VI: "Phụ cấp thêm để nhân viên hoàn thành sớm." },
            cost: 4000,
            isRelevant: true,
            category: 'VARIABLE'
        },
        {
            id: 'rent',
            name: { EN: "Factory Rent", VI: "Tiền thuê Xưởng" },
            description: { EN: "Existing lease that stays the same.", VI: "Hợp đồng thuê hiện tại không đổi." },
            cost: 3000,
            isRelevant: false,
            category: 'FIXED_ALLOCATED'
        },
        {
            id: 'opp',
            name: { EN: "Lost Regular Sales", VI: "Doanh thu Thường kỳ bị mất" },
            description: { EN: "Profit sacrificed from regular orders to clear capacity.", VI: "Lợi nhuận bị mất từ đơn hàng thường để lấy công suất." },
            cost: 6000,
            isRelevant: true,
            category: 'OPPORTUNITY'
        },
        {
            id: 'setup',
            name: { EN: "Special Design Setup", VI: "Phí Thiết lập Riêng" },
            description: { EN: "One-off fee to calibrate the printers for V0id_Star.", VI: "Phí một lần để căn chỉnh máy in cho V0id_Star." },
            cost: 1500,
            isRelevant: true,
            category: 'FIXED_INCREMENTAL'
        }
    ]
};
