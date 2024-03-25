"use strict";


//old way of doing it
//const express = require("express");//its taking all the objects and bindings on a express pkg into a js object called express

//new way of doing it
//"type": "module", include this is pkg.json and the below line
import express from "express";

//week3 stuff
import deviceRouter from "./routes/deviceRouter.js";

//week 4 stuff for mongoose
import mongoose from "mongoose";

//THIS IS THE CODE TO CREATE A WEB SERVICE THAT IS EXPOSED TO THE INTERNET
const app=express(); //our main web service is called app and we get it when we call the express as a function
app.use(express.json()); //enable the Express middleware to parse incoming JSON requests, and req.body will be populated with the JSON data sent in the request body.

/* WE'RE MOVING EVERYTHING TO ROUTES AND CONTROLLER TO HAVE THE APP.JS AS A SIMPLE FILE
//if a client makes a request, this must be the response
//"/" is the path defined and the req is the request object and res is the response object
app.get("/", (req, res) => {
    return res.send("Hello"); //res.sed triggers the server to send this
});



const devices=[];
//THIS IS TO GET THE DEVICE ARRAY
app.get("/devices",(req,res)=>{
    try{
        return res.status(200).json(devices); //WE PUT RETURN FOR THE SERVER TO KNOW AFTER THE HTTP RESPONSE, THE FUNCTION TERMINATES
    }
    catch(error){
        console.log(error);
        return res.status(500).send();
    }
   
    
});

//THIS IS TO GET A SINGLE DEVICE 
                //this id is a placeholder for whatever id we want eg:/devices/1
                // this id is now a variable
app.get("/devices/:id",(req,res)=>{
    try{
        const {id}=req.params; //req.params is an object that contains all the variables. From the object, we take the id
    
        //el means element In the devices array, we're going to find the el that has the same id as passed in the url
                              //  el.id is of type int and id is of type string i.e we do parseint
        const device=devices.find((el)=> el.id === parseInt(id));  //js function
        //if device not found
        if(!device){
            return res.status(404).send();
        }
        return res.status(200).send(device); //WE PUT RETURN FOR THE SERVER TO KNOW AFTER THE HTTP RESPONSE, THE FUNCTION TERMINATES
        }
    catch(error){
        console.log(error);
        return res.status(500).send();
    }
})

//THIS IS TO CREATE THE DEVICE 
// we send the resources in the body
app.post("/devices", (req,res)=>{
    const device_element= req.body;  //assigning the request body to the particular object called device
    
    devices.push(device_element);

    return res.status(201).json(devices);
});

//THIS IS TO DELETE A DEVICE 
// we send the resources in the url and no body
app.delete("/devices/:id", (req,res) =>{
    try{
        const {id}=req.params; //req.params is an object that contains all the variables. From the object, we take the id
        const deviceIndex = devices.findIndex((el) => el.id === parseInt(id));
        if(deviceIndex == -1){
            return res.status(404).send();
        }
        res.status(204).send(); // 204 is the status code for request was successful but NO CONTENT is to be shown
        // splice will take a certain element, delete it and reset the array
        devices.splice(deviceIndex, 1);
    }
    
    catch(error){
        console.log(error);
        return res.status(500).send();
    }
})

//THIS TO UPDATE A DEVICE COMPLETELY
app.put("/devices/:id", (req,res)=>{
    try{
        const {id}=req.params;
     const data= req.body;  //assigning the request body to the particular object called device
    const found = devices.find((el) => el.id === parseInt(id));
    if (!found){
        return res.status(404).send();
    }
    found.name=device.name;
    found.state=device.state;
    found.location=device.location;
    return res.status(204).send();
   }
   catch(error){
       console.log(error);
       return res.status(500).send();
   }

});

//THIS IS TO UPDATE A DEVICE PARTIALLY
//we send the resource in the body
app.patch("/devices/:id", (req,res)=>{
    try{
        const {id}=req.params;
        const data= req.body;  //assigning the request body to the particular object called device
        const found = devices.find((el) => el.id === parseInt(id));
        if (!found){
            return res.status(404).send();
        }
        found.name=data.name;
        return res.status(204).send();
   }
   catch(error){
       console.log(error);
       return res.status(500).send();
   }

});
*/
//if a request comes with the path /api/devices, we're sending it to the deviceRouter
//this is called the middleware cause there in the middle of the request and rsponse
app.use("/api/devices",deviceRouter) //when this url is entered, it would be redirected to deviceRouter.js 

const PORT=8000; //defining a port

//mongoose helps to make a connection to the database

//need a pck to do this in this format
//const DB =process.env.DATABASE_URL; // we're getting the connection string from the .env file
const DB ="mongodb+srv://shazhilmy:u4OubArxbAjGSqpK@cluster0.tjhu9xk.mongodb.net/smart-home-ui-db?retryWrites=true&w=majority&appName=Cluster0";
mongoose
.connect(DB) // providing the link here to connect
.then( ()=>{
    console.log("DB connection successful");
})
.catch((error)=>{
    console.log(error);
});

//the function that allows web service app to listen to the request coming from this port
app.listen(PORT, () => { //call back arrow function
    console.log(`Server listening on port ${PORT}`);
});