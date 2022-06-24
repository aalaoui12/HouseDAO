import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0xf2337Ac3B7235E0f77e30140B775Ee7781b2DBda");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Wristband",
        description: "This wristband NFT will give you access to HouseDAO.",
        image: readFileSync("scripts/assets/wristband.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();