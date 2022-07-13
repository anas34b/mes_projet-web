<?php 

// connexion à la BD, retourne un lien de connexion
function getConnexionBD() {
	$connexion = mysqli_connect(SERVEUR, UTILISATRICE, MOTDEPASSE, BDD);
	if (mysqli_connect_errno()) {
	    printf("Échec de la connexion : %s\n", mysqli_connect_error());
	    exit();
	}
	return $connexion;
}

// déconnexion de la BD
function deconnectBD($connexion) {
	mysqli_close($connexion);
}
// nombre d'instances d'une table $nomTable:compter le nombre de ligne
function countInstances($connexion, $nomTable) {
	$requete = "SELECT DISTINCT COUNT(*) AS nb FROM $nomTable";
	$res = mysqli_query($connexion, $requete);
	if($res != FALSE) {
		$row = mysqli_fetch_assoc($res);
		return $row['nb'];
	}
	return -1;  // valeur négative si erreur de requête (ex, $nomTable contient une valeur qui n'est pas une table)
}

function countInstances2($connexion, $nomTable) {
	$requete = "SELECT DISTINCT COUNT(*) AS nb FROM $nomTable";
	$res = mysqli_query($connexion, $requete);
	if($res != FALSE) {
		$row = mysqli_fetch_assoc($res);
		return $row['nb'];
	}
	return -1;  // valeur négative si erreur de requête (ex, $nomTable contient une valeur qui n'est pas une table)
}

// retourne les instances d'une table $nomTable: on l'utiliste beaucp pour l'affichae: on recuper tout les données du tableau et aprés on affiche ce qu'on veut comme colone
function getInstancesplante($connexion, $nomTable) {
	$requete = "SELECT DISTINCT * FROM $nomTable";
	$res = mysqli_query($connexion, $requete);
	$instances = mysqli_fetch_all($res, MYSQLI_ASSOC);
	return $instances;
}

// retourne les instances d'une table $nomTable: on l'utiliste beaucp pour l'affichae: on recuper tout les données du tableau et aprés on affiche ce qu'on veut comme colone
function getInstancestype($connexion) {
	$requete = "SELECT DISTINCT type_Plante FROM Plante ";
	$res = mysqli_query($connexion, $requete);
	$instances = mysqli_fetch_all($res, MYSQLI_ASSOC);
	return $instances;
}

// retourne les informations sur le nom de la variete: pour savoir est ce que le nom de la variete existe deja ou pas
function getNomVaByName($connexion, $Nom_v) {
	$Nom_v = mysqli_real_escape_string($connexion, $Nom_v); 
	$requete = "SELECT * FROM Variete WHERE Id_Variete = '". $Nom_v . "'";
	$res = mysqli_query($connexion, $requete);
	$vari = mysqli_fetch_all($res, MYSQLI_ASSOC);
	return $vari;
}
//fonctionalite 3
//c'est pour la troisieme foncgionnalire: pour ajouter dan le tableau du rang on doit dabord l'ajouter sur le tableau des parcelle et pour ajouter aussi sur ce dernier on doit ajouter les donnes dans le tableau jardin(relation entre les cles primaires et les cles etrrngers)
function insertJARDIN($connexion) {
	//
	$IdJ = countInstances($connexion,"JARDIN") + 1;
	$nbrang = rand($_POST['min'], $_POST['max']);
		//la longuer est le nombre de rang fos la longueur d'un seul rang que je vais la mettre en 5m par defaut
    $longueur = $nbrang*5;
		//la longuer est le nombre de rang fos la largeur d'un seul rang que je vais la mettre en 3m par defaut
    $largeur = $nbrang*3;
		//calcule normale de la surface on consider par defaut un jardin se compose de 5 parcelle generalement
	$Surface=$longueur*$largeur*5;
	$requete = "INSERT INTO JARDIN (`IdJ`,`NoM`,`Surface`) VALUES 
	( '". $IdJ . "' , '". $_POST['NoM'] . "' , '". $Surface . "')";
	$res = mysqli_query($connexion, $requete);
    return $res;
}

