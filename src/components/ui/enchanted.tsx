'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const GLINTS = [
  // perimeter
  { top: '-8px',    left: '10%',   size: 9, delay: '0s',    duration: '2.1s' },
  { top: '2px',     right: '-8px', size: 8, delay: '0.3s',  duration: '3.4s' },
  { bottom: '-7px', right: '15%',  size: 8, delay: '1.1s',  duration: '1.7s' },
  { top: '3px',     left: '-7px',  size: 7, delay: '0.7s',  duration: '2.9s' },
  { bottom: '-6px', left: '40%',   size: 6, delay: '2.2s',  duration: '2.6s' },
  { top: '-6px',    right: '35%',  size: 6, delay: '1.4s',  duration: '2.2s' },
  // inside / overlapping the child
  { top: '20%',     left: '38%',   size: 6, delay: '1.5s',  duration: '2.3s' },
  { top: '15%',     right: '22%',  size: 5, delay: '0.5s',  duration: '3.1s' },
  { bottom: '15%',  left: '22%',   size: 5, delay: '1.9s',  duration: '1.8s' },
];

function GlintIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
      <path d="M4 0.5 L4.6 3.4 L7.5 4 L4.6 4.6 L4 7.5 L3.4 4.6 L0.5 4 L3.4 3.4 Z" />
    </svg>
  );
}

export interface EnchantedProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Only show the glints while the wrapper is hovered. */
  hoverOnly?: boolean;
  /** Overrides the glint colour (defaults to text-primary). */
  glintClassName?: string;
}

export function Enchanted({ children, className, hoverOnly = false, glintClassName, ...props }: EnchantedProps) {
  return (
    <div className={cn('relative', hoverOnly && 'group/enchanted', className)} {...props}>
      {children}
      {GLINTS.map((g, i) => (
        <span
          key={i}
          className={cn(
            'pointer-events-none absolute z-10 animate-enchanted drop-shadow-[0_0_3px_currentColor]',
            glintClassName ?? 'text-primary',
            // Display toggle (not opacity) - the keyframes own opacity, and
            // re-mounting restarts the glint timeline on each hover.
            hoverOnly && 'hidden group-hover/enchanted:block',
          )}
          style={{ top: g.top, bottom: g.bottom, left: g.left, right: g.right, animationDelay: g.delay, animationDuration: g.duration }}
        >
          <GlintIcon size={g.size} />
        </span>
      ))}
    </div>
  );
}
