import type { NextPage } from "next";
import { useRouter } from "next/router";
import OraGlbViewer from "components/oraglbviewer";

import Nft from "components/Nft"

const OraPage: NextPage = () => {
  const router = useRouter();
  const { chain_id, contract_address, token_id } = router.query;

    // initialize ora viewer
    const onCanvasReady = async (canvas: any) => {
        console.log("onCanvasReady");
    }


  return (
    <>
    <OraGlbViewer
        onCanvasReady={onCanvasReady}    
        contract={contract_address as string}
        tokenId={token_id as string}
    />
    </>
  );
};
export default OraPage;

{/* <Nft
contract={contract_address as string}
tokenId={token_id as string}
service={""}
url={""}
/> */}
