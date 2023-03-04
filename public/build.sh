#!/bin/bash
# mkdir public/build
handlebars ./public/components/authorization/auth.handlebars -f ./public/auth.precompiled.js
handlebars ./public/components/register/reg.handlebars -f ./public/reg.precompiled.js
handlebars ./public/components/sideBar/sideBar.handlebars -f ./public/sideBar.precompiled.js
handlebars ./public/components/winSettings/winSettings.handlebars -f ./public/winSettings.precompiled.js
handlebars ./public/components/winSettings/settings/settings.handlebars -f ./public/settings.precompiled.js
handlebars ./public/components/winSettings/myPage/myPage.handlebars -f ./public/myPage.precompiled.js
