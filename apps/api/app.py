from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
import sqlite3
import hashlib
import os

app = Flask(__name__)
app.secret_key = 'wuxing-lab-secret-key-2026'

DATABASE = 'users.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()
    print("数据库初始化完成")

# 初始化数据库
if not os.path.exists(DATABASE):
    init_db()

@app.route('/')
def index():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        if not username or not password:
            flash('用户名和密码不能为空', 'error')
            return redirect(url_for('register'))

        hashed_pw = hashlib.sha256(password.encode()).hexdigest()

        conn = get_db_connection()
        try:
            conn.execute('INSERT INTO users (username, password_hash) VALUES (?, ?)', 
                        (username, hashed_pw))
            conn.commit()
            flash('注册成功，请登录', 'success')
            return redirect(url_for('index'))
        except sqlite3.IntegrityError:
            flash('用户名已存在', 'error')
        finally:
            conn.close()

    return render_template('register.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    if not username or not password:
        flash('请输入用户名和密码', 'error')
        return redirect(url_for('index'))

    hashed_input_pw = hashlib.sha256(password.encode()).hexdigest()

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE username = ? AND password_hash = ?', 
                        (username, hashed_input_pw)).fetchone()
    conn.close()

    if user:
        session['user_id'] = user['id']
        session['username'] = user['username']
        return redirect(url_for('dashboard'))
    else:
        flash('用户名或密码错误', 'error')
        return redirect(url_for('index'))

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    flash('已退出登录', 'success')
    return redirect(url_for('index'))

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    
    conn = get_db_connection()
    users = conn.execute('SELECT id, username, created_at FROM users ORDER BY created_at DESC').fetchall()
    user_count = conn.execute('SELECT COUNT(*) as count FROM users').fetchone()['count']
    conn.close()
    
    return render_template('dashboard.html', 
                           username=session['username'],
                           users=users,
                           user_count=user_count)

# API接口
@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    hashed_pw = hashlib.sha256(password.encode()).hexdigest()
    
    conn = get_db_connection()
    user = conn.execute('SELECT id, username FROM users WHERE username = ? AND password_hash = ?', 
                        (username, hashed_pw)).fetchone()
    conn.close()
    
    if user:
        session['user_id'] = user['id']
        session['username'] = user['username']
        return jsonify({'success': True, 'username': user['username']})
    return jsonify({'success': False, 'message': '用户名或密码错误'}), 401

@app.route('/api/register', methods=['POST'])
def api_register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'success': False, 'message': '用户名和密码不能为空'}), 400
    
    hashed_pw = hashlib.sha256(password.encode()).hexdigest()
    
    conn = get_db_connection()
    try:
        conn.execute('INSERT INTO users (username, password_hash) VALUES (?, ?)', 
                    (username, hashed_pw))
        conn.commit()
        return jsonify({'success': True, 'message': '注册成功'})
    except sqlite3.IntegrityError:
        return jsonify({'success': False, 'message': '用户名已存在'}), 400
    finally:
        conn.close()

@app.route('/api/logout', methods=['POST'])
def api_logout():
    session.pop('user_id', None)
    session.pop('username', None)
    return jsonify({'success': True})

@app.route('/api/check-login')
def api_check_login():
    if 'user_id' in session:
        return jsonify({'logged_in': True, 'username': session.get('username')})
    return jsonify({'logged_in': False})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
