# Notes Application
A simple application to take and save note into Local Storage.

## Features
The application allows the user to:
 * **Create a new note** - clicking on Add button at the top of the page creates a new note and the user can start adding text to it.
 * **Edit an existing note** - clicking on Edit button allows the user to modify the text and the background color of the note choosing from a fixed set of colors `white yellow green orange red`.
  * **Delete a note** - clicking on Delete button the user can delete an existing note and it will be removed from Local Storage.
 * **Save a note** - when in edit mode clicking on Save button the user can save the note that will be stored in Local Storage.
 * **Cancel modification** - when in edit mode a user can cancel the current modifications.  

## Local Storage
A single note in Local Storage is saved in this JSON format:
```json
{
  "<guid>" : {
    "text" : "<your-text-note>", 
    "color" : "<white|yellow|green|orange|red>"
    }
}
```

 