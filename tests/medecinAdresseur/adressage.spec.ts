import { test, expect } from '../../fixtures/AuthFixture';
//import { AdressagePage } from '../../pages/AdressagePage';
import { dossierTestData, generateRandomDossier } from '../../data/testData';

test.describe('Medecin adresseur', () => {
  test('Doit adresser un paient', async ({ authenticatedMedecinAdresseur }) => {
   // const adressagePage = new AdressagePage(authenticatedMedecinAdresseur);
    const testData = generateRandomDossier();

   // await adressagePage.createDossier(testData);

    // Ajouter vos assertions ici
    await expect(authenticatedMedecinAdresseur).toHaveURL(/.*mezl\/dossiers.*/);
  
})
});