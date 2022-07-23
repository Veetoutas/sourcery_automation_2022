// Main repetitive variables
let firstField = '#number1Field';
let secondField = '#number2Field';
let calculateButton = '#calculateButton';
let testPage = 'https://testsheepnz.github.io/BasicCalculator';
let buildSelector = '#selectBuild';
let operationSelector = '#selectOperationDropdown';

// Main Calculator functions
class CalculatorPage {

    constructor(page) {
        this.page = page;
      }

    // goes to Calculator website
    async navigate() {
        await this.page.goto(testPage);
    }

    // Selects Calculator build version
    async versionSelect(version) {
        await this.page.selectOption(buildSelector, { label: version});
    }

    // Fills number fields values
    async fillNumberFields(firstValue, secondValue) {
        await this.page.locator(firstField).type(firstValue);
        await this.page.locator(secondField).type(secondValue);
    }
    
    // Selects operation type
    async selectOperation(operation) {
        await this.page.selectOption(operationSelector, {label: operation});  
    }

    // Clicks the Calculate button
    async calculateResult() {
        await this.page.locator(calculateButton).click();
    }
}

module.exports = { CalculatorPage };