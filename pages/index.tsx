import Link from 'next/link'
import Head from 'next/head'
import { useEffect } from 'react'
import { useToast } from '@chakra-ui/toast'
import { Box } from '@chakra-ui/layout'

export default function Landing(): JSX.Element {
  const toast = useToast()
  useEffect(() => {
    toast({
      render: () => (
        <Box color="white" p={3} bg="green.500">
          In My Shoes will be presented at NUS School of Computing Term Project
          Showcase! Register{' '}
          <a
            className="underline cursor-pointer"
            href="https://uvents.nus.edu.sg/event/19th-steps/registration"
          >
            here
          </a>{' '}
          and vote for us!
        </Box>
      ),
      status: 'success',
      duration: 10000,
      position: 'bottom',
    })
  }, [])

  useEffect(() => {
    var scrollToTopBtn = document.querySelector(
      '.scrollToTopBtn'
    ) as HTMLElement
    var rootElement = document.documentElement
    const scrollFunction = () => {
      if (rootElement.scrollTop > 300) {
        // Show button
        scrollToTopBtn.classList.add('showBtn')
      } else {
        // Hide button
        scrollToTopBtn.classList.remove('showBtn')
      }
    }

    function scrollToTop() {
      rootElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    scrollToTopBtn.addEventListener('click', scrollToTop)
    window.onscroll = function () {
      scrollFunction()
    }
  })
  return (
    <>
      <Head>
        <title>In My Shoes</title>
        <meta name="description" content="In My Shoes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header
          className="body-font bg-r-bg"
          style={{
            textDecoration: 'none !important',
          }}
        >
          <div className="container flex flex-col flex-wrap items-center mx-auto p-5 md:flex-row">
            <a
              className="text-gray-9xl flex items-center mb-4 md:mb-0"
              href="https://soristic.asia/"
              target="_blank"
              rel="noreferrer"
            >
              <img alt="logo" src="/favicon.ico" />
            </a>
            <nav className="font-joe flex flex-wrap items-center justify-center text-base md:ml-auto">
              <a
                className="mr-5 px-4 py-2 hover:text-white hover:bg-blue-900 rounded-full cursor-pointer"
                href="#home"
              >
                Home
              </a>
              <a
                className="mr-5 px-4 py-2 hover:text-white hover:bg-blue-900 rounded-full cursor-pointer"
                href="#walkthrough"
              >
                Walkthrough
              </a>
              <a
                className="mr-5 px-4 py-2 hover:text-white hover:bg-blue-900 rounded-full cursor-pointer"
                href="#features"
              >
                Features
              </a>
              <a
                className="mr-5 px-4 py-2 hover:text-white hover:bg-blue-900 rounded-full cursor-pointer"
                href="#goals"
              >
                Goals
              </a>
              <a
                className="mr-5 px-4 py-2 hover:text-white hover:bg-blue-900 rounded-full cursor-pointer"
                href="#testimonials"
              >
                Testimonials
              </a>
            </nav>
            <Link href="/youth">
              <a className="bg-r-button shadow-button inline-flex items-center mt-4 px-3 py-1 text-white hover:bg-purple-400 border-0 rounded cursor-pointer md:mt-0">
                Simulation
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="ml-1 w-4 h-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </Link>
          </div>
        </header>
        <section
          id="home"
          className="body-font bg-auto"
          style={{
            backgroundImage: `url('https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/landing/topbg.png')`,
            objectFit: 'cover',
            backgroundSize: 'cover',
          }}
        >
          <div className="container flex flex-col items-center mx-auto pt-16 px-5 md:flex-row">
            <div className="flex flex-col items-center mb-16 text-center font-bold sm:w-1/2 md:items-start md:mb-0 md:pr-16 md:text-left lg:pr-24 lg:w-1/2">
              <h1 id="brand" className="mb-4 text-3xl sm:text-4xl">
                In <span id="brand-middle">My</span> Shoes
              </h1>
              <p className="mb-8 text-xl leading-relaxed">
                Live through the daily lives of the characters and understand
                the challenges they face by placing yourself in their shoes.
              </p>
              <div className="flex md:flex-col lg:flex-row">
                <Link href="/youth">
                  <a className="bg-r-button shadow-button flex flex-col items-center ml-4 mt-0 px-5 py-3 text-white font-normal leading-none hover:bg-purple-400 rounded cursor-pointer md:ml-0 md:mt-4 lg:ml-4 lg:mt-0">
                    <span className="flex cursor-pointer">
                      Simluation
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="ml-1 w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#CADFDF"
              fillOpacity="1"
              d="M0,96L120,106.7C240,117,480,139,720,149.3C960,160,1200,160,1320,160L1440,160L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </section>
        <section className="body-font bg-HTP-bg text-gray-600">
          <div className="container mx-auto px-5 py-10">
            <div className="mb-20 text-center"></div>
            <div className="flex flex-wrap justify-center -mb-10 -mt-4 -mx-4 space-y-6 sm:-m-4 md:space-y-0">
              <div className="flex flex-col items-center p-4 text-center md:w-1/4">
                <div className="inline-flex flex-shrink-0 items-center justify-center mb-5">
                  <img
                    alt="htp-1"
                    src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/landing/4.png"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-black text-base font-bold leading-relaxed">
                    Select a character and make decisions based on the
                    circumstances faced.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <img
                  alt="htp-arrow-1"
                  className="transform rotate-90 sm:rotate-0"
                  src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/landing/arrow.svg"
                />
              </div>
              <div className="flex flex-col items-center p-4 text-center md:w-1/4">
                <div className="inline-flex flex-shrink-0 items-center justify-center mb-5">
                  <img
                    alt="htp-2"
                    src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/landing/5.png"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-black text-base font-bold leading-relaxed">
                    Reflect on your emotions and think of how you can help.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <img
                  alt="htp-arrow-2"
                  className="transform rotate-90 sm:rotate-0"
                  src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/landing/arrow.svg"
                />
              </div>
              <div className="flex flex-col items-center p-4 text-center md:w-1/4">
                <div className="inline-flex flex-shrink-0 items-center justify-center mb-5">
                  <img
                    alt="htp-3"
                    src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/landing/6.png"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-black text-base font-bold leading-relaxed">
                    Lastly, take action to build an inclusive society!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#FFF7F3"
              fillOpacity="1"
              d="M0,96L120,128C240,160,480,224,720,234.7C960,245,1200,203,1320,181.3L1440,160L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </section>
        <section className="body-font bg-r-bg text-gray-600" id="walkthrough">
          <div className="p-4">
            <div className="mb-20 text-center">
              <h1 className="sectionTitle mb-4 text-red-800 text-2xl sm:text-4xl">
                Simulation Walkthrough
              </h1>
            </div>
            <div className="">
              <div className="flex flex-col grid-cols-12 text-gray-50 md:grid">
                <div className="flex md:contents">
                  <div className="relative col-end-4 col-start-2 mr-10 md:mx-auto">
                    <div className="flex items-center justify-center w-6 h-full">
                      <div className="w-1 h-full bg-green-500 pointer-events-none"></div>
                    </div>
                    <div className="absolute top-1/2 -mt-3 w-6 h-6 text-center bg-green-500 rounded-full shadow"></div>
                  </div>
                  <div className="col-end-12 col-start-4 mr-auto my-4 p-4 w-5/6 bg-green-500 rounded-xl shadow-md">
                    <h3 className="mb-1 text-lg font-semibold">
                      Tell us about yourself
                    </h3>
                    <h2>
                      Before you start the game, you will be asked to fill in
                      some details about your age and gender. This is anonymous
                      and will only be used to make sure we are creating
                      age-appropriate content.
                    </h2>
                  </div>
                </div>

                <div className="flex md:contents">
                  <div className="relative col-end-4 col-start-2 mr-10 md:mx-auto">
                    <div className="flex items-center justify-center w-6 h-full">
                      <div className="w-1 h-full bg-green-500 pointer-events-none"></div>
                    </div>
                    <div className="absolute top-1/2 -mt-3 w-6 h-6 text-center bg-green-500 rounded-full shadow"></div>
                  </div>
                  <div className="col-end-12 col-start-4 mr-auto my-4 p-4 w-5/6 bg-green-500 rounded-xl shadow-md">
                    <h3 className="mb-1 text-lg font-semibold">
                      Understand the objective
                    </h3>
                    <h2>
                      There is no single objective for the simulation, as
                      success means different things to different people There
                      is a bigger point, though - the simulation is designed to
                      help you understand different lives.
                    </h2>
                  </div>
                </div>
                <div className="flex md:contents">
                  <div className="relative col-end-4 col-start-2 mr-10 md:mx-auto">
                    <div className="flex items-center justify-center w-6 h-full">
                      <div className="w-1 h-full bg-green-500 pointer-events-none"></div>
                    </div>
                    <div className="absolute top-1/2 -mt-3 w-6 h-6 text-center bg-green-500 rounded-full shadow">
                      <i className="fas fa-exclamation-circle text-gray-400"></i>
                    </div>
                  </div>
                  <div className="col-end-12 col-start-4 mr-auto my-4 p-4 w-5/6 bg-green-500 rounded-xl shadow-md">
                    <h3 className="mb-1 text-lg font-semibold">
                      Choose a character
                    </h3>
                    <h2>
                      Now we&apos;re getting started! You&apos;ll try all three
                      but you can choose between Arthur (mental health), Belinda
                      (learning disabilities) or Curtis (low-income) first.
                    </h2>
                  </div>
                </div>
                <div className="flex md:contents">
                  <div className="relative col-end-4 col-start-2 mr-10 md:mx-auto">
                    <div className="flex items-center justify-center w-6 h-full">
                      <div className="w-1 h-full bg-green-500 pointer-events-none"></div>
                    </div>
                    <div className="absolute top-1/2 -mt-3 w-6 h-6 text-center bg-green-500 rounded-full shadow">
                      <i className="fas fa-exclamation-circle text-gray-400"></i>
                    </div>
                  </div>
                  <div className="col-end-12 col-start-4 mr-auto my-4 p-4 w-5/6 bg-green-500 rounded-xl shadow-md">
                    <h3 className="mb-1 text-lg font-semibold">
                      Read your character profile
                    </h3>
                    <h2>
                      Each character has a very specific backstory. (Don&apos;t
                      worry: you can click on the profile icon in the bottom
                      left to remind yourself.) Have a think about what life as
                      this character would be like - and how it is similar or
                      different to yours.
                    </h2>
                  </div>
                </div>
                <div className="flex md:contents">
                  <div className="relative col-end-4 col-start-2 mr-10 md:mx-auto">
                    <div className="flex items-center justify-center w-6 h-full">
                      <div className="w-1 h-full bg-green-500 pointer-events-none"></div>
                    </div>
                    <div className="absolute top-1/2 -mt-3 w-6 h-6 text-center bg-green-500 rounded-full shadow">
                      <i className="fas fa-times-circle text-white"></i>
                    </div>
                  </div>
                  <div className="col-end-12 col-start-4 mr-auto my-4 p-4 w-5/6 bg-green-500 rounded-xl shadow-md">
                    <h3 className="mb-1 text-gray-50 text-lg font-semibold">
                      Ready... set... go!
                    </h3>
                    <h2>
                      You&apos;re now ready to start the game. You will be
                      presented with a series of situations and have to choose
                      your (character&apos;s) response to each.
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#F0F8FF"
              fillOpacity="1"
              d="M0,224L120,224C240,224,480,224,720,213.3C960,203,1200,181,1320,170.7L1440,160L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </section>
        <section
          className="body-font text-gray-600"
          id="features"
          style={{
            backgroundColor: '#F0F8FF',
          }}
        >
          <h1 className="sectionTitle text-center text-2xl sm:text-4xl">
            Features
          </h1>
          <div className="container mx-auto px-5 py-10">
            <div className="flex flex-col items-center mb-10 mx-auto pb-10 border-b border-gray-200 sm:flex-row lg:w-3/5">
              <div className="inline-flex flex-shrink-0 items-center justify-center w-48 h-20 sm:mr-10 sm:w-80 sm:h-48">
                <img
                  src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/curtis-background-home.jpg"
                  alt="background"
                />
              </div>
              <div className="flex-grow mt-6 text-center sm:mt-0 sm:text-left">
                <h2 className="mb-2 text-gray-900 text-xl font-semibold">
                  Illustrations
                </h2>
                <p className="leading-relaxed">
                  Background scenes and choices are illustrated to provide a
                  more visual experience.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center mb-10 mx-auto pb-10 border-b border-gray-200 sm:flex-row lg:w-3/5">
              <div className="flex-grow mt-6 text-center sm:mt-0 sm:text-left">
                <h2 className="mb-2 text-gray-900 text-xl font-semibold">
                  Carefully Crafted Storylines
                </h2>
                <p className="leading-relaxed">
                  Each character has a unique backstory and a curated set of
                  scenarios. Different choices are available and can lead to
                  different outcomes.
                </p>
              </div>
              <div className="inline-flex flex-shrink-0 items-center justify-center order-first w-48 h-20 sm:order-none sm:ml-10 sm:w-80 sm:h-48">
                <img
                  src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/curtis-intro-family-image.jpg"
                  alt="intro"
                />
              </div>
            </div>
            <div className="flex flex-col items-center mb-10 mx-auto pb-10 border-b border-gray-200 sm:flex-row lg:w-3/5">
              <div className="inline-flex flex-shrink-0 items-center justify-center w-20 h-40 sm:mr-10 sm:w-24 sm:h-48">
                <img
                  src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/wealth-badge.png"
                  alt="badges"
                  className="object-contain"
                />
              </div>
              <div className="flex-grow mt-6 text-center sm:mt-0 sm:text-left">
                <h2 className="mb-2 text-gray-900 text-xl font-semibold">
                  Badges & Indicators
                </h2>
                <p className="leading-relaxed">
                  The choices in each scenario present compromises/sacrifices.
                  They have an impact on the character that you are playing and
                  it&apos; worth looking out for the changes that are brought
                  forth by the actions taken.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center mx-auto sm:flex-row lg:w-3/5">
              <div className="inline-flex flex-shrink-0 items-center justify-center w-48 h-20 sm:mr-10 sm:w-80 sm:h-48">
                <img
                  src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/workshop.png"
                  alt="workshop"
                />
              </div>
              <div className="flex-grow mt-6 text-center sm:mt-0 sm:text-left">
                <h2 className="mb-2 text-gray-900 text-lg font-semibold">
                  Empathy Workshop & Curriculum
                </h2>
                <p className="leading-relaxed">
                  Besides developing the online simulation that allows users to
                  live through the daily lives of the characters and understand
                  the challenges they face, Soristic also develops workshop
                  curriculum to enable workshop participants to further develop
                  an empathetic and inclusive mindset that will not only make
                  them better future leaders but also contribute to a more
                  inclusive society.
                </p>
                <a
                  className="inline-flex items-center mt-3 text-pink-500"
                  href="https://inmyshoes.asia/workshops/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="ml-2 w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#EDE9FE"
              fillOpacity="1"
              d="M0,224L120,224C240,224,480,224,720,213.3C960,203,1200,181,1320,170.7L1440,160L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </section>
        <section
          id="goals"
          className="body-font relative bg-purple-100 overflow-hidden"
        >
          <div className="container mx-auto px-5 py-10">
            <div className="flex flex-wrap mx-auto">
              <div className="mb-6 w-full lg:mb-0 lg:pr-10 lg:py-6 lg:w-1/2">
                <img
                  className="-ml-12"
                  alt="sustainable"
                  src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/landing/sustainable.png"
                />
                <div className="flex mb-4">
                  <img
                    alt="E_SDG-goals_icons-individual-rgb-10"
                    className="px-1 py-2 w-24 h-28 md:w-40 md:h-48"
                    src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/landing/E_SDG-goals_icons-individual-rgb-10.png"
                  />
                  <img
                    alt="E_SDG-goals_icons-individual-rgb-11"
                    className="px-1 py-2 w-24 h-28 md:w-40 md:h-48"
                    src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/landing/E_SDG%20goals_icons-individual-rgb-11.png"
                  />
                  <img
                    alt="E_SDG-goals_icons-individual-rgb-16"
                    className="px-1 py-2 w-24 h-28 md:w-40 md:h-48"
                    src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/landing/E_SDG%20goals_icons-individual-rgb-16.png"
                  />
                </div>
                <h1 className="mb-4 text-gray-900 font-serif text-2xl font-bold">
                  Supporting United Nation Sustainable Development Goals{' '}
                  <span className="text-pink-500">10</span>,{' '}
                  <span className="text-yellow-500">11</span> &{' '}
                  <span className="text-blue-500">16</span>
                </h1>
                <p className="mb-4 text-lg leading-relaxed">
                  The character simulation enables participants to empathise
                  with others&apos; life experiences and develop an inclusive
                  mindset.
                </p>
              </div>
              <img
                alt="goals"
                className="w-full object-cover object-center md:w-1/2"
                id="goals"
                src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/landing/goals.png"
              />
            </div>
          </div>
        </section>
        <section className="body-font bg-purple-100 overflow-hidden">
          <h1 className="sectionTitle container mx-auto text-center text-gray-900 text-3xl">
            Benefits Of Instilling An Inclusive Mindset
          </h1>
          <div className="ferris-wrapper">
            <img
              className="absolute left-80 top-96 mt-28 w-72 h-72"
              alt="spinner-center"
              src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/landing/benefits%20of%20inclusive%20mindset.png"
            />
            <div className="wheel-wrapper">
              <div className="wheel">
                <div className="cabin flex items-center justify-center w-40 h-40 text-white text-lg bg-purple-900 rounded-full">
                  Higher <br /> Emotional <br /> Quotient
                </div>
                <div className="cabin flex items-center justify-center w-40 h-40 text-white text-lg bg-purple-900 rounded-full">
                  Increase <br /> Resilience
                </div>
                <div className="cabin flex items-center justify-center w-40 h-40 text-white text-lg bg-purple-900 rounded-full">
                  Effective <br /> Leadership
                </div>
                <div className="cabin flex items-center justify-center w-40 h-40 text-white text-lg bg-purple-900 rounded-full">
                  Wellbeing
                </div>
                <div className="cabin flex items-center justify-center w-40 h-40 text-white text-lg bg-purple-900 rounded-full">
                  Broaden Perspective
                </div>
                <div className="cabin flex items-center justify-center w-40 h-40 text-white text-lg bg-purple-900 rounded-full">
                  Creativity and innovation
                </div>
              </div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#E5E7EB"
              fillOpacity="1"
              d="M0,160L120,176C240,192,480,224,720,202.7C960,181,1200,107,1320,69.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </section>

        <section
          className="body-font text-gray-600 bg-gray-200"
          id="testimonials"
        >
          <div className="container mx-auto px-5 py-10">
            <div className="mb-20 text-center">
              <h1 className="sectionTitle mb-4 text-gray-900 text-2xl sm:text-3xl">
                Feedback From Our Participants
              </h1>
            </div>
            <div className="flex flex-wrap -mb-10 -mt-4 -mx-4 space-y-6 sm:-m-4 md:space-y-0">
              <div className="flex flex-col items-center p-4 text-center md:w-1/3">
                <div className="inline-flex flex-shrink-0 items-center justify-center mb-5 md:w-60 md:h-60">
                  <img
                    alt="stat1"
                    src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/landing/stats%201.png"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="mb-3 text-gray-900 font-serif text-7xl">
                    90.5%
                  </h2>
                  <p className="text-base font-bold leading-relaxed">
                    enjoyed the simulation
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center p-4 text-center md:w-1/3">
                <div className="inline-flex flex-shrink-0 items-center justify-center mb-5 md:w-60 md:h-60">
                  <img
                    alt="stat2"
                    src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/landing/stats%202.png"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="mb-3 text-gray-900 font-serif text-7xl">
                    85.7%
                  </h2>
                  <p className="text-base font-bold leading-relaxed">
                    want to be more inclusive in their relationships
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center p-4 text-center md:w-1/3">
                <div className="inline-flex flex-shrink-0 items-center justify-center mb-5 md:w-60 md:h-60">
                  <img
                    alt="stat3"
                    src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/landing/stats%203.png"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="mb-3 text-gray-900 font-serif text-7xl">
                    85.7%
                  </h2>
                  <p className="text-base font-bold leading-relaxed">
                    became more aware of inequalities
                  </p>
                </div>
              </div>
            </div>
            <span className="flex justify-center mt-32 mx-auto w-72 h-1 bg-black rounded"></span>
          </div>
        </section>
        <section className="body-font text-gray-600 bg-gray-200">
          <div className="container mx-auto px-5 py-4">
            <div className="mx-auto w-full text-center lg:w-3/4 xl:w-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block mb-8 w-16 h-16 text-gray-400"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
              </svg>
              <p className="mx-auto max-w-64 text-lg leading-relaxed">
                Having greater awareness of the special circumstances these
                individuals may live in provides better understanding on why we
                should be unassuming of the difficulties others may experience,
                and to be more empathetic and kind even to others.
              </p>
              <h1 className="mt-8 text-gray-900 text-xl tracking-wider">
                - Participant
              </h1>
            </div>
          </div>
        </section>
        <footer className="body-font bg-footer-blue text-white">
          <div className="container flex flex-col flex-wrap mx-auto px-5 py-24 md:flex-row md:flex-nowrap md:items-center lg:items-start">
            <div className="flex-shrink-0 mx-auto w-64 text-center md:mx-0 md:text-left">
              <a
                className="text-whixl flex items-center justify-center md:justify-start"
                href="https://soristic.asia/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  alt="logo"
                  src="https://soristic.sgp1.cdn.digitaloceanspaces.com/assets/WhiteIMSLogo.png"
                />
              </a>
            </div>
            <div className="flex flex-grow flex-wrap -mb-10 mt-10 text-center md:mt-0 md:pl-20 md:text-left">
              <div className="px-4 w-full md:w-1/2 lg:w-1/4">
                <h2 className="mb-3 text-xl tracking-widest">
                  Simulation Development
                </h2>
                <nav className="mb-10 list-none">
                  <li>
                    <a
                      href="https://soristic.asia/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Soristic Impact Collective
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://nus.edu/3Bv5k42"
                      target="_blank"
                      rel="noreferrer"
                    >
                      A CS3216 Project
                    </a>
                  </li>
                </nav>
              </div>
              <div className="px-4 w-full md:w-1/2 lg:w-1/4">
                <h2 className="mb-3 text-xl tracking-widest">
                  Design and Illustration
                </h2>
                <nav className="mb-10 list-none">
                  <li>Storyset and Canva</li>
                </nav>
              </div>
              <div className="px-4 w-full md:w-1/2 lg:w-1/4">
                <h2 className="mb-3 text-xl tracking-widest">Disclaimer:</h2>
                <p>
                  The simulation events are compressed and simplified and may
                  not fully reflect the daily experience of one.
                </p>
              </div>
              <div className="px-4 w-full md:w-1/2 lg:w-1/4">
                <h2 className="mb-3 text-xl tracking-widest">Contact Us</h2>
                <nav className="mb-10 list-none">
                  <li>
                    <a href="mailto:connect@soristic.asia">
                      connect@soristic.asia
                    </a>
                  </li>
                </nav>
                <span className="inline-flex justify-center mt-2 sm:justify-start sm:ml-auto sm:mt-0">
                  <a
                    href="https://www.facebook.com/soristic/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-10 h-10 cursor-pointer"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a
                    className="ml-3"
                    href="https://www.youtube.com/channel/UCInOVLg0CFcyexvUtMkFCgQ"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      fill="currentColor"
                      className="w-10 h-10 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.279 13.52h-.939v5.027h-.908v-5.027h-.94v-.854h2.788v.854zm5.395 1.721v2.406c0 .537-.2.954-.736.954-.296 0-.541-.108-.767-.388v.333h-.813v-5.88h.813v1.893c.183-.222.429-.405.718-.405.59 0 .785.499.785 1.087zm-.83.049c0-.146-.027-.257-.086-.333-.098-.129-.279-.143-.42-.071l-.167.132v2.703l.19.153c.132.066.324.071.413-.045.046-.061.069-.161.069-.299v-2.24zm-2.347-5.859c.229 0 .354-.183.354-.431v-2.119c0-.255-.111-.434-.371-.434-.237 0-.353.185-.353.434v2.119c.001.24.137.431.37.431zm-.733 8.07c-.099.123-.317.325-.475.325-.172 0-.215-.118-.215-.292v-3.325h-.805v3.626c0 .88.597.885 1.031.636.16-.092.315-.227.464-.403v.479h.807v-4.338h-.807v3.292zm13.236-12.501v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5zm-10.566 4.427c0 .45.137.813.592.813.256 0 .611-.133.979-.569v.503h.847v-4.554h-.847v3.457c-.104.129-.333.341-.498.341-.182 0-.226-.124-.226-.307v-3.491h-.847v3.807zm-3.177-2.621v2.233c0 .803.419 1.22 1.24 1.22.682 0 1.218-.456 1.218-1.22v-2.233c0-.713-.531-1.224-1.218-1.224-.745 0-1.24.493-1.24 1.224zm-3.155-2.806l1.135 3.67v2.504h.953v-2.504l1.11-3.67h-.969l-.611 2.468-.658-2.468h-.96zm11.564 11.667c-.014-2.978-.232-4.116-2.111-4.245-1.734-.118-7.377-.118-9.109 0-1.876.128-2.098 1.262-2.111 4.245.014 2.978.233 4.117 2.111 4.245 1.732.118 7.375.118 9.109 0 1.877-.129 2.097-1.262 2.111-4.245zm-1.011-.292v1.104h-1.542v.818c0 .325.027.607.352.607.34 0 .36-.229.36-.607v-.301h.83v.326c0 .836-.358 1.342-1.208 1.342-.771 0-1.164-.561-1.164-1.342v-1.947c0-.753.497-1.275 1.225-1.275.773-.001 1.147.491 1.147 1.275zm-.83-.008c0-.293-.062-.508-.353-.508-.299 0-.359.21-.359.508v.439h.712v-.439z" />
                    </svg>
                  </a>
                  <a
                    className="ml-3"
                    href="https://www.instagram.com/soristic/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-10 h-10 cursor-pointer"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        width="20"
                        height="20"
                        x="2"
                        y="2"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                  </a>
                  <a
                    className="ml-3"
                    href="https://www.linkedin.com/company/soristic/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0"
                      className="w-10 h-10 cursor-pointer"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="none"
                        d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                      ></path>
                      <circle cx="4" cy="4" r="2" stroke="none"></circle>
                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div className="bg-gray-100">
            <div className="container flex flex-col flex-wrap mx-auto px-5 py-4 sm:flex-row">
              <p className="text-center text-gray-500 text-sm sm:text-left">
                © {new Date().getFullYear()} Soristic —
                <a
                  href="https://soristic.asia/"
                  rel="noopener noreferrer"
                  className="ml-1 text-gray-600"
                  target="_blank"
                >
                  All rights reserved
                </a>
              </p>
            </div>
          </div>
        </footer>
        <button className="scrollToTopBtn cursor-pointer">☝️</button>
      </main>
    </>
  )
}
