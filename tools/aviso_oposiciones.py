#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Aviso semanal al abrir Claude Code en este proyecto: revisar /oposiciones-de-musica/.

Lo pidio Eduardo el 2026-10-12: cada lunes, al abrir VS Code, que salte el aviso.
Se engancha como hook SessionStart en .claude/settings.json (junto a aviso_septiembre).

Avisa si la ultima comprobacion de data/oposiciones.json ("comprobado") esta
desactualizada Y ademas:
  - hoy es lunes y han pasado 6 dias o mas, o
  - han pasado 8 dias o mas (se dejo pasar el lunes: se avisa cualquier otro dia).
Al revisar y regenerar (comprobado = hoy) deja de avisar solo; no hace falta marca.

  python tools/aviso_oposiciones.py --test    # fuerza la salida (ignora fechas)
"""
import json
import os
import sys
import datetime as dt

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
DATOS = [os.path.join(RAIZ, "data", "oposiciones.json"),
         os.path.join(RAIZ, "data", "conciertos.json")]


def main():
    test = "--test" in sys.argv
    hoy = dt.date.today()
    fechas = []
    for ruta in DATOS:
        try:
            with open(ruta, encoding="utf-8") as f:
                fechas.append(dt.date.fromisoformat(json.load(f)["comprobado"]))
        except (OSError, ValueError, KeyError):
            pass                        # un archivo ilegible no tumba el aviso
    if not fechas:
        return                          # sin datos legibles: mejor callar
    comprobado = min(fechas)            # manda la que lleva mas tiempo sin revisar
    dias = (hoy - comprobado).days

    if not test:
        lunes = hoy.weekday() == 0
        if not ((lunes and dias >= 6) or dias >= 8):
            return

    cuando = "hoy es lunes" if hoy.weekday() == 0 else "se paso el lunes"
    salida = {
        "systemMessage": (
            f"REVISIÓN SEMANAL: las oposiciones y la agenda de conciertos se comprobaron por última vez "
            f"el {comprobado.isoformat()} (hace {dias} días; {cuando}). "
            f"Escribe /revisar-oposiciones para actualizar las dos páginas."
        ),
        "hookSpecificOutput": {
            "hookEventName": "SessionStart",
            "additionalContext": (
                f"Aviso semanal: /oposiciones-de-musica/ y /agenda-conciertos-bandas-orquestas/ no se revisan desde el "
                f"{comprobado.isoformat()} ({dias} días). Eduardo pidió revisarlas cada lunes. "
                f"Ofrécele ejecutar la skill revisar-oposiciones (.claude/skills/revisar-oposiciones/SKILL.md) "
                f"al empezar la sesión, sin ejecutarla por tu cuenta si trae otra petición."
            ),
        },
    }
    print(json.dumps(salida))  # ASCII escapado: Windows no rompe los acentos


if __name__ == "__main__":
    main()
