from django.shortcuts import render
from django.http import Http404


PROJECTS = [
    {
        "slug": "planning-medecins-urgence",
        "title": "Système d’aide au planning des médecins en urgence",
        "category": "Optimisation",
        "status": "Terminé",
        "description": (
            "Conception et développement d’un système d’aide à la planification "
            "des médecins dans un service d’urgence."
        ),
        "long_description": (
            "Ce projet consiste à concevoir un système permettant d’aider à la "
            "planification des médecins dans un contexte hospitalier d’urgence. "
            "L’objectif est de faciliter l’organisation des affectations, de mieux "
            "visualiser les plannings et de prendre en compte les contraintes "
            "opérationnelles."
        ),
        "technologies": [
            "Python",
            "Django",
            "HTML",
            "CSS",
            "JavaScript"
        ],
        "images": [
            "website/images/planning-1.png",
            "website/images/planning-2.png",
            "website/images/planning-3.png",
            "website/images/planning-4.png",
            "website/images/planning-5.png",
            "website/images/planning-6.png",
        ],
        "github": "",
        "file": "",
    },

    {
        "slug": "credit-scoring",
        "title": "Crédit Scoring",
        "category": "Machine Learning",
        "status": "En cours",
        "description": (
            "Projet de prédiction du risque de crédit à partir de données clients."
        ),
        "long_description": (
            "Ce projet vise à prédire le risque associé à un crédit à partir de "
            "données clients et financières. Il suit les étapes classiques d’un "
            "projet de data science : exploration des données, préparation, "
            "modélisation et évaluation des modèles."
        ),
        "technologies": [
            "Python",
            "Pandas",
            "Scikit-learn",
            "SQL"
        ],
        "images": [],
        "github": "",
        "file": "",
    },

    {
        "slug": "dashboard-power-bi",
        "title": "Dashboard Power BI",
        "category": "Business Intelligence",
        "status": "Terminé",
        "description": (
            "Développement d’un dashboard Power BI interactif permettant "
            "d’explorer les données et d’analyser des indicateurs clés."
        ),
        "long_description": (
            "Ce projet consiste à concevoir un dashboard interactif sous Power BI "
            "afin de rendre les données plus lisibles et exploitables. L’objectif "
            "est de mettre en avant les KPI, les tendances principales et les "
            "indicateurs utiles à la prise de décision."
        ),
        "technologies": [
            "Power BI",
            "Data Visualisation",
            "Business Intelligence"
        ],
        "images": [
            "website/images/dashboard-1.png",
            "website/images/dashboard-2.png",
            "website/images/dashboard-3.png",
        ],
        "github": "",
        "file": "website/projects/projet_dashboard.pbix",
    },

    {
        "slug": "modelisation-statistique",
        "title": "Modélisation statistique",
        "category": "Statistiques / Data Mining",
        "status": "Terminé",
        "description": (
            "Étude de plusieurs méthodes de modélisation statistique incluant "
            "les arbres de décision, la régression logistique et le clustering."
        ),
        "long_description": (
            "Ce projet académique porte sur trois approches de modélisation "
            "statistique : les arbres de décision, la régression logistique et "
            "le clustering K-means. Les méthodes sont étudiées à travers Excel "
            "et Orange Data Mining."
        ),
        "technologies": [
            "Excel",
            "Orange Data Mining",
            "Statistiques",
            "Machine Learning"
        ],
        "images": [],
        "github": "",
        "file": "",
    },
]


def home(request):

    context = {
        "name": "Ibrahima Baldé",
        "title": "Étudiant Data & IA",
        "location": "Lille, France",
        "email": "ibrahima.balde.ib12@gmail.com",
        "linkedin": "https://www.linkedin.com/in/ibrahima-baldé-161940351",
        "github": "https://github.com/IbrahimaBalde09",

        "headline": (
            "Étudiant en Data & Intelligence Artificielle, passionné par la "
            "valorisation des données à travers le machine learning et l’analyse "
            "avancée. Je développe des modèles prédictifs et des solutions data "
            "mining en m’appuyant sur Python, SQL, R, JavaScript, la modélisation "
            "statistique et Power BI."
        ),

        "about": (
            "Je suis actuellement étudiant en Master Data Science à l’Université "
            "Catholique de Lille. Je développe des compétences solides en analyse "
            "de données, machine learning, modélisation statistique, optimisation "
            "et data visualisation."
        ),

        "skills": [
            "Python",
            "SQL",
            "R",
            "JavaScript",
            "Machine Learning",
            "NLP",
            "Power BI",
            "Excel",
            "Orange Data Mining",
            "Modélisation statistique",
            "Data Mining",
            "Analyse de données",
        ],

        "projects": PROJECTS,
    }

    return render(request, "website/index.html", context)


def project_detail(request, slug):

    project = next((p for p in PROJECTS if p["slug"] == slug), None)

    if project is None:
        raise Http404("Projet non trouvé")

    return render(
        request,
        "website/project_detail.html",
        {"project": project}
    )