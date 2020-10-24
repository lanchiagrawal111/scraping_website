const cheerio = require("cheerio");
const { fetch } = require("./scrapers/index.js");
const express=require('express');
const app=express();
const port=8000;
//require mongoose
const db=require('./config/mongoose');
//require collection
const Detail=require('./models/detail');


const URL = "https://doaj.org/search?ref=homepage-box&source=%7B%22query%22%3A%7B%22query_string%22%3A%7B%22query%22%3A%22data%20mining%22%2C%22default_operator%22%3A%22AND%22%7D%7D%7D";

// to fetch data from a url
fetch(
  URL,
  error => {
    console.log(error);
  },
  html => {
    const $ = cheerio.load(html);
    $('.col-md-10').each((i,el)=>{
      let titleHeading=$(el).find('.title').find('a').text();
      let titleUrl=$(el).find('.title').find('a').attr('href');
      let author=$(el).find('em').text();
      // insert into database
       Detail.insertMany({
          titleHeading:titleHeading,
          titleUrl:titleUrl,
          author:author
       },function (err,data) {
           if(err){
               console.log("Error in inserting into the database");
               return;
           }
           return;
       })
    })
  }
);

//Fetch 10 record from the database
Detail.find({},function (err,data) {
    if(err){
        console("error in finding");
        return;
    }
   console.log("10 results are",data);
}).limit(10);
   
//listen on port no 8000
app.listen(port,(err)=> {   
    if(err){
      return console.log('Error in running the server',err);
    }
     console.log('Yup ,My Express Server is running on port:',port);
});