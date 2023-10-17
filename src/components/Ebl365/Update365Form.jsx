import { useUpdateEbl365Mutation } from "@/redux/ebl365/ebl365Api";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function Update365Form({ selectedUpdateBooth }) {
  const id = selectedUpdateBooth.id;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [updateBooth] = useUpdateEbl365Mutation({});

  const onSubmit = async (data) => {
    const ebl365Data = {
      id,
      ebl365Name: data.name,
      ebl365Address: data.address,
      ebl365Zone: data.zone,
      ebl365NameInBengali: data.nameInBengali,
      ebl365StatusType: data.statusType,
      locationType: data.locationType,
      areaType: data.areaType,
      areaName: data.areaName,
      geoLatitude: data.geoLatitude,
      geoLongitude: data.geoLongitude,
      branchControllingGl: data.branchControllingGl,
      division: data.division,
      postalCOde: data.postalCOde,
      nearestFamousPlace: data.nearestFamousPlace,
      divisionId: data.divisionId,
      districtId: data.districtId,
      upazilaOrThana: data.upazilaOrThana,
      controlledBy: data.controlledBy,
    };

    const response = await updateBooth(ebl365Data);
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
          Update {selectedUpdateBooth.ebl365Name} ebl365 details
        </h1>

        {[
          {
            label: "Name",
            name: "name",
            defaultValue: selectedUpdateBooth.ebl365Name,
          },
          {
            label: "Address",
            name: "address",
            defaultValue: selectedUpdateBooth.ebl365Address,
          },
          {
            label: "Zone",
            name: "zone",
            defaultValue: selectedUpdateBooth.ebl365Zone,
          },
          {
            label: "Name In Bengali",
            name: "nameInBengali",
            defaultValue: selectedUpdateBooth.ebl365NameInBengali,
          },
          {
            label: "Status Type",
            name: "statusType",
            defaultValue: selectedUpdateBooth.ebl365StatusType,
          },
          {
            label: "Location Type",
            name: "locationType",
            defaultValue: selectedUpdateBooth.locationType,
          },
          {
            label: "Area Type",
            name: "areaType",
            defaultValue: selectedUpdateBooth.areaType,
          },
          {
            label: "Area Name",
            name: "areaName",
            defaultValue: selectedUpdateBooth.areaName,
          },
          {
            label: "Geo Latitude",
            name: "geoLatitude",
            defaultValue: selectedUpdateBooth.geoLatitude,
          },
          {
            label: "Geo Longitude",
            name: "geoLongitude",
            defaultValue: selectedUpdateBooth.geoLongitude,
          },
          {
            label: "Branch Controlling Gl",
            name: "branchControllingGl",
            defaultValue: selectedUpdateBooth.branchControllingGl,
          },
          {
            label: "Division",
            name: "division",
            defaultValue: selectedUpdateBooth.division,
          },
          {
            label: "Postal Code",
            name: "postalCode",
            defaultValue: selectedUpdateBooth.postalCOde,
          },
          {
            label: "Nearest Famous Place (Optional)",
            name: "nearestFamousPlace",
            defaultValue: selectedUpdateBooth.nearestFamousPlace,
          },
          {
            label: "Division Id",
            name: "divisionId",
            defaultValue: selectedUpdateBooth.divisionId,
          },
          {
            label: "District Id",
            name: "districtId",
            defaultValue: selectedUpdateBooth.districtId,
          },
          {
            label: "Upazila Or Thana",
            name: "upazilaOrThana",
            defaultValue: selectedUpdateBooth.upazilaOrThana,
          },
          {
            label: "Controlled By (Optional)",
            name: "controlledBy",
            defaultValue: selectedUpdateBooth.controlledBy,
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
}
