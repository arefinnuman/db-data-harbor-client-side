import CreateBookValueComponent from "@/components/AssetBookValue/CreateBookValueComponent";
import RootLayout from "@/layout/RootLayout";

const CreateAssetBookValuePage = () => {
  return (
    <div>
      <CreateBookValueComponent />
    </div>
  );
};

export default CreateAssetBookValuePage;

CreateAssetBookValuePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
