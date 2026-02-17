import { test, expect } from '../../fixtures/AuthFixture';
import { ProgrammationPage } from '../../pages/programmationPage';
import { dossierTestData, generateRandomDossier } from '../../data/testData';

test.describe('Medecin - programmation acte', () => {

    let programmationPage : ProgrammationPage;
 
test.beforeEach(async ({ authenticatedMedecin }) => {
      programmationPage = new ProgrammationPage(authenticatedMedecin);

     
  })
      
test('Test de programmation', async () => {
     const testData = generateRandomDossier();

      await programmationPage.navigateToDossiers();
      await programmationPage.clickProgrammationDossier();
      await programmationPage.fillProgrammationForm(testData)
    });      


});





