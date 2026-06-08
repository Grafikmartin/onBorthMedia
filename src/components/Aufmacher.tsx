import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import '../App.css'
import './Aufmacher.css'
import LogoWeisserPunkt from './LogoWeisserPunkt'

const TITLE_LINE1 = 'Webseiten, Apps und Design aus einer Hand.';
const TITLE_LINE2 = 'Gemeinsam auf Kurs zur digitalen Präsenz.';
const TITLE_LINE1_BREAK = 'Webseiten, Apps und Design'.length;
const TITLE_LINE2_BREAK = 'Gemeinsam auf Kurs'.length;

function renderTypedLine(
  text: string,
  visibleCount: number,
  breakAfter: number,
  keyPrefix: string,
) {
  return text.split('').map((char, i) => (
    <span key={`${keyPrefix}-${i}`}>
      {i === breakAfter && visibleCount > breakAfter && <br />}
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
  const [visibleCount, setVisibleCount] = useState({ titleLine1: 0, titleLine2: 0 });

  useEffect(() => {
    const BASE_MS = 120;
    let tid: ReturnType<typeof setTimeout>;
    const typeNext = (line: 'titleLine1' | 'titleLine2', idx: number) => {
      const char = line === 'titleLine1' ? TITLE_LINE1[idx] : TITLE_LINE2[idx];
      const afterSpace = char === ' ';
      const afterPunctuation = /[.,;:!?]/.test(char || '');
      let extra = 0;
      if (afterSpace) extra = 40 + Math.random() * 50;
      else if (afterPunctuation) extra = 80 + Math.random() * 100;
      const vary = (Math.random() - 0.5) * 80;
      const delay = Math.max(50, BASE_MS + vary + extra);
      tid = setTimeout(() => {
        setVisibleCount(prev => ({ ...prev, [line]: idx + 1 }));
        if (line === 'titleLine1') {
          if (idx + 1 < TITLE_LINE1.length) typeNext('titleLine1', idx + 1);
          else {
            const pause = 120 + Math.random() * 80;
            tid = setTimeout(() => typeNext('titleLine2', 0), pause);
          }
        } else if (line === 'titleLine2' && idx + 1 < TITLE_LINE2.length) {
          typeNext('titleLine2', idx + 1);
        }
      }, delay);
    };
    const LINE_ANIMATION_MS = 1200;
    tid = setTimeout(() => typeNext('titleLine1', 0), LINE_ANIMATION_MS + (Math.random() - 0.5) * 100);
    return () => clearTimeout(tid);
  }, []);

  const logoElement = typeof document !== 'undefined' && createPortal(
    <LogoWeisserPunkt
      className="aufmacher-logo"
      style={{
        position: 'fixed',
        top: '50%',
        left: 'var(--content-start, 10vw)',
        transform: 'translateY(-50%)',
        width: `${CIRCLES_WIDTH_VW}vw`,
        height: 'auto',
        zIndex: 400,
        display: 'block',
      }}
    />,
    document.body
  );

  const lineElement = typeof document !== 'undefined' && createPortal(
    <div
      className="aufmacher-line"
      style={{
        position: 'fixed',
        left: 'calc(47vw - 1px)',
        top: '50%',
        transform: 'translateY(-50%)',
        transformOrigin: 'center center',
        width: '2px',
        height: `${LINE_HEIGHT_VW}vw`,
        backgroundColor: '#000000',
        zIndex: 40,
        pointerEvents: 'none',
      }}
    />,
    document.body
  );

  const textElement = typeof document !== 'undefined' && createPortal(
    <div
      className="aufmacher-heading"
      style={{
        position: 'fixed',
        left: '50vw',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        minHeight: '5.5em',
        width: 'min(40vw, calc(100vw - 50vw - 24px))',
        maxWidth: 'calc(100vw - 50vw - 24px)',
        boxSizing: 'border-box',
        fontFamily: 'Helvetica, Arial, sans-serif',
        color: '#000000',
        fontSize: '4vw',
      }}
    >
      <div className="aufmacher-title" style={{ width: '100%', maxWidth: '100%', fontSize: '0.55em', fontWeight: 200, letterSpacing: '0.02em', marginLeft: 'calc(0.15em - 0.05vw)', lineHeight: 1.4, textAlign: 'left', whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
        {visibleCount.titleLine1 === 0 && (
          <span className="aufmacher-cursor">|</span>
        )}
        {renderTypedLine(TITLE_LINE1, visibleCount.titleLine1, TITLE_LINE1_BREAK, 't1')}
      </div>
      <div className="aufmacher-title" style={{ width: '100%', maxWidth: '100%', fontSize: '0.55em', fontWeight: 200, letterSpacing: '0.02em', marginTop: '0.25em', marginLeft: 'calc(0.15em - 0.05vw)', lineHeight: 1.4, textAlign: 'left', whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
        {visibleCount.titleLine1 >= TITLE_LINE1.length && visibleCount.titleLine2 === 0 && (
          <span className="aufmacher-cursor">|</span>
        )}
        {renderTypedLine(TITLE_LINE2, visibleCount.titleLine2, TITLE_LINE2_BREAK, 't2')}
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
