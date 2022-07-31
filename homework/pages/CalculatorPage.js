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
}

module.exports = { CalculatorPage };