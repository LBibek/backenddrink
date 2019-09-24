const Admin = require('../server/models/models');

describe('adding activity Schema test ', () => {
    // the code below is for insert testing
    it('Add activity testing', () => {
        const activity = {
            'name': 'Bibek'
        };

        return Admin.Activity.create(activity)
            .then((pro_ret) => {
                expect(pro_ret.name).toEqual('Bibek');
                // expect(pro_ret.contact).toEqual('Bibek');
            });
    });


    it('to test the delete activity  is working or not', async() => {
        const status = await Admin.Activity.deleteMany();
        expect(status.ok).toBe(1);
    });


})