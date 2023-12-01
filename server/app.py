# app.py

from flask import Flask, jsonify
from flask_migrate import Migrate
from models import db, Article

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable Flask-SQLAlchemy modification tracking
db.init_app(app)
migrate = Migrate(app, db)

with app.app_context():
    db.create_all()

@app.route('/api/articles')
def get_articles():
    articles = Article.query.all()
    return jsonify([{"id": article.id, "title": article.title, "content": article.content} for article in articles])

if __name__ == '__main__':
    app.run(debug=True)
