import mongoose from 'mongoose'

const vehicleSchema = new mongoose.Schema({
	registration: {
		type: String,
	},
    year: {
		type: Number,
        min: [1900, 'Must be after 1900'],
        max: [2100, 'Must be before 2100']
	},
    make: {
        type: String,
    },
    model: {
        type: String,
    },
    group: {

    },
    body_type: {
        type: [String],
    },
    fuel: {

    },
    vol_engine: {

    },
    transmission: {

    },
    num_seats: {

    },
    num_doors: {

    },
    color: {

    },
    options: {

    },
    photos: {

    },
    thumb: {

    },
    owner: {

    },
    insurance: {

    },
    current_location: {

    },
    orders: {

    },
    payments: {

    },
    fuel_level: {

    },
    odometer: {

    },
    notes: {

    },

},{timestamps: true})

const Vehicle =  mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema)
export default Vehicle
