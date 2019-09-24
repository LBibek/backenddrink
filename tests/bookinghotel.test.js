const Admin = require('../server/models/models');

describe('Booking hotel Schema test anything', () => {
    // the code below is for insert testing
    it('Add booking user testing anything', () => {
        const hotel_booking = {
            'adult': '1',
            'children': '2',
            'num_room': '2'
        };


    });


    it('to test the delete booking user is working or not', async() => {
        const status = await Admin.Booking.deleteMany();
        expect(status.ok).toBe(1);
    });


})