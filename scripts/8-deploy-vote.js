import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({
      // name of voting contract
      name: "HouseDAO Voting",

      // ERC-20 token contract address
      voting_token_address: "0xcBE080DD429EE18965Cc63b892Bc0FC5DAbbd44B",

      // when can members start voting after a proposal? immediately = 0
      voting_delay_in_blocks: 0,

      // how long members have to vote on a proposal. 1 day = 6570 blocks
      voting_period_in_blocks: 6570,

      // the minimum % of the total supply that need to vote for proposal to be valid
      voting_quorum_fraction: 0,

      // minimum number of tokens a user needs to create a new proposal
      proposal_token_threshold: 0,
    });

    console.log(
      "✅ Successfully deployed vote contract, address:",
      voteContractAddress,
    );
  } catch (error) {
    console.error("Failed to deploy vote contract", error);
  }
})();