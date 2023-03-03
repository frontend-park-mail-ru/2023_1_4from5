export function isValidPassword(inputStr) {
    const flags = {
        hasMinLen: {
            flag: false,
            error: 'Пароль должен содержать не менее 7 символов',
        },
        hasUpper: {
            flag: false,
            error: 'Пароль должен содержать хотя бы 1 заглавную букву',
        },
        hasLower: {
            flag: false,
            error: 'Пароль должен содержать хотя бы 1 строчную букву',
        },
        hasNumber: {
            flag: false,
            error: 'Пароль должен содержать хотя бы 1 цифру',
        },
        hasSpecial: {
            flag: false,
            error: 'Пароль должен содержать хотя бы 1 спец. символ',
        },
    };
    if (inputStr.length >= 7) {
        flags.hasMinLen.flag = true;
    }
    for (const char in inputStr) {
        const code = char.charCodeAt(0);
        if (!isNaN(char)) {
            flags.hasNumber.flag = true;
        }
        else {
            if (code > 64 && code < 91) {
                flags.hasUpper.flag = true;
            }
                // if (char === char.toUpperCase()) {
                //     hasUpper = true;
            // }
            else if (code > 96 && code < 123) {
                flags.hasLower.flag = true;
            }
            else if (code > 32 && code < 48 || code > 57 && code < 65 ||
                code > 90 && code < 97 || code > 122 && code < 127) {
                flags.hasSpecial.flag = true;
            }
        }
    }
    for (const flagsKey in flags) {
        if (!flagsKey.flag) {
            return flagsKey.error;
        }
    }
    return "";
}

export function isValidLogin(inputStr) {
    const flags = {
        hasMinLen: {
            flag: false,
            error: 'Логин должен содержать не менее 7 символов',
        },
        hasMaxLen: {
            flag: true,
            error: 'Логин не должен содержать более 20 символов',
        },
    };
    if (inputStr.length < 7) {
        return flags.hasMinLen.error;
    }
    if (inputStr.length > 20) {
        return flags.hasMaxLen.error;
    }
    return "";
}