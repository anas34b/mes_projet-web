<h2>Recherche dans la base</h2>

<form method="post" action="#">	
	<label for="idChamp">Rechercher dans</label>
	<select class="btn btn-outline-success" name="champRech" id="idChamp">
		<option value="Variété">Variété</option>
		<option value="Plante">Plante</option>
		<option value="type">type</option>
	</select>
	<label for="idValeur">la valeur </label>
	<input type="text" class="btn btn-outline-success" name="valeur" id="idValeur" placeholder="Ecrivez-ici" required/>
	<input type="submit" class="btn btn-outline-success" name="boutonValider" value="Rechercher"/>
</form>

<article>
	<?php if(isset($message)) { ?>
		<p style="background-color: yellow;"><?= $message ?></p>
	<?php } ?>
	<?php if(isset($resultats)) { ?>	
		<ul>
		<?php 
			foreach($resultats as $instance) {  // nombre d'attributs variable dans les résultats (selon la table)
				echo '<li>';
				foreach($instance as $valeur)  // affichage de chaque valeur (correspondant à chaque attribut)
					echo $valeur . ' ';
				echo '</li>';
			}
		?>
		</ul>
	<?php } ?>
</article>


