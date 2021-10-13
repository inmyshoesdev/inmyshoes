import FullscreenBtn from './FullscreenBtn'
import ScreenSizeAdjustment from './ScreenSizeAdjustment'

export function DisplayControl({
  setStoredScreenWidth,
}: {
  setStoredScreenWidth: React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    <>
      <FullscreenBtn />
      <ScreenSizeAdjustment setStoredScreenWidth={setStoredScreenWidth} />
    </>
  )
}
