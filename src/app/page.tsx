import { Button} from '@/components/ui/button';
import {UserButton, auth} from '@clerk/nextjs';
import Link from 'next/link';
import {LogIn} from 'lucide-react';
import FileUpload from '../components/ui/FileUpload';


export default async function Home() {
  // auth verifier
  const {userId} = await auth();
  const isAuth = !!userId;
  // This will check whether user is logged in or not through clert auth
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"> 
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold"> Talking-PDF</h1>
            <UserButton afterSignOutUrl='/' />
          </div>  
          <div className='mt-2 flex'>
            {isAuth && (
              <Button>Go↗️ To CHATS</Button>
            )}
          </div>
          <p className='max-w-xl mt-1 text-lg text-white'>Start Talking to your PDF, extract information and find answers to your Relevant Questions. Research, Find, and use the tool at its full potential</p>
          
          <div className='mt-4 w-full'>
            {isAuth ? <FileUpload/> : (
              <Link href="/sign-in">
                <Button>Login to get Started!
                <LogIn className='w-4 h-4 ml-2' />
                </Button>
              </Link>
            )}
          </div>
        </div> 
      </div>
    </div>
  )
}
