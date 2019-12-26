const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const ToDo = require('../models/todo')

// @route  GET api/todo/test
// @desc
// @acces

router.get('/test', (req, res) => res.json({ msg: 'ToDo Routes Works' }))

// @route  GET api/todo/
// @desc   Show all to do item
// @acces  Private
router.get(
  '/',
  passport.authenticate('jwt' || 'google', { session: false }),
  (req, res) => {
    ToDo.findOne({ user: req.user.id })
      .then(found => {
        res.json(found.list)
      })
      .catch(err => res.json(err))
  }
)

// @route  POST api/todo/add
// @desc   Add new item to list
// @acces  Private

router.post(
  '/add',
  passport.authenticate('jwt' || 'google', { session: false }),
  (req, res) => {
    ToDo.findOne({ user: req.user.id })
      .then(found => {
        if (!found) {
          const newToDo = new ToDo({
            user: req.user.id,
            list: [{ text: req.body.text }]
          })
          newToDo.save()
          res.json(newToDo.list)
        } else {
          found.list.unshift({ text: req.body.text })
          found.save().then(found => res.json(found.list))
        }
      })
      .catch(err => res.json(err))
  }
)

// @route  POST api/todo/active/:itemID
// @desc   Change status on active/inactive
// @acces  Private

router.post(
  '/active/:itemID',
  passport.authenticate('jwt' || 'google', { session: false }),
  (req, res) => {
    ToDo.findOne({ user: req.user.id })
      .then(found => {
        const changeIndex = found.list
          .map(item => item.id)
          .indexOf(req.params.itemID)

        if (changeIndex < 0) {
          return res.json({ notexists: 'That item id doesnt exists' })
        }

        found.list[changeIndex].active = !found.list[changeIndex].active
        found.save().then(found => res.json(found.list[changeIndex]))
      })
      .catch(err => res.json(err))
  }
)

// @route  Delete api/todo/:itemID
// @desc   Delete item
// @acces  Private

router.delete(
  '/:itemID',
  passport.authenticate('jwt' || 'google', { session: false }),
  (req, res) => {
    ToDo.findOne({ user: req.user.id })
      .then(found => {
        // if (!found) {
        //   return res.status(404).json({ list: "U dont have list yet" });
        // }
        const removeIndex = found.list
          .map(item => item.id)
          .indexOf(req.params.itemID)

        if (removeIndex < 0) {
          return res.json({ notexists: 'That item id doesnt exists' })
        } else {
          found.list.splice(removeIndex, 1)
          found.save().then(found => res.json(found.list))
        }
      })
      .catch(err => res.json(err))
  }
)

module.exports = router
