import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { GamePhase } from '../../types';

const PHASE_FACTS: Record<string, { EN: string[]; VI: string[] }> = {
    DEFAULT: {
        EN: [
            "PRIME COST is the baseline. Sell below it and you're literally paying them to take your stuff.",
            "SUNK COSTS are 'ghosts'—don't let them haunt your future decisions.",
            "CONTRIBUTION is king. No contribution, no runway. No runway, no boba.",
        ],
        VI: [
            "CHI PHÍ CƠ BẢN là ranh giới cuối cùng. Bán dưới mức này là đang làm từ thiện.",
            "CHI PHÍ CHÌM là 'quá khứ'—đừng để nó ảnh hưởng đến quyết định tương lai.",
            "SỐ DƯ ĐẢM PHÍ là vua. Không có nó thì không có trà sữa đâu.",
        ]
    },
    PHASE_2: {
        EN: [
            "PRIME COSTS go on the Balance Sheet as Inventory (Asset)—not the Income Statement.",
            "PERIOD COSTS hit the P&L immediately. Every dollar of admin spend is gone.",
            "Fun fact: Marketing spend is NEVER part of product cost under IFRS rules.",
        ],
        VI: [
            "CHI PHÍ SẢN PHẨM nằm trên Bảng Cân đối kế toán (Hàng tồn kho—Tài sản).",
            "CHI PHÍ THỜI KỲ ảnh hưởng ngay lập tức lên Báo cáo KQHĐKD.",
            "Chi phí Marketing không bao giờ là một phần của giá thành sản phẩm theo IFRS.",
        ]
    },
    PHASE_3: {
        EN: [
            "DIRECT = can be traced to a single unit. INDIRECT = shared across many units.",
            "Direct Material + Direct Labor + Direct Expense = PRIME COST.",
            "Royalties paid per-unit are a Direct Expense. Mind = blown.",
        ],
        VI: [
            "TRỰC TIẾP = truy xuất được về một đơn vị. GIÁN TIẾP = dùng chung cho nhiều đơn vị.",
            "NVL Trực tiếp + Nhân công Trực tiếp + Chi phí Trực tiếp = CHI PHÍ CƠ BẢN.",
            "Phí bản quyền tính theo đơn vị là Chi phí Trực tiếp. Mindblown.",
        ]
    },
    PHASE_9: {
        EN: [
            "OAR = Budgeted Overhead ÷ Budgeted Activity. Set it once, apply it all year.",
            "OVER-ABSORPTION means you charged MORE overhead than was actually incurred. Good problem to have.",
            "UNDER-ABSORPTION means overhead was under-charged. Usually means less output than planned.",
        ],
        VI: [
            "OAR = Chi phí SXC Ước tính ÷ Mức Hoạt động Ước tính. Tính một lần, dùng cả năm.",
            "HẤP THỤ THỪA nghĩa là bạn phân bổ nhiều hơn chi phí thực. Vấn đề tốt đấy.",
            "HẤP THỤ THIẾU nghĩa là phân bổ ít hơn thực tế. Thường do sản lượng thực tế thấp hơn kế hoạch.",
        ]
    },
    PHASE_12: {
        EN: [
            "VARIABLE costs change proportionally with output. Think: fabric per hoodie.",
            "FIXED costs stay constant in total but DECREASE per-unit as you produce more.",
            "SEMI-VARIABLE costs have a fixed base + a variable element. Like your phone bill.",
        ],
        VI: [
            "Chi phí BIẾN ĐỔI thay đổi tỷ lệ thuận với sản lượng. Ví dụ: vải mỗi cái hoodie.",
            "Chi phí CỐ ĐỊNH tổng thể không đổi nhưng GIẢM trên mỗi đơn vị khi sản xuất tăng.",
            "Chi phí HỖN HỢP có phần cố định + phần biến đổi. Giống hóa đơn điện thoại.",
        ]
    },
    PHASE_13: {
        EN: [
            "CONTRIBUTION = Sales Revenue – Variable Costs. This is your true profit engine.",
            "MARGINAL costing is BANNED for external reporting but gold for internal decisions.",
            "Contribution per unit × Units sold = Total Contribution → then deduct Fixed Costs for profit.",
        ],
        VI: [
            "SỐ DƯ ĐẢM PHÍ = Doanh thu – Chi phí Biến đổi. Đây là động cơ lợi nhuận thực sự.",
            "Kế toán CẬN BIÊN bị CẤM dùng trong báo cáo ra bên ngoài, nhưng cực kỳ hữu ích nội bộ.",
            "Số dư đảm phí × Số lượng = Tổng đảm phí → trừ Chi phí Cố định = Lợi nhuận.",
        ]
    },
    PHASE_15: {
        EN: [
            "Break-Even Point (units) = Fixed Costs ÷ Contribution Per Unit.",
            "Break-Even Revenue = Fixed Costs ÷ C/S Ratio.",
            "Above BEP every extra unit is pure profit. Below it, you're losing money.",
        ],
        VI: [
            "SẢN LƯỢNG HÒA VỐN = Chi phí Cố định ÷ Số dư Đảm phí Đơn vị.",
            "DOANH THU HÒA VỐN = Chi phí Cố định ÷ Tỷ lệ Đảm phí.",
            "Vượt điểm hòa vốn, mỗi đơn vị là lợi nhuận thuần. Dưới đó là thua lỗ.",
        ]
    },
    PHASE_17: {
        EN: [
            "Standard Cost is a PLANNED cost, not an actual one. It's the budget for a single unit.",
            "Standard costs are set using ideal standards (best case) or attainable standards (realistic).",
            "Variances = Actual vs Standard. Understanding WHY they differ is the real skill.",
        ],
        VI: [
            "Chi phí Định mức là chi phí KẾ HOẠCH, không phải thực tế. Đó là ngân sách cho một đơn vị.",
            "Định mức được xây dựng theo tiêu chuẩn lý tưởng (tốt nhất) hoặc có thể đạt (thực tế).",
            "Chênh lệch = Thực tế so với Định mức. Hiểu TẠI SAO chênh lệch mới là kỹ năng thực sự.",
        ]
    },
};

