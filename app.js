

// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const flash = require('connect-flash');
const dotenv = require('dotenv');
const axios = require('axios');
const nodemailer = require('nodemailer');
// Configuring environment variables
dotenv.config();
const strapi_base = process.env.STRAPI_URL_BASE;
const base_url = process.env.BASE_URL;

// Creating Express app
const app = express();

// Nodemailer function to send mail
async function sendMail(data, type) {
  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Set secure to false if using port 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // Define the email options
  const mailOptions = {
    from: 'website@britinfotech.com',
    to: 'admin@britinfotech.com',
    replyTo: data.email,
    subject: `Email ${type}`,
    text: JSON.stringify(data)
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.log('Error sending email:', error);
  }
}


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
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if your site is served over HTTPS
      sameSite: 'strict', // or 'lax'
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000), // Prevents client-side JavaScript from accessing the cookie
    }
  })
);
app.use(flash());
// Only enable livereload during development
if (process.env.NODE_ENV === 'development') {

  // Importing required modules
  const livereload = require("livereload");
  const connectLiveReload = require("connect-livereload");
  const morgan = require('morgan');
  const axios = require('axios');
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
    let dataLegal = await getApiData('legal?populate=*');
    console.log(req.session.contactModalShown)
    if (!req.session.contactModalShown) {
      // If not, set it to true for this session
      req.session.contactModalShown = false;
    }
    res.render('home', { showContactModal: !req.session.contactMalShown, dataSEO, dataSEOKeywords , dataContact, dataChooseUs, data1, dataBlog, dataCompanies, dataSocial, dataLegal, strapi_base, base_url: base_url+req.path, flash: req.flash() });
  } catch (error) {od
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
    let dataLegal = await getApiData('legal?populate=*');
    //console log all the data in the console in a structured way
    if (!req.session.contactModalShown) {
      // If not, set it to true for this session
      req.session.contactModalShown = false;
    }
    res.render('about', { showContactModal: !req.session.contactModalShown,dataSEO, dataSEOKeywords , dataContact, dataChooseUs, data1, dataCompanies, dataSocial, dataEmployees, dataExpectation, dataLegal, strapi_base, base_url: base_url+req.path, flash: req.flash() });
  
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
    let dataLegal = await getApiData('legal?populate=*');
    if (!req.session.contactModalShown) {
      // If not, set it to true for this session
      req.session.contactModalShown = false;
    }
    //console log all the data in the console in a structured way
    res.render('services', { showContactModal: !req.session.contactModalShown,dataSEO, dataSEOKeywords , dataContact, data1, dataServices, dataSocial, dataEmployees, dataLegal, strapi_base, base_url: base_url+req.path, flash: req.flash() });
    
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
    let dataSocial = await getApiData('social?populate=*');
    let formData = await getApiData(`contact-form-all`);
    dataBlog.data = dataBlog.data[0]
    dataSEO.data = dataSEO.data[0]
    dataSEOKeywords.data = dataSEOKeywords.data[0]
    data1.data = data1.data[0]
    let dataLegal = await getApiData('legal?populate=*');
    if (!req.session.contactModalShown) {
      // If not, set it to true for this session
      req.session.contactModalShown = false;
    }
    res.render('service-single', { showContactModal: !req.session.contactModalShown,dataSEO, dataSEOKeywords, dataContact, data1, dataExpectation, dataBlog,dataCompanies, dataLegal, strapi_base,dataSocial, base_url: base_url + req.path , formData, flash: req.flash()});

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/contact', async (req, res) => {
  try {
    let dataSEO = await getApiData(`contact?populate[SEO][populate][0]=SEO_image`);
    let dataSEOKeywords = await getApiData(`contact?populate[SEO][populate][0]=Keywords`);
    let data1 = await getApiData(`contact?populate=*`);
    let dataLegal = await getApiData('legal?populate=*');
    let dataSocial = await getApiData('social?populate=*');
    res.render('contact', { dataSEO, dataSEOKeywords, data1, dataSocial,dataLegal, strapi_base, base_url: base_url + req.path, flash: req.flash()});
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/insights', async (req, res) => {
  try {
    let dataSEO = await getApiData(`contact?populate[SEO][populate][0]=SEO_image`);
    let dataSEOKeywords = await getApiData(`contact?populate[SEO][populate][0]=Keywords`);
    let dataContact = await getApiData(`contact?populate=*`);
    let data1 = await getApiData(`blogs-page?populate=*`);
    let dataFeatured = await getApiData(`blogs-page?populate[Featured_Article][populate][]=Full_Image`);
    let dataBlog = await getApiData('blog-component?populate[blogs][populate][0]=Card_Image');
    let formData = await getApiData(`contact-form-all`);
    let dataLegal = await getApiData('legal?populate=*');
    let dataSocial = await getApiData('social?populate=*');
    if (!req.session.contactModalShown) {
      // If not, set it to true for this session
      req.session.contactModalShown = false;
    }
    res.render('insights', { showContactModal: !req.session.contactModalShown,dataSEO, dataBlog, dataSEOKeywords, dataContact, data1, dataFeatured, dataLegal, strapi_base,dataSocial, formData, base_url: base_url + req.path, flash: req.flash()});
    
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/insights/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let dataSEO = await getApiData(`blogs?filters[slug]=${id}&populate[SEO][populate][0]=SEO_image`);
    let dataSEOKeywords = await getApiData(`blogs?filters[slug]=${id}&populate[SEO][populate][0]=Keywords`);
    let dataContact = await getApiData('contact?populate=*');
    let data1 = await getApiData(`blogs?filters[slug]=${id}&populate=*`);
    let dataContent = await getApiData(`blogs?filters[slug]=${id}&populate[Content][populate][0]=Image`);
    let dataBlog = await getApiData(`blogs?populate[blogs][populate][0]=Card_Image&filters[slug]=${id}`);
    let formData = await getApiData(`contact-form-all`);
    let dataSocial = await getApiData('social?populate=*');
    let dataLegal = await getApiData('legal?populate=*');
    dataBlog.data = dataBlog.data[0]
    dataSEO.data = dataSEO.data[0]
    dataContent.data = dataContent.data[0]
    dataSEOKeywords.data = dataSEOKeywords.data[0]
    data1.data = data1.data[0]
    if (!req.session.contactModalShown) {
      // If not, set it to true for this session
      req.session.contactModalShown = false;
    }
    res.render('blog', { showContactModal: !req.session.contactModalShown,dataSEO, dataSEOKeywords, dataContact, data1, dataBlog, dataLegal,dataSocial, strapi_base, base_url: base_url + req.path , formData, dataContent,flash: req.flash()});
    
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/submit', async (req, res) => {
  try {
    const data1 = req.body;
    const email = data1.contact.email;
    const recaptchaToken = req.body['g-recaptcha-response'];
    console.log(recaptchaToken);
    const recaptchaApiUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const recaptchaResponse = await axios.post(recaptchaApiUrl, null, {
      params: {
          secret: process.env.G_RECAPTCHA_SECRET,
          response: recaptchaToken
      }
    });
    if (recaptchaResponse.data.success) {
      const response = await axios.post(process.env.STRAPI_URL+'contact-smalls', {
        "data": {
          "email": email
        }
      }, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`
        }
      });
      data = {email: email}
      await sendMail(data, 'Contact Small Form');
      req.flash('success', 'Thanks for submitting! We will reach you soon.'); // Set flash message
      res.redirect('back');
    } else {
      req.flash('error', 'Failed to verify reCAPTCHA'); // Set flash message
      res.redirect('back');
    }
  } catch (error) {
    console.log(error.response);
    req.flash('error', 'Internal Server Error'); // Set flash message
    res.redirect('back');
  }
});
app.post('/contact/submit', async (req, res) => {
  try {
    const data1 = req.body;
    const name = data1.contact.name;
    const company = data1.contact.company ? data1.contact.company : "none";
    const email = data1.contact.email;
    const phone = data1.contact.mobile;
    const message = data1.contact.message;
    const newsletter = data1.contact.subscribe;
    const recaptchaToken = req.body['g-recaptcha-response'];
    console.log(data1);
    const recaptchaApiUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const recaptchaResponse = await axios.post(recaptchaApiUrl, null, {
      params: {
          secret: process.env.G_RECAPTCHA_SECRET,
          response: recaptchaToken
      }
    });
    if (recaptchaResponse.data.success) {
      const response = await axios.post(process.env.STRAPI_URL+'contact-mains', {
        "data": {
          "name": name,
          "company": company,
          "email": email,
          "phone": phone,
          "message": message,
          "newsletter": newsletter === 'on' ? true : false
        }
      }, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`
        }
      });
      data = {
        "name": name,
        "company": company,
        "email": email,
        "phone": phone,
        "message": message,
        "newsletter": newsletter === 'on' ? true : false
      }
      await sendMail(data, 'Main Contact Form');
      req.flash('success', 'Thanks for submitting! We will reach you soon.'); // Set flash message
      res.redirect('back');
    } else {
      req.flash('error', 'Failed to verify reCAPTCHA'); // Set flash message
      res.redirect('back');
    }
  } catch (error) {
    console.log(error.response);
    req.flash('error', 'Internal Server Error'); // Set flash message
    res.redirect('back');
  }
});
app.post('/set-contact-modal-shown', (req, res) => {
  req.session.contactModalShown = true;
  res.sendStatus(200);
 });
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /`);
});

// Route for sitemap
app.get('/sitemap.xml', async (req, res) => {
  // Generate sitemap XML here
   // Replace with your sitemap generation logic
   try {
    let dataBlog = await getApiData(`blogs?populate=*`);
    let dataServices = await getApiData(`services?populate=*`);
    let sitemapXml = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
       <loc>http://www.britinfotech.com/</loc>
       <lastmod>2024-03-11</lastmod>
       <changefreq>monthly</changefreq>
       <priority>1.0</priority>
    </url>
    <url>
       <loc>http://www.britinfotech.com/contact</loc>
       <lastmod>2024-03-11</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
    </url>
    <url>
       <loc>http://www.britinfotech.com/about</loc>
       <lastmod>2024-03-11</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
    </url>
    <url>
       <loc>http://www.britinfotech.com/services</loc>
       <lastmod>2024-03-11</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
    </url>
    
 `;
 console.log(dataBlog)
    let xmlDynamic = () => {
      dataBlog.data.forEach(element => {
        sitemapXml += `<url>
        <loc>${base_url}/insights/${element.attributes.slug}</loc>
        <lastmod>${element.attributes.updatedAt}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority></url>`
      });
      dataServices.data.forEach(element => {
        sitemapXml += `<url>
        <loc>${base_url}/services/${element.attributes.slug}</loc>
        <lastmod>${element.attributes.updatedAt}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority></url>`
      });
    }
    xmlDynamic();
    sitemapXml += `</urlset>`
    console.log(sitemapXml)
    res.type('application/xml');
    res.send(sitemapXml);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }

});


// handle wildcard
app.get('/*', async (req, res) => {
  try {
    let dataSEO = null;
    let dataSEOKeywords = [];
    let dataContact = await getApiData('contact?populate=*');
    let dataLegal = await getApiData('legal?populate=*');
    let dataSocial = await getApiData('social?populate=*');
    console.log('dataLegal:', dataLegal);
    res.render('none', { dataSEO, dataSEOKeywords, dataContact, dataLegal,dataSocial, base_url: base_url + req.path, strapi_base, flash: req.flash()});
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});
// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
