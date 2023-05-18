import { getUser } from '@/lib/auth'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Profile() {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatarUrl}
        alt=""
        quality={100}
        priority
        width={40}
        height={40}
        className="h-12 w-12 rounded-full transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
      />

      <p className="max-w-[140px] text-sm leading-snug">
        {name}
        <Link
          href=""
          className="group block text-red-400 transition-colors hover:text-red-500"
        >
          <LogOut className="mr-1 inline h-4 w-4 text-red-400 transition-colors group-hover:text-red-500" />
          Quero sair
        </Link>
      </p>
    </div>
  )
}
