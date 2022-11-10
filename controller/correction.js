import Correction from '../components/Class/Correction.js';
export default async (req, res) => {
    const {pseudo,epreuve, langage} = req.params;
    /*
    const files = getFilesList(epreuve, pseudo, langage);
    const testingData = generateDataTesting(epreuve, pseudo, langage);
    const results = await testing(files, testingData);
    const result = compareResult(results, testingData);
    */
    const autoCorrection = new Correction(pseudo, epreuve, langage);
    const results = await autoCorrection.correction();

    res.render('result.ejs',{results, langage, pseudo, epreuve});
    // res.render('terminal.ejs');
    // res.json(results);
}
