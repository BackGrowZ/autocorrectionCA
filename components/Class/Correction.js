import spawn from "await-spawn";
import fs from "fs";
import terre from "../../data/terre.js";

export default class Correction {
  constructor(pseudo, epreuve, langage) {
    this.pseudo = pseudo;
    this.epreuve = epreuve;
    this.langage = langage;
    this.files = this.getFilesList();
    this.data = this.generateDataTesting();
  }

  generateDataTesting() {
    if (this.epreuve === "terre") {
      const result = terre;
      result["Nom du programme"] = [{ args: [], result: `${this.pseudo}-${this.epreuve}01.${this.langage}` }];
      return result;
    } else {
      const result = {};
      return result;
    }
  }

  async getResultFile(file, arg) {
    let exec = "";
    if (this.langage === "js") exec = "node";
    else if (this.langage === "py") exec = "python";
    else if (this.langage === "rb") exec = "ruby";
    else if (this.langage === "php") exec = "php";

    try {
      const bl = await spawn(exec, [file, ...arg]);
      return bl.toString().replace(/\r?\n|\r/g, " ");
    } catch (e) {
      // console.log(e.stderr.toString())
    }
  }

  isMsgError(msg) {
    const regex = /\berror|\berreur/gm;
    const msgLower = msg.toLowerCase();
    return msgLower.match(regex) !== null;
  }

  getFilesList() {
    const result = [];
    const NB_FILES = 16;
    for (let i = 0; i <= NB_FILES; i++) {
      if (i === NB_FILES) return result;
      else {
        const nb = i < 10 ? `0${i}` : i;
        const name = `${this.pseudo}-${this.epreuve}${nb}.${this.langage}`;
        result.push(name);
      }
    }
  }

  deleteFile() {
    this.files.forEach((file) => {
      fs.unlink(`files/${file}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });
  }

  outputInit(exercices) {
    const result = {};
    exercices.forEach((exercice) => {
      result[exercice] = [];
    });
    return result;
  }

  // creer une classe qui recupere les sorties des fichiers qui se trouve dans this.files
  async getOutput() {
    const exercices = Object.keys(this.data);
    const results = this.outputInit(exercices);
    for (let nbExercice = 0; nbExercice < exercices.length; nbExercice++) {
      const exercice = exercices[nbExercice];
      const args = this.data[exercice];
      for (let nbArgs = 0; nbArgs < args.length; nbArgs++) {
        const arg = args[nbArgs].args;
        const result = await this.getResultFile(`files/${this.files[nbExercice]}`, arg);
        results[exercice].push(result);
      }
    }
    return results;
  }

  generateShellPrompts(id, args) {
    let shell = "";

    if (this.langage === "js") shell = "node";
    else if (this.langage === "py") shell = "python";
    else if (this.langage === "rb") shell = "ruby";
    else if (this.langage === "php") shell = "php";

    shell += ` ${this.files[id]}`;

    let shellArgs = "";
    const max = args.length;
    args.forEach((arg, i) => {
      if (typeof arg === "string") {
        if (i === max - 1) shellArgs += `"${arg}"`;
        else shellArgs += `"${arg}", `;
      } else {
        if (i === max - 1) shellArgs += arg;
        else shellArgs += `${arg}, `;
      }
    });
    shell += ` ${shellArgs}`;
    return shell;
  }

  async correction() {
    const output = await this.getOutput();
    const resultat = {};
    const test = Object.keys(this.data);
    for (const [key, value] of Object.entries(this.data)) {
      resultat[key] = [];
      for (let i = 0; i < value.length; i++) {
        const { args, result, msg } = value[i];
        const res = output[key][i];
        const resIsValide = res !== undefined && res !== false;
        const shell = this.generateShellPrompts(test.indexOf(key), args);
        if (resIsValide && res.trim().toLowerCase().includes(result)) {
          // Correct
          resultat[key].push({ args, result: true, output: res, shell });
        } else if (resIsValide && this.isMsgError(res)) {
          // Error args
          resultat[key].push({ args, result: true, output: res, msg, shell });
        } else {
          // Mauvaise réponse
          const message = msg ? msg : "Incorrect";
          console.log({ args, result: false, output: res, msg: message, expected: result, shell });
          resultat[key].push({ args, result: false, output: res, msg: message, expected: result, shell });
        }
      }
    }
    this.deleteFile();
    return resultat;
  }
}
