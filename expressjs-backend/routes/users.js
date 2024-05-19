const express = require('express');
const router = express.Router();

const users = {
    users_list:
        [
            {
                id: 'xyz789',
                name: 'Charlie',
                job: 'Janitor',

            },
            {
                id: 'abc123',
                name: 'Mac',
                job: 'Bouncer',
            },
            {
                id: 'ppp222',
                name: 'Mac',
                job: 'Professor',
            },
            {
                id: 'yat999',
                name: 'Dee',
                job: 'Aspring actress',
            },
            {
                id: 'zap555',
                name: 'Dennis',
                job: 'Bartender',
            }
        ]
}



router.get('/', (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }else{
        res.send(users);
    }
});

const findUserByName = (name) => {
    return users['users_list'].filter((user) =>
        user['name'] === name);
}

router.get('/:id', (req, res) => {
    const id = req.params.id;
    let result = findUserById(id);
    if(result === undefined || result.length < 1) {
        res.status(404).send('User not found');
    }else{
        result = {user_list: result};
        res.send(result);
    }
});

function findUserById(id){
    // find() returns the first match; in this case use find bc all ids are unique
    // filter() returns all matches
    return users['users_list'].find( (user) =>
        user['id'] === id);
}

// ADDING USER 
function addUser(user) {
    users['users_list'].push(user);
}


router.post('/', (req, res) => {
    const userToAdd = req.body;
    dataLength = Object.keys(req.body).length;
    if (dataLength === 0) {
        res.status(400).send('Empty body');
    }else{
        addUser(userToAdd);
        res.status(200).send(res.body);
    }
});


//DELETE USER
function deleteUser(user) {
    const index = users['users_list'].indexOf(user);
    users['users_list'].splice(index, 1);

}


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    let user = findUserById(id);
    if(user === undefined) {
        res.status(404).send('User not found');
    }else{
        deleteUser(user);
        res.status(200).end();
    }
});

module.exports = router;