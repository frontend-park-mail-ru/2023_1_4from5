const LENGTH = {
  MIN_LOGIN: 7,
  MAX_LOGIN: 40,

  MIN_PASSWORD: 7,
  MAX_PASSWORD: 40,

  MIN_USERNAME: 1,
  MAX_USERNAME: 40,

  MAX_MONEY: 9,
  MAX_DESCRIPTION_AIM: 100,
  MAX_TITLE_POST: 40,
  MAX_TEXT_POST: 4000,
};

const ASCII = {
  UPPER_A: 65,
  UPPER_Z: 90,
  LOWER_A: 97,
  LOWER_Z: 122,
  SPACE: 32,
  EXCLAMATION: 33,
  DASH: 45,
  POINT: 46,
  SLASH: 47,
  COLON: 58,
  AT: 64,
  RECTANGLE_BRACKET: 91,
  UNDERLINING: 95,
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
// function isSpecialSign(code) {
//   return (((code >= ASCII.EXCLAMATION && code <= ASCII.SLASH)
//       || (code >= ASCII.COLON && code <= ASCII.AT))
//       || ((code >= ASCII.RECTANGLE_BRACKET && code <= ASCII.BACK_QUOTE)
//       || (code >= ASCII.FIGURED_BRACKET && code <= ASCII.TILDE)));
// }
function isWhiteSign(code) {
  return (code >= ASCII.SPACE && code <= ASCII.TILDE);
}
/**
 * validation of password input
 * @param {String} inputStr - injected password
 *
 * @returns {String} - validation error
 */
export function isValidPassword(inputStr) {
  const flags = {
    hasBlackSign: {
      flag: true,
      error: 'Пароль содержит некорректный символ',
    },
    hasMinLen: {
      flag: false,
      error: `Пароль должен содержать не менее ${LENGTH.MIN_PASSWORD} символов`,
    },
    hasMaxLen: {
      flag: false,
      error: `Пароль должен содержать не более ${LENGTH.MAX_PASSWORD} символов`,
    },
    // убрал, потому что кажется Саша так говорил и бэк его послушал
    // hasUpper: {
    //   flag: false,
    //   error: 'Пароль должен содержать хотя бы 1 заглавную букву',
    // },
    // hasLower: {
    //   flag: false,
    //   error: 'Пароль должен содержать хотя бы 1 букву',
    // },
    hasLetter: {
      flag: false,
      error: 'Пароль должен содержать хотя бы 1 букву',
    },
    hasNumber: {
      flag: false,
      error: 'Пароль должен содержать хотя бы 1 цифру',
    },
    // hasSpecial: {
    //   flag: true,
    //   error: 'Пароль должен содержать хотя бы 1 спец. символ',
    // },
  };
  if (inputStr.length >= LENGTH.MIN_PASSWORD) {
    flags.hasMinLen.flag = true;
  } else {
    return flags.hasMinLen.error;
  }

  if (inputStr.length <= LENGTH.MAX_PASSWORD) {
    flags.hasMaxLen.flag = true;
  } else {
    return flags.hasMaxLen.error;
  }
  for (const char of inputStr) {
    const code = char.charCodeAt(0);
    if (!isWhiteSign(code)) {
      return flags.hasBlackSign.error;
    }
    if (!isNaN(char)) {
      flags.hasNumber.flag = true;
    } else if (isLetter(code)) {
      flags.hasLetter.flag = true;
    } else if (!isWhiteSign(code)) {
      flags.hasBlackSign = true;
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
    hasBlackSign: {
      flag: false,
      error: 'Логин может содержать только латинские символы, цифры, точку и подчеркивание',
    },
    hasMinLen: {
      flag: true,
      error: `Логин должен содержать не менее ${LENGTH.MIN_LOGIN} символов`,
    },
    hasMaxLen: {
      flag: true,
      error: `Логин не может содержать более ${LENGTH.MAX_LOGIN} символов`,
    },
  };
  if (inputStr.length < LENGTH.MIN_LOGIN) {
    return flags.hasMinLen.error;
  }
  if (inputStr.length > LENGTH.MAX_LOGIN) {
    return flags.hasMaxLen.error;
  }
  for (const char of inputStr) {
    const code = char.charCodeAt(0);
    if (!(isLetter(code) || code === ASCII.POINT || code === ASCII.DASH
        || code === ASCII.UNDERLINING || !isNaN(char))) {
      return flags.hasBlackSign.error;
    }
  }
  return '';
}

export function isValidUsername(inputStr) {
  const flags = {
    hasBlackSign: {
      flag: false,
      error: 'Имя содержит некорректные символы',
    },
    hasMinLen: {
      flag: false,
      error: 'Введите ваше имя',
    },
    hasMaxLen: {
      flag: false,
      error: `Имя не может содержать более ${LENGTH.MAX_USERNAME} символов`,
    },
  };
  if (inputStr.length < LENGTH.MIN_USERNAME) {
    return flags.hasMinLen.error;
  }
  if (inputStr.length > LENGTH.MAX_USERNAME) {
    return flags.hasMaxLen.error;
  }
  for (const char of inputStr) {
    const code = char.charCodeAt(0);
    if (!isWhiteSign(code)) {
      return flags.hasBlackSign.error;
    }
  }
  return '';
}

export function isValidMoneyString(inputStr) {
  const flags = {
    onlyNumber: {
      flag: true,
      error: 'В поле цель можно вводить только число',
    },
    hasMaxLen: {
      flag: true,
      error: 'Слишком большая сумма',
    },
  };
  if (Number(inputStr) > 10 ** LENGTH.MAX_MONEY) {
    return flags.hasMaxLen.error;
  }
  for (const char of inputStr) {
    if (isNaN(char)) {
      return flags.onlyNumber.error;
    }
  }
  return '';
}

export function isValidDonate(inputStr) {
  const flags = {
    onlyNumber: {
      flag: true,
      error: 'В поле сумма доната можно вводить только число',
    },
    hasMaxLen: {
      flag: true,
      error: 'Слишком большая сумма доната',
    },
    hasPositive: {
      flag: true,
      error: 'Сумма доната должна быть больше 0',
    }
  };
  if (Number(inputStr) > 10 ** LENGTH.MAX_MONEY) {
    return flags.hasMaxLen.error;
  }
  if (Number(inputStr) <= 0) {
    return flags.hasPositive.error;
  }
  for (const char of inputStr) {
    if (isNaN(char)) {
      return flags.onlyNumber.error;
    }
  }
  return '';
}

export function isValidDescriptionAim(inputStr) {
  const flags = {
    hasMaxLen: {
      flag: true,
      error: `В поле описание не должно содержаться более ${LENGTH.MAX_DESCRIPTION_AIM} символов`,
    },
  };
  if (inputStr.length > LENGTH.MAX_DESCRIPTION_AIM) {
    return flags.hasMaxLen.error;
  }
  return '';
}

export function isValidTitlePost(inputStr) {
  const flags = {
    hasMaxLen: {
      flag: true,
      error: `Название поста не может содержать более ${LENGTH.MAX_TITLE_POST} символов`,
    },
  };
  if (inputStr.length > LENGTH.MAX_TITLE_POST) {
    return flags.hasMaxLen.error;
  }
  return '';
}

export function isValidTextPost(inputStr) {
  const flags = {
    hasMaxLen: {
      flag: true,
      error: 'Слишком длинный текст поста',
    },
  };
  if (inputStr.length > LENGTH.MAX_TEXT_POST) {
    return flags.hasMaxLen.error;
  }
  return '';
}
