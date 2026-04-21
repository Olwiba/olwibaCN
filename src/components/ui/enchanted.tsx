'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const GLINTS = [
  // perimeter
  { top: '-7px',    left: '10%',  size: 7, delay: '0s',    duration: '2.1s' },
  { top: '2px',     right: '-7px', size: 6, delay: '0.3s', duration: '3.4s' },
  { bottom: '-6px', right: '15%', size: 6, delay: '1.1s',  duration: '1.7s' },
  { top: '3px',     left: '-6px', size: 5, delay: '0.7s',  duration: '2.9s' },
  // inside / overlapping the child
  { top: '20%',     left: '38%',  size: 5, delay: '1.5s',  duration: '2.3s' },
  { top: '15%',     right: '22%', size: 4, delay: '0.5s',  duration: '3.1s' },
  { bottom: '15%',  left: '22%',  size: 4, delay: '1.9s',  duration: '1.8s' },
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
}

export function Enchanted({ children, className, ...props }: EnchantedProps) {
  return (
    <div className={cn('relative', className)} {...props}>
      {children}
      {GLINTS.map((g, i) => (
        <span
          key={i}
          className="pointer-events-none absolute z-10 text-primary animate-enchanted"
          style={{ top: g.top, bottom: g.bottom, left: g.left, right: g.right, animationDelay: g.delay, animationDuration: g.duration }}
        >
          <GlintIcon size={g.size} />
        </span>
      ))}
    </div>
  );
}
