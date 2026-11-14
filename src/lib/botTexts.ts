// Every message the Telegram bot sends, in one place, so the wording can be edited without touching the logic.
// The prices and the offer names repeat what Pricing.tsx and the guide page say: change them together.

// The guide goes out as a PDF file: the site doesn't open from Russia, so no message links to it.
// Telegram's servers download the file from this address once and then reuse their own copy.
export const GUIDE_FILE_URL = process.env.GUIDE_FILE_URL || 'https://www.zaprethistory.ru/guide/Zapretnaya_Istoriya_gaid.pdf';
export const CONTACT_URL = 'https://t.me/inevitable_ravage';

export const WELCOME =
    'Привет! Бесплатный гайд уже ждёт тебя здесь.\n\n' +
    'Подпишись на мой Telegram-канал «Запретная История», а потом нажми «Проверить подписку». Сразу после этого пришлю файл сюда в чат.';

export const NOT_SUBSCRIBED =
    'Пока не вижу подписку. Подпишись на канал и нажми «Проверить подписку» ещё раз.';

export const GUIDE_SENT =
    'Готово, держи гайд! Внутри весь путь ролика по шагам и цифры моего канала.\n\n' +
    'Если захочешь собирать такие ролики сам, в конце гайда есть подробности о курсе.';

export const STOPPED = 'Хорошо, больше писать не буду.';

const STOP_LINE = '\n\nЕсли не хочешь получать сообщения, отправь /stop';

// Sent once to someone who pressed Start but never passed the subscription check.
export const REMINDER =
    'Гайд всё ещё ждёт тебя здесь.\n\n' +
    'Подпишись на канал и нажми «Проверить подписку», чтобы забрать файл.';

export type FollowUp = { key: string; afterHours: number; text: string; button?: { text: string; url: string } };

// The follow-ups after the guide, in order. `afterHours` counts from the moment the guide was sent. The job
// runs once a day, so each threshold sits a few hours under the round number of days (18 h = "the next day").
export const FOLLOW_UPS: FollowUp[] = [
    {
        key: '1',
        afterHours: 18,
        text:
            'Успел посмотреть гайд?\n\n' +
            'Если ещё нет, начни со второго раздела, «Путь одного кадра»: там видно, как строчка сценария превращается в готовую сцену. Читается за пару минут.\n\n' +
            'Если появятся вопросы, пиши мне в личку: @inevitable_ravage. Отвечаю сам.' +
            STOP_LINE,
    },
    {
        key: '2',
        afterHours: 66,
        text:
            'Главный вопрос после гайда: сколько всё это стоит.\n\n' +
            'Обычно на сервисы для таких роликов уходит больше 100 долларов в месяц. У меня выходит в разы дешевле.\n\n' +
            'Какие сервисы брать и как оплатить их из России и СНГ, я собрал в «Дешёвом старте». Он стоит 990 ₽, и если потом возьмёшь курс, эти 990 ₽ зачту в его цену.' +
            STOP_LINE,
        button: { text: 'Написать мне', url: CONTACT_URL },
    },
    {
        key: '3',
        afterHours: 162,
        text:
            'Это последнее сообщение от меня, больше беспокоить не буду.\n\n' +
            'В гайде я разобрал, как устроен ролик. На курсе «ИИ-режиссёр» учу собирать такие ролики самому: весь путь ролика от сервисов до публикации, мои промпты и настройки.\n\n' +
            'Тариф Базовый стоит 3 990 ₽. В Личном за 6 990 ₽ я проверяю твою карту стиля и кадры до анимации, а потом разбираю три готовых ролика.\n\n' +
            'Вопросы и оплата: @inevitable_ravage',
        button: { text: 'Написать мне', url: CONTACT_URL },
    },
];
