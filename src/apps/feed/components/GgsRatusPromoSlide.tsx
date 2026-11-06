import type { RefObject } from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import ratusScene from '@/assets/ggs-ratus-scene.jpg';
import './GgsRatusPromoSlide.css';

const assetBase = '/nempo-feed/';

/** Pink paint-brush swipe used behind "Promo" and the new price. */
function BrushStroke({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="ggr-brush-fill" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#ff9bcd" />
          <stop offset="0.45" stopColor="#ff6fb4" />
          <stop offset="1" stopColor="#ffb6da" />
        </linearGradient>
      </defs>
      <path
        fill="url(#ggr-brush-fill)"
        d="M14 22 L40 14 L96 12 L170 9 L250 11 L318 9 L372 13 L392 18 L380 27 L396 36 L384 46 L398 57 L382 66 L394 77 L368 86 L300 90 L220 88 L150 91 L80 89 L30 86 L8 80 L22 71 L4 61 L18 51 L2 41 L16 32 Z"
      />
      <path fill="#ffd3e8" opacity="0.7" d="M30 30 L360 26 L362 32 L34 37 Z" />
      <path fill="#e94e9c" opacity="0.45" d="M24 70 L350 66 L352 72 L26 77 Z" />
      <path fill="#ffe4f1" opacity="0.55" d="M60 50 L300 47 L302 51 L62 54 Z" />
    </svg>
  );
}

/**
 * GGS Feed slide 7 — promo Ratus (Rp50.000 → Rp45.000), pink Barbie.
 * Full-bleed AI spa scene built from the owner's photo of the ratus stool,
 * with animated lettering on one 15 s CSS timeline (`ggr-`) so the preview
 * loops seamlessly and the MP4 is recorded frame-for-frame.
 */
export function GgsRatusPromoSlide({
  exportRef,
}: {
  exportRef: RefObject<HTMLElement | null>;
}) {
  return (
    <main
      ref={exportRef}
      aria-label="GGS Beauty — Promo Ratus, dari Rp50.000 jadi Rp45.000"
      className="ggr-root"
    >
      <div className="ggr-scene" aria-hidden="true">
        <img src={ratusScene} alt="" draggable={false} />
      </div>
      <div className="ggr-candle" aria-hidden="true" />
      <div className="ggr-steam" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="ggr-veil" aria-hidden="true" />

      <img
        src={`${assetBase}assets/ggs-beauty-logo.png`}
        alt="Logo GGS Beauty"
        className="ggr-logo"
        draggable={false}
      />

      <section className="ggr-copy">
        <h1 className="ggr-title">
          <span className="ggr-title-word">Ratus</span>
          <svg className="ggr-swash" viewBox="0 0 300 30" aria-hidden="true">
            <path d="M6 22 C 90 6, 200 4, 294 14" />
          </svg>
          <span className="ggr-burst ggr-burst-title" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </h1>

        <p className="ggr-promo">
          <BrushStroke className="ggr-brush ggr-brush-promo" />
          <span>Promo</span>
        </p>

        <p className="ggr-old">
          dari{' '}
          <span className="ggr-old-num">
            50.000
            <i className="ggr-strike" aria-hidden="true" />
          </span>
        </p>

        <p className="ggr-new">
          <BrushStroke className="ggr-brush ggr-brush-new" />
          <span className="ggr-burst ggr-burst-left" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="ggr-new-num">45.000</span>
          <span className="ggr-burst ggr-burst-right" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </p>
      </section>

      <footer className="ggr-footer">
        <div className="ggr-contacts">
          <span>
            <FaWhatsapp aria-hidden="true" /> 0823 4277 7723
          </span>
          <span>
            <FaInstagram aria-hidden="true" /> @ggsbeauty.hair.co
          </span>
        </div>
        <a href="https://wa.me/6282342777723" target="_blank" rel="noreferrer" className="ggr-cta">
          Booking sekarang
        </a>
      </footer>
    </main>
  );
}
