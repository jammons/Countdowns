from django.contrib import admin

from counter.models import Counter

class CounterAdmin(admin.ModelAdmin):
    pass

admin.site.register(Counter, CounterAdmin)
