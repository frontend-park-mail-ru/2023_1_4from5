#!/bin/bash

echo export const CACHE_URLS = [ > public/modules/cache.js
find public  -type f | xargs -I {} echo \'{}\', >> public/modules/cache.js
echo ] >> public/modules/cache.js
sed -i 's/public/./g' public/modules/cache.js
