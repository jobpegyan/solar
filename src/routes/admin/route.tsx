import { createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '@/integrations/supabase/client'
import { checkAdminRole } from '@/lib/auth.functions'
import { AdminLayout } from '@/components/AdminLayout'

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      throw redirect({
        to: '/admin/login',
        search: {
          redirect: location.href,
          error: undefined,
        },
      })
    }

    const { isAdmin } = await checkAdminRole({ data: { userId: session.user.id } })
    
    if (!isAdmin) {
      // If not admin, sign out and redirect to login
      await supabase.auth.signOut()
      throw redirect({
        to: '/admin/login',
        search: {
          redirect: '/admin',
          error: 'Unauthorized access. Admin role required.',
        },
      })
    }
  },
  component: AdminLayout
})
