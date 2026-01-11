// ==UserScript==
// @name         CORS Bypass 跨域解决
// @namespace    http4://blog.945426.xyz
// @version      0.1
// @description  通过 GM_xmlhttpRequest 绕过浏览器的 CORS 限制，支持代理原生的 fetch 请求。这个脚本主要用于开发和测试环境，帮助解决开发过程中的CORS跨域问题。
// @author       MOARA
// @grant        GM_xmlhttpRequest
// @connect      *
// @run-at       document-start
// @include      *://blog.945426.xyz/lddc.html*
// @include      *://blog2.945426.xyz/lddc.html*
// @include      *://moarablog.netlify.app/lddc.html*
// @include      *://moara-eight.vercel.app/lddc.html*
// ==/UserScript==

(function() {
    'use strict';
    const originalFetch = window.fetch;
    window.fetch = async function(input, init) {
        let url = (input instanceof Request) ? input.url : input;
        const currentOrigin = window.location.origin;
        const isCrossDomain = url.startsWith('http') && !url.startsWith(currentOrigin);
        if (isCrossDomain) {
            console.log(`[CORS Bypass] 检测到跨域请求，切换至 GM_xmlhttpRequest: ${url}`);
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: (init && init.method) || 'GET',
                    url: url,
                    headers: (init && init.headers) || {},
                    data: (init && init.body) || "",
                    onload: function(response) {
                        resolve(new Response(response.responseText, {
                            status: response.status,
                            statusText: response.statusText,
                            headers: new Headers({
                                'content-type': 'application/json'
                            })
                        }));
                    },
                    onerror: function(err) {
                        reject(err);
                    }
                });
            });
        }
        return originalFetch.apply(this, arguments);
    };
    console.log('[CORS Bypass] 跨域插件已就绪');
})();
