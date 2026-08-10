import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  component: () => <div>Root Page (should be handled by index.tsx)</div>,
});
