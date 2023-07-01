import styles from "../../styles/JobDetails.module.css";
import {
  FaFacebookF,
  FaLocationArrow,
  FaRegMoneyBillAlt,
} from "react-icons/fa";
import {
  AiOutlineTwitter,
  AiFillTags,
  AiTwotoneCalendar,
  AiFillStar,
} from "react-icons/ai";
import { GrLinkedinOption } from "react-icons/gr";
import { IoLogoGoogleplus, IoLogoPinterest } from "react-icons/io";
import { FcLikePlaceholder } from "react-icons/fc";
import { MdTitle } from "react-icons/md";
import Footer from "../../components/Shared/Footer/Footer";

export const getServerSideProps = async (context) => {
  const id = context.params.jobno;
  const res = await fetch(
    `https://corporate-zone-backend-main.vercel.app/jobs/${id}`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const jobdetails = ({ data }) => {
  const { main_head, Card_title, mini_title } = styles;
  const {
    jobTitle,
    jobDescription,
    responsibilities,
    skills,
    companyName,
    companyEmail,
    companyWebsite,
    companySize,
    businessType,
    companyLogo,
    jobType,
    salary,
    location,
    jobTags,
    experience,
    since,
    lastDate,
    postedTime,
  } = data;
  return (
    <>
      <main>
        <section className={`${main_head} py-20 px-2 md:px-10 lg:px-32`}>
          <div>
            <h1 className="text-white text-2xl font-semibold md:text-4xl">
              {jobTitle}
            </h1>
            <p className="mt-3 text-white">
              Home <span className="text-blue-300 "> &#x2794; </span>
              Job <span className="text-blue-300 "> &#x2794;</span>
              <span className="text-blue-300 ml-1">{jobTitle}</span>
            </p>
          </div>
        </section>
        <section className="w-11/12 grid grid-cols-3 gap-4 mx-auto my-10">
          <div className="col-span-3 md:col-span-2 bottom-1 border-cyan-100 py-4 px-6 md:py-10 md:px-12 shadow-md rounded-sm">
            <div>
              <h2 className="mb-4 text-xl font-bold">DESCTIPION</h2>
              <p className="text-base font-sans text-gray-500">
                {jobDescription}
              </p>
            </div>

            <div className="my-10">
              <h2 className="mb-4 text-xl font-bold">RESPONSIBILITIES</h2>
              <p className="text-base font-sans text-gray-500">
                Curabitur non nulla sit amet nisl tempus convallis quis ac
                lectus. Mauris blandit aliquet elit, eget tincidunt nibh
                pulvinar a. Praesent sapien massa, convallis a pellentesque nec,
                egestas non nisi. Curabitur aliquet quam id dui posuere blandit.
              </p>
              <ul className="list-none text-gray-500">
                {responsibilities.map((crrElm, index) => {
                  return (
                    <div key={index}>
                      <li className="mt-4">
                        <span className="text-red-500 mr-3">&#x2714;</span>
                        <span>{crrElm}</span>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>

            <div className="my-10">
              <h2 className="mb-4 text-xl font-bold">MINIMUM QUALIFICATIONS</h2>
              <ul className="list-none text-gray-500">
                {skills.map((crrElm, index) => {
                  return (
                    <li key={index} className="mt-4">
                      <span className="text-red-500 mr-3">&#x2714;</span>
                      <span>{crrElm}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="my-10">
              <h2 className="mb-4 text-xl font-bold">HOW TO APPLY</h2>
              <p className="text-base font-sans text-gray-500">
                Praesent sapien massa, convallis a pellentesque nec, egestas non
                nisi. Curabitur aliquet quam id dui posuere blandit. Curabitur
                aliquet quam id dui posuere blandit. Curabitur non nulla sit
                amet nisl tempus convallis quis ac lectus.
              </p>
            </div>

            <div className="my-10">
              <h2 className="mb-4 text-xl font-bold">VIDEOS</h2>
              <iframe
                className="inset-0 mt-6 rounded-md shadow-md mx-auto"
                width="600"
                height="315"
                src="https://www.youtube.com/embed/4P2jJRbtTck"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="my-10">
              <h2 className="mb-4 text-xl font-bold">LOCATIONS</h2>
              <iframe
                className="inset-0 mt-6 rounded-md shadow-md mx-auto "
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3746841.2106474624!2d88.09993645646647!3d23.495622700490763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adaaed80e18ba7%3A0xf2d28e0c4e1fc6b!2sBangladesh!5e0!3m2!1sen!2sbd!4v1644300400443!5m2!1sen!2sbd"
                width="600"
                height="300"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className="mt-12 mb-6 flex items-center ml-8">
              <h2 className="text-md font-bold">SHARE:</h2>
              <a className="ml-3 text-lg hover:text-blue-500" href="#">
                <FaFacebookF />
              </a>
              <a className="ml-3 text-xl hover:text-blue-400" href="#">
                <AiOutlineTwitter />
              </a>
              <a className="ml-3 text-lg hover:text-blue-400" href="#">
                <GrLinkedinOption />
              </a>
              <a className="ml-3 text-lg hover:text-red-500" href="#">
                <IoLogoGoogleplus />
              </a>
              <a className="ml-3 text-lg hover:text-red-500" href="#">
                <IoLogoPinterest />
              </a>
            </div>
            <div className=" flex items-center">
              <h2 className="text-md font-bold flex items-center">
                <AiFillTags className="text-blue-400 text-xl mr-2" /> Tagged as:
              </h2>
              <a className="ml-3 text-sm text-blue-400" href="#">
                Media,
              </a>
              <a className="ml-3 text-sm text-blue-400" href="#">
                Medicla,
              </a>
              <a className="ml-3 text-sm text-blue-400" href="#">
                Restaurants
              </a>
            </div>
          </div>

          <div
            style={{ height: "880px", borderBottom: "2px solid red" }}
            className="col-span-3 md:col-span-1 bottom-1 border-cyan-100 shadow-md rounded-sm"
          >
            <div>
              <h2 className={`${Card_title}`}>Job Overview</h2>
              <div className="text-center pt-8 pb-12">
                <img
                  className="w-30 self-center inline-block"
                  src={companyLogo}
                  alt="ImageLogo"
                />
                <h2 className="my-4 font-semibold font-sans">Pay Walt</h2>
                <h2 className={`mb-4 ${mini_title}`}>{companyName}</h2>
                <div className="flex flex-row items-center justify-center">
                  <button className="border-2 border-gray-400 rounded-sm p-1 hover:bg-red-500 hover:border-red-500">
                    <FcLikePlaceholder />
                  </button>
                  <button className="ml-6 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded text-xs">
                    FREELANCE
                  </button>
                </div>
                <hr className="my-10" />
                <div className="flex justify-start items-center">
                  <div className="ml-10">
                    <p className="flex items-center font-semibold">
                      <AiTwotoneCalendar className="text-red-400 mr-3 text-xl" />
                      Dated Posted:
                    </p>
                    <span className="ml-8 mt-1 text-gray-400 inline-block">
                      {postedTime.slice(0, 10)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-start py-6 items-center">
                  <div className="ml-10">
                    <p className="flex items-center font-semibold">
                      <FaLocationArrow className="text-red-400 mr-3 text-sm" />
                      Location:
                    </p>
                    <span className="ml-8 mt-1 text-gray-400 inline-block">
                      {location}
                    </span>
                  </div>
                </div>

                <div className="flex justify-start items-center">
                  <div className="ml-10">
                    <p className="flex items-center font-semibold">
                      <MdTitle className="text-red-400 mr-3 text-xl" />
                      Title:
                    </p>
                    <span className="ml-8 mt-1 text-gray-400 inline-block">
                      {jobTitle}
                    </span>
                  </div>
                </div>

                <div className="flex justify-start py-6 items-center">
                  <div className="ml-10">
                    <p className="flex items-center font-semibold">
                      <FaRegMoneyBillAlt className="text-red-400 mr-3 text-xl" />
                      Salary:
                    </p>
                    <span className="ml-8 mt-1 text-gray-400 inline-block">
                      {salary}
                    </span>
                  </div>
                </div>

                <div className="flex justify-start items-center">
                  <div className="ml-10">
                    <p className="flex items-center font-semibold">
                      <AiFillStar className="text-red-400 mr-3 text-xl" />
                      Experience:
                    </p>
                    <span className="ml-8 text-gray-400 mt-1 inline-block">
                      {experience}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center mt-6 items-center">
                  <div className="ml-10">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-20 rounded tracking-wider">
                      APPLY NOW!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default jobdetails;
