import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import PhotoUpload from "../../Reuseable/sharedInputs/PhotoUpload";
import ProfileInputs from "../../Reuseable/ProfileInputs";
import ProfileLinks from "./inputs/ProfileLinks";
import SkillSetsInput from "./inputs/SkillSetsInput";

const CandidateUpdateForm = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  console.log(loggedInUser);

  const [photoURL, setPhotoURL] = useState(loggedInUser?.photoURL);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // data submit and save to the databases
  const onSubmit = (data) => {
    const newData = { ...data, photoURL, selectedSkills };
    fetch(
      `https://corporate-zone-backend-main.vercel.app/users/${loggedInUser?.email}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" py-7 w-full">
          {/* photo input  */}
          <div className="">
            <PhotoUpload
              register={register}
              setPhotoURL={setPhotoURL}
              photoURL={photoURL}
            />
          </div>
          {/* my profile*/}
          <h1 className="text-center py-5 text-2xl font-serif">My Profile</h1>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 px-5">
            <ProfileInputs register={register} loggedInUser={loggedInUser} />
          </div>

          {/* important links for */}
          <h1 className="text-center py-5 text-2xl font-serif">
            Important Links
          </h1>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 px-5">
            <ProfileLinks
              register={register}
              errors={errors}
              loggedInUser={loggedInUser}
            />
          </div>

          {/* skills */}
          <h1 className="text-center py-5 text-2xl font-serif">Skill Set</h1>
          <div className="grid  grid-cols-1 gap-3 px-5">
            <SkillSetsInput
              register={register}
              setSelectedSkills={setSelectedSkills}
              loggedInUser={loggedInUser}
            />
          </div>

          {/* submit button */}
          <div className="text-center py-5">
            <input
              className="py-2 border  border-cyan-500 text-cyan-500 px-7 rounded font-medium  focus:outline-none cursor-pointer hover:bg-cyan-500 hover:text-white transition duration-300"
              value="Save"
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CandidateUpdateForm;
