import { useState, useEffect, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import '../App.css'
import './Aufmacher.css'
import LogoWeisserPunkt from './LogoWeisserPunkt'

const TITLE_LINE1 = 'Webseiten, Apps und Design aus einer Hand.';
const TITLE_LINE1_BREAKS = [
  'Webseiten, Apps'.length,
  'Webseiten, Apps und Design'.length,
];

function renderTypedLine(
  text: string,
  visibleCount: number,
  breakAfter: number[],
  keyPrefix: string,
) {
  return text.split('').map((char, i) => (
    <span key={`${keyPrefix}-${i}`}>
      {breakAfter.includes(i) && visibleCount > i && <br />}
      <span style={{ visibility: i < visibleCount ? 'visible' : 'hidden' }}>{char}</span>
      {i === visibleCount - 1 && visibleCount > 0 && visibleCount < text.length && (
        <span className="aufmacher-cursor">|</span>
      )}
    </span>
  ));
}

const COLS = 20;
const ROWS = 9;
const CIRCLES_WIDTH_VW = 34;
const DIAMETER_VW = CIRCLES_WIDTH_VW / (COLS + 0.1 * (COLS - 1));
const GAP_VW = DIAMETER_VW * 0.1;
const LINE_HEIGHT_VW = 2 * (ROWS * DIAMETER_VW + (ROWS - 1) * GAP_VW);

function Aufmacher() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const BASE_MS = 120;
    let tid: ReturnType<typeof setTimeout>;
    const typeNext = (idx: number) => {
      const char = TITLE_LINE1[idx];
      const afterSpace = char === ' ';
      const afterPunctuation = /[.,;:!?]/.test(char || '');
      let extra = 0;
      if (afterSpace) extra = 40 + Math.random() * 50;
      else if (afterPunctuation) extra = 80 + Math.random() * 100;
      const vary = (Math.random() - 0.5) * 80;
      const delay = Math.max(50, BASE_MS + vary + extra);
      tid = setTimeout(() => {
        setVisibleCount(idx + 1);
        if (idx + 1 < TITLE_LINE1.length) typeNext(idx + 1);
      }, delay);
    };
    const LINE_ANIMATION_MS = 1200;
    tid = setTimeout(() => typeNext(0), LINE_ANIMATION_MS + (Math.random() - 0.5) * 100);
    return () => clearTimeout(tid);
  }, []);

  const portalLayoutStyle = {
    '--aufmacher-logo-width': `${CIRCLES_WIDTH_VW}vw`,
    '--aufmacher-line-height': `${LINE_HEIGHT_VW}vw`,
  } as CSSProperties;

  const logoElement = typeof document !== 'undefined' && createPortal(
    <LogoWeisserPunkt
      className="aufmacher-logo aufmacher-logo-portal"
      style={portalLayoutStyle}
    />,
    document.body
  );

  const lineElement = typeof document !== 'undefined' && createPortal(
    <div
      className="aufmacher-line aufmacher-line-portal"
      style={portalLayoutStyle}
    />,
    document.body
  );

  const textElement = typeof document !== 'undefined' && createPortal(
    <div
      className="aufmacher-heading aufmacher-heading-portal"
      style={portalLayoutStyle}
    >
      <div className="aufmacher-title">
        {visibleCount === 0 && (
          <span className="aufmacher-cursor">|</span>
        )}
        {renderTypedLine(TITLE_LINE1, visibleCount, TITLE_LINE1_BREAKS, 't1')}
      </div>
    </div>,
    document.body
  );

  return (
    <>
      {logoElement}
      {lineElement}
      {textElement}
      <div className="aufmacher-wrapper" style={{ position: 'relative' }} />
    </>
  );
}

export default Aufmacher;
