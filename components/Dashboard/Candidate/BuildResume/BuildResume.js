import axios from "axios";
import { useForm } from "react-hook-form";
import { saveAs } from "file-saver";
import InputItem from "./InputItem";
import { RiDoubleQuotesR } from "react-icons/ri";

const BuildResume = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("https://corporate-zone-backend-main.vercel.app/create-pdf", data)
      .then(() =>
        axios.get("https://corporate-zone-backend-main.vercel.app/fetch-pdf", {
          responseType: "blob",
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, `${data.name}.pdf`);
      });
  };

  return (
    <div className=" mx-auto">
      {/* <div className="flex justify-center items-center">
        <RiDoubleQuotesR className="w-10 h-10 text-pink-500 relative top-5" />
        <p className="text-center p-4 mb-5 bg-[#85F4FF] text-black rounded-xl shadow-md">
          When an employer looks at your resume, you've got about 30 seconds to
          make a good impression. That's the average amount of time most
          employers spend reading a resume. To capture the reader's attention,
          you need to be clear and to-the-point. So, Please fill the all
          necessary input.
        </p>
      </div> */}
      <h1 className="bg-slate-500 text-2xl text-center tracking-widest text-white font-bold rounded-3xl py-2 mb-5 shadow-xl">
        Build Your Resume
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-3">
          <InputItem
            type={"text"}
            place={"Bill Gates"}
            name={"name"}
            register={register}
            errors={errors}
          />

          <InputItem
            type={"text"}
            place={"Wev Developer"}
            name={"designation"}
            register={register}
            errors={errors}
          />

          <div className="grid grid-cols-1 gap-3 border-2 border-lime-600 rounded-xl p-2">
            <h2 className="text-center py-2 bg-[#42C2FF] text-white rounded-xl shadow-md">
              Your Contact Info Section
            </h2>

            <InputItem
              type={"email"}
              place={"bill.gates@gmail.com"}
              name={"email"}
              register={register}
              errors={errors}
            />

            <InputItem
              type={"tel"}
              place={"+8801700123456"}
              name={"phone"}
              register={register}
              errors={errors}
            />

            <InputItem
              type={"text"}
              place={"Dhaka, Bangladesh"}
              name={"address"}
              register={register}
              errors={errors}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 border-2 border-lime-600 rounded-xl p-2">
            <h2 className="text-center py-2 bg-[#42C2FF] text-white  rounded-xl shadow-md">
              Your Professional Link Section
            </h2>

            <InputItem
              type={"url"}
              place={"https://github.com/bill.gates"}
              name={"github"}
              register={register}
              errors={errors}
            />

            <InputItem
              type={"url"}
              place={"https://www.linkedin.com/in/bill.gates"}
              name={"linkedin"}
              register={register}
              errors={errors}
            />

            <InputItem
              type={"url"}
              place={"https://www.billgates.com"}
              name={"portfolio"}
              register={register}
              errors={errors}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 border-2 border-lime-600 rounded-xl p-2">
            <h2 className="text-center py-2 bg-[#42C2FF] text-white  rounded-xl shadow-md">
              Your Skills Section
            </h2>

            <InputItem
              type={"text"}
              place={"HTML 5, CSS 3, JavaScript, etc"}
              name={"mastery"}
              register={register}
              errors={errors}
            />

            <InputItem
              type={"text"}
              place={"Node, Express, Mongo DB, etc"}
              name={"comfortable"}
              register={register}
              errors={errors}
            />

            <InputItem
              type={"text"}
              place={"Typescript, Next JS, etc"}
              name={"familiar"}
              register={register}
              errors={errors}
            />

            <InputItem
              type={"text"}
              place={"VS Code, Git, GitHub, etc"}
              name={"tools"}
              register={register}
              errors={errors}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 border-2 border-lime-600 rounded-xl p-2">
            <h2 className="flex justify-center items-center py-2 bg-[#42C2FF] text-white  rounded-xl shadow-md">
              Your Education & Courses Section
            </h2>

            <InputItem
              type={"text"}
              place={"Master of Social Science (MSS)"}
              name={"education"}
              register={register}
              errors={errors}
            />

            <div>
              <p className="font-serif py-1">Enter your course one</p>
              <input
                type="text"
                placeholder="Complete Web Development Course"
                className="w-full border rounded-lg border-gray-200 p-2 text-black focus:outline-none"
                {...register("course1")}
              />
            </div>
            <div>
              <p className="font-serif py-1">Enter your course two</p>
              <input
                type="text"
                placeholder="Professional Fundamental Course"
                className="w-full border rounded-lg border-gray-200 p-2 text-black focus:outline-none"
                {...register("course2")}
              />
            </div>
            <div>
              <p className="font-serif py-1">Enter your course three</p>
              <input
                type="text"
                placeholder="English Language Course"
                className="w-full border rounded-lg border-gray-200 p-2 text-black focus:outline-none"
                {...register("course3")}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 border-2 border-lime-600 rounded-xl mt-3 p-2">
          <h2 className="flex justify-center items-center py-2 bg-[#42C2FF] text-white  rounded-xl shadow-md">
            Your Projects Section
          </h2>

          <InputItem
            type={"text"}
            place={"Highway Hangouts - Restaurant website"}
            name={"project"}
            register={register}
            errors={errors}
          />

          <div>
            <p className="font-serif py-1">Enter your project description</p>
            <textarea
              className="w-full border rounded border-gray-200 p-2 text-black focus:outline-none"
              placeholder="Describe what technologies you used in your project, What can be done with this project, etc"
              {...register("description", { required: true })}
            ></textarea>
            {errors?.description && (
              <span className="text-sm text-red-500 block">
                project-description is required
              </span>
            )}
          </div>

          <InputItem
            type={"url"}
            place={"https://www.project.com"}
            name={"site"}
            register={register}
            errors={errors}
          />

          <InputItem
            type={"url"}
            place={"https://github.com/frontend"}
            name={"frontend"}
            register={register}
            errors={errors}
          />

          <InputItem
            type={"url"}
            place={"https://github.com/backend"}
            name={"backend"}
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center my-4">
          <button
            type="reset"
            className="py-2 px-7 m-3 rounded font-medium border cursor-pointer bg-[#42C2FF] text-white hover:bg-[#85F4FF] hover:text-black focus:outline-none transition duration-300"
          >
            Reset All Field
          </button>
          <button
            type="submit"
            className="py-2 px-7 rounded font-medium border cursor-pointer bg-[#85F4FF] text-black hover:bg-[#42C2FF] hover:text-white focus:outline-none transition duration-300"
          >
            Download Your Resume
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuildResume;
