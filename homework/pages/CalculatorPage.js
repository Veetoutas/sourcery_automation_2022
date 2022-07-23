let firstField = '#number1Field';
let secondField = '#number2Field';
let calculateButton = '#calculateButton';
let testPage = 'https://testsheepnz.github.io/BasicCalculator';
let buildSelector = '#selectBuild';
let operationSelector = '#selectOperationDropdown';

class CalculatorPage {

    constructor(page) {
        this.page = page;
      }

    async navigate() {
        await this.page.goto(testPage);
    }

    async versionSelect(version) {
        await this.page.selectOption(buildSelector, { label: version});
    }

    async fillNumberFields(firstValue, secondValue) {
        await this.page.locator(firstField).type(firstValue);
        await this.page.locator(secondField).type(secondValue);
    }
    
    async selectOperation(operation) {
        await this.page.selectOption(operationSelector, {label: operation});  
    }

    async calculateResult() {
        await this.page.locator(calculateButton).click();
    }
}

module.exports = { CalculatorPage };