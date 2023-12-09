'use client'

import { useEffect } from 'react'
import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react'
import { SignUp as SignUpModal } from '@supabase/auth-ui-react'
import { useSignUp } from '@/hooks/use-sign-up'
import { Modal } from '@/components/ui/modal'

const SignUp = () => {
  const { session } = useSessionContext()
  const supabaseClient = useSupabaseClient()

  const { isOpen, onClose } = useSignUp()

  useEffect(() => {
    if (session) {
      onClose()
    }
  }, [session, onClose])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create an account"
      description="Enter your email below to create your account."
    >
      <SignUpModal
        supabaseClient={supabaseClient}
        providers={['google']}
        redirectTo="/"
        appearance={{
          style: {
            button: {
              height: '2.25rem',
              backgroundColor: 'hsl(0 0% 98%)',
              color: 'hsl(240 5.9% 10%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '500',
              fontSize: '.875rem',
              lineHeight: '1.25rem',
              boxShadow:
                'var(--tw-ring-offset-shadow,0 0 #0000), var(--tw-ring-shadow,0 0 #0000), var(--tw-shadow)',
              borderWidth: '1px',
              borderColor: 'hsl(var(--border))',
              borderRadius: 'calc(var(--radius) - 2px)',
              paddingTop: '.5rem',
              paddingRight: '1rem',
              paddingBottom: '.5rem',
              paddingLeft: '1rem',
            },
            label: {
              color: 'hsl(var(--card-foreground))',
              fontFamily: '500',
              fontSize: '.875rem',
              lineHeight: '1',
              marginBottom: '.5rem',
            },
            input: {
              height: '2.25rem',
              display: 'flex',
              fontSize: '.875rem',
              lineHeight: '1.25rem',
              boxShadow:
                'var(--tw-ring-offset-shadow,0 0 #0000), var(--tw-ring-shadow,0 0 #0000), var(--tw-shadow)',
              borderWidth: '1px',
              borderColor: 'hsl(var(--input))',
              borderRadius: 'calc(var(--radius) - 2px)',
              paddingTop: '.25rem',
              paddingRight: '.75rem',
              paddingBottom: '.25rem',
              paddingLeft: '.75rem',
            },
            anchor: {
              color: 'hsl(var(--muted-foreground))',
              fontSize: '.75rem',
              lineHeight: '1rem',
            },
            message: {
              color: 'hsl(var(--destructive))',
              fontWeight: '500',
              fontSize: '1rem',
              lineHeight: '1.5rem',
            },
          },
        }}
      />
    </Modal>
  )
}

export default SignUp
