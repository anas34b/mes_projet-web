/* ******************************************************************
 * Constantes de configuration
 * ****************************************************************** */
const apiKey = "key1"; //"69617e9b-19db-4bf7-a33f-18d4e90ccab7";
const serverUrl = "https://lifap5.univ-lyon1.fr";

/* ******************************************************************
 * Gestion de la boîte de dialogue (a.k.a. modal) d'affichage de
 * l'utilisateur.
 * ****************************************************************** */

/**
 * Fait une requête GET authentifiée sur /whoami
 * @returns une promesse du login utilisateur ou du message d'erreur
 */
function fetchWhoami(CleApi) {
    return fetch(serverUrl + "/whoami", { headers: { "Api-Key": CleApi } })
        .then((response) => {
            if (response.status === 401) {
                return response.json().then((json) => {
                    console.log(json);
                    return { err: json.message };
                });
            } else {
                return response.json();
            }
        })
        .catch((erreur) => ({ err: erreur }));
}

/**
 * Fait une requête sur le serveur et insère le login dans la modale d'affichage
 * de l'utilisateur puis déclenche l'affichage de cette modale.
 *
 * @param {Etat} etatCourant l'état courant
 * @returns Une promesse de mise à jour
 */
function lanceWhoamiEtInsereLogin(CleApi, etatCourant) {
    return fetchWhoami(CleApi).then((data) => {
        majEtatEtPage(etatCourant, {
            login: data.user, // qui vaut undefined en cas d'erreur
            errLogin: data.err, // qui vaut undefined si tout va bien
            loginModal: false, // on affiche la modale
        });
    });
}

/**
 * Fait une requête GET authentifiée sur /pokemon
 * @returns une promesse des donnes de pokemon
 */

function fetchpokemon() {
    return fetch(serverUrl + "/pokemon", { headers: { "Api-Key": apiKey } })
        .then((response) => {
            if (response.status === 401) {
                return response.json().then((json) => {
                    console.log(json);
                    return { err: json.message };
                });
            } else {
                return response.json();
            }
        })
        .catch((erreur) => ({ err: erreur }));
}
/**
 * Fait une requête sur le serveur et recuperer les donnes
 * pokemon.
 *
 * @param {Etat} etatCourant l'état courant
 * @returns Une promesse de mise à jour
 */

function lancepokemon(etatCourant) {
    return fetchpokemon().then((data) => {
        majEtatEtPage(etatCourant, {
            pokemon: data,
            nombre: 10,
            ordre: 0,
        });
    });
}


/**
 * Génère le code HTML du corps de la modale de login. 
 * la on creer un espace pour ecrire la cle api
 * @param {Etat} etatCourant
 * @returns un objet contenant le code HTML dans le champ html et un objet vide
 * dans le champ callbacks
 */
function genereModaleLoginBody(etatCourant) {
    return {
        html: `
        <section class="modal-card-body">
        <label class="label">Clé API:</label><br/>
        <input class="input" id="input" size="60" />
        </section>
  `,
        callbacks: {},
    };
}

/**
 * Génère le code HTML du titre de la modale de login et les callbacks associés.
 *
 * @param {Etat} etatCourant
 * @returns un objet contenant le code HTML dans le champ html et la description
 * des callbacks à enregistrer dans le champ callbacks
 */
function genereModaleLoginHeader(etatCourant) {
    return {
        html: `
<header class="modal-card-head  is-back">
  <p class="modal-card-title">Utilisateur</p>
  <button
    id="btn-close-login-modal1"
    class="delete"
    aria-label="close"
    ></button>
</header>`,
        callbacks: {
            "btn-close-login-modal1": {
                onclick: () => majEtatEtPage(etatCourant, { loginModal: false }),
            },
        },
    };
}

/**
 * Génère le code HTML du base de page de la modale de login et les callbacks associés.
 *on creer un botton pour recuperer la cle et faire le fetch
 * @param {Etat} etatCourant
 * @returns un objet contenant le code HTML dans le champ html et la description
 * des callbacks à enregistrer dans le champ callbacks
 */
function genereModaleLoginFooter(etatCourant) {
    return {
        html: `
        <footer class="modal-card-foot" style="justify-content: flex-end">
        <button id="btn-close-login-modal2" class="button">Fermer</button>
        <button id="is-success button" class="is-success button">Valider</button>
      </footer>
  `,
        callbacks: {
            "btn-close-login-modal2": {
                onclick: () => majEtatEtPage(etatCourant, { loginModal: false }),
            },
            "is-success button": {
                onclick: function() {
                    const CleApi = document.getElementById("input").value;
                    return lanceWhoamiEtInsereLogin(CleApi, etatCourant);
                }
            }
        },
    };
}

