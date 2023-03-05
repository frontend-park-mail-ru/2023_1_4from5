export function constructConfig(config, userIn) {
    config.user.login = userIn.loginIn;
    config.user.username = userIn.usernameIn;
    config.user.authorURL = userIn.authorURL;
    config.user.isAuthor = userIn.isAuthorIn;
    config.user.isAuthorized = userIn.isAuthorizedIn;

    config.general.pages[0].showDisplay = userIn.isAuthorizedIn;
    config.general.pages[1].showDisplay = true;
    config.general.pages[2].showDisplay = userIn.isAuthorizedIn;
    config.general.pages[3].showDisplay = !userIn.isAuthorizedIn;
    config.general.pages[4].showDisplay = !userIn.isAuthorizedIn;
    config.general.pages[5].showDisplay = userIn.isAuthorizedIn * !userIn.isAuthorIn;
    config.general.pages[6].showDisplay = userIn.isAuthorizedIn;

    config.setting.pages[0].showDisplay = userIn.isAuthorIn;
    config.setting.pages[1].showDisplay = userIn.isAuthorIn;
    config.setting.pages[2].showDisplay = true;
    config.setting.pages[3].showDisplay = true;

    config.general.pages[6].name = userIn.usernameIn;
}