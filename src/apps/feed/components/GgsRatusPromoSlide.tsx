import type { RefObject } from 'react';
import { FaInstagram, FaLocationDot, FaWhatsapp } from 'react-icons/fa6';
import ratusModel from '@/assets/ggs-ratus-model.jpg';
import ratusKursi from '@/assets/ggs-ratus-kursi.jpg';
import './GgsRatusPromoSlide.css';

const assetBase = '/nempo-feed/';

/**
 * GGS Feed slide 7 — promo Ratus (Rp50.000 → Rp45.000), pink Barbie.
 * 3:4 artboard (1080×1440 export) driven by one 15 s CSS timeline (`ggr-`),
 * so the preview loops seamlessly and the MP4 is recorded frame-for-frame.
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
      <div className="ggr-rays" aria-hidden="true" />
      <div className="ggr-glow" aria-hidden="true" />

      <header className="ggr-top">
        <img
          src={`${assetBase}assets/ggs-beauty-logo.png`}
          alt="Logo GGS Beauty"
          className="ggr-logo"
          draggable={false}
        />
        <p className="ggr-pill">Promo Spesial</p>
      </header>

      <figure className="ggr-box">
        <div className="ggr-box-window">
          <img src={ratusModel} alt="Pelanggan GGS Beauty memakai kemben satin pink untuk perawatan ratus" draggable={false} />
        </div>
        <figcaption className="ggr-box-plate">GGS Beauty · Spa</figcaption>
      </figure>

      <div className="ggr-kursi">
        <div className="ggr-steam" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="ggr-kursi-ring">
          <img src={ratusKursi} alt="Kursi ratus di GGS Beauty" draggable={false} />
        </div>
        <p className="ggr-kursi-text">
          Duduk santai,
          <br />
          nikmati hangatnya.
        </p>
      </div>

      <h1 className="ggr-title">
        <span className="ggr-title-kicker">Perawatan</span>
        <span className="ggr-title-word">Ratus</span>
      </h1>

      <section className="ggr-price" aria-label="Harga promo ratus">
        <p className="ggr-old">
          <span className="ggr-old-label">Normal</span>
          <span className="ggr-old-num">
            Rp50.000
            <i className="ggr-strike" aria-hidden="true" />
          </span>
        </p>
        <p className="ggr-new">
          <span className="ggr-new-inner">
            <small>Rp</small>45.000
          </span>
        </p>
      </section>

      <div className="ggr-badge" aria-label="Diskon, hemat Rp5.000">
        <div className="ggr-badge-inner">
          <span className="ggr-badge-top">Diskon</span>
          <span className="ggr-badge-big">5rb</span>
          <span className="ggr-badge-bottom">Lebih hemat</span>
        </div>
      </div>

      <footer className="ggr-footer">
        <div className="ggr-contacts">
          <span>
            <FaWhatsapp aria-hidden="true" /> 0823 4277 7723
          </span>
          <span>
            <FaInstagram aria-hidden="true" /> @ggsbeauty.hair.co
          </span>
          <span className="ggr-address">
            <FaLocationDot aria-hidden="true" /> Jl. Cimanuk No. 309, Sukagalih, Garut
          </span>
        </div>
        <a
          href="https://wa.me/6282342777723"
          target="_blank"
          rel="noreferrer"
          className="ggr-cta"
        >
          Booking sekarang
        </a>
      </footer>
    </main>
  );
}
