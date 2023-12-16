import os
from flask import Flask


def create_app (test_config = None):
	app = Flask(__name__, instance_relative_config=True)
	app.config.from_mapping(
		DATABASE = os.path.join (app.instance_path, "bookings.db")
	)


	try :
		os.makedirs(app.instance_path)
	except OSError:
		pass

	@app.route("/hello")
	def hello():
		return "Hello world."
	
	from . import db
	db.init_app(app)

	from . import staff
	app.register_blueprint(staff.bp)

	from. import services
	app.register_blueprint(services.bp)

	from . import availability
	app.register_blueprint(availability.bp)

	return app

