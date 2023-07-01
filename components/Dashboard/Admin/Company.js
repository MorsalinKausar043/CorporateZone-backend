import React, { useState, useEffect } from "react";

const Company = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("https://corporate-zone-backend-main.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        const main = data.filter((company) => company.role === "recruiter");
        setCompanies(main);
      });
  }, [companies]);

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
            const remaining = companies.filter((ema) => ema._id !== id);
            setCompanies(remaining);
          }
        });
    }
  };

  // const companies = [
  //   {
  //     logo: "https://demoapus2.com/entaro/wp-content/uploads/2017/12/c1.jpg",
  //     name: "Akshay INC.",
  //     position: "IT Project Manager",
  //     address: " 12 Lane No 5 Jain ",
  //     website: "www.abc.com",
  //     salary: "$15k - $25K",
  //   },
  //   {
  //     logo: "https://demoapus2.com/entaro/wp-content/uploads/2017/12/c1.jpg",
  //     name: "Akshay INC.",
  //     position: "IT Project Manager",
  //     address: " 12 Lane No 5 Jain ",
  //     website: "www.abc.com",
  //     salary: "$15k - $25K",
  //   },
  //   {
  //     logo: "https://demoapus2.com/entaro/wp-content/uploads/2017/12/c1.jpg",
  //     name: "Akshay INC.",
  //     position: "IT Project Manager",
  //     address: " 12 Lane No 5 Jain i",
  //     website: "www.abc.com",
  //     salary: "$15k - $25K",
  //   },
  //   {
  //     logo: "https://demoapus2.com/entaro/wp-content/uploads/2017/12/c1.jpg",
  //     name: "Akshay INC.",
  //     position: "IT Project Manager",
  //     address: " 12 Lane No 5 Jain ",
  //     website: "www.abc.com",
  //     salary: "$15k - $25K",
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
                  {companies.map((job) => (
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
