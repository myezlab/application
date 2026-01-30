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
    verifyRequiredFieldsErrors(responseBody.errors);
    
    console.log('✅ Validation des champs obligatoires réussie');
  });
});



/**
 * Vérifie les erreurs des 4 champs obligatoires
 */
function verifyRequiredFieldsErrors(errors: any) {
  const requiredFields = [
    { field: 'c_user_firstname', expectedMessage: 'Non valide' },
    { field: 'c_user_lastname', expectedMessage: 'Non valide' },
    { field: 'c_user_phone', expectedMessage: 'Non valide' },
    { field: 'c_user_mail', expectedMessage: 'Adresse email non valide' }
  ];

  requiredFields.forEach(({ field, expectedMessage }) => {
    expect(errors[field].isValid).toBe(false);
    expect(errors[field].message).toBe(expectedMessage);
  });
}