import datetime
from django.shortcuts import render

from counter.models import Counter

def add_details(counter, now):
    ''' Adds attrs for remaining years, days, minutes, seconds '''
    time_left = counter.end_date - now

    days = time_left.days
    hours = str(time_left.seconds / 3600)
    if len(hours) == 1:
        hours = '0' + hours

    minutes = str((time_left.seconds / 60) - (int(hours) * 60))
    if len(minutes) == 1:
        minutes = '0' + minutes

    seconds = str(time_left.seconds % 60)
    if len(seconds) == 1:
        seconds = '0' + seconds

    setattr(counter, 'days', days)
    setattr(counter, 'hours', hours)
    setattr(counter, 'minutes', minutes)
    setattr(counter, 'seconds', seconds)

def home(request):
    ''' Returns all active counters and those which have expired
    within the last 24 hours. '''
    now = datetime.datetime.now()
    yesterday = now - datetime.timedelta(days=1)
    counters = Counter.objects.filter(end_date__gte=yesterday)

    for counter in counters:
        add_details(counter, now)

    return render(request, 'counter/home.html', { 'counters': counters })
