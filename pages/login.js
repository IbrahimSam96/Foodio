import Image from 'next/image'
// Client Firebase SDK
import { firebaseauth } from '@/InitFirebase'
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut, signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import { useAuth } from '@/Authenticator';

//  Admin Firebase SDK
import { AdminAuth } from '@/AdminFirebase';

// SRS
import nookies from "nookies";
// MUI
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { Checkbox, FormControlLabel, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import GoogleButton from 'react-google-button'
import { useRouter } from 'next/router';
import { useState } from 'react';

const Login = () => {



    const user = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [action, setAction] = useState("SignIn");

    const provider = new GoogleAuthProvider();

    const SignUp = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(firebaseauth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Success")
                // ...
                router.push('/plans');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(error)

            });

    }

    const SignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(firebaseauth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Success")
                router.push('/plans');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
                if (error == 'FirebaseError: Firebase: Error (auth/wrong-password).') {
                    SignInWithGoogle()
                }
            });

    }

    const SignInWithGoogle = () => {
        signInWithPopup(firebaseauth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                router.push('/plans');

                console.log(result)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const SignOut = () => {
        signOut(firebaseauth).then(() => {
            // Sign-out successful.
            console.log("success")
        }).catch((error) => {
            console.log(error)
            // An error happened.
        });

    }

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (

        <div className={`h-full min-h-screen w-full grid grid-cols-[repeat(7,1fr)] grid-rows-[60px,750px,350px] bg-white`}>

            <div className={`bg-[#EAE6DF] mx-2 fixed w-full z-30 col-start-1 col-end-8 grid grid-cols-[60px,100px,160px,160px,auto,150px] shadow shadow-slate-300 `}>

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
                        <p className={`group-hover:text-[green] text-sm `}> My Account </p>
                    </span>

                    :
                    <span onClick={() => router.push('/login')} className={`col-start-6 py-2 px-8 mx-4 border-[1px] border-[green] self-center justify-self-end hover:bg-[#E4FABF] hover:cursor-pointer group`}>
                        <p className={`text-[green] text-sm font-bold`}>
                            Log In
                        </p>
                    </span>
                }

            </div>

            {action == "SignIn" ?
                <div className={`max-w-[450px] col-start-2 col-end-8 row-start-2 self-center justify-self-start grid `}>

                    <p className={` text-3xl justify-self-center p-2`}>
                        Log In
                    </p>

                    <TextField
                        // value={email}
                        required
                        sx={{ margin: "10px" }}
                        color="success"
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        onChange={(v) => {
                            console.log(v.target.value)
                            setEmail(v.target.value)
                        }}
                    />
                    <OutlinedInput
                        // value={password}
                        required
                        sx={{ margin: "10px" }}
                        color="success"
                        label="Choose a password"
                        autoComplete="current-password"
                        onChange={(v) => {
                            console.log(v.target.value)
                            setPassword(v.target.value)
                        }}

                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <span className={`flex mx-2 p-4`}>
                        <FormControlLabel defaultChecked control={<Checkbox defaultChecked />} label="Keep me signed in" />
                        <Link className={`ml-auto `} href={'/login'}>
                            <p className={`my-3 text-[0.8em] font-medium font-serif text-[green] underline whitespace-nowrap `}>
                                Forgot Password?
                            </p>
                        </Link>
                    </span>

                    <span onClick={(e) => SignIn(e)} className={`text-center p-2 mx-3 self-center border-[1px] border-[green] bg-[#056835] hover:cursor-pointer hover:opacity-100 opacity-80`}>
                        <p className={`text-[white] text-sm font-bold`}>
                            Log In
                        </p>
                    </span>

                    <span className={`flex p-4 `} >
                        <svg width="100%" height="30" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 10 10 L 300 10" stroke="#000" />
                        </svg>

                        <p className={`text-xs mx-2`}>or</p>

                        <svg width="100%" height="30" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 10 10 L 300 10" stroke="#000" />
                        </svg>
                    </span>
                    <span className={`justify-self-center `}>
                        <GoogleButton
                            onClick={() => { SignInWithGoogle() }}
                        />

                    </span>

                    <span className={`flex justify-self-center`}>
                        <p className={` text-[0.8em] font-medium font-serif text-[rgb(36,36,36)] p-2 justify-self-center `}>
                            Don't have an account?

                        </p>
                        <p onClick={() => {
                            setAction('SignUp');
                            setEmail("")
                            setPassword("")
                        }} className={`text-[0.8em] font-medium font-serif text-[#056835] p-2 underline hover:cursor-pointer`}>
                            Sign up
                        </p>
                    </span>


                </div>
                :
                <div className={`max-w-[450px] col-start-2 col-end-8 row-start-2 self-center justify-self-start grid `}>
                    <p className={` text-3xl justify-self-center p-2`}>
                        Create a Boxeh account
                    </p>

                    <TextField
                        value={email}
                        required
                        sx={{ margin: "10px", width: "400px" }}
                        color="success"
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        onChange={(v) => {
                            console.log(v)
                            setEmail(v.target.value)
                        }}
                    />

                    <OutlinedInput
                        value={password}
                        required
                        sx={{ margin: "10px", width: "400px" }}
                        color="success"
                        label="Choose a password"
                        autoComplete="current-password"
                        onChange={(v) => {
                            console.log(v.target.value)
                            setPassword(v.target.value)
                        }}

                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />

                    {/* <TextField
                        // value={password}
                        required
                        sx={{ margin: "10px", width: "400px" }}
                        color="success"
                        id="outlined-password-input"
                        label="Choose a password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(v) => {
                            console.log(v.target.value)
                            setPassword(v)
                        }}
                    />
 */}
                    <p className={`m-3 text-[0.8em] font-medium font-serif whitespace-nowrap `}>
                        Password should be a minimum of 5 characters
                    </p>

                    <span className={`flex mx-2 p-4`}>
                        <FormControlLabel className={`mr-0`} defaultChecked control={<Checkbox defaultChecked />} />
                        <p className={`my-3 text-[0.8em] font-medium font-serif whitespace-nowrap `}>
                            Keep me signed in
                        </p>

                    </span>

                    <span onClick={(e) => { SignUp(e) }} className={`text-center p-2 mx-3 self-center border-[1px] border-[green] bg-[#056835] hover:cursor-pointer hover:opacity-100 opacity-80`}>
                        <p className={`text-[white] text-sm font-bold`}>
                            Continue
                        </p>
                    </span>

                    <p onClick={() => {
                        setAction('SignIn');
                        setEmail("")
                        setPassword("")
                    }} className={`my-3 text-[0.8em] font-medium font-serif text-[#056835] underline whitespace-nowrap text-center hover:cursor-pointer `}>
                        Go back
                    </p>
                </div>
            }


            <div className="border-4 border-t-lime-300 mt-8 mx-8 col-start-1 col-end-8 row-start-3 row-end-4 grid grid-rows-2">

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
        </div>
    )
}

export const getServerSideProps = async (context) => {
    try {
        const cookies = nookies.get(context);
        console.log(JSON.stringify(cookies, null, 2));

        const token = await AdminAuth.verifyIdToken(cookies.token);
        const { uid, email } = token;

        // If token exists no need to log in again; redirect to '/' 
        if (token) {
            return {
                redirect: {
                    destination: `/`,
                    permanent: false,
                },
                props: {
                    // email, uid, token
                }
            }

        }

        // User not logged in; no need for any SSR props; Becasue Catch statement will be triggered

        return {
            props: {},

        };
    } catch (err) {
        // either the `token` cookie didn't exist
        // or token verification failed
        // either way: allow user to stay on page to login
        return {
            props: {

            },
        };
    }
};




export default Login;