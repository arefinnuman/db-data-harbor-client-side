import { useGetAllAssetBookValueQuery } from "@/redux/assetBookValue/assetBookValueApi";
import { useCreateSelectedBookValueReportMutation } from "@/redux/bookValueReport/bookvValueReport";
import FileSaver from "file-saver";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "react-modal";
import * as XLSX from "xlsx";

const SelectedAssetBookValueReport = () => {
  const { data: assetBookValue } = useGetAllAssetBookValueQuery();

  const assetBookValueData = assetBookValue?.data;

  const [createSelectedBookValue] = useCreateSelectedBookValueReportMutation(
    {}
  );

  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting, errors, isValid },
  } = useForm();
  const {} = useFieldArray({
    control,
    name: "assetBookValue",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const [dataForExcel, setDataForExcel] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (selectAll) {
      setSelectedFields(Object.keys(dataForExcel[0]));
    } else {
      setSelectedFields([]);
    }
  }, [selectAll, dataForExcel]);

  const toggleSelectAll = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const generateData = (responseArray) => {
    const dataForExcelData = responseArray
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

    setDataForExcel(dataForExcelData);
    if (dataForExcelData.length === 0) {
      console.error("No valid data available for Excel export");
      return;
    }

    if (dataForExcelData.length === 0) {
      console.error("No valid data available for Excel export");
      return;
    }
  };

  const onSubmit = async (formData) => {
    const selectedTerminalIds = formData.assetBookValue
      ? Object.entries(formData.assetBookValue)
          .filter(([key, value]) => value)
          .map(([key, value]) => key)
      : [];

    const bookValueData = {
      selectedAssetBookValueIds: selectedTerminalIds,
      reportingDate: formData.reportingDate,
    };

    try {
      const response = await createSelectedBookValue(bookValueData);

      if (response?.data?.statusCode === 200) {
        generateData(response.data.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const downloadExcel = () => {
    closeModal();

    const filteredDataForExcel =
      dataForExcel.length > 0
        ? dataForExcel.map((item) => {
            const filteredItem = {};
            for (const field of selectedFields) {
              filteredItem[field] = item[field];
            }
            return filteredItem;
          })
        : [];

    const worksheet = XLSX.utils.json_to_sheet(filteredDataForExcel);
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

    toast.success("Downloaded Successfully");
  };

  const downloadCSV = () => {
    closeModal();

    const filteredDataForCSV =
      dataForExcel.length > 0
        ? dataForExcel.map((item) => {
            const filteredItem = {};
            for (const field of selectedFields) {
              filteredItem[field] = item[field];
            }
            return filteredItem;
          })
        : [];

    const csv = Papa.unparse(filteredDataForCSV, {
      header: true,
      delimiter: ",", // You can change the delimiter if needed
    });

    const dataBlob = new Blob([csv], {
      type: "text/csv;charset=utf-8",
    });
    FileSaver.saveAs(dataBlob, "BookValueReport.csv");

    toast.success("Downloaded Successfully");
  };

  const handleCheckboxChange = (field) => {
    setSelectedFields((prevSelectedFields) => {
      if (prevSelectedFields.includes(field)) {
        return prevSelectedFields.filter(
          (selectedField) => selectedField !== field
        );
      } else {
        return [...prevSelectedFields, field];
      }
    });
  };

  const isDownloadDisabled = selectedFields.length === 0;

  return (
    <div>
      <form
        className="w-full max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl text-bold my-2">Generate Book Value Report</h1>
        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Select your Terminal</span>
          </label>

          <div className="dropdown dropdown-hover ">
            <div
              tabIndex="0"
              className="m-1 btn select select-bordered select-primary w-full"
            >
              Choose Terminals
            </div>
            <ul
              tabIndex="0"
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-full"
            >
              {assetBookValueData &&
                assetBookValueData.map((assetBookValue) => (
                  <li key={assetBookValue.id}>
                    <label className="label flex justify-start cursor-pointer">
                      <input
                        type="checkbox"
                        {...register(`assetBookValue.${assetBookValue.id}`)}
                        value={assetBookValue.id}
                        className="checkbox checkbox-primary"
                      />
                      <span className="label-text">
                        {assetBookValue?.terminal?.terminalNameAndId}
                      </span>
                    </label>
                  </li>
                ))}
            </ul>
          </div>

          {errors.assetBookValue && (
            <p className="text-red-500">{errors.assetBookValue.message}</p>
          )}
        </div>

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
        <button
          className={`btn w-full mt-4 btn-primary`}
          onClick={openModal}
          disabled={!isValid}
        >
          {isSubmitting ? "Downloading..." : "Generate Report"}
        </button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Select Fields Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "1000",
          },
          content: {
            width: "90%",
            maxWidth: "600px",
            margin: "auto",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            backgroundColor: "white",
          },
        }}
      >
        <h2 className="text-3xl font-bold mb-6">Select Fields</h2>
        <div className="mb-4">
          <label className="flex items-center text-lg">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
              className="mr-3"
            />
            Select All
          </label>
        </div>

        <div className="flex flex-wrap">
          {dataForExcel.length > 0 &&
            Object.keys(dataForExcel[0]).map((field) => (
              <div key={field} className="w-1/2 mb-4">
                <label className="flex items-center text-lg">
                  <input
                    type="checkbox"
                    checked={selectedFields.includes(field)}
                    onChange={() => handleCheckboxChange(field)}
                    className="mr-3"
                  />
                  {field}
                </label>
              </div>
            ))}
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={downloadExcel}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mr-4 rounded-md focus:outline-none focus:shadow-outline-blue ${
              isDownloadDisabled && "opacity-50 cursor-not-allowed"
            } active:bg-blue-800`}
            disabled={isDownloadDisabled}
          >
            Download Excel
          </button>

          <button
            onClick={downloadCSV}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mr-4 rounded-md focus:outline-none focus:shadow-outline-blue ${
              isDownloadDisabled && "opacity-50 cursor-not-allowed"
            } active:bg-blue-800`}
            disabled={isDownloadDisabled}
          >
            Download CSV
          </button>

          <button
            onClick={closeModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline-gray active:bg-gray-400"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectedAssetBookValueReport;
