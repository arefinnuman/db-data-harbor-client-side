const UpdateIssueForm = ({ selectedUpdateIssue }) => {
  const id = selectedUpdateIssue.id;

  return (
    <div>
      <h1>Hello Updating</h1>
      <h1>ID: {selectedUpdateIssue.id}</h1>
    </div>
  );
};

export default UpdateIssueForm;
