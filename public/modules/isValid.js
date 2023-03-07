const REQUIREMENTS = {
    LENGTH : {
        MIN : 7,
        MAX : 20,
    },
    ASCII : {
        UPPER_A : 65,
        UPPER_Z : 90,
        LOWER_A : 97,
        LOWER_Z : 122,  
        EXCLAMATION : 33,
        SLASH : 47,
        COLON : 58,
        AT : 64,
        RECTANGLE_BRACKET : 91,
        BACK_QUOTE : 96,
        FIGURED_BRACKET : 123,
        TILDE : 126,   
    }
}

/**
 * check for letter
 * @param {int} inputStr - ASCII code of sign
 *
 * @returns {bool} - response is sign is letter
 */
function isLetter(code) {
    return (code >= REQUIREMENTS.ASCII.LOWER_A && code <= REQUIREMENTS.ASCII.LOWER_Z || code >= REQUIREMENTS.ASCII.UPPER_A && code <= REQUIREMENTS.ASCII.UPPER_Z);
}

/**
 * check for special sign
 * @param {int} inputStr - ASCII code of sign
 *
 * @returns {bool} - response is sign is special sign
 */
function isSpecialSign(code) {
    return (((code >= 32 && code <= 48) || (code >= 57 && code <= 65))
            || ((code >= 90 && code <= 97) || (code >= 122 && code <= 127)));
}

/**
 * validation of password input
 * @param {String} inputStr - injected password
 *
 * @returns {String} - validation error
 */
export function isValidPassword(inputStr) {
    const flags = {
        hasMinLen: {
            flag: false,
            error: 'Пароль должен содержать не менее 7 символов',
        },
        hasUpper: {
            flag: true,
            error: 'Пароль должен содержать хотя бы 1 заглавную букву',
        },
        hasLower: {
            flag: false,
            error: 'Пароль должен содержать хотя бы 1 букву',
        },
        hasNumber: {
            flag: false,
            error: 'Пароль должен содержать хотя бы 1 цифру',
        },
        hasSpecial: {
            flag: true,
            error: 'Пароль должен содержать хотя бы 1 спец. символ',
        },
    };
    if (inputStr.length >= REQUIREMENTS.LENGTH.MIN) {
        flags.hasMinLen.flag = true;
    } else {
        return flags.hasMinLen.error;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const char of inputStr) {
        const code = char.charCodeAt(0);
        if (!isNaN(char)) {
            flags.hasNumber.flag = true;
        } else if (isLetter(code)) {
                flags.hasLower.flag = true;
        } else if (isSpecialSign(code)) {
            flags.hasSpecial.flag = true;
        }
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const flagsKey in flags) {
        if (!flags[flagsKey].flag) {
            return flags[flagsKey].error;
        }
    }
}

/**
 * validation of login input
 * @param {String} inputStr - injected login
 *
 * @returns {String} - validation error
 */
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
    if (inputStr.length < REQUIREMENTS.LENGTH.MIN) {
        return flags.hasMinLen.error;
    }
    if (inputStr.length > REQUIREMENTS.LENGTH.MAX) {
        return flags.hasMaxLen.error;
    }
}
