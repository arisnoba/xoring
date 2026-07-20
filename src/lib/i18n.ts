import type { Locale } from "@/lib/locale";

export type { Locale } from "@/lib/locale";

const englishMessages = {
  metadata: {
    title: "XORing — Wear Contribution. Create Connection.",
    description:
      "A wearable POC device where behavior becomes value and AI comes alive.",
    keywords: [
      "XORing",
      "smart ring",
      "wearable",
      "social fitness",
      "AI agent",
      "web3",
    ],
    ogImageAlt: "XORing social smart ring hero image",
  },
  common: {
    skipToContent: "Skip to main content",
    comingSoon: "Coming soon.",
    storeButtons: [
      { key: "apple", eyebrow: "Download on the", label: "App Store" },
      { key: "google", eyebrow: "Get it on", label: "Google Play" },
    ],
  },
  header: {
    nav: [
      { label: "RING", href: "#ring" },
      { label: "APP", href: "#app" },
      { label: "AIOS", href: "#aios" },
    ],
    joinNow: "Join Now",
    toggleMenu: "Toggle menu",
    primaryNavigation: "Primary",
    mobileNavigation: "Mobile",
    languageSwitch: "中文",
    languageSwitchLabel: "View the Chinese site",
  },
  hero: {
    headline: ["Beyond myself,", "Connecting us."],
    overlay: [
      "Not just another smart ring",
      "that tracks your health.",
      "The more you breathe and move,",
      "the deeper you connect.",
      "",
      "Meet XORing,",
      "The World’s First Real Human Social Smart Ring",
    ],
  },
  beyondScreen: {
    headline: "Beyond the Screen",
    paragraphs: [
      [
        "In an era where we stare at screens all day,",
        "is your social media profile really you?",
      ],
      [
        "XORing was created",
        "to help you reclaim your true self,",
        "often lost among countless digital identities.",
      ],
      [
        "Step off the screen.",
        "Make every walk, every run,",
        "and every breath truly count.",
      ],
    ],
  },
  twoModes: {
    headline: ["One ring,", "Two Modes."],
    social: ["Connect with", "the world"],
    private: ["Focus on", "yourself"],
    switchLabel: "Twist to switch",
  },
  socialMode: {
    badge: "SOCIAL MODE",
    ringAlt: "XORing Social Mode",
    headline: ["A connected world", "at your fingertips"],
    subtext:
      "True social networks exist in shared rhythms and breaths, not on screens.",
    cards: [
      {
        title: "Partner Matching",
        description:
          "XO connects you with users who share your lifestyle and workout routines in real-time. If they're nearby, give a ring 'Bump'. If they're far, connect via the app and work out together.",
      },
      {
        title: "Social Community",
        description:
          "From your neighborhood to the other side of the globe. Build a community with people who match your vibe. Join offline meetups happening worldwide every day.",
      },
      {
        title: "Couple Mode",
        description:
          "Check in on your loved ones safely, even on busy days. It's not about tracking; it's a gentle way to share your day, entirely on your terms.",
      },
      {
        title: "Location Sharing",
        description:
          "Includes real-time location tracking and sharing for the safety of children and the elderly, allowing users to monitor health status, detect emergencies, and identify abnormal location changes.",
      },
    ],
  },
  privateMode: {
    badge: "PRIVATE MODE",
    ringAlt: "XORing Private Mode",
    headline: ["Solely focused on you"],
    subtext:
      "Pause data sharing and dive into your own workout, your own time.",
    cards: [
      {
        title: "Data Protection",
        description:
          "Your personal health data stays yours. Advanced encryption ensures your biometrics and activity data are never shared without your explicit consent.",
      },
      {
        title: "Solo Training",
        description:
          "Deep focus mode silences social notifications. Track every rep, every heartbeat, every breath — just you and your goals.",
      },
      {
        title: "Focus Mode",
        description:
          "Block distractions and enter a flow state. XO Ring monitors your cognitive load and gently nudges you back when focus drifts.",
      },
      {
        title: "Key & Payments",
        description:
          "Use your ring as a secure key and payment device. Tap to unlock, tap to pay — frictionless and secure, always at hand.",
      },
    ],
  },
  aiAgent: {
    eyebrow: "AI AGENT",
    headline: ["Lifestyle", "Pacemaker"],
    subtext: [
      "The moment you put on XORing, your personal AI agent wakes up.",
      "Beyond just counting steps, it takes care of your body, mind, and relationships.",
    ],
    agents: [
      {
        title: "AI Health Agent",
        description:
          "Analyzes heart rate, blood oxygen, and sleep to provide real-time fatigue prediction and personalized workout management.",
      },
      {
        title: "AI Emotional Agent",
        description:
          "Detects stress levels through heart rate variability and activity, automatically recommending meditation or the perfect playlist.",
      },
      {
        title: "AI Social Agent",
        description:
          "Reads your network status via the ring’s direction (O/X) and finds nearby users who share your interests and lifestyle.",
      },
      {
        title: "AI Behavior Agent",
        description:
          "“Burn 400kcal more for a bonus.” Sets activity goals and rewards you with PoC tokens when you achieve them.",
      },
    ],
  },
  application: {
    eyebrow: "APPLICATION",
    headline: ["Every experience", "in your hand"],
    description: [
      "All your XORing data is seamlessly synced to the app.",
      "You can even use the app without the ring.",
    ],
    note: "* Some features may be limited when using the app without XORing.",
    imageAlt: "Mobile App Interface",
  },
  poc: {
    eyebrow: "AIOS · PoC",
    headline: "The Value of Sweat",
    intro:
      "The sweat from your walks and runs becomes real value. Get fairly rewarded for your time and consistency.",
    activityImageAlt: "Activity Data Interface",
    proof:
      "If a computer can prove its value by solving complex puzzles, human movement can prove its value, too.",
    steps: [
      "Wear XORing",
      "Collect Activity Data",
      "Proof of Contribution",
      "Mine AIOS",
    ],
    cards: [
      {
        title: "From PoW to PoC",
        body: "The era of computers wasting energy to mine is over. We are entering an era where your steps and sweat become real value.",
      },
      {
        title: "Movement equals Value",
        body: "Get rewarded fairly for the time and consistency of your workouts. Lost Bitcoin is reborn through your footsteps.",
      },
      {
        title: "The Data AI Wants Most",
        body: "As AI evolves, it doesn’t just need massive computing power. It needs real human data consistent with your actual movement and sweat.",
      },
    ],
    outro:
      "Prove your value with just the XORing app. Wear the ring to capture richer data and boost your rewards.",
    phoneAlt: "XO App Interface",
  },
  web3: {
    headline: ["A New Identity", "for the Web3.0 Era"],
    paragraphs: [
      "Not just another smart device.",
      "XORing is your new digital ID, proving you are a core member of a massive AI ecosystem.",
      "Record your moves and turn your everyday routines into extraordinary value.\nStart the experience right at your fingertips.",
    ],
  },
  pioneer: {
    headline: "Frontier Edition",
    paragraphs: [
      "We are inviting the first 000 pioneers to experience XO Ring before anyone else.",
      "A wearable that turns your actions into real value.",
      "Not for everyone.\nNo mass production.",
    ],
    spots: "Limited — 000 Spots",
  },
  policy: {
    title: "Policy & Community Guidelines",
    lines: [
      "To maintain a healthy ecosystem, discussing price fluctuations, sharing trading screenshots, predicting returns, and inducing investments are strictly prohibited within the community.",
      "This platform is an independent sports tech and behavioral data service provider. We do not issue, sell, or broker digital assets, nor do we provide investment advice.",
    ],
  },
  footer: {
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    company: "DEEPCON Inc.",
    ceo: "CEO | Kim Dong Seok",
    businessNumber: "Business Registration Number | 830-88-03497",
    ecommerceNumber: "E-commerce Registration Number | 제2026-서울서초-1620호",
    address:
      "Address | 1F, 15 Gangnam-daero 89-gil, Seocho-gu, Seoul, Republic of Korea",
    contact: "Contact",
    copyright: "© DEEPCON Inc. All Rights Reserved.",
  },
  frontier: {
    joinNow: "Join Now",
    bannerAlt: "XO RING Frontier Edition banner",
    closeModal: "Close modal",
    selectToken: "1. Please select the token you would like to exchange",
    transferGuide:
      "Copy the wallet address below and send the specified token. You will receive confirmation and next steps via email within 5 days.",
    warning:
      "We are not responsible for issues caused by incorrect wallet addresses or transfers to different wallets. Please double-check before sending.",
    emailLabel:
      "2. Please enter the email address to bind with your official account.",
    emailHelper:
      "This email will be used for token exchange updates and shipping communication, so please make sure it is entered accurately.",
    walletLabel:
      "3. Please enter your wallet address for whitelist registration and token transfer.",
    walletHelper:
      "Your wallet address will only be used for whitelist registration and token transfer after final review.",
    consent:
      "I agree to provide my email address and Web3 wallet address in order to participate in the XORing service, and I consent to the use of this information for network participation, service provision, and related communications. I also understand that this service is not an investment product and that no profits are guaranteed.",
    consentPrefix: "For more details, please refer to the",
    terms: "Terms of Service",
    and: "and",
    privacy: "Privacy Policy",
    consentSuffix: "below.",
    submitting: "Submitting...",
    confirm: "OK",
    validation: {
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      walletRequired: "Please enter your wallet address.",
      walletInvalid:
        "Please enter a valid EVM wallet address starting with 0x.",
      agreementRequired:
        "You must agree to the Terms of Service and Privacy Policy to continue.",
      submitFailed: "Failed to submit your application. Please try again.",
      unavailable:
        "Application submission is not available right now. Please try again later.",
    },
    copySuccess: "Wallet address copied.",
    copyFailed: "Copy failed. Please try again.",
    copyWallet: "Copy wallet address",
    copySuffix: "copy",
    completeTitle: "Your Frontier Edition application is complete.",
    completeIntro:
      "Please send the token to the designated wallet below within 3 days.",
    completeFirstComeStrong: "Allocation is confirmed on a first-come",
    completeFirstComeRest:
      "first-served basis upon successful transfer to the specified address.",
    completeShipping:
      "After verification of your application and transfer, an email will be sent to request your shipping address for XO Ring.",
    completeWarning: [
      "Here is your wallet address again.",
      "Please make sure it matches the selected token and send the exact amount.",
    ],
    walletLabels: {
      usdt: "USDT Wallet Address",
      aios: "AIOS Wallet Address",
    },
  },
} as const;

