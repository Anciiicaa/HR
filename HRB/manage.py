#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from django.db import connection

# Ako želite izvršiti samo jedan upit, ovo je primer upita
# Ako želite izvršiti više upita, dodajte ih ovde
with connection.cursor() as cursor:
    cursor.execute("SELECT * FROM Employee")  # Zamijenite sa stvarnim imenom tabele

    # Dobijanje rezultata
    rezultati = cursor.fetchall()

# Ispisivanje rezultata
for red in rezultati:
    print(red)

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "HRB.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
