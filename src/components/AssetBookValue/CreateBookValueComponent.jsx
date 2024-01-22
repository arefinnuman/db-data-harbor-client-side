import {
  useCreateAssetBookValueMutation,
  useGetUnAssignedTerminalsInAssetBookValueQuery,
} from "@/redux/assetBookValue/assetBookValueApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CreateBookValueComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [createBookValue] = useCreateAssetBookValueMutation({});

  const onSubmit = async (data) => {
    const bookValueData = {
      terminal: data.terminal,
      purchaseMood: data.purchaseMood,
      procurementYear: data.procurementYear,
      dateOfPurchase: data.dateOfPurchase,
      purchasePrice: data.purchasePrice,
      firstDeploymentDate: data.firstDeploymentDate,
      machineAge: data.machineAge,
      assetAmcAmount: data.assetAmcAmount,
    };

    try {
      const response = await createBookValue(bookValueData);
      if (response?.data?.statusCode === 200) {
        toast.success("Booth Acquisition created successfully");
        window.location.reload();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { data: unAssignedTerminals } =
    useGetUnAssignedTerminalsInAssetBookValueQuery(undefined, {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

  const unAssignedTerminalsData = unAssignedTerminals?.data;

  return (
    <div>
      <form
        className="w-full max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section>
          <h1 className="text-xl font-bold mb-2 text-primary">
            Create Acquisition for a Booth
          </h1>
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Ebl 365</span>
            </label>
            <select
              {...register("terminal", { required: "EBL 365 is required" })}
              className="select select-bordered select-primary w-full"
            >
              <option value="">Select your terminal</option>
              {unAssignedTerminalsData &&
                unAssignedTerminalsData.map((terminal) => (
                  <option key={terminal.id} value={terminal.id}>
                    {terminal.terminalNameAndId}
                  </option>
                ))}
            </select>
            {errors.terminal && (
              <p className="text-red-500">{errors.terminal.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Purchase Mood</span>
            </label>
            <input
              {...register("purchaseMood", {
                required: "Purchase Mood is required",
              })}
              className="input input-bordered"
              placeholder="Purchase Mood"
            />
            {errors.purchaseMood && (
              <p className="text-red-500">{errors.purchaseMood.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Procurement Year</span>
            </label>
            <input
              {...register("procurementYear", {
                required: "Procurement Year is required",
              })}
              className="input input-bordered"
              placeholder="Procurement Year"
            />
            {errors.procurementYear && (
              <p className="text-red-500">{errors.procurementYear.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Purchase Price</span>
            </label>
            <input
              {...register("purchasePrice", {
                required: "Purchase Price is required",
              })}
              className="input input-bordered"
              placeholder="Purchase Price"
            />
            {errors.purchasePrice && (
              <p className="text-red-500">{errors.purchasePrice.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">First Deployment Date</span>
            </label>
            <input
              type="date"
              {...register("firstDeploymentDate", {
                required: "First Deployment Date is required",
              })}
              className="input input-bordered"
              placeholder="First Deployment Date"
            />
            {errors.firstDeploymentDate && (
              <p className="text-red-500">
                {errors.firstDeploymentDate.message}
              </p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Date of Purchase</span>
            </label>
            <input
              type="date"
              {...register("dateOfPurchase", {
                required: "Date of Purchase is required",
              })}
              className="input input-bordered"
              placeholder="Date of Purchase"
            />
            {errors.dateOfPurchase && (
              <p className="text-red-500">{errors.dateOfPurchase.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Machine Age</span>
            </label>
            <input
              {...register("machineAge", {
                required: "Machine Age is required",
              })}
              className="input input-bordered"
              placeholder="Machine Age"
            />
            {errors.machineAge && (
              <p className="text-red-500">{errors.machineAge.message}</p>
            )}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Asset AMC Amount</span>
            </label>
            <input
              {...register("assetAmcAmount", {
                required: "Asset AMC Amount is required",
              })}
              className="input input-bordered"
              placeholder="Asset AMC Amount"
            />
            {errors.assetAmcAmount && (
              <p className="text-red-500">{errors.assetAmcAmount.message}</p>
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

export default CreateBookValueComponent;
