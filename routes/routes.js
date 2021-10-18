const { response } = require("express")
const express = require("express")
const router = express.Router()
const Note = require("../models/noteModel")

// Getting all
router.get("/", async (req,res) => {
    try {
        const allNotes = await Note.find()
        res.json(allNotes)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Getting one
router.get("/:id",searchNote,(req,res) => {
    res.json(res.note);
})

// Adding one
router.post("/",async (req,res) => {
    const note = new Note({
        name: req.body.name,
        content: req.body.content
    })

    try {
        const success = await note.save()
        res.status(201).json(success)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Updating one
router.patch("/:id",searchNote,async (req,res) => {
    if(req.body.name) res.note.name = req.body.name
    if(req.body.content) res.note.content = req.body.content
    try{
        const patchedNote = await res.note.save();
        res.status(200).json(patchedNote)
    }catch(err){
        res.json({ message: err.message });
    }
})

// Deleting one
router.delete("/:id",searchNote,async (req,res) => {
    try{
        await res.note.remove()
        res.status(200).json({"message": "Note was deleted"})
    }catch(err){
        res.json({"message": err.message})
    }
})

async function searchNote(req,res,next) {
    let result
    try{
        result = await Note.findById(req.params.id)
        if(!result) return res.status(404).json({"message": "Note not found"})
    } catch(err) {
        return res.status(500).json({"message": err.message})
    }
    res.note = result
    next()
}

module.exports = router