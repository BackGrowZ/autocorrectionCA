import axios from "axios";
import fs from "fs";

const NB_FILES = 16;

// GOOD
const generateURLFile = (repos, ext, epreuve) => {
  const urlList = [];
  const pseudoAndRepos = repos.split("github.com/")[1];
  const pseudo = pseudoAndRepos.split("/")[0];
  let i = 0;
  while (i <= NB_FILES) {
    const nb = i < 10 ? `0${i}` : i;
    const name = `${pseudo}-${epreuve}${nb}.${ext}`;
    let url = `https://raw.githubusercontent.com/${pseudoAndRepos}/main/${epreuve}${nb}.${ext}`;
    const result = {
      name: `${name}`,
      url,
    };
    urlList.push(result);
    i++;
  }
  return urlList;
};

const generateFile = (name, data) => {
  fs.appendFile(`files/${name}`, data, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

const homePostController = async (req, res) => {
  const { repos, epreuve, langage } = req.body;
  // const repos = "https://github.com/BackGrowZ/Epreuve-Terre"
  // const ext = "js"
  // const epreuve = "terre"
  const pseudoAndRepos = repos.split("github.com/")[1];
  const pseudo = pseudoAndRepos.split("/")[0];
  const urlList = generateURLFile(repos, langage, epreuve);
  const files = [];
  urlList.forEach((item) => {
    files.push({ name: item.name });
  });

  while (urlList.length > 0) {
    const { name, url } = urlList.pop();
    axios
      .get(url)
      .then((response) => {
        generateFile(name, response.data);
      })
      .catch((err) => console.log(err));
  }
  res.json({url: `https://${req.hostname}/correction/${epreuve}/${pseudo}/${langage}`});
  // res.json({url: `http://${req.hostname}:9300/correction/${epreuve}/${pseudo}/${langage}`});
};

const homeGetController = async (req, res) => {
  const URL = req.hostname;
  // const URL = req.hostname+":9300";
  res.render("index.ejs",{URL});
};

export { homeGetController, homePostController };
