import { useGetSingleTerminalQuery } from "@/redux/terminals/terminalApi";
import Link from "next/link";
import { useRouter } from "next/router";
import SecondaryButton from "../Buttons/SecondaryButton";
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
    terminal365,
  } = terminalData;

  const TableRow = ({ label, data }) => (
    <tr className="hover:bg-blue-100">
      <td className="py-3 px-4 font-semibold text-gray-700 w-1/3 border border-r-gray-400">
        {label}
      </td>
      <td className="py-3 px-4 text-gray-900 border">{data}</td>
    </tr>
  );

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className="min-h-screen flex justify-center items-center py-12 px-4">
          <div className="bg-white shadow-2xl pb-8 rounded-lg w-full max-w-4xl">
            <div className="text-center space-y-6 pb-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-primary ">
                Terminal Details
              </h1>
              <p className="text-lg text-gray-700">
                Information for terminal ID: {terminalId}
              </p>
            </div>

            <table className="min-w-full mt-8 divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-300">
                <TableRow
                  label="Terminal Name And ID"
                  data={terminalNameAndId}
                />
                <TableRow label="Terminal Id" data={terminalId} />
                <TableRow label="Terminal Type" data={terminalType} />
                <TableRow label="Terminal Status" data={terminalStatus} />
                <TableRow label="Terminal Brand" data={terminalBrand} />
                <TableRow label="Terminal Model" data={terminalModel} />
                <TableRow label="Deployment Date" data={deploymentDate} />
                <TableRow label="Live Date" data={liveDate} />
                <TableRow label="Asset Tag Serial" data={assetTagSerial} />
                <TableRow label="GL Code" data={glCode} />
                <TableRow label="GL Number" data={glNumber} />
                <TableRow label="Insurance Limit" data={insuranceLimit} />
                <TableRow label="Number Of BPM" data={numberOfBpm} />
                <TableRow
                  label="Monthly Avg No Of Txn"
                  data={monthlyAvgNoOfTxn}
                />
                <TableRow
                  label="Monthly Avg Vol Of Txn"
                  data={monthlyAvgVolOfTxn}
                />
                <TableRow
                  label="Monthly No Of Transaction"
                  data={monthlyNoOfTransaction}
                />
                <TableRow
                  label="Monthly Vol Of Transaction"
                  data={monthlyVolOfTransaction}
                />
              </tbody>
            </table>

            <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-800 text-center">
              365 Booth Information
            </h2>

            <table className="min-w-full mt-6 divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-300">
                <TableRow
                  label="365 Booth Name"
                  data={terminal365?.ebl365Name}
                />
                <TableRow
                  label="365 Booth Address"
                  data={terminal365?.ebl365Address}
                />
                <TableRow label="365 Area Name" data={terminal365?.areaName} />
                <TableRow label="365 Area Type" data={terminal365?.areaType} />
              </tbody>
            </table>

            <div className="mt-6 text-center">
              <Link href="/">
                <SecondaryButton>Click Here</SecondaryButton>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleTerminalComponent;

