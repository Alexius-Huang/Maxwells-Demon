rm -r ./data/notebooks;
mkdir ./data/notebooks;
touch ./data/notebooks/_1.json;

cat <<END >./data/notebooks/_1.json
{
  "id": 1,
  "loaded": true,
  "cells": [
    {
      "id": 1,
      "type": "Markdown",
      "content": "# Welcome!",
      "partial": "full",
      "dependentCellID": null,
      "dependent": null,
      "hide": false,
      "showLangOption": false,
      "programmable": false,
      "programResult": ""
    }
  ],
  "cellIDCounter": 1,
  "toolsVisibility": true,
  "saving": false
}
END

rm ./data/fileSystem.json;
touch ./data/fileSystem.json;
cat <<END >./data/fileSystem.json
{
  "loaded": true,
  "structure": {
    "folderName": "KERNEL",
    "id": 1,
    "expand": true,
    "newFolderInput": false,
    "newFolderInputValue": "",
    "newNotebookInput": false,
    "newNotebookInputValue": "",
    "subFolders": []
  },
  "notebooks": [
    {
      "id": 1,
      "folderID": 1,
      "name": "Welcome!"
    }
  ],
  "notebookCounter": 1,
  "folderCounter": 1,
  "targetNotebook": 1,
  "saving": false
}
END
