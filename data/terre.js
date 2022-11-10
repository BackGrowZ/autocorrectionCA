const terre = {
    "L'alphabet" : [
        { args : [], result:"abcdefghijklmnopqrstuvwxyz" },
    ],
    "Nom du programme" : [],
    "Afficheur d'arguments" : [
        { args: ["salut","les","gens"], result:"salut les gens" },
        { args: ["bonsoir","les","gens"], result:"bonsoir les gens" },
        { args: [], result:false, msg:"Aucun argument" },
        { args: ["salut"], result:false, msg:"Un seul argument" },
    ],
    "L’alphabet à partir de" : [
        { args: ["p"], result:"pqrstuvwxyz" },
        { args: ["a"], result:"abcdefghijklmnopqrstuvwxyz" },
        { args: ["z"], result:"z" },
        { args: [], result:false, msg:"Aucun argument" },
        { args: ["a", "z"], result:false, msg:"Deux arguments" },
        { args: [1], result:false, msg:"Nombre" },
    ],
    "Pair ou impair" : [
        { args: [1], result:"Impair" },
        { args: [2], result:"Pair" },
        { args: [1,2], result:false, msg:"Deux arguments" },
        { args: ["a"], result:false, msg:"Lettre" },
        { args: [], result:false, msg:"Aucun argument" },
    ],
    "Divisions" : [
        { args: [2, 1], result:"resultat: 2 reste: 0" },
        { args: [5, 3], result:"resultat: 1 reste: 2" },
        { args: [1, 2], result:false, msg:"Diviseur plus grand que le dividende" },
        { args: [1, 0], result:false, msg:"Division par 0" },
        { args: [1, 2, 3], result:false, msg:"Trois arguments" },
        { args: ["a", 2], result:false, msg:"Lettre en premier argument" },
        { args: [1, "a"], result:false, msg:"Lettre en deuxième argument" },
        { args: [1], result:false, msg:"Un seul argument" },
        { args: [], result:false, msg:"Aucun argument" },
    ],
    "Inverser une chaîne" : [
        { args: ["salut"], result:"tulas" },
        { args: ["salut les gens !"], result:"! sneg sel tulas" },
        { args: ["bon", "jour"], result:false, msg:"Deux arguments" },
        { args: ["salut","les","gens"], result:false, msg:"Trois arguments" },
        { args: [], result:false, msg:"Aucun argument" },
    ],
    "Taille d’une chaîne": [
        { args: ["salut"], result:"5" },
        { args: ["bonjour"], result:"7" },
        { args: ["salut les gens !"], result:"16" },
        { args: ["salut","les","gens"], result:false, msg:"Trois arguments" },
        { args: [], result:false, msg:"Aucun argument" },
    ],
    "Puissance d’un nombre" : [
        { args: ["2", "3"], result:"8" },
        { args: [2, 0], result:"1" },
        { args: [2, 1], result:"2" },
        { args: [2, -1], result:"0.5" },
        { args: [2, 2.5], result:"5.656854249492381" },
        { args: [2, "a"], result:false, msg:"Lettre en deuxième argument" },
        { args: [2], result:false, msg:"Un seul argument" },
        { args: [], result:false, msg:"Aucun argument" },
    ],
}
// https://github.com/Alexis0059/Epreuve_CA => ruby
// https://github.com/Bardevoir/EpreuveTerre => python
export default terre;