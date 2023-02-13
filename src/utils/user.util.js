const nodemailer = require ('nodemailer')
const {google} = require('googleapis')

const CLIENT_ID = '';
const CLEINT_SECRET = '';
const REDIRECT_URI = '';
const REFRESH_TOKEN = '';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  export const sendMail = async(toEmail)=>{
    try {
      const accessToken = await oAuth2Client.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'srikanthnaidu019@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: 'SRIKANTH <srikanthnaidu019@gmail.com>',
        to: 'ksru044@gmail.com',
        subject: 'link to reset password',
        body: 'Hi from gmail using API',
        html: `<h1>To reset your password <a href="http://localhost:3000/api/v1/users/resetpwd">click here </a></h1>`
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }