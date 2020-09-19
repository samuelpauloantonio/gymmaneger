const functionBD = require('../models/bd_teatcher')
const {
  age,
  date
} = require('../../lib/date')

module.exports = {

  index(req, res) {

    const {
      filter
    } = req.query

    if (filter) {

      functionBD.filter(filter, function (teatchers) {

        return res.render('members/teatcher/index_teatcher', {
          teatchers,
          filter
        })
      })
    } else {

      functionBD.allTeatchers(function (teatchers) {
        return res.render('members/teatcher/index_teatcher', {
          teatchers
        })
      })
    }
  },


  post(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Há campos vazios testetetstete")
      }
    }

    functionBD.insertIntoDB(req.body, function (callback) {

      return res.redirect(`/members/teatcher`)
    })



  },

  show(req, res) {

    functionBD.showTeacher(req.params.id, function (teatcher) {

      if (!teatcher) return res.send("teatcher not_found")


      teatcher.birth = age(teatcher.birth)
      teatcher.lesson = teatcher.lesson.split(",")



      return res.render('members/teatcher/show_teatcher', {
        teatcher
      })
    })

  },

  edit(req, res) {

    functionBD.showTeacher(req.params.id, function (teatcher) {
      if (!teatcher) return res.send("teatcher not_found")

      teatcher.birth = date(teatcher.birth).iso

      return res.render("members/teatcher/edit_teatcher", {
        teatcher
      })
    })
  },





  put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Há campos vazios")
      }
    }

    functionBD.update(req.body, function (callback) {
      return res.redirect(`/members/teatcher/${req.body.id}`)
    })


  },

  delete(req, res) {
    functionBD.delete(req.body.id, function () {
      return res.redirect('/members/teatcher')
    })
  }



}