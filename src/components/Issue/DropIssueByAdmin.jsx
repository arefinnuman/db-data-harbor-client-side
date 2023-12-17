import { useCreateIssueFormMutation } from "@/redux/issueForm/issueFormApi";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import LoadingScreen from "../Ui/LoadingScreen";

const DropIssueByAdmin = () => {
  const user = useSelector((state) => state.auth.user);

  const [createIssue, { isLoading }] = useCreateIssueFormMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const issueData = {
      boothManagement: boothManagementId,
      machineProblem: data.machineProblem,
      acProblem: data.acProblem,
      lightProblem: data.lightProblem,
      mineralBoardProblem: data.mineralBoardProblem,
      roofCeilingProblem: data.roofCeilingProblem,
      wallProblem: data.wallProblem,
      aicoProblem: data.aicoProblem,
      tilesProblem: data.tilesProblem,
      wastageBinProblem: data.wastageBinProblem,
      dvrProblem: data.dvrProblem,
      upsProblem: data.upsProblem,
      othersProblem: data.othersProblem,
      createdBy: user?.userId,
    };

    const response = await createIssue(issueData);

    if (response?.data?.statusCode === 200) {
      toast.success("Created successfully");
    } else if (response?.data?.statusCode === 400) {
      toast.error("Something went wrong");
    } else {
      toast.error("Something went wrong");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {" "}
      <div className="container py-4 mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold text-primary">Create Issue</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="employeeCardNumber"
              className="block text-gray-700 mb-2"
            >
              Machine Problem?
            </label>
            <input
              type="text"
              id="machineProblem"
              name="machineProblem"
              {...register("machineProblem")}
              placeholder="If any machines have any problem right now, please write here."
              className="input input-bordered input-primary w-full py-2 px-4 rounded-md"
            />
            {errors.employeeCardNumber && (
              <p className="text-red-500">
                {errors.employeeCardNumber.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              AC Problem?
            </label>
            <input
              type="text"
              id="acProblem"
              name="acProblem"
              {...register("acProblem")}
              placeholder="If any AC have any problem right now, please write here."
              className="input input-bordered input-primary w-full py-2 px-4 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Light Problem?
            </label>
            <input
              type="text"
              id="lightProblem"
              name="lightProblem"
              {...register("lightProblem")}
              placeholder="If any lights have any problem right now, please write here."
              className="input input-bordered input-primary w-full py-2 px-4 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Mineral Board Problem?
            </label>
            <input
              type="text"
              id="mineralBoardProblem"
              name="mineralBoardProblem"
              {...register("mineralBoardProblem")}
              placeholder="If any mineral board have any problem right now, please write here."
              className="input input-bordered input-primary w-full py-2 px-4 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Roof Ceiling Problem?
            </label>
            <input
              type="text"
              id="roofCeilingProblem"
              name="roofCeilingProblem"
              {...register("roofCeilingProblem")}
              placeholder="If any roof ceiling have any problem right now, please write here."
              className="input input-bordered input-primary w-full py-2 px-4 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Wall Problem?
            </label>
            <input
              type="text"
              id="wallProblem"
              name="wallProblem"
              {...register("wallProblem")}
              placeholder="If any walls have any problem right now, please write here."
              className="input input-bordered input-primary w-full py-2 px-4 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Aico Problem?
            </label>
            <input
              type="text"
              id="aicoProblem"
              name="aicoProblem"
              {...register("aicoProblem")}
              placeholder="If any aico have any problem right now, please write here."
              className="input input-bordered input-primary w-full py-2 px-4 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Tiles Problem?
            </label>
            <input
              type="text"
              id="tilesProblem"
              name="tilesProblem"
              {...register("tilesProblem")}
              placeholder="If any tiles have any problem right now, please write here."
              className="input input-bordered input-primary w-full py-2 px-4 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Wastage Bin Problem?
            </label>
            <input
              type="text"
              id="wastageBinProblem"
              name="wastageBinProblem"
              {...register("wastageBinProblem")}
              placeholder="If any wastage bin have any problem right now, please write here."
              className="input input-bordered input-primary w-full py-2 px-4 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              DVR Problem?
            </label>
            <input
              type="text"
              id="dvrProblem"
              name="dvrProblem"
              {...register("dvrProblem")}
              placeholder="If any DVR have any problem right now, please write here."
              className="input input-bordered input-primary w-full py-2 px-4 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              UPS Problem?
            </label>
            <input
              type="text"
              id="upsProblem"
              name="upsProblem"
              {...register("upsProblem")}
              placeholder="If any UPS have any problem right now, please write here."
              className="input input-bordered input-primary w-full py-2 px-4 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Others Problem?
            </label>
            <input
              type="text"
              id="othersProblem"
              name="othersProblem"
              {...register("othersProblem")}
              placeholder="If any others have any problem right now, please write here."
              className="input input-bordered input-primary w-full py-2 px-4 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-secondary rounded-lg w-full py-3 font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DropIssueByAdmin;
