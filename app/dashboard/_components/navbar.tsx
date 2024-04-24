'use client'

import { UserButton } from '@/components/auth/user-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SearchInput } from './search-input'

export const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className='bg-secondary flex justify-between items-center p-4 m-2 rounded-xl w-[90%] shadow sm'>
      <div className='flex gap-x-2'>
        <Button asChild variant={pathname === '/board' ? 'ghost' : 'outline'}>
          <Link href='/board'>Boards</Link>
        </Button>
      </div>
      <div className='justify-center items-center'>
      <SearchInput />
      </div>
      <UserButton />
    </nav>
  )
}
