import { useAddress, useMetamask, useEditionDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';

const App = () => {
  // use the hooks from thirdweb
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("👋 Address:", address);

  const editionDrop = useEditionDrop("0xf2337Ac3B7235E0f77e30140B775Ee7781b2DBda");
  // state to see whether user has claimed their membership NFT
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  // loading state to check whether user is currently claiming their NFT
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    if (!address) {
      return;
    }

    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0); // once again, 0 is tokenID
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get balance", error);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  const mintNft = async () => {
      try {
        setIsClaiming(true);
        await editionDrop.claim("0", 1);
        console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
        setHasClaimedNFT(true);
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to mint NFT", error);
      } finally {
        setIsClaiming(false);
      }
    };

  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to HouseDAO</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🍪DAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    );
};

  return (
    <div className="landing">
      <h1>Mint your HouseDAO membership NFT...</h1>
      <button
        disabled={isClaiming}
        onClick={mintNft}
      >
      {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
  );
};

export default App;
