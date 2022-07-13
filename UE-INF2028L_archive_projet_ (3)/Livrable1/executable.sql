CREATE TABLE JARDIN(
   IdJ INT,
   NoM VARCHAR(200),
   Surface DECIMAL(15,2),
   PRIMARY KEY(IdJ)
);

CREATE TABLE potager(
   Id_potager INT,
   type_Sol VARCHAR(200),
   PRIMARY KEY(Id_potager)
);

CREATE TABLE verger(
   Id_verger INT,
   hauteurMax DECIMAL(15,2),
   PRIMARY KEY(Id_verger)
);

CREATE TABLE ornement(
   Id_ornement INT,
   PRIMARY KEY(Id_ornement)
);

CREATE TABLE Parcelles(
   Id_Parcelles INT,
   Coordonées VARCHAR(50),
   Dimension VARCHAR(50),
   IdJ INT NOT NULL,
   PRIMARY KEY(Id_Parcelles),
   FOREIGN KEY(IdJ) REFERENCES JARDIN(IdJ)
);

CREATE TABLE Rang(
   Id_Rang INT,
   Num INT NOT NULL,
   coordonéées VARCHAR(50),
   Id_Parcelles INT NOT NULL,
   PRIMARY KEY(Id_Rang),
   FOREIGN KEY(Id_Parcelles) REFERENCES Parcelles(Id_Parcelles)
);

CREATE TABLE Plante(
   Id_Plante INT NOT NULL AUTO_INCREMENT,
   nomEspèce VARCHAR(200),
   nomEspèceLatin VARCHAR(200),
   Catégorie VARCHAR(200),
   type VARCHAR(200),
   sous_Type VARCHAR(200),
   PRIMARY KEY(Id_Plante)
);

CREATE TABLE Variété(
   codeVariété VARCHAR(200),
   Nom_v VARCHAR(200),
   codePrécocité VARCHAR(200),
   labelPrécocité VARCHAR(200),
   description_semis TEXT,
   plantation VARCHAR(200),
   Entretien VARCHAR(200),
   récolte VARCHAR(200),
   NbJourlevée INT,
   annéeEnregistrement VARCHAR(200),
   période_récolte VARCHAR(200),
   commentaire TEXT,
   Id_Plante INT NOT NULL AUTO_INCREMENT,
   PRIMARY KEY(codeVariété),
   FOREIGN KEY(Id_Plante) REFERENCES Plante(Id_Plante)
);

CREATE TABLE Semencier(
   Id_Semencier INT,
   Nom_s VARCHAR(50),
   Site_web VARCHAR(50),
   PRIMARY KEY(Id_Semencier)
);

CREATE TABLE Menace(
   Id_Menace INT,
   Description TEXT,
   solutions TEXT,
   PRIMARY KEY(Id_Menace)
);

CREATE TABLE Récolte(
   Id_Récolte INT,
   Quantité_produite VARCHAR(50),
   Qualité_gust VARCHAR(50),
   Commentaire TEXT,
   PRIMARY KEY(Id_Récolte)
);

CREATE TABLE type(
   IdJ INT,
   Id_ornement INT,
   Id_verger INT,
   Id_potager INT,
   PRIMARY KEY(IdJ, Id_ornement, Id_verger, Id_potager),
   FOREIGN KEY(IdJ) REFERENCES JARDIN(IdJ),
   FOREIGN KEY(Id_ornement) REFERENCES ornement(Id_ornement),
   FOREIGN KEY(Id_verger) REFERENCES verger(Id_verger),
   FOREIGN KEY(Id_potager) REFERENCES potager(Id_potager)
);

CREATE TABLE Produite(
   codeVariété VARCHAR(200),
   Id_Semencier INT,
   PRIMARY KEY(codeVariété, Id_Semencier),
   FOREIGN KEY(codeVariété) REFERENCES Variété(codeVariété),
   FOREIGN KEY(Id_Semencier) REFERENCES Semencier(Id_Semencier)
);

CREATE TABLE Occupée(
   Id_Rang INT,
   codeVariété VARCHAR(200),
   Type_mise_en_place VARCHAR(50),
   PRIMARY KEY(Id_Rang, codeVariété),
   FOREIGN KEY(Id_Rang) REFERENCES Rang(Id_Rang),
   FOREIGN KEY(codeVariété) REFERENCES Variété(codeVariété)
);

CREATE TABLE Association(
   Id_Plante INT NOT NULL AUTO_INCREMENT,
   Id_Plante_1 INT,
   Béfénfique_ TEXT,
   Inconvénient text,
   PRIMARY KEY(Id_Plante, Id_Plante_1),
   FOREIGN KEY(Id_Plante) REFERENCES Plante(Id_Plante),
   FOREIGN KEY(Id_Plante_1) REFERENCES Plante(Id_Plante)
);

CREATE TABLE Subir(
   Id_Plante INT NOT NULL AUTO_INCREMENT,
   Id_Menace INT,
   PRIMARY KEY(Id_Plante, Id_Menace),
   FOREIGN KEY(Id_Plante) REFERENCES Plante(Id_Plante),
   FOREIGN KEY(Id_Menace) REFERENCES Menace(Id_Menace)
);

CREATE TABLE Recolté(
   Id_Rang INT,
   codeVariété VARCHAR(200),
   Id_Récolte INT,
   PRIMARY KEY(Id_Rang, codeVariété, Id_Récolte),
   FOREIGN KEY(Id_Rang) REFERENCES Rang(Id_Rang),
   FOREIGN KEY(codeVariété) REFERENCES Variété(codeVariété),
   FOREIGN KEY(Id_Récolte) REFERENCES Récolte(Id_Récolte)
);
