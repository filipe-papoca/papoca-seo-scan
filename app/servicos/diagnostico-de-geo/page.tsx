'use client';

import { useEffect } from 'react';
import './styles.css';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Comparativo } from './components/Comparativo';
import { Numeros } from './components/Numeros';
import { Camadas } from './components/Camadas';
import { Cta } from './components/Cta';
import { Plano } from './components/Plano';
import { Ilumine } from './components/Ilumine';
import { ProvaEFaq } from './components/ProvaEFaq';
import { Formulario } from './components/Formulario';
import { Footer } from './components/Footer';

export default function DiagnosticoDeGeo() {
  // Comportamento portado 1:1 do <script> original (index.html), que
  // manipula o DOM diretamente em vez de estado React. Mantido assim de
  // propósito: é o mesmo mecanismo do protótipo, incluindo os efeitos
  // frágeis documentados no LEIA-ME.md original (lupa, "ilumine").
  useEffect(() => {
    // ---------- accordions (plano de ação + faq) ----------
    function onAccordionClick(e: MouseEvent) {
      const bt = (e.target as HTMLElement).closest('.pp-acc__bt, .pp-faq__bt');
      if (!bt) return;
      // closest e não parentElement: no FAQ o botão está dentro de um <h3>
      const it = bt.closest('.pp-acc__it, .pp-faq__it');
      if (!it) return;
      const open = it.getAttribute('data-open') === 'true';
      it.setAttribute('data-open', open ? 'false' : 'true');
      bt.setAttribute('aria-expanded', open ? 'false' : 'true');
    }
    document.addEventListener('click', onAccordionClick);
    document.querySelectorAll('.pp-acc__it').forEach((el) => {
      if (!el.hasAttribute('data-open')) el.setAttribute('data-open', 'false');
    });

    // ---------- lupa: esmaece ao cruzar texto ----------
    // A lupa viaja pela seção inteira e ocupa a mesma faixa horizontal da coluna
    // de descrição das camadas. Texto #3A3A3A sobre o rosa dela dá contraste de
    // 2,5:1 e sobre o preto 1,5:1, ambos abaixo do mínimo de 4,5:1 da WCAG.
    // Então quando há sobreposição real, a lupa recua no CSS via data-attribute.
    const lupa = document.querySelector<HTMLElement>('.pp-lupa');
    let avaliarLupa: (() => void) | undefined;
    let pedirLupa: (() => void) | undefined;
    let imgLupa: HTMLImageElement | null = null;

    if (lupa && window.matchMedia('(min-width:961px)').matches) {
      const alvos = Array.prototype.slice.call(
        document.querySelectorAll(
          '.pp-s--cam .pp-layer__desc, .pp-s--cam .pp-layer__title,' +
            '.pp-s--cam .pp-donut__lb, .pp-s--cam .pp-sent__lb,' +
            '.pp-s--cam .pp-summary__txt, .pp-s--cam .pp-summary__lb,' +
            '.pp-s--cam .pp-summary__big, .pp-s--cam .pp-attr,' +
            '.pp-s--cam .pp-legend'
        )
      ) as HTMLElement[];
      // .pp-chart fica FORA da lista de propósito: sobrepor os gráficos é o efeito
      // desejado, só o texto precisa de proteção.
      imgLupa = lupa.querySelector('img');
      let agendado = false;

      avaliarLupa = () => {
        agendado = false;
        if (!imgLupa) return;
        const a = imgLupa.getBoundingClientRect();
        if (a.height === 0) return;
        let cruza = false;
        for (let i = 0; i < alvos.length; i++) {
          const b = alvos[i].getBoundingClientRect();
          if (b.height === 0) continue;
          // só sobreposição relevante conta: a geometria do CSS já reserva a faixa,
          // então isto é rede de segurança para mudanças de copy, não o mecanismo
          // principal. Encostar ou raspar a borda é ignorado.
          const ow = Math.min(a.right, b.right) - Math.max(a.left, b.left);
          const oh = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
          if (ow > 28 && oh > 14) {
            cruza = true;
            break;
          }
        }
        lupa.setAttribute('data-sobre-texto', cruza ? 'true' : 'false');
      };
      pedirLupa = () => {
        if (!agendado) {
          agendado = true;
          requestAnimationFrame(avaliarLupa!);
        }
      };

      window.addEventListener('scroll', pedirLupa, { passive: true });
      window.addEventListener('resize', pedirLupa);
      if (imgLupa?.complete) avaliarLupa();
      else imgLupa?.addEventListener('load', avaliarLupa);
      avaliarLupa();
    }

    // ---------- seção "Ilumine": acende com o scroll ----------
    // Acende quando o topo da seção passa de 35% da altura da viewport, ou seja
    // quando ela já ocupa a maior parte da tela. Apaga ao rolar de volta.
    // Sem JS a seção fica escura com a lâmpada apagada, que é um estado válido.
    const ilum = document.querySelector('.pp-s--ilum');
    let avaliarLuz: (() => void) | undefined;
    let pedirLuz: (() => void) | undefined;
    if (ilum) {
      let agendado2 = false;
      avaliarLuz = () => {
        agendado2 = false;
        const r = ilum.getBoundingClientRect();
        const acender = r.top < window.innerHeight * 0.35 && r.bottom > 0;
        ilum.classList.toggle('is-acesa', acender);
      };
      pedirLuz = () => {
        if (!agendado2) {
          agendado2 = true;
          requestAnimationFrame(avaliarLuz!);
        }
      };
      window.addEventListener('scroll', pedirLuz, { passive: true });
      window.addEventListener('resize', pedirLuz);
      avaliarLuz();
    }

    // ---------- header: pill ganha fundo ao rolar ----------
    // No topo o pill é transparente; a partir de 40px de scroll ele recebe
    // rgba(25,25,25,.95) com radius 4, como no Dev Mode.
    const nav = document.querySelector('.pp-s--nav');
    let avaliarNav: (() => void) | undefined;
    let pedirNav: (() => void) | undefined;
    if (nav) {
      let agendado3 = false;
      avaliarNav = () => {
        agendado3 = false;
        nav.classList.toggle('is-rolado', window.scrollY > 40);
      };
      pedirNav = () => {
        if (!agendado3) {
          agendado3 = true;
          requestAnimationFrame(avaliarNav!);
        }
      };
      window.addEventListener('scroll', pedirNav, { passive: true });
      avaliarNav();
    }

    // ---------- menu mobile ----------
    const burger = document.querySelector<HTMLElement>('.pp-burger');
    const menu = document.getElementById('pp-menu');
    function onBurgerClick() {
      if (!menu || !burger) return;
      const open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    if (burger && menu) burger.addEventListener('click', onBurgerClick);

    // ---------- carrossel de depoimentos ----------
    const track = document.getElementById('pp-track');
    const dots = document.getElementById('pp-dots');
    let onDotsClick: ((e: MouseEvent) => void) | undefined;
    let onScroll: (() => void) | undefined;
    let onResize: (() => void) | undefined;

    if (track && dots) {
      const cards = Array.prototype.slice.call(track.querySelectorAll('.pp-quote')) as HTMLElement[];

      const marcarAtivo = () => {
        const totalDots = dots.children.length;
        if (totalDots === 0) return;

        if (totalDots === 2) {
          const maxScroll = track.scrollWidth - track.clientWidth;
          if (maxScroll <= 0) return;
          const ratio = track.scrollLeft / maxScroll;
          const activeIndex = ratio > 0.5 ? 1 : 0;
          Array.prototype.forEach.call(dots.children, (b: HTMLElement, j: number) => {
            if (j === activeIndex) b.setAttribute('aria-current', 'true');
            else b.removeAttribute('aria-current');
          });
        } else {
          // Mobile: 3 cards
          const alvo = track.scrollLeft;
          let melhor = 0;
          let dist = Infinity;
          cards.forEach((c, i) => {
            const d = Math.abs(c.offsetLeft - track.offsetLeft - alvo);
            if (d < dist) {
              dist = d;
              melhor = i;
            }
          });
          Array.prototype.forEach.call(dots.children, (b: HTMLElement, j: number) => {
            if (j === melhor) b.setAttribute('aria-current', 'true');
            else b.removeAttribute('aria-current');
          });
        }
      };

      const updatePagination = () => {
        // No desktop (onde 2 cards aparecem lado a lado): 2 bullets
        // No mobile (onde 1 card ocupa a largura): 3 bullets
        const isMobile = window.innerWidth <= 640;
        const numBullets = isMobile ? 3 : 2;

        dots.innerHTML = Array.from({ length: numBullets })
          .map(
            (_, i) =>
              `<button type="button" aria-label="Ir para a página ${i + 1}"${i === 0 ? ' aria-current="true"' : ''}></button>`
          )
          .join('');

        marcarAtivo();
      };

      onScroll = () => {
        marcarAtivo();
      };

      onResize = () => {
        updatePagination();
      };

      onDotsClick = (e: MouseEvent) => {
        const b = (e.target as HTMLElement).closest('button');
        if (!b) return;
        const dotIndex = Array.prototype.indexOf.call(dots.children, b);
        const totalDots = dots.children.length;

        if (totalDots === 2) {
          // Desktop:
          // Bullet 0: rola para o início (left: 0 -> mostra Doug e Dani)
          // Bullet 1: rola para o final (mostra Dani e Hugo)
          const maxScroll = track.scrollWidth - track.clientWidth;
          const targetLeft = dotIndex === 0 ? 0 : maxScroll;
          track.scrollTo({ left: targetLeft, behavior: 'smooth' });
        } else {
          // Mobile:
          if (cards[dotIndex]) {
            track.scrollTo({ left: cards[dotIndex].offsetLeft - track.offsetLeft, behavior: 'smooth' });
          }
        }
      };

      dots.addEventListener('click', onDotsClick);
      track.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
      updatePagination();
    }

    return () => {
      document.removeEventListener('click', onAccordionClick);
      if (pedirLupa) {
        window.removeEventListener('scroll', pedirLupa);
        window.removeEventListener('resize', pedirLupa);
      }
      if (avaliarLupa && imgLupa) imgLupa.removeEventListener('load', avaliarLupa);
      if (pedirLuz) {
        window.removeEventListener('scroll', pedirLuz);
        window.removeEventListener('resize', pedirLuz);
      }
      if (pedirNav) window.removeEventListener('scroll', pedirNav);
      if (burger && menu) burger.removeEventListener('click', onBurgerClick);
      if (track && dots) {
        if (onDotsClick) dots.removeEventListener('click', onDotsClick);
        if (onScroll) track.removeEventListener('scroll', onScroll);
        if (onResize) window.removeEventListener('resize', onResize);
      }
    };
  }, []);

  return (
    <>
      <Nav />
      <main id="conteudo">
        <Hero />
        <Comparativo />
        <Numeros />
        <Camadas />
        <Cta />
        <Plano />
        <Ilumine />
        <ProvaEFaq />
        <Formulario />
      </main>
      <Footer />
    </>
  );
}
