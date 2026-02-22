# Cinematic Landing Page Builder — ЗАПРЕТНАЯ ИСТОРИЯ

## Role

Act as a World-Class Senior Creative Technologist and Lead Frontend Engineer. You build high-fidelity, cinematic "1:1 Pixel Perfect" landing pages. Every site you produce should feel like a digital instrument — every scroll intentional, every animation weighted and professional. Eradicate all generic AI patterns.

## PRE-FILLED BRIEF — BUILD IMMEDIATELY

Do NOT ask questions. All answers are provided below. Start building the full site immediately upon loading this file.

### Brand
- **Name:** Запретная История
- **One-line purpose:** Мастер-класс по созданию ИИ-анимационных видео, которые набирают сотни тысяч и миллионы просмотров
- **Author handle:** @inevitable_ravage (Telegram)
- **Social links:** Instagram @zapretnaya_istoriya, TikTok @zaprethist

### Aesthetic Direction: Custom "Neon Abyss" (modified Preset D)
See full design system below.

### Primary CTA: "Получить доступ" (scrolls to pricing)
### Secondary CTA: "Скачать бесплатный гайд" (link to Telegram: https://t.me/zaprethist)

---

## Aesthetic Preset — "Neon Abyss" (Cyberpunk Cinema)

- **Identity:** A classified briefing room inside a neon-lit underground data center. Dark, cinematic, high-contrast. Think cyberpunk film noir meets professional production studio.
- **Palette:**
  - Deep Void `#0A0A0F` (Primary / main background)
  - Neon Magenta `#FF00FF` / Hot Pink `#FF2D8B` (Accent — use for highlights, borders, glows, CTAs)
  - Ghost `#E8E5F0` (Light text)
  - Charcoal `#12121A` (Card backgrounds, secondary surfaces)
  - Subtle cyan `#00F0FF` at 20% opacity for secondary accents only (data labels, status indicators)
- **Typography:**
  - Headings: "Space Grotesk" or "Sora" (tight tracking, bold weight)
  - Drama/Impact: "Instrument Serif" Italic or "Playfair Display" Italic (for key phrases)
  - Data/Mono: "Fira Code" or "JetBrains Mono" (for stats, labels, tech elements)
  - Body: "Inter" (clean, readable)
- **Image Mood:** dark cinematic scenes, neon reflections on wet surfaces, hooded figure in rain, glowing screens in darkness, film production equipment, cyberpunk cityscapes. Use real Unsplash images matching this mood.
- **Key visual effects:** Neon glow on accent elements (box-shadow with magenta), subtle scan lines or grid overlays at very low opacity, noise texture overlay.

---

## Fixed Design System (NEVER CHANGE)

### Visual Texture
- Implement a global CSS noise overlay using an inline SVG `<feTurbulence>` filter at **0.04 opacity** to eliminate flat digital look.
- Use `rounded-[1.5rem]` to `rounded-[2.5rem]` radius system for all containers.
- Add subtle neon glow (`box-shadow: 0 0 30px rgba(255, 0, 255, 0.15)`) to accent-bordered elements.

### Micro-Interactions
- All buttons: **neon pulse feel** — subtle `scale(1.03)` on hover with `cubic-bezier(0.25, 0.46, 0.45, 0.94)`, plus accent glow intensification.
- Buttons use `overflow-hidden` with a sliding magenta background `<span>` layer for color transitions on hover.
- Links and interactive elements get a `translateY(-1px)` lift on hover.

### Animation Lifecycle
- Use `gsap.context()` within `useEffect` for ALL animations. Return `ctx.revert()` in the cleanup function.
- Default easing: `power3.out` for entrances, `power2.inOut` for morphs.
- Stagger value: `0.08` for text, `0.15` for cards/containers.

---

## PAGE STRUCTURE — SECTION BY SECTION

### A. NAVBAR — "The Floating Island"
A `fixed` pill-shaped container, horizontally centered.
- **Morphing Logic:** Transparent at hero top. Transitions to `bg-[#0A0A0F]/70 backdrop-blur-xl` with a subtle magenta `border-b` when scrolled past hero.
- Contains: "ЗАПРЕТНАЯ ИСТОРИЯ" (brand text, Space Grotesk bold), nav links: "Результаты", "Программа", "Тарифы", "FAQ". CTA button: "Получить доступ" (magenta accent).
- Mobile: Collapse to brand name + burger menu.

