'use client';

import { useEffect, useState } from 'react';

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
            {/* Subtle top glow */}
            <div style={{
                position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: '600px', height: '300px',
                background: 'radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '420px', width: '100%', position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    {/* Telegram Icon */}
                    <div style={{
                        width: '72px', height: '72px',
                        background: 'linear-gradient(135deg, #229ED9, #1a7bbf)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 20px',
                        boxShadow: '0 0 40px rgba(34,158,217,0.4)',
                    }}>
                        <svg width="36" height="36" viewBox="0 0 240 240" fill="white">
                            <path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0zm59.18 82.44l-20.3 95.67c-1.5 6.66-5.4 8.3-10.93 5.16l-30.18-22.23-14.56 14.02c-1.6 1.6-2.96 2.96-6.07 2.96l2.16-30.72 55.87-50.47c2.43-2.16-.53-3.36-3.76-1.2l-69.1 43.5-29.76-9.3c-6.47-2.02-6.6-6.47 1.35-9.56l116.19-44.8c5.4-1.96 10.13 1.32 8.09 6.97z" />
                        </svg>
                    </div>
                    <h1 style={{
                        fontSize: '32px', fontWeight: 800,
                        color: '#f8fafc',
                        margin: '0 0 8px',
                        letterSpacing: '-0.5px',
                        lineHeight: 1.2,
                    }}>
                        Бесплатный гайд
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '16px', margin: 0 }}>
                        по созданию AI-видео
                    </p>
                </div>

                {/* Instruction block for TikTok */}
                {isTikTok && (
                    <div style={{
                        background: 'rgba(248,197,0,0.06)',
                        border: '1px solid rgba(248,197,0,0.3)',
                        borderRadius: '16px',
                        padding: '24px',
                        marginBottom: '24px',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <span style={{ fontSize: '22px' }}>⚡</span>
                            <span style={{ color: '#fbbf24', fontWeight: 700, fontSize: '17px' }}>
                                Один шаг до гайда
                            </span>
                        </div>
                        <p style={{ color: '#cbd5e1', fontSize: '15px', margin: '0 0 16px', lineHeight: 1.6 }}>
                            TikTok не даёт открывать Telegram напрямую. Чтобы забрать файл:
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{
                                display: 'flex', alignItems: 'flex-start', gap: '12px',
                                background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '12px',
                            }}>
                                <span style={{
                                    background: '#fbbf24', color: '#000', fontWeight: 800,
                                    fontSize: '13px', borderRadius: '50%',
                                    width: '24px', height: '24px', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}>1</span>
                                <span style={{ color: '#f1f5f9', fontSize: '15px', lineHeight: 1.5 }}>
                                    Нажми на <strong style={{ color: '#fbbf24' }}>три точки (•••)</strong> в правом верхнем углу
                                </span>
                            </div>
                            <div style={{
                                display: 'flex', alignItems: 'flex-start', gap: '12px',
                                background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '12px',
                            }}>
                                <span style={{
                                    background: '#fbbf24', color: '#000', fontWeight: 800,
                                    fontSize: '13px', borderRadius: '50%',
                                    width: '24px', height: '24px', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}>2</span>
                                <span style={{ color: '#f1f5f9', fontSize: '15px', lineHeight: 1.5 }}>
                                    Выбери <strong style={{ color: '#fbbf24' }}>«Открыть в браузере»</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {!isTikTok && (
                    <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '24px', fontSize: '15px' }}>
                        Перенаправляем в Telegram...
                    </p>
                )}

                {/* CTA Button */}
                <button
                    onClick={handleAggressiveRedirect}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        width: '100%',
                        padding: '18px 24px',
                        background: 'linear-gradient(135deg, #229ED9 0%, #1a7bbf 100%)',
                        border: 'none',
                        borderRadius: '14px',
                        color: '#fff',
                        fontSize: '17px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        letterSpacing: '0.3px',
                        boxShadow: '0 8px 32px rgba(34,158,217,0.35), 0 2px 8px rgba(0,0,0,0.3)',
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                        whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(34,158,217,0.5), 0 4px 12px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(34,158,217,0.35), 0 2px 8px rgba(0,0,0,0.3)';
                    }}
                >
                    <svg width="22" height="22" viewBox="0 0 240 240" fill="white" style={{ flexShrink: 0 }}>
                        <path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0zm59.18 82.44l-20.3 95.67c-1.5 6.66-5.4 8.3-10.93 5.16l-30.18-22.23-14.56 14.02c-1.6 1.6-2.96 2.96-6.07 2.96l2.16-30.72 55.87-50.47c2.43-2.16-.53-3.36-3.76-1.2l-69.1 43.5-29.76-9.3c-6.47-2.02-6.6-6.47 1.35-9.56l116.19-44.8c5.4-1.96 10.13 1.32 8.09 6.97z" />
                    </svg>
                    ПОЛУЧИТЬ ГАЙД В TELEGRAM
                </button>

                {/* Fallback hint after clicking */}
                {clickCount > 0 && isTikTok && (
                    <div style={{
                        marginTop: '20px',
                        padding: '16px',
                        background: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.25)',
                        borderRadius: '12px',
                        textAlign: 'center',
                    }}>
                        <p style={{ color: '#f87171', fontWeight: 600, margin: '0 0 4px', fontSize: '15px' }}>
                            Не открылось?
                        </p>
                        <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>
                            Воспользуйся инструкцией выше — три точки → Открыть в браузере.
                        </p>
                    </div>
                )}

                {/* Footer note */}
                <p style={{ textAlign: 'center', color: '#334155', fontSize: '13px', marginTop: '28px' }}>
                    Запретная История · zaprethistory.ru
                </p>
            </div>
        </div>
    );
}
