# app.py

from flask import Flask, jsonify, request, render_template

from flask_migrate import Migrate
from models import db, Article,  Comment, Like, Rating, Subscriber
from flask_cors import CORS

# app = Flask(__name__)



app = Flask(__name__, static_folder='../client/dist', template_folder='../client/dist', static_url_path='')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)

with app.app_context():
    db.create_all()

CORS(app)  # Enable CORS for all routes
@app.route('/')
def index():
    return render_template('index.html') 

@app.route('/articles', methods=['GET', 'POST'])
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
    
@app.route('/articles/<int:article_id>', methods=['GET', 'PUT', 'DELETE'])
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

@app.route('/articles/<int:article_id>/comments', methods=['GET', 'POST'])
def manage_comments(article_id):
    if request.method == 'GET':
        comments = Comment.query.filter_by(article_id=article_id).all()
        return jsonify([{"id": comment.id, "content": comment.content} for comment in comments])
    elif request.method == 'POST':
        data = request.json
        new_comment = Comment(article_id=article_id, content=data['content'])
        db.session.add(new_comment)
        db.session.commit()
        return jsonify({"message": "Comment added successfully", "comment": {"id": new_comment.id, "content": new_comment.content}})

@app.route('/articles/<int:article_id>/likes', methods=['GET', 'POST'])
def manage_likes(article_id):
    if request.method == 'GET':
        likes = Like.query.filter_by(article_id=article_id).all()
        return jsonify({"likes": len(likes)})
    elif request.method == 'POST':
        new_like = Like(article_id=article_id)
        db.session.add(new_like)
        db.session.commit()
        return jsonify({"message": "Like added successfully"})

@app.route('/articles/<int:article_id>/ratings', methods=['GET', 'POST'])
def manage_ratings(article_id):
    if request.method == 'GET':
        ratings = Rating.query.filter_by(article_id=article_id).all()
        avg_rating = sum([rating.rating for rating in ratings]) / len(ratings) if ratings else 0
        return jsonify({"average_rating": avg_rating, "ratings": [rating.rating for rating in ratings]})
    elif request.method == 'POST':
        data = request.json
        new_rating = Rating(article_id=article_id, rating=data['rating'])
        db.session.add(new_rating)
        db.session.commit()

        # Return the updated list of ratings and the average rating for the article
        ratings = Rating.query.filter_by(article_id=article_id).all()
        ratings_list = [rating.rating for rating in ratings]
        avg_rating = sum(ratings_list) / len(ratings_list) if ratings_list else 0
        
        return jsonify({"ratings": ratings_list, "average_rating": avg_rating, "message": "Rating added successfully"})

@app.route('/subscribers', methods=['GET', 'POST'])
def manage_subscribers():
    if request.method == 'GET':
        subscribers = Subscriber.query.all()
        return jsonify([{"id": subscriber.id, "email": subscriber.email} for subscriber in subscribers])
    elif request.method == 'POST':
        data = request.json
        new_subscriber = Subscriber(email=data['email'])
        db.session.add(new_subscriber)
        db.session.commit()
        return jsonify({"message": "Subscription successful", "subscriber": {"id": new_subscriber.id, "email": new_subscriber.email}})

if __name__ == '__main__':
    app.run(debug=True)