/**
 * Génère le code HTML de la modale de login et les callbacks associés.
 *
 * @param {Etat} etatCourant
 * @returns un objet contenant le code HTML dans le champ html et la description
 * des callbacks à enregistrer dans le champ callbacks
 */
function genereModaleLogin(etatCourant) {
    const header = genereModaleLoginHeader(etatCourant);
    const footer = genereModaleLoginFooter(etatCourant);
    const body = genereModaleLoginBody(etatCourant);
    const activeClass = etatCourant.loginModal ? "is-active" : "is-inactive";
    return {
        html: `
      <div id="mdl-login" class="modal ${activeClass}">
        <div class="modal-background"></div>
        <div class="modal-card">
          ${header.html}
          ${body.html}
          ${footer.html}
        </div>
      </div>`,
        callbacks: {...header.callbacks, ...footer.callbacks, ...body.callbacks },
    };
}

/* ************************************************************************
 * Gestion de barre de navigation contenant en particulier les bouton Pokedex,
 * Combat et Connexion.
 * ****************************************************************** */


/**
 * Génère le code HTML et les callbacks pour la partie droite de la barre de
 * navigation qui contient le bouton de login.
 * là notre boutton marche si le login il est indefined : il ouvre le modal login
 * @param {Etat} etatCourant
 * @returns un objet contenant le code HTML dans le champ html et la description
 * des callbacks à enregistrer dans le champ callbacks
 */
function genereBoutonConnexion(etatCourant) {
    const html = `
  <div class="navbar-end">
    <div class="navbar-item">
      <div class="buttons">
      
      ${etatCourant.login === undefined 
      ?`<a id="btn-open-login-modal" class="button is-light"> Connexion </a>`
      :``  
    }
      
      </div>
    </div>
  </div>`;
    return {
        html: html,
        callbacks: {
            "btn-open-login-modal": {
                onclick: () => majEtatEtPage(etatCourant, {loginModal: true}),
            },
        },
    };
}
/**
 * la notre boutton s'affiche si le login existe et en cliquant audessus il se deconnecte on mettons le login en indefined
 * @param {*} etatCourant 
 * @returns 
 */

function genereBoutonDeconnexion(etatCourant)
{
  const html = `
  <div class="navbar-end">
    <div class="navbar-item">
      <div class="buttons">
      ${etatCourant.login !== undefined 
      ? `<a id="btn-dc-login-modal" class="button is-light"> Deconnexion </a><p>${etatCourant.login}</p>`
      : ''}
      </div>
      </div>
    </div>`;
   return{
    html: html,
    callbacks: {

      "btn-dc-login-modal":{
        onclick: () => majEtatEtPage(etatCourant, {login: undefined})

      }
    }

    };
  }


/**
 * Génère le code HTML de la barre de navigation et les callbacks associés.
 * là on ajouter le html et le callbacks du boutton deconexion 
 * @param {Etat} etatCourant
 * @returns un objet contenant le code HTML dans le champ html et la description
 * des callbacks à enregistrer dans le champ callbacks
 */
function genereBarreNavigation(etatCourant) {
    const connexion = genereBoutonConnexion(etatCourant);
    const deconnexion= genereBoutonDeconnexion(etatCourant);
    return {
        html: `
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar">
      <div class="navbar-item"><div class="buttons">
          <a id="btn-pokedex" class="button is-light"> Pokedex </a>
          <a id="btn-combat" class="button is-light"> Combat </a>
      </div></div>
      ${connexion.html}${deconnexion.html}
    </div>
  </nav>`,
        callbacks: {
            ...connexion.callbacks, ...deconnexion.callbacks,
            "btn-pokedex": { onclick: () => console.log("click bouton pokedex") },
        },
    };
}
///////////////////////////////////////////////////////////////////////////////////////
//les fonctions ajouter 10 de pokemon ou enlever 10 de pokemone
///////////////////////////////////////////////////////////////////////////////////////::
/**
 * pour afficher 10 de plus ou 10 de moin j'utilise les fonctions dessous 
 * leur appel et l'affichage se font dans la fonction generepage
 * le boutton moins ne s'affiche pas si il y a 10 ligne de pokemon qui sont affichees
 * @param {*} etatCourant 
 */

