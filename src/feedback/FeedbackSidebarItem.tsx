'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Enchanted } from '@/components/ui/enchanted';
import { cn } from '@/lib/utils';
import { getFeedbackConfig, submitFeedback } from './server';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function FeedbackSidebarItem() {
  const [enabled, setEnabled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState<number | null>(null);
  const [message, setMessage] = React.useState('');
  const [website, setWebsite] = React.useState('');
  const [status, setStatus] = React.useState<Status>('idle');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    getFeedbackConfig()
      .then((config) => {
        if (!cancelled && config.enabled) setEnabled(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!enabled) return null;

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      setStatus('idle');
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (rating === null) {
      setError('Please pick a rating.');
      return;
    }
    if (message.trim().length < 3) {
      setError('Please write a short message.');
      return;
    }
    setStatus('sending');
    setError(null);
    try {
      const result = await submitFeedback({
        data: {
          rating,
          message,
          page: window.location.pathname,
          website,
        },
      });
      if (result.ok) {
        setStatus('sent');
        setMessage('');
        setRating(null);
      } else {
        setStatus('error');
        setError(result.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Enchanted hoverOnly glintClassName="text-pink-500">
        <button
          type="button"
          onClick={() => handleOpenChange(true)}
          className="flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm text-muted-foreground outline-hidden transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2"
        >
          <span aria-hidden="true">🥰</span>
          Share feedback
        </button>
      </Enchanted>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          {status === 'sent' ? (
            <>
              <DialogHeader>
                <DialogTitle>Thanks for the feedback!</DialogTitle>
                <DialogDescription>
                  Your message has been sent. We appreciate you taking the time.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Share feedback</DialogTitle>
                <DialogDescription>
                  Help us make these docs better.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-1.5">
                <Label>Do you like this?</Label>
                <div className="flex gap-1.5" role="radiogroup" aria-label="Do you like this? 1 to 5">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={rating === value}
                      onClick={() => setRating(value)}
                      className={cn(
                        'flex size-9 items-center justify-center rounded-md border text-sm font-medium transition-colors',
                        rating === value
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                      )}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="feedback-message">Your feedback</Label>
                <Textarea
                  id="feedback-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="What can we improve?"
                  rows={5}
                  maxLength={2000}
                  required
                />
              </div>

              {/* Honeypot - visually hidden, bots fill it, humans never see it. */}
              <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                <label htmlFor="feedback-website">Website</label>
                <input
                  id="feedback-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <DialogFooter>
                <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send'}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
