Projet LIFAP5 printemps 2022: Pokemons
L’objectif de ce projet est de mettre en pratique ce qui a été vu dans l’UE LIFAP5 à travers la réalisation de la partie client, entièrement en JavaScript dans le navigateur et sans serveur, d’une application de jeu POKEMON.

L’application va permettre de gérer des pokemons

Fonctionnalités de l’API REST:
//
Authentification
Pour les requêtes qui nécessitent une authentification, il faut ajouter un header Api-Key dont la valeur est une clé d’API.
//
GET sur /whoami (Authentification nécessaire): renvoie un document JSON contenant un champ user contenant l’utilisateur reconnu via l’authentification.
//
GET sur /pokemon: renvoie un tableau contenant les pokemons connus par le serveur avec des détails sur chaque pokemon.
//
/******************/
*Connexion:
pouvoir saisir une clé d’API dans un champ de type password, puis permettre de vérifier que cette clé fonctionne en utilisant la route /whoami
La clé est:75fc1848-c67f-4503-96c7-2f218eb0819b

*Affichage de l’ensemble des pokemons du serveur 
*Limitation du nombre de pokemons affichés: l’affichage est limité des pokemons aux 10 premiers pokemons. Un bouton est ajouté qui permet d’augmenter cette limite de 10 pokemons supplémentaires. Un appui répété sur ce bouton permettra d’afficher toujours plus de pokemons. Ajouter également un bouton pour afficher moins de pokemons (10 pokemons de moins à chaque clic, avec une limite minimale à 10 pokemons).
Tri de la table des pokemons:
on clique sur un titre d’une colonne dans la table des pokemons, cette dernière est triée selon cette colonne. Si la colonne cliquée est déjà utilisée pour déterminer l’ordre des lignes de la table, le clic inversera cet ordre. 


 

