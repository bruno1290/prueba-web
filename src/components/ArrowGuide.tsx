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

      const straightDistance = endY - startY;
      const bendDistance = Math.max(120, straightDistance * 0.4);
      const bendStartY = startY + Math.min(bendDistance, 320);
      const bendEndY = Math.max(bendStartY + 60, endY - 80);

      const pathData = [
        `M ${startX} ${startY}`,
        `C ${startX} ${startY + 40}, ${startX} ${startY + 80}, ${startX} ${bendStartY}`,
        `L ${startX} ${bendEndY}`,
        `Q ${startX} ${endY - 40}, ${endX} ${endY - 40}`,
        `T ${endX} ${endY - 10}`
      ].join(' ');

      const headPath = `M ${endX - 16} ${endY - 30} L ${endX} ${endY} L ${endX + 16} ${endY - 30} Z`;

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
        strokeWidth={6}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d={paths.head} fill={GREEN} />
    </svg>
  );
}
