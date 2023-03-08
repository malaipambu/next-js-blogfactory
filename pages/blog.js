import Head from "next/head"
import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import { useRouter } from "next/router"
import RewardPost from "../components/RewardPost"
import { useMoralis } from "react-moralis"

const supportedChains = ["1337", "5"]

export default function Blog() {
    const router = useRouter()
    const { id } = router.query
    const { isWeb3Enabled, chainId } = useMoralis()

    return (
        <div className={styles.container}>
            <Head>
                <title>Decentralized Blog </title>
                <meta name="description" content="Decentralized Blog" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            {isWeb3Enabled ? (
                <div>
                    {supportedChains.includes(parseInt(chainId).toString()) ? (
                        <div className="flex flex-row">
                            <RewardPost tmp_id={id} />
                        </div>
                    ) : (
                        <div className="w-full text-center mt-10 font-bold text-xl">{`Please switch to a supported chainId. The supported Chain Ids are: ${supportedChains}`}</div>
                    )}
                </div>
            ) : (
                <div className="w-full text-center mt-10 font-bold text-xl">
                    Please connect to a Wallet
                </div>
            )}
        </div>
    )
}
