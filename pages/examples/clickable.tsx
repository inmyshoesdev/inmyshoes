import Clickable from '../../components/ClickableItem'

const ClickableExample = () => {
  return (
    <div className="container h-screen">
      <Clickable
        action={() => console.log('hello')}
        text="Are you sure you want to proceed?"
        bg="gray-100"
        width="10rem"
        top="10%"
        left="10%"
      />
      <Clickable
        action={() => console.log('hello')}
        imageUrl="/images/bottle.jpg"
        top="24%"
        left="10%"
      />
    </div>
  )
}

export default ClickableExample
