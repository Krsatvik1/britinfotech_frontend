

// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const axios = require('axios');
// Configuring environment variables
dotenv.config();
const strapi_base = process.env.STRAPI_URL_BASE;
const base_url = process.env.BASE_URL;
// Creating Express app
const app = express();

//create function to get api call path as a parameter and call a strapi api using axios. Also use auth token in header

async function getApiData(path) {

  const url = process.env.STRAPI_URL + path;
  const token = process.env.STRAPI_TOKEN;
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  try {
    const response = await axios.get(url, config);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/gsap', express.static(__dirname + '/node_modules/gsap/dist'));
app.set('view engine', 'ejs');
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
// Only enable livereload during development
if (process.env.NODE_ENV === 'development') {

  // Importing required modules
  const livereload = require("livereload");
  const connectLiveReload = require("connect-livereload");
  const morgan = require('morgan');
  //Morgan code
  app.use(morgan('dev'));

  // Livereload code
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(["public", "views"]);
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
  app.use(connectLiveReload());
}

// Routes
app.get('/', async (req, res) => {
  try {
    let dataSEO = await getApiData('home?populate[SEO][populate][0]=SEO_image');
    let dataSEOKeywords = await getApiData('home?populate[SEO][populate][0]=Keywords');
    let dataContact = await getApiData('contact?populate=*');
    let dataChooseUs = await getApiData('choose-us?populate=*');
    let data1 = await getApiData('home?populate=*');
    let dataBlog = await getApiData('blog-component?populate[blogs][populate][0]=Card_Image');
    let dataCompanies = await getApiData('company-heading?populate[companies][populate][0]=Company_Logo');
    let dataSocial = await getApiData('social?populate=*');

    res.render('home', { dataSEO, dataSEOKeywords , dataContact, dataChooseUs, data1, dataBlog, dataCompanies, dataSocial, strapi_base, base_url: base_url+req.path });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }

});
app.get('/about', async (req, res) => {
  try {
    let dataSEO = await getApiData('about-us?populate[SEO][populate][0]=SEO_image');
    let dataSEOKeywords = await getApiData('about-us?populate[SEO][populate][0]=Keywords');
    let dataContact = await getApiData('contact?populate=*');
    let dataChooseUs = await getApiData('choose-us?populate=*');
    let data1 = await getApiData('about-us?populate=*');
    let dataCompanies = await getApiData('company-heading?populate[companies][populate][0]=Company_Logo');
    let dataSocial = await getApiData('social?populate=*');
    let dataEmployees = await getApiData('employees-component?populate[employees][populate][0]=Profile_Pic');
    let dataExpectation = await getApiData('expection?populate=*');
    //console log all the data in the console in a structured way

    res.render('about', { dataSEO, dataSEOKeywords , dataContact, dataChooseUs, data1, dataCompanies, dataSocial, dataEmployees, dataExpectation, strapi_base, base_url: base_url+req.path });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/services', async (req, res) => {
  try {
    let dataSEO = await getApiData('services-page?populate[SEO][populate][0]=SEO_image');
    let dataSEOKeywords = await getApiData('services-page?populate[SEO][populate][0]=Keywords');
    let dataContact = await getApiData('contact?populate=*');
    let data1 = await getApiData('services-page?populate=*');
    let dataServices = await getApiData('services-page?populate[services][populate][0]=Service_Brief_Image');
    let dataSocial = await getApiData('social?populate=*');
    let dataEmployees = await getApiData('employees-component?populate[employees][populate][0]=Profile_Pic');
    //console log all the data in the console in a structured way
    res.render('services', { dataSEO, dataSEOKeywords , dataContact, data1, dataServices, dataSocial, dataEmployees, strapi_base, base_url: base_url+req.path });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


// Route for service single page
app.get('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let dataSEO = await getApiData(`services?filters[slug]=${id}&populate[SEO][populate][0]=SEO_image`);
    let dataSEOKeywords = await getApiData(`services?filters[slug]=${id}&populate[SEO][populate][0]=Keywords`);
    let dataContact = await getApiData('contact?populate=*');
    let data1 = await getApiData(`services?filters[slug]=${id}&populate=*`);
    let dataExpectation = await getApiData(`expection?populate=*`);
    let dataCompanies = await getApiData(`company-heading?populate[companies][populate][0]=Company_Logo`);
    let dataBlog = await getApiData(`services?populate[blogs][populate][0]=Card_Image&filters[slug]=${id}`);
    let formData = await getApiData(`contact-form-all`);
    dataBlog.data = dataBlog.data[0]
    dataSEO.data = dataSEO.data[0]
    dataSEOKeywords.data = dataSEOKeywords.data[0]
    data1.data = data1.data[0]
    console.log(formData);
    res.render('service-single', { dataSEO, dataSEOKeywords, dataContact, data1, dataExpectation, dataBlog,dataCompanies, strapi_base, base_url: base_url + req.path , formData});
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// handle wildcard
app.get('/*', (req, res) => {
  res.send('404 Page Not Found');
});

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
