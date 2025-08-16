from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from hospital.services.patient_service import PatientService

patient_bp = Blueprint('patient', __name__)

@patient_bp.route('/', methods=['POST'])
@jwt_required()
def create_patient():
    data = request.get_json()
    user_id = data.get('user_id')
    date_of_birth = data.get('date_of_birth')
    gender = data.get('gender')
    allergies = data.get('allergies')
    insurance_provider = data.get('insurance_provider')
    insurance_number = data.get('insurance_number')

    patient, error = PatientService.create_patient(user_id, date_of_birth, gender, allergies, insurance_provider, insurance_number)
    if error:
        return jsonify(error), 400
    return jsonify({
        'message': 'Patient created successfully',
        'patient_id': patient.patient_id
    }), 201

@patient_bp.route('/', methods=['GET'])
@jwt_required()
def get_patients():
    patients = PatientService.get_all_patients()
    return jsonify([{
        'patient_id': p.patient_id,
        'user_id': p.user_id,
        'name': p.user.name if p.user else None,
        'email': p.user.email if p.user else None,
        'date_of_birth': str(p.date_of_birth),
        'gender': p.gender,
        'allergies': p.allergies,
        'insurance_provider': p.insurance_provider,
        'insurance_number': p.insurance_number
    } for p in patients]), 200

@patient_bp.route('/<int:patient_id>', methods=['GET'])
@jwt_required()
def get_patient(patient_id):
    patient = PatientService.get_patient_by_id(patient_id)
    if not patient:
        return jsonify({'message': 'Patient not found'}), 404
    return jsonify({
        'patient_id': patient.patient_id,
        'user_id': patient.user_id,
        'name': patient.user.name if patient.user else None,
        'email': patient.user.email if patient.user else None,
        'date_of_birth': str(patient.date_of_birth),
        'gender': patient.gender,
        'allergies': patient.allergies,
        'insurance_provider': patient.insurance_provider,
        'insurance_number': patient.insurance_number
    }), 200

@patient_bp.route('/<int:patient_id>', methods=['PUT'])
@jwt_required()
def update_patient(patient_id):
    data = request.get_json()
    patient = PatientService.update_patient(patient_id, data)
    if not patient:
        return jsonify({'message': 'Patient not found'}), 404
    return jsonify({
        'message': 'Patient updated successfully',
        'patient_id': patient.patient_id
    }), 200

@patient_bp.route('/<int:patient_id>', methods=['DELETE'])
@jwt_required()
def delete_patient(patient_id):
    if PatientService.delete_patient(patient_id):
        return jsonify({'message': 'Patient deleted successfully'}), 200
    return jsonify({'message': 'Patient not found'}), 404
