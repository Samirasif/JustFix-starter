import express from 'express';

import { ContactController } from './contact.controller';
import auth from '../../middlewares/auth';


const router = express.Router();

// Create a new contact
router.post(
  '/create',
  
  ContactController.createContact
);
router.delete(
  '/:id',
  auth(),
  ContactController.deletePendingContact
);
router.get('/metrics',auth(), ContactController.getContactMetrics);
router.get('/all-contacts', auth(), ContactController.getUserContacts);



export const ContactRoute = router;
