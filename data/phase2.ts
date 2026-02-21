import { DialogueNode, Language } from '../types';

export type CostCategory = 'PRIME' | 'PERIOD';

export interface SortingItem {
  id: string;
  title: string;
  details: string;
  category: CostCategory;
  feedback: string;
}

export const PHASE2_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
  EN: {
    'start': {
        id: 'start',
        speaker: 'System',
        text: 'DESIGN LAB: FABRIC LIBRARY. 10:15 AM.',
        backgroundImage: 'BG_DESIGN_LAB',
        nextId: 'meet_team'
    },
    'meet_team': {
        id: 'meet_team',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_NEUTRAL',
        text: "Welcome to the Fabric Library. Look at Kai over there.",
        nextId: 'kai_intro'
    },
    'kai_intro': {
        id: 'kai_intro',
        speaker: 'System',
        text: "(Kai is draping a glowing holographic zipper onto a mannequin in the background.)",
        characterId: 'CHAR_KAI_NEUTRAL', 
        nextId: 'jules_explain'
    },
    'jules_explain': {
        id: 'jules_explain',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_NEUTRAL',
        text: "Kai is creating the 'Neon-Genesis Hoodie'. Your job isn't to design it; it's to categorize the mess of bills we get every day. We need to know: Is it a PRIME COST or a PERIOD COST?",
        choices: [
        { text: "What's the difference? Isn't it all just... money out?", nextId: 'jules_definitions' }
        ]
    },
    'jules_definitions': {
        id: 'jules_definitions',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_ANGRY',
        text: "No! If you mix these up, I go to jail. Listen: PRIME COST is the 'Meat and Potatoes' (Direct Material + Labor). Without it, the hoodie doesn't exist.",
        nextId: 'jules_definitions_2'
    },
    'jules_definitions_2': {
        id: 'jules_definitions_2',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_NEUTRAL',
        text: "PERIOD COST is 'Vibe Maintenance' (Rent, WiFi, Marketing). Whether we make 1 hoodie or 1,000, we pay this every month. It's an expense.",
        nextId: 'quiz_intro'
    },
    'quiz_intro': {
        id: 'quiz_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_NEUTRAL',
        text: "Before I let you loose on the company server, let’s do a quick vibe check.",
        nextId: 'quiz_q1'
    },
    'quiz_q1': {
        id: 'quiz_q1',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_NEUTRAL',
        text: "I just paid $5,000 to 'Lil Hype' to wear our shoes on Instagram. What is that?",
        choices: [
        { 
            text: "Prime Cost. It helps sell the shoe!", 
            nextId: 'quiz_q1_wrong',
            action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: -5 }) 
        },
        { 
            text: "Period Cost. It's a selling expense.", 
            nextId: 'quiz_q1_correct',
            action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: 5 })
        }
        ]
    },
    'quiz_q1_wrong': {
        id: 'quiz_q1_wrong',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_SIP', 
        text: "Wrong. That’s Marketing. The shoe was already made before he wore it. It's a Period Cost.",
        nextId: 'quiz_q2'
    },
    'quiz_q1_correct': {
        id: 'quiz_q1_correct',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_SMUG',
        text: "Bingo. It’s an expense for this month.",
        nextId: 'quiz_q2'
    },
    'quiz_q2': {
        id: 'quiz_q2',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_NEUTRAL',
        text: "Okay, what about the organic cotton fabric we just imported from Vietnam?",
        choices: [
        { 
            text: "Prime Cost. It IS the product.", 
            nextId: 'quiz_q2_correct',
            action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: 5 })
        },
        { 
            text: "Period Cost. We bought it this month.", 
            nextId: 'quiz_q2_wrong',
            action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: -5 })
        }
        ]
    },
    'quiz_q2_correct': {
        id: 'quiz_q2_correct',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_SMUG',
        text: "Exactly. Direct Material. It sits in inventory until sold.",
        nextId: 'game_intro'
    },
    'quiz_q2_wrong': {
        id: 'quiz_q2_wrong',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_ANGRY',
        text: "No. If we don't sell the hoodie, that cotton sits in inventory. It's a Product (Prime) cost.",
        nextId: 'game_intro'
    },
    'game_intro': {
        id: 'game_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_NEUTRAL',
        text: "Okay, you get the theory. Now for the reality. My inbox is 99+ with invoices. Open the 'Cost-Sort App'.",
        nextId: 'game_instructions'
    },
    'game_instructions': {
        id: 'game_instructions',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_NEUTRAL',
        text: "Swipe LEFT for PRIME COST (Product). Swipe RIGHT for PERIOD COST (Expense). Don't mess this up.",
        choices: [
        { text: "Launch App", nextId: 'START_GAME' }
        ]
    },
    'post_game_success': {
        id: 'post_game_success',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_HAPPY',
        text: "Impressive. You cleared the inbox and the P&L looks clean. Proceed to Sector 2.",
        choices: [
            { text: "On it.", nextId: 'END_PHASE' }
        ]
    },
    'post_game_failure': {
        id: 'post_game_failure',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_ANGRY',
        text: "Messy. You capitalized the pizza party and expensed the zippers. Do better next time.",
        choices: [
            { text: "I'll try harder.", nextId: 'END_PHASE' }
        ]
    }
  },
  VI: {
    'start': {
        id: 'start',
        speaker: 'Hệ thống',
        text: 'PHÒNG THIẾT KẾ: KHO VẢI. 10:15 SÁNG.',
        backgroundImage: 'BG_DESIGN_LAB',
        nextId: 'meet_team'
    },
    'meet_team': {
        id: 'meet_team',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_NEUTRAL',
        text: "Chào mừng đến Kho Vải. Nhìn Kai đằng kia kìa.",
        nextId: 'kai_intro'
    },
    'kai_intro': {
        id: 'kai_intro',
        speaker: 'Hệ thống',
        text: "(Kai đang ướm một cái khóa kéo hologram phát sáng lên ma-nơ-canh ở phía sau.)",
        characterId: 'CHAR_KAI_NEUTRAL', 
        nextId: 'jules_explain'
    },
    'jules_explain': {
        id: 'jules_explain',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_NEUTRAL',
        text: "Kai đang tạo ra 'Neon-Genesis Hoodie'. Việc của cưng không phải thiết kế, mà là phân loại đống hóa đơn này. Phải biết: Đó là CHI PHÍ CƠ BẢN hay CHI PHÍ THỜI KỲ?",
        choices: [
        { text: "Khác gì nhau? Chẳng phải đều là... tốn tiền sao?", nextId: 'jules_definitions' }
        ]
    },
    'jules_definitions': {
        id: 'jules_definitions',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_ANGRY',
        text: "Không! Nhầm lẫn là chị đi tù đấy. Nghe này: CHI PHÍ CƠ BẢN là 'Cơm áo gạo tiền' (Vải + Nhân công). Không có nó thì không có áo.",
        nextId: 'jules_definitions_2'
    },
    'jules_definitions_2': {
        id: 'jules_definitions_2',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_NEUTRAL',
        text: "CHI PHÍ THỜI KỲ là 'Phí duy trì cuộc chơi' (Thuê nhà, WiFi, Marketing). Dù làm 1 cái áo hay 1000 cái, vẫn phải trả mỗi tháng. Đó là chi phí hoạt động.",
        nextId: 'quiz_intro'
    },
    'quiz_intro': {
        id: 'quiz_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_NEUTRAL',
        text: "Trước khi thả cưng vào hệ thống công ty, test nhanh cái đã.",
        nextId: 'quiz_q1'
    },
    'quiz_q1': {
        id: 'quiz_q1',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_NEUTRAL',
        text: "Chị vừa trả $5,000 cho 'Lil Hype' để mang giày của mình lên Instagram. Đó là gì?",
        choices: [
        { 
            text: "Chi phí Cơ bản. Nó giúp bán giày mà!", 
            nextId: 'quiz_q1_wrong',
            action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: -5 }) 
        },
        { 
            text: "Chi phí Thời kỳ. Đó là chi phí bán hàng.", 
            nextId: 'quiz_q1_correct',
            action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: 5 })
        }
        ]
    },
    'quiz_q1_wrong': {
        id: 'quiz_q1_wrong',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_SIP', 
        text: "Sai. Đó là Marketing. Đôi giày đã làm xong trước khi hắn mang rồi. Đó là Chi phí Thời kỳ.",
        nextId: 'quiz_q2'
    },
    'quiz_q1_correct': {
        id: 'quiz_q1_correct',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_SMUG',
        text: "Chuẩn. Đó là chi phí cho tháng này.",
        nextId: 'quiz_q2'
    },
    'quiz_q2': {
        id: 'quiz_q2',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_NEUTRAL',
        text: "Thế còn vải cotton hữu cơ vừa nhập từ Việt Nam thì sao?",
        choices: [
        { 
            text: "Chi phí Cơ bản. Nó CHÍNH LÀ sản phẩm.", 
            nextId: 'quiz_q2_correct',
            action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: 5 })
        },
        { 
            text: "Chi phí Thời kỳ. Mình mua trong tháng này mà.", 
            nextId: 'quiz_q2_wrong',
            action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: -5 })
        }
        ]
    },
    'quiz_q2_correct': {
        id: 'quiz_q2_correct',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_SMUG',
        text: "Chính xác. Nguyên liệu trực tiếp. Nó nằm trong kho đến khi bán được.",
        nextId: 'game_intro'
    },
    'quiz_q2_wrong': {
        id: 'quiz_q2_wrong',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_ANGRY',
        text: "Không. Nếu không bán áo, vải vẫn nằm đó. Đó là chi phí Sản phẩm (Cơ bản).",
        nextId: 'game_intro'
    },
    'game_intro': {
        id: 'game_intro',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_NEUTRAL',
        text: "Ok, hiểu lý thuyết rồi. Giờ tới thực tế. Hộp thư chị đang +99 hóa đơn. Mở app 'Cost-Sort' lên.",
        nextId: 'game_instructions'
    },
    'game_instructions': {
        id: 'game_instructions',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_NEUTRAL',
        text: "Quẹt TRÁI là CƠ BẢN (Sản phẩm). Quẹt PHẢI là THỜI KỲ (Chi phí). Đừng làm hỏng đấy.",
        choices: [
        { text: "Mở Ứng dụng", nextId: 'START_GAME' }
        ]
    },
    'post_game_success': {
        id: 'post_game_success',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_HAPPY',
        text: "Ấn tượng đấy. Cưng đã dọn sạch hộp thư và Báo cáo lãi lỗ trông sạch đẹp. Qua Khu vực 2 đi.",
        choices: [
            { text: "Đi ngay.", nextId: 'END_PHASE' }
        ]
    },
    'post_game_failure': {
        id: 'post_game_failure',
        speaker: 'Jules',
        speakerTitle: 'CFO',
        characterId: 'CHAR_JULES_ANGRY',
        text: "Lộn xộn quá. Cưng tính tiệc pizza vào giá vốn và tính khóa kéo vào chi phí quản lý hả. Lần sau làm tốt hơn nhé.",
        choices: [
            { text: "Em sẽ cố gắng.", nextId: 'END_PHASE' }
        ]
    }
  }
};

