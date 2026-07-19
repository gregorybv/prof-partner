export const SITE_URL = "https://prof-p.ru";

export const COMPANY = {
  name: "Профессиональный Партнёр",
  legalName: "ООО «Профессиональный Партнёр»",
  inn: "6952021534",
  ogrn: "1096952009483",
  registrationDate: "01.06.2009 г. (2006-2009 как ИП)",
  email: "zayavki@prof-p.ru",
  phoneTollFree: "8 (800) 600-45-80",
  phoneMoscow: "+7 (495) 363-73-80",
  address: "119017, Москва, Малая Ордынка 12, строение 3, офис 5",
  schedule: "Пн-Пт: с 8:00 до 19:00\nСб-Вс: выходной",
  copyright: "© 2006 - 2026гг. Все права защищены.",
  disclaimer:
    "Вся представленная на сайте информация не является публичной офертой.",
} as const;

export const NAV_ITEMS = [
  { label: "В начало", href: "#header" },
  { label: "СЕРТИФИКАТЫ ОТ БАНКОВ", href: "#sertifikaty" },
  { label: "О компании", href: "#ourTeam" },
  { label: "Отзывы", href: "#otzyvy" },
  { label: "ПОЧЕМУ БЕСПЛАТНО", href: "#price" },
  { label: "КАЛЬКУЛЯТОР ГАРАНТИИ", href: "#kalkulyator" },
  { label: "Контакты", href: "#footer" },
] as const;

export const HERO_STATS = [
  { value: 380_000, label: "гарантий согласовали" },
  { value: 165, label: "городов клиентов" },
  { value: 52_436, label: "довольных клиентов" },
] as const;

export const HERO_FEATURES = [
  { title: "Оформление", description: "Без похода в банк" },
  { title: "Одобрение", description: "Без открытия р/с" },
  { title: "Обеспечение", description: "Без залога и поруч-ва" },
  { title: "Выдача", description: "за 1 рабочий день" },
  { title: "Лимит и ставка", description: "до 3 млрд ₽ и от 1,34%" },
  { title: "География", description: "Все регионы РФ" },
] as const;

export const GUARANTEE_TYPES = [
  {
    id: "44-fz",
    title: "44-ФЗ",
    items: [
      "участия в тендере",
      "исполнения контракта",
      "гарантийных обязательств",
      "возврата аванса",
    ],
  },
  {
    id: "223-fz",
    title: "223-ФЗ",
    items: [
      "участия в тендере",
      "исполнения контракта",
      "гарантийных обязательств",
      "возврата аванса",
    ],
  },
  {
    id: "185-fz",
    title: "185-ФЗ / 615-ПП",
    items: ["исполнения контракта", "гарантийных обязательств"],
  },
  {
    id: "commercial",
    title: "Коммерция",
    items: [
      "участия в тендере",
      "исполнения контракта",
      "гарантийных обязательств",
      "возврата аванса",
    ],
  },
] as const;

export const TEAM_MEMBERS = [
  {
    name: "Некрасов Владимир",
    role: "Генеральный директор",
    image: "/prof-p/sotrudniki_1.png",
  },
  {
    name: "Финогенова Мария",
    role: "Заместитель руководителя подразделения",
    image: "/prof-p/sotrudniki_5.png",
  },
  {
    name: "Антонова Ольга",
    role: "Куратор по работе с банками",
    image: "/prof-p/sotrudniki_4.png",
  },
  {
    name: "Виноградова Дарья",
    role: "Руководитель направления контрактного кредитования",
    image: "/prof-p/sotrudniki_6.png",
  },
  {
    name: "Иванова Екатерина",
    role: "Специалист по работе с ключевыми клиентами",
    image: "/prof-p/sotrudniki_2.png",
  },
  {
    name: "Масленникова Виктория",
    role: "Специалист по работе с ключевыми клиентами",
    image: "/prof-p/sotrudniki_3.png",
  },
  {
    name: "Коробцов Артур",
    role: "Руководитель подразделения",
    image: "/prof-p/sotrudniki_7.png",
  },
] as const;

export const TEAM_STATS = [
  { prefix: "Больше", value: 90, suffix: "", label: "сотрудников" },
  { prefix: "Свыше", value: 20, suffix: "", label: "лет на рынке" },
  { prefix: "Более", value: 70, suffix: "", label: "банков-партнёров" },
] as const;

