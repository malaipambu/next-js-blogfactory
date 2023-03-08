import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import Router from "next/router"
import { useNotification } from "web3uikit"

export default function CreatePost(data) {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const PostFactoryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const { title, content } = data
    const dispatch = useNotification()

    const { runContractFunction: createPost } = useWeb3Contract({
        abi,
        contractAddress: PostFactoryAddress,
        functionName: "createPost",
        params: { _postTitle: title, _content: content },
    })

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Your blog is now in chain!",
            title: "Posted!",
            position: "topR",
            icon: "bell",
        })
    }

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)
            handleNewNotification(tx)
            Router.push({ pathname: "/" })
        } catch (error) {
            console.log(error)
        }
    }

    async function handlePost() {
        event.preventDefault()
        await createPost({ onSuccess: handleSuccess, onError: (error) => console.log(error) })
    }

    return (
        <div className="p-5">
            <button
                className=" top-40 right-20 py-4 px-4 font-bold text-3xl bg-black text-white rounded-lg"
                onClick={async function () {
                    handlePost()
                }}
            >
                Post This!
            </button>
        </div>
    )
}
