from flask import Flask
from dotenv import load_dotenv
from config import Config
from hospital.extensions import db, migrate, jwt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Import and register blueprints
    from hospital.routes.auth_routes import auth_bp
    from hospital.routes.patient_routes import patient_bp
    from hospital.routes.doctor_routes import doctor_bp
    from hospital.routes.appointment_routes import appointment_bp
    from hospital.routes.billing_routes import billing_bp
    from hospital.routes.medical_record_routes import medical_record_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(patient_bp, url_prefix='/patients')
    app.register_blueprint(doctor_bp, url_prefix='/doctors')
    app.register_blueprint(appointment_bp, url_prefix='/appointments')
    app.register_blueprint(billing_bp, url_prefix='/billing')
    app.register_blueprint(medical_record_bp, url_prefix='/medical-records')

    return app

if __name__ == '__main__':
    load_dotenv() # Load environment variables
    app = create_app()
    app.run(debug=True)
