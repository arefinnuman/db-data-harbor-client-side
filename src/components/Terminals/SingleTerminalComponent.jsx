import { useGetSingleTerminalQuery } from "@/redux/terminals/terminalApi";
import Link from "next/link";
import { useRouter } from "next/router";
import LoadingScreen from "../Ui/LoadingScreen";

const SingleTerminalComponent = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useGetSingleTerminalQuery(id, {
    pollingInterval: 30000,
    refetchOnMountOrArgChange: true,
  });

  const terminalData = data?.data || {};

  const {
    assetTagSerial,
    deploymentDate,
    glCode,
    glNumber,
    insuranceLimit,
    liveDate,
    monthlyAvgNoOfTxn,
    monthlyAvgVolOfTxn,
    monthlyNoOfTransaction,
    monthlyVolOfTransaction,
    numberOfBpm,
    terminalBrand,
    terminalId,
    terminalModel,
    terminalNameAndId,
    terminalStatus,
    terminalType,
    ebl365,
  } = terminalData;

  console.log(terminalData);

  const TableRow = ({ label, data }) => (
    <tr>
      <td className="py-2 px-4 font-medium text-gray-600 w-1/3 border-b">
        {label}
      </td>
      <td className="py-2 px-4 text-gray-800 border-b">{data}</td>
    </tr>
  );
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className="min-screen flex justify-center items-center py-12 px-4">
          <div className="bg-white p-10 rounded-lg w-full max-w-4xl shadow-xl transform hover:scale-105 transition-transform duration-300">
            <div className="text-center space-y-4 pb-3 border-b border-gray-300">
              <h1 className="text-xl font-bold text-primary">
                TERMINAL DETAILS
              </h1>
              <p className="text-md text-gray-600">
                Information for terminal ID:{"  "}
                <span className="font-semibold">{terminalId}</span>
              </p>
            </div>

            <table className="min-w-full mt-8 space-y-4">
              <tbody>
                <TableRow
                  label="Terminal Name and ID"
                  data={terminalNameAndId}
                />
                <TableRow label="Terminal ID" data={terminalId} />
                <TableRow label="Terminal Type" data={terminalType} />
                <TableRow label="Terminal Status" data={terminalStatus} />
                <TableRow label="Terminal Brand" data={terminalBrand} />
                <TableRow label="Terminal Model" data={terminalModel} />
                <TableRow label="Asset Tag Serial" data={assetTagSerial} />
                <TableRow label="GL Code" data={glCode} />
                <TableRow label="GL Number" data={glNumber} />
                <TableRow label="Insurance Limit" data={insuranceLimit} />
                <TableRow label="Deployment Date" data={deploymentDate} />
                <TableRow label="Live Date" data={liveDate} />
                <TableRow label="Number of BPM" data={numberOfBpm} />
                <TableRow
                  label="Monthly Average Number of Transactions"
                  data={monthlyAvgNoOfTxn}
                />
                <TableRow
                  label="Monthly Average Volume of Transactions"
                  data={monthlyAvgVolOfTxn}
                />
                <TableRow
                  label="Monthly Number of Transactions"
                  data={monthlyNoOfTransaction}
                />
                <TableRow
                  label="Monthly Volume of Transactions"
                  data={monthlyVolOfTransaction}
                />
              </tbody>
            </table>

            <h2 className="mt-6 mb-4 text-primary text-xl font-semibold text-center ">
              365 BOOTH DETAILS
            </h2>

            <table className="min-w-full mt-4 space-y-4">
              <tbody>
                <TableRow label="Booth Name" data={ebl365.ebl365Name} />
                <TableRow
                  label="Running Machines"
                  data={ebl365.noOfRunningMachine}
                />
                <TableRow
                  label="Available Machines"
                  data={ebl365.boothDevices}
                />
                <TableRow label="Booth Status" data={ebl365.ebl365StatusType} />
                <TableRow label="Booth Zone" data={ebl365.ebl365Zone} />
                <TableRow label="Booth Address" data={ebl365.ebl365Address} />
              </tbody>
            </table>

            <div className="mt-10 text-center">
              <Link
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition duration-200"
              >
                Go Back
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleTerminalComponent;

{
  /* <TableRow
label="Terminal Name and ID"
data={terminalNameAndId}
/>
<TableRow label="Terminal ID" data={terminalId} />
<TableRow label="Terminal Type" data={terminalType} />
<TableRow label="Terminal Status" data={terminalStatus} />
<TableRow label="Terminal Brand" data={terminalBrand} />
<TableRow label="Terminal Model" data={terminalModel} />
<TableRow label="Asset Tag Serial" data={assetTagSerial} />
<TableRow label="GL Code" data={glCode} />
<TableRow label="GL Number" data={glNumber} />
<TableRow label="Insurance Limit" data={insuranceLimit} />
<TableRow label="Deployment Date" data={deploymentDate} />
<TableRow label="Live Date" data={liveDate} />
<TableRow
label="Monthly Average Number of Transactions"
data={monthlyAvgNoOfTxn}
/>
<TableRow
label="Monthly Average Volume of Transactions"
data={monthlyAvgVolOfTxn}
/>
<TableRow
label="Monthly Number of Transactions"
data={monthlyNoOfTransaction}
/>
<TableRow
label="Monthly Volume of Transactions"
data={monthlyVolOfTransaction}
/>
<TableRow label="Number of BPM" data={numberOfBpm} /> */
}
