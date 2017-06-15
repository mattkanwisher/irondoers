# Iron Doers

A set of smart contracts and a decentralised app that incentivise people who want to do stuff!

## Installation

Install global dependencies:

```bash
$ npm install -g truffle
$ npm install -g ethereumjs-testrpc
```

Install project dependencies:

```bash
$ npm install
```

## How to test

Start a local blockchain:

```bash
$ testrpc
```

In a new tab, compile and migrate contracts to said blockchain:

```bash
$ truffle compile --all
$ truffle migrate --reset
```

Run automated tests:

```bash
$ truffle test
```

Test manually by starting Mist, pointing to the local blockchain:

```bash
$ /Applications/Mist.app/Contents/MacOS/Mist --rpc http://127.0.0.1:8545
```
