
import Device from "../models/Device.js";


//await lets us device.find() parallely
// GET/devices
export const getAllDevices = async (req,res)=>{
    try{
        const devices= await Device.find();
        return res.status(200).json(devices); //WE PUT RETURN FOR THE SERVER TO KNOW AFTER THE HTTP RESPONSE, THE FUNCTION TERMINATES
    }
    catch(error){
        console.log(error);
        return res.status(500).send();
    }
   
    
}

// GET/devices/:id
export const getDevice = async (req,res)=>{
    try{
        //const id = req.params.id; //alternative way
        const {id}=req.params; //req.params is an object that contains all the variables. From the object, we take the id
        //const device= await Device.findOne({ _id: id});  //an alternative way to find the id
        const device= await Device.findById(id); //to find the device by providing the id
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
}

// POST /devices
export const createDevice = async (req,res)=>{
    try{
        const device= req.body;  //assigning the request body to the particular object called device
        await Device.create(device);
        return res.status(201).json(device);
    }
    catch(error){
        console.log(error);
        return res.status(500).send();
    }
}

// DELETE /devices/:id
export const deleteDevice = async (req,res) =>{
    try{
        const {id}=req.params; //req.params is an object that contains all the variables. From the object, we take the id
        await Device.findByIdAndDelete(id);
        res.status(204).send(); // 204 is the status code for request was successful but NO CONTENT is to be shown
        
    }
    
    catch(error){
        console.log(error);
        return res.status(500).send();
    }
}

//PUT/devices/:id

export const fullyUpdateDevice = async (req,res)=>{
    try{
        const {id}=req.params;
        const data= req.body;  //assigning the request body to the particular object called device
        const found=Device.findById(id);
        if (!found){
            return res.status(404).send();
        }
        await Device.findByIdAndUpdate(id,
        {
            name:data.name, 
            state:data.state,
            image:data.image,
            location:data.location
        });
        return res.status(204).send();
    }
   catch(error){
       console.log(error);
       return res.status(500).send();
   }

}

// PATCH /devices/:id
export const partiallyUpdateDevice = async (req,res)=>{
    try{
        const {id}=req.params;
     const data= req.body;  //assigning the request body to the particular object called device
     const found = Device.find(id);
    if (!found){
        return res.status(404).send();
    }
    await Device.findByIdAndUpdate(id,{state:data.state});
    return res.status(204).send();
   }
   catch(error){
       console.log(error);
       return res.status(500).send();
   }

}