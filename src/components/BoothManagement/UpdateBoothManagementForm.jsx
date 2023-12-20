import { useUpdateBoothManagementMutation } from "@/redux/boothManagement/bothManagementApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdateBoothManagementForm = ({ selectedUpdateBoothManagement }) => {
  const id = selectedUpdateBoothManagement._id;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [updateBoothManagement] = useUpdateBoothManagementMutation({});

  const onSubmit = async (data) => {
    const boothManagementData = {
      id,
      numberOfMachine: data.numberOfMachine,
      numberOfAc: data.numberOfAc,
      numberOfLight: data.numberOfLight,
      numberOfMineralBoard: data.numberOfMineralBoard,
      numberOfUps: data.numberOfUps,
    };

    const response = await updateBoothManagement(boothManagementData);
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
          Update {selectedUpdateBoothManagement?.ebl365?.ebl365Name}
        </h1>
        {[
          {
            label: "Number of Machine",
            name: "numberOfMachine",
            defaultValue: selectedUpdateBoothManagement.numberOfMachine,
          },
          {
            label: "Number of Ac",
            name: "numberOfAc",
            defaultValue: selectedUpdateBoothManagement.numberOfAc,
          },
          {
            label: "Number of Light",
            name: "numberOfLight",
            defaultValue: selectedUpdateBoothManagement.numberOfLight,
          },
          {
            label: "Number of Mineral Board",
            name: "numberOfMineralBoard",
            defaultValue: selectedUpdateBoothManagement.numberOfMineralBoard,
          },
          {
            label: "Number of Ups",
            name: "numberOfUps",
            defaultValue: selectedUpdateBoothManagement.numberOfUps,
          },
        ].map((field, index) => (
          <div key={index} className="mb-2">
            <label className="block text-sm font-semibold text-gray-600">
              {field.label}
            </label>
            <input
              type="text"
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

export default UpdateBoothManagementForm;
