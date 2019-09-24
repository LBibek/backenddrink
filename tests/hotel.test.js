const Admin = require('../server/models/models');

describe('adding hotel Schema test anything', () => {
    // the code below is for insert testing
    it('Add hotel testing anything', () => {
        const hotel = {
            'hotel_name': 'Bibek'
        };

        return Admin.Hotel.create(hotel)
            .then((pro_ret) => {
                expect(pro_ret.hotel_name).toEqual('Bibek');
                // expect(pro_ret.contact).toEqual('Bibek');
            });
    });


    it('to test the delete hotel is working or not', async() => {
        const status = await Admin.Hotel.deleteMany();
        expect(status.ok).toBe(1);
    });


})