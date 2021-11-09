const { User } = require("../models");

const userSeedData =
[
    {
        "name": "Ian",
        "email": "ianfullstack@ian.me",
        "pass": "rootadmin"
    },
    {
        "name": "Jassica",
        "email": "jassicaCouldBe@aname.com",
        "pass": "pass9876"
    },
    {
        "name": "Boofany",
        "email": "boofany@badontheears.com",
        "pass": "pass8765"
    },
    {
        "name": "AshlindaSueAnn",
        "email": "existsOnly@thesouth",
        "pass": "pass7654"
    }
];

// const newUsers = () => User.bulkCreate(userSeedData, {
//     individualHooks: true,
//     returning: true,
// });
const newUsers = async () => await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
});

module.exports = newUsers;