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
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';

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
                window.location = '/plans';
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
                window.location = '/plans';
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
                window.location = '/plans';

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
                console.log(error)
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

        <div className={`h-full min-h-screen w-full grid grid-cols-[repeat(7,1fr)] grid-rows-[60px,750px,350px] bg-[#F8F8F8]`}>

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
                    <span className={`col-start-6 p-4 mx-2 self-center justify-self-center hover:bg-[#FFFFFF] hover:cursor-pointer group`}>
                        <p className={`group-hover:text-[green] text-sm inline`}> My Account </p>
                        <svg className={`inline rotate-0 group-hover:rotate-180 ease-in-out	duration-300	`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" color="inherit"><path fillRule="evenodd" clipRule="evenodd" d="m12 16.333-6-6L7.333 9 12 13.667 16.667 9 18 10.333l-6 6Z"
                            fill="currentColor"></path>
                        </svg>

                        <span className={`hidden ml-[-100px] z-50 group-hover:grid bg-[#FFFFFF] absolute rounded grid-cols-[200px] shadow shadow-[green] `}>

                            <span className={`hover:bg-[#FFFFFF] p-3 `}>
                                <p className={` whitespace-nowrap text-sm	 `}>  My Orders </p>
                            </span>

                            <span className={`hover:bg-[#FFFFFF] p-3 flex`}>
                                <SupportAgentIcon className={`mr-2`} />
                                <p className={`whitespace-nowrap text-sm	`}> Support  </p>
                            </span>

                            <span onClick={() => {
                                SignOut()
                            }} className={`hover:bg-[#FFFFFF] p-3 flex`}>
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

            {action == "SignIn" ?
                <div className={`max-w-[450px] col-start-2 col-end-8 row-start-2 self-center justify-self-start grid bg-[#FFFFFF] border-[1px] border-slate-200 `}>

                    <p className={` text-3xl justify-self-center p-2`}>
                        Log In
                    </p>

                    <TextField
                        autoComplete="email"
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
                            {`Don't have an account?`}
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
                <div className={`max-w-[450px] col-start-2 col-end-8 row-start-2 self-center justify-self-start grid bg-[#FFFFFF] border-[1px] border-slate-200`}>
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
            <div className={`col-start-1 col-end-8 row-start-3 row-end-4 grid bg-[#FFFFFF] grid-cols-[repeat(7,1fr)]`}>
                <div className="justify-self-center sm:justify-self-auto col-start-2 col-end-7 row-start-3 row-end-4 grid grid-cols-1 bg-[#FFFFFF] ">

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