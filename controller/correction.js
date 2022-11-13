import Correction from '../components/Class/Correction.js';
export default async (req, res) => {
    const {pseudo,epreuve, langage} = req.params;
    const autoCorrection = new Correction(pseudo, epreuve, langage);
    const results = await autoCorrection.correction();
    // const PORT = process.env.PORT || 9300
    // const URL = req.hostname+":"+PORT;
    const URL = req.hostname;
    if(!results.error){
        res.render('result.ejs',{results, langage, pseudo, epreuve, URL});
    } else {
        res.render('error.ejs');
    }
}
