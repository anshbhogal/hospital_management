from hospital.extensions import db
from hospital.models.patient import Patient
from hospital.models.user import User
from hospital.models.role import Role

class PatientService:
    @staticmethod
    def create_patient(user_id, date_of_birth, gender, allergies, insurance_provider, insurance_number):
        user = User.query.get(user_id)
        if not user or user.role.name != 'Patient':
            return None, {'message': 'User not found or not a patient role'}

        new_patient = Patient(
            user_id=user_id,
            date_of_birth=date_of_birth,
            gender=gender,
            allergies=allergies,
            insurance_provider=insurance_provider,
            insurance_number=insurance_number
        )
        db.session.add(new_patient)
        db.session.commit()
        return new_patient, None

    @staticmethod
    def get_all_patients():
        return Patient.query.all()

    @staticmethod
    def get_patient_by_id(patient_id):
        return Patient.query.get(patient_id)

    @staticmethod
    def update_patient(patient_id, data):
        patient = Patient.query.get(patient_id)
        if not patient:
            return None
        for key, value in data.items():
            setattr(patient, key, value)
        db.session.commit()
        return patient

    @staticmethod
    def delete_patient(patient_id):
        patient = Patient.query.get(patient_id)
        if patient:
            db.session.delete(patient)
            db.session.commit()
            return True
        return False
