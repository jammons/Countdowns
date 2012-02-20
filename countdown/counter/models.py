from django.db import models

class Counter(models.Model):
    ''' Keeps track of events which are being counted down. '''
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=300)
    end_date = models.DateTimeField()

    def __unicode__(self):
        return self.title
