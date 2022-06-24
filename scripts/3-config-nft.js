import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0xB440c0aeCAd617E56a3221C88F080C47412fcA77");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Wristband",
        description: "This wristband NFT will give you access to HouseDAO.",
        image: readFileSync("script/assets/wristband.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();