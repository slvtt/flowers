export const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: 'Введите корректный почтовый адрес'
};

export const imagePattern = {
  value: /.*\.(jpe?g|bmp|png|svg|webp)$/gim,
  message: 'Неккоректный формат изображения'
};

export const RU_PHONE_MASK = "+7 (999) 999-99-99";

export const phoneValidationPattern =
    /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
