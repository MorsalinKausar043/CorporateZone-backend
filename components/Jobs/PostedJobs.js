import React from "react";

import {
  MdMoreTime,
  MdPedalBike,
  MdMobileFriendly,
  MdSportsTennis,
  MdAddTask,
} from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import PostedJob from "./PostedJob";
import { useRouter } from "next/router";

const PostedJobs = (props) => {
  const [jobs, setJobs] = useState(props.jobs);
  const [category, setCategory] = useState();
  const [display, setDisplay] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount] = useState(5);

  const handleChange = (event) => {
    const searchText = event.target.value;
    const matched = jobs.filter((job) =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplay(matched);
    console.log(matched);
  };

  const router = useRouter();

  const filterJobs = async (e) => {
    setCategory(e.target.value);
    const response = await fetch(
      `https://corporate-zone-backend-main.vercel.app/jobs?jobType=${e.target.value}`
    );
    const data = await response.json();
    setDisplay(data?.data);
    setJobs(data?.data);

    router.push(`/jobs?jobType=${e.target.value}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    fetch("https://corporate-zone-backend-main.vercel.app/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.data);
        setDisplay(data.data);
        console.log(data.data);
      });
  }, []);

  //Get Current Posts
  const indexOfLastPost = page * pageCount;
  const indexOfFirstPost = indexOfLastPost - pageCount;
  const currentPost = jobs.slice(indexOfFirstPost, indexOfLastPost);

  //pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(jobs.length / pageCount); i++) {
    pageNumbers.push(i);
  }

  //change page
  const paginate = (pageNumber) => {
    setPage(pageNumber);
  };
  return (
    <section className="pb-10">
      <div className="md:w-9/12 w-11/12 mx-auto">
        {/* Search Start */}
        <div className="md:flex justify-center items-center md:max-w-[75%] md:mx-auto relative mt-12">
          <div className="my-12 md:w-5/12 focus:border-cyan-600 search_jobs">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  className="h-5 w-5 fill-slate-300"
                  viewBox="0 0 20 20"
                ></svg>
              </span>
              <input
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search Job Keyword..."
                type="text"
                name="search"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        {/* End Search */}

        {/* Start Filter */}
        <div className="md:flex justify-between items-center md:max-w-[75%] md:mx-auto relative mb-12 filter_jobs">
          <div>
            <h1 className="text-xl font-serif font-bold dark:text-white">
              Filter Jobs
            </h1>
          </div>
          <div>
            <select
              name=""
              id=""
              value={category}
              className="bg-[#85F4FF] text-black  px-2 py-2  focus:outline-none rounded"
              onChange={filterJobs}
            >
              <option value="all">All Jobs</option>
              <option value="intern">Intern</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
            </select>
          </div>
        </div>

        {/* End Filter */}

        <div>
          <p className="text-center pb-5 font-bold dark:text-white">
            {display.length} total jobs found.
          </p>
        </div>

        {/* Start Jobs Card */}

        <div className="grid gird-cols-1 gap-4">
          {currentPost?.map((job) => (
            <PostedJob key={job._id} job={job}></PostedJob>
          ))}
        </div>

        {/* End Jobs Card */}

        {/* pagination */}
        <div className="text-2xl flex text-center text-black border-2 md:w-40 mx-auto my-5 pagination">
          {pageNumbers.map((number) => (
            <ul key={number} className="w-full">
              <li className="border-2">
                <button onClick={() => paginate(number)}>{number}</button>
              </li>
            </ul>
          ))}
        </div>
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
    </section>
  );
};

export default PostedJobs;
