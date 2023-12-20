import {
  useCreateBoothManagementMutation,
  useGetUnassignedBoothForBoothManagementQuery,
} from "@/redux/boothManagement/bothManagementApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateBoothManagementForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [createBoothManagement] = useCreateBoothManagementMutation({});

  const onSubmit = async (data) => {
    const boothManagementData = {
      ebl365: data.ebl365,
      numberOfMachine: data.numberOfMachine,
      numberOfAc: data.numberOfAc,
      numberOfLight: data.numberOfLight,
      numberOfMineralBoard: data.numberOfMineralBoard,
      numberOfUps: data.numberOfUps,
    };

    try {
      const response = await createBoothManagement(boothManagementData);
      if (response?.data?.statusCode === 200) {
        toast.success("BoothManagement updated successfully");
        window.location.reload();
      } else if (response?.error?.status === 400) {
        toast.error(response?.error?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { data: unAssignedEbl365 } =
    useGetUnassignedBoothForBoothManagementQuery(undefined, {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

  const unAssignedEbl365Data = unAssignedEbl365?.data;

  return (
    <div>
      <h1 className="text-xl font-bold mb-2 text-primary">
        Create management for a Booth
      </h1>
      <form
        className="w-full max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section>
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Ebl 365</span>
            </label>
            <select
              {...register("ebl365", { required: "EBL 365 is required" })}
              className="select select-bordered select-primary w-full"
            >
              <option value="">Select EBL 365 Booth</option>
              {unAssignedEbl365Data &&
                unAssignedEbl365Data.map((ebl) => (
                  <option key={ebl.id} value={ebl.id}>
                    {ebl.ebl365Name}
                  </option>
                ))}
            </select>
            {errors.ebl365 && (
              <p className="text-red-500">{errors.ebl365.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Number of machine</span>
            </label>
            <input
              {...register("numberOfMachine", {
                required: "Number of machine is required",
              })}
              type="number"
              placeholder="Number of machine"
              className="input input-bordered input-primary w-full"
            />
            {errors.numberOfMachine && (
              <p className="text-red-500">{errors.numberOfMachine.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Number of AC</span>
            </label>

            <input
              {...register("numberOfAc", {
                required: "Number of AC is required",
              })}
              type="number"
              placeholder="Number of AC"
              className="input input-bordered input-primary w-full"
            />
            {errors.numberOfAc && (
              <p className="text-red-500">{errors.numberOfAc.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Number of Light</span>
            </label>
            <input
              {...register("numberOfLight", {
                required: "Number of Light is required",
              })}
              type="number"
              placeholder="Number of Light"
              className="input input-bordered input-primary w-full"
            />
            {errors.numberOfLight && (
              <p className="text-red-500">{errors.numberOfLight.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Number of Mineral Board</span>
            </label>
            <input
              {...register("numberOfMineralBoard", {
                required: "Number of Mineral Board is required",
              })}
              type="number"
              placeholder="Number of Mineral Board"
              className="input input-bordered input-primary w-full"
            />
            {errors.numberOfMineralBoard && (
              <p className="text-red-500">
                {errors.numberOfMineralBoard.message}
              </p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Number of UPS</span>
            </label>
            <input
              {...register("numberOfUps", {
                required: "Number of UPS is required",
              })}
              type="number"
              placeholder="Number of UPS"
              className="input input-bordered input-primary w-full"
            />
            {errors.numberOfUps && (
              <p className="text-red-500">{errors.numberOfUps.message}</p>
            )}
          </div>
        </section>

        <button className="btn w-full mt-4 btn-primary" type="submit">
          {isSubmitting ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateBoothManagementForm;
