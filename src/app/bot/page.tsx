'use client';

import { useEffect, useState } from 'react';

function CopyUsername({ username }: { username: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <button
            onClick={() => {
                navigator.clipboard.writeText(username).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2500);
                });
            }}
            style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '11px 14px',
                background: copied ? 'rgba(34,197,94,0.1)' : 'rgba(34,158,217,0.08)',
                border: `1px solid ${copied ? 'rgba(34,197,94,0.35)' : 'rgba(34,158,217,0.25)'}`,
                borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease',
            }}
        >
            <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '15px' }}>{username}</span>
            <span style={{
                color: copied ? '#4ade80' : '#229ED9', fontSize: '12px', fontWeight: 600,
                background: copied ? 'rgba(34,197,94,0.12)' : 'rgba(34,158,217,0.12)',
                padding: '3px 9px', borderRadius: '5px', flexShrink: 0,
            }}>
                {copied ? '✓ Скопировано' : 'Скопировать'}
            </span>
        </button>
    );
}

export default function BotRedirectPage() {
    const telegramBotUrl = process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL || 'https://t.me/zaprethistory_bot';
    const telegramDeepLink = telegramBotUrl.replace('https://t.me/', 'tg://resolve?domain=');
    const [isTikTok, setIsTikTok] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent || navigator.vendor;
        const isAppBrowser = /TikTok|Bytedance|musical_ly|trill|Instagram|FBAN|FBAV/i.test(ua);
        setIsTikTok(isAppBrowser);
        if (!isAppBrowser) {
            window.location.replace(telegramDeepLink);
            setTimeout(() => { window.location.replace(telegramBotUrl); }, 1000);
        }
    }, [telegramDeepLink, telegramBotUrl]);

    const handleRedirect = () => {
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
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '20px 16px',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
        }}>
            <div style={{ maxWidth: '400px', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* Header */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '56px', height: '56px',
                        background: 'linear-gradient(135deg, #229ED9, #1a7bbf)',
                        borderRadius: '50%', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', margin: '0 auto 12px',
                        boxShadow: '0 0 30px rgba(34,158,217,0.35)',
                    }}>
                        <svg width="28" height="28" viewBox="0 0 240 240" fill="white">
                            <path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0zm59.18 82.44l-20.3 95.67c-1.5 6.66-5.4 8.3-10.93 5.16l-30.18-22.23-14.56 14.02c-1.6 1.6-2.96 2.96-6.07 2.96l2.16-30.72 55.87-50.47c2.43-2.16-.53-3.36-3.76-1.2l-69.1 43.5-29.76-9.3c-6.47-2.02-6.6-6.47 1.35-9.56l116.19-44.8c5.4-1.96 10.13 1.32 8.09 6.97z" />
                        </svg>
                    </div>
                    <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#f8fafc', margin: '0 0 4px', lineHeight: 1.2 }}>
                        Бесплатный гайд
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>по созданию AI-видео</p>
                </div>

                {/* Instruction card — only shown in TikTok browser */}
                {isTikTok && (
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px', padding: '18px',
                    }}>
                        {/* Card header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '18px' }}>⚡</span>
                            <span style={{ color: '#fbbf24', fontWeight: 700, fontSize: '15px' }}>Один шаг до гайда</span>
                        </div>
                        <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 12px', lineHeight: 1.5 }}>
                            TikTok не даёт открывать Telegram напрямую. Чтобы забрать файл:
                        </p>

                        {/* Steps */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                <>Нажми на <strong style={{ color: '#fbbf24' }}>три точки (•••)</strong> в правом верхнем углу</>,
                                <>Выбери <strong style={{ color: '#fbbf24' }}>«Открыть в браузере»</strong></>,
                            ].map((text, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                                    background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '10px',
                                }}>
                                    <span style={{
                                        background: '#fbbf24', color: '#000', fontWeight: 800,
                                        fontSize: '11px', borderRadius: '50%',
                                        width: '18px', height: '18px', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                    }}>{i + 1}</span>
                                    <span style={{ color: '#e2e8f0', fontSize: '13px', lineHeight: 1.5 }}>{text}</span>
                                </div>
                            ))}
                        </div>

                        {/* OR divider */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '14px 0' }}>
                            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.12)' }} />
                            <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, letterSpacing: '1px' }}>ИЛИ</span>
                            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.12)' }} />
                        </div>

                        {/* Copy username */}
                        <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 10px', lineHeight: 1.5 }}>
                            Скопируй имя бота и найди его в поиске Telegram:
                        </p>
                        <CopyUsername username="@zaprethistory_bot" />
                    </div>
                )}

                {!isTikTok && (
                    <p style={{ color: '#475569', textAlign: 'center', fontSize: '14px' }}>
                        Перенаправляем в Telegram...
                    </p>
                )}

                {/* Main CTA — always at the bottom */}
                <button
                    onClick={handleRedirect}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '10px', width: '100%', padding: '16px 24px',
                        background: 'linear-gradient(135deg, #229ED9 0%, #1a7bbf 100%)',
                        border: 'none', borderRadius: '14px', color: '#fff',
                        fontSize: '16px', fontWeight: 700, cursor: 'pointer',
                        letterSpacing: '0.3px',
                        boxShadow: '0 8px 28px rgba(34,158,217,0.35)',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 240 240" fill="white" style={{ flexShrink: 0 }}>
                        <path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0zm59.18 82.44l-20.3 95.67c-1.5 6.66-5.4 8.3-10.93 5.16l-30.18-22.23-14.56 14.02c-1.6 1.6-2.96 2.96-6.07 2.96l2.16-30.72 55.87-50.47c2.43-2.16-.53-3.36-3.76-1.2l-69.1 43.5-29.76-9.3c-6.47-2.02-6.6-6.47 1.35-9.56l116.19-44.8c5.4-1.96 10.13 1.32 8.09 6.97z" />
                    </svg>
                    ПОЛУЧИТЬ ГАЙД В TELEGRAM
                </button>

                <p style={{ textAlign: 'center', color: '#1e293b', fontSize: '12px', margin: 0 }}>
                    Запретная История · zaprethistory.ru
                </p>
            </div>
        </div>
    );
}
