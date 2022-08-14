const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request } = require("express");
const stripe=require("stripe")(
      "sk_test_51LVAd3SAnn4zk80rYlysRDuS6adt9BTwJymeTKL2Yr1BzSbU44IxXQsIhTLTcbeKA3JIF2QrTyF6Kq0Wji5j9DK700ImmCZcTA"
);

//API

//App config
const app = express();

//Middle ware
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
      const total = request.query.total;
      console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
 
      const paymentIntent = await stripe.paymentIntents.create({
            amount: total, // subunits of the currency
            currency: "inr",
          });
      //Ok - Created
      response.status(201).send({
            clientSecret: paymentIntent.client_secret,
          });
})

//Listen command
exports.api = functions.https.onRequest(app);

//Example end point

//http://localhost:5001/clone-7b5ec/us-central1/api

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
