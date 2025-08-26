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

const getContactMetrics = async (userId: string) => {
  if (!userId) throw new Error('User ID is required to fetch metrics');

  const baseFilter = { userId };

  const [ pending, accepted, cancelled, rejected] = await Promise.all([
    
    Contact.countDocuments({ ...baseFilter, status: 'pending' }),
    Contact.countDocuments({ ...baseFilter, status: 'accepted' }),
    Contact.countDocuments({ ...baseFilter, status: 'cancelled' }),
    Contact.countDocuments({ ...baseFilter, status: 'rejected' }),
  ]);

  const metrics = [
    
    { title: 'Pending', value: pending },
    { title: 'Accepted', value: accepted },
    { title: 'Cancelled', value: cancelled },
    { title: 'Rejected', value: rejected },
  ];

  return metrics;
};
const getUserContacts = async (userId: string) => {
  if (!userId) throw new Error('User ID is required');

  const contacts = await Contact.find({ userId })
    .populate('providerId userId', 'firstName lastName email phone profession location') // if ref used
    .sort({ createdAt: -1 });

  return contacts;
};
const deleteContactIfPending = async (contactId: string, userId: string) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  console.log(contactId,userId);

  if (!contact) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Contact not found');
  }

  if (contact.status !== 'pending') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only pending contacts can be deleted');
  }

  await Contact.findByIdAndDelete(contactId);
  return { _id: contactId };
};


export const ContactService = {
  createContact,
  getContactMetrics,
  getUserContacts,
  deleteContactIfPending,
  
};
