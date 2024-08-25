
import Link from 'next/link'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'

const CommonBanner = ({ title, image }: any) => {
  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      className="relative h-56 w-full bg-cover bg-center before:absolute before:top-0 before:left-0 before:-z-0 before:h-full before:w-full before:bg-[rgba(0,0,0,.6)] before:content-[''] "
    >
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center text-white">
        <h1 className="mb-6 text-3xl font-bold tracking-wide md:text-5xl">
          {title}
        </h1>
        <div className="flex items-center justify-center gap-2">
          <Link href="/home">
            <p className=" cursor-pointer hover:text-theme_light">Home</p>
          </Link>
          <MdKeyboardDoubleArrowRight className="!text-white" />
          <p>{title}</p>
        </div>
      </div>
    </div>
  )
}

export default CommonBanner