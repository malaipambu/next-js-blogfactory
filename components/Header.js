import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function Header() {
    return (
        <nav className="p-5 border-b-2 flex flex-row bg-black rounded-2xl mt-4">
            <div className="py-4 px-4 font-bold text-6xl flex flex-col">
                <Link href="/">
                    <span className="text-white">Decentralized Blogs</span>
                </Link>
                <div className="text-xl text-white">
                    <Link href="/"> Home </Link> | <Link href="/create"> Create Post </Link>
                </div>
            </div>
            <div className="ml-auto py-2 px-4">
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}
