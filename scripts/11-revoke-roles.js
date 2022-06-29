import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0xcBE080DD429EE18965Cc63b892Bc0FC5DAbbd44B");

(async () => {
  try {
    // log current roles
    const allRoles = await token.roles.getAll();

    console.log("Roles that exist right now:", allRoles);

    // Revoke all the superpowers your wallet had over the ERC-20 contract.
    await token.roles.setAll({ admin: [], minter: [] });
    console.log(
      "Roles after revoking ourselves",
      await token.roles.getAll()
    );
    console.log("Successfully revoked our superpowers from the ERC-20 contract");

  } catch (error) {
    console.error("Failed to revoke ourselves from the DAO treasury unfortunately :((", error);
  }
})();