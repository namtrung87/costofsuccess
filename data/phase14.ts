import { DialogueNode, Language } from '../types';

export interface ReconciliationScenario {
    id: string;
    title: Record<Language, string>;
    description: Record<Language, string>;
    openingInventory: number;
    productionUnits: number;
    salesUnits: number;
    closingInventory: number;
    sellingPrice: number;
    variableCostPerUnit: number;
    fixedOAR: number; // Fixed Overhead Absorption Rate
    actualFixedOverhead: number;
    expectedAbsorptionProfit: number;
    expectedMarginalProfit: number;
}

export const PHASE14_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'VALUATION STATION. END OF THE QUARTER.',
            backgroundImage: 'BG_VALUATION_ROOM',
            nextId: 'rob_complains'
        },
        'rob_complains': {
            id: 'rob_complains',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_ANGRY',
            text: "I don't get it. We had a crazy quarter. Some months we overproduced, some we cleared out the warehouse. My Absorption reports show wild profit swings, but Jules' Marginal reports look totally different. Is someone cooking the books?",
            nextId: 'jules_arrives'
        },
        'jules_arrives': {
            id: 'jules_arrives',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Nobody is cooking the books, Rob. It's just inventory valuation. Absorption Costing hides fixed costs in the warehouse when we don't sell everything.",
            nextId: 'rob_confused'
        },
        'rob_confused': {
            id: 'rob_confused',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_SHOCKED',
            text: "Hides it? How do you 'hide' a factory rent payment inside a hoodie?",
            choices: [
                { text: "Good question.", nextId: 'jules_challenge' }
            ]
        },
        'jules_challenge': {
            id: 'jules_challenge',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Intern, fire up 'The Dual Books' system. We're going to prove to Ops that both methods are mathematically sound, they just tell different stories depending on inventory levels.",
            choices: [
                { text: "Initiate Reconciliation Suite", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Rob',
            speakerTitle: 'Head of Ops',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "Okay... I see it now. The difference in profit is literally just the Change in Inventory multiplied by the Fixed OAR. It's just accounting timing.",
            choices: [
                { text: "Exactly.", nextId: 'jules_closing' }
            ]
        },
        'jules_closing': {
            id: 'jules_closing',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Bingo. Profit is an opinion. Cash is a fact. Let's move on before my coffee gets cold.",
            choices: [
                { text: "Proceed to Phase 15", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Your scale didn't balance. Review the handbook. The bridge between the two profits is ALWAYS the fixed costs trapped inside the changing inventory. Try again.",
            choices: [
                { text: "Rebooting...", nextId: 'END_PHASE' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'TRẠM ĐỊNH GIÁ. CUỐI QUÝ.',
            backgroundImage: 'BG_VALUATION_ROOM',
            nextId: 'rob_complains'
        },
        'rob_complains': {
            id: 'rob_complains',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_ANGRY',
            text: "Tôi chả hiểu nổi. Quý vừa rồi điên rồ thật. Báo cáo Tồn kho Cổ điển (Absorption) của tôi nhảy múa liên tục, nhưng Báo cáo Đảm phí (Marginal) của Jules lại ra số khác hẳn. Có ai xào nấu sổ sách không đấy?",
            nextId: 'jules_arrives'
        },
        'jules_arrives': {
            id: 'jules_arrives',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Không ai xào nấu sổ sách cả, Rob. Chỉ là cách định giá hàng tồn kho thôi. Absorption Costing đã giấu định phí vào trong kho khi chúng ta không bán hết hàng.",
            nextId: 'rob_confused'
        },
        'rob_confused': {
            id: 'rob_confused',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_SHOCKED',
            text: "Giấu á? Làm sao cô 'giấu' được tiền thuê nhà máy vào trong một cái áo hoodie?",
            choices: [
                { text: "Câu hỏi hay đấy.", nextId: 'jules_challenge' }
            ]
        },
        'jules_challenge': {
            id: 'jules_challenge',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Thực tập sinh, bật hệ thống 'Hai Cuốn Sổ' lên. Chúng ta sẽ chứng minh cho bên Vận hành thấy cả hai phương pháp đều đúng toán học, chỉ là câu chuyện chúng kể khác nhau tùy vào lượng hàng tồn kho.",
            choices: [
                { text: "Khởi động Trạm Đối chiếu", nextId: 'START_GAME' }
            ]
        },
        'post_game_success': {
            id: 'post_game_success',
            speaker: 'Rob',
            speakerTitle: 'Giám đốc Vận hành',
            characterId: 'CHAR_ROB_NEUTRAL',
            text: "Okay... Tôi hiểu rồi. Chênh lệch lợi nhuận thực chất chỉ là Chênh lệch Tồn kho nhân với OAR Cố định. Tất cả chỉ là thời điểm ghi nhận kế toán.",
            choices: [
                { text: "Chính xác.", nextId: 'jules_closing' }
            ]
        },
        'jules_closing': {
            id: 'jules_closing',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "Chuẩn cơm mẹ nấu. Lợi nhuận là quan điểm. Tiền mặt là Sự thật. Đi thôi trước khi cà phê của chị nguội.",
            choices: [
                { text: "Sang Màn 15", nextId: 'END_PHASE' }
            ]
        },
        'post_game_failure': {
            id: 'post_game_failure',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Cái cân của cưng chưa thăng bằng. Đọc lại Wiki đi. Cây cầu nối giữa 2 mức lợi nhuận LUÔN LÀ phần định phí bị kẹt lại trong biên độ tồn kho thay đổi.",
            choices: [
                { text: "Đang khởi động lại...", nextId: 'END_PHASE' }
            ]
        }
    }
};

export const RECONCILIATION_SCENARIOS: ReconciliationScenario[] = [
    {
        id: 'month_1',
        title: { EN: "Month 1: The Build Up", VI: "Tháng 1: Tích Trữ Hàng" },
        description: {
            EN: "We produced more than we sold. Notice how Absorption Profit is higher.",
            VI: "Ta sản xuất nhiều hơn bán. Lưu ý Lợi nhuận Absorption cao hơn."
        },
        openingInventory: 0,
        productionUnits: 5000,
        salesUnits: 4000,
        closingInventory: 1000,
        sellingPrice: 100,
        variableCostPerUnit: 60,
        fixedOAR: 10,
        actualFixedOverhead: 50000,
        // Expected Profit Math:
        // Marginal: Sales(400k) - VarCostOfSales(240k) = Contribution (160k) - Fixed (50k) = 110k
        // Absorption: Sales(400k) - CostOfSales(4k * $70 = 280k) = 120k. (Diff = 10k matches 1000 inv * $10 OAR)
        expectedMarginalProfit: 110000,
        expectedAbsorptionProfit: 120000
    },
    {
        id: 'month_2',
        title: { EN: "Month 2: The Fire Sale", VI: "Tháng 2: Xả Kho" },
        description: {
            EN: "We sold from last month's inventory. Absorption releases old costs.",
            VI: "Bán hàng tồn từ tháng trước. Absorption giải phóng chi phí cũ."
        },
        openingInventory: 1000,
        productionUnits: 3000,
        salesUnits: 4000,
        closingInventory: 0,
        sellingPrice: 100,
        variableCostPerUnit: 60,
        fixedOAR: 10,
        actualFixedOverhead: 30000, // Matching prod to avoid under absorption complexity in this level
        // Expected Profit Math:
        // Marginal: Sales(400k) - VarCostOfSales(240k) = Contrib(160k) - Fixed(30k) = 130k
        // Absorption: Sales(400k) - CostOfSales(4k * 70 = 280k) = 120k
        // Note: Diff = 10k (Marginal higher). Matches 1000 inv decr * 10 OAR.
        expectedMarginalProfit: 130000,
        expectedAbsorptionProfit: 120000
    },
    {
        id: 'month_3',
        title: { EN: "Month 3: Just-In-Time", VI: "Tháng 3: Cân Xứng" },
        description: {
            EN: "Production matches Sales perfectly. No inventory change.",
            VI: "Sản xuất vừa bằng Tiêu thụ. Không biến động tồn kho."
        },
        openingInventory: 0,
        productionUnits: 4000,
        salesUnits: 4000,
        closingInventory: 0,
        sellingPrice: 100,
        variableCostPerUnit: 60,
        fixedOAR: 10,
        actualFixedOverhead: 40000,
        // Expected Profit Math:
        // Marginal: Sales(400k) - VarCostOfSales(240k) = Contrib(160k) - Fixed(40k) = 120k
        // Absorption: Sales(400k) - CostOfSales(280k) = 120k
        expectedMarginalProfit: 120000,
        expectedAbsorptionProfit: 120000
    },
    {
        id: 'month_4',
        title: { EN: "Month 4: The OAR Trap", VI: "Tháng 4: Bẫy OAR" },
        description: {
            EN: "Rent went up unexpectedly! Watch out for Under-Absorption.",
            VI: "Tiền thuê nhà đột ngột tăng! Cẩn thận Phân bổ Thiếu."
        },
        openingInventory: 0,
        productionUnits: 5000, // Budget was 5k, expected 50k
        salesUnits: 4000,
        closingInventory: 1000,
        sellingPrice: 100,
        variableCostPerUnit: 60,
        fixedOAR: 10,
        actualFixedOverhead: 60000, // Under-absorbed by 10k!
        // Expected Profit Math:
        // Marginal: Sales(400k) - VarCostOfSales(240k) = 160k - 60k(ACTUAL fixed) = 100k
        // Absorption: Sales(400k) - CostOfSales(280k) = 120k. Less UnderAbsorbed (10k) = 110k
        // Diff between them: 110k - 100k = 10k = (1000 closing inv * 10 OAR).
        expectedMarginalProfit: 100000,
        expectedAbsorptionProfit: 110000
    }
];
