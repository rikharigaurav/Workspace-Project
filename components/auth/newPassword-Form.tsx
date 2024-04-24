'use client'

import { CardWrapper } from '@/components/auth/card-wrapper'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { NewPasswordSchema } from '@/schema'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { newPassword } from '@/action/new-password'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'

export const NewPasswordForm = () => {

  const SearchParams = useSearchParams();
  const token = SearchParams.get("token")

  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      newPassword(values)
        .then((data) => {
          if (data?.error) {
            form.reset()
            setError(data.error)
          }
          if (data?.success) {
            form.reset()
            setSuccess(data.success)
          }
        })
        .catch(() => {
          setError('Something went wrong!')
        })
    })
  }

  return (
    <CardWrapper
      headerLabel='Enter New Password'
      backButtonHref='/login'
      backButtonLabel="back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4 '>
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='password'
                          {...field}
                          disabled={isPending}
                          type='password'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
              </>
            )}
          </div>
          <div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type='submit'
            variant='secondary'
            className='w-full'>
              Reset Password
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}
