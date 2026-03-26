from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

# 🔐 Sécurité
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-change-this-key-later')

# 🔧 Debug géré par Railway
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

# 🌍 Autoriser Railway
ALLOWED_HOSTS = ['*']


# 📦 Applications
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'website',
]


# ⚙️ Middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',

    # 🔥 IMPORTANT pour servir les fichiers statiques en prod
    'whitenoise.middleware.WhiteNoiseMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'portfolio.urls'


# 🎨 Templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'portfolio.wsgi.application'


# 🗄️ Base de données
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# 🔐 Mots de passe
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# 🌍 Internationalisation
LANGUAGE_CODE = 'fr-fr'
TIME_ZONE = 'Europe/Paris'
USE_I18N = True
USE_TZ = True


# 📁 STATIC FILES (🔥 CRUCIAL POUR RAILWAY)

STATIC_URL = '/static/'

# 👉 Dossier où Django va chercher tes fichiers static
STATICFILES_DIRS = [
    BASE_DIR / "website" / "static",
]

# 👉 Dossier final utilisé en production
STATIC_ROOT = BASE_DIR / 'staticfiles'

# 👉 Optimisation et compatibilité Railway
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# 🔢 Default ID
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'