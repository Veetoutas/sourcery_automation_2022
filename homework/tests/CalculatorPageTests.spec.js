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


  test.describe(version + ': Integers Only checkbox and description', () => {

      test('Choosing Concatenate operation should hide Integers Only checkbox and description', async ({ page }) => {
        let calculatorPage = new CalculatorPage(page);
        await calculatorPage.navigate();
        await calculatorPage.versionSelect(version);
        await calculatorPage.selectOperation('Concatenate');
        await expect(page.locator(('label[id=intSelectionLabel]') && ('input[id=integerSelect]') ), 'Integers checkbox is still enabled').toBeHidden();
      });

      test('Integers Only field should be enabled except for Concatenate operation', async ({ page }) => {
        let calculatorPage = new CalculatorPage(page);
        await calculatorPage.navigate();
        await calculatorPage.versionSelect(version);
        await calculatorPage.selectOperation('Add');
        await expect(page.locator(('label[id=intSelectionLabel]') && ('input[id=integerSelect]') ), 'Integers Only checkbox and description is disabled').toBeEnabled();
      });
    });

  test.describe(version + ': Error message', () => {
    test('Adding not an integer or a float should display an error message except for Concatanate opreation', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.navigate();
      await calculatorPage.versionSelect(version);
      await calculatorPage.fillNumberFields('a', '4.2');
      await calculatorPage.selectOperation('Add');
      await calculatorPage.calculateResult();
      await expect(page.locator('label[id=errorMsgField]'), 'No error message displayed.').not.toBeEmpty();
    });
  });

  test.describe(version + ': Concatenate', () => {

    test('Concatenating a and b should result in ab', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.navigate();
      await calculatorPage.versionSelect(version);
      await calculatorPage.fillNumberFields('a', 'b');
      await calculatorPage.selectOperation('Concatenate');
      await calculatorPage.calculateResult();
      await expect(page.locator('#numberAnswerField'), 'Incorrect answer. It should be "ab"').toHaveValue('ab');
    });

    test('Concatenating 3 and 4 should result in 34', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.navigate();
      await calculatorPage.versionSelect(version);
      await calculatorPage.fillNumberFields('3', '4');
      await calculatorPage.selectOperation('Concatenate');
      await calculatorPage.calculateResult();
      await expect(page.locator('#numberAnswerField'), 'Incorrect answer. It should be "34"').toHaveValue('34');
    });
  });

  test.describe(version + ': Add', () => {
    test('Adding 3 and 4 should result in 7', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.navigate();
      await calculatorPage.versionSelect(version);
      await calculatorPage.fillNumberFields('3', '4');
      await calculatorPage.selectOperation('Add');
      await calculatorPage.calculateResult();
      await expect(page.locator('#numberAnswerField'), 'The answer is incorrect. It should be 7').toHaveValue('7');
    });
  });

  test.describe(version + ': Subtract', () => {
    test('Subtracting 5 and 2 should result in 3', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.navigate();
      await calculatorPage.versionSelect(version);
      await calculatorPage.fillNumberFields('5', '2');
      await calculatorPage.selectOperation('Subtract');
      await calculatorPage.calculateResult();
      await expect(page.locator('#numberAnswerField'), 'The answer is incorrect. It should be 3').toHaveValue('3');
    });
  });

  test.describe(version + ': Multiply', () => {
    test('Multiplying 5 and 2 should result in 10', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.navigate();
      await calculatorPage.versionSelect(version);
      await calculatorPage.fillNumberFields('5', '2');
      await calculatorPage.selectOperation('Multiply');
      await calculatorPage.calculateResult();
      await expect(page.locator('#numberAnswerField'), 'The answer is incorrect. It should be 10').toHaveValue('10');
    });
  });

  test.describe(version + ': Divide', () => {

    test('Dividing 5 and 2 should result in 2.5', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.navigate();
      await calculatorPage.versionSelect(version);
      await calculatorPage.fillNumberFields('5', '2');
      await calculatorPage.selectOperation('Divide');
      await calculatorPage.calculateResult();
      await expect(page.locator('#numberAnswerField'), 'The answer is incorrect. It should be 2.5').toHaveValue('2.5');
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