import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import Router from "next/router"

function SendProps(data) {
    Router.push({ pathname: "/blog", query: data })
}

function UseContract() {
    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const PostFactoryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    return { PostFactoryAddress, isWeb3Enabled }
}

function GetPostTitle({ id }) {
    const { PostFactoryAddress, isWeb3Enabled } = UseContract()

    const { runContractFunction: getPostDetails } = useWeb3Contract({
        abi,
        contractAddress: PostFactoryAddress,
        functionName: "getPostDetails",
        params: { _postId: id },
    })

    const [postTitle, setPostTitle] = useState("Loading...")

    useEffect(() => {
        async function getPostTitle() {
            const response = await getPostDetails()
            setPostTitle(response[1])
        }
        if (isWeb3Enabled) {
            getPostTitle()
        }
    }, [getPostDetails, isWeb3Enabled])

    return postTitle
}

export default function GetAllPostTitles() {
    const { PostFactoryAddress, isWeb3Enabled } = UseContract()

    const [totalPostCount, settotalPostCount] = useState(0)

    const { runContractFunction: getTotalPostCount } = useWeb3Contract({
        abi: abi,
        contractAddress: PostFactoryAddress,
        functionName: "getTotalPostCount",
        params: {},
    })

    useEffect(() => {
        async function updateUIValues() {
            const totalPostCountFromCall = (await getTotalPostCount()).toString()
            settotalPostCount(totalPostCountFromCall)
        }
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [getTotalPostCount, isWeb3Enabled])

    const postTitles = []

    for (let _id = totalPostCount - 1; _id >= 0; _id--) {
        const title = <GetPostTitle key={_id} id={_id} />

        postTitles.push(
            <div
                key={_id}
                className="w-full h-16 bg-gray-200 flex justify-center mb-6 drop-shadow-md cursor-pointer items-center text-center text-2xl font-bold rounded-2xl overflow-hidden"
            >
                <a onClick={() => SendProps({ id: _id })}>{title}</a>
            </div>
        )
    }
    return (
        <div className="p-5">
            <div className="flex flex-col max-w-full overflow-x-auto">{postTitles}</div>
        </div>
    )
}

//<h1 className="py-4 px-4 text-2xl text-center">
//There are {totalPostCount} posts made so far!{" "}
//</h1>
