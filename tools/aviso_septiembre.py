#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Aviso unico al abrir Claude Code en este proyecto a partir de septiembre 2026.

Lo pidio Eduardo el 2026-07-30: en agosto esta de vacaciones y queria que se le
recordara en septiembre medir el efecto de los cambios de anuncios de ese dia.

Se engancha como hook SessionStart en .claude/settings.json. Se dispara UNA sola
vez: al hacerlo deja una marca en ~/.claude/ y no vuelve a decir nada. Antes del
1 de septiembre no imprime nada, asi que arrancar sesiones en agosto no lo gasta.

  python tools/aviso_septiembre.py --test    # ver la salida sin gastar el aviso
"""
import json
import os
import sys
import datetime as dt

DESDE = dt.date(2026, 9, 1)
MARCA = os.path.join(os.path.expanduser("~"), ".claude",
                     ".tm-aviso-anuncios-septiembre")

MENSAJE = (
    "RECORDATORIO (pediste que te avisara en septiembre): toca medir el efecto "
    "de los cambios de anuncios del 30 de julio. Fecha de corte 2026-07-30.\n"
    "  python tools/adsense_report.py --formatos --dias 40\n"
    "  python tools/adsense_report.py --unidades --dias 40\n"
    "  python tools/ga4_report.py --scroll"
)

CONTEXTO = (
    "El hook de aviso de septiembre se ha disparado. Eduardo pidio el "
    "2026-07-30 que se le recordara AHORA revisar el rendimiento de anuncios. "
    "Lee la memoria 'project-revision-anuncios-septiembre' para el detalle y "
    "ofrecele ejecutar los tres informes: adsense_report.py --formatos, "
    "adsense_report.py --unidades y ga4_report.py --scroll. Lo que se quiere "
    "saber: (1) si el metronomo monetiza -se predijo que tendria muchas menos "
    "impresiones que paginas vistas-, (2) si los afinadores tienen ya volumen "
    "suficiente, (3) cuanto aporta el ancla activada ese dia."
)


def main():
    test = "--test" in sys.argv

    if not test:
        if dt.date.today() < DESDE:
            return                      # aun no toca
        if os.path.exists(MARCA):
            return                      # ya se aviso

    salida = {
        "systemMessage": MENSAJE,
        "hookSpecificOutput": {
            "hookEventName": "SessionStart",
            "additionalContext": CONTEXTO,
        },
    }

    if not test:
        try:
            os.makedirs(os.path.dirname(MARCA), exist_ok=True)
            with open(MARCA, "w", encoding="utf-8") as f:
                f.write(dt.date.today().isoformat())
        except OSError:
            # Si no se puede escribir la marca, mejor no avisar que avisar cada
            # dia para siempre.
            return

    print(json.dumps(salida, ensure_ascii=False))


if __name__ == "__main__":
    main()
