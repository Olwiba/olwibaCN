import { createServerFn } from '@tanstack/react-start';
import {
  deliverFeedback,
  feedbackEnabled,
  validateFeedbackSubmission,
  type FeedbackResult,
  type FeedbackSubmission,
} from './submission';

export type { FeedbackResult, FeedbackSubmission };

export const getFeedbackConfig = createServerFn({ method: 'GET' }).handler(async () =>
  feedbackEnabled(),
);

export const submitFeedback = createServerFn({ method: 'POST' })
  .inputValidator(validateFeedbackSubmission)
  .handler(async ({ data }): Promise<FeedbackResult> => deliverFeedback(data));
