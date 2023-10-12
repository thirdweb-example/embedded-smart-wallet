import {
  ConnectWallet,
  Web3Button,
  useOwnedNFTs,
  useAddress,
  useContract,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { useConnectionStatus } from "@thirdweb-dev/react";
import { use } from "react";
import { editionDropAddress } from "../const";

const Home: NextPage = () => {
  const connectionStatus = useConnectionStatus();
  const address = useAddress();
  const { contract } = useContract(editionDropAddress);
  const { data, isLoading, error } = useOwnedNFTs(contract, address);
  return (

    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Gasless Transactions with <br />
            <span className={styles.gradientText0}>
              <a
                href="https://thirdweb.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Smart & Embedded Wallets.
              </a>
            </span>
          </h1>

          <div className={styles.connect}>
            <ConnectWallet
              dropdownPosition={{
                side: "bottom",
                align: "center",
              }}
            />

            {address ? (
              <div className={styles.nft}>
                <Web3Button
                  contractAddress={editionDropAddress}
                  action={(contract) => contract.erc1155.claim(0, 1)}
                >
                  Claim Edition NFT
                </Web3Button>
                <br /><br />
                {/* replace XXXXXXXX with your client id */}
                <iframe id="export-iframe" width="500" height="360" src="https://ews.thirdweb.com/sdk/2022-08-12/embedded-wallet/export?clientId=XXXXXXXX" />
              </div>
            ) : (
              <p>Please log in with you Google account or email</p>
            )}
            {data?.map((nft) => {
              return (
                <div className={styles.container} key={nft.metadata.id}>
                  <ThirdwebNftMedia metadata={nft.metadata} />
                  <p>{nft.metadata.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
