import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ProfileInputs from "../Reuseable/ProfileInputs";
import PhotoUpload from "../Reuseable/sharedInputs/PhotoUpload";

const RecruiterUpdateForm = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const newData = { ...data, photoURL };
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
        <div className="text-center py-7 w-full">
          {/* photo input  */}
          <div className="flex jusify-center items-center">
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

export default RecruiterUpdateForm;
