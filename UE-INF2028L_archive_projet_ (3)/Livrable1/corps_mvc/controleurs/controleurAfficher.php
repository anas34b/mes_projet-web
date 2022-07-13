
<?php 

	
	$DonneesFourniesp = getInstancesplante($connexion, "Plante");
	$DonneesFourniesv = getInstancesplante($connexion, "Variete");
	$DonneesFourniest = getInstancestype($connexion);

	if($DonneesFourniesp == null || count($DonneesFourniesp) == 0) {
	$message .= "Aucune plante n'a été trouvée dans la base de données !";}

	if($DonneesFourniesv == null || count($DonneesFourniesv) == 0) {
		$message .= "Aucune variete n'a été trouvée dans la base de données !";}

		if($DonneesFourniest == null || count($DonneesFourniest) == 0) {
			$message .= "Aucun type n'a été trouvé dans la base de données !";}

	



?>




