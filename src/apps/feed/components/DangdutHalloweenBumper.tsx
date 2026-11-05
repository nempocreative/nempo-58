import { useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import stage from '@/assets/dangdut-halloween-stage.jpg';
import showLogo from '@/assets/saduli-dangdut-halloween-logo-transparent.png';
import srLogo from '@/assets/saduli-ragap-entertainment-logo-keyed.png';

type Ratio = 'landscape' | 'portrait';

/** Bumper 3: 14-second Halloween dangdut opener for the videotron, in 4:3 landscape or 3:4 portrait. */
export function DangdutHalloweenBumper() {
  const [ratio, setRatio] = useState<Ratio>('landscape');
  const [playing, setPlaying] = useState(true);
  const [version, setVersion] = useState(0);

  return (
    <section className="mc-bumper-tool" aria-label="Bumper 3: Dangdut Halloween Saduli Ragap">
      <div className="mc-bumper-controls">
        <Button variant={ratio === 'landscape' ? 'default' : 'outline'} onClick={() => setRatio('landscape')}>Landscape 4:3</Button>
        <Button variant={ratio === 'portrait' ? 'default' : 'outline'} onClick={() => setRatio('portrait')}>Portrait 3:4</Button>
        <Button variant="outline" size="icon" aria-label={playing ? 'Jeda' : 'Putar'} onClick={() => setPlaying(!playing)}>
          {playing ? <Pause /> : <Play />}
        </Button>
        <Button variant="outline" size="icon" aria-label="Putar ulang" onClick={() => { setVersion((v) => v + 1); setPlaying(true); }}><RotateCcw /></Button>
      </div>
      <div
        key={`${ratio}-${version}`}
        className={`ddh-stage ddh-${ratio}${playing ? '' : ' is-paused'}`}
        aria-label={`Bumper dangdut Halloween ${ratio === 'landscape' ? '4:3' : '3:4'}`}
      >
        <img className="ddh-bg" src={stage} alt="" aria-hidden="true" />
        <div className="ddh-tint" aria-hidden="true" />
        <div className="ddh-beams" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="ddh-bats" aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <i key={i} style={{ ['--i' as string]: i }}>🦇</i>)}</div>
        <div className="ddh-sparks" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ ['--i' as string]: i }} />)}</div>
        <div className="ddh-flash" aria-hidden="true" />
        <div className="ddh-presents">
          <img src={srLogo} alt="Saduli Ragap Entertainment" />
        </div>
        <div className="ddh-stack">
          <img className="ddh-logo" src={showLogo} alt="Saduli Ragap — Dangdut Halloween Night" />
          <div className="ddh-lines">
            <div className="ddh-line ddh-line-1">Goyang Seram</div>
            <div className="ddh-line ddh-line-2">Malam Ini!</div>
          </div>
        </div>
        <div className="ddh-fog" aria-hidden="true" />
        <div className="ddh-fade" aria-hidden="true" />
      </div>
    </section>
  );
}
