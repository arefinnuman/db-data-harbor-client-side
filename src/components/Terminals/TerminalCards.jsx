const TerminalTable = ({ terminals }) => {
  return (
    <div className="w-full m-auto mt-10 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Terminals</h1>
      <table className="min-w-full bg-white border rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border">Name and ID</th>
            <th className="py-2 px-4 border">Asset Tag Serial</th>
            <th className="py-2 px-4 border">Custodians Com</th>
            <th className="py-2 px-4 border">Custodians Key</th>
            <th className="py-2 px-4 border">Deployment Date</th>
            <th className="py-2 px-4 border">GL Code</th>
            <th className="py-2 px-4 border">GL Number</th>
            <th className="py-2 px-4 border">Insurance Limit</th>
            <th className="py-2 px-4 border">Live Date</th>
            <th className="py-2 px-4 border">Monthly Avg Txn</th>
            <th className="py-2 px-4 border">Monthly Avg Vol Txn</th>
            <th className="py-2 px-4 border">Monthly No. Txn</th>
            <th className="py-2 px-4 border">Monthly Vol. Txn</th>
            <th className="py-2 px-4 border">Number of BPM</th>
            <th className="py-2 px-4 border">Terminal 365</th>
            <th className="py-2 px-4 border">Terminal Type</th>
            <th className="py-2 px-4 border">Terminal Status</th>
            <th className="py-2 px-4 border">Terminal Brand</th>
            <th className="py-2 px-4 border">Terminal ID</th>
          </tr>
        </thead>
        <tbody>
          {terminals.map((terminal) => (
            <tr key={terminal.terminalId}>
              <td className="py-2 px-4 border">{terminal.terminalNameAndId}</td>
              <td className="py-2 px-4 border">{terminal.assetTagSerial}</td>
              <td className="py-2 px-4 border">{terminal.custodiansCom}</td>
              <td className="py-2 px-4 border">{terminal.custodiansKey}</td>
              <td className="py-2 px-4 border">{terminal.deploymentDate}</td>
              <td className="py-2 px-4 border">{terminal.glCode}</td>
              <td className="py-2 px-4 border">{terminal.glNumber}</td>
              <td className="py-2 px-4 border">{terminal.insuranceLimit}</td>
              <td className="py-2 px-4 border">{terminal.liveDate}</td>
              <td className="py-2 px-4 border">{terminal.monthlyAvgNoOfTxn}</td>
              <td className="py-2 px-4 border">
                {terminal.monthlyAvgVolOfTxn}
              </td>
              <td className="py-2 px-4 border">
                {terminal.monthlyNoOfTransaction}
              </td>
              <td className="py-2 px-4 border">
                {terminal.monthlyVolOfTransaction}
              </td>
              <td className="py-2 px-4 border">{terminal.numberOfBpm}</td>
              <td className="py-2 px-4 border">{terminal.terminal365}</td>
              <td className="py-2 px-4 border">{terminal.terminalType}</td>
              <td className="py-2 px-4 border">{terminal.terminalStatus}</td>
              <td className="py-2 px-4 border">{terminal.terminalBrand}</td>
              <td className="py-2 px-4 border">{terminal.terminalId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TerminalTable;

