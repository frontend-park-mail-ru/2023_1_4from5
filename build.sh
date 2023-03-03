#!/bin/bash
# mkdir public/build
handlebars ./components/authorization/auth.handlebars -f ./public/build/auth.precompiled.js
handlebars ./components/register/reg.handlebars -f ./public/build/reg.precompiled.js
handlebars ./components/sideBar/sideBar.handlebars -f ./public/build/sideBar.precompiled.js
handlebars ./components/winSettings/winSettings.handlebars -f ./public/build/winSettings.precompiled.js
handlebars ./components/winSettings/settings/settings.handlebars -f ./public/build/settings.precompiled.js
