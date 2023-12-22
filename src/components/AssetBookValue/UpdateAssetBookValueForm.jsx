import { useUpdateAssetBookValueMutation } from "@/redux/assetBookValue/assetBookValueApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdateAssetBookValueForm = ({ selectedUpdateAssetBookValue }) => {
  const id = selectedUpdateAssetBookValue?._id;
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [updateAssetValue] = useUpdateAssetBookValueMutation({});

  const onSubmit = async (data) => {
    const assetBookValueData = {
      id,
      purchaseMood: data.purchaseMood,
      procurementYear: data.procurementYear,
      dateOfPurchase: data.dateOfPurchase,
      purchasePrice: data.purchasePrice,
      firstDeploymentDate: data.firstDeploymentDate,
      machineAge: data.machineAge,
      assetAmcAmount: data.assetAmcAmount,
    };

    const response = await updateAssetValue(assetBookValueData);
    if (response?.data?.statusCode === 200) {
      toast.success("Updated successfully");
      window.location.reload();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <form
        className="w-full max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl font-bold mb-4 text-center">
          Update {selectedUpdateAssetBookValue?.terminal?.terminalNameAndId}{" "}
          Book Value
        </h1>
        {[
          {
            label: "Asset AMC Amount",
            name: "assetAmcAmount",
            defaultValue: selectedUpdateAssetBookValue.assetAmcAmount,
          },
          {
            label: "Purchase Mood",
            name: "purchaseMood",
            defaultValue: selectedUpdateAssetBookValue.purchaseMood,
          },
          {
            label: "Procurement Year",
            name: "procurementYear",
            defaultValue: selectedUpdateAssetBookValue.procurementYear,
          },
          {
            label: "Date of Purchase",
            name: "dateOfPurchase",
            defaultValue: selectedUpdateAssetBookValue.dateOfPurchase
              ? new Date(selectedUpdateAssetBookValue.dateOfPurchase)
                  .toISOString()
                  .split("T")[0]
              : "",
            type: "date",
          },
          {
            label: "First Deployment Date",
            name: "firstDeploymentDate",
            defaultValue: selectedUpdateAssetBookValue.firstDeploymentDate
              ? new Date(selectedUpdateAssetBookValue.firstDeploymentDate)
                  .toISOString()
                  .split("T")[0]
              : "",
            type: "date",
          },
          {
            label: "Machine Age",
            name: "machineAge",
            defaultValue: selectedUpdateAssetBookValue.machineAge,
          },

          {
            label: "Purchase Price",
            name: "purchasePrice",
            defaultValue: selectedUpdateAssetBookValue.purchasePrice,
          },
        ].map((field, index) => (
          <div key={index} className="mb-2">
            <label className="block text-sm font-semibold text-gray-600">
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              {...register(field.name, {
                required: `${field.label} is required`,
              })}
              defaultValue={field.defaultValue}
              className="input input-bordered input-primary w-full mt-1 text-sm"
            />
            {errors[field.name] && (
              <p className="text-red-500 mt-1 text-sm">
                {errors[field.name].message}
              </p>
            )}
          </div>
        ))}

        <button
          className="btn w-full mt-4 btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAssetBookValueForm;
