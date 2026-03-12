// 1. 动态时间问候
const mainTitle = document.querySelector('.main-title');
const hour = new Date().getHours();
let greeting = "欢迎使用HANKING的导航";

if (hour < 6) greeting = "凌晨好，HANKING提醒注意休息哦";
else if (hour < 12) greeting = "早安，HANKING为你开启元气满满的一天";
else if (hour < 18) greeting = "午后好，HANKING请你继续加油";
else greeting = "晚上好，HANKING提醒记得劳逸结合";

if (mainTitle) {
    mainTitle.innerText = greeting;
}

// 2. 搜索逻辑
const searchInput = document.getElementById('searchInput');
let currentEngine = "https://www.baidu.com/s?wd=";

// 切换搜索引擎
document.querySelectorAll('.engine').forEach(el => {
    el.addEventListener('click', () => {
        const activeEngine = document.querySelector('.engine.active');
        if (activeEngine) activeEngine.classList.remove('active');
        el.classList.add('active');
        currentEngine = el.getAttribute('data-url');
    });
});

// 回车搜索
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value) {
            window.open(currentEngine + encodeURIComponent(searchInput.value), '_blank');
        }
    });
}
// 在 script.js 中
const feedbackBtn = document.getElementById('yourButtonId'); // 确保 ID 对应
if (feedbackBtn) {
    feedbackBtn.addEventListener('click', () => {
        window.open('https://v.wjx.cn/vm/wEMfBF2.aspx', '_blank');
    });
}// --- 功能 1：深色模式切换 ---
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', (e) => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // 如果浏览器不支持 ViewTransition API，直接切换
    if (!document.startViewTransition) {
        toggleTheme();
        return;
    }

    // 获取点击位置的坐标
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
    );

    // 开启过渡动画
    const transition = document.startViewTransition(() => {
        toggleTheme();
    });

    transition.ready.then(() => {
        // 让新旧图层以点击位置为圆心进行裁剪动画
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 500,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)',
            }
        );
    });
});

function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// 读取上次保存的主题
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
function updateSemesterProgress() {
    // 假设开学是 2026-02-23，结束是 2026-07-05
    const startDate = new Date('2026-03-09').getTime();
    const endDate = new Date('2026-07-18').getTime();
    const now = new Date().getTime();

    if (now < startDate) {
        document.getElementById('progress-percent').innerText = "尚未开学";
        return;
    }

    const total = endDate - startDate;
    const current = now - startDate;
    let percentage = Math.floor((current / total) * 100);

    // 限制在 0-100 之间
    percentage = Math.max(0, Math.min(100, percentage));

    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-percent');

    if (fill) fill.style.width = percentage + '%';
    if (text) text.innerText = percentage + '%';
}

// 页面加载后执行
window.addEventListener('DOMContentLoaded', updateSemesterProgress);
const topBar = document.querySelector('.semester-wrapper');

window.addEventListener('mousemove', (e) => {
    if (e.clientY < 80) {
        topBar.style.opacity = "1";
        topBar.style.transform = "translateY(0)";
    } else {
        topBar.style.opacity = "0.7";
        // 稍微往上收一点，留出更多视口空间
        topBar.style.transform = "translateY(-5px)";
    }
});
// 切换面板显示状态
function toggleTools() {
    document.getElementById('toolsPanel').classList.toggle('active');
}

// 黄金分割计算逻辑
function calcGolden() {
    const val = document.getElementById('inputVal').value;
    const resLarge = document.getElementById('resLarge');
    const resSmall = document.getElementById('resSmall');
    
    if (val) {
        resLarge.innerText = (val * 0.618).toFixed(2) + " mm";
        resSmall.innerText = (val * 0.382).toFixed(2) + " mm";
    } else {
        resLarge.innerText = "-";
        resSmall.innerText = "-";
    }
}

