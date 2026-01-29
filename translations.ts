import { Language } from './types';

export const translations = {
    en: {
        sidebar: {
            title: "Focus Hub",
            subtitle: "Deep Work Mode",
            dashboard: "Dashboard",
            analytics: "Analytics",
            settings: "Settings",
            timer: "Timer",
            stopwatch: "Stopwatch",
            focus: "Focus"
        },
        dashboard: {
            title: "Today's Focus",
            subtitle: "Keep it simple. One thing at a time.",
            allTasks: "All Tasks",
            work: "Work",
            personal: "Personal",
            inputPlaceholder: "What needs to be done? Press Enter to add...",
            addTask: "Add new task",
            planned: "Planned",
            focusLogs: "Focus Logs",
            todaysBucket: "Today's Bucket",
            dragTask: "Drag task here",
            sessionHistory: "Session History",
            totalFocus: "Total Focus",
            mockTasks: {
                t1: "Finalize Q3 Design System",
                t2: "Reply to Sarah's email",
                t3: "Walk the dog",
                t4: "Review PR #402"
            },
            mockPlanned: {
                p1: "Daily Standup",
                p2: "Deep Work Block",
                p3: "Design Review"
            },
            mockLogs: {
                l1: "Email Triage",
                l2: "Wireframing"
            }
        },
        analytics: {
            title: "Analytics & Insights",
            subtitle: "Review your cognitive performance and focus trends.",
            last7Days: "Last 7 Days",
            thisWeek: "This Week",
            focusScore: "Focus Score",
            vsLastWeek: "vs last week",
            crushingIt: "✨ You're crushing it! Hyperfocus mode is active today.",
            weeklyFocusTime: "Weekly Focus Time",
            statusLog: "Status Log",
            contextSwitching: "High context switching detected.",
            targetLowered: "Target lowered (Elastic Mode)",
            deepWorkStreak: "Deep work streak initiated.",
            productivityHeatmap: "Productivity Heatmap",
            rest: "Rest",
            flow: "Flow",
            deepWork: "Deep Work",
            peakWindow: "Peak focus window: 10am - 12pm",
            breakdown: "Breakdown",
            workTasks: "Work Tasks",
        },
        settings: {
            title: "Settings",
            subtitle: "Customize your focus environment",
            tabs: ["General", "Timer & Pomo", "Notifications", "Integrations"],
            generalCognitive: "General & Cognitive",
            interfaceLanguage: "Interface Language",
            selectLanguage: "Select your preferred language.",
            elasticStreak: "Elastic Streak",
            forgiveDays: "Forgive missed days if you return within 24 hours.",
            languageTone: "Language & Tone",
            adjustTone: "Adjust how the app speaks to you.",
            timerConfig: "Focus Timer Configuration",
            autoStartBreaks: "Auto-start Breaks",
            autoStartBreaksDesc: "Automatically start the break timer when a focus session ends.",
            autoStartPomos: "Auto-start Pomodoros",
            autoStartPomosDesc: "Automatically start the next focus session after a break.",
            timerSound: "Timer Sound",
            timerSoundDesc: "Choose the alert sound for when a timer finishes.",
            longBreakInterval: "Long Break Interval",
            longBreakIntervalDesc: "Number of pomodoros before a long break.",
            customLengths: "Custom Pomo Lengths",
            focusDuration: "Focus",
            shortBreak: "Short Break",
            longBreak: "Long Break"
        },
        modals: {
            brainDump: {
                title: "Brain Dump Processor",
                active: "AI Active",
                subtitle: "Hey! You caught these thoughts earlier. Want to turn them into action?",
                convertToTask: "Convert to Task",
                keepAsNote: "Keep as Note",
                placeholder: "Catch another thought...",
                waiting: "thoughts waiting",
                processAll: "Process All",
                notes: [
                    "Need to research standing desks before the sale ends on Friday",
                    "Gift idea for mom: digital photo frame with wifi sync",
                    "Cancel the gym subscription"
                ]
            },
            elastic: {
                title: "Elastic Mode Triggered",
                reason: "High Context Switching",
                description: "Hey, noticed things are a bit busy today? We've lowered your target to \"Elastic Mode\" to keep your streak alive. Just finish one tiny thing!",
                streakGoal: "Daily Streak Goal",
                targetAdjusted: "Target Adjusted",
                you: "You",
                newGoal: "New Goal",
                original: "Original",
                maybeLater: "Maybe later",
                accept: "Accept & Focus"
            },
            classification: {
                title: "Classification Suggestion",
                descriptionPrefix: "I think this belongs in",
                descriptionMiddle: "under",
                changeCategory: "Change Category",
                confirm: "Confirm",
                personal: "Personal",
                ideas: "Ideas"
            }
        }
    },
    zh: {
        sidebar: {
            title: "Focus Hub",
            subtitle: "深度工作模式",
            dashboard: "仪表盘",
            analytics: "统计分析",
            settings: "设置",
            timer: "计时器",
            stopwatch: "秒表",
            focus: "专注"
        },
        dashboard: {
            title: "今日专注",
            subtitle: "保持简单。一次只做一件事。",
            allTasks: "所有任务",
            work: "工作",
            personal: "个人",
            inputPlaceholder: "需要做什么？按回车添加...",
            addTask: "添加新任务",
            planned: "计划",
            focusLogs: "专注日志",
            todaysBucket: "今日任务池",
            dragTask: "拖拽任务到这里",
            sessionHistory: "会话历史",
            totalFocus: "专注总时长",
            mockTasks: {
                t1: "定稿 Q3 设计系统",
                t2: "回复 Sarah 的邮件",
                t3: "遛狗",
                t4: "审查 PR #402"
            },
            mockPlanned: {
                p1: "每日站会",
                p2: "深度工作时段",
                p3: "设计评审"
            },
            mockLogs: {
                l1: "邮件处理",
                l2: "绘制线框图"
            }
        },
        analytics: {
            title: "分析与洞察",
            subtitle: "回顾你的认知表现和专注趋势。",
            last7Days: "过去7天",
            thisWeek: "本周",
            focusScore: "专注分",
            vsLastWeek: "对比上周",
            crushingIt: "✨ 干得漂亮！今天进入了超专注模式。",
            weeklyFocusTime: "本周专注时间",
            statusLog: "状态日志",
            contextSwitching: "检测到高频语境切换。",
            targetLowered: "目标已降低 (弹性模式)",
            deepWorkStreak: "深度工作连胜开启。",
            productivityHeatmap: "效率热力图",
            rest: "休息",
            flow: "心流",
            deepWork: "深度工作",
            peakWindow: "最佳专注窗口: 10am - 12pm",
            breakdown: "分类统计",
            workTasks: "工作任务",
        },
        settings: {
            title: "设置",
            subtitle: "自定义你的专注环境",
            tabs: ["常规", "计时器与番茄钟", "通知", "集成"],
            generalCognitive: "常规与认知",
            interfaceLanguage: "界面语言",
            selectLanguage: "选择你偏好的语言。",
            elasticStreak: "弹性连胜",
            forgiveDays: "如果24小时内回归，忽略中断的天数。",
            languageTone: "语言与语气",
            adjustTone: "调整应用的对话风格。",
            timerConfig: "专注计时器配置",
            autoStartBreaks: "自动开始休息",
            autoStartBreaksDesc: "专注结束后自动开始休息计时。",
            autoStartPomos: "自动开始番茄钟",
            autoStartPomosDesc: "休息结束后自动开始下一个专注时段。",
            timerSound: "计时器音效",
            timerSoundDesc: "选择计时结束的提示音。",
            longBreakInterval: "长休息间隔",
            longBreakIntervalDesc: "进行长休息前的番茄钟数量。",
            customLengths: "自定义番茄钟时长",
            focusDuration: "专注",
            shortBreak: "短休息",
            longBreak: "长休息"
        },
        modals: {
            brainDump: {
                title: "灵感收集器",
                active: "AI 运行中",
                subtitle: "嘿！你捕捉到了这些想法。要把它们转化为行动吗？",
                convertToTask: "转为任务",
                keepAsNote: "保留为笔记",
                placeholder: "捕捉另一个想法...",
                waiting: "个想法待处理",
                processAll: "全部处理",
                notes: [
                    "周五大促结束前研究升降桌",
                    "给妈妈的礼物：带Wifi同步的数码相框",
                    "取消健身房订阅"
                ]
            },
            elastic: {
                title: "触发弹性模式",
                reason: "高频语境切换",
                description: "嘿，注意到今天有点忙乱？我们将目标降级为 “弹性模式” 以保持连胜。只需完成一件小事！",
                streakGoal: "每日连胜目标",
                targetAdjusted: "目标已调整",
                you: "你",
                newGoal: "新目标",
                original: "原定",
                maybeLater: "稍后再说",
                accept: "接受并专注"
            },
            classification: {
                title: "分类建议",
                descriptionPrefix: "我认为这属于",
                descriptionMiddle: "下的",
                changeCategory: "更改分类",
                confirm: "确认",
                personal: "个人",
                ideas: "灵感"
            }
        }
    }
};