export const SERVICES = [
  {
    title: "Независимая гарантия",
    description:
      "Это выдаваемое банком по просьбе другого лица безотзывное обязательство уплатить третьему лицу определенную денежную сумму в соответствии с условиями гарантии.",
  },
  {
    title: "Тендерное сопровождение",
    description:
      "Необходимая документация, ЭЦП, обеспечение заявки и контракта",
  },
  {
    title: "Тендерный займ на обеспечение заявки",
    description:
      "Целевой заём юридического лица для участия компании в торгах",
  },
  {
    title: "Гарантийное обязательство",
    description:
      "Денежные средства или БГ для обеспечения гарантии качества товара",
  },
  {
    title: "Кредит на исполнение контракта",
    description: "Целевой кредит банка под исполнение условий контракта",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Анализ Вашей компании",
    titleLines: ["Анализ", "Вашей компании"],
    durationValue: "10",
    durationUnit: "мин",
  },
  {
    step: 2,
    title: "Подбор банков",
    titleLines: ["Подбор", "банков"],
    durationValue: "5",
    durationUnit: "мин",
  },
  {
    step: 3,
    title: "Подача заявки в банк",
    titleLines: ["Подача заявки", "в банк"],
    durationValue: "20",
    durationUnit: "мин",
  },
  {
    step: 4,
    title: "Получение одобрения",
    titleLines: ["Получение", "одобрения"],
    durationValue: "30",
    durationUnit: "мин",
  },
  {
    step: 5,
    title: "Согласование проекта БГ",
    titleLines: ["Согласование", "проекта БГ"],
    durationValue: "55",
    durationUnit: "мин",
  },
  {
    step: 6,
    title: "Оплата банку напрямую",
    titleLines: ["Оплата банку", "напрямую"],
    durationValue: "30",
    durationUnit: "мин",
  },
  {
    step: 7,
    title: "Выпуск и получение БГ",
    titleLines: ["Выпуск", "и получение БГ"],
    durationValue: "30",
    durationUnit: "мин",
  },
] as const;

export const ADVANTAGES = [
  {
    title: "Более 20 лет на рынке",
    description: "За это время мы выдали более 380 000 гарантий",
  },
  {
    title: "Дешевле, чем в банке",
    description: "Специально для нас банки снизили цены",
  },
  {
    title: "Максимальная скидка",
    description: "Мы боремся за своих клиентов, предложим лучшую цену",
  },
  {
    title: "Оформим онлайн",
    description: "Пришлите все документы и мы свяжемся с Вами",
  },
  {
    title: "Широкий спектр банков",
    description: "У нас есть банки из списка Вашего заказчика",
  },
  {
    title: "Комплексный подход",
    description: "Оформляем КИК, факторинг, страхование",
  },
  {
    title: "Работаем по всей России",
    description:
      "Предоставляем услуги в каждом регионе в электронном формате",
  },
  {
    title: "Лёгкая доставка",
    description: "Доставим любым удобным для Вас способом",
  },
  {
    title: "Поможем с документами",
    description: "Вам отказал банк - мы решим эту проблему",
  },
  {
    title: "Решение за 3 часа",
    description: "Экономьте свое время, работая с нами",
  },
] as const;

export const REGIONS = [
  { city: "Москва", count: 21_000 },
  { city: "Санкт-Петербург", count: 14_000 },
  { city: "Екатеринбург", count: 3_000 },
  { city: "Сочи", count: 2_000 },
  { city: "Новосибирск", count: 2_000 },
  { city: "Красноярск", count: 1_000 },
  { city: "Ростов-на-Дону", count: 1_000 },
] as const;

export const YEARLY_STATS = [
  { year: 2018, count: 8_323 },
  { year: 2019, count: 12_497 },
  { year: 2020, count: 23_423 },
  { year: 2021, count: 24_197 },
  { year: 2022, count: 26_152 },
  { year: 2023, count: 38_263 },
  { year: 2024, count: 51_724 },
  { year: 2025, count: 56_162 },
] as const;

export const COMPLEX_CASES = [
  "Хотите получить лучшую цену на рынке",
  "Нет опыта исполнения госзаказа",
  "Вашей организации менее 3-х месяцев",
  "Нужна коммерческая БГ",
  "Получили отказы в нескольких банках",
  "Требуется переобеспечение",
  "Требуется гарантия по форме заказчика",
  "Учредитель/ директор не резидент",
  "У Вашей компании арбитражи",
  "Заблокирован счёт организации",
] as const;

