const Admin = require('../server/models/models');

describe('Booking user Schema test anything', () => {
    // the code below is for insert testing
    it('Add booking user testing anything', () => {
        const bookingUser = {
            'fname': 'Bibek',
            'lname': 'lama',
            'email': 'bibek@gmail.com'
        };

        return Admin.bookingusr.create(bookingUser)
            .then((pro_ret) => {
                expect(pro_ret.fname).toEqual('Bibek');
                expect(pro_ret.lname).toEqual('lama');
                expect(pro_ret.email).toEqual('bibek@gmail.com');

            });
    });


    it('to test the delete booking user is working or not', async() => {
        const status = await Admin.bookingusr.deleteMany();
        expect(status.ok).toBe(1);
    });


})