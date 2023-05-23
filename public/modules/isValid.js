const LENGTH = {
  MIN_LOGIN: 7,
  MAX_LOGIN: 20,

  MIN_PASSWORD: 7,
  MAX_PASSWORD: 20,

  MIN_USERNAME: 1,
  MAX_USERNAME: 20,

  MIN_CREATOR_NAME: 1,
  MAX_CREATOR_NAME: 40,

  MIN_CREATOR_DESCRIPTION: 1,
  MAX_CREATOR_DESCRIPTION: 250,

  MAX_MONEY: 9,
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
  UNDERLINING: 95,
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

/**
 * check for letter
 * @param {int} code - ASCII code of sign
 *
 * @returns {boolean} - response is sign is letter
 */
function isLetter(code) {
  return ((code >= ASCII.ENG_LOWER_A && code <= ASCII.ENG_LOWER_Z)
      || (code >= ASCII.ENG_UPPER_A && code <= ASCII.ENG_UPPER_Z));
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
function isWhiteSignWithRus(code) {
  return (code === ASCII.SPACE || code === ASCII.DASH || code === ASCII.POINT
      || (code >= ASCII.ZERO && code <= ASCII.NINE)
      || (code >= ASCII.ENG_UPPER_A && code <= ASCII.ENG_UPPER_Z)
      || (code >= ASCII.ENG_LOWER_A && code <= ASCII.ENG_LOWER_Z)
      || code === ASCII.UNDERLINING || (code >= UNICODE.RUS_UPPER_A && code <= UNICODE.RUS_LOWER_YA)
      || code === UNICODE.RUS_UPPER_E || code === UNICODE.RUS_LOWER_E);
}

function isWhiteSign(code) {
  return (code === ASCII.SPACE || code === ASCII.DASH || code === ASCII.POINT
      || (code >= ASCII.ZERO && code <= ASCII.NINE)
      || (code >= ASCII.ENG_UPPER_A && code <= ASCII.ENG_UPPER_Z)
      || (code >= ASCII.ENG_LOWER_A && code <= ASCII.ENG_LOWER_Z)
      || code === ASCII.UNDERLINING);
}

function isWhiteSignPassword(code) {
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
    } else if (isLetter(code)) {
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
      error: 'Превышена максимальная длина логина',
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
    if (!(isWhiteSign(code))) {
      return flags.hasBlackSign.error;
    }
  }
  return '';
}

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

export function isValidDonate(inputStr) {
  const flags = {
    onlyNumber: {
      flag: true,
      error: 'В поле сумма доната можно вводить только число',
    },
    hasMaxLen: {
      flag: true,
      error: 'Превышено максимальное значение суммы доната',
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
      error: `Описание не должно превышать ${LENGTH.MAX_DESCRIPTION_AIM} символов`,
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
      error: `Название поста не должно превышать ${LENGTH.MAX_TITLE_POST} символов`,
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
      error: `Длина текста поста не должна превышать ${LENGTH.MAX_TEXT_POST} символов`,
    },
  };
  if (inputStr.length > LENGTH.MAX_TEXT_POST) {
    return flags.hasMaxLen.error;
  }
  return '';
}

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

export function isValidSelectedDate(input) {
  const flags = {
    hasCorrectYears: {
      flag: true,
      error: 'Начальный год больше конечного',
    },
    hasCorrectMonths: {
      flag: true,
      error: 'Начальный месяц дальше конечного',
    },
    hasCorrectCurrentMonth: {
      flag: true,
      error: 'В качестве конечного месяца выбран будущий',
    },
  };

  if (input.startYearSelected > input.endYearSelected) {
    return flags.hasCorrectYears.error;
  }
  if (input.startYearSelected === input.endYearSelected
      && input.startMonthSelected > input.endMonthSelected) {
    return flags.hasCorrectMonths.error;
  }
  if (input.endYearSelected === input.currentYear
      && input.endMonthSelected > input.currentMonth) {
    return flags.hasCorrectCurrentMonth.error;
  }
  return '';
}
