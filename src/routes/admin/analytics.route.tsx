import { createFileRoute } from '@tanstack/react-router';
import AdminAnalytics from './analytics';

export const Route = createFileRoute('/admin/analytics')({
  component: AdminAnalytics,
});
