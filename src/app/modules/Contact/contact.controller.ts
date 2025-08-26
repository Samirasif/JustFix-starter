import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ContactService } from './contact.service';
import { configDotenv } from 'dotenv';

const createContact = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.createContact(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Contact request submitted successfully',
    data: result,
  });
});

const getContactMetrics = catchAsync(async (req: Request, res: Response) => {
  const userId= req.user._id;
  const result = await ContactService.getContactMetrics(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Contact metrics fetched successfully',
    data: result,
  });
});
const getUserContacts = catchAsync(async (req, res) => {
  const userId = req?.user?.id;

  const result = await ContactService.getUserContacts(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User contacts retrieved successfully',
    data: result,
  });
});
const deletePendingContact = async (req: Request, res: Response) => {
  const  contactId  = req.params.id;
  console.log("delete controller",contactId)
  const userId = req.user?._id; // assuming you attach user in auth middleware

  const result = await ContactService.deleteContactIfPending(contactId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Contact deleted successfully (if it was pending)',
    data: result,
  });
};


export const ContactController = {
  createContact,
  getContactMetrics,
  getUserContacts,
  deletePendingContact,
  
};
