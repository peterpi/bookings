
from flask import Blueprint
from bookings.db import get_db


bp = Blueprint ("staff", __name__, url_prefix= "/staff")


@bp.route ("")
def get_staff():
	db = get_db()
	cur = db.execute ("SELECT username FROM staff")
	rows = cur.fetchall()
	results = list (map (lambda x: {'username': x['username']}, rows))
	return results


@bp.route("/<username>/availability_schedule")
def get_staff_availability_schedule(username):
	db = get_db()
	cur = db.cursor()
	cur.execute (
		"SELECT weekday,start,end,startDate from availability_schedule WHERE key IN (SELECT availability_key FROM staff_availability WHERE staff = :username)",
		{"username": username})
	rows = cur.fetchall()
	return list(map (lambda x: dict(x), rows))