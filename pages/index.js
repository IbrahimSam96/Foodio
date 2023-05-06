import { useAuth } from '@/Authenticator';
import RecipeSlider from '@/components/RecipeSlider';

import Image from 'next/image';
import Link from 'next/link';

import { firebaseauth } from '@/InitFirebase';
import { signOut } from "firebase/auth";

import { useRouter } from 'next/router';
import { TypeAnimation } from 'react-type-animation';
// Carousel/Swiper
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, EffectCoverflow } from "swiper";
// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import "swiper/css/effect-coverflow";
import LogoutIcon from '@mui/icons-material/Logout';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';



const Home = () => {

  const user = useAuth();
  const router = useRouter();

  const SignOut = () => {
    signOut(firebaseauth).then(() => {
      // Sign-out successful.
      console.log("success")
    }).catch((error) => {
      console.log(error)
      // An error happened.
    });

  }

  return (
    <div className={` h-full min-h-screen w-full grid grid-cols-[repeat(7,1fr)] grid-rows-[64px,650px,550px,550px,300px,350PX,250px] bg-[#ffffff]`}>

      <div className={`bg-[#FFFFFF] mx-2 fixed w-full z-30 col-start-1 col-end-8 grid grid-cols-[60px,100px,160px,160px,auto,150px] shadow shadow-slate-300 max-h-[64px]`}>

        <Image
          width={50}
          height={64}
          className={`inline hover:cursor-pointer `}
          alt={'Boxeh'}
          src={'/Brand.png'}
          onClick={() => {
            window.location = '/'
          }}
        />

        <span onClick={() => router.push('/plans')} className={` p-[20px] self-center justify-self-center hover:bg-[#D2F895] hover:cursor-pointer group`}>
          <p className={`group-hover:text-[green] text-sm whitespace-nowrap`}> Our Plans </p>
        </span>

        <span className={` p-[18px] self-center justify-self-center hover:bg-[#D2F895] hover:cursor-pointer group`}>
          <p className={`group-hover:text-[green] inline text-sm `}>  How It Works  </p>
          <svg className={`inline rotate-0 group-hover:rotate-180 ease-in-out	duration-300	`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" color="inherit"><path fillRule="evenodd" clipRule="evenodd" d="m12 16.333-6-6L7.333 9 12 13.667 16.667 9 18 10.333l-6 6Z"
            fill="currentColor"></path>
          </svg>

          <span className={`hidden z-50 group-hover:grid bg-[#FFFFFF] absolute rounded grid-cols-[200px] shadow shadow-[green] `}>

            <span className={`hover:bg-[#D2F895] p-3 `}>
              <p className={` whitespace-nowrap text-sm	 `}>  How It Works </p>
            </span>

            <span className={`hover:bg-[#D2F895] p-3 `}>
              <p className={`whitespace-nowrap text-sm	`}>  Our Chefs </p>
            </span>

            <span className={`hover:bg-[#D2F895] p-3`}>
              <p className={` whitespace-nowrap text-sm	`}>  Delivery Areas </p>
            </span>

          </span>
        </span>

        <span className={` p-[18px] self-center justify-self-center hover:bg-[#D2F895] hover:cursor-pointer group`}>
          <p className={`group-hover:text-[green] inline text-sm `}>  Our Receipes </p>
          <svg className={`inline rotate-0 group-hover:rotate-180 ease-in-out	duration-300	`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" color="inherit"><path fillRule="evenodd" clipRule="evenodd" d="m12 16.333-6-6L7.333 9 12 13.667 16.667 9 18 10.333l-6 6Z"
            fill="currentColor"></path>
          </svg>

          <span className={`hidden z-50 group-hover:grid bg-[#FFFFFF] absolute rounded grid-cols-[200px] shadow shadow-[green] `}>

            <span className={`hover:bg-[#D2F895] p-3 `}>
              <p className={` whitespace-nowrap text-sm	 `}>  On The Menu </p>
            </span>

            <span className={`hover:bg-[#D2F895] p-3 `}>
              <p className={`whitespace-nowrap text-sm	`}>  Cookbook </p>
            </span>

            <span className={`hover:bg-[#D2F895] p-3`}>
              <p className={` whitespace-nowrap text-sm	`}>  Vegetarian Receipes </p>
            </span>

          </span>
        </span>

        {user.user ?
          <span className={`col-start-6 mx-2 self-center justify-self-center hover:cursor-pointer group`}>
            <p className={`group-hover:text-[green] text-sm inline`}> My Account </p>
            <svg className={`inline rotate-0 group-hover:rotate-180 ease-in-out	duration-300	`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" color="inherit"><path fillRule="evenodd" clipRule="evenodd" d="m12 16.333-6-6L7.333 9 12 13.667 16.667 9 18 10.333l-6 6Z"
              fill="currentColor"></path>
            </svg>

            <span className={`hidden ml-[-100px] z-50 group-hover:grid bg-[#FFFFFF] absolute rounded grid-cols-[200px] shadow shadow-[green] `}>

              <span onClick={() => {
                router.push('/my-account')
              }} className={`hover:bg-[#D2F895] p-3 `}>
                <p className={` whitespace-nowrap text-sm	 `}>  My Orders </p>
              </span>

              <span className={`hover:bg-[#D2F895] p-3 flex`}>
                <SupportAgentIcon className={`mr-2`} />
                <p className={`whitespace-nowrap text-sm	`}> Support  </p>
              </span>

              <span onClick={() => {
                SignOut()
              }} className={`hover:bg-[#D2F895] p-3 flex`}>
                <LogoutIcon className={`mr-2`} />
                <p className={` whitespace-nowrap text-sm	`}>  Logout </p>
              </span>

            </span>
          </span>
          :
          <span onClick={() => router.push('/login')} className={`col-start-6 py-2 px-8 mx-4 border-[1px] border-[green] self-center justify-self-end hover:bg-[#D2F895] hover:border-[2px] hover:cursor-pointer group`}>
            <p className={`text-[green] text-sm font-bold`}>
              Log In
            </p>
          </span>
        }

      </div>

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
            height: '35px',
            width: '150px',
            // margin: "auto",
            display: 'block',
            fontSize: '2em',
            zIndex: "20",
            color: "green",
            justifySelf: "center"

          }}
        />
        <p className={` text-[1em] font-medium font-serif text-[rgb(36,36,36)] w-[350px] p-2`}>
          Now with more choices every week and meals starting from just $4.45 JD /pp.
        </p>

        <span
          onClick={() => router.push('/plans')}
          className={`mt-6 py-2 px-4 mx-4 border-[1px] border-[green] bg-lime-300 hover:cursor-pointer hover:opacity-100 opacity-80`}>
          <p className={`text-[green] text-sm font-bold inline`}>
            View our plans
          </p>
        </span>

      </div>

      <div className={`mt-8 col-start-1 col-end-8 row-start-3 row-end-4 justify-self-center self-center text-center grid`}>

        <p className={` text-[2em] font-medium font-serif text-[rgb(36,36,36)] `}>How it Works </p>

        <p className={` text-[1em] font-medium font-serif text-[grey] p-2`}>
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

        <RecipeSlider />

        <span
          onClick={() => router.push('/plans')}
          className={`my-6 py-2 px-8 mx-4 self-center justify-self-center border-[1px] border-[green] bg-lime-300 hover:cursor-pointer hover:opacity-100 opacity-80`}>
          <p className={`text-[green] text-sm font-bold inline`}>
            See our menus
          </p>
        </span>

      </div>

      <div className={`col-start-1 col-end-8 row-start-5 row-end-6 grid justify-self-center self-center`}>

        <p className={`text-center text-[1.5em] text-[rgb(36,36,36)] `}>Our customers eat better every day </p>

        <p className={`text-center text-[1em] text-[black] py-4`}>
          Here are some fo the reason why we are liked by our customers
        </p>

        <span className={`flex`}>

          <span className={`grid max-w-[300px]`}>
            <Image
              width={25}
              height={25}
              className={`inline justify-self-center`}
              alt={'quotation'}
              src={'/quotation.svg'}
            />

            <p className={`justify-self-center text-[1em] text-[rgb(36,36,36)] `}> Samah said </p>

            <p className={`text-center  justify-self-center text-[0.8em] text-[black] p-2`}>
              Boxeh has allowed me to enjoy cooking, eat better and save money! I am not making unnecessary purchases at the grocery store and overspending. Preparation of meals is quick and easy and the food is delicious!!!!

            </p>

          </span>

          <span className={`grid max-w-[300px]`}>
            <Image
              width={25}
              height={25}
              className={`inline justify-self-center`}
              alt={'quotation'}
              src={'/quotation.svg'}
            />
            <p className={`justify-self-center text-[1em] text-[rgb(36,36,36)] `}>Haneen said </p>

            <p className={`text-center justify-self-center text-[0.8em] text-[black] p-2`}>
              My husband and daughter clean their plates every meal and tell me how delicious it was. And our financial budget has been cut in half. Honestly I love this company and I am so grateful for you. Thank you so much.
            </p>
          </span>
        </span>

      </div>


      <div className=" col-start-1 col-end-8 row-start-6 row-end-7 h-full w-full relative">
        <Image
          src={'/bottom_banner_desktop.avif'}
          alt="Boxeh Cover 2"
          fill
          className="object-cover z-10" // just an example
        />
      </div>

      <div className={`col-start-1 col-end-8 row-start-6 row-end-7 justify-self-center self-center z-10 text-center grid`}>

        <p className={` text-[2em] font-medium font-serif text-[rgb(36,36,36)] `}>Get Started </p>

        <p className={` text-[1em] font-medium font-serif text-[black] p-2`}>
          Eat well, save time, and enjoy cooking with Boxeh.
        </p>

        <span
          onClick={() => router.push('/plans')}
          className={`mt-4 py-2 px-8 mx-4 self-center justify-self-center border-[1px] border-[green] bg-lime-300 hover:cursor-pointer hover:opacity-100 opacity-80`}>
          <p className={`text-[green] text-sm font-bold inline`}>
            View our plans
          </p>
        </span>

      </div>

      <div className="justify-self-center sm:justify-self-auto col-start-2 col-end-7 row-start-7 row-end-8 grid grid-cols-1 ">

        <span className={`flex self-center`}>

          <span className={`grid mr-8 `}>
            <p className={` text-[1em] font-bold text-[rgb(36,36,36)] p-2 `}>Boxeh </p>

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

          <span className={`grid ml-8 `}>
            <p className={` text-[1em] font-bold  text-[rgb(36,36,36)] p-2 `}>Our Company </p>

            <Link href={'/ourStory'}>
              <p className={`text-[0.8em] font-medium font-serif text-[green] p-2 underline `}>
                Boxeh Chefs
              </p>
            </Link>

            <Link href={'/aboutUs'}>

              <p className={`text-[0.8em] font-medium font-serif text-[green] p-2 underline`}>
                Recipes
              </p>
            </Link>


            <p className={`text-[0.8em] font-medium font-serif text-[green] p-2 underline`}>

            </p>
          </span>

          <span className={`mx-4 my-auto ml-auto`} >
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


        <span className={`flex self-end `}>

          <span className={`flex my-auto `}>

            <p className={` text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2 whitespace-nowrap mr-10`}>
              © Boxeh 2023
            </p>

            <Link href={'/conditions'}>

              <p className={`text-[0.8em] font-medium font-serif text-[green] p-2 underline`}>
                Terms & Conditions
              </p>
            </Link>

            <Link href={'/privacy'}>

              <p className={`ml-4 text-[0.8em] font-medium font-serif text-[green] p-2 underline`}>
                Privacy
              </p>
            </Link>

          </span>

          <span className={`flex my-auto ml-auto`}>

            <svg className={`mx-2`} width="25" height="25" viewBox="0 0 48 48" fill="#1877F2" xmlns="http://www.w3.org/2000/svg" aria-labelledby="facebook"><title id="facebook">facebook</title><path d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24c0 11.98 8.776 21.908 20.25 23.708v-16.77h-6.094V24h6.094v-5.288c0-6.014 3.583-9.337 9.065-9.337 2.626 0 5.372.469 5.372.469v5.906h-3.026c-2.981 0-3.911 1.85-3.911 3.748V24h6.656l-1.064 6.938H27.75v16.77C39.224 45.908 48 35.98 48 24"></path><path fill="#fff" d="M33.342 30.938L34.406 24H27.75v-4.502c0-1.898.93-3.748 3.911-3.748h3.026V9.844s-2.746-.469-5.372-.469c-5.482 0-9.065 3.322-9.065 9.337V24h-6.094v6.938h6.094v16.77a24.174 24.174 0 007.5 0v-16.77h5.592z" class="facebook"></path></svg>

            <svg className={`mx-2`} width="25" height="25" viewBox="0 0 24 24" fill="#E1306C" xmlns="http://www.w3.org/2000/svg" aria-labelledby="instagram"><title id="instagram">instagram</title><path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0"></path><g class="instagram"><path fill="#fff" d="M12.242 5.25c-1.9 0-2.137.008-2.883.042-.744.034-1.252.152-1.697.325-.46.179-.85.418-1.238.807a3.426 3.426 0 00-.807 1.238c-.173.445-.291.953-.325 1.697-.034.746-.042.984-.042 2.883s.008 2.137.042 2.882c.034.745.152 1.253.325 1.698.179.46.418.85.807 1.238.388.389.778.628 1.238.806.445.173.953.291 1.697.325.746.034.984.042 2.883.042s2.137-.008 2.882-.042c.745-.034 1.253-.152 1.698-.325a3.43 3.43 0 001.238-.806c.389-.389.628-.779.806-1.238.173-.445.291-.953.325-1.698.034-.745.042-.983.042-2.882 0-1.9-.008-2.137-.042-2.883-.034-.744-.152-1.252-.325-1.697a3.428 3.428 0 00-.806-1.238 3.428 3.428 0 00-1.238-.807c-.445-.173-.953-.291-1.698-.325-.745-.034-.983-.042-2.882-.042m0 1.26c1.867 0 2.088.007 2.825.04.682.032 1.052.146 1.298.241.327.127.56.279.804.523.245.245.396.478.523.804.096.247.21.617.241 1.298.034.738.04.959.04 2.826s-.006 2.088-.04 2.825c-.031.682-.145 1.052-.24 1.298-.128.327-.28.56-.524.804a2.168 2.168 0 01-.804.523c-.246.096-.616.21-1.298.24-.737.035-.958.042-2.825.042-1.867 0-2.088-.007-2.825-.041-.682-.031-1.052-.145-1.299-.24a2.167 2.167 0 01-.804-.524 2.167 2.167 0 01-.523-.804c-.095-.246-.21-.616-.24-1.298-.034-.737-.041-.958-.041-2.825 0-1.867.007-2.088.04-2.826.032-.681.146-1.051.241-1.298.127-.326.279-.56.523-.804.245-.244.478-.396.804-.523.247-.095.617-.21 1.299-.24.737-.034.958-.041 2.825-.041"></path><path fill="#fff" d="M12.242 14.572a2.33 2.33 0 110-4.66 2.33 2.33 0 010 4.66m0-5.92a3.59 3.59 0 100 7.18 3.59 3.59 0 000-7.18M16.813 8.51a.839.839 0 11-1.678 0 .839.839 0 011.678 0"></path></g><defs><clipPath id="instagram"><path fill="#fff" transform="translate(.69)" d="M0 0h48v48H0z"></path></clipPath></defs></svg>
          </span>

        </span>



      </div>

    </div >
  )
}



export default Home;