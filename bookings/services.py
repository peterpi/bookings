from flask import Blueprint, request
from bookings.db import get_db
import sqlite3
import flask


bp = Blueprint("services", __name__, url_prefix="/services")


@bp.route("", methods =["GET"])
def get_all_services():
	db = get_db()
	cur = db.execute ("SELECT * FROM service")
	return list (map (lambda x: dict(x), cur.fetchall()))


@bp.route("", methods = ["POST"])
def post_new_service():
	print("hello")
	j = request.json # raises error if there was a problem, client gets HTTP 400
	db = get_db()
	try :
		cur = db.execute (
			"INSERT INTO service (name, duration, tag) VALUES (:name, :duration, :tag)",
			j)
		db.commit()
	except sqlite3.ProgrammingError:
		flask.abort(400)
	except sqlite3.IntegrityError:
		flask.abort (409)
	return j["tag"]

@bp.route("/<tag>")
def get_service (tag):
	db = get_db()
	cur = db.execute ("SELECT * FROM service WHERE tag = ? LIMIT 2", (tag,))
	# LIMIT 2 is enough for us to assert fail if there are more than 1
	rows = list (map (lambda x: dict(x), cur.fetchall()))
	num = len(rows)
	if (num == 0):
		flask.abort (404)
	assert (len(rows) == 1) # Should be unique in the database
	return rows[0]