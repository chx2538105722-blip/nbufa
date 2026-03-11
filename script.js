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
}