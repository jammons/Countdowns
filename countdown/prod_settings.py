''' Example production settings file. The real one is safe on a server somewhere '''

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2', # Add 'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'counter',                      # Or path to database file if using sqlite3.
        'USER': 'counter',                      # Not used with sqlite3.
        'PASSWORD': 'MMGd2WQC',                  # Not used with sqlite3.
        'HOST': '',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
    }
}

SECRET_KEY = '+jhbvo*6===vvym%3vom$q-xhn8()%%6xuptm-8xw3ug^6+%u$'
