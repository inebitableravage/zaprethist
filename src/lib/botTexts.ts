// Every message the Telegram bot sends, in one place, so the wording can be edited without touching the logic.
// The prices and the offer names repeat what Pricing.tsx and the guide page say: change them together.

export const GUIDE_URL = process.env.GUIDE_URL || 'https://zaprethistory.ru/guide';
export const PRICING_URL = 'https://zaprethistory.ru/#pricing';

export const WELCOME =
    'Привет! Гайд уже готов к отправке.\n\n' +
    'Чтобы его забрать, нужно сделать один простой шаг: подпишись на мой основной канал «Запретная история».\n\n' +
    'Как подпишешься, нажимай «Проверить подписку», и бот сразу пришлёт гайд.';

export const NOT_SUBSCRIBED =
    'Бот пока не видит подписку. Сначала подпишись на канал, а затем нажми кнопку проверки еще раз.';

export const GUIDE_SENT =
    'Готово, держи гайд! Внутри весь путь ролика по шагам и настоящие цифры.\n\n' +
    'Если после прочтения захочешь делать такие же ролики сам, в конце гайда есть вся информация по курсу.';

export const STOPPED = 'Хорошо, больше писать не буду.';

const STOP_LINE = '\n\nЕсли не хочешь получать сообщения, отправь /stop';

// Sent once to someone who pressed Start but never passed the subscription check.
export const REMINDER =
    'Гайд так и ждёт тебя здесь.\n\n' +
    'Остался один шаг: подпишись на канал, нажми «Проверить подписку», и бот сразу его пришлёт.';

export type FollowUp = { key: string; afterHours: number; text: string; button: { text: string; url: string } };

// The follow-ups after the guide, in order. `afterHours` counts from the moment the guide was sent. The job
// runs once a day, so each threshold sits a few hours under the round number of days (18 h = "the next day").
export const FOLLOW_UPS: FollowUp[] = [
    {
        key: '1',
        afterHours: 18,
        text:
            'Ну как, успел открыть гайд?\n\n' +
            'Если ещё нет, начни с пути ролика: там один кадр проходит всю дорогу от строчки сценария до готовой сцены. На это хватит пары минут.\n\n' +
            'Если по ходу появятся вопросы, пиши мне лично: @inevitable_ravage. Отвечаю сам.' +
            STOP_LINE,
        button: { text: 'Открыть гайд', url: GUIDE_URL },
    },
    {
        key: '2',
        afterHours: 66,
        text:
            'Главный вопрос после гайда: сколько всё это стоит.\n\n' +
            'Обычно на сервисы для таких роликов уходит больше 100 долларов в месяц. У меня выходит в разы дешевле.\n\n' +
            'Какие сервисы брать и как оплатить их из России и СНГ, я собрал в «Дешёвом старте». Он стоит 990 ₽, и если потом возьмёшь курс, эти 990 ₽ зачту в его цену.' +
            STOP_LINE,
        button: { text: 'Дешёвый старт', url: PRICING_URL },
    },
    {
        key: '3',
        afterHours: 162,
        text:
            'Это последнее сообщение от меня, дальше писать не буду.\n\n' +
            'Гайд показал, что происходит с роликом. Как сделать это самому, я показываю в курсе «ИИ-режиссёр»: шесть модулей, от сервисов до публикации, все промпты и настройки на экране. К концу у тебя готовый ролик примерно на минуту.\n\n' +
            'Базовый стоит 3 990 ₽. В Личном за 6 990 ₽ я сам смотрю твою карту стиля и кадры и разбираю три твоих готовых ролика.\n\n' +
            'Вопросы и оплата: @inevitable_ravage',
        button: { text: 'Программа и тарифы', url: PRICING_URL },
    },
];
