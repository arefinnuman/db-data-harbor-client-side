import { useCreateAllBookValueReportMutation } from "@/redux/bookValueReport/bookvValueReport";
import FileSaver from "file-saver";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const AllAssetBookValueReport = () => {
  const [createAllBookValueReport] = useCreateAllBookValueReportMutation({});

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const generateExcel = (responseArray) => {
    const dataForExcel = responseArray
      .map((item) => {
        const {
          assetBookValue,
          reportingDate,
          machineAgeInDays,
          assetExpiryDate,
          amcInDays,
          runningMachineRealAge,
          totalRemainingForAmc,
          ageRunning,
          ageRemaining,
          perDayAssetDepreciation,
          assetDeprecationAmount,
          remainingBookValue,
          depCount,
          machineCost,
          amcForYear,
          amcPerDay,
          machineAgeTillToday,
          dayForAmcPayment,
          amcGiven,
          amcRemaining,
          assetAmcRemaining,
          totalCostOwnerShip,
        } = item;

        if (!assetBookValue || !assetBookValue.terminal) {
          console.error(
            "Asset book value data is missing or incomplete for an item"
          );
          return null;
        }

        return {
          "Terminal ID": assetBookValue.terminal.terminalId,
          "Terminal Name": assetBookValue.terminal.terminalNameAndId,
          "Terminal Type": assetBookValue.terminal.terminalType,
          "Terminal Status": assetBookValue.terminal.terminalStatus,
          "Terminal Brand": assetBookValue.terminal.terminalBrand,
          "Terminal Model": assetBookValue.terminal.terminalModel,
          "Purchase Mood": assetBookValue.purchaseMood,
          "Purchase Price": assetBookValue.purchasePrice,
          "Procurement Year": assetBookValue.procurementYear,
          "Date of Purchase": formatDate(assetBookValue.dateOfPurchase),
          "First Deployment Date": formatDate(
            assetBookValue.firstDeploymentDate
          ),
          "Machine Age": assetBookValue.machineAge,
          "Asset AMC Amount": assetBookValue.assetAmcAmount,
          "Reporting Date": formatDate(reportingDate),
          "Machine Age in Days": machineAgeInDays,
          "Asset Expiry Date": formatDate(assetExpiryDate),
          "AMC in Days": amcInDays,
          "Running Machine Real Age": runningMachineRealAge,
          "Total Remaining for AMC": totalRemainingForAmc,
          "Age Running": ageRunning,
          "Age Remaining": ageRemaining,
          "Per Day Asset Depreciation": perDayAssetDepreciation,
          "Asset Deprecation Amount": assetDeprecationAmount,
          "Remaining Book Value": remainingBookValue,
          "Dep Count": depCount,
          "Machine Cost": machineCost,
          "AMC for Year": amcForYear,
          "AMC per Day": amcPerDay,
          "Machine Age Till Today": machineAgeTillToday,
          "Day for AMC Payment": dayForAmcPayment,
          "AMC Given": amcGiven,
          "AMC Remaining": amcRemaining,
          "Asset AMC Remaining": assetAmcRemaining,
          "Total Cost Ownership": totalCostOwnerShip,
        };
      })
      .filter((item) => item != null);

    if (dataForExcel.length === 0) {
      console.error("No valid data available for Excel export");
      return;
    }

    if (dataForExcel.length === 0) {
      console.error("No valid data available for Excel export");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    FileSaver.saveAs(dataBlob, "BookValueReport.xlsx");
  };

  const onSubmit = async (data) => {
    const bookValueData = {
      assetBookValue: data.assetBookValue,
      reportingDate: data.reportingDate,
    };

    try {
      const response = await createAllBookValueReport(bookValueData);
      console.log("response", response);

      if (response?.data?.statusCode === 200) {
        toast.success("BoothAcquisition updated successfully");
        generateExcel(response.data.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div>
        <form
          className="w-full max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-xl text-bold my-2">All Book Value Report</h1>
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Reporting Date</span>
            </label>
            <input
              type="date"
              {...register("reportingDate", {
                required: "Date of Purchase is required",
              })}
              className="input input-bordered"
              placeholder="Date of Purchase"
            />
            {errors.reportingDate && (
              <p className="text-red-500">{errors.reportingDate.message}</p>
            )}
          </div>
          <button className="btn w-full mt-4 btn-primary" type="submit">
            {isSubmitting ? "Downloading..." : "Download"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AllAssetBookValueReport;