export const PRICING_TABLE = [
  {
    title: "Любые консультации по банковским гарантиям",
    description:
      "Все типы консультаций по оформлению банковских гарантий, в том числе по самостоятельному оформлению без помощи брокеров.",
    price: "БЕСПЛАТНО",
  },
  {
    title: "Анализ экономического состояния",
    description:
      "Проанализируем экономическое состояние вашей компании и предоставим наши рекомендации.",
    price: "БЕСПЛАТНО",
  },
  {
    title: "Подбор лучших тарифов среди более 70 банков",
    description:
      "С помощью нашей скоринговой системы за считанные минуты подберём лучшие тарифы среди наших банков-партнёров с учётом Ваших параметров сделки, стоп-факторов и вероятности одобрения.",
    price: "БЕСПЛАТНО",
  },
  {
    title: "Заведение заявок в подходящие банки",
    description:
      "Благодаря прямой интеграции с банками-партнёрами единовременно отправим заявки в подходящие банки и получим быстрый ответ.",
    price: "БЕСПЛАТНО",
  },
  {
    title: "Согласование правок в проекте банковской гарантии",
    description:
      "При необходимости согласуем правки с заказчиком, в том числе проведём согласование самостоятельно от Вашего имени.",
    price: "БЕСПЛАТНО",
  },
  {
    title: "Комиссия за выдачу независимой гарантии (ФЗ-44, ФЗ-223, ФЗ-185)",
    description:
      "Перевод средств с расчётного счёта Вашей компании в банк напрямую, согласно тарифу для Вашей банковской гарантии. Без каких-либо оплат нам, как Вашему брокеру, ибо мы выступаем для Вас в качестве бесплатного партнёра банка.",
    price: "БЕСПЛАТНО",
    note: "Вы нам ничего не платите, оплата идёт напрямую в банк по согласованой нами для Вас в нашем банке-партнёре цене.",
  },
  {
    title: "Комиссия за выдачу Н.Гарантии (Коммерческие контракты)",
    description:
      "Перевод средств с расчётного счёта Вашей компании в банк напрямую, согласно тарифу для Вашей банковской гарантии. Без каких-либо оплат нам, как Вашему брокеру, ибо мы выступаем для Вас в качестве бесплатного партнёра банка.",
    price: "БЕСПЛАТНО",
    note: "Вы нам ничего не платите, оплата идёт напрямую в банк по согласованой нами для Вас в нашем банке-партнёре цене.",
  },
] as const;

export const VALUE_PROPS = [
  {
    title: "Дешевле",
    description:
      "Многолетнее сотрудничество и внушительный объём выпускаемых БГ позволяют получать персональные скидки для клиентов",
  },
  {
    title: "Быстрее",
    description:
      "Система интеграции с банками позволяет нам отправлять заявки сразу после согласования, минуя менеджера банка",
  },
  {
    title: "Результативнее",
    description:
      "Проведя анализ, мы отсекаем банки, которые заведомо откажут клиенту. Так мы экономим время перспективных клиентов",
  },
] as const;

export const YANDEX_REVIEWS = {
  rating: 5.0,
  reviewsCount: 252,
  ratingsCount: 302,
  url: "https://yandex.ru/maps/org/professionalny_partnyor/34851889733/reviews/",
  addReviewUrl:
    "https://yandex.ru/maps/org/professionalny_partnyor/34851889733/reviews/?add-review=true",
} as const;

export const LEGAL_LINKS = {
  privacy: "/politika-konfidencialnosti",
  consent: "/soglasie-na-obrabotku-personalnyh-dannyh",
} as const;

export const YANDEX_MAP = {
  apiKey: "52c58a1c-d593-4777-8cd6-faa4ca7ad4fd",
  coords: [55.7417, 37.6234] as [number, number],
} as const;

