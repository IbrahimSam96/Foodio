import Image from 'next/image'

// Stripe SDK
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// Client Firebase SDK
import { firebaseauth, firebasedb } from '@/InitFirebase'
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import { useAuth } from '@/Authenticator';
import { doc, setDoc, getDoc, collection, getDocs, addDoc, updateDoc } from "firebase/firestore";

//  Admin Firebase SDK
import { AdminAuth, AdminFireStore } from '@/AdminFirebase';

// SRS
import nookies from "nookies";
// MUI
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TuneIcon from '@mui/icons-material/Tune';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import { styled } from '@mui/material/styles';
import { Checkbox, Rating, StepConnector, TextField, stepConnectorClasses } from '@mui/material';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from "swiper";

import SyncIcon from '@mui/icons-material/Sync';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/effect-coverflow";
import moment from 'moment/moment';
import Slider from '@/components/Slider';
import RecipeCategory from '@/components/RecipeCategory';
// Bootstrap
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TypeAnimation } from 'react-type-animation';


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
// 4242 4242 4242 4242 Test Card
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


const Plans = ({ email, uid }) => {
  const user = useAuth();

  const [activeStep, setActiveStep] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [numberOfRecipes, setNumberOfRecipes] = useState(3);

  const steps = [
    'Select Plan',
    'Register',
    'Address',
    'Checkout',
    'Select Meals',
  ];

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
      margin: 'auto',
      width: "50%"
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,limegreen 0%,limegreen 50%,limegreen 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,limegreen 0%,limegreen 50%,limegreen 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundImage:
        'linear-gradient( 95deg,#C1CDCD 0%,#C1CDCD 50%,#C1CDCD 100%)',
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    zIndex: 1,
    backgroundImage:
      'linear-gradient( 136deg, #C1CDCD 0%, #C1CDCD 50%, #ccc 100%)',
    color: '#fff',
    width: 30,
    height: 30,
    display: 'flex',
    marginTop: "10px",
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, #056835 0%, #056835 50%, #056835 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, #056835 0%, #056835 50%, #056835 100%)',
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <TuneIcon />,
      2: <PersonIcon />,
      3: <LocalShippingIcon />,
      4: <PointOfSaleIcon />,
      5: <RestaurantIcon />,
    };

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  const recipesCategories = ['One-Pot Wonders', 'Loved By Kiddos', 'Terrific Traybakes', 'Vegetarian', 'Light Delights', 'Asian', 'Indian', 'SeaFood', 'Quick & Easy', 'Chicken'];

  const [
    categories,
    setCategories
  ] = useState(recipesCategories.map((name, id) => {
    return { id, name, selected: true };
  }));

  const recipes = [
    { name: 'Beans-Foul-and-Beef-Rice', time: '50', tags: ['One-Pot Wonders'], selected: false },
    { name: 'Eggplant-and-Halloumi-Rolls-with-Tomato-Sauce', time: '35', tags: ['Vegetarian', 'Light Delights'], selected: false },
    { name: 'Peri-Peri-Chicken', time: '55', tags: ['Terrific Traybakes'], selected: false },
    { name: 'Shells-Pasta-with-Yogurt-and-Tahini-Sauce', time: '15', tags: ['Loved By Kiddos'], selected: false },
    { name: 'Baked-Chicken-Tray-with-Thyme', time: '55', tags: ['Terrific Traybakes'], selected: false },
    { name: 'Mongolian-Chicken', time: '25', tags: ['One-Pot Wonders', 'Asian'], selected: false },
    { name: 'Chicken-Curry-with-White-Rice', time: '35', tags: ['Indian'], selected: false },
    { name: 'Beef-Steaks-with-Mushroom-and-Pomegranate-Sauce', time: '35', tags: ['One-Pot Wonders'], selected: false },
    { name: 'Smoked-Beef-Kabab-with-Tomato-Sauce', time: '30', tags: ['Terrific Traybakes'], selected: false },
    { name: 'Beef-Pasta-with-Blue-cheese-sauce', time: '11', tags: ['One-Pot Wonders', 'Quick & Easy'], selected: false },
    { name: 'Herby-Fish-Rolls', time: '35', tags: ['Terrific Traybakes', 'SeaFood'], selected: false },
    { name: 'Potatoes-Cream-and-Sausage-Pasta', time: '40', tags: ['One-Pot Wonders'], selected: false },
    { name: 'Steak-Rolls-with-Pepper-Sauce', time: '30', tags: ['Terrific Traybakes'], selected: false },
    { name: 'Msakhan-Traybake', time: '55', tags: ['Terrific Traybakes'], selected: false },
    { name: 'Chicken-Shawarma-Tacos', time: '15', tags: ['Chicken', 'Loved By Kiddos'], selected: false },
    { name: 'Chicken-Zurbian', time: '55', tags: ['Chicken'], selected: false },
    { name: 'Shrimp-Scampi', time: '10', tags: ['One-Pot Wonders', 'SeaFood', 'Quick & Easy'], selected: false },
    { name: 'Baked-Fish-Fillet-in-Parchment-Paper', time: '40', tags: ['Terrific Traybakes', 'Light Delights'], selected: false },
    { name: 'Teriyaki-Chicken-with-Broccoli', time: '25', tags: ['Asian'], selected: false },
    { name: 'Baked-Fish-Fillet-in-Tomatoes-and-Green-Olives', time: '50', tags: ['Terrific Traybakes', 'Light Delights', 'SeaFood'], selected: false },
    { name: 'Fattet-Il-Kofta', time: '40', tags: ['One-Pot Wonders'], selected: false },
    { name: 'Thai-Style-Chicken', time: '30', tags: ['Light Delights'], selected: false },
    { name: 'Low-Calorie-Beef-Stroganoff', time: '30', tags: ['Light Delights'], selected: false },
    { name: 'Chicken-Shawarma-Salad', time: '10', tags: ['Light Delights'], selected: false },
    { name: 'Bulgur-Salad-with-Grilled-Chicken', time: '25', tags: ['Light Delights'], selected: false },


  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddrress] = useState("");
  const [address2, setAddrress2] = useState("");

  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState(false);
  const [billingAddress, setBillingAddress] = useState(false);

  const [firstNameB, setFirstNameB] = useState("");
  const [lastNameB, setLastNameB] = useState("");
  const [addressB, setAddrressB] = useState("");
  const [address2B, setAddrress2B] = useState("");

  const [cityB, setCityB] = useState("");
  const [postalCodeB, setPostalCodeB] = useState("");
  const [phoneB, setPhoneB] = useState("");

  const [shippingConfirmed, setShippingConfirmed] = useState(false);

  // Stripe Checkout 
  const [clientSecret, setClientSecret] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");


  useEffect(() => {

    console.log("Activated new client secret")
    if (shippingConfirmed) {
      // Create PaymentIntent as soon as the page loads
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: numberOfPeople * numberOfRecipes }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [shippingConfirmed, paymentStatus, numberOfPeople, numberOfRecipes]);

  const appearance = {
    variables: {
      colorPrimary: '#056835',
      colorBackground: '#E4FABF',
      colorText: '#056835',
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  var date = new Date();
  var numberOfDaysToAdd = 3;
  var deliveryDate = date.setDate(date.getDate() + numberOfDaysToAdd);
  const [orderRef, setOrderRef] = useState()

  const PlaceOrder = async (paymentObject) => {

    console.log(paymentObject)

    const docRef = doc(firebasedb, "Customers", uid);

    await updateDoc(docRef, {
      address: `${address},${address2},${city},${postalCode}`,
      name: `${firstName} ${lastName}`,
      phone: phone,
    },
    );

    const colRef = collection(docRef, "Orders")

    await addDoc(colRef, {
      amount: paymentObject.amount,
      currency: paymentObject.currency,
      payment_id: paymentObject.id,
      timestamp: paymentObject.created,
      deliveryDate: deliveryDate,
      numberOfPeople: numberOfPeople,
      numberOfRecipes: numberOfRecipes,
      delivered: false
    }).then((res) => {
      console.log(res.id)
      setOrderRef(res.id)
    }).catch((err) => {
      console.log(err)
    })


    setActiveStep(4);

  }

  const [filteredRecipes, setFilteredRecipes] = useState(recipes)

  const [selectedReicpes, setSelectedRecipes] = useState([]);

  const [overSelected, setOverSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className={` h-full min-h-screen w-full grid grid-cols-[repeat(7,1fr)] ${activeStep == 0 ? `grid-rows-[60px,auto,auto,auto,100px]` : `grid-rows-[60px,auto,auto]`} bg-[#F8F8F8]`}>

      <div className={`bg-[#FFFFFF] mx-2 fixed w-full z-30 col-start-1 col-end-8 grid grid-cols-[60px,1fr,150px] max-h-[60px] shadow shadow-slate-300 `}>

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

        <Stepper className={`justify-self-center hidden sm:flex`} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label, index) => {
            return (
              < Step className={``} key={label} disabled={(index == 1 && user.user !== undefined) || (index == 3 && !shippingConfirmed) || (index == 4 && paymentStatus == "") || (paymentStatus == 'succeeded')} >
                <StepLabel className={`mx-4 ${((index == 1 && user.user) || (index == 3 && !shippingConfirmed)) && `hover:cursor-default`} hover:cursor-pointer `} onClick={() => {
                  if ((index == 1 && user.user) || (index == 3 && !shippingConfirmed) || (index == 4 && paymentStatus !== 'succeeded') || (paymentStatus == 'succeeded')) {
                    // Do nothin
                  }
                  else {
                    setActiveStep((prev) => index)
                  }
                }} StepIconComponent={ColorlibStepIcon} >{label}</StepLabel>
              </Step>
            )
          }
          )
          }
        </Stepper>

      </div>

      {(activeStep == 0 || activeStep == 1) &&
        <>
          <div className={`col-start-1 col-end-8 row-start-2 row-end-3 justify-self-center self-center flex mx-4 bg-[#FFFFFF]`}>

            <Image
              width={150}
              height={150}
              className={`self-center hidden md:block`}
              alt={''}
              src={'/tablet-desktop-left.avif'}
            />

            <div className={`col-start-1 col-end-8 row-start-2 row-end-3 justify-self-center self-center grid shadow shadow-slate-400 mt-8 p-10`} >

              <p className={`text-[1.5em] sm:text-[2.0em] font-medium font-serif text-[rgb(36,36,36)] mx-auto`}>Choose your plan size
              </p>

              <p className={`text-[0.6em] sm:text-[0.8em] font-Financials text-[rgb(36,36,36)] mx-auto `}>
                {`We'll set this as your default size, but you can always change it from week to week.`}              </p>

              <span className={`self-center grid grid-rows-1 `}>

                <span className={`self-center row-start-1 col-start-1`}>
                  <p className={` text-[0.5em] sm:text-[0.8em] text-[rgb(36,36,36)] inline `}>
                    Number of people
                  </p>
                </span>

                <span className={`flex ml-auto row-start-1 col-start-2 `}>
                  <span
                    onClick={() => { setNumberOfPeople(2) }}
                    className={`${numberOfPeople == 2 ? `z-[-2]` : `z-10`} py-2 px-10 sm:px-14 border-[1px] border-[green] hover:bg-[#E4FABF] hover:cursor-pointer hover:opacity-100 opacity-80`}>
                    <p className={`text-[green] text-[0.7em] font-bold inline`}>
                      2
                    </p>
                  </span>

                  <span
                    onClick={() => { setNumberOfPeople(4) }}
                    className={`${numberOfPeople == 4 ? `z-[-2]` : `z-10`}  py-2 px-10 sm:px-14 border-[1px] border-[green] hover:bg-[#E4FABF] hover:cursor-pointer hover:opacity-100 opacity-80`}>
                    <p className={`text-[green] text-[0.7em] font-bold inline`}>
                      4
                    </p>
                  </span>

                </span>

                <span className={`flex ml-auto row-start-1 col-start-2 `}>
                  <span
                    onClick={() => { }}
                    className={`py-2 px-10 sm:px-14 transition-[margin] 
                    ${numberOfPeople == 2 ? `mr-[88px] sm:mr-[119px]` : `mr-0`}
                     border-[1px] border-[green]  bg-[#056835] `}>
                    <p className={`text-[white] text-[0.7em] font-bold inline`}>
                      {numberOfPeople}

                    </p>
                  </span>

                </span>
              </span>

              <span className={`self-center grid grid-rows-1 py-3 `}>

                <span className={`self-center row-start-1 col-start-1`}>
                  <p className={` text-[0.5em] sm:text-[0.8em] text-[rgb(36,36,36)] inline`}>
                    Recipes per week
                  </p>
                </span>

                <span className={`flex ml-auto row-start-1 col-start-2 `}>
                  <span
                    onClick={() => { setNumberOfRecipes(3) }}
                    className={`${numberOfRecipes == 3 ? `z-[-2]` : `z-10`} py-2 px-[25px] sm:px-[35.8px] border-[1px] border-[green] hover:bg-[#E4FABF] hover:cursor-pointer hover:opacity-100 opacity-80`}>
                    <p className={`text-[green] text-[0.7em] font-bold inline`}>
                      3
                    </p>
                  </span>

                  <span
                    onClick={() => { setNumberOfRecipes(4) }}
                    className={`${numberOfRecipes == 4 ? `z-[-2]` : `z-10`}  py-2 px-[25px] sm:px-[35.8px] border-[1px] border-[green] hover:bg-[#E4FABF] hover:cursor-pointer hover:opacity-100 opacity-80`}>
                    <p className={`text-[green] text-[0.7em] font-bold inline`}>
                      4
                    </p>
                  </span>

                  <span
                    onClick={() => { setNumberOfRecipes(5) }}
                    className={`${numberOfRecipes == 5 ? `z-[-2]` : `z-10`}  py-2 px-[25px] sm:px-[35.8px] border-[1px] border-[green] hover:bg-[#E4FABF] hover:cursor-pointer hover:opacity-100 opacity-80`}>
                    <p className={`text-[green] text-[0.7em] font-bold inline`}>
                      5
                    </p>
                  </span>

                </span>

                <span className={`flex ml-auto row-start-1 col-start-2 `}>
                  <span
                    onClick={() => { }}
                    className={`transition-[margin] py-2 px-[25.5px] sm:px-[36px] 
                    ${numberOfRecipes == 3 ? `mr-[116.5px] sm:mr-[158px]` : numberOfRecipes == 4 ? `mr-[58.4px] sm:mr-[79px] ` : `mr-0`} 
                    border-[1px] border-[green]  bg-[#056835] `}>
                    <p className={`text-[white] text-[0.7em] font-bold inline`}>
                      {numberOfRecipes}

                    </p>
                  </span>

                </span>

              </span>

              <span className={`grid border-[1px] border-[#056835] rounded`}>

                <span className={`mx-2 border-b-[1px] border-slate-400 py-2`}>

                  <p className={` text-[0.8em] font-bold font-Financials text-[rgb(36,36,36)] `}>
                    Price Summary
                  </p>

                  <p className={` text-[0.8em] text-[rgb(36,36,36)] `}>
                    {`${numberOfRecipes} meals for ${numberOfPeople} people per week`}
                  </p>
                  <p className={` text-[0.8em] text-[rgb(36,36,36)] `}>
                    {`${numberOfRecipes * numberOfPeople} total servings `}
                  </p>
                </span>

                <span className={`mt-2`}>

                  <span className={`flex`}>
                    <p className={` ml-2 text-[0.8em] text-[rgb(36,36,36)] inline my-auto `}>
                      Box price
                    </p>

                    <p className={` text-[0.8em] font-medium font-Financials text-[rgb(36,36,36)] ml-auto mr-2 inline my-auto`}>
                      {`$${(numberOfPeople * numberOfRecipes * 4.5).toFixed(2)}`}
                    </p>
                  </span>

                  <span className={`flex `}>
                    <p className={` ml-2 text-[0.8em] text-[rgb(36,36,36)] inline my-auto`}>
                      Price per serving
                    </p>

                    <p className={` text-[0.8em] font-medium font-Financials text-[rgb(36,36,36)] ml-auto mr-2 inline my-auto`}>
                      {`$${((numberOfPeople * numberOfRecipes * 4.5) / (numberOfPeople * numberOfRecipes)).toFixed(2)}`}
                    </p>
                  </span>

                  <span className={`flex`}>
                    <p className={`ml-2 text-[0.8em] text-[rgb(36,36,36)] inline my-auto `}>
                      Shipping
                    </p>

                    <p className={` text-[0.8em] font-medium font-Financials text-[rgb(36,36,36)] ml-auto mr-2 inline my-auto`}>
                      +$3.00
                    </p>
                  </span>

                  <span className={`flex py-3 bg-slate-300 `}>
                    <p className={`ml-2 text-[0.8em] font-serif text-[rgb(36,36,36)] inline my-auto`}>
                      First Box Total
                    </p>

                    <p className={` text-[0.8em] font-medium font-Financials text-[rgb(36,36,36)] ml-auto mr-2 inline my-auto`}>
                      {`$${(numberOfPeople * numberOfRecipes * 4.5 + 3).toFixed(2)} `}

                    </p>
                  </span>
                </span>


              </span>

              <span onClick={() => {
                if (user.user) {
                  setActiveStep(2)
                }
                else {
                  setActiveStep(1)
                }
              }} className={`py-2 px-8 my-4 text-center border-[1px] border-[green] self-center bg-[#056835] hover:opacity-80 hover:cursor-pointer group`}>
                <p className={`text-[white] text-sm font-bold my-auto`}>
                  Select this plan
                </p>
              </span>

            </div>

            <Image
              width={150}
              height={150}
              className={`self-start hidden md:block`}
              alt={''}
              src={'/tablet-desktop-right.avif'}
            />
          </div>

          <div className={`col-start-1 col-end-8 row-start-3 justify-self-center self-center mt-4 sm:mt-0`}>

            <span className={`self-center justify-self-center text-center`}>
              <p className={` text-[2em] font-medium font-serif text-[rgb(36,36,36)] `}>
                What kind of recipes do you like?
              </p>
              <p className={` text-[1em] font-medium font-serif text-[rgb(36,36,36)] p-2 `}>
                Please select from the options below. You can always change them later.
              </p>
            </span>

            <span className={`flex justify-self-center self-center justify-center flex-wrap max-w-[1200px]  `}>


              {categories.map((category) => {
                return (
                  <RecipeCategory key={category.name} category={category.name} selected={category.selected} categories={categories} setCategories={setCategories} recipes={recipes} setFilteredRecipes={setFilteredRecipes} />
                )
              })}
            </span>

          </div>

          <div className={`col-start-1 col-end-8 row-start-4 justify-self-center self-center grid mt-8 sm:mt-0`}>

            <span className={`flex justify-self-center`}>
              <p className={` text-[1.5em] text-[rgb(36,36,36)] font-Financials inline`}>
                We save you serious
              </p>
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
                className={`my-auto`}
                style={{
                  height: '40px',
                  width: '40px',
                  marginLeft: "10px",

                  // margin: "auto",
                  display: 'inline',
                  fontSize: '1em',
                  // zIndex: "20",
                  color: "black",
                  textDecoration: "underline"
                }}
              />
            </span>

            <Carousel controls={false} className={`max-w-[550px]`} interval={2000} >

              <Carousel.Item fade="true" >
                <span className={`grid`}>
                  <p className={` text-center font-Financials text-[rgb(36,36,36)]`} >
                    {`          Delicious food, kid friendly menu, great prices, freebies,
                    Free giveaways to share, efficient timely delivery, well packed,
                    items all on ice, in the coolest boxed box I've ever seen a little cooler! wow!`}
                  </p>
                  <p className={` text-center font-Financials text-[grey] mb-4`} > - Sabah </p>

                  <Rating className={`justify-self-center `} name="size-small" defaultValue={5} size="small" readOnly />
                </span>
              </Carousel.Item>

              <Carousel.Item fade="true">
                <span className={`grid `}>
                  <p className={` text-center font-Financials text-[rgb(36,36,36)]`}  >
                    The recipes are varied, delicious, and easy to prepare.
                    The ingredients are good quality, especially the protein.
                    The price is reasonable for what you get.
                  </p>
                  <p className={` text-center font-Financials text-[grey]`} > - Manal </p>
                  <Rating className={`justify-self-center`} name="size-small" defaultValue={5} size="small" readOnly />
                </span>
              </Carousel.Item  >

              <Carousel.Item fade="true" >
                <span className={`grid `}>
                  <p className={` text-center font-Financials text-[rgb(36,36,36)]`} >
                    After using Boxeh for more than a year, my family is very satisfied with the food and service.
                  </p>
                  <p className={` text-center font-Financials text-[grey]`} > - Mohammed </p>
                  <Rating className={`justify-self-center`} name="size-small" defaultValue={5} size="small" readOnly />
                </span>
              </Carousel.Item>
            </Carousel>
          </div>

        </>
      }

      {activeStep == 2 &&

        <div className={`col-start-1 col-end-8 row-start-2 row-end-3 justify-self-center self-center grid shadow shadow-slate-400 mt-8 p-10 bg-[#FFFFFF]`}>

          <span className={`flex `}>
            <p className={` text-[0.7em] font-medium font-serif text-[rgb(36,36,36)] p-3 mx-auto`}>
              Please provide your address to see available delivery dates.
            </p>
          </span>

          <span className={`flex`} >
            <TextField
              value={firstName}
              error={error && !firstName}
              autoComplete="given-name"
              required
              sx={{ marginRight: "10px" }}
              autoFocus={true}
              color="success"
              id="outlined-basic"
              // label="First Name"
              helperText="First Name"
              variant="outlined"
              size="small"
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />

            <TextField
              value={lastName}
              error={error && !lastName}
              autoComplete="family-name"
              helperText='Last Name'
              required
              sx={{}}
              color="success"
              id="outlined-basic"
              // label="Last Name"
              variant="outlined"
              size="small"
              onChange={(e) => {

                setLastName(e.target.value)
              }}
            />

          </span>

          <span className={`flex py-4`} >

            <TextField
              value={address}
              error={error && !address}
              autoComplete={false}
              required
              sx={{ marginRight: "10px" }}
              color="success"
              id="outlined-basic"
              helperText="Address 1"
              variant="outlined"
              size="small"
              onChange={(e) => {

                setAddrress(e.target.value)
              }}
            />

            <TextField
              value={address2}
              sx={{}}
              color="success"
              id="outlined-basic"
              helperText="Address 2"
              placeholder='Apt., suite,floor'
              variant="outlined"
              size="small"
              onChange={(e) => {

                setAddrress2(e.target.value)
              }}
            />

          </span>

          <span className={`flex py-4`} >

            <TextField
              value={city}
              error={error && !city}
              required
              sx={{ marginRight: "10px" }}
              color="success"
              id="outlined-basic"
              helperText="City"
              variant="outlined"
              size="small"
              onChange={(e) => {

                setCity(e.target.value)
              }}
            />

            <TextField
              value={postalCode}
              error={error && !postalCode}
              required
              sx={{}}
              color="success"
              id="outlined-basic"
              helperText="Postal Code"
              variant="outlined"
              size="small"
              onChange={(e) => {

                setPostalCode(e.target.value)
              }}

            />

          </span>


          <span className={`flex py-4`} >

            <TextField
              value={phone}
              error={error && !phone}
              autoComplete='tel'
              required
              sx={{ marginRight: "10px" }}
              color="success"
              id="outlined-basic"
              placeholder='For delivery purposes'
              type="tel"
              helperText="Phone"
              variant="outlined"
              size="small"
              onChange={(e) => {

                setPhone(e.target.value)
              }} />

          </span>

          <span className={` `}>
            <TextField
              value={billingAddress}
              fullWidth
              id="outlined-select-currency-native"
              select
              label="Billing Address"
              SelectProps={{
                native: true,
              }}
              size="small"
              onChange={(e) => {
                console.log(e.target.value, "Ok")

                setBillingAddress(!billingAddress)

              }}
            >
              <option key={'Use delivery address'} value={false}>
                Use delivery address
              </option>
              <option key={'Add a billing address'} value={true}>
                Add a billing address
              </option>
            </TextField>

          </span>

          {billingAddress &&
            <>
              <span className={`flex `}>
                <p className={` text-[1.2em] font-medium font-serif text-[rgb(36,36,36)] p-3 mx-auto`}>
                  Billing Address
                </p>
              </span>

              <span className={`flex`} >

                <TextField
                  value={firstNameB}
                  error={error && !firstNameB}
                  autoComplete="given-name"
                  required
                  sx={{ marginRight: "10px" }}
                  color="success"
                  id="outlined-basic"
                  label="First Name"
                  size="small"
                  variant="outlined"
                  onChange={(e) => {
                    setFirstNameB(e.target.value)
                  }}
                />

                <TextField
                  value={lastNameB}
                  error={error && !lastNameB}
                  autoComplete="family-name"
                  required
                  sx={{}}
                  color="success"
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {

                    setLastNameB(e.target.value)
                  }}
                />

              </span>

              <span className={`flex py-4`} >

                <TextField
                  value={addressB}
                  error={error && !addressB}
                  required
                  sx={{ marginRight: "10px" }}
                  color="success"
                  id="outlined-basic"
                  label="Address 1"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {

                    setAddrressB(e.target.value)
                  }}
                />

                <TextField
                  value={address2B}
                  sx={{}}
                  color="success"
                  id="outlined-basic"
                  label="Address 2"
                  placeholder='Apt., suite,floor'
                  variant="outlined"
                  size="small"
                  onChange={(e) => {

                    setAddrress2B(e.target.value)
                  }}
                />

              </span>

              <span className={`flex py-4`} >

                <TextField
                  value={cityB}
                  error={error && !cityB}
                  required
                  sx={{ marginRight: "10px" }}
                  color="success"
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {

                    setCityB(e.target.value)
                  }}
                />

                <TextField
                  value={postalCodeB}
                  error={error && !postalCodeB}
                  required
                  sx={{}}
                  color="success"
                  id="outlined-basic"
                  label="Postal Code"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {

                    setPostalCodeB(e.target.value)
                  }}

                />

              </span>


              <span className={`flex py-4`} >

                <TextField
                  value={phoneB}
                  error={error && !phoneB}
                  autoComplete='tel'
                  required
                  sx={{ marginRight: "10px" }}
                  color="success"
                  id="outlined-basic"
                  placeholder='For delivery purposes'
                  type="tel"
                  label="Phone"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {

                    setPhoneB(e.target.value)
                  }} />

              </span>

            </>
          }

          <span onClick={() => {

            if ((firstName == "") || (lastName == "") || (address == "") || (city == "") || (postalCode == "") || (phone == "")) {
              setError(true)
            }
            else {

              if (billingAddress) {
                if ((firstNameB == "") || (lastNameB == "") || (addressB == "") || (cityB == "") || (postalCodeB == "") || (phoneB == "")) {
                  setError(true)
                }
                else {
                  setError(false)
                  setActiveStep(3)
                  setShippingConfirmed(true)
                }
              }
              else {
                setError(false)
                setActiveStep(3)
                setShippingConfirmed(true)

              }

            }

          }} className={`py-3 px-8 my-4 text-center border-[1px] border-[green] self-center bg-[#056835] hover:opacity-80 hover:cursor-pointer group`}>
            <p className={`text-[white] text-sm font-bold my-auto`}>
              Continue
            </p>
          </span>

        </div>
      }

      {clientSecret && activeStep == 3 && (
        <>
          <div className={`col-start-1 col-end-8 justify-self-center self-center row-start-2`}>

            {!stripePromise ?
              <>
                <SyncIcon className={`animate-spin text-4xl`} />
              </>
              :
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm setPaymentStatus={setPaymentStatus} PlaceOrder={PlaceOrder} />
              </Elements>
            }
          </div>

          <div className={`grid  my-4 col-start-1 col-end-8 lg:col-start-6 lg:col-end-8 row-start-3 lg:row-start-2 justify-self-center self-center lg:ml-8 shadow shadow-slate-400`}>
            
            <span className={`grid self-center min-w-[360px] lg:min-w-max`}>
              <p className={` text-[1em] font-light font-serif text-[rgb(36,36,36)] py-2 px-4`}>
                Summary
              </p>

              <span className={`flex px-4`}>
                <Image
                  width={25}
                  height={25}
                  className={``}
                  alt={''}
                  src={'/green-salad.svg'}
                />
                <span className={`grid`}>
                  <p className={`mx-2 font-serif text-[rgb(36,36,36)] my-auto`}>
                    {`${numberOfRecipes} recipes for ${numberOfPeople} people`}
                  </p>
                  <p className={`mx-2 font-light text-[rgb(36,36,36)] my-auto`}>
                    {`${numberOfRecipes * numberOfPeople} servings at ${((numberOfPeople * numberOfRecipes * 4.5) / (numberOfPeople * numberOfRecipes)).toFixed(2)} per serving `}
                  </p>
                </span>

              </span>

              <span className={`flex pt-4`}>
                <p className={` ml-2 text-[0.7em] font-serif text-[rgb(36,36,36)]  `}>
                  Box price
                </p>

                <p className={` text-[0.8em] font-medium font-Financials text-[rgb(36,36,36)] ml-auto mr-2`}>
                  {`$${(numberOfPeople * numberOfRecipes * 4.5).toFixed(2)}`}
                </p>
              </span>

              <span className={`flex `}>
                <p className={`ml-2 text-[0.7em] font-serif text-[rgb(36,36,36)] `}>
                  Shipping
                </p>

                <p className={` text-[0.8em] font-medium font-Financials text-[rgb(36,36,36)] ml-auto mr-2`}>
                  +$3.00
                </p>
              </span>
              <span className={`flex py-2 bg-slate-300 `}>
                <p className={`ml-2 text-[0.7em] font-serif text-[rgb(36,36,36)] my-auto`}>
                  Box Total
                </p>

                <p className={` text-[0.8em] font-medium font-Financials text-[rgb(36,36,36)] ml-auto mr-2`}>
                  {`$${(numberOfPeople * numberOfRecipes * 4.5 + 3).toFixed(2)} `}

                </p>
              </span>
              <span className={`flex pt-4 mx-2`}>
                <HomeOutlinedIcon className={`my-auto text-[20px]`} />
                <span className={`grid  my-auto`}>
                  <p className={` ml-2 text-[0.7em] font-serif text-[rgb(36,36,36)] my-auto`}>
                    Delivery address
                  </p>

                  <p className={`mx-2  text-[0.8em] font-medium font-Financials text-[rgb(36,36,36)] `}>
                    {`${address}, ${city}, ${postalCode} `}
                  </p>
                </span>
              </span>

              <span className={`flex pt-4 mx-2`}>
                <LocalShippingOutlinedIcon className={`my-auto text-[20px]`} />

                <span className={`grid `}>
                  <p className={` ml-2 text-[0.7em] font-serif text-[rgb(36,36,36)] my-auto`}>
                    Delivery date
                  </p>

                  <p className={`mx-2  text-[0.8em] font-medium font-Financials text-[rgb(36,36,36)] `}>
                    {`${moment(deliveryDate).format("dddd, MMM Do")} 8:00 a.m.–8:00 p.m. `}
                  </p>
                </span>
              </span>

            </span>

          </div>
        </>
      )}

      {activeStep == 4 && paymentStatus == 'succeeded' && (
        <div className={`col-start-1 col-end-8 row-start-2 justify-self-center self-center mt-4 sm:mt-0 sm:mx-8 shadow shadow-slate-400 grid`}>

          <p className={` text-[1em] sm:text-[1.5em] font-medium font-serif text-[rgb(36,36,36)] p-3 mx-auto`}>
            {`Congratulations! You're order has been placed successfully.`}          </p>

          <p className={` text-[0.8em] sm:text-[1em] font-medium font-serif text-[rgb(36,36,36)] px-3 mx-auto `}>
            Based on your select preference, here is a list of recipes you can select from
          </p>

          <span className={`flex justify-self-center self-center justify-center flex-wrap max-w-[1200px] `}>
            {categories.map((category) => {
              return (
                <RecipeCategory key={category.name} category={category.name} selected={category.selected} categories={categories} setCategories={setCategories} recipes={recipes} setFilteredRecipes={setFilteredRecipes} />
              )
            })}
          </span>

          <span className={`grid self-center justify-self-center`}>
            <p className={`text-[1em] sm:text-[1.5em]  font-medium font-serif text-[rgb(36,36,36)] mx-auto text-center `}>
              Selected Recipes {selectedReicpes.length} / {numberOfRecipes}
            </p>
            {overSelected &&
              <p className={` text-[1em] font-medium font-serif text-[rgb(36,36,36)] mx-auto text-center`}>
                {`You can't choose more than the selected plan's number of recipes ( ${numberOfRecipes} )`}</p>
            }
          </span>
          <span className={`overflow-hidden grid`}>

            <Slider filteredRecipes={filteredRecipes}
              setFilteredRecipes={setFilteredRecipes}
              selectedReicpes={selectedReicpes}
              setSelectedRecipes={setSelectedRecipes}
              numberOfRecipes={numberOfRecipes}
              overSelected={overSelected}
              setOverSelected={setOverSelected}
            />
          </span>

          <span
            onClick={async () => {

              if (numberOfRecipes == selectedReicpes.length) {
                setLoading(true)
                const docRef = doc(firebasedb, "Customers", uid, "Orders", orderRef);
                await updateDoc(docRef, {
                  selectedReicpes: selectedReicpes
                },
                ).then((res) => {
                  setLoading(false);
                  window.location = '/my-account'
                }).catch((err) => {
                  console.log(err)
                })

              }
              else {

              }
            }}
            className={`${numberOfRecipes == selectedReicpes.length ? `opacity-100 hover:cursor-pointer` : `opacity-50`} 
              group p-2 m-2 border-[1px] rounded text-center w-[175px] h-[48px] relative
               self-center justify-self-center bg-[#D2F895]
                text-[green] font-bold border-[green]`
            }
          >
            {loading ?
              <AutorenewIcon className={`animate-spin text-xl my-auto `} />
              :
              <p className={`text-sm inline my-auto mx-auto `}>
                Submit
              </p>
            }

          </span>

        </div>
      )
      }


    </div >
  )
}

export const getServerSideProps = async (context) => {
  try {
    const cookies = nookies.get(context);
    console.log(JSON.stringify(cookies, null, 2));
    const token = await AdminAuth.verifyIdToken(cookies.token);
    const { uid, email } = token;

    const db = AdminFireStore;

    // Add a new document in collection "Users"
    db.collection("Customers").doc(uid).set({
      uid: uid,
      email: email,
    })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    // the user is authenticated!
    // FETCH STUFF HERE

    return {
      props: { uid },

    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
      props: {}
    }
  }
};


export default Plans;