import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import config from '../../../config';
import { ServiceProviderServices } from './serviceProvider.service';



const getCategories = catchAsync(async (req: Request, res: Response) => {
    const result = await ServiceProviderServices.getCategories();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'List of service provider categories retrieved successfully',
    data: result,
  });
});
const getServiceProviders = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceProviderServices.getAllServiceProviders();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service providers retrieved successfully',
    data: result,
  });
});
const getServiceProvidersById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceProviderServices.getServiceProviderById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service provider retrieved successfully',
    data: result,
  });
});
const getProvidersByCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryName } = req.params;
  const result = await ServiceProviderServices.getProvidersByCategory(categoryName);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Service providers for category "${categoryName}" retrieved successfully`,
    data: result,
  });
});
const searchProviders = catchAsync(async (req: Request, res: Response) => {
  const query = req.query.searchTerm as string;

  const result = await ServiceProviderServices.searchProviders(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service providers fetched successfully',
    data: result,
  });
});
const filterProviders = catchAsync(async (req: Request, res: Response) => {
  const filters = req.query;

  const result = await ServiceProviderServices.filterProviders(filters);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Filtered service providers fetched successfully',
    data: result,
  });
});
const getContactMetrics = catchAsync(async (req: Request, res: Response) => {
  const userId= req.user._id;
  const result = await ServiceProviderServices.getContactMetrics(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Contact metrics fetched successfully',
    data: result,
  });
});
const acceptContact = async (req: Request, res: Response) => {
  const  contactId  = req.params.id;
  console.log("delete controller",contactId)
  const userId = req.user?._id; // assuming you attach user in auth middleware

  const result = await ServiceProviderServices.acceptContact(contactId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Contact accepted successfully (if it was pending)',
    data: result,
  });
};
const getUserContacts = catchAsync(async (req, res) => {
  const userId = req?.user?.id;

  const result = await ServiceProviderServices.getUserContacts(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User contacts retrieved successfully',
    data: result,
  });
});

export const ServiceProviderController = {

  
  getCategories,
  getServiceProviders,
  getServiceProvidersById,
  getProvidersByCategory,
  searchProviders,
  filterProviders,
  getContactMetrics,
  getUserContacts,
  acceptContact
  
};


