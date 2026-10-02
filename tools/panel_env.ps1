<#
.SYNOPSIS
  Copia al portapapeles, de una en una, las cinco variables de entorno que
  necesita /panel/datos-vivo/ en Vercel.

.DESCRIPTION
  Uso:   .\tools\panel_env.ps1 1     (y luego 2, 3, 4, 5)
         .\tools\panel_env.ps1       (lista las cinco, sin copiar nada)

  POR QUE UN SCRIPT Y NO UN COMANDO SUELTO: el comando hay que copiarlo del
  chat, y al copiarlo se machaca el portapapeles, que es justo donde acabamos
  de dejar el valor. Con el script basta teclear una linea corta.

  NO ESCRIBE NINGUN VALOR EN DISCO. Lee las credenciales que ya tienes en
  tools\ , deja el valor en el portapapeles y en pantalla solo enseña el
  principio y la longitud, para que puedas reconocerlo sin verlo entero.

  Las credenciales son las mismas de siempre: la cuenta de servicio de Search
  Console / GA4 y el OAuth de usuario de AdSense.
#>
param(
    [ValidateRange(1, 5)]
    [int]$Numero = 0
)

$ErrorActionPreference = 'Stop'
$dir = Split-Path -Parent $MyInvocation.MyCommand.Path

function Leer($fichero) {
    $ruta = Join-Path $dir $fichero
    if (-not (Test-Path $ruta)) { throw "Falta $ruta" }
    Get-Content $ruta -Raw | ConvertFrom-Json
}

$sa = Leer 'gsc-service-account.json'
$ads = Leer 'adsense-token.json'

$variables = @(
    @{ n = 1; k = 'GOOGLE_SA_EMAIL';       v = $sa.client_email;  pista = 'acaba en .iam.gserviceaccount.com' }
    @{ n = 2; k = 'GOOGLE_SA_KEY';         v = $sa.private_key;   pista = 'varias lineas, de BEGIN a END PRIVATE KEY' }
    @{ n = 3; k = 'ADSENSE_CLIENT_ID';     v = $ads.client_id;    pista = 'acaba en .apps.googleusercontent.com' }
    @{ n = 4; k = 'ADSENSE_CLIENT_SECRET'; v = $ads.client_secret; pista = 'empieza por GOCSPX-' }
    @{ n = 5; k = 'ADSENSE_REFRESH_TOKEN'; v = $ads.refresh_token; pista = 'empieza por 1//' }
)

if ($Numero -eq 0) {
    Write-Host ''
    Write-Host 'Variables para Vercel (Settings > Environment Variables, entorno Production):'
    Write-Host ''
    foreach ($x in $variables) {
        $estado = if ($x.v) { '{0,6} caracteres' -f $x.v.Length } else { '   NO SE HA PODIDO LEER' }
        Write-Host ('  {0}  {1,-24} {2}   {3}' -f $x.n, $x.k, $estado, $x.pista)
    }
    Write-Host ''
    Write-Host 'Copia cada una con:   .\tools\panel_env.ps1 1    (luego 2, 3, 4 y 5)'
    Write-Host ''
    return
}

$v = $variables | Where-Object { $_.n -eq $Numero }
if (-not $v.v) { throw ('No se ha podido leer {0}' -f $v.k) }

Set-Clipboard -Value $v.v

$inicio = $v.v.Substring(0, [Math]::Min(14, $v.v.Length)).Replace("`r", '').Replace("`n", ' ')
$lineas = ($v.v -split "`n").Count

Write-Host ''
Write-Host ('  COPIADO AL PORTAPAPELES: {0}' -f $v.k)
Write-Host ('  empieza por "{0}..."  ·  {1} caracteres  ·  {2} linea(s)' -f $inicio, $v.v.Length, $lineas)
Write-Host ('  {0}' -f $v.pista)
Write-Host ''
Write-Host '  Ahora, en Vercel:  Add  >  Key = ' -NoNewline
Write-Host $v.k -NoNewline
Write-Host '  >  Value = Ctrl+V  >  Production  >  Save'
Write-Host '  NO copies nada mas hasta haberlo pegado, o perderas el valor.'
Write-Host ''
