"use strict";

//const mongoose = require("mongoose");
import mongoose from "mongoose";

//schema is the common representation of the data points to be sent to the database
const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    state: {
        type: Boolean,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
});

//Device is the file name, this is an entity handler which represents the collection of data respective to the schema
const Device = mongoose.model("Device", deviceSchema);

export default Device;