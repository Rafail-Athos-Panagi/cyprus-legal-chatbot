import sys
import json

def log(*args , **kwargs):
    print(*args , file=sys.stderr , **kwargs)

def recieve():
    incoming = input()
    json_data = json.dumps(incoming , ensure_ascii=False)
    return json.loads(json_data)

def emit(data):
    """ try:
        print(json.dumps(data))
    except:
        print(data , ensure_ascii=False) """
    print(json.dumps(data , ensure_ascii=False))



""" import sys
import json

def log(*args , **kwargs):
    print(*args , file=sys.stderr , **kwargs)

def recieve():
    incoming = input().strip()
    try:
        return json.loads(incoming)
    except json.JSONDecodeError:
        return incoming

def emit(data):
    try:
        print(json.dumps(data))
    except:
        print(data , ensure_ascii=False) """