$ErrorActionPreference = "Stop"

$port = 5501

Set-Location $PSScriptRoot
Write-Host "Code-Friendly website: http://127.0.0.1:$port/index.html"
python .\serve-website.py
