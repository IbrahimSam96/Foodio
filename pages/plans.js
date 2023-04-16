import Image from 'next/image'
// Client Firebase SDK
import { firebaseauth } from '@/InitFirebase'
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, signInWithPopup, GoogleAuthProvider
} from "firebase/auth";
import { useAuth } from '@/Authenticator';

//  Admin Firebase SDK
import { AdminAuth, AdminFireStore} from '@/AdminFirebase';

// SRS
import nookies from "nookies";
 
const Plans = ({ email, uid, token }) => {

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
    signInWithEmailAndPassword(firebaseauth, "Ibrahimsam96@gmail.com", "Password11@")
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Success")

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
    <div className={` h-full min-h-screen w-full grid grid-cols-[repeat(7,1fr)] grid-rows-[100px,25px,auto,100px] bg-[#131341]`}>

      <button onClick={() => {
        SignIn();
      }}>
        Sign In
      </button>

      <button onClick={() => {
        SignUp()
      }}>
        Sign Up
      </button>

      <button onClick={() => {
        SignInWithGoogle()
      }}>
        Sign in With Google
      </button>

      <button onClick={() => {
        SignOut()
      }}>
        Sign Out
      </button>

    </div>
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
      props: { email, uid, token },

    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    return {
      props: {},
    };
  }
};


export default Plans;