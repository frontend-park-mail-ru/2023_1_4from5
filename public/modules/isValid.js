const LENGTH = {
  MIN: 7,
  MAX: 20,
};

const ASCII = {
  UPPER_A: 65,
  UPPER_Z: 90,
  LOWER_A: 97,
  LOWER_Z: 122,
  EXCLAMATION: 33,
  SLASH: 47,
  COLON: 58,
  AT: 64,
  RECTANGLE_BRACKET: 91,
  BACK_QUOTE: 96,
  FIGURED_BRACKET: 123,
  TILDE: 126,
};

/**
 * check for letter
 * @param {int} code - ASCII code of sign
 *
 * @returns {boolean} - response is sign is letter
 */
function isLetter(code) {
  return ((code >= ASCII.LOWER_A && code <= ASCII.LOWER_Z)
      || (code >= ASCII.UPPER_A && code <= ASCII.UPPER_Z));
}

/**
 * check for special sign
 * @param {int} code - ASCII code of sign
 *
 * @returns {boolean} - response is sign is special sign
 */
function isSpecialSign(code) {
  return (((code >= ASCII.EXCLAMATION && code <= ASCII.SLASH)
      || (code >= ASCII.COLON && code <= ASCII.AT))
      || ((code >= ASCII.RECTANGLE_BRACKET && code <= ASCII.BACK_QUOTE)
      || (code >= ASCII.FIGURED_BRACKET && code <= ASCII.TILDE)));
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
  if (inputStr.length >= LENGTH.MIN) {
    flags.hasMinLen.flag = true;
  } else {
    return flags.hasMinLen.error;
  }
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
  for (const flagsKey in flags) {
    if (!flags[flagsKey].flag) {
      return flags[flagsKey].error;
    }
  }
  return '';
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
  if (inputStr.length < LENGTH.MIN) {
    return flags.hasMinLen.error;
  }
  if (inputStr.length > LENGTH.MAX) {
    return flags.hasMaxLen.error;
  }
  return '';
}
