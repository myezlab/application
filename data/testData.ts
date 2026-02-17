import { DossierData } from '../pages/dossierPage';
import { AdressageData } from '../pages/adressagePage';

export const dossierTestData: DossierData = {
  nom: 'Dupont',
  prenom: 'Jean',
  dateNaissance: '1980-01-01', // Format ISO pour input type="date"
  telephone: '0612345678',
  email: 'jean.dupont@example.com',
  adresse: '123 Rue de la Paix',
  ville: 'Paris',
  cp: 75001,
  regime: 'Régime général',
  taille: 175,
  poids: 75,
  sexe: 'M'
};

export const generateRandomDossier = (): DossierData => ({
  nom: `Test${Math.floor(Math.random() * 10000)}`,
  prenom: `Prenom${Math.floor(Math.random() * 10000)}`,
  dateNaissance: '1990-06-15', // Format ISO pour input type="date"
  telephone: `06${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
  email: `test${Math.floor(Math.random() * 10000)}@example.com`,
  adresse: `${Math.floor(Math.random() * 200)} Rue Test`,
  ville: 'Lyon',
  cp: 69001,
  regime: 'Régime général',
  taille: 170,
  poids: 70,
  sexe: 'F'
});



export const adressageTestData: AdressageData = {
  nom: 'Dupont',
  prenom: 'Jean',
  dateNaissance: '1980-01-01',
  telephone: '0612345678',
  type_soin: 'Diagnostic troubles du Sommeil',
  type_dts: 'Suspicion de troubles respiratoires du sommeil',
  signature_mail_adressage: 'A USSET'
};

export const generateRandomAdressage = (): AdressageData => ({
  nom: `Test${Math.floor(Math.random() * 10000)}`,
  prenom: `Prenom${Math.floor(Math.random() * 10000)}`,
  dateNaissance: '1990-06-15',
  telephone: `06${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
  type_soin: 'Diagnostic troubles du Sommeil',
  type_dts: 'Suspicion de troubles respiratoires du sommeil',
  signature_mail_adressage: 'A USSET'
});