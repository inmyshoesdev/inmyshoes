import Toastable from '../../components/Toastable'

const ToastableExample = () => {
  return (
    <div className="container h-screen">
      <Toastable
        text="Are you sure you want to proceed?"
        imageUrl="/images/bottle.jpg"
        top="10%"
        left="10%"
      />
      <Toastable
        text="This is bad..."
        imageUrl="/images/bottle.jpg"
        top="24%"
        left="10%"
      />
    </div>
  )
}

export default ToastableExample

export async function getStaticProps() {
  return {
    notFound: process.env.NODE_ENV === 'production',
    props: {},
  }
}
