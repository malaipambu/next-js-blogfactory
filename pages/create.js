import Head from "next/head"
import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import CreatePost from "../components/CreatePost"
import { useState } from "react"
import { useMoralis } from "react-moralis"

const supportedChains = ["1337", "5"]

export default function Create() {
    const { isWeb3Enabled, chainId } = useMoralis()

    const [title, settitle] = useState("Title goes here")
    const [content, setcontent] = useState("Content goes here")
    const [titleClicked, settitleClicked] = useState(false)
    const [contentClicked, setcontentClicked] = useState(false)

    function handleTitleChange(event) {
        settitle(event.target.value)
    }

    function handleContentChange(event) {
        setcontent(event.target.value)
    }

    function handleInputClickTitle() {
        if (!titleClicked) {
            settitle("")
            settitleClicked(true)
        }
    }

    function handleInputClickContent() {
        if (!contentClicked) {
            setcontent("")
            setcontentClicked(true)
        }
    }

    //function handleSubmit(event) {
    //    event.preventDefault()
    //    console.log(title)
    //    console.log(content)
    //}

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
                    <br />
                    <br />
                    <br />

                    {supportedChains.includes(parseInt(chainId).toString()) ? (
                        <div className="flex flex-col justify-center items-center w-full">
                            <form className="w-full">
                                <label>
                                    <input
                                        className="font-bold text-4xl border rounded-2xl border-black text-center w-full h-20 border rounded px-3 py-2"
                                        id="titleInput"
                                        type="text"
                                        value={title}
                                        onChange={handleTitleChange}
                                        onClick={handleInputClickTitle}
                                    />
                                    <br />
                                </label>
                                <br />
                                <label>
                                    <textarea
                                        className="w-full h-80 border rounded-2xl border-black p-5"
                                        type="text"
                                        value={content}
                                        onChange={handleContentChange}
                                        onClick={handleInputClickContent}
                                    />
                                </label>
                                <CreatePost title={title} content={content} />
                            </form>
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
