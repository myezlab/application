import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { UserRole } from '../config/userConfig';

type AuthFixtures = {
  authenticatedCoordinatrice: Page;
  authenticatedMedecin: Page;
  authenticatedMedecinAdresseur: Page;
  authenticatedPatient: Page;
  loginAs: (role: UserRole) => Promise<Page>;
};

export const test = base.extend<AuthFixtures>({
  authenticatedCoordinatrice: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('coordinatrice');
    await use(page);
  },

  authenticatedMedecin: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('medecin');
    await use(page);
  },

  authenticatedMedecinAdresseur: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('medecinAdresseur');
    await use(page);
  },

  authenticatedPatient: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('patient');
    await use(page);
  },

  loginAs: async ({ page }, use) => {
    const login = async (role: UserRole) => {
      const loginPage = new LoginPage(page);
      await loginPage.login(role);
      return page;
    };
    await use(login);
  }
});

export { expect } from '@playwright/test';