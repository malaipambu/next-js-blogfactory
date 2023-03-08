import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function RewardPost({ tmp_id }) {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const PostFactoryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const dispatch = useNotification()
    const [postDetails, setPostDetails] = useState()

    const { runContractFunction: getPostDetails } = useWeb3Contract({
        abi,
        contractAddress: PostFactoryAddress,
        functionName: "getPostDetails",
        params: { _postId: tmp_id },
    })

    const GetAllPostDetails = async () => {
        const response = await getPostDetails()
        const hexValueCreatedOn = response[3]._hex
        const stringValue_timestamp = parseInt(hexValueCreatedOn, 16).toString()
        const _createdOn = new Date(stringValue_timestamp * 1000).toLocaleString()
        const hexValueRewardEarned = response[4]._hex
        const stringValueRewardEarnedInt = ethers.utils.formatUnits(hexValueRewardEarned, "ether")
        const stringValueRewardEarned = stringValueRewardEarnedInt.toString()
        const hexValueLikes = response[5]._hex
        const stringValueLikes = parseInt(hexValueLikes).toString()
        const post = {
            id: tmp_id,
            author: response[0],
            postTitle: response[1],
            content: response[2],
            createdOn: _createdOn,
            rewardEarned: stringValueRewardEarned,
            likes: stringValueLikes,
        }
        return post
    }

    const { runContractFunction: rewardPost } = useWeb3Contract({
        abi,
        contractAddress: PostFactoryAddress,
        functionName: "rewardPost",
        params: { _postId: tmp_id },
        msgValue: 10000000000000000,
    })

    const { runContractFunction: likePost } = useWeb3Contract({
        abi,
        contractAddress: PostFactoryAddress,
        functionName: "likePost",
        params: { _postId: tmp_id },
    })

    const updateUIValues = async () => {
        const allPostDetailFromCall = await GetAllPostDetails()
        setPostDetails(allPostDetailFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    const { id, author, postTitle, content, createdOn, likes, rewardEarned } = postDetails || {}

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "We thank you on behalf of the author",
            title: "Post Rewared!",
            position: "topR",
            icon: "bell",
        })
    }

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)
            handleNewNotification(tx)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="p-5 w-full">
            <button
                onClick={async function () {
                    await updateUIValues()
                }}
            >
                Refresh
            </button>

            <div className="font-bold text-4xl text-center w-full">{postTitle}</div>
            <div>
                <span className="font-bold">Posted by : </span>
                {author}
            </div>
            <div>
                <span className="font-bold">Created on : </span>
                {createdOn}
            </div>
            <div className="flex space-x-5">
                <div>
                    <span className="font-bold">Likes : </span>
                    {likes}
                </div>
                <div>
                    <span className="font-bold">Rewards : </span>
                    {rewardEarned}
                </div>
            </div>
            <div className="mt-10">{content}</div>

            <br />
            <div className="flex space-x-4">
                <button
                    className="py-4 px-4 font-bold text-xl border-2 border-black black bg-white text-black rounded-lg"
                    onClick={async function () {
                        await rewardPost({
                            onSuccess: handleSuccess,
                            onError: (error) => console.log(error),
                        })
                        await updateUIValues()
                    }}
                >
                    Reward 0.01 ETH
                </button>
                <button
                    className="py-4 px-4 font-bold text-xl bg-black text-white rounded-lg"
                    onClick={async function () {
                        await likePost()
                        await updateUIValues()
                    }}
                >
                    Like
                </button>
            </div>
        </div>
    )
}
