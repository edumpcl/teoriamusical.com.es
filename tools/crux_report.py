#!/usr/bin/env python3
"""Core Web Vitals de campo (CrUX) del ORIGEN teoriamusical.com.es, móvil y ordenador.

Uso:  python tools/crux_report.py

Lo único que hace con la clave de la API de Google (~/.config/claude-seo/google-api.json,
primer valor que empiece por "AIza") es enviarla a chromeuxreport.googleapis.com, y solo
para preguntar por el origen (nunca por URLs sueltas). No imprime la clave.
Umbrales de Google (p75): LCP bueno <=2500 ms, INP bueno <=200 ms, CLS bueno <=0,1.
Los datos de CrUX son una ventana móvil de 28 días: un arreglo tarda en notarse.
"""
import json
import ssl
import sys
import urllib.error
import urllib.request
from pathlib import Path

ORIGEN = "https://www.teoriamusical.com.es"
ENDPOINT = "https://chromeuxreport.googleapis.com/v1/records:queryRecord"
FICHERO_CLAVE = Path.home() / ".config" / "claude-seo" / "google-api.json"

METRICAS = [
    ("largest_contentful_paint", "LCP", "ms", 2500),
    ("interaction_to_next_paint", "INP", "ms", 200),
    ("cumulative_layout_shift", "CLS", "", 0.1),
]


def clave():
    datos = json.loads(FICHERO_CLAVE.read_text(encoding="utf-8"))
    for v in datos.values():
        if isinstance(v, str) and v.startswith("AIza"):
            return v
    sys.exit("No hay ninguna clave que empiece por AIza en " + str(FICHERO_CLAVE))


def consulta(k, factor):
    cuerpo = json.dumps({"origin": ORIGEN, "formFactor": factor}).encode()
    peticion = urllib.request.Request(
        ENDPOINT + "?key=" + k, data=cuerpo, headers={"Content-Type": "application/json"})
    # Esta máquina tiene un antivirus que inspecciona TLS (mismo apaño que gsc_auth.py).
    contexto = ssl._create_unverified_context()
    try:
        with urllib.request.urlopen(peticion, context=contexto, timeout=30) as r:
            return json.load(r)["record"]
    except urllib.error.HTTPError as e:
        return {"error": f"HTTP {e.code}"}


def main():
    k = clave()
    print(f"CrUX · origen {ORIGEN} · ventana de 28 días\n")
    for factor, nombre in (("PHONE", "MÓVIL"), ("DESKTOP", "ORDENADOR")):
        rec = consulta(k, factor)
        if "error" in rec:
            print(f"{nombre}: {rec['error']}")
            continue
        periodo = rec.get("collectionPeriod", {})
        fin = periodo.get("lastDate", {})
        print(f"{nombre} (hasta {fin.get('year')}-{fin.get('month'):02d}-{fin.get('day'):02d})")
        m = rec["metrics"]
        for clave_m, etiqueta, unidad, umbral in METRICAS:
            if clave_m not in m:
                print(f"  {etiqueta}: sin datos")
                continue
            p75 = m[clave_m]["percentiles"]["p75"]
            valor = float(p75)
            bueno = m[clave_m]["histogram"][0]["density"]
            estado = "OK" if valor <= umbral else "REVISAR"
            texto = f"{valor:.2f}" if clave_m.startswith("cumulative") else f"{valor:.0f} {unidad}"
            print(f"  {etiqueta}: p75 {texto:<9} {estado:<8} ({float(bueno) * 100:.0f}% de cargas buenas)")
        print()


if __name__ == "__main__":
    main()
