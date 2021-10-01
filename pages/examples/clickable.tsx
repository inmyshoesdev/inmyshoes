import Clickable from '../../components/Clickable'

const ClickableExample = () => {
  return (
    <div>
      <Clickable
        action={() => {
          return
        }}
        imageUrl="/images/bottle.jpg"
        effect="pulse"
        top={96}
        left={96}
      />
    </div>
  )
}

export default ClickableExample
