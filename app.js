// // import { Fetch } from "@octokit/types";
// // import { Octokit } from "@octokit/core"
// import axios from "axios";
// import { createServer } from "http"

// const generateURLFile = (repos,ext,epreuve) => {
//     const urlList = [];
//     const pseudoAndRepos = repos.split("https://github.com/")[1];
//     let i = 0
//     while (i<=15) {
//         const nb = i<10 ? `0${i}` : i;
//         let result = `https://raw.githubusercontent.com/${pseudoAndRepos}/main/${epreuve}${nb}.${ext}`;
//         urlList.push(result);
//         i++;
//     }
//     return urlList;
// }

// const test = async (req, res) => {   

    
//     axios.get('https://raw.githubusercontent.com/BackGrowZ/Pellencin/main/index.html', {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then((response) => {
//         console.log(response.data);
//         res.end(response.data);
//     }).catch((err) => {
//         console.log(err);
//         res.end(err);
//     });

//     // const data = await response.json();
//     // res.end(content);
// }

// createServer(test).listen(3000);

import express from "express"
import bodyParser from 'body-parser'
import router from './router/router.js';

const app = express();

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


app.use('/', router)

const PORT = 9300;

app.listen(PORT, console.log(`Server started on port ${PORT}`));