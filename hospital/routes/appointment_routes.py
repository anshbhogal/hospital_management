from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from hospital.services.appointment_service import AppointmentService
from datetime import datetime

appointment_bp = Blueprint('appointment', __name__)

@appointment_bp.route('/', methods=['POST'])
@jwt_required()
def create_appointment():
    data = request.get_json()
    patient_id = data.get('patient_id')
    doctor_id = data.get('doctor_id')
    appointment_date_str = data.get('appointment_date')
    notes = data.get('notes')

    try:
        appointment_date = datetime.fromisoformat(appointment_date_str)
    except (ValueError, TypeError):
        return jsonify({'message': 'Invalid date format. Use YYYY-MM-DDTHH:MM:SS'}), 400

    appointment, error = AppointmentService.create_appointment(patient_id, doctor_id, appointment_date, notes)
    if error:
        return jsonify(error), 400
    return jsonify({
        'message': 'Appointment created successfully',
        'appointment_id': appointment.appointment_id
    }), 201

@appointment_bp.route('/', methods=['GET'])
@jwt_required()
def get_appointments():
    appointments = AppointmentService.get_all_appointments()
    return jsonify([{
        'appointment_id': a.appointment_id,
        'patient_id': a.patient_id,
        'doctor_id': a.doctor_id,
        'appointment_date': a.appointment_date.isoformat(),
        'status': a.status,
        'notes': a.notes
    } for a in appointments]), 200

@appointment_bp.route('/<int:appointment_id>', methods=['GET'])
@jwt_required()
def get_appointment(appointment_id):
    appointment = AppointmentService.get_appointment_by_id(appointment_id)
    if not appointment:
        return jsonify({'message': 'Appointment not found'}), 404
    return jsonify({
        'appointment_id': appointment.appointment_id,
        'patient_id': appointment.patient_id,
        'doctor_id': appointment.doctor_id,
        'appointment_date': appointment.appointment_date.isoformat(),
        'status': appointment.status,
        'notes': appointment.notes
    }), 200

@appointment_bp.route('/<int:appointment_id>', methods=['PUT'])
@jwt_required()
def update_appointment(appointment_id):
    data = request.get_json()
    if 'appointment_date' in data:
        try:
            data['appointment_date'] = datetime.fromisoformat(data['appointment_date'])
        except (ValueError, TypeError):
            return jsonify({'message': 'Invalid date format. Use YYYY-MM-DDTHH:MM:SS'}), 400

    appointment = AppointmentService.update_appointment(appointment_id, data)
    if not appointment:
        return jsonify({'message': 'Appointment not found'}), 404
    return jsonify({
        'message': 'Appointment updated successfully',
        'appointment_id': appointment.appointment_id
    }), 200

@appointment_bp.route('/<int:appointment_id>', methods=['DELETE'])
@jwt_required()
def delete_appointment(appointment_id):
    if AppointmentService.delete_appointment(appointment_id):
        return jsonify({'message': 'Appointment cancelled successfully'}), 200
    return jsonify({'message': 'Appointment not found'}), 404
