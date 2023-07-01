import React, { useState, useMemo } from "react";
import { BiMessageSquareAdd } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import Multiselect from "multiselect-react-dropdown";
import Select from "react-select";
import countryList from "react-select-country-list";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const JobPost = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [responsibilitiData, setResponsibilitiData] = useState("");
  const [allResponsibilitiData, setAllResponsibilitiData] = useState([]);
  const [value, setValue] = useState("");
  const router = useRouter();
  const options2 = useMemo(() => countryList().getData(), []);
  const [photoURL, setPhotoURL] = useState("");
  const [selectedLists, setSelectedLists] = useState([]);
  const [allData, setAllData] = useState({
    jobTitle: "",
    companyName: "",
    companyWebsite: "",
    companySize: "",
    businessType: "",
    jobType: "",
    salary: "",
    experience: "",
    jobDescription: "",
    since: "",
    lastDate: "",
  });

  const data = [
    { name: "React Js", id: 1 },
    { name: "Next Js", id: 2 },
    { name: "Tailwind CSS", id: 3 },
    { name: "HTMl", id: 4 },
    { name: "CSS", id: 5 },
    { name: "Firebase", id: 6 },
    { name: "MongoDB", id: 7 },
    { name: "Mongoose", id: 8 },
    { name: "Node JS", id: 9 },
    { name: "JWT", id: 10 },
    { name: "Redux", id: 11 },
    { name: "Material UI", id: 12 },
    { name: "React Native", id: 13 },
    { name: "SASS", id: 13 },
    { name: "Bootstrap-5", id: 14 },
    { name: "Git & Github", id: 15 },
    { name: "Figma", id: 16 },
    { name: "AWS", id: 17 },
    { name: "Graphql", id: 18 },
    { name: "REST API", id: 19 },
    { name: "Mysql", id: 20 },
  ];

  const [options] = useState(data);

  const SaveResponsibility = () => {
    setAllResponsibilitiData((value) => [...value, responsibilitiData]);
    setResponsibilitiData("");
  };

  const deleteRespon = (id) => {
    setAllResponsibilitiData((value) => {
      return value.filter((crrElm, index) => index !== id);
    });
  };

  const changeHandler = (value) => {
    setValue(value);
  };

  const imageUploadHandler = (e) => {
    const imageData = new FormData();
    imageData.set("key", "0835894fb24a589d54b46ce86a8fdd54");
    imageData.append("image", e.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then((res) => {
        setPhotoURL(res.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const dataInput = (e) => {
    let { name, value } = e.target;
    setAllData({ ...allData, [name]: value });
  };

  const submitData = (e) => {
    e.preventDefault();
    allData.skills = selectedLists.map((crrElm) => crrElm.name);
    allData.responsibilities = allResponsibilitiData;
    allData.companyLogo = photoURL;
    allData.location = value.label;
    allData.companyEmail = currentUser.email;
    allData.jobTags = "Media, Medicla, Restaurants";
    const {
      businessType,
      companyEmail,
      companyLogo,
      companyName,
      companySize,
      companyWebsite,
      experience,
      jobDescription,
      jobTitle,
      jobType,
      lastDate,
      location,
      responsibilities,
      salary,
      since,
      skills,
    } = allData;
    if (
      businessType &&
      companyEmail &&
      companyLogo &&
      companyName &&
      companySize &&
      companyWebsite &&
      experience &&
      jobDescription &&
      jobTitle &&
      jobType &&
      lastDate &&
      location &&
      responsibilities.length &&
      salary &&
      since &&
      skills.length
    ) {
      axios
        .post("https://corporate-zone-backend-main.vercel.app/jobs", allData)
        .then((res) => {
          if (res.status === 200) {
            router.push("/");
            toast.success("Successfully Post!");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      Swal.fire(
        "Unsuccessfull Post!",
        "Please fill the form and try again",
        "error"
      );
    }
  };

  const onSelect = (selectedList, selectedItem) => {
    setSelectedLists(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedLists(selectedList);
  };

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-1 px-2 rounded-lg md:rounded-md md:px-20 py-8 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg md:text-xl italic font-bold animate-bounce leading-6 text-center text-gray-900 dark:text-white">
                Post You Job
              </h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={(e) => submitData(e)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-4 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Job Title
                      </label>
                      <input
                        type="text"
                        name="jobTitle"
                        id="jobTitle"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                        onChange={dataInput}
                        value={allData.jobTitle}
                        placeholder="Enter your job title"
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                        onChange={dataInput}
                        value={allData.companyName}
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Company Email
                      </label>
                      <input
                        type="email"
                        id="companyEmail"
                        className="mt-1 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                        value={currentUser?.email}
                        readOnly
                      />
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Company Website
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-gray-50 text-gray-500 text-sm">
                          http://
                        </span>
                        <input
                          type="text"
                          name="companyWebsite"
                          id="companyWebsite"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md px-3 sm:text-sm border-gray-300"
                          onChange={dataInput}
                          value={allData.companyWebsite}
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Company Size
                    </label>
                    <select
                      id="companySize"
                      name="companySize"
                      onChange={dataInput}
                      value={allData.companySize}
                      autoComplete="companySize"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Select Company Size</option>
                      <option>10-20 employees</option>
                      <option>20-50 employees</option>
                      <option>50-100 employees</option>
                      <option>100-250 employees</option>
                      <option>250+ employees</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Business Type
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      autoComplete="businessType"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={dataInput}
                      value={allData.businessType}
                    >
                      <option>Select Business Type</option>
                      <option>IT Farm</option>
                      <option>IT Company</option>
                      <option>Multinational Company</option>
                      <option>Intern School</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Job Type
                    </label>
                    <select
                      id="jobType"
                      name="jobType"
                      autoComplete="jobType"
                      onChange={dataInput}
                      value={allData.jobType}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Select Job Type</option>
                      <option>Internship</option>
                      <option>Part-Time</option>
                      <option>Full-Time</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Salary
                    </label>
                    <select
                      id="salary"
                      name="salary"
                      autoComplete="salary"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={dataInput}
                      value={allData.salary}
                    >
                      <option>Select Salary</option>
                      <option>$24k - $25k</option>
                      <option>$26k - $50k</option>
                      <option>$51k - $80k</option>
                      <option>$81k - $100k</option>
                      <option>$2LPA - $3LPA</option>
                    </select>
                  </div>

                  <div className="col-span-4 sm:col-span-3">
                    <label className="block text-sm mb-2 font-medium text-gray-700">
                      Location
                    </label>
                    <Select
                      options={options2}
                      value={value}
                      onChange={changeHandler}
                    />
                  </div>

                  <Toaster position="top-center" reverseOrder={false} />

                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Experience
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      autoComplete="experience"
                      onChange={dataInput}
                      value={allData.experience}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Select Experience</option>
                      <option>1+ Years Experience</option>
                      <option>2+ Years Experience</option>
                      <option>3+ Years Experience</option>
                      <option>4+ Years Experience</option>
                      <option>5+ Years Experience</option>
                      <option>6+ Years Experience</option>
                      <option>7+ Years Experience</option>
                    </select>
                  </div>

                  <div className="col-span-4 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Responsibilities
                    </label>
                    <div>
                      {allResponsibilitiData.map((value, id) => {
                        return (
                          value && (
                            <div
                              key={id}
                              className="grid grid-cols-6 gap-4 my-3"
                            >
                              <p className="my-2 text-sm col-span-5">{value}</p>
                              <a className="bg-white shadow-md flex justify-center items-center rounded-md col-span-1 hover:bg-red-500 hover:text-white">
                                <AiFillDelete
                                  onClick={(_) => deleteRespon(id)}
                                  className="text-xl font-bold"
                                />
                              </a>
                            </div>
                          )
                        );
                      })}

                      <div className="grid grid-cols-6 gap-4">
                        <input
                          type="text"
                          name="responsibiliti"
                          id="responsibiliti"
                          autoComplete="responsibiliti"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 col-span-5"
                          placeholder="Add Responsibilities"
                          onChange={(e) =>
                            setResponsibilitiData(e.target.value)
                          }
                          value={responsibilitiData}
                        />
                        <a
                          className="p-2 bg-white shadow-md flex justify-center items-center rounded-md col-span-1 hover:bg-blue-500 hover:text-white"
                          onClick={SaveResponsibility}
                        >
                          <BiMessageSquareAdd className="text-xl font-bold" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="my-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Please Fill your skills
                    </label>
                    <Multiselect
                      options={options}
                      onSelect={onSelect}
                      onRemove={onRemove}
                      // getSelectedItems={getSelectedItems}
                      placeholder="Select Your Skills"
                      // onSearch={onSearch}
                      selectionLimit="10"
                      // showCheckbox={true}
                      displayValue="name"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Company Logo
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="True"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              onChange={imageUploadHandler}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 1MB
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Job Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="jobDescription"
                        name="jobDescription"
                        onChange={dataInput}
                        value={allData.jobDescription}
                        rows="5"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full p-2 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Please Write Job Description"
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-span-4 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Company First Entry
                    </label>
                    <input
                      type="date"
                      name="since"
                      id="since"
                      autoComplete="given-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                      onChange={dataInput}
                      value={allData.since}
                      placeholder="Since Date"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Last Date
                    </label>
                    <input
                      type="date"
                      name="lastDate"
                      id="lastDate"
                      autoComplete="given-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                      onChange={dataInput}
                      value={allData.lastDate}
                      placeholder="Enter the location"
                    />
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPost;
