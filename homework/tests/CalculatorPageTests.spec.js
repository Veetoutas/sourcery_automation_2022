// @ts-check
const { test, expect } = require('@playwright/test');
const { CalculatorPage } = require('../pages/CalculatorPage');

const data = [
  'Prototype',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
]

data.forEach(version => {

    test.describe(version + ': Calculate button', () => {
      test('Calculate button should always be enabled', async ({ page }) => {
        let calculatorPage = new CalculatorPage(page);
        await calculatorPage.navigate();
        await calculatorPage.versionSelect(version);
        await expect(page.locator('#calculateButton'), 'Should be enabled').toBeEnabled();
      });
    });

  test.describe(version + ': Clear button', () => {

    test('Pressing Clear button should clear the answer field', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.navigate();
      await calculatorPage.versionSelect(version);
      await calculatorPage.fillNumberFields('5', '2');
      await calculatorPage.selectOperation('Add');
      await calculatorPage.calculateResult();
      await page.locator('#clearButton').click();
      await expect(page.locator('#numberAnswerField'), 'Answer field should be cleared').toBeEmpty();
    });

    test('Clear button should always be enabled', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.navigate();
      await calculatorPage.versionSelect(version);
      await expect(page.locator('#clearButton'), 'Clear button is disabled').toBeEnabled();
    });
  });

  test.describe(version + ': Integers Only checkbox and label', () => {

      test('Choosing Concatenate operation should hide Integers Only checkbox and description', async ({ page }) => {
        let calculatorPage = new CalculatorPage(page);
        await calculatorPage.navigate();
        await calculatorPage.versionSelect(version);
        await calculatorPage.selectOperation('Concatenate');
        await expect.soft(page.locator('label[id=intSelectionLabel]'), 'Label of Integers checkbox is still enabled').toBeHidden();
        await expect.soft(page.locator('input[id=integerSelect]'), 'Integers checkbox is still enabled').toBeHidden();
        expect(test.info().errors).toHaveLength(0);
      });

      test('All operations except Concatenate should always have "Integers Only" field enabled', async ({ page }) => {
        let calculatorPage = new CalculatorPage(page);
        await calculatorPage.navigate();
        await calculatorPage.versionSelect(version);
        await calculatorPage.checkIntegerFieldsToBeEnabled()
      });
    });

  test.describe(version + ': Error message', () => {
    test('All operations with a string (except Concatenate) should not be allowed and display an error message', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.navigate();
      await calculatorPage.versionSelect(version);
      await calculatorPage.checkIfErrorMessageIsDisplayed('a', '3.2', version)
    });
  });

  test.describe(version + ': Concatenate', () => {
    test('Concatenating field values should connect them as a string', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.doSelectedOperationWithProvidedValues('a', 'b', 'Concatenate', 'ab');
    });
  });

  test.describe(version + ': Add', () => {
    test('Addition of integers should give us the right expected answer', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.doSelectedOperationWithProvidedValues('5', '2', 'Add', '7');
    });
  });

  test.describe(version + ': Subtract', () => {
    test('Subtracting integers should give us the right expected answer', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.doSelectedOperationWithProvidedValues('5', '2', 'Subtract', '3');
    });
  });

  test.describe(version + ': Multiply', () => {
    test('Multiplying integers should give us the right expected answer', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.doSelectedOperationWithProvidedValues('5', '2', 'Multiply', '10');
    });
  });

  test.describe(version + ': Divide', () => {
    test('Dividing integers should give us the right expected answer', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.doSelectedOperationWithProvidedValues('5', '2', 'Divide', '2.5');
    });

    test('Division by zero should not be allowed and should display an error message', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.navigate();
      await calculatorPage.versionSelect(version);
      await calculatorPage.fillNumberFields('5', '0');
      await calculatorPage.selectOperation('Divide');
      await calculatorPage.calculateResult();
      await expect(page.locator('label[id=errorMsgField]'), 'Division should not be allowed. Error message should be displayed').not.toBeEmpty();
    });
  });
});