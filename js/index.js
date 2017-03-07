/** 
 * Notes Application 
 * by Francesca Guerrieri
 * GitHub: https://github.com/fguerrieri/NotesApp
 */

var Notes = (function($) {
  /* fixed colors available */
  var colors = ["white", "yellow", "green", "orange", "red"];
  
  /* Utility function to redirect based on functionality  */
  var handleType = function() {
    var type = $(this).data("eventtype");
    var guid = $(this).data("guidref");
    switch (type) {
      case "add":
        createNote(guid);
        break;
      case "save":
        save(guid);
        break;
      case "edit":
        edit(guid);
        break;
      case "delete":
        del(guid);
        break;
      case "changeColor":
        changeColor($(this).data("color"), guid);
        break;
      case "cancel":
        cancel(guid);
        break;
    }
  };

  var createNote = function(guid) {
    guid = guid || createGUID();
    var htmlSingleNote = produceHTML(guid);
    $("#notes-container").append(htmlSingleNote);
    enableEditMode(guid);
    $("#" + guid + " .note").focus();
  };

  var edit = function(guid) {
    enableEditMode(guid);
    // enable edit text area
    $("#" + guid + " .note").prop("disabled", false);
    $("#" + guid + " .note").focus();
  };

  var del = function(guid) {
    var allNotes = JSON.parse(localStorage.getItem("AllNotes"));
    delete allNotes[guid];
    localStorage.setItem("AllNotes", JSON.stringify(allNotes));
    $("#" + guid).remove();
  };

  // undo
  var cancel = function(guid) {
    enableViewMode(guid);
    var allNotes = JSON.parse(localStorage.getItem("AllNotes"));
    if (!allNotes || !allNotes[guid]) {
      $("#" + guid).remove();
    } else {
      var oldValue = allNotes[guid];
      $("#" + guid + " .note").val(oldValue.text);
      changeColor(oldValue.color, guid);
    }
  };

  var save = function(guid) {
    var text = $("#" + guid + " .note").val();
    var color = $("#" + guid).data("color");
    var note = { text: text, color: color };
    saveInLocalStorage(note, guid);
  };

  // object singleNote { guid : { text: "note text", color: "white|yellow|green|orange|red" }}
  var saveInLocalStorage = function(note, guid) {
    var allNotes = JSON.parse(localStorage.getItem("AllNotes"));
    if (!allNotes) {
      allNotes = {};
    }
    allNotes[guid] = note;
    localStorage.setItem("AllNotes", JSON.stringify(allNotes));
    enableViewMode(guid);
  };

  var enableViewMode = function(guid) {
    $("#" + guid).removeClass("edit-mode");
    $("#" + guid + " .note").attr("disabled", "disabled");
    $("#" + guid + " .btn-edit").removeClass("hidden");
    $("#" + guid + " .btn-delete").removeClass("hidden");
    $("#" + guid + " .btn-color-container").addClass("hidden");
    $("#" + guid + " .edit-mode-btn").addClass("hidden");
  };

  var enableEditMode = function(guid) {
    $("#" + guid).addClass("edit-mode");
    $("#" + guid + " .btn-edit").addClass("hidden");
    $("#" + guid + " .btn-delete").addClass("hidden");
    $("#" + guid + " .btn-color-container").removeClass("hidden");
    $("#" + guid + " .edit-mode-btn").removeClass("hidden");
  };

  var changeColor = function(newColor, guid) {
    $("#" + guid).removeClass($("#" + guid).data("color"));
    $("#" + guid).data("color", newColor);
    $("#" + guid).addClass(newColor);
  };

  var produceHTML = function(guid) {
    var html = "";
    html += '<div class="box-note edit-mode" id="' + guid + '" data-color="">';
    html += ' <div class="btn-up-container">';
    html += '<button id="" class="btn btn-edit hidden" data-eventtype="edit" type="button" data-guidref="' +
      guid +
      '">Edit</button>';
    html += '<button id="" class="btn btn-delete" data-eventtype="delete" data-guidref="' +
      guid +
      '" type="button">Delete</button>';
    html += "</div>"; // close button container
    html += ' <div class="content-note">';
    html += '<textarea class="note" autofocus></textarea>';
    html += "</div>"; // close content container
    html += '<div class="edit-mode-btn hidden">';
    html += '<div class="btn-color-container hidden">';
    // colors
    for (let i = 0; i < colors.length; i++) {
      html += '<button id="" class="btn btn-color ' +
        colors[i] +
        '" data-eventtype="changeColor" data-color="' +
        colors[i] +
        '" type="button" data-guidref="' +
        guid +
        '"></button>';
    }
    html+= '</div>';
    html += '<div><button id="" class="btn btn-save " data-eventtype="save" data-guidref="' +
      guid +
      '" type="button">Save</button><button id="" class="btn btn-cancel" data-eventtype="cancel" type="button" data-guidref="' +
      guid +
      '">Cancel</button>';
    html += "</div>";
    html += "</div>";
    html += "</div>"; // close box-note
    return html;
  };

  /* create a note id */
  var createGUID = function() {
    return "xxxx-xxxx-xxxx-xxxx".replace(/x/g, function(char) {
      return Math.random() * 9 | 0;
    });
  };

  var init = function() {
    $("#notes-container").on("click", ".btn", handleType);
    var allNotes = JSON.parse(localStorage.getItem("AllNotes"));
    if (!allNotes) {
      return;
    }
    for (var guid in allNotes) {
      var text = allNotes[guid].text;
      var color = allNotes[guid].color;
      var html = produceHTML(guid);
      $("#notes-container").append(html);
      changeColor(color, guid);
      $("#" + guid + " .note").val(text);
      enableViewMode(guid);
    }
  };

  return {
    init: init
  };
})(jQuery);
$(document).ready(function() {
  Notes.init();
});
