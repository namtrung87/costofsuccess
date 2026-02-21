import { DialogueNode, Language } from '../types';

export const PHASE7_DIALOGUE: Record<Language, Record<string, DialogueNode>> = {
  EN: {
    'start': {
        id: 'start',
        speaker: 'System',
        text: 'SECTOR 7: DRONE BAY. 15:00 PM.',
        backgroundImage: 'BG_OPS_CENTER',
        nextId: 'rob_rush'
    },
    'rob_rush': {
        id: 'rob_rush',
        speaker: 'Rob',
        speakerTitle: 'Production Manager',
        characterId: 'CHAR_ROB',
        text: "We need those budget codes NOW! The system is locking down in 60 seconds. If we don't input the apportioned costs, production stops.",
        nextId: 'drone_instruction'
    },
    'drone_instruction': {
        id: 'drone_instruction',
        speaker: 'System',
        text: "PROTOCOL: Use the drone to air-drop the calculated budget packets to the correct Department Zones. Avoid the red zones.",
        choices: [
            { text: "Launch Drone", nextId: 'START_GAME' }
        ]
    },
    'post_game': {
        id: 'post_game',
        speaker: 'Rob',
        speakerTitle: 'Production Manager',
        characterId: 'CHAR_ROB',
        text: "Nice flying. Funds received. But wait... Ken is calling from the Pump Room.",
        choices: [
            { text: "Answer Ken (Phase 8)", nextId: 'END_PHASE' }
        ]
    }
  },
  VI: {
    'start': {
        id: 'start',
        speaker: 'Hệ thống',
        text: 'KHU VỰC 7: BÃI ĐÁP DRONE. 15:00 CHIỀU.',
        backgroundImage: 'BG_OPS_CENTER',
        nextId: 'rob_rush'
    },
    'rob_rush': {
        id: 'rob_rush',
        speaker: 'Rob',
        speakerTitle: 'Quản lý Sản xuất',
        characterId: 'CHAR_ROB',
        text: "Cần mã ngân sách NGAY! Hệ thống sẽ khóa trong 60 giây. Nếu không nhập chi phí đã phân bổ, dây chuyền sẽ dừng.",
        nextId: 'drone_instruction'
    },
    'drone_instruction': {
        id: 'drone_instruction',
        speaker: 'Hệ thống',
        text: "GIAO THỨC: Dùng drone thả các gói ngân sách xuống đúng Khu vực Bộ phận. Tránh các vùng đỏ.",
        choices: [
            { text: "Phóng Drone", nextId: 'START_GAME' }
        ]
    },
    'post_game': {
        id: 'post_game',
        speaker: 'Rob',
        speakerTitle: 'Quản lý Sản xuất',
        characterId: 'CHAR_ROB',
        text: "Bay tốt đấy. Đã nhận tiền. Nhưng chờ đã... Ken đang gọi từ Phòng Bơm.",
        choices: [
            { text: "Trả lời Ken (Màn 8)", nextId: 'END_PHASE' }
        ]
    }
  }
};