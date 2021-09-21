const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");
  res.json({ ok: true, msg: "Get events", events });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  event.user = req.uid;

  event
    .save()
    .then((event) => {
      return res.status(201).json({ ok: true, msg: "Event created", event });
    })
    .catch((err) => {
      console.log("[ERROR DB SAVING]", err);
      res.status(500).json({ ok: false, msg: "Opps something went wrong" });
    });
};
const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ ok: false, msg: "Event not found" });
    }

    if (event.user.toString() !== uid) {
      return res
        .status(401)
        .json({ ok: false, msg: "Insufficient permissions" });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };
    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    return res.json({ ok: true, event: updatedEvent });
  } catch (error) {
    console.log("[ERROR-DB-EDIT]", error);
    return res
      .status(500)
      .json({ ok: false, msg: "Opps something went wrong" });
  }
};
const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ ok: false, msg: "Event not found" });
    }

    if (event.user.toString() !== uid) {
      return res
        .status(401)
        .json({ ok: false, msg: "Insufficient permissions" });
    }

    await Event.findByIdAndRemove(eventId);

    return res.json({ ok: true, msg: "Event deleted" });
  } catch (error) {
    console.log("[ERROR-DB-EDIT]", error);
    return res
      .status(500)
      .json({ ok: false, msg: "Opps something went wrong" });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
