import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import Contact from './contact.model';
import User from '../User/user.model';


const createContact = async (payload: {
  providerId: string;
  message: string;
  userId: string;
  location: string;
}) => {
  const { providerId, message, userId, location } = payload;

  // ✅ Strict field validations
  if (!message?.trim()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Message is required');
  }

  if (!providerId?.trim()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Provider ID is required');
  }

  if (!userId?.trim()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User ID is required');
  }

  if (!location?.trim()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Location is required');
  }

  // ✅ Ensure the provider exists and has correct role
  const provider = await User.findOne({ _id: providerId, role: 'SERVICE_PROVIDER' });

  if (!provider) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No service provider found with the given ID');
  }

  // ✅ Create contact
  const contact = await Contact.create({
    providerId,
    message,
    userId,
    location,
  });

  return contact;
};

export const ContactService = {
  createContact,
};
