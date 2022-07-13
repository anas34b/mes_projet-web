<style>
table {
border: medium solid #000000;
width: 50%;
}
td, tr {
border: thin solid #6495ed;
width: 50%;
}


</style>


    </div>

<h2>Affichage des données fournies :</h2>
<form method="post" action="#">
<input type="submit" class="btn btn-success btn-lg" name="plante" value="affichage de plante">
<input type="submit" class="btn btn-info btn-lg" name="variete" value="affichage de variété">
<input type="submit" class="btn btn-warning btn-lg" name="type" value="affichage de type">
</form>

<?php 
  if (isset($_POST['plante']))
  {
    echo '<table class="table table table-bordered">
                <tr>
                    <th>nom</th>
                    <th>nomlatin</th>
                    <th>type</th>
                    <th>soustype</th>
                </tr>
                <tr>';
                foreach($DonneesFourniesp as $DonneesFourniesp) 
                { 
                    echo '<td>'.$DonneesFourniesp['nom_Plante']. '</td>
                    <td>'.$DonneesFourniesp['nomLatin_Plante'].'</td>
                    <td>'.$DonneesFourniesp['type_Plante'].'</td>
                    <td>'.$DonneesFourniesp['sousType_Plante'].'</td>
                    </tr>';
                }
        echo '</table>';
  }
  elseif (isset($_POST['variete'])) 
  {
    echo '<table class="table table table-bordered">
                <tr>
                    <th>Nom_v</th>
                    <th>annéeEnregistrement</th>
                    <th>commentaire</th>
                </tr>
                <tr>';
                foreach($DonneesFourniesv as $DonneesFourniesv) 
                { 
                    echo '<td>'.$DonneesFourniesv['Id_Variete']. '</td>
                    <td>'.$DonneesFourniesv['anneeMiseSurLeMarche'].'</td>
                    <td>'.$DonneesFourniesv['commentaire_Variete'].'</td>
                    </tr>';
                }
        echo '</table>';

  }
  elseif (isset($_POST['type'])) 
  {
    echo '<table class="table table table-bordered">
                <tr>
                    <th>type</th>
                </tr>
                <tr>';
                foreach($DonneesFourniest as $DonneesFourniest) 
                { 
                    echo '<td>'.$DonneesFourniest['type_Plante']. '</td>
                    </tr>';
                }
        echo '</table>';

  }
?>











