import { Router } from 'express'
import {
  getStats,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  exportInquiries,
} from '../controllers/inquiryController.js'
import { updateStatusRules, inquiryIdParamRules } from '../validators/inquiryValidator.js'
import { validate } from '../middleware/validate.js'
import protect from '../middleware/auth.js'

const router = Router()

router.use(protect)

router.get('/stats', getStats)
router.get('/export', exportInquiries)
router.get('/', getInquiries)
router.patch('/:id/status', updateStatusRules, validate, updateInquiryStatus)
router.delete('/:id', inquiryIdParamRules, validate, deleteInquiry)

export default router
