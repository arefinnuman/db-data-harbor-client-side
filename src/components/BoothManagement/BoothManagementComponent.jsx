import {
  useDeleteBoothManagementMutation,
  useGetAllBoothManagementQuery,
  useGetUnassignedBoothForBoothManagementQuery,
} from "@/redux/boothManagement/bothManagementApi";
import Link from "next/link";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { FaFileExcel, FaPlus, FaSearch } from "react-icons/fa";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import LoadingScreen from "../Ui/LoadingScreen";
import UpdateBoothManagementForm from "./UpdateBoothManagementForm";

const BoothManagementComponent = () => {
  const { data, isLoading, refetch } = useGetAllBoothManagementQuery(
    undefined,
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const user = useSelector((state) => state?.auth?.user?.user);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [boothManagementToDelete, setBoothManagementToDelete] = useState(null);

  const [selectedUpdateBoothManagement, setSelectedUpdateBoothManagement] =
    useState(null);

  const [delete365boothManagement] = useDeleteBoothManagementMutation(
    undefined,
    {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
    }
  );

  const handleDelete365boothManagement = async () => {
    try {
      await delete365boothManagement(boothManagementToDelete);
      toast.success("Booth Management deleted successfully");
      refetch();
      setShowDeleteConfirmation(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteButtonClick = (boothManagementId) => {
    setBoothManagementToDelete(boothManagementId);
    setShowDeleteConfirmation(true);
  };

  const { data: unAssignedEbl365 } =
    useGetUnassignedBoothForBoothManagementQuery(undefined, {
      pollingInterval: 30000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

  const unAssignedEbl365Data = unAssignedEbl365?.data;

  const hasUnassignedBooths =
    unAssignedEbl365Data && unAssignedEbl365Data.length > 0;

  const renderUnassignedBooths = () => {
    return unAssignedEbl365Data.map((booth, index) => (
      <li key={booth.id}>
        {booth.ebl365Name}
        {index < unAssignedEbl365Data.length - 1 ? "" : ""}
      </li>
    ));
  };

  const columns = [
    { name: "Name", selector: (row) => row.ebl365?.ebl365Name, sortable: true },
    {
      name: "Address",
      selector: (row) => row.ebl365?.ebl365Address,
      sortable: true,
    },
    {
      name: "AC Quantity",
      selector: (row) => row.numberOfAc,
      sortable: true,
    },
    {
      name: "Light Quantity",
      selector: (row) => row.numberOfLight,
      sortable: true,
    },
    {
      name: "Machine Quantity",
      selector: (row) => row.numberOfMachine,
      sortable: true,
    },
    {
      name: "Mineral Quantity",
      selector: (row) => row.numberOfMineralBoard,
      sortable: true,
    },
    {
      name: "UPS Quantity",
      selector: (row) => row.numberOfUps,
      sortable: true,
    },
    {
      name: "Details",
      cell: (row) => (
        <Link
          href={`/booth-management/${row._id}`}
          className="flex items-center text-gray-500 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          <span className="mr-2 border-b border-transparent hover:border-black hover:shadow-md">
            Details
          </span>
        </Link>
      ),
    },
    {
      name: "Complain",
      cell: (row) => (
        <Link
          href={`/issue-form/drop-an-issue/${row.ebl365?._id}`}
          className="flex items-center text-gray-500 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          <span className="mr-2 border-b border-transparent hover:border-black hover:shadow-md">
            Drop
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
        "Booth Name": row.ebl365?.ebl365Name,
        "Booth Address": row.ebl365?.ebl365Address,
        "AC Quantity": row.numberOfAc,
        "Light Quantity": row.numberOfLight,
        "Machine Quantity": row.numberOfMachine,
        "Mineral Quantity": row.numberOfMineralBoard,
        "UPS Quantity": row.numberOfUps,
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

  const exportExcel = () => {
    if (selectedFields.length === 0) {
      toast.error("Select a field first");
      return;
    }

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

  const exportCsv = () => {
    if (selectedFields.length === 0) {
      toast.error("Select a field first");
      return;
    }

    closeModal();

    const dataToExport = dataForExcel.map((row) =>
      selectedFields.reduce((acc, field) => {
        if (row[field] !== undefined) acc[field] = row[field];
        return acc;
      }, {})
    );

    const csvData = Papa.unparse(dataToExport, { header: true });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "selected-rows-export.csv";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Downloaded Successfully");
  };

  const subHeaderComponentDiv = () => {
    return (
      <div className="flex flex-col lg:flex-row items-center justify-between mb-2 w-full">
        <div className="mb-2 lg:mb-0 lg:mr-2">
          {user?.role === "admin" || user?.role === "super_admin" ? (
            <div>
              <Link
                href="/booth-management/create"
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
          Download
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
          <div className="w-full m-auto  overflow-x-auto">
            <DataTable
              title="EBL 365 Booth Management"
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
                onClick={exportExcel}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mr-4 rounded-md focus:outline-none focus:shadow-outline-blu"
              >
                EXCEL
              </button>

              <button
                onClick={exportCsv}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mr-4 rounded-md focus:outline-none focus:shadow-outline-blu"
              >
                CSV
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-md focus:outline-none focus:shadow-outline-gray active:bg-gray-400"
              >
                Close
              </button>
            </div>
          </Modal>

          <>
            {selectedUpdateBoothManagement && (
              <Modal
                isOpen={true}
                onRequestClose={() => setSelectedUpdateBooth(null)}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-primary shadow-2xl p-4 sm:p-6 md:p-8 bg-white rounded-lg w-full sm:w-auto sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg"
              >
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none "
                  onClick={() => setSelectedUpdateBooth(null)}
                >
                  X Close
                </button>
                <div style={{ maxHeight: "90vh" }} className="overflow-y-auto">
                  <UpdateBoothManagementForm
                    selectedUpdateBoothManagement={
                      selectedUpdateBoothManagement
                    }
                  />
                </div>
              </Modal>
            )}
          </>

          <>
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
                        handleDelete365boothManagement(boothManagementToDelete);
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
          </>

          <>
            {hasUnassignedBooths && (
              <div className="mt-5">
                <div className="p-4 mb-4 rounded-lg bg-yellow-100 border-yellow-400 border-l-4">
                  <h5 className="text-yellow-800 text-lg font-semibold mb-2">
                    Attention: Unassigned Booths
                  </h5>
                  <p className="text-yellow-700 mb-3">
                    The following booths are currently unassigned. Please assign
                    them soon:
                  </p>
                  <ul className="list-disc list-inside pl-5">
                    {renderUnassignedBooths()}
                  </ul>
                </div>
              </div>
            )}
          </>
        </section>
      )}
    </>
  );
};

export default BoothManagementComponent;
