import Image from "next/image"
import { useAuth } from '@/Authenticator';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { firebaseauth, firebasedb } from '@/InitFirebase';
import { signOut } from "firebase/auth";
//  Admin Firebase SDK
import { AdminAuth } from '@/AdminFirebase';

// SRS
import nookies from "nookies";

import LogoutIcon from '@mui/icons-material/Logout';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import moment from "moment";

const MyAccount = ({ uid }) => {

    const user = useAuth();
    const router = useRouter();

    const [view, setView] = useState('activeOrders');
    const [activeOrders, setActiveOrders] = useState([]);
    const [pastOrders, setPastOrders] = useState([]);

    const [loading, setLoading] = useState(false)

    const SignOut = () => {
        signOut(firebaseauth).then(() => {
            // Sign-out successful.
            console.log("success")
        }).catch((error) => {
            console.log(error)
            // An error happened.
        });

    }


    useEffect(() => {

        const getData = async () => {
            setLoading(true)
            const colRef = collection(firebasedb, "Customers", uid, 'Orders');
            const querySnapshot = await getDocs(colRef);
            let active_Orders = [];
            let past_Orders = [];

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                let order = {}
                order = doc.data();
                order.id = doc.id;

                if (order.delivered) {
                    past_Orders.push(order);
                } else {
                    active_Orders.push(order);
                }
                // console.log(active_Orders)
            });
            active_Orders.sort((a, b) => a.deliveryDate - b.deliveryDate);
            past_Orders.sort((a, b) => a.deliveryDate - b.deliveryDate);

            setActiveOrders(active_Orders);
            setPastOrders(past_Orders);
            setLoading(false)
        }

        getData();

    }, [view, uid])

    return (
        <div className={`h-full min-h-screen w-full grid grid-cols-[repeat(7,1fr)] grid-rows-[64px,auto,250px] bg-[#FFFFFF]`}>

            <div className={`bg-[#FFFFFF] mx-2 fixed w-full z-30 col-start-1 col-end-8 grid grid-cols-[60px,160px,160px,160px,auto,150px] shadow shadow-slate-300 max-h-[64px]`}>

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

                <span onClick={() => setView('activeOrders')} className={` p-[22px] self-center justify-self-center hover:bg-[#D2F895] hover:cursor-pointer group ${view == "activeOrders" && `font-bold text-[green] border-b-[4px] border-[green]`}`}>
                    <p className={`group-hover:text-[green] text-sm whitespace-nowrap`}> My Deliveries </p>
                </span>

                <span onClick={() => setView('pastOrders')} className={` p-[22px] self-center justify-self-center hover:bg-[#D2F895] hover:cursor-pointer group ${view == "pastOrders" && `font-bold text-[green] border-b-[4px] border-[green]`}`}>
                    <p className={`group-hover:text-[green] text-sm whitespace-nowrap`}> Past Deliveries </p>
                </span>

                <span onClick={() => router.push('/plans')} className={` p-[22px] self-center justify-self-center hover:bg-[#D2F895] hover:cursor-pointer group`}>
                    <p className={`group-hover:text-[green] text-sm whitespace-nowrap`}> New Order </p>
                </span>


                {user.user &&
                    <span className={`col-start-6 mx-2 self-center justify-self-center hover:cursor-pointer group`}>

                        <p className={`group-hover:text-[green] text-sm inline`}> My Account </p>
                        <svg className={`inline rotate-0 group-hover:rotate-180 ease-in-out	duration-300`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" color="inherit"><path fillRule="evenodd" clipRule="evenodd" d="m12 16.333-6-6L7.333 9 12 13.667 16.667 9 18 10.333l-6 6Z"
                            fill="currentColor"></path>
                        </svg>

                        <span className={`hidden ml-[-100px] z-50 group-hover:grid bg-[#FFFFFF] absolute rounded grid-cols-[200px] shadow shadow-[green] `}>

                            <span className={`hover:bg-[#D2F895] p-3 border-b-[1px] border-slate-300`}>
                                <p className={` whitespace-nowrap text-sm`}>  My Orders </p>
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
                }
            </div>

            {view == 'activeOrders' &&
                <>
                    {loading &&
                        <span className={`col-start-1 col-end-8 row-start-2 grid justify-self-center self-center m-8`}>
                            <AutorenewIcon className={`text-[200px] text-green-500 animate-spin`} />
                        </span>
                    }
                    <div className={`col-start-1 col-end-8 row-start-2 grid justify-self-center self-center m-8`}>

                        {activeOrders.length > 0 && activeOrders.map((activeOrder) => {
                            return (
                                <span key={activeOrder.id} className={`justify-self-start self-center grid bg-[#F8F8F8] rounded p-1 m-2`}>

                                    <span className={`flex self-center mx-2`}>
                                        <p className={`my-auto text-[1em] font-medium font-serif text-[rgb(36,36,36)] inline`}>
                                            Menu for  {`${moment(activeOrder.deliveryDate).format("dddd, MMM Do")} Deleviry `}
                                        </p>
                                        <p className={`my-auto mx-2 inline text-[0.8em] text-[rgb(36,36,36)]`}>
                                            (8:00 a.m.–8:00 p.m.)
                                        </p>
                                    </span>

                                    <span className={`flex mx-2 self-center border-b-[1px] border-[green]`}>
                                        <p className={`my-auto inline text-[0.8em] text-[rgb(36,36,36)]`}>
                                            You can change your delivery date or recipes
                                        </p>
                                    </span>

                                    <span className={`flex justify-self-center self-center justify-start flex-wrap max-w-[1200px] `}>

                                        {activeOrder.selectedReicpes.map((recipe) => {
                                            return (
                                                <span key={recipe.name} className={`grid m-2 self-center bg-[#FFFFFF] max-w-[300px] shadow shadow-[grey] `}>
                                                    <Image
                                                        width={300}
                                                        height={200}
                                                        className={`self-center justify-self-center`}
                                                        alt={`${recipe.name}`}
                                                        src={`/${`${recipe.name}`}.jpeg`}
                                                    />
                                                    <p className={`mx-1 self-center justify-self-start text-[0.8em] font-bold text-[rgb(36,36,36)] inline`}>
                                                        {recipe.name}
                                                    </p>
                                                    <span className={`m-2 justify-self-start self-center flex`}>

                                                        <p className={`bg-[#CCCCCC] p-2 inline font-bold rounded text-[0.7em] `}> {recipe.time} min </p>

                                                        {recipe.tags.map((tag) => {
                                                            return (
                                                                <p key={tag} className={`bg-[#D2F895] p-2 mx-1 inline text-[green] font-bold rounded text-[0.7em]`}> {tag} </p>
                                                            )
                                                        })}

                                                    </span>
                                                </span>
                                            )
                                        })}
                                    </span>
                                </span>
                            )
                        })}

                    </div>
                </>
            }


            <div className="justify-self-center sm:justify-self-auto col-start-2 col-end-7 row-start-3 row-end-4 grid grid-cols-1 ">

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
    )
}

export default MyAccount;


export const getServerSideProps = async (context) => {
    try {
        const cookies = nookies.get(context);
        console.log(JSON.stringify(cookies, null, 2));

        const token = await AdminAuth.verifyIdToken(cookies.token);

        // If no token exists; redirect to '/login' 
        if (!token) {
            return {
                redirect: {
                    destination: `/login`,
                    permanent: false,
                },
                props: {
                    // email, uid, token
                }
            }

        }

        const { uid, email } = token;

        // User not logged in; no need for any SSR props; Becasue Catch statement will be triggered
        return {
            props: { uid, email },

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
