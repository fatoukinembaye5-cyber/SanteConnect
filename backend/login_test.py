import json
import urllib.request

url = 'http://127.0.0.1:8000/api/login'
headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

data = json.dumps({
    'email': 'admin@santeconnect.sn',
    'password': 'thies2024'
}).encode('utf-8')

req = urllib.request.Request(url, data=data, headers=headers, method='POST')
try:
    with urllib.request.urlopen(req) as res:
        print('status', res.status)
        content = res.read().decode('utf-8')
        print(content)
except urllib.error.HTTPError as e:
    print('status', e.code)
    print(e.read().decode('utf-8'))
except Exception as err:
    print('error', err)
