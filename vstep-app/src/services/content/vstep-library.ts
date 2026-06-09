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