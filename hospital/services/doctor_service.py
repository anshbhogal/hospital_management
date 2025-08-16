from hospital.extensions import db
from hospital.models.doctor import Doctor
from hospital.models.user import User
from hospital.models.role import Role

class DoctorService:
    @staticmethod
    def create_doctor(user_id, specialization, availability_schedule):
        user = User.query.get(user_id)
        if not user or user.role.name != 'Doctor':
            return None, {'message': 'User not found or not a doctor role'}

        new_doctor = Doctor(
            user_id=user_id,
            specialization=specialization,
            availability_schedule=availability_schedule
        )
        db.session.add(new_doctor)
        db.session.commit()
        return new_doctor, None

    @staticmethod
    def get_all_doctors():
        return Doctor.query.all()

    @staticmethod
    def get_doctor_by_id(doctor_id):
        return Doctor.query.get(doctor_id)

    @staticmethod
    def update_doctor(doctor_id, data):
        doctor = Doctor.query.get(doctor_id)
        if not doctor:
            return None
        for key, value in data.items():
            setattr(doctor, key, value)
        db.session.commit()
        return doctor

    @staticmethod
    def delete_doctor(doctor_id):
        doctor = Doctor.query.get(doctor_id)
        if doctor:
            db.session.delete(doctor)
            db.session.commit()
            return True
        return False
