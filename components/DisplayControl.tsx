import FullscreenBtn from './FullscreenBtn'
import ScreenSizeAdjustment from './ScreenSizeAdjustment'

export function DisplayControl({
  setSizeAdjustment,
}: {
  setSizeAdjustment: React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    <>
      <FullscreenBtn />
      <ScreenSizeAdjustment setSizeAdjustment={setSizeAdjustment} />
    </>
  )
}
