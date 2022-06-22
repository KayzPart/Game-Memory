
const divResultat = document.querySelector('#resultat');

var tabJeu = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
];

var tabResultat = genereTableauAleatoire();
var oldSelection=[];


var nbAffiche = 0;
var ready = true;
afficherTableau();

function afficherTableau(){
    var txt = "";

    
    for(var i=0; i < tabJeu.length ; i++){
        txt += "<div>";

        for(var j=0; j < tabJeu[i].length ; j++){
            if(tabJeu[i][j] === 0){
                txt += "<button class='btn btn-primary' onClick='verif(\""+i+"-"+j+"\")'>Afficher</button>";
            }
            else{
                txt += "<img src='"+getImage(tabJeu[i][j])+"'>"
            }
        }
        txt += "</div>";
    } 
    divResultat.innerHTML = txt;
}
function getImage(valeur){
    var imgTxt =  "./image/";
    switch(valeur){
        case 1 : imgTxt += "elephant.png";
        break;
        case 2 : imgTxt += "giraffe.png"
        break;
        case 3 : imgTxt += "hippo.png";
        break;
        case 4 : imgTxt += "monkey.png";
        break;
        case 5 : imgTxt += "panda.png";
        break;
        case 6 : imgTxt += "parrot.png";
        break;
        case 7 : imgTxt += "penguin.png";
        break;
        case 8 : imgTxt += "pig.png";
        break;
        default : console.log("cas non pris en compte")
    }
    //Nous voulons retourner la valeur de l'image
    return imgTxt;
}


// 13) Fonction pour récupérer l'élément cliquer (le bouton)
function verif(bouton){

    //19)bis est ce qu'on est prêt pour faire l'étape de verification (je prend tout ce que j'ai fait jusqu'a maintenant dans cette fonction et je l'inclus dedans)
    if(ready){
        
        nbAffiche++;

        var ligne = bouton.substr(0,1);
        var colonne = bouton.substr(2,1);
        tabJeu[ligne][colonne] = tabResultat[ligne][colonne];
        // 15) Il faut réaficher notre grille 
        afficherTableau();
        if(nbAffiche>1){
            ready = false;
            
            //22) J'encadre donc mon if 18 dans un timeout 
            setTimeout(() => {
                if(tabJeu[ligne][colonne]!== tabResultat[oldSelection[0]][oldSelection[1]]){

                // 18bis) Si ca correspont pas alors il faudra réinitialiser tabJeu de ligne de colonne et de meme pour tabJeu présent dans oldSelection à la postion 0 de oldSelection de 1
                tabJeu[ligne][colonne] = 0;
                tabJeu[oldSelection[0]][oldSelection[1]] = 0;
                // Je viens de réinitialiser les deux dernier click (si l'image ne correspont pas)
                }
                // Ensuite je réaffiche notre tableau
                afficherTableau();
                // MAintenant tu peux recliquer sur un bouton (je réinitialise le boolean a true)
                ready = true;
                // verification ( a chaque bouton qu'on va cliquer on va incrémenter nbAffiche donc en premiere ligne de ma fonction je l'incrémente)
                // Une fois la vérification fini je réinitialise nbAffiche a zero
                nbAffiche = 0;

                // 23) Derniere action que je viens de réaliser 
                //setTimeout fonction de façon non synchroniser donc la fonction fléché a l'intérieur es réaliser après 
                oldSelection = [ligne,colonne];
            },600)
            //500 milliseconde = 0.5s
            // 1000 millisecond = 1s
        }
        else{
            oldSelection = [ligne,colonne];
        // 16)bis2) je vais déclarer cette variable plus haut  
        }
    }   
}
// 26) création de la fonction genereTableauAleatoire
function genereTableauAleatoire(){
    //27) je déclare un tableau vierge pour le moment que je retourne à la fin
    var tab = [];

    //32)    en 30 et 31 j'ai générer un tableau qui contient que des zero mais nous voulons générer des nombres aléatoire entre 1 et 8 (et par paires ex= 2 de 1 2 de2 ..)
    // Pour cela on va creer un autre Tableau
    var nbImagePosition = [0,0,0,0,0,0,0,0];



    //28) Je génère maintenant un tableau qui va contenir 4 lignes et 4 colonnes 
    //28Bis) Boucle for. i qui commence à 0 et qui s'arrête à 4 et je lui ajoute 1. Je génère mes lignes à lintérieur de ma boucle for
    //28Bis2) J'inclus ma var ligne ensuite dans ma var tab 
    for(var i = 0 ; i < 4 ; i++){
        var ligne = [];
        //29Bis) Je dois maintenant générer des colonnes (je parcours un autre compteur donc une autre boucle for)
        for(var j = 0 ; j < 4 ; j++){
            //37) Si je ne suis pas dans le if (qu'on a deja nos deux image) il faudra donc recommencer tant qu'on a pas générer un chiffre qui n'est pas deux fois afin de creer la paire
            var fin = false; 
            // 38) Donc je continue tant que (= while) fin est égal a false alors je réalise la suite des actions qu'on a deja creer et qui vont suivre 
            while(!fin){
                // 33) Pour générer un nombre aléatoire entre 1 et 8 
            // Math random * 8 et Math.floor pour arrondir et avoir un chiffre entre 1 et 8 (plutôt entre 0 et 7 vu que mon index de tab debute à 0) on rajoutera le +1 dans le tableau final 
                var randomImage = Math.floor(Math.random() * 8);

            // 34 ) verifier si le chiffr qu'on a générer est pas répéter plus de deux fois 
                if(nbImagePosition[randomImage] < 2){
                    // 35) et si je suis dans ce cas la je peux faire ma ligne.push de la valeur qu'on à générer aléatoirement 
                    //et je lui rajoute +1 vu que nos image vont de  1 à 8

                    // 30 ) je complète ma ligne en mettant une valeur
                    ligne.push(randomImage+1);
                    // 31) je viens de creer un tableau qui contient 16 case et qui contient que des 0

                    //36) il faut ensuite que j'incrémente ma valeur dans mon tab nbImagePosition
                    nbImagePosition[randomImage]++;

                    //39 J'arrêtrais ma boucle quand j'aurai une image présente pas plus de deux fois donc quand je rentre dans le if 
                    fin = true;
                }
            }
        }
        //29) Donc je le déclare à la fin de ma fonction (je rajoute une ligne à mon tableau)
        tab.push(ligne);
    }
    return tab;
}
