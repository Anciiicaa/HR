from django.db import models

class sqlconnect(models.Model):
    ID = models.IntegerField()
    Ime = models.CharField(max_length=100)
    Pozicija = models.CharField(max_length=100)
    Email = models.CharField(max_length=100)