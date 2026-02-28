'use client';

import { useEffect, useState } from 'react';

function CopyUsername({ username }: { username: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(username).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    };
    return (
        <button
            onClick={handleCopy}
            style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '14px 16px',
                background: copied ? 'rgba(34,197,94,0.12)' : 'rgba(34,158,217,0.10)',
                border: copied ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(34,158,217,0.3)',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
            }}
        >
            <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '17px', letterSpacing: '0.3px' }}>
                {username}
            </span>
            <span style={{
                color: copied ? '#4ade80' : '#229ED9',
                fontSize: '13px', fontWeight: 600,
                background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(34,158,217,0.15)',
                padding: '4px 10px', borderRadius: '6px',
                flexShrink: 0,
            }}>
                {copied ? '✓ Скопировано' : 'Копировать'}
            </span>
        </button>
    );
}

export default function BotRedirectPage() {
    const telegramBotUrl = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL || 'https://t.me/zaprethistory_bot';
    const telegramDeepLink = telegramBotUrl.replace('https://t.me/', 'tg://resolve?domain=');
    const [isTikTok, setIsTikTok] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        const ua = navigator.userAgent || navigator.vendor;
        const isAppBrowser = /TikTok|Bytedance|musical_ly|trill|Instagram|FBAN|FBAV/i.test(ua);
        setIsTikTok(isAppBrowser);

        if (!isAppBrowser) {
            window.location.replace(telegramDeepLink);
            setTimeout(() => { window.location.replace(telegramBotUrl); }, 1000);
        }
    }, [telegramDeepLink, telegramBotUrl]);

    const handleAggressiveRedirect = () => {
        setClickCount(c => c + 1);
        window.location.assign(telegramDeepLink);
        setTimeout(() => {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = telegramDeepLink;
            document.body.appendChild(iframe);
            setTimeout(() => document.body.removeChild(iframe), 1000);
        }, 300);
        setTimeout(() => { window.open(telegramDeepLink, '_top'); }, 600);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0d0d14 0%, #111827 50%, #0d0d14 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 16px',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
        }}>
            <div style={{
                position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: '600px', height: '300px',
                background: 'radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '420px', width: '100%', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <div style={{
                        width: '64px', height: '64px',
                        background: 'linear-gradient(135deg, #229ED9, #1a7bbf)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                        boxShadow: '0 0 40px rgba(34,158,217,0.4)',
                    }}>
                        <svg width="32" height="32" viewBox="0 0 240 240" fill="white">
                            <path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0zm59.18 82.44l-20.3 95.67c-1.5 6.66-5.4 8.3-10.93 5.16l-30.18-22.23-14.56 14.02c-1.6 1.6-2.96 2.96-6.07 2.96l2.16-30.72 55.87-50.47c2.43-2.16-.53-3.36-3.76-1.2l-69.1 43.5-29.76-9.3c-6.47-2.02-6.6-6.47 1.35-9.56l116.19-44.8c5.4-1.96 10.13 1.32 8.09 6.97z" />
                        </svg>
                    </div>
                    <h1 style={{
                        fontSize: '28px', fontWeight: 800,
                        color: '#f8fafc', margin: '0 0 6px',
                        letterSpacing: '-0.5px', lineHeight: 1.2,
                    }}>
                        Бесплатный гайд
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
                        по созданию AI-видео
                    </p>
                </div>

                {/* === MAIN CTA BUTTON === */}
                <button
                    onClick={handleAggressiveRedirect}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '10px', width: '100%', padding: '17px 24px',
                        background: 'linear-gradient(135deg, #229ED9 0%, #1a7bbf 100%)',
                        border: 'none', borderRadius: '14px', color: '#fff',
                        fontSize: '17px', fontWeight: 700, cursor: 'pointer',
                        letterSpacing: '0.3px',
                        boxShadow: '0 8px 32px rgba(34,158,217,0.35)',
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 240 240" fill="white" style={{ flexShrink: 0 }}>
                        <path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0zm59.18 82.44l-20.3 95.67c-1.5 6.66-5.4 8.3-10.93 5.16l-30.18-22.23-14.56 14.02c-1.6 1.6-2.96 2.96-6.07 2.96l2.16-30.72 55.87-50.47c2.43-2.16-.53-3.36-3.76-1.2l-69.1 43.5-29.76-9.3c-6.47-2.02-6.6-6.47 1.35-9.56l116.19-44.8c5.4-1.96 10.13 1.32 8.09 6.97z" />
                    </svg>
                    ПОЛУЧИТЬ ГАЙД В TELEGRAM
                </button>

                {/* Info for TikTok */}
                {isTikTok && (
                    <>
                        <p style={{ textAlign: 'center', color: '#475569', fontSize: '12px', margin: '10px 0 18px' }}>
                            Если кнопка не открыла Telegram — читай инструкцию ниже
                        </p>

                        {/* ===== TWO OPTIONS BLOCK ===== */}
                        <div style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '18px',
                            overflow: 'hidden',
                        }}>
                            {/* Option A — Copy username */}
                            <div style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                    <span style={{
                                        background: '#229ED9', color: '#fff',
                                        fontWeight: 700, fontSize: '12px', borderRadius: '6px',
                                        padding: '2px 8px', letterSpacing: '0.5px',
                                    }}>СПОСОБ 1</span>
                                    <span style={{ color: '#94a3b8', fontSize: '13px' }}>Проще всего</span>
                                </div>
                                <p style={{ color: '#cbd5e1', fontSize: '14px', margin: '0 0 12px', lineHeight: 1.5 }}>
                                    Скопируй имя бота и вставь его в поиск в приложении Telegram:
                                </p>
                                <CopyUsername username="@zaprethistory_bot" />
                            </div>

                            {/* Divider */}
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '0 20px',
                            }}>
                                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                                <span style={{ color: '#334155', fontSize: '12px' }}>или</span>
                                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                            </div>

                            {/* Option B — Open in browser */}
                            <div style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                    <span style={{
                                        background: 'rgba(251,191,36,0.15)', color: '#fbbf24',
                                        fontWeight: 700, fontSize: '12px', borderRadius: '6px',
                                        padding: '2px 8px', letterSpacing: '0.5px',
                                        border: '1px solid rgba(251,191,36,0.25)',
                                    }}>СПОСОБ 2</span>
                                    <span style={{ color: '#94a3b8', fontSize: '13px' }}>Через браузер</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{
                                        display: 'flex', alignItems: 'flex-start', gap: '10px',
                                        background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '10px',
                                    }}>
                                        <span style={{
                                            background: '#fbbf24', color: '#000', fontWeight: 800,
                                            fontSize: '11px', borderRadius: '50%',
                                            width: '20px', height: '20px', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                        }}>1</span>
                                        <span style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: 1.4 }}>
                                            Нажми <strong style={{ color: '#fbbf24' }}>три точки (•••)</strong> сверху справа
                                        </span>
                                    </div>
                                    <div style={{
                                        display: 'flex', alignItems: 'flex-start', gap: '10px',
                                        background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '10px',
                                    }}>
                                        <span style={{
                                            background: '#fbbf24', color: '#000', fontWeight: 800,
                                            fontSize: '11px', borderRadius: '50%',
                                            width: '20px', height: '20px', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                        }}>2</span>
                                        <span style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: 1.4 }}>
                                            Выбери <strong style={{ color: '#fbbf24' }}>«Открыть в браузере»</strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {!isTikTok && (
                    <p style={{ color: '#475569', textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
                        Перенаправляем в Telegram...
                    </p>
                )}

                <p style={{ textAlign: 'center', color: '#1e293b', fontSize: '13px', marginTop: '24px' }}>
                    Запретная История · zaprethistory.ru
                </p>
            </div>
        </div>
    );
}
