const CACHE_NAME = 'cet6-cards-v1'; // 如果以后更新了网页代码，把这里的 v1 改成 v2，缓存就会刷新
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
  // 如果你的 JS/CSS 是单独的文件，也加到这里，比如 './style.css', './app.js'
];

// 安装时缓存文件
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// 激活时清理旧缓存
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// 拦截网络请求，优先使用缓存（离线可用）
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