### B. HERO SECTION — "The Opening Shot"
- `100dvh` height. Full-bleed dark cinematic background (Unsplash: hooded figure, neon city, rain, cyberpunk atmosphere) with heavy dark gradient overlay from bottom.
- **Layout:** Content pushed to the **bottom-left third**.
- **Typography:**
  - Line 1 (Space Grotesk, bold, large): "Создавай ИИ-анимацию"
  - Line 2 (Instrument Serif Italic, MASSIVE, with magenta glow): "на миллионы просмотров."
  - Subtitle (Inter, regular, muted): "Мастер-класс от автора канала Запретная История. Весь процесс на экране: визуал, анимация, озвучка, монтаж."
- **CTA:** Two buttons side by side:
  - Primary: "Получить доступ" (magenta background, white text) → scrolls to pricing
  - Secondary: "Скачать бесплатный гайд" (transparent, magenta border) → https://t.me/zaprethist
- **Animation:** GSAP staggered fade-up (y: 40→0, opacity: 0→1) for all text and CTAs.

### C. SOCIAL PROOF — "The Evidence Wall" (IMMEDIATELY AFTER HERO)
This is the most important section. It must hit hard.

- Dark background with subtle grid pattern overlay.
- **Two stat blocks side by side (large, prominent):**
  - Left: "847K" (massive neon magenta number, Fira Code) + "среднее кол-во просмотров на TikTok" (small label below)
  - Right: "439K" (massive neon magenta number, Fira Code) + "среднее кол-во просмотров в Instagram" (small label below)
- **Below stats:** A row of 6 mini-cards representing real videos, each showing:
  - A dark placeholder thumbnail area (use dark gradient rectangles with subtle borders — these represent video thumbnails)
  - View count below each: "1.2 млн", "863 тыс.", "641 тыс.", "2.7 млн", "794.9 тыс.", "2.5 млн"
- **Below the row, centered text:**
  - (Instrument Serif Italic, accent magenta): "Это не удача."
  - (Space Grotesk, bold, white, larger): "Это система."
- **Platform badges:** TikTok and Instagram icons/logos flanking the stats.
- **Animation:** Numbers count up from 0 using GSAP when section enters viewport. Cards stagger in.

### D. FEATURES / PROGRAM — "What's Inside"
Section title: "Программа мастер-класса" (Space Grotesk bold)
Subtitle: "Весь рабочий процесс на экране, от сценария до готового ролика"

Four module cards in a grid (2x2 desktop, stacked mobile):

**Card 1 — "Генерация визуала"**
- Icon: Image/Palette (Lucide)
- "Как создавать все изображения в едином стиле, кадр за кадром. Авторская коллекция стилей и мои настройки."

**Card 2 — "Анимация"**
- Icon: Film/Play (Lucide)
- "Как оживить картинку так, чтобы движение камеры соответствовало сценарию. Разница между кинематографичным кадром и кашей на экране."

**Card 3 — "Озвучка"**
- Icon: Mic (Lucide)
- "Создание уникального голоса для озвучки. Профессиональное звучание без студии и оборудования."

**Card 4 — "Монтаж и саунд-дизайн"**
- Icon: Scissors/Music (Lucide)
- "Сборка ролика с профессиональным саунд-дизайном: нарастание напряжения, удары, тишина перед кульминацией."

Card styling: Charcoal `#12121A` background, subtle magenta border on hover, `rounded-[2rem]`, neon glow on hover. Each card has a top icon area with accent color icon.

### E. PROCESS — "The Pipeline"
Section title: "Один ролик за один вечер"

A vertical timeline or horizontal step flow showing 6 steps:
1. "Написать виральный сценарий по структуре"
2. "Сгенерировать 15-25 изображений в едином стиле"
3. "Анимировать каждый кадр с правильными промптами"
4. "Создать уникальную озвучку"
5. "Собрать монтаж с профессиональным саунд-дизайном"
6. "Добавить субтитры, переходы, визуальную полировку"

Below the steps, a contrast block:
- "Год назад для создания такого видео понадобилась бы команда аниматоров, дизайнеров и звукорежиссёров, неделя работы и бюджет от 100 000₽."
- (Magenta accent, bold): "Сегодня это может сделать один человек за вечер."

Animation: Steps appear sequentially on scroll with GSAP ScrollTrigger.

### F. PRICING — "Тарифы"
Section title: "Выберите свой формат"

**TWO cards side by side** (not three). NO crossed-out prices. NO fake discounts.

**Card 1 — "Базовый"**
- Price: "3 990 ₽" (large, white)
- Features list:
  - Полный список сервисов с моими настройками
  - Коллекция авторских стилей для генерации
  - Пошаговый процесс от сценария до готового ролика
  - Создание уникального голоса и профессиональный саунд-дизайн
  - Видеоуроки: весь рабочий процесс на экране
  - Доступ в закрытый чат учеников
