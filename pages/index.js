import Image from 'next/image'
import { useAuth } from '@/Authenticator';

import { useRouter } from 'next/router'
import { TypeAnimation } from 'react-type-animation';
// Carousel/Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from "swiper";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/effect-coverflow";
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


const Home = () => {

  const user = useAuth();
  const router = useRouter();

  console.log(user.user)

  return (
    <div className={` h-full min-h-screen w-full grid grid-cols-[repeat(7,1fr)] grid-rows-[60px,650px,550px,450px,350PX,350px] bg-[#ffffff]`}>

      <div className={`bg-[#EAE6DF] mx-2 fixed w-full z-30 col-start-1 col-end-8 grid grid-cols-[60px,100px,160px,160px,auto,150px] shadow shadow-lime-300 `}>

        <span>
          <Image
            width={50}
            height={50}
            className={`inline hover:cursor-pointer `}
            alt={'Boxeh'}
            src={'/Brand.png'}
            onClick={() => {
              window.location = '/'
            }}
          />
        </span>

        <span className={` p-4 self-center justify-self-center hover:bg-[#E4FABF] hover:cursor-pointer group`}>
          <p className={`group-hover:text-[green] text-sm `}> Our Plans </p>
        </span>

        <span className={` p-4 self-center justify-self-center hover:bg-[#E4FABF] hover:cursor-pointer group`}>
          <p className={`group-hover:text-[green] inline text-sm `}>  How It Works  </p>
          <svg className={`inline rotate-0 group-hover:rotate-180 ease-in-out	duration-300	`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" color="inherit"><path fillRule="evenodd" clipRule="evenodd" d="m12 16.333-6-6L7.333 9 12 13.667 16.667 9 18 10.333l-6 6Z"
            fill="currentColor"></path>
          </svg>

          <span className={`hidden z-50 group-hover:grid bg-[#EAE6DF] absolute rounded grid-cols-[200px] shadow shadow-[green] `}>

            <span className={`hover:bg-[#E4FABF] p-3 `}>
              <p className={` whitespace-nowrap text-sm	 `}>  How It Works </p>
            </span>

            <span className={`hover:bg-[#E4FABF] p-3 `}>
              <p className={`whitespace-nowrap text-sm	`}>  Our Chefs </p>
            </span>

            <span className={`hover:bg-[#E4FABF] p-3`}>
              <p className={` whitespace-nowrap text-sm	`}>  Delivery Areas </p>
            </span>

          </span>
        </span>

        <span className={` p-4 self-center justify-self-center hover:bg-[#E4FABF] hover:cursor-pointer group`}>
          <p className={`group-hover:text-[green] inline text-sm `}>  Our Receipes </p>
          <svg className={`inline rotate-0 group-hover:rotate-180 ease-in-out	duration-300	`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" color="inherit"><path fillRule="evenodd" clipRule="evenodd" d="m12 16.333-6-6L7.333 9 12 13.667 16.667 9 18 10.333l-6 6Z"
            fill="currentColor"></path>
          </svg>

          <span className={`hidden z-50 group-hover:grid bg-[#EAE6DF] absolute rounded grid-cols-[200px] shadow shadow-[green] `}>

            <span className={`hover:bg-[#E4FABF] p-3 `}>
              <p className={` whitespace-nowrap text-sm	 `}>  On The Menu </p>
            </span>

            <span className={`hover:bg-[#E4FABF] p-3 `}>
              <p className={`whitespace-nowrap text-sm	`}>  Cookbook </p>
            </span>

            <span className={`hover:bg-[#E4FABF] p-3`}>
              <p className={` whitespace-nowrap text-sm	`}>  Vegetarian Receipes </p>
            </span>

          </span>
        </span>

        {user.user ?
          <span className={`col-start-6 p-4 mx-2 self-center justify-self-center hover:bg-[#E4FABF] hover:cursor-pointer group`}>
            <p className={`group-hover:text-[green] text-sm inline`}> My Account </p>
            <svg className={`inline rotate-0 group-hover:rotate-180 ease-in-out	duration-300	`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" color="inherit"><path fillRule="evenodd" clipRule="evenodd" d="m12 16.333-6-6L7.333 9 12 13.667 16.667 9 18 10.333l-6 6Z"
              fill="currentColor"></path>
            </svg>

            <span className={`hidden ml-[-100px] z-50 group-hover:grid bg-[#EAE6DF] absolute rounded grid-cols-[200px] shadow shadow-[green] `}>

              <span className={`hover:bg-[#E4FABF] p-3 `}>
                <p className={` whitespace-nowrap text-sm	 `}>  My Orders </p>
              </span>

              <span className={`hover:bg-[#E4FABF] p-3 flex`}>
                <SupportAgentIcon className={`mr-2`} />
                <p className={`whitespace-nowrap text-sm	`}> Support  </p>
              </span>

              <span className={`hover:bg-[#E4FABF] p-3 flex`}>
                <LogoutIcon className={`mr-2`} />
                <p className={` whitespace-nowrap text-sm	`}>  Logout </p>
              </span>

            </span>
          </span>
          :
          <span onClick={() => router.push('/login')} className={`col-start-6 py-2 px-8 mx-4 border-[1px] border-[green] self-center justify-self-end hover:bg-[#E4FABF] hover:cursor-pointer group`}>
            <p className={`text-[green] text-sm font-bold`}>
              Log In
            </p>
          </span>
        }

      </div>

      {/* <div className={`col-start-1 col-end-8 row-start-2 row-end-3 aspect-video self-center `}>
        <Image
          src={'/cover-1.jpg'}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto "
        />
      </div> */}

      <div className="col-start-1 col-end-8 row-start-2 row-end-3 h-full w-full relative">
        <Image
          src={'/cover-1.jpg'}
          alt="Boxeh Cover"
          fill
          className="object-cover" // just an example
        />
      </div>

      <div className={`col-start-1 col-end-8 row-start-2 row-end-3 justify-self-center self-center text-center grid z-20`}>

        <p className={` text-[2em] font-medium font-serif text-[rgb(36,36,36)] `}>We save you serious </p>
        <TypeAnimation
          sequence={[
            'Time', // Types 'One'
            1000, // Waits 1s
            'Money', // Deletes 'One' and types 'Two'
            1000, // Waits 2s
            'Effort', // Types 'Three' without deleting 'Two'
            1000, // Waits 1s
            () => {
              console.log('Sequence completed');
            },
          ]}
          wrapper="span"
          cursor={false}
          repeat={Infinity}
          speed={{ type: 'keyStrokeDelayInMs', value: 250 }}

          style={{
            height: '85px',
            width: '300px',
            margin: "auto",
            display: 'block',
            fontSize: '2em',
            zIndex: "20",
            color: "green"
          }}
        />
        <p className={` text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] w-[350px] p-2`}>
          Now with more choices every week and meals starting from just $4.45 JD /pp.
        </p>

        <span
          onClick={() => router.push('/plans')}
          className={`mt-6 py-2 px-8 mx-8 border-[1px] border-[green] bg-lime-300 hover:cursor-pointer hover:opacity-100 opacity-80`}>
          <p className={`text-[green] text-sm font-bold inline`}>
            View our plans
          </p>
        </span>

      </div>

      <div className={`mt-4 col-start-1 col-end-8 row-start-3 row-end-4 justify-self-center self-center text-center grid`}>

        <p className={` text-[2em] font-medium font-serif text-[rgb(36,36,36)] `}>How it Works </p>

        <p className={` text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2`}>
          Choose your recipes • Place your order  • Delivered safely to your door
        </p>

        <span className={`flex mx-2`} >

          <span className={`grid justify-self-center self-center max-w-[300px] mx-8`}>
            <Image
              width={180}
              height={220}
              className={`inline hover:cursor-pointer justify-self-center `}
              alt={'Recipes'}
              src={'/Meals-3.jpg'}
            />
            <p className={` text-[1.3em] font-medium font-serif text-[rgb(36,36,36)] `}>Choose your meals </p>

            <p className={` text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2 justify-self-center`}>
              Curated, easy-to-follow recipes every week
            </p>

          </span>

          <span className={`grid justify-self-center self-center max-w-[300px] mx-8`}>
            <Image
              width={180}
              height={220}
              className={`inline hover:cursor-pointer justify-self-center `}
              alt={'Recipes'}
              src={'/Cook.jpg'}
            />
            <p className={` text-[1.3em] font-medium font-serif text-[rgb(36,36,36)] `}>Create the perfect box </p>

            <p className={` text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2 justify-self-center`}>
              Suit your lifestyle with a variety of Extras, including Garlic Bread
            </p>
          </span>


          <span className={`grid justify-self-center self-center max-w-[300px] mx-8`}>
            <Image
              width={180}
              height={220}
              className={`inline hover:cursor-pointer justify-self-center `}
              alt={'Recipes'}
              src={'/Delivery.jpg'}
            />
            <p className={` text-[1.3em] font-medium font-serif text-[rgb(36,36,36)] `}>Get convenient weekly deliveries </p>

            <p className={` text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2 justify-self-center `}>
              Scheduling made easy, with drop-offs right at your door</p>
          </span>

          <span className={`grid justify-self-center self-center max-w-[300px]`}>
            <Image
              width={180}
              height={220}
              className={`inline hover:cursor-pointer mx-8 justify-self-center `}
              alt={'Recipes'}
              src={'/Season-2.jpg'}
            />
            <p className={` text-[1.3em] font-medium font-serif text-[rgb(36,36,36)] `}>Cook seasonal, fresh ingredients </p>

            <p className={` text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2 justify-self-center `}>
              Food made from scratch in the comfort of your kitchen
            </p>
          </span>


        </span>


        <span
          onClick={() => router.push('/plans')}
          className={`my-6 py-2 px-8 mx-4 self-center justify-self-center border-[1px] border-[green] bg-lime-300 hover:cursor-pointer hover:opacity-100 opacity-80`}>
          <p className={`text-[green] text-sm font-bold inline`}>
            Learn more
          </p>
        </span>

      </div>

      <div className={`col-start-1 col-end-8 row-start-4 row-end-5 grid justify-self-center`}>

        <span className={`self-center justify-self-center text-center`}>
          <p className={` text-[2em] font-medium font-serif text-[rgb(36,36,36)]  `}>Your box, your way
          </p>
          <p className={` text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2 `}>
            Flexible options to delight you and customise your weekly box
          </p>
        </span>

        <Swiper
          effect={"coverflow"}
          centeredSlides={false}
          slidesPerView={2}
          speed={1000}
          navigation={true}
          modules={[Navigation, EffectCoverflow]}
          allowTouchMove={false}
          className={`w-full mt-8 self-center max-w-[1400px] `}
          loop={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
        // spaceBetween={-190}

        >
          <SwiperSlide >
            <span className={`grid`} >
              <Image
                width={400}
                height={220}
                className={`inline mx-8 justify-self-center `}
                alt={'Beans-Foul-and-Beef-Rice'}
                src={'/Beans-Foul-and-Beef-Rice.jpeg'}
              />
              <p className={`text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2 justify-self-center  `}>
                Beans-Foul-and-Beef-Rice
              </p>
            </span>

          </SwiperSlide >

          <SwiperSlide >
            <span className={`grid`} >

              <Image
                width={450}
                height={220}
                className={`inline mx-8 justify-self-center `}
                alt={'Eggplant-and-Halloumi-Rolls-with-Tomato-Sauce'}
                src={'/Eggplant-and-Halloumi-Rolls-with-Tomato-Sauce.jpeg'}
              />
              <p className={`text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2 justify-self-center  `}>
                Eggplant-and-Halloumi-Rolls-with-Tomato-Sauce
              </p>
            </span>
          </SwiperSlide >
          <SwiperSlide >
            <span className={`grid`} >

              <Image
                width={450}
                height={220}
                className={`inline mx-8 justify-self-center `}
                alt={'Peri-Peri-Chicken'}
                src={'/Peri-Peri-Chicken.jpeg'}
              />
              <p className={`text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2 justify-self-center  `}>
                Peri-Peri-Chicken
              </p>
            </span>
          </SwiperSlide >
          <SwiperSlide >
            <span className={`grid`} >

              <Image
                width={450}
                height={220}
                className={`inline mx-8 justify-self-center `}
                alt={'Shells-Pasta-with-Yogurt-and-Tahini-Sauce'}
                src={'/Shells-Pasta-with-Yogurt-and-Tahini-Sauce.jpeg'}
              />
              <p className={`text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2 justify-self-center  `}>
                Shells-Pasta-with-Yogurt-and-Tahini-Sauce
              </p>
            </span>

          </SwiperSlide >

        </Swiper>

        <span
          onClick={() => router.push('/plans')}
          className={`my-6 py-2 px-8 mx-4 self-center justify-self-center border-[1px] border-[green] bg-lime-300 hover:cursor-pointer hover:opacity-100 opacity-80`}>
          <p className={`text-[green] text-sm font-bold inline`}>
            See our menus
          </p>
        </span>

      </div>

      <div className="mt-8 col-start-1 col-end-8 row-start-5 row-end-6 h-full w-full relative">
        <Image
          src={'/cover-3.jpeg'}
          alt="Boxeh Cover 2"
          fill
          className="object-cover" // just an example
        />
      </div>

      <div className="border-4 border-t-lime-300 mt-8 mx-8 col-start-1 col-end-8 row-start-6 row-end-8 grid grid-cols-[repeat(7,1fr)] grid-rows-2">

        <span className={`grid self-center row-start-1 col-start-2 col-end-8`}>

          <span className={`grid self-center justify-self-start row-start-1 col-start-1`}>
            <p className={` text-[1em] font-medium font-serif text-[rgb(36,36,36)] p-2 `}>Boxeh </p>
            <Link href={'/ourStory'}>
              <p className={`text-[0.8em] font-medium font-serif text-[green] p-2 underline `}>
                Our Story
              </p>
            </Link>

            <Link href={'/aboutUs'}>

              <p className={`text-[0.8em] font-medium font-serif text-[green] p-2 underline`}>
                About Us
              </p>
            </Link>

            <Link href={'/faqs'}>
              <p className={`text-[0.8em] font-medium font-serif text-[green] p-2 underline`}>
                FAQS
              </p>
            </Link>
          </span>

          <span className={`self-center justify-self-start row-start-1 col-start-2 `} >
            <Image
              width={150}
              height={150}
              className={`inline hover:cursor-pointer `}
              alt={'powered-by-stripe'}
              src={'/powered-by-stripe.png'}
              onClick={() => {
                window.location = '/'
              }}
            />
          </span>

        </span>

        <span className={`grid self-center row-start-2 col-start-2 col-end-8 `}>

          <span className={`flex self-center justify-self-start row-start-1 col-start-1 whitespace-nowrap`}>

            <p className={` text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2`}>
              © Boxeh 2023
            </p>

            <Link href={'/conditions'}>

              <p className={`ml-4 text-[0.8em] font-medium font-serif text-[green] p-2 underline`}>
                Terms & Conditions
              </p>
            </Link>

            <Link href={'/privacy'}>

              <p className={`ml-4 text-[0.8em] font-medium font-serif text-[green] p-2 underline`}>
                Privacy
              </p>
            </Link>

          </span>


          <span className={`justify-self-start self-center row-start-1 col-start-2 `} >
            <Image
              width={50}
              height={50}
              className={`inline hover:cursor-pointer `}
              alt={'Boxeh'}
              src={'/Brand.png'}
              onClick={() => {
                window.location = '/'
              }}
            />
          </span>
        </span>

      </div>

    </div >
  )
}



export default Home;