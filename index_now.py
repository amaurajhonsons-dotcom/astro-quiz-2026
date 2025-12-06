
import json
import requests
from google.oauth2 import service_account
from google.auth.transport.requests import Request

SCOPES = ["https://www.googleapis.com/auth/indexing"]
ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"

def get_urls_from_sitemap():
    return [
        "https://astro-quiz-2026-52bxx.ondigitalocean.app/",
        "https://astro-quiz-2026-52bxx.ondigitalocean.app/articles/index.html",
        "https://astro-quiz-2026-52bxx.ondigitalocean.app/articles/love-horoscope-2026.html",
        "https://astro-quiz-2026-52bxx.ondigitalocean.app/articles/money-career-2026.html",
        "https://astro-quiz-2026-52bxx.ondigitalocean.app/articles/career-trends-2026.html",
        "https://astro-quiz-2026-52bxx.ondigitalocean.app/articles/shani-sade-sati-2026.html",
        "https://astro-quiz-2026-52bxx.ondigitalocean.app/articles/health-wellness-2026.html",
        "https://astro-quiz-2026-52bxx.ondigitalocean.app/articles/travel-predictions-2026.html",
        "https://astro-quiz-2026-52bxx.ondigitalocean.app/articles/marriage-timing-2026.html",
        "https://astro-quiz-2026-52bxx.ondigitalocean.app/articles/numerology-2026.html",
        "https://astro-quiz-2026-52bxx.ondigitalocean.app/articles/lucky-zodiac-2026.html",
        "https://astro-quiz-2026-52bxx.ondigitalocean.app/articles/rahu-ketu-2026.html",
        "https://astro-quiz-2026-52bxx.ondigitalocean.app/privacy.html",
        "https://astro-quiz-2026-52bxx.ondigitalocean.app/terms.html"
    ]

def index_url(url):
    creds = service_account.Credentials.from_service_account_file(
        "service_account.json", scopes=SCOPES
    )
    creds.refresh(Request())
    
    headers = {
        "Authorization": f"Bearer {creds.token}",
        "Content-Type": "application/json"
    }

    content = {
        "url": url,
        "type": "URL_UPDATED"
    }
    
    response = requests.post(ENDPOINT, headers=headers, json=content)
    print(f"Indexing {url}: {response.status_code}")

if __name__ == "__main__":
    urls = get_urls_from_sitemap()
    print(f"Starting Indexing for {len(urls)} URLs...")
    for url in urls:
        index_url(url)
    print("Done! Google has been notified.")
