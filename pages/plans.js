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

import { styled } from '@mui/material/styles';
import { Checkbox, StepConnector, TextField, stepConnectorClasses } from '@mui/material';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from "swiper";

import SyncIcon from '@mui/icons-material/Sync';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/effect-coverflow";
import moment from 'moment/moment';


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
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
  }, [shippingConfirmed, paymentStatus]);

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
      numberOfRecipes: numberOfRecipes
    });

    setActiveStep(4);

  }

  return (
    <div className={` h-full min-h-screen w-full grid grid-cols-[repeat(7,1fr)] grid-rows-[60px,auto,350px] bg-[white]`}>

      <div className={`bg-[#EAE6DF] mx-2 fixed w-full z-30 col-start-1 col-end-8 grid grid-cols-[60px,1fr,150px] max-h-[60px] shadow shadow-slate-300 `}>

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

        <Stepper className={`justify-self-center `} alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
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
          <div className={`col-start-1 col-end-8 row-start-2 row-end-3 justify-self-center self-center flex mx-4`}>

            <Image
              width={150}
              height={150}
              className={`self-center hidden sm:block`}
              alt={''}
              src={'/tablet-desktop-left.avif'}
            />

            <div className={`col-start-1 col-end-8 row-start-2 row-end-3 justify-self-center self-center grid shadow shadow-slate-400 mt-8 p-10`} >


              <p className={` text-[1.5em] font-medium font-serif text-[rgb(36,36,36)] p-3 mx-auto`}>Choose your plan size
              </p>

              <p className={` text-[0.7em] font-medium font-serif text-[rgb(36,36,36)] py-4 mx-auto`}>
                We'll set this as your default size, but you can always change it from week to week.
              </p>

              <span className={`self-center grid grid-rows-1 `}>

                <span className={`self-center row-start-1 col-start-1`}>
                  <p className={` text-[0.7em] font-medium font-serif text-[rgb(36,36,36)] `}>
                    Number of people
                  </p>
                </span>

                <span className={`flex ml-auto row-start-1 col-start-2 `}>
                  <span
                    onClick={() => { setNumberOfPeople(2) }}
                    className={`${numberOfPeople == 2 ? `z-[-2]` : `z-10`} py-2 px-14 border-[1px] border-[green] hover:bg-[#E4FABF] hover:cursor-pointer hover:opacity-100 opacity-80`}>
                    <p className={`text-[green] text-[0.7em] font-bold inline`}>
                      2
                    </p>
                  </span>

                  <span
                    onClick={() => { setNumberOfPeople(4) }}
                    className={`${numberOfPeople == 4 ? `z-[-2]` : `z-10`}  py-2 px-14 border-[1px] border-[green] hover:bg-[#E4FABF] hover:cursor-pointer hover:opacity-100 opacity-80`}>
                    <p className={`text-[green] text-[0.7em] font-bold inline`}>
                      4
                    </p>
                  </span>

                </span>

                <span className={`flex ml-auto row-start-1 col-start-2 `}>
                  <span
                    onClick={() => { }}
                    className={`py-2 px-14 transition-[margin] ${numberOfPeople == 2 ? `mr-[119px]` : `mr-0`} border-[1px] border-[green]  bg-[#056835] `}>
                    <p className={`text-[white] text-[0.7em] font-bold inline`}>
                      {numberOfPeople}

                    </p>
                  </span>

                </span>
              </span>

              <span className={`self-center grid grid-rows-1 py-4 `}>

                <span className={`self-center row-start-1 col-start-1`}>
                  <p className={` text-[0.7em] font-medium font-serif text-[rgb(36,36,36)] `}>
                    Recipes per week
                  </p>
                </span>

                <span className={`flex ml-auto row-start-1 col-start-2 `}>
                  <span
                    onClick={() => { setNumberOfRecipes(3) }}
                    className={`${numberOfRecipes == 3 ? `z-[-2]` : `z-10`} py-2 px-[35.8px] border-[1px] border-[green] hover:bg-[#E4FABF] hover:cursor-pointer hover:opacity-100 opacity-80`}>
                    <p className={`text-[green] text-[0.7em] font-bold inline`}>
                      3
                    </p>
                  </span>

                  <span
                    onClick={() => { setNumberOfRecipes(4) }}
                    className={`${numberOfRecipes == 4 ? `z-[-2]` : `z-10`}  py-2 px-[35.8px] border-[1px] border-[green] hover:bg-[#E4FABF] hover:cursor-pointer hover:opacity-100 opacity-80`}>
                    <p className={`text-[green] text-[0.7em] font-bold inline`}>
                      4
                    </p>
                  </span>

                  <span
                    onClick={() => { setNumberOfRecipes(5) }}
                    className={`${numberOfRecipes == 5 ? `z-[-2]` : `z-10`}  py-2 px-[35.8px] border-[1px] border-[green] hover:bg-[#E4FABF] hover:cursor-pointer hover:opacity-100 opacity-80`}>
                    <p className={`text-[green] text-[0.7em] font-bold inline`}>
                      5
                    </p>
                  </span>

                </span>

                <span className={`flex ml-auto row-start-1 col-start-2 `}>
                  <span
                    onClick={() => { }}
                    className={`transition-[margin] py-2 px-[36px] ${numberOfRecipes == 3 ? `mr-[158px]` : numberOfRecipes == 4 ? `mr-[79px] ` : `mr-0`} border-[1px] border-[green]  bg-[#056835] `}>
                    <p className={`text-[white] text-[0.7em] font-bold inline`}>
                      {numberOfRecipes}

                    </p>
                  </span>

                </span>

              </span>

              <span className={`grid  border-[2px] border-[darkseagreen] rounded`}>

                <span className={`mx-2 border-b-[1px] border-slate-400 py-2`}>

                  <p className={` text-[0.7em] font-bold font-serif text-[rgb(36,36,36)] `}>
                    Price Summary
                  </p>

                  <p className={` text-[0.7em] font-serif text-[rgb(36,36,36)] py-2`}>
                    {`${numberOfRecipes} meals for ${numberOfPeople} people per week`}
                  </p>
                  <p className={` text-[0.7em] font-medium font-serif text-[rgb(36,36,36)] `}>
                    {`${numberOfRecipes * numberOfPeople} total servings `}
                  </p>
                </span>

                <span className={``}>

                  <span className={`flex pt-4`}>
                    <p className={` ml-2 text-[0.7em] font-serif text-[rgb(36,36,36)] `}>
                      Box price
                    </p>

                    <p className={` text-[0.8em] font-medium font-Financials text-[rgb(36,36,36)] ml-auto mr-2`}>
                      {`$${(numberOfPeople * numberOfRecipes * 4.5).toFixed(2)}`}
                    </p>
                  </span>

                  <span className={`flex py-1`}>
                    <p className={` ml-2 text-[0.7em] font-serif text-[rgb(36,36,36)]`}>
                      Price per serving
                    </p>

                    <p className={` text-[0.8em] font-medium font-Financials text-[rgb(36,36,36)] ml-auto mr-2`}>
                      {`$${((numberOfPeople * numberOfRecipes * 4.5) / (numberOfPeople * numberOfRecipes)).toFixed(2)}`}
                    </p>
                  </span>

                  <span className={`flex py-1`}>
                    <p className={`ml-2 text-[0.7em] font-serif text-[rgb(36,36,36)] `}>
                      Shipping
                    </p>

                    <p className={` text-[0.8em] font-medium font-Financials text-[rgb(36,36,36)] ml-auto mr-2`}>
                      +$3.00
                    </p>
                  </span>

                  <span className={`flex py-4 bg-slate-300 `}>
                    <p className={`ml-2 text-[0.7em] font-serif text-[rgb(36,36,36)] my-auto`}>
                      First Box Total
                    </p>

                    <p className={` text-[0.8em] font-medium font-Financials text-[rgb(36,36,36)] ml-auto mr-2`}>
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
                <p className={`text-[white] text-sm font-bold`}>
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
          <div className={`col-start-1 col-end-8 row-start-3 grid `}>

            <span className={`self-center justify-self-center text-center`}>
              <p className={` text-[1.5em] font-medium font-serif text-[rgb(36,36,36)] `}>
                Over 35 fresh recipes every week
              </p>
              <p className={` text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2 `}>
                and a changing selection of desserts, snacks, and sides
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

          </div>
        </>
      }

      {activeStep == 2 &&

        <div className={`col-start-1 col-end-8 row-start-2 row-end-3 justify-self-center self-center grid shadow shadow-slate-400 mt-8 p-10`}>

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
              color="success"
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />

            <TextField
              value={lastName}
              error={error && !lastName}
              autoComplete="family-name"
              required
              sx={{}}
              color="success"
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              onChange={(e) => {

                setLastName(e.target.value)
              }}
            />

          </span>

          <span className={`flex py-4`} >

            <TextField
              value={address}
              error={error && !address}

              required
              sx={{ marginRight: "10px" }}
              color="success"
              id="outlined-basic"
              label="Address 1"
              variant="outlined"
              onChange={(e) => {

                setAddrress(e.target.value)
              }}
            />

            <TextField
              value={address2}
              sx={{}}
              color="success"
              id="outlined-basic"
              label="Address 2"
              placeholder='Apt., suite,floor'
              variant="outlined"
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
              label="City"
              variant="outlined"
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
              label="Postal Code"
              variant="outlined"
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
              label="Phone"
              variant="outlined"
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

          }} className={`py-2 px-8 my-4 text-center border-[1px] border-[green] self-center bg-[#056835] hover:opacity-80 hover:cursor-pointer group`}>
            <p className={`text-[white] text-sm font-bold`}>
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

          <div className={`col-start-1 col-end-8 lg:col-start-6 lg:col-end-8 row-start-3 lg:row-start-2 justify-self-center self-center ml-8 shadow shadow-slate-400`}>

            <span className={``}>
              <p className={` text-[1em] font-light font-serif text-[rgb(36,36,36)] py-4 px-4`}>
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
                  <p className={`mx-2 font-serif text-[rgb(36,36,36)] `}>
                    {`${numberOfRecipes} recipes for ${numberOfPeople} people`}
                  </p>
                  <p className={`mx-2 font-light text-[rgb(36,36,36)]`}>
                    {`${numberOfRecipes * numberOfPeople} servings at ${((numberOfPeople * numberOfRecipes * 4.5) / (numberOfPeople * numberOfRecipes)).toFixed(2)} per serving `}
                  </p>
                </span>

              </span>

              <span className={`flex pt-4`}>
                <p className={` ml-2 text-[0.7em] font-serif text-[rgb(36,36,36)] `}>
                  Box price
                </p>

                <p className={` text-[0.8em] font-medium font-Financials text-[rgb(36,36,36)] ml-auto mr-2`}>
                  {`$${(numberOfPeople * numberOfRecipes * 4.5).toFixed(2)}`}
                </p>
              </span>

              <span className={`flex py-1`}>
                <p className={`ml-2 text-[0.7em] font-serif text-[rgb(36,36,36)] `}>
                  Shipping
                </p>

                <p className={` text-[0.8em] font-medium font-Financials text-[rgb(36,36,36)] ml-auto mr-2`}>
                  +$3.00
                </p>
              </span>
              <span className={`flex py-4 bg-slate-300 `}>
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
                  <p className={` ml-2 text-[0.7em] font-serif text-[rgb(36,36,36)] `}>
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
                  <p className={` ml-2 text-[0.7em] font-serif text-[rgb(36,36,36)] `}>
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
        <div className={`col-start-1 col-end-8  row-start-2 justify-self-center self-center mx-8 shadow shadow-slate-400`}>
          <p className={` text-[1.5em] font-medium font-serif text-[rgb(36,36,36)] p-3 mx-auto`}>
            Congratulations! You're order has been placed successfully. 
          </p>

        </div>
      )}


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