import requests

# Defina a URL base da API
BASE_URL = 'https://jsonplaceholder.typicode.com'

# Teste de GET - Buscar uma lista de posts
def test_get_posts():
    response = requests.get(f'{BASE_URL}/posts')
    assert response.status_code == 200
    assert isinstance(response.json(), list)

# Teste de POST - Criar um novo post
def test_create_post():
    payload = {
        "title": "Novo post",
        "body": "Conteúdo do novo post",
        "userId": 1
    }
    response = requests.post(f'{BASE_URL}/posts', json=payload)
    assert response.status_code == 201
    assert response.json()['title'] == payload['title']

# Teste de PUT - Atualizar um post existente
def test_update_post():
    post_id = 1
    payload = {
        "title": "Post atualizado",
        "body": "Conteúdo atualizado",
        "userId": 1
    }
    response = requests.put(f'{BASE_URL}/posts/{post_id}', json=payload)
    assert response.status_code == 200
    assert response.json()['title'] == payload['title']

# Teste de DELETE - Deletar um post
def test_delete_post():
    post_id = 1
    response = requests.delete(f'{BASE_URL}/posts/{post_id}')
    assert response.status_code == 200 or response.status_code == 204

