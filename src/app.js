const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");


const app = express();
const pathDirectory = path.join(__dirname, '../public')
const viewsdirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');



app.set('view engine', 'hbs')
app.set('views', viewsdirectory);
app.use(express.static(pathDirectory));
hbs.registerPartials(partialsDirectory);

// app.get("", (req,res)=>{
//     res.send("<h1>helloo everyone!</h1>");

// });

// app.get("/about", (req,res)=>{
//     res.send("<h2>About page</h2>");

// });

app.get("" ,(req, res)=>{
    res.render('index',{
        name: "Jeevan",
        page: "weather"
    });
});

app.get("/about", (req,res)=>{
    res.render('about')
});

app.get("/help", (req,res)=>{
    res.render('help')
});

app.get("/weather", (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide the address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude,place}={})=>{
    
        if(error){
           return  res.send({error});
        }
    
        forecast(latitude, longitude, (error, forecastdata)=>{
            
            if(error){
                return res.send({error});
            }
            res.send({
                "place" : req.query.address,
                "temperature": forecastdata.minTemp
            })
            // console.log(place);
            // console.log("minimum temperature: " + forecastdata.minTemp);
        
        })
    })


    // res.send({
    //     "address":req.query.address,
    //     "temp":"26.5",
    //     "lattitude":"171.7",
    //     "longitude":"54.89"
    // });

});

app.get("*" , (req,res)=>{
    res.send("page not found. 404 error");
})

app.listen(3000, ()=>{
    console.log("server started at port 3000")
});

