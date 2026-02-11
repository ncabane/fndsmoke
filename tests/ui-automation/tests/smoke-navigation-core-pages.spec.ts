import { test } from '../fixtures';

test('Navigation Core Pages Smoke Test', async ({ common, home, cookies, core }) => {

  //#region actual tests
  // If Funda shows an "I'm not a robot" captcha, stop the smoke test early
  if (await cookies.isRobotCheckVisible()) {
    return;
  } 

  // Expects the main footer to be present
  await common.mainFooterIsPresent();
    
  // Expects the Meld je aan link to be present
  await common.mainFooterMeldJeAanLinkIsPresent();
 
  // Expects the Inloggen link to be present
  await common.mainFooterInloggenLinkIsPresent();
  
  // Expects the Over Funda link to be present
  await common.mainFooterOverFundaLinkIsPresent();

  // Expects the Verkoop je huis link to be present
  await common.mainFooterVerkoopJeHuisLinkPresent();

  // Click on the Verkoop je huis link
  await common.clickOnVerkoopJeHuisLink();

  // Expects the Verkoop je huis h1 heading title to be visible with a correct text
  await core.corePageVerkoopJeHuisHeadingTitleIsVisible();

  //#endregion
});
