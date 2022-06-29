import sdk from "./1-initialize-sdk.js";

// our governance contract
const vote = sdk.getVote("0xD95B45fCFE75D9E440b3A0d9033353B75a287428");

// our token contract
const token = sdk.getToken("0xcBE080DD429EE18965Cc63b892Bc0FC5DAbbd44B");

(async () => {
  try {
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }
  try {
    // we minted the whole supply to ourself
    const ownedTokenBalance = await token.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold.
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = Number(ownedAmount) / 100 * 90;

    // Transfer 90% of the supply to our voting contract.
    await token.transfer(
      vote.getAddress(),
      percent90
    );

    console.log("✅ Successfully transferred " + percent90 + " tokens to vote contract");
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();