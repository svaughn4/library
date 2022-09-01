// Create array to store the book objects
let myLibrary = [];

// Create parent node, container, to add card divs to
let parent = document.getElementById('cards')

// Umbrella function handles creation, addition, and upload of book object
function handleBook (title, author, pages) { 
    // Create the book 
    const entry = new makeBook(title, author, pages)
    console.log(entry)
    // Add the book to the array
    myLibrary.push(entry)
    // Upload the book to the webpage if not already up
    if(containsObject){ 
        uploadBook(entry)
    }
}

function updateNumber() { 
    let libSize = myLibrary.length
    for(let i = 0; i < libSize; i++) { 
        myLibrary[i].Number = i + 1;
    }
}

// Constructor function to make the book object
function makeBook(title, author, pages) { 
    this.Title = title
    this.Author = author
    this.Pages = pages
    this.Number = myLibrary.length + 1
    //this.info = function() { 
        //return title + " by " + author + ", " + pages + "pages, " + status;
    //}
}

// Check whether book object is already stored in the library
function containsObject(myLibrary, entry) { 
    for(let i = 0; i < myLibrary.length; i++) { 
        if(myLibrary[i] == entry) { 
            return false;
        }
    }
    return true;
}

// Accesses book object's data to upload as a card on the page
function uploadBook (object) { 
    const elem = document.createElement('div')
    elem.classList.add('card')

    // Add toggles for reading status
    let toggle = document.createElement('label')
    let message2 = document.createTextNode('Read')
    toggle.appendChild(message2)

    let toggle2 = document.createElement('label')
    let message3 = document.createTextNode('Not Read')
    toggle2.append(message3)

    // Create container to hold status boxes
    let progress = document.createElement('div')
    progress.setAttribute('id', 'progress')

    // Read option
    let read = document.createElement('input')
    read.setAttribute('type', 'radio')
    read.setAttribute('name', 'status')
    read.setAttribute('value', 'Read')
    let readLabel = document.createElement('label')
    readLabel.textContent += 'Read'
    readLabel.appendChild(read)

    // Not read option
    let notRead = document.createElement('input')
    notRead.setAttribute('id', 'test')
    notRead.setAttribute('type', 'radio')
    notRead.setAttribute('name', 'status')
    notRead.setAttribute('value', 'Not Read')
    let notReadLabel = document.createElement('label')
    notReadLabel.textContent += 'Not Read'
    notReadLabel.appendChild(notRead)

    toggle.appendChild(read)
    toggle2.appendChild(notRead) 

    progress.appendChild(toggle)
    progress.appendChild(toggle2)

    // Add remove button to each card
    let removeButton = document.createElement('button')
    let message = document.createTextNode('Remove')
    removeButton.appendChild(message)
    removeButton.setAttribute('id', 'remove')

    // When click on remove button, remove book from array and from DOM
    removeButton.addEventListener('click', () => { 
        myLibrary.splice(object.Number - 1, 1)
        elem.remove()
        updateNumber()
    })

    // Add the book object's values to each card
    for(let key in object){ 
        if(key != 'Number') { 
            elem.textContent+= `${key}: ${object[key]}`
            elem.textContent+= "\r\n"
        }
    }

    elem.appendChild(progress)
    elem.appendChild(removeButton)
    parent.appendChild(elem)
}

// Add create form function to button
const add = document.getElementById('add').addEventListener('click', createForm)

// When user clicks add new book button, form pops up to ask for user input
function createForm() { 
    const form = document.createElement('form')
    form.setAttribute('id', 'sumbit')

    // Create each of the input fields of the form: Book title, Author, Num of Pages, Submit Button, and Reading Status
    let title = document.createElement('input')
    title.setAttribute('type', 'text')
    title.setAttribute('name', 'title')
    title.setAttribute('placeholder', 'Book Title')

    let author = document.createElement('input')
    author.setAttribute('type', 'text')
    author.setAttribute('name', 'author')
    author.setAttribute('placeholder', 'Author')

    let pages = document.createElement('input')
    pages.setAttribute('type', 'number')
    pages.setAttribute('name', 'pages')
    pages.setAttribute('placeholder', 'Number of Pages')

    let submit = document.createElement('input')
    submit.setAttribute('type', 'submit')
    submit.setAttribute('value', 'Submit')

    let cancel = document.createElement('input')
    cancel.setAttribute('type', 'button')
    cancel.setAttribute('value', 'Cancel')
    cancel.addEventListener('click', () => {
        form.remove()
    })

    // add input fields to the form
    form.appendChild(title)
    form.appendChild(author)
    form.appendChild(pages)
    form.appendChild(submit)
    form.appendChild(cancel)

    // When click on submit button, initiates function that stores the form's data
    form.addEventListener('submit', (event) => { 
        // Stops form data from being submitted in case if invalid
        event.preventDefault()

        // Access each of the fields of the form
        const name = form.elements['title']
        const creator = form.elements['author']
        const length = form.elements['pages']

        // Access the values of each input field
        let fullName = name.value
        let madeBy = creator.value
        let numberOf = length.value

        // Create and upload the book
        handleBook(fullName, madeBy, numberOf)

        // Have form disappear after
        form.remove()
    })

    // add form to the HTML document
    document.body.appendChild(form);
}



