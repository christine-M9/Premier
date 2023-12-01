# app.py

from flask import Flask, jsonify, request
from flask_migrate import Migrate
from models import db, Article

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)

with app.app_context():
    db.create_all()

@app.route('/api/articles', methods=['GET', 'POST'])
def manage_articles():
    if request.method == 'GET':
        articles = Article.query.all()
        return jsonify([{"id": article.id, "title": article.title, "content": article.content} for article in articles])
    elif request.method == 'POST':
        data = request.json
        new_article = Article(title=data['title'], content=data['content'])
        db.session.add(new_article)
        db.session.commit()
        return jsonify({"message": "Article created successfully", "article": {"id": new_article.id, "title": new_article.title, "content": new_article.content}})
    
@app.route('/api/articles/<int:article_id>', methods=['GET', 'PUT', 'DELETE'])
def manage_article(article_id):
    article = Article.query.get_or_404(article_id)

    if request.method == 'GET':
        return jsonify({"id": article.id, "title": article.title, "content": article.content})
    elif request.method == 'PUT':
        data = request.json
        article.title = data['title']
        article.content = data['content']
        db.session.commit()
        return jsonify({"message": "Article updated successfully", "article": {"id": article.id, "title": article.title, "content": article.content}})
    elif request.method == 'DELETE':
        db.session.delete(article)
        db.session.commit()
        return jsonify({"message": "Article deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True)
