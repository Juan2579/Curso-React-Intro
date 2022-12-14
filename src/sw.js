const VERSION = "v1"

self.addEventListener("install", event =>  {
    event.waitUntil(precache())
})

self.addEventListener("fetch", event => {
    const request = event.request
    //get
    if(request.method != "GET"){
        return;
    }
    //buscar en cache
    event.respondWith(cachedResponse(request))

    //actualizar el cache
    event.waitUntil(updateCache(request))
})

async function precache() {
    const cache = await caches.open(VERSION)
    return cache.addAll([
        "/",
        "/dist/index.html",
        "/dist/assets/index.502af633.css",
        "/dist/assets/index.502af633.css"
    ])
}

async function cachedResponse(request) {
    const cache = await caches.open(VERSION)
    const response = await cache.match(request)

    return response || fetch(request)
}
async function updateCache(request) {
    const cache = await caches.open(VERSION)
    const response = await fetch(request)
    console.log(`Code: ${response.status} | Messsage: ${response.statusText}`)
    if(response.status === 206){
        console.log('Respuesta parcial, no se actualiza caché ...')
    }else {
        cache.put(request, response.clone());
    }
    return cache;
}