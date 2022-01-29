import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv";
import Cards from "./dbCards.js";
import Cors from "cors";

dotenv.config();

const app=express();
const port=process.env.PORT || 8001;
const url=process.env.db_url;

app.use(express.json());
app.use(Cors());

mongoose.connect(url)
    .then(() => {
        console.log('DB Connected');
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/',(req,res)=>{
	res.status(200).send("Hello");
})

app.post('/tinder/cards',(req,res)=>{
	const dbCard=req.body;

	Cards.create(dbCard,(err,data)=>{
		if(err){
			res.status(500).send(err);
		}else{
			res.status(201).send(data);
		}
	})
})

app.get('/tinder/cards',(req,res)=>{
	Cards.find((err,data)=>{
		if(err){
			res.status(500).send(err);
		}else{
			res.status(200).send(data);
		}
	})
})

app.listen(port,()=>{
	console.log(`Server is up on ${port}`)
})