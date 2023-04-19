import Image from 'next/image'
// Client Firebase SDK
import { firebaseauth } from '@/InitFirebase'
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import { useAuth } from '@/Authenticator';

//  Admin Firebase SDK
// import { AdminAuth, AdminFireStore} from '@/AdminFirebase';

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

import { styled } from '@mui/material/styles';
import { StepConnector, stepConnectorClasses } from '@mui/material';
import { useState } from 'react';


const Plans = () => {

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
    marginTop:"10px",
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

  return (
    <div className={` h-full min-h-screen w-full grid grid-cols-[repeat(7,1fr)] grid-rows-[60px,auto,350px] bg-[white]`}>

      <div className={`bg-[#EAE6DF] mx-2 fixed w-full z-30 col-start-1 col-end-8 grid grid-cols-[60px,1fr,150px] max-h-[60px] shadow shadow-lime-300 `}>

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

        <Stepper className={`justify-self-center `} alternativeLabel  activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label, index) => {
            return (
              < Step className={``} key={label} >
                <StepLabel className={`mx-4 hover:cursor-pointer `} onClick={() => {
                  setActiveStep((prev) => prev + 1)
                }} StepIconComponent={ColorlibStepIcon} >{label}</StepLabel>
              </Step>
            )
          }
          )
          }
        </Stepper>

      </div>

      <div className={`col-start-1 col-end-8 row-start-2 row-end-3 justify-self-center self-center grid shadow  shadow-slate-500 m-2 p-10`} >

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
              className={`transition-[margin] py-2 px-[35.8px] ${numberOfRecipes == 3 ? `mr-[158px]` : numberOfRecipes == 4 ? `mr-[79px] ` : `mr-0`} border-[1px] border-[green]  bg-[#056835] `}>
              <p className={`text-[white] text-[0.7em] font-bold inline`}>
                {numberOfRecipes}

              </p>
            </span>

          </span>

        </span>

        <span className={`grid  border-[2px] border-slate-400 rounded`}>

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
                {`$${(numberOfPeople * numberOfRecipes * 4.5 / numberOfPeople * numberOfRecipes).toFixed(2)}`}
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

            <span className={`flex py-4 bg-slate-400 `}>
              <p className={`ml-2 text-[0.7em] font-serif text-[rgb(36,36,36)] my-auto`}>
                First Box Total
              </p>

              <p className={` text-[0.8em] font-medium font-Financials text-[rgb(36,36,36)] ml-auto mr-2`}>
                {`$${(numberOfPeople * numberOfRecipes * 4.5 + 3).toFixed(2) } `}

              </p>
            </span>
          </span>

        </span>

      </div>
    </div >
  )
}

// export const getServerSideProps = async (context) => {
//   try {
//     const cookies = nookies.get(context);
//     console.log(JSON.stringify(cookies, null, 2));
//     const token = await AdminAuth.verifyIdToken(cookies.token);
//     const { uid, email } = token;

//     const db = AdminFireStore;

//     // Add a new document in collection "Users"
//     db.collection("Customers").doc(uid).set({
//       uid: uid,
//       email: email,
//     })
//       .then(() => {
//         console.log("Document successfully written!");
//       })
//       .catch((error) => {
//         console.error("Error writing document: ", error);
//       });

//     // the user is authenticated!
//     // FETCH STUFF HERE

//     return {
//       props: { email, uid, token },

//     };
//   } catch (err) {
//     // either the `token` cookie didn't exist
//     // or token verification failed
//     // either way: redirect to the login page
//     // either the `token` cookie didn't exist
//     // or token verification failed
//     // either way: redirect to the login page
//     return {
//       props: {},
//     };
//   }
// };


export default Plans;