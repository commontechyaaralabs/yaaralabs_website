"use client";

import { useEffect } from 'react';

interface UseLeftAlignedCheckboxOptions {
  /** Max viewport width (px) at which to enforce left alignment. Default: 640 (tailwind sm) */
  breakpointPx?: number;
  /** CSS selector to find labels to fix within the container. Default targets all labels */
  labelSelector?: string;
}

/**
 * Ensures checkbox labels render with the checkbox beside the sentence on mobile.
 * - Forces left text alignment
 * - Applies flex row with top-aligned checkbox and wrapped text
 * - Respects parent centering by overriding at the label level
 *
 * Usage:
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   useLeftAlignedCheckbox(containerRef);
 *   return <div ref={containerRef}> ... labels+checkboxes ... </div>
 */
export function useLeftAlignedCheckbox(
  containerRef: React.RefObject<HTMLElement | null>,
  options: UseLeftAlignedCheckboxOptions = {}
) {
  const { breakpointPx = 640, labelSelector = 'label' } = options;

  useEffect(() => {
    const applyFix = () => {
      const container = containerRef.current;
      if (!container) return;

      const isMobile = window.innerWidth <= breakpointPx;
      const labels = Array.from(container.querySelectorAll<HTMLLabelElement>(labelSelector));

      labels.forEach((label) => {
        if (isMobile) {
          // Force a consistent flex layout beside the sentence
          label.style.display = 'flex';
          label.style.alignItems = 'flex-start';
          label.style.gap = '0.5rem'; // Reduced gap from 0.75rem to 0.5rem
          label.style.textAlign = 'left';
          label.style.justifyContent = 'flex-start';
          label.style.width = '100%';
          label.style.margin = '0';
          label.style.padding = '0';

          // If there is a checkbox input, ensure it's properly sized and positioned
          const checkbox = label.querySelector<HTMLInputElement>('input[type="checkbox"]');
          if (checkbox) {
            checkbox.style.marginTop = '0.125rem'; // Slightly less margin
            checkbox.style.marginRight = '0';
            checkbox.style.marginLeft = '0';
            checkbox.style.flexShrink = '0'; // Prevent checkbox from shrinking
            checkbox.style.width = '16px';
            checkbox.style.height = '16px';
            checkbox.style.minWidth = '16px';
            checkbox.style.minHeight = '16px';
          }

          // Ensure text spans wrap left and take remaining space
          const spans = Array.from(label.querySelectorAll<HTMLElement>('span, p'));
          spans.forEach((el) => {
            el.style.display = 'block';
            el.style.textAlign = 'left';
            el.style.flex = '1';
            el.style.wordBreak = 'break-word';
          });
        } else {
          // On desktop, ensure proper vertical stacking and alignment
          label.style.display = 'flex';
          label.style.alignItems = 'flex-start';
          label.style.gap = '0.75rem';
          label.style.textAlign = 'left';
          label.style.justifyContent = 'flex-start';
          label.style.width = '100%';
          label.style.margin = '0';
          label.style.padding = '0';

          const checkbox = label.querySelector<HTMLInputElement>('input[type="checkbox"]');
          if (checkbox) {
            checkbox.style.marginTop = '0.25rem';
            checkbox.style.marginRight = '0';
            checkbox.style.marginLeft = '0';
            checkbox.style.flexShrink = '0';
            checkbox.style.width = '16px';
            checkbox.style.height = '16px';
            checkbox.style.minWidth = '16px';
            checkbox.style.minHeight = '16px';
          }

          const spans = Array.from(label.querySelectorAll<HTMLElement>('span, p'));
          spans.forEach((el) => {
            el.style.display = 'block';
            el.style.textAlign = 'left';
            el.style.flex = '1';
            el.style.wordBreak = 'break-word';
          });
        }
      });
    };

    applyFix();
    window.addEventListener('resize', applyFix);
    return () => window.removeEventListener('resize', applyFix);
  }, [containerRef, breakpointPx, labelSelector]);
}

export default useLeftAlignedCheckbox;


