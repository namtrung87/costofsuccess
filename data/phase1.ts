import { DialogueNode, QuizQuestion, Language } from '../types';

// The Narrative Script
export const PHASE1_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
    EN: {
        'start': {
            id: 'start',
            speaker: 'System',
            text: 'NEON DROP STUDIOS. LOBBY. 09:00 AM.',
            backgroundImage: 'BG_LOBBY',
            nextId: 'lobby_desc'
        },
        'lobby_desc': {
            id: 'lobby_desc',
            speaker: 'Player',
            text: "(Thinking) Exposed brick, neon signs, lo-fi hip hop... Everyone is wearing oversized clothes and typing on iPads. My cheap suit feels very... wrong.",
            nextId: 'approach_gatekeeper'
        },
        'approach_gatekeeper': {
            id: 'approach_gatekeeper',
            speaker: 'The Gatekeeper',
            speakerTitle: 'Automated Kiosk',
            characterId: 'PROP_GATEKEEPER',
            text: "PROVE YOU CAN COUNT BEFORE YOU COUNT OUR MONEY.",
            nextId: 'gatekeeper_instruction'
        },
        'gatekeeper_instruction': {
            id: 'gatekeeper_instruction',
            speaker: 'The Gatekeeper',
            speakerTitle: 'Automated Kiosk',
            characterId: 'PROP_GATEKEEPER',
            text: "To get an interview with Jules, you need to pass the Quick Math Check. Don't flop.",
            choices: [
                { text: "Take the Entry Exam", nextId: 'START_QUIZ' }
            ]
        },
        // --- Post Quiz Sequences ---
        'elevator_ride': {
            id: 'elevator_ride',
            speaker: 'System',
            text: "ACCESS GRANTED. GO TO THE PENTHOUSE.",
            nextId: 'meet_jules'
        },
        'meet_jules': {
            id: 'meet_jules',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "You’re overdressed. We don’t do suits here. We do spreadsheets and sustainability. Take a seat on the beanbag.",
            nextId: 'jules_math_comment'
        },
        'jules_math_comment': {
            id: 'jules_math_comment',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SIP',
            text: "I saw your test results. You’re quick. That’s good. Fast fashion is dead, but fast math is alive.",
            nextId: 'jules_role_q'
        },
        'jules_role_q': {
            id: 'jules_role_q',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "But tell me, do you know what a Cost Accountant actually does for a brand like NEON DROP?",
            choices: [
                {
                    text: "Make sure we pay the lowest wages possible.",
                    nextId: 'game_over_wages',
                    action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: -100 }) // Instant Kill
                },
                {
                    text: "Calculate true costs so we don't sell hype at a loss.",
                    nextId: 'jules_role_correct',
                    action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: 10 }),
                    consequences: [{ type: 'FLAG', value: 'CORE_UNDERSTANDING' }]
                },
                {
                    text: "Count the cash in the safe.",
                    nextId: 'jules_role_wrong',
                    action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: -10 }),
                    consequences: [{ type: 'FLAG', value: 'CLUELESS_INTERN' }]
                }
            ]
        },
        'game_over_wages': {
            id: 'game_over_wages',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Yikes. Cancelled. We are an ethical brand. Get out.",
            nextId: 'GAME_OVER'
        },
        'jules_role_wrong': {
            id: 'jules_role_wrong',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SIP', // Sarcastic sip
            text: "We’re cashless, bestie. Crypto and Cards only. Wrong answer. But I'm desperate, so I'll ignore that red flag.",
            nextId: 'negotiation_start'
        },
        'jules_role_correct': {
            id: 'jules_role_correct',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG', // Impressed
            text: "Spot on. Hype doesn't pay the rent. Margins do.",
            nextId: 'negotiation_start'
        },
        'negotiation_start': {
            id: 'negotiation_start',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Okay, let’s talk numbers. You’re an intern. The base salary is... entry-level. It’s barely enough to cover your Spotify Premium and rent.",
            nextId: 'negotiation_offer'
        },
        'negotiation_offer': {
            id: 'negotiation_offer',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY', // Trying to sell the offer
            text: "BUT... I know the Gen Z motivation. If you join us, you get the 'Energy Package'. Unlimited Premium Bubble Tea. Cheese foam. Full toppings.",
            nextId: 'negotiation_decision'
        },
        'negotiation_decision': {
            id: 'negotiation_decision',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "So, are we locking this in? Low cash, high caffeine, max knowledge?",
            choices: [
                {
                    text: "Nah, I need that crypto-bro salary immediately.",
                    nextId: 'game_over_salary',
                    action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: -100 })
                },
                {
                    text: "Deal. I'm in for the experience (and the Cheese Foam).",
                    nextId: 'contract_intro',
                    action: (dispatch) => dispatch({ type: 'ADD_INVENTORY', payload: 'UNLIMITED_BOBA' }),
                    consequences: [{ type: 'FLAG', value: 'BOBA_ADDICT' }]
                }
            ]
        },
        'game_over_salary': {
            id: 'game_over_salary',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SIP',
            text: "Good luck with that. Bye.",
            nextId: 'GAME_OVER'
        },
        'contract_intro': {
            id: 'contract_intro',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Priorities. I respect it. You're hired. Airdropping the NDA now. Sign it so we can start.",
            nextId: 'START_CONTRACT'
        },
        'post_contract': {
            id: 'post_contract',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Welcome to the squad. Grab your boba. We’re going downstairs to the Design Lab. You need to see how a hoodie is actually made.",
            choices: [
                { text: "Let's go.", nextId: 'END_PHASE' }
            ]
        }
    },
    VI: {
        'start': {
            id: 'start',
            speaker: 'Hệ thống',
            text: 'NEON DROP STUDIOS. SẢNH LỄ TÂN. 09:00 SÁNG.',
            backgroundImage: 'BG_LOBBY',
            nextId: 'lobby_desc'
        },
        'lobby_desc': {
            id: 'lobby_desc',
            speaker: 'Người chơi',
            text: "(Suy nghĩ) Tường gạch thô, đèn neon, nhạc lo-fi hip hop... Ai cũng mặc đồ oversize và gõ iPad. Bộ vest rẻ tiền của mình cảm giác thật... lạc quẻ.",
            nextId: 'approach_gatekeeper'
        },
        'approach_gatekeeper': {
            id: 'approach_gatekeeper',
            speaker: 'Người Gác Cổng',
            speakerTitle: 'Kiosk Tự động',
            characterId: 'PROP_GATEKEEPER',
            text: "CHỨNG MINH BẠN BIẾT ĐẾM TRƯỚC KHI ĐẾM TIỀN CỦA CHÚNG TÔI.",
            nextId: 'gatekeeper_instruction'
        },
        'gatekeeper_instruction': {
            id: 'gatekeeper_instruction',
            speaker: 'Người Gác Cổng',
            speakerTitle: 'Kiosk Tự động',
            characterId: 'PROP_GATEKEEPER',
            text: "Để được phỏng vấn với Jules, bạn phải qua bài kiểm tra Toán Nhanh. Đừng làm tôi thất vọng.",
            choices: [
                { text: "Làm bài kiểm tra đầu vào", nextId: 'START_QUIZ' }
            ]
        },
        'elevator_ride': {
            id: 'elevator_ride',
            speaker: 'Hệ thống',
            text: "TRUY CẬP ĐƯỢC CHẤP NHẬN. LÊN TẦNG THƯỢNG.",
            nextId: 'meet_jules'
        },
        'meet_jules': {
            id: 'meet_jules',
            speaker: 'Jules',
            speakerTitle: 'Giám đốc Tài chính (CFO)',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Cưng mặc đồ trang trọng quá. Ở đây tụi chị không mặc vest. Tụi chị chỉ chơi với Excel và sự bền vững. Ngồi xuống ghế lười đi.",
            nextId: 'jules_math_comment'
        },
        'jules_math_comment': {
            id: 'jules_math_comment',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SIP',
            text: "Chị thấy kết quả rồi. Nhanh đấy. Tốt. Thời trang nhanh (Fast fashion) thì chết rồi, nhưng tính toán nhanh thì vẫn sống khỏe.",
            nextId: 'jules_role_q'
        },
        'jules_role_q': {
            id: 'jules_role_q',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Nhưng nói chị nghe, cưng có biết Kế toán Chi phí thực sự làm gì cho một thương hiệu như NEON DROP không?",
            choices: [
                {
                    text: "Đảm bảo trả lương thấp nhất có thể.",
                    nextId: 'game_over_wages',
                    action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: -100 })
                },
                {
                    text: "Tính chi phí thực để không bán lỗ vốn.",
                    nextId: 'jules_role_correct',
                    action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: 10 }),
                    consequences: [{ type: 'FLAG', value: 'CORE_UNDERSTANDING' }]
                },
                {
                    text: "Đếm tiền trong két sắt.",
                    nextId: 'jules_role_wrong',
                    action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: -10 }),
                    consequences: [{ type: 'FLAG', value: 'CLUELESS_INTERN' }]
                }
            ]
        },
        'game_over_wages': {
            id: 'game_over_wages',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_ANGRY',
            text: "Ôi trời. Cưng bị loại (Cancelled). Đây là thương hiệu có đạo đức. Mời ra ngoài.",
            nextId: 'GAME_OVER'
        },
        'jules_role_wrong': {
            id: 'jules_role_wrong',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SIP',
            text: "Tụi chị không dùng tiền mặt, bạn iu. Crypto và Thẻ thôi. Sai rồi. Nhưng chị đang tuyệt vọng nên chị sẽ lờ đi cái 'cờ đỏ' (red flag) đó.",
            nextId: 'negotiation_start'
        },
        'jules_role_correct': {
            id: 'jules_role_correct',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Chuẩn. Sự nổi tiếng (Hype) không trả tiền thuê nhà. Biên lợi nhuận mới trả tiền.",
            nextId: 'negotiation_start'
        },
        'negotiation_start': {
            id: 'negotiation_start',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Được rồi, nói chuyện lương lậu. Cưng là thực tập sinh. Lương cơ bản... mới ra trường. Vừa đủ trả tiền Spotify Premium và tiền trọ thôi.",
            nextId: 'negotiation_offer'
        },
        'negotiation_offer': {
            id: 'negotiation_offer',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_HAPPY',
            text: "NHƯNG... Chị biết Gen Z cần gì. Nếu làm ở đây, cưng được gói 'Năng Lượng'. Trà sữa trân châu không giới hạn. Kem cheese. Full topping.",
            nextId: 'negotiation_decision'
        },
        'negotiation_decision': {
            id: 'negotiation_decision',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Chốt đơn không? Tiền ít, cafein nhiều, kiến thức bao la?",
            choices: [
                {
                    text: "Thôi, em cần lương kiểu 'đại gia crypto' ngay.",
                    nextId: 'game_over_salary',
                    action: (dispatch) => dispatch({ type: 'UPDATE_SANITY', payload: -100 })
                },
                {
                    text: "Chốt. Em làm vì kinh nghiệm (and kem cheese).",
                    nextId: 'contract_intro',
                    action: (dispatch) => dispatch({ type: 'ADD_INVENTORY', payload: 'UNLIMITED_BOBA' }),
                    consequences: [{ type: 'FLAG', value: 'BOBA_ADDICT' }]
                }
            ]
        },
        'game_over_salary': {
            id: 'game_over_salary',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SIP',
            text: "Chúc may mắn nhé. Bye.",
            nextId: 'GAME_OVER'
        },
        'contract_intro': {
            id: 'contract_intro',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_SMUG',
            text: "Biết ưu tiên đấy. Chị ưng. Đang Airdrop cái NDA (Thỏa thuận bảo mật). Ký đi rồi bắt đầu.",
            nextId: 'START_CONTRACT'
        },
        'post_contract': {
            id: 'post_contract',
            speaker: 'Jules',
            speakerTitle: 'CFO',
            characterId: 'CHAR_JULES_NEUTRAL',
            text: "Chào mừng về đội. Cầm ly trà sữa đi. Tụi mình xuống Phòng Thiết Kế. Cưng cần xem một cái áo hoodie thực sự được làm ra như thế nào.",
            choices: [
                { text: "Đi thôi.", nextId: 'END_PHASE' }
            ]
        }
    }
};

