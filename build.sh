#!/usr/bin/env bash
# mkdir public/build
handlebars ./public/components/authorization/auth.handlebars -f ./public/build/auth.precompiled.js
handlebars ./public/components/register/reg.handlebars -f ./public/build/reg.precompiled.js
handlebars ./public/components/sideBar/sideBar.handlebars -f ./public/build/sideBar.precompiled.js
handlebars ./public/components/winSettings/winSettings.handlebars -f ./public/build/winSettings.precompiled.js
handlebars ./public/components/settings/settings.handlebars -f ./public/build/settings.precompiled.js
handlebars ./public/components/myPage/myPage.handlebars -f ./public/build/myPage.precompiled.js
