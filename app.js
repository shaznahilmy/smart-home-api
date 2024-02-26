//old way of doing it
//const express = require("express");//its taking all the objects and bindings on a express pkg into a js object called express

//new way of doing it
//"type": "module", include this is pkg.json and the below line
import express from "express";

//THIS IS THE CODE TO RUN AN APPLICATION THAT IS EXPOSED TO THE INTERNET
const app=express(); //our main web service is called app and we get it when we call the express as a function

//if a client makes a request, this must be the response
app.get("/", (req, res) => {
    res.send("Hello");
});

const port=8000; //defining a port

//listen to the request coming from this port
app.listen(port, () => { //call back arrow function
    console.log("Server listening on port ${port}");
});