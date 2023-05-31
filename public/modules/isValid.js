export const LENGTH = {
  MIN_LOGIN: 7,
  MAX_LOGIN: 20,

  MIN_PASSWORD: 7,
  MAX_PASSWORD: 20,

  MIN_USERNAME: 1,
  MAX_USERNAME: 30,

  MIN_CREATOR_NAME: 1,
  MAX_CREATOR_NAME: 40,

  MIN_CREATOR_DESCRIPTION: 1,
  MAX_CREATOR_DESCRIPTION: 250,

  MAX_MONEY: 9,
  MIN_DESCRIPTION_AIM: 1,
  MAX_DESCRIPTION_AIM: 50,

  MAX_TITLE_POST: 40,
  MAX_TEXT_POST: 2000,
};

const ASCII = {
  SPACE: 32,
  EXCLAMATION: 33,
  DASH: 45,
  POINT: 46,
  SLASH: 47,
  ZERO: 48,
  NINE: 57,
  COLON: 58,
  AT: 64,
  ENG_UPPER_A: 65,
  ENG_UPPER_Z: 90,
  RECTANGLE_BRACKET: 91,
  UNDERSCORE: 95,
  BACK_QUOTE: 96,
  ENG_LOWER_A: 97,
  ENG_LOWER_Z: 122,
  FIGURED_BRACKET: 123,
  TILDE: 126,
};

const UNICODE = {
  RUS_UPPER_E: 1025,
  RUS_UPPER_A: 1040,
  RUS_LOWER_YA: 1103,
  RUS_LOWER_E: 1105,
};

export const validationStructure = {
  field: '',

  isTimePeriod: false,
  isPhoneNumber: false,

  isMoney: false,
  moreThanTwoRub: false,
  balance: '',

  length_flag: false, // требуется проверка на длину
  min_length: 0,
  max_length: 0,
  lengthErrorText() {
    return `Поле должно содержать от ${this.min_length} до ${this.max_length} символов`;
  },

  eng_symbols_flag: true,
  rus_symbols_flag: true,
  numbers_flag: true,
  special_signs: isSpecialSign,
  whiteSymbolsError: '',

  hasNumber: false,
  hasNumber_flag: false,
  hasNumber_error() {
    return `Поле ${this.field} должно содержать хотя бы 1 цифру`;
  },
  hasLetter: false,
  hasLetter_flag: false,
  hasLetter_error() {
    return `Поле ${this.field} должно содержать хотя бы 1 букву`;
  },
};

export function validation(validStructure, inputStr) {
  console.log(validStructure);
  // общая проверка на то, что это разрешённый символ
  for (const char of inputStr) {
    const code = char.charCodeAt(0);
    if (!isAllowedSign(code)) {
      console.log('is not allowedSign', char);
      return validStructure.whiteSymbolsError;
    }
  }

  if (validStructure.isTimePeriod) {
    console.log('isTimePeriod', inputStr);
    return isValidSelectedDate(inputStr);
  }
  if (validStructure.isPhoneNumber) {
    console.log('isPhoneNumber', inputStr);
    return isValidPhone(inputStr);
  }
  if (validStructure.isMoney) {
    console.log('isMoney', inputStr);
    return isValidDonate(inputStr, validStructure.balance, validStructure.moreThanTwoRub);
  }
  // проверка на длину
  if (validStructure.length_flag
      && (inputStr.length > validStructure.max_length
          || inputStr.length < validStructure.min_length)) {
    console.log('length', inputStr);
    return validStructure.lengthErrorText();
  }

  // общая проверка на то, что это разрешённый символ
  for (const char of inputStr) {
    const code = char.charCodeAt(0);
    // проверка на hasNumber, если тру
    if (validStructure.hasNumber && !isNaN(char)) {
      validStructure.hasNumber_flag = true;
    }
    // проверка на hasLetter, если тру
    if (validStructure.hasLetter && isLetter(code)) {
      validStructure.hasLetter_flag = true;
    }
    // проверка на whiteSymbols
    if (!((validStructure.eng_symbols_flag && isEngLetter(code))
        || (validStructure.rus_symbols_flag && isRusLetter(code))
        || (validStructure.numbers_flag && isNumber(code))
        || (validStructure.special_signs
            && validStructure.special_signs(code)))) {
      console.log(
        'is not whiteSymbol',
        char,
        code,
        (validStructure.eng_symbols_flag && isEngLetter(code)),
        (validStructure.rus_symbols_flag && isRusLetter(code)),
        (validStructure.numbers_flag && isNumber(code)),
        validStructure.special_signs,
        validStructure.special_signs(code)
      );
      return validStructure.whiteSymbolsError;
    }
  }

  if (validStructure.hasNumber && !validStructure.hasNumber_flag) {
    console.log('hasNumber', inputStr);
    return validStructure.hasNumber_error();
  }
  if (validStructure.hasLetter && !validStructure.hasLetter_flag) {
    console.log('hasLetter', inputStr);
    return validStructure.hasLetter_error();
  }

  return '';
}

