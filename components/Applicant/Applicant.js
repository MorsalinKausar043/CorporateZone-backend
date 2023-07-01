import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OpenJobs from "./OpenJobs";

const Applicant = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [postedJobs, setPostedJobs] = useState([]);
  const [matchJobs, setMatchJobs] = useState([]);

  useEffect(() => {
    fetch("https://corporate-zone-backend-main.vercel.app/jobs")
      .then((res) => res.json())
      .then((data) => setPostedJobs(data.data));
  }, []);

  useEffect(() => {
    const matchFound = postedJobs.filter(
      (posted) => posted.companyEmail === currentUser?.email
    );
    setMatchJobs(matchFound);
  }, [postedJobs, currentUser]);

  console.log(matchJobs);

  return (
    <>
      <h2 className="text-center p-1 text-lg bg-slate-500 rounded-2xl font-semibold text-white">
        You've posted{" "}
        <span className="bg-white text-black rounded-2xl p-1">
          {matchJobs.length}
        </span>{" "}
        job so far
      </h2>
      {matchJobs.map((job) => (
        <OpenJobs
          key={job._id}
          id={job._id}
          title={job.jobTitle}
          postTime={job.postTime}
          lastDate={job.lastDate}
        />
      ))}
    </>
  );
};

export default Applicant;
