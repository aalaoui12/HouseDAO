import sdk from "./1-initialize-sdk.js";

// ERC-20 token address
const token = sdk.getToken("0xcBE080DD429EE18965Cc63b892Bc0FC5DAbbd44B");

(async () => {
  try {
    const amount = 1_000_000; // max supply of tokens

    await token.mintToSelf(amount); // mint to my wallet
    const totalSupply = await token.totalSupply();

    console.log("✅ There now is", totalSupply.displayValue, "$HDAO in circulation");
  } catch (error) {
      console.error("Failed to print money", error);
  }
})();