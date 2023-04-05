import type { NextPage } from "next";
import { useRouter } from "next/router";
import OraImage from "components/oraimage";

const ImagePage: NextPage = () => {
  const router = useRouter();
  const { chain_id, contract_address, token_id } = router.query;

  return (
    <>
    <OraImage
        contract={contract_address as string}
        tokenId={token_id as string}
    />
    </>
  );
};
export default ImagePage;