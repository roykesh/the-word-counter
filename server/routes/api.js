const express = require('express')
const router = express.Router()
const validator = require('validator')

validator.blacklist()
const wordCounter = {}
let oldWords = 0;
let newWords = 0;


router.get('/sanity', (req, res) => {
    console.log('Server up and running')
    res.end('Server up and running')
})

router.get('/word/:word', (req, res) => {
    console.log('Someone is checking for a word')
    let word = req.params.word
    wordCounter[word] ?
        res.send({ count: wordCounter.word }) :
        res.send({ count: 0 })
    console.log(wordCounter)
})

router.post('/word/:word', (req, res) => {
    console.log("posting a word")
    let word = req.params.word
    if (wordCounter[word]) {
        wordCounter[word]++
        oldWords++
    } else {
        wordCounter[word] = 1
        newWords++
    }
    res.send({ text: `Added ${word}`, currentCount: wordCounter[word] })
})

router.post('/words/:sentence', (req, res) => {
    console.log("posting a sentence")
    console.log(req.params.sentence)
    let sentence = req.params.sentence.split(' ')
    sentence.forEach(w => {
        if (wordCounter[w]) {
            wordCounter[w]++
            oldWords++
        } else {
            wordCounter[w] = 1
            newWords++
        }
    });
    res.send({ text: `Added ${newWords} words, ${oldWords} already existed`, currentCount: -1 })
})

router.get('/total', (req, res) => {
    res.send({text: "Total count", count: newWords})
}) 

module.exports = router