//nombre de plantes différentees
function NbPlantes($connexion, $nomTable, $nom_colonne) {
	$requete = "SELECT COUNT(DISTINCT $nom_colonne) AS nbP FROM $nomTable";
	$res = mysqli_query($connexion, $requete);
	if($res != FALSE) {
		$row = mysqli_fetch_assoc($res);
		return $row['nbP'];
	}
	return -1;
	}


function insertParcelles($connexion) {
	
	$IdJ = countInstances($connexion,"JARDIN") ;
	$nbrang = rand($_POST['min'], $_POST['max']);
		//la longuer est le nombre de rang fos la longueur d'un seul rang que je vais la mettre en 5m par defaut
    $longueur = $nbrang*5;
		//la longuer est le nombre de rang fos la largeur d'un seul rang que je vais la mettre en 3m par defaut
    $largeur = $nbrang*3;
		//calcule normale de la surface on consider par defaut un jardin se compose de 5 parcelle generalement
		
	$Dimension=$longueur*$largeur; 
	$requete = "INSERT INTO Parcelles (`Id_Parcelles`,`Coordonées`,`Dimension`,`IdJ`) VALUES 
	('" . $IdJ . "' ,null, '" . $Dimension . "' , '" . $IdJ . "')";
	$res = mysqli_query($connexion, $requete);
	return $res ;
}

function insertrang($connexion)
{	
	$nbrang = rand($_POST['min'], $_POST['max']);
	$Id_Rang = countInstances($connexion,"Parcelles") ;
	for ($i=1; $i<=$nbrang; $i++) {
		$Numrang=$i;
		$randvariete="SELECT DISTINCT Nom_v FROM `Variété` WHERE `annéeEnregistrement` = ROUND()";
		$res = mysqli_query($connexion, $randvariete);
		$randplante="SELECT DISTINCT nomEspèce FROM `Plante` WHERE `Id_Plante` = ROUND()";
		$res1 = mysqli_query($connexion, $randplante);
		$requete = "INSERT INTO Rang (`Num`,`varite`,`plantes indésirables`,`Id_Rangs`) VALUES 
		('" . $Numrang . "' ,'" . $res . "', '" . $res1 . "' , '" . $Id_Rang . "')";
		$res2 = mysqli_query($connexion, $requete);
	}
		return $res2;

}

//fin fonctionnalite 3

//fonctionnalite2: insere une nouvelle variete

function insertVariété($connexion) {
	$requete = "INSERT INTO Variete (`Id_Variete`, `anneeMiseSurLeMarche`,`periodeRecolte`,`commentaire_Variete`) VALUES 
	('". $_POST['Id_Variete'] . "' , '". $_POST['anneeMiseSurLeMarche'] . "' , '". $_POST['periodeRecolte'] . "' , '". $_POST['commentaire_Variete'] . "' )";
	$res = mysqli_query($connexion, $requete);
	return $res;
}
//fin fonctionnalite 2

//la fonction pour que l'utilisateur peut chercher soit dans les plantes soit dans les variete
function search($connexion, $table, $valeur) {
	$valeur = mysqli_real_escape_string($connexion, $valeur); // au cas où $valeur provient d'un formulaire
	if($table == 'Variété')
		$requete = 'SELECT * FROM Variete WHERE Id_Variete LIKE \'%'.$valeur.'%\';';
	else  // $table == 'Plante'
		$requete = 'SELECT * FROM Plante WHERE nom_Plante LIKE \'%'.$valeur.'%\';';
	if($table == 'type') 
		$requete = 'SELECT * FROM Plante WHERE type_Plante LIKE \'%'.$valeur.'%\';';
	$res = mysqli_query($connexion, $requete);
	$instances = mysqli_fetch_all($res, MYSQLI_ASSOC);
	return $instances;
}


?>
