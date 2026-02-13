import { test, expect } from '../../fixtures/AuthFixture';
import { DossierPage } from '../../pages/dossierPage';
import { dossierTestData, generateRandomDossier } from '../../data/testData';

test.describe('Coordinatrice - Création de dossier', () => {
  let dossierPage: DossierPage;

 
  test.beforeEach(async ({ authenticatedCoordinatrice }) => {
    dossierPage = new DossierPage(authenticatedCoordinatrice);
    //await dossierPage.navigateToDossiers();
    await dossierPage.clickCreateDossier();
  });

  test('Doit créer un nouveau dossier avec les données valides', async ({ authenticatedCoordinatrice }) => {
    const testData = generateRandomDossier();

    await dossierPage.fillDossierForm(testData);
    await dossierPage.submitDossier();

    await expect(authenticatedCoordinatrice).toHaveURL(/.*mezl\/dossiers.*/);
  });

  test('Doit valider les champs obligatoires (nom, prénom, téléphone, email)', async ({ authenticatedCoordinatrice }) => {
    const response = await dossierPage.submitEmptyDossierAndCaptureResponse();
    const responseBody = await response.json();
    
    console.log('📦 Réponse:', responseBody);
    
    // Vérification globale
    expect(responseBody.result).toBe('ko');
    expect(responseBody.message).toBe("Vérifiez d'avoir bien rempli tous les champs");
    
    // Vérification des champs obligatoires avec helper
    await dossierPage.verifyRequiredFieldsErrors(responseBody.errors);
    
    console.log('✅ Validation des champs obligatoires réussie');
  });
});