// The Quiz Data
export const PHASE1_QUIZ: Record<Language, QuizQuestion[]> = {
    EN: [
        {
            id: 'q1',
            question: "We’re dropping the 'Cyber-Punk Hoodie'. Fabric costs $20. The tailor costs $15 per hour (takes 2 hours). What’s the Prime Cost?",
            reward: 50,
            penalty: 5,
            options: [
                {
                    id: 'a',
                    text: "$35",
                    isCorrect: false,
                    feedback: "Math isn't mathing. Fabric ($20) + Labor ($30) = $50."
                },
                {
                    id: 'b',
                    text: "$50",
                    isCorrect: true,
                    feedback: "Correct. Direct Materials + Direct Labor."
                },
                {
                    id: 'c',
                    text: "$70",
                    isCorrect: false,
                    feedback: "Too high. Check your labor hours."
                }
            ]
        },
        {
            id: 'q2',
            question: "The 'Eco-Sneaker' sells for $200. The total cost to make it is $120. If we sell 100 pairs in 1 minute, what’s the Total Profit?",
            reward: 50,
            penalty: 5,
            options: [
                {
                    id: 'a',
                    text: "$8,000",
                    isCorrect: true,
                    feedback: "Correct. ($200 - $120) * 100 = $8,000 profit."
                },
                {
                    id: 'b',
                    text: "$800",
                    isCorrect: false,
                    feedback: "Missing a zero there, bestie."
                },
                {
                    id: 'c',
                    text: "$20,000",
                    isCorrect: false,
                    feedback: "That's Revenue, not Profit. We have costs!"
                }
            ]
        },
        {
            id: 'q3',
            question: "We rent a warehouse for the TikTok content studio. It costs $24,000 a year. What is the monthly hit to our budget?",
            reward: 50,
            penalty: 5,
            options: [
                {
                    id: 'a',
                    text: "$2,400",
                    isCorrect: false,
                    feedback: "Check your division."
                },
                {
                    id: 'b',
                    text: "$2,000",
                    isCorrect: true,
                    feedback: "Correct. $24k / 12 months."
                },
                {
                    id: 'c',
                    text: "$200",
                    isCorrect: false,
                    feedback: "Way too low. I wish rent was that cheap."
                }
            ]
        }
    ],
    VI: [
        {
            id: 'q1',
            question: "Chúng ta sắp ra mắt 'Cyber-Punk Hoodie'. Tiền vải là $20. Thợ may tính $15 mỗi giờ (may mất 2 giờ). Chi phí Cơ bản (Prime Cost) là bao nhiêu?",
            reward: 50,
            penalty: 5,
            options: [
                {
                    id: 'a',
                    text: "$35",
                    isCorrect: false,
                    feedback: "Tính toán sai rồi. Vải ($20) + Nhân công ($30) = $50."
                },
                {
                    id: 'b',
                    text: "$50",
                    isCorrect: true,
                    feedback: "Chính xác. Nguyên liệu trực tiếp + Nhân công trực tiếp."
                },
                {
                    id: 'c',
                    text: "$70",
                    isCorrect: false,
                    feedback: "Cao quá. Kiểm tra lại giờ công nhé."
                }
            ]
        },
        {
            id: 'q2',
            question: "'Eco-Sneaker' bán giá $200. Tổng chi phí sản xuất là $120. Nếu bán 100 đôi trong 1 phút, Tổng Lợi Nhuận là bao nhiêu?",
            reward: 50,
            penalty: 5,
            options: [
                {
                    id: 'a',
                    text: "$8,000",
                    isCorrect: true,
                    feedback: "Chính xác. ($200 - $120) * 100 = $8,000 lợi nhuận."
                },
                {
                    id: 'b',
                    text: "$800",
                    isCorrect: false,
                    feedback: "Thiếu một số 0 rồi bạn iu."
                },
                {
                    id: 'c',
                    text: "$20,000",
                    isCorrect: false,
                    feedback: "Đó là Doanh thu, không phải Lợi nhuận!"
                }
            ]
        },
        {
            id: 'q3',
            question: "Thuê kho làm studio TikTok hết $24,000 một năm. Vậy chi phí mỗi tháng là bao nhiêu?",
            reward: 50,
            penalty: 5,
            options: [
                {
                    id: 'a',
                    text: "$2,400",
                    isCorrect: false,
                    feedback: "Chia sai rồi."
                },
                {
                    id: 'b',
                    text: "$2,000",
                    isCorrect: true,
                    feedback: "Chuẩn. $24k / 12 tháng."
                },
                {
                    id: 'c',
                    text: "$200",
                    isCorrect: false,
                    feedback: "Thấp quá. Ước gì giá thuê rẻ vậy."
                }
            ]
        }
    ]
};
