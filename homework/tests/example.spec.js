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

    // Calculate button visibility
    test.describe(version + ': Calculate button', () => {
      test('Calculate button should always be enabled', async ({ page }) => {
        let calculatorPage = new CalculatorPage(page);
        await calculatorPage.navigate();
        await calculatorPage.versionSelect(version);
        await expect(page.locator('#calculateButton'), 'Should be enabled').toBeEnabled();
      });
    });

  // Clear button functionality
  test.describe(version + ': Clear button', () => {
    // Clearing the answer field
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

    // Clear button visibility
    test('Clear button should always be enabled', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.navigate();
      await calculatorPage.versionSelect(version);
      await expect(page.locator('#clearButton'), 'Clear button is disabled').toBeEnabled();
    });
  });

  // Integer checkbox
  test.describe(version + ': Integers Only checkbox and description', () => {
    // Choosing Concatinate option should make Integers Only checkbox and description disappear 
      test('Choosing Concatenate operation should hide Integers Only checkbox and description', async ({ page }) => {
        let calculatorPage = new CalculatorPage(page);
        await calculatorPage.navigate();
        await calculatorPage.versionSelect(version);
        await calculatorPage.selectOperation('Concatenate');
        await expect(page.locator(('label[id=intSelectionLabel]') && ('input[id=integerSelect]') ), 'Integers checkbox is still enabled').toBeHidden();
      });

      // Integer Only checkbox should be enabled to all options except Concatenate
      test('Integers Only field should be enabled except for Concatenate operation', async ({ page }) => {
        let calculatorPage = new CalculatorPage(page);
        await calculatorPage.navigate();
        await calculatorPage.versionSelect(version);
        await calculatorPage.selectOperation('Add');
        await expect(page.locator(('label[id=intSelectionLabel]') && ('input[id=integerSelect]') ), 'Integers Only checkbox and description is disabled').toBeEnabled();
      });
    });

  // Error message appearance when adding a string to an integer or a float
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

  // Concatenate functionality
  test.describe(version + ': Concatenate', () => {
    // Concatenating strings
    test('Concatenating a and b should result in ab', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.navigate();
      await calculatorPage.versionSelect(version);
      await calculatorPage.fillNumberFields('a', 'b');
      await calculatorPage.selectOperation('Concatenate');
      await calculatorPage.calculateResult();
      await expect(page.locator('#numberAnswerField'), 'Incorrect answer. It should be "ab"').toHaveValue('ab');
    });

    // Concatenating integers
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

  // Add functionality
  test.describe(version + ': Add', () => {
    // Adding integers
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

  // Subtract functionality
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

  // Multiply functionality
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

  // Division functionality
  test.describe(version + ': Divide', () => {
    // Basic division
    test('Dividing 5 and 2 should result in 2.5', async ({ page }) => {
      let calculatorPage = new CalculatorPage(page);
      await calculatorPage.navigate();
      await calculatorPage.versionSelect(version);
      await calculatorPage.fillNumberFields('5', '2');
      await calculatorPage.selectOperation('Divide');
      await calculatorPage.calculateResult();
      await expect(page.locator('#numberAnswerField'), 'The answer is incorrect. It should be 2.5').toHaveValue('2.5');
    });

    // Division by zero
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