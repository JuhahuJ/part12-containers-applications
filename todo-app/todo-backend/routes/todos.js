const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
  const count = await redis.getAsync('added_todos')
  await redis.setAsync('added_todos', Number(count) + 1)
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  if (!req.body.text && req.body.done === undefined) {
    return res.status(400).json({ error: "missing text and done" })
  }
  if (!req.body.text) {
    req.todo.done = req.body.done

    await req.todo.save()
    res.json(req.todo)
  } else if (req.body.done === undefined) {
    req.todo.text = req.body.text

    await req.todo.save()
    res.json(req.todo)
  } else {
    req.todo.text = req.body.text
    req.todo.done = req.body.done

    await req.todo.save()
    res.json(req.todo)
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
