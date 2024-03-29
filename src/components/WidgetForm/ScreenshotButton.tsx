import { Camera, Trash } from 'phosphor-react'
import html2canvas from 'html2canvas'
import { useState } from 'react'
import { Loading } from './Loading'

type ScreenshotButtonProps = {
  screenshot: string | null;
  onScreenshotTook: (screenshot: string | null) => void;
}

function ScreenshotButton ({ onScreenshotTook, screenshot }: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  async function handleTakeScreenshot () {
    setIsTakingScreenshot(true)

    const canvas = await html2canvas(document.querySelector('html')!)
    const base64img = canvas.toDataURL('image/png')

    onScreenshotTook(base64img)
    setIsTakingScreenshot(false)
  }

  if (screenshot) {
    return (
      <button
        type='button'
        onClick={() => onScreenshotTook(null)}
        className='p-1 w-10 h-10 rounded-[4px] border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors'
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180
        }}
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button
      type='button'
      onClick={handleTakeScreenshot}
      className='p-2 bg-zinc-800 rounded-[4px] border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors'
    >
      {isTakingScreenshot ? <Loading /> : <Camera className='w-6 h-6' /> }
    </button>
  )
}

export { ScreenshotButton }
