<?php 
if(isset($_POST['boutonValider'])) { // formulaire soumis

	$Nom_v = mysqli_real_escape_string($connexion, $_POST['Id_Variete']); // recuperation de la valeur saisie
	$verification = getNomVaByName($connexion, $Nom_v);

	if($verification == FALSE || count($verification) == 0) { // pas de avec ce nom, insertion
		
		$insertion = insertVariété($connexion);
		
		if($insertion == TRUE) {
			$message = "La Variété $Nom_v a bien été ajoutée !";
		}
		else {
			$message = "Erreur lors de l'insertion de la Variété $Nom_v.";
		}
	}
	else {
		$message = "Une Variété existe déjà avec ce nom ($Nom_v).";
	}
}

?>
