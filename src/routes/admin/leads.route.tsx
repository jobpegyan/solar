import { createFileRoute } from '@tanstack/react-router';
import AdminLeads from './leads';

export const Route = createFileRoute('/admin/leads')({
  component: AdminLeads,
});
