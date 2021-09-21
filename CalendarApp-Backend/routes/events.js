/* 
    Event Routes
    /api/events
 */
const { check } = require("express-validator");
const { Router } = require("express");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

const validateJWT = require("../middlewares/Validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");
const isDate = require("../helpers/isDate");

const router = Router();

//Validación JWT para cualquier petición que se encuentre debajo
router.use(validateJWT);
//Obtener eventos
router.get("/", getEvents);

//Crear eventos
router.post(
  "/",
  [
    check("title", "Title is required").notEmpty(),
    check("start", "Start date is invalid").custom(isDate),
    check("end", "end date is invalid").custom(isDate),
    validateFields,
  ],
  createEvent
);

//Actualizar evento
router.put(
  "/:id",
  [
    check("id", "ID is not valid").isMongoId(),
    check("title", "Title is required").notEmpty(),
    check("start", "Start date is invalid").custom(isDate),
    check("end", "end date is invalid").custom(isDate),
    validateFields,
  ],
  updateEvent
);

//Delete event
router.delete(
  "/:id",
  [check("id", "ID is not valid").isMongoId(), validateFields],
  deleteEvent
);

module.exports = router;
