// 延迟加载部分
let interval = setInterval(() => {
    if (document.querySelector(".footer")) {
        document.querySelector("#customize").style.display = "";
        clearInterval(interval);
    }
}, 200);

// 一言API
(function() {
    let script = document.createElement("script");
    script.src = "https://v1.hitokoto.cn/?encode=js&select=%23hitokoto";
    script.defer = true;
    document.body.appendChild(script);
})();

// 51la 网页统计
(function() {
    let script = document.createElement("script");
    script.src = "//js.users.51.la/21910037.js";
    script.type = "text/javascript";
    document.body.appendChild(script);
})();