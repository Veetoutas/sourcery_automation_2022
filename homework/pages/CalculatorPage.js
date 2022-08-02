const { test, expect } = require('@playwright/test');

// Main repetitive variables
let firstFieldSelector = '#number1Field';
let secondFieldSelector = '#number2Field';
let calculateButtonSelector = '#calculateButton';
let testPageUrl = 'https://testsheepnz.github.io/BasicCalculator';
let buildSelector = '#selectBuild';
let operationSelector = '#selectOperationDropdown';

// Main Calculator functions
class CalculatorPage {

    constructor(page) {
        this.page = page;
      }

    async navigate() {
        await this.page.goto(testPageUrl);
    }

    async versionSelect(version) {
        await this.page.selectOption(buildSelector, { label: version});
    }

    async fillNumberFields(firstValue, secondValue) {
        await this.page.locator(firstFieldSelector).type(firstValue);
        await this.page.locator(secondFieldSelector).type(secondValue);
    }
    
    async selectOperation(operation) {
        await this.page.selectOption(operationSelector, {label: operation});  
    }

    async calculateResult() {
        await this.page.locator(calculateButtonSelector).click();
    }

    async checkIntegerFieldsToBeEnabled() {
        await this.selectOperation('Add');
        await expect.soft(this.page.locator('label[id=intSelectionLabel]'), 'Label of Integers Only is disabled').toBeEnabled();
        await expect.soft(this.page.locator('input[id=integerSelect]' ), 'Integers Only checkbox is disabled').toBeEnabled();

        await this.selectOperation('Subtract');
        await expect.soft(this.page.locator('label[id=intSelectionLabel]'), 'Label of Integers Only is disabled').toBeEnabled();
        await expect.soft(this.page.locator('input[id=integerSelect]' ), 'Integers Only checkbox is disabled').toBeEnabled();

        await this.selectOperation('Multiply');
        await expect.soft(this.page.locator('label[id=intSelectionLabel]'), 'Label of Integers Only is disabled').toBeEnabled();
        await expect.soft(this.page.locator('input[id=integerSelect]' ), 'Integers Only checkbox is disabled').toBeEnabled();

        await this.selectOperation('Divide');
        await expect.soft(this.page.locator('label[id=intSelectionLabel]'), 'Label of Integers Only is disabled').toBeEnabled();
        await expect.soft(this.page.locator('input[id=integerSelect]' ), 'Integers Only checkbox is disabled').toBeEnabled();

        expect(test.info().errors).toHaveLength(0);
    }

    async checkIfErrorMessageIsDisplayed(firstValue, secondValue, version) {
        await this.versionSelect(this.version);
        await this.fillNumberFields(firstValue, secondValue)
        await this.selectOperation('Add');
        await this.calculateResult();
        
        if (this.page.locator(firstFieldSelector) || this.page.locator(secondFieldSelector) instanceof String) {
            await expect.soft(this.page.locator('label[id=errorMsgField]'), 'No error message displayed for Add operation in build ' + version + '.').not.toBeEmpty();
        }
        else {
            expect(test.info().errors).toHaveLength(0);
        }

        await this.selectOperation('Subtract');
        await this.calculateResult();

        if (this.page.locator(firstFieldSelector) || this.page.locator(secondFieldSelector) instanceof String) {
            await expect.soft(this.page.locator('label[id=errorMsgField]'), 'No error message displayed for Subtract operation in build ' + version + '.').not.toBeEmpty();
        }
        else {
            expect(test.info().errors).toHaveLength(0);
        }

        await this.selectOperation('Multiply');
        await this.calculateResult();

        if (this.page.locator(firstFieldSelector) || this.page.locator(secondFieldSelector) instanceof String) {
            await expect.soft(this.page.locator('label[id=errorMsgField]'), 'No error message displayed for Multiply operation in build ' + version + '.').not.toBeEmpty();
        }
        else {
            expect(test.info().errors).toHaveLength(0);
        }

        await this.selectOperation('Divide');
        await this.calculateResult();

        if (this.page.locator(firstFieldSelector) || this.page.locator(secondFieldSelector) instanceof String) {
            await expect.soft(this.page.locator('label[id=errorMsgField]'), 'No error message displayed for Divide operation in build ' + version + '.').not.toBeEmpty();
        }
        else {
            expect(test.info().errors).toHaveLength(0);
        }
    }
    
    async concatenateFieldValues(firstValue, secondValue) {
        await this.fillNumberFields(firstValue, secondValue);
        await this.selectOperation('Concatenate');
        await this.calculateResult();
        await expect(this.page.locator('#numberAnswerField'), 'Incorrect answer. It should be ' + firstValue + '' + secondValue + '.').toHaveValue(firstValue + secondValue);
    }

    async assertAnswerValue(expectedValue) {
        await expect(this.page.locator('#numberAnswerField'), 'The answer is incorrect.').toHaveValue(expectedValue);
    }

    async doSelectedOperationWithProvidedValues(firstValue, secondValue, operationName, expectedValue) {
        await this.navigate();
        await this.versionSelect(this.version);
        await this.fillNumberFields(firstValue, secondValue);
        await this.selectOperation(operationName);
        await this.calculateResult();
        await this.assertAnswerValue(expectedValue);
    }


}

module.exports = { CalculatorPage };