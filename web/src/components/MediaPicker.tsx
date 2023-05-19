'use client'

import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])
    console.log(previewURL)

    setPreview(previewURL)
  }

  return (
    <>
      <input
        type="file"
        id="media"
        name="coverUrl"
        accept="image/*"
        className="invisible h-0 w-0"
        onChange={onFileSelected}
      />

      {preview && (
        <Image
          src={preview}
          alt=""
          width={780}
          height={420}
          quality={100}
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