export const CERTIFICATES = [
  { bank: "СберБанк", thumb: "/prof-p/cert2.png", full: "/prof-p/cert-2.jpg" },
  { bank: "Альфа-Банк", thumb: "/prof-p/cert-alfa-mini.jpg", full: "/prof-p/cert-alfa.jpg" },
  { bank: "Модульбанк", thumb: "/prof-p/cert7.png", full: "/prof-p/cert-7.jpg" },
  { bank: "Металлинвестбанк", thumb: "/prof-p/cert3.png", full: "/prof-p/cert-3.jpg" },
  { bank: "Локобанк", thumb: "/prof-p/cert6.png", full: "/prof-p/cert-6.jpg" },
  { bank: "Кубань Кредит", thumb: "/prof-p/certkk.jpg", full: "/prof-p/cert-kk.jpg" },
  { bank: "Держава", thumb: "/prof-p/cert9.png", full: "/prof-p/cert-9.jpg" },
  { bank: "Банк СОЮЗ", thumb: "/prof-p/cert-souz-mini.jpg", full: "/prof-p/cert-souz.jpg" },
  { bank: "Зенит", thumb: "/prof-p/cert8.png", full: "/prof-p/cert-8.jpg" },
  { bank: "Совкомбанк", thumb: "/prof-p/sovkom.jpg", full: "/prof-p/sovkom.jpg" },
  { bank: "Cовкомбанк", thumb: "/prof-p/blag-sovkom-mini.jpg", full: "/prof-p/blag-sovkom.png" },
  { bank: "Альфа-Банк", thumb: "/prof-p/blag-alfa-mini.jpg", full: "/prof-p/blag-alfa.png" },
  { bank: "Абсолют Банк", thumb: "/prof-p/1-abs.png", full: "/prof-p/1-abs-full.png" },
  { bank: "Банк-Союз", thumb: "/prof-p/blag-souz-mini.jpg", full: "/prof-p/blag-souz.png" },
  { bank: "Тендертех", thumb: "/prof-p/blag-tenderteh-mini.jpg", full: "/prof-p/blag-tenderteh.png" },
  { bank: "Альфа-банк", thumb: "/prof-p/1-alfa.png", full: "/prof-p/1-alfa-full.png" },
  { bank: "Совкомбанк", thumb: "/prof-p/blag-sovkom2-mini.jpg", full: "/prof-p/blag-sovkom2.png" },
] as const;

export const AUTO_SELECT_DISCLAIMER =
  "Согласуем для Вас нашу цену в любом из этих банков. Оплата напрямую в банк. Наша комиссия 0%. Вы нам ничего не платите." as const;

export const CONSENT_TEXT =
  "Оставляя отметку, я даю согласие на обработку моих персональных данных на условиях Политики конфиденциальности сайта." as const;

export const TENDER_SUPPORT = {
  title: "Тендерное сопровождение под ключ",
  subtitle: "Все виды работ по тендерному сопровождению",
  description:
    "Тендер — это не только банковская гарантия. Это правильный анализ документации, регистрация на электронных торговых площадках, настройка рабочего места, формирование пакета документов для подачи заявки, оспаривание решений и подача жалоб в ФАС.",
  description2:
    "Наши тендерные специалисты готовы предоставить Вам полный комплекс услуг от подачи заявки до электронного актирования! Наш юрист поможет Вам в проверке договора и урегулировании претензий от Заказчика!",
  cta: "Мы возьмем на себя всю эту работу,\na Вам останется только исполнить контракт!",
  steps: [
    "Анализ документации",
    "Регистрация на ЭТП",
    "Настройка рабочего места",
    "Формирование пакета документов",
    "Оспаривание решений и жалобы в ФАС",
    "Электронное актирование",
    "Проверка договора юристом",
  ],
} as const;

export const TENDER_PLATFORMS = [
  { name: "Сбербанк-АСТ", image: "/prof-p/1_tender.png" },
  { name: "РТС-Тендер", image: "/prof-p/2_tender.png" },
  { name: "Росэлторг", image: "/prof-p/3_tender.png" },
  { name: "Фабрикант", image: "/prof-p/4_tender.png" },
  { name: "Заказ РФ", image: "/prof-p/5_tender.png" },
  { name: "РАД", image: "/prof-p/6_tender.png" },
  { name: "ТЭК-Торг", image: "/prof-p/7_tender.png" },
] as const;

