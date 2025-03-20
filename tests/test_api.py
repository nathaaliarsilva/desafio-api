import requests

BASE_URL = "https://jsonplaceholder.typicode.com"

def test_get_posts():
    url = f"{BASE_URL}/posts/1"
    response = requests.get(url)
    assert response.status_code == 200
    print(f"✅ Post carregado: {response.json()}")

if __name__ == "__main__":
    test_get_posts()

