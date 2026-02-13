import { test, expect } from '../../fixtures/AuthFixture';
import { AdressagePage } from '../../pages/adressagePage';
import { dossierTestData, generateRandomDossier } from '../../data/testData';

test.describe('Medecin adresseur', () => {
  let adressagePage: AdressagePage;

   test.beforeEach(async ({ authenticatedMedecinAdresseur }) => {
      adressagePage = new AdressagePage(authenticatedMedecinAdresseur);
      //await dossierPage.navigateToDossiers();
      await adressagePage.ouvrirFormulaireRecommandation();
    });

   test('Doit adresser un patient', async ({ authenticatedMedecinAdresseur }) => {

   });
   
  //

//    // await adressagePage.createDossier(testData);
// tests/medecinAdresseur/adressage.spec.ts
//     // Ajouter vos assertions ici
//     await expect(authenticatedMedecinAdresseur).toHaveURL(/.*mezl\/dossiers.*/);
  
})
