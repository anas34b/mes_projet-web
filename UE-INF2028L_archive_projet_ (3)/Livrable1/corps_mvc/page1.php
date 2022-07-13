<!-- DALLAGI Sami p1807154
     DAOUI Anas   p1813658                -->
<?php
// index.php fait office de controleur frontal
session_start(); // démarre ou reprend une session
ini_set('display_errors', 1); // affiche les erreurs (au cas où)
ini_set('display_startup_errors', 1); // affiche les erreurs (au cas où)
error_reporting(E_ALL); // affiche les erreurs (au cas où)
if(file_exists('../private/config-bd.php'))  // vous n'avez pas besoin des lignes 7 à 9
	require('../private/config-bd.php'); // inclut un fichier de config "privé"
else
	
    require('incp/config-bd.php'); // vous pouvez inclure directement ce fichier de config (sans le if ... else précédent)
require('modelep/modelep.php'); // inclut le fichier modele
//require('incp/includes.php'); // inclut des constantes et fonctions du site (nom, slogan)
require('incp/routes.php'); // fichiers de routes

$connexion = getConnexionBD(); // connexion à la BD
?>

<!DOCTYPE html>
<head>
    <meta charset="utf-8" />
    <!-- le titre du document, qui apparait dans l'onglet du navigateur -->
    <title>Hortus</title>
    <!-- lie le style CSS externe  -->
    <link href="css/style.css" rel="stylesheet" media="all" type="text/css">
    <!-- le lien pour appeler le paquet de style pour le menu -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="shortcut icon" type="image/x-icon" href="img/hortus_logo_Blanc.png" />
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    
</head>

<body>
    <!-- -->
    <?php include('static/header.php'); ?>
    <div id="divCentral">
    <?php include('static/menu.php'); ?>

    <main>
		<?php
		$controleur = 'controleurAccueil'; // par défaut, on charge accueil.php
		$vue = 'vueAccueil'; // par défaut, on charge accueil.php
		if(isset($_GET['page'])) {
			$nomPage = $_GET['page'];
			if(isset($routes[$nomPage])) { // si la page existe dans le tableau des routes, on la charge
				$controleur = $routes[$nomPage]['controleur'];
				$vue = $routes[$nomPage]['vue'];
			}
		}
		include('controleurs/' . $controleur . '.php');
		include('vues/' . $vue . '.php');
		?>
		</main>
	</div>
    <?php include('static/footer.php'); ?>
</body>
</html>
