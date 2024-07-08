const express = require('express');
const router = express.Router();
const redis = require('../redis')

router.get('/', async (_, res) => {
    const result = await redis.getAsync('added_todos')
    console.log(result)
    if (!result) {
        redis.setAsync('added_todos', 0)
        res.json({ "added_todos": 0 })
    } else res.json({ "added_todos": result })
});


module.exports = router;
