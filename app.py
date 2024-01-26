import os
from flask import Flask, request, send_from_directory

app = Flask(__name__)

routes = {
    '': 'home', 
    'animals': 'animals'
}

@app.route('/', defaults={'page_name': ''})
@app.route('/<page_name>')
def page(page_name):
    print(f'page_name={page_name}')
    if page_name == 'app.js':
        return send_from_directory('', page_name)
    
    if page_name.endswith('.js'):
        return send_from_directory('view', page_name)
    
    if page_name.endswith('.json'):
        return send_from_directory('model', page_name)
    
    file_name = routes.get(page_name)
    if not file_name:
        return "Page not found", 404

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        with open(f'view/{file_name}.html', 'r') as file:
            script = ''
            if os.path.isfile(f'view/{file_name}.js'):
                script += f'<script src="/{file_name}.js"></script>'
            return file.read() + script
        
    else:
        with open('view/template.html', 'r') as file:
            return file.read()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)