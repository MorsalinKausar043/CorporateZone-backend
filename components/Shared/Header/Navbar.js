/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ChartBarIcon,
  MenuIcon,
  RefreshIcon,
  ShieldCheckIcon,
  ViewGridIcon,
  XIcon,
} from "@heroicons/react/outline";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useFirebase from "../../../redux/slices/user/useFirebase";
import { MdLogin } from "react-icons/md";
import { BsChatRightText } from "react-icons/bs";
import { useRouter } from "next/router";
import Notification from "./Notification";
import axios from "axios";

const pages = [
  {
    name: "Jobs",
    href: "/jobs",
    icon: ChartBarIcon,
  },
  {
    name: "Features",
    href: "/works",
    icon: ShieldCheckIcon,
  },
  {
    name: " How Connects",
    href: "/works",
    icon: ViewGridIcon,
  },
];

export default function Navbar() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await fetch(
        "https://corporate-zone-backend-main.vercel.app/jobs/notifyJobs"
      );
      const data = await res.json();
      setNotifications(data);
    };
    fetchNotifications();
  }, [notifications]);

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { logOut } = useFirebase();

  // log out handler
  const logOutHandler = () => {
    dispatch(logOut);
    setIsOpen(!isOpen);
  };

  return (
    <Popover className="relative ">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex relative justify-between items-center border-b-2 border-gray-100 py-6 lg:justify-start md:space-x-10">
          <div className="flex justify-start md:w-0 md:flex-1">
            <Link href="/">
              <a className="flex items-center">
                <img
                  src="https://i.ibb.co/V29yZ2z/logo-zone.png"
                  className="w-16"
                  alt="logo"
                />
                <span className=" text-2xl font-extrabold  pl-3">
                  <span className="text-pink-500">Co</span>
                  <span className="dark:text-white">rporate Zo</span>
                  <span className="text-cyan-500">ne</span>
                </span>
              </a>
            </Link>
          </div>

          {/* done */}

          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          {/* second part */}

          <Popover.Group
            as="nav"
            className="hidden md:flex items-center space-x-10 uppercase relative"
          >
            <Link href="/jobs">
              <a className="text-base font-medium text-gray-500 dark:text-white hover:text-gray-900 dark:hover:text-gray-300">
                Jobs
              </a>
            </Link>
            <Link href="/works">
              <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                Features
              </a>
            </Link>
            <Link href="/works">
              <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                How Connects
              </a>
            </Link>

            {currentUser && currentUser?.role === "candidate" && (
              <Notification notifications={notifications} />
            )}

            {currentUser && (
              <>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center"
                >
                  <img
                    src={currentUser?.photoURL}
                    className="w-12 h-12 ring-2 ring-green-500"
                    style={{ borderRadius: "50%" }}
                    alt=""
                  />
                </button>
              </>
            )}
          </Popover.Group>
        </div>

        {/* user popup */}

        <div
          className={
            isOpen
              ? "bg-white dark:bg-slate-700 dark:text-white md:block hidden shadow-md  w-56  py-4 absolute z-10 rounded top-16 right-6"
              : "hidden"
          }
        >
          <button
            onClick={() => router.push("/dashboard/profile")}
            className="flex items-center hover:bg-slate-100 dark:hover:text-black py-2 px-5 w-full"
          >
            <img
              src={currentUser?.photoURL}
              className="w-10 h-10 mr-2 border "
              style={{ borderRadius: "50%" }}
              alt=""
            />
            <p className="">
              <p className="font-bold text-green-600 block">
                {loggedInUser?.username}
              </p>
              <p className="text-sm capitalize">{loggedInUser?.role}</p>
            </p>
          </button>
          {/* // post a job if loggedInUser user is a recruiter */}
          {loggedInUser?.role === "recruiter" && (
            <button
              onClick={() => router.push("/jobpost")}
              className="flex items-center hover:bg-slate-100 dark:hover:text-black py-2 px-5 w-full"
            >
              <BsChatRightText className="mr-2" /> Post a job
            </button>
          )}
          {/* make a review */}
          {loggedInUser?.role !== "admin" && (
            <button className="flex items-center hover:bg-slate-100 dark:hover:text-black py-2 px-5 w-full">
              <BsChatRightText className="mr-2" /> Share experience
            </button>
          )}
          {/* // log out button */}
          <button
            onClick={logOutHandler}
            className="flex items-center hover:bg-slate-100 dark:hover:text-black py-2 px-5 w-full"
          >
            <MdLogin className="mr-2" /> Log Out
          </button>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-10 inset-x-0 p-2 transition transform origin-top-right lg:hidden"
        >
          {/* here */}

          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            {/* here */}

            <div className="px-5">
              <div className="flex items-center justify-between">
                <div></div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>

              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <button
                    onClick={() => router.push("/dashboard/profile")}
                    className="flex items-center hover:bg-slate-100 dark:hover:text-black py-2 w-full"
                  >
                    <img
                      src={currentUser?.photoURL}
                      className="w-10 h-10 mr-2 border "
                      style={{ borderRadius: "50%" }}
                      alt=""
                    />
                    <p className="">
                      <p className="font-bold text-green-600 block">
                        {loggedInUser?.username}
                      </p>
                      <p className="text-sm capitalize">{loggedInUser?.role}</p>
                    </p>
                  </button>
                  {pages.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                        <item.icon
                          className="flex-shrink-0 h-6 w-6 text-indigo-600"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            <div className="py-6 px-5 space-y-6 relative">
              {loggedInUser ? (
                <>
                  <div className="bg-white dark:bg-slate-700 dark:text-white ">
                    {/* // post a job if loggedInUser user is a recruiter */}
                    {loggedInUser?.role === "recruiter" && (
                      <button
                        onClick={() => router.push("/jobpost")}
                        className="flex items-center hover:bg-slate-100 dark:hover:text-black py-3  w-full"
                      >
                        <BsChatRightText className="flex-shrink-0 h-6 w-6 text-indigo-600 mr-3" />{" "}
                        Post a job
                      </button>
                    )}
                    {/* make a review */}
                    {loggedInUser?.role !== "admin" && (
                      <button className="flex items-center hover:bg-slate-100 dark:hover:text-black py-3  w-full">
                        <BsChatRightText className="flex-shrink-0 h-6 w-6 text-indigo-600 mr-3" />{" "}
                        Share experience
                      </button>
                    )}
                    {/* // log out button */}
                    <button
                      onClick={logOutHandler}
                      className="w-full flex items-center justify-center px-4 py-2 my-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 "
                    >
                      <MdLogin className="flex-shrink-0 h-6 w-6  mr-3" /> Log
                      Out
                    </button>
                  </div>
                </>
              ) : (
                <div>
                  <Link href="/signup">
                    <a className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                      Sign up
                    </a>
                  </Link>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?{" "}
                    <Link href="/signin">
                      <a className="text-indigo-600 hover:text-indigo-500">
                        Sign in
                      </a>
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
