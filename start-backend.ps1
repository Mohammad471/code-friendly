$ErrorActionPreference = "Stop"

$jdk = "C:\Program Files\Java\jdk-21"
$workspaceMavenRepo = Join-Path $PSScriptRoot ".m2\repository"
$userMavenRepo = "C:\Users\sabab\.m2\repository"

if (Test-Path $jdk) {
    $env:JAVA_HOME = $jdk
    $env:Path = "$env:JAVA_HOME\bin;$env:Path"
}

Set-Location $PSScriptRoot

if (Test-Path $workspaceMavenRepo) {
    mvn -o "-Dmaven.repo.local=$workspaceMavenRepo" "-Dmaven.compiler.fork=true" "-Dmaven.test.skip=true" spring-boot:run
} elseif (Test-Path $userMavenRepo) {
    mvn "-Dmaven.repo.local=$userMavenRepo" "-Dmaven.compiler.fork=true" "-Dmaven.test.skip=true" spring-boot:run
} else {
    mvn "-Dmaven.compiler.fork=true" "-Dmaven.test.skip=true" spring-boot:run
}
