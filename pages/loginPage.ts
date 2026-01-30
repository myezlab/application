import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { users, UserRole } from '../config/userConfig';

export class LoginPage extends BasePage {
  private readonly formSelector = '#form-connect-patient';
  private readonly emailInput = '[name="login_user_mail"]';
  private readonly passwordInput = '[name="login_access_password"]';
  private readonly submitButton = '#connectPatient';

  constructor(page: Page) {
    super(page);
  }

 
  async login(role: UserRole) {
  const user = users[role];
  
  // ✅ C'est maintenant dynamique - utilise user.defaultPage
  await this.goto(user.defaultPage);
  
  await this.page.locator(this.formSelector).waitFor();
   
    
    await this.page.fill(this.emailInput, user.email);
    await this.page.fill(this.passwordInput, user.password);
    await this.page.click(this.submitButton);
    
    await this.waitForNavigation();
  }
}
