import { DialogueNode, Language } from '../types';

export type BehaviorCategory = 'VARIABLE' | 'FIXED';

export interface BehaviorSortingItem {
    id: string;
    title: string;
    details: string;
    category: BehaviorCategory;
    feedback: string;
}

export const PHASE12_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'TECH ROOM: THE AGILITY TEST. 14:00 PM.',
            backgroundImage: 'BG_TECH_ROOM',
            nextId: 'rob_panic'
        },
        'rob_panic': {
            id: 'rob_panic',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_SHOCKED',
            text: "Jules! We just got a massive order from 'The Hypebeast Cartel'. 5,000 units. But they want a 30% discount. If we use the old Absorption Costing system, we lose money!",
            nextId: 'jules_calm'
        },
        'jules_calm': {
            id: 'jules_calm',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Calm down, Rob. The old system spreads Fixed Costs over everything. We need to isolate them. Intern! Separate the flexible costs from the rigid ones.",
            choices: [
                { text: "What do you mean by flexible and rigid?", nextId: 'jules_explain' }
            ]
        },
        'jules_explain': {
            id: 'jules_explain',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Cost Behavior. A VARIABLE COST fluctuates directly with production. More hoodies = more fabric. A FIXED COST remains constant regardless of production... like the factory rent.",
            nextId: 'jules_challenge'
        },
        'jules_challenge': {
            id: 'jules_challenge',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "I've sent the upcoming invoices to your console. Swipe LEFT for VARIABLE costs. Swipe RIGHT for FIXED costs. Don't mess this up, or we reject the biggest deal of the year.",
            choices: [
                { text: "Start Sorter", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Clean classification. Now we know exactly how much each additional hoodie truly costs us to make.",
            choices: [
                { text: "Next...", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "You categorized Rent as a Variable Cost? Are you kidding me? The landlord doesn't care how many hoodies we sell. Try again.",
            choices: [
                { text: "Understood.", nextId: 'END_PHASE' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'PHÒNG KỸ THUẬT: BÀI TEST NHANH NHẸN. 14:00 CHIỀU.',
            backgroundImage: 'BG_TECH_ROOM',
            nextId: 'rob_panic'
        },
        'rob_panic': {
            id: 'rob_panic',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_SHOCKED',
            text: "Jules! Chúng ta vừa nhận được đơn hàng khổng lồ từ 'The Hypebeast Cartel'. 5,000 cái. Nhưng họ đòi giảm giá 30%. Nếu dùng hệ thống Kế toán Chi phí Toàn bộ cũ, chúng ta sẽ lỗ sập mặt!",
            nextId: 'jules_calm'
        },
        'jules_calm': {
            id: 'jules_calm',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Bình tĩnh đi Rob. Hệ thống cũ chia đều Định phí cho mọi sản phẩm. Chúng ta cần tách chúng ra. Thực tập sinh! Tách các chi phí linh hoạt ra khỏi các chi phí cứng nhắc đi.",
            choices: [
                { text: "Linh hoạt và cứng nhắc nghĩa là sao?", nextId: 'jules_explain' }
            ]
        },
        'jules_explain': {
            id: 'jules_explain',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Ứng xử Chi phí. BIẾN PHÍ (Variable) thay đổi theo sản lượng. Thêm áo = thêm tiền vải. ĐỊNH PHÍ (Fixed) giữ nguyên bất kể sản lượng... giống như tiền thuê xưởng vậy.",
            nextId: 'jules_challenge'
        },
        'jules_challenge': {
            id: 'jules_challenge',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Chị vừa gửi các hóa đơn sắp tới vào máy cưng. Quẹt TRÁI cho BIẾN PHÍ. Quẹt PHẢI cho ĐỊNH PHÍ. Làm cho đàng hoàng, không là mất hợp đồng lớn nhất năm đấy.",
            choices: [
                { text: "Bắt đầu phân loại", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Phân loại gọn gàng đấy. Giờ chúng ta đã biết chính xác chi phí thực sự để làm thêm mỗi chiếc áo là bao nhiêu.",
            choices: [
                { text: "Tiếp tục...", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Cưng phân loại Tiền Thuê Xưởng vào Biến phí hả? Đùa à? Chủ nhà đâu quan tâm mình bán được bao nhiêu áo. Làm lại đi.",
            choices: [
                { text: "Đã hiểu.", nextId: 'END_PHASE' }
            ]
        }
    }
};

export const BEHAVIOR_ITEMS: Record<Language, BehaviorSortingItem[]> = {
    EN: [
        {
            id: 'b1',
            title: 'Supplier: Denim & Co.',
            details: 'Raw Denim Fabric',
            category: 'VARIABLE',
            feedback: "Correct! More hoodies = more fabric needed."
        },
        {
            id: 'b2',
            title: 'Bill: Logistics Warehouse Rent',
            details: 'Monthly Lease Agreement',
            category: 'FIXED',
            feedback: "Correct! Rent stays the same no matter how much we make."
        },
        {
            id: 'b3',
            title: 'Invoice: Sewing Machine Power',
            details: 'Electricity billed per machine hour',
            category: 'VARIABLE',
            feedback: "Yes! Running machines more equates to more units and more power."
        },
        {
            id: 'b4',
            title: 'Payroll: Factory Supervisor Salary',
            details: 'Fixed Monthly Salary',
            category: 'FIXED',
            feedback: "Correct! The supervisor gets paid the same regardless of output."
        },
        {
            id: 'b5',
            title: 'Supplier: YKK Zippers',
            details: 'Zippers per unit produced',
            category: 'VARIABLE',
            feedback: "Exactly! Direct materials are always variable."
        },
        {
            id: 'b6',
            title: 'Insurance: Factory Policy',
            details: 'Annual Premium',
            category: 'FIXED',
            feedback: "Right. Insurance doesn't change with daily production."
        },
        {
            id: 'b7',
            title: 'Invoice: Production Worker Wages',
            details: 'Paid per hour worked per unit',
            category: 'VARIABLE',
            feedback: "Direct labor usually acts as a variable cost here."
        }
    ],
    VI: [
        {
            id: 'b1',
            title: 'NCC: Denim & Co.',
            details: 'Vải Denim thô',
            category: 'VARIABLE',
            feedback: "Chuẩn! Làm nhiều áo = tốn nhiều vải hơn."
        },
        {
            id: 'b2',
            title: 'Hóa đơn: Thuê Kho chung',
            details: 'Hợp đồng Thuê Hàng tháng',
            category: 'FIXED',
            feedback: "Đúng! Tiền thuê kho không đổi dù mình làm bao nhiêu áo."
        },
        {
            id: 'b3',
            title: 'Hóa đơn: Điện chạy Máy may',
            details: 'Dựa trên số giờ chạy máy',
            category: 'VARIABLE',
            feedback: "Đúng! Chạy máy nhiều hơn tức là tiêu hao nhiều điện hơn."
        },
        {
            id: 'b4',
            title: 'Lương: Quản đốc Phân xưởng',
            details: 'Lương cứng hàng tháng',
            category: 'FIXED',
            feedback: "Chuẩn! Quản đốc nhận lương cố định bất luận sản lượng."
        },
        {
            id: 'b5',
            title: 'NCC: Khóa kéo YKK',
            details: 'Khóa kéo trên mỗi sản phẩm',
            category: 'VARIABLE',
            feedback: "Chính xác! Nguyên liệu trực tiếp luôn là biến phí."
        },
        {
            id: 'b6',
            title: 'Bảo hiểm: Nhà máy',
            details: 'Phí đóng hàng năm',
            category: 'FIXED',
            feedback: "Đúng. Phí bảo hiểm không thay đổi theo sản lượng hàng ngày."
        },
        {
            id: 'b7',
            title: 'Lương: Công nhân sản xuất',
            details: 'Trả theo giờ công trực tiếp',
            category: 'VARIABLE',
            feedback: "Nhân công trực tiếp thường hoạt động như biến phí."
        }
    ]
};
