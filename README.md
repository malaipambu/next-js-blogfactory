
# Next.js Blogfactory


The Next.js Blogfactory is a simple blog creation tool built with Next.js which connects my previos hardhat-postfactory repo. It allows you to easily create blog posts using  publish them as static page in the blockchain. This project serves as a starting point for creating your own blog in Web3 Space. Where authors can recive rewards as well as likes from the readers. Since this is Web Interaction of my previous repo "hardhat-postfactory" the abi is predefined. 


##### Key features of the Smart Contract include:

- Users can post any number of articles.
- Articles can be liked by other users.
- Authors of articles can earn rewards in the form of ETH from other users.
- Get notification when the transcation finishes
- Runs on multiple chains as per the defined smart contract address.

##### Installation
To get started with this project, follow these steps:

1. Clone the repository to your local machine
```
git clone https://github.com/malaipambu/next-js-blogfactory.git
next-js-blogfactory
```
2. Install the project dependencies by running 
```
yarn install
```


##### Usage

(Deploy the contract and update the contract address from contractAddresses.json)
Edit the constants/contractAddresses.json with your contract address you deloyed witht the corresponding chain ID
```
{
    "5": ["0xa330D54ceE2B3e3EEAf690465e96AeE828483f9a"],
    "1337": ["0x443fc5b750346e9055862B906b048ACcEf2A5965"]
}
```

1. Start a local development server
```
yarn dev
```

2. You can access the application on port 3000 of your localhost
`http://localhost:3000`