export const SORTING_ITEMS: Record<Language, SortingItem[]> = {
  EN: [
    { 
        id: '1', 
        title: 'Supplier: GreenTextiles Co.', 
        details: '500 yards of Black Denim', 
        category: 'PRIME', 
        feedback: "Nice. That's the body of the hoodie." 
    },
    { 
        id: '2', 
        title: 'Employee: Kai (Senior Tailor)', 
        details: '40 Hours Sewing', 
        category: 'PRIME', 
        feedback: "Correct. He made the product." 
    },
    { 
        id: '3', 
        title: 'Bill: Zoom Premium', 
        details: 'Subscription for HQ', 
        category: 'PERIOD', 
        feedback: "Yep. Admin cost." 
    },
    { 
        id: '4', 
        title: 'Supplier: YKK Zippers', 
        details: '2,000 Neon Zippers', 
        category: 'PRIME', 
        feedback: "Essential component. Prime." 
    },
    { 
        id: '5', 
        title: 'Bill: TikTok Ads Manager', 
        details: "'Winter Drop' Campaign", 
        category: 'PERIOD', 
        feedback: "Selling cost. Period." 
    },
    { 
        id: '6', 
        title: 'Salary: Jules (CFO)', 
        details: 'Monthly Payroll', 
        category: 'PERIOD', 
        feedback: "I don't sew clothes. I count cash. Period cost." 
    },
    { 
        id: '7', 
        title: 'Invoice: Designer Royalties', 
        details: '$5 per hoodie produced', 
        category: 'PRIME', 
        feedback: "Tricky! But it's tied directly to making the unit. Prime." 
    },
    { 
        id: '8', 
        title: 'Bill: Office "Happy Hour"', 
        details: 'Pizza & Boba', 
        category: 'PERIOD', 
        feedback: "Delicious, but definitely an expense." 
    },
    { 
        id: '9', 
        title: 'Invoice: Packaging Boxes', 
        details: 'Individual Unit Boxes', 
        category: 'PRIME', 
        feedback: "Correct. Packaging moves with the unit." 
    },
    { 
        id: '10', 
        title: 'Bill: Security Guard', 
        details: 'Warehouse Service', 
        category: 'PERIOD', 
        feedback: "Correct. He protects the goods, he doesn't make them." 
    }
  ],
  VI: [
    { 
        id: '1', 
        title: 'NCC: GreenTextiles Co.', 
        details: '500 mét vải Denim Đen', 
        category: 'PRIME', 
        feedback: "Tốt. Đó là thân áo hoodie." 
    },
    { 
        id: '2', 
        title: 'Nhân viên: Kai (Thợ may)', 
        details: '40 Giờ may', 
        category: 'PRIME', 
        feedback: "Đúng. Cậu ấy tạo ra sản phẩm." 
    },
    { 
        id: '3', 
        title: 'Hóa đơn: Zoom Premium', 
        details: 'Gói đăng ký cho Trụ sở', 
        category: 'PERIOD', 
        feedback: "Chuẩn. Chi phí quản lý." 
    },
    { 
        id: '4', 
        title: 'NCC: Khóa kéo YKK', 
        details: '2,000 Khóa kéo Neon', 
        category: 'PRIME', 
        feedback: "Thành phần thiết yếu. Cơ bản." 
    },
    { 
        id: '5', 
        title: 'Hóa đơn: Quảng cáo TikTok', 
        details: 'Chiến dịch "Mùa Đông"', 
        category: 'PERIOD', 
        feedback: "Chi phí bán hàng. Thời kỳ." 
    },
    { 
        id: '6', 
        title: 'Lương: Jules (CFO)', 
        details: 'Lương tháng', 
        category: 'PERIOD', 
        feedback: "Chị không may áo. Chị đếm tiền. Chi phí Thời kỳ." 
    },
    { 
        id: '7', 
        title: 'Hóa đơn: Bản quyền Thiết kế', 
        details: '$5 trên mỗi áo sản xuất', 
        category: 'PRIME', 
        feedback: "Khó đấy! Nhưng nó gắn liền với việc tạo ra sản phẩm. Cơ bản." 
    },
    { 
        id: '8', 
        title: 'Hóa đơn: "Happy Hour" VP', 
        details: 'Pizza & Trà sữa', 
        category: 'PERIOD', 
        feedback: "Ngon đấy, nhưng chắc chắn là chi phí quản lý." 
    },
    { 
        id: '9', 
        title: 'Hóa đơn: Hộp đóng gói', 
        details: 'Hộp đựng từng cái áo', 
        category: 'PRIME', 
        feedback: "Đúng. Bao bì đi kèm với sản phẩm." 
    },
    { 
        id: '10', 
        title: 'Hóa đơn: Bảo vệ', 
        details: 'Dịch vụ Kho bãi', 
        category: 'PERIOD', 
        feedback: "Đúng. Ổng bảo vệ hàng, ổng không làm ra hàng." 
    }
  ]
};
