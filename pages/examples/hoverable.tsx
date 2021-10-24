import Hoverable from '../../components/Hoverable'

const HoverableExample = () => {
  return (
    <div className="container h-screen">
      <Hoverable
        text="This is a super super super super super super super super super super super super super super long text"
        imageUrl="/images/bottle.jpg"
      />
      <Hoverable
        imageUrl="/images/bottle.jpg"
        width="5em"
        effect="pulse"
        top="10%"
        left="24%"
        text="Some bottle"
      />
      <Hoverable
        imageUrl="/images/bottle.jpg"
        width="5em"
        effect="spin"
        top="10%"
        left="34%"
        text="A bottle"
      />
      <Hoverable
        imageUrl="/images/bottle.jpg"
        width="5em"
        effect="ping"
        top="10%"
        left="44%"
        text="A bottle"
      />
      <Hoverable
        imageUrl="/images/bottle.jpg"
        width="10%"
        effect="wiggle"
        top="10%"
        left="54%"
        text="A bottle"
      />
    </div>
  )
}

export default HoverableExample

export async function getStaticProps() {
  return {
    notFound: false, // set to true when live for testing
    props: {},
  }
}
