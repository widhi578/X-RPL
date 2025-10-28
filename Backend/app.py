from flask import Flask, render_template, request, redirect

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        # Contoh login sederhana
        if username == "admin route" and password == "admin123":
            return redirect("/dashboard")
        else:
            error = "Username atau password salah!"

    return render_template("login.html", error=error)

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

if __name__ == "__main__":
    app.run(debug=True)