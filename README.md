Introduction:
FIDUCIA is a voting decentralized application made using blockchain. This application is made so that there can be no tampering of votes. This is possible due to blockchain.
The application uses ethereum blockchain network. Solidity contracts is used for backend and React JS is used for frontend.

Steps to run the application:

Softwares to install:
1. Ganache: Ganache is a private ethereum network used for testing decentralized applications. it provides 10 accounts with 100 ETH. to download go to the link:https://trufflesuite.com/ganache/
2. Truffle: Truffle is an IDE to handle smart contracts. you can deploy your smart contract locally using truffle. To install truffle go to link:https://trufflesuite.com/docs/truffle/how-to/install/
3. Metamask: Metamask is a famous cryptocurrency wallet which is used to handle ethereum transactions in blockchain applications. It is available as web extensions download from here:https://metamask.io/download/

After installing the softwares its time to setup the application to run in your local system.


Step 1: Run ganache and click quickstart you will get a ethereum network with 10 accounts. There is a mnemonic there that is important which we will use afterwards.

Step 2: Now its time to configure metamask. After installing it will ask to create an account. create an account and go to settings. In settings go to Networks and click on add network. Click on add a network manually Give a network name of your choice enter rpc url from ganache, enter chain id as 1337 and currency as ETH save it. To use ganache in metamask lock metamask and click forgot password. It will ask for mnemonic put the mnemonic present on the ganache and enter a password of your choice. This is the easiest way to imoort all 10 accounts to metamask easily.

Step 3: Now clone the github repository in your PC. enter the command truffle migrate --reset in the directory where truffle-config.js is present the contract will be compiled and deployed. Some information will be available note the contract address this is important.

Step 4: go to fiducia/src/components there you will find a file named config.js open it you will see ABI and contract address change the contract address from given to the one noted when you have run truffle migrate --reset.

You have completed setting up the blockchain to run the app go to fiducia directory and run npm run start when loading metamask will pop up to connect to the accounts select all.
