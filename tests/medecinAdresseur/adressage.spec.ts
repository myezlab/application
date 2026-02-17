import { test, expect } from '../../fixtures/AuthFixture';
import { AdressagePage } from '../../pages/adressagePage';
import { generateRandomAdressage } from '../../data/testData';


test.describe('Medecin adresseur', () => {
  let adressagePage: AdressagePage;

   test.beforeEach(async ({ authenticatedMedecinAdresseur }) => {
      adressagePage = new AdressagePage(authenticatedMedecinAdresseur);

      const testData = generateRandomAdressage();
      //await dossierPage.navigateToDossiers();
      await adressagePage.ouvrirFormulaireRecommandation();
      await adressagePage.fillAdressageForm(testData);
      await adressagePage.validerFormulaire();
      await adressagePage.fillSignatureForm(testData);
      await adressagePage.envoyerAdressage();


    });


   
  //

//    // await adressagePage.createDossier(testData);
// tests/medecinAdresseur/adressage.spec.ts
//     // Ajouter vos assertions ici
//     await expect(authenticatedMedecinAdresseur).toHaveURL(/.*mezl\/dossiers.*/);
  
})
