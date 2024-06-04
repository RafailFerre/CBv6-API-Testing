//const { expect } = require('chai');
import { expect } from 'chai';

describe('TESTS', () => {
    it('Verify math sum', () => {
        expect(1 + 2).to.equal(3);
        console.log('Verify math sum'.red)
    });
    it('Verify math div', () => {
        expect(8 / 2).to.equal(4);
        console.log('Verify math div'.blue)
    });
    it('Verify math multiply', () => {
        expect(5 * 2).to.equal(10);
        console.log('Verify math multiply'.green)
    });
});
