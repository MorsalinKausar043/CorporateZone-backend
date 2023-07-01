import { useEffect, useState } from "react";

const ApplyJobs = ({ id }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [matchApplied, setMatchApplied] = useState([]);

  useEffect(() => {
    fetch("https://corporate-zone-backend-main.vercel.app/appliedJobs")
      .then((res) => res.json())
      .then((data) => setAppliedJobs(data.reverse()));
  }, []);

  useEffect(() => {
    const matchFound = appliedJobs.filter((applied) => applied.jobId === id);
    setMatchApplied(matchFound);
  }, [appliedJobs, id]);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <p className="bg-[#42C2FF] text-white text-lg p-0.5 font-normal text-center">
              So far{" "}
              <span className="bg-white text-black font-bold rounded-2xl p-1">
                {matchApplied.length}
              </span>{" "}
              person has applied for this job
            </p>
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    JOB ID
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    APPLICANT EMAIL
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    TITLE
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                  >
                    RESUME
                  </th>
                </tr>
              </thead>
              <tbody>
                {matchApplied?.map((job) => (
                  <>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {job.jobId}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {job.candidateEmail}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {job.jobTitle}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        <a
                          href={job.resumeLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Resume Link
                        </a>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobs;