function ajouterPokemon(etatCourant){
    console.log("ajout de 10");
    majEtatEtPage(etatCourant, {
     nombre : etatCourant.nombre+10,
    }
     )
   }
   
   function enleverPokemon(etatCourant){
       if(etatCourant.nombre<10){
           console.log('imposible denlever 10')
       }else{
     majEtatEtPage(etatCourant, {
      nombre : etatCourant.nombre-10,
     }
      )}
    }
    function genererBouttonajouter(etatCourant){
        return{
            html:`
            
            <a id="btn-ajouter" class="button is-light"> Plus </a>
            `,
            callbacks:{
                    "btn-ajouter":{onclick:()=>ajouterPokemon(etatCourant)},
            }
        }
    }
    function genererBouttonenlever(etatCourant){
        return{
            html:`
            ${etatCourant.nombre>10?`<a id="btn-enlever" class="button is-light"> Moins </a>`
            :``}
            `,
            callbacks:{
                "btn-enlever":{onclick:()=>enleverPokemon(etatCourant)},
            }
        }
    }
///////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////
//fonction de trie
///////////////////////////////////////////////////////////////////////////////
/**la fonction de trie est répete dans chaque fonction 
 * la seul difference est par quoi on va trier(est ce que par nbpdex ou type...) 
 * pour faire l'inverse on utilise la variable ordre 
 * pour que le trie marche on fait lappel de callbacks de chaque fonction dans la fonction generetabpokemon 
 * et apres dans la fonction generepage
*/
/**trie par nom */
function trieparnom(etatCourant,ordre)
{   if(etatCourant.ordre==0){
    majEtatEtPage(etatCourant, {
        pokemon: etatCourant.pokemon.sort(function(a,b) {
            if(a.Name<b.Name){
              return -1;
            }
            else if(a.Name>b.Name) {
              return 1;
            }
            else{
              return 0;
            }
          }),
        ordre:   etatCourant.ordre+1           }
)        
        }else if(etatCourant.ordre==1){ majEtatEtPage(etatCourant, {
            pokemon: etatCourant.pokemon.sort(function(a,b) {
                      if(a.Name<b.Name){
                        return 1;
                      }
                      else if(a.Name>b.Name) {
                        return -1;
                      }
                      else{
                        return 0;
                      }
                      
                      }),
            ordre: etatCourant.ordre-1 ,
    
        });console.log(etatCourant.ordre)
        }}

        function genererBouttontrieNom(etatCourant){
            return{
                html:``
                ,
                callbacks:{
                    "Name":{onclick:()=>trieparnom(etatCourant,etatCourant.order) }
                        //trieparnom(etatCourant,etatCourant.order)},
                }
            }
        }
/**trie par pokedexnumber*/(a, b) => b - a;

function trieparPokedexNumber(etatCourant,ordre)
{   if(etatCourant.ordre==0){
    majEtatEtPage(etatCourant, {
        pokemon: etatCourant.pokemon.sort(function(a,b) {
            if(a.PokedexNumber<b.PokedexNumber){
              return -1;
            }
            else if(a.PokedexNumber>b.PokedexNumber) {
              return 1;
            }
            else{
              return 0;
            }
          }),
        ordre:etatCourant.ordre+1}
)}else if(etatCourant.ordre==1){ majEtatEtPage(etatCourant, {
            pokemon: etatCourant.pokemon.sort(function(a,b) {
                      if(a.PokedexNumber<b.PokedexNumber){
                        return 1;
                      }
                      else if(a.PokedexNumber>b.PokedexNumber) {
                        return -1;
                      }
                      else{
                        return 0;
                      }
                      }),
            ordre: etatCourant.ordre-1 ,
        });
        }}

        function genererBouttontriePokedexNumber(etatCourant){
            return{
                html:``
                ,
                callbacks:{
                    "PokedexNumber":{onclick:()=>trieparPokedexNumber(etatCourant,etatCourant.order) }
                        //trieparnom(etatCourant,etatCourant.order)},
                }
            }
        }
