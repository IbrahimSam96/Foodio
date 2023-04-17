import Image from 'next/image'
// Client Firebase SDK
import { firebaseauth } from '@/InitFirebase'
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut, signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import { useAuth } from '@/Authenticator';

//  Admin Firebase SDK
// import { AdminAuth, AdminFireStore } from '@/AdminFirebase';

// SRS
import nookies from "nookies";
// MUI
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import { Checkbox, FormControlLabel } from '@mui/material';
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

    const SignUp = () => {
        createUserWithEmailAndPassword(firebaseauth, "Ibrahimsam96@gmail.com", "Password11@")
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Success")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(error)

            });

    }

    const SignIn = () => {
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

    return (

        <div className={`h-full min-h-screen w-full grid grid-cols-[repeat(7,1fr)] grid-rows-[60px,750px,350px] bg-white`}>

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

            <div className={`max-w-[450px] col-start-2 col-end-8 row-start-2 self-center justify-self-start grid `}>

                <p className={` text-2xl justify-self-center p-2`}>
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
                        console.log(v)
                        setEmail(v.target.value)
                    }}
                />
                <TextField
                    // value={password}
                    required
                    sx={{ margin: "10px" }}
                    color="success"
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(v) => {
                        console.log(v.target.value)
                        setPassword(v)
                    }}
                />
                <span className={`flex mx-2 p-4`}>
                    <FormControlLabel defaultChecked control={<Checkbox defaultChecked />} label="Keep me signed in" />
                    <Link className={`ml-auto `} href={'/login'}>
                        <p className={`my-3 text-[0.8em] font-medium font-serif text-[green] underline whitespace-nowrap `}>
                            Forgot Password?
                        </p>
                    </Link>
                </span>

                <span onClick={() => { SignIn() }} className={`text-center p-2 mx-3 self-center border-[1px] border-[green] bg-lime-300 hover:cursor-pointer hover:opacity-100 opacity-80`}>
                    <p className={`text-[green] text-sm font-bold`}>
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
                        onClick={() => { console.log('Google button clicked') }}
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
                    }} className={`text-[0.8em] font-medium font-serif text-[green] p-2 underline`}>
                        Sign up
                    </p>
                </span>


            </div>

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


export default Login;