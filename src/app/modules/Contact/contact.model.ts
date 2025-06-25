import { Schema, model } from 'mongoose';

const ContactSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
ContactSchema.index({ email: 1 });
ContactSchema.index({ phone: 1 });

const Contact = model('Contact', ContactSchema);

export default Contact;
