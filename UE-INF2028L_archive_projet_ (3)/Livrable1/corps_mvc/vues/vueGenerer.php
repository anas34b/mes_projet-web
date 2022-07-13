<h2>Créer et Afficher une parcelle</h2>

<form method="post" action="#">
	<label for="text">Nom du jardin </label>
	<input type="text" class="form-control" name="NoM" id="NoM" placeholder="Nom" required />
	<br/><br/>

	<label for="text">Nombre de rang minimum </label>
	<input type="text" class="form-control" name="min" id="min" placeholder="minimum" required />
	<br/><br/>

	<label for="text">Nombre de rang maximum </label>
	<input type="text" class="form-control" name="max" id="max" placeholder="maximum" required />
	<br/><br/>

	<label for="text">Pourcentage de rangs occupés par des cultures </label>
	<input type="text" class="form-control" name="text1" id="text1" placeholder="cultures" required />
	<br/><br/>

	<label for="text">Pourcentage de rangs occupés par des plantes indésirables. </label>
	<input type="text" class="form-control" name="text2" id="text2" placeholder="indésirables" required />
	

	<input type="submit" class="btn btn-success btn-lg btn-block" name="genr_parc" value="Ajouter et Générer une parcelle"/>
    
</form>




<?php 
if(isset($_POST['genr_parc'])) { // formulaire soumis

	if($_POST['min']>$_POST['max'])
    {
        $message = "ERREUR : Le minimum est plus grand que le maximum";
        return '';
    }
    if(($_POST['text1']+$_POST['text2'])>100)
    {
        $message = "ERREUR : La somme des pourcentages est plus grand que 100%" ;
        return '';
    }

	insertJARDIN($connexion);
	$JARDIN = getInstancesplante($connexion, "JARDIN");
echo 'table jardin';
	echo '<table class="table table-striped">
                <tr>
                    <th>IdJ</th>
                    <th>NoM</th>
                    <th>Surface</th>
                </tr>
                <tr>';                 
                foreach($JARDIN as $JARDIN) 
                { 
                    echo '<td>'.$JARDIN['IdJ']. '</td>
                    <td>'.$JARDIN['NoM'].'</td>
                    <td>'.$JARDIN['Surface'].'</td>
                    </tr>';
                }
        echo '</table class="table table-striped">';


		insertParcelles($connexion);
	$Parcelles = getInstancesplante($connexion, "Parcelles");
  echo'table parcelle';
	echo '<table class="table table-striped">
                <tr>
                    <th>Id_Parcelles</th>
                    <th>Coordonées</th>
                    <th>Dimension</th>
                    <th>IdJ</th>
                </tr>
                <tr>';
                foreach($Parcelles as $Parcelles) 
                { 
                    echo '<td>'.$Parcelles['Id_Parcelles']. '</td>
                    <td>'.$Parcelles['Coordonées'].'</td>
                    <td>'.$Parcelles['Dimension'].'</td>
                    <td>'.$Parcelles['IdJ'].'</td>
                    </tr>';
                }
        echo '</table class="table table-striped">';
  

  insertrang($connexion);
	$Rang = getInstancesplante($connexion, "Rang");
  echo'table Rang';
	echo '<table class="table table-striped">
                <tr>
                    <th>Num</th>
                    <th>varite</th>
                    <th>plantes indésirables</th>
                </tr>		
                <tr>';
                foreach($Rang as $Rang) 
                { 
                    echo '<td>'.$Rang['Num']. '</td>
                    <td>'.$Rang['varite'].'</td>
                    <td>'.$Rang['plantes indésirables'].'</td>
                    </tr>';
                }
        echo '</table class="table table-striped">';
  
			}
	

?>