// 点击色块自动复制颜色代码
function copyColor(hex) {
    navigator.clipboard.writeText(hex);
    // 这里可以调用你之前的 toast 提示函数
    alert("已复制色号: " + hex); 
}window.addEventListener('load', () => {
    const loader = document.getElementById('loader-layer');
    
    // 延迟一小会儿（例如 1.5 秒），让用户看清动画，增加仪式感
    setTimeout(() => {
        loader.classList.add('loader-hidden');
        
        // 动画结束后可以触发一个“主页进入”的微动效
        gsap.from('.container', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }, 1500);
});window.addEventListener('load', () => {
    const loader = document.getElementById('loader-layer');
    
    // 粒子动画总时长约为 3.5s (gatherAndFade) + 0.5s (延迟) = 4s
    // 我们在 4s 后揭开网页，确保仪式感完整
    setTimeout(() => {
        // 1. 隐藏加载层
        loader.classList.add('loader-hidden');
        
        // 2. 触发主页内容的“量子纠缠”式进入动效 (需要引入 GSAP)
        if (typeof gsap !== 'undefined') {
            gsap.from('.container', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.1 // 让卡片依次浮现
            });
        }
    }, 4000); // 4000 毫秒 = 4 秒
});window.addEventListener('load', () => {
    const loader = document.getElementById('loader-layer');
    
    // 延迟一小会儿（例如 1.5 秒），让用户看清动画，增加仪式感
    setTimeout(() => {
        loader.classList.add('loader-hidden');
        
        // 动画结束后可以触发一个“主页进入”的微动效
        gsap.from('.container', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    }, 1500);
});
// 1. 严格对照截图录入的数据（确认周四无课，周五有课）
const courseData = {
    1: [ // 周一
        {t: "1-2节", n: "工业设计调研", l: "艺术楼-404"},
        {t: "3-4节", n: "工业设计调研", l: "艺术楼-404"},
        {t: "6-7节", n: "产品设计程序与方法", l: "南教1-315"},
        {t: "8-9节", n: "产品设计程序与方法", l: "南教1-315"},
        {t: "11-12节", n: "生成式AI应用", l: "南教1-303"}
    ],
    2: [ // 周二
        {t: "1-2节", n: "计算机辅助设计III", l: "实验楼A-305"},
        {t: "3-4节", n: "计算机辅助设计III", l: "实验楼A-305"}
    ],
    3: [ // 周三
        {t: "1-2节", n: "先进制造与3D打印", l: "北教8-307"},
        {t: "6-7节", n: "产品形态设计", l: "艺术楼-404"},
        {t: "8-9节", n: "产品形态设计", l: "艺术楼-404"}
    ],
    4: [], // 周四确认无课
    5: [ // 周五
        {t: "3-4节", n: "羽毛球B", l: "体育馆-136"},
        {t: "6-7节", n: "马克思主义基本原理", l: "北教8-506"},
        {t: "8-9节", n: "思政/形策/马基", l: "北教8-506"}
    ]
};

function initTimetable() {
    const now = new Date();
    let day = now.getDay(); // 0是周日
    
    const dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    document.getElementById('today-name').innerText = dayNames[day];

    // --- 渲染预览条（未点击状态，显示地点） ---
    const previewContainer = document.getElementById('today-course-list');
    previewContainer.innerHTML = "";

    const todayCourses = courseData[day] || [];
    if (day >= 1 && day <= 5 && todayCourses.length > 0) {
        todayCourses.forEach(c => {
            const span = document.createElement('span');
            span.className = 'mini-tag';
            span.innerText = `${c.t} ${c.n} @${c.l}`; // 显示课程+地点
            previewContainer.appendChild(span);
        });
    } else {
        const hint = (day === 4) ? "今日无课 (自主设计)" : (day === 0 || day === 6 ? "周末愉快 ☕" : "今日无排课");
        previewContainer.innerHTML = `<span class="mini-tag" style="background:rgba(0,0,0,0.05); color:#888;">${hint}</span>`;
    }

    // --- 渲染全周网格 & 高亮今日 ---
    for (let i = 1; i <= 5; i++) {
        const col = document.getElementById(`col-${i}`);
        if (!col) continue;

        // 移除旧的高亮并重置内容
        col.classList.remove('today-highlight');
        const header = col.querySelector('.grid-header');
        col.innerHTML = "";
        col.appendChild(header);

        // 如果 i 等于当前星期几，添加高亮类
        if (i === day) {
            col.classList.add('today-highlight');
        }

        const courses = courseData[i] || [];
        if (courses.length > 0) {
            courses.forEach(c => {
                const card = document.createElement('div');
                card.className = 'course-card';
                card.innerHTML = `<span>${c.t}</span><strong>${c.n}</strong><p>${c.l}</p>`;
                col.appendChild(card);
            });
        } else {
            const noCourse = document.createElement('div');
            noCourse.className = 'no-course';
            noCourse.style.cssText = "color:#bbb; font-size:12px; text-align:center; margin:30px 0; font-style:italic;";
            noCourse.innerText = "无课";
            col.appendChild(noCourse);
        }
    }
}

// 统一的切换函数
function toggleTimetable() {
    const module = document.getElementById('timetableModule');
    module.classList.toggle('active');
}

// 确保页面加载完后执行
window.addEventListener('DOMContentLoaded', () => {
    initTimetable();
    // 之前你的工具箱逻辑等也可以放在这里
});