const getFactsForPhase = (phase: GamePhase): { EN: string[]; VI: string[] } => {
    const phaseKey = phase.replace(/_LOBBY|_QUIZ|_INTERVIEW|_SORTING|_ELEMENTS|_BOSS|_CEREMONY/, '').split('_').slice(0, 2).join('_');
    return PHASE_FACTS[phaseKey] || PHASE_FACTS.DEFAULT;
};

const DidYouKnow: React.FC = () => {
    const { state, dispatch } = useGame();
    const [factIndex, setFactIndex] = useState(0);

    const factsForPhase = getFactsForPhase(state.currentPhase);
    const facts = factsForPhase[state.language];

    useEffect(() => {
        setFactIndex(Math.floor(Math.random() * facts.length));
    }, [state.currentPhase, facts.length]);

    if (state.activeModal !== 'DYK') return null;

    const handleNext = () => setFactIndex((prev) => (prev + 1) % facts.length);

    return (
        <div className="fixed inset-0 z-[200] flex items-end justify-start p-4 md:p-8 pointer-events-none">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="relative max-w-sm w-full pointer-events-auto"
                >
                    {/* Header badge */}
                    <div className="flex items-center justify-between mb-1">
                        <div className="bg-neonGreen text-black px-4 py-1 rounded-t-lg font-heading font-black text-[10px] uppercase tracking-tighter shadow-[0_0_15px_rgba(57,255,20,0.4)] inline-flex items-center gap-2">
                            <span>💡</span>
                            {state.language === 'EN' ? 'Did You Know?' : 'Bạn có biết?'}
                        </div>
                        <button
                            onClick={() => dispatch({ type: 'CLOSE_MODAL' })}
                            className="text-gray-400 hover:text-white font-mono text-xs mr-1"
                        >
                            [×]
                        </button>
                    </div>

                    {/* Fact card */}
                    <motion.div
                        key={factIndex}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-black/95 border-2 border-neonGreen p-4 rounded-b-xl rounded-tr-xl shadow-[0_0_30px_rgba(57,255,20,0.15)]"
                    >
                        <p className="text-[12px] text-white font-mono leading-relaxed">
                            {facts[factIndex]}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                            <div className="flex gap-1">
                                {facts.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === factIndex ? 'bg-neonGreen' : 'bg-white/20'}`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={handleNext}
                                className="text-[10px] font-mono text-neonGreen hover:text-white transition-colors uppercase tracking-widest"
                            >
                                {state.language === 'EN' ? 'Next ▶' : 'Tiếp ▶'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default DidYouKnow;