export const TESTIMONIALS = [
  { thumb: "/prof-p/small/review2.png", full: "/prof-p/alfaspa-med.png", alt: "review" },
  { thumb: "/prof-p/small/review1.png", full: "/prof-p/review1.png", alt: "review" },
  { thumb: "/prof-p/small/review3.png", full: "/prof-p/bestway.png", alt: "review" },
  { thumb: "/prof-p/small/review4.png", full: "/prof-p/review3.png", alt: "review" },
  { thumb: "/prof-p/small/review5.png", full: "/prof-p/zip.png", alt: "review" },
  { thumb: "/prof-p/small/review2.png", full: "/prof-p/review4.png", alt: "review" },
  { thumb: "/prof-p/small/review1.png", full: "/prof-p/amber-medical.png", alt: "review" },
  { thumb: "/prof-p/small/review3.png", full: "/prof-p/review5.png", alt: "review" },
  { thumb: "/prof-p/small/review4.png", full: "/prof-p/am-lift.png", alt: "review" },
  { thumb: "/prof-p/small/review5.png", full: "/prof-p/aspramed.png", alt: "review" },
  { thumb: "/prof-p/small/review2.png", full: "/prof-p/building-constuction.png", alt: "review" },
  { thumb: "/prof-p/small/review1.png", full: "/prof-p/complect-work.png", alt: "review" },
  { thumb: "/prof-p/small/review3.png", full: "/prof-p/fasadstroy.png", alt: "review" },
  { thumb: "/prof-p/small/review4.png", full: "/prof-p/IP-Arazumyan.png", alt: "review" },
  { thumb: "/prof-p/small/review5.png", full: "/prof-p/IP-Melnikov.png", alt: "review" },
  { thumb: "/prof-p/small/review2.png", full: "/prof-p/Keks.png", alt: "review" },
  { thumb: "/prof-p/small/review1.png", full: "/prof-p/luch.png", alt: "review" },
  { thumb: "/prof-p/small/review3.png", full: "/prof-p/Monolith.png", alt: "review" },
  { thumb: "/prof-p/small/review4.png", full: "/prof-p/next.png", alt: "review" },
  { thumb: "/prof-p/small/review5.png", full: "/prof-p/rion.png", alt: "review" },
  { thumb: "/prof-p/small/review2.png", full: "/prof-p/review2.png", alt: "review" },
] as const;

export const WHY_FREE_WITH_US = [
  { amount: "100 000 ₽", label: "Цена гарантии по тарифу банка" },
  { amount: "75 000 ₽", label: "Мы согласовываем для Вас нашу цену" },
  { amount: "75 000 ₽", label: "Вы платите новую цену банку напрямую" },
  { amount: "25 000 ₽", label: "Вы сэкономили благодаря нам" },
  { amount: "3 000 ₽", label: "Агентских заплатит нам банк-партнёр" },
] as const;

export const WHY_FREE_WITHOUT_US = [
  { amount: "100 000 ₽", label: "Цена гарантии по тарифу банка" },
  { amount: "100 000 ₽", label: "Цена банка после автоматического одобрения" },
  { amount: "100 000 ₽", label: "Вы оплачиваете гарантию без возможности изменить стоимость" },
  { amount: "0 ₽", label: "Вы сэкономили, оформив напрямую" },
  { amount: "0 ₽", label: "Агентских заплатит нам банк-партнёр" },
] as const;

export const WHY_FREE_SUMMARY = {
  withUs: [
    { label: "Вы заплатили банку", amount: "75 000 ₽" },
    { label: "Вы сэкономили", amount: "25 000 ₽", accent: "success" },
    { label: "Банк заплатил нам", amount: "3 000 ₽" },
    { label: "Банк заработал", amount: "72 000 ₽" },
  ],
  withoutUs: [
    { label: "Вы заплатили банку", amount: "100 000 ₽" },
    { label: "Вы сэкономили", amount: "0 ₽", accent: "error", starred: true },
    { label: "Банк заплатил нам", amount: "0 ₽" },
    { label: "Банк заработал", amount: "100 000 ₽" },
  ],
  footnote:
    "При Вашем прямом обращении в банки, все расчёты производятся автоматически в рамках экспресс-гарантий и скидка в таком случае не предусмотрена. После 50-250 млн (зависит от тарифов банков), при индивидуальном рассмотрении они возможны. Но как правило небольшие и при выполнении списка условий по другим продуктам банка.",
  example:
    "На примере гарантии, стоимость которой 100 000 рублей (комиссия банка за выдачу гарантии)",
} as const;

export const PROCESS_FOOTNOTE =
  "Время на каждом этапе рассчитано с учётом применения нашей скоринговой системы, а также программной интеграции с банками-партнёрами для получения быстрого одобрения и оформления гарантий." as const;

export const PROCESS_GUARANTEE_NOTE =
  "Выдадим гарантию за 45 минут при соблюдении всех условий и требований." as const;
