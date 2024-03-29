require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const key = fs.readFileSync(path.join(__dirname, '/certs/selfsigned.key'));
// const cert = fs.readFileSync(path.join(__dirname, '/certs/selfsigned.crt'));
// const options = {
//     key: key,
//     cert: cert
// };

app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const server = http.createServer(app);

app.post('/api/user/update', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/register.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/home.html'));
});

app.get('/shareportal', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/shareportal.html'));
});

app.get('/foodforall', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/food.html'));
});

app.get('/market', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/market.html'));
});

app.get('/infoportal', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/infoportal.html'));
});

app.get('/marketportal', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/market.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/login.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

// app.get('/portalone', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/views/modalform.html'));
// });

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});