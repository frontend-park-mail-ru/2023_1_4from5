#!/bin/bash
# mkdir public/build
handlebars ./components/authorization/auth.handlebars -f ./public/auth.precompiled.js
handlebars ./components/register/reg.handlebars -f ./public/reg.precompiled.js
handlebars ./components/sideBar/sideBar.handlebars -f ./public/sideBar.precompiled.js
handlebars ./components/winSettings/winSettings.handlebars -f ./public/winSettings.precompiled.js
handlebars ./components/winSettings/settings/settings.handlebars -f ./public/settings.precompiled.js
handlebars ./components/winSettings/myPage/myPage.handlebars -f ./public/myPage.precompiled.js
