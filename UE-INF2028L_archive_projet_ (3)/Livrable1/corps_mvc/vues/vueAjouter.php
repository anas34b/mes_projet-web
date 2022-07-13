<h2>Ajout d'une variété</h2>

<form method="post" action="#">
	
	<br/><br/>
	<label for="Id_Variete">Code de variété  </label>
	<input type="text" class="form-control" name="Id_Variete" id="Id_Variete" placeholder="Id_Variete" required />
	
	
	<label for="anneeMiseSurLeMarche">Année d'Enregistrement  </label>
	<input type="text" class="form-control" name="anneeMiseSurLeMarche" id="anneeMiseSurLeMarche" placeholder="anneeMiseSurLeMarche" required />


	<label for="periodeRecolte">Période de récolte  </label>
	<input type="text" class="form-control" name="periodeRecolte" id="periodeRecolte" placeholder="periodeRecolte" required />



	<label for="commentaire_Variete">Commentaire  </label>
	<input type="text" class="form-control" name="commentaire_Variete" id="commentaire_Variete" placeholder="commentaire_Variete" required />
	
	<br/><br/>
	<input type="submit" class="btn btn-success btn-lg btn-block" name="boutonValider" value="Ajouter une Variété"/>
	
	

<?php if(isset($message)) { ?>
	<p style="background-color: yellow;"><?= $message ?></p>
<?php } ?>

