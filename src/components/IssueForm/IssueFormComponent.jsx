import {
  useDeleteIssueFormMutation,
  useGetAllIssueFormQuery,
  useUpdateIssueToPendingMutation,
  useUpdateIssueToResolveMutation,
  useUpdateToInProgressMutation,
} from "@/redux/issueForm/issueFormApi";
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

const IssueFormComponent = () => {
  const { data, isLoading, refetch } = useGetAllIssueFormQuery(undefined, {
    pollingInterval: 9000,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const [solvedIssue] = useUpdateIssueToResolveMutation();
  const [pendingIssue] = useUpdateIssueToPendingMutation();
  const [inprogressIssue] = useUpdateToInProgressMutation();

  const handleToResolve = async (id) => {
    try {
      const response = await solvedIssue(id);
      toast.success(response?.data?.message);
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleToPending = async (id) => {
    try {
      const response = await pendingIssue(id);
      toast.success(response?.data?.message);
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleToInprogress = async (id) => {
    try {
      const response = await inprogressIssue(id);
      toast.success(response?.data?.message);
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  function BoothProblems({ issueForm }) {
    const problemKeys = [
      "acProblem",
      "machineProblem",
      "lightProblem",
      "roofCeilingProblem",
      "wallProblem",
      "aicoProblem",
      "mineralBoardProblem",
      "tilesProblem",
      "wastageBinProblem",
      "dvrProblem",
      "upsProblem",
      "othersProblem",
    ];

    const existingProblems = problemKeys.filter((key) => issueForm[key]);

    return (
      <td className="py-2 px-4">
        <ul className="list-disc pl-5 space-y-1">
          {existingProblems.map((problem) => (
            <li key={problem} className="text-gray-700 text-sm font-medium">
              {issueForm[problem]}
            </li>
          ))}
        </ul>
        {existingProblems.length === problemKeys.length && (
          <div className="text-red-500 text-sm font-bold mt-2">
            All problems are present.
          </div>
        )}
      </td>
    );
  }

  const user = useSelector((state) => state?.auth?.user?.user);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [issueToDelete, setIssueToDelete] = useState(null);

  const [deleteIssue] = useDeleteIssueFormMutation(undefined, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const handleDeleteIssue = async () => {
    try {
      await deleteIssue(issueToDelete);
      toast.success("issue deleted successfully");
      refetch();
      refetch();
      setShowDeleteConfirmation(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteButtonClick = (issueId) => {
    if (issueId) {
      setIssueToDelete(issueId);
      setShowDeleteConfirmation(true);
    } else {
      toast.error("Something went wrong");
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.boothManagement?.ebl365.ebl365Name,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.boothManagement?.ebl365.ebl365Address,
      sortable: true,
    },
    {
      name: "Submitted Date",
      selector: (row) =>
        row.issueSubmittedDate
          ? new Date(row.issueSubmittedDate).toLocaleDateString()
          : "-",
      sortable: true,
    },
    {
      name: "Problems",
      width: "150px",
      cell: (row) => <BoothProblems issueForm={row} />,
    },
    {
      name: "Status",
      cell: (row) => (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
            row.issueStatus.toLowerCase() === "pending"
              ? "bg-red-100 text-red-800"
              : row.issueStatus.toLowerCase() === "in progress"
              ? "bg-yellow-100 text-yellow-800"
              : row.issueStatus.toLowerCase() === "resolved"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.issueStatus}
        </div>
      ),
    },
    {
      name: "Actions",
      width: "240px",
      cell: (row) => (
        <>
          {row.issueStatus.toLowerCase() === "pending" && (
            <>
              <button
                className="text-blue-500 hover:border-blue-600 rounded px-3 py-1 mr-2 cursor-pointer hover:bg-blue-500 hover:text-white transition ease-in-out duration-300"
                onClick={() => handleToResolve(row.id)}
              >
                Resolve
              </button>
              <button
                className="text-yellow-500 hover:border-yellow-600 rounded px-3 py-1 cursor-pointer hover:bg-yellow-500 hover:text-white transition ease-in-out duration-300"
                onClick={() => handleToInprogress(row.id)}
              >
                In Progress
              </button>
            </>
          )}
          {row.issueStatus.toLowerCase() === "resolved" && (
            <>
              <button
                className="text-green-500 hover:border-green-600 rounded px-3 py-1 cursor-pointer hover:bg-green-500 hover:text-white transition ease-in-out duration-300"
                onClick={() => handleToPending(row.id)}
              >
                Pending
              </button>
              <button
                className="text-yellow-500 hover:border-yellow-600 rounded px-3 py-1 cursor-pointer hover:bg-yellow-500 hover:text-white transition ease-in-out duration-300"
                onClick={() => handleToInprogress(row.id)}
              >
                In Progress
              </button>
            </>
          )}
          {row.issueStatus.toLowerCase() === "in progress" && (
            <>
              <button
                className="text-yellow-500 hover:border-yellow-600 rounded px-3 py-1 cursor-pointer hover:bg-yellow-500 hover:text-white transition ease-in-out duration-300"
                onClick={() => handleToPending(row.id)}
              >
                Pending
              </button>
              <button
                className="text-blue-500 hover:border-blue-600 rounded px-3 py-1 mr-2 cursor-pointer hover:bg-blue-500 hover:text-white transition ease-in-out duration-300"
                onClick={() => handleToResolve(row.id)}
              >
                Resolve
              </button>
            </>
          )}
          {row.issueStatus.toLowerCase() === "other" && (
            <button
              className="text-gray-500 hover:border-gray-600 rounded px-3 py-1 cursor-pointer hover:bg-gray-500 hover:text-white transition ease-in-out duration-300"
              disabled
            >
              Status Unavailable
            </button>
          )}
        </>
      ),
    },
    {
      name: "Details",
      cell: (row) => (
        <Link
          href={`/issue-form/${row._id}`}
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

  console.log("selectedRows", selectedRows);

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
        "EBL 365 Name": row.boothManagement.ebl365.ebl365Name,
        "EBL 365 Address": row.boothManagement.ebl365.ebl365Address,
        "EBL 365 Zone": row.boothManagement.ebl365.ebl365Zone,
        "Booth Devices": row.boothManagement.ebl365.boothDevices,
        "Number of Machine": row.boothManagement.numberOfMachine,
        "Number of AC": row.boothManagement.numberOfAc,
        "Number of Light": row.boothManagement.numberOfLight,
        "Number of Mineral Board": row.boothManagement.numberOfMineralBoard,
        "Number of UPS": row.boothManagement.numberOfUps,
        "AC Problem": row.acProblem,
        "Light Problem": row.lightProblem,
        "Machine Problem": row.machineProblem,
        "Mineral Board Problem": row.mineralBoardProblem,
        "Roof Ceiling Problem": row.roofCeilingProblem,
        "Wall Problem": row.wallProblem,
        "AICO Problem": row.aicoProblem,
        "Tiles Problem": row.tilesProblem,
        "Wastage Bin Problem": row.wastageBinProblem,
        "DVR Problem": row.dvrProblem,
        "UPS Problem": row.upsProblem,
        "Others Problem": row.othersProblem,
        "Issue Status": row.issueStatus,
        "Issue Submitted Date": row.issueSubmittedDate
          ? new Date(row.issueSubmittedDate).toLocaleDateString()
          : "-",
        "Issue Resolved Date": row.updatedDate
          ? new Date(row.issueSubmittedDate).toLocaleDateString()
          : "-",
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
                href="//issue-form/drop-an-issue"
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
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className="px-6">
          <div className="w-full m-auto  overflow-x-auto">
            <DataTable
              title="EBL 365 ISSUE FORM"
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
                      handleDeleteIssue(issueToDelete);
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
    </div>
  );
};

export default IssueFormComponent;
