
from flask import Blueprint, Request
from bookings.db import get_db
import flask

bp = Blueprint ("availability", __name__, url_prefix= "/availability")


@bp.route("")
def get_all():
	begin = flask.request.args.get("begin") or flask.abort (400)
	sql = (
		"SELECT staff.username, availability.start, availability.end"
		" FROM staff, availability, staff_availability"
		" WHERE availability.key = staff_availability.availability_key"
		" AND staff_availability.staff = staff.username"
		";")
	db = get_db()
	cur = db.execute(sql)
	availability = list (map (lambda x: dict(x), cur.fetchall()))
	return {
		"hello" : "world",
		"availability" : availability}
