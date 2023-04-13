import Image from 'next/image'
import { supabase } from "../utility/supabaseClient"
import { firebaseauth } from '@/InitFirebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from "firebase/auth";

const Home = ({ Clients }) => {

  const provider = new GoogleAuthProvider();

  return (
    <div className={` h-full min-h-screen w-full grid grid-cols-[repeat(7,1fr)] grid-rows-[100px,25px,auto,100px] bg-[#131341]`}>

      <button onClick={() => {
        signInWithEmailAndPassword(firebaseauth, "Ibrahimsam96@gmail.com", "Password11@")
          .then((result) => {
            // window.location.href = '/';
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            console.log(user)

          }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(error)
            if (error == "FirebaseError: Firebase: Error (auth/wrong-password).") {
              signInWithPopup(firebaseauth, provider)
                .then((result) => {
                  // This gives you a Google Access Token. You can use it to access the Google API.
                  const credential = GoogleAuthProvider.credentialFromResult(result);
                  const token = credential.accessToken;
                  // The signed-in user info.
                  const user = result.user;
                  // IdP data available using getAdditionalUserInfo(result)
                  // ...
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
            // setloginerror(errorMessage)
            // setShow(true)
          });
      }}>
        Sign In
      </button>

      <button onClick={() => {
        createUserWithEmailAndPassword(firebaseauth, "Ibrahimsam96@gmail.com", "Password11@")
          .then((result) => {
            // window.location.href = '/';
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            console.log(user)

          }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(error)
            // setloginerror(errorMessage)
            // setShow(true)
          });
      }}>
        Sign Up
      </button>

      <button onClick={() => {
        signInWithPopup(firebaseauth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
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

      }}>
        Sign in With Google
      </button>

      <button onClick={() => {
        signOut(firebaseauth).then(() => {
          // Sign-out successful.
          console.log("success")
        }).catch((error) => {
          console.log(error)
          // An error happened.
        });

      }}>
        Sign Out
      </button>

    </div>
  )
}

export async function getServerSideProps() {

  let { data, error } = await supabase
    .from('clients')
    .select('id')


  return {
    props: {
      Clients: data
    },
  }
}


export default Home;