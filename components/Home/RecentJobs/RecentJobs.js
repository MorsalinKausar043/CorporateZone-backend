import Image from "next/image";
import ContainerStyles from "../../../styles/Home.module.css";
import style from "./RecentJobs.module.css";
import { BsBuilding } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { ImLocation2 } from "react-icons/im";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Features from "../Features/Features";

const RecentJobs = (props) => {
  const [jobs, setJobs] = useState(props.jobs);
  const [category, setCategory] = useState();
  const [display, setDisplay] = useState([]);

  const router = useRouter();

  const filterJobs = async (e) => {
    setCategory(e.target.value);
    const response = await fetch(
      `https://corporate-zone-backend-main.vercel.app/jobs?jobType=${e.target.value}`
    );
    const data = await response.json();
    console.log(data.data);
    setJobs(data.data.reverse());
    setDisplay(data.data);

    router.push(`/?jobType=${e.target.value}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    fetch("https://corporate-zone-backend-main.vercel.app/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.data.reverse());
        setDisplay(data.data);
        console.log(data.data);
      });
  }, []);

  const handleChange = (event) => {
    const sarchText = event.target.value;
    const matched = jobs.filter((job) =>
      job.jobTitle.toLowerCase().includes(sarchText.toLowerCase())
    );
    setDisplay(matched);
    console.log(matched);
  };

  return (
    <>
      <Features job={jobs} />
      <div className="bg-slate-100 py-10 " style={{ display: "inlineBlock" }}>
        <div className="space-y-7 mx-auto md:w-3/4 relative mb-6 recent_header">
          <h3 className="text-3xl text-center after:content-[''] after:absolute after:border-t-2 after:w-16 after: after:border-cyan-500 after:left-0 after:bottom-0 after:right-32 after:top-10 after:mx-auto font-medium text-slate-700 uppercase">
            Recent Jobs {display?.length}
          </h3>

          <div className={style.search}>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search Job Keyword..."
              type="text"
              name="search"
              onChange={handleChange}
            />
          </div>

          <div className={style.time}>
            <select
              style={{ padding: "10px 30px", backgroundColor: "#85F4FF" }}
              name=""
              id=""
              value={category}
              className="text-black  px-2 py-2  focus:outline-none rounded"
              onChange={filterJobs}
            >
              <option value="all">All Jobs</option>
              <option value="intern">Intern</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
            </select>
          </div>
        </div>
        <div style={{ width: "80%", margin: "0 auto" }}>
          {display?.map((job) => (
            <div
              className={style.singe}
              style={{
                backgroundColor: "white",
                marginTop: "20px",
                padding: "25px 0",
              }}
              key={job.id}
            >
              <div className={style.gri}>
                <div>
                  <img src={job.companyLogo} alt="" width="100" height="100" />
                </div>
                <div>
                  <div className={style.icon}>
                    <BsBuilding className={style.icons} />
                    <h2 id={style.sing}>{job.jobTitle}</h2>
                  </div>
                  <div className={style.icon}>
                    <FaMoneyBillAlt className={style.icons} />
                    <h2 style={{ fontWeight: "700" }}>{job.salary}</h2>
                  </div>
                  <div className={style.icon}>
                    {/* <GiSkills className={style.icons} /> */}
                    {/* <h2 id={style.sik}>{job.skills}</h2> */}
                  </div>
                  <div className={style.icon}>
                    <ImLocation2 className={style.icons} />
                    <h2>{job.location}</h2>
                  </div>

                  <div className={style.icon}>
                    {/* <ImLocation2 className={style.icons} /> */}
                    <h2 style={{ fontWeight: "700" }}>{job.jobType}</h2>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className={style.apply}>
                    <button onClick={() => router.push(`jobs/${job._id}`)}>
                      APPLY
                    </button>
                    <h4>Remote Jobs</h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: "25px",
            color: "red",
            fontWeight: "700",
          }}
        >
          {display?.length === 0 && <h2>No Jobs Found</h2>}
        </div>
      </div>
    </>
  );
};
export default RecentJobs;