function isAllowedSign(code) {
  return ((code >= ASCII.SPACE && code <= ASCII.TILDE)
      || (code >= ASCII.ENG_LOWER_A && code <= ASCII.ENG_LOWER_Z)
      || (code >= ASCII.ENG_UPPER_A && code <= ASCII.ENG_UPPER_Z)
      || (code >= UNICODE.RUS_UPPER_A && code <= UNICODE.RUS_LOWER_YA)
      || code === UNICODE.RUS_UPPER_E || code === UNICODE.RUS_LOWER_E);
}
/**
 * check for letter
 * @param {int} code - ASCII code of sign
 *
 * @returns {boolean} - response is sign is letter
 */
function isLetter(code) {
  return ((code >= ASCII.ENG_LOWER_A && code <= ASCII.ENG_LOWER_Z)
      || (code >= ASCII.ENG_UPPER_A && code <= ASCII.ENG_UPPER_Z)
      || (code >= UNICODE.RUS_UPPER_A && code <= UNICODE.RUS_LOWER_YA)
      || code === UNICODE.RUS_UPPER_E || code === UNICODE.RUS_LOWER_E);
}

function isEngLetter(code) {
  return ((code >= ASCII.ENG_LOWER_A && code <= ASCII.ENG_LOWER_Z)
      || (code >= ASCII.ENG_UPPER_A && code <= ASCII.ENG_UPPER_Z));
}

function isRusLetter(code) {
  return ((code >= UNICODE.RUS_UPPER_A && code <= UNICODE.RUS_LOWER_YA)
      || code === UNICODE.RUS_UPPER_E || code === UNICODE.RUS_LOWER_E);
}

function isNumber(code) {
  return (code >= ASCII.ZERO && code <= ASCII.NINE);
}

/**
 * check for special sign
 * @param {int} code - ASCII code of sign
 *
 * @returns {boolean} - response is sign is special sign
 */
export function isSpecialSign(code) {
  return (((code >= ASCII.SPACE && code <= ASCII.SLASH)
      || (code >= ASCII.COLON && code <= ASCII.AT))
      || ((code >= ASCII.RECTANGLE_BRACKET && code <= ASCII.BACK_QUOTE)
      || (code >= ASCII.FIGURED_BRACKET && code <= ASCII.TILDE)));
}

// в будущем требуется удалить
export function isWhiteSignWithRus(code) {
  return (code === ASCII.SPACE || code === ASCII.DASH || code === ASCII.POINT
      || (code >= ASCII.ZERO && code <= ASCII.NINE)
      || (code >= ASCII.ENG_UPPER_A && code <= ASCII.ENG_UPPER_Z)
      || (code >= ASCII.ENG_LOWER_A && code <= ASCII.ENG_LOWER_Z)
      || code === ASCII.UNDERSCORE || (code >= UNICODE.RUS_UPPER_A && code <= UNICODE.RUS_LOWER_YA)
      || code === UNICODE.RUS_UPPER_E || code === UNICODE.RUS_LOWER_E);
}

// в будущем требуется удалить
export function isWhiteSignWithEng(code) {
  return (code === ASCII.DASH || code === ASCII.POINT
      || (code >= ASCII.ZERO && code <= ASCII.NINE)
      || (code >= ASCII.ENG_UPPER_A && code <= ASCII.ENG_UPPER_Z)
      || (code >= ASCII.ENG_LOWER_A && code <= ASCII.ENG_LOWER_Z)
      || code === ASCII.UNDERSCORE);
}

export function isWhiteSignPassword(code) {
  return (code >= ASCII.SPACE && code <= ASCII.TILDE);
}

export function isWhiteSignLogin(code) {
  return (code === ASCII.DASH || code === ASCII.POINT || code === ASCII.UNDERSCORE);
}

