# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


Instructions:

You will need a meta mask wallet set up in the browser extension because this relies heavily on the metamask wallet extension

After running npm start you should have a button that says click to connect to wallet.  Click the button and a window should pop up prompting you to give permission to connect.  Give permission.

The connecting loading ui should clear and a new ui should show you that you're now connected to the wallet and offer to send money to a different wallet.
Pick a wallet to transfer to and an amount and press send transaction
I found the transactions took forever so I mocked out the success case.  Error cases are handled and reported to the user.
Transactions should print to the transactions window.  It'll do so whether it fails or succeeds though

I ran out of time, but if I didn't, here's what I would do:
Add a success/failed transaction tag so it was clear which transactions failed.
Write unit tests for the custom hook I made
Support Solana.

Thanks for taking the time to review my work!