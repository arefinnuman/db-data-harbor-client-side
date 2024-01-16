import {
  useDeleteEbl365Mutation,
  useGetAllEbl365Query,
} from "@/redux/ebl365/ebl365Api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { default as DataTable } from "react-data-table-component";
import toast from "react-hot-toast";
import { FaFileExcel, FaPlus, FaSearch } from "react-icons/fa";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import LoadingScreen from "../Ui/LoadingScreen";
import Update365Form from "./Update365Form";

export default function Ebl365Components() {
  const user = useSelector((state) => state.auth.user?.user);

  const { data, isLoading, refetch } = useGetAllEbl365Query(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [ebl365ToDelete, setEbl365ToDelete] = useState(null);

  const [selectedUpdateBooth, setSelectedUpdateBooth] = useState(null);

  const [delete365Booth] = useDeleteEbl365Mutation(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const handleDelete365Booth = async () => {
    try {
      await delete365Booth(ebl365ToDelete);
      toast.success("EBL 365 deleted successfully");
      refetch();
      setShowDeleteConfirmation(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteButtonClick = (branchId) => {
    setEbl365ToDelete(branchId);
    setShowDeleteConfirmation(true);
  };

  const columns = [
    { name: "Name", selector: (row) => row.ebl365Name, sortable: true },
    { name: "Address", selector: (row) => row.ebl365Address, sortable: true },
    { name: "Type", selector: (row) => row.ebl365StatusType, sortable: true },
    { name: "Zone", selector: (row) => row.ebl365Zone, sortable: true },
    { name: "Devices", selector: (row) => row.boothDevices, sortable: true },
    {
      name: "Total",
      selector: (row) => row.noOfAvailableMachine,
      sortable: true,
    },
    {
      name: "Active",
      selector: (row) => row.noOfRunningMachine,
      sortable: true,
    },
    {
      name: "Details",
      cell: (row) => (
        <Link
          href={`/ebl-365/${row._id}`}
          className="flex items-center text-gray-500 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          <span className="mr-2 border-b border-transparent hover:border-black hover:shadow-md">
            Details
          </span>
        </Link>
      ),
    },
    ...(user?.role === "admin" || user?.role === "super_admin"
      ? [
          {
            name: "Edit",
            cell: (row) => (
              <button
                onClick={() => setSelectedUpdateBooth(row)}
                className="text-blue-500 hover:bg-blue-100 p-2 rounded transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2 border-b border-transparent hover:border-blue-500 hover:shadow-md">
                  Edit
                </span>
              </button>
            ),
          },
          {
            name: "Delete",
            cell: (row) => (
              <button
                onClick={() => handleDeleteButtonClick(row._id)}
                className="text-red-500 hover:bg-red-100 p-2 rounded transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2 border-b border-transparent hover:border-red-500 hover:shadow-md">
                  Delete
                </span>
              </button>
            ),
          },
        ]
      : []),
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#2C3E50",
        color: "#ffffff",
        fontSize: "1rem",
        padding: "15px",
        textTransform: "uppercase",
      },
    },
    rows: {
      style: {
        fontSize: "1rem",
        cursor: "pointer",
        height: "60px",
        borderBottom: "1px solid #dfe6e9",
      },
      highlightOnHoverStyle: {
        backgroundColor: "#f2f2f2",
      },
    },
    pagination: {
      style: {
        fontSize: "1rem",
        padding: "10px",
      },
      pageButtonsStyle: {
        fontSize: "1rem",
        color: "#3498db",
      },
    },
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const results = data?.data?.filter((item) =>
      Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(results);
  }, [searchTerm, data?.data]);

  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelected = (rows) => {
    setSelectedRows(rows.selectedRows);
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
    if (selectedRows.length === 0) {
      toast.error("Please select at least one row to export");
      return;
    }

    setIsModalOpen(true);

    const selectedDataToExport = filteredData
      .filter((row) =>
        selectedRows.some((selectedRow) => selectedRow.id === row.id)
      )
      .map((row) => ({
        "EBL 365 Name": row.ebl365Name,
        "EBL 365 Address": row.ebl365Address,
        "EBL 365 Zone": row.ebl365Zone,
        "EBL 365 Name in Bengali": row.ebl365NameInBengali,
        "EBL 365 Status Type": row.ebl365StatusType,
        "Location Type": row.locationType,
        "Area Type": row.areaType,
        "Area Name": row.areaName,
        "Geo Latitude": row.geoLatitude,
        "Geo Longitude": row.geoLongitude,
        "Branch Controlling GL": row.branchControllingGl,
        "Division ": row.division,
        "Postal Code": row.postalCOde,
        "Nearest Famous Place": row.nearestFamousPlace,
        "Division ID": row.divisionId,
        "District ID": row.districtId,
        "Upazila or Thana": row.upazilaOrThana,
        "Controlled By": row.controlledBy,
        "Booth Devices": row.boothDevices,
        "No of Available Machines": row.noOfAvailableMachine,
        "No of Running Machines": row.noOfRunningMachine,
        "Available Machines Details": row.machines
          .map((machine) => machine.terminalNameAndId)
          .join(", "),
      }));

    console.log("selectedDataToExport", selectedDataToExport);
    setDataForExcel(selectedDataToExport);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  const handleDownload = () => {
    closeModal();

    const dataToExport = dataForExcel.map((row) =>
      selectedFields.reduce((acc, field) => {
        if (row[field] !== undefined) acc[field] = row[field];
        return acc;
      }, {})
    );

    const headers =
      selectedFields.length > 0
        ? selectedFields
        : Object.keys(dataForExcel[0] || {});

    const worksheet = XLSX.utils.json_to_sheet(dataToExport, {
      header: headers,
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

    const fileName = "selected-rows-export.xlsx";

    XLSX.writeFile(workbook, fileName);

    toast.success("Downloaded Successfully");
  };

  const subHeaderComponentDiv = () => {
    return (
      <div className="flex flex-col lg:flex-row items-center justify-between mb-2 w-full">
        <div className="mb-2 lg:mb-0 lg:mr-2">
          {user?.role === "admin" || user?.role === "super_admin" ? (
            <div>
              <Link
                href="/ebl-365/create"
                className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition-colors"
              >
                <FaPlus className="mr-2" /> Create
              </Link>
            </div>
          ) : null}
        </div>
        <div className="relative flex items-center mb-2 lg:mb-0">
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-2 pr-10 form-control rounded-md border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
            <FaSearch />
          </div>
        </div>
        <button
          className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition-colors"
          onClick={openModal}
        >
          <FaFileExcel className="mr-1" />
          Download Excel
        </button>
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className="md:px-5">
          <div className="w-full  m-auto overflow-x-auto  shadow-bottom shadow-md ">
            <DataTable
              title="EBL 365"
              columns={columns}
              data={filteredData || []}
              pagination
              selectableRows
              selectableRowsHighlight
              onSelectedRowsChange={handleRowSelected}
              highlightOnHover
              defaultSortField="Name"
              noDataComponent={<div className="p-4">No data available</div>}
              customStyles={customStyles}
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
              paginationComponentOptions={{
                rowsPerPageText: "Rows per page:",
                rangeSeparatorText: "of",
              }}
              striped
              responsive
              paginationServer
              searchable={true}
              searchPlaceholder="Search"
              subHeader
              subHeaderComponent={subHeaderComponentDiv()}
              subHeaderAlign="center"
              actions
            />
          </div>

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
                onClick={handleDownload}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mr-4 rounded-md focus:outline-none focus:shadow-outline-blu"
              >
                Download
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline-gray active:bg-gray-400"
              >
                Close
              </button>
            </div>
          </Modal>

          {selectedUpdateBooth && (
            <Modal
              isOpen={true}
              onRequestClose={() => setSelectedUpdateBooth(null)}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-primary shadow-2xl p-4 sm:p-6 md:p-8 bg-white rounded-lg w-full sm:w-auto sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setSelectedUpdateBooth(null)}
              >
                Close
              </button>
              <div style={{ maxHeight: "90vh" }} className="overflow-y-auto">
                <Update365Form selectedUpdateBooth={selectedUpdateBooth} />
              </div>
            </Modal>
          )}

          {showDeleteConfirmation && (
            <Modal
              isOpen={true}
              onRequestClose={() => setShowDeleteConfirmation(false)}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 modal-box shadow-2xl"
            >
              <div className="p-4">
                <p className="text-xl font-bold mb-4">Delete Confirmation</p>
                <p className="mb-4">
                  Are you sure you want to delete this item?
                </p>
                <div className="flex justify-end">
                  <button
                    className="btn btn-sm btn-danger mr-2"
                    onClick={() => {
                      handleDelete365Booth(ebl365ToDelete);
                      setShowDeleteConfirmation(false);
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => setShowDeleteConfirmation(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </section>
      )}
    </>
  );
}
