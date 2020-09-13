//const { require } = require("yargs")

const fs = require('fs')
const { default: chalk } = require('chalk')
const { title } = require('process')

const getNotes = () => {
    return 'Your notes...'
}

const readNote = (title) => {
    const notes = loadNotes()
    const titleToRead = notes.find((note) => note.title === title)

    if(titleToRead)
    {
        console.log(chalk.green.inverse('Title:'), chalk.green(titleToRead.title))
        console.log(chalk.blue.inverse('Body:'), chalk.blue(titleToRead.body))

    }else{
        console.log(chalk.red.inverse('Note not found?'))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    
    // const duplicateTitle = notes.filter((notes) => notes.title === title)
    const duplicateNotes = notes.find((note) => note.title === title)
    
    // const duplicateTitle = notes.filter(function(notes) {
    //     return notes.title === title
    // )}
    debugger
    if(!duplicateNotes){
        notes.push(
            {
                title:title,
                body:body
            }
        )
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note added successfully'))
    }
    else{
        console.log(chalk.red.inverse('Note title taken already!'))
    }
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const JSONdata = dataBuffer.toString()
        return JSON.parse(JSONdata)
    }
    catch(e){
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((notes) => notes.title !== title)
    if(notesToKeep.length === notes.length)
    {
        console.log(chalk.red.inverse('No note found for the provided title!!!'))    
    }
    else{
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note Removed'))
    }
    
}

const listNotes = () => {
    const notes = loadNotes()
    const notesTitle = []
    
    notes.forEach(element => {
        notesTitle.push(element.title)
    })
    
    if(notesTitle.length === 0){
        console.log(chalk.blue.inverse('No notes found!'))
    }
    else{
        console.log(chalk.green.inverse('Your notes:'))
        var i=1
        notesTitle.forEach(title => {
            console.log(chalk.green(i+'.'), chalk.blue(title))
            i++
        })
        // forEach(title in notesTitle){
        //     console.log(chalk.green(i+'. '), chalk.red(title))
        // }
    }

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}