type DeepWiden<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly DeepWiden<Item>[]
    : T extends object
      ? { readonly [Key in keyof T]: DeepWiden<T[Key]> }
      : T;

export type SiteMessages = DeepWiden<typeof englishMessages>;

const chineseMessages = {
  metadata: {
    title: "XORing — 让行动创造价值, 让连接真实发生",
    description: "一款让日常行为创造价值、唤醒个人 AI 的可穿戴 PoC 智能戒指",
    keywords: [
      "XORing",
      "智能戒指",
      "可穿戴设备",
      "社交健身",
      "AI 智能体",
      "Web3",
    ],
    ogImageAlt: "XORing 社交智能戒指主视觉",
  },
  common: {
    skipToContent: "跳转到主要内容",
    comingSoon: "即将上线, 敬请期待",
    storeButtons: [
      { key: "apple", eyebrow: "下载自", label: "App Store" },
      { key: "google", eyebrow: "立即获取", label: "Google Play" },
    ],
  },
  header: {
    nav: [
      { label: "戒指", href: "#ring" },
      { label: "应用", href: "#app" },
      { label: "AIOS", href: "#aios" },
    ],
    joinNow: "立即加入",
    toggleMenu: "切换菜单",
    primaryNavigation: "主导航",
    mobileNavigation: "移动端导航",
    languageSwitch: "EN",
    languageSwitchLabel: "查看英文网站",
  },
  hero: {
    headline: ["超越自我, ", "连接彼此"],
    overlay: [
      "不只是一枚",
      "记录健康的智能戒指",
      "你每一次呼吸与行动, ",
      "都让彼此连接得更深",
      "",
      "认识 XORing, ",
      "全球首款真正连接真人社交的智能戒指",
    ],
  },
  beyondScreen: {
    headline: "走出屏幕",
    paragraphs: [
      ["当我们每天长时间注视屏幕, ", "社交媒体上的形象真的代表你吗？"],
      [
        "XORing 为此而生, ",
        "帮助你找回那个常被无数数字身份",
        "遮蔽的真实自我",
      ],
      [
        "走出屏幕",
        "让每一次步行、每一次奔跑, ",
        "以及每一次呼吸都真正有意义",
      ],
    ],
  },
  twoModes: {
    headline: ["一枚戒指, ", "两种模式"],
    social: ["连接", "整个世界"],
    private: ["专注", "真实自我"],
    switchLabel: "旋转切换",
  },
  socialMode: {
    badge: "社交模式",
    ringAlt: "XORing 社交模式",
    headline: ["互联世界, ", "尽在指尖"],
    subtext: "真正的社交网络不在屏幕里, 而在共同的节奏与呼吸之间",
    cards: [
      {
        title: "伙伴匹配",
        description:
          "XO 会实时为你匹配生活方式和运动习惯相近的用户对方就在附近时, 轻碰戒指即可互动；相隔较远时, 也能通过应用连接并一起运动",
      },
      {
        title: "同频社群",
        description:
          "从你的社区到世界另一端, 与频率相投的人建立社群, 参与每天在全球各地发生的线下活动",
      },
      {
        title: "情侣模式",
        description:
          "即使生活忙碌, 也能安心了解彼此的状态这不是监控, 而是在完全尊重双方意愿的前提下, 温和地分享日常",
      },
      {
        title: "位置共享",
        description:
          "守护儿童与老人的安全, 提供实时位置追踪与共享, 并可协助关注健康状态、发现紧急情况与异常位置变化",
      },
    ],
  },
  privateMode: {
    badge: "私密模式",
    ringAlt: "XORing 私密模式",
    headline: ["只专注于你"],
    subtext: "暂停数据共享, 沉浸在属于自己的运动与时间里",
    cards: [
      {
        title: "数据保护",
        description:
          "你的个人健康数据始终属于你先进的加密技术确保未经明确同意, 生物特征与活动数据绝不会被共享",
      },
      {
        title: "独立训练",
        description:
          "深度专注模式会静音社交通知记录每一次动作、每一次心跳和每一次呼吸, 只留下你与目标",
      },
      {
        title: "专注模式",
        description:
          "屏蔽干扰, 进入深度专注状态XO Ring 会关注你的认知负荷, 并在注意力偏移时温和提醒",
      },
      {
        title: "钥匙与支付",
        description:
          "将戒指作为安全钥匙和支付设备轻触即可解锁或支付, 顺畅、安全且始终触手可及",
      },
    ],
  },
  aiAgent: {
    eyebrow: "AI 智能体",
    headline: ["生活方式", "节奏伙伴"],
    subtext: [
      "戴上 XORing 的那一刻, 你的个人 AI 智能体随即苏醒",
      "它不只记录步数, 还会照顾你的身体、情绪与人际关系",
    ],
    agents: [
      {
        title: "AI 健康智能体",
        description:
          "分析心率、血氧和睡眠数据, 实时预测疲劳状态并提供个性化运动管理",
      },
      {
        title: "AI 情绪智能体",
        description:
          "通过心率变异和活动状态识别压力水平, 并自动推荐冥想内容或合适的音乐",
      },
      {
        title: "AI 社交智能体",
        description:
          "根据戒指的 O/X 方向识别网络状态, 寻找附近兴趣与生活方式相近的用户",
      },
      {
        title: "AI 行为智能体",
        description:
          "“再消耗 400 千卡即可获得奖励”它会设定活动目标, 并在达成后发放 PoC 代币奖励",
      },
    ],
  },
  application: {
    eyebrow: "应用",
    headline: ["所有体验, ", "尽在掌中"],
    description: [
      "你的所有 XORing 数据都会无缝同步到应用",
      "即使没有戒指, 也可以使用应用",
    ],
    note: "* 未连接 XORing 时, 部分功能可能受到限制",
    imageAlt: "移动应用界面",
  },
  poc: {
    eyebrow: "AIOS · PoC",
    headline: "汗水的价值",
    intro:
      "步行与奔跑流下的汗水会转化为真实价值, 让你的时间与坚持得到公平回报",
    activityImageAlt: "活动数据界面",
    proof: "如果计算机可以通过解决复杂问题证明价值, 那么人的行动同样可以",
    steps: ["佩戴 XORing", "采集活动数据", "贡献证明", "获取 AIOS"],
    cards: [
      {
        title: "从 PoW 到 PoC",
        body: "计算机消耗能源挖矿的时代正在过去你的脚步与汗水将成为新的真实价值",
      },
      {
        title: "行动即价值",
        body: "运动投入的时间与坚持会得到公平回报, 数字价值将在你的每一步中重新诞生",
      },
      {
        title: "AI 最需要的数据",
        body: "AI 的进化不仅需要强大算力, 更需要与真实行动和汗水一致的人类数据",
      },
    ],
    outro:
      "仅使用 XORing 应用也能证明你的价值；佩戴戒指则可采集更丰富的数据并提升奖励",
    phoneAlt: "XO 应用界面",
  },
  web3: {
    headline: ["Web3.0 时代的", "全新身份"],
    paragraphs: [
      "它不只是一台智能设备",
      "XORing 是你的全新数字身份, 证明你是庞大 AI 生态系统中的核心成员",
      "记录行动, 让日常习惯转化为非凡价值\n从你的指尖开始体验",
    ],
  },
  pioneer: {
    headline: "先锋限量版",
    paragraphs: [
      "我们正在邀请首批 000 位先锋, 抢先体验 XO Ring",
      "一款让你的行动转化为真实价值的可穿戴设备",
      "并非人人可得\n不做大规模量产",
    ],
    spots: "限量 000 个名额",
  },
  policy: {
    title: "政策与社区准则",
    lines: [
      "为维护健康的生态环境, 社区内严禁讨论价格波动、分享交易截图、预测收益或诱导投资",
      "本平台是独立的运动科技与行为数据服务提供商, 不发行、销售或居间交易数字资产, 也不提供投资建议",
    ],
  },
  footer: {
    terms: "服务条款",
    privacy: "隐私政策",
    company: "DEEPCON 股份有限公司",
    ceo: "代表董事 | Kim Dong Seok",
    businessNumber: "营业执照号码 | 830-88-03497",
    ecommerceNumber: "电子商务备案号 | 제2026-서울서초-1620호",
    address: "地址 | 韩国首尔特别市瑞草区江南大路 89 街 15 号 1 层",
    contact: "联系邮箱",
    copyright: "© DEEPCON Inc. 保留所有权利",
  },
  frontier: {
    joinNow: "立即加入",
    bannerAlt: "XO RING 先锋限量版横幅",
    closeModal: "关闭弹窗",
    selectToken: "1. 请选择要兑换的代币",
    transferGuide:
      "复制下方钱包地址并转入指定代币我们将在 5 天内通过邮件发送确认结果与后续步骤",
    warning:
      "因钱包地址填写错误或转入其他钱包而产生的问题由申请人自行承担, 请务必在转账前再次核对",
    emailLabel: "2. 请输入需要绑定至正式账户的邮箱地址",
    emailHelper: "该邮箱将用于接收代币兑换进度与配送通知, 请准确填写",
    walletLabel: "3. 请输入用于白名单登记及代币转账的钱包地址",
    walletHelper: "钱包地址仅会在最终审核后用于白名单登记和代币转账",
    consent:
      "为参与 XORing 服务, 我同意提供邮箱地址和 Web3 钱包地址, 并同意将这些信息用于网络参与、服务提供及相关通知我也理解本服务并非投资产品, 且不保证任何收益",
    consentPrefix: "更多详情请参阅",
    terms: "服务条款",
    and: "和",
    privacy: "隐私政策",
    consentSuffix: "",
    submitting: "正在提交…",
    confirm: "确定",
    validation: {
      emailRequired: "请输入邮箱地址",
      emailInvalid: "请输入有效的邮箱地址",
      walletRequired: "请输入钱包地址",
      walletInvalid: "请输入以 0x 开头的有效 EVM 钱包地址",
      agreementRequired: "继续操作前, 请同意服务条款和隐私政策",
      submitFailed: "申请提交失败, 请稍后重试",
      unavailable: "当前暂时无法提交申请, 请稍后重试",
    },
    copySuccess: "钱包地址已复制",
    copyFailed: "复制失败, 请重试",
    copyWallet: "复制钱包地址",
    copySuffix: "复制",
    completeTitle: "先锋限量版申请已完成",
    completeIntro: "请在 3 天内将代币转入下方指定钱包",
    completeFirstComeStrong: "名额将按照指定地址成功到账的时间",
    completeFirstComeRest: "以先到先得的顺序确认",
    completeShipping:
      "申请与转账核验完成后, 我们将通过邮件联系你并收集 XO Ring 的配送地址",
    completeWarning: [
      "请再次确认钱包地址",
      "请确保地址与所选代币一致, 并转入准确金额",
    ],
    walletLabels: {
      usdt: "USDT 钱包地址",
      aios: "AIOS 钱包地址",
    },
  },
} as const satisfies SiteMessages;

export const messages: Record<Locale, SiteMessages> = {
  en: englishMessages,
  cn: chineseMessages,
};

export function getMessages(locale: Locale) {
  return messages[locale];
}
