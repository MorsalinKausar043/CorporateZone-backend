import axios from "axios";
import cogoToast from "cogo-toast";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signIn,
  signOutCurrentUser,
  loggedInUserData,
  registerFailed,
} from "./userSlice";

const useFirebase = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const router = useRouter();

  const auth = getAuth();

  const signupWithEmailAndPassword = (
    username,
    email,
    password,
    photoURL,
    userInfo
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: photoURL,
        });

        saveData(userInfo);
      })
      .catch((err) => {
        cogoToast.error(err ? err.message : "authentication failed");
        dispatch(registerFailed(err.message));
      });
  };

  // sign in
  const logInWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        dispatch(signIn(result.user));

        router.push("/");
      })
      .catch((err) => {
        cogoToast.error(err ? err.message : "authentication failed");
        dispatch(registerFailed(err.message));
      });
  };

  // sign out
  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(signOutCurrentUser());
      })
      .catch((err) => {
        dispatch(registerFailed(err.message));
      });
  };

  useEffect(() => {
    fetch(
      `https://corporate-zone-backend-main.vercel.app/users/signleUser/${currentUser?.email}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(loggedInUserData(data));
      });
  }, [currentUser?.email]);

  // data save to database
  const saveData = async (data) => {
    try {
      const res = await fetch(
        "https://corporate-zone-backend-main.vercel.app/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      if (result) {
        console.log(result);
        router.push("/dashboard/profile");
      } else {
        console.log(error);
      }
      // axios
      //   .post("http://localhost:4030/users/register", data)
      //   .then(function (response) {
      //     console.log(response);
      //     router.push("/dashboard/profile");
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    } catch (err) {
      console.error(err);
    }
  };

  return { logInWithEmailAndPassword, signupWithEmailAndPassword, logOut };
};

export default useFirebase;
