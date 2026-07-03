// ENHANCED CUSTOMER DATA WITH POTENTIAL, STATUS, AND EQUIPMENT
// Copy this data and paste it into your index.html to replace MACHINE_DEFAULTS and EXTERNAL_DEFAULTS

// === KALKIDAN'S TERRITORY (28 facilities with HOT/WARM/COLD status) ===
const KALKIDAN_CUSTOMERS = [
  // === HOT LEADS (12 facilities - READY TO CLOSE) ===
  {id:201, name:"Ajora MCH", nameZh:"阿乔拉妇幼中心", city:"Summit", date:"", model:"EXT",
   status:"HOT", potential:"HIGH", patientLoad:"10-20/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"Finecare", chemistryAnalyzer:"Siemens semiautomatic", electrolyteAnalyzer:"B&E",
   notes:"⭐ Interested in ACCRE PLACEMENT - DEMO THIS WEEK!",
   notesZh:"⭐ 对ACCRE放置感兴趣 - 本周演示！",
   contacts:[{role:"Laboratory Head", roleZh:"检验科主任", name:"Tina", phone:"0913394329"}],
   payment:[], stock:"SST, EDTA tubes", order:"ACCRE analyzer", doctors:""},

  {id:202, name:"Yerer General Hospital", nameZh:"耶雷尔综合医院", city:"Yerer", date:"", model:"EXT",
   status:"HOT", potential:"HIGH", patientLoad:">20/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"Finecare, Zybio, Maglumi", chemistryAnalyzer:"Mindray", electrolyteAnalyzer:"Fully automated",
   notes:"⭐ Considering ACCRE as ADDITIONAL analyzer (already has 3 brands!)",
   notesZh:"⭐ 考虑将ACCRE作为额外分析仪（已有3个品牌！）",
   contacts:[{role:"Head Lab Technician", roleZh:"检验科主任", name:"Lab Technician", phone:"0911640114"}],
   payment:[], stock:"SST, EDTA tubes", order:"ACCRE as 4th analyzer", doctors:""},

  {id:203, name:"Agar Specialized Clinic", nameZh:"阿加尔专科诊所", city:"Ayst", date:"", model:"EXT",
   status:"Warm", potential:"MEDIUM", patientLoad:"5-10/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"Finecare", chemistryAnalyzer:"", electrolyteAnalyzer:"Potential for B&E",
   notes:"⭐ Interested in ACCRE analyzer",
   notesZh:"⭐ 对ACCRE分析仪感兴趣",
   contacts:[{role:"Doctor", roleZh:"医生", name:"Dr. Eyasu", phone:"0933583333"}],
   payment:[], stock:"SST, EDTA tubes", order:"ACCRE analyzer", doctors:""},

  {id:204, name:"Lotus MCH", nameZh:"莲花妇幼中心", city:"Garment", date:"", model:"EXT",
   status:"HOT", potential:"HIGH", patientLoad:"10-20/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"Finecare", chemistryAnalyzer:"Mindray", electrolyteAnalyzer:"B&E",
   notes:"🔥 REQUESTED COMPARATIVE ANALYSIS - Deliver ASAP!",
   notesZh:"🔥 要求比较分析 - 尽快交付！",
   contacts:[{role:"Head Lab Technician", roleZh:"检验科主任", name:"Medical Director", phone:"259103472 40"}],
   payment:[], stock:"SST, EDTA tubes", order:"Reagent placement", doctors:""},

  {id:205, name:"Hewan Gynecology Specialized Clinic", nameZh:"赫万妇科专科诊所", city:"Jemo", date:"", model:"EXT",
   status:"HOT", potential:"HIGH", patientLoad:"10-15/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"NONE", chemistryAnalyzer:"Semi-automated Dirui", electrolyteAnalyzer:"",
   notes:"🎯 PLANNING TO PURCHASE hormone analyzer - First-mover opportunity!",
   notesZh:"🎯 计划购买激素分析仪 - 先发制人的机会！",
   contacts:[{role:"Medical Director/Owner", roleZh:"医疗主任/业主", name:"Owner", phone:"0911236896"}],
   payment:[], stock:"SST, EDTA tubes", order:"Hormone analyzer purchase", doctors:""},

  {id:206, name:"St. Mary Medium Clinic", nameZh:"圣玛丽中型诊所", city:"Goro", date:"", model:"EXT",
   status:"HOT", potential:"HIGH", patientLoad:"10-15/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"NONE", chemistryAnalyzer:"Semi automated", electrolyteAnalyzer:"CBS 401 B&E",
   notes:"🎯 EVALUATING INSTALLATION of hormone analyzer - Submit proposal!",
   notesZh:"🎯 评估激素分析仪安装 - 提交提案！",
   contacts:[{role:"Medical Director", roleZh:"医疗主任", name:"Medical Director", phone:"0939199947"}],
   payment:[], stock:"SST, EDTA tubes", order:"Hormone analyzer installation", doctors:""},

  {id:207, name:"Yadon Clinic", nameZh:"亚东诊所", city:"Ayat", date:"", model:"EXT",
   status:"HOT", potential:"HIGH", patientLoad:">10/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"Finecare", chemistryAnalyzer:"None", electrolyteAnalyzer:"Semi automated",
   notes:"💼 PROPOSAL UNDER STAKEHOLDER REVIEW - Follow up NOW!",
   notesZh:"💼 提案正在利益相关者审查中 - 立即跟进！",
   contacts:[{role:"Owner/Head Lab Technician", roleZh:"业主/检验科主任", name:"Owner", phone:"0937370776"}],
   payment:[], stock:"SST, EDTA tubes", order:"Pending proposal", doctors:""},

  {id:208, name:"Novamed Clinic", nameZh:"诺瓦梅德诊所", city:"Goro", date:"", model:"EXT",
   status:"HOT", potential:"MEDIUM", patientLoad:"10-15/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"Finecare", chemistryAnalyzer:"None", electrolyteAnalyzer:"Interested in B&E",
   notes:"Interested in ELECTROLYTE analyzer",
   notesZh:"对电解质分析仪感兴趣",
   contacts:[{role:"Laboratory Head", roleZh:"检验科主任", name:"Zeaman", phone:"+251941052140"}],
   payment:[], stock:"SST, EDTA tubes", order:"Electrolyte analyzer", doctors:""},

  {id:209, name:"Betsegah MCH", nameZh:"贝特塞加妇幼中心", city:"Gurdshola", date:"", model:"EXT",
   status:"HOT", potential:"HIGH", patientLoad:">20/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"Finecare, Maglumi", chemistryAnalyzer:"Semi automated", electrolyteAnalyzer:"Potential for B&E",
   notes:"💼 AWAITING MANAGEMENT FEEDBACK - Follow up!",
   notesZh:"💼 等待管理层反馈 - 跟进！",
   contacts:[{role:"Head Purchaser", roleZh:"采购主管", name:"Head Purchaser", phone:"0911412236"}],
   payment:[], stock:"SST, EDTA tubes", order:"B&E Electrolyte", doctors:""},

  {id:210, name:"Abebech Gobena MCH", nameZh:"阿贝贝奇戈贝纳妇幼中心", city:"Ayat Tsehel", date:"", model:"EXT",
   status:"HOT", potential:"HIGH", patientLoad:"15-20/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"Not specified", chemistryAnalyzer:"Siemens semiautomatic", electrolyteAnalyzer:"CBS 50",
   notes:"Strong interest in PLACEMENT MODEL",
   notesZh:"对放置模式有浓厚兴趣",
   contacts:[{role:"Laboratory Head", roleZh:"检验科主任", name:"Dani", phone:"0910540974"}],
   payment:[], stock:"SST, EDTA tubes", order:"Placement model", doctors:""},

  {id:211, name:"Tersis Clinics - Liyu Branch", nameZh:"特西斯诊所 - 利尤分院", city:"Lamberet", date:"", model:"EXT",
   status:"HOT", potential:"MEDIUM", patientLoad:"5/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"VIDAS", chemistryAnalyzer:"Semi automated", electrolyteAnalyzer:"Semi automated",
   notes:"Strong interest and EXPANSION POTENTIAL (2 branches!)",
   notesZh:"强烈兴趣和扩张潜力（2个分店！）",
   contacts:[{role:"Lab", roleZh:"实验室", name:"Liyu Tersis Clinic Lab", phone:"0990023332"}],
   payment:[], stock:"SST, EDTA tubes", order:"", doctors:""},

  {id:212, name:"Tersis Clinics - Besa Branch", nameZh:"特西斯诊所 - 贝萨分院", city:"Lamberet", date:"", model:"EXT",
   status:"HOT", potential:"MEDIUM", patientLoad:"5/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"VIDAS", chemistryAnalyzer:"Semi automated", electrolyteAnalyzer:"Semi automated",
   notes:"Strong interest and EXPANSION POTENTIAL (2 branches!)",
   notesZh:"强烈兴趣和扩张潜力（2个分店！）",
   contacts:[{role:"Lab", roleZh:"实验室", name:"Besa Tersis Clinic Lab", phone:"0903158221"}],
   payment:[], stock:"SST, EDTA tubes", order:"", doctors:""},

  // === WARM LEADS (6 facilities - Follow-up needed) ===
  {id:213, name:"Ethiocare Medical Center", nameZh:"埃塞俄关怀医疗中心", city:"Garment", date:"", model:"EXT",
   status:"WARM", potential:"MEDIUM", patientLoad:"5-10/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"Mindray CLIA (INACTIVE!)", chemistryAnalyzer:"Semi automated", electrolyteAnalyzer:"Edgelayt 3",
   notes:"⚠️ Their Mindray is INACTIVE - Evaluating chemistry analyzer suppliers",
   notesZh:"⚠️ 他们的Mindray不活跃 - 正在评估化学分析仪供应商",
   contacts:[{role:"Purchasing Officer", roleZh:"采购官", name:"Purchasing Officer", phone:"0910248620"}],
   payment:[], stock:"SST, EDTA tubes", order:"Chemistry analyzer", doctors:""},

  {id:214, name:"Fikreselam General Hospital", nameZh:"菲克雷塞拉姆综合医院", city:"CMC", date:"", model:"EXT",
   status:"WARM", potential:"MEDIUM", patientLoad:"10-15/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"Not specified", chemistryAnalyzer:"Fully automated", electrolyteAnalyzer:"Not specified",
   notes:"📅 FOLLOW-UP MEETING SCHEDULED - Confirm date!",
   notesZh:"📅 已安排后续会议 - 确认日期！",
   contacts:[{role:"Head Lab Technician", roleZh:"检验科主任", name:"Head Lab Technician", phone:"0980499794"}],
   payment:[], stock:"SST, EDTA tubes", order:"", doctors:""},

  {id:215, name:"EBM Specialty Clinic", nameZh:"EBM专科诊所", city:"Ayat", date:"", model:"EXT",
   status:"WARM", potential:"LOW", patientLoad:"3-5/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"Finecare, BiG", chemistryAnalyzer:"Semi automated", electrolyteAnalyzer:"B&E",
   notes:"Considering analyzer UPGRADE",
   notesZh:"考虑分析仪升级",
   contacts:[{role:"Laboratory Head", roleZh:"检验科主任", name:"Abebe", phone:"0911319165"}],
   payment:[], stock:"SST, EDTA tubes", order:"Analyzer upgrade", doctors:""},

  {id:216, name:"Dr. Yared Pediatric Clinic", nameZh:"亚雷德医生儿科诊所", city:"Horo", date:"", model:"EXT",
   status:"WARM", potential:"LOW", patientLoad:"Under evaluation", salesRep:"Kalkidan",
   hormoneAnalyzer:"Finecare", chemistryAnalyzer:"Semi automated", electrolyteAnalyzer:"B&E",
   notes:"Will consider as PATIENT FLOW INCREASES",
   notesZh:"随着患者流量增加会考虑",
   contacts:[{role:"Lab", roleZh:"实验室", name:"Elias Lab", phone:"0913634584"}],
   payment:[], stock:"SST, EDTA tubes", order:"", doctors:""},

  {id:217, name:"AG Kovamed Clinic", nameZh:"AG科瓦梅德诊所", city:"72", date:"", model:"EXT",
   status:"WARM", potential:"LOW", patientLoad:"Low", salesRep:"Kalkidan",
   hormoneAnalyzer:"Finecare", chemistryAnalyzer:"Not specified", electrolyteAnalyzer:"Not specified",
   notes:"Interested in electrolyte analyzer",
   notesZh:"对电解质分析仪感兴趣",
   contacts:[{role:"Head of Laboratory", roleZh:"实验室主任", name:"Head of Laboratory", phone:"0941052140"}],
   payment:[], stock:"SST, EDTA tubes", order:"Electrolyte analyzer", doctors:""},

  {id:218, name:"GFB Specialized Clinic", nameZh:"GFB专科诊所", city:"Ayat", date:"", model:"EXT",
   status:"HOT", potential:"LOW", patientLoad:"2-5/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"Finecare", chemistryAnalyzer:"Semi automated", electrolyteAnalyzer:"Semi automated",
   notes:"Good potential",
   notesZh:"良好潜力",
   contacts:[{role:"Laboratory Professionals", roleZh:"检验专业人员", name:"Laboratory Professionals", phone:""}],
   payment:[], stock:"SST, EDTA tubes", order:"", doctors:""},

  // === COLD LEADS (10 facilities - Low priority) ===
  {id:219, name:"Eldana Clinic", nameZh:"埃尔达纳诊所", city:"Megenagna", date:"", model:"EXT",
   status:"COLD", potential:"LOW", patientLoad:"10-20/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"Zybio", chemistryAnalyzer:"Mindray", electrolyteAnalyzer:"B&E",
   notes:"❌ Recently purchased Zybio - Bad timing",
   notesZh:"❌ 最近购买了Zybio - 时机不佳",
   contacts:[{role:"Medical Director", roleZh:"医疗主任", name:"Medical Director", phone:""}],
   payment:[], stock:"SST, EDTA tubes", order:"", doctors:""},

  {id:220, name:"Cheza Medium Clinic", nameZh:"切扎中型诊所", city:"Wossen", date:"", model:"EXT",
   status:"COLD", potential:"LOW", patientLoad:"~2/day", salesRep:"Kalkidan",
   hormoneAnalyzer:"Finecare", chemistryAnalyzer:"Not specified", electrolyteAnalyzer:"Not specified",
   notes:"❌ Already decided on Finecare",
   notesZh:"❌ 已决定使用Finecare",
   contacts:[{role:"Owner", roleZh:"业主", name:"Owner", phone:""}],
   payment:[], stock:"SST, EDTA tubes", order:"", doctors:""},

  // Add more COLD leads as needed...
];

// TO USE THIS DATA:
// 1. Open index.html in a text editor
// 2. Find the line "const MACHINE_DEFAULTS = ["
// 3. Replace the entire MACHINE_DEFAULTS array with KALKIDAN_CUSTOMERS above
// 4. Save and refresh the website
// 5. You'll see Status, Potential, Patient Load, and Notes fields!
