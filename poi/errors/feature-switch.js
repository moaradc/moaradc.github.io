/* 
 * feature-switch.js
 * 全局功能开关控制文件
 * 设置为 true 显示，false 隐藏
 */

const SITE_FEATURES = {
    // index.html
    btn_search_index: true, //搜索
    nav_home: true, // 首页
    nav_articles: true, // 文章
    nav_tags: true, // 标签
    nav_archives: true, // 归档
    nav_about: false, // 关于
    nav_footer: true, // 页脚
    nav_api: true, // LDDC API
    section_footer: true, // 整个页脚区域

    // archives.html
    btn_anime: false, // 追番列表/帧间按钮
    btn_search_archives: true, // 搜索
    
    // index.html, archives.html
    btn_theme: true, // 主题切换按钮
};

// === 下面是执行逻辑 ===
(function() {
    // ID 映射表：将配置项映射到 HTML 元素的 ID
    const ID_MAP = {
        nav_home: 'nav-link-home',
        nav_articles: 'nav-link-articles',
        nav_tags: 'tag-nav-container',
        nav_archives: 'nav-link-archives',
        nav_about: 'nav-link-about',
        nav_footer: 'nav-link-footer',
        nav_api: 'nav-link-api',
        section_footer: 'about',
        btn_anime: 'btn-anime-switch',
        btn_theme: ['theme-btn-pc', 'theme-btn-mobile', 'btn-theme-archive', 'btn-theme-i'], // 支持数组，控制多个按钮
        btn_search_index: ['search-pc', 'search-mobile'],
        btn_search_archives: ['search-container-archive', 'btn-search-mobile-archive'],
        c1: 'c1', c2: 'c2', c3: 'c3',
        c0: ['c1', 'c2', 'c3']
        
    };

    function applyFeatures() {
        for (const [key, isEnabled] of Object.entries(SITE_FEATURES)) {
            const target = ID_MAP[key];
            if (!target) continue;

            const ids = Array.isArray(target) ? target : [target];
            
            ids.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    if (!isEnabled) {
                        // 使用 important 覆盖任何 flex/block 样式
                        element.style.setProperty('display', 'none', 'important');
                    } else {
                        element.style.display = '';
                    }
                }
            });
        }
    }

    // 页面加载完成后立即执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyFeatures);
    } else {
        applyFeatures();
    }
})();