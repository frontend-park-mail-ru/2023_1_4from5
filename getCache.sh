#!/bin/bash

echo export const CACHE_URLS = [ > public/cache.js
find public  -type f | xargs -I {} echo \'{}\', >> public/cache.js
echo ] >> public/cache.js
sed -i 's/public/./g' public/cache.js
