from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from hospital.services.doctor_service import DoctorService

doctor_bp = Blueprint('doctor', __name__)

@doctor_bp.route('/', methods=['POST'])
@jwt_required()
def create_doctor():
    data = request.get_json()
    user_id = data.get('user_id')
    specialization = data.get('specialization')
    availability_schedule = data.get('availability_schedule')

    doctor, error = DoctorService.create_doctor(user_id, specialization, availability_schedule)
    if error:
        return jsonify(error), 400
    return jsonify({
        'message': 'Doctor created successfully',
        'doctor_id': doctor.doctor_id
    }), 201

@doctor_bp.route('/', methods=['GET'])
@jwt_required()
def get_doctors():
    doctors = DoctorService.get_all_doctors()
    return jsonify([{
        'doctor_id': d.doctor_id,
        'user_id': d.user_id,
        'name': d.user.name if d.user else None,
        'email': d.user.email if d.user else None,
        'specialization': d.specialization,
        'availability_schedule': d.availability_schedule
    } for d in doctors]), 200

@doctor_bp.route('/<int:doctor_id>', methods=['GET'])
@jwt_required()
def get_doctor(doctor_id):
    doctor = DoctorService.get_doctor_by_id(doctor_id)
    if not doctor:
        return jsonify({'message': 'Doctor not found'}), 404
    return jsonify({
        'doctor_id': doctor.doctor_id,
        'user_id': doctor.user_id,
        'name': doctor.user.name if doctor.user else None,
        'email': doctor.user.email if doctor.user else None,
        'specialization': doctor.specialization,
        'availability_schedule': doctor.availability_schedule
    }), 200

@doctor_bp.route('/<int:doctor_id>', methods=['PUT'])
@jwt_required()
def update_doctor(doctor_id):
    data = request.get_json()
    doctor = DoctorService.update_doctor(doctor_id, data)
    if not doctor:
        return jsonify({'message': 'Doctor not found'}), 404
    return jsonify({
        'message': 'Doctor updated successfully',
        'doctor_id': doctor.doctor_id
    }), 200

@doctor_bp.route('/<int:doctor_id>', methods=['DELETE'])
@jwt_required()
def delete_doctor(doctor_id):
    if DoctorService.delete_doctor(doctor_id):
        return jsonify({'message': 'Doctor deleted successfully'}), 200
    return jsonify({'message': 'Doctor not found'}), 404
