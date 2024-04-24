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
import { ResetSchema } from '@/schema'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { useState, useTransition } from 'react'
import { reset } from '@/action/reset'

export const ResetForm = () => {

  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      reset(values)
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
      headerLabel='Reset your password'
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
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='email'
                          {...field}
                          disabled={isPending}
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
              Send Reset Email
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}
