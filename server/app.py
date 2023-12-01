
from flask import Flask, jsonify
from models import db, Article

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/api/articles')
def get_articles():
    articles = Article.query.all()
    return jsonify([{"id": article.id, "title": article.title, "content": article.content} for article in articles])

if __name__ == '__main__':
    app.run(debug=True)
