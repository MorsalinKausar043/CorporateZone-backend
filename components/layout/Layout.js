import Head from "next/head";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initialUserData } from "../../redux/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import initializeAuthentication from "../../firebase";
import { ThemeProvider } from "../Shared/Header/themeContext";

const Layout = ({ title, children }) =>
{
  initializeAuthentication();

  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);
  const dispatch = useDispatch();
  const auth = getAuth();
  //   // observer function
  useEffect(() =>
  {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
    {
      if (user) {
        dispatch(initialUserData({ user }));
      } else {
        dispatch(initialUserData(null));
      }
    });
    return () => unsubscribe;
  }, [auth]);

  return (
    <>
      <ThemeProvider>
        <Head>
          <title>{title}</title>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
            integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
          />
        </Head>
        <main className="bg-white dark:bg-slate-700">{children}</main>
      </ThemeProvider>
    </>
  );
};

export default Layout;
