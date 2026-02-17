import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export interface ProgrammationData {
  acte: string;
 
}

export class ProgrammationPage extends BasePage {

  private readonly programmationButton = 'a[href="#programmationrdv"]';
  private readonly actionButton = '#btPreprogActe'
  private readonly diagRadio = '#diagRadio';


  private readonly fields = {
    acte: '#acte_select1',
       
  };

  constructor(page: Page) {
    super(page);
  }

  async navigateToDossiers() {
        console.log('📝 Se rendre au dossier...');
        await this.goto('/mezl/dossiers/10000');
         
        // Attendre que la page soit complètement chargée
        await this.page.waitForLoadState('networkidle');
        console.log('✅ Sur dossier');
  }

  async clickProgrammationDossier() {
        console.log('📝 Allez à programmer...');
        await this.page.click(this.programmationButton);
        await this.page.click(this.actionButton);
        await this.page.click(this.diagRadio);
        
        
        console.log('✅ Sur programmer');

  }
  async fillProgrammationForm(data : ProgrammationData ){
        await this.page.selectOption('#acte_select1', { label: data.acte });


  }

}