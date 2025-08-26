import { Schema, model, Types } from 'mongoose';

const ContactSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,  // Changed from String
      ref: 'User',                  // Reference to User model
      required: true,
    },
    providerId: {
      type: Schema.Types.ObjectId,  // Changed from String
      ref: 'User',                  // Reference to User model
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ['pending', 'cancelled', 'accepted','rejected'],
      default: 'pending',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Contact = model('Contact', ContactSchema);

export default Contact;