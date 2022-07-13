

	   <?php
		$nbp = countInstances($connexion, "Plante");
		if($nbp <= 0)
			$message = "Aucune Plante n'a été trouvée dans la base de données !";
		else
			$message = "Actuellement $nbp Plante dans la base.";
           	?>

			 <?php
		//$nb = countInstances2($connexion, "Variété");
		$nb= NbPlantes($connexion, "Variete", "Id_Variete");
		/*if($nb <= 0)
			$message1 = "Aucune Variété n'a été trouvée dans la base de données !";
		else*/
			$message1 = "Actuellement $nb Variété dans la base.";
           	?>

			
	

         
	
          







