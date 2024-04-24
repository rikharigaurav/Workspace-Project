'use client'

import { Header } from './header'
import { date, z } from 'zod'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormField,
} from '@/components/ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

import { RegisterSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardWrapper } from './card-wrapper'
import { useState, useTransition } from 'react'
import { register } from '@/action/register'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'

export const RegisterForm = () => {
  const [success, setSuccess] = useState<string | ''>('')
  const [error, setError] = useState<string | ''>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      username: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      register(values)
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
      headerLabel='Create an Account'
      backButtonHref='/login'
      backButtonLabel='Already have an account'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Username'
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Jhon Doe'
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Jhondoe@example.com'
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='********' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type='submit' className='w-full border hover:bg-black  hover:text-white'>
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  )
}
