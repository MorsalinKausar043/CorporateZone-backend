import React, { useState, useEffect } from "react";

const Candidate = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetch("https://corporate-zone-backend-main.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        const main = data.filter((company) => company.role === "candidate");
        setCandidates(main);
      });
  }, [candidates]);

  const handleDelete = (id) => {
    const proccess = window.confirm("Are You Sure You Want To Delete");
    if (proccess) {
      fetch(
        `https://corporate-zone-backend-main.vercel.app/users/delete/${id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data._id) {
            alert("Deleted Successfully");
            const remaining = candidates.filter((ema) => ema._id !== id);
            setCandidates(remaining);
          }
        });
    }
  };

  // const candidates = [
  //   {
  //     name: "Jhon Doe",
  //     position: "Project Manager",
  //     skill: "Developer",
  //     education: "abc university",
  //     contact: "abc@gmail.com",
  //   },
  //   {
  //     name: "Jhon Doe",
  //     position: "Project Manager",
  //     skill: "Developer",
  //     education: "abc university",
  //     contact: "abc@gmail.com",
  //   },
  //   {
  //     name: "Jhon Doe",
  //     position: "Project Manager",
  //     skill: "Developer",
  //     education: "abc university",
  //     contact: "abc@gmail.com",
  //   },
  //   {
  //     name: "Jhon Doe",
  //     position: "Project Manager",
  //     skill: "Developer",
  //     education: "abc university",
  //     contact: "abc@gmail.com",
  //   },
  //   {
  //     name: "Jhon Doe",
  //     position: "Project Manager",
  //     skill: "Developer",
  //     education: "abc university",
  //     contact: "abc@gmail.com",
  //   },
  //   {
  //     name: "Jhon Doe",
  //     position: "Project Manager",
  //     skill: "Developer",
  //     education: "abc university",
  //     contact: "abc@gmail.com",
  //   },
  // ];

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      NAME
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      EMAIL
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      ROLE
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      LOCATION
                    </th>

                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((job) => {
                    return (
                      <>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {job.username}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {job.email}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {job.role}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {job.location}
                          </td>

                          <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            <button
                              onClick={() => handleDelete(job._id)}
                              type="button"
                              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidate;

{
  /* <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-center">
                                <thead className="border-b bg-gray-800">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                          NAME
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                            POSITION
                                        </th>
                            
                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                            SKILL
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                            EDUCATION
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                            CONTACT
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                            UPDATE
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                            ACTION
                                        </th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                   {
                                       candidates.map(job => (
                                        <tr  className="bg-white border-b">
                                        <td style={{color:'white'}} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b bg-gray-800">{job.name}</td>
                                        <td style={{color:'white'}} className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-b bg-gray-800">
                                        {job.position}
                                        </td>
                                        <td style={{color:'white'}} className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-b bg-gray-800">
                                            {job.skill}
                                        </td>
                                        <td style={{color:'white'}} className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-b bg-gray-800">
                                        {job.education}
                                        </td>
                                        <td style={{color:'white'}} className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-b bg-gray-800">
                                        {job.contact}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700">Edit</button>
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700">Remove</button>
                                        </td>
                                    </tr>
                                       ))
                                   }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> */
}
