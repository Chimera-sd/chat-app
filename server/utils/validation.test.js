const expect = require('expect');
const {isRealString} = require('./validation');

describe('string passing ! ',()=>{
    it('should reject numbers',()=>{
        let numbersTest = isRealString(12346);
        expect(numbersTest).toBe(false);
    })
    it('should reject numbers',()=>{
        let spacesTest = isRealString('        ');
        expect(spacesTest).toBe(false);
    })
    it('should reject numbers',()=>{
        let text = 'this is a text';
        let textTest = isRealString(text);
        expect(textTest).toBe(true);
        expect(text).toBe(text);
    })
})
