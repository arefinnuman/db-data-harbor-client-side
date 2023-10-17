import { useUpdateTerminalMutation } from "@/redux/terminals/terminalApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdateTerminalForm = ({ selectedUpdateTerminal }) => {
  const id = selectedUpdateTerminal.id;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [updateTerminal] = useUpdateTerminalMutation({});

  const onSubmit = async (data) => {
    const terminalData = {
      id,
      terminalType: data.terminalType,
      terminalId: data.terminalId,
      terminalNameAndId: data.terminalNameAndId,
      terminalStatus: data.terminalStatus,
      terminalBrand: data.terminalBrand,
      terminalModel: data.terminalModel,
      glNumber: data.glNumber,
      glCode: data.glCode,
      insuranceLimit: data.insuranceLimit,
      assetTagSerial: data.assetTagSerial,
      deploymentDate: data.deploymentDate,
      liveDate: data.liveDate,
      monthlyNoOfTransaction: data.monthlyNoOfTransaction,
      monthlyVolOfTransaction: data.monthlyVolOfTransaction,
      monthlyAvgNoOfTxn: data.monthlyAvgNoOfTxn,
      monthlyAvgVolOfTxn: data.monthlyAvgVolOfTxn,
      custodiansKey: {
        name: data.custodiansKeyName,
        contactNumber: data.custodiansKeyContactNumber,
      },
      custodiansCom: {
        name: data.custodiansComName,
        contactNumber: data.custodiansComContactNumber,
      },
      numberOfBpm: data.numberOfBpm,
    };

    const response = await updateTerminal(terminalData);
    if (response?.data?.statusCode === 200) {
      toast.success("ebl365 updated successfully");
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
          Update {selectedUpdateTerminal.terminalNameAndId} Details
        </h1>

        {[
          {
            label: "Terminal Type",
            name: "terminalType",
            defaultValue: selectedUpdateTerminal.terminalType,
          },
          {
            label: "Terminal Id",
            name: "terminalId",
            defaultValue: selectedUpdateTerminal.terminalId,
          },
          {
            label: "Terminal Name and Id",
            name: "terminalNameAndId",
            defaultValue: selectedUpdateTerminal.terminalNameAndId,
          },
          {
            label: "Terminal Status",
            name: "terminalStatus",
            defaultValue: selectedUpdateTerminal.terminalStatus,
          },
          {
            label: "Terminal Brand",
            name: "terminalBrand",
            defaultValue: selectedUpdateTerminal.terminalBrand,
          },
          {
            label: "Terminal Model",
            name: "terminalModel",
            defaultValue: selectedUpdateTerminal.terminalModel,
          },
          {
            label: "GL Number",
            name: "glNumber",
            defaultValue: selectedUpdateTerminal.glNumber,
          },
          {
            label: "GL Code",
            name: "glCode",
            defaultValue: selectedUpdateTerminal.glCode,
          },
          {
            label: "Insurance Limit",
            name: "insuranceLimit",
            defaultValue: selectedUpdateTerminal.insuranceLimit,
          },
          {
            label: "Asset Tag Serial",
            name: "assetTagSerial",
            defaultValue: selectedUpdateTerminal.assetTagSerial,
          },
          {
            label: "Deployment Date",
            name: "deploymentDate",
            defaultValue: selectedUpdateTerminal.deploymentDate,
          },
          {
            label: "Live Date",
            name: "liveDate",
            defaultValue: selectedUpdateTerminal.liveDate,
          },
          {
            label: "Monthly No of Transaction",
            name: "monthlyNoOfTransaction",
            defaultValue: selectedUpdateTerminal.monthlyNoOfTransaction,
          },
          {
            label: "Monthly Vol of Transaction",
            name: "monthlyVolOfTransaction",
            defaultValue: selectedUpdateTerminal.monthlyVolOfTransaction,
          },
          {
            label: "Monthly Avg No of Txn",
            name: "monthlyAvgNoOfTxn",
            defaultValue: selectedUpdateTerminal.monthlyAvgNoOfTxn,
          },
          {
            label: "Monthly Avg Vol of Txn",
            name: "monthlyAvgVolOfTxn",
            defaultValue: selectedUpdateTerminal.monthlyAvgVolOfTxn,
          },
          {
            label: "Custodians Key Name",
            name: "custodiansKeyName",
            defaultValue: selectedUpdateTerminal.custodiansKey.name,
          },
          {
            label: "Custodians Key Contact Number",
            name: "custodiansKeyContactNumber",
            defaultValue: selectedUpdateTerminal.custodiansKey.contactNumber,
          },
          {
            label: "Custodians Com Name",
            name: "custodiansComName",
            defaultValue: selectedUpdateTerminal.custodiansCom.name,
          },
          {
            label: "Custodians Com Contact Number",
            name: "custodiansComContactNumber",
            defaultValue: selectedUpdateTerminal.custodiansCom.contactNumber,
          },
          {
            label: "Number of BPM",
            name: "numberOfBpm",
            defaultValue: selectedUpdateTerminal.numberOfBpm,
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

export default UpdateTerminalForm;
