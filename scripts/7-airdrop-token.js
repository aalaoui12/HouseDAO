import sdk from "./1-initialize-sdk.js";

const editionDrop = sdk.getEditionDrop("0xf2337Ac3B7235E0f77e30140B775Ee7781b2DBda");

const token = sdk.getToken("0xcBE080DD429EE18965Cc63b892Bc0FC5DAbbd44B");

(async () => {
  try {
    // get addresses of everyone who owns a membership NFT
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddresses.length === 0) {
      console.log(
        "No membership NFTs have been claimed yet.",
      );
      process.exit(0);
    }

    const airdropTargets = walletAddresses.map((address) => {
      // Pick a random # between 1000 and 10000.
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

      // Set up the target.
      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };

      return airdropTarget;
    });

    // Call transferBatch on all our airdrop targets.
    console.log("🌈 Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
  } catch (error) {
      console.log("failed to airdrop tokens", error);
  }
})();