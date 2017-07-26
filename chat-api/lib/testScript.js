var flatten = require('flat')

const predicates = {
    level1_0: {
        level1_0_1: 1, 
        level1_0_2: 2, 
        level1_0_3: 3
    },
    level1_1: {
        level1_1_1: 1,
        level1_1_2: 2,
        level1_1_3: 3,
        level1_1_4: {
            level1_1_4_1: 5, 
            level1_1_4_2: 6, 
            level1_1_4_3: 7, 
            level1_1_4_4: 8
        }
    },
    level1_2: [
        'first',
        'second',
        { key: 'value' }
    ]
};


console.log(flatten(predicates))