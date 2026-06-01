'use client';

import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import { SUPERPODERES, PODERES } from './data/constants';

interface StarData {
  id: number;
  width: number;
  height: number;
  top: number;
  left: number;
  d: string;
  delay: string;
}

interface BandPolygon {
  id: number;
  points: string;
  fill: string;
}

export default function CorreioElegante() {
  const [screen, setScreen] = useState<'form' | 'envelope' | 'card'>('form');
  const [de, setDe] = useState('');
  const [para, setPara] = useState('');
  const [email, setEmail] = useState('');
  const [qual, setQual] = useState('');
  const [msg, setMsg] = useState('');
  const [showSelectMenu, setShowSelectMenu] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const [stars, setStars] = useState<StarData[]>([]);
  const [polygons, setPolygons] = useState<BandPolygon[]>([]);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  const [dlStatus, setDlStatus] = useState('⬇️ Clique em "Salvar imagem" para baixar o card');
  const [hideEmailForDownload, setHideEmailForDownload] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize stars and bands after hydration (client-only)
  useEffect(() => {
    const generatedStars: StarData[] = [];
    for (let i = 0; i < 55; i++) {
      const sz = Math.random() * 2.5 + 1;
      generatedStars.push({
        id: i,
        width: sz,
        height: sz,
        top: Math.random() * 100,
        left: Math.random() * 100,
        d: (Math.random() * 3 + 2).toFixed(1) + 's',
        delay: (Math.random() * 3).toFixed(1) + 's',
      });
    }
    setStars(generatedStars);

    const bCores = ['#D92B8A', '#F5F5F5', '#FFD700', '#FF6B35', '#4CAF50', '#9B59B6', '#051A30'];
    const generatedPolygons: BandPolygon[] = [];
    let bX = 0;
    let polyId = 0;
    const maxWidth = typeof window !== 'undefined' ? Math.max(2000, window.innerWidth + 200) : 2000;
    while (bX < maxWidth) {
      const c = bCores[Math.floor(Math.random() * bCores.length)];
      generatedPolygons.push({
        id: polyId++,
        points: `${bX},4 ${bX + 18},4 ${bX + 13},28 ${bX + 5},28`,
        fill: c,
      });
      bX += 22;
    }
    setPolygons(generatedPolygons);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setShowSelectMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Toast auto-hide
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showToast = (message: string) => {
    setToast({ show: true, message });
  };

  const enviarCarta = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!para.trim()) {
      showToast('Escreve o nome de quem vai receber! 💌');
      return;
    }
    if (!qual) {
      showToast('Escolhe um superpoder! ⭐');
      return;
    }
    if (!msg.trim()) {
      showToast('Não esquece da mensagem! 📝');
      return;
    }

    if (email.trim()) {
      setSendingEmail(true);
      showToast('Enviando e-mail... ✉️');
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: email.trim(),
            de: de.trim(),
            para: para.trim(),
            qual: qual,
            msg: msg.trim(),
          }),
        });

        const data = await response.json();
        if (response.ok) {
          showToast('Correio Elegante enviado para o e-mail! 🚀');
        } else {
          console.error('Email API error:', data.error);
          showToast('E-mail não enviado, mas o card está pronto! ⚠️');
        }
      } catch (err) {
        console.error('Email sending failed:', err);
        showToast('E-mail não enviado, mas o card está pronto! ⚠️');
      } finally {
        setSendingEmail(false);
      }
    }

    setScreen('envelope');
  };

  const abrirCarta = () => {
    lancarConfetti();
    setScreen('card');
  };

  const lancarConfetti = () => {
    const cores = ['#D92B8A', '#F5F5F5', '#FFD700', '#FF6B35', '#9B59B6', '#4CAF50'];
    if (!containerRef.current) return;
    for (let i = 0; i < 55; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'confetti-p';
        const dur = (Math.random() * 2 + 1.5).toFixed(1);
        const sz = Math.floor(Math.random() * 8 + 4);
        el.style.cssText = `left:${Math.random() * 100}%;top:-10px;background:${cores[Math.floor(Math.random() * cores.length)]};--dur:${dur}s;animation-delay:${(Math.random() * 0.8).toFixed(2)}s;width:${sz}px;height:${sz}px;border-radius:${Math.random() > 0.5 ? '50%' : '2px'}`;
        containerRef.current?.appendChild(el);
        setTimeout(() => el.remove(), (parseFloat(dur) + 1) * 1000);
      }, i * 25);
    }
  };

  const salvarImagem = async () => {
    const card = document.getElementById('card-final');
    if (!card) return;

    setHideEmailForDownload(true);
    setDlStatus('⏳ Gerando imagem...');

    try {
      const html2canvas = (await import('html2canvas')).default;
      // Allow DOM to update and hide the email before rendering
      setTimeout(() => {
        html2canvas(card, {
          backgroundColor: '#061e36',
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
        })
          .then((canvas) => {
            setHideEmailForDownload(false);
            const link = document.createElement('a');
            const targetName = (para || 'cartinha').replace(/\s+/g, '-').toLowerCase();
            link.download = `correio-elegante-${targetName}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            setDlStatus('✅ Imagem salva! Pronta para postar.');
            showToast('Card salvo como PNG! 🎉');
          })
          .catch((err) => {
            console.error('html2canvas error', err);
            setHideEmailForDownload(false);
            setDlStatus('❌ Erro ao gerar. Tente tirar um print!');
            showToast('Tente tirar um print do card 📸');
          });
      }, 150);
    } catch (err) {
      console.error('Failed to import html2canvas', err);
      setHideEmailForDownload(false);
      setDlStatus('❌ Erro ao carregar biblioteca. Tente tirar um print!');
      showToast('Tente tirar um print do card 📸');
    }
  };

  const compartilharLinkedIn = () => {
    const rem = de.trim() === '' || de.trim() === 'Alguém especial' ? 'alguém especial da equipe' : de.trim();
    const desc = PODERES[qual] ? `\n\n"${PODERES[qual]}"` : '';
    const txt = `💌 Recebi um Correio Elegante!\n\n"${msg.trim()}"\n\n🌟 Superpoder reconhecido: ${qual}${desc}\n\nDe: ${rem} 💖\n\nFesta Junina da Papoca! 🎪🌵\n\n#FestJunina #Papoca #CorreioElegante`;
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=https://papoca.agency&summary=${encodeURIComponent(txt)}`,
      '_blank'
    );
    showToast('Abrindo LinkedIn... 🔗');
  };

  const copiarTexto = () => {
    const rem = de.trim() === '' || de.trim() === 'Alguém especial' ? 'alguém especial da equipe' : de.trim();
    const desc = PODERES[qual] ? `\n"${PODERES[qual]}"` : '';
    let txt = `💌 Correio Elegante da Papoca\n\nPara: ${para.trim()}`;
    if (email.trim()) {
      txt += `\nE-mail: ${email.trim()}`;
    }
    txt += `\nDe: ${rem}\n\n"${msg.trim()}"\n\n🌟 Superpoder: ${qual}${desc}\n\n#FestJunina #Papoca #CorreioElegante`;

    navigator.clipboard
      .writeText(txt)
      .then(() => showToast('Copiado! 📋'))
      .catch(() => showToast('Texto pronto!'));
  };

  const novaCarta = () => {
    setDe('');
    setPara('');
    setEmail('');
    setMsg('');
    setQual('');
    setShowSelectMenu(false);
    setDlStatus('⬇️ Clique em "Salvar imagem" para baixar o card');
    setScreen('form');
  };

  return (
    <div className="correio-container" ref={containerRef}>
      <div className="stars" id="stars">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              width: `${s.width}px`,
              height: `${s.height}px`,
              top: `${s.top}%`,
              left: `${s.left}%`,
              animationDelay: s.delay,
              ['--d' as any]: s.d,
            }}
          />
        ))}
      </div>

      <div className="bands">
        <svg width="100%" height="52" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="12" x2="100%" y2="12" stroke="rgba(245,245,245,.25)" strokeWidth="1.2" />
          {polygons.map((p) => (
            <polygon key={p.id} points={p.points} fill={p.fill} opacity="0.88" />
          ))}
        </svg>
      </div>

      <div className="app">
        {screen === 'form' && (
          <div className="screen active" id="screen-form">
            <span className="emoji-big">💌</span>
            <h1 className="hero-title">
              Correio
              <br />
              Elegante
            </h1>
            <p className="hero-sub">Festa Junina da Papoca 🎪</p>
            <div className="form-card">
              <label className="flabel">De quem é a cartinha?</label>
              <input
                className="finput"
                id="inp-de"
                type="text"
                placeholder="Seu nome (ou seja misterioso ✨)"
                maxLength={40}
                value={de}
                onChange={(e) => setDe(e.target.value)}
              />
              <div className="row2">
                <div>
                  <label className="flabel">Para quem vai?</label>
                  <input
                    className="finput"
                    id="inp-para"
                    type="text"
                    placeholder="Nome do colega..."
                    maxLength={40}
                    value={para}
                    onChange={(e) => setPara(e.target.value)}
                  />
                </div>
                <div>
                  <label className="flabel">E-mail do destinatário</label>
                  <input
                    className="finput"
                    id="inp-email"
                    type="email"
                    placeholder="colega@papoca.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <label className="flabel">Superpoder desta pessoa</label>
              <div className="custom-select-container" ref={selectRef}>
                <button
                  type="button"
                  className={`fselect-trigger ${showSelectMenu ? 'active' : ''}`}
                  id="inp-qual-trigger"
                  onClick={() => setShowSelectMenu(!showSelectMenu)}
                >
                  {SUPERPODERES.find((opt) => opt.key === qual)?.label || "Escolha um superpoder..."}
                </button>
                {showSelectMenu && (
                  <div className="custom-select-options">
                    <div
                      className="custom-select-option placeholder"
                      onClick={() => {
                        setQual("");
                        setShowSelectMenu(false);
                      }}
                    >
                      Escolha um superpoder...
                    </div>
                    {SUPERPODERES.map((opt) => (
                      <div
                        key={opt.key}
                        className={`custom-select-option ${qual === opt.key ? 'selected' : ''}`}
                        onClick={() => {
                          setQual(opt.key);
                          setShowSelectMenu(false);
                        }}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input type="hidden" id="inp-qual" value={qual} />
              <label className="flabel">O elogio (máx. 180 caracteres)</label>
              <textarea
                className="ftextarea"
                id="inp-msg"
                maxLength={180}
                placeholder="Ex: Trabalhar ao seu lado é como dançar forró: tem ritmo, tem alegria e nunca pisa no pé de ninguém! 🎶"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
              <div className={`char-c ${msg.length > 150 ? 'warn' : ''}`} id="char-c">
                {msg.length} / 180
              </div>
              <button className="btn-main" onClick={enviarCarta} disabled={sendingEmail}>
                {sendingEmail ? 'Enviando... ⏳' : '✉️ Enviar cartinha'}
              </button>
            </div>
          </div>
        )}

        {screen === 'envelope' && (
          <div className="screen active" id="screen-envelope">
            <div className="env-wrap">
              <h1 className="hero-title" style={{ fontSize: '2rem', marginBottom: '.4rem' }}>
                Chegou carta!
              </h1>
              <p className="hero-sub">Toque no envelope para abrir ✨</p>
              <svg className="env-svg" onClick={abrirCarta} viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="5"
                  y="40"
                  width="210"
                  height="115"
                  rx="12"
                  fill="#9B1060"
                  stroke="rgba(245,245,245,.25)"
                  strokeWidth="1.5"
                />
                <path d="M5 40 L110 90 L215 40 Z" fill="#7a0d4d" />
                <path d="M5 155 L90 100" stroke="rgba(245,245,245,.15)" strokeWidth="1" />
                <path d="M215 155 L130 100" stroke="rgba(245,245,245,.15)" strokeWidth="1" />
                <circle cx="110" cy="88" r="14" fill="#051A30" />
                <path
                  d="M110 83 C110 83 106 80 104 82 C102 84 102 87 106 90 L110 94 L114 90 C118 87 118 84 116 82 C114 80 110 83 110 83Z"
                  fill="#D92B8A"
                />
                <text x="30" y="130" fontSize="14" fill="rgba(245,245,245,.4)">
                  ★
                </text>
                <text x="170" y="126" fontSize="11" fill="rgba(245,245,245,.25)">
                  ✦
                </text>
                <ellipse cx="110" cy="162" rx="88" ry="5" fill="rgba(0,0,0,.25)" />
              </svg>
              <p className="env-hint">
                para: <strong id="env-para-nome" style={{ color: '#D92B8A' }}>{para}</strong>
              </p>
            </div>
          </div>
        )}

        {screen === 'card' && (
          <div className="screen active" id="screen-card">
            <div className="card-wrap">
              <div className="wrapped-card" id="card-final">
                <div className="deco tl">🌵</div>
                <div className="deco tr">🌵</div>
                <div className="deco bl">⭐</div>
                <div className="deco br">⭐</div>
                <div className="card-badge">📮 Correio Elegante · Papoca 2025</div>
                <div className="card-from-txt" id="c-de">
                  De: {de.trim() || 'Alguém especial'}
                </div>
                <div className="card-to-txt" id="c-para">
                  Para {para}
                </div>
                {email && !hideEmailForDownload && (
                  <div className="card-email-txt" id="c-email">
                    📧 {email}
                  </div>
                )}
                <div className="card-div"></div>
                <div className="card-emojis">🎪 💌 🎆</div>
                <div className="card-msg" id="c-msg">
                  &quot;{msg}&quot;
                </div>
                <div className="card-qual-wrap">
                  <div className="card-qual" id="c-qual">
                    {qual}
                  </div>
                  <div className="card-qual-desc" id="c-qual-desc">
                    {PODERES[qual] || ''}
                  </div>
                </div>
                <div className="card-foot">
                  <div className="card-brand">
                    by <span>Papoca</span>
                  </div>
                  <div>🎉 🌟 🎉</div>
                </div>
              </div>

              <div className="dl-status" id="dl-status">
                {dlStatus}
              </div>
              <div className="btn-row">
                <button className="btn-dl" onClick={salvarImagem}>
                  ⬇️ Salvar imagem
                </button>
                <button className="btn-li" onClick={compartilharLinkedIn}>
                  🔗 LinkedIn
                </button>
                <button className="btn-cp" onClick={copiarTexto}>
                  📋 Copiar
                </button>
              </div>
              <button className="btn-novo" onClick={novaCarta}>
                ↩ Escrever nova cartinha
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={`toast ${toast.show ? 'show' : ''}`} id="toast">
        {toast.message}
      </div>
    </div>
  );
}
