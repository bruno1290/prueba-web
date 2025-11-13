import { useEffect, useState } from 'react';

type ArrowPaths = {
  line: string;
  head: string;
  visible: boolean;
};

const GREEN = '#00D563';

export default function ArrowGuide() {
  const [paths, setPaths] = useState<ArrowPaths>({ line: '', head: '', visible: false });

  useEffect(() => {
    let frame: number | null = null;

    const updatePaths = () => {
      const startEl = document.getElementById('hero-sell-button');
      const endEl = document.getElementById('contact-heading');

      if (!startEl || !endEl) {
        setPaths({ line: '', head: '', visible: false });
        return;
      }

      const startRect = startEl.getBoundingClientRect();
      const endRect = endEl.getBoundingClientRect();

      const startX = startRect.left + startRect.width / 2;
      const startY = startRect.top + startRect.height / 2;
      const endX = endRect.left + endRect.width / 2;
      const endY = endRect.top;

      const viewportWidth = window.innerWidth;
      const horizontalOffset = Math.max(160, viewportWidth * 0.18);
      const anchorX = startX + horizontalOffset;
      const verticalHold = Math.max(120, (endY - startY) * 0.5);
      const anchorBottomY = Math.max(startY + verticalHold, endY - 140);

      const pathData = [
        `M ${startX} ${startY}`,
        `C ${startX + 60} ${startY - 30}, ${startX + horizontalOffset * 0.35} ${startY + 10}, ${anchorX} ${startY + 80}`,
        `S ${anchorX} ${startY + 180}, ${anchorX} ${anchorBottomY}`,
        `Q ${anchorX} ${endY - 60}, ${endX + 90} ${endY - 35}`,
        `T ${endX} ${endY}`
      ].join(' ');

      const headWidth = 34;
      const headHeight = 26;
      const headPath = [
        `M ${endX + headWidth} ${endY - headHeight / 2}`,
        `Q ${endX + headWidth - 10} ${endY}, ${endX + headWidth} ${endY + headHeight / 2}`,
        `Q ${endX + headWidth - 6} ${endY + headHeight / 2 + 4}, ${endX + headWidth - 18} ${endY + headHeight / 2}`,
        `L ${endX} ${endY}`,
        `L ${endX + headWidth - 18} ${endY - headHeight / 2}`,
        `Q ${endX + headWidth - 6} ${endY - headHeight / 2 - 4}, ${endX + headWidth} ${endY - headHeight / 2}`,
        'Z'
      ].join(' ');

      setPaths({ line: pathData, head: headPath, visible: true });
    };

    const requestFrame = () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      frame = requestAnimationFrame(updatePaths);
    };

    requestFrame();
    window.addEventListener('scroll', requestFrame, { passive: true });
    window.addEventListener('resize', requestFrame);

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', requestFrame);
      window.removeEventListener('resize', requestFrame);
    };
  }, []);

  if (!paths.visible) {
    return null;
  }

  return (
    <svg
      className="pointer-events-none fixed inset-0 z-40"
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <path
        d={paths.line}
        stroke={GREEN}
        strokeWidth={10}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d={paths.head} fill={GREEN} />
    </svg>
  );
}
