

// ============================================
// FICHIER 4: pages/RecommandationsPage.ts
// ============================================
import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export interface AdressageData {
  nom: string;
  prenom: string;
  dateNaissance: string;
  telephone: string;
  type_soin: string;
  type_dts: string;
  signature_mail_adressage : string;
 
}

export class AdressagePage extends BasePage {

  private readonly menuExpandIcon = '//div[@class="sidebar-header"]//div[@class="toggle-icon ms-auto"]';
  private readonly recoPatient = '#recoPatient';
  private readonly saveReco = '#saveReco';
  private readonly saveSignature = '#saveSignature';

  private readonly fields = {
    nom: '#user_lastname',
    prenom: '#user_firstname',
    telephone: '#user_phone',
    type_soin: '#pi_type_soin',
    type_dts: '#pi_type_dts',
    signature_mail_adressage: '#signature_mail_adressage',
    
  };

  constructor(page: Page) {
    super(page);
  }
  // async agrandirMenu() {
  //   console.log('📂 Agrandissement du menu...');
  //  // Attendre que l'icône soit visible
  //   await this.page.waitForSelector(this.menuExpandIcon, { state: 'visible' });
    
  //   // Cliquer sur la div toggle-icon
  //   await this.page.click(this.menuExpandIcon);
    
  //   // Attendre que l'animation du menu soit terminée
  //   await this.page.waitForTimeout(500);
  //   console.log('✅ Menu agrandi');
  // }
  /**
 * Agrandit le menu latéral en cliquant sur l'icône toggle
 */
async agrandirMenu() {
  console.log('📂 Agrandissement du menu...');
  
  // Attendre que le sidebar soit chargé
  await this.page.waitForSelector('.sidebar-header', { state: 'visible' });
  
  // Utiliser JavaScript pour cliquer directement
  await this.page.evaluate(() => {
    const toggleIcon = document.querySelector('.sidebar-header .toggle-icon');
    if (toggleIcon) {
      (toggleIcon as HTMLElement).click();
    }
  });
  
  // Attendre que l'animation soit terminée
  await this.page.waitForTimeout(800);
  
  console.log('✅ Menu agrandi');
}
  async ouvrirFormulaireRecommandation() {

      await this.agrandirMenu();
    // Attendre que le bouton soit visible et cliquable
    await this.page.waitForSelector(this.recoPatient, { state: 'visible' });
    await this.page.click(this.recoPatient);
    
    // Attendre que le formulaire de création apparaisse
    await this.page.waitForSelector(this.fields.nom, { state: 'visible' });
   
    
    //await this.page.click(this.recoPatient);
    
  }

  async validerFormulaire(){
    await this.page.click(this.saveReco);
  }

    async envoyerAdressage(){

    await this.page.click(this.saveSignature);
  }
  
  async fillAdressageForm(data: AdressageData){
    console.log('📝 Remplissage du formulaire...');

    await this.page.fill(this.fields.nom, data.nom)
    await this.page.fill(this.fields.prenom, data.prenom);
    await this.page.fill(this.fields.telephone, data.telephone);
    await this.page.selectOption('#pi_type_soin', { label: data.type_soin });
    await this.page.selectOption('#pi_type_dts', { label: data.type_dts });
   
    
    console.log('✅ Formulaire rempli');
  

  }

  async fillSignatureForm(data: AdressageData){
    console.log('📝 Page signature...');

    await this.page.fill(this.fields.signature_mail_adressage, data.signature_mail_adressage);
     
    console.log('✅ Signé');
  }
  
 


}