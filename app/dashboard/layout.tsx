import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import { Navbar } from './_components/navbar'
import { OrgSidebar } from './_components/orga-sidebar'

interface boardLayoutProps {
    children: React.ReactNode
}

const BoardLayout = async ({
    children
}: boardLayoutProps ) => {
  const session = await auth()
  return (
    <>
      <SessionProvider session={session}>
        <main className='h-full'>
          <div className='flex gap-x-3 h-full'>
            <OrgSidebar />
            <div className='h-full flex-1 bg-red-200 '>
              <Navbar />
              {children}
            </div>
          </div>
        </main>
      </SessionProvider>
    </>
  )
}

export default BoardLayout
