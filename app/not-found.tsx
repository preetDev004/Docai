import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'
import React from 'react'

const NotFound = () => {
  return (
    <MaxWidthWrapper>
        <div className="w-full mt-24 flex flex-col items-center gap-4 text-center">
          <Image
            src={"/404-page.svg"}
            alt="No Data"
            width={180}
            height={180}
          />
          <div className="flex flex-col gap-1 mt-5">
            <h1 className="font-semibold text-lg md:text-xl text-zinc-800">
              Oops!
            </h1>
            <p className="text-sm md:text-base text-gray-600">
            Looks like you&apos;ve hit a dead end.
            </p>
          </div>
        </div>
    </MaxWidthWrapper>
  )
}

export default NotFound