/** trie par Abilities */
function trieparAbility(etatCourant,ordre)
{
    if(etatCourant.ordre==0){
        majEtatEtPage(etatCourant, {
            pokemon: etatCourant.pokemon.sort(function(a,b) {
    if(a.Abilities[0]<b.Abilities[0]){ 
      return -1;
    }
    else if(a.Abilities[0]>b.Abilities[0]) {
      return 1;
    }
    else{
      return 0;
    }}),
    ordre:etatCourant.ordre+1})
  }

else if(etatCourant.ordre==1){ majEtatEtPage(etatCourant, {
    pokemon: etatCourant.pokemon.sort(function(a,b) {
    if(a.Abilities[0]<b.Abilities[0]){
      return 1;
    }
    else if(a.Abilities[0]>b.Abilities[0]) {
      return -1;
    }
    else{
      return 0;
    }}),
    ordre: etatCourant.ordre-1,
    
})

    }
}
function genererBouttontrieparAbility(etatCourant){
    return{
        html:``
        ,
        callbacks:{
            "Abilities":{onclick:()=>trieparAbility(etatCourant,etatCourant.order) }
                //trieparnom(etatCourant,etatCourant.order)},
        }
    }
}

/**trie par type */
function triepartype(etatCourant,ordre)
{
    if(etatCourant.ordre==0){
        majEtatEtPage(etatCourant, {
            pokemon: etatCourant.pokemon.sort(function(a,b) {
    if(a.Types[0]<b.Types[0]){ 
      return -1;
    }
    else if(a.Types[0]>b.Types[0]) {
      return 1;
    }
    else{
      return 0;
    }}),
    ordre:etatCourant.ordre+1})
  }

else if(etatCourant.ordre==1){ majEtatEtPage(etatCourant, {
    pokemon: etatCourant.pokemon.sort(function(a,b) {
    if(a.Types[0]<b.Types[0]){
      return 1;
    }
    else if(a.Types[0]>b.Types[0]) {
      return -1;
    }
    else{
      return 0;
    }}),
    ordre: etatCourant.ordre-1,
    
})

    }
}
function genererBouttontriepartype(etatCourant){
    return{
        html:``
        ,
        callbacks:{
            "type":{onclick:()=>triepartype(etatCourant,etatCourant.order) }
                //trieparnom(etatCourant,etatCourant.order)},
        }
    }
}
///////////////////////////////////////////////////////////////////////////////
/**
 * d'abord pouvoir generer une seule ligne de tableau
 */
//ligne de tableau
function genereTabLignePokemon(data) {
    return ` <tr class="">
<td>
 <img
   alt="${data.Name}"
   src="${data.Images.Detail}"
   width="64"
 />
</td>
<td><div class="content">${data.PokedexNumber}</div></td>
<td><div class="content">${data.Name}</div></td>
<td>
<ul>
${data.Abilities.map( (ligne) => `<li> ${ligne} </li>`).join('\n')}
</ul>
</td>
<td>
<ul>
${data.Types.map( (ligne) => `<li> ${ligne} </li>`).join('\n')}
</ul>
</td>
</tr>
`
}

/**
 * genere tout le tableau avec la fonction genereTabLignePokemon(data)
 */
//tout le tableau
function genereTabPokemon(etatCourant) {
  
  //l'entete du tableau
   const htmlentete=`
    <div class="tabs is-centered">
         <ul>
            <li class="is-active" id="tab-all-pokemons">
              <a>Tous les pokemons</a>
            </li>
            <li id="tab-tout"><a>Mes pokemons</a></li>
        </ul>
    </div>
   <div id="tbl-pokemons">
  <table class="table">
    <thead>
      <tr>
        <th><span>Image</span></th>
        <th id="PokedexNumber">
          <span>#</span
          ><span class="icon"><i class="fas fa-angle-up"></i></span>
        </th>
        <th id="Name"><span>Name</span></th>
        <th id="Abilities"><span>Abilities</span></th>
        <th id="type"><span>Types</span></th>
      </tr>
    </thead>
    <tbody>`;

    const html2 = etatCourant.pokemon.slice(0,etatCourant.nombre).map( (data) => genereTabLignePokemon(data)).join('');
    const html3=`</table></tbody>`;
    return {html:htmlentete+html2+html3,
      callbacks:{
            ...genererBouttontrieNom.callbacks, ...genererBouttontriePokedexNumber.callbacks, ...genererBouttontrieparAbility.callbacks, ...genererBouttontriepartype.callbacks,
      },
}}



/**
 * Génére le code HTML de la page ainsi que l'ensemble des callbacks à
 * enregistrer sur les éléments de cette page.
 *
 * @param {Etat} etatCourant
 * @returns un objet contenant le code HTML dans le champ html et la description
 * des callbacks à enregistrer dans le champ callbacks
 */
