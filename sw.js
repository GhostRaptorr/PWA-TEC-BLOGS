self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('mi-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/login.css',
                '/js/login.js',
                '/views/blogs.html',
                '/js/blogs.js',
                '/js/search.js',
                '/views/register.html',
                '/css/register.css',
                '/js/register.js',
                '/img/bg.jpg',
                '/img/1.jpg'
            ]);
        }).catch((error) => {
            console.error('Error al intentar cachear los recursos:', error);
        })
    );
});
