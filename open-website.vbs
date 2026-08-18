Set shell = CreateObject("WScript.Shell")
Set files = CreateObject("Scripting.FileSystemObject")

projectPath = files.GetParentFolderName(WScript.ScriptFullName)
pythonPath = "C:\Program Files\Python311\pythonw.exe"

If Not files.FileExists(pythonPath) Then
  pythonPath = "pythonw.exe"
End If

shell.CurrentDirectory = projectPath
shell.Run """" & pythonPath & """ """ & projectPath & "\serve-website.py""", 0, False
