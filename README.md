# Iron Doers

A set of smart contracts and a decentralised app that incentivise people who want to do stuff!

## Requirements

This guide require macOS v10.12, Xcode and Node v7 ()which is not possible to install with `brew` anymore). Get the Node
installation package from [previous releases on nodejs.org](https://nodejs.org/en/download/releases/). Node v8 have not
been successfully tested yet.

## Simple installation

This setup will use `testrpc` to run a local blockchain. This is good for quick and easy testing, but for advanced
testing and debugging it has some limitations.

Install global dependencies:

```bash
$ npm install -g truffle ethereumjs-testrpc
```

Install project dependencies and start the blockchain:

```bash
$ npm install
$ testrpc
```

## Advanced installation

This setup will use the official `geth` client to run a local blockchain. This is good for advanced testing and
debugging, but can be a little bit complicated to set up.

Install global dependencies:

```bash
$ npm install -g truffle
$ brew tap ethereum/ethereum
$ brew install ethereum
```

Install project dependencies:

```bash
$ npm install
```

Initiate the genesis block, start the blockchain and enter the geth console:

```bash
$ geth --datadir ./chain init ./genesis.json
$ geth --datadir ./chain --rpc --rpcapi="db,eth,net,web3,personal" console
```

Before we can migrate our contracts to the blockchain and start using it all, there's a few things we need to do:

1. Create the first user account
2. Unlock said account
3. Start mining Ether

While inside the geth console, create a new account and give it a password by running:

```js
> personal.newAccount()
```

To unlock the account, copy the address that was created in the previous step and run:

```js
> personal.unlockAccount("<address>")
```

In order to be able to do transactions you need to (a) have some Ether to pay the gas fees and (b) validate said
transactions. Both are achieved via mining, which you start in the console by running:

```js
> miner.start()
```

At any point you can stop mining by running the below function. But remember, no transactions will be processed while
mining is stopped! Mining is what keeps the system running.

```js
> miner.stop()
```

### Start fresh

If you want to start over with the blockchain you need to remove and re-initialize the blockchain by doing the
following:

```bash
$ rm -rf ./chain/*
```

## Testing

Compile and migrate all contracts to the blockchain you started during the installation:

```bash
$ truffle compile --all
$ truffle migrate --reset
```

Run automated tests:

```bash
$ truffle test
```

Test manually by starting a web server:

```bash
$ npm run dev
```

Use Mist as your browser and point it to the local blockchain:

```bash
$ /Applications/Mist.app/Contents/MacOS/Mist --rpc http://127.0.0.1:8545
```

## Troubleshooting

### Error during `npm install`

If you had to re-install Node you likely have version mis-match on previously installed packages. Take a backup and then
delete all previously installed packages by doing `rm -rf /usr/local/lib/node_modules ~/node_modules` and start from
scratch again.

### Error during `npm install` related to `bcrypt` or `node-gyp`

You need to install Xcode.

### Error during `truffle migrate`: authentication needed: password or unlock

You are trying make a transaction with a locked account. To unlock your account, enter the geth console then:

```js
> personal.listAccounts
> personal.unlockAccount("<address>")
```