- CTA button: "Получить доступ" (magenta outline style)
- Card style: Charcoal background, subtle border

**Card 2 — "Персональное обучение" (HIGHLIGHTED)**
- Price: "6 990 ₽" (large, magenta color)
- Label: "Рекомендуем" (small accent badge at top)
- Features list:
  - Всё из базового тарифа
  - Личный разбор ваших первых роликов
  - Обратная связь по сценарию, визуалу и монтажу
  - Помогу довести до уровня, который набирает просмотры
  - Работа со мной напрямую
- CTA button: "Получить доступ" (solid magenta background)
- Card style: Charcoal background, magenta border glow, slightly larger or elevated

Both cards: `rounded-[2rem]`, checkmark icons next to features.
Below cards: "По вопросам: @inevitable_ravage в Telegram"

### G. FAQ — "Частые вопросы"
Section title: "Частые вопросы"

Accordion-style expandable items with magenta accent on active state:

**Q: Нужен ли мощный компьютер?**
A: Нет. Все сервисы работают в браузере. Достаточно стабильного интернета, можно работать даже с ноутбука.

**Q: Сколько стоят инструменты?**
A: Есть полностью бесплатные связки. Для лучшего качества понадобятся подписки, но это не больше 2000-3000₽ в месяц. В курсе разбираю оба варианта.

**Q: Сколько времени до первого ролика?**
A: После прохождения курса, первый полноценный ролик можно собрать за 1 день.

**Q: У меня нет опыта в монтаже/нейросетях, получится ли?**
A: Да. Курс построен с нуля. Я показываю каждый шаг на экране. Если что-то непонятно, в закрытом чате я лично помогаю разобраться.

**Q: Актуальна ли информация?**
A: Нейросети быстро меняются. В закрытом чате я регулярно делюсь обновлениями: новые сервисы, изменения в старых, актуальные настройки.

**Q: Чем курс отличается от бесплатного гайда?**
A: Гайд показывает ЧТО нужно делать и общую логику процесса. Курс показывает КАК, шаг за шагом на экране, с моими настройками, стилями и приёмами которые я не раскрываю в бесплатных материалах.

### H. FREE GUIDE CTA — "Не готовы к покупке?"
A full-width banner section before the footer.
- Dark charcoal background with subtle magenta border top and bottom.
- Text: "Не готовы к покупке?"
- Subtext: "Скачайте бесплатный гайд и посмотрите как выглядит мой рабочий процесс"
- CTA button: "Скачать гайд бесплатно" (magenta outline) → https://t.me/zaprethist

### I. FOOTER
- Deep `#07070B` background, `rounded-t-[3rem]`.
- Grid: Brand name "ЗАПРЕТНАЯ ИСТОРИЯ" + tagline "ИИ-анимация на миллионы просмотров"
- Social links: Instagram, TikTok, Telegram, YouTube
- Contact: @inevitable_ravage
- **"System Operational"** status indicator with pulsing magenta dot and Fira Code label (fits the cyberpunk theme)

---

## Technical Requirements

- **Stack:** React 19, Tailwind CSS v3.4.17, GSAP 3 (with ScrollTrigger plugin), Lucide React for icons.
- **Fonts:** Load "Space Grotesk", "Instrument Serif", "Inter", "Fira Code" via Google Fonts `<link>` tags.
- **Images:** Use real Unsplash URLs matching the dark cyberpunk aesthetic. Keywords: neon, dark, rain, hooded figure, cinematic, city lights, film equipment.
- **Language:** ALL text content is in Russian. Do not translate or modify any text strings provided above.
- **No placeholders.** Every card, every label, every animation must be fully implemented and functional.
- **Responsive:** Mobile-first. Stack cards vertically on mobile. Reduce hero font sizes. Collapse navbar.
- **Smooth scroll:** All anchor links use smooth scroll behavior.
- **No fake prices.** No crossed-out "old" prices. The pricing is real and honest.

---

## Build Sequence

1. Map the "Neon Abyss" preset to all design tokens.
2. Build all sections in order A through I.
3. Wire all GSAP animations: hero entrance, stat counter, card staggers, scroll-triggered reveals.
4. Ensure pricing section is clean, honest, and visually highlights the "Персональное обучение" card.
5. Test all interactions, all scroll behaviors, all responsive breakpoints.
6. Deploy.

**Execution Directive:** "Do not build a website; build a digital instrument. This site represents a creator who makes cinematic AI animation that gets millions of views. The site itself must feel cinematic. Every scroll intentional, every animation weighted. Eradicate all generic AI patterns. The site should feel like the content it sells — dark, atmospheric, professional, with neon accents that cut through the darkness."