export function isWhiteSignName(code) {
  return (code === ASCII.SPACE || code === ASCII.DASH
      || code === ASCII.POINT || code === ASCII.UNDERSCORE);
}

/**
 * validation of password input
 * @param {String} inputStr - injected password
 *
 * @returns {String} - validation error
 */
// в будущем удалить
export function isValidPassword(inputStr) {
  const flags = {
    hasBlackSign: {
      flag: true,
      error: 'Допустимы только латинские символы, цифры и символы-разделители',
    },
    hasMinLen: {
      flag: false,
      error: `Пароль должен содержать не менее ${LENGTH.MIN_PASSWORD} символов`,
    },
    hasMaxLen: {
      flag: false,
      error: 'Превышена максимальная длина пароля',
    },
    hasLetter: {
      flag: false,
      error: 'Пароль должен содержать хотя бы 1 букву',
    },
    hasNumber: {
      flag: false,
      error: 'Пароль должен содержать хотя бы 1 цифру',
    },
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
    if (!isWhiteSignPassword(code)) {
      return flags.hasBlackSign.error;
    }
    if (!isNaN(char)) {
      flags.hasNumber.flag = true;
    } else if (isEngLetter(code)) {
      flags.hasLetter.flag = true;
    } else if (!isWhiteSignPassword(code)) {
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
// в будущем удалить
export function isValidLogin(inputStr) {
  const flags = {
    hasBlackSign: {
      flag: false,
      error: 'Допустимы только латинские символы, цифры и символы-разделители',
    },
    hasMinLen: {
      flag: true,
      error: `Логин должен содержать не менее ${LENGTH.MIN_LOGIN} символов`,
    },
    hasMaxLen: {
      flag: true,
      error: `Логин должен содержать не более ${LENGTH.MAX_LOGIN} символов`,
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
    if (!(isWhiteSignWithEng(code))) {
      return flags.hasBlackSign.error;
    }
  }
  return '';
}

// в будущем удалить
export function isValidUsername(inputStr) {
  const flags = {
    hasBlackSign: {
      flag: false,
      error: 'Допустимы только символы кириллицы и латиницы, цифры и символы-разделители',
    },
    hasMinLen: {
      flag: false,
      error: 'Введите ваше имя',
    },
    hasMaxLen: {
      flag: false,
      error: 'Превышена максимальная длина имени',
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
    if (!isWhiteSignWithRus(code)) {
      return flags.hasBlackSign.error;
    }
  }
  return '';
}

// в будущем удалить
export function isValidCreatorName(inputStr) {
  const flags = {
    hasBlackSign: {
      flag: false,
      error: 'Допустимы только символы кириллицы и латиницы, цифры и символы-разделители',
    },
    hasMinLen: {
      flag: false,
      error: 'Введите название блога',
    },
    hasMaxLen: {
      flag: false,
      error: `Название блога не должно превышать ${LENGTH.MAX_CREATOR_NAME} символов`,
    },
  };
  if (!inputStr || inputStr.length < LENGTH.MIN_CREATOR_NAME) {
    return flags.hasMinLen.error;
  }
  if (inputStr.length > LENGTH.MAX_CREATOR_NAME) {
    return flags.hasMaxLen.error;
  }
  for (const char of inputStr) {
    const code = char.charCodeAt(0);
    if (!isWhiteSignWithRus(code)) {
      return flags.hasBlackSign.error;
    }
  }
  return '';
}

// в будущем удалить
export function isValidCreateDescription(inputStr) {
  const flags = {
    hasMaxLen: {
      flag: true,
      error: `Описание блога не должно превышать ${LENGTH.MAX_CREATOR_DESCRIPTION} символов`,
    },
  };
  if (inputStr.length > LENGTH.MAX_CREATOR_DESCRIPTION) {
    return flags.hasMaxLen.error;
  }
  return '';
}

// в будущем удалить
export function isValidMoneyString(inputStr) {
  const flags = {
    onlyNumber: {
      flag: true,
      error: 'В поле цель можно вводить только число',
    },
    hasMaxLen: {
      flag: true,
      error: 'Превышено максимальное значение цели',
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

// в будущем удалить
export function isValidDonate(inputStr, balance, moreThanTwoRub) {
  inputStr = inputStr.replace(/,/g, '.');
  const flags = {
    onlyNumber: {
      flag: true,
      error: 'В данное поле можно вводить только число',
    },
    hasMaxLen: {
      flag: true,
      error: 'Превышено максимальное значение суммы',
    },
    hasMoreThanBalance: {
      flag: true,
      error: 'Введённая сумма больше суммы на балансе'
    },
    hasMinDenomination: {
      flag: true,
      error: 'Сумма должна быть больше 2 рублей',
    },
    hasPositive: {
      flag: true,
      error: 'Сумма должна быть больше 0',
    }
  };
  if (isNaN(inputStr)) {
    return flags.onlyNumber.error;
  }

  if (balance === '' && Number(inputStr) > 10 ** LENGTH.MAX_MONEY) {
    return flags.hasMaxLen.error;
  }
  if (balance !== '' && Number(inputStr) > Number(balance)) {
    return flags.hasMoreThanBalance.error;
  }

  if (moreThanTwoRub) {
    if (Number(inputStr) <= 2) {
      return flags.hasMinDenomination.error;
    }
  } else if (Number(inputStr) <= 0) {
    return flags.hasPositive.error;
  }

  return '';
}

// в будущем удалить
export function isValidGetSum(inputStr, balance) {
  const flags = {
    onlyNumber: {
      flag: true,
      error: 'В поле сумма доната можно вводить только число',
    },
    hasMaxLen: {
      flag: true,
      error: 'Желаемая сумма вывода больше суммы на балансе',
    },
    hasPositive: {
      flag: true,
      error: 'Сумма вывода должна быть не менее 2 рублей',
    }
  };
  if (Number(inputStr) > balance) {
    return flags.hasMaxLen.error;
  }
  if (Number(inputStr) < 2) {
    return flags.hasPositive.error;
  }
  for (const char of inputStr) {
    if (isNaN(char)) {
      return flags.onlyNumber.error;
    }
  }
  return '';
}

// в будущем удалить
export function isValidDescriptionAim(inputStr) {
  const flags = {
    hasMaxLen: {
      flag: true,
      error: `Описание не должно превышать ${LENGTH.MAX_DESCRIPTION_AIM} символов`,
    },
  };
  if (inputStr.length > LENGTH.MAX_DESCRIPTION_AIM) {
    return flags.hasMaxLen.error;
  }
  return '';
}

// в будущем удалить
export function isValidTitlePost(inputStr) {
  const flags = {
    hasMaxLen: {
      flag: true,
      error: `Название поста не должно превышать ${LENGTH.MAX_TITLE_POST} символов`,
    },
  };
  if (inputStr.length > LENGTH.MAX_TITLE_POST) {
    return flags.hasMaxLen.error;
  }
  return '';
}

// в будущем удалить
export function isValidTextPost(inputStr) {
  const flags = {
    hasMaxLen: {
      flag: true,
      error: `Длина текста поста не должна превышать ${LENGTH.MAX_TEXT_POST} символов`,
    },
  };
  if (inputStr.length > LENGTH.MAX_TEXT_POST) {
    return flags.hasMaxLen.error;
  }
  return '';
}

// в будущем просто убрать export
export function isValidPhone(inputStr) {
  const flags = {
    onlyNumber: {
      flag: true,
      error: 'В поле номер телефона допустимы только цифры',
    },
    hasCorrectStart: {
      flag: true,
      error: 'Номер телефона должен начинаться с +7',
    },
    hasCorrectLen: {
      flag: true,
      error: 'Некорректная длина номера телефона',
    },
  };
  if (!inputStr.startsWith('+7')) {
    return flags.hasCorrectStart.error;
  }
  for (let i = 1; i < inputStr.length; ++i) {
    if (isNaN(inputStr[i])) {
      return flags.onlyNumber.error;
    }
  }
  if (inputStr.length !== 12) {
    return flags.hasCorrectLen.error;
  }
  return '';
}

// в будущем убрать export
export function isValidSelectedDate(input) {
  const flags = {
    hasCorrectYears: {
      flag: true,
      error: 'Начальный год больше конечного',
    },
    hasCorrectMonths: {
      flag: true,
      error: 'Начальный месяц дальше конечного',
    }
  };

  if (input.startYearSelected > input.endYearSelected) {
    return flags.hasCorrectYears.error;
  }
  if (input.startYearSelected === input.endYearSelected
      && input.startMonthSelected > input.endMonthSelected) {
    return flags.hasCorrectMonths.error;
  }

  return '';
}
