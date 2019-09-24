const Admin = require('../server/models/models');

describe('adding location Schema test', () => {
    // the code below is for insert testing
    it('Add location testing anything', () => {
        const location = {
            'district': 'Bibek',
            'category': 'gg',
            'tourism_area': 't1'
        };

        return Admin.Location.create(location)
            .then((pro_ret) => {
                expect(pro_ret.district).toEqual('Bibek');
                expect(pro_ret.category).toEqual('gg');
                expect(pro_ret.tourism_area).toEqual('t1');

            });
    });


    it('to test the delete location user is working or not', async() => {
        const status = await Admin.Location.deleteMany();
        expect(status.ok).toBe(1);
    });


})