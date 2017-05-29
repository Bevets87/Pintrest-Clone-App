import express from 'express'

import { handle_get_photos, handle_create_photo, handle_update_photo, handle_delete_photo } from '../controllers/photoController'

let router = express.Router()

router.get('/', handle_get_photos)
router.post('/create', handle_create_photo)
router.post('/update', handle_update_photo)
router.post('/delete', handle_delete_photo)

export default router