function generePage(etatCourant) {
    const barredeNavigation = genereBarreNavigation(etatCourant);
    const modaleLogin = genereModaleLogin(etatCourant);
    //afficher le tableau de pokemon
    const affiche = genereTabPokemon(etatCourant);
    const ajouter=genererBouttonajouter(etatCourant);
    const enlever=genererBouttonenlever(etatCourant);
    const trienom=genererBouttontrieNom(etatCourant);
    const triepokdex= genererBouttontriePokedexNumber(etatCourant);
    const trieability=genererBouttontrieparAbility(etatCourant);
    const trietype=genererBouttontriepartype(etatCourant);
    // remarquer l'usage de la notation ... ci-dessous qui permet de "fusionner"
    // les dictionnaires de callbacks qui viennent de la barre et de la modale.
    // Attention, les callbacks définis dans modaleLogin.callbacks vont écraser
    // ceux définis sur les mêmes éléments dans barredeNavigation.callbacks. En
    // pratique ce cas ne doit pas se produire car barreDeNavigation et
    // modaleLogin portent sur des zone différentes de la page et n'ont pas
    // d'éléments en commun.
    return {
        html: barredeNavigation.html + modaleLogin.html + affiche.html + ajouter.html + enlever.html + trietype.html,
        callbacks: {...barredeNavigation.callbacks, ...modaleLogin.callbacks, ...affiche.callbacks,  ...ajouter.callbacks, ...enlever.callbacks, ...trienom.callbacks,...triepokdex.callbacks, ...trieability.callbacks, ...trietype.callbacks },
    };
}

/* ******************************************************************
 * Initialisation de la page et fonction de mise à jour
 * globale de la page.
 * ****************************************************************** */

/**
 * Créée un nouvel état basé sur les champs de l'ancien état, mais en prenant en
 * compte les nouvelles valeurs indiquées dans champsMisAJour, puis déclenche la
 * mise à jour de la page et des événements avec le nouvel état.
 *
 * @param {Etat} etatCourant etat avant la mise à jour
 * @param {*} champsMisAJour objet contenant les champs à mettre à jour, ainsi
 * que leur (nouvelle) valeur.
 */
function majEtatEtPage(etatCourant, champsMisAJour) {
    const nouvelEtat = {...etatCourant, ...champsMisAJour };
    majPage(nouvelEtat);
}

/**
 * Prend une structure décrivant les callbacks à enregistrer et effectue les
 * affectation sur les bon champs "on...". Par exemple si callbacks contient la
 * structure suivante où f1, f2 et f3 sont des callbacks:
 *
 * { "btn-pokedex": { "onclick": f1 },
 *   "input-search": { "onchange": f2,
 *                     "oninput": f3 }
 * }
 *
 * alors cette fonction rangera f1 dans le champ "onclick" de l'élément dont
 * l'id est "btn-pokedex", rangera f2 dans le champ "onchange" de l'élément dont
 * l'id est "input-search" et rangera f3 dans le champ "oninput" de ce même
 * élément. Cela aura, entre autres, pour effet de délclencher un appel à f1
 * lorsque l'on cliquera sur le bouton "btn-pokedex".
 *
 * @param {Object} callbacks dictionnaire associant les id d'éléments à un
 * dictionnaire qui associe des champs "on..." aux callbacks désirés.
 */
function enregistreCallbacks(callbacks) {
    Object.keys(callbacks).forEach((id) => {
        const elt = document.getElementById(id);
        if (elt === undefined || elt === null) {
            console.log(
                `Élément inconnu: ${id}, impossible d'enregistrer de callback sur cet id`
            );
        } else {
            Object.keys(callbacks[id]).forEach((onAction) => {
                elt[onAction] = callbacks[id][onAction];
            });
        }
    });
}

/**
 * Mets à jour la page (contenu et événements) en fonction d'un nouvel état.
 *
 * @param {Etat} etatCourant l'état courant
 */
function majPage(etatCourant) {
    console.log("CALL majPage");
    const page = generePage(etatCourant);
    document.getElementById("root").innerHTML = page.html;
    enregistreCallbacks(page.callbacks);
}

/**
 * Appelé après le chargement de la page.
 * Met en place la mécanique de gestion des événements
 * en lançant la mise à jour de la page à partir d'un état initial.
 */
function initClientPokemons() {
    console.log("CALL initClientPokemons");
    const etatInitial = {
        loginModal: false,
        login: undefined,
        errLogin: undefined,
    };
    
    lancepokemon(etatInitial);
    //majPage(etatInitial);
    
}

// Appel de la fonction init_client_duels au après chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    console.log("Exécution du code après chargement de la page");
    initClientPokemons();
});