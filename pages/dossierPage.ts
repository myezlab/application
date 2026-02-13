import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';


export interface DossierData {
  nom: string;
  prenom: string;
  dateNaissance: string;
  telephone: string;
  email: string;
  adresse: string;
  ville: string;
  cp: number;
  regime: string;
  taille: number;
  poids: number;
  sexe: string;
}

export class DossierPage extends BasePage {
  private readonly createButton = '#createDossier';
  private readonly submitButton = '#createDossierBt';
  
  private readonly fields = {
    nom: '#c_user_firstname',
    prenom: '#c_user_lastname',
    dateNaissance: '#c_patient_birthdate',
    telephone: '#c_user_phone',
    email: '#c_user_mail',
    adresse: '#c_user_adress',
    ville: '#c_user_ville',
    cp: '#c_user_zipcode',
    regime: '#c_patient_regime_al',
    taille: '#c_patient_taille',
    poids: '#c_patient_poids',
    sexe: '#c_patient_sexe'
  };

  constructor(page: Page) {
    super(page);
  }

  async navigateToDossiers() {
    await this.goto('/mezl/dossiers');
    // Attendre que la page soit complètement chargée
    await this.page.waitForLoadState('networkidle');
  }

  async clickCreateDossier() {
    // Attendre que le bouton soit visible et cliquable
    await this.page.waitForSelector(this.createButton, { state: 'visible' });
    await this.page.click(this.createButton);
    
    // Attendre que le formulaire de création apparaisse
    await this.page.waitForSelector(this.fields.nom, { state: 'visible' });
  }

  async fillDossierForm(data: DossierData) {
    console.log('📝 Remplissage du formulaire...');
    
    await this.page.fill(this.fields.nom, data.nom);
    await this.page.fill(this.fields.prenom, data.prenom);
    await this.page.fill(this.fields.dateNaissance, data.dateNaissance);
    await this.page.fill(this.fields.telephone, data.telephone);
    await this.page.fill(this.fields.email, data.email);
    await this.page.fill(this.fields.adresse, data.adresse);
    await this.page.fill(this.fields.ville, data.ville);
    await this.page.fill(this.fields.cp, data.cp.toString());
    await this.page.fill(this.fields.regime, data.regime);
    await this.page.fill(this.fields.taille, data.taille.toString());
    await this.page.fill(this.fields.poids, data.poids.toString());
   // await this.page.fill(this.fields.sexe, data.sexe);
    
    console.log('✅ Formulaire rempli');
  }

  async submitDossier() {
    console.log('💾 Clic sur Enregistrer...');
    await this.page.click(this.submitButton);
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Dossier créé avec succès');
  }

  async createDossier(data: DossierData) {
    await this.navigateToDossiers();
    await this.clickCreateDossier();
    await this.fillDossierForm(data);
    await this.submitDossier();
  }

 async submitEmptyDossierAndCaptureResponse() {
  const [response] = await Promise.all([
    this.page.waitForResponse(
      response => response.url().includes('dossier') && response.request().method() === 'POST',
      { timeout: 10000 }
    ),
    this.page.click('#createDossierBt')
  ]);
  return response;
}

async verifyRequiredFieldsErrors(errors: any) {
    const requiredFields = [
      { field: 'c_user_firstname', expectedMessage: 'Non valide' },
      { field: 'c_user_lastname', expectedMessage: 'Non valide' },
      { field: 'c_user_phone', expectedMessage: 'Non valide' },
      { field: 'c_user_mail', expectedMessage: 'Adresse email non valide' }
    ];

    for (const { field, expectedMessage } of requiredFields) {
      expect(errors[field].isValid).toBe(false);
      expect(errors[field].message).toBe(expectedMessage);
    }
  }

}
