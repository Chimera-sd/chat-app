const expect = require('expect');
const {genrateMessage , genrateLocationMessage} = require('./message');

describe('Genrate Message',()=>{
    it('should genrate new message',()=>{
        let from = 'admin',
            text = 'this is a message',
            message = genrateMessage(from,text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from , text});
    });
    it('should give location 1,1 ',()=>{
        let from = 'Admin',
            lat = 1,
            long = 1,
            link = 'https://www.google.com/maps?q=1,1',
            message = genrateLocationMessage(from,lat,long);
        expect(typeof message.link).toBe('string');
        expect(message).toMatchObject({from,link})
    })
})