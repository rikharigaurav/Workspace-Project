const authLayout = ({
    children
}: any) => {
    return (
      <div className='h-full w-full items-center justify-center flex bg-cyan-200 '>
        <div className="bg-white rounded-md">
        {children}
        </div>
      </div>
    )
} 

export default authLayout;  