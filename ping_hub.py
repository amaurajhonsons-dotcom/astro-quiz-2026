
import requests

HUB_URL = "https://pubsubhubbub.appspot.com/"
TOPIC_URL = "https://astro-quiz-2026-52bxx.ondigitalocean.app/feed.xml"

def ping_hub():
    data = {
        "hub.mode": "publish",
        "hub.url": TOPIC_URL
    }
    
    try:
        response = requests.post(HUB_URL, data=data)
        if response.status_code == 204:
            print("✅ SUCCESS: Hub Notified (204 No Content). Google knows the feed updated.")
        elif response.status_code == 200:
             print("✅ SUCCESS: Hub Notified (200 OK).")
        else:
            print(f"❌ FAILED: Hub returned {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ ERROR: {e}")

if __name__ == "__main__":
    print(f"Pinging Google Hub for: {TOPIC_URL}")
    ping_hub()
