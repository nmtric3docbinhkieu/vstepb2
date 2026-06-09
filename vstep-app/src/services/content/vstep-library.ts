export type RecentExamUpdate = {
  id: string;
  school: string;
  title: string;
  period: string;
  format: string;
  note: string;
};

export type PracticeSet = {
  id: string;
  skill: "Reading" | "Listening" | "Writing" | "Speaking";
  title: string;
  level: "B1+" | "B2";
  focus: string;
  task: string;
};

export type TrendInsight = {
  id: string;
  area: "Listening" | "Reading" | "Writing" | "Speaking";
  pattern: string;
  action: string;
};

export type HotTopic = {
  id: string;
  skill: "Writing" | "Speaking";
  title: string;
  type: string;
};

export const RECENT_EXAM_UPDATES: RecentExamUpdate[] = [
  {
    id: "update-vlu",
    school: "Dai hoc Van Lang",
    title: "Thong tin dot thi VSTEP gan day",
    period: "2025-2026",
    format: "4 ky nang, khung B1-B2",
    note: "Tap trung luyen de tich hop ky nang va quan ly thoi gian.",
  },
  {
    id: "update-hcmue",
    school: "Dai hoc Su pham TP.HCM",
    title: "Thong bao lich thi va huong dan dang ky",
    period: "2025-2026",
    format: "Doc-nghe-viet-noi theo cau truc chuan",
    note: "Can uu tien bo de mo phong theo dung cau truc phan thi.",
  },
  {
    id: "update-dthu",
    school: "Dai hoc Dong Thap",
    title: "Cap nhat ke hoach to chuc thi VSTEP",
    period: "2025-2026",
    format: "Danh gia nang luc ngon ngu 4 ky nang",
    note: "Nen luyen tung ky nang va thi thu tong hop moi tuan.",
  },
  {
    id: "update-ctu",
    school: "Dai hoc Can Tho",
    title: "Thong tin ky thi danh gia nang luc tieng Anh",
    period: "2025-2026",
    format: "Bai thi theo cap do B1-B2",
    note: "Nen tang cuong bai nghe hoc thuat va viet luan diem.",
  },
];

export const PRACTICE_SETS: PracticeSet[] = [
  {
    id: "reading-urban-policy",
    skill: "Reading",
    title: "Urban Policy and Public Services",
    level: "B2",
    focus: "Skimming, detail matching, inference",
    task: "Doc 1 passage hoc thuat, tra loi 8 cau hoi trac nghiem.",
  },
  {
    id: "reading-education-tech",
    skill: "Reading",
    title: "Education Technology Adoption",
    level: "B2",
    focus: "Main idea and paragraph function",
    task: "Doc bai bao giao duc, tim luan diem va bang chung.",
  },
  {
    id: "listening-campus-news",
    skill: "Listening",
    title: "Campus News Briefing",
    level: "B2",
    focus: "Note-taking and key detail",
    task: "Nghe 2 luot, hoan thanh 8 cau hoi theo y chinh.",
  },
  {
    id: "listening-academic-talk",
    skill: "Listening",
    title: "Short Academic Talk",
    level: "B2",
    focus: "Speaker attitude and conclusion",
    task: "Nghe bai noi hoc thuat ngan va chon dap an dung.",
  },
  {
    id: "writing-discussion-1",
    skill: "Writing",
    title: "Online Learning vs Traditional Learning",
    level: "B2",
    focus: "Discuss both views + opinion",
    task: "Viet 180-220 tu, co mo than ket ro rang.",
  },
  {
    id: "writing-problem-solution",
    skill: "Writing",
    title: "Traffic Congestion in Cities",
    level: "B2",
    focus: "Problem-solution essay",
    task: "Neu nguyen nhan, giai phap va danh gia tinh kha thi.",
  },
  {
    id: "speaking-experience",
    skill: "Speaking",
    title: "Describe a Challenging Learning Experience",
    level: "B2",
    focus: "Fluency, coherence, lexical range",
    task: "Noi 2-3 phut, co vi du va ket luan.",
  },
  {
    id: "speaking-opinion",
    skill: "Speaking",
    title: "Do University Students Need Part-time Jobs?",
    level: "B2",
    focus: "Opinion support and rebuttal",
    task: "Trinh bay quan diem va phan bien gon gang.",
  },
];

export const TREND_INSIGHTS_MAY_JUN_2026: TrendInsight[] = [
  {
    id: "trend-listening-p3",
    area: "Listening",
    pattern: "Part 1 thuong de tho, Part 3 thuong kho nghe va de mat y.",
    action: "Doc cau hoi truoc, ghi nhanh keyword, uu tien nam y chinh truoc chi tiet.",
  },
  {
    id: "trend-reading-topic-shift",
    area: "Reading",
    pattern: "Chu de xoay quanh do thi, cong nghe giao duc, moi truong, doi song xa hoi.",
    action: "Luyen paraphrase, title matching, tone question, va tu vung hoc thuat theo chu de.",
  },
  {
    id: "trend-writing-common",
    area: "Writing",
    pattern: "Task 1 thuong la email/thu theo tinh huong thuc te; Task 2 la discuss/cause-solution.",
    action: "Dung khung co dinh cho tung dang de va luyen viet 180-220 tu dung thoi gian.",
  },
  {
    id: "trend-speaking-structure",
    area: "Speaking",
    pattern: "Part 2-3 hay roi vao chon lua/chia se loi ich, can cau truc ly do + giai thich + vi du.",
    action: "Luyen template ngan gon, noi cham ro, uu tien cau don dung hon cau phuc sai.",
  },
];

export const HOT_TOPICS_RECENT: HotTopic[] = [
  {
    id: "spk-community",
    skill: "Speaking",
    title: "Benefits of community activities",
    type: "Part 3 - benefits/opinion",
  },
  {
    id: "spk-technology-learning",
    skill: "Speaking",
    title: "Effects of technology on learning",
    type: "Part 3 - discussion",
  },
  {
    id: "spk-travel",
    skill: "Speaking",
    title: "Benefits of traveling / holiday choices",
    type: "Part 2-3",
  },
  {
    id: "spk-healthy-life",
    skill: "Speaking",
    title: "Outdoor activities and healthy lifestyle",
    type: "Part 3 - advantages",
  },
  {
    id: "wri-social-media",
    skill: "Writing",
    title: "Social media: benefits vs stress",
    type: "Task 2 - discuss both views",
  },
  {
    id: "wri-fast-food",
    skill: "Writing",
    title: "Teen fast-food consumption",
    type: "Task 2 - causes and solutions",
  },
  {
    id: "wri-textbook-tech",
    skill: "Writing",
    title: "Role of textbooks in technology era",
    type: "Task 2 - opinion/discussion",
  },
  {
    id: "wri-informal-email",
    skill: "Writing",
    title: "Email to friend/cousin about visiting plans",
    type: "Task 1 - informal email",
  },
];